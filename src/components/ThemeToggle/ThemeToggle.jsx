import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

export default function ThemeToggle() {
  const { theme, setTheme } = useContext(ThemeContext);

  const cycleTheme = () => {
    if (theme === "dark") {
      setTheme("gold");
    } else if (theme === "gold") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  const getThemeDetails = () => {
    switch (theme) {
      case "gold":
        return { text: "🏆 Gold Mode", style: "bg-gradient-to-r from-[#bf953f] to-[#aa771c] text-slate-950 font-bold" };
      case "light":
        return { text: "☀ Light Mode", style: "bg-slate-900 text-white" };
      default:
        return { text: "🌙 Dark Mode", style: "bg-orange-500 text-white" };
    }
  };

  const details = getThemeDetails();

  return (
    <button
      onClick={cycleTheme}
      className={`px-5 py-2.5 rounded-full text-xs md:text-sm font-semibold tracking-wide shadow-md transition-all duration-300 ${details.style}`}
    >
      {details.text}
    </button>
  );
}