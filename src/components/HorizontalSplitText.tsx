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

  // Split into chars, highlight specific word
  const parts: { char: string; highlight: boolean }[] = [];
  if (highlightWord && text.includes(highlightWord)) {
    const idx = text.indexOf(highlightWord);
    // Before highlight
    for (const ch of text.slice(0, idx)) {
      parts.push({ char: ch, highlight: false });
    }
    // Highlight word
    for (const ch of highlightWord) {
      parts.push({ char: ch, highlight: true });
    }
    // After highlight
    for (const ch of text.slice(idx + highlightWord.length)) {
      parts.push({ char: ch, highlight: false });
    }
  } else {
    for (const ch of text) {
      parts.push({ char: ch, highlight: false });
    }
  }

  const chars = parts.map((p, i) => (
    <span
      key={i}
      className="hs-char"
      style={{
        display: 'inline-block',
        color: p.highlight ? 'var(--orange)' : 'var(--fg)',
        textShadow: p.highlight ? '0 0 40px rgba(255,85,0,0.35)' : 'none',
      }}
    >
      {p.char === ' ' ? '\u00A0' : p.char}
    </span>
  ));

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
      {/* Subtitle — visible immediately */}
      {subtitle && (
        <p
          className="absolute top-[22%] left-0 right-0 text-center font-sans"
          style={{
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            fontWeight: 400,
            color: 'var(--fg-2)',
            zIndex: 2,
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
          paddingLeft: '100vw',
          fontSize: 'clamp(2rem, 10vw, 12rem)',
          fontWeight: 300,
          lineHeight: 1.1,
          fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
          willChange: 'transform',
        }}
      >
        {chars}
      </div>

      {/* Scroll hint */}
      <p
        className="absolute bottom-8 left-0 right-0 text-center font-sans text-xs"
        style={{ color: 'var(--fg-4)', zIndex: 2 }}
      >
        Scroll to explore
      </p>
    </section>
  );
}
