"use client";

import { useState, useEffect } from "react";
import { FaChevronDown, FaDesktop, FaMoon, FaSun } from "react-icons/fa";

export default function SwitchMode() {
  // ... inside your component
  const [isOpen, setIsOpen] = useState(false);
  const [activeTheme, setActiveTheme] = useState<string>("system");

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (!event.target.closest(".theme-dropdown")) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "system" || !savedTheme) {
      applySystemTheme();
      setActiveTheme("system");
    } else {
      applyTheme(savedTheme);
      setActiveTheme(savedTheme);
    }

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemThemeChange = () => {
      if (!savedTheme || savedTheme === "system") {
        applySystemTheme();
      }
    };

    mediaQuery.addEventListener("change", handleSystemThemeChange);

    return () => {
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
    };
  }, []);

  const applyTheme = (theme: string) => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else if (theme === "light") {
      document.documentElement.classList.remove("dark");
    }
  };

  const handleThemeChange = (newTheme: string) => {
    setActiveTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    if (newTheme === "system") {
      applySystemTheme();
    } else {
      applyTheme(newTheme);
    }
  };

  const applySystemTheme = () => {
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    if (systemPrefersDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <main className="flex">
      <div className="theme-dropdown relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="px-2 py-2 bg-slate-500 dark:bg-slate-600 text-gray-100 dark:text-gray-300 rounded-lg hover:bg-cyan-800 transition-colors flex items-center gap-2 w-20 justify-evenly"
          aria-haspopup="true"
          aria-expanded={isOpen}
        >
          {activeTheme === "light" && <FaSun className="w-4 h-4" />}
          {activeTheme === "dark" && <FaMoon className="w-4 h-4" />}
          {activeTheme === "system" && <FaDesktop className="w-4 h-4" />}
          {/* {activeTheme.charAt(0).toUpperCase() + activeTheme.slice(1)} Theme */}
          <FaChevronDown
            className={`w-4 h-4 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isOpen && (
          <div className="absolute mt-2 w-20 bg-white dark:bg-slate-700 rounded-md shadow-lg py-1 z-10">
            {[
              { theme: "light", icon: <FaSun className="w-4 h-4" /> },
              { theme: "dark", icon: <FaMoon className="w-4 h-4" /> },
              { theme: "system", icon: <FaDesktop className="w-4 h-4" /> },
            ].map(({ theme, icon }) => (
              <button
                key={theme}
                onClick={() => {
                  handleThemeChange(theme);
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-2 text-sm flex items-center justify-around ${
                  activeTheme === theme
                    ? "bg-cyan-800 text-gray-50"
                    : "text-gray-700 dark:text-gray-300 hover:bg-cyan-800 hover:text-gray-50"
                } transition-colors`}
                role="menuitem"
              >
                {icon}
                {/* <span>
                  {theme.charAt(0).toUpperCase() + theme.slice(1)} Theme
                </span> */}
              </button>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
