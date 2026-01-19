import { ArrowUpRight, Play } from "lucide-react";
import heroBedroomRender from "@/assets/hero-bedroom-render.jpg";
import interior1 from "@/assets/interior-1.jpg";
import interior2 from "@/assets/interior-2.jpg";
import heroHall from "@/assets/hero-hall.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-end overflow-hidden pb-12 lg:pb-16">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroHall}
          alt="Luxury bedroom interior visualization"
          className="w-full h-full object-cover"
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-transparent" />
      </div>

      {/* Gold Play Button - Center Right */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 z-20 hidden lg:flex">
        <button className="w-24 h-24 rounded-full bg-primary flex items-center justify-center hover:scale-105 transition-transform duration-300 shadow-lg">
          <Play className="w-8 h-8 text-background fill-background ml-1" />
        </button>
      </div>

      {/* Content */}
      <div className="container-custom relative z-10 w-full">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          {/* Left Content - Headlines */}
          <div className="space-y-4">
            <div className="space-y-0">
              <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light tracking-wider leading-[0.95]">
                LIGHT<span className="text-primary">.</span> <span className="text-primary">SPACE.</span>
              </h1>
              <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light tracking-wider leading-[0.95]">
                ATMOSPHERE<span className="text-primary">.</span>
              </h1>
            </div>

            {/* CTA Button */}
            <div className="pt-6">
              <button className="inline-flex items-center gap-4 bg-foreground text-background rounded-full pl-8 pr-2 py-2 hover:bg-foreground/90 transition-colors group">
                <span className="text-sm font-medium tracking-wide uppercase">Request a Quote</span>
                <span className="w-10 h-10 rounded-full border border-background/20 flex items-center justify-center group-hover:bg-background/10 transition-colors">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </button>
            </div>
          </div>

          {/* Right Content - Vertical Text with Images */}
          <div className="hidden lg:block max-w-xs">
            <div className="space-y-3 text-right">
              <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
                Photorealistic
              </p>
              <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
                Visualizations
              </p>
              <div className="flex items-center justify-end gap-2">
                <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
                  That
                </p>
                <div className="w-8 h-8 rounded-full overflow-hidden border border-primary/30">
                  <img src={interior1} alt="" className="w-full h-full object-cover" />
                </div>
                <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
                  Showcase
                </p>
              </div>
              <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
                Your Ideas Before
              </p>
              <div className="flex items-center justify-end gap-2">
                <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
                  They're
                </p>
                <div className="w-6 h-6 rounded-full overflow-hidden border border-primary/30">
                  <img src={interior2} alt="" className="w-full h-full object-cover" />
                </div>
                <p className="text-sm uppercase tracking-[0.2em] text-primary font-medium">
                  Built.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
