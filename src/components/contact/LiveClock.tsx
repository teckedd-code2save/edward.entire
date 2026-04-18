import { useState, useEffect, memo } from 'react';
import { motion } from 'framer-motion';

// Clock display isolated with memo — updates every minute without affecting parent
const ClockDisplay = memo(function ClockDisplay() {
  const [time, setTime] = useState(() => {
    return new Date().toLocaleTimeString('en-US', {
      timeZone: 'Africa/Accra',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  });

  useEffect(() => {
    const updateClock = () => {
      setTime(
        new Date().toLocaleTimeString('en-US', {
          timeZone: 'Africa/Accra',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        })
      );
    };

    // Update immediately and then every minute
    updateClock();
    const interval = setInterval(updateClock, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="font-mono"
      style={{
        fontSize: 'clamp(24px, 4vw, 32px)',
        fontWeight: 300,
        color: 'var(--fg)',
        letterSpacing: '-0.02em',
        lineHeight: 1.1,
      }}
    >
      {time} <span style={{ color: 'var(--fg-3)', fontSize: '0.6em' }}>GMT</span>
    </div>
  );
});

export default function LiveClock() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{
        duration: 0.7,
        ease: [0.0, 0, 0.2, 1] as [number, number, number, number],
      }}
    >
      {/* Label */}
      <div
        className="font-mono uppercase"
        style={{
          fontSize: '10px',
          letterSpacing: '0.14em',
          color: 'var(--fg-3)',
          marginBottom: '12px',
        }}
      >
        local time (accra)
      </div>

      {/* Live clock */}
      <ClockDisplay />

      {/* UTC info */}
      <div
        className="mt-2 font-mono"
        style={{
          fontSize: '11px',
          color: 'var(--fg-3)',
        }}
      >
        UTC+0 / Greenwich Mean Time
      </div>

      {/* Daylight saving note */}
      <p
        className="mt-2 font-sans"
        style={{
          fontSize: '13px',
          color: 'rgba(255,255,255,0.6)',
        }}
      >
        No daylight saving time adjustments.
      </p>
    </motion.div>
  );
}
