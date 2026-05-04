export type ProjectCategory = 'all' | 'company' | 'deployment' | 'commerce' | 'tooling' | 'agents' | 'health' | 'pwa';
export type CanvasMode = 'agents' | 'terminal' | 'exchange';

export interface Project {
  id: string;
  number: string;
  title: string;
  tag: string;
  category: ProjectCategory;
  canvasMode: CanvasMode;
  description: string;
  stack: string[];
  architecture: string;
  highlights: string[];
  liveUrl?: string;
  githubUrl?: string;
}

export const projects: Project[] = [
  {
    id: 'convoy',
    number: '01',
    title: 'Convoy',
    tag: 'deployment agent',
    category: 'deployment',
    canvasMode: 'terminal',
    description:
      'Deployment agent built for the Claude Code hackathon (Opus 4.7). Rehearses the deploy, ships it, then keeps watch — without touching your code. You describe what ships; Convoy handles the coordination, rollout, and post-deploy observation loop.',
    stack: ['TypeScript', 'Claude Opus 4.7', 'Claude Code', 'Deployment Pipelines', 'Observability'],
    architecture:
      'Agent runtime built on Claude Opus 4.7. Three-phase execution: rehearsal (dry-run analysis of what will change), ship (coordinated rollout with configurable strategies), observe (post-deploy health checks and anomaly detection). Designed as a Claude Code tool integration for zero-friction use.',
    highlights: [
      'Built for the Claude Code hackathon — Opus 4.7 powering the agent loop.',
      'Rehearse-ship-observe pattern keeps humans informed, not in the way.',
      'No code modifications — pure deployment coordination.',
    ],
    liveUrl: 'https://convoy-home.vercel.app/',
    githubUrl: 'https://github.com/teckedd-code2save/convoy',
  },
  {
    id: 'serendepify',
    number: '02',
    title: 'Serendepify',
    tag: 'developer tools',
    category: 'company',
    canvasMode: 'terminal',
    description:
      'Developer tools platform focused on AI-native workflows and agent-based systems. Builds and ships infrastructure for the Model Context Protocol ecosystem — from database gateways to CLI orchestrators that convert business specifications into production-grade platform scaffolds.',
    stack: ['React', 'TypeScript', 'Node.js', 'MCP Protocol', 'AI Workflows'],
    architecture:
      'Modular platform architecture built around the Model Context Protocol. Each product is a composable tool that agents can discover and invoke. Datafy provides zero-dependency database access. B2DP automates full-stack scaffolding from business specs.',
    highlights: [
      'Datafy — MCP database gateway for 7 backends.',
      'B2DP — CLI orchestrator for platform scaffolds.',
      'Built for the agent-native future of software development.',
    ],
    liveUrl: 'https://www.serendepify.com/',
  },
  {
    id: 'optimi',
    number: '03',
    title: 'Optimi',
    tag: 'opportunity tracker',
    category: 'pwa',
    canvasMode: 'agents',
    description:
      'Lightweight, privacy-first Progressive Web App for tracking opportunities — hackathons, grants, accelerators, jobs, and more. Includes a curated opportunity finder and an AI application assistant. Everything stays local; nothing phones home.',
    stack: ['TypeScript', 'PWA', 'IndexedDB', 'Service Workers', 'AI Assistant'],
    architecture:
      'Client-first architecture with no server-side data collection. IndexedDB for persistent local storage, Service Workers for offline capability and push notifications, AI assistant runs inference at the edge. Curated opportunity feed pulled from public sources, deduplicated and ranked locally.',
    highlights: [
      'Full offline capability — works without connectivity.',
      'Privacy-first: opportunity data and application drafts never leave the device.',
      'AI application assistant drafts tailored submissions from saved profile context.',
    ],
    githubUrl: 'https://github.com/teckedd-code2save/optimi',
  },
  {
    id: 'health-wallet-ton',
    number: '04',
    title: 'HealthWallet',
    tag: 'TON mini-app',
    category: 'health',
    canvasMode: 'exchange',
    description:
      'Health data wallet built as a TON blockchain mini-app. Patients own and control their health records on-chain, granting and revoking access to providers without intermediaries. Built on the TON ecosystem for Telegram-native distribution.',
    stack: ['TypeScript', 'TON Blockchain', 'Telegram Mini App', 'Smart Contracts', 'Web3'],
    architecture:
      'TON smart contracts own the access-control layer. Patient health records stored encrypted with keys only the patient holds. Mini-app distribution via Telegram for zero-friction onboarding. Providers request access; patients approve via wallet signature. Audit trail immutable on-chain.',
    highlights: [
      'Patients control their records — no hospital lock-in.',
      'Telegram-native delivery: no app store, no install friction.',
      'On-chain access audit trail for every read/write event.',
    ],
    githubUrl: 'https://github.com/teckedd-code2save/HealthWallet-TON-MiniApp',
  },
  {
    id: 'agent-ops',
    number: '05',
    title: 'Agent Ops',
    tag: 'agent flow studio',
    category: 'agents',
    canvasMode: 'agents',
    description:
      'Portable company core and project profiles for The Agent Flow Studio. Design, version, and run agent workflows with a visual canvas. Ships with a runtime that executes flows locally or in the cloud — no vendor lock-in.',
    stack: ['JavaScript', 'Agent Runtime', 'Flow Canvas', 'Workflow Engine', 'Company Profiles'],
    architecture:
      'Visual flow canvas maps agent nodes to executable runtime steps. Company and project profiles travel with the workspace — portable config that defines context for every agent run. Execution engine supports local runtime and cloud dispatch. Designed to be self-hosted.',
    highlights: [
      'Visual canvas for designing multi-step agent workflows.',
      'Portable profiles: company context travels with every deployment.',
      'Local-first runtime with optional cloud execution.',
    ],
    githubUrl: 'https://github.com/teckedd-code2save/agent-ops',
  },
  {
    id: 'mpp-studio',
    number: '06',
    title: 'MPP Studio',
    tag: 'agent commerce',
    category: 'commerce',
    canvasMode: 'exchange',
    description:
      'Developer console for the Machine Payments Protocol. Register APIs, run sandbox 402 flows, inspect service contracts, graduate to live payment rails. Built for agent-to-agent commerce where machines negotiate access and settle autonomously.',
    stack: ['MPP', 'HTTP 402', 'Sandbox', 'Service Contracts', 'Agent Commerce'],
    architecture:
      'Console interface for MPP (Machine Payments Protocol) development. Sandbox environment simulates 402 Payment Required flows. Service contract registry and inspection tools. Graduation pathway from sandbox testing to live payment rails with real settlement.',
    highlights: [
      'Infrastructure for autonomous agent economies.',
      'Machines discover APIs, negotiate terms via service contracts, and settle payments without human intervention.',
      'HTTP 402 status as first-class payment signal.',
    ],
    liveUrl: 'https://agent-exchange-web.vercel.app/',
  },
  {
    id: 'shipd',
    number: '07',
    title: 'Shipd',
    tag: 'deployment intel',
    category: 'deployment',
    canvasMode: 'terminal',
    description:
      'Repo-aware deployment planning tool. Connects to GitHub read-only, scans for deployment signals — Dockerfiles, CI configs, env files, infra folders. Scores platforms (Railway, Fly.io, Vercel, Render) against detected artifacts. Produces a saved plan with comparison view and evidence trail. No code writes. No deploy execution. Just clear decisions before you touch anything.',
    stack: ['GitHub API', 'Static Analysis', 'Platform Scoring', 'Decision Records'],
    architecture:
      'Read-only GitHub integration. Static analysis engine detects deployment-relevant files: Dockerfiles, docker-compose, CI configs, environment files, infrastructure folders. Scoring algorithm matches detected patterns against platform capabilities. Generates persistent plans with full evidence trail and comparison views.',
    highlights: [
      'Decision support only. No writes, no deploys.',
      'Evidence-backed platform recommendations with audit trail.',
      'Comparison view shows why one platform scores higher than another based on actual repo contents.',
    ],
    liveUrl: 'https://shipd-seven.vercel.app/',
  },
  {
    id: 'soft-pharma-manager',
    number: '08',
    title: 'Soft Pharma',
    tag: 'pharmacy management',
    category: 'tooling',
    canvasMode: 'terminal',
    description:
      'Pharmacy management system for small-to-medium dispensaries. Handles inventory, sales, expiry tracking, and supplier management. Built with offline-first resilience for clinics operating in low-connectivity environments.',
    stack: ['TypeScript', 'Inventory Management', 'Offline-first', 'Pharmacy Ops'],
    architecture:
      'Offline-first data layer with local-first sync. Inventory and expiry tracking with configurable alert thresholds. POS-style sales flow with barcode support. Supplier management with reorder automation. Designed to run on low-spec hardware without internet dependency.',
    highlights: [
      'Offline-first: operates fully without internet connectivity.',
      'Expiry tracking with configurable alerts to reduce waste.',
      'Designed for low-spec hardware in emerging-market pharmacy operations.',
    ],
    githubUrl: 'https://github.com/teckedd-code2save/soft-pharma-manager',
  },
  {
    id: 'website-media-capture-mcp',
    number: '09',
    title: 'Media Capture MCP',
    tag: 'browser tooling',
    category: 'tooling',
    canvasMode: 'terminal',
    description:
      'Browser automation and media capture MCP for turning live websites into usable screenshots and recordings. Built for workflows where agents or developers need repeatable capture of web pages, UI states, and visual evidence from the browser.',
    stack: ['MCP', 'Browser Automation', 'Screenshots', 'Recordings', 'GitHub Pages'],
    architecture:
      'MCP-first browser capture workflow for visiting pages, rendering target states, and extracting visual media in a repeatable way. Designed to fit agentic and developer workflows that need deterministic website screenshots and capture artifacts.',
    highlights: [
      'Ships as a public project with GitHub Pages documentation and a live project page.',
      'Useful wherever browser-based capture needs to be automated or integrated into tool-driven workflows.',
    ],
    githubUrl: 'https://github.com/teckedd-code2save/website-media-capture-mcp',
    liveUrl: 'https://teckedd-code2save.github.io/website-media-capture-mcp/',
  },
];

export const filterCategories: { label: string; value: ProjectCategory }[] = [
  { label: 'all', value: 'all' },
  { label: 'agents', value: 'agents' },
  { label: 'deployment', value: 'deployment' },
  { label: 'company', value: 'company' },
  { label: 'commerce', value: 'commerce' },
  { label: 'health', value: 'health' },
  { label: 'pwa', value: 'pwa' },
  { label: 'tooling', value: 'tooling' },
];
