import { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash, FaBriefcase, FaEnvelope, FaPhone, FaDownload } from "react-icons/fa";

export default function Careers() {
  const [careers, setCareers] = useState([]);

  const fetchCareers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/career");
      setCareers(res.data.careers || []);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCareer = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job application?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/career/${id}`);
      fetchCareers();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCareers();
  }, []);

  // Badge coloring helper based on job position
  const getPositionBadge = (pos) => {
    const p = pos.toLowerCase();
    if (p.includes("design") || p.includes("cad")) {
      return "bg-purple-500/10 text-purple-400 border-purple-500/20";
    }
    if (p.includes("cnc") || p.includes("operator")) {
      return "bg-green-500/10 text-green-400 border-green-500/20";
    }
    if (p.includes("quality") || p.includes("qa") || p.includes("inspector")) {
      return "bg-blue-500/10 text-blue-400 border-blue-500/20";
    }
    return "bg-orange-500/10 text-orange-400 border-orange-500/20";
  };

  return (
    <div className="space-y-8">
      {/* Title */}
      <div>
        <h1 className="text-4xl font-black font-outfit text-white gold:gradient-gold tracking-tight flex items-center gap-3">
          <FaBriefcase className="text-orange-500 gold:text-[#d4af37] text-3xl" />
          <span>Career Board</span>
        </h1>
        <p className="text-slate-400 text-sm mt-1 uppercase font-semibold tracking-wider">
          Review candidates resumes and profile details
        </p>
      </div>

      {/* Table Container */}
      <div className="bg-slate-900/40 border border-white/5 gold:border-[#d4af37]/15 p-6 md:p-8 rounded-[32px] shadow-2xl">
        <div className="overflow-x-auto rounded-2xl border border-white/5 bg-slate-950/20">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-950/80 text-slate-300 font-bold uppercase text-xs border-b border-white/5">
                <th className="p-4">Applicant</th>
                <th className="p-4">Contact Info</th>
                <th className="p-4">Target Position</th>
                <th className="p-4">Resume Asset</th>
                <th className="p-4 text-center w-24">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm text-slate-200">
              {careers.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-10 text-center text-slate-500 font-bold">
                    No applications received yet.
                  </td>
                </tr>
              ) : (
                careers.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-900/40 transition-colors">
                    <td className="p-4 font-black font-outfit text-white text-base">
                      {item.full_name}
                    </td>
                    <td className="p-4 space-y-1">
                      <div className="flex items-center gap-2 text-xs text-slate-300 hover:text-white transition-colors">
                        <FaEnvelope className="text-orange-500 gold:text-[#d4af37]" />
                        <a href={`mailto:${item.email}`}>{item.email}</a>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-400 hover:text-white transition-colors">
                        <FaPhone className="text-slate-500" />
                        <a href={`tel:${item.phone}`}>{item.phone}</a>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full border text-xs font-bold uppercase ${getPositionBadge(item.position)}`}>
                        {item.position}
                      </span>
                    </td>
                    <td className="p-4">
                      {item.resume ? (
                        <a
                          href={`http://localhost:5000/uploads/${item.resume}`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-500/10 hover:bg-orange-500 gold:bg-[#d4af37]/10 gold:hover:bg-[#d4af37] text-orange-500 hover:text-white gold:text-[#d4af37] gold:hover:text-slate-950 text-xs font-bold uppercase tracking-wider transition-all duration-300 border border-orange-500/20 gold:border-[#d4af37]/20 hover:border-transparent active:scale-95"
                        >
                          <FaDownload />
                          <span>Download PDF</span>
                        </a>
                      ) : (
                        <span className="text-slate-500 text-xs italic">No file uploaded</span>
                      )}
                    </td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() => deleteCareer(item.id)}
                        className="p-3 bg-red-500/15 hover:bg-red-500 text-red-500 hover:text-white rounded-xl transition-all duration-300 border border-red-500/20 hover:border-transparent active:scale-95 shadow-md"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}