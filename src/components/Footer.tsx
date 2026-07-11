import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-shadow-word" aria-hidden="true">precision</div>
      <div className="page-shell footer-main">
        <div>
          <p className="footer-brand">precision <em>xyz</em></p>
          <p className="footer-copy">Engineering dependable systems and useful AI products from Accra—built to travel well beyond it.</p>
        </div>
        <div className="footer-links">
          <Link to="/projects">Selected work →</Link>
          <a href="https://github.com/teckedd-code2save" target="_blank" rel="noreferrer">GitHub ↗</a>
          <a href="https://www.linkedin.com/in/edward-twumasi" target="_blank" rel="noreferrer">LinkedIn ↗</a>
          <a href="https://www.serendepify.com/" target="_blank" rel="noreferrer">Serendepify ↗</a>
        </div>
      </div>
      <div className="page-shell footer-bottom">
        <span>© 2026 Edward Kwabena Twumasi</span>
        <span>Accra, Ghana · GMT</span>
        <span>Built with intent</span>
      </div>
    </footer>
  );
}
