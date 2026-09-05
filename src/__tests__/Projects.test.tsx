import { describe, expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import Projects from '../pages/Projects';

describe('Projects hierarchy', () => {
  it('separates flagship work from the wider archive', () => {
    render(<Projects />);
    const featured = screen.getByRole('region', { name: 'Featured work' });
    expect(within(featured).getByRole('heading', { name: 'Ghana Health AI' })).toBeInTheDocument();
    expect(within(featured).getByRole('heading', { name: 'Backend as Natural Language' })).toBeInTheDocument();
    expect(within(featured).getByRole('heading', { name: 'GroundControl' })).toBeInTheDocument();

    const archive = screen.getByRole('region', { name: 'Project archive' });
    expect(within(archive).getByRole('heading', { name: 'Convoy' })).toBeInTheDocument();
    expect(within(archive).queryByRole('heading', { name: 'Ghana Health AI' })).not.toBeInTheDocument();
  });
});
