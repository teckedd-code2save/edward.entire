import { useRef, useEffect, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import HorizontalSplitText from '@/components/HorizontalSplitText';

/* ═══════════════════════════════════════════════════
   PROJECT DATA — synced by cron, top 5 by activity
   ═══════════════════════════════════════════════════ */

interface Project {
  number: string;
  tag: string;
  title: string;
  blurb: string;
  detail: string;
  stack: string[];
  live?: string;
  github?: string;
}

const projects: Project[] = [
  {
    number: '01', tag: 'Infra Dashboard', title: 'GroundControl',
    blurb: 'Docker, Caddy, deployments — one pane.',
    detail: 'Self-hosted dashboard for Docker containers, Caddy reverse proxies, and deployment pipelines on a Hetzner VPS.',
    stack: ['TypeScript', 'Docker', 'Caddy', 'Hetzner'],
    live: 'https://groundcontrol.serendepify.com/',
    github: 'https://github.com/teckedd-code2save/groundcontrol',
  },
  {
    number: '02', tag: 'Speech AI', title: 'Akan Speech Lab',
    blurb: 'First open ASR for Akan — 30M+ speakers.',
    detail: 'Building ASR, TTS, and voice datasets for Akan. Custom Whisper fine-tuning for tonal phonology.',
    stack: ['Python', 'PyTorch', 'Whisper', 'HuggingFace'],
    github: 'https://github.com/teckedd-code2save/akan-speech-lab',
  },
  {
    number: '03', tag: 'Deployment Agent', title: 'Convoy',
    blurb: 'Rehearses your deploy. Ships it. Watches.',
    detail: 'Agent runtime on Claude Opus 4.7. Three phases: rehearsal, ship, observe. No code modifications.',
    stack: ['TypeScript', 'Claude Opus 4.7', 'MCP'],
    live: 'https://convoy-home.vercel.app/',
    github: 'https://github.com/teckedd-code2save/convoy',
  },
  {
    number: '04', tag: 'Dev Tools', title: 'AI Build Tools',
    blurb: 'AI-powered CLI — scaffolding, code gen.',
    detail: 'Developer toolkit with AI-assisted scaffolding, dependency resolution, and project bootstrapping.',
    stack: ['TypeScript', 'Node.js', 'AI Code Gen'],
    live: 'https://teckedd-code2save.github.io/ai-build-tools/',
    github: 'https://github.com/teckedd-code2save/ai-build-tools',
  },
  {
    number: '05', tag: 'Blockchain', title: 'HealthWallet',
    blurb: 'Health records on-chain. Patients control.',
    detail: 'TON blockchain mini-app. Patients own and control health records, granting access via wallet signatures.',
    stack: ['TypeScript', 'TON', 'Telegram Mini App'],
    github: 'https://github.com/teckedd-code2save/HealthWallet-TON-MiniApp',
  },
];

/* ═══════════════════════════════════════════════════
   STACK — from actual GitHub repos
   ═══════════════════════════════════════════════════ */

const stack = [
  'TypeScript', 'Python', 'Go', 'C#', 'JavaScript',
  'React', 'Node.js', 'Docker', 'Caddy', 'PostgreSQL',
  'PyTorch', 'HuggingFace', 'Whisper', 'TON',
  'Telegram API', 'MCP Protocol', 'Claude', 'IndexedDB',
  'Shell', 'Redis', 'Cloudflare', 'Hetzner',
];

const moreRepos = [
  { name: 'Datafy', desc: 'MCP database gateway for 7 backends', stars: 1, lang: 'TypeScript' },
  { name: 'AgentMart', desc: 'Autonomous AI agent economy on MPP', stars: 1, lang: 'TypeScript' },
  { name: 'MedKit', desc: 'Voice-first AI patient simulator', stars: 0, lang: 'TypeScript' },
  { name: 'OpsMesh', desc: 'Infrastructure mesh networking', stars: 1, lang: 'TypeScript' },
  { name: 'System Heartbeat', desc: 'macOS health monitoring', stars: 1, lang: 'TypeScript' },
  { name: 'Semantic Chain', desc: 'Semantic search agent with LangChain', stars: 0, lang: 'TypeScript' },
  { name: 'Career Ops', desc: 'AI-powered job search, 14 skill modes', stars: 0, lang: 'JavaScript' },
  { name: 'Shipd', desc: 'Deployment platform intelligence adviser', stars: 1, lang: 'TypeScript' },
  { name: 'Optimi', desc: 'Privacy-first PWA for opportunity tracking', stars: 0, lang: 'TypeScript' },
  { name: 'Serendepify Web', desc: 'AI tooling and LLM infrastructure platform', stars: 0, lang: 'TypeScript' },
  { name: 'Custom Twi ASR', desc: 'Twi transcription inference server with Docker', stars: 0, lang: 'Python' },
  { name: 'Reachy Health', desc: 'Healthcare platform backend', stars: 0, lang: 'TypeScript' },
  { name: 'Goclis', desc: 'Go CLI tool', stars: 1, lang: 'Go' },
  { name: 'AI-LAB', desc: 'AI and ML project catalogue', stars: 0, lang: 'Python' },
];

/* ═══════════════════════════════════════════════════
   EXPANDABLE BENTO GRID
   ═══════════════════════════════════════════════════ */

const bentoAreas = [
  '1 / 1 / 3 / 2',
  '1 / 2 / 2 / 4',
  '2 / 2 / 4 / 3',
  '3 / 1 / 4 / 2',
  '2 / 3 / 4 / 4',
];

function BentoGrid() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState<number | null>(null);

  useEffect(() => {
    if (!wrapRef.current) return;
    let ctx: any;
    async function init() {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      const { Flip } = await import('gsap/Flip');
      gsap.registerPlugin(ScrollTrigger, Flip);
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      ctx = gsap.context(() => {
        const items = wrapRef.current!.querySelectorAll('.bento-item');
        gsap.fromTo(items,
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'power3.out',
            scrollTrigger: { trigger: wrapRef.current, start: 'top 75%', toggleActions: 'play none none none' },
          }
        );
      }, wrapRef.current!);
    }
    init();
    return () => ctx?.revert();
  }, []);

  return (
    <section ref={wrapRef} style={{ padding: 'clamp(60px, 8vw, 100px) 0', backgroundColor: 'var(--bg)' }}>
      <div className="mx-auto px-5 md:px-10" style={{ maxWidth: '1200px' }}>
        {/* Label */}
        <p style={{
          fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 500,
          textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--fg-4)', marginBottom: '32px',
        }}>
          Featured Work
        </p>

        {/* Grid */}
        <div
          className="bento-grid"
          style={{
            display: 'grid', gap: '12px',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gridTemplateRows: 'repeat(4, minmax(120px, auto))',
          }}
        >
          {projects.map((p, i) => {
            const isOpen = expanded === i;
            const href = p.live || p.github || '#';
            return (
              <div
                key={p.number}
                className="bento-item"
                style={{
                  gridArea: isOpen ? '1 / 1 / -1 / -1' : bentoAreas[i],
                  position: 'relative',
                  overflow: 'hidden',
                  backgroundColor: 'var(--bg-2)',
                  transition: 'grid-area 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer',
                }}
                onClick={() => setExpanded(isOpen ? null : i)}
              >
                {/* Compact view */}
                <div style={{
                  padding: 'clamp(16px, 2.5vw, 28px)',
                  height: isOpen ? 'auto' : '100%',
                  display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
                  opacity: isOpen ? 0 : 1, transition: 'opacity 0.2s',
                }}>
                  <span style={{
                    fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 500,
                    textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--fg-3)',
                  }}>
                    {p.number} — {p.tag}
                  </span>
                  <h3 style={{
                    fontFamily: "'Inter', sans-serif", fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
                    fontWeight: 400, color: 'var(--fg)', letterSpacing: '-0.02em',
                    lineHeight: 1.15, margin: '6px 0 4px',
                  }}>
                    {p.title}
                  </h3>
                  <p style={{
                    fontFamily: "'Inter', sans-serif", fontSize: 'clamp(11px, 1vw, 13px)',
                    fontWeight: 400, color: 'var(--fg-2)', lineHeight: 1.4, margin: 0,
                  }}>
                    {p.blurb}
                  </p>
                  <span style={{
                    position: 'absolute', top: 0, right: 0,
                    fontSize: 'clamp(3rem, 5vw, 5rem)', fontWeight: 700,
                    color: 'var(--fg)', opacity: 0.04,
                    fontFamily: "'Inter', sans-serif", lineHeight: 1, padding: '0.1em 0.2em 0 0',
                  }}>
                    {p.number}
                  </span>
                </div>

                {/* Expanded view */}
                {isOpen && (
                  <div style={{
                    padding: 'clamp(24px, 4vw, 48px)',
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '32px',
                    alignItems: 'center',
                    minHeight: '50vh',
                  }}>
                    <div>
                      <span style={{
                        fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 500,
                        textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--fg-3)',
                      }}>
                        {p.number} — {p.tag}
                      </span>
                      <h3 style={{
                        fontFamily: "'Inter', sans-serif", fontSize: 'clamp(1.8rem, 4vw, 3rem)',
                        fontWeight: 300, color: 'var(--fg)', letterSpacing: '-0.03em',
                        lineHeight: 1.05, margin: '8px 0 16px',
                      }}>
                        {p.title}
                      </h3>
                      <p style={{
                        fontFamily: "'Inter', sans-serif", fontSize: 'clamp(0.95rem, 1.3vw, 1.1rem)',
                        fontWeight: 400, color: 'var(--fg-2)', lineHeight: 1.6, marginBottom: '20px',
                      }}>
                        {p.detail}
                      </p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '24px' }}>
                        {p.stack.map(s => (
                          <span key={s} style={{
                            fontFamily: "'Inter', sans-serif", fontSize: '11px', color: 'var(--fg-3)',
                          }}>{s}</span>
                        ))}
                      </div>
                      <div style={{ display: 'flex', gap: '16px' }}>
                        {p.live && (
                          <a href={p.live} target="_blank" rel="noopener noreferrer"
                            onClick={e => e.stopPropagation()}
                            style={{
                              fontFamily: "'Inter', sans-serif", fontSize: '13px', color: 'var(--fg)',
                              textDecoration: 'none', borderBottom: '1px solid var(--fg)',
                              paddingBottom: '2px', fontWeight: 400,
                            }}>
                            Live →
                          </a>
                        )}
                        {p.github && (
                          <a href={p.github} target="_blank" rel="noopener noreferrer"
                            onClick={e => e.stopPropagation()}
                            style={{
                              fontFamily: "'Inter', sans-serif", fontSize: '13px', color: 'var(--fg-2)',
                              textDecoration: 'none', borderBottom: '1px solid var(--fg-3)',
                              paddingBottom: '2px', fontWeight: 400,
                            }}>
                            Source →
                          </a>
                        )}
                      </div>
                    </div>
                    {/* Visual space — ambient number */}
                    <div style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      minHeight: '300px', position: 'relative', overflow: 'hidden',
                    }}>
                      <span style={{
                        fontSize: 'clamp(8rem, 20vw, 16rem)', fontWeight: 700,
                        color: 'var(--fg)', opacity: 0.03,
                        fontFamily: "'Inter', sans-serif", lineHeight: 1,
                      }}>
                        {p.number}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   STACK SECTION — real languages from GitHub
   ═══════════════════════════════════════════════════ */

