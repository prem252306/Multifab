import { useEffect, useState } from "react";
import api from "../services/api";
import { toast } from "react-hot-toast";
import { UPLOAD_BASE_URL } from "../../config";
import {
  FaImages,
  FaTrash,
  FaTimes,
  FaUpload,
  FaSpinner,
  FaTag,
  FaEye
} from "react-icons/fa";

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const fetchGallery = async () => {
    setLoading(true);
    try {
      const res = await api.get("/gallery");
      setImages(res.data || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load gallery assets");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const resetForm = () => {
    setTitle("");
    setImage(null);
    setImagePreview(null);
  };

  const uploadImage = async (e) => {
    e.preventDefault();
    if (!image) {
      toast.error("Please select an image file first");
      return;
    }

    setUploadLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("image", image);

    try {
      await api.post("/gallery", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Image uploaded successfully!");
      resetForm();
      fetchGallery();
    } catch (err) {
      console.error(err);
      toast.error("Upload failed. Try again.");
    } finally {
      setUploadLoading(false);
    }
  };

  const deleteImage = async (id) => {
    if (!window.confirm("Are you sure you want to delete this image from the showcase?"))
      return;

    try {
      await api.delete(`/gallery/${id}`);
      toast.success("Asset deleted successfully!");
      fetchGallery();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete image");
    }
  };

  return (
    <div className="space-y-8">
      {/* Title */}
      <div>
        <h1 className="text-4xl font-black font-outfit text-white gold:gradient-gold tracking-tight flex items-center gap-3">
          <FaImages className="text-orange-500 gold:text-[#d4af37] text-3xl animate-pulse" />
          <span>Gallery Showcase</span>
        </h1>
        <p className="text-slate-400 text-sm mt-1 uppercase font-semibold tracking-wider">
          Upload and organize showcase gallery assets displayed on the public site
        </p>
      </div>

      {/* Grid container */}
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Upload Panel */}
        <div className="lg:col-span-4 lg:sticky lg:top-8">
          <div className="bg-slate-900/40 border border-white/5 gold:border-[#d4af37]/15 p-6 rounded-[28px] shadow-2xl backdrop-blur-md">
            <h2 className="text-xl font-bold font-outfit text-white gold:text-[#d4af37] mb-6 flex items-center gap-2">
              <FaUpload className="text-orange-500 gold:text-[#d4af37]" />
              <span>Upload New Asset</span>
            </h2>

            <form onSubmit={uploadImage} className="space-y-5">
              {/* Asset Title */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <FaTag className="text-slate-500" /> Asset Title *
                </label>
                <input
                  type="text"
                  placeholder="e.g. CNC Machine Assembly"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-slate-950/40 border border-white/5 rounded-xl text-slate-200 focus:outline-none focus:border-orange-500 gold:focus:border-[#d4af37] transition-all text-sm placeholder:text-slate-600"
                />
              </div>

              {/* Image Uploader */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <FaImages className="text-slate-500" /> File Attachment *
                </label>

                {imagePreview ? (
                  <div className="relative group rounded-2xl overflow-hidden border border-white/5 aspect-video bg-slate-950 flex items-center justify-center">
                    <img
                      src={imagePreview}
                      alt="Selected asset preview"
                      className="w-full h-full object-cover transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button
                        type="button"
                        onClick={() => {
                          setImage(null);
                          setImagePreview(null);
                        }}
                        className="p-3 bg-red-500 text-white rounded-full hover:bg-red-600 hover:scale-105 active:scale-95 transition-all shadow-lg"
                        title="Remove Attachment"
                      >
                        <FaTimes className="text-sm" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <label className="border-2 border-dashed border-white/5 hover:border-orange-500/50 gold:hover:border-[#d4af37]/50 rounded-2xl p-6 flex flex-col items-center justify-center gap-2 cursor-pointer bg-slate-950/20 hover:bg-slate-950/40 transition-all group">
                    <FaUpload className="text-slate-500 group-hover:text-orange-500 gold:group-hover:text-[#d4af37] text-2xl transition-all" />
                    <span className="text-xs font-bold text-slate-400 group-hover:text-slate-300 transition-all">
                      Select Image
                    </span>
                    <span className="text-[10px] text-slate-600">
                      PNG, JPG, JPEG (Max 10MB)
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      required
                      onChange={handleFile}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={uploadLoading || !image || !title}
                  className="w-full py-3.5 bg-orange-500 gold:bg-gradient-to-r gold:from-[#bf953f] gold:to-[#aa771c] hover:opacity-95 text-white font-bold rounded-2xl shadow-lg transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
                >
                  {uploadLoading ? (
                    <FaSpinner className="animate-spin" />
                  ) : (
                    "Upload Asset"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Column: Gallery Cards Grid */}
        <div className="lg:col-span-8 bg-slate-900/40 border border-white/5 gold:border-[#d4af37]/15 p-6 md:p-8 rounded-[32px] shadow-2xl">
          <h2 className="text-xl font-bold font-outfit text-white gold:text-[#d4af37] mb-6 flex items-center gap-2">
            <FaImages className="text-slate-400" />
            <span>Showcase Assets ({images.length})</span>
          </h2>

          {loading ? (
            <div className="py-24 text-center text-slate-500">
              <div className="flex flex-col items-center gap-3">
                <FaSpinner className="animate-spin text-3xl text-orange-500 gold:text-[#d4af37]" />
                <span className="font-bold text-xs uppercase tracking-wider">
                  Loading Showcase Gallery...
                </span>
              </div>
            </div>
          ) : images.length === 0 ? (
            <div className="py-24 text-center text-slate-500 font-bold border border-dashed border-white/5 rounded-2xl bg-slate-950/10">
              No gallery images found in the database. Add a new image above to list.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {images.map((item) => (
                <div
                  key={item.id}
                  className="group bg-slate-950/40 border border-white/5 gold:border-[#d4af37]/15 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:border-slate-800 transition-all duration-300 relative flex flex-col justify-between"
                >
                  {/* Delete Button (floating on hover) */}
                  <button
                    onClick={() => deleteImage(item.id)}
                    className="absolute top-3 right-3 z-10 p-2.5 bg-red-500/80 hover:bg-red-500 text-white rounded-xl backdrop-blur-sm shadow-md transition-all active:scale-95 border border-white/10 hover:border-transparent opacity-0 group-hover:opacity-100 duration-300"
                    title="Delete Asset"
                  >
                    <FaTrash className="text-xs" />
                  </button>

                  {/* Image wrapper */}
                  <div className="relative h-52 overflow-hidden bg-slate-950 flex items-center justify-center">
                    <img
                      src={`${UPLOAD_BASE_URL}/${item.image}`}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-700"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://placehold.co/300?text=Error+Loading";
                      }}
                    />
                    <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                      <span className="p-3 bg-white/10 text-white text-base rounded-full backdrop-blur-sm border border-white/10">
                        <FaEye />
                      </span>
                    </div>
                  </div>

                  {/* Info block */}
                  <div className="p-4 bg-slate-900/40 border-t border-white/5 flex items-center justify-between gap-2">
                    <h3 className="font-bold font-outfit text-slate-200 group-hover:text-white transition-colors text-sm truncate">
                      {item.title}
                    </h3>
                    <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wide shrink-0">
                      ID: {item.id}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}