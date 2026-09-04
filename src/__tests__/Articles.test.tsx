import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Articles from '../pages/Articles';
import ArticleViewer from '../pages/ArticleViewer';

describe('Writing', () => {
  it('publishes GroundControl and Ghana Health AI essays without placeholders', () => {
    render(<MemoryRouter><Articles /></MemoryRouter>);
    expect(screen.getByText('We Trained an Interpreter.')).toBeInTheDocument();
    expect(screen.getByText('Meaning Before')).toBeInTheDocument();
    expect(screen.getByText('Garbage Collection Is')).toBeInTheDocument();
    expect(screen.getByText('When a Green Deploy')).toBeInTheDocument();
    expect(screen.queryByText('Coming soon')).not.toBeInTheDocument();
  });

  it('renders a complete response-model article', () => {
    render(<MemoryRouter initialEntries={['/article/training-an-interpreter-not-an-assistant']}><Routes><Route path="/article/:id" element={<ArticleViewer />} /></Routes></MemoryRouter>);
    expect(screen.getByRole('heading', { name: /We Trained an Interpreter/ })).toBeInTheDocument();
    expect(screen.getByText(/The zero-row result is a success/)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /commit d459c2a/ })).toHaveAttribute('href', expect.stringContaining('d459c2a'));
  });
});
