import { useRef, useEffect } from 'react';
import { projects, filterCategories } from '@/components/projects/projectData';
import type { ProjectCategory } from '@/components/projects/projectData';
import ProjectCard from '@/components/projects/ProjectCard';

export default function Projects() {
  const heroRef = useRef<HTMLDivElement>(null);

  // GSAP hero animation
  useEffect(() => {
    if (!heroRef.current) return;
    let ctx: any;
    async function init() {
      const { gsap } = await import('gsap');
      ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
        tl.fromTo('.proj-badge', { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 })
          .fromTo('.proj-line', { y: '100%' }, { y: '0%', duration: 1, stagger: 0.15, ease: 'power3.inOut' }, '-=0.2')
          .fromTo('.proj-sub', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, '-=0.4')
          .fromTo('.proj-cta', { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, '-=0.3');
      }, heroRef.current!);
    }
    init();
    return () => ctx?.revert();
  }, []);

  // Bento grid layout: 5 items
  const gridAreas = [
    '1 / 1 / 3 / 2',   // GroundControl — tall left
    '1 / 2 / 2 / 4',   // Akan Speech Lab — wide top
    '2 / 2 / 4 / 3',   // Convoy — tall middle
    '3 / 1 / 4 / 2',   // AI Build Tools — bottom left
    '2 / 3 / 4 / 4',   // HealthWallet — tall right
  ];

  return (
    <div style={{ backgroundColor: 'var(--bg)', minHeight: '100vh' }}>
      {/* HERO */}
      <section
        ref={heroRef}
        className="relative overflow-hidden"
        style={{ paddingTop: 'clamp(100px, 14vw, 180px)', paddingBottom: 'clamp(50px, 7vw, 90px)', backgroundColor: 'var(--bg)' }}
      >
        <div className="mx-auto max-w-[1200px] px-5 md:px-10">
          <div className="proj-badge mb-5 flex items-center gap-3">
            <span className="inline-block" style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: 'var(--orange)', boxShadow: '0 0 10px var(--orange-glow)' }} />
            <span className="font-sans text-[10px] uppercase tracking-[0.18em]" style={{ color: 'var(--fg-3)' }}>Projects</span>
          </div>

          <h1 className="font-sans tracking-[-0.03em]" style={{ fontSize: 'clamp(2.5rem, 7vw, 5.5rem)', fontWeight: 300, color: 'var(--fg)', lineHeight: 0.98 }}>
            <div style={{ overflow: 'hidden' }}><div className="proj-line">See the</div></div>
            <div style={{ overflow: 'hidden' }}><div className="proj-line" style={{ color: 'var(--orange)' }}>work<span style={{ color: 'var(--mauve)' }}>.</span></div></div>
          </h1>

          <p className="proj-sub mt-5 font-sans leading-relaxed" style={{ fontSize: 'clamp(0.95rem, 1.4vw, 1.15rem)', fontWeight: 400, color: 'var(--fg-2)', maxWidth: '560px' }}>
            Production systems, deployed and maintained.
          </p>

          <div className="proj-cta mt-6 flex flex-wrap gap-3">
            <a href="https://github.com/teckedd-code2save" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-sans text-sm transition-all duration-200 hover:-translate-y-0.5"
              style={{ border: '1px solid rgba(255,85,0,0.5)', padding: '9px 20px', color: 'var(--fg)', fontWeight: 400, backgroundColor: 'rgba(255,85,0,0.06)' }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,85,0,0.14)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,85,0,0.06)'; }}
            >
              View all on GitHub <span style={{ color: 'var(--orange)' }}>→</span>
            </a>
          </div>
        </div>
      </section>

      {/* BENTO GRID */}
      <section style={{ padding: '0 0 clamp(60px, 8vw, 100px)', backgroundColor: 'var(--bg)' }}>
        <div className="mx-auto max-w-[1200px] px-5 md:px-10">
          <div
            className="grid gap-3 md:gap-4"
            style={{
              gridTemplateColumns: 'repeat(3, 1fr)',
              gridAutoRows: 'minmax(180px, auto)',
            }}
          >
            {projects.map((project, i) => (
              <div key={project.id} style={{ gridArea: gridAreas[i] }}>
                <ProjectCard project={project} index={i} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
