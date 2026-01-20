import { useState } from "react";
import siteData from "@/data/site-data.json";

// Projects section using central site-data.json

const Projects = () => {
  const [hoveredIndex, setHoveredIndex] = useState(2); // Middle one expanded by default
  const projectsData = siteData.projects;


  return (
    <section id="projects" className="relative w-full min-h-screen bg-[#050505] py-24 px-6 md:px-12 flex flex-col items-center justify-center overflow-hidden">
      {/* Background Subtle Texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]" />

      {/* Header */}
      <div className="relative z-10 text-center mb-16">
        <h2 className="text-6xl md:text-8xl lg:text-9xl font-light tracking-widest text-white uppercase flex flex-col items-center">
          <span className="text-transparent font-serif italic" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.3)' }}>OUR</span>
          <span className="mt-[-0.2em] font-black tracking-tighter">PROJECTS</span>
        </h2>
      </div>

      {/* Accordion Container */}
      <div className="relative z-10 w-full max-w-[1400px] flex flex-col lg:flex-row gap-4 h-auto lg:h-[600px]">
        {projectsData.map((project, index) => (
          <div
            key={index}
            onMouseEnter={() => setHoveredIndex(index)}
            onClick={() => setHoveredIndex(index)} // Allow click on mobile
            className={`relative transition-all duration-700 ease-[cubic-bezier(0.4, 0, 0.2, 1)] rounded-[24px] lg:rounded-[32px] overflow-hidden cursor-pointer group 
              ${hoveredIndex === index ? 'h-[400px] lg:h-full lg:flex-[4]' : 'h-[80px] lg:h-full lg:flex-[1]'}`}
          >
            {/* Project Image */}
            <img
              src={project.image}
              alt={project.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
            />

            {/* Overlay - Darker on mobile for readability */}
            <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-500 
              ${hoveredIndex === index ? 'opacity-100' : 'opacity-70'}`}
            />

            {/* Content */}
            <div className="absolute inset-0 p-6 lg:p-8 flex flex-col justify-end items-center text-center">
              <div className={`transition-all duration-500 transform 
                ${hoveredIndex === index ? 'translate-y-0 opacity-100' : 'translate-y-2 lg:translate-y-4 opacity-100 lg:opacity-100'}`}
              >
                <h3 className={`font-bold transition-all duration-300 whitespace-nowrap text-white
                  ${hoveredIndex === index ? 'text-2xl md:text-3xl mb-2 lg:mb-4' : 'text-lg lg:text-base lg:uppercase lg:tracking-widest lg:rotate-[-90] lg:rotate-0'}`}
                >
                  {project.title}
                </h3>

                {hoveredIndex === index && (
                  <p className="text-sm md:text-base text-white/80 max-w-sm mx-auto animate-fade-in pb-2 hidden sm:block">
                    {project.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
