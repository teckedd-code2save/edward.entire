import { Link } from 'react-router-dom';
import CinematicHero from '@/components/workstation/CinematicHero';

export default function SystemPrototype() {
  return (
    <div className="system-prototype">
      <CinematicHero />

      <section className="prototype-outro page-shell">
        <h2>Research, software, and operations belong to the same system.</h2>
        <p>The same path connects Ghana Health AI, Backend as Natural Language, GroundControl, and the infrastructure used to ship them.</p>
        <div className="hero-actions"><Link className="lab-button" to="/projects">Explore the work ↗</Link><Link className="lab-text-link" to="/">Return home</Link></div>
      </section>
    </div>
  );
}
