import { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { ImageUploader } from './ImageUploader'
import { Plus, X } from 'lucide-react'
import type { Project } from '@/types/project'

interface ProjectFormProps {
  open: boolean
  project: Project | null
  onSave: (project: Project) => void
  onClose: () => void
}

const emptyProject = (): Project => ({
  id: '',
  title: '',
  description: '',
  images: [],
  cover_images: [],
  is_hero_project: false,
  area: '',
  style: '',
  date: '',
  testimonial: { text: '', image: '', video: '' },
})

function slugify(str: string) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
}

export function ProjectForm({ open, project, onSave, onClose }: ProjectFormProps) {
  const [form, setForm] = useState<Project>(emptyProject())

  useEffect(() => {
    setForm(project ? { ...project } : emptyProject())
  }, [project, open])

  const set = <K extends keyof Project>(key: K, value: Project[K]) => {
    setForm((f) => ({ ...f, [key]: value }))
  }

  const handleTitleChange = (title: string) => {
    setForm((f) => ({ ...f, title, id: f.id === slugify(f.title) || f.id === '' ? slugify(title) : f.id }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(form)
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{project ? 'Edit Project' : 'New Project'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Basic fields */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Title</Label>
              <Input value={form.title} onChange={(e) => handleTitleChange(e.target.value)} required />
            </div>
            <div className="space-y-1.5">
              <Label>ID (slug)</Label>
              <Input value={form.id} onChange={(e) => set('id', e.target.value)} required />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label>Description</Label>
            <Textarea
              value={form.description}
              onChange={(e) => set('description', e.target.value)}
              rows={3}
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <Label>Area</Label>
              <Input value={form.area} onChange={(e) => set('area', e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Style</Label>
              <Input value={form.style} onChange={(e) => set('style', e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Date</Label>
              <Input value={form.date} onChange={(e) => set('date', e.target.value)} />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Checkbox
              id="hero"
              checked={form.is_hero_project}
              onCheckedChange={(v) => set('is_hero_project', Boolean(v))}
            />
            <Label htmlFor="hero">Hero project (featured on homepage)</Label>
          </div>

          {/* Thumbnail */}
          <div className="space-y-2">
            <Label>Thumbnail</Label>
            <p className="text-xs text-muted-foreground">Shown in project cards and listings.</p>
            <ImageUploader
              url={form.cover_images[0] || undefined}
              onUpload={(url) => set('cover_images', [url])}
              onRemove={() => set('cover_images', [])}
            />
          </div>

          {/* Gallery Images */}
          <div className="space-y-2">
            <Label>Gallery Images</Label>
            <p className="text-xs text-muted-foreground">All images shown inside the project page. Add as many as you like.</p>
            <div className="flex gap-3 flex-wrap items-end">
              {form.images.map((url, i) => (
                <ImageUploader
                  key={i}
                  url={url || undefined}
                  onUpload={(newUrl) => {
                    const next = [...form.images]
                    next[i] = newUrl
                    set('images', next)
                  }}
                  onRemove={() => set('images', form.images.filter((_, idx) => idx !== i))}
                />
              ))}
              <button
                type="button"
                onClick={() => set('images', [...form.images, ''])}
                className="w-24 h-24 rounded-md border-2 border-dashed border-border flex flex-col items-center justify-center gap-1 hover:border-primary transition-colors"
              >
                <Plus className="w-5 h-5 text-muted-foreground" />
                <span className="text-[10px] text-muted-foreground">Add</span>
              </button>
            </div>
          </div>

          {/* Testimonial */}
          <div className="space-y-3 border border-border rounded-lg p-4">
            <Label className="text-sm font-semibold">Testimonial</Label>
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">Quote</Label>
              <Textarea
                value={form.testimonial.text}
                onChange={(e) =>
                  set('testimonial', { ...form.testimonial, text: e.target.value })
                }
                rows={2}
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">Video URL</Label>
              <Input
                value={form.testimonial.video}
                onChange={(e) =>
                  set('testimonial', { ...form.testimonial, video: e.target.value })
                }
                placeholder="https://..."
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">Client Image</Label>
              <ImageUploader
                url={form.testimonial.image || undefined}
                onUpload={(url) =>
                  set('testimonial', { ...form.testimonial, image: url })
                }
                onRemove={() =>
                  set('testimonial', { ...form.testimonial, image: '' })
                }
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save Project</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
