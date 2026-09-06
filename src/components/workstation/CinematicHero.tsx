import { Component, Suspense, lazy, useEffect, useRef, useState, type ReactNode } from 'react';
import { useMotionValueEvent, useReducedMotion, useScroll } from 'framer-motion';
import './CinematicHero.css';

const WorkstationScene = lazy(() => import('./WorkstationScene'));
const chapters = [
  { title: 'AI, beyond the model.', label: 'The intent', body: 'Research, product, and the infrastructure in between. A closer look at building Ghana Health AI.', at: 0 },
  { title: 'Inside the work.', label: 'The engineering', body: 'An agent-assisted workspace. A conversation that keeps its context. An interpretation the user can inspect.', at: .25 },
  { title: 'Every release has a record.', label: 'The release', body: 'The actual Ghana Health build: an immutable image, a commit, and a verifiable path to production.', at: .55 },
  { title: 'Operate what you ship.', label: 'GroundControl', body: 'After GitHub Actions ships, GroundControl brings deployment stages, runtime verification, and agent-assisted host operations into one interface.', at: .78 },
  { title: 'Ghana Health, live.', label: 'The product', body: 'A voice-first health assistant built around Twi, visible interpretation, and a continuous conversation.', at: .96 },
];

function ProductStill() {
  return <div className="studio-still"><div className="studio-still-chrome"><span /><span /><span /><p>ghanahealth.serendepify.com</p></div><img src="/ghana-health-live.png" width="1512" height="982" alt="Ghana Health AI: the live voice-first chat interface" /></div>;
}

class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? <ProductStill /> : this.props.children; }
}

export default function CinematicHero() {
  const section = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const [compact, setCompact] = useState(() => typeof window !== 'undefined' && window.matchMedia('(max-width: 480px)').matches);
  const [chapter, setChapter] = useState(0);
  const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end end'] });
  const still = reducedMotion || compact;
  useEffect(() => {
    const media = window.matchMedia('(max-width: 480px)');
    const update = () => setCompact(media.matches);
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);
  useMotionValueEvent(scrollYProgress, 'change', p => setChapter(p < .18 ? 0 : p < .39 ? 1 : p < .65 ? 2 : p < .89 ? 3 : 4));
  const current = chapters[still ? 0 : chapter];

  function goTo(index: number) {
    if (!section.current) return;
    const start = section.current.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: start + chapters[index].at * (section.current.offsetHeight - window.innerHeight), behavior: 'auto' });
  }

  return <section ref={section} className={`studio-story${still ? ' studio-story--still' : ''}`} aria-label="From building Ghana Health AI to the live product">
    <div className="studio-viewport">
      <header className="studio-heading"><div><p className="studio-eyebrow">Edward Twumasi <span>/</span> Applied AI & software engineering</p><h1>{current.title}</h1></div><p className="studio-description" aria-live="polite">{current.body}</p></header>
      <div className="studio-stage" role="img" aria-label="One three-dimensional laptop moves from the agent workspace to GitHub Actions, GroundControl, and Ghana Health AI. Its camera and screen follow your scroll in both directions.">
        {still ? <ProductStill /> : <SceneBoundary><Suspense fallback={<div className="studio-loading">Preparing the workspace<span>Ghana Health AI</span></div>}><WorkstationScene progress={scrollYProgress} product={chapter === 4} /></Suspense></SceneBoundary>}
      </div>
      <div className="studio-bottom">
        {!still && <nav className="studio-chapters" aria-label="Explore the build sequence">{chapters.map((item, index) => <button key={item.label} aria-label={item.label} title={item.label} className={chapter === index ? 'is-current' : ''} aria-current={chapter === index ? 'step' : undefined} onClick={() => goTo(index)}><span className="studio-chapter-mark" /><span>{item.label}</span></button>)}</nav>}
        <div className="studio-context">{chapter === 4 || still ? <a href="https://ghanahealth.serendepify.com" target="_blank" rel="noreferrer">Explore Ghana Health <span>↗</span></a> : chapter === 3 ? <a href="https://groundcontrol.serendepify.com" target="_blank" rel="noreferrer">Explore GroundControl <span>↗</span></a> : chapter === 2 ? <a href="https://github.com/teckedd-code2save/ghana-health-ai/actions/runs/33924380025" target="_blank" rel="noreferrer">View the actual release <span>↗</span></a> : <span>Scroll to explore <b>↓</b></span>}</div>
      </div>
      <p className="studio-caption">{chapter < 2 ? 'Ghana Health AI · Workspace reconstruction' : chapter === 2 ? 'Ghana Health AI · Actual release capture' : chapter === 3 ? 'GroundControl · Deployment workspace · Captured 6 Sep 2026' : 'Ghana Health AI · Actual product capture'}</p>
    </div>
  </section>;
}
