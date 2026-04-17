# Naiton Business Suite — Phased Scaffolding Plan

> **Role of this document**: A self-contained, phased build plan for an AI coding agent to scaffold the **Naiton Business Suite** frontend PoC from scratch. Each numbered phase is designed to be executed independently in a fresh conversation. Phases produce checkable artifacts; later phases depend on earlier phases only through files on disk.
>
> **`deps/` folder**: Contains reference implementations for files that are imported by code examples in this plan but are not fully inlined. Each dep file has a header comment showing source, target path, and adaptation notes. Copy and adapt these when a phase references them.

---

## 0. Stack & Key Decisions (Preamble — read before any phase)

### 0.1 Technology Stack (always latest stable at time of install)

| Concern | Choice |
|---|---|
| Language | TypeScript 5.8+ (strict) |
| Framework | React 19 |
| Bundler | Vite 6+ |
| Monorepo | pnpm workspaces + Turborepo |
| Routing | `react-router` v7 (**NOT** `react-router-dom`) |
| Client state | Zustand |
| Server state | TanStack Query v5 |
| Forms | react-hook-form + @hookform/resolvers + zod |
| HTTP | axios |
| Toasts | sonner |
| i18n | react-i18next + i18next-http-backend + i18next-browser-languagedetector |
| Styling | Tailwind CSS v4 (CSS-driven, `@tailwindcss/postcss` + `@tailwindcss/vite`) |
| UI Kit | Custom `@repo/ui-kit` package (shadcn-based) |
| Linter | **oxlint** (Rust-speed) |
| Formatter | **oxfmt** (Rust-speed) + `prettier-plugin-tailwindcss` fallback when oxfmt cannot handle JSX/TSX yet |
| Unit test | Vitest + jsdom |
| Integration test | Vitest + @testing-library/react + @testing-library/jest-dom + @testing-library/user-event |
| E2E test | Playwright |
| Hooks | husky + lint-staged |
| API mocking | MSW (Mock Service Worker) v2 |

### 0.2 Architectural Decisions

1. **Majestic Monolith** — a single Vite SPA (`apps/naiton`) instead of microfrontends. All business modules (Sales, WMS, CRM, Procurement, Production, Accounting, HRM, FMS) live in one app and share a **build-time** UI Kit.
2. **Feature-Sliced Design (FSD)** strict layer ordering: `app → pages → widgets → features → entities → shared`. Never import upward. Public API per slice via `index.ts`.
3. **Nested persistent layouts (Layout Engine)**:
   - **AuthLayout** — standalone, zero chrome, for `/login`.
   - **OuterLayout (SuiteShell)** — persistent `AppNavbar` for module switching.
   - **InnerLayout (DomainShell)** — persistent `Sidebar` for module-specific nav.
   - Transitions between modules/pages MUST NOT remount Navbar or Sidebar.
4. **Route-based code splitting** — each top-level module (`/sales`, `/crm`, etc.) is lazy-loaded via dynamic `import()` inside `routes.tsx`, wrapped in `<Suspense fallback={<PageLoader />}>`.
5. **Frozen-Snapshot versioning** — builds stored under `/v{version}/` folders; Nginx selects version via session cookie. Frontend code does not branch on version.
6. **Mock API first** — Phase 8 scaffolds MSW handlers with delayed Promises for login/profile/sales/crm; real backend plugs in later by turning MSW off.

### 0.3 Hard Constraints

- Use `react-router` v7 (**NEVER** `react-router-dom`).
- Only **latest** versions of all dependencies (`pnpm add <pkg>@latest`).
- Mirror `apps/dashboard` architecture from the reference repo exactly (API helper hooks, router entry point, RHF hook).
- `pnpm format` (oxfmt) must exit 0 at the end of every phase.
- Dev server port: **5175** (dashboard uses 5174 — avoid collision if running side-by-side).

### 0.4 Reference Dependencies (`deps/` folder)

The `deps/` folder alongside this plan contains battle-tested reference implementations. Each file has header comments showing the **source** (original repo path), **target** (where to place it in `apps/naiton`), and **adaptation notes**.

| Dep file | Target path in `apps/naiton` | Used in Phase |
|---|---|---|
| `deps/storage.ts` | `src/shared/lib/storage/index.ts` | 6 |
| `deps/notification.types.ts` | `src/shared/types/notification.types.ts` | 6 |
| `deps/useRoutingObjects.ts` | `src/shared/hooks/useRoutingObjects/useRoutingObjects.ts` | 6 |
| `deps/getAbsolutePath.ts` | `src/shared/lib/utils/getAbsolutePath/getAbsolutePath.ts` | 6 |
| `deps/PublicProvider.tsx` | `src/app/providers/publicProvider/PublicProvider.tsx` | 8 |
| `deps/RequireAuth.tsx` | `src/app/providers/router/components/RequireAuth.tsx` | 8 |
| `deps/ScrollContainer.tsx` | `src/app/providers/router/components/ScrollContainer/ScrollContainer.tsx` | 8 |
| `deps/PageLoader.tsx` | `packages/ui-kit/src/shared/ui/PageLoader.tsx` or `src/shared/ui/PageLoader/PageLoader.tsx` | 3, 8 |
| `deps/ErrorBoundaryWrapper.tsx` | `src/shared/lib/error-boundary/ErrorBoundaryWrapper.tsx` | 3, 8 |
| `deps/integration-setup.ts` | `tests/integration/setup.ts` | 11 |

**How to use**: When a phase task says "reference implementation in `deps/X`", copy that file to the target path and adapt per the header comments. Do not use deps as-is without reading the adaptation notes.

### 0.5 Target Directory Layout (final state after all phases)

```
<workspace-root>/
├── apps/
│   └── naiton/
│       ├── config/env/env.config.ts
│       ├── public/locales/{uz,ru}/{common,auth,sales,crm}.json
│       ├── src/
│       │   ├── app/
│       │   │   ├── layouts/          # AuthLayout, OuterLayout, InnerLayout
│       │   │   ├── providers/        # publicProvider, authProvider, router
│       │   │   └── styles/index.css
│       │   ├── pages/                # dashboard, sales, crm, login, notfound, forbidden
│       │   ├── widgets/              # app-navbar, app-sidebar
│       │   ├── features/             # auth
│       │   ├── entities/             # user
│       │   └── shared/
│       │       ├── api/              # api.ts, api-helper-hooks/, mocks/
│       │       ├── config/i18n/
│       │       ├── const/            # router.const.ts, endpoints.const.ts, localstorage.const.ts
│       │       ├── hooks/            # useRHForm, useToastNotif, useRoutingObjects
│       │       ├── lib/              # storage, utils
│       │       ├── store/            # zustand bound store
│       │       ├── types/            # requests.types, notification.types
│       │       └── ui/               # PageLoader, ErrorBoundaryWrapper, Stack
│       ├── tests/
│       │   ├── e2e/                  # playwright
│       │   └── integration/          # vitest + RTL
│       ├── index.html
│       ├── package.json
│       ├── playwright.config.ts
│       ├── tsconfig.app.json
│       ├── tsconfig.json
│       ├── tsconfig.node.json
│       ├── vite.config.ts
│       ├── vitest.config.ts
│       └── vitest.integration.config.mts
├── packages/
│   └── ui-kit/                       # Tailwind v4 + shadcn components
├── .prettierrc.json
├── .prettierignore
├── oxlint.json
├── package.json                      # root workspace
├── pnpm-workspace.yaml
└── turbo.json
```

---

## Phase 1 — Monorepo Root Bootstrap

**Goal**: Create the pnpm + Turborepo workspace skeleton so apps and packages can be added.

**Prereqs**: Empty workspace directory with Node 18+ and pnpm 9+ installed.

### Tasks

- [x] Run `pnpm init` at workspace root; set `"name": "naiton-workspace"`, `"private": true`.
- [x] Add `packageManager: "pnpm@9.0.0"` and `engines.node: ">=18"` to root `package.json`.
- [x] Create `pnpm-workspace.yaml`:
  ```yaml
  packages:
    - 'apps/*'
    - 'packages/*'
  ```
- [x] Install dev dependencies at root: `pnpm add -Dw turbo prettier prettier-plugin-tailwindcss husky lint-staged typescript@5.8`.
- [x] Create `turbo.json`:
  ```json
  {
    "$schema": "https://turborepo.com/schema.json",
    "ui": "tui",
    "tasks": {
      "build": {
        "dependsOn": ["^build"],
        "inputs": ["$TURBO_DEFAULT$", ".env*"],
        "outputs": ["dist/**"]
      },
      "build:prod": {
        "dependsOn": ["^build"],
        "inputs": ["$TURBO_DEFAULT$", ".env*", ".env.prod"],
        "outputs": ["dist/**"],
        "env": ["NODE_ENV=production"]
      },
      "lint": { "dependsOn": ["^lint"] },
      "check-types": { "dependsOn": ["^check-types"] },
      "test": { "dependsOn": ["^build"] },
      "dev": { "cache": false, "persistent": true }
    }
  }
  ```
- [x] Add root scripts to `package.json`:
  ```json
  {
    "scripts": {
      "build": "turbo run build",
      "dev": "turbo run dev",
      "lint": "turbo run lint",
      "format": "oxfmt . || prettier --write \"**/*.{ts,tsx,md,json}\"",
      "check-types": "turbo run check-types",
      "prepare": "husky"
    }
  }
  ```
- [x] Create `.prettierrc.json`:
  ```json
  {
    "semi": true,
    "singleQuote": true,
    "plugins": ["prettier-plugin-tailwindcss"],
    "tailwindFunctions": ["cva"]
  }
  ```
- [x] Create `.prettierignore` (ignore `node_modules`, `dist`, `.turbo`, `coverage`, `public`).
- [x] Create `.gitignore` (standard Node + Vite + IDE).
- [x] Initialise `git init` and make first commit: `chore: bootstrap monorepo`.

**Verification**

- `pnpm install` completes without error.
- `pnpm turbo run build` returns "no tasks to run" (no packages yet) — OK.
- `ls` shows `package.json`, `pnpm-workspace.yaml`, `turbo.json`, `.prettierrc.json`.

### Files changed

- `package.json` — root workspace manifest: name `naiton-workspace`, private, `packageManager`, `engines`, and all `turbo run` scripts.
- `pnpm-workspace.yaml` — declares `apps/*` and `packages/*` as workspace members.
- `turbo.json` — Turborepo pipeline: build, build:prod, lint, check-types, test, dev tasks.
- `.prettierrc.json` — Prettier config: semi, singleQuote, tailwindcss plugin, `cva` tailwind function.
- `.prettierignore` — ignores node_modules, dist, .turbo, coverage, public.
- `.gitignore` — standard Node/Vite/IDE ignore rules (pre-existed, not modified).
- `pnpm-lock.yaml` — lockfile generated by `pnpm install` with turbo, prettier, husky, lint-staged, typescript@5.8.

