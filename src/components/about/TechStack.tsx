import { useRef } from 'react';
import { useInView } from 'framer-motion';
import SectionLabel from '@/components/SectionLabel';

const easeEnter = [0.0, 0, 0.2, 1] as [number, number, number, number];

const technologies = [
  {
    name: 'Go',
    description:
      'Primary language for backend services. Concurrent, performant, deployed to production.',
    proficiency: 0.95,
  },
  {
    name: 'TypeScript',
    description:
      'Type-safe application code. Node.js services, React frontends, tool development.',
    proficiency: 0.9,
  },
  {
    name: 'Python',
    description:
      'AI/ML workflows, scripting, data processing. Agent orchestration and automation.',
    proficiency: 0.88,
  },
  {
    name: 'PostgreSQL',
    description:
      'Primary datastore. Schema design, query optimization, migration management.',
    proficiency: 0.9,
  },
  {
    name: 'Redis',
    description:
      'In-memory data store. Caching, session management, real-time data pipelines.',
    proficiency: 0.87,
  },
  {
    name: 'Elasticsearch',
    description:
      'Search and analytics engine. Full-text search, log aggregation, observability.',
    proficiency: 0.82,
  },
  {
    name: 'Docker',
    description:
      'Containerization for all services. Multi-stage builds, compose orchestration.',
    proficiency: 0.92,
  },
  {
    name: 'Kubernetes',
    description:
      'Production orchestration. Helm charts, GitOps, cluster management.',
    proficiency: 0.85,
  },
  {
    name: 'AWS',
    description:
      'Cloud infrastructure. EC2, S3, RDS, IAM, VPC networking.',
    proficiency: 0.88,
  },
  {
    name: 'GCP',
    description:
      'Google Cloud Platform. Terraform IaC, Cloud Run, Cloud Storage, BigQuery.',
    proficiency: 0.8,
  },
  {
    name: 'Cloudflare',
    description:
      'Edge network. CDN, DDoS protection, Workers, DNS, SSL/TLS termination.',
    proficiency: 0.83,
  },
  {
    name: 'Claude / Codex / Kimi',
    description:
      'AI coding agents for development, code review, architecture design, and workflow automation.',
    proficiency: 0.92,
  },
];

export default function TechStack() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-8% 0px' });

  return (
    <section
      className="w-full px-5 py-[72px] md:px-10 md:py-[120px]"
      style={{ backgroundColor: 'var(--bg)' }}
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
          <SectionLabel number="05" text="stack" />
          <h2
            className="mb-12 font-mono font-bold tracking-[-0.02em]"
            style={{
              fontSize: 'clamp(28px, 3.5vw, 48px)',
              color: 'var(--fg)',
              lineHeight: 1.05,
            }}
          >
            Tech Stack Depth
          </h2>
        </div>

        {/* Tech Grid */}
        <div className="grid grid-cols-1 gap-0 sm:grid-cols-2 lg:grid-cols-4">
          {technologies.map((tech, i) => (
            <div
              key={tech.name}
              className="group transition-all duration-200"
              style={{
                borderTop: '1px solid var(--border)',
                padding: '24px 20px',
                opacity: isInView ? 1 : 0,
                transform: isInView ? 'translateY(0)' : 'translateY(20px)',
                transition: `opacity 0.6s cubic-bezier(${easeEnter.join(',')}) ${
                  0.08 * (i + 1)
                }s, transform 0.6s cubic-bezier(${easeEnter.join(',')}) ${
                  0.08 * (i + 1)
                }s, background-color 0.2s`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor =
                  'rgba(255,255,255,0.02)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              {/* Tech Name */}
              <h4
                className="font-mono text-[14px] font-medium tracking-[-0.01em]"
                style={{ color: 'var(--fg)', lineHeight: 1.3 }}
              >
                {tech.name}
              </h4>

              {/* Description */}
              <p
                className="mt-2 font-sans text-[12px] leading-[1.7]"
                style={{ color: 'rgba(255,255,255,0.6)' }}
              >
                {tech.description}
              </p>

              {/* Proficiency Bar */}
              <div className="mt-3 h-px w-full overflow-hidden" style={{ backgroundColor: 'var(--border)' }}>
                <div
                  className="h-full transition-transform duration-700"
                  style={{
                    backgroundColor: 'var(--accent)',
                    width: `${tech.proficiency * 100}%`,
                    transform: isInView ? 'scaleX(1)' : 'scaleX(0)',
                    transformOrigin: 'left',
                    transition: `transform 0.8s cubic-bezier(${easeEnter.join(',')}) ${
                      0.3 + 0.1 * i
                    }s`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
