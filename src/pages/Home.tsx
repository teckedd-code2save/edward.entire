import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HorizontalSplitText from '@/components/HorizontalSplitText';

/* ── Featured project data (syncs with projectData.ts) ── */

interface FeaturedProject {
  number: string;
  tag: string;
  tone: 'orange' | 'mauve';
  title: string;
  blurb: string;
  detail: string;
  stack: string[];
  live?: string;
  github?: string;
}

const featured: FeaturedProject[] = [
  {
    number: '01', tag: 'infra dashboard', tone: 'mauve', title: 'GroundControl',
    blurb: 'Self-hosted dashboard for Docker, Caddy, and deployments — one pane of glass.',
    detail: 'Manages container lifecycle, reverse proxy routes, and deployment pipelines on a Hetzner VPS.',
    stack: ['TypeScript', 'Docker', 'Caddy', 'Hetzner', 'React'],
    live: 'https://groundcontrol.serendepify.com/',
    github: 'https://github.com/teckedd-code2save/groundcontrol',
  },
  {
    number: '02', tag: 'speech AI', tone: 'orange', title: 'Akan Speech Lab',
    blurb: 'First open ASR and TTS for Akan — 30M+ speakers, near-zero speech tech.',
    detail: 'Custom Whisper fine-tuning for tonal Akan phonology. TTS synthesis on curated Twi/Fante corpora.',
    stack: ['Python', 'PyTorch', 'Whisper', 'TTS', 'HuggingFace'],
    github: 'https://github.com/teckedd-code2save/akan-speech-lab',
  },
  {
    number: '03', tag: 'deployment agent', tone: 'mauve', title: 'Convoy',
    blurb: 'Rehearses your deploy. Ships it. Watches. Never touches your code.',
    detail: 'Built for Claude Code hackathon on Opus 4.7. Plan → rehearse → canary → observe.',
    stack: ['TypeScript', 'Claude Opus 4.7', 'MCP', 'Agent Loop'],
    live: 'https://convoy-home.vercel.app/',
    github: 'https://github.com/teckedd-code2save/convoy',
  },
  {
    number: '04', tag: 'dev acceleration', tone: 'orange', title: 'AI Build Tools',
    blurb: 'AI-powered CLI toolkit — scaffolding, code gen, dependency management.',
    detail: 'Smart dependency resolver with version conflict detection. GitHub Pages docs.',
    stack: ['TypeScript', 'Node.js', 'AI Code Gen', 'CLI'],
    live: 'https://teckedd-code2save.github.io/ai-build-tools/',
    github: 'https://github.com/teckedd-code2save/ai-build-tools',
  },
  {
    number: '05', tag: 'TON mini app', tone: 'mauve', title: 'HealthWallet',
    blurb: 'Health records on-chain. Patients control access, no intermediaries.',
    detail: 'TON smart contracts for access control. Telegram-native, zero-friction onboarding.',
    stack: ['TypeScript', 'TON Blockchain', 'Telegram Mini App', 'Smart Contracts'],
    github: 'https://github.com/teckedd-code2save/HealthWallet-TON-MiniApp',
  },
];

/* ── Statement Section ── */

