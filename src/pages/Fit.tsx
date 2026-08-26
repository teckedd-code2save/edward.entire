import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const roles = [
  {
    fit: 'Best fit',
    title: 'Senior backend engineer, AI products',
    signal: 'Strong now',
    body: 'Edward brings TypeScript and Python services, Postgres, APIs, Docker, production ownership, and AI features backed by real evaluation—not demo-only integrations.',
    proof: ['Ghana Health AI', 'GroundControl', 'GhanaAPI'],
  },
  {
    fit: 'Differentiated',
    title: 'Applied AI / voice engineer',
    signal: 'Strong with the right team',
    body: 'A rare combination of low-resource language work—Twi ASR/TTS, synthetic corpora, model benchmarking, promotion gates, and fallback behavior—with the engineering to put it in a user-facing system.',
    proof: ['Twi benchmark suite', 'Modal GPU services', 'Akan Speech Lab'],
  },
  {
    fit: 'Competitive',
    title: 'AI platform / agent infrastructure engineer',
    signal: 'Credible, needs scale evidence',
    body: 'Agent runtimes, observability, deployment automation, safe action boundaries, and self-hosted operations make this a credible match. The next proof point is sustained multi-team or high-throughput platform scale.',
    proof: ['Agent Ops', 'Convoy', 'Shipd'],
  },
  {
    fit: 'Selective',
    title: 'Founding engineer, AI startup',
    signal: 'High-upside match',
    body: 'For a founding team, Edward can move across product, backend, frontend, models, and operations while keeping the system coherent. The fit is strongest where end-to-end technical ownership matters.',
    proof: ['Production ownership', 'Rapid product breadth', 'Ghana-first judgment'],
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
          <h1 className="display">Where the work<br /><span style={{ color: 'var(--blue)' }}>competes.</span></h1>
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
                <h2>{role.title}</h2><p>{role.body}</p>
                <div className="tag-row">{role.proof.map((item) => <span className="tiny-tag" key={item}>{item}</span>)}</div>
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
