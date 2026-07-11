import { useRef, useEffect } from 'react';
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

const bentoAreas = [
  '1 / 1 / 3 / 2',
  '1 / 2 / 2 / 4',
  '2 / 2 / 4 / 3',
  '3 / 1 / 4 / 2',
  '2 / 3 / 4 / 4',
];

function BentoGrid() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrapRef.current || !gridRef.current) return;
    let flipCtx: any;

    async function init() {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      const { Flip } = await import('gsap/Flip');
      gsap.registerPlugin(ScrollTrigger, Flip);
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const createTween = () => {
        const grid = gridRef.current!;
        const items = grid.querySelectorAll('.bento-item');

        flipCtx?.revert();
        grid.classList.remove('bento-final');

        flipCtx = gsap.context(() => {
          grid.classList.add('bento-final');
          const flipState = Flip.getState(items);
          grid.classList.remove('bento-final');

          const flip = Flip.to(flipState, {
            simple: true,
            ease: 'expoScale(1, 5)',
          });

          gsap.timeline({
            scrollTrigger: {
              trigger: wrapRef.current,
              start: 'top top',
              end: '+=120%',
              scrub: true,
              pin: true,
            },
          }).add(flip);

          return () => gsap.set(items, { clearProps: 'all' });
        }, grid);
      };

      createTween();
      window.addEventListener('resize', createTween);
      return () => {
        window.removeEventListener('resize', createTween);
        flipCtx?.revert();
      };
    }

    init();
    return () => { flipCtx?.revert(); };
  }, []);

  return (
    <section
      ref={wrapRef}
      className="bento-section"
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        backgroundColor: 'var(--bg)',
      }}
    >
      <div
        ref={gridRef}
        className="bento-grid"
        style={{
          display: 'grid',
          gap: '1.5vh',
          gridTemplateColumns: 'repeat(3, 34vw)',
          gridTemplateRows: 'repeat(4, 24.5vh)',
          justifyContent: 'center',
          alignContent: 'center',
          position: 'relative',
          width: '100%',
          height: '100%',
          flex: 'none',
        }}
      >
        {projects.map((p, i) => (
          <a
            key={p.number}
            href={p.live || p.github || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="bento-item"
            style={{
              gridArea: bentoAreas[i],
              position: 'relative',
              overflow: 'hidden',
              backgroundColor: 'var(--bg-2)',
              borderRadius: 'var(--radius)',
              boxShadow: 'var(--shadow-card)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              padding: 'clamp(18px, 3vw, 32px)',
              textDecoration: 'none',
              transition: 'background-color 0.3s',
            }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'var(--bg-1)'; }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'var(--bg-2)'; }}
          >
            <span style={{
              fontFamily: "'Inter', sans-serif", fontSize: 'clamp(9px, 1vw, 11px)', fontWeight: 600,
              textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--fg-3)',
            }}>
              {p.number} — {p.tag}
            </span>
            <h3 style={{
              fontFamily: "'Inter', sans-serif", fontSize: 'clamp(1rem, 2vw, 1.5rem)',
              fontWeight: 600, color: 'var(--fg)', letterSpacing: '-0.02em',
              lineHeight: 1.15, margin: '6px 0 4px',
            }}>
              {p.title}
            </h3>
            <p style={{
              fontFamily: "'Inter', sans-serif", fontSize: 'clamp(10px, 1vw, 13px)',
              fontWeight: 600, color: 'var(--fg-2)', lineHeight: 1.4, margin: 0,
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
          </a>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   MOBILE PROJECTS — stacked cards (shown only ≤ 768px)
   ═══════════════════════════════════════════════════ */

function MobileProjects() {
  return (
    <section className="mobile-projects" style={{ padding: '0 0 clamp(20px, 4vw, 40px)', backgroundColor: 'var(--bg)' }}>
      <div className="mx-auto px-5" style={{ maxWidth: '500px' }}>
        <p style={{
          fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 600,
          textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--fg-4)', marginBottom: '20px',
        }}>
          Featured Work
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {projects.map((p) => (
            <a
              key={p.number}
              href={p.live || p.github || '#'}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'block',
                padding: 'clamp(18px, 4vw, 28px)',
                backgroundColor: 'var(--bg-2)',
                borderRadius: 'var(--radius)',
                boxShadow: 'var(--shadow-card)',
                textDecoration: 'none',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <span style={{
                fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 600,
                textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--fg-3)',
                marginBottom: '6px', display: 'block',
              }}>
                {p.number} — {p.tag}
              </span>
              <h3 style={{
                fontFamily: "'Inter', sans-serif", fontSize: '1.3rem',
                fontWeight: 600, color: 'var(--fg)', letterSpacing: '-0.02em',
                lineHeight: 1.15, margin: '0 0 4px',
              }}>
                {p.title}
              </h3>
              <p style={{
                fontFamily: "'Inter', sans-serif", fontSize: '13px',
                fontWeight: 600, color: 'var(--fg-2)', lineHeight: 1.5, margin: 0,
              }}>
                {p.blurb}
              </p>
            </a>
          ))}
        </div>
        <div style={{ marginTop: '20px' }}>
          <Link to="/projects"
            style={{
              fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 600,
              color: 'var(--fg)', textDecoration: 'none',
              borderBottom: '1px solid var(--fg)', paddingBottom: '2px',
            }}>
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
    <section ref={ref} style={{ padding: 'clamp(60px, 8vw, 120px) 0', backgroundColor: 'var(--bg-1)' }}>
      <div className="mx-auto px-5 md:px-10" style={{ maxWidth: '1100px' }}>
        {/* Stack */}
        <h2 style={{
          fontFamily: "'Inter', sans-serif", fontSize: 'clamp(1.8rem, 4vw, 3rem)',
          fontWeight: 600, color: 'var(--fg)', letterSpacing: '-0.02em', marginBottom: 'clamp(20px, 3vw, 32px)',
        }}>
          Stack
        </h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: 'clamp(48px, 6vw, 80px)' }}>
          {stack.map(s => (
            <span key={s} className="stack-item" style={{
              fontFamily: "'Inter', sans-serif", fontSize: 'clamp(11px, 1.2vw, 13px)', fontWeight: 600,
              color: 'var(--fg-2)', padding: '6px 14px', border: '1px solid var(--border)',
            }}>
              {s}
            </span>
          ))}
        </div>

        {/* And many more — abstract pills, not repo list */}
        <h3 style={{
          fontFamily: "'Inter', sans-serif", fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)',
          fontWeight: 600, color: 'var(--fg-3)', letterSpacing: '-0.02em', marginBottom: 'clamp(16px, 2vw, 24px)',
        }}>
          And many more
        </h3>
        <div className="more-grid" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {moreStack.map(s => (
            <span key={s} className="more-item" style={{
              fontFamily: "'Inter', sans-serif", fontSize: 'clamp(11px, 1.2vw, 13px)', fontWeight: 600,
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
      padding: 'clamp(60px, 10vw, 140px) 0',
      backgroundColor: 'var(--bg)',
      position: 'relative', overflow: 'hidden',
    }}>
      <div className="mx-auto px-5 md:px-10" style={{ maxWidth: '900px', textAlign: 'center' }}>
        <h2 style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 'clamp(2rem, 7vw, 6rem)',
          fontWeight: 600, color: 'var(--fg)',
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
              fontFamily: "'Manrope', system-ui, sans-serif", fontSize: 'clamp(13px, 1.3vw, 15px)', fontWeight: 700,
              padding: 'clamp(12px, 2vw, 15px) clamp(24px, 3vw, 36px)',
              background: 'var(--fg)', color: 'var(--bg)',
              borderRadius: '999px', textDecoration: 'none',
              boxShadow: 'var(--shadow-button)',
              transition: 'transform 0.2s, box-shadow 0.2s',
              display: 'inline-flex', gap: '8px',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 0 rgba(255,255,255,.16)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 0 rgba(255,255,255,.12)'; }}>
            Start a conversation <span aria-hidden="true">↘</span>
          </Link>
          <a href="https://github.com/teckedd-code2save" target="_blank" rel="noopener noreferrer"
            style={{
              fontFamily: "'Manrope', system-ui, sans-serif", fontSize: 'clamp(13px, 1.3vw, 15px)', fontWeight: 600,
              color: 'var(--fg-2)', padding: 'clamp(12px, 2vw, 15px) clamp(24px, 3vw, 36px)',
              borderRadius: '999px', textDecoration: 'none',
              border: '1px solid var(--border-2)', transition: 'all 0.2s',
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
/* Desktop: show bento, hide mobile stack */
.mobile-projects { display: none; }
/* Bento final state for GSAP Flip */
.bento-final {
  grid-template-columns: repeat(3, 100vw) !important;
  grid-template-rows: repeat(4, 50vh) !important;
  gap: 1.5vh !important;
}

@media (max-width: 768px) {
  /* Mobile: hide bento section entirely */
  .bento-section { display: none !important; }
  /* Show mobile stacked cards */
  .mobile-projects { display: block; }
  /* Reduce section gaps on mobile */
  section[style*="padding"] {
    padding-top: clamp(30px, 5vw, 60px) !important;
    padding-bottom: clamp(30px, 5vw, 60px) !important;
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
              fontWeight: 600, color: 'var(--fg)', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: '12px',
            }}>
              Building infrastructure<br />
              <span style={{ color: 'var(--orange)' }}>for the agent-native era</span>
            </h2>
            <p style={{
              fontFamily: "'Inter', sans-serif", fontSize: 'clamp(0.85rem, 1.3vw, 1.05rem)',
              fontWeight: 600, color: 'var(--fg-2)', lineHeight: 1.6,
            }}>
              Tools that let agents and teams accomplish more.
            </p>
          </div>
        }
      />
      <BentoGrid />
      <MobileProjects />
      <StackSection />
      <CTASection />
    </>
  );
}
