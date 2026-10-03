import { useRef, useState, type ReactNode } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Search, MapPin, ListChecks, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Project } from './projectData';
import { spotlightProjects } from './projectData';
import BnlMiniEditor from './BnlMiniEditor';
import './ProjectStories.css';

type Chapter = { label: string; title: string; description: string; content: ReactNode };

function Capture({ src, alt, caption }: { src: string; alt: string; caption: string }) {
  return <figure className="story-capture"><img src={src} alt={alt} loading="lazy" decoding="async" /><figcaption>{caption}</figcaption></figure>;
}

function RentalResearch() {
  const [phase, setPhase] = useState(0);
  const phases = [
    { label: 'Finding options', text: 'Start with the place, time, budget, and kind of outing.', Icon: Search },
    { label: 'Reading sources', text: 'Open sources to look for menus, activities, and practical details.', Icon: ListChecks },
    { label: 'Checking the journey', text: 'Bring location and travel context into the comparison.', Icon: MapPin },
    { label: 'Checking the evidence', text: 'Separate supported details from things that still need confirmation.', Icon: Check },
  ];
  const active = phases[phase];
  return <div className="rental-research">
    <div className="rental-demo-label"><span>RentAWeekend / planning agents</span><span>Illustrated walkthrough</span></div>
    <div className="rental-research-layout"><div className="rental-brief"><span>The brief</span><blockquote>“A relaxed Saturday in Osu. Lunch and something nearby. Two people, GHS 500.”</blockquote><p>Example request</p></div><div className="rental-phases" role="group" aria-label="Explore research stages">{phases.map(({ label, Icon }, index) => <button key={label} type="button" onClick={() => setPhase(index)} aria-pressed={phase === index}><Icon size={18} aria-hidden="true" /><span>{label}</span><span aria-hidden="true">{phase === index ? '↗' : '·'}</span></button>)}</div></div>
    <div className="rental-stage-detail" aria-live="polite"><active.Icon size={24} aria-hidden="true" /><div><strong>{active.label}</strong><p>{active.text}</p></div></div>
    <p className="rental-footnote">Explore the research workflow. This illustration is not a live agent run.</p>
  </div>;
}

function RentalShortlist() {
  return <div className="rental-shortlist"><p className="rental-demo-label">From research to a decision / illustrated overview</p><p className="rental-result-heading">Enough detail to choose.<br /><em>Room to change your mind.</em></p><div className="rental-compare"><div><span>01 / Compare</span><strong>Places & possibilities</strong><p>Menus, activities, location, and source-supported prices.</p></div><div><span>02 / Check</span><strong>What needs confirming</strong><p>Availability, opening times, and details the sources leave open.</p></div><div><span>03 / Make it yours</span><strong>Refine the plan</strong><p>Closer, cheaper, a different start—or a different kind of day.</p></div></div><a href="https://rentmyweekend.serendepify.com/#/agents/outings" target="_blank" rel="noreferrer">Plan your own day <ArrowUpRight size={16} aria-hidden="true" /></a></div>;
}

function VoiceFlow() {
  return <div className="voice-story"><p>Twi / speech & language research</p><div className="voice-wave" aria-hidden="true">{Array.from({ length: 35 }, (_, index) => <i key={index} style={{ height: `${16 + Math.abs(Math.sin(index * 1.3)) * 60}%` }} />)}</div><div className="voice-steps"><span>Speak in Twi</span><ArrowRight aria-hidden="true" /><span>Read the interpretation</span><ArrowRight aria-hidden="true" /><span>Continue the conversation</span></div><p>Workflow illustration · explore the research preview to try it</p></div>;
}

function ConvoyFilm() {
  const [playing, setPlaying] = useState(false);
  return <div className="convoy-film">{playing ? <iframe title="Convoy product walkthrough" src="https://www.youtube-nocookie.com/embed/5btzce8adeE?autoplay=1" allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen /> : <button type="button" onClick={() => setPlaying(true)} aria-label="Play Convoy product walkthrough"><img src="/images/work/convoy-viewer.png" alt="Convoy's deployment plans and run history" loading="lazy" /><span><Play size={22} aria-hidden="true" /> Play the walkthrough</span></button>}</div>;
}

