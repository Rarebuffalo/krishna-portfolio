# KRISHNA OS v2.0 - System Architecture Documentation

This document serves as the technical blueprint and architecture documentation for **KRISHNA OS**, a live engineering command center portfolio built for global remote startups, YC founders, and backend engineering managers.

---

## 1. Core Philosophy & Design Strategy

Unlike standard portfolios that showcase static screenshots and generic skill lists, **KRISHNA OS** is built to tell a specific story: **"I build production systems, not just projects."**

### Key Design Pillars
- **Command Center Aesthetic**: Dark mode base (`#050505`) with neutral borders (`#1A1A1C`), neon status lights, and electric blue/purple accent coordinates.
- **Skim-Friendly Recruiter Mode**: A global state machine that instantly strips animations and restructures the UI into a high-level tabular interface detailing **Problem → Solution → Impact** to cater to the 20-second recruiter review span.
- **Architecture-First Storytelling**: Surfacing technical decisions, trade-offs, and failure recovery stories (Lessons Learned) directly to the user.

---

## 2. Codebase Structure & File Mapping

The application is structured using **Next.js 15 (App Router)** and **TypeScript**:

```txt
krishna-portfolio/
├── package.json                   # Dependencies & Build Scripts
├── tsconfig.json                  # TypeScript Compiler Config
├── postcss.config.mjs             # Tailwind CSS PostCSS configurations
├── README.md                      # Entry point for reviewers
├── documentation/
│   ├── architecture.md            # [This File] Detailed code blueprint
│   └── setup.md                   # Installation & OOM mitigation guide
├── src/
│   ├── context/
│   │   └── RecruiterModeContext.tsx  # Global Recruiter Mode state machine
│   ├── data/
│   │   └── portfolioData.ts       # Unified data indices (Systems, Logs, Q&As)
│   ├── components/
│   │   ├── CustomIcons.tsx        # High-performance custom SVG icons
│   │   ├── BootSequence.tsx       # 1.0s Boot console with bypass channel
│   │   ├── SystemMap.tsx          # Categorized domain tier hierarchy
│   │   ├── SystemsGrid.tsx        # Standard Cards & Recruiter Table layouts
│   │   ├── ArchitectureMuseum.tsx # Dynamic SVG bezier connector canvas
│   │   ├── CuratedFeed.tsx        # Current Mission telemetry & system logs
│   │   ├── Experience.tsx         # Deployment timeline (OpenStreamLabs)
│   │   └── KnowledgeTerminal.tsx  # Client-side typewriter RAG prompt simulator
│   └── app/
│       ├── layout.tsx             # Global metadata and Providers shell
│       ├── globals.css            # Tailwind v4 theme configurations
│       ├── page.tsx               # Main Dashboard workspace landing route
│       └── systems/
│           └── [id]/
│               └── page.tsx       # Dynamic Case Study detail subroutes
```

---

## 3. Detailed Component Architecture

### 3.1 Boot Sequence (`BootSequence.tsx`)
- **Execution bounds**: Bounded to a maximum of 1.2 seconds using a `110ms` console line loading intervals.
- **UX Bypass**: Features an absolute top-right `[Skip Boot]` trigger mapped to state variables, ensuring recurring visitors can enter the dashboard immediately.
- **Animations**: Handles exit sweeps smoothly using Framer Motion's `<AnimatePresence>`.

### 3.2 Recruiter Mode State Provider (`RecruiterModeContext.tsx`)
- Uses React Context API to broadcast the `recruiterMode` boolean state to all downstream elements.
- Features **LocalStorage Persistence**, ensuring that once a recruiter enables the mode, it persists across landing page visits and dynamic case study subpages.

### 3.3 System Map Domain Categorizer (`SystemMap.tsx`)
Categorizes the portfolio systems into distinct engineering focus areas:
1. **AI Infrastructure**: SecureLens, OpenLLM Gateway, Vanco AI Suite
2. **Distributed Backends**: Sentinel, BreatheESG Ingestion
3. **Intelligent Workflows**: VedaAI Assessment Creator, ScaleShorts, DriveSeek

### 3.4 Custom SVG Architecture Canvas (`ArchitectureMuseum.tsx`)
To avoid heavy React Flow (`@xyflow/react`) compilation overhead and dependency issues, we implemented a custom interactive canvas:
- **Connecting Edges**: Standard SVG bezier curves are calculated dynamically using node coordinates:
  $$\text{Path} = M(x_1, y_1) \ C(x_1 + dx, y_1, \ x_2 - dx, y_2, \ x_2, y_2)$$
- **Telemetry Stream Animation**: Enabled by utilizing CSS stroke-dashoffset transitions (`stroke-dasharray: 4, 6` with linear keyframe animations) to simulate live message queuing between system boundaries.
- **Decision Popups**: Clicking on components loads corresponding trade-offs (alternative solutions, selection reasonings, and drawback details) directly inside a Framer Motion-animated details panel.

