import { useState } from "react";

const HowItWorks = () => {
  const [hoveredCircle, setHoveredCircle] = useState<string | null>(null);

  const stages = [
    { id: "01", title: "UNDERSTANDING" },
    { id: "02", title: "CONCEPTUALIZING" },
    { id: "03", title: "DESIGNING" },
    { id: "04", title: "VISUALIZATION" },
    { id: "05", title: "COMMERCIALIZING" },
    { id: "06", title: "SELECTIONS" },
    { id: "07", title: "EXECUTING" },
  ];

  const services = [
    "Architecture Design",
    "Interior Design",
    "Design & Build"
  ];

  const activeCircle = hoveredCircle || "01";

  return (
    <section id="process" className="relative w-full min-h-[100dvh] bg-secondary pt-24 pb-8 md:py-20 px-4 md:px-8 lg:px-12 overflow-hidden text-foreground flex flex-col justify-between">
      {/* Header Info */}
      <div className="flex justify-between items-start shrink-0 relative z-30">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-foreground" />
          <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] opacity-60">Process & Expertise</span>
        </div>
        <div className="flex items-center gap-2 opacity-40">
          <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.1em] hidden md:block">hover to learn more</span>
          <span className="text-xs">←</span>
        </div>
      </div>

      <div className="w-full max-w-[1440px] mx-auto flex-1 flex flex-col justify-center gap-12 md:gap-16 mt-8 md:mt-0">
        
        {/* Process Stages */}
        <div className="relative w-full flex flex-wrap justify-center items-center gap-3 sm:gap-4 lg:gap-8 z-20 max-w-[340px] md:max-w-none mx-auto">
          {stages.map((stage, i) => {
            const isFilled = activeCircle === stage.id;
            const translateY = i % 2 === 0 ? 'md:-translate-y-4 lg:-translate-y-6' : 'md:translate-y-4 lg:translate-y-6';
            
            return (
              <div 
                key={stage.id} 
                onMouseEnter={() => setHoveredCircle(stage.id)}
                onMouseLeave={() => setHoveredCircle(null)}
                className={`w-[90px] h-[90px] sm:w-[100px] sm:h-[100px] md:w-[120px] md:h-[120px] lg:w-[140px] lg:h-[140px] xl:w-[160px] xl:h-[160px] rounded-full flex flex-col items-center justify-center transition-all duration-500 group relative z-10 cursor-pointer shadow-sm
                  ${translateY} hover:z-20
                  ${isFilled 
                    ? 'bg-foreground text-background shadow-xl scale-110 md:scale-105' 
                    : 'border border-foreground/30 hover:border-foreground bg-transparent scale-95 md:scale-100'
                  }`}
              >
                <span className={`text-[8px] md:text-[10px] font-bold md:mb-1 transition-opacity duration-300 ${isFilled ? 'opacity-80' : 'opacity-40'}`}>{stage.id}</span>
                <h3 className="text-[6.5px] sm:text-[8px] md:text-[9px] lg:text-[11px] font-bold tracking-widest text-center px-1 md:px-2 uppercase leading-tight">{stage.title}</h3>
              </div>
            );
          })}
          
          {/* Decorative Curve */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[600px] rounded-full bg-foreground/5 blur-3xl -z-10 pointer-events-none" />
        </div>

        {/* Services Section */}
        <div className="relative z-20 w-full mb-4 md:mb-0">
            <h5 className="text-[9px] lg:text-[10px] font-bold uppercase tracking-[0.2em] opacity-40 mb-4 md:mb-6 text-center">What we do</h5>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6 lg:gap-8">
               {services.map((service, idx) => (
                  <div key={idx} className="border border-foreground/20 py-4 px-5 md:p-6 lg:p-8 flex flex-row md:flex-col group hover:bg-foreground hover:text-background transition-colors duration-500 cursor-default shadow-sm hover:shadow-lg rounded-sm items-center md:items-start text-left justify-between md:justify-start">
                    <span className="text-[9px] lg:text-[10px] font-bold opacity-40 md:mb-4 lg:mb-6 uppercase tracking-widest order-2 md:order-1">0{idx + 1}</span>
                    <h3 className="text-base md:text-lg lg:text-2xl font-medium tracking-tight leading-snug order-1 md:order-2">
                      {service}
                    </h3>
                  </div>
               ))}
            </div>
        </div>
      </div>
      
    </section>
  );
};

export default HowItWorks;
