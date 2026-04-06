interface Env {
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

export async function onRequestPost({ request, env }: { request: Request; env: Env }) {
  let body: { username: string; password: string }
  try {
    body = await request.json()
  } catch {
    return new Response('Bad request', { status: 400 })
  }

  if (body.username !== env.ADMIN_USERNAME || body.password !== env.ADMIN_PASSWORD) {
    return new Response('Invalid credentials', { status: 401 })
  }

  const token = await generateToken(body.username, body.password)
  return Response.json({ token })
}
