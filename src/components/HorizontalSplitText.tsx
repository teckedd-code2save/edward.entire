import { useRef, useEffect, type ReactNode } from 'react';

interface HorizontalSplitTextProps {
  text: string;
  highlightWord?: string;
  statement?: ReactNode;
}

export default function HorizontalSplitText({ text, highlightWord, statement }: HorizontalSplitTextProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !trackRef.current) return;
    let ctx: any;

    async function init() {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      ctx = gsap.context(() => {
        const chars = trackRef.current!.querySelectorAll('.hs-char');
        const track = trackRef.current!;
        const statementEl = sectionRef.current!.querySelector('.hs-statement');

        const scrollTween = gsap.to(track, {
          x: () => -(track.scrollWidth - window.innerWidth),
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            pin: true,
            end: () => `+=${track.scrollWidth}`,
            scrub: true,
            onUpdate: (self) => {
              if (statementEl && self.progress > 0.5) {
                const opacity = Math.min(1, (self.progress - 0.5) * 4);
                gsap.set(statementEl, { opacity, y: (1 - opacity) * 30 });
              }
            },
          },
        });

        chars.forEach((char) => {
          gsap.from(char, {
            yPercent: () => gsap.utils.random(-200, 200),
            rotation: () => gsap.utils.random(-20, 20),
            ease: 'back.out(1.2)',
            scrollTrigger: {
              trigger: char,
              containerAnimation: scrollTween,
              start: 'left 100%',
              end: 'left 30%',
              scrub: 1,
            },
          });
        });
      }, sectionRef.current!);
    }

    init();
    return () => ctx?.revert();
  }, []);

  // Build chars with highlight
  const parts: { char: string; highlight: boolean }[] = [];
  if (highlightWord && text.includes(highlightWord)) {
    const idx = text.indexOf(highlightWord);
    for (const ch of text.slice(0, idx)) parts.push({ char: ch, highlight: false });
    for (const ch of highlightWord) parts.push({ char: ch, highlight: true });
    for (const ch of text.slice(idx + highlightWord.length)) parts.push({ char: ch, highlight: false });
  } else {
    for (const ch of text) parts.push({ char: ch, highlight: false });
  }

  return (
    <section
      ref={sectionRef}
      style={{
        overflow: 'hidden',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--bg)',
        position: 'relative',
      }}
    >
      <div
        ref={trackRef}
        style={{
          display: 'flex',
          whiteSpace: 'nowrap',
          paddingLeft: 'clamp(60vw, 80vw, 100vw)',
          paddingRight: '10vw',
          fontSize: 'clamp(1.5rem, 7vw, 11rem)',
          fontWeight: 600,
          lineHeight: 1,
          letterSpacing: '-0.03em',
          color: 'var(--fg)',
          fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        }}
      >
        {parts.map((p, i) => (
          <span
            key={i}
            className="hs-char"
            style={{
              display: 'inline-block',
              color: p.highlight ? 'var(--orange)' : 'inherit',
              textShadow: p.highlight ? '0 0 60px rgba(255,85,0,0.5)' : 'none',
              fontFamily: 'inherit',
              fontWeight: 'inherit',
              fontSize: 'inherit',
            }}
          >
            {p.char === ' ' ? '\u00A0' : p.char}
          </span>
        ))}
      </div>

      {/* Statement — fades in as text scrolls off screen */}
      {statement && (
        <div
          className="hs-statement"
          style={{
            position: 'absolute',
            bottom: 'clamp(10%, 15vh, 20%)',
            left: 0,
            right: 0,
            textAlign: 'center',
            opacity: 0,
            zIndex: 2,
          }}
        >
          {statement}
        </div>
      )}

      <p
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: 0,
          right: 0,
          textAlign: 'center',
          fontFamily: "'Inter', sans-serif",
          fontSize: '12px',
          fontWeight: 400,
          color: 'var(--fg-4)',
          zIndex: 2,
        }}
      >
        Scroll to explore
      </p>
    </section>
  );
}
