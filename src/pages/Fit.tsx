import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const roles = [
  {
    fit: 'Best fit',
    title: 'Senior backend engineer, AI products',
    signal: 'Strong now',
    body: 'The most credible lane: TypeScript and Python services, Postgres, APIs, Docker, production ownership, and AI features with real evaluation—not demo-only integrations.',
    proof: ['Ghana Health AI', 'GroundControl', 'GhanaAPI'],
  },
  {
    fit: 'Differentiated',
    title: 'Applied AI / voice engineer',
    signal: 'Strong with the right team',
    body: 'Your edge is low-resource language work: Twi ASR/TTS, synthetic corpora, model benchmarking, promotion gates, fallback behavior, and turning research into a user-facing system.',
    proof: ['Twi benchmark suite', 'Modal GPU services', 'Akan Speech Lab'],
  },
  {
    fit: 'Competitive',
    title: 'AI platform / agent infrastructure engineer',
    signal: 'Credible, needs scale evidence',
    body: 'Agent runtimes, observability, deployment automation, safe action boundaries, and self-hosted operations map well. The missing proof is sustained multi-team or high-throughput platform scale.',
    proof: ['Agent Ops', 'Convoy', 'Shipd'],
  },
  {
    fit: 'Selective',
    title: 'Founding engineer, AI startup',
    signal: 'High-upside match',
    body: 'You repeatedly move across product, backend, frontend, models, and operations. Target founders who value end-to-end ownership; avoid roles that really mean pixel-heavy frontend generalist.',
    proof: ['Production ownership', 'Rapid product breadth', 'Ghana-first judgment'],
  },
];

const gaps = [
  {
    number: '01',
    title: 'Make impact measurable.',
    body: 'Add users served, request volume, latency, reliability, model accuracy, cost, and before/after results. Your portfolio proves breadth; numbers will prove professional impact.',
    action: 'Publish one operating scorecard for Ghana Health AI.',
  },
  {
    number: '02',
    title: 'Show depth under load.',
    body: 'Senior platform roles look for distributed-system trade-offs, queues, failure recovery, tracing, capacity planning, and incident learning—not only successful deployment.',
    action: 'Write a technical case study with an architecture diagram and failure story.',
  },
  {
    number: '03',
    title: 'Tighten the claim surface.',
    body: 'Only foreground technologies that recent work can defend in an interview. A smaller evidence-backed stack reads stronger than a long proficiency inventory.',
    action: 'Lead with TypeScript, Python, Postgres, Docker, Linux, AI evals, and voice.',
  },
  {
    number: '04',
    title: 'Create external validation.',
    body: 'Your work is founder-shaped but mostly self-authored. Hiring panels will want signals from users, collaborators, open-source adoption, talks, papers, or shipped team outcomes.',
    action: 'Earn two references and publish one benchmark or open dataset.',
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
            <p className="lede">A candid role map based on systems I have actually built and operated—not a keyword score. My strongest category is backend engineering for AI products, especially where models, infrastructure, and real-world constraints meet.</p>
            <div className="fit-stamp"><strong>Primary pitch</strong><span>Backend engineer who ships and evaluates production AI systems.</span></div>
          </div>
        </motion.div>
      </header>

      <section className="editorial-section">
        <div className="page-shell">
          <div className="section-head"><div><p className="eyebrow">01 · Competitive match</p><h2 className="section-title">Four lanes.<br />One clear lead.</h2></div><p className="lede">Role titles vary. The durable match is ownership of the software around intelligent systems: APIs, data, evaluation, deployment, safety, and observability.</p></div>
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
          <div className="section-head"><div><p className="eyebrow">02 · Improvement agenda</p><h2 className="section-title">Close the gap<br /><span style={{ color: 'var(--acid)' }}>with evidence.</span></h2></div><p className="lede">The main constraint is not a lack of projects. It is making depth, scale, and impact legible to a hiring panel in minutes.</p></div>
          <div className="gap-list">
            {gaps.map((gap) => <article className="gap-row" key={gap.number}><b>{gap.number}</b><h3>{gap.title}</h3><div><p>{gap.body}</p><span>{gap.action}</span></div></article>)}
          </div>
        </div>
      </section>

      <section className="editorial-section fit-cta">
        <div className="page-shell section-head" style={{ marginBottom: 0 }}>
          <div><p className="eyebrow">03 · The shortlist</p><h2 className="section-title">AI backend.<br />Voice. Platform.</h2></div>
          <div><p className="lede">Those are the searches worth prioritizing. The work page carries the proof; the research page shows the depth behind it.</p><div className="hero-actions"><Link className="button-primary" to="/projects">Inspect the work ↗</Link><Link className="button-ghost" to="/contact">Start a conversation</Link></div></div>
        </div>
      </section>
    </div>
  );
}
