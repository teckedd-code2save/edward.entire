import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const decks: Record<string, {
  title: string; line1: string; line2: string; subtitle: string;
  slides: { title?: string; accent?: string; body?: string[]; bullets?: string[]; stats?: {num: string; label: string}[]; code?: string; tags?: string[] }[];
}> = {
  groundcontrol: {
    title: 'GroundControl',
    line1: 'Give your agents the access',
    line2: 'to follow through.',
    subtitle: 'An open-source, self-hosted control plane for your VPS. Discover your apps and connect compatible agents through MCP and OAuth.',
    slides: [
      { title: 'Start with what is running', body: ['GroundControl discovers existing Docker Compose apps on your VPS. Choose which to enroll, then connect their source, runtime, and public address. The dashboard supports hands-on operations before you connect an external agent.'], tags: ['MCP', 'OAuth', 'TypeScript', 'Next.js 16', 'Docker', 'SQLite'] },
      { title: 'Connect the agent. Approve its access.', body: ['Add GroundControl to ChatGPT or another compatible remote MCP client. Sign in with OAuth, review the capabilities the client requests, and select the deployments it may access.'], bullets: ['Access to selected applications', 'Separate scopes for reads and deployment actions', 'Revocable grants in the Agents workspace'] },
      { title: 'Tools for the next operational decision', bullets: ['Inspect the running revision and recent releases', 'Read deployment logs and check health', 'Check whether named settings are configured while keeping values private', 'Build and deploy linked GitHub source, or redeploy an app', 'Retrieve operation progress and verification evidence'] },
      { title: 'A result you can return to', body: ['A deploy request returns a saved operation ID. The agent can reconnect and retrieve progress, verification evidence, or an error. Repeating the same request key returns the existing operation.'], bullets: ['GroundControl records the work beyond the chat request', 'Runtime and public endpoint checks help establish the outcome', 'Interrupted work is surfaced as uncertain when its outcome cannot be established'] },
      { title: 'Used on real applications', body: ['The documented RentAWeekend run paired ChatGPT deployment inspection with a signed GitHub push that triggered a source deployment. GroundControl recorded completion, healthy services, and a successful public response.', 'For hands-on work, operators also have a persistent host terminal. I used that surface to build and verify the BNL browser playground.'] },
    ],
  },
  convoy: {
    title: 'Convoy',
    line1: 'Deployments that',
    line2: 'fix themselves.',
    subtitle: 'An AI deployment agent that diagnoses build failures, rehearses deploys, and ships safely.',
    slides: [
      { body: [], stats: [{num:'AI',label:'Claude tool-use loop'},{num:'MCP',label:'Every capability is a tool'},{num:'Safe',label:'Human gate on irreversible actions'}], tags: ['Claude','MCP','TypeScript','Docker','GitHub Actions','GHCR'] },
      { title: 'The problem', body: ['Deploys break. Humans fix them. That is slow. Every team knows this loop: push to main → CI fails → someone reads logs → guesses at root cause → tries a fix → pushes again. At 3 AM, the deploy stays broken until a human wakes up.'] },
      { title: 'How it works', body: ['Claude reads CI logs and changed source files → identifies whether it is a compilation error, test failure, config drift, or infra issue → if the fix is unambiguous and safe, applies it and re-deploys → if risky, pauses and flags a human.'], bullets: ['Diagnose: read logs + source','Categorize: code / config / infra','Rehearse: throwaway environment','Deploy: canary gates','Rollback: on metric degradation'] },
      { title: 'Designed for trust', bullets: ['Rehearsal before mutation — test on throwaway env first','Evidence trails — every tool call, every decision recorded','Human gate on irreversible actions','Capability-bound MCP tools — explicit, auditable scope'] },
      { title: 'Status', body: ['Private beta. Deployed on Edward infrastructure, managing deploys for GroundControl and companion services. Core loop (diagnose → categorize → rehearse → deploy → rollback) working end-to-end.'], tags: ['Claude','MCP','TypeScript','Docker','GHCR','GitHub Actions'] },
    ],
  },
  'agent-system': {
    title: 'Autonomous Agent',
    line1: 'Agents that',
    line2: 'never lie.',
    subtitle: 'Self-improving AI agent architecture with profile-grounded judgment, honesty enforcement, and universal actuation.',
    slides: [
      { body: [], stats: [{num:'HANDS',label:'Vision + CDP: any widget'},{num:'BRAIN',label:'Profile-grounded reasoning'},{num:'LOOP',label:'Always-on, self-improving'}], tags: ['Python','TypeScript','Claude','OpenAI','pgvector','Docker','Telegram','WebSocket'] },
      { title: 'The three-tier architecture', bullets: ['🖐️ HANDS — Universal actuation via vision + trusted CDP. Clicks by pixel, types by keyboard. Works on any web widget.','🧠 BRAIN — Profile-grounded answer engine. Hard guardrails. Never claims citizenship or authorization not held. Confidence scoring. Defers to human.','🔄 LOOP — Cron jobs, voice companion, Telegram gateway. Self-improving KB. Resolved questions stored and never re-solved.','🔐 Honesty by design — confidence below 0.6 → defer. Legal questions → defer. Perjury → refuse.'] },
      { title: 'What it powers', bullets: ['Job application engine — autonomous form filling across LinkedIn, Greenhouse, SmartRecruiters','Voice companion — real-time speech-to-speech with barge-in and tool-calling','Telegram gateway — same agent brain from any phone','Universal form filler — generalizes to any web form, swap the profile'] },
      { title: 'Why this matters', body: ['Most AI agent demos are toys. This system does real work on real infrastructure. It submitted 20+ job applications with honest answers — never claimed a citizenship or authorization not held, deferred on legal questions, learned from every interaction and never repeated a mistake.'] },
    ],
  },
};

