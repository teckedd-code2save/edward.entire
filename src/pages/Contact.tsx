import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ContactForm from '@/components/contact/ContactForm';
import ContactGrid from '@/components/contact/ContactGrid';
import AvailabilityStatus from '@/components/contact/AvailabilityStatus';
import DirectContactLinks from '@/components/contact/DirectContactLinks';
import CVDownload from '@/components/contact/CVDownload';
import LiveClock from '@/components/contact/LiveClock';
import WorkingHours from '@/components/contact/WorkingHours';
import SectionLabel from '@/components/SectionLabel';

const easeEnter = [0.0, 0, 0.2, 1] as [number, number, number, number];

// Page header animation wrapper
function HeaderAnimation({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay, ease: easeEnter }}
    >
      {children}
    </motion.div>
  );
}

export default function Contact() {
  const headerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: headerRef,
    offset: ['start start', 'end start'],
  });
  const orbY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div>
      {/* ─────────────── Section 1: Cinematic Page Header ─────────────── */}
      <section
        ref={headerRef}
        className="relative w-full overflow-hidden"
        style={{
          backgroundColor: 'var(--bg)',
          paddingTop: '180px',
          paddingBottom: '80px',
        }}
      >
        <motion.div
          aria-hidden
          className="blob-drift pointer-events-none absolute"
          style={{
            y: orbY,
            top: '-15%',
            left: '-10%',
            width: 'min(640px, 80vw)',
            height: 'min(640px, 80vw)',
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(199,125,255,0.26), rgba(199,125,255,0.06) 40%, transparent 65%)',
            filter: 'blur(40px)',
          }}
        />
        <motion.div
          aria-hidden
          className="blob-drift pointer-events-none absolute"
          style={{
            y: orbY,
            top: '15%',
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

        <div className="relative z-10 mx-auto max-w-[1200px] px-5 md:px-10">
          {/* Breadcrumb */}
          <HeaderAnimation>
            <div className="mb-6 flex items-center gap-3">
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
                edward twumasi <span style={{ color: 'var(--fg-4)' }}>/</span> contact
              </span>
              <span
                className="h-px w-24"
                style={{
                  background:
                    'linear-gradient(90deg, rgba(255,85,0,0.5), rgba(199,125,255,0.25), transparent)',
                }}
              />
            </div>
          </HeaderAnimation>

          {/* Heading */}
          <HeaderAnimation delay={0.1}>
            <h1
              className="font-sans font-bold tracking-[-0.03em]"
              style={{
                fontSize: 'clamp(3rem, 8vw, 6.6rem)',
                color: 'var(--fg)',
                lineHeight: 0.98,
              }}
            >
              Open a&nbsp;
              <span style={{ color: 'var(--orange)' }}>line</span>
              <span style={{ color: 'var(--mauve)' }}>.</span>
            </h1>
          </HeaderAnimation>

          {/* Subtext */}
          <HeaderAnimation delay={0.25}>
            <p
              className="mt-7 font-sans font-light leading-[1.45]"
              style={{
                fontSize: 'clamp(1.05rem, 1.8vw, 1.35rem)',
                color: 'var(--fg-2)',
                maxWidth: '600px',
              }}
            >
              Systems problem, tooling brief, or research collab — drop a line and I&apos;ll get
              back inside a day.
            </p>
          </HeaderAnimation>
        </div>
      </section>

      {/* ─────────────── Section 2: Contact Grid (2×2 cards) ─────────────── */}
      <section
        className="w-full"
        style={{
          paddingTop: '40px',
          paddingBottom: '40px',
        }}
      >
        <div className="mx-auto max-w-[1200px] px-5 md:px-10">
          <ContactGrid />
        </div>
      </section>

      {/* ─────────────── Section 3: Contact Form + Info (Two-Column) ─────────────── */}
      <section
        className="w-full"
        style={{
          paddingTop: '80px',
          paddingBottom: '80px',
        }}
      >
        <div className="mx-auto max-w-[1200px] px-5 md:px-10">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_380px]">
            {/* Left column — Contact Form */}
            <div>
              <ContactForm />
            </div>

            {/* Right column — Contact Info */}
            <div className="flex flex-col max-lg:order-first">
              <AvailabilityStatus />
              <div className="mt-8">
                <DirectContactLinks />
              </div>
              <CVDownload />
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────── Section 4: Location & Time ─────────────── */}
      <section
        className="w-full"
        style={{
          backgroundColor: 'var(--bg-1)',
          paddingTop: '80px',
          paddingBottom: '80px',
        }}
      >
        <div className="mx-auto max-w-[1200px] px-5 md:px-10">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-8% 0px' }}
            transition={{ duration: 0.7, ease: easeEnter }}
          >
            <SectionLabel number="02" text="location" />
            <h2
              className="font-sans font-bold tracking-[-0.025em]"
              style={{
                fontSize: 'clamp(2rem, 4.5vw, 3.4rem)',
                color: 'var(--fg)',
                lineHeight: 1.05,
                marginBottom: '40px',
              }}
            >
              Accra<span style={{ color: 'var(--orange)' }}>.</span>
            </h2>
          </motion.div>

          {/* Two-column: Clock + Working Hours */}
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            <LiveClock />
            <WorkingHours />
          </div>
        </div>
      </section>

      {/* ─────────────── Section 5: CV Download CTA ─────────────── */}
      <section
        className="relative w-full overflow-hidden"
        style={{
          paddingTop: '90px',
          paddingBottom: '140px',
        }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute"
          style={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 'min(560px, 80vw)',
            height: 'min(560px, 80vw)',
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(199,125,255,0.12), rgba(255,85,0,0.10) 40%, transparent 65%)',
            filter: 'blur(48px)',
          }}
        />
        <div className="relative z-10 mx-auto max-w-[1200px] px-5 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-8% 0px' }}
            transition={{ duration: 0.7, ease: easeEnter }}
            className="flex flex-col items-center text-center"
          >
            <div
              className="mb-4 font-mono uppercase tracking-[0.22em]"
              style={{ fontSize: '10px', color: 'var(--fg-3)' }}
            >
              resume
            </div>
            <h3
              className="font-sans font-bold tracking-[-0.025em]"
              style={{
                fontSize: 'clamp(1.6rem, 3.5vw, 2.6rem)',
                color: 'var(--fg)',
                marginBottom: '24px',
                lineHeight: 1.05,
              }}
            >
              Want the&nbsp;<span style={{ color: 'var(--mauve)' }}>full ledger</span>?
            </h3>
            <motion.a
              href="https://drive.google.com/file/d/1JOOIvOaqkOIb2CNFp-2q66To6ef7sg1P/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 font-mono"
              style={{
                fontSize: '12px',
                fontWeight: 500,
                letterSpacing: '0.08em',
                color: 'var(--fg)',
                border: '1px solid rgba(255,85,0,0.5)',
                backgroundColor: 'rgba(255,85,0,0.05)',
                padding: '14px 32px',
              }}
              whileHover={{
                y: -2,
                borderColor: 'var(--orange)',
                backgroundColor: 'rgba(255,85,0,0.12)',
                transition: { duration: 0.2 },
              }}
            >
              Download CV
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform group-hover:translate-x-0.5"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
