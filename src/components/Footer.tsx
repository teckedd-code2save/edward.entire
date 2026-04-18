export default function Footer() {
  return (
    <footer
      className="w-full"
      style={{ borderTop: '1px solid var(--border)' }}
    >
      <div className="mx-auto flex max-w-[1200px] flex-col justify-between gap-2.5 px-5 py-8 sm:flex-row md:px-10">
        <span className="font-mono text-xs text-[var(--fg-3)]">
          edward twumasi — accra, ghana
        </span>
        <div className="flex gap-4">
          <span className="font-mono text-[11px] text-[var(--fg-3)]">
            &copy; 2026
          </span>
          <span className="font-mono text-[11px] text-[var(--fg-3)]">
            backend &middot; systems &middot; ai
          </span>
        </div>
      </div>
    </footer>
  );
}
