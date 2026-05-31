# Developer Setup & Run Guide

This document details the configuration scripts and operational commands required to build, test, and run **KRISHNA OS** locally.

---

## 1. Prerequisites

- **Node.js**: v18.0.0 or higher (v26.2.0 verified in host sandbox)
- **npm**: v9.0.0 or higher (v11.14.1 verified in host sandbox)

---

## 2. Command Reference

All scripts are executed from the project root directory: `/home/Krishna-Singh/krishna-portfolio/`

### 2.1 Running the Development Server
Launches the Next.js dev compiler. To start the local server, run:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) inside your browser to view the live dashboard.

### 2.2 Rebuilding Dependency Node Modules (Offline Mode)
If your development environment is fully network-isolated, you can rebuild/repair all packages directly using the local 12GB cache. Run:
```bash
NPM_CONFIG_OFFLINE=true npm install
```

### 2.3 Compiling for Production (Low-Memory Cap)
To compile the production bundles on resources-constrained servers or OOM-sensitive hosts, force Node to cap its heap allocations:
```bash
NODE_OPTIONS="--max-old-space-size=512" npm run build
```
This runs TypeScript validations, ESLint checks, collects page data, and outputs highly optimized static web assets inside the `.next` directory.

### 2.4 Testing Code Formatting (Linter)
Validate code syntax styles and components configuration checks:
```bash
npm run lint
```

---

## 3. Environment Context & Fallbacks

- **Zero API Requirements**: By default, the RAG terminal runs using pre-seeded local JSON answers. No external keys or API setup is required, enabling immediate client-side testing.
- **Font Fallbacks**: The build is fully offline-compliant. No Google Font downloads occur at build time. System typography (Inter, sans-serif) handles interface layout styling automatically.
