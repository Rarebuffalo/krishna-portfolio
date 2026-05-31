export interface SystemNode {
  id: string;
  label: string;
  type: "frontend" | "gateway" | "queue" | "worker" | "database" | "ai" | "monitoring";
  x: number;
  y: number;
}

export interface SystemEdge {
  from: string;
  to: string;
  label?: string;
  animated?: boolean;
}

export interface SystemDecision {
  decision: string;
  alternative: string;
  reason: string;
  tradeoff: string;
}

export interface PortfolioSystem {
  id: string;
  name: string;
  status: "ONLINE" | "MONITORING" | "DEPLOYED" | "ACTIVE" | "RESEARCH";
  type: string;
  color: "red" | "orange" | "green" | "purple" | "blue";
  tagline: string;
  problem: string;
  solution: string;
  impact: string[];
  stack: string[];
  github: string;
  demo: string;
  decisions: SystemDecision[];
  failureStory: {
    attempt: string;
    symptom: string;
    fix: string;
  };
  nodes: SystemNode[];
  edges: SystemEdge[];
}

export const portfolioSystems: PortfolioSystem[] = [
  {
    id: "securelens",
    name: "SecureLens System",
    status: "ONLINE",
    type: "AI Security Agent",
    color: "red",
    tagline: "GitHub-integrated AppSec scanner and URL vulnerability prober powered by Gemini.",
    problem: "Sequential scanning of large source code repositories takes up to 12 minutes, causing CI/CD timeouts and friction in development workflows.",
    solution: "Created a parallelized file-triage and scanning pipeline in FastAPI. It fetches repository files, uses a Gemini triage pass to scope risk, and analyses high-risk files concurrently using asyncio.gather (semaphore-throttled at 5) and Pydantic validation schemas.",
    impact: [
      "Reduced scan latency from 12 minutes to under 45 seconds.",
      "30+ security checks across 5 transport and exposure layers.",
      "Contextual multi-turn AI chat to request vulnerability patches."
    ],
    stack: ["Python", "FastAPI", "Gemini 2.0 Flash", "Pydantic v2", "SQLAlchemy", "PostgreSQL"],
    github: "https://github.com/Rarebuffalo/securelens-backend",
    demo: "https://www.loom.com/share/eb484ed3765443fb963f8f5634c4f7a2",
    decisions: [
      {
        decision: "asyncio.gather() Semaphore throttling",
        alternative: "Celery/Redis worker queues",
        reason: "Avoids memory and operational overhead of broker infrastructure in a lightweight backend. Runs lightweight, concurrent async HTTP calls efficiently inside FastAPI.",
        tradeoff: "In-memory request execution limits scalability for massive concurrent users, resolved by mapping queue backends if user concurrency spikes."
      },
      {
        decision: "Gemini 2.0 Flash JSON Mode",
        alternative: "Regex parsing of standard text LLM outputs",
        reason: "Guarantees output conforms exactly to Pydantic validation structures, preventing parsing crashes.",
        tradeoff: "Free tier rate limits (15 RPM) required implementing fallback delay backoffs."
      }
    ],
    failureStory: {
      attempt: "Originally attempted synchronous scanning by making consecutive blocking LLM requests within the request thread.",
      symptom: "Caused 504 Gateway Timeouts and crashed the FastAPI gateway process when scanning repos with more than 50 files.",
      fix: "Refactored the orchestrator to perform asynchronous file fetching and concurrent LLM requests via asyncio, throttled by a Semaphore of 5."
    },
    nodes: [
      { id: "sl-client", label: "React Frontend", type: "frontend", x: 10, y: 50 },
      { id: "sl-gateway", label: "FastAPI Gateway", type: "gateway", x: 180, y: 50 },
      { id: "sl-gather", label: "Async Tasks & Semaphore", type: "worker", x: 350, y: 50 },
      { id: "sl-ai", label: "Gemini 2.0 Flash API", type: "ai", x: 530, y: 10 },
      { id: "sl-db", label: "PostgreSQL Store", type: "database", x: 530, y: 90 },
      { id: "sl-github", label: "GitHub API", type: "gateway", x: 700, y: 50 }
    ],
    edges: [
      { from: "sl-client", to: "sl-gateway", label: "HTTPS POST", animated: true },
      { from: "sl-gateway", to: "sl-gather", label: "asyncio.gather", animated: true },
      { from: "sl-gather", to: "sl-github", label: "Fetch files", animated: true },
      { from: "sl-gather", to: "sl-ai", label: "Scan Code", animated: true },
      { from: "sl-gather", to: "sl-db", label: "Persist Report", animated: false },
      { from: "sl-gateway", to: "sl-db", label: "Query Results", animated: false }
    ]
  },
  {
    id: "sentinel",
    name: "Sentinel System",
    status: "MONITORING",
    type: "Uptime & API Monitoring",
    color: "orange",
    tagline: "Startup-ready multi-tenant API monitor with automated Celery checks and Slack/Discord alerting.",
    problem: "API downtime or slow responses lead to user churn. Startups need immediate alerts without the high licensing cost of enterprise APM tools.",
    solution: "Designed an async FastAPI backend with Celery workers scheduling polling intervals via Redis message brokers. Node.js notification microservices listen for Celery state shifts to push Slack, Discord, and Email alerts.",
    impact: [
      "Real-time endpoint down alerts dispatched within 150ms.",
      "Multi-tenant user profiles secured via JWT authentication.",
      "Implicit setInterval frontend polling for zero UI layout shift."
    ],
    stack: ["Python", "FastAPI", "Celery", "Redis", "Node.js", "React 18", "PostgreSQL"],
    github: "https://github.com/Rarebuffalo/Sentinel",
    demo: "https://github.com/Rarebuffalo/Sentinel",
    decisions: [
      {
        decision: "Celery Task Queue + Redis Broker",
        alternative: "Asyncio task loops inside FastAPI",
        reason: "Guarantees scheduling accuracy and isolates long-running HTTP polling requests outside the main API web thread pool, preventing server blockages.",
        tradeoff: "Adds operational dependency on Redis and Celery processes, managed via container orchestrations."
      },
      {
        decision: "Node.js Notification services",
        alternative: "Sync Python requests in Celery workers",
        reason: "Improves notification dispatch speed and keeps Celery tasks focused strictly on ping execution without I/O blockage on external webhooks.",
        tradeoff: "Requires managing multiple language runtimes (Python + Node.js) in the service cluster."
      }
    ],
    failureStory: {
      attempt: "Originally built the database schema without proper user boundaries and isolated connections.",
      symptom: "Database locks and leakage of endpoint alerts occurred between test tenant accounts under heavy simulated traffic.",
      fix: "Secured database queries by implementing strict JWT middleware locks using SQLAlchemy dependencies binding operations directly to authenticated session contexts."
    },
    nodes: [
      { id: "se-dashboard", label: "React Frontend", type: "frontend", x: 10, y: 50 },
      { id: "se-gateway", label: "FastAPI API Server", type: "gateway", x: 180, y: 50 },
      { id: "se-redis", label: "Redis Broker", type: "queue", x: 350, y: 50 },
      { id: "se-celery", label: "Celery Worker", type: "worker", x: 520, y: 50 },
      { id: "se-node", label: "Node.js Alerts Service", type: "worker", x: 700, y: 10 },
      { id: "se-db", label: "PostgreSQL DB", type: "database", x: 700, y: 90 }
    ],
    edges: [
      { from: "se-dashboard", to: "se-gateway", label: "Poll Stats", animated: true },
      { from: "se-gateway", to: "se-redis", label: "Push Monitor Job", animated: true },
      { from: "se-redis", to: "se-celery", label: "Fetch Poller Task", animated: true },
      { from: "se-celery", to: "se-node", label: "Trigger Down Alerts", animated: true },
      { from: "se-gateway", to: "se-db", label: "Read Configurations", animated: false },
      { from: "se-celery", to: "se-db", label: "Write Check Run logs", animated: false }
    ]
  },
  {
    id: "esg-dashboard",
    name: "BreatheESG Ingestion System",
    status: "DEPLOYED",
    type: "ESG Normalization & Audit Pipeline",
    color: "green",
    tagline: "Enterprise ESG metrics normalizer calculating carbon emissions (Scope 1/2/3) with model-level audit locks.",
    problem: "Corporate sustainability spreadsheets suffer from manual transcription errors and lack verifiable source lineage, exposing companies to audit failures.",
    solution: "Built a Django 5.2 backend normalizing fuel logs, utility bills, and flight travel records to calculate Scope 1, 2, and 3 emissions. Employs model-level locks in Django hooks and double-entry timeline logs to ensure immutability.",
    impact: [
      "Normalizes complex unit formats (GAL/M3/kWh/IATA codes) to emissions.",
      "100% data audit compliance through raw source payload snapshots.",
      "SQL queries optimized by 73% using materialized database tables."
    ],
    stack: ["Django 5.2", "React", "Tailwind CSS v3", "PostgreSQL", "SQLite"],
    github: "https://github.com/Rarebuffalo/ESGReviewDashboard",
    demo: "https://drive.google.com/file/d/17-5A0sO-ZlqkExN_mhye9ZVzH1diAazC/view?usp=sharing",
    decisions: [
      {
        decision: "Django ORM Model-Level save() locks",
        alternative: "Database triggers or application logic validation",
        reason: "Guarantees that once a record is analyst-approved, no developer or administrator can bypass security logic to modify database values.",
        tradeoff: "Requires writing custom unlocking hooks for cases where auditors explicitly need revisions, controlled via administrative approval flags."
      },
      {
        decision: "CSV Flat-File ingestion",
        alternative: "Direct Live ERP and travel APIs integrations",
        reason: "Corporate SAP or Concur connections require long enterprise VPN onboarding, while flat-file exports represent the universal industry baseline.",
        tradeoff: "Relies on manual analyst uploads, mitigated by automatic parsing and anomaly detection on upload."
      }
    ],
    failureStory: {
      attempt: "Initially attempted to perform PDF scraping and optical character recognition (OCR) directly on scanned utility bills.",
      symptom: "Frequent character reading failures (e.g. reading 8 as 0) resulted in audit-level errors that compromised the credibility of the data.",
      fix: "Pivoted to parsing structured portal CSV exports, ensuring 100% mathematical accuracy and data consistency."
    },
    nodes: [
      { id: "esg-ui", label: "React ESG Portal", type: "frontend", x: 10, y: 50 },
      { id: "esg-api", label: "Django REST API", type: "gateway", x: 200, y: 50 },
      { id: "esg-norm", label: "Normalization Engine", type: "worker", x: 380, y: 90 },
      { id: "esg-db", label: "PostgreSQL Database", type: "database", x: 560, y: 50 },
      { id: "esg-ledger", label: "Double-Entry Ledger", type: "database", x: 730, y: 50 }
    ],
    edges: [
      { from: "esg-ui", to: "esg-api", label: "Upload CSV logs", animated: true },
      { from: "esg-api", to: "esg-norm", label: "Normalize Units", animated: true },
      { from: "esg-norm", to: "esg-db", label: "Save Emissions Model", animated: true },
      { from: "esg-api", to: "esg-ledger", label: "Log Analyst Action", animated: true },
      { from: "esg-db", to: "esg-ledger", label: "Audit Verify", animated: false }
    ]
  },
  {
    id: "assessment-creator",
    name: "VedaAI Assessment Creator System",
    status: "ACTIVE",
    type: "AI Generation Workflow Platform",
    color: "purple",
    tagline: "Teacher assessment builder featuring Redis/BullMQ background queues, Gemini 2.5, and Puppeteer PDF printing.",
    problem: "Educators spend hours drafting exams. Direct LLM templates generate poor questions, and token consumption on uploaded textbook PDFs causes rate-limit failures.",
    solution: "Designed a decoupled architecture utilizing Next.js 16 and Zustand for the UI, an Express backend, and a Redis/BullMQ task processor. Gemini 2.5 generates question layouts, while BullMQ retries background tasks on rate-limit errors.",
    impact: [
      "BullMQ job scheduler handles heavy token loads cleanly without UI locks.",
      "Generates compiled A4 print layouts via Puppeteer PDF buffers.",
      "Supports upload constraints up to 15 pages safely on free-tier keys."
    ],
    stack: ["Next.js 16", "Express.js", "TypeScript", "MongoDB", "Redis", "BullMQ", "Puppeteer", "Gemini 2.5"],
    github: "https://github.com/Rarebuffalo/AssessmentCreator",
    demo: "https://drive.google.com/file/d/1xFIWhmc9o_x2-HTJUiS-onwGLo8X471Q/view?usp=sharing",
    decisions: [
      {
        decision: "Redis + BullMQ task queues",
        alternative: "Serverless functions with direct requests",
        reason: "Gemini token rate limits on large PDFs easily trigger 429 exceptions. BullMQ allows background retries with exponential backoffs, keeping the frontend stable.",
        tradeoff: "Increases infrastructure complexity, requiring a stateful Redis broker and dedicated Express worker processes."
      },
      {
        decision: "Puppeteer PDF Compilation",
        alternative: "Client-side PDF libraries (jsPDF)",
        reason: "Server-side headless Chromium rendering ensures print-perfect A4 pagination, consistent page margins, and complex formula layouts.",
        tradeoff: "Higher backend resource usage, solved by containerizing the Chrome binary in dedicated server instances."
      }
    ],
    failureStory: {
      attempt: "Tried deploying the entire application to a unified serverless environment on Vercel.",
      symptom: "Persistent Socket.io channels failed, background BullMQ workers couldn't run, and Puppeteer timed out due to execution limit ceilings.",
      fix: "Decoupled the topology. Deployed the frontend to Vercel and hosted the API and background workers separately on Railway/Render using cloud databases."
    },
    nodes: [
      { id: "ac-ui", label: "Next.js 16 UI", type: "frontend", x: 10, y: 50 },
      { id: "ac-api", label: "Express API Gateway", type: "gateway", x: 180, y: 50 },
      { id: "ac-redis", label: "Redis + BullMQ Queue", type: "queue", x: 350, y: 50 },
      { id: "ac-worker", label: "BullMQ Task Worker", type: "worker", x: 520, y: 50 },
      { id: "ac-gemini", label: "Gemini 2.5 API / Chrome", type: "ai", x: 700, y: 10 },
      { id: "ac-db", label: "MongoDB / Mongoose", type: "database", x: 700, y: 90 }
    ],
    edges: [
      { from: "ac-ui", to: "ac-api", label: "Upload PDF config", animated: true },
      { from: "ac-api", to: "ac-redis", label: "Enqueue Generation", animated: true },
      { from: "ac-redis", to: "ac-worker", label: "Dequeue Job", animated: true },
      { from: "ac-worker", to: "ac-gemini", label: "Run LLM & Puppeteer", animated: true },
      { from: "ac-worker", to: "ac-db", label: "Save Result buffers", animated: false },
      { from: "ac-api", to: "ac-db", label: "Fetch Question PDF", animated: false }
    ]
  },
  {
    id: "vanco-ai",
    name: "Vanco AI Suite System",
    status: "RESEARCH",
    type: "AI & Machine Learning Assessment",
    color: "purple",
    tagline: "Sales forecasting pipeline, YOLOv8 ASL hand detector, and a Hybrid RAG physics chatbot.",
    problem: "Industrial or academic systems require multi-modal pipelines (forecasting, vision, text QA) that must operate reliably under distinct edge constraints.",
    solution: "Implemented three optimized ML pipelines: LightGBM for grocery forecasting (Aug 1-15 split), YOLOv8 Nano for gesture detection with a headless POST fallback server, and an NCERT Physics RAG using FAISS, BM25, and NetworkX Graph DB.",
    impact: [
      "Validation RMSLE of 0.40718 vs Kaggle Public 0.43179 (no time leakage).",
      "ASL Detection precision of 0.938 operating at 30 FPS on CPU.",
      "Grounded RAG tutor refusing out-of-domain queries and returning citations."
    ],
    stack: ["LightGBM", "YOLOv8", "FAISS", "NetworkX", "FastAPI", "OpenCV", "Gemini API"],
    github: "https://github.com/Rarebuffalo/vanco-ai-solution-architect",
    demo: "https://github.com/Rarebuffalo/vanco-ai-solution-architect",
    decisions: [
      {
        decision: "NetworkX Knowledge Graph",
        alternative: "Neo4j database service",
        reason: "Allows serializing the graph schema directly to lightweight database files or in-memory arrays, requiring zero external docker dependencies for the reviewer.",
        tradeoff: "Does not scale to billions of conceptual nodes, but perfectly fits textbook-scale structures."
      },
      {
        decision: "Stateless HTTP POST webcam frame polling",
        alternative: "WebRTC or WebSockets connections",
        reason: "Ensures connection robustly operates over headless remote port-forwarding without corporate firewall interruptions.",
        tradeoff: "Higher latency compared to WebRTC, but highly reliable and simpler codebase."
      }
    ],
    failureStory: {
      attempt: "Initially attempted to split time-series sales forecasting data using random train-test splitting.",
      symptom: "Severe time leakage caused the validation model to overfit, failing to generalize to public test sets.",
      fix: "Replaced with a chronological validation splitter matching the test set duration, reducing validation RMSLE to 0.40718."
    },
    nodes: [
      { id: "va-forecasting", label: "LightGBM Forecasting", type: "worker", x: 10, y: 50 },
      { id: "va-vision", label: "YOLOv8 OpenCV Frame Detector", type: "worker", x: 180, y: 50 },
      { id: "va-stream", label: "HTTP Fallback Server", type: "gateway", x: 350, y: 50 },
      { id: "va-rag", label: "FAISS + BM25 Retrieval", type: "worker", x: 520, y: 50 },
      { id: "va-graph", label: "NetworkX Knowledge Graph", type: "database", x: 700, y: 10 },
      { id: "va-gemini", label: "Gemini Grounding API", type: "ai", x: 700, y: 90 }
    ],
    edges: [
      { from: "va-stream", to: "va-vision", label: "POST base64 frames", animated: true },
      { from: "va-rag", to: "va-graph", label: "Query adjacent nodes", animated: false },
      { from: "va-rag", to: "va-gemini", label: "Send RRF context", animated: true }
    ]
  },
  {
    id: "scaleshorts",
    name: "ScaleShorts System",
    status: "DEPLOYED",
    type: "AI Reel Generation Pipeline",
    color: "purple",
    tagline: "Automated short-form video generation pipeline orchestrating scripting, TTS, assets, and editing.",
    problem: "Managing multiple social media channels is time-consuming, requiring repetitive work in video editing, script writing, and voice narration.",
    solution: "Built a Python-based multi-agent orchestration pipeline. Gemini 1.5 generates scripts, Edge TTS produces neural voice narration, the Pexels API downloads matching vertical stock footage, and moviepy compiles, crops, and captions the reel automatically.",
    impact: [
      "Automated end-to-end reel creation with a single command run.",
      "Generates neural voice narration and matching stock video clips.",
      "Maintains run history and logs inside an SQLite database."
    ],
    stack: ["Python", "google-genai", "Edge-TTS", "moviepy", "aiohttp", "SQLite"],
    github: "https://github.com/Rarebuffalo/ScaleShorts",
    demo: "https://www.loom.com/share/db3357f8901940e6bdfd666d999c4f69",
    decisions: [
      {
        decision: "Edge-TTS (Neural TTS)",
        alternative: "ElevenLabs API",
        reason: "Edge-TTS provides high-quality neural voices completely free of cost and with zero API key dependencies, vital for high-volume automated batch runs.",
        tradeoff: "Slightly less custom voice cloning customization compared to ElevenLabs, but highly functional."
      },
      {
        decision: "moviepy video compilation",
        alternative: "Adobe Premiere scripts or heavy visual tools",
        reason: "moviepy allows direct, programmatic crop, resizing, audio mixing, and caption rendering from code, running headlessly on servers.",
        tradeoff: "Video rendering consumes significant CPU/RAM on small containers."
      }
    ],
    failureStory: {
      attempt: "Originally attempted to download stock videos sequentially in the main thread.",
      symptom: "API rate limits and slow server response times led to pipeline stalls, stretching reel generation to several minutes.",
      fix: "Refactored the downloader to utilize aiohttp for parallel, async asset downloads, shrinking fetch times to seconds."
    },
    nodes: [
      { id: "ss-ui", label: "Central Orchestrator", type: "frontend", x: 10, y: 50 },
      { id: "ss-gemini", label: "Gemini Script Agent", type: "ai", x: 180, y: 10 },
      { id: "ss-tts", label: "Edge-TTS Voice Engine", type: "worker", x: 180, y: 90 },
      { id: "ss-pexels", label: "Pexels API Fetcher", type: "gateway", x: 360, y: 50 },
      { id: "ss-moviepy", label: "moviepy video compiler", type: "worker", x: 540, y: 50 },
      { id: "ss-db", label: "SQLite database", type: "database", x: 720, y: 50 }
    ],
    edges: [
      { from: "ss-ui", to: "ss-gemini", label: "Generate script", animated: true },
      { from: "ss-ui", to: "ss-tts", label: "Synthesize voice", animated: true },
      { from: "ss-ui", to: "ss-pexels", label: "Query stock video", animated: true },
      { from: "ss-gemini", to: "ss-moviepy", label: "Pass txt content", animated: false },
      { from: "ss-tts", to: "ss-moviepy", label: "Overlay voice mp3", animated: false },
      { from: "ss-pexels", to: "ss-moviepy", label: "Stitch vertical clips", animated: false },
      { from: "ss-moviepy", to: "ss-db", label: "Log generation run", animated: false }
    ]
  },
  {
    id: "driveseek",
    name: "DriveSeek System",
    status: "ACTIVE",
    type: "Conversational Drive Search Agent",
    color: "blue",
    tagline: "Natural language search agent and filter discoverer for Google Drive files using LangGraph.",
    problem: "Finding files inside cluttered enterprise Google Drive folders using basic keywords is tedious and frequently misses files.",
    solution: "Built a LangGraph-powered conversational search assistant. The React agent parses natural language query criteria, translates them to Drive API search parameters, and pulls matches, displaying them in a Streamlit chat.",
    impact: [
      "Finds files in Google Drive using natural conversational query text.",
      "Translates complex queries to valid Drive API 'q' parameters automatically.",
      "Ensures secure file discovery using service account keys."
    ],
    stack: ["Python", "FastAPI", "Streamlit", "LangGraph", "LangChain", "Google Drive API", "Gemini 2.5 Flash"],
    github: "https://github.com/Rarebuffalo/DriveSeek",
    demo: "https://github.com/Rarebuffalo/DriveSeek",
    decisions: [
      {
        decision: "LangGraph create_react_agent",
        alternative: "Custom function routing logic",
        reason: "Provides native support for tool usage cycles (search, evaluate results, broaden parameters) and stores user dialogue state in checkpointers.",
        tradeoff: "Adds dependencies on the LangChain/LangGraph libraries, which are abstracted to ensure maintainability."
      },
      {
        decision: "Streamlit UI",
        alternative: "React frontend from scratch",
        reason: "Streamlit allowed building a clean conversational chat UI in under 50 lines of Python, prioritizing focus on the LangGraph backend agent.",
        tradeoff: "Limited UI layout customizations, but perfectly serves as an interactive chat canvas."
      }
    ],
    failureStory: {
      attempt: "Initially used exact filename comparisons (name = 'filename') when querying the Google Drive API.",
      symptom: "Subtle spelling differences, missing file extensions, or case mismatches caused the search tool to return zero matches.",
      fix: "Refactored the agent system prompt to translate queries to containment comparisons (name contains 'filename') and fall back to broader terms."
    },
    nodes: [
      { id: "ds-ui", label: "Streamlit UI Canvas", type: "frontend", x: 10, y: 50 },
      { id: "ds-api", label: "FastAPI Server", type: "gateway", x: 200, y: 50 },
      { id: "ds-graph", label: "LangGraph react agent", type: "worker", x: 380, y: 50 },
      { id: "ds-drive", label: "Google Drive Search Tool", type: "database", x: 560, y: 10 },
      { id: "ds-ai", label: "Gemini 2.5 Flash", type: "ai", x: 560, y: 90 }
    ],
    edges: [
      { from: "ds-ui", to: "ds-api", label: "POST prompt", animated: true },
      { from: "ds-api", to: "ds-graph", label: "Invoke graph loop", animated: true },
      { from: "ds-graph", to: "ds-ai", label: "Determine intent", animated: true },
      { from: "ds-graph", to: "ds-drive", label: "Execute Drive API search", animated: true },
      { from: "ds-drive", to: "ds-graph", label: "Return JSON file objects", animated: false }
    ]
  },
  {
    id: "openllm-gateway",
    name: "OpenLLM Gateway System",
    status: "ONLINE",
    type: "High-Throughput LLM Proxy",
    color: "blue",
    tagline: "Open-source self-hostable LLM routing layer managing API keys, costs, budget bounds, and failover.",
    problem: "AI platforms suffer during LLM outages. Direct API keys expose organizations to cost overruns, rate limiting, and zero observability.",
    solution: "Created a JS/TS monorepo using Bun. Features an ElysiaJS backend with Prisma ORM and PostgreSQL. Serves a unified completions endpoint, handles budget limits, tracks costs, and auto-routes fallbacks.",
    impact: [
      "Unified endpoint compatibility for all providers (OpenAI, Anthropic, Gemini).",
      "API keys encrypted at rest using AES and scoped per user system.",
      "Detailed analytics cost breakdowns and budget caps."
    ],
    stack: ["Bun", "ElysiaJS", "Prisma ORM", "PostgreSQL", "Turbo Monorepo", "React"],
    github: "https://github.com/Rarebuffalo/OpenLLM-Gateway",
    demo: "https://github.com/Rarebuffalo/OpenLLM-Gateway",
    decisions: [
      {
        decision: "ElysiaJS backend",
        alternative: "ExpressJS or Fastify",
        reason: "ElysiaJS provides type safety and achieves unmatched performance benchmarks on the Bun runtime, maximizing request throughput.",
        tradeoff: "Smaller ecosystem, solved by writing lightweight custom utility modules when needed."
      },
      {
        decision: "Prisma ORM",
        alternative: "Raw SQL or Kysely query builders",
        reason: "Prisma's typed client simplifies relational database updates and migrations for users, companies, API keys, and model maps.",
        tradeoff: "Prisma client engine adds slight cold-start overhead compared to raw SQL, resolved by optimizing connection pools."
      }
    ],
    failureStory: {
      attempt: "Originally attempted to store LLM provider API keys as plaintext database rows for quick querying.",
      symptom: "Failed early security review, exposing the platform to severe key leakage hazards if the database was compromised.",
      fix: "Implemented AES-256-GCM encryption for all stored keys at the data service layer, ensuring keys are only decrypted in-memory during requests."
    },
    nodes: [
      { id: "og-client", label: "React Dashboard UI", type: "frontend", x: 10, y: 50 },
      { id: "og-proxy", label: "ElysiaJS Router", type: "gateway", x: 180, y: 50 },
      { id: "og-prisma", label: "Prisma client client", type: "worker", x: 350, y: 50 },
      { id: "og-db", label: "PostgreSQL DB", type: "database", x: 530, y: 10 },
      { id: "og-llms", label: "Anthropic/OpenAI/Mistral", type: "ai", x: 530, y: 90 }
    ],
    edges: [
      { from: "og-client", to: "og-proxy", label: "v1 completions request", animated: true },
      { from: "og-proxy", to: "og-prisma", label: "Resolve user details", animated: false },
      { from: "og-prisma", to: "og-db", label: "Read user budgets", animated: false },
      { from: "og-proxy", to: "og-llms", label: "AES decrypt & POST request", animated: true }
    ]
  }
];

