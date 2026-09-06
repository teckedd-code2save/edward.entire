import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { MotionValue } from 'framer-motion';
import CinematicHero from '../components/workstation/CinematicHero';

const playback = vi.hoisted(() => ({
  compact: false,
  reducedMotion: false,
  progress: null as MotionValue<number> | null,
}));

vi.mock('framer-motion', async importOriginal => {
  const actual = await importOriginal<typeof import('framer-motion')>();
  playback.progress = actual.motionValue(0);
  return {
    ...actual,
    useReducedMotion: () => playback.reducedMotion,
    useScroll: () => ({ scrollYProgress: playback.progress }),
  };
});

vi.mock('../components/workstation/WorkstationScene', () => ({
  default: ({ product }: { product: boolean }) => <div data-testid="workstation-scene" data-product={String(product)} />,
}));

beforeEach(() => {
  playback.compact = false;
  playback.reducedMotion = false;
  playback.progress?.set(0);
  vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
  vi.spyOn(window, 'matchMedia').mockImplementation(query => ({
    matches: query === '(max-width: 480px)' && playback.compact,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
});

afterEach(() => vi.restoreAllMocks());

describe('Cinematic hero', () => {
  it('lets chapter controls jump to the matching point in the build sequence', async () => {
    const { container } = render(<CinematicHero />);
    expect(await screen.findByTestId('workstation-scene')).toBeInTheDocument();
    const section = container.querySelector('section')!;
    Object.defineProperty(section, 'offsetHeight', { value: 6400 });
    vi.spyOn(section, 'getBoundingClientRect').mockReturnValue({
      top: 120, bottom: 6520, left: 0, right: 1440,
      width: 1440, height: 6400, x: 0, y: 120,
      toJSON: () => ({}),
    });

    expect(screen.getByRole('button', { name: 'The intent' })).toHaveAttribute('aria-current', 'step');
    fireEvent.click(screen.getByRole('button', { name: 'The release' }));
    expect(window.scrollTo).toHaveBeenLastCalledWith({
      top: 120 + window.scrollY + .55 * (6400 - window.innerHeight),
      behavior: 'auto',
    });
    fireEvent.click(screen.getByRole('button', { name: 'The intent' }));
    expect(window.scrollTo).toHaveBeenLastCalledWith({ top: 120 + window.scrollY, behavior: 'auto' });
  });

  it('updates evidence and product links when scrolling forward and back', async () => {
    render(<CinematicHero />);
    await screen.findByTestId('workstation-scene');

    act(() => playback.progress?.set(.52));
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Every release has a record.');
    expect(screen.getByRole('button', { name: 'The release' })).toHaveAttribute('aria-current', 'step');
    expect(screen.getByRole('link', { name: /View the actual release/ })).toHaveAttribute('href', 'https://github.com/teckedd-code2save/ghana-health-ai/actions/runs/33924380025');

    act(() => playback.progress?.set(.65));
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Operate what you ship.');
    expect(screen.getByRole('button', { name: 'GroundControl' })).toHaveAttribute('aria-current', 'step');
    expect(screen.getByRole('link', { name: /Explore GroundControl/ })).toHaveAttribute('href', 'https://groundcontrol.serendepify.com');

    act(() => playback.progress?.set(.96));
    expect(screen.getByTestId('workstation-scene')).toHaveAttribute('data-product', 'true');
    expect(screen.getByRole('link', { name: /Explore Ghana Health/ })).toHaveAttribute('href', 'https://ghanahealth.serendepify.com');

    act(() => playback.progress?.set(.1));
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('AI, beyond the model.');
    expect(screen.getByTestId('workstation-scene')).toHaveAttribute('data-product', 'false');
    expect(screen.queryByRole('link', { name: /View the actual release/ })).not.toBeInTheDocument();
  });

  it.each(['compact', 'reducedMotion'] as const)('shows an accessible product still for %s viewers', preference => {
    playback[preference] = true;
    render(<CinematicHero />);

    expect(screen.getByRole('img', { name: 'Ghana Health AI: the live voice-first chat interface' })).toHaveAttribute('src', '/ghana-health-live.png');
    expect(screen.queryByTestId('workstation-scene')).not.toBeInTheDocument();
    expect(screen.queryByRole('navigation', { name: 'Explore the build sequence' })).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Explore Ghana Health/ })).toHaveAttribute('href', 'https://ghanahealth.serendepify.com');
  });
});
