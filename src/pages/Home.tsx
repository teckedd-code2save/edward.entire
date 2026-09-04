import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { projects } from '@/components/projects/projectData';

const featuredIds = ['ghana-health-ai', 'groundcontrol', 'convoy'];
const featured = featuredIds.flatMap((id) => {
  const project = projects.find((item) => item.id === id);
  return project ? [project] : [];
});

const evidence = [
  ['27.31%', 'Waxal test WER', 'DONDO v2 + LM · 300-sample evaluation'],
  ['7,814', 'silver corpus rows', 'research training data · not human-verified gold'],
  ['v3', 'understanding adapter', 'Qwen LoRA · published, not promoted'],
];

const enter = { duration: 0.75, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] };

export default function Home() {
  return (
    <div>
      <section className="home-hero home-hero-current">
        <motion.div className="page-shell home-hero-grid" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={enter}>
          <div className="hero-copy">
            <p className="eyebrow">Edward Twumasi · Backend + applied AI engineer</p>
            <h1 className="display">AI systems,<br /><span>built to hold up</span><br />in the real world.</h1>
            <p className="lede">I build the software around intelligent products: backend services, speech-model evaluation, GPU inference, deployment infrastructure, and the safeguards that make them usable.</p>
            <div className="hero-actions">
              <Link className="button-primary" to="/projects">See the work <span aria-hidden="true">↘</span></Link>
              <Link className="button-ghost" to="/research">Open the research lab</Link>
            </div>
          </div>

          <aside className="home-evidence" aria-label="Current evidence">
            <div className="home-evidence-head"><span>Current evidence</span><span>Accra · 2026</span></div>
            {evidence.map(([value, label, detail]) => <div className="home-evidence-row" key={label}><strong>{value}</strong><div><b>{label}</b><small>{detail}</small></div></div>)}
            <Link to="/fit">Why this work fits senior AI roles ↗</Link>
          </aside>
        </motion.div>
      </section>

      <section className="editorial-section" style={{ background: 'var(--paper-2)' }}>
        <div className="page-shell">
          <div className="section-head">
            <div><p className="eyebrow">01 · Flagship work</p><h2 className="section-title">Three systems.<br />One through-line.</h2></div>
            <p className="lede">Research, product engineering, and infrastructure treated as one delivery problem—not separate portfolios.</p>
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
            <p className="eyebrow">02 · Agent-enabled delivery</p>
            <h2 className="section-title">From repository<br />to your own VPS.</h2>
            <p className="lede">I built the deployment path my agents use when a product belongs on a Hetzner-class server rather than a managed platform. The agent reads the repository, rehearses the build, prepares only the required deployment files, and pauses at approval gates. The release pipeline then ships an immutable container and verifies the public system—not just the CI job.</p>
            <div className="hero-actions"><a className="button-primary" href="https://github.com/teckedd-code2save/convoy" target="_blank" rel="noreferrer">Inspect Convoy ↗</a><a className="button-ghost" href="https://github.com/teckedd-code2save/groundcontrol" target="_blank" rel="noreferrer">Inspect GroundControl ↗</a></div>
          </div>
          <div className="delivery-flow" aria-label="Agent-enabled VPS delivery pipeline">
            {[
              ['01', 'Inspect + rehearse', 'Convoy maps services, secrets, health paths, and platform constraints; a real build and boot must pass before deployment files are proposed.'],
              ['02', 'Build + publish', 'GitHub Actions builds with cache, tags the image by commit SHA, and publishes the immutable artifact to GHCR.'],
              ['03', 'Deploy + route', 'The VPS pulls over SSH, applies database migrations, rolls the Compose service, and routes the domain through Caddy and Cloudflare.'],
              ['04', 'Verify + recover', 'External HTTPS and readiness probes decide success. Logs remain visible, secrets stay in Infisical, and rollback selects a known image tag.'],
            ].map(([number, title, body]) => <article key={number}><b>{number}</b><div><h3>{title}</h3><p>{body}</p></div></article>)}
          </div>
        </div>
      </section>

      <section className="home-research-band">
        <div className="page-shell home-research-grid">
          <div><p className="eyebrow">03 · Research update · September 2026</p><h2 className="section-title">From recognizing speech<br /><span>to recovering meaning.</span></h2></div>
          <div><p className="lede">The latest Health AI work connects a traceable corpus, human-review tooling, Qwen LoRA training on Modal, and product-level semantic tests. Published adapters remain research candidates until they preserve meaning reliably.</p><Link className="lab-button" to="/research">Explore the latest research ↗</Link></div>
        </div>
      </section>

      <section className="editorial-section">
        <div className="page-shell section-head" style={{ marginBottom: 0 }}>
          <div><p className="eyebrow">04 · Work together</p><h2 className="section-title">Building AI that<br /><span style={{ color: 'var(--blue)' }}>has to work?</span></h2></div>
          <div><p className="lede">I’m most useful where backend depth, model behavior, and production ownership meet.</p><div className="hero-actions"><Link className="button-primary" to="/contact">Start a conversation ↗</Link><Link className="button-ghost" to="/fit">Review role fit</Link></div></div>
        </div>
      </section>
    </div>
  );
}
