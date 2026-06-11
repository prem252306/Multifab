import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section className="py-32 bg-white dark:bg-slate-950 gold:bg-[#050505] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <img
              src="https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=800&q=80"
              alt="MultiFab Plant Floor"
              className="
              rounded-3xl
              shadow-2xl
              w-full
              h-[500px]
              object-cover
              border border-slate-200/10 dark:border-white/5 gold:border-[#d4af37]/15
              "
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <span className="text-orange-500 gold:text-[#d4af37] font-bold tracking-widest uppercase text-sm">
              About Us
            </span>

            <h2 className="
            text-4xl md:text-6xl
            font-black
            mt-4
            text-slate-900 dark:text-white gold:gradient-gold
            font-outfit
            ">
              MultiFab Engineering
            </h2>

            <p className="
            mt-8
            text-lg
            text-gray-600 dark:text-gray-300 gold:text-gray-400
            leading-relaxed
            ">
              We provide world-class engineering,
              fabrication, automation and industrial
              manufacturing solutions with a focus on
              precision, innovation and quality.
            </p>

            <div className="grid grid-cols-2 gap-6 mt-10">

              <div className="
              bg-orange-50 dark:bg-orange-950/20 gold:bg-[#121212]
              border border-transparent dark:border-white/5 gold:border-[#d4af37]/15
              p-6
              rounded-2xl
              text-center
              ">
                <h3 className="text-4xl font-extrabold text-orange-500 gold:text-[#d4af37] font-outfit">
                  25+
                </h3>
                <p className="text-sm font-semibold text-slate-700 dark:text-gray-300 gold:text-gray-400 mt-2">Years Experience</p>
              </div>

              <div className="
              bg-blue-50 dark:bg-blue-950/20 gold:bg-[#121212]
              border border-transparent dark:border-white/5 gold:border-[#d4af37]/15
              p-6
              rounded-2xl
              text-center
              ">
                <h3 className="text-4xl font-extrabold text-blue-600 dark:text-blue-400 gold:text-[#d4af37] font-outfit">
                  1500+
                </h3>
                <p className="text-sm font-semibold text-slate-700 dark:text-gray-300 gold:text-gray-400 mt-2">Projects Completed</p>
              </div>

              <div className="
              bg-slate-50 dark:bg-slate-900/60 gold:bg-[#121212]
              border border-transparent dark:border-white/5 gold:border-[#d4af37]/15
              p-6
              rounded-2xl
              text-center
              ">
                <h3 className="text-4xl font-extrabold text-slate-800 dark:text-white gold:text-[#d4af37] font-outfit">
                  300+
                </h3>
                <p className="text-sm font-semibold text-slate-700 dark:text-gray-300 gold:text-gray-400 mt-2">Clients Served</p>
              </div>

              <div className="
              bg-green-50 dark:bg-green-950/20 gold:bg-[#121212]
              border border-transparent dark:border-white/5 gold:border-[#d4af37]/15
              p-6
              rounded-2xl
              text-center
              ">
                <h3 className="text-4xl font-extrabold text-green-600 dark:text-green-400 gold:text-[#d4af37] font-outfit">
                  ISO
                </h3>
                <p className="text-sm font-semibold text-slate-700 dark:text-gray-300 gold:text-gray-400 mt-2">Certified Company</p>
              </div>

            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}