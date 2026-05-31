"use client";

import React from "react";
import { CpuIcon, ServerIcon, SparklesIcon, ChevronRightIcon } from "./CustomIcons";
import { portfolioSystems, PortfolioSystem } from "@/data/portfolioData";

type SystemMapProps = {
  activeId: string;
  onSelectSystem: (id: string) => void;
};

const colorStyles = {
  purple: {
    textColor: "text-purple-400",
    borderClass: "border-purple-500/40",
    bgClass: "bg-purple-950/10 shadow-[0_0_25px_rgba(168,85,247,0.08)]",
    dotClass: "bg-purple-500",
    hoverClass: "hover:border-purple-500/30 hover:bg-purple-950/5 group-hover:text-purple-400"
  },
  red: {
    textColor: "text-red-400",
    borderClass: "border-red-500/40",
    bgClass: "bg-red-950/10 shadow-[0_0_25px_rgba(239,68,68,0.08)]",
    dotClass: "bg-red-500",
    hoverClass: "hover:border-red-500/30 hover:bg-red-950/5 group-hover:text-red-400"
  },
  green: {
    textColor: "text-emerald-400",
    borderClass: "border-emerald-500/40",
    bgClass: "bg-emerald-950/10 shadow-[0_0_25px_rgba(16,185,129,0.08)]",
    dotClass: "bg-emerald-500",
    hoverClass: "hover:border-emerald-500/30 hover:bg-emerald-950/5 group-hover:text-emerald-400"
  },
  orange: {
    textColor: "text-orange-400",
    borderClass: "border-orange-500/40",
    bgClass: "bg-orange-950/10 shadow-[0_0_25px_rgba(249,115,22,0.08)]",
    dotClass: "bg-orange-500",
    hoverClass: "hover:border-orange-500/30 hover:bg-orange-950/5 group-hover:text-orange-400"
  },
  blue: {
    textColor: "text-blue-400",
    borderClass: "border-blue-500/40",
    bgClass: "bg-blue-950/10 shadow-[0_0_25px_rgba(59,130,246,0.08)]",
    dotClass: "bg-blue-500",
    hoverClass: "hover:border-blue-500/30 hover:bg-blue-950/5 group-hover:text-blue-400"
  }
};

const getStatusColorClass = (status: PortfolioSystem["status"]) => {
  switch (status) {
    case "ONLINE":
      return "text-emerald-400";
    case "MONITORING":
      return "text-orange-400";
    case "DEPLOYED":
      return "text-blue-400";
    case "ACTIVE":
      return "text-purple-400";
    case "RESEARCH":
      return "text-amber-400";
    default:
      return "text-neutral-450";
  }
};

export default function SystemMap({ activeId, onSelectSystem }: SystemMapProps) {
  // Group systems dynamically by their high-level category
  const categories = [
    {
      title: "AI Infrastructure",
      icon: <SparklesIcon className="text-purple-400" size={16} />,
      systems: ["securelens", "openllm-gateway", "vanco-ai"]
    },
    {
      title: "Distributed Backends",
      icon: <ServerIcon className="text-emerald-400" size={16} />,
      systems: ["sentinel", "esg-dashboard"]
    },
    {
      title: "Intelligent Workflows",
      icon: <CpuIcon className="text-blue-400" size={16} />,
      systems: ["assessment-creator", "scaleshorts", "driveseek"]
    }
  ];

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
        {categories.map((cat, catIdx) => (
          <div 
            key={catIdx}
            className="flex flex-col space-y-4"
          >
            {/* Category Header */}
            <div className="flex items-center space-x-2 text-sm font-mono tracking-wider uppercase text-neutral-400 bg-neutral-950/40 border border-neutral-900/60 p-2.5 rounded-lg w-fit">
              {cat.icon}
              <span>{cat.title}</span>
            </div>

            {/* List of systems in category */}
            <div className="flex flex-col space-y-3">
              {cat.systems.map((sysId) => {
                const sysData = portfolioSystems.find((s) => s.id === sysId);
                if (!sysData) return null;

                const isActive = sysData.id === activeId;
                const color = sysData.color;
                let style;
                switch (color) {
                  case "purple": style = colorStyles.purple; break;
                  case "red": style = colorStyles.red; break;
                  case "green": style = colorStyles.green; break;
                  case "orange": style = colorStyles.orange; break;
                  case "blue": default: style = colorStyles.blue; break;
                }

                return (
                  <button
                    key={sysData.id}
                    onClick={() => onSelectSystem(sysData.id)}
                    className={`group text-left p-4 rounded-xl border transition-all duration-300 relative cursor-pointer ${
                      isActive 
                        ? `${style.borderClass} ${style.bgClass} text-white`
                        : `border-neutral-900 bg-neutral-950/20 hover:border-neutral-800 ${style.hoverClass}`
                    }`}
                  >
                    {/* Active glow indicator */}
                    {isActive && (
                      <span className={`absolute top-0 right-0 w-2 h-2 rounded-bl-xl ${style.dotClass} animate-pulse`} />
                    )}

                    <div className="flex justify-between items-center mb-2">
                      <h4 className={`text-sm font-semibold text-white tracking-tight group-hover:${style.textColor} transition-colors`}>
                        {sysData.name}
                      </h4>
                      <ChevronRightIcon 
                        size={12} 
                        className={`text-neutral-600 transition-transform ${
                          isActive ? `translate-x-1 ${style.textColor}` : `group-hover:translate-x-1 group-hover:${style.textColor}`
                        }`}
                      />
                    </div>

                    <div className="flex justify-between items-center mt-1">
                      <p className="text-xs text-neutral-450 font-mono">
                        {sysData.type}
                      </p>
                      <span className={`text-[10px] font-mono flex items-center font-bold ${getStatusColorClass(sysData.status)}`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5 animate-pulse" />
                        {sysData.status}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
