# Edward Twumasi Portfolio

Personal portfolio for Edward Twumasi, built as a Vite + React + TypeScript single-page application with Tailwind CSS, shadcn/ui primitives, Framer Motion, and Three.js effects.

## Stack

- React 19
- TypeScript 5
- Vite 7
- Tailwind CSS 3
- shadcn/ui
- Framer Motion
- React Three Fiber / Three.js

## Local Development

Prerequisites:

- Node.js 22
- npm 10+

Run locally:

```bash
npm install
npm run dev
```

The dev server runs on `http://localhost:3000`.

## Production Build

```bash
npm run build
```

Preview the production bundle locally:

```bash
npm run preview
```

## Deploying to Vercel

This repo is configured for Vercel static deployment.

Recommended project settings:

- Framework Preset: `Vite`
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`
- Node.js Version: `22.x`

Deploy with the Vercel CLI:

```bash
npm i -g vercel
vercel
vercel --prod
```

Or import the GitHub repository into Vercel and keep the defaults above.

## Notes

- Routing uses `HashRouter`, so deep-link refreshes do not require custom rewrite rules.
- `.vercel` and local `.env` files are ignored and should not be committed.
