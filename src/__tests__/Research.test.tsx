import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Research from '../pages/Research';

describe('Research evidence', () => {
  it('shows the dated understanding update and its source', () => {
    render(<Research />);
    expect(screen.getByRole('heading', { name: /Build the data.*Test the meaning/ })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '9f4ff2c' })).toHaveAttribute('href', expect.stringContaining('9f4ff2c490da50762f7a6afc9e807143d4842e84'));
  });

  it('keeps research results distinct from production and gold data', () => {
    render(<Research />);
    expect(screen.getByText(/different denominators prevent a like-for-like improvement claim/)).toBeInTheDocument();
    expect(screen.getByText(/not clinician-validated or human-verified gold data/)).toBeInTheDocument();
    expect(screen.queryByText(/ASR \/ EXP-026/)).not.toBeInTheDocument();
  });
});
