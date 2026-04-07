interface StagedUpload {
  path: string    // e.g. "public/uploads/hero/abc.webp"
  content: string // base64 encoded file content
}

const staged: StagedUpload[] = []

export function stageUpload(path: string, content: string) {
  const idx = staged.findIndex((u) => u.path === path)
  if (idx >= 0) staged[idx] = { path, content }
  else staged.push({ path, content })
}

export function getStagedUploads(): StagedUpload[] {
  return [...staged]
}

export function clearStagedUploads() {
  staged.length = 0
}