---

## Phase 2 — Shared Config Packages

**Decision**: Skipped — no shared `typescript-config` or `eslint-config` packages. Each app owns its own `tsconfig` files and `oxlint.json`. This keeps config co-located with the app and avoids indirection for a single-app monorepo.

**Status**: ✅ Intentionally omitted.

---

## Phase 3 — UI Kit Package (`packages/ui-kit`)

**Goal**: Produce the shared component library used by all apps. Tailwind v4 CSS-driven, shadcn-based primitives.

**Prereqs**: Phase 2 complete.

### Tasks

- [x] Create `packages/ui-kit/package.json` (name `@repo/ui-kit`, private, `tsc -b` build). Mirror the `exports` map pattern:
  ```json
  {
    "name": "@repo/ui-kit",
    "version": "0.0.0",
    "private": true,
    "exports": {
      "./tailwind-postcss": "./postcss.config.mjs",
      "./base-variables.css": "./src/styles/base-variables.css",
      "./base-shadcn.css": "./src/styles/base-shadcn.css",
      "./index.css": "./src/styles/index.css",
      "./theme.css": "./src/styles/theme.css",
      "./shadcn/*": "./src/shadcn/ui/*.tsx",
      "./shared/*": "./src/shared/*",
      "./shared/ui/*": "./src/shared/ui/*.tsx",
      "./shared/lib/*": "./src/shared/lib/*.ts",
      "./shared/icons/*": "./src/shared/assets/icons/*.tsx",
      "./lib/*": "./src/shared/lib/*.ts"
    },
    "scripts": {
      "lint": "oxlint .",
      "check-types": "tsc --noEmit",
      "build": "tsc -b",
      "dev": "tsc --watch --preserveWatchOutput"
    }
  }
  ```
- [x] Install dependencies: `react@latest`, `react-dom@latest`, `react-router@latest`, `react-hook-form@latest`, `@hookform/resolvers@latest`, `zod@latest`, `react-i18next@latest`, `tailwindcss@latest`, `@tailwindcss/postcss@latest`, `clsx`, `tailwind-merge`, `class-variance-authority`, `tw-animate-css`, `lucide-react`, `@tanstack/react-table`, and Radix UI primitives (`@radix-ui/react-dialog`, `...-dropdown-menu`, `...-select`, `...-checkbox`, `...-label`, `...-scroll-area`, `...-separator`, `...-tabs`, `...-tooltip`, `...-slot`, `...-avatar`, `...-accordion`, `...-radio-group`, `...-collapsible`).
- [x] Create `packages/ui-kit/postcss.config.mjs`:
  ```js
  export const postcssConfig = {
    plugins: { '@tailwindcss/postcss': {} },
  };
  ```
- [x] Create `src/styles/base-variables.css` (CSS custom properties: colors, radius, font sizes — define `--background`, `--foreground`, `--primary`, etc.).
- [x] Create `src/styles/theme.css` (`@theme` block with Naiton brand tokens).
- [x] Create `src/styles/base-shadcn.css` (shadcn defaults: `html`, `body`, `:root` fallbacks).
- [x] Create `src/styles/index.css` importing `base-variables.css`, `base-shadcn.css`, `theme.css`, and `@import "tailwindcss";`.
- [x] Create `src/lib/utils.ts` with `cn()` helper (clsx + tailwind-merge).
- [x] Scaffold shadcn components via `pnpm dlx shadcn@latest add button input label dialog dropdown-menu select checkbox radio-group scroll-area separator sheet sidebar table tabs tooltip form skeleton spinner badge accordion alert` — output to `src/shadcn/ui/`.
- [x] Create `src/shared/ui/PageLoader.tsx` — reference implementation in **`deps/PageLoader.tsx`**. Adapt the Spinner import to match your shadcn output.
- [x] Create `src/shared/ui/Stack.tsx` (flex column primitive).
- [x] Create `src/shared/ui/DataTable.tsx` (headless `@tanstack/react-table` + shadcn Table).
- [x] Create `src/shared/ui/ErrorBoundaryWrapper.tsx` — reference implementation in **`deps/ErrorBoundaryWrapper.tsx`**. Uses `react-error-boundary` with `resetKeys` on `location.pathname`.
- [x] Create `src/types/css-modules.d.ts` and `src/types/svg.d.ts` for SVG-as-React-component typing.

**Verification**

- `pnpm --filter @repo/ui-kit build` exits 0. ✅
- `pnpm --filter @repo/ui-kit check-types` exits 0. ✅
- Importing `@repo/ui-kit/shadcn/button` from a test script resolves.

### Files changed

- `packages/ui-kit/package.json` — workspace package manifest: name `@repo/ui-kit`, exports map for CSS/shadcn/shared, tsc build scripts.
- `packages/ui-kit/tsconfig.json` — TypeScript config with `@/*` → `./src/*` path alias; bundler module resolution; strict mode.
- `packages/ui-kit/postcss.config.mjs` — PostCSS config exporting `@tailwindcss/postcss` plugin.
- `packages/ui-kit/components.json` — shadcn CLI config: default style, CSS variables, aliases pointing to `@/shadcn/ui` and `@/lib/utils`.
- `packages/ui-kit/src/styles/base-variables.css` — CSS custom properties for all design tokens (colors, radius, bg-loader-overlay) in `:root` and `.dark`.
- `packages/ui-kit/src/styles/theme.css` — Tailwind v4 `@theme` block mapping CSS vars to `--color-*` and `--radius-*` tokens.
- `packages/ui-kit/src/styles/base-shadcn.css` — Base `html`/`body` resets using the design tokens.
- `packages/ui-kit/src/styles/index.css` — Root CSS entry: imports tailwindcss, base-variables, base-shadcn, theme; extended by shadcn CLI with sidebar vars and accordion animations.
- `packages/ui-kit/src/lib/utils.ts` — `cn()` helper combining `clsx` + `tailwind-merge`.
- `packages/ui-kit/src/shadcn/ui/*.tsx` — 23 shadcn components: accordion, alert, avatar, badge, button, checkbox, dialog, dropdown-menu, form, input, label, radio-group, scroll-area, select, separator, sheet, sidebar, skeleton, spinner (extended with `size`/`show` props), table, tabs, tooltip.
- `packages/ui-kit/src/hooks/use-mobile.tsx` — `useIsMobile` hook required by sidebar component.
- `packages/ui-kit/src/shared/ui/PageLoader.tsx` — Full-screen overlay loader using the Spinner component.
- `packages/ui-kit/src/shared/ui/Stack.tsx` — Flex-column primitive with configurable `gap`.
- `packages/ui-kit/src/shared/ui/DataTable.tsx` — Headless TanStack Table v8 + shadcn Table with pagination controls.
- `packages/ui-kit/src/shared/ui/ErrorBoundaryWrapper.tsx` — react-error-boundary wrapper with `resetKeys=[location.pathname]` and translated fallback UI.
- `packages/ui-kit/src/types/css-modules.d.ts` — Module declarations for `*.module.css` and `*.module.scss`.
- `packages/ui-kit/src/types/svg.d.ts` — SVG-as-React-component type declarations.

---

## Phase 4 — App Scaffold `apps/naiton`

**Goal**: Create the Vite + React + TS application skeleton with aliases and env config.

**Prereqs**: Phases 1–3 complete.

### Tasks

- [x] Create `apps/naiton/package.json` (name `naiton`, private, type `module`). Scripts:
  ```json
  {
    "scripts": {
      "dev": "vite --host --port 5175",
      "build": "vite build",
      "build:ts": "tsc -b && vite build",
      "preview": "vite preview",
      "build:prod": "env-cmd -f .env.prod cross-env NODE_ENV=production pnpm run build",
      "build:beta": "env-cmd -f .env.beta cross-env NODE_ENV=production pnpm run build",
      "lint": "oxlint .",
      "format": "oxfmt .",
      "check-types": "tsc -b --noEmit",
      "test": "vitest",
      "test:run": "vitest run",
      "test:coverage": "vitest run --coverage",
      "test:integration": "vitest run --config vitest.integration.config.mts",
      "test:integration:watch": "vitest --config vitest.integration.config.mts",
      "test:e2e": "playwright test --config playwright.config.ts",
      "test:e2e:ui": "playwright test --config playwright.config.ts --ui"
    }
  }
  ```
- [x] Install runtime deps: `react@latest react-dom@latest react-router@latest @tanstack/react-query@latest @tanstack/react-query-devtools@latest zustand@latest react-hook-form@latest @hookform/resolvers@latest zod@latest axios@latest sonner@latest react-i18next@latest i18next@latest i18next-http-backend@latest i18next-browser-languagedetector@latest react-error-boundary@latest clsx tailwind-merge class-variance-authority lucide-react nuqs date-fns usehooks-ts use-debounce next-themes vaul @repo/ui-kit@workspace:*`.
- [x] Install dev deps: `vite@latest @vitejs/plugin-react@latest @tailwindcss/vite@latest tailwindcss@latest vite-plugin-svgr@latest vitest@latest @vitest/coverage-v8@latest jsdom@latest @testing-library/react@latest @testing-library/jest-dom@latest @testing-library/user-event@latest @playwright/test@latest msw@latest env-cmd cross-env typescript@5.8 @types/react@latest @types/react-dom@latest @types/node@latest oxlint@latest`.
- [x] Create `tsconfig.json`:
  ```json
  {
    "files": [],
    "references": [
      { "path": "./tsconfig.app.json" },
      { "path": "./tsconfig.node.json" }
    ],
    "compilerOptions": {
      "baseUrl": ".",
      "paths": {
        "@/*": ["./src/*"],
        "@repo/ui-kit/*": ["../../packages/ui-kit/src/*"]
      }
    }
  }
  ```
- [x] Create `tsconfig.app.json`:
  ```json
  {
    "compilerOptions": {
      "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
      "target": "ES2022",
      "useDefineForClassFields": true,
      "lib": ["ES2022", "DOM", "DOM.Iterable"],
      "module": "ESNext",
      "skipLibCheck": true,
      "allowJs": true,
      "moduleResolution": "bundler",
      "allowImportingTsExtensions": true,
      "isolatedModules": true,
      "moduleDetection": "force",
      "noEmit": true,
      "jsx": "react-jsx",
      "strict": true,
      "noUnusedLocals": true,
      "noUnusedParameters": true,
      "noFallthroughCasesInSwitch": true,
      "noUncheckedSideEffectImports": true,
      "types": ["vitest/globals"],
      "baseUrl": ".",
      "paths": {
        "@/*": ["./src/*"],
        "@/config/*": ["./config/*"]
      }
    },
    "include": ["src", "config", "tests"]
  }
  ```
