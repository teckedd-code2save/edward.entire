import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Research from '../pages/Research';

describe('Research evidence', () => {
  it('shows the current research programme and active evidence sources', () => {
    render(<Research />);
    expect(screen.getByRole('heading', { name: /A model programme.*not a demo/ })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Inspect the handoff/ })).toHaveAttribute(
      'href',
      expect.stringContaining('alignment-handoff-20260915.md'),
    );
    expect(screen.getByRole('link', { name: /Inspect the open MORENA audit/ })).toHaveAttribute(
      'href',
      'https://github.com/teckedd-code2save/ghana-health-ai/pull/37',
    );
    expect(screen.getAllByText(/active research branch/).length).toBeGreaterThan(0);
  });

  it('keeps source counts, research state, and production claims distinct', () => {
    render(<Research />);
    expect(screen.getByText(/two directions, not unique sources/)).toBeInTheDocument();
    expect(screen.getByText('active response models promoted')).toBeInTheDocument();
    expect(screen.getByText(/research remains isolated/)).toBeInTheDocument();
    expect(screen.getByText(/No result on this page establishes clinical safety or native-speaker certification/)).toBeInTheDocument();
    expect(screen.queryByText(/ASR \/ EXP-026/)).not.toBeInTheDocument();
  });
});