### 3.5 Dynamic Case Studies (`/systems/[id]/page.tsx`)
- Uses Next.js dynamic routing.
- Resolves parameters asynchronously to match the Next.js 15 specification: `const { id } = await params`.
- Dynamically generates static builds during the Next compilation phase (`generateStaticParams()`) to achieve zero-latency page loads.

### 3.6 Offline-Safe RAG Terminal (`KnowledgeTerminal.tsx`)
- Simulates an AI RAG pipeline without registry connectivity or API key requirements.
- Uses local query indexes matching common recruiter inquiries (e.g. "What did you do at OpenStreamLabs?", "Why Redis?").
- Streams answer strings character-by-character using typewriter intervals (`45ms` per word) to mimic live model token streams.

---

## 4. Systems Blueprint Index

| System Name | Classification | Core Architecture Pattern | Failure Story / Recovery |
| :--- | :--- | :--- | :--- |
| **SecureLens** | AI Security Agent | FastAPI concurrent scan queue utilizing `asyncio.gather` and semaphore-throttled Gemini audits. | Originally made synchronous blocking LLM requests inside the request thread. Large scans caused 504 Gateway Timeouts and crashed FastAPI. Fixed by refactoring the orchestrator to perform async file fetches and concurrent API calls. |
| **Sentinel** | Uptime & API Monitoring | FastAPI backend + Celery task scheduling + Redis broker with Node.js notification alerts. | Originally built database schema without proper user boundaries. Leakage of endpoint alerts and database locks occurred under traffic. Secured database sessions using JWT middleware locks in SQLAlchemy. |
| **BreatheESG Ingestion** | ESG Normalization & Audit Pipeline | Django 5.2 backend, Scope 1/2/3 calculations, model save locks, double-entry ledger. | Attempted PDF OCR parsing on utility bills. Character reading failures resulted in math errors. Pivoted to parsing structured CSV exports for 100% precision. |
| **VedaAI Assessment Creator** | AI Generation Workflow Platform | Next.js 16 + Zustand, Express backend, MongoDB, Redis + BullMQ exponential backoff queues. | Deployed to unified serverless Vercel. socket.io failed, BullMQ workers crashed, and Puppeteer timed out. Decoupled UI to Vercel and hosted API/Workers on Railway. |
| **Vanco AI Suite** | AI & Machine Learning Assessment | LightGBM grocery sales forecaster, YOLOv8 ASL detector, Physics RAG (FAISS + BM25 + NetworkX). | Random train-test splitting in time-series forecasting. Time leakage caused validation models to overfit. Replaced with a chronological validation splitter. |
| **ScaleShorts** | AI Reel Generation Pipeline | Python script orchestration (Gemini 1.5, Edge-TTS, Pexels API, moviepy editor, SQLite logs). | Sequentially downloaded stock video clips in the main thread. API latency and rate limits stalled execution. Refactored to utilize aiohttp for parallel async asset fetches. |
| **DriveSeek** | Conversational Drive Search Agent | LangGraph React agent translating queries to Google Drive search API parameter criteria. | Used exact name matches on Drive API queries. Spelling or case mismatches returned zero results. Updated system prompt to output container parameters ('name contains'). |
| **OpenLLM Gateway** | High-Throughput LLM Proxy | Bun/ElysiaJS monorepo, Prisma ORM, PostgreSQL cost routing and client key management. | Plaintext API keys stored in database. Exposed platform to leakage if compromised. Implemented AES-256-GCM encryption at the service layer. |

---

## 5. Performance, Memory, and Offline Mitigations

To run efficiently on constrained memory hosts (OOM avoidance) and support isolated offline sandboxes, several custom engineering decisions were made:

### 5.1 OOM (Out-of-Memory) Mitigations
- **Low-Memory Build Configuration**: Configured the build runner script using a memory allocation ceiling:
  `NODE_OPTIONS="--max-old-space-size=512" npm run build`
  This restrains Node processes, preventing the Linux kernel from invoking the OOM killer.
- **Custom React Icons**: Replaced heavy imports (`lucide-react`) with lightweight static inline SVG components.
- **Custom Canvas Layouts**: Replaced third-party canvas visualizers with native Tailwind CSS grids and light SVG overlays, saving ~40MB of frontend JS memory space.

### 5.2 Network Isolation & Offline Setup
- **System Font Stack**: Standardized on local system font chains (Inter, sans-serif, monospace) inside `layout.tsx` and `globals.css`. This bypassed Google Font fetches (`fonts.googleapis.com`), preventing offline build timeouts (`EAI_AGAIN`).
- **Offline Cache Restoration**: Configured npm configuration variables to force package installations directly from local cache directories:
  `NPM_CONFIG_OFFLINE=true npm install`
  This verified and linked all 330 dependencies in 12 seconds without requiring network routes.
