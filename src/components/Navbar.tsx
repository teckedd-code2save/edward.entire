import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { label: 'Projects', path: '/projects' },
  { label: 'Research', path: '/research' },
  { label: 'Contact', path: '/contact' },
];

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2.5 group" style={{ textDecoration: 'none' }}>
      <span
        style={{
          fontFamily: "'Manrope', system-ui, sans-serif",
          fontSize: '15px',
          fontWeight: 600,
          letterSpacing: '-0.04em',
          color: 'var(--fg)',
          transition: 'opacity 0.2s',
        }}
        className="group-hover:opacity-70"
      >
        precision
      </span>
      <span
        style={{
          fontFamily: "'Manrope', system-ui, sans-serif",
          fontSize: '15px',
          fontWeight: 300,
          letterSpacing: '-0.04em',
          color: 'var(--acid)',
          fontStyle: 'italic',
        }}
      >
        xyz
      </span>
    </Link>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: scrolled || menuOpen ? 'rgba(0,0,0,0.92)' : 'transparent',
        backdropFilter: scrolled || menuOpen ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: scrolled || menuOpen ? 'blur(16px)' : 'none',
        borderBottom: scrolled || menuOpen ? '1px solid var(--border)' : '1px solid transparent',
      }}
    >
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-5 py-4 md:px-10">
        <Logo />

        {/* Desktop */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => {
            const active = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className="transition-all duration-200"
                style={{
                  fontFamily: "'Manrope', system-ui, sans-serif",
                  fontSize: '13px',
                  fontWeight: 600,
                  letterSpacing: '0.01em',
                  color: active ? 'var(--fg)' : 'var(--fg-3)',
                  textDecoration: 'none',
                  borderBottom: active ? '1px solid var(--acid)' : '1px solid transparent',
                }}
                onMouseEnter={e => { if (!active) e.currentTarget.style.color = 'var(--fg)'; }}
                onMouseLeave={e => { if (!active) e.currentTarget.style.color = 'var(--fg-3)'; }}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Mobile hamburger */}
        <button
          className="flex flex-col gap-[5px] md:hidden"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <span className="block h-px w-5 transition-all duration-200"
            style={{ backgroundColor: 'var(--fg)', transform: menuOpen ? 'rotate(45deg) translateY(3px)' : 'none' }} />
          <span className="block h-px w-5 transition-all duration-200"
            style={{ backgroundColor: 'var(--fg)', opacity: menuOpen ? 0 : 1 }} />
          <span className="block h-px w-5 transition-all duration-200"
            style={{ backgroundColor: 'var(--fg)', transform: menuOpen ? 'rotate(-45deg) translateY(-3px)' : 'none' }} />
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="flex flex-col gap-1 px-5 pb-5 md:hidden" style={{ borderTop: '1px solid var(--border)' }}>
          {navLinks.map((link) => {
            const active = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                style={{
                  fontFamily: "'Manrope', system-ui, sans-serif",
                  fontSize: '15px',
                  fontWeight: 400,
                  color: active ? 'var(--fg)' : 'var(--fg-3)',
                  textDecoration: 'none',
                  padding: '14px 0',
                }}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}
