export interface WorkPresentation {
  summary: string;
  status: string;
  contribution: string;
  proof: string;
  evidence: { label: string; href: string };
  image?: { src: string; alt: string; width: number; height: number; caption: string };
  steps?: string[];
}

export const workPresentation: Record<string, WorkPresentation> = {
  groundcontrol: {
    summary: 'Connect ChatGPT and other AI agents to the apps you run. Inspect, deploy, and verify through MCP tools, with access you control.',
    status: 'Live product',
    contribution: 'I wanted the agent that helped build an app to stay useful after launch. GroundControl gives it deployment tools and a way to check the outcome. Operators choose its access, and every deploy request gets a saved operation the agent can return to.',
    proof: 'In the documented RentAWeekend run, ChatGPT inspected the deployment and checked the live runtime. A signed GitHub push then triggered a source deployment; GroundControl recorded its completion, healthy services, and a successful public response.',
    evidence: { label: 'Read the ChatGPT deployment story', href: 'https://github.com/teckedd-code2save/groundcontrol/blob/65d4e173acc8e54f49585aa4d16165f94959afa2/docs/articles/chatgpt-operated-my-deployment.md' },
    image: { src: '/groundcontrol-deployments.png', alt: 'GroundControl deployment workspace with configuration, runtime, and release verification stages.', width: 1280, height: 720, caption: 'Deployment workspace · captured 6 Sep 2026' },
  },
  rentaweekend: {
    summary: 'Find a plan for your weekend—or help with the errands in its way.',
    status: 'Live product',
    contribution: 'Built the research workflow, saved plans, and handoff to local helper tasks.',
    proof: 'Follow the product from a request to compared options and a helper brief.',
    evidence: { label: 'Explore the planning flow', href: 'https://rentmyweekend.serendepify.com' },
    image: { src: '/images/work/rentaweekend-planning.png', alt: 'RentAWeekend planning interface comparing two illustrative grocery pickup options in Tema.', width: 1280, height: 720, caption: 'Product capture · illustrative request and prices, not live offers' },
  },
  'ghana-health-ai': {
    summary: 'A voice-first health-information research preview built around Twi.',
    status: 'Research preview',
    contribution: 'Built the speech, language, evaluation, and serving pipeline behind the experience.',
    proof: 'Explore voice and text conversation, then inspect the model cards and research decisions.',
    evidence: { label: 'Explore the research', href: '/research' },
    image: { src: '/ghana-health-live.png', alt: 'Ghana Health AI voice and text interface with speech and language model choices.', width: 1512, height: 982, caption: 'Product capture · research preview' },
  },
  'backend-as-natural-language': {
    summary: 'Write a backend rule. Change the input. Inspect what actually runs.',
    status: 'Live playground',
    contribution: 'Built a Rust compiler and a browser playground for visitor-supplied data.',
    proof: 'The recorded public run returns false for days = 12 under the rule days > 30. Try your own input.',
    evidence: { label: 'See the execution evidence', href: '/article/shipping-bnl-through-groundcontrol' },
    image: { src: '/images/bnl/bnl-production-execution-20260928.jpg', alt: 'The public BNL playground returning false for a supplied value of 12 under the rule days greater than 30.', width: 1357, height: 932, caption: 'Actual browser execution · captured 28 Sep 2026' },
  },
  convoy: {
    summary: 'Rehearse a deployment, ship it, and follow what happens next.',
    status: 'Recorded product demo',
    contribution: 'Built the deployment workflow, approval gates, and execution trail.',
    proof: 'A recorded walkthrough follows the actual product through planning, rehearsal, and observation.',
    evidence: { label: 'Watch the product demo', href: 'https://www.youtube.com/watch?v=5btzce8adeE' },
    image: { src: '/images/work/convoy-viewer.png', alt: 'Convoy product viewer showing saved deployment plans and run states.', width: 1440, height: 900, caption: 'Product capture · from the public Convoy repository' },
  },
  haven: {
    summary: 'Explore furniture and see how a shortlist could fit into your room.',
    status: 'In development',
    contribution: 'Building an interactive furniture shop connected to measured room planning.',
    proof: 'Explore a piece, add it to a room, and switch between the floor plan and 3D view.',
    evidence: { label: 'Explore Haven', href: 'https://haven-room-studio-x9m4.createdliving1000.chatgpt.site/shop' },
    image: { src: '/images/work/haven-room-planning.png', alt: 'Haven room planner with a sofa placed in a 3D room and controls for the measured room dimensions.', width: 1280, height: 720, caption: 'Interactive room planning · in development' },
  },
  'pocket-models': {
    summary: 'Find an AI model and deployment approach that suit an Android device.',
    status: 'Interactive field guide',
    contribution: 'Built the model explorer and device-aware stack recommendations.',
    proof: 'Compare model footprints, modalities, and deployment tradeoffs in the live guide.',
    evidence: { label: 'Open the field guide', href: 'https://pocket-models.serendepify.com/' },
    steps: ['Your device', 'Open models', 'A practical stack'],
  },
  'intent-engine': {
    summary: 'An Android companion that helps you return to what you opened your phone to do.',
    status: 'Android prototype',
    contribution: 'Built local intent matching, app-context monitoring, and a focus overlay.',
    proof: 'The source documents the on-device workflow and its Android integrations.',
    evidence: { label: 'Explore the source', href: 'https://github.com/teckedd-code2save/IntentEngine-mvp' },
    steps: ['Set an intention', 'Notice the drift', 'Return to your task'],
  },
  'adwuma-pa': {
    summary: 'Voice check-ins that connect Ghanaian elders with their families.',
    status: 'Care prototype',
    contribution: 'Built the speech, translation, and family-relay workflow.',
    proof: 'Explore the implementation for Twi, Fante, and English check-ins.',
    evidence: { label: 'Explore the source', href: 'https://github.com/teckedd-code2save/adwuma-pa' },
    steps: ['Voice check-in', 'Understand a concern', 'Connect the family'],
  },
  shipd: {
    summary: 'Turn a repository into an explained deployment recommendation.',
    status: 'Live tool',
    contribution: 'Built repository analysis, platform scoring, and an ordered shipping plan.',
    proof: 'Inspect how repository signals become platform tradeoffs and a delivery plan.',
    evidence: { label: 'Inspect the source', href: 'https://github.com/teckedd-code2save/shipd' },
    steps: ['Read the repository', 'Compare platforms', 'Plan the release'],
  },
};
