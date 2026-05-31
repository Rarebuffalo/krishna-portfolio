"use client";

import React, { useState } from "react";
import { experienceData, engineeringLogs } from "@/data/portfolioData";
import { BriefcaseIcon, ActivityIcon, CpuIcon, ChevronDownIcon, ChevronRightIcon } from "./CustomIcons";

export default function Experience() {
  const [expandedLog, setExpandedLog] = useState<number | null>(null);

  const toggleLog = (idx: number) => {
    setExpandedLog((prev) => (prev === idx ? null : idx));
  };

  const currentMission = {
    title: "Currently Building",
    project: "AI Solution Architect Systems",
    items: [
      { label: "Learning", value: "Model Quantization & vLLM optimization" },
      { label: "Exploring", value: "Cyclic Multi-Agent Workflows with eBPF hooks" },
      { label: "Deploying", value: "Distributed consensus telemetry proxies" }
    ]
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full">
      {/* Left Column: Career Internship & Current Mission (5 Cols) */}
      <div className="lg:col-span-5 flex flex-col space-y-6">
        {/* Internship Card */}
        <div className="border border-neutral-900 bg-neutral-950/20 rounded-xl p-5 relative overflow-hidden">
          <div className="absolute inset-0 grid-bg opacity-[0.03] pointer-events-none" />
          
          <div className="flex items-center space-x-2.5 mb-4 pb-3 border-b border-neutral-900">
            <BriefcaseIcon size={16} className="text-emerald-400" />
            <h4 className="text-sm font-semibold text-white tracking-tight uppercase font-mono">
              Professional Experience
            </h4>
          </div>

          <div className="space-y-4">
            <div>
              <span className="text-neutral-500 font-mono text-[10px] uppercase block mb-0.5 font-bold">Organization</span>
              <h5 className="text-sm font-bold text-white leading-none">{experienceData.company}</h5>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-neutral-500 font-mono text-[10px] uppercase block mb-0.5 font-bold">Role</span>
                <span className="text-neutral-350 font-mono text-xs">{experienceData.role}</span>
              </div>
              <div>
                <span className="text-neutral-500 font-mono text-[10px] uppercase block mb-0.5 font-bold">Duration</span>
                <span className="text-neutral-350 font-mono text-xs">{experienceData.duration}</span>
              </div>
            </div>

            <div>
              <span className="text-neutral-500 font-mono text-[10px] uppercase block mb-1 font-bold">Deployment Status</span>
              <span className="inline-block px-2 py-0.5 rounded text-[10px] font-mono border border-emerald-950/60 bg-emerald-950/20 text-emerald-400 font-bold uppercase tracking-wider">
                {experienceData.status}
              </span>
            </div>

            {/* Highlights Checklist */}
            <div className="space-y-2.5 border-t border-neutral-900 pt-4 mt-2">
              <span className="text-xs uppercase font-mono tracking-wider text-neutral-455 font-bold">Key Technical Contributions</span>
              <div className="space-y-2">
                {experienceData.highlights.map((hl, idx) => {
                  const [title, desc] = hl.split(": ");
                  return (
                    <div key={idx} className="flex items-start space-x-2 text-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-2 mr-1.5 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                      <span className="text-neutral-300 leading-relaxed">
                        <strong className="text-white font-medium">{title}:</strong> {desc}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Current Live Focus */}
        <div className="p-5 border border-neutral-900 rounded-xl bg-neutral-950/20 relative overflow-hidden">
          <div className="absolute inset-0 grid-bg opacity-[0.03] pointer-events-none" />
          
          <div className="flex items-center space-x-2 mb-4 pb-3 border-b border-neutral-900">
            <CpuIcon className="text-purple-400 animate-pulse" size={15} />
            <span className="text-xs font-mono uppercase tracking-wider text-neutral-300 font-bold">Live Telemetry focus</span>
          </div>

          <div className="space-y-4">
            <div>
              <span className="text-neutral-500 font-mono text-[10px] uppercase block mb-0.5 font-bold">Active Track</span>
              <h4 className="text-sm font-bold text-white tracking-tight">
                {currentMission.project}
              </h4>
            </div>

            <div className="space-y-3">
              {currentMission.items.map((item, idx) => (
                <div key={idx} className="text-xs">
                  <span className="text-neutral-500 font-mono text-[10px] uppercase block mb-0.5 font-bold">{item.label}</span>
                  <p className="text-neutral-350 font-sans text-xs leading-relaxed">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Engineering Changelog / Timeline (7 Cols) */}
      <div className="lg:col-span-7 flex flex-col space-y-4">
        <div className="p-5 border border-neutral-900 rounded-xl bg-neutral-950/20 w-full">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-neutral-900">
            <div className="flex items-center space-x-2.5">
              <ActivityIcon className="text-purple-400" size={15} />
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-350 font-bold">Engineering Release Log</span>
            </div>
            <span className="text-[10px] font-mono text-neutral-500 font-bold uppercase">PROD_STREAM: SYNCHRONIZED</span>
          </div>

          {/* Logs Timeline */}
          <div className="space-y-3 font-mono text-xs">
            {engineeringLogs.map((log, idx) => {
              const isExpanded = expandedLog === idx;
              return (
                <div 
                  key={idx}
                  className="border border-neutral-900/60 rounded-lg overflow-hidden transition-all bg-[#0a0a0b]/40 hover:bg-[#0a0a0b]/80"
                >
                  <button
                    onClick={() => toggleLog(idx)}
                    className="w-full text-left p-3.5 flex items-center justify-between cursor-pointer focus:outline-none select-none text-xs"
                  >
                    <div className="flex items-center space-x-3 truncate">
                      <span className="text-neutral-450 font-mono text-xs shrink-0">{log.date}</span>
                      <span className="px-1.5 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-400 text-xs font-mono shrink-0 uppercase">
                        {log.category}
                      </span>
                      <span className="text-white truncate font-medium">{log.message}</span>
                    </div>
                    <div className="flex items-center space-x-3 ml-2 shrink-0">
                      {log.metric && (
                        <span className="text-emerald-400 font-bold text-xs bg-emerald-950/20 px-1.5 py-0.5 rounded border border-emerald-950/60 shrink-0">
                          {log.metric}
                        </span>
                      )}
                      {isExpanded ? (
                        <ChevronDownIcon size={12} className="text-neutral-500" />
                      ) : (
                        <ChevronRightIcon size={12} className="text-neutral-500" />
                      )}
                    </div>
                  </button>

                  {/* Expanded Detail Panel */}
                  {isExpanded && (
                    <div className="px-3.5 pb-4.5 pt-2 border-t border-neutral-900 text-neutral-400 text-xs leading-relaxed font-sans bg-[#020203]/40">
                      <div className="text-[10px] font-mono uppercase text-neutral-500 mb-1 font-bold">Technical Implementation Detail</div>
                      {log.details}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
