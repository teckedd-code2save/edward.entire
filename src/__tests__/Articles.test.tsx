import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Articles from '../pages/Articles';
import ArticleViewer from '../pages/ArticleViewer';

describe('Writing', () => {
  it('publishes GroundControl and Ghana Health AI essays without placeholders', () => {
    render(<MemoryRouter><Articles /></MemoryRouter>);
    expect(screen.getByText('Training a Direct-Response Twi Model')).toBeInTheDocument();
    expect(screen.getByText('Semantic Accuracy as a Health Safety Boundary')).toBeInTheDocument();
    expect(screen.getByText('Designing Safe Docker Garbage Collection')).toBeInTheDocument();
    expect(screen.getByText('When Cleanup Fails After a Successful Deploy')).toBeInTheDocument();
    expect(screen.queryByText('Coming soon')).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Training a Direct-Response Twi Model' })).toHaveAttribute('href', '/article/training-an-interpreter-not-an-assistant');
    expect(screen.getByRole('link', { name: /Designing Safe Docker Garbage Collection/ })).toHaveAttribute('href', '/article/garbage-collection-is-product-design');
    expect(screen.getByRole('link', { name: /How GroundControl’s Terminal Reaches the Host/ })).toHaveAttribute('href', '/article/nsenter-bridge');
  });

  it('preserves the terminal essay URL with the verified host bridge and trust boundary', () => {
    render(<MemoryRouter initialEntries={['/article/nsenter-bridge']}><Routes><Route path="/article/:id" element={<ArticleViewer />} /></Routes></MemoryRouter>);
    expect(screen.getByRole('heading', { name: /How GroundControl’s Terminal Reaches the Host/ })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Ephemeral does not mean least privilege' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'AI proposes; the operator runs' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Docker host bridge' })).toHaveAttribute('href', expect.stringContaining('a387ac7'));
  });

  it('renders a complete response-model article', () => {
    render(<MemoryRouter initialEntries={['/article/training-an-interpreter-not-an-assistant']}><Routes><Route path="/article/:id" element={<ArticleViewer />} /></Routes></MemoryRouter>);
    expect(screen.getByRole('heading', { name: /Training a Direct-Response.*Twi Model/ })).toBeInTheDocument();
    expect(screen.getByText(/The zero-row result is a success/)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /commit d459c2a/ })).toHaveAttribute('href', expect.stringContaining('d459c2a'));
    expect(screen.getByRole('link', { name: /The journal/ })).toHaveAttribute('href', '/articles');
  });

  it.each(['missing', 'constructor', 'toString', '__proto__'])('offers a normal navigation link for unknown article %s', id => {
    render(<MemoryRouter initialEntries={[`/article/${id}`]}><Routes><Route path="/article/:id" element={<ArticleViewer />} /></Routes></MemoryRouter>);
    expect(screen.getByRole('heading', { name: 'Article not found.' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Back to articles/ })).toHaveAttribute('href', '/articles');
  });
});
