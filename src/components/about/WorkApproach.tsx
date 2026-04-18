import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionLabel from '@/components/SectionLabel';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    num: '01',
    title: 'Understand',
    body: 'Map the problem space. Talk to stakeholders. Read the existing code. Understand constraints before proposing solutions.',
  },
  {
    num: '02',
    title: 'Design',
    body: 'Architect the system. Define interfaces. Choose the stack. Plan for failure modes, scale, and observability from day one.',
  },
  {
    num: '03',
    title: 'Build',
    body: 'Implement with tests. Document as I go. Commit often. Keep the feedback loop tight between code and validation.',
  },
  {
    num: '04',
    title: 'Validate',
    body: "Load test. Chaos test. Monitor. Gather real-world data. The system isn't done until it's proven under realistic conditions.",
  },
  {
    num: '05',
    title: 'Evolve',
    body: 'Ship, observe, iterate. Production is the beginning, not the end. Systems grow and adapt as requirements change.',
  },
];

export default function WorkApproach() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const line = lineRef.current;
    if (!section || !line) return;

    const ctx = gsap.context(() => {
      // Animate the vertical line draw
      gsap.fromTo(
        line,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            end: 'bottom 40%',
            scrub: 0.5,
          },
        }
      );

      // Animate each step's node and content
      stepRefs.current.forEach((stepEl, i) => {
        if (!stepEl) return;
        const nodeEl = nodeRefs.current[i];

        // Fade in step content
        gsap.fromTo(
          stepEl,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: stepEl,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );

        // Illuminate node
        if (nodeEl) {
          gsap.fromTo(
            nodeEl,
            { backgroundColor: 'rgba(138,138,138,0.3)' },
            {
              backgroundColor: '#4f5dff',
              duration: 0.4,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: stepEl,
                start: 'top 75%',
                toggleActions: 'play none none none',
              },
            }
          );
        }
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full px-5 py-[72px] md:px-10 md:py-[120px]"
      style={{ backgroundColor: 'var(--bg)' }}
    >
      <div className="mx-auto max-w-[1200px]">
        {/* Section Header */}
        <SectionLabel number="03" text="process" />
        <h2
          className="mb-16 font-mono font-bold tracking-[-0.02em]"
          style={{
            fontSize: 'clamp(28px, 3.5vw, 48px)',
            color: 'var(--fg)',
            lineHeight: 1.05,
          }}
        >
          How I Work
        </h2>

        {/* Timeline Container */}
        <div className="relative">
          {/* Vertical Line */}
          <div
            className="absolute left-[19px] top-0 hidden h-full w-px origin-top sm:block"
            style={{ backgroundColor: 'var(--border)' }}
          >
            <div
              ref={lineRef}
              className="h-full w-full origin-top"
              style={{
                backgroundColor: 'var(--accent)',
                transform: 'scaleY(0)',
              }}
            />
          </div>

          {/* Steps */}
          <div className="flex flex-col gap-12">
            {steps.map((step, i) => (
              <div
                key={step.num}
                ref={(el) => { stepRefs.current[i] = el; }}
                className="grid grid-cols-1 gap-4 sm:grid-cols-[48px_1fr] sm:gap-8"
                style={{ opacity: 0 }}
              >
                {/* Node on timeline */}
                <div className="flex items-start justify-center">
                  <div
                    ref={(el) => { nodeRefs.current[i] = el; }}
                    className="hidden h-2.5 w-2.5 flex-shrink-0 rounded-full sm:block"
                    style={{
                      backgroundColor: 'rgba(138,138,138,0.3)',
                      marginTop: '6px',
                      boxShadow: '0 0 0 4px var(--bg)',
                    }}
                  />
                  {/* Mobile: just show step number */}
                  <span
                    className="font-mono text-[11px] sm:hidden"
                    style={{ color: 'var(--fg-4)' }}
                  >
                    {step.num}
                  </span>
                </div>

                {/* Content */}
                <div>
                  <h3
                    className="font-mono text-[16px] font-medium"
                    style={{ color: 'var(--fg)', lineHeight: 1.3 }}
                  >
                    <span
                      className="mr-2 hidden font-mono text-[11px] sm:inline"
                      style={{ color: 'var(--fg-4)' }}
                    >
                      {step.num} /
                    </span>
                    {step.title}
                  </h3>
                  <p
                    className="mt-2 max-w-[640px] font-sans text-[13px] leading-[1.75]"
                    style={{ color: 'rgba(255,255,255,0.72)' }}
                  >
                    {step.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
