import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen, within } from '@testing-library/react';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';
import QuickHelp from '../components/QuickHelp';
import QuickHelpPage from '../pages/QuickHelpPage';

function LocationProbe() {
  const location = useLocation();
  return <output aria-label="Current route">{location.pathname}{location.search}</output>;
}

function renderHelp(entry = '/help') {
  return render(
    <MemoryRouter initialEntries={[entry]}>
      <Routes><Route path="/help" element={<QuickHelpPage />} /></Routes>
      <LocationProbe />
    </MemoryRouter>,
  );
}

function emailDraft() {
  const href = screen.getByRole('link', { name: /Continue in email/ }).getAttribute('href');
  if (!href) throw new Error('The email action needs a real draft URL');
  return new URL(href);
}

describe('Quick help', () => {
  it('offers three focused home-page links with service-specific deep links', () => {
    render(<MemoryRouter><QuickHelp /></MemoryRouter>);
    const offers = within(screen.getByRole('region', { name: /Small scope.*Serious engineering/ }));
    expect(offers.getByRole('link', { name: /API integration/ })).toHaveAttribute('href', '/help?service=api');
    expect(offers.getByRole('link', { name: /Deployments/ })).toHaveAttribute('href', '/help?service=deployment');
    expect(offers.getByRole('link', { name: /Automations/ })).toHaveAttribute('href', '/help?service=automation');
    expect(offers.getByRole('link', { name: /Tell me what you need/ })).toHaveAttribute('href', '/help');
  });

  it('initializes the deployment choice and a useful email outline from its deep link', () => {
    renderHelp('/help?service=deployment');
    expect(screen.getByRole('radio', { name: 'Deployments' })).toBeChecked();
    expect(screen.getByRole('radio', { name: 'API integration' })).not.toBeChecked();
    expect(screen.getAllByRole('radio')).toHaveLength(3);
    expect(screen.getByRole('radiogroup', { name: 'Service' })).toBeInTheDocument();

    const draft = emailDraft();
    expect(draft.protocol).toBe('mailto:');
    expect(draft.pathname).toBe('edwardktwumasi1000@gmail.com');
    expect(draft.searchParams.get('subject')).toBe('Quick help — Deployments');
    expect(draft.searchParams.get('body')).toContain('I’d like help with deployments.');
    expect(draft.searchParams.get('body')).toContain('What I’m trying to do:');
    expect(draft.searchParams.get('body')).toContain('Preferred timing:');
    expect(screen.getByRole('link', { name: /See the delivery systems I built/ })).toHaveAttribute('href', '/projects');
  });

  it('keeps the brief when changing service and correctly encodes special characters in the draft', () => {
    renderHelp('/help?service=deployment');
    const brief = '  Sync A&B + C?\nUse /v1/orders#recent; “Twi” ɛ.\n&bcc=not-a-recipient@example.test  ';
    const input = screen.getByRole('textbox', { name: 'What are you trying to get done?' });
    fireEvent.change(input, { target: { value: brief } });
    fireEvent.click(screen.getByRole('radio', { name: 'Automations' }));

    expect(input).toHaveValue(brief);
    expect(screen.getByRole('radio', { name: 'Automations' })).toBeChecked();
    expect(screen.getByRole('radio', { name: 'Deployments' })).not.toBeChecked();
    expect(screen.getByLabelText('Current route')).toHaveTextContent('/help?service=automation');
    const draft = emailDraft();
    expect(draft.searchParams.get('subject')).toBe('Quick help — Automations');
    expect(draft.searchParams.get('body')).toBe(`Hi Edward,\n\nI’d like help with automations.\n\n${brief.trim()}\n\nThanks!`);
    expect([...draft.searchParams.keys()]).toEqual(['subject', 'body']);
    expect(draft.hash).toBe('');
    expect(screen.getByRole('link', { name: /Read how GroundControl enables host control/ })).toHaveAttribute('href', '/article/nsenter-bridge');
  });

  it.each(['missing', '__proto__', 'constructor', '<script>alert(1)</script>', 'api&bcc=unwanted@example.test'])(
    'falls back to API integration for unrecognized service %s',
    (service) => {
      renderHelp(`/help?service=${encodeURIComponent(service)}`);
      expect(screen.getByRole('radio', { name: 'API integration' })).toBeChecked();
      expect(emailDraft().searchParams.get('subject')).toBe('Quick help — API integration');
      expect(emailDraft().searchParams.get('body')).not.toContain(service);
      expect(screen.getByRole('link', { name: /Explore my backend & product work/ })).toHaveAttribute('href', '/projects');
    },
  );

  it('keeps the brief optional, warns against secrets, and honestly describes an unsent email draft', () => {
    const { container } = renderHelp();
    const brief = screen.getByRole('textbox', { name: 'What are you trying to get done?' });
    expect(brief).not.toBeRequired();
    expect(brief).toHaveAttribute('maxlength', '1800');
    expect(brief).toHaveAccessibleDescription(/Please leave out passwords, API keys, and private customer data/);
    expect(screen.getAllByRole('textbox')).toHaveLength(1);
    expect(container.querySelector('input[type="password"]')).toBeNull();
    expect(container.querySelector('form')).toBeNull();
    expect(screen.getByText('Opens a draft in your email app. Nothing is sent here.')).toBeInTheDocument();
    expect(screen.queryByText(/successfully sent|message sent|thanks for your request/i)).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'edwardktwumasi1000@gmail.com' })).toHaveAttribute('href', 'mailto:edwardktwumasi1000@gmail.com');
    expect(screen.getByRole('link', { name: /Something bigger in mind/ })).toHaveAttribute('href', '/contact');
    expect(screen.getByText(/agree on the deliverable, fee, and timing before any work starts/)).toBeInTheDocument();
  });
});
