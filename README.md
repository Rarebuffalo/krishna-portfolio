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

### 2. TxnForge
A high-performance transactional authentication and secure validation engine designed for B2B SaaS portals.
*   **Key Highlights:** Built a gRPC authentication service managing secure state checks against a decoupled JWT session store cached in Redis.
*   **Outcome:** Achieved sub-15ms validation responses and reduced direct database requests by **84%**.
*   **Stack:** Go, gRPC, Redis, PostgreSQL, Docker, GitHub Actions.
*   **Repository:** [TxnForge](https://github.com/Rarebuffalo/TxnForge)

### 3. FlientSec
A product-driven threat intelligence and real-time audit-compliance orchestrator.
*   **Key Highlights:** Decouples heavy audit log checks using RabbitMQ background tasks to aggregate evidence blocks for SOC 2 and ISO 27001 scopes.
*   **Outcome:** Automated **80%** of compliance metrics tracking and reports generation.
*   **Stack:** Python, Django, PostgreSQL, RabbitMQ, React, AWS.
*   **Repository:** [FlientSec](https://github.com/Rarebuffalo/FlientSec)

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

*   `src/app/page.tsx`: Editorial narrative landing page.
*   `src/app/systems/[id]/page.tsx`: Case study routing template showing failure stories and design details.
*   `src/components/`: Modular UI assets including background blueprint grids, header menus, and project grid modules.
*   `src/data/portfolioData.ts`: Unified data definitions for systems and metrics.
*   `documentation/`: Architectural logs detailing failure scenarios and setups.
