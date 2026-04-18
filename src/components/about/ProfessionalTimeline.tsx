import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionLabel from '@/components/SectionLabel';

gsap.registerPlugin(ScrollTrigger);

const milestones = [
  {
    year: '2021',
    title: 'B.S. Computer Science \u2014 KNUST',
    body: 'Graduated with focus on algorithms, data structures, and software engineering principles.',
  },
  {
    year: '2021\u20132023',
    title: 'Early Career',
    body: 'Built foundational experience in backend development, cloud infrastructure, and DevOps practices across multiple projects and teams.',
  },
  {
    year: '2024',
    title: 'Serendepify',
    body: 'Founded serendepify.com \u2014 a platform for building and shipping developer tools. Focus on AI-native workflows and agent-based systems.',
  },
  {
    year: '2025',
    title: 'Open Source & MCP Ecosystem',
    body: 'Published npm packages (@teckedd-code2save/datafy, @teckedd-code2save/b2dp). Building in the Model Context Protocol ecosystem. Shipping tools for agent-to-agent commerce.',
  },
  {
    year: '2026',
    title: 'Systems & Agent Infrastructure',
    body: 'Focusing on distributed systems, agent runtimes, and the infrastructure layer for autonomous AI operations. Open to backend engineering and distributed systems collaborations.',
  },
];

export default function ProfessionalTimeline() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
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

      // Animate each milestone
      itemRefs.current.forEach((itemEl, i) => {
        if (!itemEl) return;
        const nodeEl = nodeRefs.current[i];

        // Fade in content
        gsap.fromTo(
          itemEl,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: itemEl,
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
              backgroundColor: 'var(--accent)',
              duration: 0.4,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: itemEl,
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
      style={{ backgroundColor: 'var(--bg-1)' }}
    >
      <div className="mx-auto max-w-[1200px]">
        {/* Section Header */}
        <SectionLabel number="04" text="timeline" />
        <h2
          className="mb-16 font-sans font-bold tracking-[-0.02em]"
          style={{
            fontSize: 'clamp(28px, 3.5vw, 48px)',
            color: 'var(--fg)',
            lineHeight: 1.05,
          }}
        >
          The Path So Far
        </h2>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div
            className="absolute left-[43px] top-0 hidden h-full w-px origin-top md:block"
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

          {/* Milestones */}
          <div className="flex flex-col gap-14">
            {milestones.map((milestone, i) => (
              <div
                key={milestone.year}
                ref={(el) => { itemRefs.current[i] = el; }}
                className="grid grid-cols-1 gap-4 md:grid-cols-[120px_48px_1fr] md:gap-6"
                style={{ opacity: 0 }}
              >
                {/* Year */}
                <div className="flex items-start md:justify-end">
                  <span
                    className="font-mono text-[12px] font-medium tracking-wide"
                    style={{ color: 'var(--fg-3)' }}
                  >
                    {milestone.year}
                  </span>
                </div>

                {/* Node on timeline */}
                <div className="hidden items-start justify-center md:flex">
                  <div
                    ref={(el) => { nodeRefs.current[i] = el; }}
                    className="h-2.5 w-2.5 flex-shrink-0 rounded-full"
                    style={{
                      backgroundColor: 'rgba(138,138,138,0.3)',
                      marginTop: '3px',
                      boxShadow: '0 0 0 4px var(--bg-1)',
                    }}
                  />
                </div>

                {/* Content */}
                <div>
                  <h3
                    className="font-mono text-[16px] font-medium"
                    style={{ color: 'var(--fg)', lineHeight: 1.3 }}
                  >
                    {milestone.title}
                  </h3>
                  <p
                    className="mt-2 max-w-[640px] font-sans text-[13px] leading-[1.75]"
                    style={{ color: 'rgba(255,255,255,0.72)' }}
                  >
                    {milestone.body}
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
