import { useState, useEffect } from "react";
import { Quote } from "lucide-react";

// Placeholder images - using Unsplash for realistic portraits
// In a real app, these would be local assets or optimized images
const testimonials = [
    {
        id: 1,
        name: "SOPHIA LOTNER",
        designation: "URBAN ELEGANCE",
        quote: "JDKS transformed our vision into reality. Their attention to detail and understanding of luxury living is unparalleled. Every corner of our home tells a story of craftsmanship.",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=988&auto=format&fit=crop",
    },
    {
        id: 2,
        name: "JAMES WILSON",
        designation: "MODERN LIVING",
        quote: "The team's ability to blend functionality with aesthetics is remarkable. They created a space that feels both expansive and intimate, perfectly suiting our lifestyle.",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=987&auto=format&fit=crop",
    },
    {
        id: 3,
        name: "ELENA RODRIGUEZ",
        designation: "COASTAL RETREAT",
        quote: "Working with JDKS was an absolute pleasure. Their innovative approach to design and dedication to quality resulted in a home that exceeds all our expectations.",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1061&auto=format&fit=crop",
    },
];

const Testimonials = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [prevIndex, setPrevIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((current) => {
                setPrevIndex(current);
                return (current + 1) % testimonials.length;
            });
        }, 3500);

        return () => clearInterval(interval);
    }, []);

    const testimonial = testimonials[currentIndex];

    return (
        <section className="bg-background py-20 md:py-28 overflow-hidden">
            <div className="container-custom">
                {/* Top Title */}
                <div className="text-center mb-16 md:mb-24">
                    <span className="text-xs md:text-sm font-medium uppercase tracking-[0.3em] text-primary/80">
                        TESTIMONIALS
                    </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-6xl mx-auto">
                    {/* Left Content - Quote & Text */}
                    <div className="order-2 lg:order-1 flex flex-col justify-center">
                        {/* Quote Icon */}
                        <div className="mb-8 text-primary/20">
                            <Quote size={64} style={{ transform: "scale(-1, 1)" }} strokeWidth={1.5} fill="currentColor" />
                        </div>

                        {/* Content Container with Key-based Animation Reset */}
                        <div key={testimonial.id} className="animate-fade-slide-up">
                            <blockquote className="text-xl md:text-2xl lg:text-3xl leading-relaxed text-muted-foreground font-light mb-10">
                                "{testimonial.quote}"
                            </blockquote>

                            <div className="flex flex-col gap-1">
                                <h3 className="text-lg font-bold text-foreground tracking-widest uppercase">
                                    {testimonial.name}
                                </h3>
                                <span className="text-xs font-semibold text-primary uppercase tracking-widest">
                                    {testimonial.designation}
                                </span>
                            </div>
                        </div>

                        {/* Carousel Indicators */}
                        <div className="flex gap-3 mt-12">
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => {
                                        setPrevIndex(currentIndex);
                                        setCurrentIndex(index);
                                    }}
                                    className={`h-1.5 rounded-full transition-all duration-500 ${index === currentIndex
                                        ? "w-8 bg-primary"
                                        : "w-1.5 bg-border hover:bg-primary/50"
                                        }`}
                                    aria-label={`Go to testimonial ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Right Content - Headshot */}
                    <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
                        <div className="relative w-full max-w-[400px] aspect-[4/5] bg-card/5 border border-border/5 p-2">
                            {/* Image Container with Cross-fade */}
                            <div className="relative w-full h-full overflow-hidden bg-muted">
                                {testimonials.map((item, index) => {
                                    let classes = "opacity-0 z-0";
                                    if (index === currentIndex) {
                                        classes = "animate-vertical-drop-reveal z-10 opacity-100";
                                    } else if (index === prevIndex) {
                                        classes = "z-0 opacity-100";
                                    }

                                    return (
                                        <img
                                            key={item.id}
                                            src={item.image}
                                            alt={item.name}
                                            className={`absolute inset-0 w-full h-full object-cover transition-none ${classes}`}
                                        />
                                    );
                                })}

                                {/* Overlay Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-40"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
