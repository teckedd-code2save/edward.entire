import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ProjectStory } from '../components/projects/ProjectStories';
import { projects } from '../components/projects/projectData';

describe('Product stories', () => {
  it('lets visitors step through a story and explains which views are illustrations', () => {
    const project = projects.find(item => item.id === 'rentaweekend')!;
    render(<MemoryRouter><ProjectStory project={project} index={1} /></MemoryRouter>);
    const story = within(screen.getByRole('region', { name: 'RentAWeekend story' }));
    expect(story.getByRole('button', { name: 'Previous RentAWeekend chapter' })).toBeDisabled();
    fireEvent.click(story.getByRole('button', { name: 'Next RentAWeekend chapter' }));
    expect(story.getByText('Illustrated walkthrough')).toBeInTheDocument();
    fireEvent.click(story.getByRole('button', { name: /Reading sources/ }));
    expect(story.getByText(/Open sources to look for menus/)).toBeInTheDocument();
    fireEvent.click(story.getByRole('button', { name: 'Next RentAWeekend chapter' }));
    expect(story.getByRole('button', { name: 'Next RentAWeekend chapter' })).toBeDisabled();
    expect(story.getByRole('link', { name: /Plan your own day/ })).toHaveAttribute('href', 'https://rentmyweekend.serendepify.com/#/agents/outings');
    expect(screen.queryByText('View capture')).not.toBeInTheDocument();
    expect(screen.queryByText('My contribution')).not.toBeInTheDocument();
  });

  it('loads the external film only when requested', () => {
    const project = projects.find(item => item.id === 'convoy')!;
    render(<MemoryRouter><ProjectStory project={project} index={4} /></MemoryRouter>);
    fireEvent.click(screen.getByRole('button', { name: /02The walkthrough/ }));
    expect(screen.queryByTitle('Convoy product walkthrough')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Play Convoy product walkthrough' }));
    expect(screen.getByTitle('Convoy product walkthrough')).toHaveAttribute('src', 'https://www.youtube-nocookie.com/embed/5btzce8adeE?autoplay=1');
  });
});

const runtime = vi.hoisted(() => ({ send: vi.fn(), dispose: vi.fn(), construct: vi.fn() }));
vi.mock('../lib/bnl', async importOriginal => ({
  ...await importOriginal<typeof import('../lib/bnl')>(),
  BnlSession: class { constructor() { runtime.construct(); } send = runtime.send; dispose = runtime.dispose; },
}));

describe('Embedded BNL execution', () => {
  it('starts only on demand, executes the edited input, and clears stale results', async () => {
    runtime.construct.mockClear(); runtime.send.mockReset();
    runtime.send.mockResolvedValueOnce({ status: 'ready' }).mockResolvedValueOnce({ status: 'imported' }).mockResolvedValueOnce({ status: 'succeeded', value: false, trace: [{ stage: 'check' }] });
    const project = projects.find(item => item.id === 'backend-as-natural-language')!;
    render(<MemoryRouter><ProjectStory project={project} index={3} /></MemoryRouter>);
    expect(runtime.construct).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole('button', { name: 'Load example' }));
    fireEvent.click(await screen.findByRole('button', { name: 'Run rule' }));
    expect(await screen.findByText('false')).toBeInTheDocument();
    expect(runtime.send).toHaveBeenCalledWith(expect.objectContaining({ action: 'import', data: expect.objectContaining({ invoices: [expect.objectContaining({ overdueDays: 12, paid: false })] }) }));
    fireEvent.change(screen.getByLabelText('Days overdue'), { target: { value: '45' } });
    expect(screen.queryByText('false')).not.toBeInTheDocument();
    expect(screen.getByRole('status')).toHaveTextContent('Changed. Run the rule');
    runtime.send.mockResolvedValueOnce({ status: 'imported' }).mockResolvedValueOnce({ status: 'succeeded', value: true, trace: [] });
    fireEvent.click(screen.getByRole('button', { name: 'Run rule' }));
    expect(await screen.findByText('true')).toBeInTheDocument();
    expect(runtime.send).toHaveBeenLastCalledWith(expect.objectContaining({ action: 'run', inputs: { invoiceId: { type: 'InvoiceId', value: 'demo-invoice' } } }));
  });

  it('shows startup failure and allows a retry', async () => {
    runtime.send.mockReset().mockRejectedValueOnce(new Error('Runtime unavailable. Reload the example.'));
    const project = projects.find(item => item.id === 'backend-as-natural-language')!;
    render(<MemoryRouter><ProjectStory project={project} index={3} /></MemoryRouter>);
    fireEvent.click(screen.getByRole('button', { name: 'Load example' }));
    expect(await screen.findByText('Runtime unavailable. Reload the example.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Load example' })).toBeEnabled();
  });
});
