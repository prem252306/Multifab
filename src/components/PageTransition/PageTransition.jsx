import { motion } from "framer-motion";

export default function PageTransition({ children }) {
  return (
    <div className="relative">
      {/* Primary Slate Shutter Overlay */}
      <motion.div
        className="fixed inset-0 bg-slate-950 gold:bg-[#121212] z-[99999] pointer-events-none origin-bottom"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{
          duration: 0.8,
          ease: [0.76, 0, 0.24, 1]
        }}
      />
      
      {/* Accent Gold/Orange Shutter Ribbon */}
      <motion.div
        className="fixed inset-0 bg-orange-500 gold:bg-gradient-to-t gold:from-[#bf953f] gold:to-[#aa771c] z-[99998] pointer-events-none origin-bottom"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.12,
          ease: [0.76, 0, 0.24, 1]
        }}
      />

      {/* Child Content Fade-Slide */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{
          duration: 0.5,
          delay: 0.25,
          ease: "easeOut"
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}