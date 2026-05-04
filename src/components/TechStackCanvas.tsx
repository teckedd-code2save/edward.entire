import { useRef, useEffect } from 'react';

interface TechNode {
  name: string;
  abbr: string;
  color: string;
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  radius: number;
  phase: number;
  connections: number[];
}

const NODES: Omit<TechNode, 'x' | 'y' | 'baseX' | 'baseY' | 'phase'>[] = [
  { name: 'Go', abbr: 'Go', color: '#00ADD8', radius: 22, connections: [1, 3, 6] },
  { name: 'TypeScript', abbr: 'TS', color: '#3178C6', radius: 22, connections: [0, 2, 4, 7] },
  { name: 'Python', abbr: 'Py', color: '#3776AB', radius: 22, connections: [1, 5, 11] },
  { name: 'PostgreSQL', abbr: 'Pg', color: '#336791', radius: 20, connections: [0, 4, 8] },
  { name: 'Redis', abbr: 'Rd', color: '#DC382D', radius: 20, connections: [1, 3, 5] },
  { name: 'Elasticsearch', abbr: 'Es', color: '#005571', radius: 20, connections: [2, 4, 8] },
  { name: 'Docker', abbr: 'Dx', color: '#2496ED', radius: 20, connections: [0, 7, 9] },
  { name: 'Kubernetes', abbr: 'K8s', color: '#326CE5', radius: 20, connections: [1, 6, 9] },
  { name: 'AWS', abbr: 'AWS', color: '#FF9900', radius: 18, connections: [3, 5, 9, 10] },
  { name: 'GCP', abbr: 'GCP', color: '#4285F4', radius: 18, connections: [6, 7, 8, 10] },
  { name: 'Cloudflare', abbr: 'CF', color: '#F38020', radius: 18, connections: [8, 9] },
  { name: 'Claude', abbr: 'AI', color: '#D4A574', radius: 18, connections: [2, 4] },
];

interface Packet {
  from: number;
  to: number;
  progress: number;
  speed: number;
}

