import { motion } from 'framer-motion';
import { filterCategories } from './projectData';
import type { ProjectCategory } from './projectData';

interface CategoryFilterProps {
  active: ProjectCategory;
  onChange: (category: ProjectCategory) => void;
}

export default function CategoryFilter({ active, onChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {filterCategories.map((cat, i) => (
        <motion.button
          key={cat.value}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: 0.3 + i * 0.05,
            ease: [0.0, 0, 0.2, 1] as [number, number, number, number],
          }}
          onClick={() => onChange(cat.value)}
          className="relative cursor-pointer font-mono text-[11px] transition-none"
          style={{
            padding: '8px 16px',
            border: '1px solid',
            borderColor: active === cat.value ? 'var(--accent)' : 'var(--border)',
            backgroundColor: active === cat.value ? 'var(--accent)' : 'transparent',
            color: active === cat.value ? '#f5f5f5' : 'var(--fg-3)',
          }}
        >
          {cat.label}
        </motion.button>
      ))}
    </div>
  );
}
