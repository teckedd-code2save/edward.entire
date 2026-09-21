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
    number: '03',
    title: 'GroundControl',
    tag: 'self-hosted application operations',
    category: 'deployment',
    canvasMode: 'terminal',
    description: 'Deploy, inspect and troubleshoot applications running on your own servers, with controlled access for AI agents.',
    stack: ['TypeScript', 'MCP + OAuth', 'Docker', 'Linux', 'WebSockets', 'Caddy/Nginx'],
    architecture: 'GroundControl turns deployment and host operations into constrained capabilities for humans and AI agents. ChatGPT can receive only an approved deployment, trigger a typed redeploy after a merge, follow the durable operation and report health/public evidence without VPS shell access; operators still have a real stateful host terminal when live troubleshooting requires it.',
    highlights: [
      'Built an MCP/OAuth deployment path that lets ChatGPT operate only the approved deployment, trigger a typed redeploy, follow the durable operation and return health/public evidence without VPS shell access or broad server control.',
      'Implemented browser-based PTY sessions over Socket.IO and SSH, plus a Docker/nsenter host bridge, giving operators a real stateful host shell inside the control plane for live troubleshooting without opening a separate SSH client.',
      'Added deployment preflight and exact-revision validation across GitHub, GHCR and Daytona so repair starts only after proving source access, package availability and the deployed Git revision.',
    ],
    githubUrl: 'https://github.com/teckedd-code2save/groundcontrol',
    liveUrl: 'https://trygroundcontrol.serendepify.com/',
  },
  {
    id: 'rentaweekend',
    number: '04',
    title: 'RentAWeekend',
    tag: 'AI-assisted weekend discovery',
    category: 'tooling',
    canvasMode: 'agents',
    description: 'Research places, activities and stays from natural-language intent, save ranked plans, and turn a selected plan into paid local help when needed.',
    stack: ['TypeScript', 'PostgreSQL', 'Prisma', 'Agents', 'Paystack', 'Provider orchestration'],
    architecture: 'An LLM-guided research pipeline turns natural-language travel and activity intent into web and location-provider searches, reconciles results into ranked options, and carries confirmed facts and uncertainty across turns. Saved plans use revisioned state and optimistic concurrency; selected options become helper tasks through retry-safe PostgreSQL transaction boundaries while payment, matching and acceptance remain separate.',
    highlights: [
      'Built a multi-stage research pipeline that turns natural-language travel and activity intent into web and location-provider searches, reconciles results into ranked options, and carries source tracking and confirmed user decisions across turns.',
      'Persisted saved plans with optimistic concurrency so competing edits are rejected instead of silently overwriting newer decisions.',
      'Combined PostgreSQL FOR UPDATE with unique plan/result/option identity so double taps and network retries converge on one helper task and one source snapshot.',
    ],
    liveUrl: 'https://rentmyweekend.serendepify.com',
  },
  {
    id: 'convoy',
    number: '05',
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
    id: 'pocket-models',
    number: '06',
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
    liveUrl: 'https://pocket-models.serendepify.com/',
  },
  {
    id: 'ghana-health-ai',
    number: '01',
    title: 'Ghana Health AI',
    tag: 'Twi speech + language research',
    category: 'health',
    canvasMode: 'agents',
    description: 'A Twi-first health-information assistant backed by original speech, language-model, evaluation and serving research.',
    stack: ['Next.js', 'Python', 'Modal GPU', 'PostgreSQL', 'Whisper/W2V-BERT', 'Qwen LoRA'],
    architecture: 'The product separates ASR, language understanding, response generation and promotion decisions. Training data keeps source identity, dataset splits and checksums; protected evaluation can block a model from shipping; GPU training and inference run on Modal while reusable checkpoints and model cards are published through Hugging Face.',
    highlights: [
      'Adapted and evaluated Whisper, MMS and DONDO/W2V-BERT for Twi speech; DONDO improved from 70.64% base WER to 27.31% on the same 300-sample Waxal slice.',
      'Built protected evaluation that rejected a Qwen adapter despite 672/672 parseable outputs because it passed only 1/11 product fixtures.',
      'Built a bilingual data pipeline spanning 30,404 unique sources and 60,808 bidirectional training views, then deployed GPU-backed ASR and response-model services on Modal.',
    ],
    githubUrl: 'https://github.com/teckedd-code2save/ghana-health-ai',
    liveUrl: 'https://ghanahealth.serendepify.com',
  },
  {
    id: 'backend-as-natural-language',
    number: '02',
    title: 'Backend as Natural Language',
    tag: 'compiler research · active',
    category: 'tooling',
    canvasMode: 'terminal',
    description: 'A research compiler for turning controlled natural-language backend declarations into canonical, typed intermediate representations and executable plans.',
    stack: ['Rust', 'Compiler design', 'BIR', 'Language research', 'CI evaluation'],
    architecture: 'A catalogue-driven semantic frontend lowers declarations through one generic path, validates constraints, rejects contradictions, and emits canonical BIR for deterministic execution.',
    highlights: [
      '180/180 on a fresh 15-family holdout after freezing the compiler.',
      '1,000/1,000 on a 50-family synthetic and adversarial evaluation with blind inputs separated from labels.',
      'Human-authored validation remains open: 20+ contributors and 250+ declarations.',
    ],
    githubUrl: 'https://github.com/teckedd-code2save/backend-as-natural-language',
  },
  {
    id: 'intent-engine',
    number: '07',
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
    id: 'adwuma-pa',
    number: '08',
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
    id: 'shipd',
    number: '09',
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
