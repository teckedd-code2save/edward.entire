import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { newArticles } from '../content/article-library';

const articles = [
  {
    id: 'nsenter-bridge',
    title: 'Running Host Commands from a Container',
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
          <h1 className="display">Engineering<br /><span style={{ color: 'var(--blue)' }}>notes.</span></h1>
          <p className="lede">Detailed accounts of systems I have built, the failures that changed them, and the evidence behind each engineering decision.</p>
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
                <h2>{article.title}{'accent' in article ? ` ${article.accent}` : ''}</h2>
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
          <div><p className="eyebrow">Editorial standard</p><h2 className="section-title">Written from<br /><span style={{ color: 'var(--acid)' }}>production evidence.</span></h2></div>
          <p className="lede">Each article links its argument to a working system, measured result, production incident, or research artifact.</p>
        </div>
      </section>
    </div>
  );
}
