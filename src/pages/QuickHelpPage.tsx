import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { helpEmail, quickServices, serviceEmailHref } from '@/content/quick-help';
import '@/components/QuickHelp.css';

export default function QuickHelpPage() {
  const [params, setParams] = useSearchParams();
  const service = quickServices.find((item) => item.id === params.get('service')) ?? quickServices[0];
  const [brief, setBrief] = useState('');

  return (
    <div className="help-page">
      <section className="page-shell help-page-intro">
        <div><p className="eyebrow">Get quick help · With Edward Twumasi</p><h1>Let’s unblock<br />your next step.</h1></div>
        <p>One integration. A deployment. A task you’re tired of repeating. Tell me what needs to work, and we’ll find a sensible scope.</p>
      </section>
      <section className="page-shell help-workspace" aria-label="Choose a service and prepare your brief">
        <div className="help-services">
          <p className="help-step">01 / What do you need?</p>
          <RadioGroup value={service.id} onValueChange={(value) => setParams({ service: value }, { replace: true })} aria-label="Service">
            {quickServices.map((item) => (
              <label className={`help-service${item.id === service.id ? ' is-selected' : ''}`} key={item.id} htmlFor={`service-${item.id}`}>
                <RadioGroupItem id={`service-${item.id}`} value={item.id} aria-label={item.title} />
                <span><strong>{item.title}</strong><span className="help-service-description">{item.description}</span></span>
                <span className="help-service-arrow" aria-hidden="true">↗</span>
              </label>
            ))}
          </RadioGroup>
          <Link className="help-proof" to={service.proofPath}>{service.proof} <span aria-hidden="true">↗</span></Link>
        </div>
        <div className="help-brief">
          <p className="help-step">02 / A few details</p>
          <label htmlFor="help-brief">What are you trying to get done?</label>
          <p id="help-brief-hint">Your stack or tools, what’s blocked, and any deadline. A few lines are enough.</p>
          <Textarea id="help-brief" value={brief} onChange={(event) => setBrief(event.target.value)} maxLength={1800} rows={6} aria-describedby="help-brief-hint help-privacy" placeholder="I have an app that…" />
          <p className="help-privacy" id="help-privacy">Please leave out passwords, API keys, and private customer data.</p>
          <a className="button-primary help-email-action" href={serviceEmailHref(service, brief)}>Continue in email <span aria-hidden="true">↗</span></a>
          <p className="help-email-note">Opens a draft in your email app. Nothing is sent here.</p>
          <div className="help-direct"><span>Or email me directly</span><a href={`mailto:${helpEmail}`}>{helpEmail}</a></div>
        </div>
      </section>
      <section className="page-shell help-expectations" aria-labelledby="help-next">
        <div><p className="eyebrow">Before we begin</p><h2 id="help-next">Clear scope.<br />No surprises.</h2></div>
        <p>We’ll agree on the deliverable, fee, and timing before any work starts. The goal is a working result you can understand and maintain—not another dependency you can’t operate.</p>
        <Link to="/contact">Something bigger in mind?<br /><span>Let’s talk →</span></Link>
      </section>
    </div>
  );
}
