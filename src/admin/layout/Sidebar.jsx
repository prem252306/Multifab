import { NavLink, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaEnvelope,
  FaBriefcase,
  FaBox,
  FaImages,
  FaSignOutAlt,
  FaUserShield
} from "react-icons/fa";
import Logo from "../../components/Logo/Logo";

export default function Sidebar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login"); // Redirect to login
  };

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3.5 px-5 py-3.5 rounded-2xl font-bold tracking-wide transition-all duration-300 ${
      isActive
        ? "bg-orange-500 gold:bg-gradient-to-r gold:from-[#bf953f] gold:to-[#aa771c] text-white shadow-lg shadow-orange-500/10 gold:shadow-[#d4af37]/10 border-l-4 border-white gold:border-slate-950"
        : "text-slate-400 hover:text-white hover:bg-slate-800/40 gold:hover:bg-[#d4af37]/10 gold:hover:text-[#d4af37]"
    }`;

  return (
    <div className="w-64 min-h-screen bg-slate-950 gold:bg-black border-r border-slate-200/5 dark:border-white/5 gold:border-[#d4af37]/15 p-6 flex flex-col justify-between select-none">
      <div>
        {/* Brand Header */}
        <div className="mb-10 px-2">
          <Logo showText={true} className="scale-95 origin-left" />
        </div>

        {/* Navigation List */}
        <nav className="flex flex-col gap-2.5">
          <NavLink to="/admin" end className={linkClass}>
            <FaTachometerAlt className="text-lg" />
            <span>Dashboard</span>
          </NavLink>

          <NavLink to="/admin/contacts" className={linkClass}>
            <FaEnvelope className="text-lg" />
            <span>Contacts</span>
          </NavLink>

          <NavLink to="/admin/careers" className={linkClass}>
            <FaBriefcase className="text-lg" />
            <span>Careers</span>
          </NavLink>

          <NavLink to="/admin/products" className={linkClass}>
            <FaBox className="text-lg" />
            <span>Products</span>
          </NavLink>

          <NavLink to="/admin/gallery" className={linkClass}>
            <FaImages className="text-lg" />
            <span>Gallery</span>
          </NavLink>

          <NavLink to="/admin/settings" className={linkClass}>
            <FaUserShield className="text-lg" />
            <span>Settings</span>
          </NavLink>
        </nav>
      </div>

      {/* Logout Trigger */}
      <button
        onClick={logout}
        className="w-full py-3.5 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white font-bold rounded-2xl flex items-center justify-center gap-2.5 transition-all duration-300 border border-red-500/20 hover:border-transparent active:scale-95 shadow-lg hover:shadow-red-500/10"
      >
        <FaSignOutAlt className="text-base" />
        <span>Logout</span>
      </button>
    </div>
  );
}