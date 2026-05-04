import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';
import SectionLabel from '@/components/SectionLabel';

const easeEnter = [0.0, 0, 0.2, 1] as [number, number, number, number];

function Tag({ text, tone = 'neutral' }: { text: string; tone?: 'neutral' | 'orange' | 'mauve' }) {
  const color =
    tone === 'orange' ? 'var(--orange)' : tone === 'mauve' ? 'var(--mauve)' : 'var(--fg-3)';
  const border =
    tone === 'orange'
      ? 'rgba(255,85,0,0.45)'
      : tone === 'mauve'
        ? 'rgba(199,125,255,0.45)'
        : 'var(--border)';
  return (
    <span
      className="inline-block font-mono text-[9px] uppercase tracking-wide"
      style={{ border: `1px solid ${border}`, padding: '3px 7px', color }}
    >
      {text}
    </span>
  );
}

/* ══════════════════ HERO ══════════════════ */

function ResearchHero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const orbY = useTransform(scrollYProgress, [0, 1], [0, -120]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden px-5 pb-[100px] pt-[180px] md:px-10 md:pb-[140px] md:pt-[200px]"
      style={{ backgroundColor: 'var(--bg)' }}
    >
      <motion.div
        aria-hidden
        className="blob-drift pointer-events-none absolute"
        style={{
          y: orbY,
          top: '-15%',
          left: '-10%',
          width: 'min(720px, 80vw)',
          height: 'min(720px, 80vw)',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(199,125,255,0.30), rgba(199,125,255,0.08) 35%, transparent 65%)',
          filter: 'blur(40px)',
        }}
      />
      <motion.div
        aria-hidden
        className="blob-drift pointer-events-none absolute"
        style={{
          y: orbY,
          bottom: '-22%',
          right: '-15%',
          width: 'min(820px, 90vw)',
          height: 'min(820px, 90vw)',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(255,85,0,0.28), rgba(255,85,0,0.06) 35%, transparent 65%)',
          filter: 'blur(48px)',
          animationDelay: '-8s',
        }}
      />

      <div className="noise-bg" style={{ opacity: 0.04 }} />

      <div className="relative z-10 mx-auto max-w-[1200px]">
        <motion.div
          className="mb-7 inline-flex items-center gap-3"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easeEnter }}
          style={{
            border: '1px solid rgba(199,125,255,0.4)',
            padding: '6px 14px',
            borderRadius: 999,
            backgroundColor: 'rgba(199,125,255,0.06)',
          }}
        >
          <span
            className="orb-pulse inline-block"
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              backgroundColor: 'var(--mauve)',
              boxShadow: '0 0 12px var(--mauve-glow)',
            }}
          />
          <span
            className="font-mono text-[10px] uppercase tracking-[0.22em]"
            style={{ color: 'var(--fg-2)' }}
          >
            in research · 2025–2027
          </span>
        </motion.div>

        <motion.span
          className="block font-mono text-[10px] uppercase tracking-[0.22em]"
          style={{ color: 'var(--fg-3)' }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: easeEnter }}
        >
          edward twumasi <span style={{ color: 'var(--fg-4)' }}>/</span> research
        </motion.span>

        <motion.h1
          className="mt-5 font-sans font-bold leading-[0.95] tracking-[-0.03em] text-[var(--fg)]"
          style={{ fontSize: 'clamp(3rem, 9vw, 7.6rem)' }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: easeEnter }}
        >
          Intent
          <br />
          <span style={{ color: 'var(--mauve)' }}>Engine</span>
          <span style={{ color: 'var(--orange)' }}>.</span>
        </motion.h1>

        <motion.p
          className="mt-7 max-w-[680px] font-sans font-light leading-[1.45]"
          style={{ fontSize: 'clamp(1.1rem, 2vw, 1.55rem)', color: 'var(--fg-2)' }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: easeEnter }}
        >
          A neural-anchored middleware between human intent and digital action. Solving the
          drift between what you meant to do and what you ended up doing.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-wrap gap-2"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: easeEnter }}
        >
          <Tag text="cognitive science" tone="mauve" />
          <Tag text="android · kotlin" />
          <Tag text="on-device ml" />
          <Tag text="EEG · BCI" tone="mauve" />
          <Tag text="meta TRIBE v2" />
          <Tag text="executorch" />
          <Tag text="nestjs · prisma" />
        </motion.div>
      </div>
    </section>
  );
}

