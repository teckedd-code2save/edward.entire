import { useEffect, useRef, useState, lazy, Suspense } from 'react';
import type { Project } from './projectData';

const AgentCanvas = lazy(() => import('./AgentCanvas'));
const TerminalCanvas = lazy(() => import('./TerminalCanvas'));
const ExchangeCanvas = lazy(() => import('./ExchangeCanvas'));

interface ProjectDetailPanelProps {
  project: Project | null;
  onClose: () => void;
}

function DetailCanvas({ project }: { project: Project }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 720, height: 400 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setSize({ width: entry.contentRect.width, height: entry.contentRect.height });
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%' }}>
      <Suspense fallback={<div style={{ width: '100%', height: '100%', background: '#080808' }} />}>
        {project.canvasMode === 'agents' && (
          <AgentCanvas width={size.width} height={size.height} speedMultiplier={1.2} />
        )}
        {project.canvasMode === 'terminal' && (
          <TerminalCanvas width={size.width} height={size.height} speedMultiplier={1.2} projectId={project.id} />
        )}
        {project.canvasMode === 'exchange' && (
          <ExchangeCanvas width={size.width} height={size.height} speedMultiplier={1.2} />
        )}
      </Suspense>
    </div>
  );
}

function LinkButton({ href, label, variant = 'orange' }: { href: string; label: string; variant?: 'orange' | 'mauve' | 'subtle' }) {
  const colorVar = variant === 'orange' ? 'var(--orange)' : variant === 'mauve' ? 'var(--mauve)' : 'var(--fg-3)';
  const borderVar = variant === 'subtle' ? 'var(--border-2)' : `1px solid ${colorVar}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 font-sans text-sm transition-all duration-200 hover:-translate-y-0.5"
      style={{
        border: borderVar,
        padding: '10px 22px',
        color: 'var(--fg)',
        fontWeight: 400,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = variant === 'subtle' ? 'rgba(255,255,255,0.04)' : `${colorVar}18`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'transparent';
      }}
    >
      {label} <span style={{ color: colorVar, fontSize: '1.1em' }}>→</span>
    </a>
  );
}

export default function ProjectDetailPanel({ project, onClose }: ProjectDetailPanelProps) {
  const isOpen = project !== null;
  const panelRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Scroll to top of panel content
      setTimeout(() => bodyRef.current?.scrollTo(0, 0), 50);
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Escape to close
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  // GSAP entrance animation
  useEffect(() => {
    if (!isOpen || !panelRef.current) return;
    let ctx: gsap.Context | undefined;
    async function init() {
      const { gsap } = await import('gsap');
      ctx = gsap.context(() => {
        const tl = gsap.timeline();
        tl.fromTo('.detail-overlay', { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' })
          .fromTo('.detail-panel-card', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }, '-=0.15')
          .fromTo('.detail-section', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, stagger: 0.08, ease: 'power2.out' }, '-=0.1')
          .fromTo('.detail-cta-row', { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' }, '-=0.1');
      }, panelRef.current!);
    }
    init();
    return () => ctx?.revert();
  }, [isOpen, project?.id]);

  if (!isOpen || !project) return null;

  const hasDeployLink = !!project.liveUrl;
  const hasSourceLink = !!project.githubUrl;

  return (
    <div ref={panelRef}>
      {/* Overlay — click to close */}
      <div
        className="detail-overlay fixed inset-0 z-[500]"
        style={{ backgroundColor: 'rgba(0,0,0,0.82)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}
        onClick={onClose}
      />

      {/* Scrollable panel */}
      <div
        ref={bodyRef}
        className="fixed inset-0 z-[501] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex min-h-full items-start justify-center p-4 pt-16 pb-24 md:p-8 md:pt-20 md:pb-32">
          <div
            className="detail-panel-card w-full"
            style={{ maxWidth: '820px' }}
          >
            {/* ── Close button (floating) ── */}
            <div className="mb-6 flex justify-end">
              <button
                onClick={onClose}
                className="font-mono text-xs tracking-wider transition-colors duration-200 hover:text-[var(--orange)]"
                style={{
                  border: '1px solid var(--border-2)',
                  padding: '8px 16px',
                  color: 'var(--fg-3)',
                  background: 'transparent',
                  cursor: 'pointer',
                }}
              >
                ESC
              </button>
            </div>

            {/* ── Hero: Canvas + Title overlay ── */}
            <div
              className="relative overflow-hidden"
              style={{
                height: 'clamp(240px, 40vw, 380px)',
                backgroundColor: 'var(--bg-1)',
                border: '1px solid var(--border)',
              }}
            >
              <DetailCanvas project={project} />
              {/* Gradient + title overlay */}
              <div
                className="absolute inset-0 flex flex-col justify-end"
                style={{
                  background: 'linear-gradient(to top, rgba(8,8,8,0.95) 0%, rgba(8,8,8,0.55) 50%, transparent 100%)',
                  padding: 'clamp(24px, 5vw, 48px)',
                }}
              >
                <span
                  className="font-mono text-[10px] uppercase tracking-[0.18em]"
                  style={{ color: 'var(--fg-3)' }}
                >
                  {project.number} — {project.tag}
                </span>
                <h1
                  className="mt-1 font-sans tracking-[-0.03em]"
                  style={{
                    fontSize: 'clamp(2rem, 6vw, 3.6rem)',
                    fontWeight: 300,
                    color: 'var(--fg)',
                    lineHeight: 1.05,
                  }}
                >
                  {project.title}
                </h1>
              </div>
            </div>

            {/* ── Body card ── */}
            <div
              style={{
                backgroundColor: 'var(--bg-1)',
                border: '1px solid var(--border)',
                borderTop: 'none',
                padding: 'clamp(28px, 5vw, 52px)',
              }}
            >
              {/* ── CTA Row (top, prominent) ── */}
              <div className="detail-cta-row mb-10 flex flex-wrap gap-3">
                {hasDeployLink && (
                  <LinkButton href={project.liveUrl!} label="View live site" variant="orange" />
                )}
                {hasSourceLink && (
                  <LinkButton href={project.githubUrl!} label="View source" variant={hasDeployLink ? 'mauve' : 'orange'} />
                )}
                <LinkButton
                  href="mailto:edwardktwumasi1000@gmail.com?subject=Regarding%20your%20project"
                  label="Discuss this project"
                  variant="subtle"
                />
              </div>

              {/* ── Overview ── */}
              <div className="detail-section mb-10">
                <SectionLabel>Overview</SectionLabel>
                <p
                  className="font-sans leading-relaxed"
                  style={{ fontSize: 'clamp(0.95rem, 1.3vw, 1.1rem)', color: 'var(--fg-2)', fontWeight: 400 }}
                >
                  {project.description}
                </p>
              </div>

              {/* ── Architecture ── */}
              <div className="detail-section mb-10">
                <SectionLabel>Architecture</SectionLabel>
                <p
                  className="font-sans text-[15px] leading-relaxed"
                  style={{ color: 'var(--fg-2)', fontWeight: 400 }}
                >
                  {project.architecture}
                </p>
              </div>

              {/* ── Highlights ── */}
              <div className="detail-section mb-10">
                <SectionLabel>Highlights</SectionLabel>
                <ul className="space-y-3">
                  {project.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span
                        className="mt-1.5 block flex-shrink-0"
                        style={{
                          width: 6,
                          height: 6,
                          backgroundColor: 'var(--orange)',
                          boxShadow: '0 0 8px var(--orange-glow)',
                        }}
                      />
                      <span
                        className="font-sans text-[15px] leading-relaxed"
                        style={{ color: 'var(--fg-2)', fontWeight: 400 }}
                      >
                        {h}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* ── Stack ── */}
              <div className="detail-section mb-10">
                <SectionLabel>Stack</SectionLabel>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tech, i) => (
                    <span
                      key={tech}
                      className="font-mono text-[10px] uppercase tracking-wider"
                      style={{
                        border: `1px solid ${i % 2 === 0 ? 'rgba(255,85,0,0.35)' : 'rgba(199,125,255,0.35)'}`,
                        padding: '5px 12px',
                        color: 'var(--fg-2)',
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* ── Bottom CTA ── */}
              <div
                className="detail-cta-row"
                style={{
                  borderTop: '1px solid var(--border)',
                  paddingTop: '32px',
                }}
              >
                <p
                  className="mb-4 font-sans text-sm"
                  style={{ color: 'var(--fg-3)', fontWeight: 400 }}
                >
                  Interested in building something similar or collaborating on this project?
                </p>
                <div className="flex flex-wrap gap-3">
                  <LinkButton
                    href="mailto:edwardktwumasi1000@gmail.com?subject=Collaboration%3A%20Regarding%20your%20project"
                    label="Start a conversation"
                    variant="orange"
                  />
                  {hasSourceLink && (
                    <LinkButton href={project.githubUrl!} label="Fork on GitHub" variant="subtle" />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <span
        className="font-mono text-[10px] uppercase tracking-[0.16em]"
        style={{ color: 'var(--fg-4)' }}
      >
        {children}
      </span>
      <div className="h-px flex-1" style={{ backgroundColor: 'var(--border)' }} />
    </div>
  );
}
