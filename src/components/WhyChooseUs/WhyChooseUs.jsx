import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import AnimatedText from "../AnimatedText";
import {
  FaAward,
  FaIndustry,
  FaUsers,
  FaTools,
  FaCheckCircle,
} from "react-icons/fa";

export default function WhyChooseUs() {
  const features = [
    {
      icon: <FaAward />,
      title: "ISO Certified",
      desc: "Maintaining international quality standards."
    },
    {
      icon: <FaIndustry />,
      title: "Modern Manufacturing",
      desc: "Advanced machinery and production facilities."
    },
    {
      icon: <FaUsers />,
      title: "Expert Team",
      desc: "Highly skilled engineers and technicians."
    },
    {
      icon: <FaTools />,
      title: "Custom Solutions",
      desc: "Tailor-made industrial engineering services."
    },
    {
      icon: <FaCheckCircle />,
      title: "Quality Assurance",
      desc: "Rigorous quality inspection process."
    }
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  };

  return (
    <section className="py-32 bg-slate-50 dark:bg-[#0b0f19] gold:bg-black/60 border-t border-b border-slate-200/5 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <span className="text-orange-500 gold:text-[#d4af37] font-bold tracking-widest uppercase">
            Why Choose Us
          </span>
          <h2 className="text-4xl md:text-6xl font-black mt-4 font-outfit text-slate-900 dark:text-white gold:gradient-gold">
            <AnimatedText text="Excellence In Every Project" />
          </h2>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-5 gap-6"
        >
          {features.map((item, index) => (
            <motion.div variants={cardVariants} key={index}>
              <Tilt
                glareEnable={true}
                glareMaxOpacity={0.1}
                glareColor="var(--accent)"
                glarePosition="all"
                tiltMaxAngleX={10}
                tiltMaxAngleY={10}
                className="h-full"
              >
                <div className="h-full bg-white dark:bg-[#111827] gold:bg-[#121212] gold:border gold:border-[#d4af37]/20 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 text-center flex flex-col items-center justify-between min-h-[300px]">
                  <div className="text-5xl text-orange-500 gold:text-[#d4af37] mb-6 flex justify-center bg-orange-50 dark:bg-orange-500/10 gold:bg-[#d4af37]/10 p-5 rounded-2xl">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-4 font-outfit text-slate-900 dark:text-white gold:text-[#d4af37]">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </Tilt>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}