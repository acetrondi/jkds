import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import type { Project } from '@/types/project'
import type { HeroSlide } from '@/types/hero'
import type { Testimonial } from '@/types/testimonial'
import projectsFallback from '@/data/projects.json'
import heroFallback from '@/data/hero.json'
import testimonialsFallback from '@/data/testimonials.json'
import { IK_ENDPOINT } from '@/lib/imagekit'

interface DataContextValue {
  projects: Project[]
  heroSlides: HeroSlide[]
  testimonials: Testimonial[]
  setProjects: (p: Project[]) => void
  setHeroSlides: (h: HeroSlide[]) => void
  setTestimonials: (t: Testimonial[]) => void
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
  const [testimonials, setTestimonials] = useState<Testimonial[]>(testimonialsFallback as Testimonial[])

  useEffect(() => {
    // Only fetch hero and testimonials from ImageKit. We force local JSON for projects.
    Promise.all([
      fetchJSON<HeroSlide[]>(`${IK_ENDPOINT}/config/hero.json`),
      fetchJSON<Testimonial[]>(`${IK_ENDPOINT}/config/testimonials.json`),
    ])
      .then(([h, t]) => {
        setHeroSlides(h)
        setTestimonials(t)
      })
      .catch((e) => {
        console.warn('Failed to fetch config from ImageKit:', e);
      })
  }, [])

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
