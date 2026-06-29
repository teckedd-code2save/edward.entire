import { useRef, useEffect } from 'react';
import type { Project } from './projectData';

interface ProjectCardProps {
  project: Project;
  index: number;
}

function CardCanvas({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    let ctx: any;
    async function init() {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        gsap.fromTo(ref.current, { y: -20, opacity: 0.5 }, {
          y: 20, opacity: 0.5, ease: 'none',
          scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: 0.8 },
        });
      }, ref.current!);
    }
    init();
    return () => ctx?.revert();
  }, []);

  const isMauve = project.canvasMode === 'agents';
  const accent = isMauve ? 'var(--mauve)' : 'var(--orange)';

  return (
    <div ref={ref} className="relative h-full w-full overflow-hidden" style={{ backgroundColor: 'var(--bg-2)' }}>
      <div className={`absolute inset-0 ${isMauve ? 'grid-drift grid-drift--mauve' : 'grid-drift'}`} style={{ opacity: 0.35 }} />
      <div className="absolute inset-0 flex items-center justify-center font-sans tracking-[-0.05em]"
        style={{ fontSize: 'clamp(4rem, 10vw, 7rem)', color: accent, opacity: 0.12, fontWeight: 700 }}>
        ·{project.number}
      </div>
    </div>
  );
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const href = project.liveUrl || project.githubUrl || '#';

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group block overflow-hidden transition-all duration-300 hover:-translate-y-1"
      style={{ backgroundColor: 'var(--bg-2)' }}
    >
      <div className="relative overflow-hidden" style={{ height: '220px' }}>
        <CardCanvas project={project} index={index} />
      </div>

      <div className="p-6">
        <div className="flex items-center gap-3 mb-2">
          <span className="font-sans text-[10px] uppercase tracking-[0.14em]" style={{ color: 'var(--fg-4)' }}>
            {project.number}
          </span>
          <span className="font-sans text-[9px] uppercase tracking-[0.12em]" style={{ color: 'var(--orange)' }}>
            {project.tag}
          </span>
        </div>

        <h3 className="font-sans tracking-[-0.02em] mb-2" style={{ fontSize: '1.2rem', fontWeight: 400, color: 'var(--fg)', lineHeight: 1.2 }}>
          {project.title}
        </h3>

        <p className="font-sans text-[13px] leading-[1.6] mb-3" style={{ color: 'var(--fg-2)', fontWeight: 400, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {project.stack.slice(0, 4).map((tech) => (
            <span key={tech} className="font-sans text-[9px] uppercase tracking-wide" style={{ color: 'var(--fg-3)' }}>
              {tech}{' '}
            </span>
          ))}
        </div>
      </div>
    </a>
  );
}
