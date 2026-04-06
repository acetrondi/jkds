import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useData } from "@/context/DataContext";
import { ikSrc } from "@/lib/imagekit";

const PortfolioFolders = () => {
    const navigate = useNavigate();
    const { projects } = useData();

    return (
        <div className="min-h-screen bg-white text-black">
            <Navbar />

            <main className="pt-32 pb-20 px-4 md:px-8">
                <header className="max-w-7xl mx-auto mb-16 text-center">
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4 text-black">PORTFOLIO FOLDERS</h1>
                    <p className="text-black/60 uppercase tracking-[0.3em] text-sm">Project Wise Showcase</p>
                </header>

                {/* Project Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-[1920px] mx-auto overflow-visible">
                    <AnimatePresence>
                        {projects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                transition={{
                                    duration: 0.8,
                                    delay: index * 0.1,
                                    ease: [0.215, 0.61, 0.355, 1]
                                }}
                                whileHover={{ y: -8 }}
                                onClick={() => navigate(`/portfolio/${project.id}`)}
                                className="relative group cursor-pointer overflow-hidden rounded-2xl bg-neutral-100 border border-black/[0.03] shadow-[0_4px_20px_-5px_rgba(0,0,0,0.05)] hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] transition-all duration-500 aspect-[4/3]"
                            >
                                <img
                                    src={ikSrc(project.cover_images?.[0] || project.images[0], 'f-webp,q-75,w-800')}
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                    loading="lazy"
                                />

                                {/* Elegant Hover Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
                                    <div className="transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
                                        <span className="text-[10px] text-primary-foreground/90 bg-primary/95 px-3 py-1 rounded-full font-bold tracking-widest uppercase mb-4 inline-block">
                                            {project.style}
                                        </span>
                                        <h3 className="text-2xl md:text-3xl font-black tracking-tight uppercase text-white leading-tight mb-2">
                                            {project.title}
                                        </h3>
                                        <p className="text-white/80 text-sm line-clamp-2">
                                            {project.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Micro-interaction detail */}
                                <div className="absolute top-6 right-6 p-2 rounded-full bg-white/10 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity border border-white/20">
                                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
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

export default PortfolioFolders;
