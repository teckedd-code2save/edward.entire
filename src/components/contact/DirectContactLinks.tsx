import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

interface ContactLink {
  label: string;
  value: string;
  href: string;
  external?: boolean;
}

const links: ContactLink[] = [
  {
    label: 'email',
    value: 'edwardktwumasi1000@gmail.com',
    href: 'mailto:edwardktwumasi1000@gmail.com',
  },
  {
    label: 'github',
    value: 'teckedd-code2save',
    href: 'https://github.com/teckedd-code2save',
    external: true,
  },
  {
    label: 'linkedin',
    value: 'edward-twumasi',
    href: 'https://www.linkedin.com/in/edward-twumasi/',
    external: true,
  },
  {
    label: 'company',
    value: 'serendepify.com',
    href: 'https://www.serendepify.com/',
    external: true,
  },
  {
    label: 'phone',
    value: '+233 552 489 602',
    href: 'tel:+233552489602',
  },
];

function ContactRow({ link, index }: { link: ContactLink; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.a
      href={link.href}
      target={link.external ? '_blank' : undefined}
      rel={link.external ? 'noopener noreferrer' : undefined}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: 0.5 + index * 0.08,
        ease: [0.0, 0, 0.2, 1] as [number, number, number, number],
      }}
      className="flex items-center gap-4"
      style={{
        padding: '16px 0',
        borderBottom: '1px solid var(--border)',
        transform: hovered ? 'translateX(4px)' : 'translateX(0)',
        transition: 'transform 0.2s ease',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Label */}
      <span
        className="font-mono uppercase"
        style={{
          fontSize: '10px',
          letterSpacing: '0.12em',
          color: 'var(--fg-3)',
          minWidth: '64px',
        }}
      >
        {link.label}
      </span>

      {/* Value */}
      <span
        className="font-mono"
        style={{
          fontSize: '12px',
          color: hovered ? 'var(--fg)' : 'var(--fg-2)',
          transition: 'color 0.2s ease',
        }}
      >
        {link.value}
      </span>

      {/* Arrow on hover */}
      <span
        className="ml-auto font-mono"
        style={{
          fontSize: '12px',
          color: 'var(--fg-3)',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.2s ease',
        }}
      >
        <ExternalLink size={12} />
      </span>
    </motion.a>
  );
}

export default function DirectContactLinks() {
  return (
    <div style={{ borderTop: '1px solid var(--border)' }}>
      {links.map((link, index) => (
        <ContactRow key={link.label} link={link} index={index} />
      ))}
    </div>
  );
}
