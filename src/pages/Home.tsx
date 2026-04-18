import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import ScrollReveal from '@/components/ScrollReveal';
import SectionLabel from '@/components/SectionLabel';
import ParticleField from '@/components/ParticleField';

/* ─────────────────────── helpers ─────────────────────── */

const easeEnter = [0.0, 0, 0.2, 1] as [number, number, number, number];

function Tag({ text }: { text: string }) {
  return (
    <span
      className="inline-block cursor-default font-mono text-[9px] uppercase tracking-wide text-[var(--fg-3)] transition-all duration-200 hover:-translate-y-px hover:border-[var(--border-2)] hover:text-[var(--fg-2)]"
      style={{ border: '1px solid var(--border)', padding: '3px 7px' }}
    >
      {text}
    </span>
  );
}

/* ═══════════════════ HERO SECTION ═══════════════════ */

function HeroSection() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollIndicatorOpacity = scrollY > 100 ? 0 : 1;

  return (
    <section className="relative min-h-[100dvh] overflow-hidden">
      {/* 3D Particle Background */}
      <ParticleField />

      {/* Content Overlay */}
      <div
        className="relative z-10 flex min-h-[100dvh] flex-col justify-end px-5 pb-16 md:px-10 md:pb-20"
        style={{ maxWidth: 640 }}
      >
        <motion.span
          className="mb-3 font-mono text-[11px] tracking-[0.1em] text-[var(--fg-3)]"
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: easeEnter }}
        >
          // senior backend &amp; systems engineer
        </motion.span>

        <motion.h1
          className="font-mono font-bold leading-[1.05] tracking-[-0.025em] text-[var(--fg)]"
          style={{ fontSize: 'clamp(2.4rem, 5vw, 4.5rem)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5, ease: easeEnter }}
        >
          Edward Twumasi
        </motion.h1>

        <motion.p
          className="mt-4 max-w-[520px] font-sans text-[15px] leading-[1.7] text-[rgba(255,255,255,0.82)]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: easeEnter }}
        >
          Production-grade backend systems, developer tooling, and AI workflows — with a focus on reliability, throughput, and operational clarity.
        </motion.p>

        <motion.div
          className="mt-5 flex items-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9, ease: easeEnter }}
        >
          <span className="relative flex h-2 w-2">
            <span
              className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
              style={{ backgroundColor: 'var(--terminal-green)' }}
            />
            <span
              className="relative inline-flex h-2 w-2 rounded-full"
              style={{ backgroundColor: 'var(--terminal-green)' }}
            />
          </span>
          <span className="font-mono text-[11px] text-[var(--fg-3)]">
            Open to collaborate
          </span>
        </motion.div>

        <motion.div
          className="mt-7 flex flex-wrap gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.0, ease: easeEnter }}
        >
          {[
            { label: 'github', href: 'https://github.com/teckedd-code2save' },
            { label: 'linkedin', href: 'https://linkedin.com/in/edward-twumasi' },
            { label: 'company', href: 'https://serendepifydev.vercel.app' },
            { label: 'email', href: 'mailto:edwardktwumasi1000@gmail.com' },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group font-mono text-[11px] text-[var(--fg-2)] transition-all duration-250"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: 2 }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--fg)';
                e.currentTarget.style.borderColor = 'var(--accent)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--fg-2)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {link.label}
            </a>
          ))}
        </motion.div>
      </div>

      {/* Profile Photo */}
      <motion.div
        className="absolute right-10 top-[120px] z-10 hidden lg:block"
        style={{ width: 200, height: 200 }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 1.1, ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number] }}
      >
        <div
          className="group relative h-full w-full cursor-pointer transition-all duration-300"
          style={{
            borderRadius: '46% 54% 52% 48% / 42% 44% 56% 58%',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = '0 18px 40px rgba(79,93,255,0.16)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          {/* Accent ring */}
          <div
            className="absolute -inset-1.5 -z-10"
            style={{
              borderRadius: '46% 54% 52% 48% / 42% 44% 56% 58%',
              background: 'radial-gradient(circle, #6f7cff, #4f5dff, #2837d9)',
              transform: 'rotate(-10deg)',
              opacity: 0.8,
            }}
          />
          {/* Decorative ring */}
          <div
            className="absolute -inset-2 -z-10"
            style={{
              borderRadius: '46% 54% 52% 48% / 42% 44% 56% 58%',
              border: '1px solid rgba(255,255,255,0.08)',
              transform: 'rotate(8deg)',
            }}
          />
          <img
            src="./profile-photo.jpg"
            alt="Edward Twumasi"
            className="h-full w-full object-cover transition-all duration-500"
            style={{
              borderRadius: '46% 54% 52% 48% / 42% 44% 56% 58%',
              filter: 'grayscale(1) brightness(1.04)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.filter = 'grayscale(0.22) brightness(1.04)';
              e.currentTarget.style.transform = 'scale(1.06)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.filter = 'grayscale(1) brightness(1.04)';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          />
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center"
        style={{ opacity: scrollIndicatorOpacity, transition: 'opacity 0.3s' }}
      >
        <div className="relative h-10 w-px overflow-hidden" style={{ backgroundColor: 'rgba(255,255,255,0.25)' }}>
          <div
            className="absolute left-1/2 h-1 w-1 -translate-x-1/2 rounded-full animate-scroll-line"
            style={{ backgroundColor: 'var(--fg)' }}
          />
        </div>
        <span className="mt-2 font-mono text-[9px]" style={{ color: 'rgba(255,255,255,0.3)' }}>
          scroll
        </span>
      </motion.div>
    </section>
  );
}

/* ═══════════════ FEATURED PROJECTS ═══════════════ */

const projects = [
  {
    number: '01',
    tag: 'agent-native ops',
    title: 'OpsMesh',
    desc: 'Agent-native operations platform built on OpenClaw. Gig Radar polls job sources, scores via reasoning, fires alerts.',
    stack: ['OpenClaw', 'Agent Runtime', 'Telegram API'],
    live: null,
  },
  {
    number: '02',
    tag: 'deployment intel',
    title: 'Shipd',
    desc: 'Repo-aware deployment planning. Scans for deployment signals, scores platforms, produces evidence-backed plans.',
    stack: ['GitHub API', 'Static Analysis', 'Platform Scoring'],
    live: 'https://shipd-seven.vercel.app/',
  },
  {
    number: '03',
    tag: 'agent commerce',
    title: 'MPP Studio',
    desc: 'Developer console for the Machine Payments Protocol. Sandbox 402 flows, service contracts, agent-to-agent payments.',
    stack: ['MPP', 'HTTP 402', 'Sandbox'],
    live: 'https://agent-exchange-web.vercel.app/',
  },
  {
    number: '04',
    tag: 'browser tooling',
    title: 'Website Media Capture MCP',
    desc: 'Browser automation MCP for screenshots and recordings from live websites in repeatable workflows.',
    stack: ['MCP', 'Browser Automation'],
    live: 'https://teckedd-code2save.github.io/website-media-capture-mcp/',
  },
];

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  return (
    <ScrollReveal delay={index * 0.12} translateY={32} duration={0.7}>
      <a
        href={project.live ?? '#'}
        target={project.live ? '_blank' : undefined}
        rel={project.live ? 'noopener noreferrer' : undefined}
        className="group block h-full transition-all duration-350"
        style={{
          backgroundColor: 'var(--bg-2)',
          border: '1px solid var(--border)',
          borderTop: '2px solid var(--accent)',
          padding: 32,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-6px)';
          e.currentTarget.style.boxShadow = '0 20px 60px rgba(79,93,255,0.08)';
          e.currentTarget.style.borderColor = 'var(--border-2)';
          e.currentTarget.style.backgroundColor = 'var(--bg-3)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = 'none';
          e.currentTarget.style.borderColor = 'var(--border)';
          e.currentTarget.style.backgroundColor = 'var(--bg-2)';
        }}
      >
        <div className="flex h-full flex-col justify-between">
          <div>
            <div className="flex items-start justify-between">
              <span className="font-mono text-[10px] text-[var(--fg-4)]">{project.number}</span>
              <Tag text={project.tag} />
            </div>
            <h3 className="mt-4 font-mono text-[22px] font-medium text-[var(--fg)]">
              {project.title}
            </h3>
            <p
              className="mt-3 font-sans text-[13px] leading-[1.75] text-[rgba(255,255,255,0.72)] line-clamp-3"
            >
              {project.desc}
            </p>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {project.stack.map((s) => (
              <Tag key={s} text={s} />
            ))}
          </div>
        </div>
      </a>
    </ScrollReveal>
  );
}

