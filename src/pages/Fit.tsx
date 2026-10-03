import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './WorkFitStudio.css';
import './PortfolioSections.css';

const roles = [
  {
    title: 'A product that needs to ship.',
    body: 'Turn an idea into a working product, then make its deployment and day-to-day operation understandable.',
    evidence: ['GroundControl connects applications and deployment actions, then checks that an update is running.', 'RentAWeekend brings a planning request through research, comparison, and a practical next step.'],
    proof: ['Product engineering', 'Backends', 'Deployment'],
    route: '/projects/rentaweekend', routeLabel: 'Follow the RentAWeekend story',
  },
  {
    title: 'An agent that needs to act.',
    body: 'Connect an AI assistant to useful tools, with clear access and a way to inspect what happened.',
    evidence: ['GroundControl exposes MCP tools for ChatGPT and other compatible agents to inspect and update selected deployments.', 'Saved operations carry progress and verification beyond a single conversation.'],
    proof: ['MCP + OAuth', 'Tool integration', 'Operation tracking'],
    route: '/projects/groundcontrol', routeLabel: 'See how GroundControl works',
  },
  {
    title: 'AI that needs to be evaluated.',
    body: 'Connect model experiments to their data, test conditions, and behavior in a real product.',
    evidence: ['Ghana Health AI brings Twi speech and language research into a working voice and text experience.', 'Published model cards and source-linked data releases make the experiments inspectable.'],
    proof: ['Speech + language', 'Data pipelines', 'Evaluation'],
    route: '/research', routeLabel: 'Explore the research findings',
  },
];

export default function Fit() {
  const reduceMotion = useReducedMotion();
  const reveal = {
    initial: reduceMotion ? false : { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.1 },
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
  };

  return (
    <div className="work-fit-studio fit-studio">
      <header className="studio-shell fit-masthead">
        <motion.div className="fit-hero-copy" {...reveal}>
          <p className="studio-kicker">Working together / Edward Twumasi</p>
          <h1 className="studio-title fit-title">Build it. <br />Make it <span>dependable.</span></h1>
          <p className="studio-lede">I’m Edward, an engineer and independent builder in Accra. I work across backend systems, AI tools, and the infrastructure that keeps a product running. Here are three places I can help.</p>
          <div className="fit-hero-actions">
            <button
              className="studio-action"
              type="button"
              onClick={() => { const section = document.getElementById('role-evidence'); section?.focus({ preventScroll: true }); section?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' }); }}
            >
              Find the work closest to yours <span aria-hidden="true">↓</span>
            </button>
          </div>
        </motion.div>

        <motion.figure className="fit-ownership" {...reveal}>
          <svg viewBox="0 0 420 340" role="img" aria-labelledby="fit-ownership-title fit-ownership-description">
            <title id="fit-ownership-title">Evaluate, build, operate</title>
            <desc id="fit-ownership-description">Connected ownership across model and meaning evaluation, product engineering, and production operations.</desc>
            <g fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M52 68V260" opacity="0.23" />
              <path d="M52 68H370M52 164H370M52 260H370" opacity="0.13" />
              <circle cx="52" cy="68" r="17" fill="var(--studio-paper, #ebeae7)" />
              <circle cx="52" cy="164" r="17" fill="var(--studio-paper, #ebeae7)" />
              <circle cx="52" cy="260" r="17" fill="var(--studio-paper, #ebeae7)" />
              <path d="M42 68h6l4-7 4 14 4-7h3M44 157h16v14H44zM44 262l5 5 11-13" stroke="var(--studio-blue, #456eaa)" strokeWidth="1.5" />
              <path d="M379 68h10v192h-10" opacity="0.23" />
            </g>
            <g fill="currentColor" fontFamily="inherit">
              <text x="88" y="62" fontSize="23" fontWeight="500">Evaluate</text>
              <text x="88" y="86" fontSize="13" opacity="0.65">Models, data, and meaning</text>
              <text x="88" y="158" fontSize="23" fontWeight="500">Build</text>
              <text x="88" y="182" fontSize="13" opacity="0.65">APIs, product, and infrastructure</text>
              <text x="88" y="254" fontSize="23" fontWeight="500">Operate</text>
              <text x="88" y="278" fontSize="13" opacity="0.65">Deployments, monitoring, and recovery</text>
            </g>
          </svg>
          <figcaption>One connected practice, from evaluation to operations.</figcaption>
        </motion.figure>
      </header>

      <section className="studio-shell studio-section" id="role-evidence" aria-labelledby="fit-roles-title" tabIndex={-1}>
        <motion.div className="studio-section-heading" {...reveal}>
          <div>
            <p className="studio-kicker">01 / Where I can help</p>
            <h2 id="fit-roles-title">Start with the <br />problem in front of you.</h2>
          </div>
          <p className="studio-lede">From the first working version to the systems that keep it running.</p>
        </motion.div>

        <div className="fit-role-list">
          {roles.map((role, index) => (
            <motion.article className="fit-role-row" key={role.title} {...reveal}>
              <div className="fit-role-heading">
                <p className="studio-kicker">0{index + 1} / Your next step</p>
                <h3>{role.title}</h3>
                <p>{role.body}</p>
              </div>
              <div className="fit-role-evidence">
                <ul>{role.evidence.map((item) => <li key={item}>{item}</li>)}</ul>
                <p className="fit-proof-index">{role.proof.join(' · ')}</p>
                <Link className="studio-action" to={role.route}>{role.routeLabel} <span aria-hidden="true">↗</span></Link>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="fit-next-section" aria-labelledby="fit-next-title">
        <div className="studio-shell studio-section fit-working-note">
          <div><p className="studio-kicker">02 / How I work</p><h2 id="fit-next-title">Make progress visible.</h2></div>
          <div><p>Start with the outcome and constraints. Build a small working path. Test the failure cases, then leave the next person enough context to operate and extend it.</p><details className="evidence-disclosure"><summary>What I’m exploring next <span aria-hidden="true">+</span></summary><div><p>Deeper training and serving measurements, recovery behavior, and independent validation of the research. I keep these as open questions, with the published work showing what has been demonstrated so far.</p></div></details></div>
        </div>
      </section>

      <section className="studio-shell studio-section fit-contact-section" aria-labelledby="fit-contact-title">
        <motion.div className="studio-section-heading" {...reveal}>
          <div>
            <p className="studio-kicker">03 / Start a conversation</p>
            <h2 id="fit-contact-title">What are <br />you building?</h2>
          </div>
          <div>
            <p className="studio-lede">Tell me what you’re building, where it is getting stuck, and the kind of collaboration you have in mind. A few sentences are enough to begin.</p>
            <div className="fit-hero-actions">
              <Link className="studio-button" to="/contact?topic=role">Discuss a role <span aria-hidden="true">↗</span></Link>
              <Link className="studio-action" to="/projects">Explore the work <span aria-hidden="true">↗</span></Link>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