export interface EngineeringLog {
  date: string;
  category: string;
  metric?: string;
  message: string;
  details: string;
}

export const engineeringLogs: EngineeringLog[] = [
  {
    date: "2026-05-28",
    category: "ESG Ingestion Workflow",
    metric: "SOC-2 Ready",
    message: "Built BreatheESG compliance document normalizer with audit locks.",
    details: "Implemented Django model save() hook validation locks to freeze data entries once analyst-approved, and integrated double-entry timeline logs to record corrections."
  },
  {
    date: "2026-04-10",
    category: "AI Security Pipeline",
    metric: "asyncio.gather",
    message: "Engineered parallel scanning pipeline with semaphore throttling.",
    details: "Designed FastAPI code scanning orchestrator utilizing asyncio.gather with Semaphore(5) limit to perform concurrent file audits via Gemini Flash API without timing out."
  },
  {
    date: "2026-03-12",
    category: "Database Indexing",
    metric: "420ms → 110ms",
    message: "Optimized sales forecasting time-series validation window.",
    details: "Built chronological train-validation out-of-sample splits on favoritadata to verify lags and rolling calendar features without time leakage."
  },
  {
    date: "2026-01-20",
    category: "VedaAI Task Queue",
    metric: "BullMQ retry",
    message: "Implemented BullMQ background queues for rate limit handling.",
    details: "Decoupled Gemini generation queues using BullMQ and Redis to execute exponential backoff retries when PDF prompt scans hit 429 token limits."
  }
];

