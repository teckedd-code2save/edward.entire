import { Link } from 'react-router-dom';
import { quickServices } from '@/content/quick-help';
import './QuickHelp.css';

export default function QuickHelp() {
  return (
    <section className="quick-help-band" aria-labelledby="quick-help-heading">
      <div className="page-shell">
        <div className="quick-help-intro">
          <div><p className="eyebrow">Get quick help</p><h2 id="quick-help-heading">Small scope.<br />Serious engineering.</h2></div>
          <p>You don’t need a whole new product to work with me. Bring the integration, deployment, or repetitive task that’s holding you up.</p>
        </div>
        <div className="quick-help-offers">
          {quickServices.map((service, index) => (
            <Link key={service.id} to={`/help?service=${service.id}`} className="quick-help-offer">
              <span className="quick-help-number">0{index + 1}<span aria-hidden="true">↗</span></span>
              <h3>{service.title}</h3><p>{service.promise}</p><span className="quick-help-scope">{service.scope}</span>
            </Link>
          ))}
        </div>
        <div className="quick-help-bottom"><p>A focused brief. An agreed scope. A clear handover.</p><Link to="/help">Tell me what you need <span aria-hidden="true">↗</span></Link></div>
      </div>
    </section>
  );
}
