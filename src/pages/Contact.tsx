import { motion } from 'framer-motion';
import ContactForm from '@/components/contact/ContactForm';
import ContactGrid from '@/components/contact/ContactGrid';
import AvailabilityStatus from '@/components/contact/AvailabilityStatus';
import DirectContactLinks from '@/components/contact/DirectContactLinks';
import CVDownload from '@/components/contact/CVDownload';
import LiveClock from '@/components/contact/LiveClock';
import WorkingHours from '@/components/contact/WorkingHours';
import SectionLabel from '@/components/SectionLabel';

// Page header animation wrapper
function HeaderAnimation({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.0, 0, 0.2, 1] as [number, number, number, number],
      }}
    >
      {children}
    </motion.div>
  );
}

export default function Contact() {
  return (
    <div>
      {/* ─────────────── Section 1: Page Header ─────────────── */}
      <section
        className="w-full"
        style={{
          backgroundColor: 'var(--bg)',
          paddingTop: '160px',
          paddingBottom: '60px',
        }}
      >
        <div className="mx-auto max-w-[1200px] px-5 md:px-10">
          {/* Breadcrumb */}
          <HeaderAnimation>
            <div
              className="font-mono"
              style={{
                fontSize: '10px',
                color: '#555',
                letterSpacing: '0.08em',
                marginBottom: '20px',
              }}
            >
              edward twumasi / contact
            </div>
          </HeaderAnimation>

          {/* Heading */}
          <HeaderAnimation delay={0.1}>
            <h1
              className="font-sans font-bold"
              style={{
                fontSize: 'clamp(40px, 5vw, 72px)',
                color: 'var(--fg)',
                letterSpacing: '-0.025em',
                lineHeight: 1.0,
              }}
            >
              Get in Touch
            </h1>
          </HeaderAnimation>

          {/* Subtext */}
          <HeaderAnimation delay={0.25}>
            <p
              className="mt-3 font-sans"
              style={{
                fontSize: '15px',
                color: '#8a8a8a',
                maxWidth: '560px',
                lineHeight: 1.65,
              }}
            >
              If you have a systems problem, a tooling challenge, or just want to talk
              architecture — send a message. I read everything.
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
            transition={{
              duration: 0.7,
              ease: [0.0, 0, 0.2, 1] as [number, number, number, number],
            }}
          >
            <SectionLabel number="02" text="location" />
            <h2
              className="font-sans font-bold"
              style={{
                fontSize: 'clamp(28px, 3.5vw, 48px)',
                color: 'var(--fg)',
                letterSpacing: '-0.02em',
                lineHeight: 1.05,
                marginBottom: '40px',
              }}
            >
              Accra, Ghana
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
        className="w-full"
        style={{
          paddingTop: '60px',
          paddingBottom: '120px',
        }}
      >
        <div className="mx-auto max-w-[1200px] px-5 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-8% 0px' }}
            transition={{
              duration: 0.7,
              ease: [0.0, 0, 0.2, 1] as [number, number, number, number],
            }}
            className="flex flex-col items-center text-center"
          >
            <div
              className="font-mono uppercase"
              style={{
                fontSize: '10px',
                letterSpacing: '0.14em',
                color: 'var(--fg-3)',
                marginBottom: '16px',
              }}
            >
              resume
            </div>
            <h3
              className="font-sans font-bold"
              style={{
                fontSize: 'clamp(18px, 2vw, 24px)',
                color: 'var(--fg)',
                marginBottom: '24px',
              }}
            >
              Want the full picture?
            </h3>
            <motion.a
              href="https://drive.google.com/file/d/1JOOIvOaqkOIb2CNFp-2q66To6ef7sg1P/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 font-mono"
              style={{
                fontSize: '12px',
                fontWeight: 500,
                letterSpacing: '0.06em',
                color: 'var(--fg-2)',
                border: '1px solid var(--border-2)',
                padding: '14px 32px',
              }}
              whileHover={{
                y: -2,
                borderColor: 'var(--accent)',
                color: 'var(--fg)',
                boxShadow: '0 4px 20px var(--accent-glow-soft)',
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
