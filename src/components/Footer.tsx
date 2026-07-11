import { useRef, useEffect } from 'react';

export default function Footer() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    let ctx: any;
    async function init() {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      ctx = gsap.context(() => {
        gsap.fromTo('.footer-content', { y: 30, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: ref.current, start: 'top 85%', toggleActions: 'play none none none' },
        });
      }, ref.current!);
    }
    init();
    return () => ctx?.revert();
  }, []);

  return (
    <footer
      ref={ref}
      style={{
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: 'var(--bg-1)',
        paddingTop: 'clamp(80px, 12vw, 140px)',
        paddingBottom: 'clamp(40px, 5vw, 60px)',
      }}
    >
      {/* Shadow gradient at top */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)',
        }}
      />

      {/* Large shadowy backdrop text */}
      <div
        aria-hidden
        className="footer-content"
        style={{
          position: 'absolute',
          bottom: '-0.15em',
          left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: "'Manrope', system-ui, sans-serif",
          fontSize: 'clamp(6rem, 22vw, 20rem)',
          fontWeight: 700,
          letterSpacing: '-0.06em',
          color: 'var(--fg)',
          opacity: 0.02,
          lineHeight: 0.8,
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      >
        precision
      </div>

      <div className="footer-content mx-auto px-5 md:px-10" style={{ maxWidth: '1200px', position: 'relative', zIndex: 1 }}>
        {/* Top: Links */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '40px',
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            gap: '32px',
          }}>
            {/* Brand */}
            <div>
              <div style={{
                fontFamily: "'Manrope', system-ui, sans-serif",
                fontSize: '24px',
                fontWeight: 600,
                letterSpacing: '-0.04em',
                color: 'var(--fg)',
                marginBottom: '6px',
              }}>
                precision <span style={{ fontWeight: 300, fontStyle: 'italic', color: 'var(--fg-3)' }}>xyz</span>
              </div>
              <p style={{
                fontFamily: "'Manrope', system-ui, sans-serif",
                fontSize: '14px',
                fontWeight: 400,
                color: 'var(--fg-3)',
                lineHeight: 1.5,
                maxWidth: '280px',
              }}>
                Forging AI-native narratives at Serendepify.
              </p>
            </div>

            {/* Links */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <a
                href="https://www.serendepify.com/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: "'Manrope', system-ui, sans-serif",
                  fontSize: '16px',
                  fontWeight: 600,
                  color: 'var(--fg-2)',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--acid)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = 'var(--fg-2)'; }}
              >
                serendepify.com →
              </a>
              <a
                href="https://github.com/teckedd-code2save"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: "'Manrope', system-ui, sans-serif",
                  fontSize: '16px',
                  fontWeight: 600,
                  color: 'var(--fg-2)',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--acid)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = 'var(--fg-2)'; }}
              >
                GitHub →
              </a>
            </div>
          </div>

          {/* Bottom bar */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: '24px',
            borderTop: '1px solid var(--border)',
          }}>
            <span style={{
              fontFamily: "'Manrope', system-ui, sans-serif",
              fontSize: '12px',
              fontWeight: 400,
              color: 'var(--fg-4)',
            }}>
              © 2026
            </span>
            <span style={{
              fontFamily: "'Manrope', system-ui, sans-serif",
              fontSize: '12px',
              fontWeight: 400,
              color: 'var(--fg-4)',
            }}>
              Accra, Ghana
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
