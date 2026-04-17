# Naiton Business Suite - Frontend Architecture & PoC Strategic Brief

## 1. Vision & Strategic Intent
As the Frontend Tech-Lead, my goal is to deliver a **high-performance, enterprise-grade Proof of Concept (PoC)** that balances rapid delivery with long-term scalability. This PoC validates the "Majestic Monolith" architecture—a single-app approach that minimizes infrastructure complexity while maintaining strict domain boundaries using Feature-Sliced Design (FSD).

## 2. Architecture Philosophy: The "Majestic Monolith"
To support a team of 3 developers, we are avoiding the runtime complexity of microfrontends. Instead, we use a **Build-time Monorepo** (Turborepo) to share a standardized, pre-built UI Kit, while keeping the core application logic in a single, well-structured codebase (`apps/naiton`).

### Key Pillars:
* **FSD (Feature-Sliced Design):** We enforce a strict hierarchy (Shared -> Entities -> Features -> Widgets -> Pages -> App) to prevent spaghetti code and ensure that "Sales" logic never accidentally leaks into "CRM" logic.
* **Layout Engine (Nested Persistence):** - **Auth Layer:** Zero layout, focused on high-conversion login.
    - **Outer Layer (Suite Shell):** Persistent `AppNavbar` providing high-level module switching.
    - **Inner Layer (Domain Shell):** Persistent `Sidebar` providing module-specific navigation.
    - **The Goal:** Seamless transitions. Switching modules (via Navbar) or pages (via Sidebar) must never trigger a re-render of the parent layouts, maintaining UI state and performance.
* **Performance:** Utilizing **React Router v7** and **Vite** for strict route-based code splitting. High-level modules are only downloaded when accessed, optimizing FCP and TTFB.

## 3. Technology Stack & Tooling
* **Framework:** React + TypeScript + Vite.
* **Routing:** `react-router` (v7) with data-loaders and `lazy` loading.
* **State Management:** - **Zustand:** Lightweight client-side state (Auth, UI toggles, Global Search).
    - **TanStack Query:** Robust server-state management (Caching, Retries, Sync).
* **Styling:** **Tailwind CSS v4+** via PostCSS. A pure CSS-driven approach for maximum performance and future-proofing.
* **UI Library:** A custom, shadcn-based enterprise kit (simulated as a local package).
* **The "Rust-Speed" Toolchain:** Using `oxlint` for linting and `oxfmt` for formatting to provide near-instant developer feedback loops.

## 4. Testing Strategy: The Pyramid
We ensure reliability through three distinct layers:
1. **Unit Testing:** `Vitest` for isolated business logic and utility functions.
2. **Integration Testing:** `React Testing Library (RTL)` to verify that features and widgets interact correctly with our state (Zustand/Query) and the Mock API.
3. **E2E Testing:** `Playwright` to validate the "Golden Path" (Login -> Dashboard -> Sales Module -> Order Creation).

## 5. Deployment & Versioning
Versioning is decoupled from the frontend code. We use a **"Frozen Snapshot"** strategy where builds are stored in versioned directories (e.g., `/v1.0.0/`). Infrastructure (Nginx) serves the correct version based on user session cookies, keeping the code clean and focused on the latest feature set.