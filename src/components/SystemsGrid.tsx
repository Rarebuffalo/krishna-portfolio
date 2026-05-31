"use client";

import React from "react";
import Link from "next/link";
import { useRecruiterMode } from "@/context/RecruiterModeContext";
import { portfolioSystems, PortfolioSystem } from "@/data/portfolioData";
import { PlayIcon, CodeIcon, BookOpenIcon, MapIcon } from "./CustomIcons";

type SystemsGridProps = {
  onSelectSystem: (id: string) => void;
};

const getStatusColor = (status: PortfolioSystem["status"]) => {
  switch (status) {
    case "ONLINE":
      return "text-emerald-400 border-emerald-950/60 bg-emerald-950/20";
    case "MONITORING":
      return "text-orange-400 border-orange-950/60 bg-orange-950/20";
    case "DEPLOYED":
      return "text-blue-400 border-blue-950/60 bg-blue-950/20";
    case "ACTIVE":
      return "text-purple-400 border-purple-950/60 bg-purple-950/20";
    case "RESEARCH":
      return "text-amber-400 border-amber-950/60 bg-amber-950/20";
    default:
      return "text-neutral-400 border-neutral-900 bg-neutral-950";
  }
};

const colorBorderClasses = {
  purple: "group-hover:border-purple-500/30 group-hover:shadow-[0_0_30px_rgba(168,85,247,0.06)]",
  red: "group-hover:border-red-500/30 group-hover:shadow-[0_0_30px_rgba(239,68,68,0.06)]",
  green: "group-hover:border-emerald-500/30 group-hover:shadow-[0_0_30px_rgba(16,185,129,0.06)]",
  orange: "group-hover:border-orange-500/30 group-hover:shadow-[0_0_30px_rgba(249,115,22,0.06)]",
  blue: "group-hover:border-blue-500/30 group-hover:shadow-[0_0_30px_rgba(59,130,246,0.06)]"
};

const colorTextClasses = {
  purple: "group-hover:text-purple-400 text-purple-400",
  red: "group-hover:text-red-400 text-red-400",
  green: "group-hover:text-emerald-400 text-emerald-400",
  orange: "group-hover:text-orange-400 text-orange-400",
  blue: "group-hover:text-blue-400 text-blue-400"
};

const actionButtonColor = {
  purple: "bg-purple-600 hover:bg-purple-500 shadow-purple-900/10 hover:shadow-purple-600/10",
  red: "bg-red-600 hover:bg-red-500 shadow-red-900/10 hover:shadow-red-600/10",
  green: "bg-emerald-600 hover:bg-emerald-500 shadow-emerald-900/10 hover:shadow-emerald-600/10",
  orange: "bg-orange-600 hover:bg-orange-500 shadow-orange-900/10 hover:shadow-orange-600/10",
  blue: "bg-blue-600 hover:bg-blue-500 shadow-blue-900/10 hover:shadow-blue-600/10"
};

