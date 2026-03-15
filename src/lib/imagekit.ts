import { upload } from '@imagekit/react'

const publicKey = import.meta.env.VITE_IMAGEKIT_PUBLIC_KEY as string
const privateKey = import.meta.env.VITE_IMAGEKIT_PRIVATE_KEY as string
export const IK_ENDPOINT = import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT as string

/**
 * Returns an optimised ImageKit src URL.
 * - ImageKit URLs → appends ?tr=<transforms>
 * - External / local URLs → returned as-is
 */
export function ikSrc(url: string, transforms = 'f-webp,q-80'): string {
  if (!url) return ''
  if (url.includes('ik.imagekit.io') || (IK_ENDPOINT && url.startsWith(IK_ENDPOINT))) {
    return `${url}?tr=${transforms}`
  }
  return url
}

export async function generateAuth() {
  const token = crypto.randomUUID()
  const expire = Math.floor(Date.now() / 1000) + 3600
  const enc = new TextEncoder()
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(privateKey),
    { name: 'HMAC', hash: 'SHA-1' },
    false,
    ['sign']
  )
  const raw = await crypto.subtle.sign('HMAC', key, enc.encode(token + expire))
  const signature = Array.from(new Uint8Array(raw))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
  return { token, expire, signature }
}

export async function saveJSONToImageKit(data: unknown, filename: string): Promise<void> {
  const { token, expire, signature } = await generateAuth()
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const file = new File([blob], filename, { type: 'application/json' })
  await upload({
    file,
    fileName: filename,
    publicKey,
    token,
    expire,
    signature,
    folder: '/config',
    useUniqueFileName: false,
    overwriteFile: true,
  })
}
