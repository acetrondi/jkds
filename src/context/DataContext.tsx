import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import type { Project } from '@/types/project'
import type { HeroSlide } from '@/types/hero'
import projectsFallback from '@/data/projects.json'
import heroFallback from '@/data/hero.json'
import { IK_ENDPOINT } from '@/lib/imagekit'

interface DataContextValue {
  projects: Project[]
  heroSlides: HeroSlide[]
  setProjects: (p: Project[]) => void
  setHeroSlides: (h: HeroSlide[]) => void
}

const DataContext = createContext<DataContextValue | null>(null)

async function fetchJSON<T>(url: string): Promise<T> {
  const res = await fetch(`${url}?t=${Date.now()}`, { cache: 'no-store' })
  if (!res.ok) throw new Error(`${res.status}`)
  return res.json()
}

export function DataProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>(projectsFallback as Project[])
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>(heroFallback as HeroSlide[])

  useEffect(() => {
    Promise.all([
      fetchJSON<Project[]>(`${IK_ENDPOINT}/config/projects.json`),
      fetchJSON<HeroSlide[]>(`${IK_ENDPOINT}/config/hero.json`),
    ])
      .then(([p, h]) => {
        setProjects(p)
        setHeroSlides(h)
      })
      .catch(() => {
        // ImageKit config files not uploaded yet — bundled data stays active
      })
  }, [])

  return (
    <DataContext.Provider value={{ projects, heroSlides, setProjects, setHeroSlides }}>
      {children}
    </DataContext.Provider>
  )
}

export function useData() {
  const ctx = useContext(DataContext)
  if (!ctx) throw new Error('useData must be used within DataProvider')
  return ctx
}
