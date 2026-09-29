import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { filterCategories, moreProjects, spotlightProjects, type ProjectCategory } from '@/components/projects/projectData';
import { MoreWorkCard, SpotlightCard } from '@/components/projects/WorkShowcase';

export default function Projects() {
  const [filter, setFilter] = useState<ProjectCategory>('all');
  const visible = filter === 'all' ? moreProjects : moreProjects.filter(project => project.category === filter);

  return <div className="work-showcase">
    <header className="page-shell work-page-heading">
      <p className="eyebrow">The work / 2024—2026</p>
      <h1>Built to be<br /><span>explored.</span></h1>
      <div className="work-page-intro"><p>Five projects in the spotlight. Five more ideas in motion.</p><Link className="work-link" to="/contact">Start a conversation <ArrowRight size={16} aria-hidden="true" /></Link></div>
    </header>
    <section className="page-shell work-section work-section--first" aria-labelledby="featured-work">
      <div className="work-section-heading"><h2 id="featured-work">In the spotlight.</h2><p>See what it does, what I built, and the evidence behind it.</p></div>
      <div className="spotlight-grid">{spotlightProjects.map((project, index) => <SpotlightCard key={project.id} project={project} index={index} />)}</div>
    </section>
    <section className="work-section work-more-section" aria-labelledby="project-archive">
      <div className="page-shell">
        <div className="work-section-heading"><div><p className="eyebrow">The wider collection</p><h2 id="project-archive">More projects.</h2></div><p>Useful tools, personal experiments, and work in progress.</p></div>
        <div className="work-filters" role="group" aria-label="Filter more projects">{filterCategories.map(category => <button key={category.value} type="button" aria-pressed={filter === category.value} onClick={() => setFilter(category.value)}>{category.label}</button>)}</div>
        <p className="sr-only" role="status" aria-live="polite">Showing {visible.length} {visible.length === 1 ? 'project' : 'projects'}.</p>
        <div className="more-work-grid">{visible.map(project => <MoreWorkCard key={project.id} project={project} />)}</div>
      </div>
    </section>
  </div>;
}
