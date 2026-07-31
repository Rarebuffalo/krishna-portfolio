"use client";

import React, { useEffect } from "react";
import BlueprintGrid from "@/components/BlueprintGrid";
import Header from "@/components/Header";
import FeaturedProjects from "@/components/FeaturedProjects";
import TechMatrix from "@/components/TechMatrix";

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
        <section className="hero min-h-[calc(100vh-64px)] flex flex-col justify-center pb-[64px]">
          <div className="eyebrow flex items-center gap-[10px] text-[12px] text-[#8b8f96] mb-[24px] animate-rise">
            <span className="bar w-[22px] h-[1px] bg-[#d4a657]/45" />
            <span className="mono">SOFTWARE ENGINEER — NEW DELHI</span>
          </div>
          
          <h1 className="font-display font-semibold text-[38px] min-[640px]:text-[52px] min-[1024px]:text-[74px] leading-[1.06] text-[#f2f1ec] max-w-[900px] animate-rise [animation-delay:120ms]">
            I build the <em className="not-italic text-[#8b8f96]">unglamorous</em> infrastructure that makes software trustworthy.
          </h1>
          
          <p className="lede mt-[24px] max-w-[560px] text-[17px] leading-[1.65] text-[#8b8f96] animate-rise [animation-delay:240ms]">
            I design and ship developer tooling and compliance systems for B2B SaaS teams. Currently building{" "}
            <span className="text-[#f2f1ec] font-medium">DevGuard</span>, a machine‑compliance agent for engineering teams pursuing SOC 2 and ISO 27001.
          </p>
          
          <div className="cta-row mt-[64px] flex items-center gap-[24px] animate-rise [animation-delay:360ms] max-sm:flex-col max-sm:items-start max-sm:gap-[16px]">
            <a
              href="#work"
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

        {/* Section 2: Flagship Work Grid */}
        <FeaturedProjects />

        {/* Section 3: Engineering Philosophy Grid */}
        <section className="philosophy py-[96px] reveal border-b border-[rgba(245,245,242,0.08)]" id="philosophy">
          <div className="section-head flex items-baseline justify-between pb-[40px] border-b border-[rgba(245,245,242,0.08)] mb-[64px]">
            <div>
              <span className="label mono text-[12px] text-[#d4a657]">HOW I WORK</span>
              <h2 className="font-display font-semibold text-[32px] max-md:text-[24px] mt-[6px] text-[#f2f1ec]">
                Engineering philosophy
              </h2>
            </div>
          </div>
          
          <div className="principles grid grid-cols-3 max-[860px]:grid-cols-1 gap-[40px]">
            <div className="principle pt-[40px] border-t border-[rgba(245,245,242,0.14)]">
              <span className="idx mono text-[12px] text-[#d4a657] block mb-[16px]">01</span>
              <h3 className="text-[18px] font-semibold mb-[10px] text-[#f2f1ec]">Correctness before cleverness</h3>
              <p className="text-[14px] leading-[1.65] text-[#8b8f96]">
                I reason through edge cases before I reach for the elegant abstraction. Working code that&apos;s boring beats clever code that&apos;s fragile.
              </p>
            </div>
            <div className="principle pt-[40px] border-t border-[rgba(245,245,242,0.14)]">
              <span className="idx mono text-[12px] text-[#d4a657] block mb-[16px]">02</span>
              <h3 className="text-[18px] font-semibold mb-[10px] text-[#f2f1ec]">Systems, not screens</h3>
              <p className="text-[14px] leading-[1.65] text-[#8b8f96]">
                Every interface sits on top of data flow, state, and failure modes. I design the system first — the UI is just where it becomes visible.
              </p>
            </div>
            <div className="principle pt-[40px] border-t border-[rgba(245,245,242,0.14)]">
              <span className="idx mono text-[12px] text-[#d4a657] block mb-[16px]">03</span>
              <h3 className="text-[18px] font-semibold mb-[10px] text-[#f2f1ec]">Ship the smallest working thing</h3>
              <p className="text-[14px] leading-[1.65] text-[#8b8f96]">
                Prototypes earn their next iteration through real usage, not through more planning. I&apos;d rather learn from a rough version in front of users.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: Minimal Tech Matrix */}
        <TechMatrix />

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
