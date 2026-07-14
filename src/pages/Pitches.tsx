import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const decks = [
  {
    id: 'groundcontrol',
    title: 'GroundControl',
    subtitle: 'VPS Fleet Control Plane',
    line1: 'The VPS cockpit that',
    line2: 'escaped its container.',
    description: 'A self-hosted dashboard and deployment control plane. One install, one SQLite file, zero agents. Manages Docker, k3s, Cloud Run, and Terraform from a single browser window.',
    stack: ['Next.js 16', 'TypeScript', 'Prisma', 'SQLite', 'Docker', 'k3s', 'Terraform', 'Cloudflare'],
    liveUrl: 'https://groundcontrol.serendepify.com',
    color: 'var(--blue)',
  },
  {
    id: 'convoy',
    title: 'Convoy',
    subtitle: 'AI Deployment Agent',
    line1: 'Deployments that',
    line2: 'fix themselves.',
    description: 'An AI agent that diagnoses build failures, rehearses deploys, ships behind canary gates, and auto-rolls back on metric degradation. Claude tool-use + MCP.',
    stack: ['Claude', 'MCP', 'TypeScript', 'Docker', 'GitHub Actions', 'GHCR'],
    githubUrl: 'https://github.com/teckedd-code2save',
    color: 'var(--acid)',
  },
  {
    id: 'agent-system',
    title: 'Autonomous Agent',
    subtitle: 'HANDS + BRAIN + LOOP',
    line1: 'Agents that',
    line2: 'never lie.',
    description: 'Self-improving AI agent with profile-grounded judgment, honesty enforcement, confidence scoring, and defer-on-risk. Voice companion, Telegram gateway, universal form filler.',
    stack: ['Python', 'TypeScript', 'Claude', 'OpenAI', 'pgvector', 'Docker', 'Telegram'],
    githubUrl: 'https://github.com/teckedd-code2save',
    color: 'var(--blue)',
  },
];

export default function Pitches() {
  const navigate = useNavigate();

  return (
    <div>
      <header className="page-hero">
        <motion.div className="page-shell" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}>
          <p className="eyebrow">Pitch index</p>
          <h1 className="display">Product<br /><span style={{ color: 'var(--blue)' }}>decks.</span></h1>
          <p className="lede">Investor-ready and contributor-ready decks for each system. Updated as the products evolve.</p>
        </motion.div>
      </header>

      <section className="editorial-section">
        <div className="page-shell">
          <div className="work-grid">
            {decks.map((deck, i) => (
              <motion.div
                className="work-card"
                key={deck.id}
                layout
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => navigate(`/deck/${deck.id}`)}
                style={{ cursor: 'pointer' }}
              >
                <div className="work-card-top"><span>{String(i + 1).padStart(2, '0')}</span><span>{deck.subtitle}</span></div>
                <h2>{deck.title}</h2>
                <p>{deck.description}</p>
                <div className="tag-row">{deck.stack.map((item) => <span className="tiny-tag" key={item}>{item}</span>)}</div>
                <div className="work-card-links" onClick={(e) => e.stopPropagation()}>
                  {deck.liveUrl && <a href={deck.liveUrl} target="_blank" rel="noreferrer">Live product ↗</a>}
                  {deck.githubUrl && <a href={deck.githubUrl} target="_blank" rel="noreferrer">Source ↗</a>}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="editorial-section dark-section">
        <div className="page-shell section-head" style={{ marginBottom: 0 }}>
          <div><p className="eyebrow">What these represent</p><h2 className="section-title">Every product.<br /><span style={{ color: 'var(--acid)' }}>Has a story.</span></h2></div>
          <p className="lede">A pitch deck is not a feature list. It is the argument for why a system exists — the problem it solves, the insight that makes it different, and the evidence that it works. These decks are living documents, updated as the products grow.</p>
        </div>
      </section>
    </div>
  );
}
