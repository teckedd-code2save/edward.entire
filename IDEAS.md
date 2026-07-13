# Ideas — Edward Twumasi Portfolio

Ideas, experiments, and directions for the portfolio site. Not a roadmap — a scratchpad.

---

## Content & Showcase

1. **Project case studies** — Each project card on the portfolio could expand into a full case study page: problem, approach, tech decisions, results. Think Stripe-style writeups for GroundControl, Convoy, and Akan Speech Lab.

2. **Live data dashboards** — Embed live counters or mini-dashboards from GroundControl showing server health, container counts, or deployment activity. Makes the portfolio feel alive.

3. **Blog / writing section** — Add a `/writing` page for technical posts about agent infrastructure, deploying on VPS, building for low-resource languages, or lessons from shipping production systems.

4. **Open-source contributions wall** — A visual grid showing recent GitHub activity: merged PRs, opened issues, starred repos. Could use the GitHub GraphQL API.

## Interaction & UX

5. **Dark mode toggle with persistence** — Already partially present with next-themes. Could add a system-preference detection and a more prominent toggle animation.

6. **Scroll-triggered section animations** — Use IntersectionObserver + Framer Motion to animate sections into view as the user scrolls. Sections for projects, about, contact, skills.

7. **3D interactive hero** — The Three.js background on the hero could respond to mouse position or scroll depth. Particle systems, floating geometry, or a globe.

8. **Command palette / quick nav** — A cmd+k palette that lets visitors jump to any section, project, or external link. Similar to Linear or Vercel's docs.

9. **Page transitions** — Route-level enter/exit animations when navigating between the main page and project detail pages.

## Performance & Infrastructure

10. **Image optimization pipeline** — Automatically generate WebP/AVIF variants for project screenshots and hero images. Use vite-imagetools or a build-time sharp pipeline.

11. **Bundle analysis** — Add a CI step that tracks bundle size over time. Alert if new dependencies push the main JS chunk past a threshold (e.g., 300KB gzipped).

12. **Edge caching headers** — Configure Vercel edge caching for static assets and the main HTML shell. Set Cache-Control for images, fonts, and JS bundles.

13. **Analytics with privacy** — Add a lightweight, privacy-first analytics tool (Plausible, Umami, or Tinybird) instead of Google Analytics. Track page views, time on page, and section scroll depth.

## Developer Experience

14. **Storybook or preview environment** — Build a small component library with visual regression testing. Could start as a separate `/design` page showing the design system (colors, typography, components).

15. **Content management** — Move project data and copy into markdown files in a `/content` directory instead of hardcoded JSX. Use a simple MDX or gray-matter loader.

16. **End-to-end tests** — Add Playwright tests for critical paths: homepage loads, project cards render, contact form submits, theme toggle works.

17. **Accessibility audit** — Run axe-core or Lighthouse for WCAG 2.1 AA compliance. Fix contrast ratios, focus indicators, and screen reader labels.

---
*Last updated: July 2026*
