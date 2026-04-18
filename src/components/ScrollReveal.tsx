import { useRef } from 'react';
import { useInView } from 'framer-motion';
import type { ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  translateY?: number;
  translateX?: number;
}

export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
  duration = 0.7,
  translateY = 24,
  translateX = 0,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-8% 0px' });

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView
          ? 'translateY(0) translateX(0)'
          : `translateY(${translateY}px) translateX(${translateX}px)`,
        transition: `opacity ${duration}s cubic-bezier(0.0, 0, 0.2, 1) ${delay}s, transform ${duration}s cubic-bezier(0.0, 0, 0.2, 1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}
