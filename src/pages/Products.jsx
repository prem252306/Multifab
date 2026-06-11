import { useState, useEffect, lazy, Suspense } from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import PageWrapper from "../components/PageWrapper/PageWrapper";
import products from "../data/products";
import axios from "axios";
import { API_BASE_URL, UPLOAD_BASE_URL } from "../config";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { FaSearch, FaArrowRight, FaFilter, FaCalculator, FaTimes, FaCheckCircle, FaSlidersH } from "react-icons/fa";

const ThreeDViewer = lazy(() => import("../components/ThreeDViewer/ThreeDViewer"));

export default function Products() {
  const [allProducts, setAllProducts] = useState(products);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const fetchDbProducts = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/products`);
        if (res.data && res.data.length > 0) {
          const mapped = res.data.map((p) => ({
            ...p,
            image: p.image ? `${UPLOAD_BASE_URL}/${p.image}` : null
          }));
          setAllProducts(mapped);
        }
      } catch (err) {
        console.warn("API Products Fetch Error, using static assets fallback:", err);
      }
    };
    fetchDbProducts();
  }, []);

  // Calculator states
  const [calcMaterial, setCalcMaterial] = useState("Stainless Steel 316");
  const [calcLength, setCalcLength] = useState(600); // mm
  const [calcWidth, setCalcWidth] = useState(600); // mm
  const [calcThickness, setCalcThickness] = useState(12); // mm
  
  // Quote Modal states
  const [modalOpen, setModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", company: "", msg: "" });

  const categories = ["All", "Valves", "Instrumentation", "Flow Control"];

  const materialDensities = {
    "Carbon Steel": 7.85,
    "Stainless Steel 316": 8.00,
    "Brass / Copper": 8.50,
    "Titanium Alloy": 4.50
  };

  const materialCostFactors = {
    "Carbon Steel": 1.1,
    "Stainless Steel 316": 2.4,
    "Brass / Copper": 2.8,
    "Titanium Alloy": 6.2
  };

  // Weight Calculation: Volume (cm³) * Density (g/cm³) / 1000 = kg
  const volumeCm3 = (calcLength * calcWidth * calcThickness) / 1000;
  const density = materialDensities[calcMaterial];
  const weightKg = (volumeCm3 * density) / 1000;

  // Cost Estimate base metrics
  const costMultiplier = materialCostFactors[calcMaterial];
  const estimatedCost = Math.floor(weightKg * 8.5 * costMultiplier + 120); // USD Proxy
  const estimatedLeadTime = Math.max(5, Math.ceil(weightKg * 0.04 + 5)); // Days

  const filteredProducts = allProducts.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || 
                          p.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleModalSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setModalOpen(false);
      setForm({ name: "", email: "", company: "", msg: "" });
    }, 2500);
  };

  return (
    <PageWrapper>
      <Navbar />

      {/* Catalog Hero */}
      <section className="relative pt-40 pb-20 bg-slate-900 dark:bg-slate-950 gold:bg-black overflow-hidden">
        <div className="absolute inset-0 bg-radial-gradient from-orange-500/10 to-transparent blur-3xl opacity-40 z-0 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <span className="text-orange-500 gold:text-[#d4af37] font-bold tracking-widest uppercase text-sm">
            Our Catalog
          </span>
          <h1 className="text-5xl md:text-7xl font-black mt-4 text-white gold:gradient-gold font-outfit">
            Industrial Products
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-300 gold:text-gray-400 max-w-2xl mx-auto">
            High-precision, certified components engineered to perform in the most demanding process environments.
          </p>
        </div>
      </section>

      {/* Interactive Specifications & Weight Estimator Widget */}
      <section className="py-24 bg-white dark:bg-slate-950 gold:bg-[#050505] transition-colors duration-300 border-b border-slate-200/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-orange-500 gold:text-[#d4af37] font-bold tracking-widest uppercase text-xs md:text-sm">
              <FaCalculator className="inline mr-2" /> Technical Estimator
            </span>
            <h2 className="text-3xl md:text-5xl font-black mt-3 font-outfit text-slate-900 dark:text-white gold:gradient-gold">
              Specs & Weight Calculator
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mt-4 max-w-xl mx-auto text-sm md:text-base">
              Adjust dimensions and select alloy grades to dynamically calculate theoretical component weights, lead times, and fabrication baselines.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-10 items-stretch">
            {/* Input Sliders */}
            <div className="lg:col-span-4 bg-slate-50 dark:bg-slate-900 gold:bg-[#121212] border border-slate-200/55 dark:border-white/5 gold:border-[#d4af37]/15 p-8 rounded-[32px] shadow-xl flex flex-col justify-between space-y-6">
              <div>
                <h3 className="text-2xl font-black font-outfit mb-6 text-slate-900 dark:text-white gold:text-gray-200 flex items-center gap-2">
                  <FaSlidersH className="text-orange-500 gold:text-[#d4af37]" /> Input Parameters
                </h3>

                {/* Material Dropdown */}
                <div className="space-y-2 mb-6">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Metal / Material Alloy</label>
                  <select
                    value={calcMaterial}
                    onChange={(e) => setCalcMaterial(e.target.value)}
                    className="w-full px-4 py-3.5 bg-white dark:bg-slate-950 gold:bg-black border border-slate-200 dark:border-slate-800 gold:border-[#d4af37]/25 rounded-2xl text-slate-800 dark:text-white focus:outline-none focus:border-orange-500 gold:focus:border-[#d4af37] font-semibold"
                  >
                    {Object.keys(materialDensities).map((m) => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </div>

                {/* Length Slider */}
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="font-bold text-slate-500 dark:text-gray-300">Length</span>
                    <span className="font-black text-orange-500 gold:text-[#d4af37] font-outfit">{calcLength} mm</span>
                  </div>
                  <input
                    type="range"
                    min="100"
                    max="3000"
                    step="10"
                    value={calcLength}
                    onChange={(e) => setCalcLength(Number(e.target.value))}
                    className="w-full accent-orange-500 gold:accent-[#d4af37]"
                  />
                </div>

                {/* Width Slider */}
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="font-bold text-slate-500 dark:text-gray-300">Width</span>
                    <span className="font-black text-orange-500 gold:text-[#d4af37] font-outfit">{calcWidth} mm</span>
                  </div>
                  <input
                    type="range"
                    min="100"
                    max="1500"
                    step="10"
                    value={calcWidth}
                    onChange={(e) => setCalcWidth(Number(e.target.value))}
                    className="w-full accent-orange-500 gold:accent-[#d4af37]"
                  />
                </div>

                {/* Thickness Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-bold text-slate-500 dark:text-gray-300">Thickness</span>
                    <span className="font-black text-orange-500 gold:text-[#d4af37] font-outfit">{calcThickness} mm</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="100"
                    step="1"
                    value={calcThickness}
                    onChange={(e) => setCalcThickness(Number(e.target.value))}
                    className="w-full accent-orange-500 gold:accent-[#d4af37]"
                  />
                </div>
              </div>
            </div>

          {/* WebGL 3D Spec Viewer */}
          <div className="lg:col-span-4 flex flex-col justify-stretch">
            <Suspense fallback={
              <div className="relative w-full h-full min-h-[300px] md:min-h-[400px] bg-slate-900/10 dark:bg-slate-950/20 gold:bg-black/40 border border-slate-200/50 dark:border-white/5 gold:border-[#d4af37]/15 rounded-3xl overflow-hidden shadow-2xl flex flex-col items-center justify-center p-4">
                <span className="text-orange-500 gold:text-[#d4af37] text-xs font-bold uppercase tracking-widest animate-pulse">
                  Initializing WebGL...
                </span>
              </div>
            }>
              <ThreeDViewer
                materialType={calcMaterial}
                thickness={calcThickness}
                length={calcLength}
                width={calcWidth}
              />
            </Suspense>
          </div>

          {/* Calculations Display Output Card */}
          <div className="lg:col-span-4">
              <div className="h-full bg-slate-900 border border-white/5 gold:border-[#d4af37]/25 rounded-[32px] p-8 md:p-10 flex flex-col justify-between relative overflow-hidden shadow-2xl text-white">
                {/* Accent glows */}
                <div className="absolute -top-12 -right-12 w-48 h-48 bg-orange-500/10 gold:bg-[#d4af37]/10 rounded-full blur-3xl pointer-events-none" />

                <div>
                  <h3 className="text-xl font-bold font-outfit uppercase tracking-widest text-orange-500 gold:text-[#d4af37] mb-8">
                    Calculation Metrics
                  </h3>

                  {/* Calculated Weight Indicator */}
                  <div className="mb-8">
                    <span className="text-xs uppercase tracking-wider text-slate-400">Estimated Workpiece Weight</span>
                    <div className="text-5xl md:text-6xl font-black text-white gold:gradient-gold font-outfit mt-2">
                      {weightKg.toFixed(2)} <span className="text-2xl font-light">kg</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6 border-t border-white/10 pt-8">
                    <div>
                      <span className="text-xs uppercase tracking-wider text-slate-400">Est. Fabrication Cost</span>
                      <div className="text-2xl font-bold text-white mt-1">
                        ${estimatedCost.toLocaleString()} USD
                      </div>
                    </div>
                    <div>
                      <span className="text-xs uppercase tracking-wider text-slate-400">Est. Lead Time</span>
                      <div className="text-2xl font-bold text-white mt-1">
                        {estimatedLeadTime} Business Days
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setModalOpen(true)}
                  className="w-full mt-10 py-4 bg-orange-500 gold:bg-gradient-to-r gold:from-[#bf953f] gold:to-[#aa771c] text-white font-bold rounded-2xl shadow-xl transition-all duration-300 hover:scale-102"
                >
                  Request Quote with these Specs
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Catalog Search and Filters */}
      <section className="py-24 bg-slate-50 dark:bg-[#0b0f19] gold:bg-[#050505] transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-6 justify-between items-center bg-white dark:bg-slate-900 gold:bg-[#121212] border border-slate-200/50 dark:border-white/5 gold:border-[#d4af37]/15 p-6 rounded-3xl shadow-xl">
            {/* Search Bar */}
            <div className="relative w-full lg:max-w-md">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-950 gold:bg-black border border-slate-200 dark:border-slate-800 gold:border-[#d4af37]/25 rounded-2xl text-slate-800 dark:text-white gold:text-white focus:outline-none focus:border-orange-500 gold:focus:border-[#d4af37] transition-all"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2 w-full lg:w-auto">
              <div className="flex items-center gap-2 mr-2 text-slate-500 dark:text-gray-400 gold:text-gray-400 font-semibold text-sm">
                <FaFilter />
                <span>Filter:</span>
              </div>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2 rounded-xl text-sm font-bold transition-all duration-300 ${
                    selectedCategory === cat
                      ? "bg-orange-500 gold:bg-gradient-to-r gold:from-[#bf953f] gold:to-[#aa771c] text-white shadow-md"
                      : "bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 gold:bg-black/60 gold:border gold:border-[#d4af37]/20 text-slate-600 dark:text-gray-300 gold:text-gray-400"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Grid list */}
          <motion.div 
            layout 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12"
          >
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((p) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  key={p.id}
                  className="bg-white dark:bg-slate-900 gold:bg-[#121212] border border-slate-200/50 dark:border-white/5 gold:border-[#d4af37]/15 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="relative h-64 overflow-hidden group">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <span className="absolute top-4 left-4 bg-orange-500 gold:bg-[#d4af37] text-white gold:text-slate-950 font-bold text-xs px-3 py-1.5 rounded-full uppercase tracking-wider">
                      {p.category}
                    </span>
                  </div>

                  <div className="p-8 flex-grow flex flex-col justify-between">
                    <div>
                      <h3 className="text-2xl font-black font-outfit text-slate-900 dark:text-white gold:text-[#d4af37]">
                        {p.name}
                      </h3>
                      <p className="mt-4 text-gray-600 dark:text-gray-400 text-sm leading-relaxed line-clamp-3">
                        {p.description}
                      </p>
                    </div>

                    <div className="mt-8 border-t border-slate-100 dark:border-slate-800 gold:border-[#d4af37]/10 pt-6 flex items-center justify-between">
                      <Link
                        to={`/product/${p.id}`}
                        className="inline-flex items-center gap-2 text-sm font-bold text-orange-500 gold:text-[#d4af37] tracking-wider uppercase group"
                      >
                        View Details
                        <FaArrowRight className="transform group-hover:translate-x-1.5 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-20 bg-white dark:bg-slate-900 gold:bg-[#121212] rounded-3xl border border-dashed border-slate-300 dark:border-slate-800 gold:border-[#d4af37]/20 mt-12">
              <p className="text-gray-500 dark:text-gray-400 text-lg">No products found matching your search options.</p>
            </div>
          )}
        </div>
      </section>

      {/* Quote Request Modal */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-[99999] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              className="relative bg-white dark:bg-slate-900 gold:bg-[#121212] border border-slate-200 dark:border-slate-800 gold:border-[#d4af37]/25 w-full max-w-xl rounded-[32px] p-8 md:p-10 shadow-2xl z-10 text-slate-800 dark:text-white"
            >
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 dark:hover:text-white text-xl"
              >
                <FaTimes />
              </button>

              <div className="text-center mb-8">
                <span className="text-orange-500 gold:text-[#d4af37] text-3xl"><FaCalculator className="inline" /></span>
                <h2 className="text-3xl font-black mt-2 font-outfit text-slate-900 dark:text-white gold:text-gray-100">
                  Submit Calculator Specs
                </h2>
                <p className="text-slate-500 dark:text-gray-400 text-sm mt-2">
                  Requesting engineering consult for: {calcLength}x{calcWidth}x{calcThickness}mm in {calcMaterial}.
                </p>
              </div>

              <AnimatePresence mode="wait">
                {!submitted ? (
                  <form onSubmit={handleModalSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Full Name *"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 gold:bg-black border border-slate-200 dark:border-slate-800 gold:border-[#d4af37]/25 rounded-xl text-slate-800 dark:text-white focus:outline-none focus:border-orange-500"
                      />
                      <input
                        type="email"
                        placeholder="Email Address *"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 gold:bg-black border border-slate-200 dark:border-slate-800 gold:border-[#d4af37]/25 rounded-xl text-slate-800 dark:text-white focus:outline-none focus:border-orange-500"
                      />
                    </div>

                    <input
                      type="text"
                      placeholder="Company Name"
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 gold:bg-black border border-slate-200 dark:border-slate-800 gold:border-[#d4af37]/25 rounded-xl text-slate-800 dark:text-white focus:outline-none focus:border-orange-500"
                    />

                    <textarea
                      placeholder={`Hello, I would like to request a formal quote for a custom fabricated ${calcMaterial} part with dimensions ${calcLength}mm x ${calcWidth}mm x ${calcThickness}mm. The calculated weight is ${weightKg.toFixed(2)} kg.`}
                      rows="4"
                      value={form.msg}
                      onChange={(e) => setForm({ ...form, msg: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 gold:bg-black border border-slate-200 dark:border-slate-800 gold:border-[#d4af37]/25 rounded-xl text-slate-800 dark:text-white focus:outline-none focus:border-orange-500 resize-none"
                    />

                    <button className="w-full py-4 bg-orange-500 gold:bg-gradient-to-r gold:from-[#bf953f] gold:to-[#aa771c] text-white font-bold rounded-xl shadow-lg mt-6">
                      Send Request
                    </button>
                  </form>
                ) : (
                  <div className="text-center py-10 flex flex-col items-center justify-center gap-4">
                    <FaCheckCircle className="text-green-500 text-6xl animate-bounce" />
                    <h3 className="text-2xl font-bold font-outfit text-slate-900 dark:text-white gold:text-[#d4af37]">
                      Specs Request Received!
                    </h3>
                    <p className="text-slate-500 dark:text-gray-400 text-sm max-w-sm">
                      Our engineering design team will model the specifications and verify weight parameters shortly.
                    </p>
                  </div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </PageWrapper>
  );
}