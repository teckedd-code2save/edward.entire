import { motion } from 'framer-motion';

const tracks = [
  {
    number: '01',
    title: 'Intent Engine',
    body: 'A local-first Android system exploring how declared intent, contextual signals, and careful intervention can help people stay aligned with what they meant to do.',
    link: 'https://github.com/teckedd-code2save/IntentEngine-mvp',
    label: 'Open the Android research build',
  },
  {
    number: '02',
    title: 'Ghana Health AI',
    body: 'Exploring how Twi-first voice interaction, grounded health knowledge, and careful escalation can make everyday health information more accessible in Ghana.',
    link: 'https://github.com/teckedd-code2save/ghana-health-ai',
    label: 'Explore the health AI build',
  },
  {
    number: '03',
    title: 'Human–AI collaboration',
    body: 'Designing agents and interfaces that expose their reasoning boundaries, preserve user control, and turn intelligence into understandable action.',
    link: 'https://precisionxyz.serendepify.com/#/research',
    label: 'Read the research notes',
  },
];

const questions = [
  ['Now', 'How can useful language and agent capabilities fit locally on everyday devices?'],
  ['Near', 'How should AI systems explain confidence, escalation, and intervention to the people relying on them?'],
  ['Long', 'What does accountable human–robot and human–agent collaboration look like in health, energy, and public systems?'],
];

export default function Research() {
  return (
    <div>
      <section className="editorial-section" style={{ paddingTop: 170 }}>
        <motion.div className="page-shell research-intro" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .75, ease: [0.16, 1, 0.3, 1] }}>
          <div>
            <p className="eyebrow">Research · intelligent human systems</p>
            <h1 className="display">Machines that<br /><span style={{ color: 'var(--blue)' }}>work with us.</span></h1>
            <p className="lede">My research interests sit between interactive AI, machine learning, human–computer interaction, and the realities of building for communities underrepresented in today’s technology.</p>
            <a className="button-primary" href="https://precisionxyz.serendepify.com/#/research" target="_blank" rel="noreferrer">Visit the research hub ↗</a>
          </div>
          <div className="research-orb" aria-hidden="true"><div className="research-ring" /><div className="research-core">R</div><span className="signal-chip one">HCI</span><span className="signal-chip two">edge AI</span><span className="signal-chip three">health AI</span></div>
        </motion.div>
      </section>

      <section className="editorial-section" style={{ background: 'var(--paper-2)' }}>
        <div className="page-shell">
          <div className="section-head"><div><p className="eyebrow">01 · Active tracks</p><h2 className="section-title">Questions with<br />working code.</h2></div><p className="lede">Research is strongest when the argument can meet a real user, device, dataset, or deployment constraint.</p></div>
          <div>
            {tracks.map((track) => (
              <article className="research-track" key={track.number}>
                <span className="track-number">{track.number}</span>
                <div><h2>{track.title}</h2><a href={track.link} target="_blank" rel="noreferrer" className="project-arrow">{track.label} ↗</a></div>
                <p>{track.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="editorial-section dark-section">
        <div className="page-shell">
          <div className="section-head"><div><p className="eyebrow">02 · Research horizon</p><h2 className="section-title">Build now.<br /><span style={{ color: 'var(--acid)' }}>Ask further.</span></h2></div><p className="lede">A practical thread connects today’s prototypes to longer-term work in accountable autonomous systems.</p></div>
          <div className="principles">
            {questions.map(([time, question], index) => <article className="principle" key={time}><b>0{index + 1} / {time}</b><h3>{question}</h3></article>)}
          </div>
        </div>
      </section>
    </div>
  );
}