export default function SystemsGrid({ onSelectSystem }: SystemsGridProps) {
  const { recruiterMode } = useRecruiterMode();

  if (recruiterMode) {
    // Recruiter view: High-impact, highly structured list focus on Problem -> Solution -> Outcome
    return (
      <div className="w-full overflow-x-auto rounded-xl border border-neutral-900 bg-neutral-950/30">
        <table className="w-full text-left border-collapse font-sans text-sm">
          <thead>
            <tr className="border-b border-neutral-900 bg-neutral-950/80 text-xs uppercase tracking-wider text-neutral-400 font-mono">
              <th className="p-5 font-normal">System</th>
              <th className="p-5 font-normal">Classification</th>
              <th className="p-5 font-normal min-w-[220px]">Problem Space</th>
              <th className="p-5 font-normal min-w-[220px]">Engineering Solution</th>
              <th className="p-5 font-normal min-w-[240px]">Measurable Outcome</th>
              <th className="p-5 font-normal">Core Stack</th>
              <th className="p-5 font-normal text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-900">
            {portfolioSystems.map((sys) => {
              let textClass;
              switch (sys.color) {
                case "purple": textClass = colorTextClasses.purple; break;
                case "red": textClass = colorTextClasses.red; break;
                case "green": textClass = colorTextClasses.green; break;
                case "orange": textClass = colorTextClasses.orange; break;
                case "blue": default: textClass = colorTextClasses.blue; break;
              }
              return (
                <tr key={sys.id} className="hover:bg-neutral-900/15 transition-colors">
                  {/* Name */}
                  <td className="p-5 align-top">
                    <div className="font-bold text-white text-sm">{sys.name}</div>
                    <span className={`inline-block px-2 py-0.5 rounded text-xs font-mono border mt-2 uppercase tracking-wide ${getStatusColor(sys.status)}`}>
                      {sys.status}
                    </span>
                  </td>
                  {/* Type */}
                  <td className="p-5 align-top text-neutral-450 font-mono text-xs">
                    {sys.type}
                  </td>
                  {/* Problem */}
                  <td className="p-5 align-top text-neutral-350 leading-relaxed text-xs">
                    {sys.problem}
                  </td>
                  {/* Solution */}
                  <td className="p-5 align-top text-neutral-350 leading-relaxed text-xs">
                    {sys.solution}
                  </td>
                  {/* Outcome */}
                  <td className="p-5 align-top">
                    <div className={`font-semibold text-xs leading-relaxed ${textClass}`}>
                      {sys.impact[0]}
                    </div>
                    <ul className="list-disc list-inside mt-2 space-y-1 text-neutral-400 text-xs leading-relaxed">
                      {sys.impact.slice(1).map((imp, idx) => (
                        <li key={idx} className="marker:text-neutral-600">{imp}</li>
                      ))}
                    </ul>
                  </td>
                  {/* Stack */}
                  <td className="p-5 align-top">
                    <div className="flex flex-wrap gap-1 max-w-[160px]">
                      {sys.stack.slice(0, 4).map((tech) => (
                        <span key={tech} className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800/40 text-neutral-400 font-mono text-xs">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </td>
                  {/* Actions */}
                  <td className="p-5 align-top text-right">
                    <div className="flex flex-col items-end space-y-2">
                      <Link
                        href={`/systems/${sys.id}`}
                        className="flex items-center space-x-1.5 px-3 py-2 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-600 text-white rounded-md text-xs font-semibold transition-all"
                      >
                        <BookOpenIcon size={12} />
                        <span>Case Study</span>
                      </Link>
                      <a
                        href={sys.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-1.5 px-3 py-2 bg-neutral-950 hover:bg-neutral-900 border border-neutral-900 hover:border-neutral-800 text-neutral-450 hover:text-white rounded-md text-xs font-semibold transition-all"
                      >
                        <CodeIcon size={12} />
                        <span>GitHub</span>
                      </a>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }

  // Engineer View: Vibrant details, visual metrics, full CTAs
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {portfolioSystems.map((sys) => {
        let borderClass;
        let textClass;
        let buttonClass;
        switch (sys.color) {
          case "purple":
            borderClass = colorBorderClasses.purple;
            textClass = colorTextClasses.purple;
            buttonClass = actionButtonColor.purple;
            break;
          case "red":
            borderClass = colorBorderClasses.red;
            textClass = colorTextClasses.red;
            buttonClass = actionButtonColor.red;
            break;
          case "green":
            borderClass = colorBorderClasses.green;
            textClass = colorTextClasses.green;
            buttonClass = actionButtonColor.green;
            break;
          case "orange":
            borderClass = colorBorderClasses.orange;
            textClass = colorTextClasses.orange;
            buttonClass = actionButtonColor.orange;
            break;
          case "blue":
          default:
            borderClass = colorBorderClasses.blue;
            textClass = colorTextClasses.blue;
            buttonClass = actionButtonColor.blue;
            break;
        }

        return (
          <div
            key={sys.id}
            className={`group flex flex-col justify-between rounded-xl border border-neutral-900/30 bg-neutral-950/20 hover:bg-neutral-950/40 transition-all duration-300 relative overflow-hidden ${borderClass}`}
          >
            {/* Subtle grid pattern background on hover */}
            <div className="absolute inset-0 grid-bg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div className="p-6 relative z-10">
              {/* Header */}
              <div className="flex justify-between items-start mb-5">
                <div>
                  <h3 className={`text-lg font-bold text-white tracking-tight transition-colors ${textClass}`}>
                    {sys.name}
                  </h3>
                  <p className="text-xs text-neutral-500 font-mono mt-0.5 uppercase tracking-wider">{sys.type}</p>
                </div>
                <span className={`px-2.5 py-0.5 rounded text-xs font-mono border uppercase tracking-wide font-semibold ${getStatusColor(sys.status)}`}>
                  {sys.status}
                </span>
              </div>

              {/* Three-Tier Problem/Solution/Outcome structure */}
              <div className="space-y-4 mb-6">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 block mb-0.5 font-bold">Problem Space</span>
                  <p className="text-neutral-350 text-xs leading-relaxed">{sys.problem}</p>
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 block mb-0.5 font-bold">Engineering Solution</span>
                  <p className="text-neutral-350 text-xs leading-relaxed">{sys.solution}</p>
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 block mb-0.5 font-bold">Measurable Outcome</span>
                  <p className={`text-xs font-semibold leading-relaxed ${textClass}`}>{sys.impact[0]}</p>
                </div>
              </div>

              {/* Tech Tags */}
              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-neutral-900/60">
                {sys.stack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 rounded bg-neutral-900 border border-neutral-800/40 text-neutral-450 font-mono text-xs group-hover:text-neutral-350 group-hover:border-neutral-800 transition-all"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Row */}
            <div className="border-t border-neutral-900/80 bg-neutral-950/40 px-6 py-4 flex flex-wrap gap-2.5 relative z-10">
              <button
                onClick={() => onSelectSystem(sys.id)}
                className={`flex-1 flex items-center justify-center space-x-1.5 px-3 py-2 text-white rounded-md text-xs font-semibold transition-all cursor-pointer shadow-sm ${buttonClass}`}
              >
                <MapIcon size={12} />
                <span>Architecture</span>
              </button>
              <Link
                href={`/systems/${sys.id}`}
                className="flex-1 flex items-center justify-center space-x-1.5 px-3 py-2 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-600 text-white rounded-md text-xs font-semibold transition-all"
              >
                <BookOpenIcon size={12} />
                <span>Case Study</span>
              </Link>
              <div className="w-full flex gap-2 mt-1">
                <a
                  href={sys.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center space-x-1.5 px-2.5 py-1.5 bg-neutral-950 hover:bg-neutral-900 border border-neutral-900 hover:border-neutral-800 text-neutral-400 hover:text-white rounded-md text-xs font-medium transition-all"
                >
                  <PlayIcon size={11} />
                  <span>Live Demo</span>
                </a>
                <a
                  href={sys.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center space-x-1.5 px-2.5 py-1.5 bg-neutral-950 hover:bg-neutral-900 border border-neutral-900 hover:border-neutral-800 text-neutral-400 hover:text-white rounded-md text-xs font-medium transition-all"
                >
                  <CodeIcon size={11} />
                  <span>GitHub</span>
                </a>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
