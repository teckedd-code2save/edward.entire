import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import { Link } from 'react-router-dom';
import ScrollReveal from '@/components/ScrollReveal';
import SectionLabel from '@/components/SectionLabel';
import HeroBackdrop from '@/components/HeroBackdrop';

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
      className="inline-block cursor-default font-mono text-[9px] uppercase tracking-wide transition-all duration-200 hover:-translate-y-px"
      style={{ border: `1px solid ${border}`, padding: '3px 7px', color }}
    >
      {text}
    </span>
  );
}

/* ══════════════════ SCENE 1 — HERO ══════════════════ */

function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const textY = useTransform(scrollYProgress, [0, 1], ['0px', '120px']);

  return (
    <section ref={heroRef} className="relative min-h-[100dvh] overflow-hidden">
      <HeroBackdrop />

      <motion.div
        className="relative z-10 flex min-h-[100dvh] items-center px-5 py-24 md:px-10"
        style={{ y: textY }}
      >
        <div className="mx-auto w-full max-w-[1240px]">
          <motion.h1
            className="font-sans font-bold leading-[0.98] tracking-[-0.03em] text-[var(--fg)]"
            style={{ fontSize: 'clamp(3.4rem, 9vw, 8.2rem)' }}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: easeEnter }}
          >
            Edward
            <br />
            <span style={{ color: 'var(--orange)' }}>Twumasi</span>
            <span style={{ color: 'var(--mauve)' }}>.</span>
          </motion.h1>

          <motion.p
            className="mt-7 max-w-[640px] font-sans font-light leading-[1.45] text-[var(--fg-2)]"
            style={{ fontSize: 'clamp(1.05rem, 2vw, 1.55rem)' }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: easeEnter }}
          >
            Backend systems. Agent runtimes. Tools that ship to production and stay there.
          </motion.p>

          <motion.div
            className="mt-12 flex flex-wrap items-center gap-7"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7, ease: easeEnter }}
          >
            {[
              { label: 'github', href: 'https://github.com/teckedd-code2save' },
              { label: 'linkedin', href: 'https://linkedin.com/in/edward-twumasi' },
              { label: 'serendepify', href: 'https://www.serendepify.com/' },
              { label: 'convoy', href: 'https://convoy-home.vercel.app/', highlight: true },
              { label: 'email', href: 'mailto:edwardktwumasi1000@gmail.com' },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[11px] uppercase tracking-[0.14em] transition-all duration-250"
                style={{
                  color: link.highlight ? 'var(--mauve)' : 'var(--fg-2)',
                  borderBottom: '1px solid rgba(245,242,237,0.16)',
                  paddingBottom: 2,
                  fontWeight: link.highlight ? 700 : 400,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = link.highlight ? 'var(--mauve)' : 'var(--orange)';
                  e.currentTarget.style.borderColor = link.highlight ? 'var(--mauve)' : 'var(--orange)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = link.highlight ? 'var(--mauve)' : 'var(--fg-2)';
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
        <div
          className="h-10 w-px overflow-hidden"
          style={{ backgroundColor: 'rgba(245,242,237,0.15)' }}
        >
          <div
            className="scroll-line h-full w-full"
            style={{ backgroundColor: 'var(--orange)' }}
          />
        </div>
        <span className="font-mono text-[9px]" style={{ color: 'rgba(245,242,237,0.32)' }}>
          scroll
        </span>
      </motion.div>
    </section>
  );
}

/* ══════════════════ SCENE 2 — MANIFESTO (sticky-pin scrollytelling) ══════════════════ */

const manifestoFrames = [
  {
    label: '01 — backend',
    head: 'Backend',
    accent: 'infrastructure',
    accentColor: 'var(--orange)',
    body: 'Postgres, Redis, Elasticsearch wired into C#, Python, and TypeScript services. Designed for throughput, observed in production, kept boringly reliable.',
  },
  {
    label: '02 — agents',
    head: 'Agent',
    accent: 'systems',
    accentColor: 'var(--mauve)',
    body: 'MCP-native runtimes. Datafy for data access, B2DP for platform scaffolds, Convoy for deployment. Tools that let other agents do real work.',
  },
  {
    label: '03 — products',
    head: 'Products',
    accent: 'that ship',
    accentColor: 'var(--orange)',
    body: 'Optimi. HealthWallet TON. Soft Pharma Manager. Live on Hetzner and Cloudflare, used daily, maintained.',
  },
];

function ManifestoFrame({
  frame,
  index,
  scrollProgress,
}: {
  frame: typeof manifestoFrames[0];
  index: number;
  scrollProgress: MotionValue<number>;
}) {
  const span = 1 / manifestoFrames.length;
  const start = index * span;
  const end = (index + 1) * span;
  const fadeIn = start;
  const peak = start + span * 0.35;
  const fadeOutStart = end - span * 0.3;
  const last = index === manifestoFrames.length - 1;

  const opacity = useTransform(
    scrollProgress,
    last
      ? [Math.max(0, fadeIn - 0.02), peak, 1]
      : [Math.max(0, fadeIn - 0.02), peak, fadeOutStart, end],
    last ? [0, 1, 1] : [0, 1, 1, 0],
  );

  const y = useTransform(
    scrollProgress,
    [Math.max(0, fadeIn - 0.05), peak, end],
    [40, 0, -30],
  );

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center px-5 md:px-10"
      style={{ opacity, y }}
    >
      <div className="mx-auto w-full max-w-[1240px]">
        <span
          className="font-mono text-[11px] uppercase tracking-[0.22em]"
          style={{ color: 'var(--fg-3)' }}
        >
          {frame.label}
        </span>
        <h2
          className="mt-5 font-sans font-bold leading-[0.95] tracking-[-0.03em] text-[var(--fg)]"
          style={{ fontSize: 'clamp(3rem, 10vw, 9rem)' }}
        >
          {frame.head}
          <br />
          <span style={{ color: frame.accentColor }}>{frame.accent}</span>
          <span style={{ color: frame.accentColor }}>.</span>
        </h2>
        <p
          className="mt-7 max-w-[620px] font-sans leading-[1.55]"
          style={{ fontSize: 'clamp(1rem, 1.6vw, 1.35rem)', color: 'var(--fg-2)' }}
        >
          {frame.body}
        </p>
      </div>
    </motion.div>
  );
}

function ManifestoSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // Background blobs that drift across the entire scrollytelling span
  const blobX = useTransform(scrollYProgress, [0, 1], ['-25%', '15%']);
  const blobX2 = useTransform(scrollYProgress, [0, 1], ['10%', '-20%']);

  return (
    <section ref={sectionRef} className="relative" style={{ height: '320vh' }}>
      <div
        className="sticky top-0 flex h-[100dvh] w-full items-center overflow-hidden"
        style={{ backgroundColor: 'var(--bg-1)' }}
      >
        {/* Drifting mauve blob */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute"
          style={{
            x: blobX,
            top: '15%',
            width: 700,
            height: 700,
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(199,125,255,0.18), rgba(199,125,255,0) 60%)',
            filter: 'blur(40px)',
          }}
        />
        {/* Drifting orange blob */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute"
          style={{
            x: blobX2,
            bottom: '5%',
            right: 0,
            width: 800,
            height: 800,
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(255,85,0,0.16), rgba(255,85,0,0) 60%)',
            filter: 'blur(48px)',
          }}
        />
        <div className="noise-bg" />

        <div className="relative z-10 w-full">
          {manifestoFrames.map((frame, i) => (
            <ManifestoFrame
              key={i}
              frame={frame}
              index={i}
              scrollProgress={scrollYProgress}
            />
          ))}
        </div>

        {/* Frame counter dots */}
        <div className="absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 gap-3">
          {manifestoFrames.map((_, i) => {
            const span = 1 / manifestoFrames.length;
            const dotOpacity = useTransform(
              scrollYProgress,
              [i * span, i * span + span * 0.35, (i + 1) * span],
              [0.25, 1, 0.25],
            );
            return (
              <motion.div
                key={i}
                style={{
                  opacity: dotOpacity,
                  width: 22,
                  height: 2,
                  backgroundColor: i % 2 === 0 ? 'var(--orange)' : 'var(--mauve)',
                }}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════ SCENE 3 — FEATURED PROJECTS ══════════════════ */

interface Project {
  number: string;
  tag: string;
  tone: 'orange' | 'mauve';
  title: string;
  blurb: string;
  detail: string;
  stack: string[];
  live?: string;
  github?: string;
  status?: 'private' | 'public';
}

const featuredProjects: Project[] = [
  {
    number: '01',
    tag: 'deployment agent',
    tone: 'orange',
    title: 'Convoy',
    blurb: 'Rehearses your deploy. Ships it. Watches the canary. Never touches your code.',
    detail:
      'Built for the Claude Code hackathon on Opus 4.7. Plan → rehearse → canary → observe loop with human approval at each gate.',
    stack: ['TypeScript', 'Claude Opus 4.7', 'MCP', 'Agent Loop'],
    live: 'https://convoy-home.vercel.app/',
    github: 'https://github.com/teckedd-code2save/convoy',
    status: 'public',
  },
  {
    number: '02',
    tag: 'TON mini app',
    tone: 'mauve',
    title: 'HealthWallet TON',
    blurb: 'A health record wallet running natively inside Telegram, settled on TON.',
    detail:
      'TypeScript Mini App — credentials, prescriptions, and visit history travel with the user. Encrypted client-side.',
    stack: ['TypeScript', 'TON', 'Telegram Mini App', 'Cryptography'],
    github: 'https://github.com/teckedd-code2save/HealthWallet-TON-MiniApp',
    status: 'public',
  },
  {
    number: '03',
    tag: 'opportunity tracker',
    tone: 'orange',
    title: 'Optimi',
    blurb: 'Privacy-first PWA for hackathons, grants, accelerators, and jobs. Local-only.',
    detail:
      'Curated finder + on-device AI application assistant. Nothing leaves the browser unless you press send.',
    stack: ['TypeScript', 'PWA', 'IndexedDB', 'On-device LLM'],
    github: 'https://github.com/teckedd-code2save/optimi',
    status: 'public',
  },
  {
    number: '04',
    tag: 'emergency response',
    tone: 'mauve',
    title: 'CareWallet',
    blurb:
      'One SOS becomes a coordinated care flow — emergency, hospital match, deposit, contribution, approval.',
    detail:
      'Built in 24 hours with Replit Agent. Hospital discovery, care-deposit coordination, trusted-contact contributions, and Stripe Link test approval — moving emergency response from panic to coordinated action.',
    stack: ['TypeScript', 'Python', 'Stripe Link', 'Replit Agent'],
    live: 'https://x.com/EdwardsTwums/status/2050913151160390006?s=20',
    github: 'https://github.com/teckedd-code2save',
    status: 'public',
  },
];

function ProjectCanvas({ tone, index }: { tone: 'orange' | 'mauve'; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['-30px', '30px']);
  const rotate = useTransform(scrollYProgress, [0, 1], [-3, 3]);

  const accent = tone === 'orange' ? 'var(--orange)' : 'var(--mauve)';
  const glow = tone === 'orange' ? 'rgba(255,85,0,0.18)' : 'rgba(199,125,255,0.18)';

  return (
    <div
      ref={ref}
      className="relative h-full min-h-[280px] w-full overflow-hidden"
      style={{
        backgroundColor: 'var(--bg-2)',
        border: '1px solid var(--border)',
      }}
    >
      <motion.div
        aria-hidden
        className={`absolute inset-0 ${tone === 'mauve' ? 'grid-drift grid-drift--mauve' : 'grid-drift'}`}
        style={{ y, rotate, opacity: 0.55 }}
      />

      {/* Soft accent glow */}
      <div
        aria-hidden
        className="absolute"
        style={{
          inset: -40,
          background: `radial-gradient(circle at ${index % 2 === 0 ? '30% 70%' : '70% 30%'}, ${glow}, transparent 65%)`,
          filter: 'blur(20px)',
        }}
      />

      {/* Big mono numeral */}
      <div
        className="absolute inset-0 flex items-center justify-center font-mono font-bold"
        style={{
          fontSize: 'clamp(7rem, 16vw, 14rem)',
          color: accent,
          opacity: 0.18,
          letterSpacing: '-0.05em',
        }}
      >
        ·{index + 1}
      </div>
    </div>
  );
}

function ProjectRow({ project, index }: { project: Project; index: number }) {
  const reverse = index % 2 === 1;
  const href = project.live ?? project.github;

  const Wrapper = ({ children }: { children: React.ReactNode }) =>
    href ? (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group block"
      >
        {children}
      </a>
    ) : (
      <div className="group block cursor-default">{children}</div>
    );

  return (
    <ScrollReveal delay={index * 0.05} translateY={36} duration={0.8}>
      <Wrapper>
        <div
          className={`grid items-stretch gap-5 transition-all duration-300 md:gap-10 ${
            reverse ? 'md:grid-cols-[1fr_1.1fr]' : 'md:grid-cols-[1.1fr_1fr]'
          }`}
          style={{ padding: '24px 0' }}
        >
          {/* Text block */}
          <div
            className={`flex flex-col justify-center ${reverse ? 'md:order-2' : ''}`}
            style={{ padding: '8px 4px' }}
          >
            <div className="flex items-center gap-3">
              <span className="font-mono text-[11px]" style={{ color: 'var(--fg-3)' }}>
                {project.number}
              </span>
              <span className="h-px w-8" style={{ backgroundColor: 'var(--border-2)' }} />
              <Tag text={project.tag} tone={project.tone} />
              {project.status === 'private' && <Tag text="private" />}
            </div>

            <h3
              className="mt-4 font-sans font-medium tracking-[-0.02em] text-[var(--fg)] transition-colors duration-200 group-hover:text-[var(--orange)]"
              style={{ fontSize: 'clamp(1.8rem, 3.4vw, 2.6rem)', lineHeight: 1.05 }}
            >
              {project.title}
            </h3>

            <p
              className="mt-4 max-w-[560px] font-sans leading-[1.55] text-[var(--fg)]"
              style={{ fontSize: 'clamp(0.96rem, 1.3vw, 1.08rem)' }}
            >
              {project.blurb}
            </p>

            <p
              className="mt-3 max-w-[560px] font-sans text-[13px] leading-[1.7]"
              style={{ color: 'var(--fg-3)' }}
            >
              {project.detail}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {project.stack.map((s) => (
                <Tag key={s} text={s} />
              ))}
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-5 font-mono text-[11px]">
              {project.live && (
                <span style={{ color: 'var(--orange)' }}>live ↗ {new URL(project.live).host}</span>
              )}
              {project.github && (
                <span style={{ color: 'var(--fg-3)' }}>
                  source ↗ github
                </span>
              )}
              {!project.live && !project.github && (
                <span style={{ color: 'var(--fg-4)' }}>private repository</span>
              )}
            </div>
          </div>

          {/* Visual block */}
          <div
            className={`${reverse ? 'md:order-1' : ''} transition-transform duration-500 group-hover:translate-y-[-4px]`}
          >
            <ProjectCanvas tone={project.tone} index={index} />
          </div>
        </div>
      </Wrapper>
    </ScrollReveal>
  );
}

function FeaturedProjectsSection() {
  return (
    <section className="parallax-section" style={{ background: 'var(--bg)' }}>
      <div className="mx-auto max-w-[1200px] px-5 py-[80px] md:px-10 md:py-[140px]">
        <ScrollReveal>
          <SectionLabel number="01" text="WORK" />
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <h2
            className="font-sans font-bold tracking-[-0.025em] text-[var(--fg)]"
            style={{ fontSize: 'clamp(2rem, 4.5vw, 3.4rem)', lineHeight: 1.02 }}
          >
            Currently in&nbsp;
            <span style={{ color: 'var(--orange)' }}>flight</span>.
          </h2>
        </ScrollReveal>

        <div className="mt-12 flex flex-col gap-3">
          {featuredProjects.map((p, i) => (
            <div
              key={p.number}
              style={i > 0 ? { borderTop: '1px solid var(--border)' } : undefined}
            >
              <ProjectRow project={p} index={i} />
            </div>
          ))}
        </div>

        <ScrollReveal delay={0.2}>
          <div className="mt-12 flex justify-end">
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
              full archive &rarr;
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ══════════════════ SCENE 4 — DEPLOYMENT CHAINS ══════════════════ */

type DeploymentNode = { name: string; role: string; tone: 'orange' | 'mauve' };

const deploymentChains: { label: string; nodes: DeploymentNode[] }[] = [
  {
    label: 'Bare Metal / VPS',
    nodes: [
      { name: 'Cloudflare', role: 'edge / DNS / WAF',      tone: 'orange' },
      { name: 'Caddy',      role: 'TLS + reverse proxy',   tone: 'mauve'  },
      { name: 'nginx',      role: 'static / load balance', tone: 'orange' },
      { name: 'Hetzner',    role: 'bare-metal VPS, EU',    tone: 'mauve'  },
    ],
  },
  {
    label: 'Serverless / Edge',
    nodes: [
      { name: 'GitHub',    role: 'source / CI',       tone: 'orange' },
      { name: 'Vercel',    role: 'build + deploy',    tone: 'mauve'  },
      { name: 'Edge',      role: 'edge functions',    tone: 'orange' },
      { name: 'Analytics', role: 'observability',     tone: 'mauve'  },
    ],
  },
  {
    label: 'AWS Cloud',
    nodes: [
      { name: 'GitHub Actions', role: 'CI pipeline',        tone: 'orange' },
      { name: 'ECR',            role: 'container registry', tone: 'mauve'  },
      { name: 'ECS',            role: 'orchestration',      tone: 'orange' },
      { name: 'CloudFront',     role: 'CDN / edge',         tone: 'mauve'  },
    ],
  },
];

function DeploymentChain({
  label,
  nodes,
}: {
  label: string;
  nodes: DeploymentNode[];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' });

  return (
    <div ref={ref} className="w-full">
      <div
        className="mb-5 font-mono text-[10px] uppercase tracking-[0.22em]"
        style={{ color: 'var(--fg-4)' }}
      >
        {label}
      </div>
      <div className="relative grid grid-cols-4 gap-0">
        {/* Background track */}
        <div
          className="pointer-events-none absolute hidden h-px md:block"
          style={{
            top: 28,
            left: '12.5%',
            right: '12.5%',
            backgroundColor: 'var(--border)',
          }}
        />
        {/* Animated gradient track */}
        <motion.div
          className="pointer-events-none absolute hidden h-px md:block"
          initial={{ width: '0%' }}
          animate={isInView ? { width: '75%' } : { width: '0%' }}
          transition={{ duration: 1.2, ease: easeEnter, delay: 0.3 }}
          style={{
            top: 28,
            left: '12.5%',
            background: 'linear-gradient(90deg, var(--orange), var(--mauve), var(--orange))',
            boxShadow: '0 0 12px rgba(255,85,0,0.45)',
          }}
        />

        {nodes.map((node, i) => (
          <ScrollReveal key={node.name} delay={i * 0.08} translateY={16}>
            <div className="relative flex flex-col items-center text-center">
              <span
                className="orb-pulse relative z-[1] flex items-center justify-center"
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: '50%',
                  border: `1px solid ${node.tone === 'orange' ? 'rgba(255,85,0,0.5)' : 'rgba(199,125,255,0.5)'}`,
                  backgroundColor: 'var(--bg)',
                  color: node.tone === 'orange' ? 'var(--orange)' : 'var(--mauve)',
                  boxShadow:
                    node.tone === 'orange'
                      ? '0 0 24px rgba(255,85,0,0.15)'
                      : '0 0 24px rgba(199,125,255,0.15)',
                  animationDelay: `-${i * 0.6}s`,
                }}
              >
                <span className="font-mono text-[10px] font-medium tracking-widest">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </span>

              <span
                className="mt-4 font-sans font-medium"
                style={{
                  fontSize: '1rem',
                  color: 'var(--fg)',
                  letterSpacing: '-0.01em',
                }}
              >
                {node.name}
              </span>
              <span
                className="mt-1 font-mono text-[10px] uppercase tracking-widest"
                style={{ color: 'var(--fg-3)' }}
              >
                {node.role}
              </span>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}

function DeploymentSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const headingY = useTransform(scrollYProgress, [0, 1], ['40px', '-40px']);

  return (
    <section
      ref={ref}
      className="parallax-section"
      style={{ background: 'var(--bg-2)' }}
    >
      <div className="mx-auto max-w-[1200px] px-5 py-[100px] md:px-10 md:py-[160px]">
        <ScrollReveal>
          <SectionLabel number="02" text="DEPLOYS" />
        </ScrollReveal>

        <motion.div style={{ y: headingY }}>
          <ScrollReveal delay={0.1}>
            <h2
              className="font-sans font-bold tracking-[-0.025em] text-[var(--fg)]"
              style={{ fontSize: 'clamp(2rem, 4.5vw, 3.4rem)', lineHeight: 1.05 }}
            >
              Push from&nbsp;<span style={{ color: 'var(--orange)' }}>origin</span>.
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p
              className="mt-3 max-w-[640px] font-sans text-[14px] leading-[1.7]"
              style={{ color: 'var(--fg-2)' }}
            >
              One station. Many targets. The shape of the problem picks the path.
            </p>
          </ScrollReveal>
        </motion.div>

        {/* Desktop Rake */}
        <div className="relative mt-16 hidden lg:flex lg:items-stretch lg:gap-6">
          {/* Parent Node — the handle */}
          <div className="flex w-[200px] shrink-0 flex-col items-center justify-center">
            <div
              className="flex items-center justify-center"
              style={{
                width: 88,
                height: 88,
                borderRadius: '50%',
                border: '1px solid rgba(255,85,0,0.5)',
                backgroundColor: 'var(--bg)',
                boxShadow: '0 0 32px rgba(255,85,0,0.18), inset 0 0 20px rgba(255,85,0,0.05)',
              }}
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--orange)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
              </svg>
            </div>
            <span
              className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em]"
              style={{ color: 'var(--fg-3)' }}
            >
              Origin
            </span>
          </div>

          {/* Connector — animated dotted handle + three branches */}
          <div className="pointer-events-none relative flex w-14 shrink-0 flex-col py-8">
            {/* Vertical handle */}
            <div className="absolute left-0 top-8 bottom-8 w-px dash-march-v" />
            {/* Three branch lines */}
            <div className="flex flex-1 flex-col justify-between">
              <div className="h-px w-full dash-march-h" />
              <div className="h-px w-full dash-march-h" />
              <div className="h-px w-full dash-march-h" />
            </div>
          </div>

          {/* Chains — the tines */}
          <div className="flex flex-1 flex-col justify-around gap-6">
            {deploymentChains.map((chain) => (
              <div key={chain.label} className="flex flex-1 items-center">
                <DeploymentChain label={chain.label} nodes={chain.nodes} />
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Stack */}
        <div className="mt-16 flex flex-col items-center gap-10 lg:hidden">
          <div className="flex flex-col items-center">
            <div
              className="flex items-center justify-center"
              style={{
                width: 88,
                height: 88,
                borderRadius: '50%',
                border: '1px solid rgba(255,85,0,0.5)',
                backgroundColor: 'var(--bg)',
                boxShadow: '0 0 32px rgba(255,85,0,0.18), inset 0 0 20px rgba(255,85,0,0.05)',
              }}
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--orange)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
              </svg>
            </div>
            <span
              className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em]"
              style={{ color: 'var(--fg-3)' }}
            >
              Origin
            </span>
          </div>
          {deploymentChains.map((chain, i) => (
            <div key={chain.label} className={i > 0 ? 'mt-4' : ''}>
              <DeploymentChain label={chain.label} nodes={chain.nodes} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════ SCENE 5 — STACK ══════════════════ */

const techNodes = [
  { name: 'C#',         color: '#9B4F96', angle: -90,  abbr: 'C#' },
  { name: 'TypeScript', color: '#3178C6', angle: -60,  abbr: 'TS' },
  { name: 'Python',     color: '#4BA4C8', angle: -30,  abbr: 'Py' },
  { name: 'PostgreSQL', color: '#FF5500', angle:  0,   abbr: 'Pg' },
  { name: 'Redis',      color: '#DC382D', angle:  30,  abbr: 'Rd' },
  { name: 'Elastic',    color: '#C77DFF', angle:  60,  abbr: 'Es' },
  { name: 'Docker',     color: '#2496ED', angle:  90,  abbr: 'Dk' },
  { name: 'Kubernetes', color: '#326CE5', angle: 120,  abbr: 'K8s' },
  { name: 'AWS',        color: '#FF5500', angle: 150,  abbr: 'AWS' },
  { name: 'GCP',        color: '#4285F4', angle: 180,  abbr: 'GCP' },
  { name: 'Cloudflare', color: '#FF5500', angle: -150, abbr: 'CF' },
  { name: 'Claude',     color: '#C77DFF', angle: -120, abbr: 'AI' },
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
          <SectionLabel number="03" text="STACK" />
        </ScrollReveal>

        <div className="flex flex-col items-start gap-12 lg:flex-row lg:items-center">
          <div className="max-w-[380px] shrink-0">
            <ScrollReveal delay={0.1}>
              <h2
                className="font-sans font-bold tracking-[-0.025em] text-[var(--fg)]"
                style={{ fontSize: 'clamp(2rem, 4.5vw, 3.2rem)', lineHeight: 1.05 }}
              >
                Tools at&nbsp;<span style={{ color: 'var(--mauve)' }}>hand</span>.
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <p
                className="mt-5 font-sans text-[14px] leading-[1.75]"
                style={{ color: 'var(--fg-2)' }}
              >
                C# for systems. TypeScript for tooling and product. Python for AI workflows.
                Postgres, Redis, Elasticsearch for state. Docker and Kubernetes when needed; bare
                Hetzner when not. Cloudflare at the edge. Claude and Codex inside the loop.
              </p>
            </ScrollReveal>
          </div>

          <div
            className="relative flex flex-1 items-center justify-center"
            style={{ minHeight: 400 }}
          >
            <svg
              viewBox="0 0 400 400"
              className="w-full max-w-[500px]"
              style={{ overflow: 'visible' }}
            >
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
                    <circle
                      cx={cx}
                      cy={cy}
                      r={22}
                      fill={`${node.color}10`}
                      stroke={`${node.color}35`}
                      strokeWidth={1}
                    />
                    <circle
                      cx={cx}
                      cy={cy}
                      r={18}
                      fill={`${node.color}22`}
                      stroke={node.color}
                      strokeWidth={1.5}
                    />
                    <text
                      x={cx}
                      y={cy + 1}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="#F5F2ED"
                      fontSize={node.abbr.length > 2 ? 8 : 10}
                      fontWeight={600}
                      fontFamily="'JetBrains Mono', monospace"
                      letterSpacing={-0.5}
                    >
                      {node.abbr}
                    </text>
                    <text
                      x={cx}
                      y={cy + 34}
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

              <g
                style={{
                  opacity: isInView ? 1 : 0,
                  transform: isInView ? 'scale(1)' : 'scale(0)',
                  transformOrigin: '200px 200px',
                  transition: 'all 0.6s cubic-bezier(0.34,1.56,0.64,1) 0.3s',
                }}
              >
                <circle
                  cx={200}
                  cy={200}
                  r={28}
                  fill="rgba(255,85,0,0.08)"
                  stroke="rgba(255,85,0,0.25)"
                  strokeWidth={1}
                />
                <circle
                  cx={200}
                  cy={200}
                  r={24}
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
                  x={200}
                  y={200 + 44}
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

              {isInView &&
                techNodes.map((node, i) => {
                  const rad = (node.angle * Math.PI) / 180;
                  const x2 = 200 + 130 * Math.cos(rad);
                  const y2 = 200 + 130 * Math.sin(rad);
                  const dotColor = i % 3 === 0 ? '#C77DFF' : '#FF5500';
                  return (
                    <circle
                      key={`packet-${i}`}
                      r={2.5}
                      fill={dotColor}
                      opacity={0.55}
                    >
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

/* ══════════════════ SCENE 6 — PACKAGES ══════════════════ */

const packages = [
  {
    name: '@teckedd-code2save/datafy',
    description:
      'MCP database gateway. Two tools — execute_sql and search_objects — wired into Postgres, MySQL, SQLite, Redis, Elasticsearch, SQL Server, and MariaDB. Zero deps.',
    stack: ['MCP', 'Node.js', 'Postgres', 'Redis', 'Elasticsearch'],
    link: 'https://www.npmjs.com/package/@teckedd-code2save/datafy',
  },
  {
    name: '@teckedd-code2save/b2dp',
    description:
      'Business-to-data-platform CLI. Turns a spec into a provisioned schema, ORM, integration tests, frontend scaffold, and IaC — orchestrated by a modular MCP skill system.',
    stack: ['CLI', 'MCP', 'Node.js', 'Agent Workflow'],
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
            <Tag text="npm" tone={index === 0 ? 'orange' : 'mauve'} />
          </div>
          <p className="mt-4 font-sans text-[13px] leading-[1.78]" style={{ color: 'var(--fg-2)' }}>
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
            npm ↗
          </a>
        </div>
      </div>
    </ScrollReveal>
  );
}

function PackagesSection() {
  return (
    <section className="parallax-section" style={{ background: 'var(--bg)' }}>
      <div className="mx-auto max-w-[1200px] px-5 py-[80px] md:px-10 md:py-[140px]">
        <ScrollReveal>
          <SectionLabel number="04" text="PACKAGES" />
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <h2
            className="font-sans font-bold tracking-[-0.025em] text-[var(--fg)]"
            style={{ fontSize: 'clamp(2rem, 4.5vw, 3.4rem)', lineHeight: 1.05 }}
          >
            On&nbsp;<span style={{ color: 'var(--orange)' }}>npm</span>.
          </h2>
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

/* ══════════════════ SCENE 7 — CREDENTIALS ══════════════════ */

const credentials = [
  {
    title: 'Terraform on Google Cloud',
    category: 'cloud',
    issuer: 'Google Cloud',
    date: 'Mar 2026',
    id: 'QV7GTSK9A0AG',
    tags: ['Terraform', 'GCP', 'IaC'],
  },
  {
    title: 'Open Generative AI Engineering',
    category: 'ai',
    issuer: 'Google',
    date: 'Feb 2026',
    id: 'YMOK2TV2T0JK',
    tags: ['LLMs', 'Agents'],
  },
  {
    title: 'AWS Foundations and Core Services',
    category: 'cloud',
    issuer: 'AWS',
    date: 'Feb 2026',
    id: 'CK4LVBUM6CFH',
    tags: ['AWS', 'EC2', 'S3', 'RDS'],
  },
  {
    title: 'Kubernetes — Basics to Guru',
    category: 'devops',
    issuer: 'Coursera',
    date: 'Feb 2026',
    id: 'DFX1W42R91VU',
    tags: ['Kubernetes', 'GitOps'],
  },
  {
    title: 'CI/CD with Docker',
    category: 'devops',
    issuer: 'Coursera',
    date: 'Jan 2026',
    id: 'KJVWV84YKH9J',
    tags: ['Docker', 'GitHub Actions'],
  },
  {
    title: 'B.S. Computer Science',
    category: 'education',
    issuer: 'KNUST',
    date: '2021',
    id: null as string | null,
    tags: ['Algorithms', 'Systems'],
  },
];

function CredentialRow({ cred, index }: { cred: typeof credentials[0]; index: number }) {
  return (
    <ScrollReveal delay={index * 0.05} translateY={14} duration={0.55}>
      <div
        className="group grid cursor-default gap-4 transition-all duration-200 sm:grid-cols-[1fr_auto]"
        style={{
          padding: '22px 0',
          borderBottom: '1px solid var(--border)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateX(4px)';
          e.currentTarget.style.backgroundColor = 'rgba(255,85,0,0.025)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateX(0)';
          e.currentTarget.style.backgroundColor = 'transparent';
        }}
      >
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="font-mono text-sm font-medium" style={{ color: 'var(--fg)' }}>
              {cred.title}
            </h3>
            <Tag text={cred.category} tone={cred.category === 'ai' ? 'mauve' : 'neutral'} />
          </div>
          <p className="mt-1.5 font-mono text-[11px]" style={{ color: 'var(--fg-2)' }}>
            {cred.issuer} · {cred.date}
          </p>
          <div className="mt-1.5 flex flex-wrap gap-3">
            {cred.tags.map((t) => (
              <span
                key={t}
                className="font-mono text-[9px] uppercase tracking-widest"
                style={{ color: 'var(--fg-4)' }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
        {cred.id && (
          <div className="flex items-center">
            <span className="font-mono text-[10px]" style={{ color: 'var(--fg-4)' }}>
              {cred.id}
            </span>
          </div>
        )}
      </div>
    </ScrollReveal>
  );
}

function CredentialsSection() {
  return (
    <section className="parallax-section" style={{ background: 'var(--bg-1)' }}>
      <div className="mx-auto max-w-[1200px] px-5 py-[80px] md:px-10 md:py-[140px]">
        <ScrollReveal>
          <SectionLabel number="05" text="CREDENTIALS" />
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <h2
            className="font-sans font-bold tracking-[-0.025em] text-[var(--fg)]"
            style={{ fontSize: 'clamp(2rem, 4.5vw, 3.4rem)', lineHeight: 1.05 }}
          >
            Paper&nbsp;<span style={{ color: 'var(--mauve)' }}>trail</span>.
          </h2>
        </ScrollReveal>

        <div className="mt-10">
          {credentials.map((cred, i) => (
            <CredentialRow key={cred.title} cred={cred} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════ SCENE 8 — CONTACT CTA ══════════════════ */

const contactLinks = [
  { key: 'email',     value: 'edwardktwumasi1000@gmail.com', href: 'mailto:edwardktwumasi1000@gmail.com' },
  { key: 'github',    value: 'teckedd-code2save',            href: 'https://github.com/teckedd-code2save' },
  { key: 'linkedin',  value: 'edward-twumasi',               href: 'https://linkedin.com/in/edward-twumasi' },
  { key: 'studio',    value: 'serendepify.com',              href: 'https://www.serendepify.com/' },
];

function ContactCTASection() {
  return (
    <section
      className="parallax-section relative px-5 py-[120px] md:py-[180px]"
      style={{ background: 'var(--bg)' }}
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.10]">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          {([
            '#FF5500', '#C77DFF', '#FF5500', '#C77DFF', '#FF5500',
            '#C77DFF', '#FF5500', '#C77DFF', '#FF5500', '#C77DFF',
            '#FF5500', '#C77DFF', '#FF5500', '#C77DFF', '#FF5500',
            '#C77DFF', '#FF5500', '#C77DFF', '#FF5500', '#C77DFF',
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
                values="0.25;0.85;0.25"
                repeatCount="indefinite"
              />
            </circle>
          ))}
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-[680px] text-center">
        <ScrollReveal>
          <SectionLabel number="06" text="CONTACT" />
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2
            className="mx-auto mt-2 font-sans font-bold tracking-[-0.03em] text-[var(--fg)]"
            style={{ fontSize: 'clamp(2.4rem, 6vw, 4.8rem)', lineHeight: 1 }}
          >
            Build something&nbsp;
            <span style={{ color: 'var(--orange)' }}>real</span>?
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p
            className="mx-auto mt-6 max-w-[520px] font-sans text-[15px] leading-[1.6]"
            style={{ color: 'var(--fg-2)' }}
          >
            Backend, agents, infra. Contract or full-time. East Africa, EU, US time zones — all fine.
          </p>
        </ScrollReveal>

        <div className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {contactLinks.map((link, i) => (
            <ScrollReveal key={link.key} delay={0.3 + i * 0.08} translateY={20}>
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

        <ScrollReveal delay={0.7}>
          <div className="mt-10">
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
              full contact &rarr;
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ══════════════════ HOME PAGE ══════════════════ */

export default function Home() {
  return (
    <>
      <HeroSection />
      <ManifestoSection />
      <FeaturedProjectsSection />
      <DeploymentSection />
      <TechStackSection />
      <PackagesSection />
      <CredentialsSection />
      <ContactCTASection />
    </>
  );
}
