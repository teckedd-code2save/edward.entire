import { useState } from 'react';
import { motion } from 'framer-motion';
import { filterCategories, projects, type ProjectCategory } from '@/components/projects/projectData';

export default function Projects() {
  const [filter, setFilter] = useState<ProjectCategory>('all');
  const visible = filter === 'all' ? projects : projects.filter((project) => project.category === filter);

  return (
    <div>
      <header className="page-hero">
        <motion.div className="page-shell" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .75, ease: [0.16, 1, 0.3, 1] }}>
          <p className="eyebrow">Work index · 2024—2026</p>
          <h1 className="display">Selected<br /><span style={{ color: 'var(--blue)' }}>systems.</span></h1>
          <p className="lede">Products, research tools, and infrastructure built to move from a strong idea to dependable use.</p>
        </motion.div>
      </header>

      <section className="editorial-section">
        <div className="page-shell">
          <div className="filter-bar" role="group" aria-label="Filter projects">
            {filterCategories.map((category) => (
              <button
                key={category.value}
                type="button"
                className={`filter-button${filter === category.value ? ' active' : ''}`}
                onClick={() => setFilter(category.value)}
              >
                {category.label}
              </button>
            ))}
          </div>

          <motion.div className="work-grid" layout>
            {visible.map((project) => (
              <motion.article className="work-card" key={project.id} layout initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
                <div className="work-card-top"><span>{project.number}</span><span>{project.tag}</span></div>
                <h2>{project.title}</h2>
                <p>{project.description}</p>
                <div className="tag-row">{project.stack.map((item) => <span className="tiny-tag" key={item}>{item}</span>)}</div>
                <div className="work-card-links">
                  {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noreferrer">Live product ↗</a>}
                  {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noreferrer">Source ↗</a>}
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="editorial-section dark-section">
        <div className="page-shell section-head" style={{ marginBottom: 0 }}>
          <div><p className="eyebrow">The common thread</p><h2 className="section-title">Less friction.<br /><span style={{ color: 'var(--acid)' }}>More agency.</span></h2></div>
          <p className="lede">Whether the subject is deployment, focus, care, or language, each system tries to make a difficult capability understandable and usable.</p>
        </div>
      </section>
    </div>
  );
}
