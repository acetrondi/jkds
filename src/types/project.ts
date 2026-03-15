export interface Project {
  id: string
  title: string
  description: string
  images: string[]
  cover_images: string[]
  is_hero_project: boolean
  area: string
  style: string
  date: string
  testimonial: {
    text: string
    image: string
    video: string
  }
}
