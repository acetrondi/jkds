const ADMIN_TOKEN = import.meta.env.VITE_ADMIN_TOKEN as string

async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const result = reader.result as string
      resolve(result.split(',')[1])
    }
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

export async function uploadToGitHub(file: File, folder: string): Promise<string> {
  const base64 = await fileToBase64(file)
  const uid = crypto.randomUUID().slice(0, 8)
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '-')
  const filename = `${uid}-${safeName}`
  const path = `public/uploads/${folder}/${filename}`

  const res = await fetch('/api/upload', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      path,
      content: base64,
      message: `upload: ${path}`,
      adminToken: ADMIN_TOKEN,
    }),
  })

  if (!res.ok) {
    const err = (await res.json().catch(() => ({}))) as { message?: string }
    throw new Error(err.message ?? 'Upload failed')
  }

  return `/uploads/${folder}/${filename}`
}

export async function publishData(data: {
  projects: unknown
  heroSlides: unknown
  testimonials: unknown
}): Promise<void> {
  const res = await fetch('/api/publish', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...data, adminToken: ADMIN_TOKEN }),
  })

  if (!res.ok) {
    const err = (await res.json().catch(() => ({}))) as { message?: string }
    throw new Error(err.message ?? 'Publish failed')
  }
}
