import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="flex h-screen overflow-hidden bg-slate-950 dark:bg-slate-950 gold:bg-black font-inter">
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col h-full overflow-hidden">
        {/* Topbar navigation details */}
        <Topbar />

        {/* Dynamic Nested Page Content */}
        <div className="flex-grow p-8 bg-slate-900 dark:bg-slate-900/60 gold:bg-[#050505] overflow-y-auto text-slate-800 dark:text-white transition-colors duration-300">
          <Outlet />
        </div>
      </div>
    </div>
  );
}