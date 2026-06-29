import { useRef, useEffect } from 'react';
import type { Project } from './projectData';

interface ProjectCardProps {
  project: Project;
  index: number;
  onOpenDetail: (project: Project) => void;
}

function AnimatedCanvas({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    let ctx: any;
    async function init() {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        gsap.fromTo(
          ref.current,
          { y: -20, rotate: -2, opacity: 0.5 },
          {
            y: 20, rotate: 2, opacity: 0.5,
            ease: 'none',
            scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: 0.8 },
          }
        );
      }, ref.current!);
    }
    init();
    return () => ctx?.revert();
  }, []);

  const isMauve = project.canvasMode === 'agents';
  const accent = isMauve ? 'var(--mauve)' : 'var(--orange)';
  const glow = isMauve ? 'rgba(199,125,255,0.12)' : 'rgba(255,85,0,0.12)';

  return (
    <div
      ref={ref}
      className="relative h-full w-full overflow-hidden"
      style={{
        backgroundColor: 'var(--bg-2)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      {/* Grid background */}
      <div
        className={`absolute inset-0 ${isMauve ? 'grid-drift grid-drift--mauve' : 'grid-drift'}`}
        style={{ opacity: 0.4 }}
      />
      {/* Soft glow */}
      <div
        className="absolute"
        style={{
          inset: -30,
          background: `radial-gradient(circle at ${index % 2 === 0 ? '30% 70%' : '70% 30%'}, ${glow}, transparent 65%)`,
          filter: 'blur(16px)',
        }}
      />
      {/* Number watermark */}
      <div
        className="absolute inset-0 flex items-center justify-center font-mono tracking-[-0.05em]"
        style={{
          fontSize: 'clamp(4rem, 10vw, 7rem)',
          color: accent,
          opacity: 0.14,
          fontWeight: 700,
        }}
      >
        ·{project.number}
      </div>
    </div>
  );
}

export default function ProjectCard({ project, index, onOpenDetail }: ProjectCardProps) {
  return (
    <div
      className="group cursor-pointer overflow-hidden"
      style={{
        backgroundColor: 'var(--bg-2)',
        border: '1px solid var(--border)',
      }}
    >
      {/* Clickable area → opens detail */}
      <div onClick={() => onOpenDetail(project)} style={{ cursor: 'pointer' }}>
        {/* Visual canvas */}
        <div className="relative overflow-hidden" style={{ height: '200px' }}>
          <AnimatedCanvas project={project} index={index} />
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Number + Tag row */}
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px]" style={{ color: 'var(--fg-4)' }}>
              {project.number}
            </span>
            <span
              className="font-mono text-[9px] uppercase tracking-[0.12em]"
              style={{
                border: '1px solid rgba(255,85,0,0.4)',
                padding: '3px 8px',
                color: 'var(--orange)',
              }}
            >
              {project.tag}
            </span>
          </div>

          {/* Title */}
          <h3
            className="mt-3 font-sans tracking-[-0.02em]"
            style={{
              fontSize: '1.25rem',
              fontWeight: 400,
              color: 'var(--fg)',
              lineHeight: 1.2,
            }}
          >
            {project.title}
          </h3>

          {/* Description — 3-line clamp */}
          <p
            className="mt-2 font-sans text-[13px] leading-[1.6]"
            style={{
              color: 'var(--fg-2)',
              fontWeight: 400,
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {project.description}
          </p>

          {/* Stack pills */}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.stack.slice(0, 5).map((tech, i) => (
              <span
                key={tech}
                className="font-mono text-[9px] uppercase tracking-wide"
                style={{
                  border: `1px solid ${i % 2 === 0 ? 'rgba(255,85,0,0.35)' : 'rgba(199,125,255,0.35)'}`,
                  padding: '3px 7px',
                  color: 'var(--fg-3)',
                }}
              >
                {tech}
              </span>
            ))}
            {project.stack.length > 5 && (
              <span
                className="font-mono text-[9px]"
                style={{ color: 'var(--fg-4)', padding: '3px 4px' }}
              >
                +{project.stack.length - 5}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Action bar — always visible, outside click-to-detail area */}
      <div
        className="flex items-center gap-3 px-6 pb-5"
        style={{ borderTop: 'none' }}
      >
        <button
          onClick={() => onOpenDetail(project)}
          className="font-sans text-[12px] transition-colors duration-200 hover:text-[var(--orange)]"
          style={{
            border: '1px solid var(--border-2)',
            padding: '6px 14px',
            color: 'var(--fg-2)',
            background: 'transparent',
            cursor: 'pointer',
            fontWeight: 400,
          }}
        >
          Full details →
        </button>

        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="font-sans text-[12px] transition-all duration-200 hover:-translate-y-0.5"
            style={{
              border: '1px solid rgba(255,85,0,0.45)',
              padding: '6px 14px',
              color: 'var(--orange)',
              fontWeight: 400,
            }}
          >
            Live ↗
          </a>
        )}

        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="font-sans text-[12px] transition-all duration-200 hover:-translate-y-0.5"
            style={{
              border: '1px solid rgba(199,125,255,0.45)',
              padding: '6px 14px',
              color: 'var(--mauve)',
              fontWeight: 400,
            }}
          >
            Source ↗
          </a>
        )}
      </div>
    </div>
  );
}
