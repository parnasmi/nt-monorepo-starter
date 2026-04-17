# Naiton Business Suite — Frontend PoC

Enterprise-grade React SPA following the "Majestic Monolith" architecture with Feature-Sliced Design (FSD).

## Stack

| Concern | Choice |
|---|---|
| Framework | React 19 + TypeScript 5.8 + Vite 6 |
| Monorepo | pnpm workspaces + Turborepo |
| Routing | react-router v7 |
| State | Zustand (client) + TanStack Query v5 (server) |
| Styling | Tailwind CSS v4 |
| Linting | oxlint + prettier |
| Testing | Vitest + RTL + Playwright |

## Architecture

- **FSD layers**: `app → pages → widgets → features → entities → shared`
- **Layout Engine**: AuthLayout → OuterLayout (AppNavbar) → InnerLayout (Sidebar) — nested persistent, no remounts on navigation
- **Code splitting**: each top-level module lazy-loaded via dynamic `import()`
- **Mock-first**: MSW v2 handlers simulate API until real backend is ready

## Phase completion status

### Phase 1 — Monorepo Root Bootstrap ✅

Initialized the pnpm + Turborepo workspace skeleton:
- Root `package.json` configured as `naiton-workspace` (private, pnpm@9, node >=18)
- `pnpm-workspace.yaml` declares `apps/*` and `packages/*`
- `turbo.json` with build, dev, lint, check-types, test pipelines
- Prettier configured with `prettier-plugin-tailwindcss` and `cva` support
- Dev dependencies: turbo, prettier, husky, lint-staged, typescript@5.8
