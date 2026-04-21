# Naiton Business Suite — Frontend PoC

Enterprise-grade React SPA following the "Majestic Monolith" architecture with FSD-inspired conventions (not strict FSD layering).

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

- **Architecture policy (updated April 21, 2026)**: keep selected FSD principles, but do not enforce strict FSD folder layers.
- **Folder strategy**: no `widgets`, `features`, or `entities` folders; keep components close to where they are used.
- **Reusable components**: place project-wide reusable UI in `src/shared/components`.
- **Primary app structure**: `app → pages → shared` (plus root support files like `main.tsx`, `App.tsx`, `test`).
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

### Phase 8 — Layout Engine + Router v7 ✅

Wired the real shell and routing system for the Naiton PoC:

- Added `PublicProvider` and `AuthProvider` so TanStack Query, axios header sync, profile hydration, and auth-route redirects now sit above the app router.
- Replaced the placeholder router with nested persistent layouts: `AuthLayout` for `/auth/*`, `OuterLayout` for the suite navbar, and `InnerLayout` for the module sidebar.
- Added `RequireAuth`, `ScrollContainer`, lazy `routes.tsx`, and `AppRouter` so `/` redirects to `/auth/login` and top-level modules load as separate chunks.
- Built the reference-inspired shell UI: green suite navbar, module-aware sidebar, styled auth screen, and support pages for forbidden/not-found.
- Added initial lazy page targets for dashboard, sales, CRM, accounting, FMS, WMS, procurement, production, and HRM. These are layout/demo shells; Phase 9 should replace the auth placeholder with the real login flow, and Phase 10 should wire live module data/forms.
- Normalized internal `@repo/ui-kit` import paths to relative imports so the app can consume the shared package source directly without alias-resolution issues.

Verification completed:

- `pnpm --filter @repo/ui-kit check-types`
- `pnpm --filter @repo/ui-kit format`
- `pnpm --filter naiton check-types`
- `pnpm --filter naiton format`
- `pnpm --filter naiton lint`
- `pnpm --filter naiton build`

### Phase 9 — Auth Feature & Login Flow ✅

Completed the login flow on top of the Phase 8 shell:

- Added `src/features/auth/` with feature-level auth selectors/actions, a validated `LoginForm`, and a logout route component.
- Replaced the placeholder login screen with a real RHF + Zod form that posts to the MSW login endpoint, stores the session through the shared auth slice, sets the CSRF token, and redirects to `/app/dashboard`.
- Registered `/app/logout` in the router and wired the navbar profile menu to it so logout clears both Zustand auth state and React Query cache before returning to `/auth/login`.
- Expanded `public/locales/{uz,ru}/auth.json` with the strings required by the live login UI and validation states.
- Refreshed leftover placeholder copy in the register page and sidebar footer so the app no longer references Phase 8 as “next”.

Verification completed:

- `pnpm --filter naiton format`
- `pnpm --filter naiton check-types`
- `pnpm --filter naiton lint`
- `pnpm --filter naiton build`

### Phase 10 — Module Pages (Dashboard, Sales, CRM) ✅

Completed the first real module workspaces on top of the persistent shell:

- Added a reusable `Card` primitive to `@repo/ui-kit` and rebuilt the dashboard as a static KPI landing page using shared card components instead of local-only shells.
- Reworked `SalesPage` to fetch 50 mock orders from `/v1/sales/orders` through `useFetchQueries`, render them in `DataTable`, support client-side search, and create orders through a RHF + Zod dialog backed by `useCreateMutation`.
- Reworked `CrmPage` with the same query/mutation pattern for `/v1/crm/leads`, including a lead creation dialog and client-side filtering over 50 mock rows.
- Extended the MSW handlers so sales orders and CRM leads now support both list and create flows, with newly created rows returned as `201` responses and inserted back into the refreshed tables.
- Updated sidebar route matching so module-specific navigation stays active for nested routes as the workspace grows.

Verification completed:

- `pnpm --filter @repo/ui-kit format`
- `pnpm --filter @repo/ui-kit check-types`
- `pnpm --filter @repo/ui-kit build`
- `pnpm --filter naiton format`
- `pnpm --filter naiton check-types`
- `pnpm --filter naiton lint`
- `pnpm --filter naiton build`

### Phase 11 — Testing Setup ✅

Completed the full testing pyramid for `apps/naiton` and tightened a few authenticated-shell issues uncovered during browser verification:

- Added dedicated unit/integration Vitest configs with React/SVGR plugins, DOM setup files, and an adapted integration harness for RTL (`ResizeObserver`, warning suppression, `react-i18next`/`sonner`/`nuqs` mocks).
- Added a sample unit test for `axiosErrorHandler` and an integration test for `LoginForm` that verifies request payload normalization, auth-store updates, and redirect behavior.
- Added Playwright setup and smoke coverage with saved auth state plus route-based API fixtures for auth/profile/sales/CRM so E2E can run against `dev:real` without relying on the browser MSW worker.
- Fixed authenticated-shell regressions uncovered by Playwright: `SidebarProvider` now wraps `AppNavbar`, the navbar module rail is left-aligned so Sales/CRM remain clickable, and MSW handlers now match absolute API roots while `dev:mock` uses `/api` for same-origin local mocking.

Verification completed:

- `pnpm --filter naiton format`
- `pnpm --filter naiton check-types`
- `pnpm --filter naiton test:run`
- `pnpm --filter naiton test:integration`
- `pnpm --filter naiton exec playwright install chromium`
- `pnpm --filter naiton test:e2e`

### Phase 12 — Final Verification & Golden Path

Wrapped the PoC with end-to-end verification and a few last-mile fixes so the golden path now matches the brief more closely:

- Re-ran the full required verification suite successfully: `pnpm install`, `pnpm lint`, `pnpm format`, `pnpm check-types`, `pnpm build`, `pnpm --filter naiton test:run`, `pnpm --filter naiton test:integration`, and `pnpm --filter naiton test:e2e`.
- Added success toasts to both `SalesPage` and `CrmPage` create dialogs so successful mutations now provide explicit user feedback during the demo flow.
- Expanded `apps/naiton/tests/e2e/smoke.spec.ts` so it clears saved auth state first, proves `/` redirects to `/auth/login`, logs in through the real form, verifies Sales and CRM lazy-load requests, checks that the persistent navbar/sidebar DOM nodes are reused across module switching, asserts the sales success toast, and confirms logout clears auth-related localStorage keys.
- Updated `apps/naiton/playwright.config.ts` to accept `PLAYWRIGHT_BASE_URL` and `PLAYWRIGHT_WEB_SERVER_COMMAND`, which let the same Playwright suite verify both the dev server and the built preview without duplicating config.
- Verified the built preview with Playwright as well. The preview run loaded without runtime errors and observed the hashed lazy chunks `sales-B2JtURyq.js` and `crm-CWW3WjQo.js`.
- Remaining manual-only follow-up: React DevTools Profiler and Lighthouse were not available in this terminal environment, so those two checklist items in `naiton-plan.md` remain intentionally unchecked even though the underlying navigation/no-remount behavior is now covered by browser automation.
