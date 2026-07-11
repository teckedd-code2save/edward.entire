import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { projects } from '@/components/projects/projectData';

const stack = ['.NET 8', 'C#', 'TypeScript', 'Python', 'Kotlin', 'PostgreSQL', 'Redis', 'Kafka', 'Docker', 'LiteRT', 'Hugging Face', 'Agent systems'];

const principles = [
  {
    number: '01',
    title: 'Systems first.',
    body: 'Clear boundaries, observable behavior, and boring reliability underneath every ambitious interface.',
  },
  {
    number: '02',
    title: 'AI where useful.',
    body: 'Models earn their place by reducing friction or enabling something genuinely new—not by decorating a feature list.',
  },
  {
    number: '03',
    title: 'Ghana outward.',
    body: 'Built from the realities of Accra, designed for products and infrastructure that can travel anywhere.',
  },
];

const enter = { duration: 0.75, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] };

export default function Home() {
  return (
    <div>
      <section className="page-shell home-hero">
        <motion.div className="hero-copy" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={enter}>
          <p className="eyebrow">Lead backend engineer · AI systems builder</p>
          <h1 className="display">I build systems that<br /><span>think, ship &</span><br />stay useful.</h1>
          <p className="lede">I’m Edward Twumasi—a software engineer in Accra working across dependable backend systems, deployment tooling, on-device AI, and African-language technology.</p>
          <div className="hero-actions">
            <Link className="button-primary" to="/projects">Explore selected work <span aria-hidden="true">↘</span></Link>
            <Link className="button-ghost" to="/research">Enter the research lab</Link>
          </div>
          <p className="availability-line"><strong>Current signal:</strong> building local-first AI and infrastructure tools through Serendepify.</p>
        </motion.div>

        <motion.div className="portrait-stage" initial={{ opacity: 0, scale: .94 }} animate={{ opacity: 1, scale: 1 }} transition={{ ...enter, delay: .16 }} aria-label="Portrait of Edward Twumasi surrounded by areas of expertise">
          <div className="portrait-orbit" aria-hidden="true" />
          <div className="signal-chip one">backend systems</div>
          <div className="signal-chip two">on-device AI</div>
          <div className="signal-chip three">agent workflows</div>
          <div className="portrait-card"><img src="/profile-cutout.png" alt="Edward Twumasi" /></div>
          <span className="hero-number" aria-hidden="true">05+</span>
        </motion.div>
      </section>

      <section className="editorial-section" style={{ background: 'var(--paper-2)' }}>
        <div className="page-shell">
          <div className="section-head">
            <div><p className="eyebrow">01 · Selected systems</p><h2 className="section-title">Useful things,<br />properly built.</h2></div>
            <p className="lede">A few products where backend depth, product judgment, and AI meet real-world constraints.</p>
          </div>
          <div className="project-stories">
            {projects.slice(0, 3).map((project, index) => {
              const href = project.liveUrl || project.githubUrl || '#';
              return (
                <a key={project.id} className="project-story" href={href} target="_blank" rel="noreferrer">
                  <div className="project-copy">
                    <div>
                      <div className="project-meta"><span>{project.number} / {project.tag}</span><span>2026</span></div>
                      <h3>{project.title}</h3>
                      <p>{project.description}</p>
                    </div>
                    <span className="project-arrow">View the build <span aria-hidden="true">↗</span></span>
                  </div>
                  <div className="project-visual" aria-hidden="true">
                    <div className="project-glyph">{index === 2 ? 'GH' : project.title.charAt(0)}</div>
                    <small>{project.stack.slice(0, 3).join(' · ')}</small>
                  </div>
                </a>
              );
            })}
          </div>
          <div style={{ marginTop: 34 }}><Link className="button-ghost" to="/projects">View all seven systems →</Link></div>
        </div>
      </section>

      <section className="editorial-section dark-section">
        <div className="page-shell">
          <div className="section-head">
            <div><p className="eyebrow">02 · Operating principles</p><h2 className="section-title">Precision without<br />the theatre.</h2></div>
            <p className="lede">The goal is not clever code. It is a system people can understand, trust, operate, and extend.</p>
          </div>
          <div className="principles">
            {principles.map((principle) => (
              <article className="principle" key={principle.number}>
                <b>{principle.number}</b><h3>{principle.title}</h3><p>{principle.body}</p>
              </article>
            ))}
          </div>
          <div className="stack-cloud" aria-label="Technology stack">
            {stack.map((item) => <span className="stack-pill" key={item}>{item}</span>)}
          </div>
        </div>
      </section>

      <section className="editorial-section">
        <div className="page-shell section-head" style={{ marginBottom: 0 }}>
          <div><p className="eyebrow">03 · Next hard thing</p><h2 className="section-title">Have a system that<br /><span style={{ color: 'var(--blue)' }}>should exist?</span></h2></div>
          <div><p className="lede">I’m interested in thoughtful backend, AI, health, infrastructure, and research collaborations.</p><Link className="button-primary" to="/contact">Open a conversation ↗</Link></div>
        </div>
      </section>
    </div>
  );
}
