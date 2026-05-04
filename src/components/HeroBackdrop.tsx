import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

/**
 * Cinematic hero backdrop — calm, mauve+orange, foreground-friendly.
 * Layers (back to front):
 *   1. Solid black base
 *   2. Two slow-drifting blurred orbs (mauve, orange)
 *   3. Faint dotted grid
 *   4. Slow horizontal scanline
 *   5. Subtle noise texture
 *   6. Dark vignette
 */
export default function HeroBackdrop() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const orbY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const gridY = useTransform(scrollYProgress, [0, 1], [0, -40]);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{ backgroundColor: 'var(--bg)' }}
    >
      {/* Mauve orb — top left */}
      <motion.div
        className="blob-drift absolute"
        style={{
          y: orbY,
          top: '-15%',
          left: '-12%',
          width: 'min(720px, 80vw)',
          height: 'min(720px, 80vw)',
          borderRadius: '50%',
          background:
            'radial-gradient(circle at 50% 50%, rgba(199,125,255,0.32) 0%, rgba(199,125,255,0.10) 32%, transparent 65%)',
          filter: 'blur(40px)',
        }}
      />

      {/* Orange orb — bottom right */}
      <motion.div
        className="blob-drift absolute"
        style={{
          y: orbY,
          bottom: '-22%',
          right: '-18%',
          width: 'min(820px, 90vw)',
          height: 'min(820px, 90vw)',
          borderRadius: '50%',
          background:
            'radial-gradient(circle at 50% 50%, rgba(255,85,0,0.30) 0%, rgba(255,85,0,0.08) 35%, transparent 65%)',
          filter: 'blur(48px)',
          animationDelay: '-8s',
        }}
      />

      {/* Tertiary deep-mauve shadow blob, low + center, anchors the composition */}
      <div
        className="absolute"
        style={{
          bottom: '-30%',
          left: '15%',
          width: '60%',
          height: '60%',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(74,30,90,0.28), transparent 60%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Faint dotted grid */}
      <motion.div
        className="absolute inset-0"
        style={{
          y: gridY,
          backgroundImage:
            'radial-gradient(rgba(245,242,237,0.07) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          maskImage:
            'radial-gradient(circle at 50% 50%, rgba(0,0,0,0.9) 0%, transparent 75%)',
          WebkitMaskImage:
            'radial-gradient(circle at 50% 50%, rgba(0,0,0,0.9) 0%, transparent 75%)',
        }}
      />

      {/* Subtle scanline that drifts vertically */}
      <motion.div
        className="absolute left-0 right-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(255,85,0,0.45) 50%, transparent 100%)',
          boxShadow: '0 0 18px rgba(255,85,0,0.25)',
        }}
        initial={{ top: '20%', opacity: 0 }}
        animate={{ top: ['20%', '80%', '20%'], opacity: [0, 0.45, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Mauve counter-scanline */}
      <motion.div
        className="absolute left-0 right-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(199,125,255,0.40) 50%, transparent 100%)',
          boxShadow: '0 0 16px rgba(199,125,255,0.22)',
        }}
        initial={{ top: '70%', opacity: 0 }}
        animate={{ top: ['70%', '15%', '70%'], opacity: [0, 0.4, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
      />

      {/* Noise texture for tactile feel */}
      <div className="noise-bg" style={{ opacity: 0.045 }} />

      {/* Vignette so text reads cleanly */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 55%, transparent 30%, rgba(0,0,0,0.55) 80%)',
        }}
      />

      {/* Bottom fade into the marquee */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32"
        style={{
          background: 'linear-gradient(180deg, transparent, var(--bg) 90%)',
        }}
      />
    </div>
  );
}
