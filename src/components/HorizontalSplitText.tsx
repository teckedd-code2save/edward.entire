import { useRef, useEffect } from 'react';

interface HorizontalSplitTextProps {
  text: string;
}

export default function HorizontalSplitText({ text }: HorizontalSplitTextProps) {
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

  // Split text into individual character spans
  const chars = text.split('').map((char, i) => (
    <span key={i} className="hs-char" style={{ display: 'inline-block' }}>
      {char === ' ' ? '\u00A0' : char}
    </span>
  ));

  return (
    <section
      ref={sectionRef}
      style={{
        overflow: 'hidden',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'var(--bg)',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
      }}
    >
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
          color: 'var(--fg)',
          fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
          willChange: 'transform',
        }}
      >
        {chars}
      </div>
    </section>
  );
}
