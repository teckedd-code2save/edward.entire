import { memo } from 'react';
import { motion } from 'framer-motion';

// Pulsing dot isolated with memo to prevent parent re-renders from resetting animation
const PulsingDot = memo(function PulsingDot() {
  return (
    <span
      className="relative inline-flex h-2 w-2"
    >
      <span
        className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
        style={{ backgroundColor: '#4ade80' }}
      />
      <span
        className="relative inline-flex h-2 w-2 rounded-full"
        style={{ backgroundColor: '#4ade80' }}
      />
    </span>
  );
});

export default function AvailabilityStatus() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.7,
        delay: 0.3,
        ease: [0.0, 0, 0.2, 1] as [number, number, number, number],
      }}
      style={{
        backgroundColor: 'var(--bg-2)',
        border: '1px solid var(--border)',
        padding: '28px',
      }}
    >
      {/* Status indicator row */}
      <div className="flex items-center gap-3">
        <PulsingDot />
        <span
          className="font-mono"
          style={{
            fontSize: '13px',
            fontWeight: 500,
            color: 'var(--fg)',
          }}
        >
          Available for work
        </span>
      </div>

      {/* Status detail */}
      <p
        className="mt-2 font-sans"
        style={{
          fontSize: '13px',
          color: 'rgba(255,255,255,0.72)',
          lineHeight: 1.6,
        }}
      >
        Open to backend engineering, distributed systems, and AI tooling work.
      </p>

      {/* Response time */}
      <p
        className="mt-3 font-mono"
        style={{
          fontSize: '10px',
          color: 'var(--fg-3)',
        }}
      >
        Typically responds within 24 hours
      </p>
    </motion.div>
  );
}
