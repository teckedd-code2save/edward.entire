import { useRef, useEffect } from 'react';

interface ExchangeCanvasProps {
  speedMultiplier?: number;
  width?: number;
  height?: number;
  isMini?: boolean;
}

interface ClusterNode {
  x: number;
  y: number;
  label: string;
}

interface FlowPacket {
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  progress: number;
  speed: number;
}

export default function ExchangeCanvas({ speedMultiplier = 1, width = 400, height = 200, isMini = false }: ExchangeCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const w = width;
    const h = height;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.scale(dpr, dpr);

    // Publisher cluster (left)
    const pubCount = isMini ? 3 : 4;
    const publishers: ClusterNode[] = [];
    for (let i = 0; i < pubCount; i++) {
      publishers.push({
        x: w * 0.25,
        y: h * 0.2 + (h * 0.6 / (pubCount - 1)) * i,
        label: i === 0 ? 'API' : i === 1 ? 'service' : i === 2 ? 'contract' : 'agent',
      });
    }

    // Consumer cluster (right)
    const consCount = isMini ? 3 : 4;
    const consumers: ClusterNode[] = [];
    for (let i = 0; i < consCount; i++) {
      consumers.push({
        x: w * 0.75,
        y: h * 0.2 + (h * 0.6 / (consCount - 1)) * i,
        label: i === 0 ? 'buyer' : i === 1 ? 'agent' : i === 2 ? 'gateway' : 'wallet',
      });
    }

    // Flowing packets
    const packets: FlowPacket[] = [];
    for (let i = 0; i < 6; i++) {
      const pubIdx = i % publishers.length;
      const consIdx = (i + 1) % consumers.length;
      packets.push({
        fromX: publishers[pubIdx].x,
        fromY: publishers[pubIdx].y,
        toX: consumers[consIdx].x,
        toY: consumers[consIdx].y,
        progress: i / 6,
        speed: 0.003 + Math.random() * 0.004,
      });
    }

    // Add return flow packets
    for (let i = 0; i < 4; i++) {
      const pubIdx = (i + 2) % publishers.length;
      const consIdx = i % consumers.length;
      packets.push({
        fromX: consumers[consIdx].x,
        fromY: consumers[consIdx].y,
        toX: publishers[pubIdx].x,
        toY: publishers[pubIdx].y,
        progress: i / 4,
        speed: 0.003 + Math.random() * 0.004,
      });
    }

    let time = 0;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      // Background
      ctx.fillStyle = '#030303';
      ctx.fillRect(0, 0, w, h);

      // Vertical dashed divider
      const dividerX = w / 2;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(dividerX, h * 0.15);
      ctx.lineTo(dividerX, h * 0.85);
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw connecting lines between clusters
      publishers.forEach((pub) => {
        consumers.forEach((cons) => {
          ctx.strokeStyle = 'rgba(79, 93, 255, 0.06)';
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(pub.x, pub.y);
          ctx.lineTo(cons.x, cons.y);
          ctx.stroke();
        });
      });

      // Update and draw flowing packets
      packets.forEach((packet) => {
        packet.progress += packet.speed * speedMultiplier;
        if (packet.progress > 1) packet.progress = 0;

        const px = packet.fromX + (packet.toX - packet.fromX) * packet.progress;
        const py = packet.fromY + (packet.toY - packet.fromY) * packet.progress;

        // Packet trail
        const trailLen = 20;
        const trailProgress = Math.max(0, packet.progress - 0.05);
        const tx = packet.fromX + (packet.toX - packet.fromX) * trailProgress;
        const ty = packet.fromY + (packet.toY - packet.fromY) * trailProgress;

        ctx.strokeStyle = 'rgba(79, 93, 255, 0.2)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(px, py);
        ctx.stroke();

        // Packet glow
        const glow = ctx.createRadialGradient(px, py, 0, px, py, 5);
        glow.addColorStop(0, 'rgba(251, 191, 36, 0.5)');
        glow.addColorStop(1, 'rgba(251, 191, 36, 0)');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(px, py, 5, 0, Math.PI * 2);
        ctx.fill();

        // Packet dot
        ctx.fillStyle = 'rgba(251, 191, 36, 0.9)';
        ctx.beginPath();
        ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw publisher nodes
      publishers.forEach((node, i) => {
        const pulse = Math.sin(time * 0.04 + i * 1.2) * 0.15;
        const radius = (isMini ? 5 : 7) + pulse;

        // Glow
        const glow = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, radius * 2.5);
        glow.addColorStop(0, 'rgba(79, 93, 255, 0.25)');
        glow.addColorStop(1, 'rgba(79, 93, 255, 0)');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(node.x, node.y, radius * 2.5, 0, Math.PI * 2);
        ctx.fill();

        // Node
        ctx.fillStyle = 'rgba(79, 93, 255, 0.7)';
        ctx.beginPath();
        ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
        ctx.fill();

        // Label
        if (!isMini) {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
          ctx.font = '7px "JetBrains Mono", monospace';
          ctx.textAlign = 'center';
          ctx.fillText(node.label, node.x, node.y + radius + 9);
        }
      });

      // Draw consumer nodes
      consumers.forEach((node, i) => {
        const pulse = Math.sin(time * 0.04 + i * 1.2 + 2) * 0.15;
        const radius = (isMini ? 5 : 7) + pulse;

        // Glow
        const glow = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, radius * 2.5);
        glow.addColorStop(0, 'rgba(251, 191, 36, 0.25)');
        glow.addColorStop(1, 'rgba(251, 191, 36, 0)');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(node.x, node.y, radius * 2.5, 0, Math.PI * 2);
        ctx.fill();

        // Node
        ctx.fillStyle = 'rgba(251, 191, 36, 0.7)';
        ctx.beginPath();
        ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
        ctx.fill();

        // Label
        if (!isMini) {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
          ctx.font = '7px "JetBrains Mono", monospace';
          ctx.textAlign = 'center';
          ctx.fillText(node.label, node.x, node.y + radius + 9);
        }
      });

      // Cluster labels
      if (!isMini) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.font = '8px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.fillText('PUBLISHERS', w * 0.25, h * 0.08);
        ctx.fillText('CONSUMERS', w * 0.75, h * 0.08);
      }

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