export default function TechStackCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const hoveredRef = useRef<number>(-1);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio, 2);
    let width = 0;
    let height = 0;

    const nodes: TechNode[] = NODES.map((n, i) => {
      const angle = (i / NODES.length) * Math.PI * 2 - Math.PI / 2;
      const dist = 130;
      const x = Math.cos(angle) * dist;
      const y = Math.sin(angle) * dist;
      return {
        ...n,
        baseX: x,
        baseY: y,
        x,
        y,
        phase: i * 1.2,
      };
    });

    const packets: Packet[] = [];
    const spawnPacket = () => {
      const from = Math.floor(Math.random() * nodes.length);
      const to = nodes[from].connections[Math.floor(Math.random() * nodes[from].connections.length)];
      packets.push({ from, to, progress: 0, speed: 0.008 + Math.random() * 0.012 });
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left - width / 2;
      mouseRef.current.y = e.clientY - rect.top - height / 2;
    };
    const onMouseLeave = () => {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
      hoveredRef.current = -1;
    };

    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('resize', resize);

    let time = 0;
    let visible = true;
    const observer = new IntersectionObserver(
      ([entry]) => { visible = entry.isIntersecting; },
      { threshold: 0.01 }
    );
    observer.observe(canvas);

    const render = () => {
      if (!visible) {
        rafRef.current = requestAnimationFrame(render);
        return;
      }

      time += 0.016;
      ctx.clearRect(0, 0, width, height);
      ctx.save();
      ctx.translate(width / 2, height / 2);

      // Update node positions
      hoveredRef.current = -1;
      nodes.forEach((node, i) => {
        const floatX = Math.sin(time * 0.8 + node.phase) * 8;
        const floatY = Math.cos(time * 0.6 + node.phase * 0.7) * 6;
        node.x = node.baseX + floatX;
        node.y = node.baseY + floatY;

        const dx = mouseRef.current.x - node.x;
        const dy = mouseRef.current.y - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < node.radius + 10) {
          hoveredRef.current = i;
        }
      });

      const hovered = hoveredRef.current;

      // Draw connection lines
      nodes.forEach((node, i) => {
        node.connections.forEach((j) => {
          if (j < i) return; // Avoid double drawing
          const other = nodes[j];
          const isHighlighted = hovered === i || hovered === j;

          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(other.x, other.y);
          ctx.strokeStyle = isHighlighted
            ? 'rgba(91,109,245,0.25)'
            : 'rgba(0,0,0,0.06)';
          ctx.lineWidth = isHighlighted ? 1.5 : 1;
          ctx.setLineDash(isHighlighted ? [] : [4, 4]);
          ctx.stroke();
          ctx.setLineDash([]);
        });
      });

      // Spawn packets
      if (Math.random() < 0.03) spawnPacket();

      // Update and draw packets
      for (let i = packets.length - 1; i >= 0; i--) {
        const p = packets[i];
        p.progress += p.speed;
        if (p.progress >= 1) {
          packets.splice(i, 1);
          continue;
        }

        const from = nodes[p.from];
        const to = nodes[p.to];
        const px = from.x + (to.x - from.x) * p.progress;
        const py = from.y + (to.y - from.y) * p.progress;

        const isHighlighted = hovered === p.from || hovered === p.to;
        ctx.beginPath();
        ctx.arc(px, py, isHighlighted ? 3 : 2, 0, Math.PI * 2);
        ctx.fillStyle = isHighlighted ? 'rgba(91,109,245,0.8)' : 'rgba(91,109,245,0.4)';
        ctx.fill();
      }

      // Draw central hub
      ctx.beginPath();
      ctx.arc(0, 0, 28, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(91,109,245,0.06)';
      ctx.strokeStyle = 'rgba(91,109,245,0.2)';
      ctx.lineWidth = 1;
      ctx.fill();
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(0, 0, 20, 0, Math.PI * 2);
      ctx.fillStyle = 'var(--accent)';
      ctx.fill();

      // Hub hexagon
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (i * Math.PI) / 3 - Math.PI / 6;
        const hx = Math.cos(angle) * 10;
        const hy = Math.sin(angle) * 10;
        if (i === 0) ctx.moveTo(hx, hy);
        else ctx.lineTo(hx, hy);
      }
      ctx.closePath();
      ctx.strokeStyle = 'rgba(255,255,255,0.9)';
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(0, 0, 3, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,255,255,0.9)';
      ctx.fill();

      // Draw nodes
      nodes.forEach((node) => {
        const isHovered = hovered === NODES.indexOf(NODES.find(n => n.name === node.name)!);
        const r = node.radius + (isHovered ? 4 : 0);

        // Outer glow
        ctx.beginPath();
        ctx.arc(node.x, node.y, r + 6, 0, Math.PI * 2);
        ctx.fillStyle = `${node.color}12`;
        ctx.fill();
        ctx.strokeStyle = isHovered ? `${node.color}60` : `${node.color}30`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Inner circle
        ctx.beginPath();
        ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `${node.color}20`;
        ctx.fill();
        ctx.strokeStyle = node.color;
        ctx.lineWidth = isHovered ? 2 : 1.5;
        ctx.stroke();

        // Abbr text
        ctx.fillStyle = '#111111';
        ctx.font = `${node.abbr.length > 2 ? 600 : 700} ${node.abbr.length > 2 ? 8 : 10}px "JetBrains Mono", monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(node.abbr, node.x, node.y + 0.5);

        // Label
        ctx.fillStyle = isHovered ? 'var(--fg-2)' : 'var(--fg-3)';
        ctx.font = "500 9px 'JetBrains Mono', monospace";
        ctx.letterSpacing = '0.5px';
        ctx.fillText(node.name, node.x, node.y + r + 16);
      });

      // Hub label
      ctx.fillStyle = 'var(--fg)';
      ctx.font = "500 11px 'JetBrains Mono', monospace";
      ctx.textAlign = 'center';
      ctx.fillText('Core Stack', 0, 48);

      ctx.restore();
      rafRef.current = requestAnimationFrame(render);
    };

    rafRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafRef.current);
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('resize', resize);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: '100%',
        height: '100%',
        minHeight: 400,
      }}
    />
  );
}
