import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import HorizontalSplitText from '@/components/HorizontalSplitText';
import { projects as portfolioProjects } from '@/components/projects/projectData';

/* ═══════════════════════════════════════════════════
   PROJECT DATA — derived from projectData.ts
   ═══════════════════════════════════════════════════ */

const projects = portfolioProjects.map(p => ({
  number: p.number,
  tag: p.tag,
  title: p.title,
  blurb: p.description.split('.')[0] + '.',
  detail: p.architecture.split('.')[0] + '.',
  stack: p.stack,
  live: p.liveUrl,
  github: p.githubUrl,
}));

/* ═══════════════════════════════════════════════════
   STACK + AND MANY MORE (merged — abstract, not repo list)
   ═══════════════════════════════════════════════════ */

const stack = [
  'TypeScript', 'Python', 'Go', 'C#', 'JavaScript',
  'React', 'Node.js', 'Docker', 'Caddy', 'PostgreSQL',
  'PyTorch', 'HuggingFace', 'Whisper', 'TON',
  'Telegram API', 'MCP Protocol', 'Claude', 'IndexedDB',
  'Shell', 'Redis', 'Cloudflare', 'Hetzner',
];

const moreStack = [
  'LangChain', 'Gradio', 'Modal', 'Qwen', 'Stripe',
  'AWS', 'GCP', 'Kubernetes', 'Nginx', 'Elasticsearch',
  'Docker Compose', 'GitHub Actions', 'Vercel', 'Onnx',
];

/* ═══════════════════════════════════════════════════
   EXPANDABLE BENTO GRID
   ═══════════════════════════════════════════════════ */

