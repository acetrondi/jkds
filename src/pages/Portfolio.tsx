import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useData } from "@/context/DataContext";

const Portfolio = () => {
    const navigate = useNavigate();
    const { projects: projectsData } = useData();

    // Randomize the gallery items on mount
    const galleryItems = useMemo(() => {
        const items = projectsData.flatMap(project =>
            project.images.map((image, idx) => ({
                ...project,
                displayImage: image,
                uniqueKey: `${project.id}-${idx}`,
                // Adding some slight randomness for height to truly mimic pinterest
                randomHeight: 0
            }))
        );

        // Fisher-Yates shuffle for true randomization
        const shuffled = [...items];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }, [projectsData]);

    return (
        <div className="min-h-screen bg-white text-black">
            <Navbar />

            <main className="pt-32 pb-20 px-4 md:px-8">
                <header className="max-w-7xl mx-auto mb-16 text-center">
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4 text-black">PORTFOLIO</h1>
                    <p className="text-black/60 uppercase tracking-[0.3em] text-sm">Crafting Atmosphere through Visual Excellence</p>
                </header>

                {/* Pinterest-style Masonry Grid */}
                <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-6 w-full max-w-[1920px] mx-auto overflow-visible">
                    <AnimatePresence>
                        {galleryItems.map((item, index) => (
                            <motion.div
                                key={item.uniqueKey}
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                transition={{
                                    duration: 0.8,
                                    delay: index * 0.05,
                                    ease: [0.215, 0.61, 0.355, 1]
                                }}
                                whileHover={{ y: -8 }}
                                onClick={() => navigate(`/portfolio/${item.id}`)}
                                className="break-inside-avoid mb-6 relative group cursor-pointer overflow-hidden rounded-2xl bg-neutral-100 border border-black/[0.03] shadow-[0_4px_20px_-5px_rgba(0,0,0,0.05)] hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] transition-all duration-500"
                            >
                                <img
                                    src={item.displayImage}
                                    alt={item.title}
                                    className="w-full h-auto object-cover transition-transform duration-1000 group-hover:scale-105"
                                    loading="lazy"
                                />

                                {/* Elegant Hover Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6">
                                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                        <span className="text-[10px] text-primary-foreground/90 bg-primary/95 px-3 py-1 rounded-full font-bold tracking-widest uppercase mb-3 inline-block">
                                            {item.style}
                                        </span>
                                        <h3 className="text-sm md:text-base font-black tracking-tight uppercase text-white leading-tight">
                                            {item.title}
                                        </h3>
                                    </div>
                                </div>

                                {/* Micro-interaction detail */}
                                <div className="absolute top-4 right-4 p-2 rounded-full bg-white/10 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity border border-white/20">
                                    <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Portfolio;
