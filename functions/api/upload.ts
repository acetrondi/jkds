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
  let body: { path: string; content: string; message?: string; token: string }
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

  let sha: string | undefined
  const getRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${body.path}`, {
    headers: ghHeaders,
  })
  if (getRes.ok) {
    const existing = (await getRes.json()) as { sha: string }
    sha = existing.sha
  }

  const putRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${body.path}`, {
    method: 'PUT',
    headers: ghHeaders,
    body: JSON.stringify({
      message: body.message ?? `upload: ${body.path}`,
      content: body.content,
      branch,
      ...(sha ? { sha } : {}),
    }),
  })

  const data = await putRes.json()
  return Response.json(data, { status: putRes.status })
}
