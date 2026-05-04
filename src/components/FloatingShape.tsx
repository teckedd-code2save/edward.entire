import { motion } from 'framer-motion';

interface FloatingShapeProps {
  className?: string;
  size?: number;
  color?: string;
  delay?: number;
  duration?: number;
  style?: React.CSSProperties;
}

export default function FloatingShape({
  className = '',
  size = 40,
  color = 'var(--accent)',
  delay = 0,
  duration = 6,
  style = {},
}: FloatingShapeProps) {
  return (
    <motion.div
      className={`pointer-events-none absolute ${className}`}
      style={{
        width: size,
        height: size,
        background: color,
        opacity: 0.08,
        filter: 'blur(1px)',
        ...style,
      }}
      animate={{
        y: [0, -20, 8, -12, 0],
        rotate: [0, 8, -5, 12, 0],
        scale: [1, 1.05, 0.95, 1.02, 1],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
}
