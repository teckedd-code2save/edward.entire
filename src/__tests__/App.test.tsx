import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, within } from '@testing-library/react';
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
    expect(within(nav).getAllByRole('link').map(link => link.textContent)).toEqual(expect.arrayContaining(['Work', 'Research', 'Writing', 'Contact']));
    expect(within(nav).queryByRole('link', { name: 'Role fit' })).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Writing' })).toHaveAttribute('href', '#/articles');
    expect(screen.getByRole('link', { name: 'Contact' })).toBeInTheDocument();

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('I turn ideas into working products.');
    expect(await screen.findByTestId('workstation-scene')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Selected work.' })).toBeInTheDocument();
    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(10);

    // Footer brand + copyright (brand text spans a nested <em>, so assert on the footer element)
    const footer = screen.getByRole('contentinfo');
    expect(within(footer).getByRole('link', { name: /Working together/ })).toHaveAttribute('href', '#/fit');
    expect(footer).toHaveTextContent(/precision xyz/i);
    expect(footer).toHaveTextContent(/© 2026 Edward Kwabena Twumasi/);
  });

  it('lets visitors jump past the cinematic sequence to selected work', async () => {
    render(<App />);
    await screen.findByTestId('workstation-scene');
    const work = screen.getByRole('region', { name: 'Selected work.' });
    work.scrollIntoView = vi.fn();
    fireEvent.click(screen.getByRole('button', { name: 'See selected work' }));
    expect(work).toHaveFocus();
    expect(work.scrollIntoView).toHaveBeenCalledWith({ behavior: 'auto', block: 'start' });
    expect(screen.getByTestId('workstation-scene')).toBeInTheDocument();
  });

  it('navigates to the Projects route', () => {
    render(<App />);
    const workLink = screen.getByRole('link', { name: 'Work' });
    expect(workLink).toHaveAttribute('href', '#/projects');
  });
});
