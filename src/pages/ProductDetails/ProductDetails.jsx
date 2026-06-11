import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL, UPLOAD_BASE_URL } from "../../config";
import products from "../../data/products";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronRight, FaTimes, FaCheckCircle, FaFilePdf, FaShieldAlt } from "react-icons/fa";

export default function ProductDetails() {
  const { id } = useParams();
  const [modalOpen, setModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", company: "", qty: 1, msg: "" });

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/products`);
        const dbProduct = res.data?.find((p) => p.id === Number(id));
        if (dbProduct) {
          setProduct({
            ...dbProduct,
            image: dbProduct.image ? `${UPLOAD_BASE_URL}/${dbProduct.image}` : null
          });
        } else {
          // Try fallback static list
          const staticProduct = products.find((p) => p.id === Number(id));
          setProduct(staticProduct || null);
        }
      } catch (err) {
        console.warn("API Product Details Fetch Error, using static assets fallback:", err);
        const staticProduct = products.find((p) => p.id === Number(id));
        setProduct(staticProduct || null);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <PageWrapper>
        <Navbar />
        <div className="py-40 text-center flex flex-col items-center justify-center gap-3 bg-slate-950">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-orange-500 gold:border-[#d4af37]" />
          <span className="text-slate-400 font-bold uppercase tracking-wider text-xs">Loading Product Details...</span>
        </div>
        <Footer />
      </PageWrapper>
    );
  }

  if (!product) {
    return (
      <PageWrapper>
        <Navbar />
        <section className="py-40 text-center">
          <h1 className="text-4xl font-extrabold font-outfit">Product Not Found</h1>
          <Link to="/products" className="text-orange-500 mt-4 inline-block hover:underline">Return to products</Link>
        </section>
        <Footer />
      </PageWrapper>
    );
  }

  // Sample hardcoded specs for visual completeness
  const specs = [
    { label: "Material Construction", val: "Stainless Steel 316 / 316L grade" },
    { label: "Connection Sizes", val: "1/2\" to 4\" Flanged / Threaded" },
    { label: "Maximum Pressure Rating", val: "Up to 1500 PSI (103 Bar)" },
    { label: "Temperature Range", val: "-20°F to 450°F (-29°C to 232°C)" },
    { label: "Certification Approvals", val: "API 6D, CE, ISO 9001:2015, SIL 3" }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setModalOpen(false);
      setForm({ name: "", email: "", company: "", qty: 1, msg: "" });
    }, 2500);
  };

  return (
    <PageWrapper>
      <Navbar />

      {/* Breadcrumbs */}
      <section className="bg-slate-50 dark:bg-[#0b0f19]/60 gold:bg-black/60 pt-28 pb-4 border-b border-slate-200/20">
        <div className="max-w-7xl mx-auto px-6 text-sm flex items-center gap-2 text-slate-500 dark:text-gray-400 gold:text-gray-400">
          <Link to="/" className="hover:text-orange-500">Home</Link>
          <FaChevronRight className="text-xs" />
          <Link to="/products" className="hover:text-orange-500">Products</Link>
          <FaChevronRight className="text-xs" />
          <span className="font-semibold text-slate-800 dark:text-white gold:text-[#d4af37]">{product.name}</span>
        </div>
      </section>

      {/* Main Details Panel */}
      <section className="py-24 bg-white dark:bg-slate-950 gold:bg-[#050505] transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Image Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-slate-100 dark:bg-slate-900 gold:bg-[#121212] border border-slate-200/50 dark:border-white/5 gold:border-[#d4af37]/15 rounded-[32px] overflow-hidden p-4 shadow-xl"
            >
              <img
                src={product.image || "https://placehold.co/600x450?text=No+Image+Available"}
                alt={product.name}
                className="w-full h-[450px] object-cover rounded-2xl shadow-md"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://placehold.co/600x450?text=No+Image+Available";
                }}
              />
            </motion.div>

            {/* Info Box */}
            <div className="flex flex-col justify-between">
              <div>
                <span className="inline-block bg-orange-100 dark:bg-orange-500/10 gold:bg-[#d4af37]/10 text-orange-500 gold:text-[#d4af37] font-bold text-sm px-4 py-2 rounded-xl uppercase tracking-wider">
                  {product.category}
                </span>
                <h1 className="text-4xl md:text-5xl font-black mt-4 font-outfit text-slate-900 dark:text-white gold:gradient-gold tracking-tight">
                  {product.name}
                </h1>
                <p className="mt-6 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  {product.description}
                </p>

                {/* Technical specs table summary */}
                <h3 className="text-2xl font-black mt-10 mb-4 font-outfit text-slate-900 dark:text-white gold:text-[#d4af37]">
                  Technical Specifications
                </h3>
                <div className="border border-slate-100 dark:border-slate-800 gold:border-[#d4af37]/10 rounded-2xl overflow-hidden shadow-sm">
                  {specs.map((s, idx) => (
                    <div
                      key={idx}
                      className={`grid grid-cols-2 p-4 text-sm md:text-base ${
                        idx % 2 === 0
                          ? "bg-slate-50 dark:bg-slate-900/40 gold:bg-[#121212]/50"
                          : "bg-white dark:bg-slate-950 gold:bg-[#050505]"
                      } border-b border-slate-100 dark:border-slate-800 gold:border-[#d4af37]/10 last:border-0`}
                    >
                      <span className="font-bold text-slate-500 dark:text-gray-400 gold:text-gray-400">{s.label}</span>
                      <span className="text-slate-800 dark:text-gray-200 gold:text-gray-200">{s.val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action buttons */}
              <div className="mt-10 flex flex-wrap gap-4 items-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setModalOpen(true)}
                  className="px-8 py-4 rounded-full bg-orange-500 gold:bg-gradient-to-r gold:from-[#bf953f] gold:to-[#aa771c] text-white font-bold shadow-lg hover:bg-orange-600 transition-all duration-300"
                >
                  Request Technical Quote
                </motion.button>
                <button className="flex items-center gap-2 text-slate-600 dark:text-gray-300 gold:text-gray-300 hover:text-orange-500 gold:hover:text-[#d4af37] font-bold text-sm uppercase tracking-wide">
                  <FaFilePdf className="text-lg" />
                  <span>Download Catalog PDF</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Modal */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-6">
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
              className="relative bg-white dark:bg-slate-900 gold:bg-[#121212] border border-slate-200 dark:border-slate-800 gold:border-[#d4af37]/25 w-full max-w-xl rounded-[32px] p-8 md:p-10 shadow-2xl z-10"
            >
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 dark:hover:text-white text-xl"
              >
                <FaTimes />
              </button>

              <div className="text-center mb-8">
                <span className="text-orange-500 gold:text-[#d4af37] text-2xl"><FaShieldAlt className="inline" /></span>
                <h2 className="text-3xl font-black mt-2 font-outfit text-slate-900 dark:text-white gold:text-gray-100">
                  Request Quote
                </h2>
                <p className="text-slate-500 dark:text-gray-400 text-sm mt-2">
                  Submit this specification request sheet and our sales team will reach out within 24 hours.
                </p>
              </div>

              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-4"
                    exit={{ opacity: 0 }}
                  >
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

                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Company Name"
                        value={form.company}
                        onChange={(e) => setForm({ ...form, company: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 gold:bg-black border border-slate-200 dark:border-slate-800 gold:border-[#d4af37]/25 rounded-xl text-slate-800 dark:text-white focus:outline-none focus:border-orange-500"
                      />
                      <input
                        type="number"
                        placeholder="Quantity Required"
                        min="1"
                        value={form.qty}
                        onChange={(e) => setForm({ ...form, qty: Number(e.target.value) })}
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 gold:bg-black border border-slate-200 dark:border-slate-800 gold:border-[#d4af37]/25 rounded-xl text-slate-800 dark:text-white focus:outline-none focus:border-orange-500"
                      />
                    </div>

                    <textarea
                      placeholder={`I would like to request a quote for the ${product.name}. Please include options for customized bulk orders.`}
                      rows="4"
                      value={form.msg}
                      onChange={(e) => setForm({ ...form, msg: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 gold:bg-black border border-slate-200 dark:border-slate-800 gold:border-[#d4af37]/25 rounded-xl text-slate-800 dark:text-white focus:outline-none focus:border-orange-500 resize-none"
                    />

                    <button className="w-full py-4 bg-orange-500 gold:bg-gradient-to-r gold:from-[#bf953f] gold:to-[#aa771c] text-white font-bold rounded-xl shadow-lg mt-6">
                      Send Specifications Request
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-10 flex flex-col items-center justify-center gap-4"
                  >
                    <FaCheckCircle className="text-green-500 text-6xl animate-bounce" />
                    <h3 className="text-2xl font-bold font-outfit text-slate-900 dark:text-white gold:text-[#d4af37]">
                      Request Submitted Successfully!
                    </h3>
                    <p className="text-slate-500 dark:text-gray-400 text-sm max-w-sm">
                      Our commercial engineering team is compiling the pricing metrics and will respond shortly.
                    </p>
                  </motion.div>
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