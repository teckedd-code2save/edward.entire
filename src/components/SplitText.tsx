interface SplitTextProps {
  text: string;
  className?: string;
}

export default function SplitText({ text, className = '' }: SplitTextProps) {
  return (
    <span className={className}>
      {text.split('').map((char, i) => (
        <span
          key={i}
          className="char-reveal inline-block"
          style={{ whiteSpace: char === ' ' ? 'pre' : undefined }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
}
