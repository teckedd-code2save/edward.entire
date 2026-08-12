# PENDINGS — Known Sharp Edges

This is a living document for the Edward Twumasi portfolio. Add entries when you discover a sharp edge, constraint, or failure mode; remove them once the underlying issue is resolved.

---

## 1. HashRouter is a hard requirement [Severity: MEDIUM]

**What:** The app uses `HashRouter` (React Router 7) so deep-link refreshes work without rewrite rules.

**Why it matters:** Switching to `BrowserRouter` breaks deep links on Vercel unless SPA rewrites are added to `vercel.json` first.

**Mitigation:** Keep `HashRouter` in `src/App.tsx`. If a route change is ever needed, add the rewrite rules to `vercel.json` in the same change.

## 2. AGENTS.md structure section is stale [Severity: LOW] — **fixed** `3427523`

**What:** `AGENTS.md` documented a `src/sections/` layout, but the actual structure is `src/pages/` (About, Projects, Research, Pitches, Articles, Contact, Home) plus `src/components/` with `about/`, `contact/`, `projects/`, and `ui/` subdirectories.

**Why it matters:** New agents following AGENTS.md will look for files that don't exist and may create a parallel `sections/` tree.

**Mitigation:** Read `src/App.tsx` to see which components are actually mounted before adding new sections. AGENTS.md §2 now documents the real layout (`src/pages/` + `src/components/<area>/`) and points at `src/App.tsx` as the source of truth.

## 3. Portfolio ordering is a manual chore [Severity: LOW]

**What:** Project and research listings are manually ordered by GitHub activity; the commit history shows repeated "portfolio: reorder by GitHub activity" changes.

**Why it matters:** Ordering lives inside the page components themselves (e.g., `src/pages/Projects.tsx`), so any new project added to the data must be placed manually — there is no sort utility.

**Mitigation:** When adding a project, check its position against live GitHub activity and reorder explicitly in the same commit.

## 4. Use shadcn/ui primitives, don't hand-roll [Severity: MEDIUM]

**What:** UI primitives come from `@/components/ui/*` (40+ shadcn/ui components).

**Why it matters:** Hand-rolled buttons/modals drift from the design system and break the `cn()` + `tailwind-merge` conventions.

**Mitigation:** Import from `@/components/ui/component-name`; use `cva` variants and `asChild` support when extending primitives.

## 5. TypeScript strict mode is enforced by the build [Severity: HIGH]

**What:** `npm run build` runs `tsc` (via `vite build` with `tsconfig.app.json`), and strict mode is on with `noUnusedLocals` and `noUnusedParameters`.

**Why it matters:** Any `any` usage, unused variable, or type error fails the production build. CI (`.github/workflows/ci.yml`) now runs `tsc -b`, lint, and the build on every push/PR to `main`, so type regressions are caught before they reach Vercel.

**Mitigation:** Run `npm run build` locally before pushing. Prefer `unknown` with narrowing over `any`.

## 6. Vercel SPA configuration is fixed [Severity: MEDIUM]

**What:** `vercel.json` pins the framework preset to Vite, build command `npm run build`, output directory `dist`, and Node.js 22.x.

**Why it matters:** Adding server routes or changing the output directory without updating `vercel.json` silently breaks deploys.

**Mitigation:** Keep the SPA static. Any new server-side behavior belongs in a separate service, not this repo.

## 7. Animation libraries have split responsibilities [Severity: LOW]

**What:** Framer Motion handles page transitions and scroll effects; GSAP is reserved for complex timeline animations; React Three Fiber components live in dedicated component files.

**Why it matters:** Mixing both libraries in one component makes timelines hard to debug and bloats the bundle.

**Mitigation:** Follow the split from `AGENTS.md` §6 — Framer Motion for transitions/scroll, GSAP for complex timelines, R3F only in dedicated 3D components.

## 8. No test infrastructure [Severity: MEDIUM] — **fixed** `69b0c0c`

**What:** There is no test framework and no `.test.`/`.spec.` files. A CI pipeline (`.github/workflows/ci.yml`, issue #26) now runs lint, type-checking, and the production build on every push/PR to `main`.

**Why it matters:** Refactors (like the repeated portfolio reordering) ship without automated regression coverage.

**Mitigation:** Vitest infrastructure landed in `69b0c0c` (issue #40): `vitest.config.ts`, `vitest.setup.ts` (jsdom stubs for matchMedia/observers/media APIs), `test`/`test:watch` scripts, `src/__tests__/App.test.tsx`, and a `Test` step in CI. Run `npm test` before pushing; new components should ship with colocated tests.

---

## Deferred Work Items

Items explicitly tracked as future work, not sharp edges:

1. ~~CI pipeline (GitHub Actions)~~ — **done** in `.github/workflows/ci.yml` (typecheck + lint + build; issue #26).
2. ~~Test infrastructure with Vitest~~ — **done** in `69b0c0c` (issue #40): vitest + RTL + jest-dom + jsdom, `test`/`test:watch` scripts, `src/__tests__/App.test.tsx`, CI `Test` step.
3. README usage section — README currently covers stack and local development but not production usage.
