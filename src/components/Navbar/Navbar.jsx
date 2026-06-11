import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import Logo from "../Logo/Logo";
import Magnetic from "../Magnetic/Magnetic";

export default function Navbar() {

  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {


    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener(
      "scroll",
      handleScroll
    );

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );


  }, []);

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Products", path: "/products" },
    { name: "Quality", path: "/quality" },
    { name: "Gallery", path: "/gallery" },
    { name: "Career", path: "/career" },
    { name: "Contact", path: "/contact" }
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "bg-slate-950/90 dark:bg-slate-950/90 gold:bg-[#050505]/95 light:bg-white/95 border-b border-slate-200/10 dark:border-white/5 gold:border-[#d4af37]/15 shadow-2xl backdrop-blur-xl"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="h-20 flex items-center justify-between">
            <Link to="/">
              <Logo />
            </Link>

            <ul className="hidden lg:flex gap-10">
              {menuItems.map((item) => (
                <li key={item.name}>
                  <Magnetic>
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        `relative py-2 font-medium tracking-wide transition-colors duration-300 group ${
                          isActive
                            ? "text-orange-500 gold:text-[#d4af37]"
                            : scrolled
                              ? "text-slate-800 dark:text-gray-200 gold:text-gray-300 light:text-slate-700 hover:text-orange-500 dark:hover:text-orange-500 gold:hover:text-[#d4af37]"
                              : "text-white dark:text-white gold:text-gray-300 hover:text-orange-500 dark:hover:text-orange-500 gold:hover:text-[#d4af37]"
                        }`
                      }
                    >
                      {item.name}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 gold:bg-[#d4af37] transition-all duration-300 group-hover:w-full" />
                    </NavLink>
                  </Magnetic>
                </li>
              ))}
            </ul>

            <div className="hidden lg:flex items-center gap-4">
              <Magnetic>
                <ThemeToggle />
              </Magnetic>
              <Link to="/contact">
                <Magnetic>
                  <motion.button
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 0 15px rgba(249, 115, 22, 0.4)"
                    }}
                    whileTap={{
                      scale: 0.95
                    }}
                    className="px-7 py-3 rounded-full bg-orange-500 gold:bg-gradient-to-r gold:from-[#bf953f] gold:to-[#aa771c] text-white font-semibold shadow-lg hover:bg-orange-600 transition-all duration-300"
                  >
                    Get Quote
                  </motion.button>
                </Magnetic>
              </Link>
            </div>

            <button
              onClick={() => setOpen(true)}
              className={`lg:hidden text-3xl transition-colors duration-300 ${
                scrolled
                  ? "text-slate-800 dark:text-white gold:text-[#d4af37]"
                  : "text-white"
              }`}
            >
              <FaBars />
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/80 z-50 backdrop-blur-sm"
            />

            <motion.div
              initial={{ x: 400 }}
              animate={{ x: 0 }}
              exit={{ x: 400 }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed right-0 top-0 h-screen w-80 bg-slate-900 gold:bg-[#0c0c0c] light:bg-white text-slate-800 dark:text-white gold:text-gray-100 z-[60] p-8 shadow-2xl flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-center mb-12">
                  <Logo />
                  <button
                    onClick={() => setOpen(false)}
                    className="text-2xl hover:text-orange-500 gold:hover:text-[#d4af37]"
                  >
                    <FaTimes />
                  </button>
                </div>

                <div className="flex flex-col gap-6">
                  {menuItems.map((item) => (
                    <NavLink
                      key={item.name}
                      to={item.path}
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        `text-lg font-semibold tracking-wide transition-colors duration-300 ${
                          isActive
                            ? "text-orange-500 gold:text-[#d4af37]"
                            : "text-slate-600 dark:text-gray-300 gold:text-gray-400 light:text-slate-600 hover:text-orange-500 dark:hover:text-orange-500 gold:hover:text-[#d4af37]"
                        }`
                      }
                    >
                      {item.name}
                    </NavLink>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-4">
                <div className="flex items-center justify-between border-t border-slate-200/10 pt-6">
                  <span className="text-sm text-slate-400 font-medium">Toggle Theme</span>
                  <ThemeToggle />
                </div>
                <Link to="/contact" onClick={() => setOpen(false)}>
                  <button className="w-full py-4 rounded-xl bg-orange-500 gold:bg-gradient-to-r gold:from-[#bf953f] gold:to-[#aa771c] text-white font-bold shadow-lg">
                    Get Quote
                  </button>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>


  );
}
