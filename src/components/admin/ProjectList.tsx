import { Button } from '@/components/ui/button'
import { Pencil, Trash2, Plus } from 'lucide-react'
import type { Project } from '@/types/project'

interface ProjectListProps {
  projects: Project[]
  onEdit: (project: Project) => void
  onDelete: (id: string) => void
  onAdd: () => void
}

export function ProjectList({ projects, onEdit, onDelete, onAdd }: ProjectListProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Projects ({projects.length})</h2>
        <Button size="sm" onClick={onAdd}>
          <Plus className="w-4 h-4 mr-1" /> Add Project
        </Button>
      </div>

      <div className="rounded-lg border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground w-16">Thumb</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">Title</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden md:table-cell">Style</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden md:table-cell">Date</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden sm:table-cell">Hero</th>
              <th className="text-right px-4 py-3 font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {projects.map((project) => (
              <tr key={project.id} className="hover:bg-muted/30 transition-colors">
                <td className="px-4 py-3">
                  {project.cover_images[0] ? (
                    <img
                      src={project.cover_images[0]}
                      alt={project.title}
                      className="w-12 h-10 object-cover rounded"
                    />
                  ) : (
                    <div className="w-12 h-10 rounded bg-muted flex items-center justify-center text-[10px] text-muted-foreground">
                      None
                    </div>
                  )}
                </td>
                <td className="px-4 py-3">
                  <div className="font-medium">{project.title}</div>
                  <div className="text-xs text-muted-foreground">{project.id}</div>
                </td>
                <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{project.style}</td>
                <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{project.date}</td>
                <td className="px-4 py-3 hidden sm:table-cell">
                  {project.is_hero_project ? (
                    <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">Yes</span>
                  ) : (
                    <span className="text-xs text-muted-foreground">No</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8"
                      onClick={() => onEdit(project)}
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 text-destructive hover:text-destructive"
                      onClick={() => {
                        if (confirm(`Delete "${project.title}"?`)) onDelete(project.id)
                      }}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
            {projects.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">
                  No projects yet. Click "Add Project" to create one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
