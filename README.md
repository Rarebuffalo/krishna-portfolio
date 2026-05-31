# KRISHNA OS v2.0
> **The Operating System Dashboard of an AI Systems Engineer**

Welcome to **KRISHNA OS**, a live engineering command center portfolio built to demonstrate deep-dive backend pipelines, AI agent automation platforms, and distributed systems architecture. 

It is designed to make visitors (CTOs, startup founders, recruiters) feel like they have entered an active operations deck, rather than reading a static resume.

---

## Key Features

### 1. Simulated Boot Sequence
- Fast startup checks (under 1.2 seconds) simulating core checks (CPU allocations, telemetry buffers, RAG seed checks).
- Includes an immediate bypass channel (`[Skip Boot]`) for recurring visitors.

### 2. Recruiter Mode Toggle
- A global layout switch that transforms the complex, detail-heavy dashboard into a concise, skim-friendly tabular layout.
- Restructures cards into highly focused **Problem → Solution → Impact** tables to facilitate 20-second reviews.

### 3. Interactive Topology Museum
- Custom-built interactive canvas drawing systems topology links using animated SVG bezier curves.
- Moving dashes simulate live message queuing down the connection lines.
- Clicking components opens dedicated detail sheets explaining **Core Decisions**, **Alternatives Evaluated**, and **Trade-offs**.

### 4. Offline RAG CLI Terminal (Interview Krishna)
- A client-side typewriter CLI terminal simulating real-time LLM query streams.
- Allows immediate RAG evaluation on preset inquiry channels (e.g., *"Why Redis over RabbitMQ?"*, *"What did you do at OpenStreamLabs?"*) with zero latency or external API key setups.

### 5. Telemetry Logs & Mission Pipelines
- Hand-curated logs displaying exact metric progressions (e.g. latency reduced: *420ms → 110ms*) and optimization techniques.
- Experience at OpenStreamLabs represented as an active, completed build release pipeline.

---

## Offline & Low-Memory Optimization

This repository is optimized for isolated, resources-constrained environments:
- **OOM Prevention**: The frontend replaces heavy canvas frameworks (`reactflow`) and icon packages (`lucide-react`) with lightweight, hand-written SVG implementations, saving ~40MB of memory and preventing Out-Of-Memory compilation crashes.
- **Network Isolation**: By decoupling typography dependencies from external Google Font fetches (`fonts.googleapis.com`), build-time DNS timeout exceptions (`EAI_AGAIN`) are completely avoided.
- **Memory-Capped Builds**: Build scripts are optimized to compile cleanly under 512MB RAM caps:
  `NODE_OPTIONS="--max-old-space-size=512" npm run build`

---

## Codebase Topology

- **[documentation/architecture.md](file:///home/Krishna-Singh/krishna-portfolio/documentation/architecture.md)**: In-depth file maps, component designs, and systems blueprints.
- **[documentation/setup.md](file:///home/Krishna-Singh/krishna-portfolio/documentation/setup.md)**: Command reference for development, package restores, and compilations.
- **`src/app/page.tsx`**: Main landing command workspace.
- **`src/app/systems/[id]/page.tsx`**: Dynamic case study routing templates detailing failure stories and design metrics.
- **`src/data/portfolioData.ts`**: Central data model database.
- **`src/components/`**: Custom SVG visualizer, CLI prompt terminals, and header toggles.

---

## Quick Start

For detailed commands, please check the **[Setup Guide](file:///home/Krishna-Singh/krishna-portfolio/documentation/setup.md)**.

### Run Development Server
```bash
npm run dev
```

### Build Production Assets
```bash
NODE_OPTIONS="--max-old-space-size=512" npm run build
```
