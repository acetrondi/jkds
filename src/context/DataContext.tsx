import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import type { Project } from '@/types/project'
import type { HeroSlide } from '@/types/hero'
import type { Testimonial } from '@/types/testimonial'

interface DataContextValue {
  projects: Project[]
  heroSlides: HeroSlide[]
  testimonials: Testimonial[]
  setProjects: (p: Project[]) => void
  setHeroSlides: (h: HeroSlide[]) => void
  setTestimonials: (t: Testimonial[]) => void
}

const DataContext = createContext<DataContextValue | null>(null)

async function fetchJSON<T>(path: string): Promise<T> {
  const res = await fetch(`${path}?t=${Date.now()}`, { cache: 'no-store' })
  if (!res.ok) throw new Error(`${res.status}`)
  return res.json()
}

export function DataProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>([])
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>([])
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    Promise.all([
      fetchJSON<Project[]>('/data/projects.json'),
      fetchJSON<HeroSlide[]>('/data/hero.json'),
      fetchJSON<Testimonial[]>('/data/testimonials.json'),
    ])
      .then(([p, h, t]) => {
        setProjects(p)
        setHeroSlides(h)
        setTestimonials(t)
        setLoaded(true)
      })
      .catch((e) => {
        console.error('Failed to load data:', e)
        setLoaded(true)
      })
  }, [])

  if (!loaded) return null

  return (
    <DataContext.Provider value={{ projects, heroSlides, testimonials, setProjects, setHeroSlides, setTestimonials }}>
      {children}
    </DataContext.Provider>
  )
}

export function useData() {
  const ctx = useContext(DataContext)
  if (!ctx) throw new Error('useData must be used within DataProvider')
  return ctx
}
