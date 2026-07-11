import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const links = [
  { label: 'Work', path: '/projects' },
  { label: 'Research', path: '/research' },
  { label: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`nav-wrap${scrolled ? ' is-scrolled' : ''}${open ? ' is-open' : ''}`} aria-label="Primary navigation">
      <div className="page-shell nav-inner">
        <Link to="/" className="brand-lockup" aria-label="Edward Twumasi, home">
          <span className="brand-sigil">ET</span>
          <span>
            <span className="brand-name">Edward Twumasi</span>
            <span className="brand-place">Engineer · Accra</span>
          </span>
        </Link>

        <div className={`nav-links${open ? ' open' : ''}`}>
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-link${location.pathname === link.path ? ' active' : ''}`}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <Link to="/contact" className="nav-contact"><i />Available for ambitious builds</Link>
        <button className="menu-button" type="button" aria-expanded={open} aria-label="Toggle navigation" onClick={() => setOpen((value) => !value)}>
          <span className="mono">{open ? 'Close' : 'Menu'}</span>
        </button>
      </div>
    </nav>
  );
}