- [x] Create `tsconfig.node.json` (for Vite config files).
- [x] Create `vite.config.ts` (mirrors dashboard):
  ```ts
  import { defineConfig } from 'vite';
  import viteReact from '@vitejs/plugin-react';
  import tailwindcss from '@tailwindcss/vite';
  import svgr from 'vite-plugin-svgr';

  export default defineConfig(({ mode }) => ({
    build: { sourcemap: true },
    plugins: [
      svgr({ svgrOptions: { exportType: 'default' } }),
      viteReact(),
      tailwindcss(),
    ],
    clearScreen: false,
    resolve: {
      alias: [
        { find: '@/config', replacement: '/config' },
        { find: '@', replacement: '/src' },
      ],
    },
    define: {
      __IS_DEV__: JSON.stringify(mode === 'development'),
      __PROJECT__: JSON.stringify('frontend'),
      'import.meta.env.VITE_APP_VERSION': JSON.stringify('1.0.0'),
    },
    server: { port: 5175 },
  }));
  ```
- [x] Create env files:
  - `.env` (dev defaults)
  - `.env.prod`
  - `.env.beta`
  - `config/env/env.config.ts`:
    ```ts
    type EnvConfig = {
      API_ROOT: string;
      APP_VERSION: string;
    };
    export const envConfig: EnvConfig = {
      API_ROOT: import.meta.env.VITE_PUBLIC_API_BASE_URL as string,
      APP_VERSION: import.meta.env.VITE_PUBLIC_APP_VERSION as string,
    };
    ```
- [x] Create `index.html` with `<div id="root">` and `<script type="module" src="/src/main.tsx">`.
- [x] Create `src/main.tsx` (renders `<App />` inside `StrictMode` + `BrowserRouter`).
- [x] Create `src/App.tsx` (renders `<AppRouter />` — placeholder until Phase 8).
- [x] Create `src/app/styles/index.css`:
  ```css
  @import "@repo/ui-kit/index.css";
  ```

**Verification**

- `pnpm --filter naiton dev` starts on `http://localhost:5175` showing a blank page (no error).
- `pnpm --filter naiton check-types` exits 0.
- Tailwind classes render (add a test `<div class="bg-primary">` to `App.tsx` — should see brand color).

### Files changed

- `apps/naiton/package.json` — app workspace manifest with Vite, build, lint, test scripts and the installed Phase 4 dependencies.
- `apps/naiton/tsconfig.json` — project references plus `@/*` and `@repo/ui-kit/*` aliases.
- `apps/naiton/tsconfig.app.json` — strict browser-side TypeScript config for `src`, `config`, and `tests`.
- `apps/naiton/tsconfig.node.json` — TypeScript config for Vite, Vitest, and Playwright config files.
- `apps/naiton/vite.config.ts` — Vite setup with React, Tailwind v4, SVGR, aliases, defines, and port `5175`.
- `apps/naiton/.env` — local development API base URL and app version defaults.
- `apps/naiton/.env.prod` — production API base URL and app version defaults.
- `apps/naiton/.env.beta` — beta API base URL and app version defaults.
- `apps/naiton/config/env/env.config.ts` — typed env export for API root and app version.
- `apps/naiton/index.html` — root HTML shell that mounts `src/main.tsx` into `#root`.
- `apps/naiton/src/main.tsx` — React bootstrap with `StrictMode`, `BrowserRouter`, and global CSS import.
- `apps/naiton/src/App.tsx` — app entry component that renders `AppRouter`.
- `apps/naiton/src/app/providers/router/AppRouter.tsx` — placeholder router surface with a Tailwind-backed scaffold screen.
- `apps/naiton/src/app/providers/router/index.ts` — public router barrel export.
- `apps/naiton/src/app/styles/index.css` — imports the shared UI kit stylesheet.
- `apps/naiton/src/vite-env.d.ts` — Vite env typings for the `VITE_PUBLIC_*` variables.
- `apps/naiton/vitest.config.ts` — base Vitest config stub using `jsdom`.
- `apps/naiton/vitest.integration.config.mts` — integration-test Vitest config stub targeting `tests/integration`.
- `apps/naiton/playwright.config.ts` — Playwright config stub targeting `tests/e2e` with local base URL.
- `pnpm-lock.yaml` — lockfile updated for the new `naiton` workspace dependency graph.

---

## Phase 5 — Rust-Speed Tooling (oxlint + oxfmt + Husky)

**Goal**: Configure oxlint/oxfmt and Git hooks for near-instant feedback loops.

**Prereqs**: Phase 4 complete.

### Tasks

- [ ] Install at root: `pnpm add -Dw oxlint @oxlint/oxfmt`.
- [ ] Create `oxlint.json` at workspace root:
  ```json
  {
    "$schema": "https://raw.githubusercontent.com/oxc-project/oxc/main/npm/oxlint/configuration_schema.json",
    "categories": { "correctness": "error", "suspicious": "warn", "perf": "warn" },
    "rules": { "no-console": "warn" },
    "ignorePatterns": ["dist", "node_modules", ".turbo", "coverage", "public"]
  }
  ```
- [ ] Add `format` and `lint` turbo tasks to each workspace `package.json`.
- [ ] Initialise husky: `pnpm exec husky init`.
- [ ] Create `.husky/pre-commit`:
  ```sh
  pnpm lint-staged
  ```
- [ ] Add `lint-staged` config to root `package.json`:
  ```json
  {
    "lint-staged": {
      "*.{ts,tsx,js,jsx}": ["oxlint --fix", "oxfmt"],
      "*.{md,json,yaml,yml}": ["prettier --write"]
    }
  }
  ```

**Verification**

- `pnpm lint` exits 0 across all packages.
- `pnpm format` exits 0.
- A staged commit with a deliberate lint error fails pre-commit.

---

## Phase 6 — FSD Shared Layer (API, Hooks, Types, Store, i18n)

**Goal**: Build the foundational `shared/` layer. Copy verbatim-from-reference helpers where indicated; they are battle-tested.

**Prereqs**: Phase 4 complete.

### 6.1 — `shared/types/requests.types.ts` (verbatim)

- [ ] Create `apps/naiton/src/shared/types/requests.types.ts`:

```ts
export type GetRequestResponse<T> = {
  success: boolean;
  message: unknown;
  data: T;
  meta: null | {
    count: number;
    current_page: number;
    from: number;
    last_page: number;
    per_page: number;
    to: number;
    total: number;
  };
};

export type AuthRoutes = 'login' | 'register' | 'invitation' | 'myid';

export type TCompanyInfo = {
  company_name: string;
  owner_phone: string;
  inn: string;
  slug: string;
  route: AuthRoutes;
};

export type PostRequestResponse<T = null> = {
  success: boolean;
  message: unknown;
  data: T;
  meta: unknown[];
};

export type ChallengeResponseType = {
  success: boolean;
  message: string | null;
  data: {
    challenge: string;
    ttl: number;
    status: number;
    message: string;
  };
  meta: unknown[];
};

export type CompanyInfoResponse = {
  success: boolean;
  message: null | string;
  data: TCompanyInfo;
  meta: unknown[];
};

export type CompanyRequest = {
  hash?: string;
  inn?: string;
};

export type AllowedProducts = 'sales' | 'crm' | 'wms' | 'procurement' | 'production' | 'accounting' | 'hrm' | 'fms';

export type FormSubmitResponse = PostRequestResponse<LoginResponse>;

export type Session = {
  device: string;
  device_name: string;
  device_version: string;
};

export type FormSubmitRequest = {
  otp: string;
  phone: string;
  hash: string;
  session: Session;
};

export type LoginResponse = {
  token_type: 'Bearer';
  expires_in: number;
  access_token: string;
  refresh_token: string;
  companyTin: string;
  csrf: string;
  start_pay_flow: boolean;
  allowed: AllowedProducts[];
};

export type SubscriptionMeta = {
  allowed: AllowedProducts[];
  start_pay_flow: boolean;
};
```

### 6.2 — `shared/types/notification.types.ts`