export default function DeckViewer() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const deck = id ? decks[id] : null;

  if (!deck) return (
    <div className="page-hero"><div className="page-shell"><p className="lede">Deck not found. <span style={{color:'var(--blue)',cursor:'pointer'}} onClick={() => navigate('/pitches')}>Back to pitches.</span></p></div></div>
  );

  return (
    <div>
      <header className="page-hero" style={{ paddingBottom: '50px' }}>
        <motion.div className="page-shell" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75 }}>
          <p className="eyebrow" style={{cursor:'pointer'}} onClick={() => navigate('/pitches')}>← Back to pitches</p>
          <h1 className="display" style={{ maxWidth: '980px' }}>{deck.line1}<br /><span style={{ color: 'var(--blue)' }}>{deck.line2}</span></h1>
          <p className="lede">{deck.subtitle}</p>
        </motion.div>
      </header>

      {deck.slides.map((slide, i) => (
        <section className={`editorial-section${i % 2 === 1 ? ' dark-section' : ''}`} key={i}>
          <div className="page-shell" style={{ maxWidth: '780px' }}>
            {slide.title && <h2 className="section-title" style={{ fontSize: 'clamp(2rem, 3.6vw, 3.4rem)', marginBottom: '28px' }}>{slide.accent ? <><span style={{ color: i%2===1 ? 'var(--acid)' : 'var(--blue)' }}>{slide.accent}</span> — </> : ''}{slide.title}</h2>}

            {slide.body?.map((p, j) => <p className="lede" style={{ marginBottom: '18px', maxWidth: '680px' }} key={j}>{p}</p>)}

            {slide.bullets && (
              <div style={{ margin:'24px 0' }}>
                {slide.bullets.map((b, j) => (
                  <div key={j} style={{
                    padding: '10px 0 10px 20px',
                    borderLeft: `2px solid ${i%2===1 ? 'var(--acid)' : 'var(--blue)'}`,
                    marginBottom: '4px',
                    fontSize: '.88rem', lineHeight: 1.65,
                    color: i%2===1 ? '#b8b8ae' : 'var(--muted)',
                  }}>{b}</div>
                ))}
              </div>
            )}

            {slide.code && (
              <pre style={{
                background: i%2===1 ? 'rgba(255,255,255,0.06)' : 'var(--paper-2)', padding:'28px 30px',
                borderRadius:'var(--radius)', fontSize:'.78rem', lineHeight:1.7,
                fontFamily:'DM Mono, monospace', overflowX:'auto', margin:'24px 0',
                color: i%2===1 ? '#cccdc6' : 'var(--ink)'
              }}>{slide.code}</pre>
            )}

            {slide.stats && (
              <div style={{ display:'flex', gap:'clamp(30px, 6vw, 70px)', marginTop:'32px', flexWrap:'wrap' }}>
                {slide.stats.map((s, j) => (
                  <div key={j}>
                    <div style={{ fontSize:'clamp(2.4rem, 5vw, 4.2rem)', fontWeight:800, letterSpacing:'-.06em', lineHeight:1 }}>{s.num}</div>
                    <div style={{ fontSize:'.72rem', color: i%2===1 ? '#888a82' : 'var(--muted)', marginTop:'6px', fontFamily:'DM Mono', textTransform:'uppercase' }}>{s.label}</div>
                  </div>
                ))}
              </div>
            )}

            {slide.tags && (
              <div className="stack-cloud" style={{ marginTop: i===0 ? '24px' : '40px' }}>
                {slide.tags.map((t) => <span className="stack-pill" key={t}>{t}</span>)}
              </div>
            )}
          </div>
        </section>
      ))}

    </div>
  );
}
