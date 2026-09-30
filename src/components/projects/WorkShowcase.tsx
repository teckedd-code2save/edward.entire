import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Armchair, Compass, Cpu, Focus, HeartHandshake, Rocket } from 'lucide-react';
import type { Project } from './projectData';
import { workPresentation } from './workPresentation';
import './WorkShowcase.css';
export { ProjectStory as SpotlightCard } from './ProjectStories';

export function EvidenceLink({ href, children, className = 'work-link' }: { href: string; children: ReactNode; className?: string }) {
  // HashRouter destinations stay in this tab, including the existing BNL URL.
  const internal = href.startsWith('/');
  return internal
    ? <Link className={className} to={href.replace(/^\/#/, '')}>{children}<ArrowRight size={16} aria-hidden="true" /></Link>
    : <a className={className} href={href} target="_blank" rel="noreferrer">{children}<ArrowUpRight size={16} aria-hidden="true" /></a>;
}

export function WorkVisual({ project, compact = false }: { project: Project; compact?: boolean }) {
  const { image, steps } = workPresentation[project.id];
  const icons = { rentaweekend: Compass, haven: Armchair, 'pocket-models': Cpu, 'intent-engine': Focus, 'adwuma-pa': HeartHandshake, shipd: Rocket };
  const Icon = icons[project.id as keyof typeof icons] || Compass;
  return <figure className={`work-visual work-visual--${project.id}${compact ? ' work-visual--compact' : ''}`}>
    {image ? <>
      <div className="work-capture">
        <img src={image.src} alt={image.alt} width={image.width} height={image.height} loading="lazy" decoding="async" />
      </div>
      <figcaption>{image.caption}</figcaption>
    </> : <>
      <div className="work-flow">
        <Icon className="work-flow-icon" size={44} strokeWidth={1.2} aria-hidden="true" />
        <p className="work-flow-name">{project.title}</p>
        <ol>{steps?.map((step, index) => <li key={step}><span>{String(index + 1).padStart(2, '0')}</span>{step}</li>)}</ol>
      </div>
      <figcaption>Product flow · illustrated overview</figcaption>
    </>}
  </figure>;
}

export function MoreWorkCard({ project }: { project: Project }) {
  const presentation = workPresentation[project.id];
  return <article className="more-work-card" aria-labelledby={`more-${project.id}`}>
    <WorkVisual project={project} compact />
    <div className="more-work-copy">
      <p className="work-meta">{presentation.status}</p>
      <h3 id={`more-${project.id}`}><Link to={`/projects/${project.id}`}>{project.title}</Link></h3>
      <p>{presentation.summary}</p>
      <EvidenceLink href={project.liveUrl || presentation.evidence.href}>{project.liveUrl ? `Explore ${project.title}` : 'Explore the source'}</EvidenceLink>
    </div>
  </article>;
}
