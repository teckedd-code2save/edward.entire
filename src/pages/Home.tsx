import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { moreProjects, spotlightProjects } from '@/components/projects/projectData';
import { MoreWorkCard, SpotlightCard } from '@/components/projects/WorkShowcase';
import { ProjectNavigator } from '@/components/projects/ProjectStories';
import CinematicHero from '@/components/workstation/CinematicHero';

export default function Home() {
  return (
    <div>
      <CinematicHero />
      <div className="work-showcase">
        <section id="selected-work" className="work-section page-shell" aria-labelledby="selected-work-title" tabIndex={-1}>
          <div className="work-section-heading">
            <div><p className="eyebrow">01 / In the spotlight</p><h2 id="selected-work-title">Selected work.</h2></div>
            <p>Follow a release. Explore a plan. Run a rule. There’s a story behind each of these.</p>
          </div>
          <ProjectNavigator />
          <div className="spotlight-grid">{spotlightProjects.map((project, index) => <SpotlightCard key={project.id} project={project} index={index} />)}</div>
        </section>

        <section className="work-section work-more-section" aria-labelledby="more-work-title">
          <div className="page-shell">
            <div className="work-section-heading"><div><p className="eyebrow">02 / Still exploring</p><h2 id="more-work-title">More projects.</h2></div><p>Room planning, on-device AI, family care, and the tools in between.</p></div>
            <div className="more-work-grid">{moreProjects.map(project => <MoreWorkCard key={project.id} project={project} />)}</div>
            <Link className="work-link work-index-link" to="/projects">Browse all ten projects <ArrowRight size={16} aria-hidden="true" /></Link>
          </div>
        </section>

        <section className="work-section page-shell work-about" aria-labelledby="work-together-title">
          <div><p className="eyebrow">03 / Edward Twumasi · Accra</p><h2 id="work-together-title">From an idea<br />to something useful.</h2></div>
          <div><p>I build products, backend systems, and AI tools—and the infrastructure that keeps them running.</p><Link className="button-primary" to="/contact">Let’s talk <ArrowRight size={16} aria-hidden="true" /></Link><div className="work-about-links"><Link to="/fit">Working together</Link><Link to="/help">Need help with a smaller task?</Link></div></div>
        </section>
      </div>
    </div>
  );
}
