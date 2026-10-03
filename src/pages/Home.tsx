import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { moreProjects, spotlightProjects } from '@/components/projects/projectData';
import { MoreWorkCard, SpotlightCard } from '@/components/projects/WorkShowcase';
import { ProjectNavigator } from '@/components/projects/ProjectStories';
import CinematicHero from '@/components/workstation/CinematicHero';
import './PortfolioSections.css';

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

        <section className="work-section page-shell home-reading" aria-labelledby="inside-work-title">
          <div className="work-section-heading"><div><p className="eyebrow">03 / Behind the products</p><h2 id="inside-work-title">Follow the thinking.</h2></div><p>The experiments, failures, and decisions that shaped the work.</p></div>
          <div className="home-reading-links"><Link to="/research"><span>Research / Twi & language AI</span><strong>What does it take to understand the way we speak?</strong><span>Findings, model cards, and the data behind them <ArrowRight size={17} aria-hidden="true" /></span></Link><Link to="/articles"><span>Writing / Engineering notes</span><strong>What changed when the build met the real world?</strong><span>Read the decisions. Open the working result. <ArrowRight size={17} aria-hidden="true" /></span></Link></div>
        </section>
        <section className="work-section page-shell work-about" aria-labelledby="work-together-title">
          <div><p className="eyebrow">04 / Edward Twumasi · Accra</p><h2 id="work-together-title">What needs <br />your attention next?</h2></div>
          <div><p>A product to ship, an agent to connect, or a model to evaluate. I bring the backend, product, and operational work together.</p><Link className="button-primary" to="/contact">Start a conversation <ArrowRight size={16} aria-hidden="true" /></Link><div className="work-about-links"><Link to="/fit">Working together</Link><Link to="/help">Need help with a smaller task?</Link></div></div>
        </section>
      </div>
    </div>
  );
}
