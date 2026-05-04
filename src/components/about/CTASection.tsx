import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { Link } from 'react-router-dom';

const easeEnter = [0.0, 0, 0.2, 1] as [number, number, number, number];

export default function CTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-8% 0px' });

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden px-5 py-[100px] md:px-10 md:py-[140px]"
      style={{ backgroundColor: 'var(--bg)' }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'min(640px, 80vw)',
          height: 'min(640px, 80vw)',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(255,85,0,0.16), rgba(199,125,255,0.10) 40%, transparent 65%)',
          filter: 'blur(48px)',
        }}
      />

      <div
        className="relative z-10 mx-auto max-w-[680px] text-center"
        style={{
          opacity: isInView ? 1 : 0,
          transform: isInView ? 'translateY(0)' : 'translateY(24px)',
          transition: `opacity 0.7s cubic-bezier(${easeEnter.join(',')}) 0s, transform 0.7s cubic-bezier(${easeEnter.join(',')}) 0s`,
        }}
      >
        <h2
          className="font-sans font-bold tracking-[-0.025em]"
          style={{
            fontSize: 'clamp(2rem, 4.5vw, 3.4rem)',
            color: 'var(--fg)',
            lineHeight: 1.05,
          }}
        >
          Take a problem, return&nbsp;
          <span style={{ color: 'var(--orange)' }}>infrastructure</span>.
        </h2>

        <p
          className="mx-auto mt-5 max-w-[520px] font-sans text-[15px] leading-[1.65]"
          style={{ color: 'var(--fg-2)' }}
        >
          Backend systems, agents, dev tooling. Contract or full-time. Quiet collaborators preferred.
        </p>

        <Link
          to="/contact"
          className="mt-8 inline-block font-mono text-[12px] transition-all duration-200"
          style={{
            color: 'var(--fg)',
            border: '1px solid rgba(255,85,0,0.5)',
            padding: '12px 26px',
            backgroundColor: 'rgba(255,85,0,0.05)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--orange)';
            e.currentTarget.style.backgroundColor = 'rgba(255,85,0,0.12)';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(255,85,0,0.5)';
            e.currentTarget.style.backgroundColor = 'rgba(255,85,0,0.05)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          start a conversation &rarr;
        </Link>
      </div>
    </section>
  );
}
