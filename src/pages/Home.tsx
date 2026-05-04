import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import ScrollReveal from '@/components/ScrollReveal';
import SectionLabel from '@/components/SectionLabel';
import ParticleField from '@/components/ParticleField';

const easeEnter = [0.0, 0, 0.2, 1] as [number, number, number, number];

function Tag({ text }: { text: string }) {
  return (
    <span
      className="inline-block cursor-default font-mono text-[9px] uppercase tracking-wide transition-all duration-200 hover:-translate-y-px"
      style={{
        border: '1px solid var(--border)',
        padding: '3px 7px',
        color: 'var(--fg-3)',
      }}
    >
      {text}
    </span>
  );
}

/* ══════════════════ HERO ══════════════════ */

function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const overlayOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], ['0px', '80px']);
  const overlayScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);

  return (
    <section ref={heroRef} className="relative min-h-[100dvh] overflow-hidden">
      {/* 3D ripple background */}
      <ParticleField />

      {/* Parallax overlay — orange/mauve instead of blue */}
      <motion.div
        className="absolute inset-0 z-[2]"
        style={{
          background:
            'radial-gradient(circle at 50% 40%, rgba(255,85,0,0.07), transparent 45%), linear-gradient(180deg, rgba(0,0,0,0.15), rgba(0,0,0,0.58))',
          opacity: overlayOpacity,
          scale: overlayScale,
        }}
      />

      <motion.div
        className="relative z-10 flex min-h-[100dvh] items-center px-5 py-24 md:px-10"
        style={{ y: textY }}
      >
        <div className="mx-auto w-full max-w-[1240px]">
          {/* Location / context tag */}
          <motion.div
            className="mb-6 flex items-center gap-3"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: easeEnter }}
          >
            <span
              className="font-mono text-[10px] uppercase tracking-widest"
              style={{ color: 'var(--orange)' }}
            >
              Accra, Ghana
            </span>
            <span style={{ color: 'var(--fg-4)', fontSize: 10 }}>·</span>
            <span
              className="font-mono text-[10px] uppercase tracking-widest"
              style={{ color: 'var(--orange)' }}
            >
              @Hubtel
            </span>
          </motion.div>

          <motion.h1
            className="font-sans font-bold leading-[1.02] tracking-[-0.025em] text-[var(--fg)]"
            style={{ fontSize: 'clamp(3.2rem, 8.5vw, 7.5rem)' }}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: easeEnter }}
          >
            Edward Twumasi
          </motion.h1>

          <motion.p
            className="mt-6 max-w-[520px] font-sans font-light leading-[1.5] text-[var(--fg-2)]"
            style={{ fontSize: 'clamp(1rem, 2vw, 1.45rem)' }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: easeEnter }}
          >
            Backend infrastructure. Agent systems. Products that ship.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-wrap items-center gap-7"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7, ease: easeEnter }}
          >
            {[
              { label: 'github', href: 'https://github.com/teckedd-code2save' },
              { label: 'linkedin', href: 'https://linkedin.com/in/edward-twumasi' },
              { label: 'serendepify', href: 'https://www.serendepify.com/' },
              { label: 'email', href: 'mailto:edwardktwumasi1000@gmail.com' },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[11px] uppercase tracking-[0.12em] transition-all duration-250"
                style={{
                  color: 'var(--fg-2)',
                  borderBottom: '1px solid rgba(245,242,237,0.16)',
                  paddingBottom: 2,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--orange)';
                  e.currentTarget.style.borderColor = 'var(--orange)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--fg-2)';
                  e.currentTarget.style.borderColor = 'rgba(245,242,237,0.16)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        style={{ opacity: useTransform(scrollYProgress, [0, 0.15], [1, 0]) }}
      >
        <div className="h-10 w-px overflow-hidden" style={{ backgroundColor: 'rgba(245,242,237,0.15)' }}>
          <div
            className="scroll-line h-full w-full"
            style={{ backgroundColor: 'var(--orange)' }}
          />
        </div>
        <span className="font-mono text-[9px]" style={{ color: 'rgba(245,242,237,0.28)' }}>
          scroll
        </span>
      </motion.div>
    </section>
  );
}

/* ══════════════════ MARQUEE TICKER ══════════════════ */

const tickerItems = [
  'Go', 'TypeScript', 'Python', 'C#', 'React', 'Next.js',
  'PostgreSQL', 'Redis', 'Elasticsearch', 'MongoDB',
  'Docker', 'Kubernetes', 'Terraform', 'GitHub Actions',
  'AWS', 'GCP', 'Hetzner VPS', 'Cloudflare Workers',
  'nginx', 'Caddy', 'MCP Protocol', 'Claude Opus 4.7',
  'TON Blockchain', 'PWA', 'Agent Ops', 'HTTP 402',
];

function MarqueeTicker() {
  const doubled = [...tickerItems, ...tickerItems];

  return (
    <div
      className="relative w-full overflow-hidden border-y"
      style={{
        borderColor: 'var(--border)',
        backgroundColor: 'var(--bg-1)',
        padding: '14px 0',
      }}
    >
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="flex shrink-0 items-center font-mono text-[11px] uppercase tracking-widest"
            style={{ color: 'var(--fg-4)', padding: '0 28px' }}
          >
            {item}
            <span
              className="ml-7"
              style={{ color: 'var(--orange)', fontSize: 10, opacity: 0.5 }}
            >
              ·
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════ FEATURED PROJECTS ══════════════════ */

const featuredProjects = [
  {
    number: '01',
    tag: 'deployment agent',
    title: 'Convoy',
    desc: 'Deployment agent that rehearses the deploy, ships it, and keeps watch — without touching your code. Built for the Claude Code hackathon on Opus 4.7.',
    stack: ['TypeScript', 'Claude Opus 4.7', 'Agent Loop'],
    live: 'https://convoy-home.vercel.app/',
    github: 'https://github.com/teckedd-code2save/convoy',
  },
  {
    number: '02',
    tag: 'developer tools',
    title: 'Serendepify',
    desc: 'Engineering company building MCP-native tools, database gateways (Datafy), and CLI orchestrators (B2DP) for AI-assisted development workflows.',
    stack: ['React', 'TypeScript', 'MCP Protocol', 'Node.js'],
    live: 'https://www.serendepify.com/',
  },
  {
    number: '03',
    tag: 'opportunity tracker',
    title: 'Optimi',
    desc: 'Privacy-first PWA for tracking hackathons, grants, accelerators, and jobs. Everything stays local — AI drafts run on-device.',
    stack: ['TypeScript', 'PWA', 'IndexedDB', 'Service Workers'],
    github: 'https://github.com/teckedd-code2save/optimi',
  },
  {
    number: '04',
    tag: 'deployment intel',
    title: 'Shipd',
    desc: 'Repo-aware deployment planning. Scans GitHub for deployment signals, scores platforms, and produces evidence-backed decision records. Read-only.',
    stack: ['GitHub API', 'Static Analysis', 'Platform Scoring'],
    live: 'https://shipd-seven.vercel.app/',
  },
];

function ProjectCard({ project, index }: { project: typeof featuredProjects[0]; index: number }) {
  const href = project.live ?? project.github ?? '#';
  const isExternal = !!(project.live ?? project.github);

  return (
    <ScrollReveal delay={index * 0.11} translateY={28} duration={0.7}>
      <a
        href={href}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        className="group block h-full transition-all duration-300"
        style={{
          backgroundColor: 'var(--bg-2)',
          border: '1px solid var(--border)',
          borderTop: '2px solid var(--orange)',
          padding: 32,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-5px)';
          e.currentTarget.style.boxShadow = '0 18px 56px rgba(255,85,0,0.08)';
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
              <span className="font-mono text-[10px]" style={{ color: 'var(--fg-4)' }}>
                {project.number}
              </span>
              <Tag text={project.tag} />
            </div>
            <h3
              className="mt-4 font-sans text-[21px] font-medium"
              style={{ color: 'var(--fg)' }}
            >
              {project.title}
            </h3>
            <p
              className="mt-3 font-sans text-[13px] leading-[1.78] line-clamp-3"
              style={{ color: 'var(--fg-3)' }}
            >
              {project.desc}
            </p>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {project.stack.map((s) => <Tag key={s} text={s} />)}
          </div>
        </div>
      </a>
    </ScrollReveal>
  );
}

function FeaturedProjectsSection() {
  return (
    <section
      className="parallax-section"
      style={{ background: 'var(--bg)' }}
    >
      <div className="mx-auto max-w-[1200px] px-5 py-[72px] md:px-10 md:py-[120px]">
        <ScrollReveal>
          <SectionLabel number="01" text="WORK" />
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <h2
            className="font-sans font-bold tracking-[-0.02em] text-[var(--fg)]"
            style={{ fontSize: 'clamp(28px, 3.5vw, 48px)', lineHeight: 1.05 }}
          >
            Selected Projects
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.15}>
          <p className="mt-2 font-sans text-sm" style={{ color: 'var(--fg-3)' }}>
            Systems, agents, and tools built for production.
          </p>
        </ScrollReveal>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {featuredProjects.map((p, i) => (
            <ProjectCard key={p.number} project={p} index={i} />
          ))}
        </div>

        <ScrollReveal delay={0.4}>
          <div className="mt-10 flex justify-end">
            <Link
              to="/projects"
              className="inline-block font-mono text-xs transition-all duration-200"
              style={{
                color: 'var(--fg-3)',
                borderBottom: '1px solid var(--border)',
                paddingBottom: 2,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--orange)';
                e.currentTarget.style.borderColor = 'var(--orange)';
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
      </div>
    </section>
  );
}

/* ══════════════════ TECH HUB ══════════════════ */

const techNodes = [
  { name: 'Go', color: '#00ADD8', angle: -90, abbr: 'Go' },
  { name: 'TypeScript', color: '#3178C6', angle: -60, abbr: 'TS' },
  { name: 'Python', color: '#4BA4C8', angle: -30, abbr: 'Py' },
  { name: 'PostgreSQL', color: '#336791', angle: 0, abbr: 'Pg' },
  { name: 'Redis', color: '#DC382D', angle: 30, abbr: 'Rd' },
  { name: 'Elasticsearch', color: '#005571', angle: 60, abbr: 'Es' },
  { name: 'Docker', color: '#2496ED', angle: 90, abbr: 'Dx' },
  { name: 'Kubernetes', color: '#326CE5', angle: 120, abbr: 'K8s' },
  { name: 'AWS', color: '#FF9900', angle: 150, abbr: 'AWS' },
  { name: 'GCP', color: '#4285F4', angle: 180, abbr: 'GCP' },
  { name: 'Cloudflare', color: '#F38020', angle: -150, abbr: 'CF' },
  { name: 'Claude', color: '#C77DFF', angle: -120, abbr: 'AI' },
];

function TechStackSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-10% 0px' });

  return (
    <section
      ref={sectionRef}
      className="parallax-section"
      style={{ backgroundColor: 'var(--bg-1)', padding: '120px 0' }}
    >
      <div className="mx-auto max-w-[1200px] px-5 md:px-10">
        <ScrollReveal>
          <SectionLabel number="02" text="STACK" />
        </ScrollReveal>

        <div className="flex flex-col items-start gap-12 lg:flex-row lg:items-center">
          <div className="max-w-[340px] shrink-0">
            <ScrollReveal delay={0.1}>
              <h2
                className="font-sans font-bold tracking-[-0.02em] text-[var(--fg)]"
                style={{ fontSize: 'clamp(28px, 3.5vw, 48px)', lineHeight: 1.05 }}
              >
                The Stack
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <p className="mt-4 font-sans text-sm leading-[1.8]" style={{ color: 'var(--fg-2)' }}>
                Go for systems. TypeScript for tooling. Python for AI workflows. PostgreSQL, Redis, Elasticsearch for data. Docker, Kubernetes, AWS, GCP, Hetzner for infrastructure. Cloudflare at the edge. nginx, Caddy as reverse proxies. Claude, Codex for agentic development.
              </p>
            </ScrollReveal>
          </div>

          {/* Tech Hub SVG */}
          <div className="relative flex flex-1 items-center justify-center" style={{ minHeight: 400 }}>
            <svg viewBox="0 0 400 400" className="w-full max-w-[500px]" style={{ overflow: 'visible' }}>
              {/* Connection lines */}
              {techNodes.map((node, i) => {
                const rad = (node.angle * Math.PI) / 180;
                const x2 = 200 + 130 * Math.cos(rad);
                const y2 = 200 + 130 * Math.sin(rad);
                return (
                  <line
                    key={`line-${i}`}
                    x1={200} y1={200} x2={x2} y2={y2}
                    stroke="rgba(245,242,237,0.06)"
                    strokeWidth={1}
                    strokeDasharray="4 4"
                    style={{
                      opacity: isInView ? 1 : 0,
                      transition: `opacity 0.6s ease ${0.4 + i * 0.07}s`,
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
                      transition: `all 0.5s cubic-bezier(0.34,1.56,0.64,1) ${0.5 + i * 0.07}s`,
                    }}
                  >
                    <circle cx={cx} cy={cy} r={22} fill={`${node.color}10`} stroke={`${node.color}35`} strokeWidth={1} />
                    <circle cx={cx} cy={cy} r={18} fill={`${node.color}22`} stroke={node.color} strokeWidth={1.5} />
                    <text
                      x={cx} y={cy + 1}
                      textAnchor="middle" dominantBaseline="middle"
                      fill="#F5F2ED"
                      fontSize={node.abbr.length > 2 ? 8 : 10}
                      fontWeight={600}
                      fontFamily="'JetBrains Mono', monospace"
                      letterSpacing={-0.5}
                    >
                      {node.abbr}
                    </text>
                    <text
                      x={cx} y={cy + 34}
                      textAnchor="middle"
                      fill="var(--fg-3)"
                      fontSize={9}
                      fontFamily="'JetBrains Mono', monospace"
                      letterSpacing={0.5}
                    >
                      {node.name}
                    </text>
                  </g>
                );
              })}

              {/* Central hub — orange */}
              <g
                style={{
                  opacity: isInView ? 1 : 0,
                  transform: isInView ? 'scale(1)' : 'scale(0)',
                  transformOrigin: '200px 200px',
                  transition: 'all 0.6s cubic-bezier(0.34,1.56,0.64,1) 0.3s',
                }}
              >
                <circle
                  cx={200} cy={200} r={28}
                  fill="rgba(255,85,0,0.08)"
                  stroke="rgba(255,85,0,0.25)"
                  strokeWidth={1}
                />
                <circle
                  cx={200} cy={200} r={24}
                  fill="var(--orange)"
                  style={{ filter: 'drop-shadow(0 0 18px rgba(255,85,0,0.5))' }}
                />
                <polygon
                  points="200,188 210,194 210,206 200,212 190,206 190,194"
                  fill="none"
                  stroke="rgba(245,242,237,0.9)"
                  strokeWidth={1.5}
                />
                <circle cx={200} cy={200} r={3} fill="rgba(245,242,237,0.9)" />
                <text
                  x={200} y={200 + 44}
                  textAnchor="middle"
                  fill="var(--fg)"
                  fontSize={11}
                  fontWeight={500}
                  fontFamily="'JetBrains Mono', monospace"
                  letterSpacing={0.5}
                >
                  Core Stack
                </text>
              </g>

              {/* Traveling packet dots — orange */}
              {isInView &&
                techNodes.map((node, i) => {
                  const rad = (node.angle * Math.PI) / 180;
                  const x2 = 200 + 130 * Math.cos(rad);
                  const y2 = 200 + 130 * Math.sin(rad);
                  return (
                    <circle key={`packet-${i}`} r={2.5} fill="var(--orange)" opacity={0.55}>
                      <animateMotion
                        dur={`${2.2 + (i % 5) * 0.4}s`}
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

/* ══════════════════ PACKAGES ══════════════════ */

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
              <span style={{ color: 'var(--fg-3)' }}>{scope}/</span>
              <span style={{ color: 'var(--fg)' }}>{pkgName}</span>
            </span>
            <Tag text="npm" />
          </div>
          <p className="mt-4 font-sans text-[13px] leading-[1.78]" style={{ color: 'var(--fg-3)' }}>
            {pkg.description}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {pkg.stack.map((s) => <Tag key={s} text={s} />)}
          </div>
        </div>
        <div className="flex items-start">
          <a
            href={pkg.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block whitespace-nowrap font-mono text-[11px] transition-all duration-200"
            style={{
              border: '1px solid var(--border-2)',
              padding: '8px 18px',
              color: 'var(--fg-3)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--orange)';
              e.currentTarget.style.color = 'var(--orange)';
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
    <section className="parallax-section" style={{ background: 'var(--bg)' }}>
      <div className="mx-auto max-w-[1200px] px-5 py-[72px] md:px-10 md:py-[120px]">
        <ScrollReveal>
          <SectionLabel number="03" text="PACKAGES" />
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <h2
            className="font-sans font-bold tracking-[-0.02em] text-[var(--fg)]"
            style={{ fontSize: 'clamp(28px, 3.5vw, 48px)', lineHeight: 1.05 }}
          >
            Open Source
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.15}>
          <p className="mt-2 font-sans text-sm" style={{ color: 'var(--fg-3)' }}>
            Developer tools published to npm. Zero-dependency gateways and CLI orchestrators.
          </p>
        </ScrollReveal>

        <div className="mt-12 flex flex-col gap-6">
          {packages.map((pkg, i) => (
            <PackageCard key={pkg.name} pkg={pkg} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════ CREDENTIALS ══════════════════ */

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
    <ScrollReveal delay={index * 0.07} translateY={14} duration={0.6}>
      <div
        className="group grid cursor-default gap-4 transition-all duration-200 sm:grid-cols-[1fr_auto]"
        style={{
          padding: '26px 0',
          borderBottom: '1px solid var(--border)',
          borderLeft: '2px solid transparent',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateX(6px)';
          e.currentTarget.style.backgroundColor = 'rgba(255,85,0,0.025)';
          e.currentTarget.style.borderLeftColor = 'var(--orange)';
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
            <h3 className="font-mono text-sm font-medium" style={{ color: 'var(--fg)' }}>
              {cred.title}
            </h3>
            <Tag text={cred.category} />
          </div>
          <p className="mt-1.5 font-mono text-[11px]" style={{ color: 'var(--fg-2)' }}>
            {cred.issuer}
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <span className="font-mono text-[10px]" style={{ color: 'var(--fg-3)' }}>{cred.date}</span>
            {cred.id && (
              <span className="font-mono text-[10px]" style={{ color: 'var(--fg-4)' }}>
                ID: {cred.id}
              </span>
            )}
            <div className="flex flex-wrap gap-1.5">
              {cred.tags.map((t) => (
                <span key={t} className="font-mono text-[8px] uppercase" style={{ color: 'var(--fg-4)' }}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-center">
          {'verifyText' in cred && cred.verifyText ? (
            <span className="font-mono text-[11px]" style={{ color: 'var(--terminal-green)' }}>
              {cred.verifyText}
            </span>
          ) : (
            <span
              className="font-mono text-[11px] transition-colors"
              style={{ color: 'var(--fg-4)' }}
            >
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
    <section className="parallax-section" style={{ background: 'var(--bg-1)' }}>
      <div className="mx-auto max-w-[1200px] px-5 py-[72px] md:px-10 md:py-[120px]">
        <ScrollReveal>
          <SectionLabel number="04" text="CREDENTIALS" />
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <h2
            className="font-sans font-bold tracking-[-0.02em] text-[var(--fg)]"
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
      </div>
    </section>
  );
}

/* ══════════════════ CONTACT CTA ══════════════════ */

const contactLinks = [
  { key: 'email', value: 'edwardktwumasi1000@gmail.com', href: 'mailto:edwardktwumasi1000@gmail.com' },
  { key: 'github', value: 'teckedd-code2save', href: 'https://github.com/teckedd-code2save' },
  { key: 'linkedin', value: 'edward-twumasi', href: 'https://linkedin.com/in/edward-twumasi' },
  { key: 'company', value: 'serendepify.com', href: 'https://www.serendepify.com/' },
];

function ContactCTASection() {
  return (
    <section
      className="parallax-section px-5 py-[100px] md:py-[160px]"
      style={{ background: 'var(--bg)' }}
    >
      {/* Ambient particles — orange + mauve */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.07]">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          {([
            '#FF5500', '#FF5500', '#C77DFF', '#FF5500', '#C77DFF',
            '#FF5500', '#C77DFF', '#FF5500', '#FF5500', '#C77DFF',
            '#C77DFF', '#FF5500', '#C77DFF', '#FF5500', '#C77DFF',
            '#FF5500', '#C77DFF', '#FF5500', '#C77DFF', '#FF5500',
          ] as const).map((color, i) => (
            <circle
              key={i}
              cx={`${8 + (i * 4.5) % 86}%`}
              cy={`${12 + (i * 7) % 76}%`}
              r={1 + (i % 3) * 0.8}
              fill={color}
            >
              <animate
                attributeName="cy"
                dur={`${9 + (i % 7) * 1.5}s`}
                values={`${12 + (i * 7) % 76}%;${22 + (i * 5) % 56}%;${12 + (i * 7) % 76}%`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                dur={`${4 + (i % 5) * 1.2}s`}
                values="0.25;0.75;0.25"
                repeatCount="indefinite"
              />
            </circle>
          ))}
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-[600px] text-center">
        <ScrollReveal>
          <SectionLabel number="05" text="REACH OUT" />
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2
            className="mx-auto mt-6 font-sans font-bold tracking-[-0.02em] text-[var(--fg)]"
            style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', lineHeight: 1.05 }}
          >
            Let&apos;s build something.
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="mx-auto mt-4 max-w-[480px] font-sans text-[15px]" style={{ color: 'var(--fg-3)' }}>
            Open to backend engineering, agent systems, and developer tooling work.
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
                  e.currentTarget.style.borderColor = 'var(--orange)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.color = 'var(--fg)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.color = 'var(--fg-3)';
                }}
              >
                <span style={{ color: 'var(--fg-3)' }}>{link.key}</span>
                <span style={{ color: 'var(--fg-2)' }}>{link.value}</span>
              </a>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.6}>
          <div className="mt-9">
            <Link
              to="/contact"
              className="inline-block font-mono text-xs transition-all duration-200"
              style={{
                color: 'var(--fg-3)',
                borderBottom: '1px solid var(--border)',
                paddingBottom: 2,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--orange)';
                e.currentTarget.style.borderColor = 'var(--orange)';
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

/* ══════════════════ WHAT'S NEXT ══════════════════ */

const nextBuilds = [
  {
    signal: 'Agent runtime with persistent memory and tool-registry API.',
    stack: ['Go', 'MCP', 'PostgreSQL'],
  },
  {
    signal: 'Self-hostable observability layer for AI workflow pipelines.',
    stack: ['Hetzner', 'Prometheus', 'Grafana'],
  },
  {
    signal: 'Payments SDK for HTTP 402 across agent-to-agent calls.',
    stack: ['TypeScript', 'TON', 'HTTP 402'],
  },
];

function WhatsNextSection() {
  return (
    <section className="parallax-section" style={{ background: 'var(--bg-2)' }}>
      <div className="mx-auto max-w-[1200px] px-5 py-[72px] md:px-10 md:py-[120px]">
        <ScrollReveal>
          <SectionLabel number="06" text="NEXT" />
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <h2
            className="font-sans font-bold tracking-[-0.02em]"
            style={{
              fontSize: 'clamp(28px, 3.5vw, 48px)',
              lineHeight: 1.05,
              color: 'var(--fg)',
            }}
          >
            What&apos;s in progress
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.15}>
          <p className="mt-2 font-sans text-sm" style={{ color: 'var(--fg-3)' }}>
            Direction signals — not roadmaps.
          </p>
        </ScrollReveal>

        <div className="mt-12 flex flex-col gap-0">
          {nextBuilds.map((item, i) => (
            <ScrollReveal key={i} delay={0.1 + i * 0.1} translateY={20}>
              <div
                className="group flex flex-col gap-3 transition-all duration-200 sm:flex-row sm:items-center sm:justify-between"
                style={{
                  borderTop: i === 0 ? '1px solid var(--border)' : undefined,
                  borderBottom: '1px solid var(--border)',
                  padding: '28px 0',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.paddingLeft = '8px';
                  e.currentTarget.style.backgroundColor = 'rgba(255,85,0,0.025)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.paddingLeft = '0';
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <p className="max-w-[600px] font-sans text-[15px] leading-[1.6]" style={{ color: 'var(--fg-2)' }}>
                  {item.signal}
                </p>
                <div className="flex shrink-0 flex-wrap gap-2">
                  {item.stack.map((s) => (
                    <span
                      key={s}
                      className="font-mono text-[9px] uppercase tracking-widest"
                      style={{
                        border: '1px solid var(--mauve)',
                        color: 'var(--mauve)',
                        padding: '3px 8px',
                        opacity: 0.7,
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════ HOME PAGE ══════════════════ */

export default function Home() {
  return (
    <>
      <HeroSection />
      <MarqueeTicker />
      <FeaturedProjectsSection />
      <TechStackSection />
      <PackagesSection />
      <CredentialsSection />
      <WhatsNextSection />
      <ContactCTASection />
    </>
  );
}
