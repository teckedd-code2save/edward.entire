import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const links = [
  { label: 'Work', path: '/projects' },
  { label: 'Research', path: '/research' },
  { label: 'Writing', path: '/articles' },
  { label: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const darkRoute = location.pathname === '/research';
  const studioRoute = !darkRoute;

  function showSelectedWork() {
    const work = document.getElementById('selected-work');
    work?.focus({ preventScroll: true });
    work?.scrollIntoView({ behavior: 'auto', block: 'start' });
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`nav-wrap${scrolled ? ' is-scrolled' : ''}${open ? ' is-open' : ''}${darkRoute ? ' on-dark' : ''}${studioRoute ? ' studio-nav' : ''}`} aria-label="Primary navigation">
      <div className="page-shell nav-inner">
        <Link to="/" className="brand-lockup" aria-label="Edward Twumasi, home" onClick={() => setOpen(false)}>
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
              className={`nav-link${location.pathname === link.path || (link.path === '/projects' && location.pathname.startsWith('/projects/')) ? ' active' : ''}`}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link to="/help" className={`nav-link nav-help-menu${location.pathname === '/help' ? ' active' : ''}`} onClick={() => setOpen(false)}>Get quick help ↗</Link>
        </div>

        {location.pathname === '/' ? <button type="button" className="nav-contact nav-work-link" onClick={showSelectedWork} aria-label="See selected work"><span className="nav-work-long">See selected work</span><span className="nav-work-short">View work</span><span aria-hidden="true">↓</span></button> : <Link to="/contact" className="nav-contact" onClick={() => setOpen(false)}>Let’s talk <span aria-hidden="true">↗</span></Link>}
        <button className="menu-button" type="button" aria-expanded={open} aria-label="Toggle navigation" onClick={() => setOpen((value) => !value)}>
          <span className="mono">{open ? 'Close' : 'Menu'}</span>
        </button>
      </div>
    </nav>
  );
}
