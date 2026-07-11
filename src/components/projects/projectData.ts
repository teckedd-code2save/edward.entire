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
    id: 'intent-engine',
    number: '01',
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
    id: 'shipd',
    number: '02',
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
  {
    id: 'convoy',
    number: '03',
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
    id: 'akan-speech-lab',
    number: '04',
    title: 'Akan Speech Lab',
    tag: 'African speech AI',
    category: 'tooling',
    canvasMode: 'agents',
    description: 'Open research infrastructure for automatic speech recognition and voice technology in Akan, starting with Twi.',
    stack: ['Python', 'Whisper', 'PyTorch', 'Hugging Face', 'ASR'],
    architecture: 'Curated speech data flows through reproducible fine-tuning, evaluation, quantization, and local-serving pipelines.',
    highlights: [
      'Fine-tuning Whisper for a low-resource tonal language.',
      'Reproducible data and evaluation pipelines.',
      'Local inference designed for practical product integration.',
    ],
    githubUrl: 'https://github.com/teckedd-code2save/akan-speech-lab',
  },
  {
    id: 'groundcontrol',
    number: '05',
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
    id: 'adwuma-pa',
    number: '06',
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
];

export const filterCategories: { label: string; value: ProjectCategory }[] = [
  { label: 'all work', value: 'all' },
  { label: 'deployment', value: 'deployment' },
  { label: 'AI + tooling', value: 'tooling' },
  { label: 'human systems', value: 'health' },
];
