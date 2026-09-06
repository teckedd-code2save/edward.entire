import { useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { filterCategories, projects, type Project, type ProjectCategory } from '@/components/projects/projectData';
import './WorkFitStudio.css';

const featuredIds = ['ghana-health-ai', 'backend-as-natural-language', 'groundcontrol'];
const featured = featuredIds.flatMap((id) => projects.filter((project) => project.id === id));
const archive = projects.filter((project) => !featuredIds.includes(project.id));
const ease = [0.16, 1, 0.3, 1] as const;

function CompilerSchematic() {
  return <><svg className="studio-system-drawing" viewBox="0 0 1100 560" role="img" aria-labelledby="compiler-title compiler-description">
    <title id="compiler-title">From language to an executable plan</title>
    <desc id="compiler-description">Controlled natural-language declarations pass through a catalogue-driven semantic frontend. Constraints are validated before canonical, typed intermediate representations are emitted for deterministic execution.</desc>
    <defs>
      <pattern id="compiler-grid" width="28" height="28" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r=".8" fill="#b9c0c7" opacity=".5" /></pattern>
      <linearGradient id="compiler-paper" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#fdfcf9" /><stop offset="1" stopColor="#ebece9" /></linearGradient>
      <marker id="compiler-arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0 0 6 3 0 6" fill="none" stroke="#6b859e" /></marker>
    </defs>
    <rect width="1100" height="560" fill="url(#compiler-grid)" />
    <text x="54" y="45" className="drawing-caption">LANGUAGE → STRUCTURE → EXECUTION</text>
    <text x="1048" y="45" textAnchor="end" className="drawing-caption">BNL / 02</text>
    <g>
      <rect x="70" y="166" width="260" height="232" rx="8" fill="#dfe1df" stroke="#c5cacb" transform="rotate(-5 200 282)" />
      <rect x="65" y="153" width="260" height="232" rx="8" fill="url(#compiler-paper)" stroke="#b9c1c8" />
      <path d="M65 206H325" stroke="#cbd0d3" />
      <text x="87" y="185" className="drawing-caption">01 / DECLARE</text>
      <text x="87" y="243" className="drawing-heading">Controlled</text>
      <text x="87" y="272" className="drawing-heading">natural language</text>
      <text x="87" y="317" className="drawing-body">Backend declarations</text>
      <text x="87" y="342" className="drawing-body">Explicit constraints</text>
      <circle cx="294" cy="179" r="4" fill="#6b88a5" />
    </g>
    <path className="drawing-connector" d="M327 269H418" fill="none" stroke="#6b859e" markerEnd="url(#compiler-arrow)" />
    <g>
      <circle cx="535" cy="265" r="108" fill="none" stroke="#c6cdd2" strokeDasharray="2 7" />
      <circle cx="535" cy="265" r="86" fill="#e7ebed" stroke="#aab8c5" />
      <circle cx="535" cy="265" r="66" fill="#f6f7f5" stroke="#c1cad1" />
      <path d="m506 262 21 21 38-40" fill="none" stroke="#456eaa" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M520 191v-8m30 8v-8m-30 164v-8m30 8v-8m-89-89h-8m8 30h-8m164-30h-8m8 30h-8" stroke="#7c90a2" />
      <text x="535" y="418" textAnchor="middle" className="drawing-heading">Semantic frontend</text>
      <text x="535" y="446" textAnchor="middle" className="drawing-body">Catalogue · validate · lower</text>
    </g>
    <path className="drawing-connector" d="M646 269H735" fill="none" stroke="#6b859e" markerEnd="url(#compiler-arrow)" />
    <g>
      <rect x="752" y="149" width="271" height="236" rx="8" fill="url(#compiler-paper)" stroke="#b9c1c8" />
      <path d="M752 203H1023" stroke="#cbd0d3" />
      <text x="774" y="182" className="drawing-caption">03 / EXECUTE</text>
      <text x="774" y="244" className="drawing-heading">Canonical BIR</text>
      <path d="M778 267v71h19m-19-48h19m-19 24h19" fill="none" stroke="#a0afb9" />
      <text x="809" y="295" className="drawing-body">Typed representation</text>
      <text x="809" y="319" className="drawing-body">Validated constraints</text>
      <text x="809" y="343" className="drawing-body">Deterministic plan</text>
    </g>
    <path d="M54 493H1048" stroke="#cbd0d3" />
    <text x="54" y="526" className="drawing-caption">ONE GENERIC LOWERING PATH</text>
    <text x="1048" y="526" textAnchor="end" className="drawing-caption">COMPILER ARCHITECTURE / SCHEMATIC</text>
  </svg><div className="studio-compiler-mobile">
    <p className="studio-kicker">Compiler architecture / schematic</p>
    <ol>
      <li><span>01</span><div><h4>Controlled natural language</h4><p>Backend declarations and explicit constraints.</p></div></li>
      <li><span>02</span><div><h4>Semantic frontend</h4><p>Catalogue-driven validation and one generic lowering path.</p></div></li>
      <li><span>03</span><div><h4>Canonical BIR</h4><p>A typed representation for deterministic execution.</p></div></li>
    </ol>
  </div></>;
}

function ProjectVisual({ project }: { project: Project }) {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [24, -24]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [3, -2]);
  const isCompiler = project.id === 'backend-as-natural-language';
  const isHealth = project.id === 'ghana-health-ai';
  return <figure ref={ref} className={`studio-project-visual visual-${project.id}`}>
    <motion.div className="studio-project-artifact" style={reduceMotion ? undefined : { y, rotateX }}>
      {isCompiler ? <CompilerSchematic /> : <div className="studio-product-window">
        <div className="studio-product-window-bar"><span><i /><i /><i /></span><span>{isHealth ? 'ghanahealth.serendepify.com' : 'groundcontrol.serendepify.com'}</span><span>{isHealth ? 'Research preview' : 'Infrastructure'}</span></div>
        <img src={isHealth ? '/ghana-health-live.png' : '/groundcontrol-deployments.png'} alt={isHealth ? 'Ghana Health AI live research preview showing its voice and text chat interface, with voice v6 and stable meaning extraction selected.' : 'GroundControl’s current Ghana Health deployment workspace, showing recorded configuration, validation, image pull, runtime, and release verification stages.'} width={isHealth ? 1512 : 1280} height={isHealth ? 982 : 720} loading={isHealth ? 'eager' : 'lazy'} />
      </div>}
    </motion.div>
    <figcaption><span>{isCompiler ? 'System architecture / schematic' : isHealth ? 'Product capture / live research preview' : 'Deployment workspace / captured 6 Sep 2026'}</span><span>{isHealth ? 'Voice × care × language' : isCompiler ? 'Declare → validate → execute' : 'Workloads × routes × deployments'}</span></figcaption>
  </figure>;
}