function FeaturedProjectsSection() {
  return (
    <section className="mx-auto max-w-[1200px] px-5 py-[72px] md:px-10 md:py-[120px]" style={{ background: 'var(--bg)' }}>
      <ScrollReveal>
        <SectionLabel number="01" text="WORK" />
      </ScrollReveal>
      <ScrollReveal delay={0.1}>
        <h2
          className="font-mono font-bold tracking-[-0.02em] text-[var(--fg)]"
          style={{ fontSize: 'clamp(28px, 3.5vw, 48px)', lineHeight: 1.05 }}
        >
          Selected Projects
        </h2>
      </ScrollReveal>
      <ScrollReveal delay={0.15}>
        <p className="mt-2 font-sans text-sm text-[var(--fg-3)]">
          Systems, tools, and protocols built for production.
        </p>
      </ScrollReveal>

      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
        {projects.map((p, i) => (
          <ProjectCard key={p.number} project={p} index={i} />
        ))}
      </div>

      <ScrollReveal delay={0.4}>
        <div className="mt-10 flex justify-end">
          <Link
            to="/projects"
            className="inline-block font-mono text-xs text-[var(--fg-3)] transition-all duration-200"
            style={{ borderBottom: '1px solid var(--border)', paddingBottom: 2 }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--fg)';
              e.currentTarget.style.borderColor = 'var(--accent)';
              e.currentTarget.style.transform = 'translateX(4px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--fg-3)';
              e.currentTarget.style.borderColor = 'var(--border)';
              e.currentTarget.style.transform = 'translateX(0)';
            }}
          >
            View all projects &rarr;
          </Link>
        </div>
      </ScrollReveal>
    </section>
  );
}

