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
    tag: 'deployment tools for people and AI agents',
    category: 'deployment',
    canvasMode: 'terminal',
    description: 'A self-hosted workspace for running your applications, with an MCP server that lets ChatGPT and other compatible agents inspect deployments, check logs and health, and deploy updates.',
    stack: ['TypeScript', 'MCP + OAuth', 'Docker', 'Linux', 'WebSockets', 'Caddy/Nginx'],
    architecture: 'A remote MCP endpoint exposes deployment tools with OAuth scopes and grants for specific applications. Agents can inspect releases, read deployment logs, check runtime and public endpoint health, check named configuration keys, build linked GitHub source, or request a redeploy. Mutations return a saved operation ID; operation.get retrieves progress and verification evidence. Repeated requests with the same idempotency key return the existing operation. The operator dashboard and persistent host terminal provide the human troubleshooting surface.',
    highlights: [
      'Connect through MCP and OAuth. Choose the deployments an agent can see and the actions it may take; revoke access from the Agents workspace.',
      'Give agents concrete tools: inspect releases, read deployment logs, check health, and check whether named settings are configured while keeping their values private.',
      'Ship an update from linked GitHub source or redeploy an app. A saved operation lets the agent follow progress and retrieve the result after reconnecting.',
      'Keep hands-on operations in the browser, too. The persistent host terminal supported the BNL playground build, its verification checks, and the recorded public result.',
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
      'Connected Twi speech recognition, visible language interpretation, and voice/text conversation in a working research preview.',
      'Built evaluation gates that can reject a trained model before it reaches the product.',
      'Built a bilingual data pipeline and GPU-backed speech and response-model services, with published checkpoints and model cards.',
    ],
    githubUrl: 'https://github.com/teckedd-code2save/ghana-health-ai',
    liveUrl: 'https://ghanahealth.serendepify.com',
  },
  {
    id: 'backend-as-natural-language',
    number: '02',
    title: 'Backend as Natural Language',
    tag: 'compiler research · try it live',
    category: 'tooling',
    canvasMode: 'terminal',
    description: 'A research compiler for turning controlled natural-language backend declarations into canonical, typed intermediate representations and executable plans.',
    stack: ['Rust', 'Compiler design', 'BIR', 'Language research', 'CI evaluation'],
    architecture: 'A catalogue-driven semantic frontend lowers declarations through one generic path, validates constraints, rejects contradictions, and emits canonical BIR for deterministic execution. The public playground runs the real Rust compiler and guarded executor as WebAssembly in an isolated browser worker over visitor-supplied records, with payments and messages blocked.',
    highlights: [
      '180/180 on a fresh 15-family holdout after freezing the compiler.',
      '1,000/1,000 on a 50-family synthetic and adversarial evaluation with blind inputs separated from labels.',
      'Shipped a real WebAssembly playground over visitor-supplied records; the recorded browser acceptance passed 31/31 checks, including rollback, tab isolation and rejection of external effects.',
      'Human-authored validation remains open: 20+ contributors and 250+ declarations.',
    ],
    liveUrl: '/#/playground/bnl',
  },
  {
    id: 'haven',
    number: '10',
    title: 'Haven',
    tag: '3D furniture + room planning',
    category: 'tooling',
    canvasMode: 'exchange',
    description: 'Explore furniture and see how a shortlist could fit into your room.',
    stack: [],
    architecture: 'A furniture collection connects product exploration with measured room layouts, a bird’s-eye plan, a 3D view, and retailer enquiries. Placement is schematic; openings, clearance, and delivery access still need to be confirmed.',
    highlights: [
      'Explore furniture in an interactive 3D shop.',
      'Build a shortlist and arrange pieces in a measured room.',
      'Continue the room plan in Studio or connect a retailer collection.',
    ],
    liveUrl: 'https://haven-room-studio-x9m4.createdliving1000.chatgpt.site/shop',
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

// Keep the home page and work index in the same, deliberately curated order.
export const spotlightIds = ['groundcontrol', 'rentaweekend', 'ghana-health-ai', 'backend-as-natural-language', 'convoy'];
export const spotlightProjects = spotlightIds.flatMap(id => projects.filter(project => project.id === id));
export const moreProjects = ['haven', 'pocket-models', 'intent-engine', 'adwuma-pa', 'shipd']
  .flatMap(id => projects.filter(project => project.id === id));

export const filterCategories: { label: string; value: ProjectCategory }[] = [
  { label: 'all work', value: 'all' },
  { label: 'deployment', value: 'deployment' },
  { label: 'AI + tooling', value: 'tooling' },
  { label: 'human systems', value: 'health' },
];
