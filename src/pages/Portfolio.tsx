import { useNavigate } from "react-router-dom";
import projectsData from "@/data/projects.json";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Portfolio = () => {
    const navigate = useNavigate();

    // For a dense 9-column grid, we might need more items. 
    // Let's duplicate the projects a bit to fill the space for demonstration if needed, 
    // or just use the existing ones. But the user asked for 5-9 cols.
    // I'll create a flattened list of all project images to make it look like a gallery.

    const galleryItems = projectsData.flatMap(project =>
        project.images.map((image, idx) => ({
            ...project,
            displayImage: image,
            uniqueKey: `${project.id}-${idx}`
        }))
    );

    return (
        <div className="min-h-screen bg-[#050505] text-white">
            <Navbar />

            <main className="pt-32 pb-20 px-4 md:px-8">
                <header className="max-w-7xl mx-auto mb-16 text-center">
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4">PORTFOLIO</h1>
                    <p className="text-white/60 uppercase tracking-[0.3em] text-sm">Crafting Atmosphere through Visual Excellence</p>
                </header>

                {/* Masonry Grid */}
                <div className="columns-3 md:columns-4 lg:columns-5 gap-4 w-full">
                    {galleryItems.map((item) => (
                        <div
                            key={item.uniqueKey}
                            onClick={() => navigate(`/portfolio/${item.id}`)}
                            className="break-inside-avoid mb-4 relative group cursor-pointer overflow-hidden rounded-xl bg-neutral-900 border border-white/5 transition-all duration-500 hover:border-primary/50"
                        >
                            <img
                                src={item.displayImage}
                                alt={item.title}
                                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                                loading="lazy"
                            />

                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-4">
                                <span className="text-[10px] text-primary font-bold tracking-widest uppercase mb-1 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                                    {item.style}
                                </span>
                                <h3 className="text-xs md:text-sm font-black tracking-tight uppercase transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                    {item.title}
                                </h3>
                            </div>

                            {/* Subtle glass effect on small screens/touch */}
                            <div className="absolute top-2 right-2 p-1 rounded-full bg-black/20 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="w-1 h-1 bg-white rounded-full" />
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Portfolio;
