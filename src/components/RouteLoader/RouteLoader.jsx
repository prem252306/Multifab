import { motion } from "framer-motion";

export default function RouteLoader() {
  return (
    <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-md flex items-center justify-center z-[9999] pointer-events-none">
      <div className="flex flex-col items-center gap-4">
        {/* Rotating Dual Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            duration: 1.2,
            ease: "linear",
          }}
          className="w-16 h-16 border-4 border-t-orange-500 gold:border-t-[#d4af37] border-slate-800 rounded-full"
        />
        <motion.p
          initial={{ opacity: 0.3 }}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
            ease: "easeInOut",
          }}
          className="text-orange-500 gold:text-[#d4af37] text-xs font-bold tracking-widest uppercase font-outfit"
        >
          Loading Specs...
        </motion.p>
      </div>
    </div>
  );
}
