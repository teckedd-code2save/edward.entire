import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HorizontalSplitText from '@/components/HorizontalSplitText';

/* ── Project data ── */

interface FeaturedProject {
  number: string; tag: string; tone: 'orange' | 'mauve'; title: string;
  blurb: string; stack: string[]; live?: string; github?: string;
}

const featured: FeaturedProject[] = [
  { number: '01', tag: 'speech AI', tone: 'orange', title: 'Akan Speech Lab', blurb: 'First open ASR and TTS for Akan — 30M+ speakers.', stack: ['Python', 'PyTorch', 'Whisper', 'TTS', 'HuggingFace'], github: 'https://github.com/teckedd-code2save/akan-speech-lab' },
  { number: '02', tag: 'infra dashboard', tone: 'mauve', title: 'GroundControl', blurb: 'Docker, Caddy, deployments — one pane of glass.', stack: ['TypeScript', 'Docker', 'Caddy', 'Hetzner', 'React'], live: 'https://groundcontrol.serendepify.com/', github: 'https://github.com/teckedd-code2save/groundcontrol' },
  { number: '03', tag: 'deployment agent', tone: 'mauve', title: 'Convoy', blurb: 'Rehearses your deploy. Ships it. Watches.', stack: ['TypeScript', 'Claude Opus 4.7', 'MCP'], live: 'https://convoy-home.vercel.app/', github: 'https://github.com/teckedd-code2save/convoy' },
  { number: '04', tag: 'elder care AI', tone: 'orange', title: 'Adwuma Pa', blurb: 'AI elder care — voice check-ins for Ghanaian families.', stack: ['Python', 'Gradio', 'HuggingFace', 'Whisper', 'Qwen'], github: 'https://github.com/teckedd-code2save/adwuma-pa' },
  { number: '05', tag: 'dev tools', tone: 'orange', title: 'AI Build Tools', blurb: 'AI-powered CLI — scaffolding, code gen, deps.', stack: ['TypeScript', 'Node.js', 'AI Code Gen', 'CLI'], live: 'https://teckedd-code2save.github.io/ai-build-tools/', github: 'https://github.com/teckedd-code2save/ai-build-tools' },
];

/* ── Bento Grid with GSAP Flip ── */

