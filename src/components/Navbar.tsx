import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { label: 'projects', path: '/projects' },
  { label: 'about', path: '/about' },
  { label: 'contact', path: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: scrolled ? 'rgba(0,0,0,0.9)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
      }}
    >
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-5 py-4 md:px-10">
        <Link
          to="/"
          className="font-mono text-[13px] font-bold tracking-tight text-[var(--fg)] transition-colors hover:text-[var(--accent)]"
        >
          serendepify / edward twumasi
        </Link>

        <div className="flex items-center gap-6 md:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="font-mono text-[11px] transition-all duration-200"
              style={{
                color: location.pathname === link.path ? 'var(--fg)' : 'var(--fg-2)',
                borderBottom: location.pathname === link.path ? '1px solid var(--accent)' : '1px solid transparent',
              }}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://drive.google.com/file/d/1EdXxB7T8yNZnyEEdMGH9ZU41Vav53w7Q/view?usp=drive_link"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[11px] text-[var(--fg-2)] transition-all duration-200"
            style={{
              border: '1px solid var(--border-2)',
              padding: '6px 14px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-3)';
              e.currentTarget.style.color = 'var(--fg)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-2)';
              e.currentTarget.style.color = 'var(--fg-2)';
            }}
          >
            CV
          </a>
        </div>
      </div>
    </nav>
  );
}
