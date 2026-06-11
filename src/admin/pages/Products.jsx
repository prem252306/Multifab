import { useEffect, useState } from "react";
import api from "../services/api";
import { toast } from "react-hot-toast";
import { UPLOAD_BASE_URL } from "../../config";
import {
  FaBox,
  FaPlus,
  FaTrash,
  FaEdit,
  FaTimes,
  FaUpload,
  FaSpinner,
  FaTag,
  FaAlignLeft,
  FaImage,
  FaList,
  FaSlidersH,
  FaCogs
} from "react-icons/fa";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    category: "",
    description: "",
    pressure_rating: "",
    temp_range: "",
    material: "",
    sizes: ""
  });

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await api.get("/products");
      setProducts(res.data || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const resetForm = () => {
    setForm({
      name: "",
      category: "",
      description: "",
      pressure_rating: "",
      temp_range: "",
      material: "",
      sizes: ""
    });
    setImage(null);
    setImagePreview(null);
    setEditId(null);
  };

  const addProduct = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("category", form.category);
      formData.append("description", form.description);
      formData.append("pressure_rating", form.pressure_rating);
      formData.append("temp_range", form.temp_range);
      formData.append("material", form.material);
      formData.append("sizes", form.sizes);

      if (image) {
        formData.append("image", image);
      }

      await api.post("/products", formData);
      toast.success("Product added successfully!");
      resetForm();
      fetchProducts();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to add product");
    } finally {
      setSubmitLoading(false);
    }
  };

  const updateProduct = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("category", form.category);
      formData.append("description", form.description);
      formData.append("pressure_rating", form.pressure_rating);
      formData.append("temp_range", form.temp_range);
      formData.append("material", form.material);
      formData.append("sizes", form.sizes);

      if (image) {
        formData.append("image", image);
      }

      await api.put(`/products/${editId}`, formData);
      toast.success("Product updated successfully!");
      resetForm();
      fetchProducts();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to update product");
    } finally {
      setSubmitLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await api.delete(`/products/${id}`);
      toast.success("Product deleted successfully!");
      fetchProducts();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete product");
    }
  };

  const handleEditClick = (product) => {
    setEditId(product.id);
    setForm({
      name: product.name,
      category: product.category,
      description: product.description,
      pressure_rating: product.pressure_rating || "",
      temp_range: product.temp_range || "",
      material: product.material || "",
      sizes: product.sizes || ""
    });
    setImage(null);
    setImagePreview(
      product.image
        ? `${UPLOAD_BASE_URL}/${product.image}`
        : null
    );
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="space-y-8">
      {/* Title */}
      <div>
        <h1 className="text-4xl font-black font-outfit text-white gold:gradient-gold tracking-tight flex items-center gap-3">
          <FaBox className="text-orange-500 gold:text-[#d4af37] text-3xl animate-pulse" />
          <span>Products Inventory</span>
        </h1>
        <p className="text-slate-400 text-sm mt-1 uppercase font-semibold tracking-wider">
          Manage industrial product catalog, categories, and technical specifications
        </p>
      </div>

      {/* Grid Container */}
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form Panel */}
        <div className="lg:col-span-4 lg:sticky lg:top-8">
          <div className="bg-slate-900/40 border border-white/5 gold:border-[#d4af37]/15 p-6 rounded-[28px] shadow-2xl backdrop-blur-md">
            <h2 className="text-xl font-bold font-outfit text-white gold:text-[#d4af37] mb-6 flex items-center gap-2">
              {editId ? (
                <>
                  <FaEdit className="text-blue-500" />
                  <span>Edit Product #{editId}</span>
                </>
              ) : (
                <>
                  <FaPlus className="text-orange-500 gold:text-[#d4af37]" />
                  <span>Add New Product</span>
                </>
              )}
            </h2>

            <form
              onSubmit={editId ? updateProduct : addProduct}
              className="space-y-4"
            >
              {/* Product Name */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <FaBox className="text-slate-500" /> Product Name *
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="e.g. Precision Ball Valve"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-slate-950/40 border border-white/5 rounded-xl text-slate-200 focus:outline-none focus:border-orange-500 gold:focus:border-[#d4af37] transition-all text-sm placeholder:text-slate-600"
                />
              </div>

              {/* Category */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <FaTag className="text-slate-500" /> Category *
                </label>
                <input
                  type="text"
                  name="category"
                  placeholder="e.g. Valves, Instrumentation"
                  value={form.category}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-slate-950/40 border border-white/5 rounded-xl text-slate-200 focus:outline-none focus:border-orange-500 gold:focus:border-[#d4af37] transition-all text-sm placeholder:text-slate-600"
                />
              </div>

              {/* Specifications Subheading */}
              <div className="border-t border-white/5 pt-3 mt-3">
                <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                  <FaSlidersH className="text-orange-500 gold:text-[#d4af37]" /> Technical Specs (Optional)
                </h4>
              </div>

              {/* Material & Sizes */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">
                    Material Alloy
                  </label>
                  <input
                    type="text"
                    name="material"
                    placeholder="e.g. SS316 / Brass"
                    value={form.material}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 bg-slate-950/40 border border-white/5 rounded-xl text-slate-200 focus:outline-none focus:border-orange-500 gold:focus:border-[#d4af37] transition-all text-xs placeholder:text-slate-600"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">
                    Con. Sizes
                  </label>
                  <input
                    type="text"
                    name="sizes"
                    placeholder='e.g. 1/2" to 4"'
                    value={form.sizes}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 bg-slate-950/40 border border-white/5 rounded-xl text-slate-200 focus:outline-none focus:border-orange-500 gold:focus:border-[#d4af37] transition-all text-xs placeholder:text-slate-600"
                  />
                </div>
              </div>

              {/* Pressure Rating & Temperature Range */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">
                    Max Pressure
                  </label>
                  <input
                    type="text"
                    name="pressure_rating"
                    placeholder="e.g. 1500 PSI"
                    value={form.pressure_rating}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 bg-slate-950/40 border border-white/5 rounded-xl text-slate-200 focus:outline-none focus:border-orange-500 gold:focus:border-[#d4af37] transition-all text-xs placeholder:text-slate-600"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">
                    Temp Range
                  </label>
                  <input
                    type="text"
                    name="temp_range"
                    placeholder="e.g. -20F to 450F"
                    value={form.temp_range}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 bg-slate-950/40 border border-white/5 rounded-xl text-slate-200 focus:outline-none focus:border-orange-500 gold:focus:border-[#d4af37] transition-all text-xs placeholder:text-slate-600"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <FaAlignLeft className="text-slate-500" /> Description *
                </label>
                <textarea
                  name="description"
                  placeholder="Enter detailed technical description..."
                  value={form.description}
                  onChange={handleChange}
                  required
                  rows="3"
                  className="w-full px-4 py-3 bg-slate-950/40 border border-white/5 rounded-xl text-slate-200 focus:outline-none focus:border-orange-500 gold:focus:border-[#d4af37] transition-all text-sm resize-none placeholder:text-slate-600"
                />
              </div>

              {/* Image Uploader */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <FaImage className="text-slate-500" /> Product Image
                </label>

                {imagePreview ? (
                  <div className="relative group rounded-2xl overflow-hidden border border-white/5 aspect-video bg-slate-950 flex items-center justify-center">
                    <img
                      src={imagePreview}
                      alt="Selected preview"
                      className="w-full h-full object-cover transition-transform group-hover:scale-102 duration-300"
                    />
                    <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button
                        type="button"
                        onClick={() => {
                          setImage(null);
                          setImagePreview(null);
                        }}
                        className="p-3 bg-red-500 text-white rounded-full hover:bg-red-600 hover:scale-105 active:scale-95 transition-all shadow-lg"
                        title="Remove Image"
                      >
                        <FaTimes className="text-sm" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <label className="border-2 border-dashed border-white/5 hover:border-orange-500/50 gold:hover:border-[#d4af37]/50 rounded-2xl p-4 flex flex-col items-center justify-center gap-1 cursor-pointer bg-slate-950/20 hover:bg-slate-950/40 transition-all group">
                    <FaUpload className="text-slate-555 group-hover:text-orange-500 gold:group-hover:text-[#d4af37] text-lg transition-all" />
                    <span className="text-xs font-bold text-slate-400 group-hover:text-slate-300 transition-all">
                      Upload File
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFile}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col gap-3">
                <button
                  type="submit"
                  disabled={submitLoading}
                  className="w-full py-3.5 bg-orange-500 gold:bg-gradient-to-r gold:from-[#bf953f] gold:to-[#aa771c] hover:opacity-95 text-white font-bold rounded-2xl shadow-lg transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
                >
                  {submitLoading ? (
                    <FaSpinner className="animate-spin" />
                  ) : editId ? (
                    "Update Product"
                  ) : (
                    "Add Product"
                  )}
                </button>

                {editId && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="w-full py-3.5 bg-slate-800 hover:bg-slate-750 hover:text-white text-slate-300 font-bold rounded-2xl transition-all active:scale-[0.98] text-sm"
                  >
                    Cancel Edit
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Right Column: Inventory Table Panel */}
        <div className="lg:col-span-8 bg-slate-900/40 border border-white/5 gold:border-[#d4af37]/15 p-6 md:p-8 rounded-[32px] shadow-2xl">
          <h2 className="text-xl font-bold font-outfit text-white gold:text-[#d4af37] mb-6 flex items-center gap-2">
            <FaList className="text-slate-400" />
            <span>Product List ({products.length})</span>
          </h2>

          <div className="overflow-x-auto rounded-2xl border border-white/5 bg-slate-950/20">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-950/80 text-slate-300 font-bold uppercase text-xs border-b border-white/5">
                  <th className="p-4 w-12">ID</th>
                  <th className="p-4 w-24">Image</th>
                  <th className="p-4">Details</th>
                  <th className="p-4 hidden md:table-cell">Description</th>
                  <th className="p-4 text-center w-28">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm text-slate-200">
                {loading ? (
                  <tr>
                    <td colSpan="5" className="p-16 text-center text-slate-500">
                      <div className="flex flex-col items-center gap-3">
                        <FaSpinner className="animate-spin text-3xl text-orange-500 gold:text-[#d4af37]" />
                        <span className="font-bold text-xs uppercase tracking-wider">
                          Loading Catalog Database...
                        </span>
                      </div>
                    </td>
                  </tr>
                ) : products.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="p-16 text-center text-slate-500 font-bold">
                      No products found in the catalog database. Add a new product to populate.
                    </td>
                  </tr>
                ) : (
                  products.map((product) => (
                    <tr
                      key={product.id}
                      className="hover:bg-slate-900/45 transition-colors duration-200"
                    >
                      <td className="p-4 font-bold text-slate-500">{product.id}</td>

                      <td className="p-4">
                        <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-950 border border-white/5 shadow-inner flex items-center justify-center relative group">
                          {product.image ? (
                            <img
                              src={`${UPLOAD_BASE_URL}/${product.image}`}
                              alt={product.name}
                              className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "https://placehold.co/100?text=No+Img";
                              }}
                            />
                          ) : (
                            <FaBox className="text-slate-700 text-xl" />
                          )}
                        </div>
                      </td>

                      <td className="p-4 space-y-1">
                        <div className="font-black font-outfit text-white text-base">
                          {product.name}
                        </div>
                        <div className="flex flex-wrap gap-1.5 items-center">
                          <span className="inline-block px-2 py-0.5 rounded text-[9px] font-black uppercase bg-orange-500/10 text-orange-400 border border-orange-500/20 gold:bg-[#d4af37]/10 gold:text-[#d4af37] gold:border-[#d4af37]/20">
                            {product.category}
                          </span>
                        </div>
                        {/* Compact specifications summary listing */}
                        {(product.material || product.sizes || product.pressure_rating) && (
                          <div className="text-[10px] text-slate-500 space-y-0.5 border-t border-white/5 pt-1 mt-1 max-w-[200px] leading-relaxed">
                            {product.material && (
                              <div>
                                <span className="font-bold text-slate-400">Material:</span> {product.material}
                              </div>
                            )}
                            {product.sizes && (
                              <div>
                                <span className="font-bold text-slate-400">Sizes:</span> {product.sizes}
                              </div>
                            )}
                            {product.pressure_rating && (
                              <div>
                                <span className="font-bold text-slate-400">Pressure:</span> {product.pressure_rating}
                              </div>
                            )}
                          </div>
                        )}
                      </td>

                      <td className="p-4 max-w-xs xl:max-w-md hidden md:table-cell">
                        <p className="text-slate-400 text-xs leading-relaxed line-clamp-3">
                          {product.description}
                        </p>
                      </td>

                      <td className="p-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleEditClick(product)}
                            className="p-3 bg-blue-500/10 hover:bg-blue-500 text-blue-400 hover:text-white rounded-xl border border-blue-500/20 hover:border-transparent transition-all duration-300 active:scale-95 shadow-md"
                            title="Edit Product"
                          >
                            <FaEdit className="text-sm" />
                          </button>

                          <button
                            onClick={() => deleteProduct(product.id)}
                            className="p-3 bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white rounded-xl border border-red-500/20 hover:border-transparent transition-all duration-300 active:scale-95 shadow-md"
                            title="Delete Product"
                          >
                            <FaTrash className="text-sm" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}