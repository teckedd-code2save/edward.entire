import { useState, useMemo, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { projects, filterCategories } from '@/components/projects/projectData';
import type { Project, ProjectCategory } from '@/components/projects/projectData';
import ProjectCard from '@/components/projects/ProjectCard';
import ProjectDetailPanel from '@/components/projects/ProjectDetailPanel';

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') return projects;
    return projects.filter((p) => p.category === activeFilter);
  }, [activeFilter]);

  // GSAP hero animation
  const heroRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!heroRef.current) return;
    let ctx: any;
    async function init() {
      const { gsap } = await import('gsap');
      ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
        tl.fromTo('.proj-hero-badge', { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 })
          .fromTo('.proj-hero-line', { y: '100%' }, { y: '0%', duration: 1, stagger: 0.15, ease: 'power3.inOut' }, '-=0.2')
          .fromTo('.proj-hero-sub', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, '-=0.4')
          .fromTo('.proj-hero-cta', { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, '-=0.3')
          .fromTo('.proj-filter', { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, '-=0.2');
      }, heroRef.current!);
    }
    init();
    return () => ctx?.revert();
  }, []);

  return (
    <div className="min-h-[100dvh]" style={{ backgroundColor: 'var(--bg)' }}>
      {/* ═══════════ HERO ═══════════ */}
      <section
        ref={heroRef}
        className="relative overflow-hidden"
        style={{
          paddingTop: 'clamp(120px, 16vw, 200px)',
          paddingBottom: 'clamp(60px, 8vw, 100px)',
          backgroundColor: 'var(--bg-1)',
        }}
      >
        {/* Ambient blobs */}
        <div
          className="pointer-events-none absolute blob-drift"
          style={{
            top: '-12%', left: '-10%',
            width: 'min(640px, 80vw)', height: 'min(640px, 80vw)',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,85,0,0.18), rgba(255,85,0,0.04) 40%, transparent 65%)',
            filter: 'blur(40px)',
          }}
        />
        <div
          className="pointer-events-none absolute blob-drift"
          style={{
            top: '15%', right: '-15%',
            width: 'min(620px, 80vw)', height: 'min(620px, 80vw)',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(199,125,255,0.14), rgba(199,125,255,0.03) 40%, transparent 65%)',
            filter: 'blur(48px)',
            animationDelay: '-7s',
          }}
        />
        <div className="noise-bg" style={{ opacity: 0.04 }} />

        <div className="relative z-10 mx-auto max-w-[1200px] px-5 md:px-10">
          {/* Badge */}
          <div className="proj-hero-badge mb-6 flex items-center gap-3">
            <span
              className="orb-pulse inline-block"
              style={{
                width: 6, height: 6, borderRadius: '50%',
                backgroundColor: 'var(--orange)',
                boxShadow: '0 0 10px var(--orange-glow)',
              }}
            />
            <span className="font-sans text-[10px] uppercase tracking-[0.22em]" style={{ color: 'var(--fg-2)' }}>
              serendepify <span style={{ color: 'var(--fg-4)' }}>/</span> projects
            </span>
            <span
              className="h-px w-24"
              style={{ background: 'linear-gradient(90deg, rgba(255,85,0,0.5), rgba(199,125,255,0.25), transparent)' }}
            />
          </div>

          {/* Headline — split text reveal containers */}
          <h1
            className="font-sans tracking-[-0.03em]"
            style={{
              fontSize: 'clamp(3rem, 8vw, 7rem)',
              fontWeight: 300,
              color: 'var(--fg)',
              lineHeight: 0.98,
            }}
          >
            <div style={{ overflow: 'hidden' }}>
              <div className="proj-hero-line">See the</div>
            </div>
            <div style={{ overflow: 'hidden' }}>
              <div className="proj-hero-line" style={{ color: 'var(--orange)' }}>
                work<span style={{ color: 'var(--mauve)' }}>.</span>
              </div>
            </div>
          </h1>

          {/* Subtext */}
          <p
            className="proj-hero-sub mt-7 font-sans leading-relaxed"
            style={{
              fontSize: 'clamp(1rem, 1.6vw, 1.2rem)',
              fontWeight: 400,
              color: 'var(--fg-2)',
              maxWidth: '620px',
            }}
          >
            Production systems, agent runtimes, and developer tooling — built, deployed, and maintained.
            Each project ships with documentation, live URLs, and source.
          </p>

          {/* CTA */}
          <div className="proj-hero-cta mt-8 flex flex-wrap gap-3">
            <a
              href="https://github.com/teckedd-code2save"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-sans text-sm transition-all duration-200 hover:-translate-y-0.5"
              style={{
                border: '1px solid var(--orange)',
                padding: '10px 22px',
                color: 'var(--fg)',
                fontWeight: 400,
                backgroundColor: 'rgba(255,85,0,0.08)',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,85,0,0.16)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,85,0,0.08)'; }}
            >
              GitHub <span style={{ color: 'var(--orange)' }}>→</span>
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 font-sans text-sm transition-all duration-200 hover:-translate-y-0.5"
              style={{
                border: '1px solid var(--border-2)',
                padding: '10px 22px',
                color: 'var(--fg-2)',
                fontWeight: 400,
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--orange)'; e.currentTarget.style.color = 'var(--fg)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-2)'; e.currentTarget.style.color = 'var(--fg-2)'; }}
            >
              Work with me →
            </Link>
          </div>

          {/* Filter tabs */}
          <div className="proj-filter mt-12">
            <div className="flex flex-wrap gap-2">
              {filterCategories.map((cat) => {
                const active = activeFilter === cat.value;
                return (
                  <button
                    key={cat.value}
                    onClick={() => setActiveFilter(cat.value)}
                    className="font-sans text-[11px] uppercase tracking-widest transition-all duration-200"
                    style={{
                      padding: '8px 16px',
                      border: '1px solid',
                      borderColor: active ? 'var(--orange)' : 'var(--border-2)',
                      backgroundColor: active ? 'rgba(255,85,0,0.10)' : 'transparent',
                      color: active ? 'var(--orange)' : 'var(--fg-3)',
                      cursor: 'pointer',
                    }}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ PROJECT GALLERY ═══════════ */}
      <section style={{ paddingTop: 0, paddingBottom: '80px', backgroundColor: 'var(--bg)' }}>
        <div className="mx-auto max-w-[1200px] px-5 md:px-10">
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                onOpenDetail={setSelectedProject}
              />
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="py-20 text-center">
              <p className="font-sans text-sm" style={{ color: 'var(--fg-3)', fontWeight: 400 }}>
                No projects in this category.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ═══════════ CTA BANNER ═══════════ */}
      <section
        className="relative overflow-hidden"
        style={{ padding: 'clamp(80px, 10vw, 140px) 0', backgroundColor: 'var(--bg-1)' }}
      >
        <div
          className="pointer-events-none absolute"
          style={{
            top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
            width: 'min(640px, 80vw)', height: 'min(640px, 80vw)',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,85,0,0.10), rgba(199,125,255,0.06) 40%, transparent 65%)',
            filter: 'blur(48px)',
          }}
        />
        <div className="relative z-10 mx-auto max-w-[680px] px-5 text-center md:px-10">
          <h2
            className="font-sans tracking-[-0.02em]"
            style={{
              fontSize: 'clamp(2rem, 4.5vw, 3.4rem)',
              fontWeight: 300,
              color: 'var(--fg)',
              lineHeight: 1.05,
            }}
          >
            Got a <span style={{ color: 'var(--orange)' }}>systems</span> problem?
          </h2>
          <p
            className="mx-auto mt-5 max-w-[480px] font-sans text-[15px] leading-relaxed"
            style={{ color: 'var(--fg-2)', fontWeight: 400 }}
          >
            Backend architecture, agent runtimes, deployment pipelines, dev tooling.
            Pull me in early — before the tech debt piles up.
          </p>
          <Link
            to="/contact"
            className="mt-8 inline-flex items-center gap-2 font-sans text-sm transition-all duration-200 hover:-translate-y-0.5"
            style={{
              border: '1px solid rgba(255,85,0,0.5)',
              padding: '12px 28px',
              color: 'var(--fg)',
              fontWeight: 400,
              backgroundColor: 'rgba(255,85,0,0.06)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--orange)';
              e.currentTarget.style.backgroundColor = 'rgba(255,85,0,0.14)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,85,0,0.5)';
              e.currentTarget.style.backgroundColor = 'rgba(255,85,0,0.06)';
            }}
          >
            Start the conversation <span style={{ color: 'var(--orange)' }}>→</span>
          </Link>
        </div>
      </section>

      {/* ═══════════ DETAIL PANEL ═══════════ */}
      <ProjectDetailPanel project={selectedProject} onClose={() => setSelectedProject(null)} />
    </div>
  );
}
