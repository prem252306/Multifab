import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import InteractiveGrid from "../InteractiveGrid/InteractiveGrid";

export default function Hero() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 60,
        damping: 15
      }
    }
  };

  return (
    <section className="relative h-screen overflow-hidden flex items-center justify-center">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source
          src="https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c05d00db08e5cc81da3012903e1e2172&profile_id=139&oauth2_token_id=57447761"
          type="video/mp4"
        />
        {/* Fallback image */}
        <img
          src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1920&q=80"
          alt="Industrial Automation"
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      </video>

      {/* Dark Overlay with theme-matching tint */}
      <div className="absolute inset-0 bg-slate-950/80 gold:bg-black/85 z-10" />

      {/* Interactive Canvas Physics Grid */}
      <InteractiveGrid />

      {/* Glowing blur accents */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.3, 0.15]
        }}
        transition={{
          repeat: Infinity,
          duration: 8,
          ease: "easeInOut"
        }}
        className="absolute top-1/4 left-1/4 w-[35vw] h-[35vw] rounded-full bg-orange-500/10 gold:bg-[#d4af37]/5 blur-[120px] z-10 pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{
          repeat: Infinity,
          duration: 10,
          ease: "easeInOut"
        }}
        className="absolute bottom-1/4 right-1/4 w-[30vw] h-[30vw] rounded-full bg-blue-500/10 gold:bg-[#d4af37]/5 blur-[100px] z-10 pointer-events-none"
      />

      {/* Main Content */}
      <div className="relative z-20 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          <motion.p
            variants={itemVariants}
            className="text-orange-500 gold:text-[#d4af37] text-sm md:text-base font-bold uppercase tracking-[6px] mb-4"
          >
            Industrial Engineering Solutions
          </motion.p>

          <motion.h1
            variants={itemVariants}
            className="text-white text-5xl md:text-8xl font-black tracking-tight leading-none font-outfit"
          >
            Building <br />
            <span className="gradient-text gold:gradient-gold font-extrabold">The Future</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-gray-300 gold:text-gray-400 text-lg md:text-2xl mt-6 max-w-3xl leading-relaxed"
          >
            Precision Manufacturing • Specialized Fabrication • Industrial Automation
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-5 mt-10"
          >
            <Link to="/products">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto px-10 py-4 rounded-full bg-orange-500 gold:bg-gradient-to-r gold:from-[#bf953f] gold:to-[#aa771c] text-white font-bold shadow-2xl transition-all duration-300 hover:shadow-orange-500/20"
              >
                Explore Products
              </motion.button>
            </Link>

            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto border border-white/30 bg-white/10 gold:border-[#d4af37]/30 gold:bg-[#d4af37]/10 backdrop-blur-md hover:bg-white hover:text-slate-900 px-10 py-4 rounded-full text-white font-bold transition-all duration-300"
              >
                Contact Us
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Glass Metric 1 */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        whileHover={{ y: -5, scale: 1.05 }}
        className="hidden lg:flex flex-col absolute top-1/3 left-12 xl:left-24 z-35 bg-white/5 gold:bg-black/30 border border-white/10 gold:border-[#d4af37]/20 backdrop-blur-xl p-6 rounded-3xl text-left shadow-2xl"
      >
        <span className="text-4xl font-extrabold text-orange-500 gold:gradient-gold">10+</span>
        <span className="text-sm font-semibold tracking-wide text-gray-300 mt-1 uppercase">Years Experience</span>
      </motion.div>

      {/* Floating Glass Metric 2 */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        whileHover={{ y: -5, scale: 1.05 }}
        className="hidden lg:flex flex-col absolute bottom-1/4 right-12 xl:right-24 z-35 bg-white/5 gold:bg-black/30 border border-white/10 gold:border-[#d4af37]/20 backdrop-blur-xl p-6 rounded-3xl text-left shadow-2xl"
      >
        <span className="text-4xl font-extrabold text-orange-500 gold:gradient-gold">500+</span>
        <span className="text-sm font-semibold tracking-wide text-gray-300 mt-1 uppercase">Projects Completed</span>
      </motion.div>
    </section>
  );
}
