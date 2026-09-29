import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen, within } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Projects from '../pages/Projects';
import ProjectCaseStudy from '../pages/ProjectCaseStudy';

function renderWork(entry = '/projects') {
  return render(<MemoryRouter initialEntries={[entry]}><Routes>
    <Route path="/projects" element={<Projects />} />
    <Route path="/projects/:projectId" element={<ProjectCaseStudy />} />
    <Route path="/playground/bnl" element={<h1>BNL playground</h1>} />
  </Routes></MemoryRouter>);
}

describe('Work discovery', () => {
  it('shows the five approved spotlights in order and puts Haven first in the wider gallery', () => {
    renderWork();
    const spotlight = within(screen.getByRole('region', { name: 'In the spotlight.' }));
    expect(spotlight.getAllByRole('heading', { level: 3 }).map(heading => heading.textContent)).toEqual([
      'GroundControl', 'RentAWeekend', 'Ghana Health AI', 'Backend as Natural Language', 'Convoy',
    ]);
    const more = within(screen.getByRole('region', { name: 'More projects.' }));
    expect(more.getAllByRole('heading', { level: 3 }).map(heading => heading.textContent)).toEqual([
      'Haven', 'Pocket Models', 'Intent Engine', 'Adwuma Pa', 'Shipd',
    ]);
    expect(more.getByRole('link', { name: /Explore Haven/ })).toHaveAttribute('href', 'https://haven-room-studio-x9m4.createdliving1000.chatgpt.site/shop');
    expect(spotlight.queryByText(/70\.64|27\.31|WER/)).not.toBeInTheDocument();
  });

  it('filters the wider gallery without hiding any spotlight and restores the collection', () => {
    renderWork();
    const more = within(screen.getByRole('region', { name: 'More projects.' }));
    fireEvent.click(more.getByRole('button', { name: 'deployment' }));
    expect(more.getByRole('button', { name: 'deployment' })).toHaveAttribute('aria-pressed', 'true');
    expect(more.getAllByRole('heading', { level: 3 }).map(heading => heading.textContent)).toEqual(['Shipd']);
    expect(more.getByRole('status')).toHaveTextContent('Showing 1 project.');
    expect(screen.getByRole('heading', { name: 'RentAWeekend' })).toBeInTheDocument();
    fireEvent.click(more.getByRole('button', { name: 'all work' }));
    expect(more.getAllByRole('heading', { level: 3 })).toHaveLength(5);
  });

  it('opens a project, runs the internal playground link in the same tab, and offers a way back', () => {
    renderWork();
    fireEvent.click(screen.getByRole('link', { name: 'Backend as Natural Language' }));
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Backend as Natural Language');
    expect(screen.getAllByRole('link', { name: /All projects/ })).toHaveLength(2);
    const playground = screen.getByRole('link', { name: /Try the playground/ });
    expect(playground).toHaveAttribute('href', '/playground/bnl');
    expect(playground).not.toHaveAttribute('target');
    fireEvent.click(playground);
    expect(screen.getByRole('heading', { name: 'BNL playground' })).toBeInTheDocument();
  });

  it('supports direct case-study links with qualified evidence and handles missing projects', () => {
    const { unmount } = renderWork('/projects/ghana-health-ai');
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Ghana Health AI');
    expect(screen.getByText(/Evaluation figures are from my own tests/)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Explore the research/ })).toHaveAttribute('href', '/research');
    unmount();
    renderWork('/projects/missing');
    expect(screen.getByRole('link', { name: /Back to all projects/ })).toHaveAttribute('href', '/projects');
    expect(screen.queryByRole('link', { name: /Explore the product/ })).not.toBeInTheDocument();
  });
});
