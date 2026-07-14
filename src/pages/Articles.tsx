import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const articles = [
  {
    id: 'nsenter-bridge',
    title: 'The Container That Escaped',
    subtitle: 'How GroundControl breaks out of Docker to run host commands',
    description: 'Every self-hosted dashboard hits the same wall: containers are jails. This is the story of how GroundControl uses an ephemeral privileged helper and 5 lines of shell to run host commands from inside Docker — no SSH, no host agent, no --pid=host.',
    tags: ['infrastructure', 'docker', 'architecture'],
    date: 'July 2026',
    color: 'var(--blue)',
  },
  {
    id: 'exactly-once',
    title: 'Exactly-Once at 250k Scale',
    subtitle: 'How a Redis idempotency pattern guarantees nobody gets paid twice',
    description: 'Processing monthly payroll for 250k+ people means a duplicate payment is someones rent. This walks through the Kafka consumer, Redis idempotency keys, and the parallelized pipeline that ensures exactly-once settlement.',
    tags: ['payments', 'kafka', 'redis', 'distributed-systems'],
    date: 'Coming soon',
    color: 'var(--acid)',
  },
  {
    id: 'agent-brain',
    title: 'An Agent That Never Lies',
    subtitle: 'Profile-grounded judgment and why confidence scoring matters',
    description: 'The hardest problem in autonomous agents is not capability — it is trust. This covers the HANDS+BRAIN+LOOP architecture, how the answer engine reasons over a candidate profile with hard guardrails, and why deferring to a human is the most honest thing an agent can do.',
    tags: ['ai', 'agents', 'architecture'],
    date: 'Coming soon',
    color: 'var(--blue)',
  },
];

export default function Articles() {
  const navigate = useNavigate();

  return (
    <div>
      <header className="page-hero">
        <motion.div className="page-shell" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}>
          <p className="eyebrow">Writing index</p>
          <h1 className="display">Technical<br /><span style={{ color: 'var(--blue)' }}>articles.</span></h1>
          <p className="lede">Deep dives into infrastructure, distributed systems, and AI agents. No fluff, no SEO filler — just the architecture and the decisions behind it.</p>
        </motion.div>
      </header>

      <section className="editorial-section">
        <div className="page-shell">
          <div className="work-grid">
            {articles.map((article, i) => (
              <motion.div
                className="work-card"
                key={article.id}
                layout
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => article.id === 'nsenter-bridge' ? navigate(`/article/${article.id}`) : null}
                style={{ cursor: article.id === 'nsenter-bridge' ? 'pointer' : 'default' }}
              >
                <div className="work-card-top"><span>{article.date}</span><span>{article.subtitle}</span></div>
                <h2>{article.title}</h2>
                <p>{article.description}</p>
                <div className="tag-row">{article.tags.map((item) => <span className="tiny-tag" key={item}>{item}</span>)}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="editorial-section dark-section">
        <div className="page-shell section-head" style={{ marginBottom: 0 }}>
          <div><p className="eyebrow">The philosophy</p><h2 className="section-title">Write what you<br /><span style={{ color: 'var(--acid)' }}>built.</span></h2></div>
          <p className="lede">Every article documents a real system, a real decision, a real tradeoff. No theory without practice. These are technical post-mortems from production, not blog posts from a desk.</p>
        </div>
      </section>
    </div>
  );
}
