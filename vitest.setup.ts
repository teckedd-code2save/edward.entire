import "@testing-library/jest-dom/vitest"
import { vi } from "vitest"

// jsdom lacks several browser APIs that components touch on mount.
// Provide deterministic no-op stubs so render tests stay focused on
// DOM output rather than animation/observation plumbing.

// matchMedia — used by Navbar (mobile breakpoint), HorizontalSplitText,
// and GSAP's matchMedia in ScrollMotion. A no-op with matches=false means
// "prefers-reduced-motion" callbacks never arm, keeping tests deterministic.
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

// ResizeObserver / IntersectionObserver — used by AmbientSignalCanvas.
// A no-op observer means animation loops never arm.
class NoopObserver implements ResizeObserver, IntersectionObserver {
  readonly root = null
  readonly rootMargin = ""
  readonly thresholds = []
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords(): never[] {
    return []
  }
}

globalThis.ResizeObserver = NoopObserver as unknown as typeof ResizeObserver
globalThis.IntersectionObserver = NoopObserver as unknown as typeof IntersectionObserver

// HTMLMediaElement.play/pause — jsdom's play() returns undefined, so any
// component chaining .play().catch() would throw a TypeError.
Object.defineProperty(window.HTMLMediaElement.prototype, "play", {
  configurable: true,
  value: vi.fn().mockResolvedValue(undefined),
})
Object.defineProperty(window.HTMLMediaElement.prototype, "pause", {
  configurable: true,
  value: vi.fn(),
})
