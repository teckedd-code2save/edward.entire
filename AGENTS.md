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
│   ├── components/
│   │   └── ui/              shadcn/ui primitives (40+ components)
│   ├── sections/            Page sections
│   ├── hooks/               Custom React hooks
│   ├── types/               TypeScript type definitions
│   ├── App.tsx              Root React component
│   ├── main.tsx             Entry point
│   ├── index.css            Global styles
│   └── App.css              Webapp-specific styles
├── index.html               HTML entry point
├── vite.config.ts           Vite configuration
├── tailwind.config.js       Tailwind theme configuration
├── vercel.json              Vercel deployment settings
└── package.json             Dependencies and scripts
```

## 3. Key Scripts

| Script | Command | Description |
|--------|---------|-------------|
| Dev | `npm run dev` | Start dev server (port 3000) |
| Build | `npm run build` | TypeScript check + Vite production build |
| Lint | `npm run lint` | ESLint on all files |
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
- **3D:** React Three Fiber components in dedicated section files.
- **TypeScript:** Strict mode enabled. Avoid `any` — prefer proper types or `unknown` with narrowing.
