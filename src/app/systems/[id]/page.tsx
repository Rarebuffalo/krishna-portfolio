"use client";

import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { portfolioSystems } from "@/data/portfolioData";
import SystemDesignVisualizer from "@/components/SystemDesignVisualizer";
import { PlayIcon, CodeIcon, ChevronRightIcon, AlertCircleIcon } from "@/components/CustomIcons";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  params: Promise<{ id: string }>;
};

export default function SystemCaseStudyPage({ params }: Props) {
  const { id } = use(params);
  const sys = portfolioSystems.find((s) => s.id === id);

  const [loading, setLoading] = useState(true);
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    if (!sys) return;
    const logsSequence = [
      `SYS // GET: /systems/${id}`,
      "SYS // ESTABLISHING SECURE GATEWAY... [OK]",
      "SYS // FETCHING METRIC REGISTRY LOGS... [OK]",
      "SYS // RENDERING GRAPH VISUALIZER NODES... [OK]",
      `SYS // SYSTEM:${sys.name.toUpperCase()} INTERFACE READY`
    ];

    let current = 0;
    const interval = setInterval(() => {
      if (current < logsSequence.length) {
        const nextLog = logsSequence[current];
        setLogs((prev) => [...prev, nextLog]);
        current++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setLoading(false);
        }, 150);
      }
    }, 85);

    return () => clearInterval(interval);
  }, [id, sys]);

  if (!sys) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-bg-dark text-[#F5F5F7] font-sans selection:bg-blue-600/30 relative">
      
      {/* Telemetry Transition Loader */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-[#050505] z-50 flex flex-col justify-center p-8 font-mono text-sm tracking-tight select-none"
          >
            <div className="max-w-md mx-auto w-full space-y-2.5">
              <div className="text-xs text-neutral-500 uppercase tracking-widest border-b border-neutral-900 pb-3 mb-4 font-bold">
                KRISHNA OS // DEPLOYMENT TELEMETRY
              </div>
              {logs.map((log, idx) => {
                const isReady = log.includes("READY");
                return (
                  <div key={idx} className={isReady ? "text-emerald-400 font-bold" : "text-neutral-400"}>
                    {isReady ? " > " : "   "} {log}
                  </div>
                );
              })}
              <div className="flex items-center space-x-1.5 pt-2">
                <span className="inline-block w-1.5 h-3.5 bg-blue-500 animate-pulse" />
                <span className="text-[10px] uppercase tracking-wider text-neutral-500 font-bold">connecting console interface...</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Case Study Content */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: loading ? 0 : 1, y: loading ? 10 : 0 }}
        transition={{ duration: 0.3, delay: 0.05 }}
      >
        {/* Decorative background grid - locked at 3% opacity for premium aesthetic */}
        <div className="fixed inset-0 grid-bg opacity-[0.03] pointer-events-none" />

        {/* Top sticky navigation */}
        <header className="sticky top-0 z-30 border-b border-neutral-900 bg-bg-dark/75 backdrop-blur-md">
          <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link 
                href="/" 
                className="text-xs font-mono text-neutral-500 hover:text-white transition-colors"
              >
                KRISHNA_OS
              </Link>
              <ChevronRightIcon size={12} className="text-neutral-700" />
              <span className="text-xs font-mono text-neutral-300 font-semibold">{sys.name}</span>
            </div>

            <Link 
              href="/"
              className="text-xs font-mono text-blue-500 hover:text-blue-400 font-semibold transition-colors"
            >
              ← Command Center
            </Link>
          </div>
        </header>

        {/* Case Study Body */}
        <article className="max-w-4xl mx-auto px-6 py-12 space-y-12 relative z-10">
          
          {/* Title Section */}
          <section className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-mono border border-blue-900 bg-blue-950/20 text-blue-400 font-bold uppercase tracking-wider">
                {sys.type}
              </span>
              <span className="px-2.5 py-0.5 rounded text-[11px] font-mono border border-neutral-900 bg-neutral-950/60 text-neutral-400 uppercase tracking-wider font-bold">
                {sys.status}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-tight">
              {sys.name}
            </h1>
            <p className="text-base text-neutral-350 leading-relaxed max-w-3xl">
              {sys.tagline}
            </p>

            {/* Links Row */}
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href={sys.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-md text-xs font-bold transition-all shadow-sm shadow-blue-950/20 cursor-pointer"
              >
                <PlayIcon size={12} />
                <span>Launch Live System</span>
              </a>
              <a
                href={sys.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1.5 px-3.5 py-2 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-600 text-white rounded-md text-xs font-bold transition-all cursor-pointer"
              >
                <CodeIcon size={12} />
                <span>Source Repository</span>
              </a>
            </div>
          </section>

          {/* Above-the-Fold Key Outcomes metrics row */}
          <section className="space-y-3 pt-4 border-t border-neutral-900">
            <h3 className="text-[10px] uppercase font-mono tracking-widest text-neutral-500 font-bold">Above-The-Fold // Key Outcomes</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-neutral-950/20 border border-neutral-900/60 p-5 rounded-xl">
              {sys.impact.map((imp, idx) => (
                <div key={idx} className="flex items-start space-x-2.5 p-1 border-b md:border-b-0 md:border-r border-neutral-900 last:border-0 pr-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-2 mr-1.5 shadow-[0_0_8px_rgba(16,185,129,0.5)] animate-pulse" />
                  <div>
                    <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-wider block mb-0.5 font-bold">Metric #{idx + 1}</span>
                    <span className="text-white text-xs font-semibold leading-relaxed block">{imp}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 1: Problem Definition */}
          <section className="space-y-4 border-t border-neutral-900 pt-8">
            <h2 className="text-xs uppercase font-mono tracking-wider text-neutral-500 font-bold">01 // Problem Definition</h2>
            <div className="p-6 rounded-xl border border-neutral-900 bg-neutral-950/20 hover:border-neutral-800 transition-all leading-relaxed text-[14px] text-neutral-300">
              {sys.problem}
            </div>
          </section>

          {/* Section 2: System Topology (Interactive) */}
          <section className="space-y-4 border-t border-neutral-900 pt-8">
            <h2 className="text-xs uppercase font-mono tracking-wider text-neutral-500 font-bold">02 // System Topology</h2>
            <SystemDesignVisualizer systemId={sys.id} />
          </section>

          {/* Section 3: Engineering Decisions & Trade-offs */}
          <section className="space-y-4 border-t border-neutral-900 pt-8">
            <h2 className="text-xs uppercase font-mono tracking-wider text-neutral-500 font-bold">03 // Architecture Decisions & Trade-offs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {sys.decisions.map((dec, idx) => (
                <div 
                  key={idx}
                  className="p-6 rounded-xl border border-neutral-900 bg-[#0d0d0e]/60 hover:border-neutral-800 transition-all space-y-3.5 hover:shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
                >
                  <div className="flex items-start space-x-2.5">
                    <span className="font-mono text-xs text-blue-500 font-bold">#{idx + 1}</span>
                    <div>
                      <h4 className="text-[10px] uppercase font-mono tracking-wider text-neutral-500 block mb-0.5 font-bold">Selected Strategy</h4>
                      <p className="font-extrabold text-white text-sm leading-tight">{dec.decision}</p>
                    </div>
                  </div>

                  <div className="space-y-3 border-t border-neutral-900/60 pt-3 text-[13px] leading-relaxed">
                    <div>
                      <span className="text-neutral-500 font-mono text-[10px] uppercase block mb-0.5 font-bold">Alternatives Evaluated</span>
                      <p className="text-neutral-350">{dec.alternative}</p>
                    </div>
                    <div>
                      <span className="text-neutral-500 font-mono text-[10px] uppercase block mb-0.5 font-bold">Decision Logic</span>
                      <p className="text-neutral-350">{dec.reason}</p>
                    </div>
                    <div>
                      <span className="text-neutral-500 font-mono text-[10px] uppercase block mb-0.5 font-bold">Trade-off Considerations</span>
                      <p className="text-neutral-450 italic">{dec.tradeoff}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 4: Failure Story */}
          <section className="space-y-4 border-t border-neutral-900 pt-8">
            <h2 className="text-xs uppercase font-mono tracking-wider text-neutral-500 font-bold flex items-center space-x-1.5">
              <AlertCircleIcon size={14} className="text-rose-500" />
              <span>04 // Lessons Learned & Failure Recovery</span>
            </h2>
            <div className="border border-neutral-900 border-l-4 border-l-rose-600 bg-[#0e0a0a]/40 p-6 rounded-r-xl space-y-4 hover:border-l-rose-500 transition-all hover:shadow-[0_4px_30px_rgba(0,0,0,0.4)]">
              <div>
                <span className="text-rose-400 font-mono text-xs uppercase block mb-1 font-bold tracking-wider">Initial Implementation Blockage</span>
                <p className="text-neutral-350 text-sm leading-relaxed">{sys.failureStory.attempt}</p>
              </div>
              <div className="border-t border-neutral-900/60 pt-3.5">
                <span className="text-rose-400 font-mono text-xs uppercase block mb-1 font-bold tracking-wider">Observed Failure Symptom</span>
                <p className="text-rose-300 text-xs font-mono bg-black/85 p-3 rounded-lg border border-neutral-900/50 leading-relaxed">
                  {sys.failureStory.symptom}
                </p>
              </div>
              <div className="border-t border-neutral-900/60 pt-3.5">
                <span className="text-emerald-400 font-mono text-xs uppercase block mb-1 font-bold tracking-wider">Resolution Strategy</span>
                <p className="text-neutral-350 text-sm leading-relaxed font-sans">{sys.failureStory.fix}</p>
              </div>
            </div>
          </section>

          {/* Blueprint Stack section */}
          <section className="space-y-4 border-t border-neutral-900 pt-8">
            <div className="space-y-3.5">
              <h3 className="text-xs uppercase font-mono tracking-wider text-neutral-500 font-bold">System Blueprint Stack</h3>
              <div className="flex flex-wrap gap-1.5">
                {sys.stack.map((tech) => (
                  <span 
                    key={tech} 
                    className="px-2 py-1 rounded bg-neutral-950 border border-neutral-900 text-neutral-450 font-mono text-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </section>
        </article>

        {/* Footer */}
        <footer className="border-t border-neutral-900 bg-neutral-950/60 py-10 relative z-10 text-center">
          <p className="text-xs font-mono text-neutral-500 font-semibold">
            KRISHNA OS v2.0 // COMPLIANCE RUN SYSTEM REPORTS // 2026
          </p>
        </footer>
      </motion.div>
    </main>
  );
}
