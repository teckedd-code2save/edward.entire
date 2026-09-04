import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { newArticles } from '../content/article-library';

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
  ...newArticles,
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
                onClick={() => navigate(`/article/${article.id}`)}
                style={{ cursor: 'pointer' }}
                role="link"
                tabIndex={0}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') navigate(`/article/${article.id}`);
                }}
              >
                <div className="work-card-top"><span>{article.date}</span><span>{article.subtitle}</span></div>
                <h2>{article.title}</h2>
                <p>{article.description}</p>
                <div className="tag-row">{article.tags.map((item) => <span className="tiny-tag" key={item}>{item}</span>)}</div>
                <span className="article-card-link">Read article →</span>
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
