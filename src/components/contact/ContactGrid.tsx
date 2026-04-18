import { Mail, Github, Linkedin, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface ContactCardProps {
  icon: ReactNode;
  label: string;
  value: string;
  href: string;
  index: number;
}

function ContactCard({ icon, label, value, href, index }: ContactCardProps) {
  return (
    <motion.a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.7,
        delay: 0.3 + index * 0.1,
        ease: [0.0, 0, 0.2, 1] as [number, number, number, number],
      }}
      className="group block"
      style={{
        border: '1px solid var(--border)',
        padding: '32px',
        backgroundColor: 'var(--bg-2)',
      }}
      whileHover={{
        y: -2,
        borderColor: 'var(--accent)',
        transition: { duration: 0.2 },
      }}
    >
      <div
        className="mb-4"
        style={{ color: 'var(--fg-3)' }}
      >
        {icon}
      </div>
      <div
        className="font-mono uppercase"
        style={{
          fontSize: '10px',
          letterSpacing: '0.14em',
          color: 'var(--fg-3)',
          marginBottom: '8px',
        }}
      >
        {label}
      </div>
      <div
        className="font-mono"
        style={{
          fontSize: '14px',
          color: 'var(--fg-2)',
        }}
      >
        {value}
      </div>
    </motion.a>
  );
}

const contacts = [
  {
    icon: <Mail size={24} />,
    label: 'email',
    value: 'edwardktwumasi1000@gmail.com',
    href: 'mailto:edwardktwumasi1000@gmail.com',
  },
  {
    icon: <Github size={24} />,
    label: 'github',
    value: 'teckedd-code2save',
    href: 'https://github.com/teckedd-code2save',
  },
  {
    icon: <Linkedin size={24} />,
    label: 'linkedin',
    value: 'edward-twumasi',
    href: 'https://www.linkedin.com/in/edward-twumasi/',
  },
  {
    icon: <Globe size={24} />,
    label: 'company',
    value: 'serendepifydev.vercel.app',
    href: 'https://serendepifydev.vercel.app/',
  },
];

export default function ContactGrid() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {contacts.map((contact, index) => (
        <ContactCard
          key={contact.label}
          icon={contact.icon}
          label={contact.label}
          value={contact.value}
          href={contact.href}
          index={index}
        />
      ))}
    </div>
  );
}
