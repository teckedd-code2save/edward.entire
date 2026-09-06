import { describe, expect, it } from 'vitest';
import { screenTransition } from '../components/workstation/screenTexture';

describe('Single-laptop screen timeline', () => {
  it('gives each real interface a distinct reading hold', () => {
    expect(screenTransition(.26)).toEqual({ from: 'ide', to: 'ide', amount: 0 });
    expect(screenTransition(.50)).toEqual({ from: 'release', to: 'release', amount: 0 });
    expect(screenTransition(.78)).toEqual({ from: 'operations', to: 'operations', amount: 0 });
    expect(screenTransition(.98)).toEqual({ from: 'product', to: 'product', amount: 0 });
  });

  it('spreads GitHub to GroundControl over a long continuous scroll interval', () => {
    expect(screenTransition(.58).amount).toBeCloseTo(0);
    expect(screenTransition(.65)).toMatchObject({ from: 'release', to: 'operations' });
    expect(screenTransition(.65).amount).toBeCloseTo(.5);
    expect(screenTransition(.72).amount).toBeCloseTo(1);
  });

  it('reverses without depending on previous frames or elapsed time', () => {
    const forwards = [.34, .4, .58, .62, .68, .72, .88, .94].map(screenTransition);
    const backwards = [.94, .88, .72, .68, .62, .58, .4, .34].map(screenTransition).reverse();
    expect(backwards).toEqual(forwards);
  });
});
