import { useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import { motion } from "framer-motion";
import { FaGraduationCap, FaHospital, FaClock, FaUpload, FaCheckCircle, FaBriefcase } from "react-icons/fa";

export default function Career() {
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    position: ""
  });

  const [resume, setResume] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const jobs = [
    { title: "Senior Design Engineer", dept: "R&D / CAD", loc: "Ahmedabad, India", exp: "5+ Years" },
    { title: "CNC Machine Operator", dept: "Production", loc: "Ahmedabad, India", exp: "2+ Years" },
    { title: "Quality Control Inspector", dept: "Quality Assurance", loc: "Ahmedabad, India", exp: "3+ Years" }
  ];

  const benefits = [
    { icon: <FaHospital />, title: "Medical Coverage", desc: "Comprehensive health insurance coverage for family." },
    { icon: <FaClock />, title: "Flexible Timings", desc: "Work-life balance focus with core hour flexibility." },
    { icon: <FaGraduationCap />, title: "Training Programs", desc: "Sponsorship for technical credentials and CAD courses." }
  ];

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleJobClick = (title) => {
    setForm({ ...form, position: title });
    // Smooth scroll to the form panel
    const formEl = document.getElementById("apply-form-container");
    if (formEl) {
      formEl.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!resume) {
      alert("Please upload your resume.");
      return;
    }
    setSubmitting(true);

    const formData = new FormData();
    Object.keys(form).forEach((key) => {
      formData.append(key, form[key]);
    });
    formData.append("resume", resume);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/career/apply",
        formData
      );
      setSubmitSuccess(true);
      setForm({ full_name: "", email: "", phone: "", position: "" });
      setResume(null);
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch {
      alert("Application submission failed. Please verify the backend service is running.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PageWrapper>
      <Navbar />

      {/* Careers Hero */}
      <section className="relative pt-40 pb-20 bg-slate-900 dark:bg-slate-950 gold:bg-black overflow-hidden">
        <div className="absolute inset-0 bg-radial-gradient from-orange-500/10 to-transparent blur-3xl opacity-40 z-0 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <span className="text-orange-500 gold:text-[#d4af37] font-bold tracking-widest uppercase text-sm">
            Careers
          </span>
          <h1 className="text-5xl md:text-7xl font-black mt-4 text-white gold:gradient-gold font-outfit">
            Shape The Industry
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-300 gold:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            We are looking for passionate engineers, operators, and designers who want to build the future of smart industrial systems.
          </p>
        </div>
      </section>

      {/* Main Split Section */}
      <section className="py-24 bg-slate-50 dark:bg-[#0b0f19] gold:bg-[#050505] transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            
            {/* Left: Job Openings & Benefits */}
            <div className="space-y-12">
              <div>
                <span className="text-orange-500 gold:text-[#d4af37] font-bold uppercase tracking-wider text-sm">Opportunities</span>
                <h2 className="text-3xl md:text-4xl font-black font-outfit text-slate-900 dark:text-white gold:text-[#d4af37] mt-2 mb-8">
                  Open Positions
                </h2>
                <div className="space-y-4">
                  {jobs.map((job) => (
                    <motion.div
                      key={job.title}
                      whileHover={{ scale: 1.02 }}
                      className="bg-white dark:bg-slate-900 gold:bg-[#121212] border border-slate-200/50 dark:border-white/5 gold:border-[#d4af37]/15 p-6 rounded-3xl shadow-md flex items-center justify-between gap-4"
                    >
                      <div>
                        <h4 className="text-lg font-black text-slate-900 dark:text-white gold:text-[#d4af37] font-outfit">
                          {job.title}
                        </h4>
                        <p className="text-sm text-slate-500 dark:text-gray-400 mt-1">
                          {job.dept} • {job.loc} • {job.exp}
                        </p>
                      </div>
                      <button
                        onClick={() => handleJobClick(job.title)}
                        className="px-5 py-2.5 rounded-full bg-orange-500/10 dark:bg-orange-500/10 gold:bg-[#d4af37]/10 text-orange-500 gold:text-[#d4af37] text-xs font-bold uppercase tracking-wider hover:bg-orange-500 hover:text-white gold:hover:bg-[#d4af37] gold:hover:text-slate-950 transition-all duration-300 whitespace-nowrap"
                      >
                        Apply Now
                      </button>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Benefits */}
              <div>
                <h3 className="text-2xl font-black font-outfit text-slate-900 dark:text-white gold:text-[#d4af37] mb-6">
                  Why Work With Us?
                </h3>
                <div className="grid gap-6">
                  {benefits.map((b) => (
                    <div key={b.title} className="flex gap-4 items-start">
                      <span className="text-3xl text-orange-500 gold:text-[#d4af37] bg-white dark:bg-slate-900 gold:bg-[#121212] border border-slate-200/50 dark:border-white/5 gold:border-[#d4af37]/15 p-4 rounded-2xl shadow-md">
                        {b.icon}
                      </span>
                      <div>
                        <h4 className="font-bold text-slate-900 dark:text-white gold:text-gray-200">{b.title}</h4>
                        <p className="text-sm text-slate-500 dark:text-gray-400 mt-1">{b.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Apply Form Card */}
            <div id="apply-form-container" className="lg:sticky lg:top-28">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-slate-900 gold:bg-[#121212] border border-slate-200/50 dark:border-white/5 gold:border-[#d4af37]/15 rounded-[32px] p-8 md:p-10 shadow-2xl"
              >
                <div className="text-center mb-8">
                  <span className="text-orange-500 gold:text-[#d4af37] text-3xl"><FaBriefcase className="inline" /></span>
                  <h2 className="text-3xl font-black font-outfit text-slate-900 dark:text-white gold:text-gray-100 mt-2">
                    Application Form
                  </h2>
                </div>

                {submitSuccess ? (
                  <div className="text-center py-12 flex flex-col items-center gap-4">
                    <FaCheckCircle className="text-green-500 text-6xl animate-bounce" />
                    <h3 className="text-2xl font-bold font-outfit text-slate-900 dark:text-white gold:text-[#d4af37]">
                      Application Sent!
                    </h3>
                    <p className="text-slate-500 dark:text-gray-400 text-sm max-w-sm">
                      We have received your resume. Our talent acquisition team will review your credentials shortly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-1">
                      <input
                        type="text"
                        name="full_name"
                        required
                        placeholder="Full Name *"
                        value={form.full_name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 gold:bg-black border border-slate-200 dark:border-slate-800 gold:border-[#d4af37]/25 rounded-xl text-slate-800 dark:text-white focus:outline-none focus:border-orange-500 transition-colors"
                      />
                    </div>

                    <div className="space-y-1">
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="Email Address *"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 gold:bg-black border border-slate-200 dark:border-slate-800 gold:border-[#d4af37]/25 rounded-xl text-slate-800 dark:text-white focus:outline-none focus:border-orange-500 transition-colors"
                      />
                    </div>

                    <div className="space-y-1">
                      <input
                        type="text"
                        name="phone"
                        required
                        placeholder="Phone Number *"
                        value={form.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 gold:bg-black border border-slate-200 dark:border-slate-800 gold:border-[#d4af37]/25 rounded-xl text-slate-800 dark:text-white focus:outline-none focus:border-orange-500 transition-colors"
                      />
                    </div>

                    <div className="space-y-1">
                      <input
                        type="text"
                        name="position"
                        required
                        placeholder="Target Position * (e.g. CNC Operator)"
                        value={form.position}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 gold:bg-black border border-slate-200 dark:border-slate-800 gold:border-[#d4af37]/25 rounded-xl text-slate-800 dark:text-white focus:outline-none focus:border-orange-500 transition-colors"
                      />
                    </div>

                    {/* Styled Resume Upload Button */}
                    <div className="space-y-2">
                      <span className="text-sm font-semibold text-slate-500 dark:text-gray-400">Resume Upload *</span>
                      <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 dark:border-slate-800 gold:border-[#d4af37]/25 hover:border-orange-500 gold:hover:border-[#d4af37] bg-slate-50 dark:bg-slate-950 gold:bg-black rounded-xl p-6 cursor-pointer transition-all">
                        <FaUpload className="text-3xl text-gray-400 mb-2 group-hover:text-orange-500" />
                        <span className="text-xs md:text-sm font-bold text-slate-600 dark:text-gray-300">
                          {resume ? resume.name : "Choose PDF / Word file"}
                        </span>
                        <input
                          type="file"
                          required
                          onChange={(e) => setResume(e.target.files[0])}
                          className="hidden"
                          accept=".pdf,.doc,.docx"
                        />
                      </label>
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-4 bg-orange-500 gold:bg-gradient-to-r gold:from-[#bf953f] gold:to-[#aa771c] text-white font-bold rounded-xl shadow-lg transition-all duration-300 hover:shadow-orange-500/20 disabled:opacity-50 mt-4"
                    >
                      {submitting ? "Submitting Application..." : "Submit Application"}
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