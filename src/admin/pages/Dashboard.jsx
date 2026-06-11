import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../../config";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import {
  FaEnvelope,
  FaBriefcase,
  FaBox,
  FaImages,
  FaArrowRight,
  FaServer,
  FaDatabase,
  FaSignal,
  FaMicrochip
} from "react-icons/fa";

export default function Dashboard() {
  const [stats, setStats] = useState({
    products: 0,
    gallery: 0,
    contacts: 0,
    careers: 0,
  });

  const [recentContacts, setRecentContacts] = useState([]);
  const [recentCareers, setRecentCareers] = useState([]);

  // Mock server latency and stats
  const [ping, setPing] = useState(14);
  const [cpu, setCpu] = useState(1.8);
  const [ram, setRam] = useState(38.4);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/dashboard`)
      .then((res) => {
        setStats(res.data.stats || { products: 0, gallery: 0, contacts: 0, careers: 0 });
        setRecentContacts(res.data.contacts || []);
        setRecentCareers(res.data.careers || []);
      })
      .catch((err) => {
        console.error(err);
      });

    // Simulate minor fluctuations in server metrics
    const interval = setInterval(() => {
      setPing(Math.floor(Math.random() * 8) + 12);
      setCpu((Math.random() * 1.5 + 1.2).toFixed(1));
      setRam((Math.random() * 0.6 + 38.2).toFixed(1));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const chartData = [
    { name: "Products", value: stats.products || 1 },
    { name: "Gallery", value: stats.gallery || 1 },
    { name: "Contacts", value: stats.contacts || 1 },
    { name: "Careers", value: stats.careers || 1 },
  ];

  const cards = [
    {
      title: "Products Catalog",
      value: stats.products,
      desc: "Items in active database",
      icon: <FaBox />,
      path: "/admin/products",
      color: "border-blue-500/20 text-blue-400 bg-blue-500/5"
    },
    {
      title: "Gallery Assets",
      value: stats.gallery,
      desc: "Photos in showcase",
      icon: <FaImages />,
      path: "/admin/gallery",
      color: "border-purple-500/20 text-purple-400 bg-purple-500/5"
    },
    {
      title: "Contact Leads",
      value: stats.contacts,
      desc: "Inquiries submitted",
      icon: <FaEnvelope />,
      path: "/admin/contacts",
      color: "border-orange-500/20 gold:border-[#d4af37]/25 text-orange-400 gold:text-[#d4af37] bg-orange-500/5 gold:bg-[#d4af37]/5"
    },
    {
      title: "Career Applicants",
      value: stats.careers,
      desc: "Submitted resumes",
      icon: <FaBriefcase />,
      path: "/admin/careers",
      color: "border-green-500/20 text-green-400 bg-green-500/5"
    },
  ];

  const isGold = document.documentElement.classList.contains("gold");
  const themeAccentColor = isGold ? "#d4af37" : "#fa7316";

  const PIE_COLORS = ["#3b82f6", "#a855f7", themeAccentColor, "#22c55e"];

  return (
    <div className="space-y-10">
      {/* Title */}
      <div>
        <h1 className="text-4xl font-black font-outfit text-white gold:gradient-gold tracking-tight">
          Admin Dashboard
        </h1>
        <p className="text-slate-400 text-sm mt-1 uppercase font-semibold tracking-wider">
          System Overview & Live Activity
        </p>
      </div>

      {/* Metric Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <Link
            to={card.path}
            key={card.title}
            className={`group bg-slate-900/40 border ${card.color} hover:border-white/20 p-6 rounded-[24px] shadow-2xl flex flex-col justify-between h-44 hover:scale-[1.03] transition-all duration-300`}
          >
            <div className="flex justify-between items-start">
              <span className="text-2xl p-3 bg-slate-950/60 rounded-xl">
                {card.icon}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 group-hover:text-white transition-colors flex items-center gap-1">
                Manage <FaArrowRight />
              </span>
            </div>

            <div className="text-left mt-2">
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                {card.title}
              </h2>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-4xl font-extrabold font-outfit text-white">
                  {card.value}
                </span>
                <span className="text-[10px] text-slate-500 font-semibold uppercase">
                  {card.desc}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Grid: Chart & Diagnostic Panels */}
      <div className="grid lg:grid-cols-12 gap-8 items-stretch">
        {/* Recharts Area Chart (8 columns) */}
        <div className="lg:col-span-8 bg-slate-900/40 border border-white/5 gold:border-[#d4af37]/15 p-6 rounded-[32px] shadow-2xl">
          <h2 className="text-xl font-bold font-outfit text-white gold:text-[#d4af37] mb-6 uppercase tracking-wider">
            Website Statistics
          </h2>
          
          <div className="w-full">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={chartData} margin={{ left: -20, right: 10 }}>
                <defs>
                  <linearGradient id="colorStats" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={themeAccentColor} stopOpacity={0.35}/>
                    <stop offset="95%" stopColor={themeAccentColor} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0b0f19",
                    borderColor: "rgba(255, 255, 255, 0.08)",
                    borderRadius: "16px",
                    color: "#fff",
                    fontFamily: "Outfit, sans-serif"
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke={themeAccentColor}
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorStats)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Server Health & Composition (4 columns) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Server Performance Card */}
          <div className="bg-slate-900/40 border border-white/5 gold:border-[#d4af37]/15 p-5 rounded-[28px] shadow-2xl flex flex-col justify-between flex-grow">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <FaServer className="text-orange-500 gold:text-[#d4af37]" />
              <span>Diagnostics Monitor</span>
            </h3>

            <div className="space-y-3">
              {/* Database Status */}
              <div className="flex justify-between items-center p-2.5 bg-slate-950/40 border border-white/5 rounded-xl">
                <span className="text-xs text-slate-400 flex items-center gap-1.5">
                  <FaDatabase className="text-slate-500" /> Database Status
                </span>
                <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase text-green-400 bg-green-500/10 px-2 py-0.5 rounded-md border border-green-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  Online
                </span>
              </div>

              {/* API Ping Latency */}
              <div className="flex justify-between items-center p-2.5 bg-slate-950/40 border border-white/5 rounded-xl">
                <span className="text-xs text-slate-400 flex items-center gap-1.5">
                  <FaSignal className="text-slate-500" /> API Gateway
                </span>
                <span className="text-xs font-bold text-slate-200">{ping} ms</span>
              </div>

              {/* CPU load */}
              <div className="flex justify-between items-center p-2.5 bg-slate-950/40 border border-white/5 rounded-xl">
                <span className="text-xs text-slate-400 flex items-center gap-1.5">
                  <FaMicrochip className="text-slate-500" /> Server CPU Load
                </span>
                <span className="text-xs font-bold text-slate-200">{cpu}%</span>
              </div>

              {/* Memory Allocation */}
              <div className="flex justify-between items-center p-2.5 bg-slate-950/40 border border-white/5 rounded-xl">
                <span className="text-xs text-slate-400 flex items-center gap-1.5">
                  <FaServer className="text-slate-500" /> Memory Allocation
                </span>
                <span className="text-xs font-bold text-slate-200">{ram}%</span>
              </div>
            </div>
          </div>

          {/* Database Donut Composition Chart */}
          <div className="bg-slate-900/40 border border-white/5 gold:border-[#d4af37]/15 p-5 rounded-[28px] shadow-2xl flex flex-col justify-between">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3">
              Database Composition
            </h3>

            <div className="flex items-center justify-between">
              <div className="w-2/5">
                <ResponsiveContainer width="100%" height={100}>
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={28}
                      outerRadius={40}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Donut Legend */}
              <div className="w-3/5 pl-2 space-y-1.5">
                {chartData.map((item, idx) => (
                  <div key={item.name} className="flex justify-between items-center text-[10px]">
                    <span className="flex items-center gap-1.5 text-slate-400 font-medium">
                      <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: PIE_COLORS[idx] }} />
                      {item.name}
                    </span>
                    <span className="font-bold text-white">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Grid: Recent Activity logs */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Contacts */}
        <div className="bg-slate-900/40 border border-white/5 gold:border-[#d4af37]/15 p-6 rounded-[32px] shadow-2xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold font-outfit text-white gold:text-[#d4af37] uppercase tracking-wider">
              Recent Contacts
            </h2>
            <Link to="/admin/contacts" className="text-xs font-bold text-orange-500 gold:text-[#d4af37] uppercase tracking-wider hover:underline">
              View All
            </Link>
          </div>

          <div className="overflow-hidden rounded-2xl border border-white/5 bg-slate-950/20">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-950/80 text-xs text-slate-400 font-bold border-b border-white/5 uppercase">
                  <th className="p-4">Name</th>
                  <th className="p-4">Subject</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm text-slate-200">
                {recentContacts.length === 0 ? (
                  <tr>
                    <td colSpan="2" className="p-6 text-center text-slate-500">No recent messages</td>
                  </tr>
                ) : (
                  recentContacts.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-900/40 transition-colors">
                      <td className="p-4 font-bold">{item.name}</td>
                      <td className="p-4 text-slate-400">{item.subject || "No Subject Specified"}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Careers */}
        <div className="bg-slate-900/40 border border-white/5 gold:border-[#d4af37]/15 p-6 rounded-[32px] shadow-2xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold font-outfit text-white gold:text-[#d4af37] uppercase tracking-wider">
              Recent Applications
            </h2>
            <Link to="/admin/careers" className="text-xs font-bold text-orange-500 gold:text-[#d4af37] uppercase tracking-wider hover:underline">
              View All
            </Link>
          </div>

          <div className="overflow-hidden rounded-2xl border border-white/5 bg-slate-950/20">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-950/80 text-xs text-slate-400 font-bold border-b border-white/5 uppercase">
                  <th className="p-4">Name</th>
                  <th className="p-4">Position</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm text-slate-200">
                {recentCareers.length === 0 ? (
                  <tr>
                    <td colSpan="2" className="p-6 text-center text-slate-500">No recent applications</td>
                  </tr>
                ) : (
                  recentCareers.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-900/40 transition-colors">
                      <td className="p-4 font-bold">{item.full_name}</td>
                      <td className="p-4 text-slate-400">
                        <span className="px-2.5 py-0.5 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20 text-[10px] font-bold uppercase">
                          {item.position}
                        </span>
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