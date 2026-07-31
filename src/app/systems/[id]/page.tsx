"use client";

import React, { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { portfolioSystems } from "@/data/portfolioData";
import BlueprintGrid from "@/components/BlueprintGrid";

type Props = {
  params: Promise<{ id: string }>;
};

export default function SystemCaseStudyPage({ params }: Props) {
  const { id } = use(params);
  const sys = portfolioSystems.find((s) => s.id === id);

  if (!sys) {
    notFound();
  }

  // Draw static architectural node map using SVGs for professional editorial feel
  const renderStaticArchitecture = () => {
    if (!sys.nodes || sys.nodes.length === 0) return null;

    return (
      <div className="w-full relative rounded-[3px] border border-[rgba(245,245,242,0.14)] bg-gradient-to-br from-[#14161a] to-[#0c0d0f] p-[24px] flex items-center justify-center min-h-[300px]">
        <div className="w-full h-[260px] relative">
          <svg className="absolute inset-0 w-full h-full" viewBox="12 10 746 130" preserveAspectRatio="xMidYMid meet" fill="none">
            {/* Draw connectors */}
            {sys.edges.map((edge, idx) => {
              const fromNode = sys.nodes.find((n) => n.id === edge.from);
              const toNode = sys.nodes.find((n) => n.id === edge.to);
              if (!fromNode || !toNode) return null;

              // Calculate bezier curves
              const dx = Math.abs(toNode.x - fromNode.x) * 0.5;
              const path = `M ${fromNode.x} ${fromNode.y} C ${fromNode.x + dx} ${fromNode.y}, ${toNode.x - dx} ${toNode.y}, ${toNode.x} ${toNode.y}`;

              return (
                <g key={idx}>
                  <path
                    d={path}
                    stroke="var(--line-strong)"
                    strokeWidth="1.5"
                    fill="none"
                  />
                  {edge.label && (
                    <text
                      x={(fromNode.x + toNode.x) / 2}
                      y={(fromNode.y + toNode.y) / 2 - 8}
                      fill="#5c6066"
                      fontFamily="var(--font-mono)"
                      fontSize="8"
                      textAnchor="middle"
                    >
                      {edge.label}
                    </text>
                  )}
                </g>
              );
            })}

            {/* Draw nodes */}
            {sys.nodes.map((node) => (
              <g key={node.id}>
                <rect
                  x={node.x - 62}
                  y={node.y - 21}
                  width="125"
                  height="42"
                  rx="4"
                  fill="#101215"
                  stroke="var(--line-strong)"
                  strokeWidth="1"
                />
                <circle cx={node.x - 46} cy={node.y} r="4" fill="var(--gold)" />
                <text
                  x={node.x + 6}
                  y={node.y + 4}
                  fill="#f2f1ec"
                  fontFamily="var(--font-sans)"
                  fontSize="11"
                  textAnchor="middle"
                >
                  {node.label.length > 16 ? node.label.substring(0, 16) + ".." : node.label}
                </text>
              </g>
            ))}
          </svg>
        </div>
      </div>
    );
  };

  return (
    <>
      <BlueprintGrid />
      <div className="vignette" />

      {/* Header controls */}
      <header className="fixed top-0 left-0 right-0 z-20 backdrop-blur-md bg-[#0a0b0d]/65 border-b border-[rgba(245,245,242,0.08)]">
        <nav className="wrap flex items-center justify-between h-[64px]">
          <div className="flex items-center gap-[12px]">
            <Link href="/" className="logo font-display font-semibold text-[15px] flex items-center gap-[8px] text-[#f2f1ec]">
              <span className="dot w-[6px] h-[6px] rounded-full bg-[#d4a657] shadow-[0_0_8px_#d4a657]"></span>
              Krishna
            </Link>
            <span className="text-[12px] text-[#5c6066] font-mono">/</span>
            <span className="text-[12px] text-[#8b8f96] font-mono">{sys.name}</span>
          </div>
          
          <Link
            href="/"
            className="text-[13px] text-[#8b8f96] hover:text-[#f2f1ec] transition-colors"
          >
            ← Back to Projects
          </Link>
        </nav>
      </header>

      {/* Case Study Content */}
      <main className="wrap relative z-10 pt-[180px] pb-[96px]">
        <article className="max-w-[800px] mx-auto space-y-[64px]">
          
          {/* Title Header */}
          <section className="space-y-[24px]">
            <div className="flex items-center gap-[12px]">
              <span className="mono text-[11px] text-[#d4a657] tracking-wider font-semibold">
                {sys.type}
              </span>
              <span className="w-[4px] h-[4px] bg-[rgba(245,245,242,0.14)] rounded-full" />
              <span className="mono text-[11px] text-[#5c6066]">
                {sys.status}
              </span>
            </div>

            <h1 className="font-display font-semibold text-[38px] max-md:text-[30px] leading-[1.1] text-[#f2f1ec]">
              {sys.name}
            </h1>
            <p className="text-[17px] leading-[1.65] text-[#8b8f96]">
              {sys.tagline}
            </p>

            <div className="flex gap-[16px] pt-[8px]">
              <a
                href={sys.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary inline-flex items-center gap-[8px] px-[16px] py-[10px] text-[13px] font-medium rounded-[3px] bg-[#f2f1ec] text-[#0a0b0d] border border-[#f2f1ec] transition-all hover:bg-[#d4a657] hover:border-[#d4a657]"
              >
                Source Repository ↗
              </a>
              {sys.demo !== sys.github && (
                <a
                  href={sys.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost inline-flex items-center gap-[8px] px-[16px] py-[10px] text-[13px] font-medium rounded-[3px] text-[#f2f1ec] border border-[rgba(245,245,242,0.14)] transition-all hover:border-[#d4a657]/45 hover:text-[#d4a657]"
                >
                  Live System ↗
                </a>
              )}
            </div>
          </section>

          {/* Outcomes & Metrics Grid */}
          <section className="space-y-[16px] pt-[32px] border-t border-[rgba(245,245,242,0.08)]">
            <span className="mono text-[11px] text-[#5c6066] block">KEY OUTCOMES</span>
            <div className="grid grid-cols-3 max-[640px]:grid-cols-1 gap-[24px]">
              {sys.impact.map((metric, idx) => (
                <div key={idx} className="p-[20px] rounded-[3px] border border-[rgba(245,245,242,0.08)] bg-[#101215]/30">
                  <span className="mono text-[10px] text-[#d4a657] block mb-[8px]">METRIC 0{idx + 1}</span>
                  <span className="text-[14px] text-[#f2f1ec] leading-[1.5] block font-semibold">{metric}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Problem Statement */}
          <section className="space-y-[16px] pt-[32px] border-t border-[rgba(245,245,242,0.08)]">
            <span className="mono text-[11px] text-[#5c6066] block">01 · PROBLEM STATEMENT</span>
            <div className="p-[24px] rounded-[3px] border border-[rgba(245,245,242,0.08)] bg-[#101215]/50 text-[15px] leading-[1.7] text-[#8b8f96]">
              {sys.problem}
            </div>
          </section>

          {/* Technical Topology Diagram */}
          {sys.nodes && sys.nodes.length > 0 && (
            <section className="space-y-[16px] pt-[32px] border-t border-[rgba(245,245,242,0.08)]">
              <span className="mono text-[11px] text-[#5c6066] block">02 · SYSTEM ARCHITECTURE</span>
              {renderStaticArchitecture()}
            </section>
          )}

          {/* Architecture Decisions & Trade-offs */}
          {sys.decisions && sys.decisions.length > 0 && (
            <section className="space-y-[16px] pt-[32px] border-t border-[rgba(245,245,242,0.08)]">
              <span className="mono text-[11px] text-[#5c6066] block">03 · DESIGN DECISIONS & TRADE-OFFS</span>
              <div className="grid grid-cols-2 max-md:grid-cols-1 gap-[24px]">
                {sys.decisions.map((dec, idx) => (
                  <div key={idx} className="p-[24px] rounded-[3px] border border-[rgba(245,245,242,0.08)] bg-[#101215]/50 flex flex-col justify-between">
                    <div>
                      <span className="mono text-[10px] text-[#d4a657] block mb-[4px]">DECISION 0{idx + 1}</span>
                      <h4 className="text-[16px] font-semibold text-[#f2f1ec] mb-[16px]">{dec.decision}</h4>
                      
                      <div className="space-y-[12px] text-[13px] leading-[1.6]">
                        <div>
                          <span className="text-[#5c6066] font-mono block">Alternative Evaluated:</span>
                          <p className="text-[#8b8f96]">{dec.alternative}</p>
                        </div>
                        <div>
                          <span className="text-[#5c6066] font-mono block">Decision Reason:</span>
                          <p className="text-[#8b8f96]">{dec.reason}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-[20px] pt-[16px] border-t border-[rgba(245,245,242,0.08)] text-[12px] italic text-[#5c6066]">
                      Trade-off: {dec.tradeoff}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Failure Story & Lessons */}
          {sys.failureStory && (
            <section className="space-y-[16px] pt-[32px] border-t border-[rgba(245,245,242,0.08)]">
              <span className="mono text-[11px] text-[#5c6066] block">04 · SYSTEM FAILURE & RECOVERY</span>
              <div className="border border-[rgba(245,245,242,0.08)] border-l-[3px] border-l-[#d4a657] bg-[#101215]/30 p-[24px] rounded-r-[3px] space-y-[16px]">
                <div>
                  <span className="text-[#d4a657] font-mono text-[11px] block mb-[4px]">Attempted Strategy</span>
                  <p className="text-[14px] text-[#8b8f96] leading-[1.6]">{sys.failureStory.attempt}</p>
                </div>
                <div className="pt-[16px] border-t border-[rgba(245,245,242,0.08)]">
                  <span className="text-[#d4a657] font-mono text-[11px] block mb-[8px]">Observed Symptom</span>
                  <p className="text-[12px] font-mono bg-[#0a0b0d] p-[12px] border border-[rgba(245,245,242,0.08)] rounded-[2px] text-[#8b8f96] leading-[1.6]">
                    {sys.failureStory.symptom}
                  </p>
                </div>
                <div className="pt-[16px] border-t border-[rgba(245,245,242,0.08)]">
                  <span className="text-[#d4a657] font-mono text-[11px] block mb-[4px]">Resolution & Fix</span>
                  <p className="text-[14px] text-[#8b8f96] leading-[1.6]">{sys.failureStory.fix}</p>
                </div>
              </div>
            </section>
          )}

          {/* Stack Pills */}
          <section className="space-y-[16px] pt-[32px] border-t border-[rgba(245,245,242,0.08)]">
            <span className="mono text-[11px] text-[#5c6066] block">TECHNOLOGY BLUEPRINT</span>
            <div className="flex flex-wrap gap-[8px]">
              {sys.stack.map((tech) => (
                <span
                  key={tech}
                  className="px-[12px] py-[6px] rounded-[20px] bg-[#101215] border border-[rgba(245,245,242,0.08)] text-[#8b8f96] font-mono text-[12px]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>

        </article>

        {/* Footer */}
        <footer className="mt-[144px] border-t border-[rgba(245,245,242,0.08)] pt-[40px] flex justify-between font-mono text-[11px] text-[#5c6066] max-md:flex-col max-md:gap-[8px]">
          <span>© 2026 Krishna</span>
          <span>Redesign completed with intent.</span>
        </footer>
      </main>
    </>
  );
}
