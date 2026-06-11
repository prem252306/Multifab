import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import api from "../services/api";
import { FaSignOutAlt, FaBell, FaEnvelope, FaBriefcase, FaTimes } from "react-icons/fa";

export default function Topbar() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const fetchNotifications = async () => {
    try {
      const res = await api.get("/dashboard");
      const contacts = res.data.contacts || [];
      const careers = res.data.careers || [];

      // Merge and map notifications
      const merged = [
        ...contacts.map((c) => ({
          id: `c-${c.id}`,
          title: c.name,
          desc: c.subject || "Contact Message Inquiry",
          type: "contact",
          path: "/admin/contacts"
        })),
        ...careers.map((car) => ({
          id: `car-${car.id}`,
          title: car.full_name,
          desc: `Applied: ${car.position}`,
          type: "career",
          path: "/admin/careers"
        }))
      ];

      // Sort by combined ID if possible, showing the latest first
      setNotifications(merged.slice(0, 6));
    } catch (err) {
      console.error("Failed to fetch notifications for topbar:", err);
    }
  };

  useEffect(() => {
    fetchNotifications();
    // Poll for notifications every 30 seconds
    const interval = setInterval(fetchNotifications, 30000);

    // Click outside handler
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      clearInterval(interval);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="h-20 bg-slate-950 gold:bg-black border-b border-slate-200/5 dark:border-white/5 gold:border-[#d4af37]/15 flex items-center justify-between px-8 select-none relative">
      <h3 className="text-lg font-black font-outfit text-white gold:text-[#d4af37] tracking-wider uppercase">
        Control Center
      </h3>

      <div className="flex items-center gap-4">
        {/* Notification Bell */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="p-3 bg-slate-900/60 hover:bg-slate-900 text-slate-400 hover:text-white rounded-xl border border-white/5 hover:border-transparent transition-all active:scale-95 cursor-pointer relative"
            title="System Notifications"
          >
            <FaBell className="text-base" />
            {notifications.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-red-500 border-2 border-slate-900 animate-pulse" />
            )}
          </button>

          {/* Glassmorphic Dropdown */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-3 w-80 bg-slate-950/95 border border-white/5 gold:border-[#d4af37]/20 rounded-2xl shadow-2xl backdrop-blur-md p-4 text-xs z-[9999] space-y-3">
              <div className="flex items-center justify-between border-b border-white/5 pb-2">
                <span className="font-bold text-[10px] text-slate-400 uppercase tracking-wider">
                  System Alerts ({notifications.length})
                </span>
                {notifications.length > 0 && (
                  <button
                    onClick={() => setNotifications([])}
                    className="text-[9px] text-slate-500 hover:text-white uppercase font-bold"
                  >
                    Clear View
                  </button>
                )}
              </div>

              <div className="max-h-60 overflow-y-auto space-y-2 divide-y divide-white/5">
                {notifications.length === 0 ? (
                  <div className="py-6 text-center text-slate-500 font-medium">
                    No new activity alerts
                  </div>
                ) : (
                  notifications.map((item) => (
                    <Link
                      key={item.id}
                      to={item.path}
                      onClick={() => setDropdownOpen(false)}
                      className="flex gap-2.5 pt-2 first:pt-0 items-start hover:bg-white/5 p-2 rounded-lg transition-colors group"
                    >
                      <span className={`p-2 rounded-lg text-xs mt-0.5 ${
                        item.type === "contact" 
                          ? "bg-orange-500/10 text-orange-400" 
                          : "bg-blue-500/10 text-blue-400"
                      }`}>
                        {item.type === "contact" ? <FaEnvelope /> : <FaBriefcase />}
                      </span>
                      <div className="space-y-0.5 text-left flex-grow min-w-0">
                        <p className="font-bold text-slate-200 group-hover:text-white truncate">
                          {item.title}
                        </p>
                        <p className="text-[10px] text-slate-500 truncate">{item.desc}</p>
                      </div>
                    </Link>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="px-5 py-2 rounded-xl bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all duration-300 border border-red-500/20 hover:border-transparent active:scale-95"
        >
          <FaSignOutAlt />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
}