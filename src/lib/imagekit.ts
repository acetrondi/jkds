import { getBlobUrl } from './blobCache'

// Local Vite asset map — resolves existing /src/assets/... paths to hashed build URLs
const localAssets = import.meta.glob('/src/assets/projects/**/*.{avif,webp,jpg,png,jpeg}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>

/**
 * Resolves an image URL for display.
 * 1. Blob cache — freshly uploaded images show instantly in admin without a rebuild
 * 2. /src/assets/... paths — mapped to hashed Vite build URLs (existing images)
 * 3. Everything else — returned as-is
 */
export function ikSrc(url: string, _transforms?: string): string {
  if (!url) return ''
  const blob = getBlobUrl(url)
  if (blob) return blob
  if (url.startsWith('/src/assets') && localAssets[url]) {
    return localAssets[url]
  }
  return url
}

// Keep export shape compatible with existing imports
export const IK_ENDPOINT = ''
