import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import AnimatedText from "../AnimatedText";
import TiltCard from "../TiltCard/TiltCard";

export default function ProductCards() {
  const products = [
    {
      title: "Custom Fabrication",
      desc: "High-precision industrial welding, heavy structure fabrication, and custom sheet metal work matching rigorous compliance standards.",
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Smart Automation",
      desc: "End-to-end industrial robotic automation, PLC programming, process instrumentation, and control system integration for modern assembly lines.",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Precision Engineering",
      desc: "CAD/CAM mechanical design prototyping, material stress testing analysis, CNC machining, and automated product lifecycle consulting.",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <section className="py-32 bg-slate-100 dark:bg-slate-900 gold:bg-black transition-colors duration-300 border-t border-b border-slate-200/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <span className="text-orange-500 gold:text-[#d4af37] font-bold tracking-widest uppercase">
            Services Showcase
          </span>
          <h2 className="text-4xl md:text-6xl font-black mt-4 font-outfit text-slate-900 dark:text-white gold:gradient-gold">
            <AnimatedText text="What We Deliver" />
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {products.map((item, index) => (
            <TiltCard key={item.title} className="h-[480px]">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="group relative overflow-hidden rounded-3xl h-full shadow-xl hover:shadow-2xl transition-all duration-500"
              >
              {/* Background Image */}
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent z-10 opacity-90 transition-opacity duration-300 group-hover:via-slate-950/60" />

              {/* Card Contents */}
              <div className="absolute inset-0 p-8 z-20 flex flex-col justify-end text-white">
                <span className="text-orange-500 gold:text-[#d4af37] text-3xl font-extrabold mb-2 font-outfit">
                  0{index + 1}
                </span>
                <h3 className="text-2xl font-black mb-3 font-outfit tracking-tight">
                  {item.title}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-6 transform translate-y-2 opacity-80 group-hover:translate-y-0 transition-all duration-300">
                  {item.desc}
                </p>
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 text-sm font-bold text-orange-500 gold:text-[#d4af37] tracking-wider uppercase group/link"
                >
                  Learn More
                  <FaArrowRight className="transform group-hover/link:translate-x-1.5 transition-transform" />
                </Link>
              </div>
            </motion.div>
          </TiltCard>
        ))}
        </div>
      </div>
    </section>
  );
}