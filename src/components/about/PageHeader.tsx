import { motion } from 'framer-motion';

const easeEnter = [0.0, 0, 0.2, 1] as [number, number, number, number];

export default function PageHeader() {
  return (
    <section
      className="w-full px-5 pt-40 pb-[60px] md:px-10"
      style={{ backgroundColor: 'var(--bg)' }}
    >
      <div className="mx-auto max-w-[1200px]">
        {/* Breadcrumb */}
        <motion.span
          className="mb-4 block font-mono text-[10px] tracking-[0.08em]"
          style={{ color: 'var(--fg-4)' }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easeEnter }}
        >
          edward twumasi / about
        </motion.span>

        {/* Heading */}
        <motion.h1
          className="font-mono font-bold tracking-[-0.03em]"
          style={{
            fontSize: 'clamp(40px, 6vw, 80px)',
            color: 'var(--fg)',
            lineHeight: 1.0,
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: easeEnter }}
        >
          About
        </motion.h1>

        {/* Subtext */}
        <motion.p
          className="mt-3 max-w-[560px] font-sans text-[15px] leading-[1.7]"
          style={{ color: 'var(--fg-3)' }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: easeEnter }}
        >
          Engineer. Systems thinker. Builder of tools that outlast the problems they solve.
        </motion.p>
      </div>
    </section>
  );
}
