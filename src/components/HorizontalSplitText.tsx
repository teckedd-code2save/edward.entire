import { useRef, useEffect } from 'react';

interface HorizontalSplitTextProps {
  text: string;
  highlightWord?: string;
  subtitle?: string;
}

export default function HorizontalSplitText({ text, highlightWord, subtitle }: HorizontalSplitTextProps) {
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

        // Subtitle fade-in at section start
        gsap.fromTo('.hs-subtitle', { opacity: 0, y: 16 }, {
          opacity: 1, y: 0, duration: 0.6, ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        });

        const scrollTween = gsap.to(track, {
          xPercent: -100,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            pin: true,
            end: '+=5000px',
            scrub: true,
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

  // Build chars with highlight support
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
      {subtitle && (
        <p
          className="hs-subtitle absolute"
          style={{
            top: '18%',
            left: 0,
            right: 0,
            textAlign: 'center',
            fontSize: 'clamp(0.9rem, 1.6vw, 1.1rem)',
            fontWeight: 400,
            color: 'var(--fg-2)',
            zIndex: 2,
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
          }}
        >
          {subtitle}
        </p>
      )}

      <div
        ref={trackRef}
        style={{
          display: 'flex',
          width: 'max-content',
          whiteSpace: 'nowrap',
          gap: '4vw',
          paddingLeft: '100vw',
          fontSize: 'clamp(2rem, 10vw, 12rem)',
          fontWeight: 600,
          lineHeight: 1.1,
          color: 'var(--fg)',
          fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
          willChange: 'transform',
        }}
      >
        {parts.map((p, i) => (
          <span
            key={i}
            className="hs-char"
            style={{
              display: 'inline-block',
              color: p.highlight ? 'var(--orange)' : 'var(--fg)',
              textShadow: p.highlight ? '0 0 60px rgba(255,85,0,0.5)' : 'none',
            }}
          >
            {p.char === ' ' ? '\u00A0' : p.char}
          </span>
        ))}
      </div>

      <p
        className="absolute text-center font-sans text-xs"
        style={{ bottom: '2rem', left: 0, right: 0, color: 'var(--fg-4)', zIndex: 2 }}
      >
        Scroll to explore
      </p>
    </section>
  );
}
