import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App', () => {
  it('renders the portfolio shell: navigation, home hero, and footer', () => {
    render(<App />);

    // Brand lockup links home
    const brand = screen.getByRole('link', { name: /Edward Twumasi, home/ });
    expect(brand).toBeInTheDocument();

    // Primary navigation links
    const nav = screen.getByRole('navigation', { name: /Primary navigation/ });
    expect(nav).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Work' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Pitches' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Contact' })).toBeInTheDocument();

    // Home hero (h1 text is split across <br /> and nested spans)
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent(/I build systems that/);
    expect(heading).toHaveTextContent(/stay useful/);

    // Footer brand + copyright (brand text spans a nested <em>, so assert on the footer element)
    const footer = screen.getByRole('contentinfo');
    expect(footer).toHaveTextContent(/precision xyz/i);
    expect(footer).toHaveTextContent(/© 2026 Edward Kwabena Twumasi/);
  });

  it('navigates to the Projects route', () => {
    render(<App />);
    const workLink = screen.getByRole('link', { name: 'Work' });
    expect(workLink).toHaveAttribute('href', '#/projects');
  });
});