function StatementSection() {
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
        gsap.fromTo('.st-line', { y: '120%', rotate: 2 }, {
          y: '0%', rotate: 0, duration: 1.6, stagger: 0.2, ease: 'power3.inOut',
          scrollTrigger: { trigger: ref.current, start: 'top 70%', toggleActions: 'play none none none' },
        });
        gsap.fromTo('.st-desc', { y: 24, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.8, delay: 1, ease: 'power2.out',
          scrollTrigger: { trigger: ref.current, start: 'top 70%', toggleActions: 'play none none none' },
        });
      }, ref.current!);
    }
    init();
    return () => ctx?.revert();
  }, []);

  return (
    <section ref={ref} style={{ padding: 'clamp(100px, 14vw, 180px) 0', backgroundColor: 'var(--bg-1)' }}>
      <div className="mx-auto max-w-[1100px] px-5 md:px-10">
        <h2 style={{ fontSize: 'clamp(2rem, 6vw, 5rem)', fontWeight: 300, color: 'var(--fg)', lineHeight: 1.08, letterSpacing: '-0.02em', overflow: 'hidden' }}>
          <div className="st-line" style={{ overflow: 'hidden', marginBottom: '-0.05em' }}>
            <span>Building infrastructure</span>
          </div>
          <div className="st-line" style={{ overflow: 'hidden', marginBottom: '-0.05em' }}>
            <span style={{ color: 'var(--orange)' }}>for the agent-native era</span>
          </div>
        </h2>
        <p className="st-desc mt-8 font-sans" style={{ fontSize: 'clamp(1rem, 1.5vw, 1.2rem)', fontWeight: 400, color: 'var(--fg-2)', maxWidth: '600px', lineHeight: 1.6 }}>
          Deployments that rehearse before they ship. Dashboards that give you control without SSH.
          Speech AI for languages the industry forgot. Tools that let agents do real work.
        </p>
      </div>
    </section>
  );
}

/* ── Project Row ── */

function ProjectRow({ project, index }: { project: FeaturedProject; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reverse = index % 2 === 1;

  useEffect(() => {
    if (!ref.current) return;
    let ctx: any;
    async function init() {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      ctx = gsap.context(() => {
        gsap.fromTo(ref.current, { y: 60, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 85%', toggleActions: 'play none none none' },
        });
      }, ref.current!);
    }
    init();
    return () => ctx?.revert();
  }, []);

  const accentVar = project.tone === 'orange' ? 'var(--orange)' : 'var(--mauve)';

  return (
    <div ref={ref} style={{ padding: 'clamp(28px, 4vw, 48px) 0', borderTop: index > 0 ? '1px solid var(--border)' : 'none' }}>
      <div style={{ display: 'grid', gridTemplateColumns: reverse ? '1fr 1.2fr' : '1.2fr 1fr', gap: 'clamp(24px, 4vw, 60px)', alignItems: 'center' }}>
        <div style={{ order: reverse ? 2 : 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: 'var(--fg-3)', fontWeight: 400 }}>{project.number}</span>
            <span style={{ width: '24px', height: '1px', backgroundColor: 'var(--border-2)' }} />
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.12em', color: accentVar, fontWeight: 500 }}>{project.tag}</span>
          </div>
          <h3 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 300, color: 'var(--fg)', letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: '12px' }}>
            <a href={project.live || project.github || '#'} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--orange)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--fg)'; }}>
              {project.title}
            </a>
          </h3>
          <p style={{ fontSize: 'clamp(0.9rem, 1.2vw, 1.05rem)', fontWeight: 400, color: 'var(--fg-2)', lineHeight: 1.6, marginBottom: '16px', maxWidth: '520px' }}>
            {project.detail}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
            {project.stack.map((s) => (
              <span key={s} style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: 'var(--fg-3)', fontWeight: 400 }}>{s}</span>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '16px' }}>
            {project.live && (
              <a href={project.live} target="_blank" rel="noopener noreferrer"
                style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: 'var(--orange)', fontWeight: 400, textDecoration: 'none', borderBottom: '1px solid rgba(255,85,0,0.3)', paddingBottom: '2px', transition: 'border-color 0.2s' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--orange)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,85,0,0.3)'; }}>
                Live →
              </a>
            )}
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer"
                style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: 'var(--fg-2)', fontWeight: 400, textDecoration: 'none', borderBottom: '1px solid var(--border-2)', paddingBottom: '2px', transition: 'border-color 0.2s' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--fg-2)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-2)'; }}>
                Source →
              </a>
            )}
          </div>
        </div>
        <div style={{ order: reverse ? 1 : 2, position: 'relative', overflow: 'hidden', minHeight: '260px', backgroundColor: 'var(--bg-2)' }}>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: 'clamp(6rem, 12vw, 11rem)', fontWeight: 700, color: accentVar, opacity: 0.08, letterSpacing: '-0.04em', fontFamily: "'Inter', sans-serif" }}>
              {project.number}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Tech Nodes ── */

