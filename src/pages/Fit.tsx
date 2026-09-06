import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './WorkFitStudio.css';

const roles = [
  {
    title: 'Senior backend engineer, AI products',
    body: 'Hire Edward when the backend has to do more than move JSON: it must coordinate models, data, safety, payments, and infrastructure without becoming fragile.',
    evidence: [
      'Built Ghana Health AI across typed APIs, Postgres/Prisma, retrieval, commerce, authentication, rate limits, audit trails, and streamed conversations.',
      'Runs the product on a self-hosted Docker and Caddy stack with secret sync, migrations, CI/CD, smoke checks, logs, and rollback paths.',
      'Built GhanaAPI and infrastructure control tooling, showing reusable API and operational judgment beyond a single product.',
    ],
    proof: ['Ghana Health AI', 'GroundControl', 'GhanaAPI'],
    route: '/projects',
    routeLabel: 'See the production systems',
  },
  {
    title: 'Applied AI / voice engineer',
    body: 'Hire Edward when speech research must leave the notebook and survive contact with real users, noisy audio, code-switching, safety constraints, and production latency.',
    evidence: [
      'Published speech checkpoints and Qwen LoRA understanding adapters, connecting Whisper/DONDO research to a 7,814-row silver corpus and Modal A100 training.',
      'Improved DONDO from 71.91% zero-shot WER to 35.77% in v1, then reached 27.31% with v2 plus a Twi language-model decoder.',
      'Built a 12,223-candidate review queue, human-review and export tooling, shadow integration, and semantic tests; held v3 back despite 7/11 fixture passes because meaning errors remained.',
    ],
    proof: ['Twi benchmark suite', 'Modal GPU services', 'Akan Speech Lab'],
    route: '/research',
    routeLabel: 'Enter the research lab',
  },
  {
    title: 'AI platform / agent infrastructure engineer',
    body: 'Hire Edward to build the dependable layer around agents: execution boundaries, observable workflows, deployment decisions, and human control over consequential actions.',
    evidence: [
      'Convoy turns deployment into an explicit rehearse–ship–observe agent loop instead of an opaque one-shot action.',
      'Agent Ops and GroundControl combine runtime supervision, logs, container operations, reverse-proxy control, and human-readable status.',
      'Shipd inspects a real repository, compares eleven platforms, explains trade-offs, and produces an actionable deployment plan.',
    ],
    proof: ['Agent Ops', 'Convoy', 'Shipd'],
    route: '/projects',
    routeLabel: 'Inspect the platform work',
  },
  {
    title: 'Founding engineer, AI startup',
    body: 'Hire Edward as a founding engineer when the company needs one owner who can turn an underserved problem into a coherent product, technical system, research program, and production operation.',
    evidence: [
      'Took Ghana Health AI from a Ghana-specific product thesis to UX, health and commerce workflows, voice intelligence, model evaluation, and a live deployment.',
      'Works across React and Next.js, TypeScript and Python, Postgres, GPU inference, Docker, CI/CD, secrets, observability, and product safety without losing the user problem.',
      'Repeated the zero-to-working-system pattern across deployment agents, on-device AI, family care, Ghanaian APIs, and infrastructure tools.',
    ],
    proof: ['0→1 product ownership', 'Research + engineering', 'Build + operate'],
    route: '/projects',
    routeLabel: 'See the range of 0→1 work',
  },
];

const gaps = [
  {
    number: '01',
    title: 'Production impact is the next signal.',
    body: 'The portfolio already proves technical breadth. User counts, request volume, latency, reliability, model accuracy, cost, and before-and-after results will make the operating impact easier for a hiring panel to verify.',
    action: 'Next evidence: a public Ghana Health AI operating scorecard.',
  },
  {
    number: '02',
    title: 'Platform depth is emerging.',
    body: 'The work demonstrates deployment ownership and failure-aware design. Senior platform teams will also look for evidence of queues, tracing, capacity planning, incident learning, and trade-offs under sustained load.',
    action: 'Next evidence: a case study with architecture, scale, and a failure story.',
  },
  {
    number: '03',
    title: 'The strongest stack is focused.',
    body: 'The clearest interview-ready story is narrower than the complete technology inventory: production backend engineering joined to model evaluation and voice infrastructure.',
    action: 'Core signal: TypeScript, Python, Postgres, Docker, Linux, AI evals, and voice.',
  },
  {
    number: '04',
    title: 'External validation will compound the work.',
    body: 'The portfolio is founder-shaped and substantially self-authored. References, open-source adoption, collaborators, talks, publications, or shipped team outcomes would give employers independent confirmation of the signal.',
    action: 'Next evidence: references plus a published benchmark or open dataset.',
  },
];

