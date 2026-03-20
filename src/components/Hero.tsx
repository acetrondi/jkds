import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, ChevronRight, ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useData } from "@/context/DataContext";

import img1 from "@/assets/Hero/IMG_6063.webp";
import img2 from "@/assets/Hero/IMG_6064.webp";
import img3 from "@/assets/Hero/IMG_6065.webp";
import img4 from "@/assets/Hero/IMG_6066.webp";

const localHeroImages = [img1, img2, img3, img4];

const IK_ENDPOINT = import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT as string | undefined

/**
 * Returns an optimised src for the hero background:
 * - ImageKit URL  → append transformation params (WebP, 1920px wide, q-80)
 * - Local path    → use as-is (fallback)
 */
function heroSrc(url: string): string {
  if (!url) return ''
  if (url.includes('ik.imagekit.io') || (IK_ENDPOINT && url.startsWith(IK_ENDPOINT))) {
    return `${url}?tr=f-webp,q-80,w-1920`
  }
  return url
}

const Hero = () => {
  const navigate = useNavigate();
  const { heroSlides: originalSlides } = useData();
  const [current, setCurrent] = useState(0);

  // Map the new local images overriding the default ones securely.
  const slides = originalSlides.map((slide, index) => ({
    ...slide,
    image: localHeroImages[index % localHeroImages.length]
  }));

  useEffect(() => {
    if (slides.length === 0) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="relative h-[100dvh] w-full bg-background overflow-hidden flex flex-col pt-20">

      {/* --- BACKGROUND CAROUSEL --- */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.img
            key={current}
            src={heroSrc(slides[current]?.image)}
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      {/* --- CONTENT LAYER --- */}
      <div className="relative z-20 flex-1 flex flex-col justify-end pb-8 md:pb-16 px-6 md:px-12 lg:px-20">
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 md:gap-12">

          {/* Left: Headlines & Button */}
          <div className="w-full lg:max-w-4xl">
            <AnimatePresence mode="wait">
              {slides[current] && (
                <motion.div
                  key={current}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-1"
                >
                  <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extralight tracking-tighter leading-[0.9]">
                    {slides[current].title} <span className="text-primary">{slides[current].subtitle}</span>
                  </h1>
                  <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-medium tracking-tighter leading-[0.9] text-primary">
                    {slides[current].accent}
                  </h1>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-6 md:mt-10 flex items-center gap-3 bg-white text-black px-6 py-3 md:px-8 md:py-4 rounded-full text-sm md:text-base font-medium hover:bg-primary hover:text-white transition-all group"
              onClick={() => navigate("/portfolio")}
            >
              VIEW PROJECTS
              <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 group-hover:rotate-45 transition-transform" />
            </motion.button>
          </div>

          {/* Right: Desktop-only Visuals */}
          <div className="hidden lg:flex flex-col items-end text-right gap-6">
            <div className="flex items-center gap-4">
              <div className="h-[1px] w-12 bg-primary/50" />
              <p className="text-xs uppercase tracking-[0.4em] text-white/60">Selected Works 2024-2026</p>
            </div>

            <div className="flex gap-2">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrent(idx)}
                  className={`h-1 transition-all duration-500 ${current === idx ? 'w-12 bg-primary' : 'w-4 bg-white/20'}`}
                />
              ))}
            </div>

            <div className="max-w-[200px] space-y-4">
              <p className="text-sm text-white/70 font-light leading-relaxed">
                Photorealistic visualizations that showcase your ideas before they are <span className="text-white font-bold">built.</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Controls */}
      <div className="lg:hidden absolute bottom-6 right-6 z-30 flex gap-3">
        <button
          onClick={() => setCurrent(current === 0 ? slides.length - 1 : current - 1)}
          className="p-3 border border-white/20 rounded-full bg-black/20 backdrop-blur-md active:bg-primary"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => setCurrent(current === slides.length - 1 ? 0 : current + 1)}
          className="p-3 border border-white/20 rounded-full bg-black/20 backdrop-blur-md active:bg-primary"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

    </section>
  );
};

export default Hero;
