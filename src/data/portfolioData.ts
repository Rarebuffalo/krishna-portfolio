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
    name: "SecureLens AI",
    status: "ONLINE",
    type: "01 · SECURITY INFRASTRUCTURE",
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
    type: "02 · SYSTEM MONITORING",
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
    id: "equityforge",
    name: "EquityForge",
    status: "ONLINE",
    type: "03 · RESEARCH PLATFORM",
    color: "green",
    tagline: "Financial research automation platform transforming unstructured documents into institutional equity reports.",
    problem: "B2B financial analysts spend hours parsing complex PDFs, TXT summaries, and CSV data to draft reports, leading to visual formatting errors and manual calculations.",
    solution: "Built a Python FastAPI backend that parses documents via pdfplumber/pandas, runs structured GPT-4o/Gemini extractions validated by Pydantic schemas, programmatically generates Matplotlib visual charts, and converts Jinja2-rendered HTML pages into professional 4-page PDFs via WeasyPrint.",
    impact: [
      "Generates print-perfect A4-paginated 4-page institutional PDF reports in seconds.",
      "Handles PDF, TXT, and CSV formats with unified text normalization.",
      "Zero-hallucination guardrails and automated Matplotlib data visualization."
    ],
    stack: ["Python", "FastAPI", "Next.js", "GPT-4o / Gemini", "WeasyPrint", "Matplotlib", "Pydantic"],
    github: "https://github.com/Rarebuffalo/equityforge",
    demo: "https://github.com/Rarebuffalo/equityforge",
    decisions: [
      {
        decision: "WeasyPrint PDF engine over client-side jsPDF",
        alternative: "Client-side browser generation",
        reason: "WeasyPrint compiles print-perfect CSS-driven pagination, exact page-breaks, and margin calculations reliably on the server.",
        tradeoff: "Requires system-level dependencies (Pango, Cairo) installed on the deployment environment."
      }
    ],
    failureStory: {
      attempt: "Originally attempted client-side PDF rendering using vanilla canvas-to-pdf libraries.",
      symptom: "Severe layout clipping, font inconsistencies, and pagination breaks across dynamic page boundaries.",
      fix: "Migrated to a server-side WeasyPrint converter utilizing Jinja2 HTML templates and CSS print specifications."
    },
    nodes: [
      { id: "ef-ui", label: "Next.js Upload UI", type: "frontend", x: 10, y: 50 },
      { id: "ef-api", label: "FastAPI Backend", type: "gateway", x: 200, y: 50 },
      { id: "ef-llm", label: "Gemini / OpenAI API", type: "ai", x: 380, y: 10 },
      { id: "ef-pdf", label: "WeasyPrint Compiler", type: "worker", x: 380, y: 90 },
      { id: "ef-output", label: "PDF Download", type: "database", x: 560, y: 50 }
    ],
    edges: [
      { from: "ef-ui", to: "ef-api", label: "Upload docs", animated: true },
      { from: "ef-api", to: "ef-llm", label: "Run extraction", animated: true },
      { from: "ef-api", to: "ef-pdf", label: "Compile layout", animated: true },
      { from: "ef-pdf", to: "ef-output", label: "Return report PDF", animated: true }
    ]
  },
  {
    id: "flientsec",
    name: "FlientSec",
    status: "ONLINE",
    type: "COMPLIANCE MONITORING",
    color: "purple",
    tagline: "Product-driven threat intelligence and real-time audit-compliance orchestrator.",
    problem: "B2B SaaS startups struggle with compliance evidence auditing, requiring manual logs review and exposing systems to critical vulnerabilities before SOC-2 check windows.",
    solution: "Designed an automated monitoring engine performing security policy checks, log normalizations, and live risk-state audits, dispatching real-time notifications to unified webhooks.",
    impact: [
      "Automated 80% of compliance evidence aggregation tasks.",
      "Dispatches real-time network anomaly alerts within 200ms of rule violation.",
      "Comprehensive, unified compliance dashboard tracking 50+ security vectors."
    ],
    stack: ["Python", "Django", "PostgreSQL", "RabbitMQ", "React", "AWS"],
    github: "https://github.com/Rarebuffalo/FlientSec",
    demo: "https://github.com/Rarebuffalo/FlientSec",
    decisions: [],
    failureStory: {
      attempt: "Originally wrote compliance audit checks directly within the web request thread.",
      symptom: "Slow page loads and timeout failures whenever checking large volumes of background systems telemetry.",
      fix: "Decoupled audit execution into background consumer tasks managed asynchronously by RabbitMQ workers."
    },
    nodes: [],
    edges: []
  },
  {
    id: "txnforge",
    name: "TxnForge",
    status: "ONLINE",
    type: "Secure Authorization",
    color: "blue",
    tagline: "High-performance transactional authentication and secure validation engine.",
    problem: "Legacy B2B auth flows suffered from slow session verification bottlenecks and high database load under peak API request volumes, compromising transactional consistency.",
    solution: "Engineered a distributed validation service utilizing decoupled JWT session caches, strict RBAC database access controls, and end-to-end integration test suites with 98% code coverage.",
    impact: [
      "Achieved sub-15ms session token validation latencies.",
      "Reduced backend database auth queries by 84% using Redis replication.",
      "Zero downtime or security breaches logged across simulated high-concurrency stress runs."
    ],
    stack: ["Go", "gRPC", "Redis", "PostgreSQL", "Docker", "GitHub Actions"],
    github: "https://github.com/Rarebuffalo/TxnForge",
    demo: "https://github.com/Rarebuffalo/TxnForge",
    decisions: [],
    failureStory: {
      attempt: "Originally attempted to check sessions through direct relational DB queries on each request.",
      symptom: "Created intense query queues and lock-ups during peak stress tests, hitting database resource limits.",
      fix: "Refactored the authentication verify layer to read from a distributed Redis cache, validating cache hits instantly."
    },
    nodes: [],
    edges: []
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
    decisions: [],
    failureStory: {
      attempt: "Originally attempted to download stock videos sequentially in the main thread.",
      symptom: "API rate limits and slow server response times led to pipeline stalls, stretching reel generation to several minutes.",
      fix: "Refactored the downloader to utilize aiohttp for parallel, async asset downloads, shrinking fetch times to seconds."
    },
    nodes: [],
    edges: []
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
    decisions: [],
    failureStory: {
      attempt: "Initially attempted to perform PDF scraping and optical character recognition (OCR) directly on scanned utility bills.",
      symptom: "Frequent character reading failures (e.g. reading 8 as 0) resulted in audit-level errors that compromised the credibility of the data.",
      fix: "Pivoted to parsing structured portal CSV exports, ensuring 100% mathematical accuracy and data consistency."
    },
    nodes: [],
    edges: []
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
    decisions: [],
    failureStory: {
      attempt: "Tried deploying the entire application to a unified serverless environment on Vercel.",
      symptom: "Persistent Socket.io channels failed, background BullMQ workers couldn't run, and Puppeteer timed out due to execution limit ceilings.",
      fix: "Decoupled the topology. Deployed the frontend to Vercel and hosted the API and background workers separately on Railway/Render using cloud databases."
    },
    nodes: [],
    edges: []
  },
  {
    id: "vanco-ai",
    name: "Vanco AI Suite System",
    status: "RESEARCH",
    type: "AI & Machine Learning Assessment",
    color: "purple",
    tagline: "Sales forecasting pipeline, YOLOv8 ASL hand detector, and a Hybrid RAG physics chatbot.",
    problem: "Industrial or academic systems require multi-modal pipelines (forecasting, vision, text QA) that must operate reliably under distinct edge constraints.",
    solution: "Implemented three optimized ML pipelines: LightGBM for grocery sales forecasting, YOLOv8 Nano for gesture detection, and an NCERT Physics RAG using FAISS, BM25, and NetworkX Graph DB.",
    impact: [
      "Validation RMSLE of 0.40718 vs Kaggle Public 0.43179 (no time leakage).",
      "ASL Detection precision of 0.938 operating at 30 FPS on CPU.",
      "Grounded RAG tutor refusing out-of-domain queries and returning citations."
    ],
    stack: ["LightGBM", "YOLOv8", "FAISS", "NetworkX", "FastAPI", "OpenCV", "Gemini API"],
    github: "https://github.com/Rarebuffalo/vanco-ai-solution-architect",
    demo: "https://github.com/Rarebuffalo/vanco-ai-solution-architect",
    decisions: [],
    failureStory: {
      attempt: "Initially attempted to split time-series sales forecasting data using random train-test splitting.",
      symptom: "Severe time leakage caused the validation model to overfit, failing to generalize to public test sets.",
      fix: "Replaced with a chronological validation splitter matching the test set duration, reducing validation RMSLE to 0.40718."
    },
    nodes: [],
    edges: []
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
    decisions: [],
    failureStory: {
      attempt: "Originally attempted to store LLM provider API keys as plaintext database rows for quick querying.",
      symptom: "Failed early security review, exposing the platform to severe key leakage hazards if the database was compromised.",
      fix: "Implemented AES-256-GCM encryption for all stored keys at the data service layer, ensuring keys are only decrypted in-memory during requests."
    },
    nodes: [],
    edges: []
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
    decisions: [],
    failureStory: {
      attempt: "Initially used exact filename comparisons (name = 'filename') when querying the Google Drive API.",
      symptom: "Subtle spelling differences, missing file extensions, or case mismatches caused the search tool to return zero matches.",
      fix: "Refactored the agent system prompt to translate queries to containment comparisons (name contains 'filename') and fall back to broader terms."
    },
    nodes: [],
    edges: []
  },
  {
    id: "spacedcode",
    name: "SpacedCode System",
    status: "ONLINE",
    type: "Workflow-Driven Developer System",
    color: "green",
    tagline: "A developer productivity dashboard simulating terminals and integrating external tools.",
    problem: "Developers lose context when jumping between external platforms (LeetCode, WakaTime, GitHub) to trace their workflow metrics.",
    solution: "Aggregated activity streams using async data-fetching cron queues, storing metrics in Redis for instant read performance and rendering them via a retro console simulation.",
    impact: [
      "Centralizes 3 core activity data channels into one telemetry pane.",
      "Zero-latency reads through Redis key cache pre-rendering.",
      "Custom in-browser command parser matching shell specifications."
    ],
    stack: ["Next.js", "Express.js", "Redis", "Socket.io", "Zustand"],
    github: "https://github.com/Rarebuffalo/krishna-portfolio",
    demo: "https://spacedcode.vercel.app/",
    decisions: [],
    failureStory: {
      attempt: "Originally parsed LeetCode profiles synchronously during incoming request loops.",
      symptom: "Frequent 504 Gateway Timeouts whenever LeetCode endpoints experienced response latencies.",
      fix: "Scheduled background telemetry fetch workers, caching payload outputs in Redis to guarantee immediate response times."
    },
    nodes: [],
    edges: []
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
  }
];
