"use client";

import React, { useEffect, useRef } from "react";

export default function BlueprintGrid() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ns = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(ns, "svg");
    svg.setAttribute("viewBox", "0 0 1200 900");
    svg.setAttribute("preserveAspectRatio", "xMidYMid slice");
    svg.style.width = "100%";
    svg.style.height = "100%";
    svg.style.display = "block";

    containerRef.current.innerHTML = "";
    containerRef.current.appendChild(svg);

    const step = 60;

    // Draw vertical grid lines
    for (let x = 0; x <= 1200; x += step) {
      const l = document.createElementNS(ns, "line");
      l.setAttribute("x1", x.toString());
      l.setAttribute("y1", "0");
      l.setAttribute("x2", x.toString());
      l.setAttribute("y2", "900");
      l.setAttribute("stroke", "var(--line)");
      l.setAttribute("stroke-width", "1");
      svg.appendChild(l);
    }

    // Draw horizontal grid lines
    for (let y = 0; y <= 900; y += step) {
      const l = document.createElementNS(ns, "line");
      l.setAttribute("x1", "0");
      l.setAttribute("y1", y.toString());
      l.setAttribute("x2", "1200");
      l.setAttribute("y2", y.toString());
      l.setAttribute("stroke", "var(--line)");
      l.setAttribute("stroke-width", "1");
      svg.appendChild(l);
    }

    // Generate fixed random intersections (nodes)
    const nodes: SVGCircleElement[] = [];
    const fixedRandomSeeds = [
      [1, 2], [3, 4], [5, 2], [7, 8], [9, 3], [11, 6], [13, 1], [15, 7], [17, 4], [19, 9],
      [2, 11], [4, 13], [6, 10], [8, 12], [10, 14], [12, 8], [14, 5], [16, 11], [18, 13],
      [1, 14], [5, 12], [8, 3], [12, 2], [16, 5], [19, 12], [10, 6]
    ];

    fixedRandomSeeds.forEach(([gridX, gridY]) => {
      const gx = gridX * step;
      const gy = gridY * step;
      const c = document.createElementNS(ns, "circle");
      c.setAttribute("cx", gx.toString());
      c.setAttribute("cy", gy.toString());
      c.setAttribute("r", "2.5");
      c.setAttribute("class", "blueprint-node");
      svg.appendChild(c);
      nodes.push(c);
    });

    // Create sweeping scan line
    const scan = document.createElementNS(ns, "line");
    scan.setAttribute("x1", "0");
    scan.setAttribute("y1", "0");
    scan.setAttribute("x2", "1200");
    scan.setAttribute("y2", "0");
    scan.setAttribute("class", "blueprint-scan");
    svg.appendChild(scan);

    let start: number | null = null;
    const duration = 2400; // milliseconds
    let animationFrameId: number;

    const animateScan = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const currentY = progress * 900;

      scan.setAttribute("y1", currentY.toString());
      scan.setAttribute("y2", currentY.toString());
      scan.setAttribute("stroke", "var(--gold)");
      scan.setAttribute("opacity", progress < 1 ? "0.55" : "0");

      nodes.forEach((node) => {
        const nodeY = parseFloat(node.getAttribute("cy") || "0");
        if (nodeY < currentY) {
          node.classList.add("on");
        }
      });

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animateScan);
      }
    };

    animationFrameId = requestAnimationFrame(animateScan);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="blueprint absolute inset-0 z-0 pointer-events-none opacity-55"
      id="blueprint"
    />
  );
}
