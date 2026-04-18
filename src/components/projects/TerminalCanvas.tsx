import { useRef, useEffect } from 'react';

interface TerminalCanvasProps {
  speedMultiplier?: number;
  width?: number;
  height?: number;
  isMini?: boolean;
  projectId?: string;
}

interface TerminalLine {
  text: string;
  color: string;
  delay: number;
  typeSpeed: number;
}

function getLines(projectId?: string): TerminalLine[] {
  if (projectId === 'website-media-capture-mcp') {
    return [
      { text: '$ capture --url https://example.com --output screenshot.png', color: '#4ade80', delay: 0, typeSpeed: 0.6 },
      { text: '> Launching headless browser...', color: '#8a8a8a', delay: 800, typeSpeed: 0.4 },
      { text: '> Waiting for page load...', color: '#8a8a8a', delay: 1400, typeSpeed: 0.4 },
      { text: '> Page loaded: 2.3s', color: '#4ade80', delay: 2000, typeSpeed: 0.4 },
      { text: '> Capturing screenshot at 1920x1080...', color: '#f5f5f5', delay: 2600, typeSpeed: 0.4 },
      { text: '> Screenshot saved: screenshot.png', color: '#4ade80', delay: 3200, typeSpeed: 0.4 },
      { text: '', color: '#555', delay: 3800, typeSpeed: 0 },
      { text: '$ capture --record --duration 10s --output demo.mp4', color: '#4ade80', delay: 4000, typeSpeed: 0.5 },
      { text: '> Starting screen recording...', color: '#8a8a8a', delay: 4800, typeSpeed: 0.4 },
      { text: '> Recording: 10s @ 60fps', color: '#f5f5f5', delay: 5400, typeSpeed: 0.4 },
      { text: '> Recording saved: demo.mp4', color: '#4ade80', delay: 6200, typeSpeed: 0.4 },
    ];
  }

  return [
    { text: '$ shipd analyze --repo my-project', color: '#4ade80', delay: 0, typeSpeed: 0.6 },
    { text: '> Detected Dockerfile, docker-compose.yml...', color: '#8a8a8a', delay: 800, typeSpeed: 0.4 },
    { text: '> Detected CI configs, environment files...', color: '#8a8a8a', delay: 1400, typeSpeed: 0.4 },
    { text: '> Scanning infrastructure folders...', color: '#8a8a8a', delay: 2000, typeSpeed: 0.4 },
    { text: '> Scoring platforms...', color: '#f5f5f5', delay: 2600, typeSpeed: 0.4 },
    { text: '  Railway:  92/100', color: '#4ade80', delay: 3200, typeSpeed: 0.3 },
    { text: '  Fly.io:   88/100', color: '#4ade80', delay: 3600, typeSpeed: 0.3 },
    { text: '  Render:   76/100', color: '#fbbf24', delay: 4000, typeSpeed: 0.3 },
    { text: '  Vercel:   64/100', color: '#fbbf24', delay: 4400, typeSpeed: 0.3 },
    { text: '', color: '#555', delay: 5000, typeSpeed: 0 },
    { text: '$ shipd plan --save', color: '#4ade80', delay: 5200, typeSpeed: 0.5 },
    { text: '> Plan saved: deploy-plan-v1.json', color: '#4ade80', delay: 6000, typeSpeed: 0.4 },
    { text: '> Comparison view: 5 platforms analyzed', color: '#f5f5f5', delay: 6600, typeSpeed: 0.4 },
    { text: '> Evidence trail: 12 artifacts documented', color: '#f5f5f5', delay: 7200, typeSpeed: 0.4 },
  ];
}

export default function TerminalCanvas({ speedMultiplier = 1, width = 400, height = 200, isMini = false, projectId }: TerminalCanvasProps) {
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

    const lines = getLines(projectId);
    const lineHeight = isMini ? 14 : 16;
    const fontSize = isMini ? 8 : 10;
    const padding = isMini ? 8 : 12;
    const maxVisibleLines = Math.floor((h - padding * 2) / lineHeight);

    // Track typed characters per line
    const typedChars: number[] = lines.map(() => 0);
    const lineVisible: boolean[] = lines.map(() => false);
    const startTime = performance.now();
    let cursorVisible = true;
    let lastCursorToggle = 0;
    let currentLine = 0;

    const draw = (now: number) => {
      const elapsed = (now - startTime) * speedMultiplier;

      // Clear
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, w, h);

      // Scan lines effect
      for (let y = 0; y < h; y += 2) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.015)';
        ctx.fillRect(0, y, w, 1);
      }

      // Update line visibility and typing
      for (let i = 0; i < lines.length; i++) {
        if (elapsed >= lines[i].delay / speedMultiplier) {
          lineVisible[i] = true;
          const typeAmount = Math.floor((elapsed - lines[i].delay / speedMultiplier) * lines[i].typeSpeed * 0.15);
          typedChars[i] = Math.min(lines[i].text.length, typeAmount);
          if (typedChars[i] >= lines[i].text.length && i > currentLine) {
            currentLine = i;
          }
        }
      }

      // Draw visible lines
      ctx.font = `${fontSize}px "JetBrains Mono", monospace`;
      ctx.textBaseline = 'top';

      let yOffset = padding;
      let drawnLines = 0;
      const visibleLineIndices: number[] = [];

      for (let i = 0; i < lines.length; i++) {
        if (lineVisible[i]) {
          visibleLineIndices.push(i);
        }
      }

      // Scroll if needed
      const scrollOffset = Math.max(0, visibleLineIndices.length - maxVisibleLines);
      const startIdx = scrollOffset;

      for (let vi = startIdx; vi < visibleLineIndices.length; vi++) {
        const idx = visibleLineIndices[vi];
        const line = lines[idx];
        const text = line.text.substring(0, typedChars[idx]);

        ctx.fillStyle = line.color;
        ctx.fillText(text, padding, yOffset);

        // Cursor on current line (last visible, fully or partially typed)
        if (idx === visibleLineIndices[visibleLineIndices.length - 1]) {
          const textWidth = ctx.measureText(text).width;
          if (cursorVisible) {
            ctx.fillStyle = '#4ade80';
            ctx.fillRect(padding + textWidth, yOffset, 6, fontSize);
          }
        }

        yOffset += lineHeight;
        drawnLines++;
        if (drawnLines >= maxVisibleLines) break;
      }

      // Blink cursor
      if (elapsed - lastCursorToggle > 530 / speedMultiplier) {
        cursorVisible = !cursorVisible;
        lastCursorToggle = elapsed;
      }

      // Loop: reset after all lines typed and some pause
      const lastLine = lines[lines.length - 1];
      const totalDuration = (lastLine.delay + 2000) / speedMultiplier;
      if (elapsed > totalDuration) {
        // Reset for loop
        for (let i = 0; i < lines.length; i++) {
          typedChars[i] = 0;
          lineVisible[i] = false;
        }
        currentLine = 0;
        // Restart timing by adjusting startTime
        const newStart = performance.now();
        // We need to continue the animation but with fresh timing
        // Use a closure-like approach with a mutable object
        resetTimeOffset = now - newStart;
      }

      animRef.current = requestAnimationFrame(draw);
    };

    let resetTimeOffset = 0;

    const wrappedDraw = (now: number) => {
      draw(now - resetTimeOffset);
    };

    animRef.current = requestAnimationFrame(wrappedDraw);

    return () => {
      cancelAnimationFrame(animRef.current);
    };
  }, [width, height, speedMultiplier, isMini, projectId]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        display: 'block',
        background: '#000000',
      }}
    />
  );
}
