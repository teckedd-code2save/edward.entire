interface SectionLabelProps {
  number: string;
  text: string;
}

export default function SectionLabel({ number, text }: SectionLabelProps) {
  return (
    <div className="mb-6 flex items-center gap-3">
      <span
        className="inline-block"
        style={{
          width: 6,
          height: 6,
          borderRadius: '50%',
          backgroundColor: 'var(--orange)',
          boxShadow: '0 0 10px var(--orange-glow)',
        }}
      />
      <span
        className="font-mono text-[10px] uppercase tracking-[0.22em]"
        style={{ color: 'var(--fg-2)' }}
      >
        {number} <span style={{ color: 'var(--fg-4)' }}>/</span> {text}
      </span>
      <div
        className="h-px w-24"
        style={{
          background:
            'linear-gradient(90deg, rgba(255,85,0,0.5), rgba(199,125,255,0.25), transparent)',
        }}
      />
    </div>
  );
}