/* ══════════════════ THE PROBLEM ══════════════════ */

function ProblemSection() {
  return (
    <section className="parallax-section" style={{ backgroundColor: 'var(--bg-1)' }}>
      <div className="mx-auto max-w-[1200px] px-5 py-[100px] md:px-10 md:py-[150px]">
        <ScrollReveal>
          <SectionLabel number="01" text="THE PROBLEM" />
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2
            className="font-sans font-bold tracking-[-0.025em] text-[var(--fg)]"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.6rem)', lineHeight: 1.05 }}
          >
            You picked up the phone to pay a bill.
            <br />
            <span style={{ color: 'var(--orange)' }}>Thirty minutes later, you&apos;re in Reels.</span>
          </h2>
        </ScrollReveal>

        <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-2">
          <ScrollReveal delay={0.15}>
            <p
              className="font-sans leading-[1.7] text-[var(--fg-2)]"
              style={{ fontSize: 'clamp(0.98rem, 1.4vw, 1.12rem)' }}
            >
              Every unlock crosses a contextual boundary — a digital doorway — that flushes
              working memory. App icons are engineered for salience. Notification badges
              exploit variable reward schedules. The original task is not forgotten. It is
              actively overwritten.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.25}>
            <p
              className="font-sans leading-[1.7]"
              style={{
                fontSize: 'clamp(0.98rem, 1.4vw, 1.12rem)',
                color: 'var(--fg-2)',
              }}
            >
              This is not a willpower failure. It is a cognitive-architecture failure. Existing
              tools treat the symptom (screen time) instead of the disease
              (intent-action misalignment). What is needed is not another blocker but a&nbsp;
              <span style={{ color: 'var(--mauve)' }}>persistent intent anchor</span>.
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════ COGNITIVE FOUNDATIONS ══════════════════ */

const foundations = [
  {
    n: '01',
    name: 'Prospective Memory',
    tone: 'orange' as const,
    body: 'Remembering to do something later is fragile. Brief delay between intention and execution degrades follow-through — especially under attentional capture.',
    cite: 'Einstein & McDaniel · 1996; Smith · 2003',
  },
  {
    n: '02',
    name: 'Digital Doorway',
    tone: 'mauve' as const,
    body: 'Crossing an event boundary segments experience and reduces accessibility of prior context. The lock-screen unlock is the doorway.',
    cite: 'Radvansky & Copeland · 2006, 2011',
  },
  {
    n: '03',
    name: 'Implementation Intentions',
    tone: 'orange' as const,
    body: '"If X then Y" planning produces a medium-large effect on goal attainment by delegating control to environmental cues. The unlock becomes the cue.',
    cite: 'Gollwitzer · 1993, 1999 · meta d=0.65',
  },
  {
    n: '04',
    name: 'Executive Function',
    tone: 'mauve' as const,
    body: 'Updating, shifting, and inhibition. Digital surfaces overwhelm inhibition; prepotent responses (scroll, tap, watch) win. The Engine acts as an external scaffold.',
    cite: 'Miyake et al. · 2000',
  },
  {
    n: '05',
    name: 'P300 ERP',
    tone: 'orange' as const,
    body: 'A positive deflection ~300ms after a stimulus, marking attention allocation and significance detection. The neural verification signal for intent recognition.',
    cite: 'Sutton et al. · 1965 · Polich · 2007',
  },
];

