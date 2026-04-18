import { useRef, useEffect } from 'react';

/* ── Flowing Spiral Contours ───────────────────────
   Organic wave-like contour lines that spiral outward
   from center. Canvas 2D, mouse-reactive.           */

interface ContourLine {
  points: { x: number; y: number }[];
  speed: number;
  offset: number;
  amplitude: number;
  frequency: number;
  opacity: number;
  lineWidth: number;
}

function createContourLines(w: number, h: number): ContourLine[] {
  const lines: ContourLine[] = [];
  const centerX = w * 0.5;
  const centerY = h * 0.5;
  const maxRadius = Math.sqrt(centerX * centerX + centerY * centerY);

  for (let i = 0; i < 24; i++) {
    const t = i / 24;
    const radius = 40 + t * maxRadius * 0.9;
    const points: { x: number; y: number }[] = [];

    for (let angle = 0; angle <= Math.PI * 4; angle += 0.04) {
      const spiralAngle = angle + t * Math.PI * 2;
      const wave = Math.sin(angle * (2 + t * 3)) * (10 + t * 30);
      const r = radius + wave;
      const x = centerX + Math.cos(spiralAngle) * r;
      const y = centerY + Math.sin(spiralAngle) * r;
      points.push({ x, y });
    }

    lines.push({
      points,
      speed: 0.0003 + Math.random() * 0.0005,
      offset: Math.random() * Math.PI * 2,
      amplitude: 8 + Math.random() * 20,
      frequency: 1 + Math.random() * 3,
      opacity: 0.03 + (1 - t) * 0.15,
      lineWidth: 0.5 + (1 - t) * 1.5,
    });
  }

  return lines;
}

export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const animRef = useRef<number>(0);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = canvas.offsetWidth;
    let h = canvas.offsetHeight;
    const dpr = window.devicePixelRatio || 1;

    function resize() {
      w = canvas!.offsetWidth;
      h = canvas!.offsetHeight;
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      ctx!.scale(dpr, dpr);
      lines = createContourLines(w, h);
    }

    let lines = createContourLines(w, h);
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const handleMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.targetX = e.clientX - rect.left;
      mouseRef.current.targetY = e.clientY - rect.top;
    };
    canvas.addEventListener('mousemove', handleMouse, { passive: true });

    function draw() {
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      timeRef.current += 1;
      const t = timeRef.current;

      ctx!.clearRect(0, 0, w, h);
      ctx!.fillStyle = '#000000';
      ctx!.fillRect(0, 0, w, h);

      const centerX = w * 0.5;
      const centerY = h * 0.5;

      // Mouse influence vector (subtle)
      const mouseInfluenceX = (mouse.x - centerX) * 0.02;
      const mouseInfluenceY = (mouse.y - centerY) * 0.02;

      for (let li = 0; li < lines.length; li++) {
        const line = lines[li];
        const progress = li / lines.length;

        ctx!.beginPath();
        ctx!.strokeStyle = `rgba(79, 93, 255, ${line.opacity})`;
        ctx!.lineWidth = line.lineWidth;
        ctx!.lineCap = 'round';
        ctx!.lineJoin = 'round';

        // Animated wave phase
        const wavePhase = t * line.speed + line.offset;

        for (let pi = 0; pi < line.points.length; pi++) {
          const pt = line.points[pi];

          // Organic wave distortion
          const distFromCenter = Math.sqrt(
            (pt.x - centerX) ** 2 + (pt.y - centerY) ** 2
          );
          const normalizedDist = distFromCenter / (Math.max(w, h) * 0.7);

          const waveX =
            Math.sin(wavePhase + pi * 0.1 + normalizedDist * 3) *
            line.amplitude *
            (1 - progress * 0.3);
          const waveY =
            Math.cos(wavePhase + pi * 0.08 + normalizedDist * 2.5) *
            line.amplitude *
            (1 - progress * 0.3);

          // Mouse influence falls off with distance
          const dx = pt.x - mouse.x;
          const dy = pt.y - mouse.y;
          const mouseDist = Math.sqrt(dx * dx + dy * dy);
          const mouseFalloff = Math.max(0, 1 - mouseDist / 300);

          const mx = mouseInfluenceX * mouseFalloff * (1 + progress);
          const my = mouseInfluenceY * mouseFalloff * (1 + progress);

          const finalX = pt.x + waveX + mx;
          const finalY = pt.y + waveY + my;

          if (pi === 0) {
            ctx!.moveTo(finalX, finalY);
          } else {
            ctx!.lineTo(finalX, finalY);
          }
        }

        ctx!.stroke();
      }

      // Subtle accent glow at center
      const glowGrad = ctx!.createRadialGradient(
        centerX + mouseInfluenceX * 2,
        centerY + mouseInfluenceY * 2,
        0,
        centerX + mouseInfluenceX * 2,
        centerY + mouseInfluenceY * 2,
        Math.min(w, h) * 0.4
      );
      glowGrad.addColorStop(0, 'rgba(79, 93, 255, 0.04)');
      glowGrad.addColorStop(0.5, 'rgba(22, 58, 99, 0.02)');
      glowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx!.fillStyle = glowGrad;
      ctx!.fillRect(0, 0, w, h);

      animRef.current = requestAnimationFrame(draw);
    }

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      ro.disconnect();
      canvas.removeEventListener('mousemove', handleMouse);
    };
  }, []);

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      />
    </div>
  );
}
