import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

export default function CVDownload() {
  return (
    <motion.a
      href="https://drive.google.com/file/d/1JOOIvOaqkOIb2CNFp-2q66To6ef7sg1P/view?usp=sharing"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: 0.9,
        ease: [0.0, 0, 0.2, 1] as [number, number, number, number],
      }}
      className="group inline-flex items-center gap-2 font-mono"
      style={{
        fontSize: '11px',
        color: 'var(--fg-2)',
        border: '1px solid var(--border-2)',
        padding: '10px 18px',
        marginTop: '24px',
      }}
      whileHover={{
        y: -2,
        borderColor: 'var(--accent)',
        color: 'var(--fg)',
        transition: { duration: 0.2 },
      }}
    >
      download cv
      <ExternalLink size={12} className="transition-colors" />
    </motion.a>
  );
}
