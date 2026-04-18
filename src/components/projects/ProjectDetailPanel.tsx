import { useEffect, useRef, useState, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  const [size, setSize] = useState({ width: 720, height: 320 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setSize({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%' }}>
      <Suspense fallback={<div style={{ width: '100%', height: '100%', background: '#030303' }} />}>
        {project.canvasMode === 'agents' && (
          <AgentCanvas width={size.width} height={size.height} speedMultiplier={1.5} />
        )}
        {project.canvasMode === 'terminal' && (
          <TerminalCanvas width={size.width} height={size.height} speedMultiplier={1.5} projectId={project.id} />
        )}
        {project.canvasMode === 'exchange' && (
          <ExchangeCanvas width={size.width} height={size.height} speedMultiplier={1.5} />
        )}
      </Suspense>
    </div>
  );
}

export default function ProjectDetailPanel({ project, onClose }: ProjectDetailPanelProps) {
  const isOpen = project !== null;

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && project && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }}
            onClick={onClose}
            className="fixed inset-0 z-[400]"
            style={{
              backgroundColor: 'rgba(0,0,0,0.72)',
              backdropFilter: 'blur(6px)',
              WebkitBackdropFilter: 'blur(6px)',
            }}
          />

          {/* Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{
              duration: 0.45,
              ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
            }}
            className="fixed top-0 right-0 z-[401] overflow-y-auto"
            style={{
              width: 'min(720px, 100vw)',
              height: '100svh',
              backgroundColor: 'var(--bg-1)',
              borderLeft: '1px solid var(--border-2)',
            }}
          >
            {/* Header Bar */}
            <div
              className="sticky top-0 z-10 flex items-center justify-between"
              style={{
                padding: '16px 28px',
                backgroundColor: 'rgba(5,5,5,0.92)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                borderBottom: '1px solid var(--border)',
              }}
            >
              <span
                className="font-mono text-[10px] uppercase tracking-[0.12em]"
                style={{ color: 'var(--fg-3)' }}
              >
                {project.number} / {project.id}
              </span>
              <button
                onClick={onClose}
                className="cursor-pointer font-mono text-[11px] transition-colors duration-200"
                style={{
                  border: '1px solid var(--border)',
                  padding: '6px 14px',
                  color: 'var(--fg-2)',
                  background: 'transparent',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--accent)';
                  e.currentTarget.style.color = 'var(--fg)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border)';
                  e.currentTarget.style.color = 'var(--fg-2)';
                }}
              >
                close &times;
              </button>
            </div>

            {/* Hero Canvas */}
            <div className="relative" style={{ height: '320px', overflow: 'hidden' }}>
              <DetailCanvas project={project} />
              {/* Gradient overlay at bottom */}
              <div
                className="absolute inset-x-0 bottom-0"
                style={{
                  height: '100%',
                  background: 'linear-gradient(to top, rgba(5,5,5,0.95) 0%, rgba(5,5,5,0.6) 55%, transparent 100%)',
                }}
              />
              {/* Hero text overlay */}
              <div className="absolute bottom-0 left-0" style={{ padding: '28px 36px' }}>
                <span
                  className="font-mono text-[10px] uppercase tracking-[0.16em]"
                  style={{ color: 'rgba(255,255,255,0.45)' }}
                >
                  {project.tag}
                </span>
                <h2
                  className="mt-1 font-mono font-bold"
                  style={{
                    fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
                    color: 'var(--fg)',
                  }}
                >
                  {project.title}
                </h2>
              </div>
            </div>

            {/* Panel Body */}
            <div style={{ padding: '36px' }}>
              {/* Overview */}
              <Section label="overview">
                <p className="text-[14px] leading-[1.7]" style={{ color: 'var(--fg-2)' }}>
                  {project.description}
                </p>
              </Section>

              {/* Stack */}
              <Section label="stack">
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-[10px] uppercase tracking-wide transition-all duration-200"
                      style={{
                        border: '1px solid var(--border)',
                        padding: '4px 10px',
                        color: 'var(--fg-3)',
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </Section>

              {/* Architecture */}
              <Section label="architecture">
                <p className="text-[14px] leading-[1.7]" style={{ color: 'var(--fg-2)' }}>
                  {project.architecture}
                </p>
              </Section>

              {/* Highlights */}
              <Section label="highlights">
                <ul className="space-y-2">
                  {project.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2 text-[14px] leading-[1.7]" style={{ color: 'var(--fg-2)' }}>
                      <span className="mt-1.5 block h-1 w-1 flex-shrink-0 rounded-full" style={{ backgroundColor: 'var(--accent)' }} />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </Section>

              {/* Links */}
              {(project.liveUrl || project.githubUrl) && (
                <Section label="links">
                  <div className="flex flex-wrap gap-3">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block font-mono text-[11px] transition-all duration-200"
                        style={{
                          border: '1px solid var(--border-2)',
                          padding: '8px 18px',
                          color: 'var(--fg-2)',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = 'var(--accent)';
                          e.currentTarget.style.color = 'var(--fg)';
                          e.currentTarget.style.transform = 'translateY(-2px)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = 'var(--border-2)';
                          e.currentTarget.style.color = 'var(--fg-2)';
                          e.currentTarget.style.transform = 'translateY(0)';
                        }}
                      >
                        live site &rarr;
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block font-mono text-[11px] transition-all duration-200"
                        style={{
                          border: '1px solid var(--border-2)',
                          padding: '8px 18px',
                          color: 'var(--fg-2)',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = 'var(--accent)';
                          e.currentTarget.style.color = 'var(--fg)';
                          e.currentTarget.style.transform = 'translateY(-2px)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = 'var(--border-2)';
                          e.currentTarget.style.color = 'var(--fg-2)';
                          e.currentTarget.style.transform = 'translateY(0)';
                        }}
                      >
                        github &rarr;
                      </a>
                    )}
                  </div>
                </Section>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-8">
      <div
        className="mb-3 flex items-center gap-3"
      >
        <span
          className="font-mono text-[9px] uppercase tracking-[0.14em]"
          style={{ color: 'rgba(255,255,255,0.4)' }}
        >
          {label}
        </span>
        <div className="h-px flex-1" style={{ backgroundColor: 'rgba(255,255,255,0.08)' }} />
      </div>
      {children}
    </div>
  );
}
