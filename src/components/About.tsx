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
            { threshold: 0.2 }
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
        <section id="about" ref={ref} className="w-full bg-background py-20 md:py-[120px]">
            <div className="max-w-[1320px] mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Text Content */}
                    <div className={`flex flex-col items-start text-left order-2 lg:order-1 ${isVisible ? 'animate-slide-in-left' : 'opacity-0'}`}>
                        <span className="text-[13px] md:text-[14px] font-medium uppercase tracking-[0.2em] text-primary mb-6">
                            About Us
                        </span>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-foreground mb-8 leading-[1.1] tracking-tight">
                            Crafting spaces <br className="hidden lg:block" />
                            that inspire living
                        </h2>
                        <div className="space-y-8 text-muted-foreground text-base md:text-lg leading-relaxed font-light max-w-xl">
                            <p>
                                At JDKS, we believe in thoughtful creation—spaces that transcend
                                mere aesthetics to become sanctuaries of modern living. Our approach
                                combines architectural precision with an intimate understanding of how
                                people truly inhabit their environments.
                            </p>
                            <p>
                                For over four decades, we've crafted luxury residences that speak to the
                                soul. Each project is a collaboration—a dialogue between vision and
                                reality, between the timeless and the contemporary.
                            </p>
                        </div>
                        <div className="mt-12">
                            <Button
                                variant="outline"
                                className="h-auto rounded-none border border-primary/30 bg-transparent px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-primary transition-all hover:border-primary hover:bg-primary hover:text-black"
                            >
                                Discover Our Story
                            </Button>
                        </div>
                    </div>

                    {/* Image Content */}
                    <div className="relative order-1 lg:order-2 flex justify-center lg:justify-end">
                        <div className={`relative aspect-[4/5] w-full max-w-[500px] overflow-hidden bg-muted ${isVisible ? 'animate-reveal-mask' : 'opacity-0'}`}>
                            <div className="absolute inset-0 bg-primary/10 mix-blend-overlay z-10"></div>
                            <img
                                src={potrait}
                                alt="potrait"
                                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
