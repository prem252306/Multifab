import { useState } from "react";
import api from "../services/api";
import { toast } from "react-hot-toast";
import { FaUserShield, FaKey, FaEnvelope, FaSpinner, FaSave } from "react-icons/fa";

export default function Settings() {
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!currentPassword) {
      toast.error("Current password is required to save changes");
      return;
    }

    if (newPassword && newPassword !== confirmPassword) {
      toast.error("New passwords do not match!");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        currentPassword,
        ...(email && { email }),
        ...(newPassword && { newPassword }),
      };

      const res = await api.put("/auth/update", payload);
      toast.success(res.data.message || "Credentials updated successfully!");
      
      // Clear password fields on success
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to update credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      {/* Title */}
      <div>
        <h1 className="text-4xl font-black font-outfit text-white gold:gradient-gold tracking-tight flex items-center gap-3">
          <FaUserShield className="text-orange-500 gold:text-[#d4af37] text-3xl" />
          <span>Security & Settings</span>
        </h1>
        <p className="text-slate-400 text-sm mt-1 uppercase font-semibold tracking-wider">
          Manage administrator login details, credentials, and password configuration
        </p>
      </div>

      {/* Main Form Box */}
      <div className="bg-slate-900/40 border border-white/5 gold:border-[#d4af37]/15 p-6 md:p-8 rounded-[32px] shadow-2xl backdrop-blur-md">
        <form onSubmit={handleUpdate} className="space-y-6">
          <div className="border-b border-white/5 pb-4">
            <h3 className="text-lg font-bold text-white gold:text-[#d4af37] font-outfit">
              Administrator Access Details
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Provide new information below. Leave fields empty if you do not wish to modify them.
            </p>
          </div>

          {/* New Email */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <FaEnvelope className="text-slate-500" /> New Email Address
            </label>
            <input
              type="email"
              placeholder="e.g. admin@multifab.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-slate-950/40 border border-white/5 rounded-xl text-slate-200 focus:outline-none focus:border-orange-500 gold:focus:border-[#d4af37] transition-all text-sm placeholder:text-slate-600"
            />
          </div>

          {/* Current Password (to verify) */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <FaKey className="text-slate-500" /> Current Password *
            </label>
            <input
              type="password"
              placeholder="Required to authorize updates"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
              className="w-full px-4 py-3 bg-slate-950/40 border border-white/5 rounded-xl text-slate-200 focus:outline-none focus:border-orange-500 gold:focus:border-[#d4af37] transition-all text-sm placeholder:text-slate-600"
            />
          </div>

          {/* Divider */}
          <div className="border-t border-white/5 pt-4">
            <h4 className="text-sm font-bold text-slate-300">Change Admin Password</h4>
            <p className="text-[10px] text-slate-500 mt-0.5">
              Fill these fields only if you want to set a new administrator password.
            </p>
          </div>

          {/* New Password */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <FaKey className="text-slate-500" /> New Password
              </label>
              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-3 bg-slate-950/40 border border-white/5 rounded-xl text-slate-200 focus:outline-none focus:border-orange-500 gold:focus:border-[#d4af37] transition-all text-sm placeholder:text-slate-600"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <FaKey className="text-slate-500" /> Confirm New Password
              </label>
              <input
                type="password"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 bg-slate-950/40 border border-white/5 rounded-xl text-slate-200 focus:outline-none focus:border-orange-500 gold:focus:border-[#d4af37] transition-all text-sm placeholder:text-slate-600"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4 border-t border-white/5">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-orange-500 gold:bg-gradient-to-r gold:from-[#bf953f] gold:to-[#aa771c] hover:opacity-95 text-white font-bold rounded-xl shadow-lg transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
            >
              {loading ? (
                <FaSpinner className="animate-spin text-sm" />
              ) : (
                <>
                  <FaSave className="text-sm" />
                  <span>Save Configuration</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
