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
      className="w-full px-5 py-[72px] md:px-10 md:py-[100px]"
      style={{ backgroundColor: 'var(--bg)' }}
    >
      <div
        className="mx-auto max-w-[1200px] text-center"
        style={{
          opacity: isInView ? 1 : 0,
          transform: isInView ? 'translateY(0)' : 'translateY(24px)',
          transition: `opacity 0.7s cubic-bezier(${easeEnter.join(',')}) 0s, transform 0.7s cubic-bezier(${easeEnter.join(',')}) 0s`,
        }}
      >
        <h2
          className="font-sans font-medium"
          style={{
            fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
            color: 'var(--fg)',
            lineHeight: 1.1,
          }}
        >
          Want to work together?
        </h2>

        <p
          className="mx-auto mt-3 max-w-[480px] font-sans text-[14px] leading-[1.7]"
          style={{ color: 'var(--fg-3)' }}
        >
          I&apos;m always interested in systems problems and tool-building
          challenges.
        </p>

        <Link
          to="/contact"
          className="mt-6 inline-block font-mono text-[11px] transition-all duration-200"
          style={{
            color: 'var(--fg-2)',
            border: '1px solid var(--border-2)',
            padding: '10px 22px',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--accent)';
            e.currentTarget.style.color = 'var(--fg)';
            e.currentTarget.style.boxShadow =
              '0 0 20px rgba(79,93,255,0.08)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--border-2)';
            e.currentTarget.style.color = 'var(--fg-2)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          start a conversation &rarr;
        </Link>
      </div>
    </section>
  );
}
