import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export default function ThemeProvider({ children }) {

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "dark"
  );

  useEffect(() => {

    document.documentElement.classList.remove(
      "light",
      "dark",
      "gold"
    );

    if (theme === "gold") {
      document.documentElement.classList.add("dark", "gold");
    } else {
      document.documentElement.classList.add(theme);
    }

    localStorage.setItem(
      "theme",
      theme
    );

  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}