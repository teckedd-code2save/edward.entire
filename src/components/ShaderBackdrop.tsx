/** Animated gradient backdrop — soft aurora-like effect blending dark tones */
export default function ShaderBackdrop() {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        opacity: 0.45,
        background: `
          radial-gradient(ellipse 80% 60% at 20% 30%, rgba(20,15,30,0.8) 0%, transparent 60%),
          radial-gradient(ellipse 60% 80% at 80% 60%, rgba(25,18,22,0.6) 0%, transparent 55%),
          radial-gradient(ellipse 50% 50% at 50% 50%, rgba(10,8,12,0.4) 0%, transparent 50%)
        `,
        animation: 'shader-drift 12s ease-in-out infinite alternate',
      }}
    />
  );
}
