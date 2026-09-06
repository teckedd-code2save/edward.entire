import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './ContactStudio.css';

const links = [
  ['GitHub', 'https://github.com/teckedd-code2save'],
  ['LinkedIn', 'https://www.linkedin.com/in/edward-twumasi/'],
  ['Serendepify', 'https://www.serendepify.com/'],
];

export default function Contact() {
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
          <h1 className="display">Have something<br />worth building?</h1>
          <p className="lede">I’m Edward, an engineer based in Accra. I work across backend systems, applied AI, and the infrastructure that brings a product to life.</p>
          <div className="contact-address"><span>Email me</span><a href="mailto:edwardktwumasi1000@gmail.com">edwardktwumasi1000@gmail.com <b aria-hidden>↗</b></a><button type="button" onClick={copyAddress}>{copyState === 'copied' ? 'Copied ✓' : 'Copy address'}</button><p className="contact-copy-status" role="status">{copyState === 'failed' ? 'Please select the address above to copy it.' : copyState === 'copied' ? 'Email address copied.' : ''}</p></div>
          <div className="contact-coordinates"><span>Accra, Ghana</span><span>GMT · UTC +00:00</span><Link to="/fit">Discuss a role ↗</Link></div>
        </div>
        <div className="contact-portrait-stage" ref={portrait}>
          <motion.figure style={reduceMotion ? undefined : { y: lift, rotate: tilt }}>
            <img src="/profile-photo.jpg" width="800" height="800" alt="Edward Twumasi" />
            <figcaption><strong>Edward Twumasi</strong><span>Engineer & independent builder</span><i aria-hidden>↗</i></figcaption>
          </motion.figure>
        </div>
      </section>
      <section className="page-shell contact-studio-details">
        <div><p className="eyebrow">What we could work on</p><h2>Products with<br />real engineering questions.</h2><p>AI-enabled products, voice and language systems, deployment tooling, health technology, and research collaborations. A concise brief is enough to begin.</p></div>
        <div className="contact-studio-elsewhere"><p className="eyebrow">A few other doors</p>{links.map(([label, href]) => <a key={label} href={href} target="_blank" rel="noreferrer"><span>{label}</span><span aria-hidden>↗</span></a>)}<Link to="/research"><span>Research lab</span><span aria-hidden>↗</span></Link><a href="https://drive.google.com/file/d/1JOOIvOaqkOIb2CNFp-2q66To6ef7sg1P/view?usp=sharing" target="_blank" rel="noreferrer"><span>Curriculum vitae</span><span aria-hidden>↗</span></a></div>
      </section>
    </div>
  );
}
