import { useRef, useEffect } from 'react';

/** Lightweight animated noise shader background — inspired by paper.design */
export default function ShaderBackdrop() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let running = true;
    let frame = 0;

    const render = () => {
      if (!running) return;
      const w = canvas.width = canvas.offsetWidth;
      const h = canvas.height = canvas.offsetHeight;
      frame++;

      // Subtle animated noise/gradient
      const imageData = ctx.createImageData(w, h);
      const data = imageData.data;

      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const i = (y * w + x) * 4;
          // Animated simplex-like noise
          const nx = x / w;
          const ny = y / h;
          const t = frame * 0.003;
          const v = Math.sin(nx * 3 + t) * Math.cos(ny * 3 + t * 0.7) * 0.5 + 0.5;
          const r = 8 + v * 6;
          const g = 8 + v * 5;
          const b = 10 + v * 8;
          const alpha = 0.03 + v * 0.04;
          data[i] = r;
          data[i + 1] = g;
          data[i + 2] = b;
          data[i + 3] = alpha * 255;
        }
      }
      ctx.putImageData(imageData, 0, 0);
      requestAnimationFrame(render);
    };

    render();
    return () => { running = false; };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.7,
      }}
    />
  );
}
