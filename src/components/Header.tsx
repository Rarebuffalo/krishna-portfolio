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
    <header className="fixed top-0 left-0 right-0 z-20 backdrop-blur-md bg-[#0a0b0d]/65 border-b border-[rgba(245,245,242,0.08)]">
      <nav className="wrap flex items-center justify-between h-[64px]">
        <Link href="/" className="logo font-display font-semibold text-[15px] flex items-center gap-[8px] text-[#f2f1ec]">
          <span className="dot w-[6px] h-[6px] rounded-full bg-[#d4a657] shadow-[0_0_8px_#d4a657]"></span>
          Krishna
        </Link>
        <div className="flex items-center gap-[24px]">
          <div className="navlinks flex gap-8 max-[860px]:hidden">
            <a
              href="#projects"
              className="text-[13px] text-[#8b8f96] hover:text-[#f2f1ec] transition-colors duration-250 relative group"
            >
              Projects
              <span className="absolute left-0 right-0 bottom-[-6px] h-[1px] bg-[#d4a657] scale-x-0 origin-left transition-transform duration-250 group-hover:scale-x-100" />
            </a>
            <a
              href="#work"
              className="text-[13px] text-[#8b8f96] hover:text-[#f2f1ec] transition-colors duration-250 relative group"
            >
              Work
              <span className="absolute left-0 right-0 bottom-[-6px] h-[1px] bg-[#d4a657] scale-x-0 origin-left transition-transform duration-250 group-hover:scale-x-100" />
            </a>
            <a
              href="#contact"
              className="text-[13px] text-[#8b8f96] hover:text-[#f2f1ec] transition-colors duration-250 relative group"
            >
              Contact
              <span className="absolute left-0 right-0 bottom-[-6px] h-[1px] bg-[#d4a657] scale-x-0 origin-left transition-transform duration-250 group-hover:scale-x-100" />
            </a>
          </div>

          <button
            onClick={toggleTheme}
            className="flex items-center justify-center w-[36px] h-[36px] rounded-full border border-[rgba(245,245,242,0.08)] bg-[#101215]/40 hover:bg-[#101215]/80 hover:border-[#d4a657]/40 text-[#8b8f96] hover:text-[#f2f1ec] transition-all cursor-pointer"
            aria-label="Toggle Theme"
          >
            {theme === "light" ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2" />
                <path d="M12 20v2" />
                <path d="M4.93 4.93l1.41 1.41" />
                <path d="M17.66 17.66l1.41 1.41" />
                <path d="M2 12h2" />
                <path d="M20 12h2" />
                <path d="M6.34 17.66l-1.41 1.41" />
                <path d="M19.07 4.93l-1.41 1.41" />
              </svg>
            )}
          </button>
        </div>
      </nav>
    </header>
  );
}
