"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioSystems, SystemNode } from "@/data/portfolioData";
import { DatabaseIcon, ServerIcon, SparklesIcon, CpuIcon, ActivityIcon, XIcon } from "./CustomIcons";

type SystemDesignVisualizerProps = {
  systemId: string;
};

export default function SystemDesignVisualizer({ systemId }: SystemDesignVisualizerProps) {
  const system = portfolioSystems.find((sys) => sys.id === systemId) || portfolioSystems[0];
  const [selectedNode, setSelectedNode] = useState<SystemNode | null>(null);
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  // Reset selected node and trigger transition loader when active system changes
  useEffect(() => {
    setSelectedNode(null);
    setLoading(true);
    setLogs([]);

    const logMessages = [
      `SYS_COM // DETECTED BLUEPRINT CONTEXT SHIFT [${systemId.toUpperCase()}]`,
      "SYS_COM // CLEARING ARCHITECTURE REGISTER BUFFER... [OK]",
      "SYS_COM // RESOLVING SYSTEM TOPOLOGY NODES... [OK]",
      "SYS_COM // SYNCHRONIZING INTER-SERVICE PIPELINES... [OK]",
      "SYS_COM // INTERACTIVE GRAPH INTERFACE DEPLOYED"
    ];

    let current = 0;
    const interval = setInterval(() => {
      if (current < logMessages.length) {
        const nextLog = logMessages[current];
        setLogs((prev) => [...prev, nextLog]);
        current++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setLoading(false);
        }, 120);
      }
    }, 60);

    return () => clearInterval(interval);
  }, [systemId]);

  const getNodeIcon = (type: SystemNode["type"]) => {
    switch (type) {
      case "frontend":
        return <CpuIcon size={16} className="text-blue-400" />;
      case "gateway":
        return <ServerIcon size={16} className="text-cyan-400" />;
      case "queue":
        return <ActivityIcon size={16} className="text-yellow-400 animate-pulse" />;
      case "worker":
        return <CpuIcon size={16} className="text-orange-400" />;
      case "database":
        return <DatabaseIcon size={16} className="text-emerald-400" />;
      case "ai":
        return <SparklesIcon size={16} className="text-purple-400" />;
      case "monitoring":
        return <ActivityIcon size={16} className="text-rose-400" />;
    }
  };

  // Find node decisions
  const getNodeDecision = (nodeLabel: string) => {
    const cleanLabel = nodeLabel.toLowerCase();
    return system.decisions.find(dec => {
      const decisionTitle = dec.decision.toLowerCase();
      return decisionTitle.includes(cleanLabel) || cleanLabel.includes(decisionTitle.split(" ")[0].toLowerCase());
    });
  };

  return (
    <div className="w-full border border-neutral-900 rounded-xl bg-neutral-950/20 p-6 overflow-hidden relative min-h-[340px]">
      {/* Decorative Grid Background */}
      <div className="absolute inset-0 grid-bg opacity-[0.1] pointer-events-none" />

      {/* Header */}
      <div className="flex justify-between items-center mb-6 relative z-10 border-b border-neutral-900 pb-4">
        <div>
          <h3 className="text-sm font-semibold text-white tracking-tight">
            System Design Visualizer
          </h3>
          <p className="text-xs text-neutral-450 font-mono">
            Interactive topology maps. Click highlighted service nodes to inspect design decisions.
          </p>
        </div>
        <div className="flex items-center space-x-2 text-xs font-mono text-neutral-350">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
          <span>ACTIVE TOPOLOGY</span>
        </div>
      </div>

      {/* Loading Overlay or Flow Canvas */}
      <div className="relative min-h-[220px]">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loader"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="absolute inset-0 flex flex-col justify-center items-center py-10 font-mono text-xs select-none bg-bg-dark/95 z-20 rounded-lg border border-neutral-900/40"
            >
              <div className="w-full max-w-sm space-y-1.5 px-6">
                <div className="text-[10px] text-neutral-500 uppercase tracking-widest border-b border-neutral-900/60 pb-2 mb-3 font-bold">
                  KRISHNA OS // SYSTEM_TELEMETRY
                </div>
                {logs.map((log, idx) => {
                  const isReady = log.includes("DEPLOYED");
                  return (
                    <div key={idx} className={isReady ? "text-emerald-400 font-bold" : "text-neutral-400"}>
                      {isReady ? " > " : "   "} {log}
                    </div>
                  );
                })}
                <div className="flex items-center space-x-1.5 pt-1.5">
                  <span className="inline-block w-1 h-3 bg-blue-500 animate-pulse" />
                  <span className="text-[9px] uppercase tracking-wider text-neutral-500 font-bold">connecting socket stream...</span>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col md:flex-row gap-6 items-stretch relative z-10"
            >
              {/* Left: Graph Canvas */}
              <div className="flex-grow overflow-x-auto scrollbar-none py-8 flex items-center justify-center min-w-0 border border-neutral-900/40 bg-neutral-950/10 rounded-xl relative">
                <div className="w-[820px] h-[160px] relative select-none shrink-0">
                  {/* SVG Connector Lines Overlay */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
                    <defs>
                      <linearGradient id="line-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#0066FF" stopOpacity="0.3" />
                        <stop offset="50%" stopColor="#7928CA" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#00FF66" stopOpacity="0.3" />
                      </linearGradient>
                      <style>{`
                        @keyframes dash {
                          to {
                            stroke-dashoffset: -20;
                          }
                        }
                        .flow-edge {
                          stroke: url(#line-grad);
                          stroke-width: 1.5;
                          stroke-linecap: round;
                        }
                        .flow-edge-animated {
                          stroke: #0066FF;
                          stroke-width: 1.5;
                          stroke-dasharray: 4, 6;
                          animation: dash 1s linear infinite;
                          opacity: 0.8;
                        }
                      `}</style>
                    </defs>

                    {/* Render lines between nodes */}
                    {system.edges.map((edge, idx) => {
                      const fromNode = system.nodes.find(n => n.id === edge.from);
                      const toNode = system.nodes.find(n => n.id === edge.to);
                      if (!fromNode || !toNode) return null;

                      const x1 = fromNode.x + 130;
                      const y1 = fromNode.y + 22;
                      const x2 = toNode.x;
                      const y2 = toNode.y + 22;

                      const dx = Math.abs(x2 - x1) * 0.5;
                      const pathD = `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`;

                      return (
                        <g key={idx}>
                          <path d={pathD} fill="none" className="flow-edge" />
                          {edge.animated && (
                            <path d={pathD} fill="none" className="flow-edge-animated" />
                          )}
                        </g>
                      );
                    })}
                  </svg>

                  {/* Render Nodes as absolutely positioned components */}
                  {system.nodes.map((node) => {
                    const isActive = selectedNode?.id === node.id;
                    const hasDecision = !!getNodeDecision(node.label);

                    return (
                      <button
                        key={node.id}
                        onClick={() => hasDecision && setSelectedNode(node)}
                        style={{
                          position: "absolute",
                          left: `${node.x}px`,
                          top: `${node.y}px`,
                          width: "135px",
                          height: "44px",
                          zIndex: 10
                        }}
                        className={`group flex items-center space-x-2 px-3 py-2.5 rounded-lg border text-left cursor-pointer transition-all duration-300 ${
                          isActive
                            ? "border-blue-500 bg-blue-950/20 shadow-[0_0_20px_rgba(0,102,255,0.15)] text-white"
                            : hasDecision
                            ? "border-neutral-800 bg-[#0d0d0e]/90 hover:border-neutral-500 text-neutral-300"
                            : "border-neutral-900 bg-[#0d0d0e]/60 text-neutral-500"
                        }`}
                      >
                        <div className="shrink-0">{getNodeIcon(node.type)}</div>
                        
                        <div className="truncate flex-1">
                          <div className="text-xs font-semibold truncate leading-tight">{node.label}</div>
                          <div className="text-[10px] font-mono text-neutral-450 uppercase tracking-widest leading-none mt-0.5">
                            {node.type}
                          </div>
                        </div>

                        {hasDecision && !isActive && (
                          <span className="w-1 h-1 rounded-full bg-blue-500/80 group-hover:scale-150 transition-transform" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Right: Node Inspector Panel */}
              <div className="w-full md:w-[320px] shrink-0 border border-neutral-900 bg-[#0d0d0e]/60 rounded-xl p-5 flex flex-col justify-between min-h-[220px]">
                {selectedNode ? (() => {
                  const dec = getNodeDecision(selectedNode.label);
                  if (!dec) {
                    return (
                      <div className="flex-grow flex flex-col justify-center items-center text-center p-4">
                        <CpuIcon className="text-neutral-700 mb-2 animate-pulse" size={24} />
                        <p className="text-neutral-450 font-mono text-xs">Node: {selectedNode.label}</p>
                        <p className="text-neutral-500 text-xs mt-1">No structured engineering decision logs recorded for this service component.</p>
                      </div>
                    );
                  }
                  return (
                    <div className="flex-grow flex flex-col justify-between space-y-4 text-xs text-neutral-300">
                      <div className="flex justify-between items-start border-b border-neutral-900 pb-2.5">
                        <div>
                          <span className="text-[10px] font-mono uppercase text-blue-500 tracking-wider font-bold">
                            NODE_INSPECTOR
                          </span>
                          <h4 className="text-sm font-bold text-white mt-0.5">{selectedNode.label}</h4>
                        </div>
                        <button
                          onClick={() => setSelectedNode(null)}
                          className="text-neutral-500 hover:text-white cursor-pointer"
                        >
                          <XIcon size={14} />
                        </button>
                      </div>
                      
                      <div className="space-y-3.5 flex-1 overflow-y-auto max-h-[300px] scrollbar-none pr-1">
                        <div>
                          <span className="text-neutral-450 font-mono text-[10px] uppercase block font-bold mb-0.5">Decision</span>
                          <p className="text-white font-semibold text-xs leading-relaxed">{dec.decision}</p>
                        </div>
                        <div>
                          <span className="text-neutral-450 font-mono text-[10px] uppercase block font-bold mb-0.5">Alternatives Evaluated</span>
                          <p className="text-neutral-350 leading-relaxed">{dec.alternative}</p>
                        </div>
                        <div>
                          <span className="text-neutral-450 font-mono text-[10px] uppercase block font-bold mb-0.5">Core Reason</span>
                          <p className="text-neutral-350 leading-relaxed">{dec.reason}</p>
                        </div>
                        <div>
                          <span className="text-neutral-450 font-mono text-[10px] uppercase block font-bold mb-0.5">Trade-off Considerations</span>
                          <p className="text-neutral-400 italic leading-relaxed">{dec.tradeoff}</p>
                        </div>
                      </div>
                    </div>
                  );
                })() : (
                  <div className="flex-grow flex flex-col justify-center items-center text-center p-4">
                    <CpuIcon className="text-neutral-700 mb-3 animate-pulse" size={28} />
                    <span className="text-neutral-400 font-mono text-xs uppercase tracking-wider block font-bold">Inspect Node</span>
                    <p className="text-neutral-500 text-xs mt-1.5 leading-relaxed">
                      Click any highlighted service node in the topology map to load its architecture decisions, alternatives, and trade-offs.
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
