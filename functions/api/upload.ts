interface Env {
  GITHUB_TOKEN: string
  ADMIN_TOKEN: string
}

const OWNER = 'acetrondi'
const REPO = 'jkds'
const BRANCH = 'main'

export async function onRequestPost({ request, env }: { request: Request; env: Env }) {
  let body: { path: string; content: string; message?: string; adminToken: string }
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

  // Get existing file SHA (required for updates)
  let sha: string | undefined
  const getRes = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/contents/${body.path}`, {
    headers: ghHeaders,
  })
  if (getRes.ok) {
    const existing = (await getRes.json()) as { sha: string }
    sha = existing.sha
  }

  const putRes = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/contents/${body.path}`, {
    method: 'PUT',
    headers: ghHeaders,
    body: JSON.stringify({
      message: body.message ?? `upload: ${body.path}`,
      content: body.content,
      branch: BRANCH,
      ...(sha ? { sha } : {}),
    }),
  })

  const data = await putRes.json()
  return Response.json(data, { status: putRes.status })
}