function StackSection() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    let ctx: any;
    async function init() {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      ctx = gsap.context(() => {
        gsap.fromTo('.stack-item', { y: 16, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.4, stagger: 0.03, ease: 'power2.out',
          scrollTrigger: { trigger: ref.current, start: 'top 80%', toggleActions: 'play none none none' },
        });
      }, ref.current!);
    }
    init();
    return () => ctx?.revert();
  }, []);

  return (
    <section ref={ref} style={{ padding: 'clamp(80px, 10vw, 140px) 0', backgroundColor: 'var(--bg-1)' }}>
      <div className="mx-auto px-5 md:px-10" style={{ maxWidth: '1100px' }}>
        <h2 style={{
          fontFamily: "'Inter', sans-serif", fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: 300, color: 'var(--fg)', letterSpacing: '-0.02em', marginBottom: '32px',
        }}>
          Stack
        </h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {stack.map(s => (
            <span key={s} className="stack-item" style={{
              fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 400,
              color: 'var(--fg-2)', padding: '6px 14px', border: '1px solid var(--border)',
            }}>
              {s}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   AND MANY MORE — GitHub repos
   ═══════════════════════════════════════════════════ */

function MoreSection() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    let ctx: any;
    async function init() {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      ctx = gsap.context(() => {
        gsap.fromTo('.more-row', { x: -20, opacity: 0 }, {
          x: 0, opacity: 1, duration: 0.4, stagger: 0.04, ease: 'power2.out',
          scrollTrigger: { trigger: ref.current, start: 'top 80%', toggleActions: 'play none none none' },
        });
      }, ref.current!);
    }
    init();
    return () => ctx?.revert();
  }, []);

  return (
    <section ref={ref} style={{ padding: 'clamp(60px, 8vw, 100px) 0', backgroundColor: 'var(--bg)' }}>
      <div className="mx-auto px-5 md:px-10" style={{ maxWidth: '1100px' }}>
        <h2 style={{
          fontFamily: "'Inter', sans-serif", fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
          fontWeight: 300, color: 'var(--fg)', letterSpacing: '-0.02em', marginBottom: '8px',
        }}>
          And many more
        </h2>
        <p style={{
          fontFamily: "'Inter', sans-serif", fontSize: '14px', color: 'var(--fg-3)', marginBottom: '32px',
        }}>
          {moreRepos.length} public repositories on GitHub
        </p>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {moreRepos.map(r => (
            <a key={r.name} href={`https://github.com/teckedd-code2save/${r.name.replace(/\s/g, '')}`}
              target="_blank" rel="noopener noreferrer" className="more-row"
              style={{
                display: 'grid', gridTemplateColumns: '1fr auto', gap: '12px', alignItems: 'center',
                padding: '14px 0', borderBottom: '1px solid var(--border)',
                textDecoration: 'none', transition: 'padding 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.paddingLeft = '8px'; }}
              onMouseLeave={e => { e.currentTarget.style.paddingLeft = '0'; }}
            >
              <div>
                <span style={{
                  fontFamily: "'Inter', sans-serif", fontSize: '14px', fontWeight: 400,
                  color: 'var(--fg)', marginRight: '8px',
                }}>{r.name}</span>
                <span style={{
                  fontFamily: "'Inter', sans-serif", fontSize: '12px', color: 'var(--fg-3)',
                }}>{r.desc}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{
                  fontFamily: "'Inter', sans-serif", fontSize: '11px', color: 'var(--fg-4)',
                }}>{r.lang}</span>
                <span style={{
                  fontFamily: "'Inter', sans-serif", fontSize: '11px', color: 'var(--fg-3)',
                }}>★ {r.stars}</span>
              </div>
            </a>
          ))}
        </div>
        <a href="https://github.com/teckedd-code2save" target="_blank" rel="noopener noreferrer" style={{
          display: 'inline-block', marginTop: '32px',
          fontFamily: "'Inter', sans-serif", fontSize: '14px', color: 'var(--fg)',
          textDecoration: 'none', borderBottom: '1px solid var(--fg)', paddingBottom: '2px', fontWeight: 400,
        }}>
          View all on GitHub →
        </a>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   CTA
   ═══════════════════════════════════════════════════ */

function CTASection() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    let ctx: any;
    async function init() {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      ctx = gsap.context(() => {
        gsap.fromTo('.cta-line', { y: '100%' }, {
          y: '0%', duration: 1.2, stagger: 0.14, ease: 'power3.inOut',
          scrollTrigger: { trigger: ref.current, start: 'top 75%', toggleActions: 'play none none none' },
        });
        gsap.fromTo('.cta-desc', { y: 20, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.7, delay: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: ref.current, start: 'top 75%', toggleActions: 'play none none none' },
        });
      }, ref.current!);
    }
    init();
    return () => ctx?.revert();
  }, []);

  return (
    <section ref={ref} style={{ padding: 'clamp(100px, 14vw, 180px) 0', backgroundColor: 'var(--bg)' }}>
      <div className="mx-auto px-5 md:px-10 text-center" style={{ maxWidth: '800px' }}>
        <h2 style={{
          fontFamily: "'Inter', sans-serif", fontSize: 'clamp(2.4rem, 7vw, 5rem)',
          fontWeight: 300, color: 'var(--fg)', lineHeight: 1.05, letterSpacing: '-0.03em', overflow: 'hidden',
        }}>
          <div className="cta-line" style={{ overflow: 'hidden' }}><span>Let&apos;s build</span></div>
          <div className="cta-line" style={{ overflow: 'hidden' }}><span>something real</span></div>
        </h2>
        <p className="cta-desc" style={{
          fontFamily: "'Inter', sans-serif", fontSize: 'clamp(1rem, 1.4vw, 1.15rem)',
          fontWeight: 400, color: 'var(--fg-2)', margin: '24px auto 40px', lineHeight: 1.6, maxWidth: '480px',
        }}>
          Backend systems, agent runtimes, infrastructure.
        </p>
        <Link to="/contact" style={{
          fontFamily: "'Inter', sans-serif", fontSize: '14px', fontWeight: 400,
          color: 'var(--fg)', padding: '14px 32px', border: '1px solid var(--fg)',
          textDecoration: 'none', transition: 'all 0.2s',
        }}
        onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'var(--fg)'; e.currentTarget.style.color = 'var(--bg)'; }}
        onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'var(--fg)'; }}>
          Start a conversation →
        </Link>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   MOBILE CSS
   ═══════════════════════════════════════════════════ */

