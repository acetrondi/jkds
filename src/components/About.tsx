import { Button } from "@/components/ui/button";
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

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, []);

    return (
        <section id="about" ref={ref} className="w-full bg-[#f3f0e8] py-16 md:py-24 px-6 md:px-12 lg:px-20 text-[#1a1a1a] overflow-hidden">
            <div className="max-w-[1440px] mx-auto">
                {/* Header info */}
                <div className="flex justify-between items-start mb-24">
                    <div className="flex items-center gap-2">
                        <span className="text-xl font-bold tracking-tight uppercase">JDKS</span>
                        <span className="text-[10px] font-medium opacity-50 uppercase tracking-widest mt-1">Design</span>
                    </div>
                    <div className="flex flex-col items-end">
                        <div className="flex items-center gap-4 group">
                            <span className="text-[10px] font-bold opacity-30">01</span>
                            <div className="flex flex-col">
                                <div className="w-12 h-[1px] bg-[#1a1a1a] mb-1 opacity-20"></div>
                                <span className="text-[14px] font-bold tracking-wide uppercase">About</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 relative">
                    {/* Left Column */}
                    <div className="lg:col-span-4 flex flex-col pt-4 order-2 lg:order-1">
                        <p className="text-base md:text-lg leading-relaxed mb-12 lg:mb-16 opacity-80 max-w-md lg:max-w-xs text-foreground">
                            My name is Jash Kadakiia. I founded this studio not to build more — but to build better. With care, restraint, and meaning. JDKS is a space for slow creation.
                        </p>

                        <div className={`relative ${isVisible ? 'animate-reveal-mask' : 'opacity-0'} w-full max-w-[400px] lg:max-w-none`}>
                            <div className="aspect-[3/4] overflow-hidden grayscale contrast-[1.1]">
                                <img
                                    src={potrait}
                                    alt="Jash Kadakiia"
                                    className="h-full w-full object-cover"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="lg:col-span-8 flex flex-col justify-between pt-4">
                        <div className="relative mb-24 lg:mb-0">
                            {/* Headline Shadow Effect */}
                            <div className="absolute top-6 left-6 opacity-[0.05] pointer-events-none select-none hidden md:block">
                                <h2 className="text-7xl md:text-8xl lg:text-[10vw] font-bold leading-[0.85] tracking-tighter">
                                    Architecture begins<br />with listening
                                </h2>
                            </div>
                            <h2 className="text-5xl md:text-7xl lg:text-[9vw] font-bold leading-[0.85] tracking-tighter relative z-10">
                                Architecture begins<br />with listening
                            </h2>
                        </div>

                        <div className="max-w-xl md:max-w-2xl mt-auto pt-16 lg:pt-0">
                            <p className="text-lg md:text-2xl lg:text-3xl leading-[1.3] tracking-tight opacity-70 font-medium">
                                JDKS is a space for slow creation. We design private residences and villas with a personal, hands-on approach — from the very first sketch to the last presence on site.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
