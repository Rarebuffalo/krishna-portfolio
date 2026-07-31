import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function Header() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const activeTheme = document.documentElement.getAttribute("data-theme") as "dark" | "light" || "dark";
    setTheme(activeTheme);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
    if (nextTheme === "light") {
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.remove("light");
    }
    localStorage.setItem("theme", nextTheme);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-20 backdrop-blur-md bg-backdrop border-b border-line">
      <nav className="wrap flex items-center justify-between h-[64px]">
        <Link href="/" className="logo font-display font-semibold text-[15px] flex items-center gap-[8px] text-soft-white">
          <span className="dot w-[6px] h-[6px] rounded-full bg-gold shadow-[0_0_8px_var(--gold)]"></span>
          Krishna
        </Link>
        <div className="flex items-center gap-[24px]">
          <div className="navlinks flex gap-8 max-[860px]:hidden">
            <a
              href="#projects"
              className="text-[13px] text-gray-dark hover:text-soft-white transition-colors duration-250 relative group"
            >
              Projects
              <span className="absolute left-0 right-0 bottom-[-6px] h-[1px] bg-gold scale-x-0 origin-left transition-transform duration-250 group-hover:scale-x-100" />
            </a>
            <a
              href="#about"
              className="text-[13px] text-gray-dark hover:text-soft-white transition-colors duration-250 relative group"
            >
              About
              <span className="absolute left-0 right-0 bottom-[-6px] h-[1px] bg-gold scale-x-0 origin-left transition-transform duration-250 group-hover:scale-x-100" />
            </a>
            <a
              href="#work"
              className="text-[13px] text-gray-dark hover:text-soft-white transition-colors duration-250 relative group"
            >
              Work
              <span className="absolute left-0 right-0 bottom-[-6px] h-[1px] bg-gold scale-x-0 origin-left transition-transform duration-250 group-hover:scale-x-100" />
            </a>
            <a
              href="#contact"
              className="text-[13px] text-gray-dark hover:text-soft-white transition-colors duration-250 relative group"
            >
              Contact
              <span className="absolute left-0 right-0 bottom-[-6px] h-[1px] bg-gold scale-x-0 origin-left transition-transform duration-250 group-hover:scale-x-100" />
            </a>
          </div>

          <div className="theme-toggle" role="group" aria-label="Theme">
            <button
              type="button"
              id="theme-dark"
              className={theme === "dark" ? "active" : ""}
              onClick={() => {
                setTheme("dark");
                document.documentElement.setAttribute("data-theme", "dark");
                document.documentElement.classList.remove("light");
                localStorage.setItem("theme", "dark");
              }}
              aria-label="Dark theme"
              title="Dark"
            >
              ●
            </button>
            <button
              type="button"
              id="theme-light"
              className={theme === "light" ? "active" : ""}
              onClick={() => {
                setTheme("light");
                document.documentElement.setAttribute("data-theme", "light");
                document.documentElement.classList.add("light");
                localStorage.setItem("theme", "light");
              }}
              aria-label="Light theme"
              title="Light"
            >
              ○
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
