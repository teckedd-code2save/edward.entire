import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './WorkFitStudio.css';

const roles = [
  {
    title: 'Distributed / production infrastructure',
    body: 'For teams that need stateful backend systems, durable workflows, deployment control planes, and engineers who can own failure from API contract to production recovery.',
    evidence: [
      'Lead backend engineering across financial, payments, e-commerce, and public-sector systems using Temporal, Kafka, Akka.NET, Redis, Elasticsearch/OpenSearch, PostgreSQL, EF Core, and Dapper.',
      'GroundControl reconciles deployments, Docker/Compose, proxy routes, host state, logs, health, and release evidence across operator-owned infrastructure.',
      'Production work emphasizes concurrency, retries, idempotency, observability, rollout safety, and explicit recovery rather than happy-path service code.',
    ],
    proof: ['Hubtel distributed systems', 'Temporal workflows', 'GroundControl'],
    route: '/projects',
    routeLabel: 'Inspect the systems work',
  },
  {
    title: 'Agent / research platform infrastructure',
    body: 'For teams building agents that need real capabilities without turning model autonomy into unrestricted production authority.',
    evidence: [
      'GroundControl lets ChatGPT act as a constrained deployment client: receive only an approved deployment, trigger a typed redeploy, follow the durable operation and report health/public evidence without VPS shell access.',
      'Long-running mutations are durable idempotent operations; interrupted non-replayable work is marked uncertain instead of being executed twice.',
      'Exact deployed revisions can be reproduced in ephemeral Daytona sandboxes for bounded validation, while connector health is verified capability by capability.',
    ],
    proof: ['MCP + OAuth', 'Durable operations', 'Exact-revision verification'],
    route: '/projects',
    routeLabel: 'See the control-plane evidence',
  },
  {
    title: 'ML systems / evaluation engineering',
    body: 'For teams where model quality, data lineage, evaluation, training infrastructure, and production behavior have to be treated as one system.',
    evidence: [
      'Ghana Health AI connects Twi ASR, human-reviewed language data, semantic adaptation, Modal GPU training, versioned evaluation fixtures, and guarded product promotion.',
      'Published model candidates retain measured failures and non-promotion decisions; a completed training run is never treated as proof that a model should ship.',
      'The current systems track extends the same research into Arrow/Parquet corpus lineage, GPU profiling, distributed training, checkpoint/recovery, and serving benchmarks.',
    ],
    proof: ['Twi/Akan speech', 'Modal GPU', 'Evaluation + source history'],
    route: '/research',
    routeLabel: 'Enter the research lab',
  },
  {
    title: 'Systems-minded founding engineer',
    body: 'For early teams that need one owner who can connect an underserved problem to architecture, product, infrastructure, evaluation, and the operational details required to keep it real.',
    evidence: [
      'GroundControl moved from dashboard to agent-operable control plane as the operational problem became clearer.',
      'RentAWeekend evolved from planning UX into concurrency-safe, source-tracked real-world execution with explicit payment, safety, matching, and human gates.',
      'Ghana Health AI combines product, low-resource-language research, model evaluation, deployment, and an explicit roadmap into deeper ML systems work.',
    ],
    proof: ['0→1 ownership', 'Architecture + product', 'Build + operate'],
    route: '/projects',
    routeLabel: 'Explore the flagship systems',
  },
];

