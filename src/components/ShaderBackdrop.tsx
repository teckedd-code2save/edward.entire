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
        colorMid="#16213e"
        colorFront="#0f3460"
        scale={0.8}
        speed={0.2}
        brightness={0.04}
        contrast={0.2}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}
