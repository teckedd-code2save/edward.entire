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
    tag: 'agent-operable infrastructure control plane',
    category: 'deployment',
    canvasMode: 'terminal',
    description: 'A self-hosted infrastructure control plane that lets humans and remote agents inspect and operate deployments without collapsing the trust boundary into generic SSH or shell access.',
    stack: ['TypeScript', 'MCP + OAuth', 'Docker', 'Linux', 'WebSockets', 'Caddy/Nginx'],
    architecture: 'A Next.js control plane reconciles Docker/Compose, proxy routes, deployments and host state locally or over SSH. Remote agents receive exact workload/capability grants through MCP/OAuth; mutations become durable idempotent operations; exact deployed revisions can be reproduced in ephemeral sandboxes before repair.',
    highlights: [
      'Scoped MCP/OAuth access with rotating/revocable credentials and no generic remote-agent shell.',
      'Durable agent operations preserve evidence across disconnects and mark ambiguous non-replayable work uncertain instead of blindly retrying.',
      'Capability-level connector health, exact deployment→repository identity, Daytona exact-revision validation, and deterministic failure isolation before model reasoning.',
    ],
    githubUrl: 'https://github.com/teckedd-code2save/groundcontrol',
    liveUrl: 'https://groundcontrol.serendepify.com/',
  },
  {
    id: 'rentaweekend',
    number: '04',
    title: 'RentAWeekend',
    tag: 'real-world agent execution',
    category: 'tooling',
    canvasMode: 'agents',
    description: 'A planning and execution marketplace where conversational research can become reviewed, paid, human-executed work without letting the model silently cross real-world effect boundaries.',
    stack: ['TypeScript', 'PostgreSQL', 'Prisma', 'Agents', 'Paystack', 'Provider orchestration'],
    architecture: 'Conversational planning persists research, choices, provenance, arrangements, and execution state. Selected results become helper tasks only after explicit review; row locks and uniqueness constraints make retries converge; payment, safety, matching, and acceptance remain separate gates. Search partners can run in shadow mode before influencing canonical results.',
    highlights: [
      'Concurrency-safe plan→task conversion uses transaction boundaries, row locks, uniqueness constraints, and retry-safe provenance.',
      'Shadow provider integration measures overlap and field coverage asynchronously, fails open, and preserves canonical venue identity.',
      'Bounded model/provider recovery preserves validated facts as checkpoints instead of throwing away successful work.',
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
    tag: 'Twi-first health companion',
    category: 'health',
    canvasMode: 'agents',
    description: 'A Twi-first speech-and-language research system connecting corpus provenance, ASR, human review, model adaptation, semantic evaluation, GPU training, and a deployed voice product.',
    stack: ['Next.js', 'Python', 'Modal GPU', 'PostgreSQL', 'Whisper/W2V-BERT', 'Qwen LoRA'],
    architecture: 'The live product and research workbench share explicit evidence boundaries: ASR/TTS and semantic models run behind guarded interfaces; corpus candidates, reviewed data, model revisions, evaluation fixtures, and promotion decisions remain separately traceable. The next systems phase adds Arrow/Parquet lineage, profiling, distributed training, checkpoint/recovery, and serving benchmarks.',
    highlights: [
      '12,223 review candidates and a separate 7,814-row silver research corpus, with source/evidence classes kept distinct.',
      'Speech and semantic checkpoints are published with measured results and negative promotion decisions rather than hidden failures.',
      'The next capstone instruments the full ML path from dataset layout through GPU training, recovery, evaluation, and serving.',
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