export const experienceData = {
  company: "OpenStreamLabs",
  role: "Fullstack Developer Intern",
  duration: "Nov 2025 - Mar 2026",
  status: "COMPLETED",
  highlights: [
    "Async Task Queues: Deployed Redis and BullMQ queues to handle heavy PDF analysis tasks, supporting automatic retries on 429 rate limit exceptions.",
    "DB Query Tuning: Analyzed database schemas and set up complex compound query indexes, reducing latency from 420ms to 110ms.",
    "Websocket Real-Time: Formulated persistent Socket.io connections to stream backends generation milestones directly to Next.js Zustand clients.",
    "Isolated Compiles: Designed transient sandboxed code compilers inside resource-restricted Docker containers to execute syntax checks securely."
  ]
};

export const interviewQuestions = [
  {
    question: "Tell me about SecureLens.",
    answer: "SecureLens is an AI security agent built on FastAPI. It connects to GitHub to scan source code and prober URLs for vulnerabilities (30+ checks across 5 layers). It runs a three-phase agentic pipeline: Triage (Gemini scopes risk and selects files) -> Concurrent Analysis (asyncio.gather scans files in parallel throttled by a Semaphore of 5, validated via Pydantic) -> Synthesis (Gemini writes an executive summary). This reduced typical repository scanning latency from 12 minutes to under 45 seconds."
  },
  {
    question: "Why choose Django for BreatheESG (ESG Review Dashboard) over Node.js or FastAPI?",
    answer: "Django 5.2 was selected for BreatheESG because its built-in relational ORM validation layers, structured model relationships, and robust migrations align perfectly with compliance-grade database designs. It allowed us to enforce record freezing directly within model save() hooks (blocking updates once marked approved) and maintain clean, audit-compliant double-entry ledger trails out of the box."
  },
  {
    question: "What did you build for the Vanco AI Assessment?",
    answer: "I implemented three production-grade ML pipelines: (1) Tabular Grocery Sales Forecasting using LightGBM and chronological time-splitting (validation RMSLE of 0.40718 vs Kaggle Public 0.43179). (2) ASL Hand Sign Object Detection using YOLOv8 Nano executing real-time webcam frame predictions at 30 FPS. (3) NCERT Physics RAG system combining cosine vector similarity, lexical BM25, and NetworkX Graph DB traversal via Reciprocal Rank Fusion."
  },
  {
    question: "How does VedaAI (Assessment Creator) manage Gemini rate limits?",
    answer: "VedaAI manages rate limits by decoupling generation requests from the HTTP loop. The Express API enqueues generation parameters into a BullMQ queue backed by Redis. A persistent worker daemon consumes tasks, extracts PDF text, and coordinates Gemini API completions. If a 429 rate limit or token capacity error occurs, BullMQ automatically schedules a retry with exponential backoff, shielding the client from failures."
  },
  {
    question: "How does Sentinel handle endpoint monitoring?",
    answer: "Sentinel handles uptime monitoring via a lightweight Python FastAPI backend coupled with Celery background workers and a Redis broker. Monitored endpoints are polled at configured intervals. When Celery registers an endpoint crash or latency warning, it broadcasts to Node.js microservices which dispatch real-time notifications to Slack/Discord Webhooks or Email via Resend."
  }
];
