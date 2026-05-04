import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import type { Project } from './projectData';

interface ProjectCardProps {
  project: Project;
  index: number;
  onOpenDetail: (project: Project) => void;
}

function AnimatedCanvas({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['-20px', '20px']);
  const rotate = useTransform(scrollYProgress, [0, 1], [-2, 2]);

  const isMauve = project.canvasMode === 'agents';
  const accent = isMauve ? 'var(--mauve)' : 'var(--orange)';
  const glow = isMauve ? 'rgba(199,125,255,0.18)' : 'rgba(255,85,0,0.18)';

  return (
    <div
      ref={ref}
      className="relative h-full w-full overflow-hidden"
      style={{
        backgroundColor: 'var(--bg-2)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <motion.div
        aria-hidden
        className={`absolute inset-0 ${isMauve ? 'grid-drift grid-drift--mauve' : 'grid-drift'}`}
        style={{ y, rotate, opacity: 0.5 }}
      />

      {/* Soft glow */}
      <div
        aria-hidden
        className="absolute"
        style={{
          inset: -30,
          background: `radial-gradient(circle at ${index % 2 === 0 ? '30% 70%' : '70% 30%'}, ${glow}, transparent 65%)`,
          filter: 'blur(16px)',
        }}
      />

      {/* Number */}
      <div
        className="absolute inset-0 flex items-center justify-center font-mono font-bold"
        style={{
          fontSize: 'clamp(4rem, 10vw, 7rem)',
          color: accent,
          opacity: 0.18,
          letterSpacing: '-0.05em',
        }}
      >
        ·{project.number}
      </div>
    </div>
  );
}

export default function ProjectCard({ project, index, onOpenDetail }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group cursor-pointer overflow-hidden transition-all duration-300"
      style={{
        backgroundColor: 'var(--bg-2)',
        border: '1px solid var(--border)',
        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: isHovered ? '0 16px 48px rgba(255,85,0,0.08)' : 'none',
      }}
      onClick={() => onOpenDetail(project)}
    >
      {/* Animated visual area */}
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
          <AnimatedCanvas project={project} index={index} />
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

        {/* Row 2: Title */}
        <h3
          className="mt-3 font-sans text-[1.25rem] font-bold tracking-[-0.02em]"
          style={{ color: 'var(--fg)' }}
        >
          {project.title}
        </h3>

        {/* Row 3: Description */}
        <p
          className="mt-2.5 text-[13px] leading-[1.65]"
          style={{
            color: 'var(--fg-2)',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {project.description}
        </p>

        {/* Row 4: Stack Pills */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.stack.map((tech, i) => (
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
        </div>

        {/* Row 5: Action */}
        <div className="mt-5 flex items-center justify-between">
          <span
            className="font-mono text-[11px] transition-colors duration-200 group-hover:text-[var(--orange)]"
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
                className="font-mono text-[9px] uppercase tracking-wide transition-colors duration-200 hover:text-[var(--orange)]"
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
                className="font-mono text-[9px] uppercase tracking-wide transition-colors duration-200 hover:text-[var(--orange)]"
                style={{ color: 'var(--fg-3)' }}
              >
                github
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