const bentoAreas = [
  '1 / 2 / 2 / 4',  // Akan Speech Lab — wide top (most active)
  '1 / 1 / 3 / 2',  // GroundControl — tall left
  '2 / 2 / 4 / 3',  // Convoy — tall middle
  '2 / 3 / 4 / 4',  // Adwuma Pa — tall right
  '3 / 1 / 4 / 2',  // AI Build Tools — left bottom
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
              start: 'center center',
              end: '+=120%',
              scrub: true,
              pin: wrapRef.current,
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
    <div ref={wrapRef} style={{ position: 'relative', width: '100%', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', backgroundColor: 'var(--bg)' }}>
      <div
        ref={gridRef}
        className="bento-grid"
        style={{
          display: 'grid',
          gap: '12px',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridTemplateRows: 'repeat(4, 1fr)',
          width: 'min(1200px, 90vw)',
          height: 'min(80vh, 600px)',
          position: 'relative',
        }}
      >
        {featured.map((p, i) => (
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
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              padding: 'clamp(16px, 2.5vw, 28px)',
              textDecoration: 'none',
              transition: 'background-color 0.3s, transform 0.3s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--bg-1)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'var(--bg-2)'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 'clamp(9px, 1vw, 11px)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.1em', color: p.tone === 'orange' ? 'var(--orange)' : 'var(--mauve)' }}>
              {p.number} — {p.tag}
            </span>
            <h3 style={{ fontFamily: "'Inter', sans-serif", fontSize: 'clamp(1rem, 2vw, 1.5rem)', fontWeight: 300, color: 'var(--fg)', letterSpacing: '-0.02em', lineHeight: 1.15, margin: '6px 0 4px' }}>
              {p.title}
            </h3>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 'clamp(10px, 1vw, 13px)', fontWeight: 400, color: 'var(--fg-2)', lineHeight: 1.4, margin: 0 }}>
              {p.blurb}
            </p>
            <span style={{ position: 'absolute', top: 0, right: 0, fontSize: 'clamp(3rem, 5vw, 5rem)', fontWeight: 700, color: p.tone === 'orange' ? 'var(--orange)' : 'var(--mauve)', opacity: 0.08, fontFamily: "'Inter', sans-serif", lineHeight: 1, padding: '0.1em 0.2em 0 0' }}>
              {p.number}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}

/* ── Tech Pills ── */

const techNodes = [
  'TypeScript', 'Python', 'Docker', 'Caddy', 'Hetzner',
  'TON', 'PostgreSQL', 'React', 'HuggingFace', 'PyTorch',
  'Claude', 'MCP',
];

function TechSection() {
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
        gsap.fromTo('.tech-pill', { y: 16, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.4, stagger: 0.04, ease: 'power2.out',
          scrollTrigger: { trigger: ref.current, start: 'top 80%', toggleActions: 'play none none none' },
        });
      }, ref.current!);
    }
    init();
    return () => ctx?.revert();
  }, []);

  return (
    <section ref={ref} style={{ padding: 'clamp(80px, 10vw, 140px) 0', backgroundColor: 'var(--bg-1)' }}>
      <div className="mx-auto max-w-[1100px] px-5 md:px-10">
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 300, color: 'var(--fg)', letterSpacing: '-0.02em', marginBottom: 'clamp(28px, 4vw, 48px)' }}>
          Tools at <span style={{ color: 'var(--mauve)' }}>hand</span>
        </h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {techNodes.map((t) => {
            const colors: Record<string, string> = {
              TypeScript: '#3178C6', Python: '#4BA4C8', Docker: '#2496ED', Caddy: '#22B638',
              Hetzner: '#D50C2D', TON: '#0088CC', PostgreSQL: '#336791', React: '#61DAFB',
              HuggingFace: '#FFBD45', PyTorch: '#EE4C2C', Claude: '#C77DFF', MCP: '#FF5500',
            };
            const c = colors[t] || 'var(--fg-3)';
            return (
              <span key={t} className="tech-pill"
                style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', fontWeight: 400, color: c, padding: '6px 14px', border: `1px solid ${c}33` }}>
                {t}
              </span>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── CTA ── */

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
          y: '0%', duration: 1.4, stagger: 0.16, ease: 'power3.inOut',
          scrollTrigger: { trigger: ref.current, start: 'top 75%', toggleActions: 'play none none none' },
        });
        gsap.fromTo('.cta-btn-row', { y: 24, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.7, delay: 1, ease: 'power2.out',
          scrollTrigger: { trigger: ref.current, start: 'top 75%', toggleActions: 'play none none none' },
        });
      }, ref.current!);
    }
    init();
    return () => ctx?.revert();
  }, []);

  return (
    <section ref={ref} style={{ padding: 'clamp(100px, 14vw, 180px) 0', backgroundColor: 'var(--bg)' }}>
      <div className="mx-auto max-w-[900px] px-5 md:px-10 text-center">
        <h2 style={{ fontSize: 'clamp(2.4rem, 7vw, 5.5rem)', fontWeight: 300, color: 'var(--fg)', lineHeight: 1.05, letterSpacing: '-0.03em', overflow: 'hidden' }}>
          <div className="cta-line" style={{ overflow: 'hidden' }}><span>Let&apos;s build</span></div>
          <div className="cta-line" style={{ overflow: 'hidden' }}><span style={{ color: 'var(--orange)' }}>something real</span></div>
        </h2>
        <p style={{ fontSize: 'clamp(1rem, 1.4vw, 1.15rem)', fontWeight: 400, color: 'var(--fg-2)', margin: '24px auto 40px', lineHeight: 1.6, maxWidth: '480px' }}>
          Backend systems, agent runtimes, infrastructure. Pull me in early.
        </p>
        <div className="cta-btn-row" style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/contact" style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', fontWeight: 400, color: 'var(--fg)', padding: '14px 32px', border: '1px solid var(--orange)', backgroundColor: 'rgba(255,85,0,0.08)', textDecoration: 'none', transition: 'all 0.2s' }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,85,0,0.18)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,85,0,0.08)'; }}>
            Start a conversation →
          </Link>
          <a href="https://github.com/teckedd-code2save" target="_blank" rel="noopener noreferrer"
            style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', fontWeight: 400, color: 'var(--fg-2)', padding: '14px 32px', border: '1px solid var(--border-2)', textDecoration: 'none', transition: 'all 0.2s' }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--fg-2)'; e.currentTarget.style.color = 'var(--fg)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-2)'; e.currentTarget.style.color = 'var(--fg-2)'; }}>
            GitHub
          </a>
        </div>
      </div>
    </section>
  );
}

/* ── CSS for bento final state (injected via style tag) ── */

const bentoCSS = `
.bento-final {
  grid-template-columns: repeat(3, 100vw) !important;
  grid-template-rows: repeat(4, 49.5vh) !important;
  gap: 1vh !important;
}
@media (max-width: 768px) {
  .bento-grid {
    grid-template-columns: repeat(2, 1fr) !important;
    grid-template-rows: repeat(3, auto) !important;
    gap: 8px !important;
    width: 92vw !important;
    height: auto !important;
  }
  .bento-item:nth-child(1) { grid-area: 1 / 1 / 2 / 2 !important; }
  .bento-item:nth-child(2) { grid-area: 1 / 2 / 2 / 3 !important; }
  .bento-item:nth-child(3) { grid-area: 2 / 1 / 3 / 3 !important; }
  .bento-item:nth-child(4) { grid-area: 3 / 1 / 4 / 2 !important; }
  .bento-item:nth-child(5) { grid-area: 3 / 2 / 4 / 3 !important; }
}
`;

/* ── Home Page ── */

export default function Home() {
  return (
    <>
      <style>{bentoCSS}</style>
      <HorizontalSplitText
        text="Forging AI-native narratives at Serendepify"
        highlightWord="Serendepify"
        statement={
          <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 20px' }}>
            <h2 style={{ fontSize: 'clamp(2rem, 6vw, 5rem)', fontWeight: 300, color: 'var(--fg)', lineHeight: 1.08, letterSpacing: '-0.02em', marginBottom: '16px' }}>
              Building infrastructure<br />
              <span style={{ color: 'var(--orange)' }}>for the agent-native era</span>
            </h2>
            <p style={{ fontSize: 'clamp(1rem, 1.5vw, 1.15rem)', fontWeight: 400, color: 'var(--fg-2)', lineHeight: 1.6 }}>
              Tools that let agents and teams accomplish more.
            </p>
          </div>
        }
      />
      <BentoGrid />
      <TechSection />
      <CTASection />
    </>
  );
}
