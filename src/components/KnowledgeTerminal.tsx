"use client";

import React, { useState, useRef, useEffect } from "react";
import { interviewQuestions } from "@/data/portfolioData";
import { TerminalIcon, PlayIcon } from "./CustomIcons";

interface LogEntry {
  type: "command" | "response" | "system";
  text: string;
}

export default function KnowledgeTerminal() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<LogEntry[]>([
    { type: "system", text: "KRISHNA OS INTERACTIVE ENGINEERING Q&A [v2.0-OFFLINE]" },
    { type: "system", text: "Submit your system architecture or decision query below." }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  const presetQuestions = [
    "Tell me about SecureLens.",
    "Why choose Django for BreatheESG?",
    "What did you build for Vanco AI?",
    "How does VedaAI manage rate limits?",
    "How does Sentinel handle monitoring?"
  ];

  // Auto scroll to bottom of logs
  useEffect(() => {
    if (history.length > 2) {
      terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [history, isTyping]);

  const handleQuery = (query: string) => {
    if (!query.trim() || isTyping) return;

    // Log the user command
    setHistory((prev) => [...prev, { type: "command", text: query }]);
    setInput("");
    setIsTyping(true);

    // Find closest matching question in local seed database
    const cleanQuery = query.toLowerCase().replace(/[?,.]/g, "").trim();
    let bestMatch = interviewQuestions.find((q) => {
      const cleanQ = q.question.toLowerCase().replace(/[?,.]/g, "").trim();
      return cleanQ.includes(cleanQuery) || cleanQuery.includes(cleanQ) || 
             cleanQ.split(" ").some(word => word.length > 4 && cleanQuery.includes(word));
    });

    // Default fallback if no match found
    if (!bestMatch) {
      // Direct string matching checks
      if (cleanQuery.includes("securelens")) {
        bestMatch = interviewQuestions[0];
      } else if (cleanQuery.includes("django") || cleanQuery.includes("esg") || cleanQuery.includes("breatheesg")) {
        bestMatch = interviewQuestions[1];
      } else if (cleanQuery.includes("vanco") || cleanQuery.includes("forecasting") || cleanQuery.includes("yolo")) {
        bestMatch = interviewQuestions[2];
      } else if (cleanQuery.includes("veda") || cleanQuery.includes("assessment") || cleanQuery.includes("bullmq")) {
        bestMatch = interviewQuestions[3];
      } else if (cleanQuery.includes("sentinel") || cleanQuery.includes("monitoring")) {
        bestMatch = interviewQuestions[4];
      }
    }

    const answerText = bestMatch 
      ? bestMatch.answer 
      : "QUERY_ERROR: Context not found in local offline indices. Try selecting one of the pre-seeded channel chips below (e.g. 'Tell me about SecureLens').";

    // Simulate word-by-word streaming/typing effect
    let currentIdx = 0;
    const words = answerText.split(" ");
    let streamedText = "";
    
    // Add an empty response block to be populated
    setHistory((prev) => [...prev, { type: "response", text: "" }]);

    const interval = setInterval(() => {
      if (currentIdx < words.length) {
        streamedText += (currentIdx === 0 ? "" : " ") + words[currentIdx];
        setHistory((prev) => {
          const next = [...prev];
          next[next.length - 1] = { type: "response", text: streamedText };
          return next;
        });
        currentIdx++;
      } else {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 45); // Typing speed
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleQuery(input);
    }
  };

  return (
    <div className="w-full border border-neutral-900 rounded-xl bg-black overflow-hidden glow-blue">
      {/* Top Console Chrome */}
      <div className="bg-neutral-950 border-b border-neutral-900 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <TerminalIcon size={14} className="text-blue-500" />
          <span className="text-sm font-mono text-neutral-400">bash // krishna-os-rag.sh</span>
        </div>
        <div className="flex space-x-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-neutral-900 border border-neutral-800" />
          <span className="w-2.5 h-2.5 rounded-full bg-neutral-900 border border-neutral-800" />
          <span className="w-2.5 h-2.5 rounded-full bg-neutral-900 border border-neutral-800" />
        </div>
      </div>

      {/* Console Display Screen */}
      <div className="h-[280px] overflow-y-auto p-6 font-mono text-sm text-neutral-250 space-y-4.5 bg-[#020202]">
        {history.map((entry, idx) => {
          if (entry.type === "system") {
            return (
              <div key={idx} className="text-neutral-450 text-sm leading-relaxed">
                [SYSTEM] {entry.text}
              </div>
            );
          }
          if (entry.type === "command") {
            return (
              <div key={idx} className="text-white flex items-start space-x-2">
                <span className="text-blue-500 font-bold">krishna-os$</span>
                <span>{entry.text}</span>
              </div>
            );
          }
          return (
            <div key={idx} className="text-emerald-400 leading-relaxed pl-4 border-l border-emerald-950/60 bg-emerald-950/5 p-2 rounded">
              {entry.text}
            </div>
          );
        })}
        {isTyping && (
          <div className="text-emerald-400 flex items-center space-x-1.5 pl-4">
            <span className="inline-block w-1.5 h-3.5 bg-emerald-400 animate-pulse" />
            <span className="text-xs uppercase tracking-wider text-neutral-400 font-bold">indexing context...</span>
          </div>
        )}
        <div ref={terminalEndRef} />
      </div>

      {/* Input Prompt Section */}
      <div className="bg-neutral-950 border-t border-neutral-900 p-4 flex items-center space-x-3">
        <span className="text-blue-500 font-mono text-sm font-bold shrink-0">krishna-os$</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          disabled={isTyping}
          placeholder="Query the system (e.g. 'Tell me about SecureLens' or 'Why choose Django?')"
          className="grow bg-transparent border-0 outline-none text-sm text-white font-mono placeholder-neutral-650 focus:ring-0"
        />
        <button
          onClick={() => handleQuery(input)}
          disabled={isTyping || !input.trim()}
          className="p-1.5 rounded-md hover:bg-neutral-900 border border-transparent hover:border-neutral-800 text-blue-500 disabled:text-neutral-700 transition-all cursor-pointer"
        >
          <PlayIcon size={12} />
        </button>
      </div>

      {/* Suggestion Chips */}
      <div className="bg-bg-dark px-4 py-3.5 border-t border-neutral-900/60 flex flex-wrap gap-2">
        <span className="text-xs uppercase tracking-wider text-neutral-450 font-mono font-bold self-center mr-1">Preseeds:</span>
        {presetQuestions.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleQuery(q)}
            disabled={isTyping}
            className="px-2.5 py-1.5 rounded bg-[#0d0d0e] hover:bg-neutral-900 border border-neutral-900 hover:border-neutral-800 text-neutral-450 hover:text-white font-mono text-xs leading-none transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {q}
          </button>
        ))}
      </div>
    </div>
  );
}