const gaps = [
  {
    number: '01',
    title: 'Measure more of the systems story.',
    body: 'The architecture and failure-handling decisions are increasingly visible. The next improvement is systematic public measurement: latency, throughput, resource use, recovery time, load behavior, and before/after operating results.',
    action: 'Next evidence: benchmark and operating scorecards attached to flagship case studies.',
  },
  {
    number: '02',
    title: 'Move deeper into GPU and distributed model compute.',
    body: 'The current strength is backend, control-plane, evaluation, and deployment engineering. Training/inference infrastructure roles also require hands-on evidence in profiling, CUDA/Triton, parallelism, checkpointing, and accelerator memory behavior.',
    action: 'Next evidence: Ghana Health Model Factory experiments with profiler traces and distributed-training measurements.',
  },
  {
    number: '03',
    title: 'Make cluster scheduling knowledge operational.',
    body: 'Kubernetes and container deployment are already part of the work, but research-compute teams need deeper scheduler, gang-admission, Slurm, resource-topology, and failure-recovery understanding.',
    action: 'Next evidence: a durable research-job controller with explicit resources, cancellation, checkpoint, resume, and evidence.',
  },
  {
    number: '04',
    title: 'Compound independent validation.',
    body: 'The work is strongly self-authored. Open-source adoption, collaborators, benchmarks, references, talks, papers, and external users will make the signal easier to verify without relying on portfolio prose.',
    action: 'Next evidence: public technical articles, reproducible benchmarks, contributions, and operating references.',
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
          <h1 className="studio-title fit-title">Systems for AI<br />that has to <span>work.</span></h1>
          <p className="studio-lede">My strongest work sits where distributed backends, agent execution, model evaluation, and production operations meet. The evidence below is organized by capability, not by job-title keywords.</p>
          <div className="fit-hero-actions">
            <button
              className="studio-action"
              type="button"
              onClick={() => document.getElementById('role-evidence')?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' })}
            >
              Explore the role evidence <span aria-hidden="true">↓</span>
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

      <section className="studio-shell studio-section" id="role-evidence" aria-labelledby="fit-roles-title">
        <motion.div className="studio-section-heading" {...reveal}>
          <div>
            <p className="studio-kicker">01 / Role evidence</p>
            <h2 id="fit-roles-title">The work behind<br />the role.</h2>
          </div>
          <p className="studio-lede">Four capability clusters built from shipped systems, research artifacts, failure handling, and production ownership.</p>
        </motion.div>

        <div className="fit-role-list">
          {roles.map((role, index) => (
            <motion.article className="fit-role-row" key={role.title} {...reveal}>
              <div className="fit-role-heading">
                <p className="studio-kicker">Role / 0{index + 1}</p>
                <h3>{role.title}</h3>
                <p>{role.body}</p>
              </div>
              <div className="fit-role-evidence">
                <p className="studio-kicker fit-evidence-label">Selected evidence</p>
                <ul>{role.evidence.map((item) => <li key={item}>{item}</li>)}</ul>
                <p className="fit-proof-index">{role.proof.join(' · ')}</p>
                <Link className="studio-action" to={role.route}>{role.routeLabel} <span aria-hidden="true">↗</span></Link>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="fit-next-section" aria-labelledby="fit-next-title">
        <div className="studio-shell studio-section">
          <motion.div className="studio-section-heading" {...reveal}>
            <div>
              <p className="studio-kicker">02 / The next evidence</p>
              <h2 id="fit-next-title">A clear view of<br />what comes next.</h2>
            </div>
            <p className="studio-lede">The projects show what I can build. These are the areas where further operating results and independent evidence will make the work easier to assess.</p>
          </motion.div>
          <div className="fit-next-list">
            {gaps.map((gap) => (
              <motion.article className="fit-next-row" key={gap.number} {...reveal}>
                <span className="studio-kicker fit-next-number">{gap.number}</span>
                <h3>{gap.title}</h3>
                <div className="fit-next-copy">
                  <p>{gap.body}</p>
                  <p className="fit-next-action">{gap.action}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="studio-shell studio-section fit-contact-section" aria-labelledby="fit-contact-title">
        <motion.div className="studio-section-heading" {...reveal}>
          <div>
            <p className="studio-kicker">03 / Start a conversation</p>
            <h2 id="fit-contact-title">What are<br />you building?</h2>
          </div>
          <div>
            <p className="studio-lede">If your team is building distributed infrastructure, agent platforms, or ML systems that need production ownership, let’s talk about the hard part that needs an owner.</p>
            <div className="fit-hero-actions">
              <Link className="studio-button" to="/contact">Discuss a role <span aria-hidden="true">↗</span></Link>
              <Link className="studio-action" to="/projects">Explore the work <span aria-hidden="true">↗</span></Link>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