const stories: Record<string, { headline: string; intro: string; action: string; href: string; chapters: Chapter[] }> = {
  groundcontrol: {
    headline: 'Give your agents the access to follow through.',
    intro: 'GroundControl is an open-source, self-hosted control plane for your VPS. Discover the apps already running, choose what to manage, and connect ChatGPT or another compatible agent through MCP and OAuth. Agents can inspect deployments, read logs, check health, and request updates within the access you approve.',
    action: 'Explore GroundControl', href: 'https://trygroundcontrol.serendepify.com/',
    chapters: [
      { label: 'The deployment', title: 'One deployment. A shared view of what is running.', description: 'The dashboard keeps source, runtime, and release history together. An authorized agent can inspect that deployment through MCP, request an update, and follow its progress.', content: <Capture src="/groundcontrol-deployments.png" alt="GroundControl showing the release stages for a Ghana Health AI deployment" caption="Ghana Health AI deployment · recorded dashboard view" /> },
      { label: 'The checks', title: 'Go deeper when the work needs it.', description: 'For hands-on work, I also built a persistent host terminal. I used it to build and verify the BNL playground shown here.', content: <Capture src="/images/bnl/gc-bnl-scorecard-20260928.jpg" alt="GroundControl terminal showing recorded BNL verification results" caption="BNL release · supervised terminal work · 28 September 2026" /> },
      { label: 'The working product', title: 'Then open what you shipped.', description: 'The final stop is the actual product: a browser running a BNL rule over supplied data.', content: <Capture src="/images/bnl/bnl-production-execution-20260928.jpg" alt="The shipped BNL playground executing an invoice rule" caption="Public browser execution · captured 28 September 2026" /> },
    ],
  },
  rentaweekend: {
    headline: 'A Saturday in Accra. Where do we start?',
    intro: 'A good day starts with a few possibilities. RentAWeekend brings the research, comparisons, and practical details together so you can choose what comes next.',
    action: 'Plan your own day', href: 'https://rentmyweekend.serendepify.com/#/agents/outings',
    chapters: [
      { label: 'The brief', title: 'Start with the day you have in mind.', description: 'A place, a budget, a little context. The planner helps turn a loose idea into a research brief.', content: <Capture src="/images/work/rentaweekend-brief.png" alt="RentAWeekend with an example request for lunch and an activity in Osu" caption="Actual planning interface · example brief" /> },
      { label: 'The research', title: 'See what goes into the search.', description: 'Follow the kinds of work the planner performs, from finding options to checking their evidence.', content: <RentalResearch /> },
      { label: 'The possibilities', title: 'Choose with the details in view.', description: 'Compare the options, see what is still uncertain, and refine the plan around your day.', content: <RentalShortlist /> },
    ],
  },
  'ghana-health-ai': {
    headline: 'A conversation that starts in Twi.',
    intro: 'Language is part of access. This research preview connects Twi speech, visible interpretation, and a conversation you can continue by voice or text.',
    action: 'Try the research preview', href: 'https://ghanahealth.serendepify.com',
    chapters: [
      { label: 'The conversation', title: 'Make room for the way people speak.', description: 'A working voice and text interface brings the speech and language experiments into one experience.', content: <Capture src="/ghana-health-live.png" alt="Ghana Health AI voice and text research interface" caption="Actual product view · research preview" /> },
      { label: 'Behind the voice', title: 'Keep the interpretation visible.', description: 'Speech recognition is one part of the system. Understanding, response generation, and evaluation each need attention.', content: <VoiceFlow /> },
    ],
  },
  convoy: {
    headline: 'Before it ships, rehearse it.',
    intro: 'A deployment should be understandable before it changes anything. Convoy carries the plan through rehearsal, approval, and a record of what happened.',
    action: 'Explore Convoy', href: 'https://github.com/teckedd-code2save/convoy',
    chapters: [
      { label: 'The control room', title: 'A place for the plan and its history.', description: 'Follow deployment plans and their run states from the product viewer.', content: <Capture src="/images/work/convoy-viewer.png" alt="Convoy product viewer showing plans and deployment run history" caption="Recorded product view · public Convoy repository" /> },
      { label: 'The walkthrough', title: 'Watch the workflow unfold.', description: 'A recorded demonstration follows the product from planning through rehearsal and observation.', content: <ConvoyFilm /> },
    ],
  },
};