function ProjectLinks({ project, archive = false }: { project: Project; archive?: boolean }) {
  return <div className="studio-project-links">
    {project.liveUrl && <a className="studio-action" href={project.liveUrl} target="_blank" rel="noreferrer">{archive ? 'Live product' : 'Explore live product'}<ArrowUpRight size={16} aria-hidden="true" /></a>}
    {project.githubUrl && <a className="studio-action" href={project.githubUrl} target="_blank" rel="noreferrer">{archive ? 'Source' : project.id === 'groundcontrol' ? 'Explore the source' : 'Research & source'}<ArrowUpRight size={16} aria-hidden="true" /></a>}
  </div>;
}

export default function Projects() {
  const [filter, setFilter] = useState<ProjectCategory>('all');
  const reduceMotion = useReducedMotion();
  const visible = filter === 'all' ? archive : archive.filter((project) => project.category === filter);

  return <div className="work-fit-studio work-studio">
    <header className="studio-shell studio-work-masthead">
      <motion.div initial={reduceMotion ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .85, ease }}>
        <p className="studio-kicker">Selected work / 2024—2026</p>
        <h1 className="studio-title">Ideas, made<br /><span>operational.</span></h1>
      </motion.div>
      <motion.div className="studio-work-intro" initial={reduceMotion ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .85, delay: .12, ease }}>
        <p className="studio-lede">Products, research tools, and infrastructure built to move from a strong idea to dependable use.</p>
        <div className="studio-work-index"><span>{String(featured.length).padStart(2, '0')} selected systems</span><span>{String(archive.length).padStart(2, '0')} more explorations</span><ArrowDown size={17} aria-hidden="true" /></div>
      </motion.div>
    </header>

    <section className="studio-featured" aria-labelledby="featured-work">
      <div className="studio-shell"><h2 id="featured-work" className="studio-index-label">Featured work</h2></div>
      {featured.map((project) => <article key={project.id} className={`studio-case study-${project.id}`}>
        <div className="studio-shell">
          <motion.div className="studio-case-heading" initial={reduceMotion ? false : { opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .3 }} transition={{ duration: .75, ease }}>
            <span className="studio-case-number">/{project.number}</span>
            <div><p className="studio-kicker">{project.tag}</p><h3>{project.title}</h3></div>
            <ProjectLinks project={project} />
          </motion.div>
          <ProjectVisual project={project} />
          <div className="studio-case-details">
            <div className="studio-case-thesis"><p>{project.description}</p><p className="studio-case-architecture">{project.architecture}</p><div className="studio-stack" aria-label={`${project.title} technology stack`}>{project.stack.map((item) => <span key={item}>{item}</span>)}</div></div>
            <div className="studio-case-evidence"><p className="studio-kicker">What the work demonstrates</p><ul>{project.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul></div>
          </div>
        </div>
      </article>)}
    </section>

    <section className="studio-shell studio-section studio-archive" aria-labelledby="project-archive">
      <div className="studio-section-heading"><div><p className="studio-kicker">Additional systems</p><h2 id="project-archive">Project archive</h2></div><p className="studio-lede">Earlier products and focused experiments. A wider view of the questions I keep coming back to.</p></div>
      <div className="studio-filters" role="group" aria-label="Filter projects">{filterCategories.map((category) => <button key={category.value} type="button" aria-pressed={filter === category.value} onClick={() => setFilter(category.value)}>{category.label}</button>)}</div>
      <p className="sr-only" role="status" aria-live="polite">Showing {visible.length} {visible.length === 1 ? 'project' : 'projects'}.</p>
      <div className="studio-archive-list">{visible.map((project) => <motion.article key={project.id} className="studio-archive-row" initial={reduceMotion ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .35, ease }}>
        <span className="studio-archive-number">{project.number}</span>
        <div className="studio-archive-name"><p className="studio-kicker">{project.tag}</p><h3>{project.title}</h3></div>
        <div className="studio-archive-summary"><p>{project.description}</p><div className="studio-stack">{project.stack.slice(0, 3).map((item) => <span key={item}>{item}</span>)}</div></div>
        <ProjectLinks project={project} archive />
      </motion.article>)}</div>
    </section>

    <section className="studio-work-closing"><div className="studio-shell studio-section studio-section-heading"><div><p className="studio-kicker">The common thread</p><h2>Less friction.<br /><span>More agency.</span></h2></div><div><p className="studio-lede">Whether the subject is deployment, focus, care, or language, each system tries to make a difficult capability understandable and usable.</p><a className="studio-action" href="#/contact">Start a conversation<ArrowUpRight size={17} aria-hidden="true" /></a></div></div></section>
  </div>;
}
