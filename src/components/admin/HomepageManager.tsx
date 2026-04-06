import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { ikSrc } from '@/lib/imagekit'
import type { Project } from '@/types/project'

interface HomepageManagerProps {
  projects: Project[]
  onChange: (projects: Project[]) => void
}

export function HomepageManager({ projects, onChange }: HomepageManagerProps) {
  const toggle = (id: string) => {
    onChange(projects.map((p) => (p.id === id ? { ...p, is_hero_project: !p.is_hero_project } : p)))
  }

  const move = (idx: number, direction: -1 | 1) => {
    const next = [...projects]
    const target = idx + direction
    if (target < 0 || target >= next.length) return
    ;[next[idx], next[target]] = [next[target], next[idx]]
    onChange(next)
  }

  const shown = projects.filter((p) => p.is_hero_project).length

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Homepage Projects</h2>
          <p className="text-sm text-muted-foreground">
            {shown} of {projects.length} projects shown on homepage. Toggle to show/hide. Use arrows to reorder.
          </p>
        </div>
      </div>

      <div className="space-y-2">
        {projects.map((p, idx) => (
          <div
            key={p.id}
            className={`flex items-center gap-4 p-3 border rounded-lg transition-colors ${
              p.is_hero_project ? 'border-primary/40 bg-primary/5' : 'border-border'
            }`}
          >
            {/* Order controls */}
            <div className="flex flex-col gap-0.5 shrink-0">
              <button
                type="button"
                onClick={() => move(idx, -1)}
                disabled={idx === 0}
                className="text-muted-foreground hover:text-foreground disabled:opacity-25 text-xs leading-none"
              >
                ▲
              </button>
              <button
                type="button"
                onClick={() => move(idx, 1)}
                disabled={idx === projects.length - 1}
                className="text-muted-foreground hover:text-foreground disabled:opacity-25 text-xs leading-none"
              >
                ▼
              </button>
            </div>

            {/* Thumbnail */}
            <div className="w-14 h-14 rounded overflow-hidden bg-muted shrink-0">
              {p.cover_images[0] ? (
                <img
                  src={ikSrc(p.cover_images[0])}
                  alt={p.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[10px] text-muted-foreground">
                  No img
                </div>
              )}
            </div>

            {/* Details */}
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate">{p.title || <span className="text-muted-foreground italic">Untitled</span>}</p>
              <p className="text-xs text-muted-foreground">
                {[p.style, p.area, p.date].filter(Boolean).join(' · ')}
              </p>
              {p.description && (
                <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{p.description}</p>
              )}
            </div>

            {/* Toggle */}
            <div className="flex items-center gap-2 shrink-0">
              <Label htmlFor={`hp-${p.id}`} className="text-xs text-muted-foreground cursor-pointer select-none">
                Show on homepage
              </Label>
              <Switch
                id={`hp-${p.id}`}
                checked={p.is_hero_project}
                onCheckedChange={() => toggle(p.id)}
              />
            </div>
          </div>
        ))}

        {projects.length === 0 && (
          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center text-muted-foreground text-sm">
            No projects yet. Add projects first.
          </div>
        )}
      </div>
    </div>
  )
}
