import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { moreProjects, spotlightProjects } from '@/components/projects/projectData';
import { EvidenceLink, WorkVisual } from '@/components/projects/WorkShowcase';
import { workPresentation } from '@/components/projects/workPresentation';
import BnlMiniEditor from '@/components/projects/BnlMiniEditor';

const allWork = [...spotlightProjects, ...moreProjects];

export default function ProjectCaseStudy() {
  const { projectId } = useParams();
  const project = allWork.find(item => item.id === projectId);
  if (!project) return <div className="work-showcase"><section className="page-shell work-page-heading"><p className="eyebrow">Project not found</p><h1>Explore the work.</h1><Link className="work-link" to="/projects"><ArrowLeft size={16} aria-hidden="true" /> Back to all projects</Link></section></div>;

  const presentation = workPresentation[project.id];
  const next = allWork[(allWork.indexOf(project) + 1) % allWork.length];

  return <div className="work-showcase">
    <header className="page-shell work-page-heading work-case-heading">
      <Link className="work-link work-link--quiet" to="/projects"><ArrowLeft size={16} aria-hidden="true" /> All projects</Link>
      <p className="eyebrow">{project.tag} / {presentation.status}</p>
      <h1>{project.title}</h1>
      <p className="work-case-summary">{presentation.summary}</p>
      <div className="work-actions">
        {project.liveUrl && <EvidenceLink href={project.liveUrl} className="button-primary">{project.id === 'backend-as-natural-language' ? 'Try the playground' : 'Explore the product'}</EvidenceLink>}
        {project.githubUrl && <EvidenceLink href={project.githubUrl}>Inspect the source</EvidenceLink>}
      </div>
    </header>
    <div className="page-shell work-case-visual">{project.id === 'backend-as-natural-language' ? <BnlMiniEditor /> : <WorkVisual project={project} />}</div>
    <section className="page-shell work-section work-case-story" aria-labelledby="contribution-title">
      <div><p className="eyebrow">01 / How it came together</p><h2 id="contribution-title">Inside the build.</h2><p className="work-case-contribution">{presentation.contribution}</p>{project.stack.length > 0 && <ul className="work-stack" aria-label="Tools and technologies">{project.stack.map(item => <li key={item}>{item}</li>)}</ul>}</div>
      <div><p className="work-case-description">{project.description}</p><ul className="work-highlights">{project.highlights.map(highlight => <li key={highlight}>{highlight}</li>)}</ul></div>
    </section>
    <section className="work-section work-evidence-section" aria-labelledby="evidence-title"><div className="page-shell work-case-story">
      <div><p className="eyebrow">02 / Open the evidence</p><h2 id="evidence-title">See it for yourself.</h2></div>
      <div><p className="work-case-description">{presentation.proof}</p><EvidenceLink href={presentation.evidence.href}>{presentation.evidence.label}</EvidenceLink>
        {project.id === 'ghana-health-ai' && <p className="work-evidence-note">Research preview. Evaluation figures are from my own tests, with datasets and limitations documented in the research section.</p>}
        {project.id === 'haven' && <p className="work-evidence-note">In development. Room placement is schematic; confirm clearances and delivery access before buying.</p>}
        {project.id === 'convoy' && <p className="work-evidence-note">The capture and walkthrough are recorded product evidence, not a live deployment status.</p>}
        <details className="work-architecture"><summary>Architecture &amp; decisions</summary><p>{project.architecture}</p></details>
      </div>
    </div></section>
    <nav className="page-shell work-case-navigation" aria-label="Continue exploring"><Link className="work-link" to="/projects"><ArrowLeft size={16} aria-hidden="true" /> All projects</Link><Link className="work-link" to={`/projects/${next.id}`}>Next: {next.title} <ArrowRight size={16} aria-hidden="true" /></Link></nav>
  </div>;
}
