import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function CTA() {
  return (
    <section className="py-32 bg-slate-900 dark:bg-slate-950 gold:bg-black transition-colors duration-300 relative overflow-hidden">
      {/* Background glow orb */}
      <div className="absolute inset-0 bg-radial-gradient from-orange-500/10 to-transparent blur-3d opacity-50 z-0 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-premium p-12 md:p-20 rounded-[40px] text-center border border-white/10 gold:border-[#d4af37]/25 relative overflow-hidden"
        >
          {/* Subtle decoration pattern */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-orange-500/10 to-transparent blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-blue-500/10 to-transparent blur-3xl pointer-events-none" />

          <h2 className="text-4xl md:text-6xl font-black text-white gold:gradient-gold font-outfit leading-tight">
            Ready To Start Your Project?
          </h2>

          <p className="text-gray-300 gold:text-gray-400 text-lg md:text-2xl mt-6 max-w-2xl mx-auto leading-relaxed">
            Get in touch with our engineering consulting team today for custom quotes and designs.
          </p>

          <Link to="/contact" className="inline-block mt-10">
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 30px rgba(249, 115, 22, 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-orange-500 gold:bg-gradient-to-r gold:from-[#bf953f] gold:to-[#aa771c] text-white rounded-full font-bold text-lg shadow-xl transition-all duration-300"
            >
              Get Free Consultation
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}