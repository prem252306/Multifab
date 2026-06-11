import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
export default function ThemeSwitcher() {
const { theme, setTheme } = useContext(ThemeContext);
  return (
    <div
      className="
      fixed
      bottom-24
      left-6
      z-[999]
      bg-white/10
      backdrop-blur-xl
      p-3
      rounded-2xl
      shadow-xl
      "
    >
      <select
        value={theme}
        onChange={(e) =>
          setTheme(
            e.target.value
          )
        }
        className="
        bg-transparent
        text-white
        "
      >
        <option value="dark">
          Dark
        </option>

        <option value="light">
          Light
        </option>

        <option value="gold">
          Luxury Gold
        </option>
      </select>
    </div>
  );
}