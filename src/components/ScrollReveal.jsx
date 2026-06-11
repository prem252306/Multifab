import { motion } from "framer-motion";

export default function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.65,
  className = ""
}) {
  const getVariants = () => {
    switch (direction) {
      case "up":
        return {
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0 }
        };
      case "fade":
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 }
        };
      case "scale":
        return {
          hidden: { opacity: 0, scale: 0.85 },
          visible: { opacity: 1, scale: 1 }
        };
      case "flip":
        return {
          hidden: { opacity: 0, rotateX: 60, y: 40, scale: 0.9 },
          visible: { opacity: 1, rotateX: 0, y: 0, scale: 1 }
        };
      default:
        return {
          hidden: { opacity: 0, y: 40 },
          visible: { opacity: 1, y: 0 }
        };
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={getVariants()}
      transition={{
        duration: duration,
        delay: delay,
        ease: [0.21, 0.85, 0.45, 1] // custom elastic ease-out
      }}
      style={{ transformOrigin: "center top" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
