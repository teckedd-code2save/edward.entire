import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const easeEnter = [0.0, 0, 0.2, 1] as [number, number, number, number];

export default function PageHeader() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const orbY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden px-5 pb-[80px] pt-40 md:px-10 md:pb-[120px] md:pt-[200px]"
      style={{ backgroundColor: 'var(--bg)' }}
    >
      {/* Mauve drift orb */}
      <motion.div
        aria-hidden
        className="blob-drift pointer-events-none absolute"
        style={{
          y: orbY,
          top: '-12%',
          left: '-10%',
          width: 'min(620px, 80vw)',
          height: 'min(620px, 80vw)',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(199,125,255,0.26), rgba(199,125,255,0.06) 40%, transparent 65%)',
          filter: 'blur(40px)',
        }}
      />
      {/* Orange echo */}
      <motion.div
        aria-hidden
        className="blob-drift pointer-events-none absolute"
        style={{
          y: orbY,
          top: '20%',
          right: '-15%',
          width: 'min(620px, 80vw)',
          height: 'min(620px, 80vw)',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(255,85,0,0.22), rgba(255,85,0,0.05) 40%, transparent 65%)',
          filter: 'blur(48px)',
          animationDelay: '-7s',
        }}
      />

      <div className="noise-bg" style={{ opacity: 0.04 }} />

      <div className="relative z-10 mx-auto max-w-[1200px]">
        <motion.div
          className="mb-6 flex items-center gap-3"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: easeEnter }}
        >
          <span
            className="orb-pulse inline-block"
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              backgroundColor: 'var(--orange)',
              boxShadow: '0 0 10px var(--orange-glow)',
            }}
          />
          <span
            className="font-mono text-[10px] uppercase tracking-[0.22em]"
            style={{ color: 'var(--fg-2)' }}
          >
            edward twumasi <span style={{ color: 'var(--fg-4)' }}>/</span> about
          </span>
          <span
            className="h-px w-24"
            style={{
              background:
                'linear-gradient(90deg, rgba(255,85,0,0.5), rgba(199,125,255,0.25), transparent)',
            }}
          />
        </motion.div>

        <motion.h1
          className="font-sans font-bold tracking-[-0.03em] text-[var(--fg)]"
          style={{
            fontSize: 'clamp(3rem, 8vw, 7rem)',
            lineHeight: 0.98,
          }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: easeEnter }}
        >
          Engineer.
          <br />
          <span style={{ color: 'var(--mauve)' }}>Systems</span>
          <span style={{ color: 'var(--fg)' }}>&nbsp;thinker</span>
          <span style={{ color: 'var(--orange)' }}>.</span>
        </motion.h1>

        <motion.p
          className="mt-7 max-w-[620px] font-sans font-light leading-[1.45]"
          style={{
            fontSize: 'clamp(1.05rem, 1.8vw, 1.4rem)',
            color: 'var(--fg-2)',
          }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: easeEnter }}
        >
          Backend, agent runtimes, and developer tooling — built so the systems outlast the
          problems they were meant to solve.
        </motion.p>
      </div>
    </section>
  );
}
