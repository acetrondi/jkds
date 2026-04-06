import { useRef, useState, useEffect } from 'react'
import { Loader2, X, Upload, AlertCircle } from 'lucide-react'
import { uploadToGitHub } from '@/lib/github'

const MAX_SIZE_MB = 20
const WEBP_QUALITY = 0.85
const MAX_DIMENSION = 1920

async function validateImage(file: File): Promise<void> {
  if (!file.type.startsWith('image/')) {
    throw new Error('File must be an image')
  }
  if (file.size > MAX_SIZE_MB * 1024 * 1024) {
    throw new Error(`Image must be under ${MAX_SIZE_MB}MB`)
  }
  await new Promise<void>((resolve, reject) => {
    const img = new Image()
    const objectUrl = URL.createObjectURL(file)
    img.onload = () => { URL.revokeObjectURL(objectUrl); resolve() }
    img.onerror = () => { URL.revokeObjectURL(objectUrl); reject(new Error('File is not a valid image')) }
    img.src = objectUrl
  })
}

async function convertToWebP(file: File): Promise<{ file: File; blobUrl: string }> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const objectUrl = URL.createObjectURL(file)
    img.onload = () => {
      URL.revokeObjectURL(objectUrl)
      const canvas = document.createElement('canvas')

      // Resize to max dimension while keeping aspect ratio
      let { naturalWidth: w, naturalHeight: h } = img
      if (w > MAX_DIMENSION || h > MAX_DIMENSION) {
        if (w > h) { h = Math.round((h / w) * MAX_DIMENSION); w = MAX_DIMENSION }
        else { w = Math.round((w / h) * MAX_DIMENSION); h = MAX_DIMENSION }
      }
      canvas.width = w
      canvas.height = h

      const ctx = canvas.getContext('2d')
      if (!ctx) return reject(new Error('Canvas not supported'))
      ctx.drawImage(img, 0, 0, w, h)
      canvas.toBlob(
        (blob) => {
          if (!blob) return reject(new Error('WebP conversion failed'))
          const name = file.name.replace(/\.[^.]+$/, '.webp')
          const webpFile = new File([blob], name, { type: 'image/webp' })
          const blobUrl = URL.createObjectURL(blob)
          resolve({ file: webpFile, blobUrl })
        },
        'image/webp',
        WEBP_QUALITY
      )
    }
    img.onerror = () => { URL.revokeObjectURL(objectUrl); reject(new Error('Could not read image')) }
    img.src = objectUrl
  })
}

interface ImageUploaderProps {
  url?: string
  onUpload: (url: string) => void
  onRemove: () => void
  label?: string
  folder: string
}

type Stage = 'idle' | 'validating' | 'converting' | 'uploading'

const stageLabel: Record<Stage, string> = {
  idle: '',
  validating: 'Validating…',
  converting: 'Converting…',
  uploading: 'Uploading…',
}

export function ImageUploader({ url, onUpload, onRemove, label, folder }: ImageUploaderProps) {
  const [stage, setStage] = useState<Stage>('idle')
  const [error, setError] = useState<string | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const loading = stage !== 'idle'

  // Clean up blob URL when component unmounts or preview changes
  useEffect(() => {
    return () => { if (previewUrl) URL.revokeObjectURL(previewUrl) }
  }, [previewUrl])

  const displayUrl = previewUrl || url

  const handleFile = async (file: File) => {
    setError(null)
    try {
      setStage('validating')
      await validateImage(file)

      setStage('converting')
      const { file: webpFile, blobUrl } = await convertToWebP(file)

      // Show preview immediately — don't wait for upload
      setPreviewUrl(blobUrl)

      setStage('uploading')
      const uploadedUrl = await uploadToGitHub(webpFile, folder)
      onUpload(uploadedUrl)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed')
      setPreviewUrl(null)
    } finally {
      setStage('idle')
    }
  }

  const handleRemove = () => {
    if (previewUrl) { URL.revokeObjectURL(previewUrl); setPreviewUrl(null) }
    onRemove()
  }

  return (
    <div className="flex flex-col gap-2">
      {label && <span className="text-xs text-muted-foreground">{label}</span>}

      {displayUrl ? (
        <div className="relative w-24 h-24 rounded-md overflow-hidden border border-border group">
          <img src={displayUrl} alt="uploaded" className="w-full h-full object-cover" />
          {loading && (
            <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center gap-1">
              <Loader2 className="w-4 h-4 animate-spin text-white" />
              <span className="text-[9px] text-white text-center leading-tight px-1">{stageLabel[stage]}</span>
            </div>
          )}
          {!loading && (
            <button
              type="button"
              onClick={handleRemove}
              className="absolute top-1 right-1 bg-black/60 rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="w-3 h-3 text-white" />
            </button>
          )}
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={loading}
          className="w-24 h-24 rounded-md border-2 border-dashed border-border flex flex-col items-center justify-center gap-1 hover:border-primary transition-colors disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
              <span className="text-[9px] text-muted-foreground text-center leading-tight px-1">
                {stageLabel[stage]}
              </span>
            </>
          ) : (
            <>
              <Upload className="w-5 h-5 text-muted-foreground" />
              <span className="text-[10px] text-muted-foreground">Upload</span>
            </>
          )}
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) handleFile(file)
          e.target.value = ''
        }}
      />

      {error && (
        <p className="text-xs text-destructive flex items-start gap-1 max-w-[10rem]">
          <AlertCircle className="w-3 h-3 mt-0.5 shrink-0" />
          {error}
        </p>
      )}
    </div>
  )
}
