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
    id: 'groundcontrol',
    number: '01',
    title: 'GroundControl',
    tag: 'infra dashboard',
    category: 'deployment',
    canvasMode: 'terminal',
    description:
      'Self-hosted infrastructure dashboard for managing Docker containers, Caddy reverse proxies, deployments, and system health on a Hetzner VPS. Real-time container lifecycle, proxy config editor, and one-click deployments — all from a single pane of glass.',
    stack: ['TypeScript', 'Docker', 'Caddy', 'Hetzner', 'Node.js', 'React'],
    architecture:
      'Monolithic dashboard connecting to Docker Engine API and Caddy admin API. Container lifecycle management with start/stop/restart/logs. Proxy route editor that writes Caddy config and reloads gracefully. Deployment pipelines triggered from GitHub webhooks with status tracking. System health monitoring via OS metrics.',
    highlights: [
      'Real-time Docker container lifecycle — start, stop, restart, and stream logs without SSH.',
      "Caddy reverse proxy editor — add, edit, and remove routes with automatic TLS via Let's Encrypt.",
      'One-click deployments from GitHub — webhook-driven pipelines with live status tracking.',
    ],
    githubUrl: 'https://github.com/teckedd-code2save/groundcontrol',
    liveUrl: 'https://groundcontrol.serendepify.com/',
  },
  {
    id: 'akan-speech-lab',
    number: '02',
    title: 'Akan Speech Lab',
    tag: 'speech AI research',
    category: 'tooling',
    canvasMode: 'agents',
    description:
      "Speech AI research lab building ASR, TTS, and voice datasets for Akan — one of West Africa's most spoken yet technologically underserved languages. Training pipelines, evaluation benchmarks, and open datasets to close the African language gap in speech technology.",
    stack: ['Python', 'PyTorch', 'ASR', 'TTS', 'Whisper', 'HuggingFace'],
    architecture:
      'Research infrastructure for low-resource speech AI. Custom ASR fine-tuning pipelines on Whisper architectures adapted for tonal Akan phonology. TTS synthesis with attention-based models trained on curated Akan voice corpora. Dataset curation tools for aligning, segmenting, and validating transcribed speech in Twi and Fante dialects.',
    highlights: [
      'Building the first open ASR pipeline for Akan (Twi/Fante) — a 30M+ speaker language with near-zero speech technology.',
      'Custom TTS models trained on curated Akan voice data — tackling tonal language synthesis challenges.',
      'Dataset release pipeline for reproducible African NLP research — aligned transcripts, validated splits, and evaluation benchmarks.',
    ],
    githubUrl: 'https://github.com/teckedd-code2save/akan-speech-lab',
  },
  {
    id: 'convoy',
    number: '03',
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
    id: 'ai-build-tools',
    number: '04',
    title: 'AI Build Tools',
    tag: 'dev acceleration',
    category: 'tooling',
    canvasMode: 'terminal',
    description:
      'Developer toolkit that accelerates common build workflows with AI — scaffolding, code generation, dependency management, and project bootstrapping. Designed to cut boilerplate and get from idea to running code faster without sacrificing control.',
    stack: ['TypeScript', 'Node.js', 'AI Code Gen', 'CLI', 'GitHub Pages'],
    architecture:
      'CLI-first toolkit with AI-assisted code generation and project scaffolding. Template engine with smart parameter injection. Dependency resolver that suggests compatible versions and detects conflicts before install. GitHub Pages deployment for documentation and interactive examples.',
    highlights: [
      'AI-assisted scaffolding — describe what you want to build and get a configured project structure.',
      'Smart dependency management — version conflict detection and resolution suggestions.',
      'GitHub Pages documentation with interactive examples for every tool in the kit.',
    ],
    githubUrl: 'https://github.com/teckedd-code2save/ai-build-tools',
    liveUrl: 'https://teckedd-code2save.github.io/ai-build-tools/',
  },
  {
    id: 'health-wallet-ton',
    number: '05',
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
    id: 'website-media-capture-mcp',
    number: '06',
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
  {
    id: 'optimi',
    number: '07',
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
    id: 'rentmyweekend',
    number: '08',
    title: 'Rent My Weekend',
    tag: 'rental marketplace',
    category: 'commerce',
    canvasMode: 'exchange',
    description:
      'Peer-to-peer weekend rental marketplace. Owners list what they have — cars, gear, spaces, experiences — renters book by the weekend. Availability engine, instant booking, and payout automation keep the loop tight.',
    stack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Stripe', 'Maps API'],
    architecture:
      'Three-sided marketplace: owners list assets with availability rules and pricing tiers; renters search by location, category, and weekend date range; platform handles booking state, payment hold, and payout release. Postgres for inventory and booking state, Stripe Connect for split payments, geospatial indexing for local discovery.',
    highlights: [
      'Weekend-native booking model — Friday-to-Sunday as a first-class rental unit.',
      'Owner dashboard with calendar overlay, pricing rules, and payout tracking.',
      'Stripe Connect for escrow-style holds and automatic owner disbursement.',
    ],
    liveUrl: 'https://rentmyweekend.serendepify.com/',
  },
  {
    id: 'serendepify',
    number: '09',
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
    id: 'mpp-studio',
    number: '10',
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
    number: '11',
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
    id: 'adwuma-pa',
    number: '12',
    title: 'Adwuma Pa',
    tag: 'elder care AI',
    category: 'health',
    canvasMode: 'agents',
    description:
      'AI-powered family care network connecting Ghanaian elders to coordinated support — health monitoring, emergency alerts, and trusted-family check-in workflows. Built for the Build Small Hackathon to tackle the gap in tech-enabled elder care across West Africa.',
    stack: ['Python', 'AI', 'Telemedicine', 'Family Network', 'African HealthTech'],
    architecture:
      'Multi-agent care coordination system. Health monitoring agents track check-in cadence and flag anomalies. Emergency escalation routes alerts through a trusted-family graph. Telemedicine integration layer connects elders to remote consultations. Built as a lightweight, deployable prototype for Ghanaian community health contexts.',
    highlights: [
      'Trusted-family graph — emergency alerts fan out through configurable contact trees.',
      'Health check-in agent monitors cadence and flags missed check-ins for follow-up.',
      'Built in a weekend for Build Small Hackathon — African healthtech from first principles.',
    ],
    githubUrl: 'https://github.com/teckedd-code2save/adwuma-pa',
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
