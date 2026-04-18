import { useRef } from 'react';
import { useInView } from 'framer-motion';
import SectionLabel from '@/components/SectionLabel';

const easeEnter = [0.0, 0, 0.2, 1] as [number, number, number, number];

const philosophyCards = [
  {
    index: '01',
    title: 'Systems over Scripts',
    body: 'I build infrastructure that lasts — modular architectures, clean interfaces, and observable systems. Every component should be replaceable, testable, and understandable.',
  },
  {
    index: '02',
    title: 'Operations as Code',
    body: "Deployment, configuration, and workflows belong in version control. If it can't be automated, reviewed, and rolled back, it's not production-ready.",
  },
  {
    index: '03',
    title: 'Agents as Infrastructure',
    body: "The next generation of backend systems won't just serve requests — they'll negotiate, plan, and settle autonomously. I'm building the protocols and platforms for that future.",
  },
  {
    index: '04',
    title: 'Clarity through Constraints',
    body: 'The best systems emerge from principled limitations. Read-only operations. Decision records. Evidence-based recommendations. Constraints force clarity.',
  },
];

export default function PhilosophySection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-8% 0px' });

  return (
    <section
      className="w-full px-5 py-[72px] md:px-10 md:py-[120px]"
      style={{ backgroundColor: 'var(--bg-1)' }}
    >
      <div ref={ref} className="mx-auto max-w-[1200px]">
        {/* Section Header */}
        <div
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? 'translateY(0)' : 'translateY(24px)',
            transition: `opacity 0.7s cubic-bezier(${easeEnter.join(',')}) 0s, transform 0.7s cubic-bezier(${easeEnter.join(',')}) 0s`,
          }}
        >
          <SectionLabel number="02" text="philosophy" />
          <h2
            className="mb-12 font-mono font-bold tracking-[-0.02em]"
            style={{
              fontSize: 'clamp(28px, 3.5vw, 48px)',
              color: 'var(--fg)',
              lineHeight: 1.05,
            }}
          >
            How I Think About Systems
          </h2>
        </div>

        {/* Philosophy Cards Grid - staggered 2x2 on desktop */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {philosophyCards.map((card, i) => (
            <div
              key={card.index}
              className="group transition-all duration-200"
              style={{
                borderTop: '1px solid var(--border)',
                paddingTop: '24px',
                paddingBottom: '24px',
                opacity: isInView ? 1 : 0,
                transform: isInView ? 'translateY(0)' : 'translateY(24px)',
                transition: `opacity 0.7s cubic-bezier(${easeEnter.join(',')}) ${
                  0.1 * (i + 1)
                }s, transform 0.7s cubic-bezier(${easeEnter.join(',')}) ${
                  0.1 * (i + 1)
                }s, background-color 0.2s`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateX(4px)';
                e.currentTarget.style.backgroundColor =
                  'rgba(255,255,255,0.015)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateX(0)';
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              {/* Title in JetBrains Mono */}
              <h3
                className="font-mono text-[clamp(20px,2vw,28px)] font-medium tracking-[-0.01em]"
                style={{ color: 'var(--fg)', lineHeight: 1.15 }}
              >
                {card.title}
              </h3>

              {/* Body in Inter */}
              <p
                className="mt-3 font-sans text-[14px] leading-[1.65]"
                style={{ color: 'rgba(255,255,255,0.72)' }}
              >
                {card.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
