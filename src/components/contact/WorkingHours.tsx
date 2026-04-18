import { motion } from 'framer-motion';

export default function WorkingHours() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{
        duration: 0.7,
        delay: 0.12,
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
        Working Hours
      </div>

      {/* Weekday hours */}
      <div
        className="font-mono"
        style={{
          fontSize: '14px',
          color: 'var(--fg-2)',
          lineHeight: 1.6,
        }}
      >
        <div>Monday – Friday</div>
        <div>09:00 – 18:00 GMT</div>
      </div>

      {/* Weekend note */}
      <div
        className="mt-3 font-mono"
        style={{
          fontSize: '12px',
          color: 'var(--fg-3)',
        }}
      >
        Weekends: Limited availability
      </div>

      {/* Timezone flexibility */}
      <p
        className="mt-3 font-sans"
        style={{
          fontSize: '13px',
          color: 'rgba(255,255,255,0.6)',
          lineHeight: 1.6,
        }}
      >
        Flexible for overlap with EST, PST, and EAT timezones.
      </p>
    </motion.div>
  );
}
