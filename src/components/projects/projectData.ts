export type ProjectCategory = 'all' | 'deployment' | 'tooling' | 'health';
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
    tag: 'self-hosted infrastructure',
    category: 'deployment',
    canvasMode: 'terminal',
    description: 'A single control surface for Docker workloads, Caddy routes, deployments, and machine health on a self-hosted VPS.',
    stack: ['TypeScript', 'Docker', 'Caddy', 'Hetzner', 'React'],
    architecture: 'A web control plane talks directly to Docker and Caddy APIs, turning common infrastructure operations into observable workflows.',
    highlights: [
      'Container lifecycle and live logs without an SSH session.',
      'Safe reverse-proxy editing with automatic TLS.',
      'Webhook-driven deployments with visible status.',
    ],
    githubUrl: 'https://github.com/teckedd-code2save/groundcontrol',
    liveUrl: 'https://groundcontrol.serendepify.com/',
  },
  {
    id: 'pocket-models',
    number: '02',
    title: 'Pocket Models',
    tag: 'Android model field guide',
    category: 'tooling',
    canvasMode: 'exchange',
    description: 'An interactive field guide for comparing open models on Android and assembling practical on-device or hybrid AI stacks.',
    stack: ['JavaScript', 'Android AI', 'Open models', 'Edge inference'],
    architecture: 'A dependency-free client-side explorer filters models, explains deployment tradeoffs, and recommends a stack from device memory, modality, and product priorities.',
    highlights: [
      'Concrete on-device and hybrid stack recommendations.',
      'Model comparisons grounded in footprint, modality, and licensing.',
      'Architecture views covering privacy, latency, and cost.',
    ],
    githubUrl: 'https://github.com/teckedd-code2save/pocket-models',
  },
  {
    id: 'intent-engine',
    number: '03',
    title: 'Intent Engine',
    tag: 'on-device AI · Android',
    category: 'health',
    canvasMode: 'agents',
    description: 'A local-first Android companion that anchors why you opened your phone, detects drift, and helps you return to the task.',
    stack: ['Kotlin', 'Compose', 'LiteRT', 'On-device AI', 'Room'],
    architecture: 'A foreground guardian captures intent, monitors app-level context, scores alignment locally, and uses a deterministic-to-local-AI inference ladder.',
    highlights: [
      'Private semantic matching and companion inference on the phone.',
      'Accessibility and UsageStats backends with a persistent focus overlay.',
      'Adaptive thresholds learn from real correction and completion behavior.',
    ],
    githubUrl: 'https://github.com/teckedd-code2save/IntentEngine-mvp',
  },
  {
    id: 'convoy',
    number: '04',
    title: 'Convoy',
    tag: 'deployment agent',
    category: 'deployment',
    canvasMode: 'terminal',
    description: 'An agent that rehearses a deployment, ships it, and watches the result—without rewriting the product it is responsible for.',
    stack: ['TypeScript', 'Claude Code', 'Agent workflows', 'Observability'],
    architecture: 'A three-phase agent loop coordinates rehearsal, rollout, and post-deploy observation while keeping a human-readable execution trail.',
    highlights: [
      'Rehearse–ship–observe workflow for safer releases.',
      'Tool-native integration with a clear action boundary.',
      'Deployment coordination without source-code mutation.',
    ],
    githubUrl: 'https://github.com/teckedd-code2save/convoy',
    liveUrl: 'https://convoy-home.vercel.app/',
  },
  {
    id: 'adwuma-pa',
    number: '05',
    title: 'Adwuma Pa',
    tag: 'voice-first family care',
    category: 'health',
    canvasMode: 'agents',
    description: 'A voice-first family care network for Ghanaian elders, with multilingual check-ins, concern scoring, and family coordination.',
    stack: ['Python', 'Gradio', 'Whisper', 'Qwen', 'Hugging Face'],
    architecture: 'Speech recognition, translation, small-model reasoning, and a family relay work together in a deliberately lightweight pipeline.',
    highlights: [
      'Twi, Fante, and English voice check-ins.',
      'Small-model architecture that runs on accessible hardware.',
      'Human-centered escalation to nearby relatives.',
    ],
    githubUrl: 'https://github.com/teckedd-code2save/adwuma-pa',
  },
  {
    id: 'ghana-health-ai',
    number: '06',
    title: 'Ghana Health AI',
    tag: 'Twi-first health companion',
    category: 'health',
    canvasMode: 'agents',
    description: 'A voice-first health companion for Ghana, combining maternal health guidance, a Twi-first experience, and an everyday care marketplace.',
    stack: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'PWA'],
    architecture: 'A Next.js PWA routes health, commerce, and general intents into focused workflows backed by Postgres, health RAG, and an extensible voice pipeline.',
    highlights: [
      'Twi-first maternal health guidance with safety-aware escalation.',
      'Health knowledge retrieval, intent routing, and voice foundations.',
      'Integrated marketplace and mock mobile-money checkout.',
    ],
    githubUrl: 'https://github.com/teckedd-code2save/ghana-health-ai',
    liveUrl: 'https://ghanahealth.serendepify.com',
  },
  {
    id: 'shipd',
    number: '07',
    title: 'Shipd',
    tag: 'deployment intelligence',
    category: 'deployment',
    canvasMode: 'terminal',
    description: 'A deployment decision engine that scores platforms against a repository and turns uncertainty into a concrete shipping plan.',
    stack: ['TypeScript', 'Repository analysis', 'Vercel', 'Deployment'],
    architecture: 'Static and semantic repository analysis feeds a multi-platform scoring engine, producing an explainable deployment recommendation.',
    highlights: [
      'Scores eleven deployment platforms against the actual codebase.',
      'Explains tradeoffs instead of returning a black-box winner.',
      'Produces a practical, ordered deployment plan.',
    ],
    githubUrl: 'https://github.com/teckedd-code2save/shipd',
    liveUrl: 'https://shipd-seven.vercel.app/',
  },
];

export const filterCategories: { label: string; value: ProjectCategory }[] = [
  { label: 'all work', value: 'all' },
  { label: 'deployment', value: 'deployment' },
  { label: 'AI + tooling', value: 'tooling' },
  { label: 'human systems', value: 'health' },
];