/* ═══════════════ TECH STACK VISUALIZATION ═══════════════ */

const techNodes = [
  { name: 'Go', color: '#00ADD8', angle: -90 },
  { name: 'TypeScript', color: '#3178C6', angle: -45 },
  { name: 'Python', color: '#3776AB', angle: 0 },
  { name: 'PostgreSQL', color: '#336791', angle: 45 },
  { name: 'Redis', color: '#DC382D', angle: 90 },
  { name: 'Docker', color: '#2496ED', angle: 135 },
  { name: 'Kubernetes', color: '#326CE5', angle: 180 },
  { name: 'AWS', color: '#FF9900', angle: 225 },
];

function TechStackSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-10% 0px' });

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ backgroundColor: 'var(--bg-1)', padding: '120px 0' }}
    >
      <div className="mx-auto max-w-[1200px] px-5 md:px-10">
        <ScrollReveal>
          <SectionLabel number="02" text="STACK" />
        </ScrollReveal>

        <div className="flex flex-col items-start gap-12 lg:flex-row lg:items-center">
          {/* Text content */}
          <div className="max-w-[320px] shrink-0">
            <ScrollReveal delay={0.1}>
              <h2
                className="font-mono font-bold tracking-[-0.02em] text-[var(--fg)]"
                style={{ fontSize: 'clamp(28px, 3.5vw, 48px)', lineHeight: 1.05 }}
              >
                The Stack
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <p className="mt-4 font-sans text-sm leading-[1.75] text-[var(--fg-2)]">
                Go for systems. TypeScript for tooling. Python for AI workflows. PostgreSQL for persistence. Deployed on AWS, orchestrated with Kubernetes, containerized with Docker.
              </p>
            </ScrollReveal>
          </div>

          {/* Tech Hub Visualization */}
          <div className="relative flex flex-1 items-center justify-center" style={{ minHeight: 400 }}>
            <svg
              viewBox="0 0 400 400"
              className="w-full max-w-[500px]"
              style={{ overflow: 'visible' }}
            >
              {/* Connection lines */}
              {techNodes.map((node, i) => {
                const rad = (node.angle * Math.PI) / 180;
                const x2 = 200 + 130 * Math.cos(rad);
                const y2 = 200 + 130 * Math.sin(rad);
                return (
                  <line
                    key={`line-${i}`}
                    x1={200}
                    y1={200}
                    x2={x2}
                    y2={y2}
                    stroke="rgba(255,255,255,0.08)"
                    strokeWidth={1}
                    strokeDasharray="4 4"
                    style={{
                      opacity: isInView ? 1 : 0,
                      transition: `opacity 0.6s ease ${0.4 + i * 0.08}s`,
                    }}
                  />
                );
              })}

              {/* Satellite nodes */}
              {techNodes.map((node, i) => {
                const rad = (node.angle * Math.PI) / 180;
                const cx = 200 + 130 * Math.cos(rad);
                const cy = 200 + 130 * Math.sin(rad);
                return (
                  <g
                    key={`node-${i}`}
                    style={{
                      opacity: isInView ? 1 : 0,
                      transform: isInView ? 'scale(1)' : 'scale(0)',
                      transformOrigin: `${cx}px ${cy}px`,
                      transition: `all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) ${0.5 + i * 0.08}s`,
                    }}
                  >
                    <circle
                      cx={cx}
                      cy={cy}
                      r={18}
                      fill={`${node.color}26`}
                      stroke="rgba(255,255,255,0.2)"
                      strokeWidth={1}
                    />
                    <text
                      x={cx}
                      y={cy + 32}
                      textAnchor="middle"
                      className="font-mono"
                      fill="var(--fg-3)"
                      fontSize={10}
                    >
                      {node.name}
                    </text>
                  </g>
                );
              })}

              {/* Central hub */}
              <g
                style={{
                  opacity: isInView ? 1 : 0,
                  transform: isInView ? 'scale(1)' : 'scale(0)',
                  transformOrigin: '200px 200px',
                  transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s',
                }}
              >
                <circle
                  cx={200}
                  cy={200}
                  r={24}
                  fill="var(--accent)"
                  style={{
                    filter: 'drop-shadow(0 0 20px rgba(79,93,255,0.5))',
                  }}
                />
                <text
                  x={200}
                  y={200 + 44}
                  textAnchor="middle"
                  className="font-mono"
                  fill="var(--fg)"
                  fontSize={12}
                  fontWeight={500}
                >
                  Core Stack
                </text>
              </g>

              {/* Traveling packet dots */}
              {isInView &&
                techNodes.map((node, i) => {
                  const rad = (node.angle * Math.PI) / 180;
                  const x2 = 200 + 130 * Math.cos(rad);
                  const y2 = 200 + 130 * Math.sin(rad);
                  return (
                    <circle
                      key={`packet-${i}`}
                      r={3}
                      fill="var(--accent)"
                      opacity={0.6}
                    >
                      <animateMotion
                        dur={`${2 + Math.random() * 2}s`}
                        repeatCount="indefinite"
                        path={`M200,200 L${x2},${y2}`}
                      />
                    </circle>
                  );
                })}
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════ PACKAGES SECTION ═══════════════ */

