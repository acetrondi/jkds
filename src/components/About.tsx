import { useEffect, useRef, useState } from "react";
import potrait from "@/assets/about-img.jpg";

const About = () => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.1 }
        );

        if (ref.current) observer.observe(ref.current);
        return () => {
            if (ref.current) observer.unobserve(ref.current);
        };
    }, []);

    return (
        <section id="about" ref={ref} className="w-full bg-[#f3f0e8] py-20 md:py-32 px-6 md:px-12 lg:px-20 text-[#1a1a1a] overflow-hidden">
            <div className="max-w-[1440px] mx-auto">
                {/* Header info */}
                <div className="flex justify-between items-start mb-20 md:mb-32">
                    <div className="flex items-center gap-2">
                        <span className="text-xl font-bold tracking-tight uppercase">JKDS</span>
                        <span className="text-[10px] font-medium opacity-50 uppercase tracking-widest mt-1">Studio</span>
                    </div>
                    <div className="flex flex-col items-end">
                        <div className="flex items-center gap-4 group">
                            <span className="text-[10px] font-bold opacity-30">01</span>
                            <div className="flex flex-col">
                                <div className="w-12 h-[1px] bg-[#1a1a1a] mb-1 opacity-20"></div>
                                <span className="text-[14px] font-bold tracking-wide uppercase">The Philosophy</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 relative mb-24">
                    {/* Left Column - The Persona */}
                    <div className="lg:col-span-4 flex flex-col order-2 lg:order-1">
                        <div className={`relative mb-12 ${isVisible ? 'animate-reveal-mask' : 'opacity-0'} w-full`}>
                            <div className="aspect-[3/4] overflow-hidden grayscale contrast-[1.1] brightness-[0.9]">
                                <img
                                    src={potrait}
                                    alt="Jash Kadakia"
                                    className="h-full w-full object-cover hover:scale-105 transition-transform duration-700"
                                />
                            </div>
                        </div>
                        <div className="space-y-6">
                            <h4 className="text-sm font-bold uppercase tracking-widest opacity-40">Founding Vision</h4>
                            <p className="text-base leading-relaxed opacity-80">
                                Founded by architect Jash Kadakia, our studio is grounded in the belief
                                that good design doesn’t shout, it listens. It understands what you need
                                before you can articulate it.
                            </p>
                            <p className="text-sm italic opacity-60">
                                "We don’t follow trends, we follow you."
                            </p>
                        </div>
                    </div>

                    {/* Right Column - The Story */}
                    <div className="lg:col-span-8 flex flex-col justify-between order-1 lg:order-2">
                        <div className="relative mb-16 lg:mb-24">
                            <h2 className="text-5xl md:text-7xl lg:text-[7.5vw] font-bold leading-[0.9] tracking-tighter relative z-10">
                                Architecture <br className="hidden md:block" /> begins with <br className="hidden md:block" />
                                <span className="italic font-light">listening.</span>
                            </h2>
                        </div>

                        <div className="max-w-2xl space-y-8">
                            <p className="text-xl md:text-2xl lg:text-3xl leading-snug tracking-tight font-medium text-balance">
                                At JKDS, we don’t just design spaces we help people tell their stories through light, spatial flow, and lived-in comfort.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-base leading-relaxed opacity-75">
                                <p>
                                    Every home begins with a conversation about YOU: your rhythm, your rituals, and your way of living. Whether a 1,000 sq. ft. apartment or a sprawling Lonavala villa, we anchor every project in three elements: light, volume, and human experience.
                                </p>
                                <p>
                                    With over a decade of experience across residential and retail, our focus remains singular: crafting honest, grounded spaces that feel like an exhale. We work with clean lines, natural materials, and a quiet sense of purpose.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Recognition - New Section for Authority */}
                <div className="border-t border-[#1a1a1a]/10 pt-16 grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div>
                        <h5 className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40 mb-6">Selected Clients</h5>
                        <ul className="text-sm space-y-2 font-medium opacity-70">
                            <li>Nirmaan Group</li>
                            <li>Trading & Shipping Entities</li>
                            <li>Private Healthcare Clinics</li>
                            <li>Legacy Builders</li>
                        </ul>
                    </div>
                    <div>
                        <h5 className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40 mb-6">Publications</h5>
                        <ul className="text-sm space-y-2 font-medium opacity-70">
                            <li>Architect’s Diary</li>
                            <li>Architects & Interiors India</li>
                            <li>Home Publication</li>
                        </ul>
                    </div>
                    <div>
                        <h5 className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40 mb-6">Recognition</h5>
                        <ul className="text-sm space-y-2 font-medium opacity-70">
                            <li>FOAID Felicitated</li>
                            <li>Acetech Excellence</li>
                            <li>10+ Years of Craftsmanship</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;