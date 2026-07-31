"use client";

import React from "react";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-20 backdrop-blur-md bg-[#0a0b0d]/65 border-b border-[rgba(245,245,242,0.08)]">
      <nav className="wrap flex items-center justify-between h-[64px]">
        <div className="logo font-display font-semibold text-[15px] flex items-center gap-[8px] text-[#f2f1ec]">
          <span className="dot w-[6px] h-[6px] rounded-full bg-[#d4a657] shadow-[0_0_8px_#d4a657]"></span>
          Krishna
        </div>
        <div className="navlinks flex gap-8 max-[860px]:hidden">
          <a
            href="#work"
            className="text-[13px] text-[#8b8f96] hover:text-[#f2f1ec] transition-colors duration-250 relative group"
          >
            Projects
            <span className="absolute left-0 right-0 bottom-[-6px] h-[1px] bg-[#d4a657] scale-x-0 origin-left transition-transform duration-250 group-hover:scale-x-100" />
          </a>
          <a
            href="#philosophy"
            className="text-[13px] text-[#8b8f96] hover:text-[#f2f1ec] transition-colors duration-250 relative group"
          >
            Philosophy
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
      </nav>
    </header>
  );
}
