// In-memory map of GitHub path → local blob URL
// Populated when images are uploaded, so admin previews work instantly
// without waiting for CF Pages to rebuild
const cache = new Map<string, string>()

export function setBlobUrl(githubPath: string, blobUrl: string) {
  cache.set(githubPath, blobUrl)
}

export function getBlobUrl(githubPath: string): string | undefined {
  return cache.get(githubPath)
}