export function ProjectNavigator() {
  function jump(id: string) {
    const destination = document.getElementById(`story-${id}`);
    destination?.focus({ preventScroll: true });
    destination?.scrollIntoView({ block: 'start', behavior: 'auto' });
  }
  return <nav className="story-index" aria-label="Choose a project">{spotlightProjects.map((project, index) => <button key={project.id} type="button" onClick={() => jump(project.id)}><span>0{index + 1}</span>{project.id === 'backend-as-natural-language' ? 'BNL' : project.title}<ArrowRight size={14} aria-hidden="true" /></button>)}</nav>;
}

export function ProjectStory({ project, index }: { project: Project; index: number }) {
  const [chapter, setChapter] = useState(0);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const story = stories[project.id];
  const isBnl = project.id === 'backend-as-natural-language';
  const current = story?.chapters[chapter];
  function move(direction: number) { setChapter(value => Math.max(0, Math.min(story.chapters.length - 1, value + direction))); }
  return <article id={`story-${project.id}`} tabIndex={-1} className={`work-product-story story-${project.id}`} aria-labelledby={`spotlight-${project.id}`}>
    <header className="story-heading"><div className="story-kicker"><span>0{index + 1} /</span><h3 id={`spotlight-${project.id}`}><Link to={`/projects/${project.id}`}>{project.title}</Link></h3><span className="story-kind">{project.id === 'ghana-health-ai' ? 'Research preview' : isBnl ? 'Try it here' : 'Product story'}</span></div><p className="story-headline">{isBnl ? 'Change the rule. Watch the result.' : story.headline}</p><p className="story-intro">{isBnl ? 'What if a backend rule could be something you read, edit, and run? Try this small invoice decision—then make it behave differently.' : story.intro}</p></header>
    {isBnl ? <BnlMiniEditor /> : current && <div className="story-carousel" role="region" aria-roledescription="carousel" aria-label={`${project.title} story`}>
      <div className="story-chapters" role="group" aria-label={`${project.title} chapters`}>{story.chapters.map((item, itemIndex) => <button key={item.label} type="button" aria-pressed={chapter === itemIndex} onClick={() => setChapter(itemIndex)}><span>0{itemIndex + 1}</span>{item.label}</button>)}</div>
      <div className="story-stage" onTouchStart={event => { const point = event.touches[0]; touch.current = { x: point.clientX, y: point.clientY }; }} onTouchEnd={event => { if (!touch.current) return; const point = event.changedTouches[0]; const dx = point.clientX - touch.current.x; const dy = point.clientY - touch.current.y; if (Math.abs(dx) > 70 && Math.abs(dx) > Math.abs(dy) * 1.5) move(dx < 0 ? 1 : -1); touch.current = null; }}>
        <div key={chapter} className="story-slide" role="group" aria-roledescription="slide" aria-label={`${chapter + 1} of ${story.chapters.length}: ${current.label}`}>{current.content}</div>
      </div>
      <div className="story-caption"><div aria-live="polite"><p className="story-chapter-title">{current.title}</p><p>{current.description}</p></div><div className="story-controls"><span>{chapter + 1} / {story.chapters.length}</span><button type="button" aria-label={`Previous ${project.title} chapter`} disabled={chapter === 0} onClick={() => move(-1)}><ArrowLeft size={19} /></button><button type="button" aria-label={`Next ${project.title} chapter`} disabled={chapter === story.chapters.length - 1} onClick={() => move(1)}><ArrowRight size={19} /></button></div></div>
    </div>}
    <div className="story-links">{!isBnl && <a href={story.href} target="_blank" rel="noreferrer">{story.action}<ArrowUpRight size={16} aria-hidden="true" /></a>}<Link to={`/projects/${project.id}`}>The story behind {isBnl ? 'BNL' : project.title}<ArrowRight size={16} aria-hidden="true" /></Link></div>
  </article>;
}
