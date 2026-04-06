interface Env {
  GITHUB_TOKEN: string
  ADMIN_TOKEN: string
}

const OWNER = 'acetrondi'
const REPO = 'jkds'
const BRANCH = 'main'

export async function onRequestPost({ request, env }: { request: Request; env: Env }) {
  let body: { projects: unknown; heroSlides: unknown; testimonials: unknown; adminToken: string }
  try {
    body = await request.json()
  } catch {
    return new Response('Bad request', { status: 400 })
  }

  if (body.adminToken !== env.ADMIN_TOKEN) {
    return new Response('Unauthorized', { status: 401 })
  }

  const ghHeaders = {
    Authorization: `Bearer ${env.GITHUB_TOKEN}`,
    'Content-Type': 'application/json',
    'User-Agent': 'jkds-admin',
    Accept: 'application/vnd.github.v3+json',
  }

  // Step 1: get latest commit SHA on main
  const refRes = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/git/refs/heads/${BRANCH}`, {
    headers: ghHeaders,
  })
  if (!refRes.ok) return new Response('Failed to fetch branch ref', { status: 502 })
  const refData = (await refRes.json()) as { object: { sha: string } }
  const latestCommitSha = refData.object.sha

  // Step 2: get tree SHA from that commit
  const commitRes = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/git/commits/${latestCommitSha}`, {
    headers: ghHeaders,
  })
  if (!commitRes.ok) return new Response('Failed to fetch commit', { status: 502 })
  const commitData = (await commitRes.json()) as { tree: { sha: string } }
  const baseTreeSha = commitData.tree.sha

  // Step 3: create blobs for each JSON file
  const files = [
    { path: 'src/data/projects.json', content: JSON.stringify(body.projects, null, 2) },
    { path: 'src/data/hero.json', content: JSON.stringify(body.heroSlides, null, 2) },
    { path: 'src/data/testimonials.json', content: JSON.stringify(body.testimonials, null, 2) },
  ]

  const blobs = await Promise.all(
    files.map(async (f) => {
      const res = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/git/blobs`, {
        method: 'POST',
        headers: ghHeaders,
        body: JSON.stringify({ content: f.content, encoding: 'utf-8' }),
      })
      if (!res.ok) throw new Error(`Blob creation failed for ${f.path}`)
      const { sha } = (await res.json()) as { sha: string }
      return { path: f.path, sha, mode: '100644' as const, type: 'blob' as const }
    })
  )

  // Step 4: create new tree
  const treeRes = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/git/trees`, {
    method: 'POST',
    headers: ghHeaders,
    body: JSON.stringify({ base_tree: baseTreeSha, tree: blobs }),
  })
  if (!treeRes.ok) return new Response('Failed to create tree', { status: 502 })
  const { sha: newTreeSha } = (await treeRes.json()) as { sha: string }

  // Step 5: create commit
  const newCommitRes = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/git/commits`, {
    method: 'POST',
    headers: ghHeaders,
    body: JSON.stringify({
      message: 'admin: update content',
      tree: newTreeSha,
      parents: [latestCommitSha],
    }),
  })
  if (!newCommitRes.ok) return new Response('Failed to create commit', { status: 502 })
  const { sha: newCommitSha } = (await newCommitRes.json()) as { sha: string }

  // Step 6: update branch ref
  const updateRefRes = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/git/refs/heads/${BRANCH}`, {
    method: 'PATCH',
    headers: ghHeaders,
    body: JSON.stringify({ sha: newCommitSha }),
  })
  if (!updateRefRes.ok) return new Response('Failed to update ref', { status: 502 })

  return Response.json({ success: true, commit: newCommitSha })
}
