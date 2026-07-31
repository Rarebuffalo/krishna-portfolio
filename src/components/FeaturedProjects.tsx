"use client";

import React from "react";
import { portfolioSystems } from "@/data/portfolioData";

export default function FeaturedProjects() {
  // Flagship projects are the first 3 items in portfolioSystems
  const featured = portfolioSystems.slice(0, 3);

  // Custom SVGs corresponding to each flagship project
  const renderSVG = (id: string) => {
    switch (id) {
      case "securelens":
        return (
          <svg className="w-[78%] h-[78%] viz" viewBox="0 0 200 140" fill="none">
            <rect x="20" y="20" width="160" height="100" rx="3" stroke="var(--line-strong)" strokeWidth="1" />
            <line x1="20" y1="42" x2="180" y2="42" stroke="var(--line)" strokeWidth="1" />
            <circle cx="34" cy="31" r="3" fill="#2c2f34" />
            <circle cx="44" cy="31" r="3" fill="#2c2f34" />
            <circle cx="54" cy="31" r="3" fill="#2c2f34" />
            {/* Simulated file paths & vulnerability logs */}
            <text x="34" y="60" fill="var(--gold)" fontFamily="var(--font-mono)" fontSize="8" opacity="0.85">SECURELENS SCANNER</text>
            <rect x="34" y="70" width="110" height="4" rx="1" fill="var(--line-strong)" />
            <rect x="34" y="80" width="130" height="4" rx="1" fill="var(--gold)" opacity="0.45" />
            <rect x="34" y="90" width="80" height="4" rx="1" fill="var(--line-strong)" />
            <text x="34" y="110" fill="#8b8f96" fontFamily="var(--font-mono)" fontSize="7">status: 0 vulnerabilities found</text>
          </svg>
        );
      case "txnforge":
        return (
          <svg className="w-[78%] h-[78%] viz" viewBox="0 0 200 140" fill="none">
            {/* Distributed Auth validation layout */}
            <rect x="15" y="15" width="50" height="110" rx="3" stroke="var(--line-strong)" strokeWidth="1" />
            <rect x="135" y="15" width="50" height="110" rx="3" stroke="var(--line-strong)" strokeWidth="1" />
            
            {/* Client request */}
            <circle cx="40" cy="40" r="12" fill="var(--panel)" stroke="var(--line-strong)" strokeWidth="1" />
            <circle cx="40" cy="40" r="4" fill="var(--gold)" />
            
            {/* Server verification */}
            <circle cx="160" cy="100" r="12" fill="var(--panel)" stroke="var(--line-strong)" strokeWidth="1" />
            <circle cx="160" cy="100" r="4" fill="var(--soft-white)" />

            {/* Connecting lines showing token route */}
            <path d="M 52 40 C 90 40, 110 100, 148 100" stroke="var(--gold)" strokeWidth="1" strokeDasharray="3 3" />
            <text x="75" y="30" fill="#8b8f96" fontFamily="var(--font-mono)" fontSize="6">Token: E2E Verify</text>
            
            <text x="25" y="110" fill="#5c6066" fontFamily="var(--font-mono)" fontSize="8">gRPC</text>
            <text x="145" y="110" fill="var(--gold)" fontFamily="var(--font-mono)" fontSize="8">Redis</text>
          </svg>
        );
      case "flientsec":
        return (
          <svg className="w-[78%] h-[78%] viz" viewBox="0 0 200 140" fill="none">
            {/* Multi-tenant security dashboard mock */}
            <rect x="20" y="25" width="160" height="90" rx="4" stroke="var(--line-strong)" strokeWidth="1" />
            
            {/* Header row */}
            <line x1="20" y1="45" x2="180" y2="45" stroke="var(--line)" />
            <circle cx="34" cy="35" r="3" fill="#2c2f34" />
            <circle cx="44" cy="35" r="3" fill="#2c2f34" />
            
            {/* Column cards */}
            <rect x="30" y="55" width="40" height="48" rx="2" fill="var(--panel)" stroke="var(--line)" />
            <rect x="36" y="65" width="20" height="4" fill="var(--gold)" opacity="0.8" />
            <circle cx="50" cy="85" r="8" fill="none" stroke="var(--line-strong)" strokeWidth="2" />
            <circle cx="50" cy="85" r="4" fill="var(--gold)" />
            
            {/* Right side check logs list */}
            <rect x="85" y="58" width="80" height="6" rx="1" fill="var(--line-strong)" />
            <rect x="85" y="70" width="80" height="6" rx="1" fill="var(--line-strong)" />
            <rect x="85" y="82" width="60" height="6" rx="1" fill="var(--gold)" opacity="0.3" />
            <rect x="85" y="94" width="70" height="6" rx="1" fill="var(--line-strong)" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <section className="work py-[96px] reveal border-b border-[rgba(245,245,242,0.08)]" id="work">
      <div className="section-head flex items-baseline justify-between pb-[40px] border-b border-[rgba(245,245,242,0.08)] mb-[64px]">
        <div>
          <span className="label mono text-[12px] text-[#d4a657]">SELECTED WORK</span>
          <h2 className="font-display font-semibold text-[32px] max-md:text-[24px] mt-[6px] text-[#f2f1ec]">
            Three things worth your time
          </h2>
        </div>
        <span className="count mono text-[12px] text-[#5c6066]">01 / 03</span>
      </div>

      <div className="flex flex-col">
        {featured.map((project, idx) => {
          const isAlt = idx % 2 === 1;
          return (
            <div
              key={project.id}
              className={`grid grid-cols-2 max-[860px]:grid-cols-1 gap-[64px] items-center py-[64px] border-b border-[rgba(245,245,242,0.08)] last:border-b-0`}
            >
              {/* Media Section */}
              <div className={`relative aspect-[4/3] rounded-[3px] border border-[rgba(245,245,242,0.14)] bg-gradient-to-br from-[#14161a] to-[#0c0d0f] overflow-hidden flex items-center justify-center ${isAlt ? "min-[861px]:order-2" : ""}`}>
                <div className="absolute inset-[14px] border border-[rgba(245,245,242,0.08)] rounded-[2px]" />
                <span className="glyph font-mono text-[12px] text-[#5c6066] absolute top-[20px] left-[26px]">
                  {project.id} · viz
                </span>
                {renderSVG(project.id)}
              </div>

              {/* Copy Section */}
              <div className={`flex flex-col justify-center ${isAlt ? "min-[861px]:order-1" : ""}`}>
                <span className="tag font-mono text-[11px] text-[#5c6066] mb-[16px]">
                  {project.type}
                </span>
                <h3 className="font-display font-semibold text-[30px] max-md:text-[22px] mb-[16px] text-[#f2f1ec]">
                  {project.name}
                </h3>
                <p className="text-[15px] leading-[1.7] text-[#8b8f96] max-w-[440px] mb-[24px]">
                  {project.tagline} {project.problem}
                </p>
                <div className="pills flex flex-wrap gap-[8px] mb-[24px]">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="pill font-mono text-[11px] px-[10px] py-[5px] border border-[rgba(245,245,242,0.14)] rounded-[20px] text-[#8b8f96]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="proj-links flex gap-[24px]">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[13px] flex items-center gap-[6px] text-[#f2f1ec] border-b border-transparent pb-[2px] transition-all hover:border-[#d4a657] hover:text-[#d4a657]"
                  >
                    GitHub ↗
                  </a>
                  <a
                    href={`/systems/${project.id}`}
                    className="text-[13px] flex items-center gap-[6px] text-[#f2f1ec] border-b border-transparent pb-[2px] transition-all hover:border-[#d4a657] hover:text-[#d4a657]"
                  >
                    Architecture Case Study ↗
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
