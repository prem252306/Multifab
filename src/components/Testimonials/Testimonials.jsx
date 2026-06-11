import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

export default function Testimonials() {
  const testimonials = [
    {
      name: "ABB Industries",
      text: "MultiFab Engineering provided exceptional support for our project. Their custom automation systems increased our plant efficiency by 35%. A highly reliable engineering partner.",
      role: "Procurement Lead"
    },
    {
      name: "L&T Engineering",
      text: "Outstanding fabrication quality and execution. Every structure delivered met our complex safety specifications perfectly. Looking forward to our next collaboration.",
      role: "Project Director"
    },
    {
      name: "Bosch Solutions",
      text: "Precision, quality, and on-time delivery. MultiFab's mechanical design consulting and CNC components exceeded our high standards. Highly recommended for heavy engineering.",
      role: "Operations Head"
    }
  ];

  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for next, -1 for prev

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    }, 6000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeInOut" }
    },
    exit: (dir) => ({
      x: dir > 0 ? -100 : 100,
      opacity: 0,
      transition: { duration: 0.4, ease: "easeInOut" }
    })
  };

  const handleDotClick = (index) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  };

  return (
    <section className="py-32 bg-slate-50 dark:bg-[#0b0f19] gold:bg-black transition-colors duration-300 border-t border-b border-slate-200/5">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <span className="text-orange-500 gold:text-[#d4af37] font-bold tracking-widest uppercase">
          Client Feedback
        </span>
        <h2 className="text-4xl md:text-6xl font-black mt-4 mb-16 font-outfit text-slate-900 dark:text-white gold:gradient-gold">
          What Our Partners Say
        </h2>

        <div className="relative overflow-hidden bg-white dark:bg-slate-900 gold:bg-[#121212] border border-slate-200/10 dark:border-white/5 gold:border-[#d4af37]/20 rounded-[32px] p-8 md:p-16 shadow-2xl min-h-[380px] flex flex-col justify-between">
          <div className="text-4xl md:text-5xl text-orange-500/20 gold:text-[#d4af37]/20 flex justify-center mb-6">
            <FaQuoteLeft />
          </div>

          <div className="relative flex-grow flex items-center justify-center overflow-hidden min-h-[160px]">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={current}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full"
              >
                {/* Star Ratings */}
                <div className="flex justify-center gap-1.5 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400 text-lg md:text-xl" />
                  ))}
                </div>

                <p className="text-lg md:text-2xl font-medium leading-relaxed italic text-slate-800 dark:text-gray-200 gold:text-gray-100">
                  "{testimonials[current].text}"
                </p>

                <h3 className="mt-8 text-xl font-bold font-outfit text-orange-500 gold:text-[#d4af37]">
                  {testimonials[current].name}
                </h3>
                <span className="text-sm font-semibold text-slate-500 dark:text-gray-400 gold:text-gray-400">
                  {testimonials[current].role}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Slider Dots */}
          <div className="flex justify-center gap-3 mt-10">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`w-3.5 h-3.5 rounded-full transition-all duration-300 ${
                  current === index
                    ? "bg-orange-500 gold:bg-[#d4af37] w-8 shadow-md"
                    : "bg-slate-300 dark:bg-slate-700 gold:bg-slate-800 hover:bg-slate-400"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}