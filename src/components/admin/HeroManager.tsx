import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ImageUploader } from './ImageUploader'
import { Plus, Trash2, GripVertical } from 'lucide-react'
import type { HeroSlide } from '@/types/hero'

interface HeroManagerProps {
  slides: HeroSlide[]
  onChange: (slides: HeroSlide[]) => void
}

const emptySlide = (): HeroSlide => ({ image: '', title: '', subtitle: '', accent: '' })

export function HeroManager({ slides, onChange }: HeroManagerProps) {
  const update = (idx: number, patch: Partial<HeroSlide>) => {
    const next = slides.map((s, i) => (i === idx ? { ...s, ...patch } : s))
    onChange(next)
  }

  const remove = (idx: number) => {
    onChange(slides.filter((_, i) => i !== idx))
  }

  const add = () => {
    onChange([...slides, emptySlide()])
  }

  const move = (from: number, to: number) => {
    if (to < 0 || to >= slides.length) return
    const next = [...slides]
    const [item] = next.splice(from, 1)
    next.splice(to, 0, item)
    onChange(next)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Hero Slides ({slides.length})</h2>
        <Button size="sm" onClick={add}>
          <Plus className="w-4 h-4 mr-1" /> Add Slide
        </Button>
      </div>

      <p className="text-sm text-muted-foreground">
        Each slide shows a full-screen background image with animated headline text. Upload images via ImageKit for optimal delivery.
      </p>

      <div className="space-y-4">
        {slides.map((slide, idx) => (
          <div key={idx} className="border border-border rounded-lg p-4 space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex flex-col gap-0.5">
                <button
                  type="button"
                  onClick={() => move(idx, idx - 1)}
                  disabled={idx === 0}
                  className="text-muted-foreground hover:text-foreground disabled:opacity-30 text-xs leading-none"
                >▲</button>
                <button
                  type="button"
                  onClick={() => move(idx, idx + 1)}
                  disabled={idx === slides.length - 1}
                  className="text-muted-foreground hover:text-foreground disabled:opacity-30 text-xs leading-none"
                >▼</button>
              </div>
              <span className="text-sm font-medium text-muted-foreground w-6">#{idx + 1}</span>
              <div className="flex-1" />
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 text-destructive hover:text-destructive"
                onClick={() => remove(idx)}
              >
                <Trash2 className="w-3.5 h-3.5" />
              </Button>
            </div>

            <div className="flex gap-6 flex-wrap">
              {/* Image */}
              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">Background Image</Label>
                <ImageUploader
                  url={slide.image || undefined}
                  onUpload={(url) => update(idx, { image: url })}
                  onRemove={() => update(idx, { image: '' })}
                />
                <Input
                  className="w-48 text-xs h-7"
                  placeholder="or paste URL"
                  value={slide.image}
                  onChange={(e) => update(idx, { image: e.target.value })}
                />
              </div>

              {/* Text fields */}
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-3 min-w-0">
                <div className="space-y-1.5">
                  <Label className="text-xs text-muted-foreground">Title</Label>
                  <Input
                    value={slide.title}
                    onChange={(e) => update(idx, { title: e.target.value })}
                    placeholder="LIGHT."
                  />
                  <p className="text-[10px] text-muted-foreground">Rendered in light weight</p>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs text-muted-foreground">Subtitle</Label>
                  <Input
                    value={slide.subtitle}
                    onChange={(e) => update(idx, { subtitle: e.target.value })}
                    placeholder="SPACE."
                  />
                  <p className="text-[10px] text-muted-foreground">Highlighted in primary color</p>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs text-muted-foreground">Accent</Label>
                  <Input
                    value={slide.accent}
                    onChange={(e) => update(idx, { accent: e.target.value })}
                    placeholder="ATMOSPHERE."
                  />
                  <p className="text-[10px] text-muted-foreground">Second line, bold primary</p>
                </div>
              </div>
            </div>

            {/* Live preview */}
            {slide.image && (
              <div className="relative h-24 rounded overflow-hidden">
                <img src={slide.image} className="w-full h-full object-cover" alt="preview" />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute bottom-2 left-3 text-white text-xs font-light tracking-wide">
                  {slide.title} <span className="text-primary">{slide.subtitle}</span>
                  <span className="block font-semibold text-primary">{slide.accent}</span>
                </div>
              </div>
            )}
          </div>
        ))}

        {slides.length === 0 && (
          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center text-muted-foreground text-sm">
            No slides yet. Click "Add Slide" to create one.
          </div>
        )}
      </div>
    </div>
  )
}