const packages = [
  {
    name: '@teckedd-code2save/datafy',
    description:
      'MCP database gateway for AI development tools. Gives agents and editors a minimal, production-usable path into 7 relational and search backends — PostgreSQL, MySQL, SQLite, Redis, Elasticsearch, SQL Server, MariaDB — via two core tools: execute_sql and search_objects. Zero external dependencies.',
    stack: ['MCP Protocol', 'Node.js', 'PostgreSQL', 'Redis', 'Elasticsearch'],
    link: 'https://www.npmjs.com/package/@teckedd-code2save/datafy',
  },
  {
    name: '@teckedd-code2save/b2dp',
    description:
      'CLI orchestrator that converts business specifications into production-grade platform scaffolds. Automates schema design, DB provisioning, ORM setup, integration tests, frontend scaffolding, and IaC — driven by a modular MCP skill system.',
    stack: ['CLI', 'MCP Protocol', 'Node.js', 'Agent Workflow'],
    link: 'https://www.npmjs.com/package/@teckedd-code2save/b2dp',
  },
];

function PackageCard({ pkg, index }: { pkg: typeof packages[0]; index: number }) {
  const scope = pkg.name.split('/')[0];
  const pkgName = pkg.name.split('/')[1];

  return (
    <ScrollReveal delay={index * 0.12} translateY={24}>
      <div
        className="group grid cursor-default gap-6 transition-all duration-200 sm:grid-cols-[1fr_auto]"
        style={{
          backgroundColor: 'var(--bg-2)',
          border: '1px solid var(--border)',
          padding: 36,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateX(4px)';
          e.currentTarget.style.borderColor = 'var(--border-2)';
          e.currentTarget.style.backgroundColor = 'var(--bg-3)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateX(0)';
          e.currentTarget.style.borderColor = 'var(--border)';
          e.currentTarget.style.backgroundColor = 'var(--bg-2)';
        }}
      >
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-mono text-base">
              <span className="text-[var(--fg-3)]">{scope}/</span>
              <span className="text-[var(--fg)]">{pkgName}</span>
            </span>
            <Tag text="npm" />
          </div>
          <p className="mt-4 font-sans text-[13px] leading-[1.75] text-[rgba(255,255,255,0.72)]">
            {pkg.description}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {pkg.stack.map((s) => (
              <Tag key={s} text={s} />
            ))}
          </div>
        </div>
        <div className="flex items-start">
          <a
            href={pkg.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block whitespace-nowrap font-mono text-[11px] text-[var(--fg-3)] transition-all duration-200"
            style={{ border: '1px solid var(--border-2)', padding: '8px 18px' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--accent)';
              e.currentTarget.style.color = 'var(--fg)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-2)';
              e.currentTarget.style.color = 'var(--fg-3)';
            }}
          >
            npm &nearr;
          </a>
        </div>
      </div>
    </ScrollReveal>
  );
}

