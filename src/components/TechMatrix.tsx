"use client";

import React from "react";

export default function TechMatrix() {
  const categories = [
    {
      title: "Languages & Frontend",
      skills: [
        "Python",
        "Java",
        "JavaScript / TypeScript",
        "SQL",
        "React.js / Next.js",
        "HTML / CSS / Tailwind CSS"
      ],
    },
    {
      title: "Backend & AI",
      skills: [
        "FastAPI",
        "Node.js / Express.js",
        "OpenAI & Gemini APIs",
        "RAG & AI Agent Workflows",
        "Prompt Engineering",
        "LLM Orchestration"
      ],
    },
    {
      title: "Infrastructure & Concepts",
      skills: [
        "PostgreSQL / MongoDB / Redis",
        "Docker & Linux",
        "Git & GitHub Actions",
        "Authentication & Idempotency",
        "Asynchronous Processing",
        "Event-Driven Systems & Fault Tolerance"
      ],
    },
  ];

  return (
    <section className="tech py-[96px] reveal border-b border-line">
      <div className="section-head flex items-baseline justify-between pb-[40px] border-b border-line mb-[64px]">
        <div>
          <span className="label mono text-[12px] text-gold">TECHNICAL TOOLBOX</span>
          <h2 className="font-display font-semibold text-[32px] max-md:text-[24px] mt-[6px] text-soft-white">
            Production-grade competencies
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-3 max-[860px]:grid-cols-1 gap-[40px]">
        {categories.map((cat, idx) => (
          <div key={cat.title} className="p-[24px] rounded-[3px] border border-line bg-panel/50 flex flex-col">
            <span className="mono text-[11px] text-gold mb-[12px]">0{idx + 1} · {cat.title.toUpperCase()}</span>
            <ul className="flex flex-col gap-[12px] list-none p-0 m-0">
              {cat.skills.map((skill) => (
                <li key={skill} className="text-[14px] text-soft-white flex items-center gap-[8px]">
                  <span className="w-[4px] h-[4px] bg-gold rounded-full opacity-60" />
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
