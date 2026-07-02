import { DotGrid } from '@paper-design/shaders-react';

export default function ShaderBackdrop() {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        opacity: 0.3,
      }}
    >
      <DotGrid
        colorBack="#080808"
        colorFill="#1a1a2e"
        colorStroke="#2a2a4e"
        size={3}
        gapX={48}
        gapY={48}
        strokeWidth={1}
        sizeRange={0.3}
        opacityRange={0.2}
        shape="circle"
        speed={0.15}
        scale={1}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}
