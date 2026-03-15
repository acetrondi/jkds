import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ProjectList } from '@/components/admin/ProjectList'
import { ProjectForm } from '@/components/admin/ProjectForm'
import { HeroManager } from '@/components/admin/HeroManager'
import { useAdminAuth } from '@/hooks/useAdminAuth'
import { useData } from '@/context/DataContext'
import { saveJSONToImageKit } from '@/lib/imagekit'
import { LogOut, Save, Loader2, CheckCircle2 } from 'lucide-react'
import type { Project } from '@/types/project'
import type { HeroSlide } from '@/types/hero'

type Tab = 'projects' | 'hero'
type SaveState = 'idle' | 'saving' | 'saved' | 'error'

export function AdminDashboard() {
  const { logout } = useAdminAuth()
  const { projects: liveProjects, heroSlides: liveHero, setProjects: setLiveProjects, setHeroSlides: setLiveHero } = useData()

  const [projects, setProjects] = useState<Project[]>(liveProjects)
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>(liveHero)
  const [tab, setTab] = useState<Tab>('projects')
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [formOpen, setFormOpen] = useState(false)
  const [saveState, setSaveState] = useState<SaveState>('idle')
  const [saveError, setSaveError] = useState('')

  const openNew = () => { setEditingProject(null); setFormOpen(true) }
  const openEdit = (project: Project) => { setEditingProject(project); setFormOpen(true) }

  const handleSaveProject = (project: Project) => {
    setProjects((prev) => {
      const idx = prev.findIndex((p) => p.id === project.id)
      if (idx >= 0) { const next = [...prev]; next[idx] = project; return next }
      return [...prev, project]
    })
    setFormOpen(false)
  }

  const handleDelete = (id: string) => setProjects((prev) => prev.filter((p) => p.id !== id))

  const handlePublish = async () => {
    setSaveState('saving')
    setSaveError('')
    try {
      await Promise.all([
        saveJSONToImageKit(projects, 'projects.json'),
        saveJSONToImageKit(heroSlides, 'hero.json'),
      ])
      // Update the live context so other pages immediately reflect changes
      setLiveProjects(projects)
      setLiveHero(heroSlides)
      setSaveState('saved')
      setTimeout(() => setSaveState('idle'), 3000)
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : 'Save failed')
      setSaveState('error')
      setTimeout(() => setSaveState('idle'), 4000)
    }
  }

  const tabs: { id: Tab; label: string }[] = [
    { id: 'projects', label: 'Projects' },
    { id: 'hero', label: 'Hero' },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="font-semibold text-sm">Admin</span>
            <nav className="flex gap-1">
              {tabs.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => setTab(id)}
                  className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                    tab === id
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  {label}
                </button>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-2">
            {/* Publish button */}
            <Button
              size="sm"
              onClick={handlePublish}
              disabled={saveState === 'saving'}
              variant={saveState === 'saved' ? 'outline' : 'default'}
              className={saveState === 'saved' ? 'border-green-500 text-green-600' : ''}
            >
              {saveState === 'saving' && <Loader2 className="w-4 h-4 mr-1.5 animate-spin" />}
              {saveState === 'saved' && <CheckCircle2 className="w-4 h-4 mr-1.5" />}
              {saveState === 'idle' || saveState === 'error' ? <Save className="w-4 h-4 mr-1.5" /> : null}
              {saveState === 'saving' ? 'Publishing…' : saveState === 'saved' ? 'Published!' : 'Publish'}
            </Button>

            <Button size="sm" variant="ghost" onClick={logout}>
              <LogOut className="w-4 h-4 mr-1" /> Logout
            </Button>
          </div>
        </div>
        {saveState === 'error' && (
          <div className="bg-destructive/10 border-b border-destructive/20 px-4 py-1.5 text-xs text-destructive text-center">
            {saveError}
          </div>
        )}
      </header>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {tab === 'projects' && (
          <ProjectList
            projects={projects}
            onEdit={openEdit}
            onDelete={handleDelete}
            onAdd={openNew}
          />
        )}
        {tab === 'hero' && (
          <HeroManager slides={heroSlides} onChange={setHeroSlides} />
        )}
      </main>

      <ProjectForm
        open={formOpen}
        project={editingProject}
        onSave={handleSaveProject}
        onClose={() => setFormOpen(false)}
      />
    </div>
  )
}
