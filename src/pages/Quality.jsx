import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import PageWrapper from "../components/PageWrapper/PageWrapper";
import { motion } from "framer-motion";
import { FaAward, FaVial, FaHistory, FaCheckDouble } from "react-icons/fa";

export default function Quality() {
  const qcSteps = [
    { num: "01", title: "Inward Material Testing", desc: "Rigorous chemical testing and physical checks of raw steels and alloys to verify manufacturer heat codes." },
    { num: "02", title: "In-Process QA Checks", desc: "Line machinists and dedicated inspectors execute real-time caliper calibrations and surface stress monitoring." },
    { num: "03", title: "Non-Destructive Testing", desc: "Dye-penetrant, ultrasonic crack inspections, and radiographies to confirm solid core internal structures." },
    { num: "04", title: "Hydrostatic Verification", desc: "Pressure testing valves and instrumentation housings up to 150% maximum limit for leakage detection." },
    { num: "05", title: "Final Inspection & Dispatch", desc: "Pre-packaging cosmetic audits and compilation of traceability certificate reports for final approval." }
  ];

  const standards = [
    { icon: <FaAward />, name: "ISO 9001:2015", detail: "Registered quality management framework governing all manufacturing and sales departments." },
    { icon: <FaVial />, name: "ASME Compliance", detail: "Fabrication procedures designed and welded according to Boiler and Pressure Vessel Codes Section VIII." },
    { icon: <FaHistory />, name: "EN 10204 3.1 Traceability", detail: "Full material reports providing chemical and mechanical history maps back to original mill casting." }
  ];

  return (
    <PageWrapper>
      <Navbar />

      {/* Quality Hero */}
      <section className="relative pt-40 pb-20 bg-slate-900 dark:bg-slate-950 gold:bg-black overflow-hidden">
        <div className="absolute inset-0 bg-radial-gradient from-orange-500/10 to-transparent blur-3xl opacity-40 z-0 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-orange-500 gold:text-[#d4af37] font-bold tracking-widest uppercase text-sm"
          >
            Standards
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black mt-4 text-white gold:gradient-gold font-outfit"
          >
            Quality Assurance
          </motion.h1>
          <p className="mt-6 text-lg md:text-xl text-gray-300 gold:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Where precision meets zero-defect compliance. We maintain strict manufacturing and testing protocols to ensure ultimate performance safety.
          </p>
        </div>
      </section>

      {/* Standards Badges Grid */}
      <section className="py-24 bg-white dark:bg-slate-950 gold:bg-[#050505] transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {standards.map((std, idx) => (
              <motion.div
                key={std.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="bg-slate-50 dark:bg-slate-900/60 gold:bg-[#121212] border border-slate-200/50 dark:border-white/5 gold:border-[#d4af37]/20 p-8 rounded-3xl text-center shadow-lg hover:shadow-xl transition-all"
              >
                <div className="text-5xl text-orange-500 gold:text-[#d4af37] flex justify-center mb-6">{std.icon}</div>
                <h3 className="text-2xl font-black font-outfit text-slate-900 dark:text-white gold:text-[#d4af37] mb-4">
                  {std.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {std.detail}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Testing Pipeline Flow */}
      <section className="py-32 bg-slate-50 dark:bg-[#0b0f19] gold:bg-[#0c0c0c] transition-colors duration-300 border-t border-b border-slate-200/5">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-20">
            <span className="text-orange-500 gold:text-[#d4af37] font-bold tracking-widest uppercase">The Pipeline</span>
            <h2 className="text-4xl md:text-5xl font-black mt-3 font-outfit text-slate-900 dark:text-white gold:text-[#d4af37]">Quality Control Workflow</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-4 max-w-xl mx-auto">
              Our systematic testing timeline ensures that no product leaves our shop floor without meeting 100% specification guidelines.
            </p>
          </div>

          <div className="relative border-l-2 border-orange-500/20 gold:border-[#d4af37]/20 ml-4 md:ml-8 space-y-12">
            {qcSteps.map((step, idx) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative pl-8 md:pl-16 group"
              >
                {/* Flow Node Circle */}
                <div className="absolute -left-[17px] top-0 w-8 h-8 rounded-full bg-orange-500 gold:bg-[#d4af37] text-white gold:text-slate-950 font-black font-outfit flex items-center justify-center text-xs group-hover:scale-110 transition-transform duration-300">
                  {step.num}
                </div>

                <div className="bg-white dark:bg-slate-900 gold:bg-[#121212] border border-slate-200/50 dark:border-white/5 gold:border-[#d4af37]/15 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all">
                  <h3 className="text-2xl font-black font-outfit text-slate-900 dark:text-white gold:text-gray-100 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm md:text-base">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* QC testing types grid */}
      <section className="py-32 bg-white dark:bg-slate-950 gold:bg-[#050505] transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <span className="text-orange-500 gold:text-[#d4af37] font-bold tracking-widest uppercase">Precision Standards</span>
              <h2 className="text-4xl md:text-5xl font-black font-outfit text-slate-900 dark:text-white gold:gradient-gold leading-tight">
                Metrology & Calibration Laboratory
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Our facilities house a temperature-controlled metrology lab with coordinate measuring machines (CMM) and electronic profile calibrators to verify tolerances up to ±0.005mm.
              </p>
              <div className="flex gap-4 items-center">
                <span className="bg-orange-50 dark:bg-orange-500/10 gold:bg-[#d4af37]/10 p-3.5 rounded-2xl text-2xl text-orange-500 gold:text-[#d4af37]">
                  <FaCheckDouble />
                </span>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white gold:text-gray-100">Zero tolerance for defects</h4>
                  <p className="text-sm text-slate-500 dark:text-gray-400">All calipers and CMMs calibrated to national standards weekly.</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-slate-50 dark:bg-slate-900 gold:bg-[#121212] border border-slate-200/50 dark:border-white/5 gold:border-[#d4af37]/15 rounded-[32px] overflow-hidden p-6 shadow-xl"
            >
              <img
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80"
                alt="QC Calibration Testing"
                className="w-full h-80 object-cover rounded-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </PageWrapper>
  );
}