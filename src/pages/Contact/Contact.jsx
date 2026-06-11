import { useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import { motion } from "framer-motion";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaCheckCircle, FaComments } from "react-icons/fa";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSubmitting(true);
    setErrorMessage("");
    
    try {
      await axios.post("http://localhost:5000/api/contact", {
        name: form.name,
        email: form.email,
        phone: form.phone,
        subject: form.subject,
        message: form.message
      });
      setSubmitting(false);
      setSubmitted(true);
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      console.error("Contact form error:", error);
      setErrorMessage(
        error.response?.data?.message || 
        error.response?.data?.error || 
        "Failed to send message. Please ensure the backend is running."
      );
      setSubmitting(false);
    }
  };

  const contactInfo = [
    { icon: <FaPhone />, label: "Call Us", val: "+91 94293 28956", desc: "Mon-Sat, 9AM to 6PM" },
    { icon: <FaEnvelope />, label: "Email Support", val: "info@multifab.in", desc: "Queries & Requests" },
    { icon: <FaMapMarkerAlt />, label: "Manufacturing Plant", val: "Phase IV, GIDC Vatva, Ahmedabad, India", desc: "Corporate Headquarters" }
  ];

  return (
    <PageWrapper>
      <Navbar />

      {/* Contact Hero */}
      <section className="relative pt-40 pb-20 bg-slate-900 dark:bg-slate-950 gold:bg-black overflow-hidden">
        <div className="absolute inset-0 bg-radial-gradient from-orange-500/10 to-transparent blur-3xl opacity-40 z-0 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <span className="text-orange-500 gold:text-[#d4af37] font-bold tracking-widest uppercase text-sm">
            Get In Touch
          </span>
          <h1 className="text-5xl md:text-7xl font-black mt-4 text-white gold:gradient-gold font-outfit">
            Contact Our Team
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-300 gold:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Have a custom blueprint or tooling inquiry? Reach out to our design and sales team for consulting support.
          </p>
        </div>
      </section>

      {/* Contact Content Split */}
      <section className="py-24 bg-slate-50 dark:bg-[#0b0f19] gold:bg-[#050505] transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            
            {/* Left Column: Details & Mock Map */}
            <div className="space-y-12">
              <div className="space-y-8">
                <span className="text-orange-500 gold:text-[#d4af37] font-bold uppercase tracking-wider text-sm">Channels</span>
                <h2 className="text-3xl md:text-4xl font-black font-outfit text-slate-900 dark:text-white gold:text-[#d4af37] mt-2 mb-8">
                  Contact Information
                </h2>
                <div className="grid gap-6">
                  {contactInfo.map((info) => (
                    <div key={info.label} className="flex gap-4 items-start">
                      <span className="text-3xl text-orange-500 gold:text-[#d4af37] bg-white dark:bg-slate-900 gold:bg-[#121212] border border-slate-200/50 dark:border-white/5 gold:border-[#d4af37]/15 p-4 rounded-2xl shadow-md">
                        {info.icon}
                      </span>
                      <div>
                        <h4 className="font-bold text-slate-500 dark:text-gray-400">{info.label}</h4>
                        <p className="text-lg font-black text-slate-900 dark:text-white gold:text-gray-200 mt-1">{info.val}</p>
                        <p className="text-xs text-slate-400 mt-0.5">{info.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Glowing Mock Map Layout */}
              <div className="relative h-64 bg-slate-200 dark:bg-slate-950 gold:bg-black rounded-3xl border border-slate-300 dark:border-slate-800 gold:border-[#d4af37]/20 overflow-hidden p-6 shadow-inner flex flex-col justify-end">
                {/* Background circuit/dots grid effect */}
                <div className="absolute inset-0 bg-[radial-gradient(#f97316_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] opacity-15 pointer-events-none" />
                
                {/* Glowing target point */}
                <div className="absolute top-1/2 left-1/3 z-20">
                  <span className="flex h-5 w-5 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 gold:bg-[#d4af37] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-5 w-5 bg-orange-500 gold:bg-[#d4af37]"></span>
                  </span>
                </div>

                <div className="relative z-10 bg-white/70 dark:bg-slate-900/80 gold:bg-black/80 border border-slate-300/30 dark:border-white/5 gold:border-[#d4af37]/20 backdrop-blur-md p-4 rounded-2xl max-w-xs text-slate-800 dark:text-white">
                  <h4 className="font-bold text-sm font-outfit">Vatva Industrial Zone</h4>
                  <p className="text-xs text-slate-500 dark:text-gray-400 mt-1">23.0031° N, 72.5850° E</p>
                  <p className="text-xs font-semibold text-orange-500 gold:text-[#d4af37] mt-1">Heavy Fabrication Plant #1</p>
                </div>
              </div>
            </div>

            {/* Right Column: Floating Form Panel */}
            <div className="lg:sticky lg:top-28">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-slate-900 gold:bg-[#121212] border border-slate-200/50 dark:border-white/5 gold:border-[#d4af37]/15 rounded-[32px] p-8 md:p-10 shadow-2xl"
              >
                <div className="text-center mb-8">
                  <span className="text-orange-500 gold:text-[#d4af37] text-3xl"><FaComments className="inline" /></span>
                  <h2 className="text-3xl font-black font-outfit text-slate-900 dark:text-white gold:text-gray-100 mt-2">
                    Send Query
                  </h2>
                </div>

                {submitted ? (
                  <div className="text-center py-16 flex flex-col items-center gap-4">
                    <FaCheckCircle className="text-green-500 text-6xl animate-bounce" />
                    <h3 className="text-2xl font-bold font-outfit text-slate-900 dark:text-white gold:text-[#d4af37]">
                      Message Received!
                    </h3>
                    <p className="text-slate-500 dark:text-gray-400 text-sm max-w-sm">
                      Thank you for contacting us. Our technical sales team has been notified and will reply shortly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={submit} className="space-y-5">
                    <input
                      placeholder="Name *"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-4 py-3.5 bg-slate-50 dark:bg-slate-950 gold:bg-black border border-slate-200 dark:border-slate-800 gold:border-[#d4af37]/25 rounded-xl text-slate-800 dark:text-white focus:outline-none focus:border-orange-500 transition-colors"
                    />

                    <input
                      type="email"
                      placeholder="Email Address *"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-3.5 bg-slate-50 dark:bg-slate-950 gold:bg-black border border-slate-200 dark:border-slate-800 gold:border-[#d4af37]/25 rounded-xl text-slate-800 dark:text-white focus:outline-none focus:border-orange-500 transition-colors"
                    />

                    <input
                      type="tel"
                      placeholder="Phone Number"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full px-4 py-3.5 bg-slate-50 dark:bg-slate-950 gold:bg-black border border-slate-200 dark:border-slate-800 gold:border-[#d4af37]/25 rounded-xl text-slate-800 dark:text-white focus:outline-none focus:border-orange-500 transition-colors"
                    />

                    <input
                      placeholder="Subject"
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full px-4 py-3.5 bg-slate-50 dark:bg-slate-950 gold:bg-black border border-slate-200 dark:border-slate-800 gold:border-[#d4af37]/25 rounded-xl text-slate-800 dark:text-white focus:outline-none focus:border-orange-500 transition-colors"
                    />

                    <textarea
                      rows="5"
                      placeholder="Your Message *"
                      required
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full px-4 py-3.5 bg-slate-50 dark:bg-slate-950 gold:bg-black border border-slate-200 dark:border-slate-800 gold:border-[#d4af37]/25 rounded-xl text-slate-800 dark:text-white focus:outline-none focus:border-orange-500 transition-colors resize-none"
                    />

                    {errorMessage && (
                      <p className="text-red-500 text-sm font-semibold text-center mt-2">
                        {errorMessage}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-4 bg-orange-500 gold:bg-gradient-to-r gold:from-[#bf953f] gold:to-[#aa771c] text-white font-bold rounded-xl shadow-lg transition-all duration-300 hover:shadow-orange-500/20 disabled:opacity-50 mt-4"
                    >
                      {submitting ? "Sending Message..." : "Send Message"}
                    </button>
                  </form>
                )}
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </PageWrapper>
  );
}