export default function Fit() {
  const reduceMotion = useReducedMotion();
  const reveal = {
    initial: reduceMotion ? false : { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.1 },
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
  };

  return (
    <div className="work-fit-studio fit-studio">
      <header className="studio-shell fit-masthead">
        <motion.div className="fit-hero-copy" {...reveal}>
          <p className="studio-kicker">Working together / Edward Twumasi</p>
          <h1 className="studio-title fit-title">From model<br />to <span>live product.</span></h1>
          <p className="studio-lede">I build the software around intelligent systems: the APIs, data, evaluation, and infrastructure that connect an experiment to a product people can use.</p>
          <div className="fit-hero-actions">
            <button
              className="studio-action"
              type="button"
              onClick={() => document.getElementById('role-evidence')?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' })}
            >
              Explore the role evidence <span aria-hidden="true">↓</span>
            </button>
          </div>
        </motion.div>

        <motion.figure className="fit-ownership" {...reveal}>
          <svg viewBox="0 0 420 340" role="img" aria-labelledby="fit-ownership-title fit-ownership-description">
            <title id="fit-ownership-title">Evaluate, build, operate</title>
            <desc id="fit-ownership-description">Connected ownership across model and meaning evaluation, product engineering, and production operations.</desc>
            <g fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M52 68V260" opacity="0.23" />
              <path d="M52 68H370M52 164H370M52 260H370" opacity="0.13" />
              <circle cx="52" cy="68" r="17" fill="var(--studio-paper, #ebeae7)" />
              <circle cx="52" cy="164" r="17" fill="var(--studio-paper, #ebeae7)" />
              <circle cx="52" cy="260" r="17" fill="var(--studio-paper, #ebeae7)" />
              <path d="M42 68h6l4-7 4 14 4-7h3M44 157h16v14H44zM44 262l5 5 11-13" stroke="var(--studio-blue, #456eaa)" strokeWidth="1.5" />
              <path d="M379 68h10v192h-10" opacity="0.23" />
            </g>
            <g fill="currentColor" fontFamily="inherit">
              <text x="88" y="62" fontSize="23" fontWeight="500">Evaluate</text>
              <text x="88" y="86" fontSize="13" opacity="0.65">Models, data, and meaning</text>
              <text x="88" y="158" fontSize="23" fontWeight="500">Build</text>
              <text x="88" y="182" fontSize="13" opacity="0.65">APIs, product, and infrastructure</text>
              <text x="88" y="254" fontSize="23" fontWeight="500">Operate</text>
              <text x="88" y="278" fontSize="13" opacity="0.65">Deployments, monitoring, and recovery</text>
            </g>
          </svg>
          <figcaption>One connected practice, from evaluation to operations.</figcaption>
        </motion.figure>
      </header>

      <section className="studio-shell studio-section" id="role-evidence" aria-labelledby="fit-roles-title">
        <motion.div className="studio-section-heading" {...reveal}>
          <div>
            <p className="studio-kicker">01 / Role evidence</p>
            <h2 id="fit-roles-title">The work behind<br />the role.</h2>
          </div>
          <p className="studio-lede">Four ways that experience can serve a team. Each starts with a problem to own and points to the work behind it.</p>
        </motion.div>

        <div className="fit-role-list">
          {roles.map((role, index) => (
            <motion.article className="fit-role-row" key={role.title} {...reveal}>
              <div className="fit-role-heading">
                <p className="studio-kicker">Role / 0{index + 1}</p>
                <h3>{role.title}</h3>
                <p>{role.body}</p>
              </div>
              <div className="fit-role-evidence">
                <p className="studio-kicker fit-evidence-label">Selected evidence</p>
                <ul>{role.evidence.map((item) => <li key={item}>{item}</li>)}</ul>
                <p className="fit-proof-index">{role.proof.join(' · ')}</p>
                <Link className="studio-action" to={role.route}>{role.routeLabel} <span aria-hidden="true">↗</span></Link>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="fit-next-section" aria-labelledby="fit-next-title">
        <div className="studio-shell studio-section">
          <motion.div className="studio-section-heading" {...reveal}>
            <div>
              <p className="studio-kicker">02 / The next evidence</p>
              <h2 id="fit-next-title">A clear view of<br />what comes next.</h2>
            </div>
            <p className="studio-lede">The projects show what I can build. These are the areas where further operating results and independent evidence will make the work easier to assess.</p>
          </motion.div>
          <div className="fit-next-list">
            {gaps.map((gap) => (
              <motion.article className="fit-next-row" key={gap.number} {...reveal}>
                <span className="studio-kicker fit-next-number">{gap.number}</span>
                <h3>{gap.title}</h3>
                <div className="fit-next-copy">
                  <p>{gap.body}</p>
                  <p className="fit-next-action">{gap.action}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="studio-shell studio-section fit-contact-section" aria-labelledby="fit-contact-title">
        <motion.div className="studio-section-heading" {...reveal}>
          <div>
            <p className="studio-kicker">03 / Start a conversation</p>
            <h2 id="fit-contact-title">What are<br />you building?</h2>
          </div>
          <div>
            <p className="studio-lede">If your team is working on AI backends, voice, or platform infrastructure, let’s talk about the problem, the stage you’re at, and what needs an owner.</p>
            <div className="fit-hero-actions">
              <Link className="studio-button" to="/contact">Discuss a role <span aria-hidden="true">↗</span></Link>
              <Link className="studio-action" to="/projects">Explore the work <span aria-hidden="true">↗</span></Link>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
