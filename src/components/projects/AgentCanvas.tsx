import { useRef, useEffect } from 'react';

interface AgentCanvasProps {
  speedMultiplier?: number;
  width?: number;
  height?: number;
  isMini?: boolean;
}

interface Node {
  id: string;
  x: number;
  y: number;
  label: string;
  radius: number;
}

interface Packet {
  from: string;
  to: string;
  progress: number;
  speed: number;
}

export default function AgentCanvas({ speedMultiplier = 1, width = 400, height = 200, isMini = false }: AgentCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size with device pixel ratio
    const dpr = window.devicePixelRatio || 1;
    const w = width;
    const h = height;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.scale(dpr, dpr);

    // Node positions
    const cx = w / 2;
    const cy = h / 2;
    const offset = isMini ? 40 : 60;

    const nodes: Node[] = [
      { id: 'orchestrator', x: cx, y: cy, label: 'orchestrator', radius: isMini ? 10 : 16 },
      { id: 'research', x: cx - offset, y: cy - offset * 0.6, label: 'research', radius: isMini ? 6 : 8 },
      { id: 'analysis', x: cx + offset, y: cy - offset * 0.6, label: 'analysis', radius: isMini ? 6 : 8 },
      { id: 'report', x: cx, y: cy + offset * 0.8, label: 'report', radius: isMini ? 6 : 8 },
    ];

    const edges: [string, string][] = [
      ['orchestrator', 'research'],
      ['orchestrator', 'analysis'],
      ['orchestrator', 'report'],
      ['research', 'analysis'],
      ['analysis', 'report'],
      ['report', 'research'],
    ];

    const packets: Packet[] = [
      { from: 'orchestrator', to: 'research', progress: 0, speed: 0.008 },
      { from: 'orchestrator', to: 'analysis', progress: 0.33, speed: 0.006 },
      { from: 'orchestrator', to: 'report', progress: 0.66, speed: 0.007 },
      { from: 'research', to: 'analysis', progress: 0.5, speed: 0.009 },
      { from: 'analysis', to: 'report', progress: 0.2, speed: 0.005 },
      { from: 'report', to: 'research', progress: 0.8, speed: 0.007 },
    ];

    const nodeMap = new Map<string, Node>();
    nodes.forEach((n) => nodeMap.set(n.id, n));

    let time = 0;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      // Subtle grid background
      ctx.strokeStyle = 'rgba(79, 93, 255, 0.04)';
      ctx.lineWidth = 0.5;
      const gridSize = 20;
      for (let x = 0; x < w; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Draw edges
      edges.forEach(([fromId, toId]) => {
        const from = nodeMap.get(fromId);
        const to = nodeMap.get(toId);
        if (!from || !to) return;

        ctx.strokeStyle = 'rgba(79, 93, 255, 0.12)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.stroke();
      });

      // Update and draw packets
      packets.forEach((packet) => {
        packet.progress += packet.speed * speedMultiplier;
        if (packet.progress > 1) packet.progress = 0;

        const from = nodeMap.get(packet.from);
        const to = nodeMap.get(packet.to);
        if (!from || !to) return;

        const px = from.x + (to.x - from.x) * packet.progress;
        const py = from.y + (to.y - from.y) * packet.progress;

        // Packet glow
        const glow = ctx.createRadialGradient(px, py, 0, px, py, 4);
        glow.addColorStop(0, 'rgba(79, 93, 255, 0.6)');
        glow.addColorStop(1, 'rgba(79, 93, 255, 0)');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(px, py, 4, 0, Math.PI * 2);
        ctx.fill();

        // Packet dot
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.beginPath();
        ctx.arc(px, py, 2, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw nodes
      nodes.forEach((node) => {
        // Node halo
        const haloRadius = node.radius * 2;
        const halo = ctx.createRadialGradient(node.x, node.y, node.radius, node.x, node.y, haloRadius);
        halo.addColorStop(0, 'rgba(79, 93, 255, 0.15)');
        halo.addColorStop(1, 'rgba(79, 93, 255, 0)');
        ctx.fillStyle = halo;
        ctx.beginPath();
        ctx.arc(node.x, node.y, haloRadius, 0, Math.PI * 2);
        ctx.fill();

        // Node circle
        ctx.fillStyle = 'rgba(79, 93, 255, 0.4)';
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();

        // Node border
        ctx.strokeStyle = 'rgba(79, 93, 255, 0.6)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.stroke();

        // Pulse effect on orchestrator
        if (node.id === 'orchestrator') {
          const pulseR = node.radius + Math.sin(time * 0.05) * 4;
          ctx.strokeStyle = `rgba(79, 93, 255, ${0.3 + Math.sin(time * 0.05) * 0.15})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(node.x, node.y, pulseR + 4, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Label
        if (!isMini) {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
          ctx.font = '9px "JetBrains Mono", monospace';
          ctx.textAlign = 'center';
          ctx.fillText(node.label, node.x, node.y + node.radius + 14);
        }
      });

      time++;
      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
    };
  }, [width, height, speedMultiplier, isMini]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        display: 'block',
        background: '#030303',
      }}
    />
  );
}