- [ ] Create. Reference implementation in **`deps/notification.types.ts`** (dashboard's original uses `ToastT` from sonner). Either approach works — use this version for consistency with the dashboard:

```ts
import type { ExternalToast } from 'sonner';

export type SonnerToastOptions = ExternalToast;

export type ShowToastOptions = {
  type?: 'success' | 'info' | 'warning' | 'error';
  message?: string;
  toastOptions?: SonnerToastOptions;
};
```

### 6.3 — `shared/const/localstorage.const.ts`

- [ ] Create this file; final key list is authoritative in **section 6.6.5** (it's grouped with the Zustand slices that own each key). For now, create an empty file or stub — section 6.6.5 will fill it in.

### 6.4 — `shared/lib/storage/index.ts`

- [ ] Create by copying **`deps/storage.ts`** → `apps/naiton/src/shared/lib/storage/index.ts`. This is a typed wrapper around `localStorage` exposing `get(key)`, `set(key, value)`, `remove(key)` with SSR-safe `isBrowser` guard. Used by `api.ts`, auth store, and meta store.

### 6.5 — `shared/lib/utils/axiosErrorHandler/axiosErrorHandler.ts`

- [ ] Create a discriminated-union error wrapper used by `useCreateMutation`:

```ts
import axios from 'axios';

type AxiosErrorType<T> = { type: 'axios-error'; error: import('axios').AxiosError<T> };
type UnknownErrorType = { type: 'unknown'; error: unknown };

export function axiosErrorHandler<T>({
  error,
  callback,
}: {
  error: unknown;
  callback: (e: AxiosErrorType<T> | UnknownErrorType) => void;
}) {
  if (axios.isAxiosError<T, Record<string, unknown>>(error)) {
    callback({ type: 'axios-error', error });
  } else {
    callback({ type: 'unknown', error });
  }
}
```

### 6.6 — `shared/store/` (Zustand — Slice Pattern with DevTools)

**Approach**: Use Zustand's official [slice pattern](https://github.com/pmndrs/zustand/blob/main/docs/guides/slices-pattern.md) — each concern is a `StateCreator`, composed into a single bound store. DevTools middleware is enabled in development only. Auth + meta slices hydrate initial state from `localStorage` via the `storage` util so that reloads preserve session.

**Design rules**:

1. **One store, multiple slices**. Do not create separate `create()` calls per slice — that breaks cross-slice access and doubles subscription cost.
2. **Slice = `StateCreator<SliceState, [], [], SliceState>`**. Keep each slice file under ~100 lines; split if larger.
3. **Hydrate at module load**, not inside `useEffect`. Read `storage.get(KEY)` once and seed `initialState`.
4. **Naming**: `createXxxSlice` for factories, `XxxState` for interfaces, file per slice under a folder matching its hook name (`use-auth-store/use-auth-store.ts`).
5. **Persistence**: write-through on setters (e.g., `setAccessToken` calls `storage.set(KEY, token)` AND `set({ accessToken })`). Do **not** use the `persist` middleware — it serialises the entire state and deserialises on load, which prevents slice-level control.
6. **Cross-slice sync with axios**: `apiSubscribe(state)` from `shared/api/api.ts` is called once in `PublicProvider` (Phase 8.1) inside `useBoundStore.subscribe(...)`. This pattern keeps axios headers (Authorization, Company-Tin, X-Csrf-Token, Accept-Language) in sync with the auth + meta slices without prop-drilling.
7. **DevTools gated**: `devtools(..., { enabled: import.meta.env.MODE === 'development' })` — do not ship devtools bindings to production.
8. **Selectors over object destructuring in components**: `const token = useBoundStore(s => s.accessToken)` rerenders only when `accessToken` changes; destructuring the whole store causes a rerender on every slice change.

**Folder layout**

```
src/shared/store/
├── index.ts                           # bound store, composes slices
├── use-auth-store/
│   ├── use-auth-store.ts              # AuthState + createAuthSlice
│   └── use-auth-store.test.ts         # unit test
├── use-meta-store/
│   ├── use-meta-store.ts              # MetaState + createMetaSlice
│   └── use-meta-store.test.ts
└── use-module-ui-store/
    ├── use-module-ui-store.ts         # UI flags, modals, global spinners
    └── use-module-ui-store.test.ts
```

### 6.6.1 — `shared/store/use-auth-store/use-auth-store.ts`

- [ ] Create:

```ts
import { StateCreator } from 'zustand';
import {
  ACCESSTOKEN_LOCALSTORAGE_KEY,
  COMPANYINFO_LOCALSTORAGE_KEY,
  REFRESHTOKEN_LOCALSTORAGE_KEY,
} from '../../const/localstorage.const';
import storage from '../../lib/storage';
import { TCompanyInfo, AllowedProducts } from '../../types/requests.types';

export interface UserProfile {
  id: string | number;
  fullName: string;
  email?: string;
  phone?: string;
  role?: string;
  avatarUrl?: string;
}

export interface AuthState {
  // ----- state -----
  accessToken: string | null;
  refreshToken: string | null;
  csrfToken: string | null;
  profile: UserProfile | null;
  companyInfo: TCompanyInfo | null;
  allowedProducts: AllowedProducts[];
  isAuthenticated: boolean;

  // ----- actions -----
  setAccessToken: (token: string | null) => void;
  setRefreshToken: (token: string | null) => void;
  setCsrfToken: (token: string | null) => void;
  setProfile: (profile: UserProfile | null) => void;
  setCompanyInfo: (info: TCompanyInfo | null) => void;
  setAllowedProducts: (products: AllowedProducts[]) => void;
  login: (payload: {
    accessToken: string;
    refreshToken: string;
    allowed: AllowedProducts[];
  }) => void;
  reset: () => void;
}

const companyRaw = storage.get(COMPANYINFO_LOCALSTORAGE_KEY);
const initialCompany = companyRaw ? (JSON.parse(companyRaw) as TCompanyInfo) : null;

const initialState = {
  accessToken: storage.get(ACCESSTOKEN_LOCALSTORAGE_KEY) ?? null,
  refreshToken: storage.get(REFRESHTOKEN_LOCALSTORAGE_KEY) ?? null,
  csrfToken: null,
  profile: null,
  companyInfo: initialCompany,
  allowedProducts: [] as AllowedProducts[],
  isAuthenticated: Boolean(storage.get(ACCESSTOKEN_LOCALSTORAGE_KEY)),
};

export const createAuthSlice: StateCreator<AuthState, [], [], AuthState> = (set) => ({
  ...initialState,

  setAccessToken: (accessToken) => {
    if (accessToken) storage.set(ACCESSTOKEN_LOCALSTORAGE_KEY, accessToken);
    else storage.remove(ACCESSTOKEN_LOCALSTORAGE_KEY);
    set({ accessToken, isAuthenticated: Boolean(accessToken) });
  },

  setRefreshToken: (refreshToken) => {
    if (refreshToken) storage.set(REFRESHTOKEN_LOCALSTORAGE_KEY, refreshToken);
    else storage.remove(REFRESHTOKEN_LOCALSTORAGE_KEY);
    set({ refreshToken });
  },

  setCsrfToken: (csrfToken) => set({ csrfToken }),

  setProfile: (profile) => set({ profile }),

  setCompanyInfo: (companyInfo) => {
    if (companyInfo) {
      storage.set(COMPANYINFO_LOCALSTORAGE_KEY, JSON.stringify(companyInfo));
    } else {
      storage.remove(COMPANYINFO_LOCALSTORAGE_KEY);
    }
    set({ companyInfo });
  },

  setAllowedProducts: (allowedProducts) => set({ allowedProducts }),

  login: ({ accessToken, refreshToken, allowed }) => {
    storage.set(ACCESSTOKEN_LOCALSTORAGE_KEY, accessToken);
    storage.set(REFRESHTOKEN_LOCALSTORAGE_KEY, refreshToken);
    set({
      accessToken,
      refreshToken,
      allowedProducts: allowed,
      isAuthenticated: true,
    });
  },

  reset: () => {
    storage.remove(ACCESSTOKEN_LOCALSTORAGE_KEY);
    storage.remove(REFRESHTOKEN_LOCALSTORAGE_KEY);
    storage.remove(COMPANYINFO_LOCALSTORAGE_KEY);
    set({ ...initialState, accessToken: null, refreshToken: null, isAuthenticated: false });
  },
});
```

### 6.6.2 — `shared/store/use-meta-store/use-meta-store.ts`

- [ ] Create:

```ts
import { StateCreator } from 'zustand';
import {
  LNG_LOCALSTORAGE_KEY,
  SIDEBAR_COLLAPSED_LOCALSTORAGE_KEY,
  THEME_LOCALSTORAGE_KEY,
} from '../../const/localstorage.const';
import storage from '../../lib/storage';

export type TLanguages = 'uz' | 'ru' | 'en';
export type TTheme = 'light' | 'dark' | 'system';

export interface PageBreadcrumb {
  label: string;
  to?: string;
}

export interface MetaState {
  // ----- state -----
  lng: TLanguages;
  theme: TTheme;
  isSidebarCollapsed: boolean;
  pageTitle: string | null;
  pageBreadcrumbs: PageBreadcrumb[] | null;

  // ----- actions -----
  setLng: (lng: TLanguages) => void;
  setTheme: (theme: TTheme) => void;
  setIsSidebarCollapsed: (collapsed: boolean) => void;
  setPageTitle: (title: string | null) => void;
  setPageBreadcrumbs: (crumbs: PageBreadcrumb[] | null) => void;
}

const initialLng = (storage.get(LNG_LOCALSTORAGE_KEY) ?? 'uz') as TLanguages;
const initialTheme = (storage.get(THEME_LOCALSTORAGE_KEY) ?? 'system') as TTheme;
const collapsedRaw = storage.get(SIDEBAR_COLLAPSED_LOCALSTORAGE_KEY);
const initialCollapsed = collapsedRaw ? (JSON.parse(collapsedRaw) as boolean) : false;

export const createMetaSlice: StateCreator<MetaState, [], [], MetaState> = (set) => ({
  lng: initialLng,
  theme: initialTheme,
  isSidebarCollapsed: initialCollapsed,
  pageTitle: null,
  pageBreadcrumbs: null,

  setLng: (lng) => {
    storage.set(LNG_LOCALSTORAGE_KEY, lng);
    set({ lng });
  },

  setTheme: (theme) => {
    storage.set(THEME_LOCALSTORAGE_KEY, theme);
    set({ theme });
  },

  setIsSidebarCollapsed: (isSidebarCollapsed) => {
    storage.set(SIDEBAR_COLLAPSED_LOCALSTORAGE_KEY, JSON.stringify(isSidebarCollapsed));
    set({ isSidebarCollapsed });
  },

  setPageTitle: (pageTitle) => set({ pageTitle }),
  setPageBreadcrumbs: (pageBreadcrumbs) => set({ pageBreadcrumbs }),
});
```

### 6.6.3 — `shared/store/use-module-ui-store/use-module-ui-store.ts`

- [ ] Create a slice for cross-module ephemeral UI flags (global spinners, command palette open, etc.):

```ts
import { StateCreator } from 'zustand';

export interface ModuleUiState {
  isGlobalLoading: boolean;
  isCommandPaletteOpen: boolean;
  activeModal: string | null;

  setIsGlobalLoading: (loading: boolean) => void;
  setIsCommandPaletteOpen: (open: boolean) => void;
  setActiveModal: (id: string | null) => void;
  resetUi: () => void;
}

const initialState = {
  isGlobalLoading: false,
  isCommandPaletteOpen: false,
  activeModal: null as string | null,
};

export const createModuleUiSlice: StateCreator<ModuleUiState, [], [], ModuleUiState> = (set) => ({
  ...initialState,
  setIsGlobalLoading: (isGlobalLoading) => set({ isGlobalLoading }),
  setIsCommandPaletteOpen: (isCommandPaletteOpen) => set({ isCommandPaletteOpen }),
  setActiveModal: (activeModal) => set({ activeModal }),
  resetUi: () => set(initialState),
});
```

### 6.6.4 — `shared/store/index.ts` (bound store)

- [ ] Create:

```ts
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { useShallow } from 'zustand/react/shallow';

import {
  type AuthState,
  createAuthSlice,
} from './use-auth-store/use-auth-store';
import {
  type MetaState,
  createMetaSlice,
} from './use-meta-store/use-meta-store';
import {
  type ModuleUiState,
  createModuleUiSlice,
} from './use-module-ui-store/use-module-ui-store';

export type { AuthState, MetaState, ModuleUiState };

export type SharedStoreState = AuthState & MetaState & ModuleUiState;

// docs: https://github.com/pmndrs/zustand/blob/main/docs/guides/slices-pattern.md
export const useBoundStore = create<SharedStoreState>()(
  devtools(
    (...a) => ({
      ...createAuthSlice(...a),
      ...createMetaSlice(...a),
      ...createModuleUiSlice(...a),
    }),
    { name: 'naiton-store', enabled: import.meta.env.MODE === 'development' },
  ),
);

// ----- Selector hooks (preferred in components) -----
export const useAuth = () =>
  useBoundStore(
    useShallow((s) => ({
      accessToken: s.accessToken,
      isAuthenticated: s.isAuthenticated,
      profile: s.profile,
      allowedProducts: s.allowedProducts,
      companyInfo: s.companyInfo,
      login: s.login,
      reset: s.reset,
    })),
  );

export const useMeta = () =>
  useBoundStore(
    useShallow((s) => ({
      lng: s.lng,
      theme: s.theme,
      isSidebarCollapsed: s.isSidebarCollapsed,
      setLng: s.setLng,
      setTheme: s.setTheme,
      setIsSidebarCollapsed: s.setIsSidebarCollapsed,
    })),
  );

export const useModuleUi = () =>
  useBoundStore(
    useShallow((s) => ({
      isGlobalLoading: s.isGlobalLoading,
      isCommandPaletteOpen: s.isCommandPaletteOpen,
      activeModal: s.activeModal,
      setIsGlobalLoading: s.setIsGlobalLoading,
      setIsCommandPaletteOpen: s.setIsCommandPaletteOpen,
      setActiveModal: s.setActiveModal,
    })),
  );
```

### 6.6.5 — Extend `localstorage.const.ts` for store keys

- [ ] Add to `src/shared/const/localstorage.const.ts`:

```ts
export const ACCESSTOKEN_LOCALSTORAGE_KEY = 'naiton-access-token';
export const REFRESHTOKEN_LOCALSTORAGE_KEY = 'naiton-refresh-token';
export const COMPANYINFO_LOCALSTORAGE_KEY = 'naiton-company-info';
export const LNG_LOCALSTORAGE_KEY = 'naiton-lng';
export const THEME_LOCALSTORAGE_KEY = 'naiton-theme';
export const SIDEBAR_COLLAPSED_LOCALSTORAGE_KEY = 'naiton-sidebar-collapsed';
```

### 6.6.6 — Axios ↔ Store synchronization

- [ ] In `src/app/providers/publicProvider/PublicProvider.tsx` (implemented in Phase 8.1), wire the store to axios **once** at mount:

```ts
import { useEffect } from 'react';
import { useBoundStore } from '@/shared/store';
import { apiSubscribe } from '@/shared/api';

// Inside PublicProvider:
useEffect(() => {
  // Prime axios with current store state.
  apiSubscribe(useBoundStore.getState());
  // Re-prime on any future state change (auth + meta).
  const unsubscribe = useBoundStore.subscribe((state) => apiSubscribe(state));
  return unsubscribe;
}, []);
```

> **Why subscribe rather than recompute on every request?** The axios `request` instance is a module-level singleton; rebuilding headers per request would race with React re-renders. The subscription pattern guarantees headers reflect the latest store state with zero per-request overhead.

### 6.6.7 — Usage guidelines (document in code comments)

- **Selecting single values**: `const lng = useBoundStore(s => s.lng)`.
- **Selecting multiple values**: use `useShallow` helper or the provided composite hooks (`useAuth`, `useMeta`, `useModuleUi`).
- **Reading outside React**: `useBoundStore.getState()` — used by `api.ts` for interceptors.
- **Cross-slice actions**: if an action needs state from another slice, use `get()` inside the slice factory:
  ```ts
  export const createFooSlice: StateCreator<FooState & BarState, [], [], FooState> = (set, get) => ({
    doThing: () => set({ foo: get().bar + 1 }),
  });
  ```
  Since all slices share the bound store's full type (`SharedStoreState`), cross-slice reads are type-safe.

### 6.6.8 — Tests

- [ ] `use-auth-store.test.ts` — assert `login()` sets `isAuthenticated` + writes token; `reset()` clears localStorage.
- [ ] `use-meta-store.test.ts` — assert `setLng('ru')` persists to localStorage and updates state.
- [ ] `use-module-ui-store.test.ts` — assert `resetUi()` returns to initial state.
- [ ] Run tests with Vitest pattern (Phase 11).

### 6.7 — `shared/const/router.const.ts`

- [ ] Create enums + `getRoute*()` helpers for Naiton modules:

```ts
export enum AppRoutes {
  DASHBOARD = 'dashboard',
  SALES = 'sales',
  CRM = 'crm',
  WMS = 'wms',
  PROCUREMENT = 'procurement',
  PRODUCTION = 'production',
  ACCOUNTING = 'accounting',
  HRM = 'hrm',
  FMS = 'fms',
  USER_PROFILE = 'user-profile',
  LOGOUT = 'logout',
}

export enum AuthRoutesEnum {
  LOGIN = 'login',
  REGISTER = 'register',
}

export const getAppsRoute = () => '/app';
export const getRouteAuth = () => '/auth';
export const getRouteAuthLogin = () => '/auth/login';
export const getRouteForbidden = () => '/forbidden';
export const getRouteLogout = () => 'logout';
export const getRouteDashboard = () => 'dashboard';
export const getRouteSales = () => 'sales';
export const getRouteCrm = () => 'crm';
export const getRouteWms = () => 'wms';
export const getRouteProcurement = () => 'procurement';
export const getRouteProduction = () => 'production';
export const getRouteAccounting = () => 'accounting';
export const getRouteHrm = () => 'hrm';
export const getRouteFms = () => 'fms';
```

### 6.8 — `shared/const/endpoints.const.ts`

- [ ] Create (mock-API endpoints):

```ts
export const endpoints = {
  LOGIN: '/v1/auth/login',
  LOGOUT: '/v1/auth/logout',
  PROFILE: '/v1/profile',
  SALES_ORDERS: '/v1/sales/orders',
  SALES_ORDER_DETAILS: '/v1/sales/orders/:id',
  CRM_LEADS: '/v1/crm/leads',
  CRM_LEAD_DETAILS: '/v1/crm/leads/:id',
} as const;
```

### 6.9 — `shared/api/api.ts` (verbatim, adapted)

- [ ] Create `apps/naiton/src/shared/api/api.ts` (same interceptor & subscription logic as dashboard, routed through `envConfig.API_ROOT`):

```ts
import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import {
  ACCESSTOKEN_LOCALSTORAGE_KEY,
  COMPANYINFO_LOCALSTORAGE_KEY,
  LNG_LOCALSTORAGE_KEY,
} from '../const/localstorage.const';
import storage from '../lib/storage';
import { envConfig } from '@/config/env/env.config';
import { getRouteAuthLogin, getRouteForbidden } from '../const/router.const';
import { SharedStoreState, useBoundStore } from '../store';
import { TCompanyInfo } from '../types/requests.types';

export const request: AxiosInstance = axios.create({
  baseURL: envConfig.API_ROOT,
});

request.defaults.headers.common.Accept = 'application/json';
request.defaults.headers.common['Content-Type'] = 'application/json; charset=utf-8';

let token = storage.get(ACCESSTOKEN_LOCALSTORAGE_KEY);
const companyInfo = storage.get(COMPANYINFO_LOCALSTORAGE_KEY)
  ? (JSON.parse(storage.get(COMPANYINFO_LOCALSTORAGE_KEY)!) as TCompanyInfo)
  : null;

const getLanguage = () => {
  try {
    const storeLng = useBoundStore.getState().lng;
    return storeLng || storage.get(LNG_LOCALSTORAGE_KEY) || 'uz';
  } catch {
    return storage.get(LNG_LOCALSTORAGE_KEY) || 'uz';
  }
};

request.interceptors.request.use((config) => {
  config.headers['Accept-Language'] = getLanguage();
  return config;
});

export const apiSubscribe = (store?: SharedStoreState): void => {
  request.defaults.headers.common['Company-Tin'] =
    store?.companyInfo?.inn ?? companyInfo?.inn;

  if (store?.csrfToken) {
    request.defaults.headers.common['X-Csrf-Token'] = store.csrfToken;
  }

  if (store?.accessToken) token = store.accessToken;

  if (token) {
    request.defaults.headers.common.Authorization = `Bearer ${token}`;
  }
};

apiSubscribe();

request.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    const status = error?.response?.status;
    if (status === 401 && typeof window !== 'undefined') {
      window.location.href = `${getRouteAuthLogin()}?tokenExpired=true`;
    } else if (status === 403 && typeof window !== 'undefined') {
      window.location.href = getRouteForbidden();
    } else if (status === 429) {
      alert('Too Many Requests');
    }
    return Promise.reject(error);
  },
);
```

### 6.10 — `shared/api/api-helper-hooks/useFetchQueries.ts` (verbatim)

- [ ] Create:

```ts
import {
  UseQueryOptions,
  keepPreviousData,
  useQuery,
} from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useMemo } from 'react';
import { request } from '../api';
import { useTranslation } from 'react-i18next';
import { GetRequestResponse } from '@/shared/types/requests.types';
import { useToastNotif } from '@/shared/hooks/useToastNotif/useToastNotif';

type QueryFetchProps<T> = {
  url: string;
  params?: Record<string, string | null | undefined | number>;
  initialData?: T;
  enabled?: boolean;
  refetchOnWindowFocus?: boolean;
  keepPrevious?: boolean;
  retry?: boolean | number;
  showNotification?: boolean;
} & Omit<UseQueryOptions<T>, 'queryKey' | 'queryFn'>;

export const useFetchQueries = <T>(options: QueryFetchProps<T>) => {
  const {
    url,
    params = {},
    initialData,
    enabled = true,
    refetchOnWindowFocus = true,
    keepPrevious,
    retry = false,
    showNotification = true,
    ...queryOptions
  } = options;
  const { showToast } = useToastNotif();
  const stringifiedParams = Object.entries(params).reduce(
    (acc, [key, value]) => `${acc}-${key}-${value}`,
    '',
  );
  const computedQueryKey = `${url}-${stringifiedParams}`;
  const cachedQueryKey = useMemo(() => [computedQueryKey], [computedQueryKey]);
  const { t } = useTranslation();
  const query = useQuery({
    queryKey: cachedQueryKey,
    queryFn: async (): Promise<T> => {
      const { data } = await request.get<T>(url, { params });
      return data;
    },
    // @ts-expect-error - placeholderData typing mismatch
    placeholderData: keepPrevious ? keepPreviousData : initialData,
    enabled,
    refetchOnWindowFocus,
    retry,
    ...queryOptions,
  });

  useEffect(() => {
    if (query.error) {
      const message = t('Что-то пошло не так');
      let errorMessage = '';
      if (
        axios.isAxiosError<GetRequestResponse<T>, Record<string, string>>(
          query.error,
        )
      ) {
        errorMessage = query?.error?.response?.data?.message as string;
      }
      if (showNotification) {
        showToast({
          message: errorMessage || message,
          type: 'error',
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.error, showToast]);

  return query;
};
```

### 6.11 — `shared/api/api-helper-hooks/useCreateMutation.ts` (verbatim)

- [ ] Create:

```ts
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { useMemo } from 'react';
import { request } from '../api';
import { useTranslation } from 'react-i18next';
import { useToastNotif } from '@/shared/hooks/useToastNotif/useToastNotif';
import { axiosErrorHandler } from '@/shared/lib/utils/axiosErrorHandler/axiosErrorHandler';
import { PostRequestResponse } from '@/shared/types/requests.types';

interface UseCreateMutationArgs<TRequestBody, TResponseData> {
  url: string;
  params?: Record<string, string>;
  onSuccess?: (data: TResponseData, variables: TRequestBody, context: unknown) => void;
  onError?: (error: AxiosError, variables: TRequestBody, context: unknown) => void;
  onSettled?: (
    data: TResponseData | undefined,
    error: AxiosError | null,
    variables: TRequestBody,
    context: unknown,
  ) => void;
  onMutate?: (variables: TRequestBody) => void;
  headers?: Record<string, string>;
  retry?: boolean | number;
  isAutoErrNotifEnabled?: boolean;
}

export function useCreateMutation<
  TRequestBody extends Partial<Record<keyof TRequestBody, unknown>>,
  TResponseData,
>({
  url,
  params,
  onSuccess,
  onError,
  onSettled,
  onMutate,
  headers,
  retry = false,
  isAutoErrNotifEnabled = false,
}: UseCreateMutationArgs<TRequestBody, TResponseData>): UseMutationResult<
  TResponseData,
  AxiosError,
  TRequestBody,
  unknown
> {
  const stringifiedParams = params
    ? Object.entries(params).reduce((acc, [key, value]) => `${acc}-${key}-${value}`, '')
    : '';
  const computedQueryKey = `${url}-${stringifiedParams}`;
  const cachedQueryKey = useMemo(() => [computedQueryKey], [computedQueryKey]);
  const { t } = useTranslation();
  const { showToast } = useToastNotif();

  return useMutation<TResponseData, AxiosError, TRequestBody, unknown>({
    mutationFn: async (requestData: TRequestBody) => {
      const response: AxiosResponse<TResponseData> = await request.post(url, requestData, {
        params,
        headers,
      });
      return response.data;
    },
    mutationKey: cachedQueryKey,
    onMutate,
    onSuccess,
    onError: (error, variables, context) => {
      onError?.(error, variables, context);

      if (isAutoErrNotifEnabled) {
        axiosErrorHandler<PostRequestResponse<TRequestBody>>({
          error: error as Error,
          callback: (err) => {
            if (err.type === 'axios-error') {
              const message = t('Что-то пошло не так');
              const errorMessage = err?.error?.response?.data?.message;
              let allErrorsInString = '';

              if (typeof errorMessage === 'string') {
                showToast({ message, type: 'error' });
              }

              const errorsObjects = err?.error?.response?.data?.data;
              const ALL_PROPERTIES = Object.keys(variables) as (keyof TRequestBody)[];

              if (errorsObjects) {
                ALL_PROPERTIES.forEach((fieldName) => {
                  if (fieldName in errorsObjects) {
                    allErrorsInString += `\n${fieldName.toString()}:${errorsObjects[fieldName]?.toString()}`;
                  }
                });
              }

              if (allErrorsInString.length) {
                showToast({ type: 'error', message: allErrorsInString });
              }
            }
          },
        });
      }
    },
    onSettled,
    retry,
  });
}
```

### 6.12 — `shared/api/api-helper-hooks/useEditMutation.ts` (verbatim)

- [ ] Create:

```ts
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { request } from '../api';

interface EditRequestArgs<TRequestBody> {
  url?: string;
  body: TRequestBody;
  params?: Record<string, unknown>;
  method?: 'put' | 'patch' | 'post';
}

const editRequest = async <TRequestBody, TResponseData>({
  url,
  body,
  params,
  method = 'put',
}: EditRequestArgs<TRequestBody>): Promise<TResponseData> => {
  if (!url) throw new Error('URL is required for useEditMutation');
  const response: AxiosResponse<TResponseData> = await request[method](url, body, { params });
  return response.data;
};

interface UseEditMutationArgs<TRequestBody, TResponseData> {
  url?: string;
  params?: Record<string, unknown>;
  method?: 'put' | 'patch' | 'post';
  onSuccess?: (data: TResponseData) => void;
  onError?: (error: AxiosError) => void;
  onSettled?: (data: TResponseData | undefined, error: AxiosError | null) => void;
  onMutate?: (variables: EditRequestArgs<TRequestBody>) => void;
}

export function useEditMutation<TRequestBody, TResponseData>({
  url,
  onSuccess,
  onError,
  onSettled,
  onMutate,
  params,
  method = 'put',
}: UseEditMutationArgs<TRequestBody, TResponseData>): UseMutationResult<
  TResponseData,
  AxiosError,
  EditRequestArgs<TRequestBody>,
  unknown
> {
  return useMutation<TResponseData, AxiosError, EditRequestArgs<TRequestBody>, unknown>({
    mutationFn: (variables) =>
      editRequest<TRequestBody, TResponseData>({
        ...variables,
        url: variables.url ?? url,
        params: params ?? variables.params,
        method,
      }),
    onMutate,
    onSuccess,
    onError,
    onSettled,
  });
}
```

### 6.13 — `shared/api/api-helper-hooks/useDeleteMutation.ts` (verbatim)

- [ ] Create:

```ts
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import axios from 'axios';
import { request } from '../api';
import { useToastNotif } from '@/shared/hooks/useToastNotif/useToastNotif';
import { PostRequestResponse } from '@/shared/types/requests.types';

interface DeleteRequestArgs {
  id?: number | string;
  params?: Record<string, string | number>;
  url?: string;
  requestBody?: Record<string, unknown>;
}

interface DeleteResponseData {
  message: string;
}

const deleteRequest = async <TResponseBody>({
  url,
  params,
  requestBody,
  id,
}: DeleteRequestArgs): Promise<TResponseBody> => {
  const computedUrl = id ? `${url}/${id}` : (url ?? '');
  const response = await request.delete<TResponseBody>(computedUrl, {
    params,
    data: requestBody,
  });
  return response.data;
};

interface QueryArgs<TRequestBody, T extends DeleteResponseData> {
  apiUrl: string;
  onSuccess?: (data: T, variables: DeleteRequestArgs, context: unknown) => void;
  onError?: (error: unknown, variables: DeleteRequestArgs, context: unknown) => void;
  onSettled?: (
    data: T | undefined,
    error: unknown,
    variables: DeleteRequestArgs,
    context: unknown,
  ) => void;
  onMutate?: (variables: DeleteRequestArgs) => unknown;
  params?: Record<string, string>;
  autoErrorHandle?: boolean;
}

export function useDeleteMutation<
  TRequestBody extends Record<string, unknown>,
  TResponseBody extends DeleteResponseData,
>({
  apiUrl,
  onSuccess,
  onError,
  onSettled,
  onMutate,
  params,
  autoErrorHandle = true,
}: QueryArgs<TRequestBody, TResponseBody>): UseMutationResult<
  TResponseBody,
  unknown,
  DeleteRequestArgs,
  unknown
> {
  const { showToast } = useToastNotif();
  return useMutation<TResponseBody, unknown, DeleteRequestArgs, unknown>({
    mutationFn: (variables) =>
      deleteRequest<TResponseBody>({
        ...variables,
        url: variables.url ?? apiUrl,
        params: { ...params, ...variables.params },
        requestBody: variables.requestBody,
      }),
    onMutate,
    onSuccess: (data, variables, context) => onSuccess?.(data, variables, context),
    onError: (err, variables, context) => {
      if (
        axios.isAxiosError<PostRequestResponse<TRequestBody>, Record<string, unknown>>(err) &&
        autoErrorHandle
      ) {
        const errorMessage = err?.response?.data?.message;
        if (typeof errorMessage === 'string') {
          showToast({ type: 'error', message: errorMessage });
        }
      }
      onError?.(err, variables, context);
    },
    onSettled: (data, err, variables, context) => onSettled?.(data, err, variables, context),
  });
}
```

### 6.14 — `shared/api/index.ts` (barrel)

- [ ] Create:

```ts
export { useFetchQueries } from './api-helper-hooks/useFetchQueries';
export { useDeleteMutation } from './api-helper-hooks/useDeleteMutation';
export { useCreateMutation } from './api-helper-hooks/useCreateMutation';
export { useEditMutation } from './api-helper-hooks/useEditMutation';
export { request, apiSubscribe } from './api';
```

### 6.15 — `shared/hooks/useToastNotif/useToastNotif.ts` (verbatim)

- [ ] Create:

```ts
import { useCallback } from 'react';
import { toast } from 'sonner';
import {
  ShowToastOptions,
  SonnerToastOptions,
} from '@/shared/types/notification.types';

export function useToastNotif() {
  const showToast = useCallback(
    ({
      type = 'success',
      message = 'Successfully created',
      toastOptions,
    }: ShowToastOptions) => {
      const notify = () => {
        const toastData: SonnerToastOptions = {
          position: 'top-right',
          ...toastOptions,
        };
        switch (type) {
          case 'success':
            toast.success(message, toastData);
            break;
          case 'info':
            toast.info(message, toastData);
            break;
          case 'warning':
            toast.warning(message, toastData);
            break;
          case 'error':
            toast.error(message, toastData);
            break;
          default:
            toast(message, toastData);
        }
      };
      return notify();
    },
    [],
  );

  return { showToast };
}
```

### 6.16 — `shared/hooks/useRHForm/useRHForm.ts` (verbatim, adapted)

- [ ] Create:

```ts
import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosResponse } from 'axios';
import {
  DefaultValues,
  FieldValues,
  SubmitHandler,
  useForm,
  UseFormSetError,
} from 'react-hook-form';
import { infer as zodInfer, ZodType } from 'zod';
import { request } from '@/shared/api';
import { PostRequestResponse } from '@/shared/types/requests.types';
import { useToastNotif } from '@/shared/hooks/useToastNotif/useToastNotif';

type UseRhFormProps<
  TSchema extends ZodType<FieldValues>,
  ResponseType,
  RequestType,
> = {
  initialValues: DefaultValues<zodInfer<TSchema>>;
  successCallback: (
    formData: zodInfer<TSchema>,
    response?: AxiosResponse<ResponseType>,
  ) => void;
  errorCallback?: (setError: UseFormSetError<zodInfer<TSchema>>, error: unknown) => void;
  fieldDataMapper?: (formData: zodInfer<TSchema>) => Promise<RequestType> | RequestType;
  url: string;
  method?: 'put' | 'post';
  validationSchema: TSchema;
  isMultiPart?: boolean;
  autoErrorHandle?: boolean;
  showErrorsInNotification?: boolean;
  resolveToSuccess?: boolean;
};

export function useRhForm<
  TSchema extends ZodType<FieldValues>,
  ResponseType,
  RequestType extends Partial<Record<keyof RequestType, unknown>>,
>({
  initialValues,
  successCallback,
  errorCallback,
  fieldDataMapper,
  url,
  method = 'post',
  validationSchema,
  isMultiPart,
  autoErrorHandle = false,
  resolveToSuccess = false,
  showErrorsInNotification,
}: UseRhFormProps<TSchema, ResponseType, RequestType>) {
  const { showToast } = useToastNotif();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setError,
    control,
    trigger,
    reset,
    setValue,
    resetField,
    clearErrors,
  } = useForm<zodInfer<TSchema>>({
    defaultValues: initialValues,
    mode: 'onBlur',
    resolver: zodResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<zodInfer<TSchema>> = async (data) => {
    try {
      const normalizedData = (await fieldDataMapper?.(data)) || data;
      const headers = isMultiPart
        ? { headers: { 'Content-Type': 'multipart/form-data' } }
        : {};

      if (resolveToSuccess) {
        await Promise.resolve();
        successCallback(data);
      } else {
        const response = await request[method]<ResponseType>(url, normalizedData, headers);
        successCallback(data, response);
      }
    } catch (error: unknown) {
      const ALL_PROPERTIES = Object.keys(initialValues) as (keyof RequestType)[];

      if (
        axios.isAxiosError<PostRequestResponse<RequestType>, Record<string, unknown>>(error)
      ) {
        const message = error?.response?.data?.message;
        const errorsObjects = error?.response?.data?.data;
        let allErrorsInString = '';

        if (errorsObjects && autoErrorHandle) {
          ALL_PROPERTIES.forEach((fieldName) => {
            if (fieldName in errorsObjects) {
              // @ts-expect-error RHF generic setError path
              setError(fieldName, {
                type: 'custom',
                message: errorsObjects[fieldName]?.toString(),
              });
            }
          });
        }

        for (const key in errorsObjects) {
          if (key.includes('.')) {
            // @ts-expect-error RHF generic setError path
            setError(key, {
              type: 'custom',
              message: errorsObjects[key]?.toString(),
            });
          }
        }

        if (errorsObjects && showErrorsInNotification) {
          ALL_PROPERTIES.forEach((fieldName) => {
            if (fieldName in errorsObjects) {
              allErrorsInString += `\n${fieldName.toString()}:${errorsObjects[fieldName]?.toString()}`;
            }
          });
        }

        if (allErrorsInString.length) {
          showToast({ type: 'error', message: allErrorsInString });
        }

        if (typeof message === 'string') {
          showToast({ type: 'error', message });
        }
      }
      errorCallback?.(setError, error);
    }
  };

  return {
    onSubmit: handleSubmit(onSubmit),
    register,
    errors,
    watch,
    setError,
    isSubmitting,
    control,
    trigger,
    reset,
    setValue,
    handleSubmit,
    resetField,
    clearErrors,
  };
}
```

### 6.17 — `shared/hooks/useRoutingObjects/useRoutingObjects.ts`

- [ ] Create by copying **`deps/useRoutingObjects.ts`** → `apps/naiton/src/shared/hooks/useRoutingObjects/useRoutingObjects.ts`. Wraps `useNavigate`, `useLocation` into a single hook returning `{ pathname, navigate, location, goBack, goTo }`.

### 6.18 — `shared/lib/utils/getAbsolutePath/getAbsolutePath.ts`

- [ ] Create by copying **`deps/getAbsolutePath.ts`** → `apps/naiton/src/shared/lib/utils/getAbsolutePath/getAbsolutePath.ts`. Prefixes relative paths with `/app/`.

### 6.19 — i18n scaffold

- [ ] Create `src/shared/config/i18n/i18n.ts` (react-i18next + HTTP backend + language detector, fallback `uz`, namespaces `common`, `auth`, `sales`, `crm`).
- [ ] Create `public/locales/{uz,ru}/{common,auth,sales,crm}.json` with seed keys.

**Verification**

- `pnpm --filter naiton check-types` exits 0.
- `import { useFetchQueries } from '@/shared/api'` resolves.

---

## Phase 7 — Mock API Layer (MSW)

**Goal**: Provide deterministic, delayed-Promise mock responses so the PoC runs offline.

**Prereqs**: Phase 6 complete.

### Tasks

- [ ] Create `src/shared/api/mocks/handlers.ts`:
  - `POST /v1/auth/login` → returns `{ access_token, refresh_token, allowed: ['sales','crm',...] }` after 600 ms.
  - `GET /v1/profile` → returns user profile after 400 ms.
  - `GET /v1/sales/orders` → returns paginated list of 50 mock orders.
  - `GET /v1/crm/leads` → returns paginated list of 50 mock leads.
- [ ] Create `src/shared/api/mocks/browser.ts` — `setupWorker(...handlers)`.
- [ ] Run `pnpm exec msw init public/ --save` to generate `mockServiceWorker.js`.
- [ ] In `src/main.tsx`, conditionally start MSW when `import.meta.env.DEV`:
  ```ts
  if (import.meta.env.DEV) {
    const { worker } = await import('@/shared/api/mocks/browser');
    await worker.start({ onUnhandledRequest: 'bypass' });
  }
  ```

**Verification**

- `pnpm --filter naiton dev` — Network tab shows `mockServiceWorker.js` served and requests to `/v1/*` intercepted.

---

## Phase 8 — Layout Engine + Router v7

**Goal**: Wire nested persistent layouts with route-based code splitting.

**Prereqs**: Phases 6–7 complete.

### 8.1 — Providers

- [ ] `src/app/providers/publicProvider/PublicProvider.tsx` — reference implementation in **`deps/PublicProvider.tsx`**. Key responsibilities:
  - Creates `QueryClient` (retry off, 1-minute stale time).
  - Wraps children in `<QueryClientProvider>` + `<Toaster position="top-right" />` + `<ReactQueryDevtools>`.
  - Subscribes to Zustand via `useBoundStore.subscribe((state) => apiSubscribe(state))` at **module level** (outside React tree).
  - Redirects authenticated users away from login page.

- [ ] `src/app/providers/authProvider/AuthProvider.tsx`:
  - Fetches `/v1/profile` on mount via `useFetchQueries`.
  - Populates `useBoundStore` with user + allowed products.
  - Renders `<Outlet />` once loaded.

- [ ] `src/app/providers/router/components/RequireAuth.tsx` — reference implementation in **`deps/RequireAuth.tsx`**. Key logic:
  - Reads `isAuthenticated` + `allowedProducts` from `useBoundStore`.
  - If unauth → `<Navigate to={getRouteAuth()} state={{ from: location }} />`.
  - If `availableIn` prop given but user lacks product → `<Navigate to={getRouteForbidden()} />`.
  - Otherwise renders `children`.

- [ ] `src/app/providers/router/components/ScrollContainer/ScrollContainer.tsx` — reference implementation in **`deps/ScrollContainer.tsx`**. Simple div with `h-[calc(100vh-96px)] overflow-auto` for inner mode.

### 8.2 — Layouts

- [ ] `src/app/layouts/AuthLayout.tsx`:
  - Zero chrome; centered card on gradient background; renders `<Outlet />`.

- [ ] `src/app/layouts/OuterLayout.tsx` (SuiteShell):
  - `<AppNavbar />` (persistent) + `<Outlet />`.
  - Navbar lists top-level modules with `<NavLink>` (React Router v7).

- [ ] `src/app/layouts/InnerLayout.tsx` (DomainShell):
  - `<SidebarProvider>` from `@repo/ui-kit/shadcn/sidebar`.
  - `<AppSidebar />` (persistent, module-specific items) + `<Outlet />`.

### 8.3 — Widgets

- [ ] `src/widgets/app-navbar/ui/AppNavbar/AppNavbar.tsx` — top bar with module switcher (`NavLink` to `/sales`, `/crm`, etc.), profile dropdown, language switcher.
- [ ] `src/widgets/app-sidebar/ui/AppSidebar/AppSidebar.tsx` — reads current top-level module from URL and renders module-specific nav items. Uses `useMemo` + `React.memo` to guarantee no re-render across inner-page navigation.

### 8.4 — Routes config

- [ ] `src/app/providers/router/config/routes.tsx`:
  ```tsx
  import { lazy } from 'react';
  import { AppRoutes, AllowedProducts } from '@/shared/types/requests.types';
  // ... lazy imports:
  const DashboardPage = lazy(() => import('@/pages/dashboard'));
  const SalesPage = lazy(() => import('@/pages/sales'));
  const CrmPage = lazy(() => import('@/pages/crm'));
  // ... 5 more module pages lazy-loaded
  export type AppRoutesProps = {
    path: string;
    element: React.ReactNode;
    authOnly?: boolean;
    availableIn?: AllowedProducts[];
  };
  export const routes: Record<string, AppRoutesProps> = { /* ... */ };
  export const authRoutes = { /* login, register */ };
  ```

### 8.5 — `AppRouter.tsx` (verbatim pattern adapted)

- [ ] `src/app/providers/router/components/AppRouter/AppRouter.tsx`:

```tsx
import { Suspense, useCallback } from 'react';
import { Navigate, Route, Routes } from 'react-router';
import { AuthLayout } from '@/app/layouts/AuthLayout';
import { OuterLayout } from '@/app/layouts/OuterLayout';
import { InnerLayout } from '@/app/layouts/InnerLayout';
import { AuthLoginPage } from '@/pages/auth';
import { NotFoundPage } from '@/pages/notfound';
import { ForbiddenPage } from '@/pages/forbidden';
import {
  getAppsRoute,
  getRouteAuth,
  getRouteAuthLogin,
  getRouteForbidden,
} from '@/shared/const/router.const';
import { PageLoader } from '@repo/ui-kit/shared/ui/PageLoader';
import {
  AppRoutesProps,
  authRoutes,
  routes as routePaths,
} from '../../config/routes';
import { RequireAuth } from '../RequireAuth';
import { ScrollContainer } from '../ScrollContainer/ScrollContainer';

export default function AppRouter() {
  const renderWithWrapper = useCallback((route: AppRoutesProps) => {
    const element = (
      <Suspense fallback={<PageLoader />}>{route.element}</Suspense>
    );
    return (
      <Route
        key={route.path}
        path={route.path}
        element={
          route.authOnly ? (
            <RequireAuth availableIn={route.availableIn}>{element}</RequireAuth>
          ) : (
            element
          )
        }
      />
    );
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Navigate to={getRouteAuthLogin()} replace />} />
      <Route path={getRouteAuth()} element={<AuthLayout />}>
        <Route index element={<AuthLoginPage />} />
        {Object.values(authRoutes).map(renderWithWrapper)}
      </Route>
      <Route path={getAppsRoute()} element={<OuterLayout />}>
        <Route element={<InnerLayout />}>
          <Route
            index
            element={
              <ScrollContainer>
                <RequireAuth>
                  <Navigate to="dashboard" replace />
                </RequireAuth>
              </ScrollContainer>
            }
          />
          {Object.values(routePaths).map(renderWithWrapper)}
        </Route>
      </Route>
      <Route path={getRouteForbidden()} element={<ForbiddenPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
```

### 8.6 — Wire `App.tsx`

- [ ] Replace placeholder `App.tsx`:
  ```tsx
  import { BrowserRouter } from 'react-router';
  import { PublicProvider } from '@/app/providers/publicProvider/PublicProvider';
  import AppRouter from '@/app/providers/router/components/AppRouter/AppRouter';
  import '@/shared/config/i18n/i18n';
  import '@/app/styles/index.css';

  export default function App() {
    return (
      <BrowserRouter>
        <PublicProvider>
          <AppRouter />
        </PublicProvider>
      </BrowserRouter>
    );
  }
  ```

**Verification**

- `pnpm --filter naiton dev` — navigating to `/` redirects to `/auth/login`.
- Navigating to `/app/sales` or `/app/crm` loads lazily (separate chunk in DevTools Network tab).
- React DevTools Profiler: `AppNavbar` and `AppSidebar` do NOT re-render when moving between `/app/sales` and `/app/crm`.

---

## Phase 9 — Auth Feature & Login Flow

**Goal**: Implement login using mock API + Zustand session persistence.

**Prereqs**: Phase 8 complete.

### Tasks

- [ ] Create `src/features/auth/model/authStore.ts` (already a slice inside `shared/store` — here expose selector hooks).
- [ ] Create `src/features/auth/ui/LoginForm/LoginForm.tsx`:
  - Zod schema (`phone`, `password` required).
  - Uses `useRhForm` pointing at `endpoints.LOGIN`.
  - On success: write `access_token` to localStorage + `useBoundStore.setState({ accessToken, isAuthenticated: true, allowedProducts })`.
  - `navigate(getAppsRoute() + '/dashboard')`.
- [ ] Create `src/pages/auth/ui/LoginPage.tsx` that renders `<LoginForm />`.
- [ ] Create logout route: `getRouteLogout()` handler that clears localStorage + store and redirects to login.
- [ ] Seed translations for `auth.json` in `uz` and `ru`.

**Verification**

- Fill form with valid mock credentials → redirects to `/app/dashboard`.
- Hitting `/app/sales` without login → redirects to `/auth/login`.
- Clicking logout → clears state and returns to `/auth/login`.

---

## Phase 10 — Module Pages (Dashboard, Sales, CRM)

**Goal**: Demonstrate three lazy-loaded modules + Navbar/Sidebar persistence. Additional modules (WMS, Procurement, Production, Accounting, HRM, FMS) are created as empty placeholder pages.

**Prereqs**: Phase 9 complete.

### Tasks

- [ ] `src/pages/dashboard/`:
  - Landing page: KPI cards (Total Sales, New Leads, Open Orders, etc. — static numbers).
  - Uses `@repo/ui-kit` cards.
- [ ] `src/pages/sales/`:
  - `ui/SalesPage.tsx` fetches `/v1/sales/orders` via `useFetchQueries`.
  - Renders `<DataTable>` (from ui-kit) with columns: `id`, `customer`, `amount`, `status`, `createdAt`.
  - "New Order" button opens shadcn `<Dialog>` with RHF+Zod form hitting `POST /v1/sales/orders` (MSW handler returns 201).
- [ ] `src/pages/crm/`:
  - Similar pattern to sales for leads list.
- [ ] `src/pages/wms/`, `src/pages/procurement/`, `src/pages/production/`, `src/pages/accounting/`, `src/pages/hrm/`, `src/pages/fms/`:
  - Each contains `ui/<Module>Page.tsx` with a simple placeholder ("Coming soon") + module-specific sidebar group.
- [ ] Add `<NavLink>` for each module in `AppNavbar`.
- [ ] Add module-specific items to `AppSidebar` based on current route (use `useLocation` + memoised derivation).

**Verification**

- Network tab: navigating to Sales vs CRM fetches separate chunk files `sales-<hash>.js` and `crm-<hash>.js`.
- React DevTools Profiler: `OuterLayout` + `AppNavbar` + `InnerLayout` + `AppSidebar` show as "did not render" on intra-module navigation.
- Sales DataTable paginates and shows 50 mock rows.

---

## Phase 11 — Testing Setup

**Goal**: Three-layer testing pyramid — Vitest unit, Vitest + RTL integration, Playwright E2E.

**Prereqs**: Phases 6–10 complete.

### 11.1 — Unit tests

- [ ] `vitest.config.ts`:
  ```ts
  import { defineConfig } from 'vitest/config';
  import viteReact from '@vitejs/plugin-react';
  import svgr from 'vite-plugin-svgr';
  export default defineConfig({
    plugins: [svgr({ svgrOptions: { exportType: 'default' } }), viteReact()],
    resolve: {
      alias: [
        { find: '@/config', replacement: '/config' },
        { find: '@', replacement: '/src' },
      ],
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['./src/test/setup.ts'],
      include: ['src/**/*.test.{ts,tsx}'],
      css: false,
    },
  });
  ```
- [ ] `src/test/setup.ts`:
  ```ts
  import '@testing-library/jest-dom/vitest';
  ```
- [ ] Write sample unit test: `src/shared/lib/utils/axiosErrorHandler/axiosErrorHandler.test.ts`.

### 11.2 — Integration tests

- [ ] `vitest.integration.config.mts`:
  ```ts
  import { defineConfig } from 'vitest/config';
  import viteReact from '@vitejs/plugin-react';
  import svgr from 'vite-plugin-svgr';
  export default defineConfig({
    plugins: [svgr({ svgrOptions: { exportType: 'default' } }), viteReact()],
    resolve: {
      alias: [
        { find: '@/config', replacement: '/config' },
        { find: '@', replacement: '/src' },
      ],
    },
    define: {
      __IS_DEV__: JSON.stringify(true),
      __PROJECT__: JSON.stringify('frontend'),
      'import.meta.env.VITE_APP_VERSION': JSON.stringify('1.0.0'),
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['./tests/integration/setup.ts'],
      include: ['tests/integration/**/*.test.{ts,tsx}'],
      css: false,
    },
  });
  ```
- [ ] `tests/integration/setup.ts` — reference implementation in **`deps/integration-setup.ts`**. Copy and adapt. Key contents:
  - Polyfill `ResizeObserver` for Radix UI.
  - Suppress `act()` warnings from third-party libs.
  - Mock `react-i18next` (returns keys as-is), `sonner` (toast spies), `nuqs` (query string parsers).
- [ ] Sample integration test: `tests/integration/features/auth/LoginForm.test.tsx` — fills form, asserts redirect via `MemoryRouter`.

### 11.3 — E2E tests (Playwright)

- [ ] `playwright.config.ts`:
  ```ts
  import { defineConfig, devices } from '@playwright/test';
  export default defineConfig({
    testDir: 'tests/e2e',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 1 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: 'html',
    use: {
      baseURL: 'http://localhost:5175',
      trace: 'on-first-retry',
      screenshot: 'only-on-failure',
    },
    projects: [
      { name: 'setup', testMatch: /global-setup\.ts/ },
      {
        name: 'chromium',
        use: {
          ...devices['Desktop Chrome'],
          storageState: 'tests/e2e/.auth/user.json',
        },
        dependencies: ['setup'],
      },
    ],
    webServer: {
      command: 'pnpm dev',
      url: 'http://localhost:5175',
      reuseExistingServer: !process.env.CI,
      timeout: 30_000,
    },
  });
  ```
- [ ] `tests/e2e/global-setup.ts` — logs in via UI and writes `tests/e2e/.auth/user.json`.
- [ ] `tests/e2e/smoke.spec.ts` — golden path: Login → Dashboard → Sales → Create Order → CRM → Logout.

**Verification**

- `pnpm --filter naiton test:run` — all unit tests pass.
- `pnpm --filter naiton test:integration` — all integration tests pass.
- `pnpm --filter naiton exec playwright install chromium` then `pnpm --filter naiton test:e2e` — smoke passes.

---

## Phase 12 — Final Verification & Golden Path

**Goal**: Prove the PoC meets every requirement in the brief.

**Prereqs**: Phases 1–11 complete.

### Tasks

- [ ] Run `pnpm install` at workspace root — clean resolve.
- [ ] Run `pnpm lint` — exits 0.
- [ ] Run `pnpm format` — exits 0 (oxfmt or Prettier fallback).
- [ ] Run `pnpm check-types` — exits 0.
- [ ] Run `pnpm build` — dist generated for `apps/naiton` and `packages/ui-kit`.
- [ ] Run `pnpm --filter naiton test:run` — passes.
- [ ] Run `pnpm --filter naiton test:integration` — passes.
- [ ] Run `pnpm --filter naiton test:e2e` — passes.
- [ ] Manual golden path:
  - [ ] `pnpm --filter naiton dev` → `http://localhost:5175`
  - [ ] Open `/` → redirects to `/auth/login`.
  - [ ] Submit login → redirects to `/app/dashboard`.
  - [ ] Click Sales in Navbar → loads `sales-<hash>.js` (Network tab). Navbar/Sidebar do not remount.
  - [ ] Click CRM → loads `crm-<hash>.js`. Navbar/Sidebar do not remount.
  - [ ] Create new sales order via dialog → toast shows success.
  - [ ] Click Logout → returns to `/auth/login` with cleared state.
- [ ] Build preview: `pnpm --filter naiton build && pnpm --filter naiton preview` → loads without runtime errors, chunks observed.
- [ ] React DevTools Profiler confirms zero re-render of persistent layout shells across module switching.
- [ ] Lighthouse FCP under 1.5 s on local dev build.

### Done Criteria

- All checkboxes in Phases 1–12 are ✅.
- Stakeholder demo-able golden path: Login → Dashboard → Sales → Order → logout.
- Architecture enforces FSD import rules, nested persistent layouts, lazy-loaded modules, mock API.

---

## Appendix A — FSD Import Rule (enforcement)

Allowed import directions only (never upward):

```
app   ── pages ── widgets ── features ── entities ── shared
```

Each slice exposes a single `index.ts` barrel. Cross-slice imports of internal files are forbidden. oxlint should be extended with a custom path restriction once `@conarti/feature-sliced` equivalent lands in oxlint; until then, enforce via code review.

## Appendix B — Adding a New Module (checklist for downstream work)

1. Create `src/pages/<module>/ui/<Module>Page.tsx` + `model/` + `index.ts` (default export of the page).
2. Add `<Module>` enum value to `AppRoutes` in `shared/const/router.const.ts`.
3. Add `getRoute<Module>` helper.
4. Add lazy-loaded entry to `routes.tsx` with appropriate `availableIn`.
5. Add `<NavLink>` to `AppNavbar` (only top-level modules).
6. Add module-specific items to `AppSidebar` rendering logic.
7. Add locale namespace `public/locales/{uz,ru}/<module>.json` if needed.
8. Add MSW handler(s) for the module's endpoints.
9. Write at least one integration test under `tests/integration/<module>/`.
10. Extend E2E smoke spec if the module is on the golden path.

## Appendix C — Notes on Tooling Divergence

- Reference repo (`apps/dashboard`) uses ESLint 9 + Prettier. This PoC intentionally uses **oxlint + oxfmt** per the brief. The `eslint-config` package is retained as a fallback in case oxlint's ecosystem proves insufficient (e.g., FSD boundary enforcement).
- Reference repo uses Tailwind via `tailwind.config.ts`; we use Tailwind v4's CSS-driven `@theme` blocks — no JS config file.
- Reference repo dev port is 5174 (dashboard). Naiton runs on 5175 to avoid collisions if both run simultaneously.

---

**End of plan. Hand this document to a coding agent; execute phases 1–12 in order. Each phase's verification step gates the next.**
