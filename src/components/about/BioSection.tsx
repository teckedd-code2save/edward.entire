import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { Github, Linkedin, Building2, Mail, ExternalLink } from 'lucide-react';

const easeEnter = [0.0, 0, 0.2, 1] as [number, number, number, number];

const facts = [
  { key: 'base', value: 'Accra, Ghana' },
  { key: 'focus', value: 'distributed systems \u00b7 agentic workflows' },
  { key: 'stack', value: 'Go \u00b7 TypeScript \u00b7 Python \u00b7 PostgreSQL' },
  { key: 'status', value: 'open to collaborate' },
];

const socials = [
  { label: 'GitHub', href: 'https://github.com/edtwumasi', icon: Github },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/edward-twumasi', icon: Linkedin },
  { label: 'Company', href: 'https://www.serendepify.com/', icon: Building2 },
  { label: 'Email', href: 'mailto:edward@serendepify.dev', icon: Mail },
];

export default function BioSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-8% 0px' });

  return (
    <section
      className="w-full px-5 py-20 md:px-10"
      style={{ backgroundColor: 'var(--bg)' }}
    >
      <div
        ref={ref}
        className="mx-auto grid max-w-[1200px] grid-cols-1 gap-12 lg:grid-cols-[280px_1fr]"
      >
        {/* Left Column — Profile Photo + Quick Facts */}
        <div>
          {/* Profile Photo with organic blob shape */}
          <div
            className="group relative mx-auto h-[240px] w-[240px] overflow-hidden transition-transform duration-500 hover:scale-[1.02] lg:mx-0"
            style={{
              borderRadius: '60% 40% 55% 45% / 45% 55% 45% 55%',
            }}
          >
            {/* Decorative accent ring */}
            <div
              className="absolute -inset-[3px] z-0"
              style={{
                borderRadius: 'inherit',
                background:
                  'linear-gradient(135deg, var(--accent) 0%, transparent 60%)',
                opacity: 0.6,
              }}
            />
            {/* Outer decorative ring */}
            <div
              className="absolute -inset-[6px] z-0"
              style={{
                borderRadius: 'inherit',
                border: '1px solid var(--border)',
                opacity: 0.4,
              }}
            />
            {/* Image */}
            <img
              src="/profile-cutout.png"
              alt="Edward Twumasi"
              className="relative z-10 h-full w-full object-cover transition-all duration-500 group-hover:grayscale-[0.22]"
              style={{
                borderRadius: 'inherit',
                filter: 'grayscale(1)',
              }}
            />
          </div>

          {/* Quick Facts */}
          <div className="mt-6 flex flex-col gap-3">
            {facts.map((fact, i) => (
              <div
                key={fact.key}
                className="flex items-center gap-3"
                style={{
                  opacity: isInView ? 1 : 0,
                  transform: isInView
                    ? 'translateY(0)'
                    : 'translateY(12px)',
                  transition: `opacity 0.5s cubic-bezier(${easeEnter.join(',')}) ${
                    0.3 + i * 0.06
                  }s, transform 0.5s cubic-bezier(${easeEnter.join(',')}) ${
                    0.3 + i * 0.06
                  }s`,
                }}
              >
                <span
                  className="min-w-[56px] font-mono text-[11px] capitalize"
                  style={{ color: 'var(--fg-4)' }}
                >
                  {fact.key}
                </span>
                <span
                  className="font-mono text-[11px]"
                  style={{ color: 'var(--fg-2)' }}
                >
                  {fact.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column — Bio Text */}
        <div>
          {/* Bio Paragraph 1 */}
          <p
            className="font-sans text-[15px] font-normal leading-[1.75]"
            style={{
              color: 'var(--fg-2)',
              opacity: isInView ? 1 : 0,
              transform: isInView ? 'translateY(0)' : 'translateY(20px)',
              transition: `opacity 0.7s cubic-bezier(${easeEnter.join(',')}) 0.5s, transform 0.7s cubic-bezier(${easeEnter.join(',')}) 0.5s`,
            }}
          >
            I&apos;m Edward Twumasi — a backend and systems engineer based in
            Accra, Ghana. I build production-grade infrastructure, developer
            tooling, and AI workflows with a focus on reliability, throughput,
            and operational clarity.
          </p>

          {/* Bio Paragraph 2 */}
          <p
            className="mt-6 font-sans text-[15px] leading-[1.75]"
            style={{
              color: 'rgba(255,255,255,0.78)',
              opacity: isInView ? 1 : 0,
              transform: isInView ? 'translateY(0)' : 'translateY(20px)',
              transition: `opacity 0.7s cubic-bezier(${easeEnter.join(',')}) 0.62s, transform 0.7s cubic-bezier(${easeEnter.join(',')}) 0.62s`,
            }}
          >
            My work sits at the intersection of distributed systems and agentic
            AI — designing architectures where machines negotiate, settle, and
            operate autonomously. From deployment intelligence to agent commerce
            protocols, I build systems that make complex operations feel simple.
          </p>

          {/* Social Links */}
          <div
            className="mt-8 flex flex-wrap items-center gap-5"
            style={{
              opacity: isInView ? 1 : 0,
              transform: isInView ? 'translateY(0)' : 'translateY(16px)',
              transition: `opacity 0.6s cubic-bezier(${easeEnter.join(',')}) 0.9s, transform 0.6s cubic-bezier(${easeEnter.join(',')}) 0.9s`,
            }}
          >
            {socials.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-1.5 font-mono text-[11px] transition-all duration-250"
                  style={{
                    color: 'var(--fg-2)',
                    borderBottom: '1px solid var(--border-2)',
                    paddingBottom: '2px',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--fg)';
                    e.currentTarget.style.borderColor = 'var(--accent)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--fg-2)';
                    e.currentTarget.style.borderColor = 'var(--border-2)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <Icon size={12} />
                  <span>{social.label}</span>
                  <ExternalLink
                    size={10}
                    className="ml-0.5 opacity-50 transition-opacity group-hover:opacity-100"
                  />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
