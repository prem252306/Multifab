import { motion } from "framer-motion";
import Logo from "../Logo/Logo";

export default function Loader() {
  return (
    <div className="fixed inset-0 bg-slate-950 flex flex-col items-center justify-center z-[99999] gap-6">
      {/* Animated Brand Entry */}
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="flex flex-col items-center gap-4"
      >
        <Logo showText={true} className="scale-125 md:scale-150" />
        
        {/* Progress Bar Pulse */}
        <div className="w-48 h-1 bg-slate-800 rounded-full overflow-hidden mt-6 relative">
          <motion.div
            initial={{ left: "-100%" }}
            animate={{ left: "100%" }}
            transition={{
              repeat: Infinity,
              duration: 2.2,
              ease: "easeInOut",
            }}
            className="absolute top-0 bottom-0 w-1/2 bg-orange-500 gold:bg-gradient-to-r gold:from-[#bf953f] gold:to-[#aa771c] rounded-full"
          />
        </div>
      </motion.div>
    </div>
  );
}