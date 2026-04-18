import { useRef, useEffect } from 'react';

/* ── Desert Topographic Contours ───────────────────
   Flowing terrain contour lines — visible, elegant,
   mouse-reactive.  Sits behind hero text.            */

interface Layer {
  yBase: number;
  amp: number;
  spd: number;
  phase: number;
  opacity: number;
  lw: number;
}

function build(): Layer[] {
  const ls: Layer[] = [];
  for (let i = 0; i < 22; i++) {
    const t = i / 21;
    ls.push({
      yBase: 0.08 + t * 0.84,
      amp: 35 + Math.random() * 55,
      spd: 0.0004 + Math.random() * 0.0006,
      phase: Math.random() * Math.PI * 2,
      opacity: 0.08 + (1 - Math.abs(t - 0.5) * 2) * 0.18,
      lw: 0.6 + Math.random() * 1.0,
    });
  }
  return ls;
}

export default function ParticleField() {
  const cvs = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -9999, y: -9999, on: false });
  const raf = useRef(0);
  const tick = useRef(0);
  const layers = useRef<Layer[]>(build());

  useEffect(() => {
    const c = cvs.current;
    if (!c) return;
    const x = c.getContext('2d');
    if (!x) return;

    let W = 0, H = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      const r = c!.getBoundingClientRect();
      W = r.width; H = r.height;
      c!.width = W * dpr; c!.height = H * dpr;
      x!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(c);

    const mv = (e: MouseEvent) => {
      const r = c.getBoundingClientRect();
      mouse.current.x = e.clientX - r.left;
      mouse.current.y = e.clientY - r.top;
      mouse.current.on = true;
    };
    const ml = () => { mouse.current.on = false; };
    c.addEventListener('mousemove', mv, { passive: true });
    c.addEventListener('mouseleave', ml);

    function draw() {
      const m = mouse.current;
      tick.current++;
      const t = tick.current;

      x!.clearRect(0, 0, W, H);
      x!.fillStyle = '#000000';
      x!.fillRect(0, 0, W, H);

      const ls = layers.current;
      const RES = 250;
      const step = W / RES;

      for (let li = 0; li < ls.length; li++) {
        const L = ls[li];
        const y0 = L.yBase * H;

        // ── primary line
        x!.beginPath();
        x!.strokeStyle = `rgba(180, 190, 210, ${L.opacity})`;
        x!.lineWidth = L.lw;
        x!.lineJoin = 'round';
        x!.lineCap = 'round';

        let first = true;
        for (let pi = 0; pi <= RES; pi++) {
          const px = pi * step;
          const n = pi / RES;

          let y = y0
            + Math.sin(n * Math.PI * 2 * 3 + L.phase + t * L.spd) * L.amp * 0.45
            + Math.sin(n * Math.PI * 2 * 7 + L.phase * 1.4 + t * L.spd * 1.2) * L.amp * 0.28
            + Math.sin(n * Math.PI * 2 * 13 + L.phase * 0.6 + t * L.spd * 0.9) * L.amp * 0.14;

          // mouse warp
          if (m.on) {
            const dx = px - m.x, dy = y - m.y;
            const d = Math.sqrt(dx * dx + dy * dy);
            const R = 280;
            if (d < R) {
              const f = 1 - d / R;
              y -= Math.sin(f * Math.PI) * 28 * f;
            }
          }

          if (first) { x!.moveTo(px, y); first = false; }
          else { x!.lineTo(px, y); }
        }
        x!.stroke();

        // ── echo line
        x!.beginPath();
        x!.strokeStyle = `rgba(160, 170, 200, ${L.opacity * 0.3})`;
        x!.lineWidth = L.lw * 0.5;
        first = true;
        for (let pi = 0; pi <= RES; pi++) {
          const px = pi * step;
          const n = pi / RES;
          let y = y0 + 22
            + Math.sin(n * Math.PI * 2 * 3 + L.phase + t * L.spd + 0.6) * L.amp * 0.38
            + Math.sin(n * Math.PI * 2 * 5 + L.phase * 1.2 + t * L.spd * 1.1) * L.amp * 0.18;

          if (m.on) {
            const dx = px - m.x, dy = y - m.y;
            const d = Math.sqrt(dx * dx + dy * dy);
            const R = 280;
            if (d < R) {
              const f = 1 - d / R;
              y -= Math.sin(f * Math.PI) * 18 * f;
            }
          }

          if (first) { x!.moveTo(px, y); first = false; }
          else { x!.lineTo(px, y); }
        }
        x!.stroke();
      }

      // ── vertical grid (terrain map style)
      x!.strokeStyle = 'rgba(255,255,255,0.025)';
      x!.lineWidth = 0.3;
      for (let gx = 0; gx < W; gx += 70) {
        x!.beginPath(); x!.moveTo(gx, 0); x!.lineTo(gx, H); x!.stroke();
      }

      // ── radial vignette
      const v = x!.createRadialGradient(W / 2, H / 2, H * 0.25, W / 2, H / 2, H * 0.85);
      v.addColorStop(0, 'rgba(0,0,0,0)');
      v.addColorStop(1, 'rgba(0,0,0,0.55)');
      x!.fillStyle = v;
      x!.fillRect(0, 0, W, H);

      raf.current = requestAnimationFrame(draw);
    }

    raf.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf.current);
      ro.disconnect();
      c.removeEventListener('mousemove', mv);
      c.removeEventListener('mouseleave', ml);
    };
  }, []);

  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
      <canvas
        ref={cvs}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
      />
    </div>
  );
}
