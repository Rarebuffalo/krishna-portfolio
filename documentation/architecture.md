# KRISHNA — System Architecture Documentation

This document serves as the technical blueprint and architecture documentation for the portfolio repository.

---

## 1. Core Philosophy & Design Strategy

Unlike standard portfolios that showcase static screenshots and generic skill lists, this application is built to tell a specific story: **"I build production-grade, compliance-ready systems."**

### Key Design Pillars
*   **Premium Editorial Aesthetic**: Deep obsidian base (`#0a0b0d`) with neutral borders, subtle gold status lights (`#d4a657`), and high-contrast typography.
*   **Aesthetic Typography**: Pairing `Space Grotesk` (display titles) with `IBM Plex Sans` (stable body) and `IBM Plex Mono` (technical metrics).
*   **Architecture-First Storytelling**: Surfacing technical decisions, trade-offs, and failure recovery stories (Lessons Learned) directly to the user.

---

## 2. Codebase Structure & File Mapping

The application is structured using **Next.js 15 (App Router)** and **TypeScript**:

```txt
krishna-portfolio/
├── package.json                   # Dependencies & Build Scripts
├── tsconfig.json                  # TypeScript Compiler Config
├── README.md                      # Entry point for reviewers
├── documentation/
│   ├── architecture.md            # [This File] Detailed code blueprint
│   └── setup.md                   # Installation guide
├── src/
│   ├── data/
│   │   └── portfolioData.ts       # Central data models (Systems, logs)
│   ├── components/
│   │   ├── BlueprintGrid.tsx      # SVG blueprint grid scan line animation
│   │   ├── Header.tsx             # Sticky header layout with slide-underline
│   │   ├── FeaturedProjects.tsx   # Featured work with inline SVG mockups
│   │   └── TechMatrix.tsx         # Minimalist grid skills competency lists
│   └── app/
│       ├── layout.tsx             # Global metadata shell
│       ├── globals.css            # Tailwind v4 custom design system tokens
│       ├── page.tsx               # Narrative homepage route flow
│       └── systems/
│           └── [id]/
│               └── page.tsx       # Dynamic Case Study detail template page
```

---

## 3. Detailed Component Architecture

### 3.1 Blueprint Grid (`BlueprintGrid.tsx`)
*   **Blueprint Grid:** Designed the component rendering a structural SVG grid layout.
*   **Sweep Animation:** Employs a high-performance `requestAnimationFrame` scan-line sweep that runs once upon mounting, transitioning grid intersections to an active glow state.

### 3.2 Sticky Header (`Header.tsx`)
*   Renders a sticky top navigation bar with a gold-dot live logo and links dynamically animated with CSS slide underlines.

### 3.3 Featured Projects (`FeaturedProjects.tsx`)
*   Displays the first 3 systems from your database (SecureLens, Sentinel, EquityForge) in alternating grid cards.
*   Includes custom inline SVG visualizations mapping out their infrastructure topologies:
    *   **SecureLens:** Scanning terminal log visualizer.
    *   **Sentinel:** Celery monitoring worker + Redis task queue visualizer.
    *   **EquityForge:** Document ingestion upload to 4-page PDF layout compiler.

### 3.4 Dynamic Case Studies (`/systems/[id]/page.tsx`)
*   Uses Next.js dynamic routing to load parameters.
*   Renders key outcomes, problem statements, design decisions, and failure recovery details.
*   Includes a static, highly readable SVG node connector chart scaling dynamically across desktop and mobile.

---

## 4. Systems Blueprint Index

| System Name | Classification | Core Architecture Pattern | Failure Story / Recovery |
| :--- | :--- | :--- | :--- |
| **SecureLens AI** | Security Infrastructure | FastAPI concurrent scan queue utilizing `asyncio.gather` and semaphore-throttled Gemini audits. | Originally made synchronous blocking LLM requests inside the request thread. Large scans caused 504 Gateway Timeouts and crashed FastAPI. Fixed by refactoring the orchestrator to perform async file fetches and concurrent API calls. |
| **Sentinel System** | System Monitoring | FastAPI backend + Celery task scheduling + Redis broker with Node.js notification alerts. | Originally built database schema without proper user boundaries. Leakage of endpoint alerts and database locks occurred under traffic. Secured database sessions using JWT middleware locks in SQLAlchemy. |
| **EquityForge** | Research Platform | FastAPI backend parsing PDF/TXT/CSV files, running structured GPT-4o/Gemini extractions, and rendering programmatic Matplotlib charts inside HTML templates compiled via WeasyPrint. | Originally attempted client-side PDF rendering using vanilla canvas-to-pdf libraries. Severe layout clipping, font inconsistencies, and pagination breaks. Migrated to a server-side WeasyPrint converter. |
| **FlientSec** | Compliance Monitoring | Django + PostgreSQL + RabbitMQ audit logging engine and anomalies webhook notifications. | Originally wrote compliance audit checks directly within the web request thread, leading to slow page loads. Decoupled audit execution into background consumer tasks managed asynchronously by RabbitMQ. |
| **TxnForge** | Secure Authorization | Go gRPC microservice managing session validations cached in Redis. | Attempted to verify tokens using relational SQL queries per request, overloading the database. Refactored verify layer to read session cache instantly. |
| **ScaleShorts** | AI Reel Generation | Python multi-agent compiler (Gemini, edge-TTS, Pexels API, moviepy). | Sequentially downloaded vertical stock video clips in the main thread. API latency and rate limits stalled execution. Refactored to utilize aiohttp for parallel async asset fetches. |
| **BreatheESG Ingestion** | ESG Normalization | Django Scope 1/2/3 emissions calculator, model locks, and double-entry ledgers. | Attempted PDF OCR parsing on utility bills. Character reading failures resulted in math errors. Pivoted to parsing structured CSV exports for 100% precision. |
| **VedaAI Assessment Creator** | AI Generation Workflow | Next.js + Express + MongoDB + Redis/BullMQ question generator. | Deployed to unified serverless Vercel. socket.io failed, BullMQ workers crashed, and Puppeteer timed out. Decoupled UI to Vercel and hosted API/Workers on Railway. |

---

## 5. Performance and Offline Mitigations

To run efficiently on constrained memory hosts (OOM avoidance) and support isolated offline environments:

### 5.1 OOM (Out-of-Memory) Mitigations
*   **Low-Memory Build Configuration**: Configured the build runner script using a memory allocation ceiling:
    `NODE_OPTIONS="--max-old-space-size=512" npm run build`
*   **Custom Canvas Layouts**: Replaced third-party canvas visualizers with native Tailwind CSS grids and light SVG overlays, saving ~40MB of frontend JS memory space.

### 5.2 Network Isolation & Offline Setup
*   **System Font Stack**: Standardized on local system font chains (Inter, sans-serif, monospace). This bypassed Google Font fetches (`fonts.googleapis.com`), preventing offline build timeouts (`EAI_AGAIN`).
