import { useRef, useEffect } from 'react';

/* ── Desert Topographic Contours ───────────────────
   Flowing terrain-like contour lines that drift slowly
   across the canvas.  Very subtle — sits behind text.
   Mouse creates gentle elevation warps.               */

interface ContourLayer {
  yBase: number;        // vertical position 0-1
  amplitude: number;    // wave height
  frequency: number;    // wave density
  speed: number;        // drift speed
  offset: number;       // phase offset
  opacity: number;      // line opacity
  lineWidth: number;
  points: number;       // x-resolution
}

function buildLayers(): ContourLayer[] {
  const layers: ContourLayer[] = [];
  // 18 contour lines spread vertically
  for (let i = 0; i < 18; i++) {
    const t = i / 17; // 0..1
    layers.push({
      yBase: 0.05 + t * 0.9,
      amplitude: 30 + Math.random() * 50,
      frequency: 0.003 + Math.random() * 0.004,
      speed: 0.0002 + Math.random() * 0.0003,
      offset: Math.random() * Math.PI * 2,
      opacity: 0.015 + (1 - Math.abs(t - 0.5) * 2) * 0.04,
      lineWidth: 0.4 + Math.random() * 0.8,
      points: 200,
    });
  }
  return layers;
}

export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });
  const animRef = useRef<number>(0);
  const timeRef = useRef(0);
  const layersRef = useRef<ContourLayer[]>(buildLayers());

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = 0;
    let H = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      W = rect.width;
      H = rect.height;
      canvas!.width = W * dpr;
      canvas!.height = H * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.active = true;
    };
    const onLeave = () => {
      mouseRef.current.active = false;
    };
    canvas.addEventListener('mousemove', onMove, { passive: true });
    canvas.addEventListener('mouseleave', onLeave);

    function draw() {
      const mouse = mouseRef.current;
      timeRef.current += 1;
      const t = timeRef.current;

      ctx!.clearRect(0, 0, W, H);
      ctx!.fillStyle = '#000000';
      ctx!.fillRect(0, 0, W, H);

      const layers = layersRef.current;

      for (let li = 0; li < layers.length; li++) {
        const L = layers[li];
        const yCenter = L.yBase * H;

        ctx!.beginPath();
        ctx!.strokeStyle = `rgba(255, 255, 255, ${L.opacity})`;
        ctx!.lineWidth = L.lineWidth;
        ctx!.lineJoin = 'round';
        ctx!.lineCap = 'round';

        let first = true;
        const step = W / L.points;

        for (let px = 0; px <= L.points; px++) {
          const x = px * step;

          // Base flowing wave
          const normalizedX = px / L.points;
          let y =
            yCenter +
            Math.sin(normalizedX * Math.PI * 2 * 3 + L.offset + t * L.speed) *
              L.amplitude *
              0.4 +
            Math.sin(normalizedX * Math.PI * 2 * 7 + L.offset * 1.5 + t * L.speed * 1.3) *
              L.amplitude *
              0.25 +
            Math.sin(normalizedX * Math.PI * 2 * 13 + L.offset * 0.7 + t * L.speed * 0.8) *
              L.amplitude *
              0.15;

          // Mouse elevation warp (subtle terrain displacement)
          if (mouse.active) {
            const dx = x - mouse.x;
            const dy = y - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const influenceRadius = 250;
            if (dist < influenceRadius) {
              const falloff = 1 - dist / influenceRadius;
              const elevation = Math.sin(falloff * Math.PI) * 20 * falloff;
              y -= elevation;
              // slight lateral push too
              // lateral push omitted — stepping by x makes it tricky
            }
          }

          if (first) {
            ctx!.moveTo(x, y);
            first = false;
          } else {
            ctx!.lineTo(x, y);
          }
        }

        ctx!.stroke();

        // Secondary fainter echo line slightly offset
        ctx!.beginPath();
        ctx!.strokeStyle = `rgba(255, 255, 255, ${L.opacity * 0.35})`;
        ctx!.lineWidth = L.lineWidth * 0.6;
        first = true;
        for (let px = 0; px <= L.points; px++) {
          const x = px * step;
          const normalizedX = px / L.points;
          let y =
            yCenter +
            18 +
            Math.sin(normalizedX * Math.PI * 2 * 3 + L.offset + t * L.speed + 0.5) *
              L.amplitude *
              0.35 +
            Math.sin(normalizedX * Math.PI * 2 * 5 + L.offset * 1.3 + t * L.speed * 1.1) *
              L.amplitude *
              0.2;

          if (mouse.active) {
            const dx = x - mouse.x;
            const dy = y - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const influenceRadius = 250;
            if (dist < influenceRadius) {
              const falloff = 1 - dist / influenceRadius;
              const elevation = Math.sin(falloff * Math.PI) * 14 * falloff;
              y -= elevation;
            }
          }

          if (first) {
            ctx!.moveTo(x, y);
            first = false;
          } else {
            ctx!.lineTo(x, y);
          }
        }
        ctx!.stroke();
      }

      // Very subtle vertical grid lines (terrain-map style)
      ctx!.strokeStyle = 'rgba(255, 255, 255, 0.012)';
      ctx!.lineWidth = 0.3;
      for (let gx = 0; gx < W; gx += 60) {
        ctx!.beginPath();
        ctx!.moveTo(gx, 0);
        ctx!.lineTo(gx, H);
        ctx!.stroke();
      }

      // Subtle radial vignette to keep focus on center
      const vig = ctx!.createRadialGradient(W / 2, H / 2, H * 0.2, W / 2, H / 2, H * 0.8);
      vig.addColorStop(0, 'rgba(0, 0, 0, 0)');
      vig.addColorStop(1, 'rgba(0, 0, 0, 0.5)');
      ctx!.fillStyle = vig;
      ctx!.fillRect(0, 0, W, H);

      animRef.current = requestAnimationFrame(draw);
    }

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      ro.disconnect();
      canvas.removeEventListener('mousemove', onMove);
      canvas.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
      }}
    />
  );
}
