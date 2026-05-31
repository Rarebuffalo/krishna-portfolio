"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function BootSequence({ onComplete }: { onComplete: () => void }) {
  const [lines, setLines] = useState<string[]>([]);
  const [skipped, setSkipped] = useState(false);

  const bootLogs = [
    "KRISHNA OS v2.0 STATUS: INITIALIZING",
    "CORE :: Loading CPU clusters [OK]",
    "SYSTEM :: Initializing active memory buffers [OK]",
    "ARCHITECTURES :: Mapping node connections [OK]",
    "LOGS :: Syncing compiled logs index [OK]",
    "KNOWLEDGE_BASE :: Loading offline terminal seed [OK]",
    "DEPLOYS :: Establishing socket channels [OK]",
    "KRISHNA OS :: ONLINE"
  ];

  useEffect(() => {
    if (skipped) return;

    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < bootLogs.length) {
        const nextLine = bootLogs[currentLine];
        setLines((prev) => [...prev, nextLine]);
        currentLine++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          onComplete();
        }, 300); // Small pause at "ONLINE"
      }
    }, 110); // Totals ~1.0 second

    return () => clearInterval(interval);
  }, [skipped]);

  const handleSkip = () => {
    setSkipped(true);
    onComplete();
  };

  return (
    <div className="fixed inset-0 bg-bg-dark z-50 flex flex-col justify-between p-8 md:p-16 font-mono text-sm tracking-tight select-none">
      {/* Top Bar */}
      <div className="flex justify-between items-center text-xs text-neutral-450 uppercase border-b border-neutral-900 pb-4">
        <div>Host: krishnasingh.dev</div>
        <div>OS Version: 2.0.0-release</div>
        <button 
          onClick={handleSkip}
          className="px-3.5 py-1.5 border border-neutral-800 hover:border-neutral-500 text-neutral-300 hover:text-white rounded bg-neutral-950 transition-all cursor-pointer text-xs"
        >
          Skip Boot [ESC]
        </button>
      </div>

      {/* Main Console Output */}
      <div className="flex-1 flex flex-col justify-end py-12 space-y-3 overflow-hidden max-w-4xl mx-auto w-full">
        <AnimatePresence>
          {lines.map((line, idx) => {
            const isHeader = line.includes("STATUS");
            const isOnline = line.includes("ONLINE");
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.15 }}
                className={`${
                  isHeader 
                    ? "text-blue-500 font-semibold text-lg mb-5" 
                    : isOnline 
                    ? "text-emerald-400 font-bold text-lg mt-5" 
                    : "text-neutral-350 text-sm"
                }`}
              >
                {isOnline ? " > " : "   "} {line}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center text-xs text-neutral-500 border-t border-neutral-900 pt-4">
        <div>MEM_ALLOC: OK (OOM_LIMIT: 50MB)</div>
        <div>(c) 2026 Krishna Singh. All rights reserved.</div>
      </div>
    </div>
  );
}
