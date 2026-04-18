import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

  const handleOpenDetail = (project: Project) => {
    setSelectedProject(project);
  };

  const handleCloseDetail = () => {
    setSelectedProject(null);
  };

  return (
    <div className="min-h-[100dvh]" style={{ backgroundColor: 'var(--bg)' }}>
      {/* ========== Section 1: Page Header ========== */}
      <section
        className="relative"
        style={{
          paddingTop: '160px',
          paddingBottom: '80px',
          backgroundColor: 'var(--bg)',
        }}
      >
        <div className="mx-auto max-w-[1200px] px-5 md:px-10">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              ease: [0.0, 0, 0.2, 1] as [number, number, number, number],
            }}
            className="mb-8"
          >
            <span
              className="font-mono text-[10px] uppercase"
              style={{ color: '#555', letterSpacing: '0.08em' }}
            >
              edward twumasi / projects
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              ease: [0.0, 0, 0.2, 1] as [number, number, number, number],
            }}
            className="font-mono font-bold"
            style={{
              fontSize: 'clamp(40px, 6vw, 80px)',
              color: 'var(--fg)',
              letterSpacing: '-0.03em',
            }}
          >
            Selected Work
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.15,
              ease: [0.0, 0, 0.2, 1] as [number, number, number, number],
            }}
            className="mt-3 text-[15px]"
            style={{
              color: 'var(--fg-3)',
              maxWidth: '560px',
            }}
          >
            Systems, tools, and protocols — built for production, documented for clarity.
          </motion.p>

          {/* Filter Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.3,
              ease: [0.0, 0, 0.2, 1] as [number, number, number, number],
            }}
            className="mt-9"
          >
            <div className="flex flex-wrap gap-2">
              {filterCategories.map((cat, i) => (
                <motion.button
                  key={cat.value}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.3 + i * 0.05,
                    ease: [0.0, 0, 0.2, 1] as [number, number, number, number],
                  }}
                  onClick={() => setActiveFilter(cat.value)}
                  className="relative cursor-pointer font-mono text-[11px] transition-none"
                  style={{
                    padding: '8px 16px',
                    border: '1px solid',
                    borderColor: activeFilter === cat.value ? 'var(--accent)' : 'var(--border)',
                    backgroundColor: activeFilter === cat.value ? 'var(--accent)' : 'transparent',
                    color: activeFilter === cat.value ? '#f5f5f5' : 'var(--fg-3)',
                  }}
                >
                  {cat.label}
                </motion.button>
              ))}
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
        style={{
          padding: '80px 0',
          backgroundColor: 'var(--bg-1)',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-8% 0px' }}
          transition={{
            duration: 0.7,
            ease: [0.0, 0, 0.2, 1] as [number, number, number, number],
          }}
          className="mx-auto max-w-[1200px] px-5 text-center md:px-10"
        >
          <h2
            className="font-mono text-2xl font-medium"
            style={{ color: 'var(--fg)' }}
          >
            Have a project in mind?
          </h2>
          <p
            className="mt-2 text-[14px]"
            style={{ color: 'var(--fg-3)' }}
          >
            I'm open to backend engineering, distributed systems, and AI tooling work.
          </p>
          <Link
            to="/contact"
            className="mt-6 inline-block font-mono text-[12px] transition-all duration-200"
            style={{
              border: '1px solid var(--border-2)',
              padding: '10px 24px',
              color: 'var(--fg-2)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--accent)';
              e.currentTarget.style.color = 'var(--fg)';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 0 20px var(--accent-glow-soft)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-2)';
              e.currentTarget.style.color = 'var(--fg-2)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            get in touch &rarr;
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
