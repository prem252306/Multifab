import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Logo from "../../components/Logo/Logo";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        form
      );

      localStorage.setItem("token", res.data.token);
      setLoading(false);
      navigate("/admin");
    } catch (err) {
      alert("Invalid Email or Password");
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-slate-950 gold:bg-black overflow-hidden relative">
      {/* Background visual neon glows */}
      <div className="absolute top-1/3 left-1/3 w-[40vw] h-[40vw] bg-orange-500/5 gold:bg-[#d4af37]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/3 w-[35vw] h-[35vw] bg-blue-500/5 gold:bg-[#d4af37]/5 rounded-full blur-[100px] pointer-events-none" />

      <form
        onSubmit={handleSubmit}
        className="bg-slate-900/40 backdrop-blur-xl border border-white/5 gold:border-[#d4af37]/15 p-10 rounded-[32px] w-full max-w-sm shadow-2xl flex flex-col z-10 relative overflow-hidden"
      >
        {/* Logo Branding */}
        <Logo showText={true} className="justify-center mb-10 scale-105" />

        <div className="text-center mb-6">
          <h2 className="text-xl font-bold font-outfit text-white gold:text-[#d4af37] tracking-wider uppercase">
            Admin Authentication
          </h2>
          <p className="text-[11px] text-slate-500 mt-1 uppercase font-semibold">
            Restricted Access Zone
          </p>
        </div>

        <input
          type="email"
          name="email"
          required
          placeholder="Email Address"
          onChange={handleChange}
          className="w-full px-4 py-3.5 bg-slate-950/60 border border-slate-800 gold:border-[#d4af37]/25 focus:border-orange-500 gold:focus:border-[#d4af37] rounded-xl text-sm text-white focus:outline-none transition-colors mb-4 placeholder-slate-500 font-semibold"
        />

        <input
          type="password"
          name="password"
          required
          placeholder="Password"
          onChange={handleChange}
          className="w-full px-4 py-3.5 bg-slate-950/60 border border-slate-800 gold:border-[#d4af37]/25 focus:border-orange-500 gold:focus:border-[#d4af37] rounded-xl text-sm text-white focus:outline-none transition-colors mb-6 placeholder-slate-500 font-semibold"
        />

        <button
          disabled={loading}
          className="w-full py-4 bg-orange-500 gold:bg-gradient-to-r gold:from-[#bf953f] gold:to-[#aa771c] text-white gold:text-slate-950 font-bold rounded-xl shadow-lg transition-all duration-300 hover:shadow-orange-500/20 active:scale-95 disabled:opacity-50"
        >
          {loading ? "Authenticating..." : "Login"}
        </button>
      </form>
    </div>
  );
}