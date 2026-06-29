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
    tag: 'infra dashboard',
    category: 'deployment',
    canvasMode: 'terminal',
    description:
      'Self-hosted infrastructure dashboard for managing Docker containers, Caddy reverse proxies, deployments, and system health on a Hetzner VPS.',
    stack: ['TypeScript', 'Docker', 'Caddy', 'Hetzner', 'Node.js', 'React'],
    architecture:
      'Monolithic dashboard connecting to Docker Engine API and Caddy admin API. Container lifecycle management with start/stop/restart/logs. Proxy route editor that writes Caddy config and reloads gracefully. Deployment pipelines triggered from GitHub webhooks.',
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
      "Speech AI research lab building ASR, TTS, and voice datasets for Akan — one of West Africa's most spoken yet technologically underserved languages.",
    stack: ['Python', 'PyTorch', 'ASR', 'TTS', 'Whisper', 'HuggingFace'],
    architecture:
      'Research infrastructure for low-resource speech AI. Custom ASR fine-tuning pipelines on Whisper architectures adapted for tonal Akan phonology. TTS synthesis with attention-based models trained on curated Akan voice corpora.',
    highlights: [
      'Building the first open ASR pipeline for Akan (Twi/Fante) — a 30M+ speaker language with near-zero speech technology.',
      'Custom TTS models trained on curated Akan voice data — tackling tonal language synthesis challenges.',
      'Dataset release pipeline for reproducible African NLP research.',
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
      'Deployment agent built for the Claude Code hackathon. Rehearses the deploy, ships it, then keeps watch — without touching your code.',
    stack: ['TypeScript', 'Claude Opus 4.7', 'Claude Code', 'Deployment Pipelines', 'Observability'],
    architecture:
      'Agent runtime built on Claude Opus 4.7. Three-phase execution: rehearsal (dry-run analysis), ship (coordinated rollout), observe (post-deploy health checks). Designed as a Claude Code tool integration.',
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
      'Developer toolkit that accelerates common build workflows with AI — scaffolding, code generation, dependency management, and project bootstrapping.',
    stack: ['TypeScript', 'Node.js', 'AI Code Gen', 'CLI', 'GitHub Pages'],
    architecture:
      'CLI-first toolkit with AI-assisted code generation and project scaffolding. Template engine with smart parameter injection. Dependency resolver that suggests compatible versions and detects conflicts before install.',
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
      'Health data wallet built as a TON blockchain mini-app. Patients own and control their health records on-chain, granting and revoking access to providers without intermediaries.',
    stack: ['TypeScript', 'TON Blockchain', 'Telegram Mini App', 'Smart Contracts', 'Web3'],
    architecture:
      'TON smart contracts own the access-control layer. Patient health records stored encrypted with keys only the patient holds. Mini-app distribution via Telegram for zero-friction onboarding.',
    highlights: [
      'Patients control their records — no hospital lock-in.',
      'Telegram-native delivery: no app store, no install friction.',
      'On-chain access audit trail for every read/write event.',
    ],
    githubUrl: 'https://github.com/teckedd-code2save/HealthWallet-TON-MiniApp',
  },
];

export const filterCategories: { label: string; value: ProjectCategory }[] = [
  { label: 'all', value: 'all' },
  { label: 'deployment', value: 'deployment' },
  { label: 'tooling', value: 'tooling' },
  { label: 'health', value: 'health' },
];
