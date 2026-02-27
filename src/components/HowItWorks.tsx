// How It Works section redesigned with circular architectural aesthetics.



const HowItWorks = () => {
  const stages = [
    { id: "01", title: "CONSULTATION", type: "outline" },
    { id: "02", title: "DESIGN", type: "filled" },
    { id: "03", title: "DEVELOPMENT", type: "outline" },
    { id: "04", title: "IMPLEMENTATION", type: "outline" },
  ];

  return (
    <section id="process" className="relative w-full min-h-screen bg-secondary py-20 px-6 md:px-12 lg:px-20 overflow-hidden text-foreground">
      {/* Header Info */}
      <div className="flex justify-between items-start mb-8 relative z-30">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-foreground" />
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] opacity-60">Stages of Work</span>
        </div>
        <div className="flex items-center gap-2 opacity-40">
          <span className="text-[11px] font-bold uppercase tracking-[0.1em]">hover to learn more</span>
          <span className="text-xs">←</span>
        </div>
      </div>

      {/* Main Stage Grid/Layout */}
      <div className="relative w-full max-w-[1200px] mx-auto h-[600px] mt-12 hidden lg:block">
        {/* 01 Consultation */}
        <div className="absolute top-[5%] left-[15%] w-[320px] h-[320px] rounded-full border border-foreground/20 flex flex-col items-center justify-center group hover:border-foreground transition-all duration-500 z-10">
          <span className="text-[10px] font-bold opacity-40 mb-2">01</span>
          <h3 className="text-xl font-bold tracking-widest">CONSULTATION</h3>
        </div>

        {/* 02 Design (Filled) */}
        <div className="absolute top-[0%] left-[45%] w-[380px] h-[380px] rounded-full bg-foreground text-background flex flex-col items-center justify-center shadow-2xl z-20 hover:scale-105 transition-transform duration-500 group">
          <span className="text-[10px] font-bold opacity-40 mb-2">02</span>
          <h3 className="text-2xl font-bold tracking-widest">DESIGN</h3>
        </div>

        {/* 03 Development */}
        <div className="absolute bottom-[0%] left-[50%] w-[350px] h-[350px] rounded-full border border-foreground/20 flex flex-col items-center justify-center group hover:border-foreground transition-all duration-500 z-10">
          <span className="text-[10px] font-bold opacity-40 mb-2">03</span>
          <h3 className="text-xl font-bold tracking-widest uppercase">Development</h3>
        </div>

        {/* 04 Implementation */}
        <div className="absolute bottom-[5%] left-[78%] w-[360px] h-[360px] rounded-full border border-foreground/20 flex flex-col items-center justify-center group hover:border-foreground transition-all duration-500 z-0">
          <span className="text-[10px] font-bold opacity-40 mb-2">04</span>
          <h3 className="text-xl font-bold tracking-widest uppercase">Implementation</h3>
        </div>

        {/* Big Decorative Curve at bottom left */}
        <div className="absolute bottom-[-100px] left-[-150px] w-[600px] h-[600px] rounded-full bg-foreground/5 blur-3xl -z-10" />
      </div>

      {/* Mobile/Tablet Layout */}
      <div className="lg:hidden flex flex-col gap-6 mt-12 relative z-20 items-center">
        {stages.map((stage) => (
          <div
            key={stage.id}
            className={`aspect-square w-full max-w-[280px] rounded-full flex flex-col items-center justify-center border transition-all duration-300
                        ${stage.type === 'filled' ? 'bg-foreground text-background border-transparent shadow-lg' : 'border-foreground/20 bg-transparent'}
                        `}
          >
            <span className="text-[10px] font-bold opacity-40 mb-2">{stage.id}</span>
            <h3 className="text-lg font-bold tracking-widest">{stage.title}</h3>
          </div>
        ))}
      </div>

      {/* Bottom Content Area */}
      <div className="relative lg:absolute bottom-0 lg:bottom-12 left-0 lg:left-20 max-w-sm z-30 mt-16 lg:mt-0 px-6 lg:px-0 text-center lg:text-left mx-auto lg:mx-0">
        <p className="text-sm md:text-base opacity-70 mb-8 leading-relaxed">
          We accompany you at every stage to make the process really comfortable and transparent.
        </p>

      </div>

      {/* Decorative Close/Cross at top center */}
      <div className="absolute top-8 md:top-12 left-1/2 -translate-x-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-foreground flex items-center justify-center text-background cursor-pointer hover:scale-110 transition-transform z-30">
        <span className="text-xl">×</span>
      </div>

      {/* Top Right Icons (Minimal) */}
      <div className="absolute top-8 md:top-12 right-6 md:right-12 lg:right-20 flex flex-col gap-6 z-30 opacity-40 hidden md:flex">
        <div className="w-4 h-4 border border-foreground rotate-45" />
        <div className="w-4 h-4 rounded-full border border-foreground" />
        <div className="w-4 h-4 border-foreground border-t-2 border-r-2 -rotate-45" />
      </div>
    </section>
  );
};

export default HowItWorks;
