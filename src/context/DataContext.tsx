import { createContext, useContext, useState, type ReactNode } from 'react'
import type { Project } from '@/types/project'
import type { HeroSlide } from '@/types/hero'
import type { Testimonial } from '@/types/testimonial'
import projectsFallback from '@/data/projects.json'
import heroFallback from '@/data/hero.json'
import testimonialsFallback from '@/data/testimonials.json'

interface DataContextValue {
  projects: Project[]
  heroSlides: HeroSlide[]
  testimonials: Testimonial[]
  setProjects: (p: Project[]) => void
  setHeroSlides: (h: HeroSlide[]) => void
  setTestimonials: (t: Testimonial[]) => void
}

const DataContext = createContext<DataContextValue | null>(null)

export function DataProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>(projectsFallback as Project[])
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>(heroFallback as HeroSlide[])
  const [testimonials, setTestimonials] = useState<Testimonial[]>(testimonialsFallback as Testimonial[])

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