function PackagesSection() {
  return (
    <section className="mx-auto max-w-[1200px] px-5 py-[72px] md:px-10 md:py-[120px]" style={{ background: 'var(--bg)' }}>
      <ScrollReveal>
        <SectionLabel number="02" text="PACKAGES" />
      </ScrollReveal>
      <ScrollReveal delay={0.1}>
        <h2
          className="font-mono font-bold tracking-[-0.02em] text-[var(--fg)]"
          style={{ fontSize: 'clamp(28px, 3.5vw, 48px)', lineHeight: 1.05 }}
        >
          Open Source
        </h2>
      </ScrollReveal>
      <ScrollReveal delay={0.15}>
        <p className="mt-2 font-sans text-sm text-[var(--fg-3)]">
          Developer tools published to npm. Zero-dependency gateways and CLI orchestrators.
        </p>
      </ScrollReveal>

      <div className="mt-12 flex flex-col gap-6">
        {packages.map((pkg, i) => (
          <PackageCard key={pkg.name} pkg={pkg} index={i} />
        ))}
      </div>
    </section>
  );
}

/* ═══════════════ CREDENTIALS SECTION ═══════════════ */

const credentials = [
  {
    title: 'Getting Started with Terraform for Google Cloud',
    category: 'cloud',
    issuer: 'Google Cloud / Coursera',
    date: 'Mar 2026',
    id: 'QV7GTSK9A0AG',
    tags: ['Terraform', 'GCP', 'IaC'],
  },
  {
    title: 'Foundations of Open Generative AI Engineering',
    category: 'ai',
    issuer: 'Google / Coursera',
    date: 'Feb 2026',
    id: 'YMOK2TV2T0JK',
    tags: ['Generative AI', 'LLMs'],
  },
  {
    title: 'AWS Foundations and Core Services',
    category: 'cloud',
    issuer: 'AWS / Coursera',
    date: 'Feb 2026',
    id: 'CK4LVBUM6CFH',
    tags: ['AWS', 'EC2', 'S3', 'RDS'],
  },
  {
    title: 'Kubernetes From Basics to Guru',
    category: 'devops',
    issuer: 'Coursera',
    date: 'Feb 2026',
    id: 'DFX1W42R91VU',
    tags: ['Kubernetes', 'GitOps', 'Jenkins'],
  },
  {
    title: 'Build a CI/CD Pipeline with Docker',
    category: 'devops',
    issuer: 'Coursera',
    date: 'Jan 2026',
    id: 'KJVWV84YKH9J',
    tags: ['Docker', 'CI/CD', 'GitHub Actions'],
  },
  {
    title: 'B.S. Computer Science',
    category: 'education',
    issuer: 'KNUST',
    date: 'Nov 2021',
    id: null,
    tags: ['Algorithms', 'Data Structures', 'Software Engineering'],
    verifyText: 'completed',
  },
];

