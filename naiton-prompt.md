# Create Naiton Business Suite - Frontend Architecture & PoC Strategic Brief

# High-Level Objective

- Create phased plan for AI coding agent for Naiton Business Suite - Frontend Architecture & PoC Strategic Brief. The Plan should be saved as "naiton-plan.md" in the "new" folder. It should include all code examples which given in "context" section and mentioned in Low-Level Tasks section. I will copy the "naiton-plan.md" file to another folder and use it as a prompt for AI coding agent to build application foundation architecture and structure on the basis of which will be further developed the whole application.

# Mid-Level Objective

## 1. Executive Summary & Intent

**Role & Objective:** I am acting as the part-time Frontend Tech-Lead for the "Naiton Business Suite," a large-scale enterprise application. My immediate intent is to build an **MVP Proof of Concept (PoC)** to showcase our chosen frontend architecture to the CTO and stakeholders. Once approved, this PoC will serve as the foundation for the real project.

**The Product:** A unified business suite containing multiple high-level modules: Sales, WMS, CRM, Procurement, Production, Accounting, HRM, and FMS. Users log in once and access specific modules based on their profile permissions.

# Naiton Business Suite - Frontend Architecture & PoC Strategic Brief

## 1. Vision & Strategic Intent

As the Frontend Tech-Lead, my goal is to deliver a **high-performance, enterprise-grade Proof of Concept (PoC)** that balances rapid delivery with long-term scalability. This PoC validates the "Majestic Monolith" architecture—a single-app approach that minimizes infrastructure complexity while maintaining strict domain boundaries using Feature-Sliced Design (FSD).

## 2. Architecture Philosophy: The "Majestic Monolith"

To support a team of 3 developers, we are avoiding the runtime complexity of microfrontends. Instead, we use a **Build-time Monorepo** (Turborepo) to share a standardized, pre-built UI Kit, while keeping the core application logic in a single, well-structured codebase (`apps/naiton`).

### Key Pillars:

- **FSD (Feature-Sliced Design):** We enforce a strict hierarchy (Shared -> Entities -> Features -> Widgets -> Pages -> App) to prevent spaghetti code and ensure that "Sales" logic never accidentally leaks into "CRM" logic.
- **Layout Engine (Nested Persistence):** - **Auth Layer:** Zero layout, focused on high-conversion login.
  - **Outer Layer (Suite Shell):** Persistent `AppNavbar` providing high-level module switching.
  - **Inner Layer (Domain Shell):** Persistent `Sidebar` providing module-specific navigation.
  - **The Goal:** Seamless transitions. Switching modules (via Navbar) or pages (via Sidebar) must never trigger a re-render of the parent layouts, maintaining UI state and performance.
- **Performance:** Utilizing **React Router v7** and **Vite** for strict route-based code splitting. High-level modules are only downloaded when accessed, optimizing FCP and TTFB.

## 3. Technology Stack & Tooling

- **Framework:** React + TypeScript + Vite.
- **Routing:** `react-router` (v7) with data-loaders and `lazy` loading.
- **State Management:** - **Zustand:** Lightweight client-side state (Auth, UI toggles, Global Search).
  - **TanStack Query:** Robust server-state management (Caching, Retries, Sync).
- **Styling:** **Tailwind CSS v4+** via PostCSS. A pure CSS-driven approach for maximum performance and future-proofing.
- **UI Library:** A custom, shadcn-based enterprise kit (simulated as a local package).
- Form library: react-hook-form and react-hook-form-resolvers with zod
- **The "Rust-Speed" Toolchain:** Using `oxlint` for linting and `oxfmt` for formatting to provide near-instant developer feedback loops.

## 4. Testing Strategy: The Pyramid

We ensure reliability through three distinct layers:

1. **Unit Testing:** `Vitest` for isolated business logic and utility functions.
2. **Integration Testing:** `React Testing Library (RTL)` to verify that features and widgets interact correctly with our state (Zustand/Query) and the Mock API.
3. **E2E Testing:** `Playwright` to validate the "Golden Path" (Login -> Dashboard -> Sales Module -> Order Creation).

