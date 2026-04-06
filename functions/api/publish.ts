interface Env {
  GITHUB_TOKEN: string
  GITHUB_REPO: string
  ADMIN_USERNAME: string
  ADMIN_PASSWORD: string
}

async function generateToken(username: string, password: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(`${username}:${password}`)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

async function isValidToken(token: string, env: Env): Promise<boolean> {
  const expected = await generateToken(env.ADMIN_USERNAME, env.ADMIN_PASSWORD)
  return token === expected
}

export async function onRequestPost({ request, env }: { request: Request; env: Env }) {
  let body: { projects: unknown; heroSlides: unknown; testimonials: unknown; token: string }
  try {
    body = await request.json()
  } catch {
    return new Response('Bad request', { status: 400 })
  }

  if (!(await isValidToken(body.token, env))) {
    return new Response('Unauthorized', { status: 401 })
  }

  const [owner, repo] = env.GITHUB_REPO.split('/')
  const branch = 'main'

  const ghHeaders = {
    Authorization: `Bearer ${env.GITHUB_TOKEN}`,
    'Content-Type': 'application/json',
    'User-Agent': 'jkds-admin',
    Accept: 'application/vnd.github.v3+json',
  }

  // Get latest commit SHA
  const refRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/refs/heads/${branch}`, {
    headers: ghHeaders,
  })
  if (!refRes.ok) return new Response('Failed to fetch branch ref', { status: 502 })
  const refData = (await refRes.json()) as { object: { sha: string } }
  const latestCommitSha = refData.object.sha

  // Get base tree SHA
  const commitRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/commits/${latestCommitSha}`, {
    headers: ghHeaders,
  })
  if (!commitRes.ok) return new Response('Failed to fetch commit', { status: 502 })
  const commitData = (await commitRes.json()) as { tree: { sha: string } }
  const baseTreeSha = commitData.tree.sha

  // Create blobs for each JSON file
  const files = [
    { path: 'src/data/projects.json', content: JSON.stringify(body.projects, null, 2) },
    { path: 'src/data/hero.json', content: JSON.stringify(body.heroSlides, null, 2) },
    { path: 'src/data/testimonials.json', content: JSON.stringify(body.testimonials, null, 2) },
  ]

  const blobs = await Promise.all(
    files.map(async (f) => {
      const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/blobs`, {
        method: 'POST',
        headers: ghHeaders,
        body: JSON.stringify({ content: f.content, encoding: 'utf-8' }),
      })
      if (!res.ok) throw new Error(`Blob creation failed for ${f.path}`)
      const { sha } = (await res.json()) as { sha: string }
      return { path: f.path, sha, mode: '100644' as const, type: 'blob' as const }
    })
  )

  // Create new tree
  const treeRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/trees`, {
    method: 'POST',
    headers: ghHeaders,
    body: JSON.stringify({ base_tree: baseTreeSha, tree: blobs }),
  })
  if (!treeRes.ok) return new Response('Failed to create tree', { status: 502 })
  const { sha: newTreeSha } = (await treeRes.json()) as { sha: string }

  // Create commit
  const newCommitRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/commits`, {
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

  // Update branch ref
  const updateRefRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/refs/heads/${branch}`, {
    method: 'PATCH',
    headers: ghHeaders,
    body: JSON.stringify({ sha: newCommitSha }),
  })
  if (!updateRefRes.ok) return new Response('Failed to update ref', { status: 502 })

  return Response.json({ success: true, commit: newCommitSha })
}