function FoundationsSection() {
  return (
    <section className="parallax-section" style={{ backgroundColor: 'var(--bg)' }}>
      <div className="mx-auto max-w-[1200px] px-5 py-[100px] md:px-10 md:py-[150px]">
        <ScrollReveal>
          <SectionLabel number="02" text="FOUNDATIONS" />
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <h2
            className="font-sans font-bold tracking-[-0.025em] text-[var(--fg)]"
            style={{ fontSize: 'clamp(2rem, 4.5vw, 3.4rem)', lineHeight: 1.05 }}
          >
            Five validated pieces of&nbsp;
            <span style={{ color: 'var(--mauve)' }}>cognitive science</span>.
          </h2>
        </ScrollReveal>

        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {foundations.map((f, i) => (
            <ScrollReveal key={f.n} delay={i * 0.06} translateY={20}>
              <div
                className="group h-full transition-all duration-300"
                style={{
                  backgroundColor: 'var(--bg-2)',
                  border: '1px solid var(--border)',
                  padding: 28,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.borderColor = 'var(--border-2)';
                  e.currentTarget.style.backgroundColor = 'var(--bg-3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'var(--border)';
                  e.currentTarget.style.backgroundColor = 'var(--bg-2)';
                }}
              >
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-[11px]" style={{ color: 'var(--fg-3)' }}>
                    {f.n}
                  </span>
                  <h3
                    className="font-sans font-medium tracking-[-0.01em]"
                    style={{
                      fontSize: '1.15rem',
                      color: f.tone === 'orange' ? 'var(--orange)' : 'var(--mauve)',
                    }}
                  >
                    {f.name}
                  </h3>
                </div>
                <p
                  className="mt-4 font-sans text-[13.5px] leading-[1.7]"
                  style={{ color: 'var(--fg-2)' }}
                >
                  {f.body}
                </p>
                <p
                  className="mt-4 font-mono text-[10px] uppercase tracking-widest"
                  style={{ color: 'var(--fg-4)' }}
                >
                  {f.cite}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════ THE LOOP ══════════════════ */

const loopNodes = [
  { n: '01', label: 'Screen on',     sub: 'doorway crossed',          tone: 'orange' as const },
  { n: '02', label: 'Intent prompt', sub: 'voice or quick-tap',       tone: 'mauve'  as const },
  { n: '03', label: 'Anchor bubble', sub: 'persistent overlay',       tone: 'orange' as const },
  { n: '04', label: 'Intervention',  sub: 'haptic on drift',          tone: 'mauve'  as const },
  { n: '05', label: 'Resolve',       sub: 'archive · learn',          tone: 'orange' as const },
];

function LoopSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const lineProgress = useTransform(scrollYProgress, [0.2, 0.7], ['0%', '100%']);

  return (
    <section
      ref={ref}
      className="parallax-section"
      style={{ backgroundColor: 'var(--bg-1)' }}
    >
      <div className="mx-auto max-w-[1200px] px-5 py-[100px] md:px-10 md:py-[150px]">
        <ScrollReveal>
          <SectionLabel number="03" text="THE LOOP" />
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <h2
            className="font-sans font-bold tracking-[-0.025em] text-[var(--fg)]"
            style={{ fontSize: 'clamp(2rem, 4.5vw, 3.4rem)', lineHeight: 1.05 }}
          >
            Anchor intent. Detect drift.
            <br />
            <span style={{ color: 'var(--orange)' }}>Intervene before it&apos;s too late</span>.
          </h2>
        </ScrollReveal>

        <div className="relative mt-16 grid grid-cols-2 gap-y-12 md:grid-cols-5 md:gap-y-0">
          <div
            className="pointer-events-none absolute left-[8%] right-[8%] hidden h-px md:block"
            style={{ top: 36, backgroundColor: 'var(--border)' }}
          />
          <motion.div
            className="pointer-events-none absolute left-[8%] hidden h-px md:block"
            style={{
              top: 36,
              width: lineProgress,
              maxWidth: '84%',
              background:
                'linear-gradient(90deg, var(--orange), var(--mauve), var(--orange), var(--mauve), var(--orange))',
              boxShadow: '0 0 14px rgba(255,85,0,0.45)',
            }}
          />

          {loopNodes.map((node, i) => (
            <ScrollReveal key={node.n} delay={i * 0.08} translateY={20}>
              <div className="relative flex flex-col items-center text-center">
                <span
                  className="orb-pulse relative z-[1] flex items-center justify-center"
                  style={{
                    width: 72,
                    height: 72,
                    borderRadius: '50%',
                    border: `1px solid ${node.tone === 'orange' ? 'rgba(255,85,0,0.5)' : 'rgba(199,125,255,0.5)'}`,
                    backgroundColor: 'var(--bg)',
                    color: node.tone === 'orange' ? 'var(--orange)' : 'var(--mauve)',
                    boxShadow:
                      node.tone === 'orange'
                        ? '0 0 28px rgba(255,85,0,0.18)'
                        : '0 0 28px rgba(199,125,255,0.18)',
                    animationDelay: `-${i * 0.6}s`,
                  }}
                >
                  <span className="font-mono text-[11px] tracking-widest">{node.n}</span>
                </span>
                <span
                  className="mt-5 font-sans font-medium"
                  style={{
                    fontSize: '1.05rem',
                    color: 'var(--fg)',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {node.label}
                </span>
                <span
                  className="mt-1 font-mono text-[10px] uppercase tracking-widest"
                  style={{ color: 'var(--fg-3)' }}
                >
                  {node.sub}
                </span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════ TWO PATHS ══════════════════ */

const paths = [
  {
    tone: 'orange' as const,
    badge: 'now',
    title: 'The MVP',
    sub: 'Ships first. Solves the problem with software alone.',
    body: 'Android foreground service captures intent at unlock, before working memory clears. Accessibility service watches the foreground app. On-device MobileBERT scores semantic alignment. A floating bubble holds intent visible across every app. Drift triggers haptic and visual intervention.',
    bullets: [
      'Kotlin · ForegroundService · AccessibilityService',
      'TFLite · MobileBERT-Quantized · 4.3 MB',
      'NestJS API · Postgres + pgvector · BullMQ',
      'Local-first analytics, ε-DP aggregation',
    ],
  },
  {
    tone: 'mauve' as const,
    badge: 'next',
    title: 'The Research Branch',
    sub: 'Validates intent at the neural level, not just self-report.',
    body: 'Muse S streams 4-channel EEG over BLE. Python pipeline runs ICA, band-pass, and feature extraction. A LoRA-fine-tuned PyTorch verifier scores alignment between neural state and declared intent. Lowered to ExecuTorch for sub-50 ms inference on Snapdragon. Meta TRIBE v2 generates synthetic training data and seeds fMRI-to-EEG transfer learning.',
    bullets: [
      'Muse S EEG · 4 channels · 256 Hz',
      'P300 amplitude · θ/β ratio · alpha asymmetry',
      'PyTorch · LoRA fine-tuning · ExecuTorch lowering',
      'Meta TRIBE v2 · IRB-compliant data collection',
    ],
  },
];

function PathsSection() {
  return (
    <section className="parallax-section" style={{ backgroundColor: 'var(--bg)' }}>
      <div className="mx-auto max-w-[1200px] px-5 py-[100px] md:px-10 md:py-[150px]">
        <ScrollReveal>
          <SectionLabel number="04" text="TWO PATHS" />
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <h2
            className="font-sans font-bold tracking-[-0.025em] text-[var(--fg)]"
            style={{ fontSize: 'clamp(2rem, 4.5vw, 3.4rem)', lineHeight: 1.05 }}
          >
            Software-only today.
            <br />
            <span style={{ color: 'var(--mauve)' }}>Neural-validated tomorrow</span>.
          </h2>
        </ScrollReveal>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
          {paths.map((p, i) => (
            <ScrollReveal key={p.title} delay={i * 0.1} translateY={24}>
              <div
                className="flex h-full flex-col"
                style={{
                  backgroundColor: 'var(--bg-2)',
                  border: '1px solid var(--border)',
                  padding: 32,
                }}
              >
                <div className="flex items-center justify-between">
                  <span
                    className="font-mono text-[10px] uppercase tracking-widest"
                    style={{
                      color: p.tone === 'orange' ? 'var(--orange)' : 'var(--mauve)',
                    }}
                  >
                    {p.badge}
                  </span>
                  <Tag text={p.tone === 'orange' ? 'mvp' : 'research'} tone={p.tone} />
                </div>
                <h3
                  className="mt-4 font-sans font-bold tracking-[-0.02em]"
                  style={{
                    fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
                    color: 'var(--fg)',
                    lineHeight: 1.05,
                  }}
                >
                  {p.title}
                </h3>
                <p
                  className="mt-3 font-sans text-[14px] leading-[1.6]"
                  style={{ color: 'var(--fg-2)' }}
                >
                  {p.sub}
                </p>
                <p
                  className="mt-4 font-sans text-[13px] leading-[1.78]"
                  style={{ color: 'var(--fg-3)' }}
                >
                  {p.body}
                </p>
                <ul className="mt-5 flex flex-col gap-2">
                  {p.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-3 font-mono text-[11px]"
                      style={{ color: 'var(--fg-2)' }}
                    >
                      <span
                        style={{
                          color: p.tone === 'orange' ? 'var(--orange)' : 'var(--mauve)',
                          marginTop: 1,
                        }}
                      >
                        ›
                      </span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════ ROADMAP ══════════════════ */

const roadmap = [
  { phase: '01', what: 'Android MVP — capture, anchor, semantic match', when: 'Q3 2025', state: 'planned' as const },
  { phase: '02', what: 'Backend + analytics — heatmaps, success rate',  when: 'Q4 2025', state: 'planned' as const },
  { phase: '03', what: 'LLM insights — weekly pattern analysis',         when: 'Q1 2026', state: 'planned' as const },
  { phase: '04', what: 'iOS port — Screen Time API + Live Activities',   when: 'Q2 2026', state: 'planned' as const },
  { phase: '05', what: 'Muse EEG integration — P300 verification',       when: 'Q3–Q4 2026', state: 'research' as const },
  { phase: '06', what: 'TRIBE v2 — fMRI→EEG transfer learning',          when: '2027',    state: 'research' as const },
  { phase: '07', what: 'ExecuTorch on-device neural pipeline',           when: '2027',    state: 'research' as const },
];

function RoadmapSection() {
  return (
    <section className="parallax-section" style={{ backgroundColor: 'var(--bg-1)' }}>
      <div className="mx-auto max-w-[1200px] px-5 py-[100px] md:px-10 md:py-[150px]">
        <ScrollReveal>
          <SectionLabel number="05" text="ROADMAP" />
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <h2
            className="font-sans font-bold tracking-[-0.025em] text-[var(--fg)]"
            style={{ fontSize: 'clamp(2rem, 4.5vw, 3.4rem)', lineHeight: 1.05 }}
          >
            Seven&nbsp;<span style={{ color: 'var(--orange)' }}>phases</span>, two timelines.
          </h2>
        </ScrollReveal>

        <div className="mt-12 flex flex-col">
          {roadmap.map((r, i) => (
            <ScrollReveal key={r.phase} delay={i * 0.04} translateY={12} duration={0.55}>
              <div
                className="grid items-center gap-4 transition-all duration-200 sm:grid-cols-[60px_1fr_auto_120px]"
                style={{
                  padding: '20px 0',
                  borderTop: i === 0 ? '1px solid var(--border)' : undefined,
                  borderBottom: '1px solid var(--border)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateX(4px)';
                  e.currentTarget.style.backgroundColor =
                    r.state === 'research'
                      ? 'rgba(199,125,255,0.03)'
                      : 'rgba(255,85,0,0.025)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateX(0)';
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <span className="font-mono text-[12px]" style={{ color: 'var(--fg-3)' }}>
                  {r.phase}
                </span>
                <span
                  className="font-sans text-[14.5px] leading-[1.55]"
                  style={{ color: 'var(--fg-2)' }}
                >
                  {r.what}
                </span>
                <span
                  className="font-mono text-[10px] uppercase tracking-widest"
                  style={{ color: 'var(--fg-4)' }}
                >
                  {r.when}
                </span>
                <span
                  className="font-mono text-[10px] uppercase tracking-widest"
                  style={{
                    color: r.state === 'research' ? 'var(--mauve)' : 'var(--orange)',
                    textAlign: 'right',
                  }}
                >
                  {r.state === 'research' ? '· research' : '· planned'}
                </span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════ CTA ══════════════════ */

function ResearchCTA() {
  return (
    <section className="parallax-section relative overflow-hidden" style={{ backgroundColor: 'var(--bg)' }}>
      <div className="pointer-events-none absolute inset-0 opacity-[0.10]">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          {([
            '#C77DFF', '#FF5500', '#C77DFF', '#FF5500', '#C77DFF',
            '#FF5500', '#C77DFF', '#FF5500', '#C77DFF', '#FF5500',
            '#C77DFF', '#FF5500', '#C77DFF', '#FF5500', '#C77DFF',
          ] as const).map((color, i) => (
            <circle
              key={i}
              cx={`${8 + (i * 5.5) % 86}%`}
              cy={`${15 + (i * 7) % 70}%`}
              r={1 + (i % 3) * 0.8}
              fill={color}
            >
              <animate
                attributeName="opacity"
                dur={`${4 + (i % 5) * 1.2}s`}
                values="0.25;0.85;0.25"
                repeatCount="indefinite"
              />
            </circle>
          ))}
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-[680px] px-5 py-[120px] text-center md:py-[160px]">
        <ScrollReveal>
          <SectionLabel number="06" text="OPEN FOR" />
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2
            className="font-sans font-bold tracking-[-0.03em] text-[var(--fg)]"
            style={{ fontSize: 'clamp(2.2rem, 5.5vw, 4rem)', lineHeight: 1 }}
          >
            Research&nbsp;<span style={{ color: 'var(--mauve)' }}>collaborators</span>.
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p
            className="mx-auto mt-6 max-w-[520px] font-sans text-[15px] leading-[1.65]"
            style={{ color: 'var(--fg-2)' }}
          >
            Cognitive neuroscientists, BCI engineers, mobile systems devs. If your work touches
            attention, prospective memory, or neural decoding — talk to me.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.4}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="mailto:edwardktwumasi1000@gmail.com?subject=Intent%20Engine%20Research"
              className="inline-block font-mono text-[12px] transition-all duration-200"
              style={{
                border: '1px solid rgba(199,125,255,0.5)',
                padding: '12px 26px',
                color: 'var(--fg)',
                backgroundColor: 'rgba(199,125,255,0.06)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--mauve)';
                e.currentTarget.style.backgroundColor = 'rgba(199,125,255,0.12)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(199,125,255,0.5)';
                e.currentTarget.style.backgroundColor = 'rgba(199,125,255,0.06)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              email a collaboration brief ↗
            </a>
            <a
              href="https://github.com/teckedd-code2save"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block font-mono text-[12px] transition-all duration-200"
              style={{
                border: '1px solid var(--border-2)',
                padding: '12px 26px',
                color: 'var(--fg-3)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--orange)';
                e.currentTarget.style.color = 'var(--orange)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-2)';
                e.currentTarget.style.color = 'var(--fg-3)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              follow on github ↗
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ══════════════════ PAGE ══════════════════ */

export default function Research() {
  return (
    <>
      <ResearchHero />
      <ProblemSection />
      <FoundationsSection />
      <LoopSection />
      <PathsSection />
      <RoadmapSection />
      <ResearchCTA />
    </>
  );
}
