import { Link } from 'react-router-dom';
import { projects } from '@/components/projects/projectData';
import CinematicHero from '@/components/workstation/CinematicHero';
import QuickHelp from '@/components/QuickHelp';

const featuredIds = ['groundcontrol', 'rentaweekend', 'ghana-health-ai'];
const featured = featuredIds.flatMap((id) => {
  const project = projects.find((item) => item.id === id);
  return project ? [project] : [];
});

export default function Home() {
  return (
    <div>
      <CinematicHero />

      <section className="editorial-section" style={{ background: 'var(--paper-2)' }}>
        <div className="page-shell">
          <div className="section-head">
            <div><p className="eyebrow">01 · Flagship work</p><h2 className="section-title">Three systems.<br />One through-line.</h2></div>
            <p className="lede">Distributed systems, agent infrastructure, and ML research treated as one engineering practice: state, trust, failure, evidence, and operation.</p>
          </div>
          <div className="home-work-list">
            {featured.map((project, index) => {
              const href = project.liveUrl || project.githubUrl || '#';
              return <a href={href} target="_blank" rel="noreferrer" className="home-work-row" key={project.id}><span>0{index + 1}</span><div><p>{project.tag}</p><h3>{project.title}</h3></div><p>{project.description}</p><strong>View ↗</strong></a>;
            })}
          </div>
          <div className="home-section-action"><Link className="button-ghost" to="/projects">Explore the full work index →</Link></div>
        </div>
      </section>

      <section className="editorial-section delivery-section">
        <div className="page-shell delivery-grid">
          <div className="delivery-copy">
            <p className="eyebrow">02 · Agent infrastructure</p>
            <h2 className="section-title">Give agents capability.<br />Not unlimited authority.</h2>
            <p className="lede">GroundControl turns deployment operations into constrained capabilities. ChatGPT can receive only an approved deployment, trigger a typed redeploy after a merge, follow the durable operation, and return health and public-reachability evidence without VPS shell access or broad server control. Operators still have a stateful host terminal when live troubleshooting requires it.</p>
            <div className="hero-actions"><a className="button-primary" href="https://trygroundcontrol.serendepify.com/" target="_blank" rel="noreferrer">Try GroundControl ↗</a><a className="button-ghost" href="https://github.com/teckedd-code2save/groundcontrol" target="_blank" rel="noreferrer">Inspect the source ↗</a></div>
          </div>
          <div className="delivery-flow" aria-label="Agent-enabled VPS delivery pipeline">
            {[
              ['01', 'Grant exactly what is needed', 'OAuth consent is scoped to enrolled deployments and capabilities. ChatGPT receives only the deployment and actions the operator approved, never a permanent SSH credential or unrestricted production shell.'],
              ['02', 'Inspect with evidence', 'Deployments, health, logs, configuration presence, repository identity, and connector capabilities are queried through bounded interfaces with secret redaction.'],
              ['03', 'Mutate durably', 'After a merge, an approved client can trigger a typed redeploy, follow the durable operation ID through completion, and reconnect without losing state or replaying the deployment.'],
              ['04', 'Verify the customer path', 'The control plane correlates deployment identity, proxy/upstream boundaries, runtime state, and external reachability before model reasoning or recovery is allowed to claim success.'],
            ].map(([number, title, body]) => <article key={number}><b>{number}</b><div><h3>{title}</h3><p>{body}</p></div></article>)}
          </div>
        </div>
      </section>

      <section className="home-research-band">
        <div className="page-shell home-research-grid">
          <div><p className="eyebrow">03 · ML systems · September 2026</p><h2 className="section-title">From a Twi model<br /><span>to a reproducible system.</span></h2></div>
          <div><p className="lede">Ghana Health AI is becoming the ML-systems capstone behind my next phase of work: corpus source history, Arrow/Parquet data planes, reproducible adaptation, GPU profiling, distributed training, checkpoint/recovery, evaluation, and serving. Model promotion still depends on semantic evidence, not a completed training run.</p><Link className="lab-button" to="/research">Enter the research lab ↗</Link></div>
        </div>
      </section>

      <QuickHelp />

      <section className="editorial-section">
        <div className="page-shell section-head" style={{ marginBottom: 0 }}>
          <div><p className="eyebrow">04 · Work together</p><h2 className="section-title">Building AI that<br /><span style={{ color: 'var(--blue)' }}>has to work?</span></h2></div>
          <div><p className="lede">I’m most useful where backend depth, model behavior, and production ownership meet.</p><div className="hero-actions"><Link className="button-primary" to="/contact">Start a conversation ↗</Link><Link className="button-ghost" to="/fit">Review role fit</Link></div></div>
        </div>
      </section>
    </div>
  );
}
