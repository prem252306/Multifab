import { motion } from "framer-motion";

export default function FloatingShapes() {
  return (
    <>
      <motion.div
        animate={{ y: [0, -30, 0] }}
        transition={{
          repeat: Infinity,
          duration: 8
        }}
        className="
        absolute
        top-40
        left-20
        w-24
        h-24
        border
        border-orange-500/30
        rotate-45
        "
      />

      <motion.div
        animate={{ y: [0, 40, 0] }}
        transition={{
          repeat: Infinity,
          duration: 10
        }}
        className="
        absolute
        bottom-20
        right-20
        w-32
        h-32
        rounded-full
        border
        border-blue-500/30
        "
      />
    </>
  );
}