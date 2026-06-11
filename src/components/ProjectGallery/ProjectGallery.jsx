import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowLeft, FaArrowRight, FaPause, FaPlay } from "react-icons/fa";
import AnimatedText from "../AnimatedText";

export default function ProjectGallery() {
  const [filter, setFilter] = useState("All");
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const autoplayTimer = useRef(null);

  const categories = ["All", "Fabrication", "Automation", "Engineering"];

  const projects = [
    {
      title: "Industrial Plant Setup",
      category: "Fabrication",
      image: "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Automation Assembly Line",
      category: "Automation",
      image: "https://images.unsplash.com/photo-1581092335397-9583eb92d232?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Heavy Fabrication Unit",
      category: "Fabrication",
      image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "PLC Control Center",
      category: "Automation",
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Pneumatic Test System",
      category: "Engineering",
      image: "https://images.unsplash.com/photo-1567789884554-0b844b597180?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "NDT Quality Testing Lab",
      category: "Engineering",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80"
    }
  ];

  const filteredProjects = filter === "All" 
    ? projects 
    : projects.filter(p => p.category === filter);

  // Reset active index when filter changes
  useEffect(() => {
    setActiveIndex(0);
  }, [filter]);

  // Autoplay loop
  useEffect(() => {
    if (isPlaying && filteredProjects.length > 1) {
      autoplayTimer.current = setInterval(() => {
        handleNext();
      }, 4000);
    }
    return () => {
      if (autoplayTimer.current) clearInterval(autoplayTimer.current);
    };
  }, [isPlaying, activeIndex, filteredProjects]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % filteredProjects.length);
  };

  const handleDragEnd = (event, info) => {
    const swipeThreshold = 50;
    if (info.offset.x > swipeThreshold) {
      handlePrev();
    } else if (info.offset.x < -swipeThreshold) {
      handleNext();
    }
  };

  return (
    <section className="py-32 bg-white dark:bg-[#0b0f19] gold:bg-[#0c0c0c] transition-colors duration-300 overflow-hidden relative">
      {/* Background visual element */}
      <div className="absolute inset-0 bg-radial-gradient from-orange-500/5 to-transparent blur-3xl opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <span className="text-orange-500 gold:text-[#d4af37] font-bold tracking-widest uppercase text-sm">
            Our Portfolio
          </span>
          <h2 className="text-4xl md:text-6xl font-black mt-4 font-outfit text-slate-900 dark:text-white gold:gradient-gold">
            <AnimatedText text="Featured Engineering Works" />
          </h2>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2.5 rounded-full font-bold text-sm md:text-base transition-all duration-300 ${
                filter === cat
                  ? "bg-orange-500 gold:bg-gradient-to-r gold:from-[#bf953f] gold:to-[#aa771c] text-white shadow-lg"
                  : "bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 gold:bg-[#121212] gold:hover:bg-[#1b1b1b] gold:border gold:border-[#d4af37]/20 text-slate-700 dark:text-gray-300 gold:text-gray-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 3D Carousel Stage */}
        <div className="relative h-[480px] md:h-[520px] w-full flex items-center justify-center">
          {filteredProjects.length === 0 ? (
            <div className="text-slate-400 font-bold uppercase tracking-wider">No Projects Found</div>
          ) : (
            <div className="relative w-full max-w-lg h-[400px] flex items-center justify-center perspective-[1000px]">
              <AnimatePresence initial={false}>
                {filteredProjects.map((project, index) => {
                  // Calculate 3D Offset positions
                  let offset = index - activeIndex;

                  // Circular wrapping logic
                  if (offset < -filteredProjects.length / 2) {
                    offset += filteredProjects.length;
                  } else if (offset > filteredProjects.length / 2) {
                    offset -= filteredProjects.length;
                  }

                  // Determine active styles
                  const isActive = offset === 0;
                  const absOffset = Math.abs(offset);

                  // Only render cards close to center to save memory & performance
                  if (absOffset > 2) return null;

                  // Card positions
                  const xTranslation = offset * 280; // horizontal separation
                  const zTranslation = -absOffset * 150; // push background cards backwards
                  const rotateY = -offset * 32; // rotate side cards inward
                  const scale = 1 - absOffset * 0.18; // scale down side cards
                  const zIndex = 30 - absOffset * 10; // set stack order
                  const opacity = 1 - absOffset * 0.45; // fade side cards
                  const blur = absOffset * 3; // blur background cards

                  return (
                    <motion.div
                      key={project.title}
                      style={{
                        zIndex,
                        transformStyle: "preserve-3d",
                      }}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{
                        x: xTranslation,
                        z: zTranslation,
                        rotateY,
                        scale,
                        opacity,
                        filter: `blur(${blur}px)`,
                      }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      transition={{
                        type: "spring",
                        stiffness: 150,
                        damping: 20,
                      }}
                      drag="x"
                      dragConstraints={{ left: 0, right: 0 }}
                      onDragEnd={handleDragEnd}
                      className={`absolute w-[290px] md:w-[350px] h-[400px] cursor-grab active:cursor-grabbing rounded-[32px] overflow-hidden shadow-2xl border ${
                        isActive
                          ? "border-orange-500 gold:border-[#d4af37] shadow-orange-500/10 gold:shadow-[#d4af37]/10"
                          : "border-slate-200/50 dark:border-white/5 gold:border-white/5"
                      } bg-slate-900`}
                    >
                      {/* Project Image */}
                      <img
                        src={project.image}
                        alt={project.title}
                        draggable="false"
                        className="w-full h-full object-cover select-none pointer-events-none"
                      />

                      {/* Glassmorphic Project Info Card */}
                      <div className="absolute inset-x-4 bottom-4 bg-slate-950/70 gold:bg-black/75 border border-white/10 gold:border-[#d4af37]/20 backdrop-blur-md p-6 rounded-[24px] flex flex-col justify-end text-left z-20">
                        <span className="text-orange-500 gold:text-[#d4af37] text-[10px] font-bold uppercase tracking-widest mb-1.5">
                          {project.category}
                        </span>
                        <h3 className="text-white text-lg md:text-xl font-extrabold font-outfit leading-tight">
                          {project.title}
                        </h3>
                        <p className="text-slate-400 text-xs mt-1 pointer-events-none">
                          Swipe left/right or click controls to inspect details.
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Carousel Control Buttons */}
        {filteredProjects.length > 1 && (
          <div className="flex justify-center items-center gap-6 mt-8">
            <button
              onClick={handlePrev}
              className="p-4 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 gold:bg-[#121212] gold:hover:bg-[#1c1c1c] border border-slate-200 dark:border-slate-800 gold:border-[#d4af37]/20 text-slate-800 dark:text-white gold:text-[#d4af37] shadow-md transition-all active:scale-95"
            >
              <FaArrowLeft />
            </button>

            {/* Play/Pause Autoplay button */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-3.5 rounded-full bg-orange-500/10 dark:bg-orange-500/10 gold:bg-[#d4af37]/10 text-orange-500 gold:text-[#d4af37] border border-orange-500/20 gold:border-[#d4af37]/20 hover:bg-orange-500 hover:text-white gold:hover:bg-[#d4af37] gold:hover:text-slate-950 transition-all text-sm active:scale-95"
            >
              {isPlaying ? <FaPause /> : <FaPlay />}
            </button>

            <button
              onClick={handleNext}
              className="p-4 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 gold:bg-[#121212] gold:hover:bg-[#1c1c1c] border border-slate-200 dark:border-slate-800 gold:border-[#d4af37]/20 text-slate-800 dark:text-white gold:text-[#d4af37] shadow-md transition-all active:scale-95"
            >
              <FaArrowRight />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}