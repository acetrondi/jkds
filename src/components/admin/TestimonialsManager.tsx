import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { ImageUploader } from './ImageUploader'
import { Plus, Trash2 } from 'lucide-react'
import type { Testimonial } from '@/types/testimonial'

interface TestimonialsManagerProps {
  testimonials: Testimonial[]
  onChange: (testimonials: Testimonial[]) => void
}

const emptyTestimonial = (): Testimonial => ({
  id: Date.now(),
  name: '',
  designation: '',
  quote: '',
  image: '',
  videoUrl: '',
})

export function TestimonialsManager({ testimonials, onChange }: TestimonialsManagerProps) {
  const update = (idx: number, patch: Partial<Testimonial>) => {
    onChange(testimonials.map((t, i) => (i === idx ? { ...t, ...patch } : t)))
  }

  const remove = (idx: number) => onChange(testimonials.filter((_, i) => i !== idx))
  const add = () => onChange([...testimonials, emptyTestimonial()])

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Testimonials ({testimonials.length})</h2>
        <Button size="sm" onClick={add}>
          <Plus className="w-4 h-4 mr-1" /> Add Testimonial
        </Button>
      </div>

      <div className="space-y-4">
        {testimonials.map((t, idx) => (
          <div key={t.id} className="border border-border rounded-lg p-4 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">#{idx + 1}</span>
              <Button
                size="icon" variant="ghost"
                className="h-8 w-8 text-destructive hover:text-destructive"
                onClick={() => remove(idx)}
              >
                <Trash2 className="w-3.5 h-3.5" />
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">Name</Label>
                <Input value={t.name} onChange={(e) => update(idx, { name: e.target.value })} placeholder="Jane Smith" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">Designation</Label>
                <Input value={t.designation} onChange={(e) => update(idx, { designation: e.target.value })} placeholder="Villa Owner" />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">Quote</Label>
              <Textarea value={t.quote} onChange={(e) => update(idx, { quote: e.target.value })} rows={2} />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">Background Video URL</Label>
              <Input value={t.videoUrl} onChange={(e) => update(idx, { videoUrl: e.target.value })} placeholder="https://..." />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">Client Photo</Label>
              <ImageUploader
                url={t.image || undefined}
                onUpload={(url) => update(idx, { image: url })}
                onRemove={() => update(idx, { image: '' })}
              />
            </div>
          </div>
        ))}

        {testimonials.length === 0 && (
          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center text-muted-foreground text-sm">
            No testimonials yet. Click "Add Testimonial" to create one.
          </div>
        )}
      </div>
    </div>
  )
}
