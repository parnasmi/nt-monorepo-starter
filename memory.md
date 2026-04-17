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

### Phase 2 — Shared Config Packages ⛔ Skipped

No shared `typescript-config` or `eslint-config` packages. Each app owns its own `tsconfig` files and `oxlint.json` directly. Config is co-located with `apps/naiton`; no `packages/typescript-config` or `packages/eslint-config` exist in the repo.

### Phase 3 — UI Kit Package (`packages/ui-kit`) ✅

Created the shared component library at `packages/ui-kit/`:
- **tsconfig.json** with `@/*` → `./src/*` alias (bundler module resolution, strict mode)
- **CSS layer**: `base-variables.css` (CSS custom properties), `theme.css` (`@theme` block), `base-shadcn.css` (html/body resets), `index.css` (imports all + shadcn sidebar/animation vars added by CLI)
- **`src/lib/utils.ts`**: `cn()` helper (clsx + tailwind-merge)
- **23 shadcn components** in `src/shadcn/ui/`: accordion, alert, avatar, badge, button, checkbox, dialog, dropdown-menu, form, input, label, radio-group, scroll-area, select, separator, sheet, sidebar, skeleton, spinner (extended with `size`/`show`), table, tabs, tooltip
- **`src/hooks/use-mobile.tsx`**: required by sidebar
- **Shared UI**: `PageLoader.tsx`, `Stack.tsx`, `DataTable.tsx` (TanStack Table v8 + pagination), `ErrorBoundaryWrapper.tsx` (react-error-boundary + location resetKeys)
- **Type declarations**: `css-modules.d.ts`, `svg.d.ts`
- Both `pnpm --filter @repo/ui-kit build` and `check-types` exit 0.
- Key note: shadcn CLI places files into `@/` literal directory by default; they were moved manually to `src/`.
