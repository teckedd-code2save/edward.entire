import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Research from '../pages/Research';

describe('Research evidence', () => {
  it('connects the findings to their sources and preserves chapter navigation', () => {
    render(<MemoryRouter><Research /></MemoryRouter>);
    const speech = screen.getByRole('region', { name: /First, hear the words/ });
    speech.scrollIntoView = () => {};
    fireEvent.click(screen.getByRole('button', { name: /Hear the words/ }));
    expect(speech).toHaveFocus();
    expect(screen.getByRole('link', { name: /Inspect the data handoff/ })).toHaveAttribute(
      'href',
      expect.stringContaining('alignment-handoff-20260915.md'),
    );
    fireEvent.click(screen.getByText('Next experiments'));
    expect(screen.getByRole('link', { name: /Inspect the MORENA audit/ })).toHaveAttribute(
      'href',
      'https://github.com/teckedd-code2save/ghana-health-ai/pull/37',
    );
    expect(screen.getByRole('link', { name: /Try the compiler/ })).toHaveAttribute('href', '/playground/bnl');
  });

  it('keeps source counts, research state, and production claims distinct', () => {
    render(<MemoryRouter><Research /></MemoryRouter>);
    expect(screen.getByText('Speech evaluation details').closest('details')).not.toHaveAttribute('open');
    fireEvent.click(screen.getByText('Speech evaluation details'));
    expect(screen.getByText('Speech evaluation details').closest('details')).toHaveAttribute('open');
    expect(screen.getByText(/different runs and conditions/)).toBeInTheDocument();
    expect(screen.getByText(/not additional conversations/)).toBeInTheDocument();
    expect(screen.getByText(/did not train a new model or change production chat/)).toBeInTheDocument();
    expect(screen.getByText(/No result here establishes clinical safety or native-speaker certification/)).toBeInTheDocument();
  });
});
