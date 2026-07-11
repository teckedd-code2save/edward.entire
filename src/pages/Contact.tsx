import { motion } from 'framer-motion';

const links = [
  ['GitHub', 'https://github.com/teckedd-code2save'],
  ['LinkedIn', 'https://www.linkedin.com/in/edward-twumasi/'],
  ['Serendepify', 'https://www.serendepify.com/'],
  ['Research', 'https://precisionxyz.serendepify.com/#/research'],
];

export default function Contact() {
  return (
    <div>
      <section className="contact-hero">
        <motion.div className="page-shell" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .75, ease: [0.16, 1, 0.3, 1] }}>
          <p className="eyebrow">Contact · Accra, Ghana</p>
          <h1 className="display">Let’s make the<br /><span style={{ color: 'var(--blue)' }}>useful thing.</span></h1>
          <p className="lede" style={{ maxWidth: 680 }}>Bring the difficult backend, infrastructure, AI, or research problem. A concise brief is enough to begin.</p>
          <a className="contact-email" href="mailto:edwardktwumasi1000@gmail.com">edwardktwumasi1000@gmail.com ↗</a>

          <div className="contact-grid">
            <article className="contact-panel">
              <p className="eyebrow">Good reasons to write</p>
              <h2>Products, systems<br />& research.</h2>
              <p className="lede" style={{ color: 'var(--ink-2)', maxWidth: 620 }}>Senior backend engineering, AI-enabled product work, deployment tooling, health and public-interest technology, or a thoughtful research collaboration.</p>
            </article>
            <article className="contact-panel">
              <p className="eyebrow">Elsewhere</p>
              <h2>Follow the work.</h2>
              <div className="contact-links">
                {links.map(([label, href]) => <a key={label} href={href} target="_blank" rel="noreferrer">{label} ↗</a>)}
                <a href="https://drive.google.com/file/d/1JOOIvOaqkOIb2CNFp-2q66To6ef7sg1P/view?usp=sharing" target="_blank" rel="noreferrer">CV ↗</a>
              </div>
            </article>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
