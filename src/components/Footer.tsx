export default function Footer() {
  return (
    <footer
      className="relative w-full"
      style={{ borderTop: '1px solid var(--border)' }}
    >
      <div
        aria-hidden
        className="absolute left-0 top-0 h-px w-full"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(255,85,0,0.5), rgba(199,125,255,0.5), transparent)',
        }}
      />
      <div className="mx-auto flex max-w-[1200px] flex-col justify-between gap-3 px-5 py-9 sm:flex-row sm:items-center md:px-10">
        <div className="flex items-center gap-3">
          <span
            className="orb-pulse inline-block"
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              backgroundColor: 'var(--orange)',
              boxShadow: '0 0 10px var(--orange-glow)',
            }}
          />
          <span className="font-mono text-xs" style={{ color: 'var(--fg-2)' }}>
            edward twumasi · accra
          </span>
        </div>
        <div className="flex gap-5">
          <span className="font-mono text-[11px]" style={{ color: 'var(--fg-3)' }}>
            &copy; 2026
          </span>
          <a
            href="https://www.serendepify.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[11px] transition-colors"
            style={{ color: 'var(--fg-3)' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--orange)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--fg-3)')}
          >
            serendepify
          </a>
          <a
            href="https://convoy-home.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[11px] font-bold transition-colors"
            style={{ color: 'var(--mauve)' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--orange)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--mauve)')}
          >
            convoy
          </a>
        </div>
      </div>
    </footer>
  );
}
