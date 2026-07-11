import { useEffect, useRef } from 'react';

type Signal = {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  phase: number;
  radius: number;
};

const SIGNAL_COUNT = 18;

export default function AmbientSignalCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const stage = canvas?.parentElement;
    if (!canvas || !stage) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const pointer = { x: -1000, y: -1000 };
    let width = 0;
    let height = 0;
    let frame = 0;
    let isVisible = true;
    let signals: Signal[] = [];

    const createSignals = () => {
      signals = Array.from({ length: SIGNAL_COUNT }, (_, index) => {
        const column = index % 6;
        const row = Math.floor(index / 6);
        const baseX = ((column + 0.45 + ((index * 17) % 9) / 18) / 6) * width;
        const baseY = ((row + 0.3 + ((index * 11) % 7) / 14) / 3) * height;
        return { x: baseX, y: baseY, baseX, baseY, phase: index * 0.73, radius: index % 4 === 0 ? 3.2 : 2 };
      });
    };

    const resize = () => {
      const bounds = stage.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      createSignals();
    };

    const draw = (time = 0) => {
      context.clearRect(0, 0, width, height);

      signals.forEach((signal, index) => {
        const drift = reducedMotion ? 0 : time * 0.00035;
        signal.x = signal.baseX + Math.sin(drift + signal.phase) * (8 + (index % 3) * 3);
        signal.y = signal.baseY + Math.cos(drift * 0.8 + signal.phase) * (7 + (index % 2) * 4);

        const dx = pointer.x - signal.x;
        const dy = pointer.y - signal.y;
        const distance = Math.hypot(dx, dy);
        if (!reducedMotion && distance < 130) {
          const pull = (1 - distance / 130) * 12;
          signal.x -= (dx / Math.max(distance, 1)) * pull;
          signal.y -= (dy / Math.max(distance, 1)) * pull;
        }
      });

      for (let a = 0; a < signals.length; a += 1) {
        for (let b = a + 1; b < signals.length; b += 1) {
          const first = signals[a];
          const second = signals[b];
          const distance = Math.hypot(first.x - second.x, first.y - second.y);
          if (distance < 116) {
            context.beginPath();
            context.moveTo(first.x, first.y);
            context.lineTo(second.x, second.y);
            context.strokeStyle = `rgba(21, 22, 16, ${(1 - distance / 116) * 0.2})`;
            context.lineWidth = 1;
            context.stroke();
          }
        }
      }

      signals.forEach((signal, index) => {
        context.beginPath();
        context.arc(signal.x, signal.y, signal.radius, 0, Math.PI * 2);
        context.fillStyle = index % 5 === 0 ? '#536dff' : index % 7 === 0 ? '#d8ff3e' : 'rgba(21, 22, 16, .62)';
        context.fill();
      });

      if (!reducedMotion && isVisible) frame = requestAnimationFrame(draw);
    };

    const onPointerMove = (event: PointerEvent) => {
      const bounds = stage.getBoundingClientRect();
      pointer.x = event.clientX - bounds.left;
      pointer.y = event.clientY - bounds.top;
    };
    const onPointerLeave = () => {
      pointer.x = -1000;
      pointer.y = -1000;
    };

    const observer = new ResizeObserver(resize);
    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        cancelAnimationFrame(frame);
        if (isVisible && !reducedMotion) frame = requestAnimationFrame(draw);
      },
      { rootMargin: '120px' },
    );
    observer.observe(stage);
    visibilityObserver.observe(stage);
    stage.addEventListener('pointermove', onPointerMove);
    stage.addEventListener('pointerleave', onPointerLeave);
    resize();
    draw();

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      visibilityObserver.disconnect();
      stage.removeEventListener('pointermove', onPointerMove);
      stage.removeEventListener('pointerleave', onPointerLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="signal-canvas" aria-hidden="true" />;
}
