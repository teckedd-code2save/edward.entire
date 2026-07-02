import { NeuroNoise } from '@paper-design/shaders-react';

export default function ShaderBackdrop() {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        opacity: 0.35,
      }}
    >
      <NeuroNoise
        colorBack="#080808"
        color1="#1a1a2e"
        color2="#16213e"
        color3="#0f3460"
        scale={0.8}
        speed={0.25}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}
