import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const revealTargets = [
  '.editorial-section .section-head',
  '.project-story',
  '.principle',
  '.stack-pill',
  '.work-card',
  '.research-track',
  '.contact-panel',
];

export default function ScrollMotion() {
  const progressRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    let cancelled = false;
    let dispose: (() => void) | undefined;

    const setup = async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ]);
      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);
      const media = gsap.matchMedia();

      media.add('(prefers-reduced-motion: no-preference)', () => {
        const context = gsap.context(() => {
          revealTargets.forEach((selector) => {
            ScrollTrigger.batch(selector, {
              start: 'top 88%',
              once: true,
              onEnter: (elements) => {
                gsap.fromTo(
                  elements,
                  { y: 34, autoAlpha: 0 },
                  { y: 0, autoAlpha: 1, duration: 0.85, stagger: 0.09, ease: 'power3.out', clearProps: 'transform,opacity,visibility' },
                );
              },
            });
          });

          gsap.utils.toArray<HTMLElement>('.project-visual').forEach((visual) => {
            const glyph = visual.querySelector('.project-glyph');
            if (!glyph) return;
            gsap.fromTo(
              glyph,
              { yPercent: 10, rotate: -9 },
              {
                yPercent: -8,
                rotate: -2,
                ease: 'none',
                scrollTrigger: { trigger: visual, start: 'top bottom', end: 'bottom top', scrub: 0.35 },
              },
            );
          });

          if (progressRef.current) {
            gsap.fromTo(
              progressRef.current,
              { scaleX: 0 },
              { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: 0.2 } },
            );
          }
        });

        const refresh = window.setTimeout(() => ScrollTrigger.refresh(), 80);
        return () => {
          window.clearTimeout(refresh);
          context.revert();
        };
      });

      dispose = () => media.revert();
    };

    void setup();

    return () => {
      cancelled = true;
      dispose?.();
    };
  }, [location.pathname]);

  return <div ref={progressRef} className="scroll-progress" aria-hidden="true" />;
}
