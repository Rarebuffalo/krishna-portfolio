# Krishna — Systems & Backend Engineer

A premium, editorial systems‑engineering portfolio showcasing B2B developer tools, compliance systems, and distributed asynchronous backend architectures.

---

## Flagship Systems

### 1. SecureLens AI
An automated repository security scanner using concurrency constraints and LLM-driven vulnerability classification.
*   **Key Highlights:** Triages repository file paths and executes concurrent audits via FastAPI `asyncio.gather` (semaphore-throttled at 5) with strict Pydantic parsing.
*   **Outcome:** Reduced scan latencies from **12 minutes to under 45 seconds**.
*   **Stack:** Python, FastAPI, Gemini API, Pydantic v2, PostgreSQL, SQLAlchemy.
*   **Repository:** [securelens-backend](https://github.com/Rarebuffalo/securelens-backend)

### 2. Sentinel System
A startup-ready multi-tenant API monitor with automated Celery checks and instant Slack/Discord alerts.
*   **Key Highlights:** Asynchronous FastAPI backend scheduling tasks via Celery worker intervals over Redis brokers.
*   **Outcome:** Dispatches endpoint downtime alerts within 150ms of failures.
*   **Stack:** Python, FastAPI, Celery, Redis, Node.js, React, PostgreSQL.
*   **Repository:** [Sentinel](https://github.com/Rarebuffalo/Sentinel)

### 3. EquityForge
A financial research automation platform transforming unstructured documents into institutional-quality equity research reports.
*   **Key Highlights:** FastAPI backend parsing PDF/TXT/CSV files, running structured GPT-4o/Gemini extractions, and rendering programmatic Matplotlib charts inside A4-paginated HTML pages compiled via WeasyPrint.
*   **Outcome:** Automated the generation of print-perfect 4-page institutional PDFs in seconds.
*   **Stack:** Python, FastAPI, Next.js, GPT-4o / Gemini, WeasyPrint, Matplotlib, Pydantic.
*   **Repository:** [equityforge](https://github.com/Rarebuffalo/equityforge)

---

## Engineering Philosophy

1.  **Correctness before cleverness:** Reason through edge cases and write boring, reliable code rather than fragile abstractions.
2.  **Systems, not screens:** Design data streams, state machines, and fail-safe recovery patterns first—the UI is merely an exposure layer.
3.  **Ship the smallest working thing:** Deploy and test prototypes under real usage conditions rather than over-planning.

---

## Technical Toolbox

*   **Languages:** Go, Python, TypeScript, Java, C, SQL
*   **Backend & Systems:** FastAPI, Django, ExpressJS, gRPC, RabbitMQ, Celery, BullMQ
*   **Data & Caching:** PostgreSQL, MongoDB, SQLite, Redis
*   **Orchestrations & DevOps:** Docker, Git, GitHub Actions, AWS

---

## Codebase Structure

*   `src/app/page.tsx`: Editorial narrative landing page with "Curiosity Builds" grid and "Active Build" highlight.
*   `src/app/systems/[id]/page.tsx`: Case study routing template showing failure stories, trade-offs, and scaled architecture node graphs.
*   `src/components/`: Modular UI assets including background blueprint grids, navigation headers, and project grid modules.
*   `src/data/portfolioData.ts`: Unified data definitions for systems and metrics.
*   `documentation/`: Architectural logs detailing failure scenarios and setups.