const techNodes = [
  { name: 'TypeScript', color: '#3178C6' },
  { name: 'Python', color: '#4BA4C8' },
  { name: 'Docker', color: '#2496ED' },
  { name: 'Caddy', color: '#22B638' },
  { name: 'Hetzner', color: '#D50C2D' },
  { name: 'TON', color: '#0088CC' },
  { name: 'PostgreSQL', color: '#336791' },
  { name: 'React', color: '#61DAFB' },
  { name: 'HuggingFace', color: '#FFBD45' },
  { name: 'PyTorch', color: '#EE4C2C' },
  { name: 'Claude', color: 'var(--mauve)' },
  { name: 'MCP', color: 'var(--orange)' },
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
        gsap.fromTo('.tech-pill', { y: 20, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.5, stagger: 0.04, ease: 'power2.out',
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
        <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 3.4rem)', fontWeight: 300, color: 'var(--fg)', letterSpacing: '-0.02em', lineHeight: 1.05, marginBottom: 'clamp(32px, 5vw, 56px)' }}>
          Tools at <span style={{ color: 'var(--mauve)' }}>hand</span>
        </h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {techNodes.map((t) => (
            <span key={t.name} className="tech-pill"
              style={{
                fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 400, color: t.color,
                padding: '7px 16px', border: `1px solid ${t.color}33`,
              }}>
              {t.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── CTA Section ── */

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
        gsap.fromTo('.cta-btn', { y: 24, opacity: 0 }, {
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
          <div className="cta-line" style={{ overflow: 'hidden', marginBottom: '-0.04em' }}>
            <span>Let&apos;s build</span>
          </div>
          <div className="cta-line" style={{ overflow: 'hidden' }}>
            <span style={{ color: 'var(--orange)' }}>something real</span>
          </div>
        </h2>
        <p style={{ fontSize: 'clamp(1rem, 1.4vw, 1.15rem)', fontWeight: 400, color: 'var(--fg-2)', marginTop: '24px', marginBottom: '40px', lineHeight: 1.6, maxWidth: '500px', marginLeft: 'auto', marginRight: 'auto' }}>
          Backend systems, agent runtimes, infrastructure. Pull me in before the tech debt piles up.
        </p>
        <div className="cta-btn" style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/contact"
            style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', fontWeight: 400, color: 'var(--fg)', padding: '14px 32px', border: '1px solid var(--orange)', backgroundColor: 'rgba(255,85,0,0.08)', textDecoration: 'none', transition: 'all 0.2s' }}
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

/* ── Home Page ── */

export default function Home() {
  return (
    <>
      <HorizontalSplitText
        text="Forging AI-native narratives at Serendepify"
        highlightWord="Serendepify"
        subtitle="Agent runtimes · Developer platforms · Infrastructure"
      />
      <StatementSection />
      <section style={{ padding: 'clamp(60px, 8vw, 100px) 0', backgroundColor: 'var(--bg)' }}>
        <div className="mx-auto max-w-[1100px] px-5 md:px-10">
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '10px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--fg-4)', marginBottom: 'clamp(28px, 4vw, 48px)' }}>
            Featured projects
          </p>
          {featured.map((p, i) => (
            <ProjectRow key={p.number} project={p} index={i} />
          ))}
          <div style={{ textAlign: 'right', marginTop: 'clamp(32px, 4vw, 48px)' }}>
            <Link to="/projects"
              style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', fontWeight: 400, color: 'var(--fg-3)', textDecoration: 'none', borderBottom: '1px solid var(--border-2)', paddingBottom: '3px', transition: 'all 0.2s' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--orange)'; e.currentTarget.style.borderColor = 'var(--orange)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--fg-3)'; e.currentTarget.style.borderColor = 'var(--border-2)'; }}>
              View all projects →
            </Link>
          </div>
        </div>
      </section>
      <TechSection />
      <CTASection />
    </>
  );
}