## 5. Deployment & Versioning

Versioning is decoupled from the frontend code. We use a **"Frozen Snapshot"** strategy where builds are stored in versioned directories (e.g., `/v1.0.0/`). Infrastructure (Nginx) serves the correct version based on user session cookies, keeping the code clean and focused on the latest feature set.

## Implementation Notes

# Context

Expert Frontend Architect. Build a PoC for the "Naiton Business Suite" monorepo.

# Constraints

- Architecture: Feature-Sliced Design (FSD).
- Monorepo: pnpm + Turborepo. Root package.json runs all tasks via turbo.
- App: `apps/naiton` (Vite + React).
- UI-Kit: `packages/ui-kit` (Custom shadcn-based lib, Tailwind v4 + PostCSS).
- Tooling: oxlint (linting), oxfmt (formatting).
- Testing: Vitest (unit) and React Testing Library (integration). Setup Playwright config.
- only lastes version should be used for all dependencies

# Routing & Layouts

1. **Auth Page:** `/login` (Standalone).
2. **Outer Layout:** Persistent `AppNavbar`.
3. **Inner Layout (Shared by Modules):** Persistent `Sidebar`.
4. **Flow:** Auth -> Dashboard (Landing). Navbar links navigate to `/sales`, `/crm`, etc.
5. **Persistence:** Navigating within/between modules MUST NOT re-render the Navbar or Sidebar. Use React Router v7 `Outlet` and `lazy` loading for all modules.

# Implementation Steps

1. **Setup Tooling:** Configure the root and apps with `oxlint`, `oxfmt`, and `vitest`.
2. **UI-Kit:** Build the `packages/ui-kit` with Tailwind v4 (CSS theme variables).
3. **FSD Structure:**
   - `shared/api`: Mock API with delayed Promises.
   - `features/auth`: Zustand store for session.
   - `app/`: Router v7 definition with the nested layout structure.(use 'react-router' package not 'react-router-dom')
4. **Testing:** Leverage 'test' folder structure in apps/dashboard/tests for integration test and e2e tests setup
5. **Visuals:** Reference design images for the Sales/CRM dashboards. Use shadcn-based tables and sidebars.

# Output

Scaffold the complete workspace. Ensure `pnpm format` (using oxfmt) runs successfully. The app must demonstrate lazy-loading of the Sales and CRM modules within the persistent layout shells.

## Context

- apps/dashboard/.env.prod
- apps/dashboard/README.md
- apps/dashboard/src/shared/api/api-helper-hooks/useCreateMutation.ts
- apps/dashboard/src/shared/api/api-helper-hooks/useEditMutation.ts
- apps/dashboard/src/shared/api/api-helper-hooks/useFetchQueries.ts
- apps/dashboard/src/shared/api/api-helper-hooks/useDeleteMutation.ts
- apps/dashboard/src/shared/api/api.ts
- apps/site/source/shared/hooks/useRHForm/useRHForm.ts
- apps/site/source/shared/types/requests.types.ts
- apps/dashboard/src/shared/hooks/useToastNotif/useToastNotif.ts
- apps/dashboard/src/app/providers/router/components/AppRouter/AppRouter.tsx

## Low-Level Tasks

0. The architecture should mirror the current "apps/dashboard" architecture. Refer to Readme.md file in "apps/dashboard" folder for more details.
1. Routing should also mimic the how routing is configured in 'apps/dashboard'. Entry point for router is AppRouter.tsx file.
2. Api helper hooks should be created as it is in 'apps/dashboard/src/shared/api/api-helper-hooks' folder. Use the same logic as in the current 'apps/dashboard/src/shared/api/api-helper-hooks' folder.
3. form handling should be done using 'react-hook-form' and 'react-hook-form-resolvers' libraries. Use the same logic as in the current 'apps/dashboard/src/shared/hooks/useRHForm' folder.
