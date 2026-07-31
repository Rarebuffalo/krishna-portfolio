"use client";

import React, { useEffect, useState, useRef } from "react";

export default function CursorCat() {
  const [mounted, setMounted] = useState(false);
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [state, setState] = useState<"idle" | "chasing" | "sleeping">("idle");
  const [dir, setDir] = useState<"left" | "right">("right");
  const [showSpeech, setShowSpeech] = useState(false);
  const [speechText, setSpeechText] = useState("hello");

  const mousePos = useRef({ x: 0, y: 0 });
  const catPos = useRef({ x: 100, y: 100 });
  const idleTimer = useRef<NodeJS.Timeout | null>(null);
  const speechTimer = useRef<NodeJS.Timeout | null>(null);
  const requestRef = useRef<number | null>(null);
  const isMobile = useRef(false);

  useEffect(() => {
    setMounted(true);
    isMobile.current = window.innerWidth < 768;

    const handleResize = () => {
      isMobile.current = window.innerWidth < 768;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isMobile.current) return;
      mousePos.current = { x: e.clientX, y: e.clientY };

      // Wake up / stop sleeping on mouse movement
      setState((prev) => {
        if (prev === "sleeping") {
          return "chasing";
        }
        return prev;
      });

      // Clear sleeping timer and set a new one
      if (idleTimer.current) clearTimeout(idleTimer.current);
      idleTimer.current = setTimeout(() => {
        setState("sleeping");
      }, 5000);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    // Initial position
    catPos.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    const updatePhysics = () => {
      if (isMobile.current) {
        requestRef.current = requestAnimationFrame(updatePhysics);
        return;
      }

      const dx = mousePos.current.x - catPos.current.x;
      const dy = mousePos.current.y - catPos.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist > 24) {
        // Cat is chasing cursor
        catPos.current.x += dx * 0.06;
        catPos.current.y += dy * 0.06;

        setPosition({ x: catPos.current.x, y: catPos.current.y });
        setState("chasing");
        setDir(dx < 0 ? "left" : "right");
        setShowSpeech(false);
      } else {
        // Cat reached cursor
        setState((prev) => {
          if (prev === "chasing") {
            // Just stopped, greet the user
            setShowSpeech(true);
            setSpeechText(Math.random() > 0.5 ? "hello" : "meow!");
            if (speechTimer.current) clearTimeout(speechTimer.current);
            speechTimer.current = setTimeout(() => {
              setShowSpeech(false);
            }, 2000);
            return "idle";
          }
          return prev;
        });
      }

      requestRef.current = requestAnimationFrame(updatePhysics);
    };

    requestRef.current = requestAnimationFrame(updatePhysics);

    // Initial idle state check trigger
    idleTimer.current = setTimeout(() => {
      setState("sleeping");
    }, 5000);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (idleTimer.current) clearTimeout(idleTimer.current);
      if (speechTimer.current) clearTimeout(speechTimer.current);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      style={{
        position: "fixed",
        left: position.x - 16,
        top: position.y - 16,
        zIndex: 9999,
        pointerEvents: "none",
        transition: "transform 0.1s linear",
        transform: `scaleX(${dir === "left" ? -1 : 1})`,
        display: position.x === -100 ? "none" : "block",
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes cat-tail-wiggle {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(15deg); }
        }
        @keyframes cat-leg-run-1 {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-2px); }
        }
        @keyframes cat-leg-run-2 {
          0%, 100% { transform: translateY(-2px); }
          50% { transform: translateY(0); }
        }
        @keyframes z-sleep {
          0% { opacity: 0; transform: translate(12px, -8px) scale(0.6); }
          50% { opacity: 0.8; }
          100% { opacity: 0; transform: translate(18px, -18px) scale(1.1); }
        }
        .animate-cat-tail {
          animation: cat-tail-wiggle 0.4s ease-in-out infinite;
          transform-origin: 22px 25px;
        }
        .animate-leg-1 {
          animation: cat-leg-run-1 0.2s linear infinite;
        }
        .animate-leg-2 {
          animation: cat-leg-run-2 0.2s linear infinite;
        }
        .sleep-indicator {
          animation: z-sleep 1.6s ease-in-out infinite;
          font-family: var(--font-mono);
          font-size: 8px;
          color: var(--gold);
          position: absolute;
          font-weight: bold;
        }
      ` }} />

      {/* Speech bubble */}
      {showSpeech && (
        <div
          style={{
            position: "absolute",
            top: -24,
            left: dir === "left" ? 18 : -10,
            transform: `scaleX(${dir === "left" ? -1 : 1})`,
            backgroundColor: "#101215",
            border: "1px solid var(--line-strong)",
            borderRadius: "4px",
            padding: "2px 6px",
            fontSize: "9px",
            fontFamily: "var(--font-mono)",
            color: "var(--soft-white)",
            whiteSpace: "nowrap",
          }}
        >
          {speechText}
        </div>
      )}

      {/* Floating sleep telemetry z's */}
      {state === "sleeping" && (
        <>
          <div className="sleep-indicator" style={{ animationDelay: "0s" }}>z</div>
          <div className="sleep-indicator" style={{ animationDelay: "0.8s" }}>z</div>
        </>
      )}

      {/* Render Cat depending on states */}
      {state === "idle" && (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          {/* Sitting Cat Base */}
          {/* Ears */}
          <path d="M6 12 L10 4 L14 10 Z" fill="#f2f1ec" stroke="#101215" strokeWidth="1.5" />
          <path d="M18 10 L22 4 L26 12 Z" fill="#f2f1ec" stroke="#101215" strokeWidth="1.5" />
          {/* Tail */}
          <path d="M22 25 C 25 25, 27 21, 26 17" stroke="#f2f1ec" strokeWidth="2.5" strokeLinecap="round" className="animate-cat-tail" />
          {/* Body */}
          <path d="M9 20 Q12 18 15 20 Q18 18 21 20 L23 28 L7 28 Z" fill="#f2f1ec" stroke="#101215" strokeWidth="1.5" />
          {/* Head */}
          <rect x="8" y="9" width="16" height="12" rx="4" fill="#f2f1ec" stroke="#101215" strokeWidth="1.5" />
          {/* Eyes */}
          <circle cx="12" cy="14" r="1.5" fill="#101215" />
          <circle cx="20" cy="14" r="1.5" fill="#101215" />
          {/* Nose */}
          <path d="M15 16.5 L17 16.5 L16 17.5 Z" fill="#d4a657" />
          {/* Paws */}
          <rect x="10" y="27" width="4" height="2" rx="1" fill="#d4a657" />
          <rect x="18" y="27" width="4" height="2" rx="1" fill="#d4a657" />
        </svg>
      )}

      {state === "chasing" && (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          {/* Running Cat Base */}
          {/* Legs */}
          <line x1="8" y1="22" x2="6" y2="28" stroke="#f2f1ec" strokeWidth="3" strokeLinecap="round" className="animate-leg-1" />
          <line x1="12" y1="22" x2="14" y2="28" stroke="#f2f1ec" strokeWidth="3" strokeLinecap="round" className="animate-leg-2" />
          <line x1="18" y1="22" x2="16" y2="28" stroke="#f2f1ec" strokeWidth="3" strokeLinecap="round" className="animate-leg-1" />
          <line x1="22" y1="22" x2="24" y2="28" stroke="#f2f1ec" strokeWidth="3" strokeLinecap="round" className="animate-leg-2" />
          {/* Tail */}
          <path d="M6 15 C 2 15, 1 10, 2 8" stroke="#f2f1ec" strokeWidth="2.5" strokeLinecap="round" className="animate-cat-tail" />
          {/* Body */}
          <rect x="7" y="11" width="17" height="11" rx="3.5" fill="#f2f1ec" stroke="#101215" strokeWidth="1.5" />
          {/* Head */}
          <rect x="17" y="6" width="11" height="11" rx="3.5" fill="#f2f1ec" stroke="#101215" strokeWidth="1.5" />
          {/* Ears */}
          <path d="M19 6 L20 2 L22 5 Z" fill="#f2f1ec" stroke="#101215" strokeWidth="1" />
          {/* Eye */}
          <circle cx="24" cy="11" r="1.2" fill="#101215" />
        </svg>
      )}

      {state === "sleeping" && (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          {/* Curled up Sleeping Cat Base */}
          {/* Body */}
          <circle cx="16" cy="19" r="9" fill="#f2f1ec" stroke="#101215" strokeWidth="1.5" />
          {/* Head */}
          <circle cx="12" cy="19" r="6.2" fill="#f2f1ec" stroke="#101215" strokeWidth="1.5" />
          {/* Ears */}
          <path d="M8 14 L10 11 L12 14 Z" fill="#f2f1ec" stroke="#101215" strokeWidth="1" />
          {/* Sleeping Eyes (curves) */}
          <path d="M10 20 Q11 21 12 20" stroke="#101215" strokeWidth="1" strokeLinecap="round" fill="none" />
          <path d="M13 20 Q14 21 15 20" stroke="#101215" strokeWidth="1" strokeLinecap="round" fill="none" />
          {/* Tail Wrapped */}
          <path d="M22 22 C 21 25, 17 26, 15 25" stroke="#f2f1ec" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        </svg>
      )}
    </div>
  );
}
