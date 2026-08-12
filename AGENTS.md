# Edward Twumasi Portfolio — Agent Guide

> Personal portfolio for Edward Twumasi, built as a Vite + React + TypeScript single-page application with Tailwind CSS, shadcn/ui primitives, Framer Motion, and Three.js effects. Deployed on Vercel.

---

## 1. Technology Stack

| Layer | Technology |
|---|---|
| Framework | React 19 |
| Language | TypeScript 5 |
| Bundler | Vite 7 |
| Styling | Tailwind CSS 3 + shadcn/ui |
| Animation | Framer Motion + GSAP 3 |
| 3D | React Three Fiber / Three.js |
| Routing | React Router 7 (HashRouter) |
| Forms | React Hook Form + Zod |
| Deployment | Vercel (static SPA) |

## 2. Project Structure

```
edward.entire/
├── public/                   Static assets
├── src/
│   ├── __tests__/           Vitest + RTL tests (App.test.tsx)
│   ├── components/
│   │   ├── about/           About page sections (BioSection, TechStack, WorkApproach)
│   │   ├── contact/         Contact page sections (ContactForm, LiveClock, WorkingHours)
│   │   ├── projects/        Project page sections (ProjectCard, AgentCanvas, TerminalCanvas)
│   │   └── ui/              shadcn/ui primitives (40+ components)
│   ├── hooks/               Custom React hooks (use-mobile)
│   ├── lib/                 Utilities (utils.ts with cn())
│   ├── pages/               Route pages: Home, Projects, Pitches, Articles,
│   │                        ArticleViewer, DeckViewer, Research, Contact
│   ├── App.tsx              Root component — source of truth for mounted routes
│   ├── main.tsx             Entry point
│   └── index.css            Global styles
├── index.html               HTML entry point
├── vite.config.ts           Vite configuration
├── tailwind.config.js       Tailwind theme configuration
├── vercel.json              Vercel deployment settings
└── package.json             Dependencies and scripts
```

**Source of truth for structure:** `src/App.tsx` defines every mounted route. There is no `src/sections/` or `src/types/` — page-level sections live in `src/pages/`, reusable sections in `src/components/<area>/`, and shadcn primitives in `src/components/ui/`.

## 3. Key Scripts

| Script | Command | Description |
|--------|---------|-------------|
| Dev | `npm run dev` | Start dev server (port 3000) |
| Build | `npm run build` | TypeScript check + Vite production build |
| Lint | `npm run lint` | ESLint on all files |
| Test | `npm test` | Run the Vitest suite once (CI) |
| Test (watch) | `npm run test:watch` | Run Vitest in watch mode |
| Preview | `npm run preview` | Preview production build locally |

## 4. Development

```bash
npm install
npm run dev
```

The dev server runs on `http://localhost:3000`.

## 5. Build & Deploy

```bash
npm run build      # outputs to dist/
npm run preview    # preview the production bundle
```

Vercel deployment (configured via `vercel.json`):
- Framework Preset: `Vite`
- Build Command: `npm run build`
- Output Directory: `dist`
- Node.js Version: `22.x`

## 6. Code Conventions

- **Routing:** Use `HashRouter` — deep-link refreshes do not require custom rewrite rules.
- **UI components:** Import from `@/components/ui/component-name` (shadcn convention).
- **Styling:** Tailwind utility classes. Use `cn()` from `tailwind-merge` for conditional classes.
- **Animations:** Framer Motion for page transitions and scroll effects. GSAP for complex timeline animations.
- **3D:** React Three Fiber components in dedicated component files (see `src/components/`).
- **TypeScript:** Strict mode enabled. Avoid `any` — prefer proper types or `unknown` with narrowing.
