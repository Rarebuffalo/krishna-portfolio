"use client";

import React from "react";
import Link from "next/link";
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
      case "sentinel":
        return (
          <svg className="w-[78%] h-[78%] viz" viewBox="0 0 200 140" fill="none">
            {/* Celery Background Poller + Redis Queue Visualizer */}
            <rect x="20" y="25" width="160" height="90" rx="3" stroke="var(--line-strong)" strokeWidth="1" />
            <line x1="20" y1="45" x2="180" y2="45" stroke="var(--line)" strokeWidth="1" />
            <text x="32" y="37" fill="#8b8f96" fontFamily="var(--font-mono)" fontSize="7">UPTIME MONITOR</text>
            
            {/* Server polling loops */}
            <circle cx="45" cy="75" r="10" fill="var(--panel)" stroke="var(--line-strong)" strokeWidth="1" />
            <circle cx="45" cy="75" r="4" fill="var(--gold)" />
            <text x="45" y="95" fill="#5c6066" fontFamily="var(--font-mono)" fontSize="6" textAnchor="middle">FastAPI</text>
            
            <circle cx="100" cy="75" r="10" fill="var(--panel)" stroke="var(--line-strong)" strokeWidth="1" />
            <circle cx="100" cy="75" r="4" fill="var(--soft-white)" />
            <text x="100" y="95" fill="#5c6066" fontFamily="var(--font-mono)" fontSize="6" textAnchor="middle">Redis Queue</text>

            <circle cx="155" cy="75" r="10" fill="var(--panel)" stroke="var(--line-strong)" strokeWidth="1" />
            <circle cx="155" cy="75" r="4" fill="var(--gold)" />
            <text x="155" y="95" fill="#5c6066" fontFamily="var(--font-mono)" fontSize="6" textAnchor="middle">Celery Worker</text>
            
            <path d="M 55 75 L 90 75" stroke="var(--line-strong)" strokeWidth="1.5" />
            <path d="M 110 75 L 145 75" stroke="var(--line-strong)" strokeWidth="1.5" />
          </svg>
        );
      case "equityforge":
        return (
          <svg className="w-[78%] h-[78%] viz" viewBox="0 0 200 140" fill="none">
            {/* Document parser ➔ structured extraction ➔ PDF rendering layout */}
            <rect x="25" y="20" width="150" height="100" rx="2" stroke="var(--line-strong)" strokeWidth="1" />
            
            {/* Input document preview */}
            <rect x="37" y="32" width="30" height="40" rx="1" fill="var(--panel)" stroke="var(--line-strong)" strokeWidth="1" />
            <line x1="42" y1="40" x2="62" y2="40" stroke="var(--line-strong)" strokeWidth="1" />
            <line x1="42" y1="48" x2="58" y2="48" stroke="var(--line-strong)" strokeWidth="1" />
            <text x="52" y="82" fill="#5c6066" fontFamily="var(--font-mono)" fontSize="6" textAnchor="middle">PDF/CSV</text>
            
            {/* Transformation arrow */}
            <path d="M 75 52 L 95 52" stroke="var(--gold)" strokeWidth="1.5" markerEnd="url(#arrow)" />
            
            {/* Output institutional report layout */}
            <rect x="105" y="32" width="55" height="76" rx="2" fill="var(--panel)" stroke="var(--gold)" strokeWidth="1" />
            <line x1="110" y1="42" x2="155" y2="42" stroke="var(--gold)" strokeWidth="1" />
            <rect x="110" y="48" width="16" height="16" rx="1" fill="var(--line-strong)" />
            <line x1="132" y1="52" x2="150" y2="52" stroke="var(--line-strong)" strokeWidth="1" />
            <line x1="132" y1="60" x2="146" y2="60" stroke="var(--line-strong)" strokeWidth="1" />
            <line x1="110" y1="72" x2="150" y2="72" stroke="var(--line-strong)" strokeWidth="1" />
            <line x1="110" y1="80" x2="140" y2="80" stroke="var(--line-strong)" strokeWidth="1" />
            <line x1="110" y1="88" x2="150" y2="88" stroke="var(--line-strong)" strokeWidth="1" />
            
            <text x="132.5" y="117" fill="var(--gold)" fontFamily="var(--font-mono)" fontSize="6" textAnchor="middle">4-Page PDF</text>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <section className="work py-[96px] reveal border-b border-[rgba(245,245,242,0.08)]" id="featured-projects">
      <div className="section-head flex items-baseline justify-between pb-[40px] border-b border-[rgba(245,245,242,0.08)] mb-[64px]">
        <div>
          <span className="label mono text-[12px] text-[#d4a657]">FEATURED PROJECTS</span>
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
                  <Link
                    href={`/systems/${project.id}`}
                    className="text-[13px] flex items-center gap-[6px] text-[#f2f1ec] border-b border-transparent pb-[2px] transition-all hover:border-[#d4a657] hover:text-[#d4a657]"
                  >
                    Architecture Case Study ↗
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
