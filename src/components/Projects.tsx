import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// Only defining existing images from the previous component to avoid breakage, 
// using generic unsplash placeholders for better quality if needed, 
// or reusing the imports.
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";
import project5 from "@/assets/project-5.jpg";

const projects = [
  {
    image: project1,
    title: "RESIDENTIAL INTERIORS",
    category: "Luxury Penthouse",
    area: "150m²",
    style: "Minimalism",
    date: "2024",
  },
  {
    image: project2,
    title: "ELYSIA VILLAS",
    category: "Modern Villa Complex",
    area: "320m²",
    style: "Contemporary",
    date: "2023",
  },
  {
    image: project3,
    title: "GRAND MAISON",
    category: "Classic Residence",
    area: "450m²",
    style: "Neoclassical",
    date: "2024",
  },
  {
    image: project4,
    title: "SERENITY RETREAT",
    category: "Peaceful Escape",
    area: "200m²",
    style: "Zen",
    date: "2023",
  },
  {
    image: project5,
    title: "ARBOR ESTATE",
    category: "Nature Home",
    area: "500m²",
    style: "Organic",
    date: "2024",
  },
];

const Projects = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const currentProject = projects[currentIndex];
  // Format index as "01", "02", etc.
  const displayIndex = (currentIndex + 1).toString().padStart(2, '0');

  return (
    <section className="relative w-full h-screen overflow-hidden bg-background">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/60 z-10" />
        {projects.map((project, index) => (
          <img
            key={index}
            src={project.image}
            alt={project.title}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'
              }`}
          />
        ))}
      </div>

      {/* Content Container */}
      <div className="relative z-20 h-full w-full flex flex-col justify-center sm:justify-start sm:pt-40 container-custom">

        {/* Massive Background Numeral */}
        {/* We use a key to re-trigger animation on change if desired, or just simple transition */}


        {/* Main Title */}
        <div className="relative z-10 max-w-4xl">
          <h2
            key={`title-${currentIndex}`}
            className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-4 animate-title-reveal"
          >
            {currentProject.title}
          </h2>
        </div>

        {/* Floating Details Card */}
        <div
          key={`card-${currentIndex}`}
          className="absolute right-4 bottom-32 md:right-20 md:bottom-20 w-[280px] bg-black/40 backdrop-blur-md border border-white/10 p-8 rounded-none animate-reveal-mask"
        >
          <div className="flex justify-between items-center py-3 border-b border-white/10">
            <span className="text-xs uppercase tracking-widest text-muted-foreground">Area</span>
            <span className="text-sm font-medium text-white">{currentProject.area}</span>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-white/10">
            <span className="text-xs uppercase tracking-widest text-muted-foreground">Style</span>
            <span className="text-sm font-medium text-white">{currentProject.style}</span>
          </div>
          <div className="flex justify-between items-center py-3">
            <span className="text-xs uppercase tracking-widest text-muted-foreground">Date</span>
            <span className="text-sm font-medium text-white">{currentProject.date}</span>
          </div>
        </div>

        {/* Navigation */}
        <div className="absolute left-6 bottom-10 md:left-20 md:bottom-20 flex gap-4 z-30">
          <Button
            variant="outline"
            size="icon"
            onClick={handlePrev}
            className="h-12 w-12 rounded-full border border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white hover:border-white transition-all duration-300"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={handleNext}
            className="h-12 w-12 rounded-full border border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white hover:border-white transition-all duration-300"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

      </div>
    </section >
  );
};

export default Projects;
