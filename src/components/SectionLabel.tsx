interface SectionLabelProps {
  number: string;
  text: string;
}

export default function SectionLabel({ number, text }: SectionLabelProps) {
  return (
    <div className="mb-6 flex items-center gap-4">
      <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[rgba(255,255,255,0.55)]">
        {number} / {text}
      </span>
      <div
        className="h-px w-20"
        style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}
      />
    </div>
  );
}