function CredentialCard({ cred, index }: { cred: typeof credentials[0]; index: number }) {
  return (
    <ScrollReveal delay={index * 0.08} translateY={16} duration={0.6}>
      <div
        className="group grid cursor-default gap-4 transition-all duration-200 sm:grid-cols-[1fr_auto]"
        style={{
          padding: '28px 0',
          borderBottom: '1px solid var(--border)',
          borderLeft: '2px solid transparent',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateX(4px)';
          e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.015)';
          e.currentTarget.style.borderLeftColor = 'var(--accent)';
          e.currentTarget.style.paddingLeft = '12px';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateX(0)';
          e.currentTarget.style.backgroundColor = 'transparent';
          e.currentTarget.style.borderLeftColor = 'transparent';
          e.currentTarget.style.paddingLeft = '0';
        }}
      >
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="font-mono text-sm font-medium text-[var(--fg)]">
              {cred.title}
            </h3>
            <Tag text={cred.category} />
          </div>
          <p className="mt-1.5 font-mono text-[11px] text-[var(--fg-2)]">
            {cred.issuer}
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <span className="font-mono text-[10px] text-[var(--fg-3)]">{cred.date}</span>
            {cred.id && (
              <span className="font-mono text-[10px] text-[var(--fg-4)]">ID: {cred.id}</span>
            )}
            <div className="flex flex-wrap gap-1.5">
              {cred.tags.map((t) => (
                <span key={t} className="font-mono text-[8px] uppercase text-[var(--fg-4)]">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-center">
          {'verifyText' in cred && cred.verifyText ? (
            <span className="font-mono text-[11px] text-[var(--terminal-green)]">
              {cred.verifyText}
            </span>
          ) : (
            <span className="font-mono text-[11px] text-[var(--fg-4)] group-hover:text-[var(--fg-3)] transition-colors">
              verify &nearr;
            </span>
          )}
        </div>
      </div>
    </ScrollReveal>
  );
}

function CredentialsSection() {
  return (
    <section className="mx-auto max-w-[1200px] px-5 py-[72px] md:px-10 md:py-[120px]" style={{ background: 'var(--bg-1)' }}>
      <ScrollReveal>
        <SectionLabel number="03" text="CREDENTIALS" />
      </ScrollReveal>
      <ScrollReveal delay={0.1}>
        <h2
          className="font-mono font-bold tracking-[-0.02em] text-[var(--fg)]"
          style={{ fontSize: 'clamp(28px, 3.5vw, 48px)', lineHeight: 1.05 }}
        >
          Certifications &amp; Education
        </h2>
      </ScrollReveal>

      <div className="mt-12">
        {credentials.map((cred, i) => (
          <CredentialCard key={cred.title} cred={cred} index={i} />
        ))}
      </div>
    </section>
  );
}

/* ═══════════════ CONTACT CTA SECTION ═══════════════ */

const contactLinks = [
  { key: 'email', value: 'edwardktwumasi1000@gmail.com', href: 'mailto:edwardktwumasi1000@gmail.com' },
  { key: 'github', value: 'teckedd-code2save', href: 'https://github.com/teckedd-code2save' },
  { key: 'linkedin', value: 'edward-twumasi', href: 'https://linkedin.com/in/edward-twumasi' },
  { key: 'company', value: 'serendepifydev.vercel.app', href: 'https://serendepifydev.vercel.app' },
];

function ContactCTASection() {
  return (
    <section className="relative overflow-hidden px-5 py-[100px] md:py-[160px]" style={{ background: 'var(--bg)' }}>
      {/* Ambient particle echoes */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.08]">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          {[...Array(20)].map((_, i) => (
            <circle
              key={i}
              cx={`${10 + Math.random() * 80}%`}
              cy={`${10 + Math.random() * 80}%`}
              r={1 + Math.random() * 2}
              fill="#4f5dff"
            >
              <animate
                attributeName="cy"
                dur={`${8 + Math.random() * 12}s`}
                values={`${10 + Math.random() * 80}%;${20 + Math.random() * 60}%;${10 + Math.random() * 80}%`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                dur={`${4 + Math.random() * 6}s`}
                values="0.3;0.8;0.3"
                repeatCount="indefinite"
              />
            </circle>
          ))}
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-[600px] text-center">
        <ScrollReveal>
          <SectionLabel number="04" text="REACH OUT" />
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2
            className="mx-auto mt-6 font-mono font-bold tracking-[-0.02em] text-[var(--fg)]"
            style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', lineHeight: 1.05 }}
          >
            Let&apos;s build something.
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="mx-auto mt-4 max-w-[480px] font-sans text-[15px] text-[var(--fg-3)]">
            Open to backend engineering, distributed systems, and AI tooling work.
          </p>
        </ScrollReveal>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {contactLinks.map((link, i) => (
            <ScrollReveal key={link.key} delay={0.3 + i * 0.1} translateY={20}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between font-mono text-[13px] transition-all duration-200"
                style={{
                  border: '1px solid var(--border)',
                  padding: '20px 24px',
                  color: 'var(--fg-3)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-2)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  const val = e.currentTarget.querySelector('.contact-val');
                  if (val) val.classList.add('text-[var(--fg)]');
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <span className="text-[var(--fg-3)]">{link.key}</span>
                <span className="contact-val text-[var(--fg-2)] transition-colors">{link.value}</span>
              </a>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.6}>
          <div className="mt-9">
            <Link
              to="/contact"
              className="inline-block font-mono text-xs text-[var(--fg-3)] transition-all duration-200"
              style={{ borderBottom: '1px solid var(--border)', paddingBottom: 2 }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--fg)';
                e.currentTarget.style.borderColor = 'var(--accent)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--fg-3)';
                e.currentTarget.style.borderColor = 'var(--border)';
              }}
            >
              View full contact page &rarr;
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ═══════════════ HOME PAGE ═══════════════ */

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedProjectsSection />
      <TechStackSection />
      <PackagesSection />
      <CredentialsSection />
      <ContactCTASection />
    </>
  );
}
