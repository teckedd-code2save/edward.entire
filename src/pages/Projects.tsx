import { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { projects, filterCategories } from '@/components/projects/projectData';
import type { Project, ProjectCategory } from '@/components/projects/projectData';
import ProjectCard from '@/components/projects/ProjectCard';
import ProjectDetailPanel from '@/components/projects/ProjectDetailPanel';

const easeEnter = [0.0, 0, 0.2, 1] as [number, number, number, number];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const headerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: headerRef,
    offset: ['start start', 'end start'],
  });
  const orbY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') return projects;
    return projects.filter((p) => p.category === activeFilter);
  }, [activeFilter]);

  const handleOpenDetail = (project: Project) => {
    setSelectedProject(project);
  };

  const handleCloseDetail = () => {
    setSelectedProject(null);
  };

  return (
    <div className="min-h-[100dvh]" style={{ backgroundColor: 'var(--bg)' }}>
      {/* ========== Section 1: Cinematic Page Header ========== */}
      <section
        ref={headerRef}
        className="relative overflow-hidden"
        style={{
          paddingTop: '180px',
          paddingBottom: '90px',
          backgroundColor: 'var(--bg)',
        }}
      >
        <motion.div
          aria-hidden
          className="blob-drift pointer-events-none absolute"
          style={{
            y: orbY,
            top: '-12%',
            left: '-10%',
            width: 'min(640px, 80vw)',
            height: 'min(640px, 80vw)',
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(255,85,0,0.26), rgba(255,85,0,0.06) 40%, transparent 65%)',
            filter: 'blur(40px)',
          }}
        />
        <motion.div
          aria-hidden
          className="blob-drift pointer-events-none absolute"
          style={{
            y: orbY,
            top: '15%',
            right: '-15%',
            width: 'min(620px, 80vw)',
            height: 'min(620px, 80vw)',
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(199,125,255,0.22), rgba(199,125,255,0.05) 40%, transparent 65%)',
            filter: 'blur(48px)',
            animationDelay: '-7s',
          }}
        />
        <div className="noise-bg" style={{ opacity: 0.04 }} />

        <div className="relative z-10 mx-auto max-w-[1200px] px-5 md:px-10">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: easeEnter }}
            className="mb-6 flex items-center gap-3"
          >
            <span
              className="orb-pulse inline-block"
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                backgroundColor: 'var(--orange)',
                boxShadow: '0 0 10px var(--orange-glow)',
              }}
            />
            <span
              className="font-mono text-[10px] uppercase tracking-[0.22em]"
              style={{ color: 'var(--fg-2)' }}
            >
              edward twumasi <span style={{ color: 'var(--fg-4)' }}>/</span> projects
            </span>
            <span
              className="h-px w-24"
              style={{
                background:
                  'linear-gradient(90deg, rgba(255,85,0,0.5), rgba(199,125,255,0.25), transparent)',
              }}
            />
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: easeEnter }}
            className="font-sans font-bold tracking-[-0.03em]"
            style={{
              fontSize: 'clamp(3rem, 8vw, 7rem)',
              color: 'var(--fg)',
              lineHeight: 0.98,
            }}
          >
            Things&nbsp;
            <span style={{ color: 'var(--orange)' }}>built</span>
            <span style={{ color: 'var(--mauve)' }}>.</span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: easeEnter }}
            className="mt-7 font-sans font-light leading-[1.45]"
            style={{
              fontSize: 'clamp(1.05rem, 1.8vw, 1.35rem)',
              color: 'var(--fg-2)',
              maxWidth: '620px',
            }}
          >
            Production systems, agents, and tooling. Documented, deployed, maintained.
          </motion.p>

          {/* Filter Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: easeEnter }}
            className="mt-10"
          >
            <div className="flex flex-wrap gap-2">
              {filterCategories.map((cat, i) => {
                const active = activeFilter === cat.value;
                return (
                  <motion.button
                    key={cat.value}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.4 + i * 0.04,
                      ease: easeEnter,
                    }}
                    onClick={() => setActiveFilter(cat.value)}
                    className="relative cursor-pointer font-mono text-[11px] uppercase tracking-widest transition-all duration-200"
                    style={{
                      padding: '8px 16px',
                      border: '1px solid',
                      borderColor: active
                        ? 'var(--orange)'
                        : 'var(--border-2)',
                      backgroundColor: active
                        ? 'rgba(255,85,0,0.10)'
                        : 'transparent',
                      color: active ? 'var(--orange)' : 'var(--fg-3)',
                    }}
                  >
                    {cat.label}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========== Section 2: Project Gallery ========== */}
      <section
        style={{
          paddingTop: 0,
          paddingBottom: '80px',
          backgroundColor: 'var(--bg)',
        }}
      >
        <div className="mx-auto max-w-[1200px] px-5 md:px-10">
          <motion.div
            layout
            className="grid gap-6 sm:grid-cols-1 md:grid-cols-2"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  onOpenDetail={handleOpenDetail}
                />
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty state */}
          <AnimatePresence>
            {filteredProjects.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-20 text-center"
              >
                <p className="font-mono text-sm" style={{ color: 'var(--fg-3)' }}>
                  No projects in this category.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ========== Section 3: Detail Panel ========== */}
      <ProjectDetailPanel
        project={selectedProject}
        onClose={handleCloseDetail}
      />

      {/* ========== Section 4: CTA Banner ========== */}
      <section
        className="relative overflow-hidden"
        style={{
          padding: '120px 0',
          backgroundColor: 'var(--bg-1)',
        }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute"
          style={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 'min(640px, 80vw)',
            height: 'min(640px, 80vw)',
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(255,85,0,0.14), rgba(199,125,255,0.10) 40%, transparent 65%)',
            filter: 'blur(48px)',
          }}
        />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-8% 0px' }}
          transition={{ duration: 0.7, ease: easeEnter }}
          className="relative z-10 mx-auto max-w-[680px] px-5 text-center md:px-10"
        >
          <h2
            className="font-sans font-bold tracking-[-0.025em]"
            style={{
              fontSize: 'clamp(2rem, 4.5vw, 3.4rem)',
              color: 'var(--fg)',
              lineHeight: 1.05,
            }}
          >
            Got a&nbsp;<span style={{ color: 'var(--orange)' }}>systems</span> problem?
          </h2>
          <p
            className="mx-auto mt-5 max-w-[480px] text-[15px] leading-[1.65]"
            style={{ color: 'var(--fg-2)' }}
          >
            Backend, agents, deployment, dev tooling. Pull me in early.
          </p>
          <Link
            to="/contact"
            className="mt-8 inline-block font-mono text-[12px] transition-all duration-200"
            style={{
              border: '1px solid rgba(255,85,0,0.5)',
              padding: '12px 26px',
              color: 'var(--fg)',
              backgroundColor: 'rgba(255,85,0,0.05)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--orange)';
              e.currentTarget.style.backgroundColor = 'rgba(255,85,0,0.12)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,85,0,0.5)';
              e.currentTarget.style.backgroundColor = 'rgba(255,85,0,0.05)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            start the conversation &rarr;
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
