// Local Vite asset map — resolves existing /src/assets/... paths to hashed build URLs
const localAssets = import.meta.glob('/src/assets/projects/**/*.{avif,webp,jpg,png,jpeg}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>

/**
 * Resolves an image URL for display.
 * - /src/assets/... paths → mapped to hashed Vite build URLs (existing images)
 * - /uploads/... and external URLs → returned as-is (new GitHub-hosted images)
 */
export function ikSrc(url: string, _transforms?: string): string {
  if (!url) return ''
  if (url.startsWith('/src/assets') && localAssets[url]) {
    return localAssets[url]
  }
  return url
}

// Keep export shape compatible with existing imports
export const IK_ENDPOINT = ''
