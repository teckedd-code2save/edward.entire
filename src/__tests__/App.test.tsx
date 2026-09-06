import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../App';

vi.mock('../components/workstation/WorkstationScene', () => ({
  default: () => <div data-testid="workstation-scene" />,
}));

beforeEach(() => {
  vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
});
afterEach(() => vi.restoreAllMocks());

describe('App', () => {
  it('renders the portfolio shell: navigation, home hero, and footer', async () => {
    render(<App />);

    // Brand lockup links home
    const brand = screen.getByRole('link', { name: /Edward Twumasi, home/ });
    expect(brand).toBeInTheDocument();

    // Primary navigation links
    const nav = screen.getByRole('navigation', { name: /Primary navigation/ });
    expect(nav).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Work' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Role fit' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Writing' })).toHaveAttribute('href', '#/articles');
    expect(screen.getByRole('link', { name: 'Contact' })).toBeInTheDocument();

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('AI, beyond the model.');
    expect(await screen.findByTestId('workstation-scene')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Three systems.*One through-line/ })).toBeInTheDocument();

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
