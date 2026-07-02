import { DotGrid } from '@paper-design/shaders-react';

export default function ShaderBackdrop() {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        opacity: 0.5,
      }}
    >
      <DotGrid
        colorBack="#080808"
        colorFill="#1a1a3e"
        colorStroke="#3a3a6e"
        size={4}
        gapX={40}
        gapY={40}
        strokeWidth={1.5}
        sizeRange={0.3}
        opacityRange={0.2}
        shape="circle"
        scale={1}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}
