import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import PageWrapper from "../components/PageWrapper/PageWrapper";
import { motion } from "framer-motion";
import { FaBullseye, FaLightbulb, FaShieldAlt, FaAward, FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa";

export default function About() {
  const timeline = [
    { year: "2010", title: "Company Founded", desc: "MultiFab Engineering was established with a single CNC machine and a dream of engineering excellence." },
    { year: "2014", title: "ISO 9001 Certification", desc: "Received international quality standards recognition and expanded operations to automated tooling." },
    { year: "2018", title: "Automation Expansion", desc: "Launched our smart robotics division, installing over 200 automated lines nationwide." },
    { year: "2022", title: "Mega Fab Facility", desc: "Inaugurated our new 50,000 sq ft smart manufacturing hub equipped with modern laser cutting setups." },
    { year: "2026", title: "Green Engineering Initiative", desc: "Adopted zero-waste practices and carbon-neutral manufacturing technologies across all operations." }
  ];

  const values = [
    { icon: <FaShieldAlt />, title: "Uncompromising Quality", desc: "We enforce strict testing at every production phase, maintaining an average of 99.8% precision rating." },
    { icon: <FaLightbulb />, title: "Constant Innovation", desc: "Our R&D team continuously develops bespoke software integrations and advanced hardware components." },
    { icon: <FaBullseye />, title: "Customer Centricity", desc: "We deliver bespoke blueprints and tailor-made machinery to resolve unique client workflow bottlenecks." },
    { icon: <FaAward />, title: "Ethical Integrity", desc: "Honest quotes, traceable materials, and transparent safety reporting form the foundation of our work." }
  ];

  const team = [
    { name: "Vikram Malhotra", role: "Founder & CEO", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80" },
    { name: "Dr. Ananya Iyer", role: "Chief Technical Officer", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80" },
    { name: "Siddharth Roy", role: "Head of Operations", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80" }
  ];

  return (
    <PageWrapper>
      <Navbar />

      {/* Page Hero */}
      <section className="relative pt-40 pb-24 bg-slate-900 dark:bg-slate-950 gold:bg-black overflow-hidden">
        <div className="absolute inset-0 bg-radial-gradient from-orange-500/10 to-transparent blur-3xl opacity-40 z-0 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-orange-500 gold:text-[#d4af37] font-bold tracking-widest uppercase text-sm"
          >
            Who We Are
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black mt-4 text-white gold:gradient-gold font-outfit"
          >
            Engineering With Precision
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-lg md:text-2xl text-gray-300 gold:text-gray-400 max-w-3xl mx-auto leading-relaxed"
          >
            Since 2010, MultiFab Engineering has been pioneering automation, high-end fabrication, and custom CNC components for blue-chip industrial partners globally.
          </motion.p>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-32 bg-slate-50 dark:bg-[#0b0f19] gold:bg-[#050505] transition-colors duration-300">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-20">
            <span className="text-orange-500 gold:text-[#d4af37] font-bold tracking-widest uppercase">Our Heritage</span>
            <h2 className="text-4xl md:text-5xl font-black mt-3 font-outfit text-slate-900 dark:text-white gold:text-[#d4af37]">Milestones of Growth</h2>
          </div>

          <div className="relative border-l border-slate-200 dark:border-slate-800 gold:border-[#d4af37]/25 ml-4 md:ml-32">
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="mb-16 relative pl-8 md:pl-16 group"
              >
                {/* Timeline node */}
                <div className="absolute -left-[13px] top-1.5 w-6 h-6 rounded-full bg-slate-50 dark:bg-[#0b0f19] gold:bg-black border-4 border-orange-500 gold:border-[#d4af37] group-hover:scale-125 transition-transform duration-300" />
                
                {/* Year Label */}
                <span className="hidden md:block absolute -left-32 top-1 w-24 text-right font-black font-outfit text-2xl text-orange-500 gold:text-[#d4af37]">
                  {item.year}
                </span>

                <div className="bg-white dark:bg-slate-900 gold:bg-[#121212] border border-slate-200/50 dark:border-white/5 gold:border-[#d4af37]/15 p-8 rounded-3xl shadow-xl">
                  <span className="md:hidden block font-black text-xl text-orange-500 gold:text-[#d4af37] mb-2">{item.year}</span>
                  <h3 className="text-2xl font-black font-outfit text-slate-900 dark:text-white gold:text-gray-100 mb-3">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm md:text-base">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-32 bg-white dark:bg-slate-950 gold:bg-[#0c0c0c] transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <span className="text-orange-500 gold:text-[#d4af37] font-bold tracking-widest uppercase">The Pillars</span>
            <h2 className="text-4xl md:text-5xl font-black mt-3 font-outfit text-slate-900 dark:text-white gold:text-[#d4af37]">Our Core Principles</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((val, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-slate-50 dark:bg-slate-900/40 gold:bg-[#121212] border border-slate-200/10 dark:border-white/5 gold:border-[#d4af37]/15 p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="text-4xl text-orange-500 gold:text-[#d4af37] mb-6">{val.icon}</div>
                <h3 className="text-2xl font-bold font-outfit text-slate-900 dark:text-white gold:text-gray-100 mb-4">{val.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{val.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Grid */}
      <section className="py-32 bg-slate-50 dark:bg-[#0b0f19] gold:bg-black transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <span className="text-orange-500 gold:text-[#d4af37] font-bold tracking-widest uppercase">Our Brains</span>
            <h2 className="text-4xl md:text-5xl font-black mt-3 font-outfit text-slate-900 dark:text-white gold:text-[#d4af37]">Leadership Team</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="bg-white dark:bg-slate-900 gold:bg-[#121212] border border-slate-200/50 dark:border-white/5 gold:border-[#d4af37]/15 rounded-3xl overflow-hidden shadow-xl"
              >
                <div className="h-72 overflow-hidden relative group">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-6 z-25 text-white">
                    <a href="#" className="hover:text-orange-500 gold:hover:text-[#d4af37] text-2xl transition-colors"><FaLinkedin /></a>
                    <a href="#" className="hover:text-orange-500 gold:hover:text-[#d4af37] text-2xl transition-colors"><FaTwitter /></a>
                    <a href="#" className="hover:text-orange-500 gold:hover:text-[#d4af37] text-2xl transition-colors"><FaEnvelope /></a>
                  </div>
                </div>
                <div className="p-8 text-center">
                  <h3 className="text-2xl font-black font-outfit text-slate-900 dark:text-white gold:text-[#d4af37]">{member.name}</h3>
                  <p className="text-slate-500 dark:text-gray-400 text-sm font-semibold tracking-wide uppercase mt-2">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </PageWrapper>
  );
}