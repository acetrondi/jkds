import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Maximize2, MoveRight, Play } from "lucide-react";
import projectsData from "@/data/projects.json";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect } from "react";

const ProjectDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const project = projectsData.find((p) => p.id === id);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!project) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center flex-col gap-6 text-white">
                <h1 className="text-4xl font-black">Project Not Found</h1>
                <button
                    onClick={() => navigate("/portfolio")}
                    className="px-8 py-3 bg-primary text-black font-bold uppercase tracking-widest hover:bg-white transition-colors"
                >
                    Back to Portfolio
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#050505] text-white">
            <Navbar />

            {/* Hero Section */}
            <section className="relative h-[80vh] w-full overflow-hidden">
                <img
                    src={project.cover_images[0] || project.images[0]}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-[3s] hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-black/20 to-transparent" />

                <div className="absolute bottom-0 left-0 w-full p-8 md:p-20">
                    <div className="max-w-7xl mx-auto">
                        <Link
                            to="/portfolio"
                            className="flex items-center gap-2 text-white/60 hover:text-primary transition-colors mb-8 group"
                        >
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            <span className="text-xs font-bold uppercase tracking-[0.2em]">Back to Portfolio</span>
                        </Link>

                        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter uppercase mb-6 animate-fade-up">
                            {project.title}
                        </h1>

                        <div className="flex flex-wrap gap-12 text-sm uppercase tracking-widest font-light">
                            <div>
                                <span className="block text-primary font-bold mb-1">Style</span>
                                <span className="text-white/80">{project.style}</span>
                            </div>
                            <div>
                                <span className="block text-primary font-bold mb-1">Area</span>
                                <span className="text-white/80">{project.area}</span>
                            </div>
                            <div>
                                <span className="block text-primary font-bold mb-1">Year</span>
                                <span className="text-white/80">{project.date}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="max-w-7xl mx-auto px-6 py-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
                    {/* Left: Description */}
                    <div className="lg:col-span-12">
                        <div className="flex flex-col md:flex-row gap-12 items-start justify-between">
                            <div className="max-w-3xl">
                                <h2 className="text-3xl font-bold mb-8 uppercase tracking-tight">The Vision</h2>
                                <p className="text-white/60 text-lg md:text-xl leading-relaxed font-light">
                                    {project.description}
                                </p>
                            </div>
                            <div className="hidden lg:block w-px h-64 bg-white/10" />
                            <div className="flex flex-col gap-4">
                                <div className="group cursor-pointer">
                                    <span className="text-[10px] uppercase tracking-[0.4em] text-white/40 block mb-2">Category</span>
                                    <span className="text-xl font-bold uppercase transition-colors group-hover:text-primary">Residential</span>
                                </div>
                                <div className="group cursor-pointer">
                                    <span className="text-[10px] uppercase tracking-[0.4em] text-white/40 block mb-2">Location</span>
                                    <span className="text-xl font-bold uppercase transition-colors group-hover:text-primary">International</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Gallery Grid */}
                    <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                        {project.images.map((img, idx) => (
                            <div
                                key={idx}
                                className={`group relative overflow-hidden rounded-2xl bg-neutral-900 aspect-[4/3] ${idx % 3 === 0 ? 'md:col-span-2 aspect-[21/9]' : ''}`}
                            >
                                <img
                                    src={img}
                                    alt={`${project.title} showcase ${idx}`}
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                                    <Maximize2 className="text-white w-8 h-8 opacity-0 group-hover:opacity-100 transform scale-50 group-hover:scale-100 transition-all duration-500" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonial Section */}
            <section className="bg-neutral-950 py-32 border-y border-white/5">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div className="relative">
                        <div className="aspect-[4/5] rounded-[2rem] overflow-hidden border border-white/10">
                            <img
                                src={project.testimonial.image}
                                alt="Client"
                                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                            />
                        </div>
                        {/* Play Button Overlay if video exists */}
                        {project.testimonial.video && (
                            <button className="absolute inset-0 flex items-center justify-center group">
                                <div className="w-24 h-24 rounded-full bg-primary/20 backdrop-blur-md border border-primary/30 flex items-center justify-center group-hover:bg-primary/40 transition-all">
                                    <Play className="text-primary fill-primary w-8 h-8" />
                                </div>
                            </button>
                        )}
                    </div>

                    <div className="space-y-12">
                        <span className="text-primary font-black uppercase tracking-[0.5em] text-xs underline underline-offset-[12px] decoration-primary/30">Client Experience</span>
                        <blockquote className="text-3xl md:text-5xl font-serif italic text-white/90 leading-tight">
                            "{project.testimonial.text}"
                        </blockquote>
                        <div className="pt-8 flex items-center gap-6">
                            <div className="w-16 h-px bg-primary" />
                            <div>
                                <p className="font-bold uppercase tracking-widest">Satisfied Client</p>
                                <p className="text-xs text-white/40 uppercase tracking-widest mt-1">Verified Owner</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-32 bg-black overflow-hidden relative">
                <div className="absolute -right-20 top-0 text-[30vw] font-black text-white/[0.02] leading-none pointer-events-none select-none">
                    NEXT
                </div>

                <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
                    <h2 className="text-4xl md:text-6xl font-black mb-12 uppercase tracking-tighter">Ready to visualize <br /> your project?</h2>
                    <Link
                        to="/#contact"
                        className="inline-flex items-center gap-4 px-12 py-5 bg-white text-black font-bold uppercase tracking-[0.2em] hover:bg-primary transition-all group"
                    >
                        Get in Touch
                        <MoveRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                    </Link>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default ProjectDetail;
