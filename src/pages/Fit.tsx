import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const roles = [
  {
    fit: 'Best fit',
    title: 'Senior backend engineer, AI products',
    signal: 'Strong now',
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
    fit: 'Differentiated',
    title: 'Applied AI / voice engineer',
    signal: 'Strong with the right team',
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
    fit: 'Competitive',
    title: 'AI platform / agent infrastructure engineer',
    signal: 'Credible, needs scale evidence',
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
    fit: 'Selective',
    title: 'Founding engineer, AI startup',
    signal: 'High-upside match',
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
  return (
    <div>
      <header className="page-hero fit-hero">
        <motion.div className="page-shell" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .75, ease: [0.16, 1, 0.3, 1] }}>
          <p className="eyebrow">Market position · evidence over adjectives</p>
          <h1 className="display">Roles backed by<br /><span style={{ color: 'var(--blue)' }}>shipped work.</span></h1>
          <div className="fit-intro">
            <p className="lede">For teams hiring at the intersection of backend engineering and applied AI, Edward offers something unusually complete: model evaluation, product infrastructure, deployment ownership, and grounded work in low-resource voice technology.</p>
            <div className="fit-stamp"><strong>Best hiring case</strong><span>A backend engineer who can evaluate, ship, and operate production AI systems.</span></div>
          </div>
        </motion.div>
      </header>

      <section className="editorial-section">
        <div className="page-shell">
          <div className="section-head"><div><p className="eyebrow">01 · Where Edward adds value</p><h2 className="section-title">Four lanes.<br />One clear lead.</h2></div><p className="lede">Role titles vary. The durable value is ownership of the software around intelligent systems: APIs, data, evaluation, deployment, safety, and observability.</p></div>
          <div className="fit-grid">
            {roles.map((role, index) => (
              <article className="fit-card" key={role.title}>
                <div className="fit-card-top"><span>0{index + 1} / {role.fit}</span><strong>{role.signal}</strong></div>
                <h2>{role.title}</h2><p className="fit-thesis">{role.body}</p>
                <div className="fit-evidence"><span>Why the work supports it</span><ul>{role.evidence.map((item) => <li key={item}>{item}</li>)}</ul></div>
                <div className="tag-row">{role.proof.map((item) => <span className="tiny-tag" key={item}>{item}</span>)}</div>
                <Link className="fit-proof-link" to={role.route}>{role.routeLabel} ↗</Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="editorial-section dark-section">
        <div className="page-shell">
          <div className="section-head"><div><p className="eyebrow">02 · Evidence in progress</p><h2 className="section-title">What is proven.<br /><span style={{ color: 'var(--acid)' }}>What comes next.</span></h2></div><p className="lede">The projects establish range and technical judgment. These are the next signals an employer should expect to see as the systems and research mature.</p></div>
          <div className="gap-list">
            {gaps.map((gap) => <article className="gap-row" key={gap.number}><b>{gap.number}</b><h3>{gap.title}</h3><div><p>{gap.body}</p><span>{gap.action}</span></div></article>)}
          </div>
        </div>
      </section>

      <section className="editorial-section fit-cta">
        <div className="page-shell section-head" style={{ marginBottom: 0 }}>
          <div><p className="eyebrow">03 · The hiring shortlist</p><h2 className="section-title">AI backend.<br />Voice. Platform.</h2></div>
          <div><p className="lede">For teams building in those spaces, the work page carries the product proof and the research lab shows the experimental depth behind it.</p><div className="hero-actions"><Link className="button-primary" to="/projects">Inspect the work ↗</Link><Link className="button-ghost" to="/contact">Discuss a role</Link></div></div>
        </div>
      </section>
    </div>
  );
}
