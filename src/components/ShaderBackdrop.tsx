import { useRef, useEffect } from 'react';
import { createShader } from '@paper-design/shaders';

export default function ShaderBackdrop() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const shader = createShader({
      element: el,
      shader: 'aurora',
      uniforms: {
        speed: { value: 0.3 },
        scale: { value: 1.5 },
        color1: { value: [8, 8, 10] },
        color2: { value: [12, 10, 14] },
        color3: { value: [18, 12, 20] },
      },
    });

    return () => {
      shader?.destroy?.();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        opacity: 0.6,
      }}
    />
  );
}
