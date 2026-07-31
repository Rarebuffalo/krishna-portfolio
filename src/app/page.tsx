"use client";

import React, { useEffect } from "react";
import BlueprintGrid from "@/components/BlueprintGrid";
import Header from "@/components/Header";
import FeaturedProjects from "@/components/FeaturedProjects";
import TechMatrix from "@/components/TechMatrix";
import Link from "next/link";
import { portfolioSystems, experienceData } from "@/data/portfolioData";

export default function Home() {
  useEffect(() => {
    // Setup IntersectionObserver for reveal animations
    const revealEls = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    revealEls.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, []);

  // Filter systems for the curiosity section
  const curiosityProjects = portfolioSystems.filter(
    (sys) =>
      sys.id !== "securelens" &&
      sys.id !== "sentinel" &&
      sys.id !== "equityforge" &&
      sys.id !== "flientsec"
  );

  return (
    <>
      {/* Background blueprint grid and vignette overlays */}
      <BlueprintGrid />
      <div className="vignette" />

      {/* Sticky Header */}
      <Header />

      {/* Primary Narrative flow container */}
      <main className="wrap relative z-10 pt-[64px] min-h-screen">
        
        {/* Section 1: Hero Identity */}
        <section className="hero relative min-h-[calc(100vh-64px)] flex flex-col justify-center pb-[64px]">
          <div className="eyebrow flex items-center gap-[10px] text-[12px] text-[#8b8f96] mb-[24px] animate-rise">
            <span className="bar w-[22px] h-[1px] bg-[#d4a657]/45" />
            <span className="mono">SOFTWARE ENGINEER — NEW DELHI</span>
          </div>
          
          <h1 className="font-display font-semibold text-[38px] min-[640px]:text-[52px] min-[1024px]:text-[74px] leading-[1.06] text-[#f2f1ec] max-w-[900px] animate-rise [animation-delay:120ms]">
            I build the <em className="not-italic text-[#8b8f96]">unglamorous</em> infrastructure that makes software trustworthy.
          </h1>
          
          <p className="lede mt-[24px] max-w-[560px] text-[17px] leading-[1.65] text-[#8b8f96] animate-rise [animation-delay:240ms]">
            I design and ship developer tooling and compliance systems for B2B SaaS teams. Currently building{" "}
            <span className="text-[#f2f1ec] font-medium">FlientSec</span>, a machine‑compliance agent for engineering teams pursuing SOC 2 and ISO 27001.
          </p>
          
          <div className="cta-row mt-[64px] flex items-center gap-[24px] animate-rise [animation-delay:360ms] max-sm:flex-col max-sm:items-start max-sm:gap-[16px]">
            <a
              href="#projects"
              className="btn btn-primary inline-flex items-center gap-[8px] px-[22px] py-[13px] text-[14px] font-medium rounded-[3px] bg-[#f2f1ec] text-[#0a0b0d] border border-[#f2f1ec] transition-all hover:bg-[#d4a657] hover:border-[#d4a657] hover:translate-y-[-1px]"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="btn btn-ghost inline-flex items-center gap-[8px] px-[22px] py-[13px] text-[14px] font-medium rounded-[3px] text-[#f2f1ec] border border-[rgba(245,245,242,0.14)] transition-all hover:border-[#d4a657]/45 hover:text-[#d4a657]"
            >
              Get in Touch
            </a>
          </div>

          <div className="scroll-cue absolute bottom-[40px] left-[40px] flex items-center gap-[10px] text-[11px] text-[#5c6066] animate-fadeIn [animation-delay:800ms] max-md:hidden">
            <div className="line w-[1px] h-[32px] bg-gradient-to-b from-[#5c6066] to-transparent" />
            <span>SCROLL</span>
          </div>
        </section>

        {/* Section 1.5: About Section */}
        <section className="about py-[96px] reveal border-b border-[rgba(245,245,242,0.08)]" id="about">
          <div className="section-head flex items-baseline justify-between pb-[40px] border-b border-[rgba(245,245,242,0.08)] mb-[64px]">
            <div>
              <span className="label mono text-[12px] text-[#d4a657]">ABOUT ME</span>
              <h2 className="font-display font-semibold text-[32px] max-md:text-[24px] mt-[6px] text-[#f2f1ec]">
                Software developer by trade, systems engineer by heart
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-2 max-md:grid-cols-1 gap-[40px]">
            <div className="text-[15px] leading-[1.7] text-[#8b8f96] space-y-[16px]">
              <p>
                I specialize in building backend architectures, reliable developer tools, and asynchronous workflow pipelines. My focus centers on making systems robust, highly concurrent, and audit-compliant.
              </p>
              <p>
                I thrive in the space where data logic meets reliability—handling database scaling bottlenecks, event scheduling pipelines, and isolated code compilers.
              </p>
            </div>
            <div className="text-[15px] leading-[1.7] text-[#8b8f96] space-y-[16px]">
              <p>
                My philosophy is straightforward: design correct systems, value data integrity above abstractions, and build software that startups can depend on to scale their operations.
              </p>
              <p>
                Whether it is integrating automated AppSec vulnerability scanners, orchestration worker queues, or secure authorization layers, I strive to write clear, production-grade code.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: Projects Container */}
        <section id="projects" className="projects-container border-b border-[rgba(245,245,242,0.08)]">
          
          {/* Active Build Banner */}
          <div className="currently-building py-[96px] reveal border-b border-[rgba(245,245,242,0.08)]">
            <div className="section-head flex items-baseline justify-between pb-[40px] border-b border-[rgba(245,245,242,0.08)] mb-[48px]">
              <div>
                <span className="label mono text-[12px] text-[#d4a657]">ACTIVE BUILD</span>
                <h2 className="font-display font-semibold text-[32px] max-md:text-[24px] mt-[6px] text-[#f2f1ec]">
                  What I&apos;m building now
                </h2>
              </div>
            </div>

            <div className="p-[32px] rounded-[3px] border border-[#d4a657]/20 bg-linear-to-br from-[#14120f] to-[#0c0d0f] flex max-[860px]:flex-col items-center justify-between gap-[32px]">
              <div className="space-y-[8px]">
                <h3 className="text-[20px] font-semibold text-[#f2f1ec] flex items-center gap-[10px]">
                  <span className="dot w-[8px] h-[8px] rounded-full bg-[#d4a657] animate-pulse shadow-[0_0_8px_#d4a657]"></span>
                  FlientSec
                </h3>
                <p className="text-[14px] leading-[1.65] text-[#8b8f96] max-w-[600px]">
                  Product-driven threat intelligence and real-time audit-compliance orchestrator. Decouples heavy compliance audits and vulnerability scans using background task message queues to verify evidence blocks.
                </p>
              </div>
              <a
                href="https://github.com/Rarebuffalo/FlientSec"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost shrink-0 px-[20px] py-[10px] text-[13px] font-medium rounded-[3px] text-[#f2f1ec] border border-[rgba(245,245,242,0.14)] hover:border-[#d4a657] hover:text-[#d4a657] transition-all"
              >
                Source Repository ↗
              </a>
            </div>
          </div>

          {/* Featured Projects */}
          <div className="py-[96px] border-b border-[rgba(245,245,242,0.08)]">
            <FeaturedProjects />
          </div>

          {/* Curiosity Projects Grid */}
          <div className="curiosity py-[96px] reveal">
            <div className="section-head flex items-baseline justify-between pb-[40px] border-b border-[rgba(245,245,242,0.08)] mb-[64px]">
              <div>
                <span className="label mono text-[12px] text-[#d4a657]">OTHER WORK</span>
                <h2 className="font-display font-semibold text-[32px] max-md:text-[24px] mt-[6px] text-[#f2f1ec]">
                  Build out of curiosity
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-2 max-md:grid-cols-1 gap-[24px]">
              {curiosityProjects.map((sys) => (
                <div
                  key={sys.id}
                  className="card p-[24px] rounded-[3px] border border-[rgba(245,245,242,0.08)] bg-[#101215]/30 flex flex-col justify-between hover:border-[#d4a657]/35 transition-all"
                >
                  <div>
                    <h3 className="text-[17px] font-semibold text-[#f2f1ec] mb-[8px]">{sys.name}</h3>
                    <p className="text-[13px] leading-[1.65] text-[#8b8f96] mb-[20px]">{sys.tagline}</p>
                  </div>
                  <div className="space-y-[16px]">
                    <div className="flex flex-wrap gap-[6px]">
                      {sys.stack.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="px-[8px] py-[3px] rounded-[20px] bg-[#101215] border border-[rgba(245,245,242,0.08)] text-[#8b8f96] font-mono text-[10px]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-[16px] pt-[12px] border-t border-[rgba(245,245,242,0.08)]">
                      <a
                        href={sys.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[12px] font-medium text-[#f2f1ec] hover:text-[#d4a657] transition-colors"
                      >
                        GitHub ↗
                      </a>
                      <Link
                        href={`/systems/${sys.id}`}
                        className="text-[12px] font-medium text-[#f2f1ec] hover:text-[#d4a657] transition-colors"
                      >
                        Case Study ↗
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 3: Work Experience */}
        <section className="work py-[96px] reveal border-b border-[rgba(245,245,242,0.08)]" id="work">
          <div className="section-head flex items-baseline justify-between pb-[40px] border-b border-[rgba(245,245,242,0.08)] mb-[64px]">
            <div>
              <span className="label mono text-[12px] text-[#d4a657]">EXPERIENCE</span>
              <h2 className="font-display font-semibold text-[32px] max-md:text-[24px] mt-[6px] text-[#f2f1ec]">
                Professional timeline
              </h2>
            </div>
          </div>

          <div className="experience-card p-[32px] rounded-[3px] border border-[rgba(245,245,242,0.08)] bg-[#101215]/30">
            <div className="flex justify-between items-start max-md:flex-col max-md:gap-[12px] pb-[24px] border-b border-[rgba(245,245,242,0.08)] mb-[24px]">
              <div>
                <h3 className="text-[20px] font-semibold text-[#f2f1ec]">OpenStreemLabs</h3>
                <p className="text-[14px] text-[#d4a657] mt-[4px]">Fullstack Developer Intern</p>
              </div>
              <div className="text-right max-md:text-left">
                <span className="mono text-[12px] text-[#8b8f96] block">Nov 2025 - Mar 2026</span>
                <span className="inline-flex items-center gap-[6px] px-[8px] py-[3px] rounded-[12px] bg-[#d4a657]/10 border border-[#d4a657]/20 text-[#d4a657] text-[10px] mono mt-[6px] font-semibold">
                  {experienceData.status}
                </span>
              </div>
            </div>

            <ul className="flex flex-col gap-[16px] list-none p-0 m-0">
              {experienceData.highlights.map((highlight, index) => {
                const [title, desc] = highlight.split(": ");
                return (
                  <li key={index} className="flex gap-[12px] items-start">
                    <span className="w-[6px] h-[6px] rounded-full bg-[#d4a657] mt-[8px] shrink-0" />
                    <div>
                      <strong className="text-[#f2f1ec] font-medium text-[15px]">{title}:</strong>
                      <span className="text-[#8b8f96] text-[14px] leading-[1.6] block mt-[2px]">{desc}</span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        {/* Section 4: Technical Toolbox */}
        <section id="skills" className="tech-matrix-container border-b border-[rgba(245,245,242,0.08)]">
          <TechMatrix />
        </section>

        {/* Section 5: Contact Layout */}
        <section className="contact py-[144px] reveal text-center flex flex-col items-center justify-center" id="contact">
          <span className="label mono text-[12px] text-[#d4a657]">CONTACT</span>
          <h2 className="font-display font-semibold text-[30px] min-[640px]:text-[42px] min-[1024px]:text-[52px] leading-[1.15] text-[#f2f1ec] max-w-[640px] mt-[14px] mb-[40px]">
            Building something that needs a builder?<br />I&apos;d like to hear about it.
          </h2>
          <a
            href="mailto:workforkrishnasingh@gmail.com"
            className="btn btn-primary inline-flex items-center gap-[8px] px-[22px] py-[13px] text-[14px] font-medium rounded-[3px] bg-[#f2f1ec] text-[#0a0b0d] border border-[#f2f1ec] transition-all hover:bg-[#d4a657] hover:border-[#d4a657] hover:translate-y-[-1px] mb-[48px]"
          >
            Say hello
          </a>
          <div className="contact-links flex justify-center gap-[40px] flex-wrap mt-[64px]">
            <a
              href="mailto:workforkrishnasingh@gmail.com"
              className="text-[13px] text-[#8b8f96] flex items-center gap-[6px] transition-colors hover:text-[#d4a657]"
            >
              Email ↗
            </a>
            <a
              href="https://www.linkedin.com/in/krishna-singh-8a06461b8/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] text-[#8b8f96] flex items-center gap-[6px] transition-colors hover:text-[#d4a657]"
            >
              LinkedIn ↗
            </a>
            <a
              href="https://x.com/rarebuffalo1"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] text-[#8b8f96] flex items-center gap-[6px] transition-colors hover:text-[#d4a657]"
            >
              X (Twitter) ↗
            </a>
            <a
              href="https://github.com/krishnasingh020"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] text-[#8b8f96] flex items-center gap-[6px] transition-colors hover:text-[#d4a657]"
            >
              GitHub (Primary) ↗
            </a>
            <a
              href="https://github.com/Rarebuffalo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] text-[#8b8f96] flex items-center gap-[6px] transition-colors hover:text-[#d4a657]"
            >
              GitHub (Projects) ↗
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-[40px] border-t border-[rgba(245,245,242,0.08)] flex justify-between font-mono text-[11px] text-[#5c6066] max-md:flex-col max-md:gap-[8px]">
          <span>© 2026 Krishna</span>
          <span>Built with intent.</span>
        </footer>

      </main>
    </>
  );
}
