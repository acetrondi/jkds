import { useRef, useState } from 'react'
import { upload } from '@imagekit/react'
import { Loader2, X, Upload, AlertCircle } from 'lucide-react'
import { generateAuth } from '@/lib/imagekit'

const publicKey = import.meta.env.VITE_IMAGEKIT_PUBLIC_KEY as string

const MAX_SIZE_MB = 20
const WEBP_QUALITY = 0.85

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

async function convertToWebP(file: File): Promise<File> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const objectUrl = URL.createObjectURL(file)
    img.onload = () => {
      URL.revokeObjectURL(objectUrl)
      const canvas = document.createElement('canvas')
      canvas.width = img.naturalWidth
      canvas.height = img.naturalHeight
      const ctx = canvas.getContext('2d')
      if (!ctx) return reject(new Error('Canvas not supported'))
      ctx.drawImage(img, 0, 0)
      canvas.toBlob(
        (blob) => {
          if (!blob) return reject(new Error('WebP conversion failed'))
          const name = file.name.replace(/\.[^.]+$/, '.webp')
          resolve(new File([blob], name, { type: 'image/webp' }))
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
}

type Stage = 'idle' | 'validating' | 'converting' | 'uploading'

const stageLabel: Record<Stage, string> = {
  idle: '',
  validating: 'Validating…',
  converting: 'Converting…',
  uploading: 'Uploading…',
}

export function ImageUploader({ url, onUpload, onRemove, label }: ImageUploaderProps) {
  const [stage, setStage] = useState<Stage>('idle')
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const loading = stage !== 'idle'

  const handleFile = async (file: File) => {
    setError(null)
    try {
      setStage('validating')
      await validateImage(file)

      setStage('converting')
      const webpFile = await convertToWebP(file)

      setStage('uploading')
      const { token, expire, signature } = await generateAuth()
      const res = await upload({
        file: webpFile,
        fileName: webpFile.name,
        publicKey,
        token,
        expire,
        signature,
        folder: '/portfolio',
        useUniqueFileName: true,
      })
      onUpload(res.url)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed')
    } finally {
      setStage('idle')
    }
  }

  return (
    <div className="flex flex-col gap-2">
      {label && <span className="text-xs text-muted-foreground">{label}</span>}

      {url ? (
        <div className="relative w-24 h-24 rounded-md overflow-hidden border border-border group">
          <img src={url} alt="uploaded" className="w-full h-full object-cover" />
          <button
            type="button"
            onClick={onRemove}
            className="absolute top-1 right-1 bg-black/60 rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X className="w-3 h-3 text-white" />
          </button>
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
