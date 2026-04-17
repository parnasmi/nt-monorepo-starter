# Naiton Business Suite — Frontend PoC

Enterprise-grade React SPA following the "Majestic Monolith" architecture with Feature-Sliced Design (FSD).

## Stack

| Concern   | Choice                                        |
| --------- | --------------------------------------------- |
| Framework | React 19 + TypeScript 5.8 + Vite 6            |
| Monorepo  | pnpm workspaces + Turborepo                   |
| Routing   | react-router v7                               |
| State     | Zustand (client) + TanStack Query v5 (server) |
| Styling   | Tailwind CSS v4                               |
| Linting   | oxlint + oxfmt (+ prettier fallback)          |
| Testing   | Vitest + RTL + Playwright                     |

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

### Phase 4 — App Scaffold (`apps/naiton`) ✅

Created the initial Vite app scaffold in `apps/naiton/` and installed the Phase 4 dependency set:

- **Workspace app manifest**: `apps/naiton/package.json` with Vite, build, lint, Vitest, and Playwright scripts plus runtime/dev dependencies.
- **TypeScript setup**: `tsconfig.json`, `tsconfig.app.json`, and `tsconfig.node.json` with `@/*` and `@repo/ui-kit/*` aliases.
- **Bundler/env setup**: `vite.config.ts`, `.env`, `.env.prod`, `.env.beta`, and `config/env/env.config.ts`.
- **Bootstrap files**: `index.html`, `src/main.tsx`, `src/App.tsx`, `src/app/styles/index.css`, and `src/vite-env.d.ts`.
- **Router placeholder**: `src/app/providers/router/AppRouter.tsx` plus barrel export at `src/app/providers/router/index.ts`.
- **Test config stubs**: `vitest.config.ts`, `vitest.integration.config.mts`, and `playwright.config.ts`.
- Verification completed: `pnpm --filter naiton check-types` passes, `pnpm --filter naiton build` passes, and `pnpm --filter naiton dev` boots on `http://localhost:5175`.

### Phase 5 — Rust-Speed Tooling (oxlint + oxfmt + Husky) ✅

Configured workspace-wide fast linting/formatting and pre-commit enforcement:

- **Root tooling**: added `oxlint` and `oxfmt` as dev dependencies, created `oxlint.json`, and kept `pnpm format` pointed at `oxfmt` with Prettier as fallback.
- **Turbo task coverage**: added a `format` task to `turbo.json` and added the missing `format` script to `packages/ui-kit/package.json` so both workspace packages expose consistent tooling commands.
- **Git hook enforcement**: added root `lint-staged` config plus `.husky/pre-commit` that runs `pnpm lint-staged`.
- **Verification completed**: `pnpm lint` passes across `@repo/ui-kit` and `naiton`, `pnpm format` exits 0, and a staged invalid JS file correctly fails the pre-commit hook.
- **Implementation note**: the plan’s older `@oxlint/oxfmt` package name was updated in practice to the current official `oxfmt` package.

### Phase 6 — FSD Shared Layer (API, Hooks, Types, Store, i18n) ✅

Built the `apps/naiton/src/shared/` foundation used by upcoming auth, layout, and feature phases:

- **Types and constants**: added `requests.types.ts`, `notification.types.ts`, `localstorage.const.ts`, `router.const.ts`, and `endpoints.const.ts`.
- **Utilities**: added SSR-safe `storage`, `axiosErrorHandler`, and `getAbsolutePath`.
- **Zustand store**: created a single bound store with `auth`, `meta`, and `module-ui` slices, development-only devtools, selector hooks, localStorage hydration/persistence, and unit tests for each slice.
- **API layer**: added `shared/api/api.ts`, barrel exports, and helper hooks for fetch/create/edit/delete patterns. `apiSubscribe` is ready for `PublicProvider` wiring in Phase 8.
- **Shared hooks**: added `useToastNotif`, `useRhForm`, and `useRoutingObjects`.
- **i18n**: scaffolded `shared/config/i18n/i18n.ts`, bootstrapped it in `src/main.tsx`, and added seed locale JSON files under `public/locales/uz` and `public/locales/ru`.
- **Test config**: updated both Vitest configs to resolve `@` and `@/config` aliases.

Verification completed:

- `pnpm --filter naiton format`
- `pnpm --filter naiton check-types`
- `pnpm --filter naiton exec vitest run src/shared/store/use-auth-store/use-auth-store.test.ts src/shared/store/use-meta-store/use-meta-store.test.ts src/shared/store/use-module-ui-store/use-module-ui-store.test.ts`

### Phase 7 — Mock API Layer (MSW) ✅

Added the offline mock API layer for the upcoming auth and module pages:

- Installed `msw`, generated `apps/naiton/public/mockServiceWorker.js`, and recorded the worker directory in `apps/naiton/package.json`.
- Added `src/shared/api/mocks/handlers.ts` with deterministic delayed handlers for login, profile, sales orders, and CRM leads.
- Added `src/shared/api/mocks/browser.ts` and updated `src/main.tsx` to start the worker only in development before rendering React.
- Important implementation detail: handlers normalize the current `envConfig.API_ROOT` path, so they match the existing dev base URL `http://localhost:3000/api` instead of assuming a bare `/v1/*` root.
- Follow-up improvement: MSW is now toggleable via `VITE_USE_MSW`, with `pnpm --filter naiton dev:mock` enabling it and `pnpm --filter naiton dev:real` explicitly disabling/stopping it in dev.

Verification completed:

- `pnpm --filter naiton format`
- `pnpm --filter naiton check-types`
- `pnpm --filter naiton build`
- `pnpm --filter naiton dev`
