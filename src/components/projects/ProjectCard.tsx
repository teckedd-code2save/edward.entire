import { useState, useRef, useEffect, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import type { Project } from './projectData';

const AgentCanvas = lazy(() => import('./AgentCanvas'));
const TerminalCanvas = lazy(() => import('./TerminalCanvas'));
const ExchangeCanvas = lazy(() => import('./ExchangeCanvas'));

interface ProjectCardProps {
  project: Project;
  index: number;
  onOpenDetail: (project: Project) => void;
}

function CanvasPreview({ project, speedMultiplier }: { project: Project; speedMultiplier: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 400, height: 200 });

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
          <AgentCanvas
            width={size.width}
            height={size.height}
            speedMultiplier={speedMultiplier}
            isMini
          />
        )}
        {project.canvasMode === 'terminal' && (
          <TerminalCanvas
            width={size.width}
            height={size.height}
            speedMultiplier={speedMultiplier}
            isMini
            projectId={project.id}
          />
        )}
        {project.canvasMode === 'exchange' && (
          <ExchangeCanvas
            width={size.width}
            height={size.height}
            speedMultiplier={speedMultiplier}
            isMini
          />
        )}
      </Suspense>
    </div>
  );
}

export default function ProjectCard({ project, index, onOpenDetail }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [speedMultiplier, setSpeedMultiplier] = useState(1);

  useEffect(() => {
    setSpeedMultiplier(isHovered ? 1.5 : 1);
  }, [isHovered]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{
        duration: 0.7,
        delay: index * 0.12,
        ease: [0.0, 0, 0.2, 1] as [number, number, number, number],
        layout: { duration: 0.3 },
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group cursor-pointer overflow-hidden transition-all duration-300"
      style={{
        backgroundColor: 'var(--bg-2)',
        border: '1px solid var(--border)',
        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: isHovered ? '0 16px 48px rgba(79,93,255,0.06)' : 'none',
      }}
      onClick={() => onOpenDetail(project)}
    >
      {/* Canvas Area */}
      <div
        className="relative overflow-hidden"
        style={{ height: '200px' }}
      >
        <div
          className="transition-transform duration-300"
          style={{
            transform: isHovered ? 'scale(1.02)' : 'scale(1)',
            width: '100%',
            height: '100%',
          }}
        >
          <CanvasPreview project={project} speedMultiplier={speedMultiplier} />
        </div>
      </div>

      {/* Content Area */}
      <div className="p-7">
        {/* Row 1: Number + Tag */}
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px]" style={{ color: 'var(--fg-4)' }}>
            {project.number}
          </span>
          <span
            className="font-mono text-[9px] uppercase tracking-[0.08em]"
            style={{
              border: '1px solid var(--border)',
              padding: '3px 7px',
              color: 'var(--fg-3)',
            }}
          >
            {project.tag}
          </span>
        </div>

        {/* Row 2: Title */}
        <h3
          className="mt-2.5 font-mono text-lg font-medium"
          style={{ color: 'var(--fg)' }}
        >
          {project.title}
        </h3>

        {/* Row 3: Description */}
        <p
          className="mt-2.5 text-[13px] leading-relaxed"
          style={{
            color: 'rgba(255,255,255,0.72)',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {project.description}
        </p>

        {/* Row 4: Stack Pills */}
        <div className="mt-3.5 flex flex-wrap gap-1.5">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="font-mono text-[9px] uppercase tracking-wide"
              style={{
                border: '1px solid var(--border)',
                padding: '3px 7px',
                color: 'var(--fg-3)',
              }}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Row 5: Action */}
        <div className="mt-4 flex items-center justify-between">
          <span
            className="font-mono text-[11px] transition-colors duration-200 group-hover:text-[var(--accent)]"
            style={{ color: 'var(--fg-2)' }}
          >
            full details &rarr;
          </span>
          <div className="flex items-center gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="font-mono text-[9px] uppercase tracking-wide transition-colors duration-200 hover:text-[var(--accent)]"
                style={{ color: 'var(--fg-3)' }}
              >
                live
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="font-mono text-[9px] uppercase tracking-wide transition-colors duration-200 hover:text-[var(--accent)]"
                style={{ color: 'var(--fg-3)' }}
              >
                github
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