function BentoGrid() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState<number | null>(null);

  useEffect(() => {
    if (!wrapRef.current) return;
    let ctx: any;
    async function init() {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);
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
        <p style={{
          fontFamily: "'Inter', sans-serif", fontSize: 'clamp(10px, 1.2vw, 11px)', fontWeight: 500,
          textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--fg-4)', marginBottom: 'clamp(20px, 3vw, 32px)',
        }}>
          Featured Work
        </p>

        <div className="bento-grid" style={{
          display: 'grid', gap: 'clamp(8px, 1vw, 12px)',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridTemplateRows: 'repeat(4, minmax(100px, auto))',
        }}>
          {projects.map((p, i) => {
            const isOpen = expanded === i;
            const areas = [
              '1 / 1 / 3 / 2',
              '1 / 2 / 2 / 4',
              '2 / 2 / 4 / 3',
              '3 / 1 / 4 / 2',
              '2 / 3 / 4 / 4',
            ];
            return (
              <div
                key={p.number}
                className="bento-item"
                style={{
                  gridArea: isOpen ? '1 / 1 / -1 / -1' : areas[i],
                  position: 'relative',
                  overflow: 'hidden',
                  backgroundColor: 'var(--bg-2)',
                  cursor: 'pointer',
                  minHeight: isOpen ? 'auto' : '100px',
                  transition: 'grid-area 0.4s cubic-bezier(0.4, 0, 0.2, 1), min-height 0.4s ease',
                }}
                onClick={() => setExpanded(isOpen ? null : i)}
              >
                {/* Compact view */}
                {!isOpen && (
                  <div style={{
                    padding: 'clamp(14px, 2vw, 24px)',
                    height: '100%',
                    display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
                  }}>
                    <span style={{
                      fontFamily: "'Inter', sans-serif", fontSize: 'clamp(9px, 0.9vw, 11px)', fontWeight: 500,
                      textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--fg-3)',
                    }}>
                      {p.number} — {p.tag}
                    </span>
                    <h3 style={{
                      fontFamily: "'Inter', sans-serif", fontSize: 'clamp(1rem, 1.8vw, 1.4rem)',
                      fontWeight: 400, color: 'var(--fg)', letterSpacing: '-0.02em',
                      lineHeight: 1.15, margin: '4px 0 4px',
                    }}>
                      {p.title}
                    </h3>
                    <p style={{
                      fontFamily: "'Inter', sans-serif", fontSize: 'clamp(10px, 0.9vw, 12px)',
                      fontWeight: 400, color: 'var(--fg-2)', lineHeight: 1.4, margin: 0,
                    }}>
                      {p.blurb}
                    </p>
                    <span style={{
                      position: 'absolute', top: 0, right: 0,
                      fontSize: 'clamp(2.5rem, 4vw, 4rem)', fontWeight: 700,
                      color: 'var(--fg)', opacity: 0.04,
                      fontFamily: "'Inter', sans-serif", lineHeight: 1, padding: '0.1em 0.2em 0 0',
                    }}>
                      {p.number}
                    </span>
                  </div>
                )}

                {/* Expanded view */}
                {isOpen && (
                  <div style={{
                    padding: 'clamp(20px, 4vw, 48px)',
                    display: 'flex', flexDirection: 'column',
                    gap: 'clamp(20px, 3vw, 32px)',
                  }}>
                    {/* Top: close hint */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{
                        fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 500,
                        textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--fg-3)',
                      }}>
                        {p.number} — {p.tag}
                      </span>
                      <span style={{
                        fontFamily: "'Inter', sans-serif", fontSize: '12px', color: 'var(--fg-4)',
                      }}>
                        Click to close
                      </span>
                    </div>

                    {/* Content row */}
                    <div className="expanded-content" style={{
                      display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(20px, 3vw, 40px)',
                      alignItems: 'center',
                    }}>
                      <div>
                        <h3 style={{
                          fontFamily: "'Inter', sans-serif", fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)',
                          fontWeight: 300, color: 'var(--fg)', letterSpacing: '-0.03em',
                          lineHeight: 1.05, margin: '0 0 16px',
                        }}>
                          {p.title}
                        </h3>
                        <p style={{
                          fontFamily: "'Inter', sans-serif", fontSize: 'clamp(0.9rem, 1.2vw, 1.05rem)',
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
                        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
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
                      {/* Ambient number fills visual space */}
                      <div style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        minHeight: '200px', position: 'relative', overflow: 'hidden',
                      }}>
                        <span style={{
                          fontSize: 'clamp(6rem, 16vw, 14rem)', fontWeight: 700,
                          color: 'var(--fg)', opacity: 0.03,
                          fontFamily: "'Inter', sans-serif", lineHeight: 1,
                        }}>
                          {p.number}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* View all — under projects */}
        <div style={{ marginTop: 'clamp(24px, 3vw, 32px)', textAlign: 'right' }}>
          <Link to="/projects"
            style={{
              fontFamily: "'Inter', sans-serif", fontSize: 'clamp(12px, 1.2vw, 14px)', fontWeight: 400,
              color: 'var(--fg)', textDecoration: 'none',
              borderBottom: '1px solid var(--fg)', paddingBottom: '2px',
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.opacity = '0.6'; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}>
            View all projects →
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   STACK + AND MANY MORE (merged — abstract pills)
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
        gsap.fromTo('.more-item', { y: 16, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.4, stagger: 0.03, ease: 'power2.out',
          scrollTrigger: { trigger: '.more-grid', start: 'top 85%', toggleActions: 'play none none none' },
        });
      }, ref.current!);
    }
    init();
    return () => ctx?.revert();
  }, []);

  return (
    <section ref={ref} style={{ padding: 'clamp(80px, 10vw, 140px) 0', backgroundColor: 'var(--bg-1)' }}>
      <div className="mx-auto px-5 md:px-10" style={{ maxWidth: '1100px' }}>
        {/* Stack */}
        <h2 style={{
          fontFamily: "'Inter', sans-serif", fontSize: 'clamp(1.8rem, 4vw, 3rem)',
          fontWeight: 300, color: 'var(--fg)', letterSpacing: '-0.02em', marginBottom: 'clamp(20px, 3vw, 32px)',
        }}>
          Stack
        </h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: 'clamp(48px, 6vw, 80px)' }}>
          {stack.map(s => (
            <span key={s} className="stack-item" style={{
              fontFamily: "'Inter', sans-serif", fontSize: 'clamp(11px, 1.2vw, 13px)', fontWeight: 400,
              color: 'var(--fg-2)', padding: '6px 14px', border: '1px solid var(--border)',
            }}>
              {s}
            </span>
          ))}
        </div>

        {/* And many more — abstract pills, not repo list */}
        <h3 style={{
          fontFamily: "'Inter', sans-serif", fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)',
          fontWeight: 300, color: 'var(--fg-3)', letterSpacing: '-0.02em', marginBottom: 'clamp(16px, 2vw, 24px)',
        }}>
          And many more
        </h3>
        <div className="more-grid" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {moreStack.map(s => (
            <span key={s} className="more-item" style={{
              fontFamily: "'Inter', sans-serif", fontSize: 'clamp(11px, 1.2vw, 13px)', fontWeight: 400,
              color: 'var(--fg-4)', padding: '6px 14px',
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
   CTA — bold, minimal
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
        gsap.fromTo('.cta-word', { y: '100%', opacity: 0 }, {
          y: '0%', opacity: 1, duration: 1.0, stagger: 0.12, ease: 'power3.inOut',
          scrollTrigger: { trigger: ref.current, start: 'top 75%', toggleActions: 'play none none none' },
        });
        gsap.fromTo('.cta-links', { y: 20, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.6, delay: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: ref.current, start: 'top 75%', toggleActions: 'play none none none' },
        });
      }, ref.current!);
    }
    init();
    return () => ctx?.revert();
  }, []);

  return (
    <section ref={ref} style={{
      padding: 'clamp(80px, 12vw, 160px) 0',
      backgroundColor: 'var(--bg)',
      position: 'relative', overflow: 'hidden',
    }}>
      <div className="mx-auto px-5 md:px-10" style={{ maxWidth: '900px', textAlign: 'center' }}>
        <h2 style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 'clamp(2rem, 7vw, 6rem)',
          fontWeight: 300, color: 'var(--fg)',
          lineHeight: 1.0, letterSpacing: '-0.04em', marginBottom: 'clamp(24px, 4vw, 40px)',
        }}>
          <span className="cta-word" style={{ display: 'inline-block', overflow: 'hidden' }}>Build</span>{' '}
          <span className="cta-word" style={{ display: 'inline-block', overflow: 'hidden' }}>with</span>{' '}
          <span className="cta-word" style={{ display: 'inline-block', overflow: 'hidden', color: 'var(--orange)' }}>me</span>
          <span>.</span>
        </h2>
        <div className="cta-links" style={{
          display: 'flex', gap: 'clamp(12px, 2vw, 24px)', justifyContent: 'center', flexWrap: 'wrap',
        }}>
          <Link to="/contact"
            style={{
              fontFamily: "'Inter', sans-serif", fontSize: 'clamp(13px, 1.3vw, 15px)', fontWeight: 400,
              color: 'var(--fg)', padding: 'clamp(12px, 2vw, 14px) clamp(24px, 3vw, 36px)',
              border: '1px solid var(--fg)', textDecoration: 'none', transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'var(--fg)'; e.currentTarget.style.color = 'var(--bg)'; }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'var(--fg)'; }}>
            Start a conversation →
          </Link>
          <a href="https://github.com/teckedd-code2save" target="_blank" rel="noopener noreferrer"
            style={{
              fontFamily: "'Inter', sans-serif", fontSize: 'clamp(13px, 1.3vw, 15px)', fontWeight: 400,
              color: 'var(--fg-2)', padding: 'clamp(12px, 2vw, 14px) clamp(24px, 3vw, 36px)',
              border: '1px solid var(--border-2)', textDecoration: 'none', transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--fg)'; e.currentTarget.style.color = 'var(--fg)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-2)'; e.currentTarget.style.color = 'var(--fg-2)'; }}>
            GitHub
          </a>
        </div>
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
    min-height: 120px !important;
  }
  .bento-item[style*="1 / 1 / -1"] {
    min-height: auto !important;
  }
  .expanded-content {
    grid-template-columns: 1fr !important;
    gap: 20px !important;
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
              fontFamily: "'Inter', sans-serif", fontSize: 'clamp(1.4rem, 5vw, 4rem)',
              fontWeight: 300, color: 'var(--fg)', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: '12px',
            }}>
              Building infrastructure<br />
              <span style={{ color: 'var(--orange)' }}>for the agent-native era</span>
            </h2>
            <p style={{
              fontFamily: "'Inter', sans-serif", fontSize: 'clamp(0.85rem, 1.3vw, 1.05rem)',
              fontWeight: 400, color: 'var(--fg-2)', lineHeight: 1.6,
            }}>
              Tools that let agents and teams accomplish more.
            </p>
          </div>
        }
      />
      <BentoGrid />
      <StackSection />
      <CTASection />
    </>
  );
}
