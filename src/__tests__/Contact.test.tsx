import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Contact from '../pages/Contact';

function draft() {
  return new URL(screen.getByRole('link', { name: /Open an email draft/ }).getAttribute('href')!);
}

describe('Starting a conversation', () => {
  it('uses the role deep link to prepare an editable email outline', () => {
    render(<MemoryRouter initialEntries={['/contact?topic=role']}><Contact /></MemoryRouter>);
    expect(screen.getByRole('radio', { name: 'A role' })).toBeChecked();
    expect(draft().searchParams.get('subject')).toBe('A role to discuss');
    expect(draft().searchParams.get('body')).toContain('The team and role:');
    expect(screen.getByRole('textbox', { name: /A short introduction/ })).not.toBeRequired();
    expect(screen.getByText('Opens your email app with these details. You review and send it there.')).toBeInTheDocument();
  });

  it('preserves a brief when changing topic and encodes it only as email body text', () => {
    render(<MemoryRouter><Contact /></MemoryRouter>);
    const text = 'Twi & English?\n&bcc=not-a-recipient@example.test #idea + research';
    const input = screen.getByRole('textbox', { name: /A short introduction/ });
    fireEvent.change(input, { target: { value: text } });
    fireEvent.click(screen.getByRole('radio', { name: 'Research' }));
    expect(input).toHaveValue(text);
    expect(draft().searchParams.get('subject')).toBe('A research conversation');
    expect(draft().searchParams.get('body')).toContain(text);
    expect(draft().pathname).toBe('edwardktwumasi1000@gmail.com');
    expect([...draft().searchParams.keys()]).toEqual(['subject', 'body']);
    expect(draft().hash).toBe('');
  });

  it('falls back to a project for unrecognized topics', () => {
    render(<MemoryRouter initialEntries={['/contact?topic=constructor']}><Contact /></MemoryRouter>);
    expect(screen.getByRole('radio', { name: 'A project' })).toBeChecked();
    expect(draft().searchParams.get('body')).toContain('The idea or problem:');
  });
});