const mobileCSS = `
@media (max-width: 768px) {
  .bento-grid {
    grid-template-columns: 1fr !important;
    grid-template-rows: auto !important;
    gap: 8px !important;
  }
  .bento-item {
    grid-area: auto !important;
    min-height: 100px;
  }
}
`;

/* ═══════════════════════════════════════════════════
   HOME PAGE
   ═══════════════════════════════════════════════════ */

export default function Home() {
  return (
    <>
      <style>{mobileCSS}</style>
      <HorizontalSplitText
        text="Forging AI-native narratives at Serendepify"
        highlightWord="Serendepify"
        statement={
          <div style={{ maxWidth: '700px', margin: '0 auto', padding: '0 20px' }}>
            <h2 style={{
              fontFamily: "'Inter', sans-serif", fontSize: 'clamp(1.6rem, 5vw, 4rem)',
              fontWeight: 300, color: 'var(--fg)', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: '12px',
            }}>
              Building infrastructure<br />
              <span style={{ color: 'var(--orange)' }}>for the agent-native era</span>
            </h2>
            <p style={{
              fontFamily: "'Inter', sans-serif", fontSize: 'clamp(0.9rem, 1.3vw, 1.05rem)',
              fontWeight: 400, color: 'var(--fg-2)', lineHeight: 1.6,
            }}>
              Tools that let agents and teams accomplish more.
            </p>
          </div>
        }
      />
      <BentoGrid />
      <StackSection />
      <MoreSection />
      <CTASection />
    </>
  );
}
