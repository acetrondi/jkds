import { getStagedUploads, clearStagedUploads } from './uploadStore'

function getToken(): string {
  return sessionStorage.getItem('adminAuth') ?? ''
}

export async function publishData(data: {
  projects: unknown
  heroSlides: unknown
  testimonials: unknown
}): Promise<void> {
  const uploads = getStagedUploads()

  const res = await fetch('/api/publish', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...data, uploads, token: getToken() }),
  })

  if (!res.ok) {
    const err = (await res.json().catch(() => ({}))) as { message?: string }
    throw new Error(err.message ?? 'Publish failed')
  }

  clearStagedUploads()
}
