export type ProjectCategory = 'all' | 'ops' | 'deployment' | 'commerce' | 'tooling';
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
    id: 'opsmesh',
    number: '01',
    title: 'OpsMesh',
    tag: 'agent-native ops',
    category: 'ops',
    canvasMode: 'agents',
    description:
      'Agent-native operations platform built on OpenClaw. First product: Gig Radar — polls gig/job sources, normalizes and deduplicates, scores via OpenClaw reasoning, fires Telegram alerts. OpenClaw handles agent runtime; OpsMesh owns domain logic, workflow state, and data model. Next: DM Shop Agent over WhatsApp and Telegram.',
    stack: ['OpenClaw', 'Agent Runtime', 'Telegram API', 'WhatsApp', 'Workflow State'],
    architecture:
      'OpenClaw provides the agent runtime and reasoning layer; OpsMesh implements domain-specific operations logic, persistent workflow state, and structured data models for gig discovery and shop management.',
    highlights: [
      'Gig Radar — live.',
      'DM Shop Agent — in development.',
      'Both share the OpenClaw foundation with OpsMesh domain extensions.',
    ],
  },
  {
    id: 'shipd',
    number: '02',
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
      'Principle: decision support only. No writes, no deploys.',
      'Evidence-backed platform recommendations with audit trail.',
      'Comparison view shows why one platform scores higher than another based on actual repo contents.',
    ],
    liveUrl: 'https://shipd-seven.vercel.app/',
  },
  {
    id: 'mpp-studio',
    number: '03',
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
    id: 'website-media-capture-mcp',
    number: '04',
    title: 'Website Media Capture MCP',
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
  { label: 'ops', value: 'ops' },
  { label: 'deployment', value: 'deployment' },
  { label: 'commerce', value: 'commerce' },
  { label: 'tooling', value: 'tooling' },
];
