"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRecruiterMode } from "@/context/RecruiterModeContext";
import BootSequence from "@/components/BootSequence";
import SystemsGrid from "@/components/SystemsGrid";
import SystemMap from "@/components/SystemMap";
import SystemDesignVisualizer from "@/components/SystemDesignVisualizer";
import Experience from "@/components/Experience";
import KnowledgeTerminal from "@/components/KnowledgeTerminal";
import { CpuIcon, MapIcon, TerminalIcon, BriefcaseIcon, ChevronUpIcon, GithubIcon, XIcon, ServerIcon, SparklesIcon } from "@/components/CustomIcons";

export default function Home() {
  const [bootComplete, setBootComplete] = useState(false);
  const [activeSystemId, setActiveSystemId] = useState("securelens");
  const { recruiterMode, toggleRecruiterMode } = useRecruiterMode();
  const [activeSection, setActiveSection] = useState<string>("");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showContact, setShowContact] = useState(false);

  // Scroll handler helper
  const scrollTo = (id: string) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    if (!bootComplete) return;

    // Scroll listener for active section tracking and showScrollTop
    const handleScroll = () => {
      // Toggle back to top button visibility
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }

      // Reset selection when scrolled near the top of the page
      if (window.scrollY < 120) {
        setActiveSection("");
        return;
      }

      const sections = recruiterMode 
        ? ["systems", "experience"]
        : ["systems", "topology", "experience", "interview"];

      let currentSection = "";
      
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          // Check if the section occupies the focal area of the viewport (top 35% to bottom 15%)
          if (rect.top <= window.innerHeight * 0.35 && rect.bottom >= window.innerHeight * 0.15) {
            currentSection = id;
          }
        }
      }
      
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Trigger scroll handler once on mount to establish correct initial state
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [bootComplete, recruiterMode]);

  const dashboardStats = [
    { label: "Systems Built", value: "12+" },
    { label: "Deployments", value: "10+" },
    { label: "AI Systems", value: "6+" },
    { label: "Production Pipelines", value: "4" }
  ];

  const coreSkills = [
    { category: "Languages", items: ["TypeScript", "JavaScript", "Python", "SQL", "HTML/CSS"] },
    { category: "Frameworks & Libraries", items: ["React", "Next.js", "FastAPI", "Express.js", "Django", "Zustand", "Tailwind CSS"] },
    { category: "Databases & Queues", items: ["PostgreSQL", "MongoDB", "Redis", "BullMQ", "SQLite", "SQLAlchemy", "Prisma ORM"] },
    { category: "AI & Data Science", items: ["Gemini API", "LangGraph", "LangChain", "LightGBM", "YOLOv8", "FAISS", "Vector Embeddings"] },
    { category: "DevOps & Tools", items: ["Docker", "Git/GitHub API", "Celery", "Bun", "ElysiaJS", "Puppeteer", "Linux", "REST APIs"] }
  ];

  const operatingPrinciples = [
    { preferred: "Decoupled Workers", alternative: "Monolithic Execution" },
    { preferred: "Exponential Queue Retries", alternative: "Silent API Failures" },
    { preferred: "Materialized DB Views", alternative: "N+1 Query Overheads" },
    { preferred: "AES Encryption-at-Rest", alternative: "Plaintext Token Storage" },
    { preferred: "Concurrent Async Triages", alternative: "Blocking Linear Loops" }
  ];

  return (
    <>
      {/* Phase 1: Boot Sequence (Fades out when complete) */}
      <AnimatePresence>
        {!bootComplete && (
          <BootSequence onComplete={() => setBootComplete(true)} />
        )}
      </AnimatePresence>

      {/* Phase 2: Main Operating System Dashboard */}
      {bootComplete && (
        <div className="min-h-screen bg-bg-dark text-[#F5F5F7] font-sans selection:bg-blue-600/30 pb-20 relative">
          
          {/* Subtle background grids - locked at 3% opacity for premium aesthetic */}
          <div className="fixed inset-0 grid-bg opacity-[0.03] pointer-events-none" />
          
          {/* Header Controls */}
          <header className="sticky top-0 z-40 border-b border-neutral-900 bg-bg-dark/75 backdrop-blur-md">
            <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
              
              {/* Brand Logo / Telemetry */}
              <div className="flex items-center space-x-2.5 select-none shrink-0">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse border border-emerald-950" />
                <h1 className="font-mono text-xs sm:text-sm tracking-wider uppercase text-white font-bold">
                  KRISHNA OS // DOSSIER_CENTER
                </h1>
              </div>

              {/* Navigation Links and Controls */}
              <div className="flex items-center space-x-6">
                {/* Traditional Nav Links */}
                <nav className="hidden md:flex items-center space-x-4.5 text-xs font-mono">
                  <button
                    onClick={() => scrollTo("systems")}
                    className={`hover:text-blue-400 transition-colors cursor-pointer ${
                      activeSection === "systems" ? "text-blue-500 font-bold" : "text-neutral-450"
                    }`}
                  >
                    Systems
                  </button>
                  {!recruiterMode && (
                    <button
                      onClick={() => scrollTo("topology")}
                      className={`hover:text-blue-400 transition-colors cursor-pointer ${
                        activeSection === "topology" ? "text-blue-500 font-bold" : "text-neutral-450"
                      }`}
                    >
                      Architecture
                    </button>
                  )}
                  <button
                    onClick={() => scrollTo("experience")}
                    className={`hover:text-blue-400 transition-colors cursor-pointer ${
                      activeSection === "experience" ? "text-blue-500 font-bold" : "text-neutral-450"
                    }`}
                  >
                    Experience
                  </button>
                  {!recruiterMode && (
                    <button
                      onClick={() => scrollTo("interview")}
                      className={`hover:text-blue-400 transition-colors cursor-pointer ${
                        activeSection === "interview" ? "text-blue-500 font-bold" : "text-neutral-450"
                      }`}
                    >
                      Q&A
                    </button>
                  )}
                  <button
                    onClick={() => setShowContact(true)}
                    className="text-neutral-450 hover:text-blue-400 transition-colors cursor-pointer"
                  >
                    Contact
                  </button>
                </nav>

                {/* Mobile/Compact trigger for Contact */}
                <button
                  onClick={() => setShowContact(true)}
                  className="md:hidden text-xs font-mono text-neutral-400 hover:text-white cursor-pointer"
                >
                  Contact
                </button>

                {/* GitHub link */}
                <a
                  href="https://github.com/Rarebuffalo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-400 hover:text-white transition-colors"
                  aria-label="GitHub Account"
                >
                  <GithubIcon size={16} />
                </a>

                {/* Recruiter Mode Button */}
                <button
                  onClick={toggleRecruiterMode}
                  className={`px-3 py-1.5 border rounded font-mono text-[10px] tracking-tight uppercase cursor-pointer select-none transition-all duration-300 ${
                    recruiterMode
                      ? "bg-blue-600 border-blue-500 text-white font-bold shadow-[0_0_12px_rgba(0,102,255,0.25)]"
                      : "bg-neutral-950 border-neutral-850 text-neutral-450 hover:text-white hover:border-neutral-750"
                  }`}
                >
                  {recruiterMode ? "Recruiter" : "Standard"}
                </button>
              </div>

            </div>
          </header>

          {/* Hero Section */}
          <section className="max-w-5xl mx-auto px-6 pt-12 md:pt-16 pb-12 relative z-10 space-y-8">
            <div className="space-y-4">
              <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 block mb-1">
                Systems Architect & Fullstack Engineer
              </span>
              <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight leading-tight text-white max-w-4xl">
                I build AI systems, distributed backend infrastructure, and production-grade automation platforms.
              </h2>
              <p className="text-sm md:text-base text-neutral-400 max-w-2xl leading-relaxed">
                From AppSec scan engines to enterprise ESG compliance systems and real-time monitoring tools. Focus on high-throughput, low-latency, and decoupled state architectures.
              </p>
            </div>

            {/* Live Stats Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl">
              {dashboardStats.map((stat, idx) => (
                <div 
                  key={idx}
                  className="p-4 rounded-xl border border-neutral-900/60 bg-neutral-950/40 relative group hover:border-neutral-800 transition-all"
                >
                  <span className="text-xs font-mono text-neutral-400 block mb-1 uppercase tracking-wider">
                    {stat.label}
                  </span>
                  <span className="text-xl md:text-2xl font-bold text-white font-mono tracking-tight group-hover:text-blue-500 transition-colors">
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <button
                onClick={() => scrollTo("systems")}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold font-mono tracking-wide transition-all cursor-pointer shadow-md hover:shadow-blue-600/10"
              >
                View Systems
              </button>
              <button
                onClick={toggleRecruiterMode}
                className={`px-5 py-2.5 border rounded-lg font-mono text-xs tracking-wide transition-all duration-300 cursor-pointer ${
                  recruiterMode
                    ? "bg-blue-600 border-blue-500 text-white font-bold"
                    : "bg-neutral-950 border-neutral-850 text-neutral-400 hover:text-white hover:border-neutral-750"
                }`}
              >
                {recruiterMode ? "Disable Recruiter Mode" : "Enable Recruiter Mode"}
              </button>
              <button
                onClick={() => setShowContact(true)}
                className="px-5 py-2.5 bg-[#0d0d0e] hover:bg-neutral-900 border border-neutral-850 hover:border-neutral-750 text-white rounded-lg text-xs font-semibold font-mono tracking-wide transition-all cursor-pointer"
              >
                Contact Me
              </button>
            </div>
          </section>

          {/* NEW: Why Hire Me Section */}
          <section className="max-w-5xl mx-auto px-6 py-6 relative z-10 border-t border-neutral-900/40 pt-10">
            <div className="flex items-center space-x-2.5 mb-6">
              <CpuIcon size={14} className="text-blue-500" />
              <h3 className="text-xs uppercase font-mono tracking-widest text-neutral-400 font-bold">
                Why Hire Me // Core Competencies
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 rounded-xl border border-neutral-900 bg-neutral-950/20 relative overflow-hidden group hover:border-neutral-800 transition-all">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-3">
                  <ServerIcon size={16} className="text-blue-400" />
                </div>
                <h4 className="text-sm font-bold text-white tracking-tight mb-2">Production-Ready Systems</h4>
                <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                  I design decoupled, async topologies using task queues (BullMQ/Celery) and caching layers (Redis) to build systems that scale cleanly under real-world rate limits.
                </p>
              </div>
              <div className="p-5 rounded-xl border border-neutral-900 bg-neutral-950/20 relative overflow-hidden group hover:border-neutral-800 transition-all">
                <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-3">
                  <SparklesIcon size={16} className="text-purple-400" />
                </div>
                <h4 className="text-sm font-bold text-white tracking-tight mb-2">AI & RAG Orchestration</h4>
                <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                  Experienced in building agentic AI pipelines with structured JSON outputs, FAISS retrieval, knowledge graphs, and multi-agent loops (LangGraph).
                </p>
              </div>
              <div className="p-5 rounded-xl border border-neutral-900 bg-neutral-950/20 relative overflow-hidden group hover:border-neutral-800 transition-all">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-3">
                  <BriefcaseIcon size={16} className="text-emerald-400" />
                </div>
                <h4 className="text-sm font-bold text-white tracking-tight mb-2">Audit-Grade Integrity</h4>
                <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                  Committed to write immutable database hook locks, double-entry ledgers, and comprehensive automated test suites to ensure enterprise security and compliance.
                </p>
              </div>
            </div>
          </section>

          {/* Main Dashboard Workspace Grid */}
          <div className="max-w-5xl mx-auto px-6 relative z-10 mt-10">

            {recruiterMode ? (
              // Recruiter Mode: Executive View (systems list, experience, core skills)
              <div className="space-y-24">
                
                {/* Systems Section */}
                <section id="systems" className="space-y-4 pt-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <CpuIcon size={14} className="text-blue-500" />
                      <h3 className="text-xs uppercase font-mono tracking-widest text-neutral-450 font-bold">
                        Systems Portfolio // Technical Breakdown
                      </h3>
                    </div>
                    <span className="text-xs font-mono text-blue-400 animate-pulse uppercase font-semibold">
                      Skim-Friendly Executive view enabled
                    </span>
                  </div>
                  <SystemsGrid onSelectSystem={setActiveSystemId} />
                </section>

                {/* Experience Section */}
                <section id="experience" className="space-y-4 pt-4">
                  <div className="flex items-center space-x-2">
                    <BriefcaseIcon size={14} className="text-blue-500" />
                    <h3 className="text-xs uppercase font-mono tracking-widest text-neutral-450 font-bold">
                      Career History // Milestones
                    </h3>
                  </div>
                  <Experience />
                </section>

                {/* Core Skills Section */}
                <section className="space-y-4 pt-4">
                  <div className="flex items-center space-x-2">
                    <CpuIcon size={14} className="text-blue-500" />
                    <h3 className="text-xs uppercase font-mono tracking-widest text-neutral-450 font-bold">
                      Skills Inventory // Tech Stack Matrix
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
                    {coreSkills.map((skillGroup, idx) => (
                      <div 
                        key={idx}
                        className="p-4 rounded-xl border border-neutral-900 bg-[#0d0d0e]/60 hover:border-neutral-800 transition-all"
                      >
                        <span className="text-[10px] font-mono text-neutral-500 uppercase block mb-2 font-bold">{skillGroup.category}</span>
                        <div className="flex flex-wrap gap-1.5">
                          {skillGroup.items.map((skill) => (
                            <span key={skill} className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-850 text-neutral-350 font-mono text-[10px]">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

              </div>
            ) : (
              // Standard Mode: Full Interactive Dossier (Generous space-y-36 spacing)
              <div className="space-y-36">

                {/* SECTION 1: System Index */}
                <section className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <MapIcon size={14} className="text-blue-500" />
                    <h3 className="text-sm uppercase font-mono tracking-wider text-neutral-400 font-bold">
                      01 // System Index
                    </h3>
                  </div>
                  <SystemMap activeId={activeSystemId} onSelectSystem={setActiveSystemId} />
                </section>

                {/* SECTION 2: Systems Grid */}
                <section id="systems" className="space-y-4 pt-4">
                  <div className="flex items-center space-x-2">
                    <CpuIcon size={14} className="text-blue-500" />
                    <h3 className="text-sm uppercase font-mono tracking-wider text-neutral-400 font-bold">
                      02 // Systems Grid
                    </h3>
                  </div>
                  <SystemsGrid onSelectSystem={(id) => {
                    setActiveSystemId(id);
                    scrollTo("topology");
                  }} />
                </section>

                {/* SECTION 3: System Design Visualizer */}
                <section id="topology" className="space-y-4 pt-4">
                  <div className="flex items-center space-x-2">
                    <MapIcon size={14} className="text-blue-500" />
                    <h3 className="text-sm uppercase font-mono tracking-wider text-neutral-400 font-bold">
                      03 // System Design Visualizer
                    </h3>
                  </div>
                  <SystemDesignVisualizer systemId={activeSystemId} />
                </section>

                {/* SECTION 4: Engineering Experience */}
                <section id="experience" className="space-y-4 pt-4">
                  <div className="flex items-center space-x-2">
                    <BriefcaseIcon size={14} className="text-blue-500" />
                    <h3 className="text-sm uppercase font-mono tracking-wider text-neutral-400 font-bold">
                      04 // Engineering Experience
                    </h3>
                  </div>
                  <Experience />
                </section>

                {/* SECTION 5: Interactive Engineering Q&A */}
                <section id="interview" className="space-y-4 pt-4">
                  <div className="flex items-center space-x-2">
                    <TerminalIcon size={14} className="text-blue-500" />
                    <h3 className="text-sm uppercase font-mono tracking-wider text-neutral-400 font-bold">
                      05 // Interactive Engineering Q&A
                    </h3>
                  </div>
                  <KnowledgeTerminal />
                </section>

                {/* SECTION 6: Operating Principles */}
                <section className="space-y-4 pt-4">
                  <div className="flex items-center space-x-2">
                    <CpuIcon size={14} className="text-blue-500" />
                    <h3 className="text-sm uppercase font-mono tracking-wider text-neutral-400 font-bold">
                      06 // Operating Principles
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
                    {operatingPrinciples.map((op, idx) => (
                      <div 
                        key={idx}
                        className="p-4 rounded-xl border border-neutral-900 bg-neutral-950/20 flex flex-col justify-between space-y-3 hover:border-neutral-800 transition-all"
                      >
                        <div>
                          <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold tracking-wider block mb-1">Adopt</span>
                          <span className="px-2.5 py-1 rounded bg-emerald-950/20 border border-emerald-900/60 text-emerald-400 font-semibold text-xs leading-normal">
                            {op.preferred}
                          </span>
                        </div>
                        <div className="border-t border-neutral-900/60 pt-2">
                          <span className="text-[10px] font-mono text-neutral-500 uppercase block mb-1 font-bold">Avoid</span>
                          <span className="px-2.5 py-1 rounded bg-neutral-950 border border-neutral-900 text-neutral-450 text-xs leading-normal line-through">
                            {op.alternative}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* SECTION 7: What I Would Build Next */}
                <section className="space-y-4 pt-4">
                  <div className="flex items-center space-x-2">
                    <CpuIcon size={14} className="text-blue-500" />
                    <h3 className="text-sm uppercase font-mono tracking-wider text-neutral-400 font-bold">
                      07 // What I Would Build Next
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-5 rounded-xl border border-neutral-900 bg-neutral-950/20 hover:border-neutral-800 transition-all relative overflow-hidden group">
                      <span className="text-[10px] font-mono text-blue-500 uppercase tracking-widest block mb-2 font-bold">01 // Distributed Systems</span>
                      <h4 className="text-sm font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">Distributed Security Agent Network</h4>
                      <p className="text-xs text-neutral-450 leading-relaxed font-sans">
                        A peer-to-peer mesh of AppSec scanners sharing real-time vulnerability signatures and executing edge checks via lightweight Wasm runners.
                      </p>
                    </div>
                    <div className="p-5 rounded-xl border border-neutral-900 bg-neutral-950/20 hover:border-neutral-800 transition-all relative overflow-hidden group">
                      <span className="text-[10px] font-mono text-purple-500 uppercase tracking-widest block mb-2 font-bold">02 // Intelligent Pipelines</span>
                      <h4 className="text-sm font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">Agentic CI/CD Reviewer</h4>
                      <p className="text-xs text-neutral-450 leading-relaxed font-sans">
                        A Git-integrated pipeline executing multi-turn patch synthesis directly within pull requests, validating code compilation in ephemeral micro-containers before committing.
                      </p>
                    </div>
                    <div className="p-5 rounded-xl border border-neutral-900 bg-neutral-950/20 hover:border-neutral-800 transition-all relative overflow-hidden group">
                      <span className="text-[10px] font-mono text-emerald-500 uppercase tracking-widest block mb-2 font-bold">03 // Platform Engineering</span>
                      <h4 className="text-sm font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">Multi-tenant AI Workflow Engine</h4>
                      <p className="text-xs text-neutral-450 leading-relaxed font-sans">
                        A workflow platform allowing developers to stitch cyclic LLM agents via visual drag-and-drop graphs, backing executions with BullMQ and database-level tenancy locks.
                      </p>
                    </div>
                  </div>
                </section>

              </div>
            )}

          </div>

          {/* Footer */}
          <footer className="mt-24 border-t border-neutral-900 py-12 text-center relative z-10">
            <p className="text-xs font-mono text-neutral-500 font-semibold">
              KRISHNA OS v2.0 // OFFLINE SYSTEM DEPLOYMENT INDEX // 2026
            </p>
          </footer>

          {/* Back to Top Button */}
          <AnimatePresence>
            {showScrollTop && (
              <motion.button
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                onClick={scrollToTop}
                className="fixed bottom-6 right-6 z-50 p-2.5 bg-neutral-950/80 hover:bg-neutral-900 border border-neutral-800 hover:border-neutral-600 text-neutral-400 hover:text-white rounded-full shadow-lg backdrop-blur-sm cursor-pointer transition-all flex items-center justify-center"
                aria-label="Back to top"
              >
                <ChevronUpIcon size={16} />
              </motion.button>
            )}
          </AnimatePresence>

          {/* Contact Me Modal */}
          <AnimatePresence>
            {showContact && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="w-full max-w-sm border border-neutral-800 bg-[#0d0d0e] rounded-xl p-6 shadow-2xl relative glow-blue font-sans text-sm"
                >
                  <button 
                    onClick={() => setShowContact(false)}
                    className="absolute top-4 right-4 text-neutral-500 hover:text-white cursor-pointer"
                  >
                    <XIcon size={14} />
                  </button>
                  
                  <h3 className="text-xs font-mono uppercase text-blue-500 tracking-wider mb-5 font-bold">
                    CONTACT CHANNEL
                  </h3>

                  <div className="space-y-4 text-neutral-300">
                    <div>
                      <span className="text-neutral-500 font-mono text-[10px] uppercase tracking-wider block mb-0.5 font-bold">Phone Call / WhatsApp</span>
                      <a href="tel:+918090872862" className="text-white hover:text-blue-400 font-semibold transition-colors text-sm">
                        +91 8090872862
                      </a>
                    </div>
                    <div>
                      <span className="text-neutral-500 font-mono text-[10px] uppercase tracking-wider block mb-0.5 font-bold">Direct Email</span>
                      <a href="mailto:workforkrishnasingh@gmail.com" className="text-white hover:text-blue-400 font-semibold transition-colors text-sm">
                        workforkrishnasingh@gmail.com
                      </a>
                    </div>
                    <div>
                      <span className="text-neutral-500 font-mono text-[10px] uppercase tracking-wider block mb-0.5 font-bold">LinkedIn Profile</span>
                      <a 
                        href="https://www.linkedin.com/in/krishna-singh-8a06461b8/" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-white hover:text-blue-400 font-semibold transition-colors text-sm block truncate"
                      >
                        linkedin.com/in/krishna-singh-8a06461b8
                      </a>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

        </div>
      )}
    </>
  );
}
