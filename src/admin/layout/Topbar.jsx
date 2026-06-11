import { useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";

export default function Topbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="h-20 bg-slate-950 gold:bg-black border-b border-slate-200/5 dark:border-white/5 gold:border-[#d4af37]/15 flex items-center justify-between px-8 select-none">
      <h3 className="text-lg font-black font-outfit text-white gold:text-[#d4af37] tracking-wider uppercase">
        Control Center
      </h3>

      <button
        onClick={handleLogout}
        className="px-5 py-2 rounded-xl bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all duration-300 border border-red-500/20 hover:border-transparent active:scale-95"
      >
        <FaSignOutAlt />
        <span>Sign Out</span>
      </button>
    </div>
  );
}