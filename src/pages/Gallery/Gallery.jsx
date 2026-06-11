import { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL, UPLOAD_BASE_URL } from "../../config";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaArrowLeft, FaArrowRight, FaEye } from "react-icons/fa";

export default function Gallery() {
  const [filter, setFilter] = useState("All");
  const [activeImageIdx, setActiveImageIdx] = useState(null); // index in filtered array
  const [dbItems, setDbItems] = useState([]);

  useEffect(() => {
    const fetchDbGallery = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/gallery`);
        if (res.data && res.data.length > 0) {
          const mapped = res.data.map((item) => ({
            title: item.title,
            category: "Products", // Default category for uploaded gallery items
            image: `${UPLOAD_BASE_URL}/${item.image}`,
            isDb: true
          }));
          setDbItems(mapped);
        }
      } catch (err) {
        console.warn("API Gallery Fetch Error, using static assets fallback:", err);
      }
    };
    fetchDbGallery();
  }, []);

  const categories = ["All", "Shop Floor", "Robotics", "Products"];

  const items = [
    {
      title: "CNC Tooling Setup",
      category: "Shop Floor",
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Heavy Sheet Welding",
      category: "Shop Floor",
      image: "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Robotic Assembly Cell",
      category: "Robotics",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Automated Tool Storage",
      category: "Robotics",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Control Panel Testing",
      category: "Products",
      image: "https://images.unsplash.com/photo-1581092335397-9583eb92d232?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Finished Valve Assembly",
      category: "Products",
      image: "https://images.unsplash.com/photo-1567789884554-0b844b597180?auto=format&fit=crop&w=800&q=80"
    }
  ];

  const combinedItems = [...dbItems, ...items];

  const filteredItems = filter === "All" 
    ? combinedItems 
    : combinedItems.filter(item => item.category === filter);

  const handleNext = () => {
    setActiveImageIdx((prev) => (prev === filteredItems.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setActiveImageIdx((prev) => (prev === 0 ? filteredItems.length - 1 : prev - 1));
  };

  return (
    <PageWrapper>
      <Navbar />

      {/* Gallery Hero */}
      <section className="relative pt-40 pb-20 bg-slate-900 dark:bg-slate-950 gold:bg-black overflow-hidden">
        <div className="absolute inset-0 bg-radial-gradient from-orange-500/10 to-transparent blur-3xl opacity-40 z-0 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <span className="text-orange-500 gold:text-[#d4af37] font-bold tracking-widest uppercase text-sm">
            Showcase
          </span>
          <h1 className="text-5xl md:text-7xl font-black mt-4 text-white gold:gradient-gold font-outfit">
            Industrial Gallery
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-300 gold:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Take a visual tour of our smart manufacturing facilities, heavy engineering rigs, and custom finished products.
          </p>
        </div>
      </section>

      {/* Gallery Filter & Grid */}
      <section className="py-24 bg-slate-50 dark:bg-[#0b0f19] gold:bg-[#050505] transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Categories Tab Selector */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setFilter(cat);
                  setActiveImageIdx(null);
                }}
                className={`px-6 py-2.5 rounded-full font-bold text-sm md:text-base transition-all duration-300 ${
                  filter === cat
                    ? "bg-orange-500 gold:bg-gradient-to-r gold:from-[#bf953f] gold:to-[#aa771c] text-white shadow-lg"
                    : "bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 gold:bg-black/60 gold:border gold:border-[#d4af37]/20 text-slate-700 dark:text-gray-300 gold:text-gray-400"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Masonry Columns Grid */}
          <motion.div 
            layout 
            className="columns-1 md:columns-2 lg:columns-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, index) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  key={`${item.title}-${index}`}
                  onClick={() => setActiveImageIdx(index)}
                  className="relative group overflow-hidden rounded-3xl mb-6 cursor-pointer shadow-lg bg-slate-900 border border-transparent dark:border-white/5 gold:border-[#d4af37]/15"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Eye Icon & Hover Title overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8 z-10 text-white">
                    <span className="text-orange-500 gold:text-[#d4af37] text-2xl mb-4 self-start bg-white/10 p-3 rounded-full backdrop-blur-md">
                      <FaEye />
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                      {item.category}
                    </span>
                    <h3 className="text-xl font-bold font-outfit">
                      {item.title}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Lightbox zoom modal popup */}
      <AnimatePresence>
        {activeImageIdx !== null && (
          <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveImageIdx(null)}
              className="absolute inset-0 bg-black/95 backdrop-blur-md"
            />

            {/* Controls */}
            <button
              onClick={() => setActiveImageIdx(null)}
              className="absolute top-6 right-6 text-white hover:text-orange-500 gold:hover:text-[#d4af37] text-3xl z-10 transition-colors"
              aria-label="Close Gallery View"
            >
              <FaTimes />
            </button>

            <button
              onClick={handlePrev}
              className="absolute left-6 top-1/2 -translate-y-1/2 text-white hover:text-orange-500 gold:hover:text-[#d4af37] text-3xl z-10 bg-white/5 p-4 rounded-full backdrop-blur-md hover:bg-white/10 transition-all"
              aria-label="Previous Image"
            >
              <FaArrowLeft />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-6 top-1/2 -translate-y-1/2 text-white hover:text-orange-500 gold:hover:text-[#d4af37] text-3xl z-10 bg-white/5 p-4 rounded-full backdrop-blur-md hover:bg-white/10 transition-all"
              aria-label="Next Image"
            >
              <FaArrowRight />
            </button>

            {/* Content Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-4xl w-full flex flex-col items-center z-10 pointer-events-none"
            >
              <img
                src={filteredItems[activeImageIdx].image}
                alt={filteredItems[activeImageIdx].title}
                className="max-h-[70vh] w-auto object-contain rounded-2xl shadow-2xl pointer-events-auto border border-white/10"
              />
              <div className="mt-6 text-center text-white">
                <span className="text-xs font-bold uppercase tracking-widest text-orange-500 gold:text-[#d4af37]">
                  {filteredItems[activeImageIdx].category}
                </span>
                <h3 className="text-2xl font-black font-outfit mt-1">
                  {filteredItems[activeImageIdx].title}
                </h3>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </PageWrapper>
  );
}