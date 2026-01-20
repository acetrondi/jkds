import { useState, useEffect } from "react";
import { Play, Quote } from "lucide-react";
import siteData from "@/data/site-data.json";

const Testimonials = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const testimonials = siteData.testimonials;

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((current) => (current + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [testimonials.length]);

    const testimonial = testimonials[currentIndex];

    return (
        <section id="testimonials" className="relative w-full min-h-[800px] bg-black overflow-hidden py-24 border-b-2 border-white/5">
            {/* Background Video */}
            <div className="absolute inset-0 z-0">
                <video
                    key={testimonial.videoUrl}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover opacity-60 transition-opacity duration-1000"
                >
                    <source src={testimonial.videoUrl} type="video/mp4" />
                </video>
                {/* Overlay darkening */}
                <div className="absolute inset-0 bg-black/40" />
            </div>

            {/* Top Brand Stripe (Subtle Grid) */}
            <div className="absolute top-0 left-0 w-full h-24 border-b border-white/5 z-10 hidden lg:flex">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="flex-1 border-r border-white/5" />
                ))}
            </div>

            <div className="relative z-10 container-custom h-full flex flex-col justify-center gap-12 lg:gap-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Left side: Promo Video Trigger */}
                    <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-4 order-2 lg:order-1">
                        <button className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center group hover:bg-primary/40 transition-all duration-500">
                            <Play className="w-8 h-8 text-primary fill-primary" />
                        </button>
                        <span className="text-white text-sm font-bold tracking-[0.3em] uppercase opacity-70">
                            View Promo Video
                        </span>
                    </div>

                    {/* Right side: Testimonial Card */}
                    <div className="flex justify-center lg:justify-end order-1 lg:order-2">
                        <div className="w-full max-w-[500px] bg-black/95 backdrop-blur-md p-8 md:p-14 relative group border border-white/10">
                            {/* Decorative Quote Mark */}
                            <Quote className="absolute right-6 bottom-6 md:right-10 md:bottom-10 w-16 h-16 md:w-20 md:h-20 text-white/[0.03] pointer-events-none" />

                            <h2 className="text-white text-lg md:text-2xl font-bold tracking-[0.2em] mb-8 md:mb-10 uppercase">
                                What Client's Say?
                            </h2>

                            <div key={currentIndex} className="animate-fade-in space-y-6 md:space-y-8">
                                <p className="text-white/60 text-sm md:text-lg leading-relaxed font-light italic">
                                    "{testimonial.quote}"
                                </p>

                                <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden border border-white/10">
                                        <img
                                            src={testimonial.image}
                                            alt={testimonial.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-white font-bold tracking-wider uppercase text-xs md:text-sm">
                                            {testimonial.name}
                                        </span>
                                        <span className="text-primary text-[9px] md:text-[10px] font-bold tracking-widest uppercase opacity-80">
                                            {testimonial.designation}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Indicators */}
                            <div className="flex gap-3 mt-8 md:mt-12">
                                {testimonials.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentIndex(index)}
                                        className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex ? "bg-primary" : "bg-white/20"
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Brand Logo Stripe at bottom */}
                <div className="pt-20 border-t border-white/5 flex flex-wrap justify-between items-center gap-8 opacity-40 hover:opacity-100 transition-opacity">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="flex flex-col items-center scale-75 md:scale-100 grayscale hover:grayscale-0 transition-all gap-2">
                            {/* Minimalist Brand Symbol Icons */}
                            <div className="border border-white/40 p-3 rotate-45 mb-2 transition-transform hover:rotate-90">
                                <div className="w-4 h-4 border border-white/60" />
                            </div>
                            <span className="text-[10px] tracking-widest uppercase font-black text-white">STUDIO {i + 1}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
