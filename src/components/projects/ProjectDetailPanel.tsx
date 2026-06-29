import { useEffect, useRef } from 'react';
import type { Project } from './projectData';

interface ProjectDetailPanelProps {
  project: Project | null;
  onClose: () => void;
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
  const scrollRef = useRef<HTMLDivElement>(null);

  // Lock body scroll while panel is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
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

  // GSAP entrance
  useEffect(() => {
    if (!isOpen) return;
    let ctx: any;
    async function init() {
      const { gsap } = await import('gsap');
      ctx = gsap.context(() => {
        const tl = gsap.timeline();
        tl.fromTo('.detail-overlay', { opacity: 0 }, { opacity: 1, duration: 0.25, ease: 'power2.out' })
          .fromTo('.detail-card', { y: 36, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }, '-=0.1')
          .fromTo('.detail-section', { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, stagger: 0.06, ease: 'power2.out' }, '-=0.15')
          .fromTo('.detail-cta-row', { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: 'power2.out' }, '-=0.1');
      });
    }
    init();
    return () => ctx?.revert();
  }, [isOpen, project?.id]);

  if (!isOpen || !project) return null;

  const hasDeployLink = !!project.liveUrl;
  const hasSourceLink = !!project.githubUrl;

  return (
    <>
      {/* Overlay */}
      <div
        className="detail-overlay fixed inset-0 z-[500]"
        style={{ backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}
        onClick={onClose}
      />

      {/* Scrollable panel — uses document flow, not fixed, to ensure scroll works */}
      <div
        ref={scrollRef}
        className="fixed inset-0 z-[501]"
        style={{ overflowY: 'auto', WebkitOverflowScrolling: 'touch' }}
      >
        <div
          className="flex items-start justify-center"
          style={{ minHeight: '100%', padding: 'clamp(16px, 3vw, 32px)' }}
        >
          <div
            className="detail-card w-full"
            style={{ maxWidth: '820px', marginTop: 'clamp(60px, 8vw, 100px)', marginBottom: 'clamp(40px, 6vw, 80px)' }}
          >
            {/* ── Header bar ── */}
            <div
              className="flex items-center justify-between"
              style={{
                padding: '20px 28px',
                backgroundColor: 'var(--bg-1)',
                border: '1px solid var(--border)',
                borderBottom: 'none',
              }}
            >
              <div>
                <span className="font-sans text-[10px] uppercase tracking-[0.16em]" style={{ color: 'var(--fg-4)' }}>
                  {project.number}
                </span>
                <span className="font-sans text-[10px] uppercase tracking-[0.12em] ml-3" style={{ color: 'var(--fg-3)' }}>
                  {project.tag}
                </span>
              </div>
              <button
                onClick={onClose}
                className="font-sans text-xs transition-colors duration-200 hover:text-[var(--orange)]"
                style={{ border: '1px solid var(--border-2)', padding: '6px 14px', color: 'var(--fg-3)', background: 'transparent', cursor: 'pointer' }}
              >
                Close
              </button>
            </div>

            {/* ── Title ── */}
            <div
              style={{
                backgroundColor: 'var(--bg-1)',
                border: '1px solid var(--border)',
                borderTop: 'none',
                padding: '0 28px 28px',
              }}
            >
              <h1
                className="font-sans tracking-[-0.03em]"
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

            {/* ── Body ── */}
            <div
              style={{
                backgroundColor: 'var(--bg-1)',
                border: '1px solid var(--border)',
                borderTop: 'none',
                padding: 'clamp(24px, 4vw, 48px) 28px',
              }}
            >
              {/* CTAs */}
              <div className="detail-cta-row mb-10 flex flex-wrap gap-3">
                {hasDeployLink && (
                  <LinkButton href={project.liveUrl!} label="View live site" variant="orange" />
                )}
                {hasSourceLink && (
                  <LinkButton href={project.githubUrl!} label="View source" variant={hasDeployLink ? 'mauve' : 'orange'} />
                )}
                <LinkButton
                  href="mailto:edwardktwumasi1000@gmail.com"
                  label="Discuss this project"
                  variant="subtle"
                />
              </div>

              {/* Overview */}
              <div className="detail-section mb-10">
                <SectionLabel>Overview</SectionLabel>
                <p className="font-sans leading-relaxed" style={{ fontSize: 'clamp(0.95rem, 1.3vw, 1.1rem)', color: 'var(--fg-2)', fontWeight: 400 }}>
                  {project.description}
                </p>
              </div>

              {/* Architecture */}
              <div className="detail-section mb-10">
                <SectionLabel>Architecture</SectionLabel>
                <p className="font-sans text-[15px] leading-relaxed" style={{ color: 'var(--fg-2)', fontWeight: 400 }}>
                  {project.architecture}
                </p>
              </div>

              {/* Highlights */}
              <div className="detail-section mb-10">
                <SectionLabel>Highlights</SectionLabel>
                <ul className="space-y-3">
                  {project.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span
                        className="mt-1.5 block flex-shrink-0"
                        style={{ width: 6, height: 6, backgroundColor: 'var(--orange)', boxShadow: '0 0 8px var(--orange-glow)' }}
                      />
                      <span className="font-sans text-[15px] leading-relaxed" style={{ color: 'var(--fg-2)', fontWeight: 400 }}>
                        {h}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Stack */}
              <div className="detail-section mb-10">
                <SectionLabel>Stack</SectionLabel>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tech, i) => (
                    <span
                      key={tech}
                      className="font-sans text-[10px] uppercase tracking-wider"
                      style={{ border: `1px solid ${i % 2 === 0 ? 'rgba(255,85,0,0.35)' : 'rgba(199,125,255,0.35)'}`, padding: '5px 12px', color: 'var(--fg-2)' }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom CTA */}
              <div className="detail-cta-row" style={{ borderTop: '1px solid var(--border)', paddingTop: '32px' }}>
                <p className="mb-4 font-sans text-sm" style={{ color: 'var(--fg-3)', fontWeight: 400 }}>
                  Interested in building something similar?
                </p>
                <div className="flex flex-wrap gap-3">
                  <LinkButton href="mailto:edwardktwumasi1000@gmail.com" label="Start a conversation" variant="orange" />
                  {hasSourceLink && (
                    <LinkButton href={project.githubUrl!} label="Fork on GitHub" variant="subtle" />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <span className="font-sans text-[10px] uppercase tracking-[0.16em]" style={{ color: 'var(--fg-4)' }}>
        {children}
      </span>
      <div className="h-px flex-1" style={{ backgroundColor: 'var(--border)' }} />
    </div>
  );
}
