import { motion } from "framer-motion";
import AnimatedCounter from "../AnimatedCounter/AnimatedCounter";

export default function Stats() {
  const stats = [
    {
      number: 1500,
      suffix: "+",
      title: "Projects Completed"
    },
    {
      number: 300,
      suffix: "+",
      title: "Global Clients"
    },
    {
      number: 25,
      suffix: "+",
      title: "Years Experience"
    },
    {
      number: 99,
      suffix: "%",
      title: "Quality Rating"
    }
  ];

  return (
    <section className="py-32 bg-slate-900 dark:bg-slate-950 gold:bg-[#050505] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{
                scale: 1.05,
                y: -10,
                boxShadow: "0 20px 40px -15px rgba(249, 115, 22, 0.2)"
              }}
              className="relative overflow-hidden bg-white/5 dark:bg-slate-900/60 gold:bg-[#121212] border border-white/10 gold:border-[#d4af37]/20 rounded-3xl p-10 text-center shadow-xl backdrop-blur-md flex flex-col items-center justify-center min-h-[260px]"
            >
              {/* SVG Ring background animation */}
              <div className="relative w-32 h-32 flex items-center justify-center mb-6">
                <svg className="absolute w-full h-full -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    className="stroke-white/10 dark:stroke-slate-800 gold:stroke-[#d4af37]/10"
                    strokeWidth="6"
                    fill="transparent"
                  />
                  <motion.circle
                    cx="64"
                    cy="64"
                    r="56"
                    className="stroke-orange-500 gold:stroke-[#d4af37]"
                    strokeWidth="6"
                    fill="transparent"
                    strokeDasharray="351.8"
                    initial={{ strokeDashoffset: 351.8 }}
                    whileInView={{ strokeDashoffset: 351.8 - (351.8 * 0.85) }}
                    viewport={{ once: true }}
                    transition={{ duration: 2, delay: 0.2, ease: "easeOut" }}
                  />
                </svg>

                <h2 className="text-3xl font-black text-white gold:gradient-gold font-outfit relative z-10 flex items-center justify-center">
                  <AnimatedCounter
                    end={item.number}
                    suffix={item.suffix}
                  />
                </h2>
              </div>

              <p className="text-gray-300 dark:text-gray-400 text-lg font-medium tracking-wide uppercase">
                {item.title}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}