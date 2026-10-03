import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { contactTopics, contactEmailHref } from '@/content/contact';
import './ContactStudio.css';
import './PortfolioSections.css';

const links = [
  ['GitHub', 'https://github.com/teckedd-code2save'],
  ['LinkedIn', 'https://www.linkedin.com/in/edward-twumasi/'],
  ['Serendepify', 'https://www.serendepify.com/'],
];

export default function Contact() {
  const [params, setParams] = useSearchParams();
  const topic = contactTopics.find(item => item.id === params.get('topic')) ?? contactTopics[0];
  const [brief, setBrief] = useState('');
  const portrait = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: portrait, offset: ['start end', 'end start'] });
  const lift = useTransform(scrollYProgress, [0, 1], [18, -18]);
  const tilt = useTransform(scrollYProgress, [0, 1], [-3, 2]);
  const reduceMotion = useReducedMotion();
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'failed'>('idle');
  async function copyAddress() {
    try { await navigator.clipboard.writeText('edwardktwumasi1000@gmail.com'); setCopyState('copied'); }
    catch { setCopyState('failed'); }
  }
  return (
    <div className="contact-studio">
      <section className="page-shell contact-studio-intro">
        <div className="contact-studio-copy">
          <p className="eyebrow">A conversation starts here</p>
          <h1 className="display">What are <br />you working on?</h1>
          <p className="lede">A product, a role, or a research question. Tell me the part that needs attention, and we can start there.</p>
          <div className="contact-address"><span>Email me</span><a href="mailto:edwardktwumasi1000@gmail.com">edwardktwumasi1000@gmail.com <b aria-hidden>↗</b></a><button type="button" onClick={copyAddress}>{copyState === 'copied' ? 'Copied ✓' : 'Copy address'}</button><p className="contact-copy-status" role="status">{copyState === 'failed' ? 'Please select the address above to copy it.' : copyState === 'copied' ? 'Email address copied.' : ''}</p></div>
          <div className="contact-coordinates"><span>Accra, Ghana</span><span>GMT · UTC +00:00</span><Link to="/fit">Working together ↗</Link></div>
        </div>
        <div className="contact-portrait-stage" ref={portrait}>
          <motion.figure style={reduceMotion ? undefined : { y: lift, rotate: tilt }}>
            <img src="/profile-photo.jpg" width="800" height="800" alt="Edward Twumasi" />
            <figcaption><strong>Edward Twumasi</strong><span>Engineer & independent builder</span><i aria-hidden>↗</i></figcaption>
          </motion.figure>
        </div>
      </section>
      <section className="page-shell contact-studio-details" aria-labelledby="contact-draft-title">
        <div className="contact-draft"><p className="eyebrow">A few lines are enough</p><h2 id="contact-draft-title">Start the conversation.</h2>
          <fieldset className="contact-topic-options"><legend>What would you like to discuss?</legend><div>{contactTopics.map(item => <label key={item.id}><input type="radio" name="contact-topic" value={item.id} checked={topic.id === item.id} onChange={() => setParams({ topic: item.id }, { replace: true })} /><span>{item.label}</span></label>)}</div></fieldset>
          <label className="contact-brief-label" htmlFor="contact-brief">A short introduction <span>(optional)</span></label><p id="contact-brief-hint">{topic.hint}</p><textarea id="contact-brief" rows={5} maxLength={1800} value={brief} onChange={event => setBrief(event.target.value)} aria-describedby="contact-brief-hint contact-email-note" placeholder="Here’s what I have in mind…" />
          <a className="button-primary" href={contactEmailHref(topic, brief)}>Open an email draft ↗</a><p className="contact-email-note" id="contact-email-note">Opens your email app with these details. You review and send it there.</p>
          <Link className="section-link" to="/help">One integration, deployment, or automation? Get quick help →</Link>
        </div>
        <div className="contact-studio-elsewhere"><p className="eyebrow">Get to know the work</p><Link to="/projects"><span>Projects & working demos</span><span aria-hidden>↗</span></Link><Link to="/research"><span>Research & model cards</span><span aria-hidden>↗</span></Link><a href="https://drive.google.com/file/d/1JOOIvOaqkOIb2CNFp-2q66To6ef7sg1P/view?usp=sharing" target="_blank" rel="noreferrer"><span>Curriculum vitae</span><span aria-hidden>↗</span></a>{links.map(([label, href]) => <a key={label} href={href} target="_blank" rel="noreferrer"><span>{label}</span><span aria-hidden>↗</span></a>)}</div>
      </section>
    </div>
  );
}
