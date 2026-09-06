import * as THREE from 'three';

const WIDTH = 2560;
const HEIGHT = 1600;
const FONT = '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
const MONO = '"SFMono-Regular", Consolas, monospace';
const PROMPT = 'Keep Ghana Health conversations usable after the first recording. Show the model’s interpretation in every chat, and let me stop voice playback.';
const INTRO = 'I’ll trace the saved conversations and voice controls, then connect the follow-up composer to the existing chat stream.';
const RESULT = 'Conversations now keep their interpretation when reopened. The home screen accepts follow-up text, and Read aloud becomes Stop reading while audio plays.';
const COLORS = {
  background: '#171717',
  sidebar: '#121212',
  raised: '#242424',
  border: '#353535',
  text: '#ededed',
  secondary: '#b5b5b5',
  muted: '#7c7c7c',
  blue: '#a1b6d0',
};

type Surface = {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  texture: THREE.CanvasTexture;
};

export type WorkstationTextures = {
  ide: THREE.CanvasTexture;
  release: THREE.CanvasTexture;
  operations: THREE.CanvasTexture;
  product: THREE.CanvasTexture;
  draw: (progress: number) => void;
  dispose: () => void;
};

function surface(): Surface {
  const canvas = document.createElement('canvas');
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  const context = canvas.getContext('2d', { alpha: false });
  if (!context) throw new Error('The workstation needs a canvas rendering context.');
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 16;
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  return { canvas, context, texture };
}

function box(c: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, radius: number, fill: string, stroke?: string) {
  c.beginPath();
  c.roundRect(x, y, w, h, radius);
  c.fillStyle = fill;
  c.fill();
  if (stroke) {
    c.strokeStyle = stroke;
    c.lineWidth = 1.5;
    c.stroke();
  }
}

function label(c: CanvasRenderingContext2D, value: string, x: number, y: number, size = 30, color = COLORS.text, weight = 400, mono = false) {
  c.font = `${weight} ${size}px ${mono ? MONO : FONT}`;
  c.fillStyle = color;
  c.textBaseline = 'alphabetic';
  c.fillText(value, x, y);
}

function paragraph(c: CanvasRenderingContext2D, value: string, x: number, y: number, width: number, size = 36, lineHeight = 53, color = COLORS.text) {
  c.font = `400 ${size}px ${FONT}`;
  c.fillStyle = color;
  const words = value.split(' ');
  let line = '';
  let lineY = y;
  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (c.measureText(next).width > width && line) {
      c.fillText(line, x, lineY);
      line = word;
      lineY += lineHeight;
    } else line = next;
  }
  c.fillText(line, x, lineY);
  return { x: x + c.measureText(line).width, y: lineY };
}

function line(c: CanvasRenderingContext2D, x: number, y: number, endX: number, endY: number, color = COLORS.border, width = 2) {
  c.beginPath();
  c.moveTo(x, y);
  c.lineTo(endX, endY);
  c.strokeStyle = color;
  c.lineWidth = width;
  c.lineCap = 'round';
  c.lineJoin = 'round';
  c.stroke();
}

function dot(c: CanvasRenderingContext2D, x: number, y: number, radius: number, fill: string) {
  c.beginPath();
  c.arc(x, y, radius, 0, Math.PI * 2);
  c.fillStyle = fill;
  c.fill();
}

function check(c: CanvasRenderingContext2D, x: number, y: number, color = COLORS.secondary) {
  line(c, x - 9, y, x - 2, y + 7, color, 3);
  line(c, x - 2, y + 7, x + 12, y - 9, color, 3);
}

function chevron(c: CanvasRenderingContext2D, x: number, y: number, down = true) {
  line(c, x - 6, y - 3, x, y + 3, COLORS.muted);
  line(c, x, y + 3, down ? x + 6 : x - 6, down ? y - 3 : y + 9, COLORS.muted);
}

function folder(c: CanvasRenderingContext2D, x: number, y: number) {
  c.beginPath();
  c.moveTo(x, y + 6);
  c.lineTo(x, y - 9);
  c.lineTo(x + 12, y - 9);
  c.lineTo(x + 18, y - 3);
  c.lineTo(x + 34, y - 3);
  c.lineTo(x + 34, y + 20);
  c.lineTo(x, y + 20);
  c.closePath();
  c.strokeStyle = COLORS.secondary;
  c.lineWidth = 2;
  c.stroke();
}

function spark(c: CanvasRenderingContext2D, x: number, y: number, size = 20) {
  c.beginPath();
  c.moveTo(x, y - size);
  c.quadraticCurveTo(x + size * 0.16, y - size * 0.15, x + size, y);
  c.quadraticCurveTo(x + size * 0.16, y + size * 0.15, x, y + size);
  c.quadraticCurveTo(x - size * 0.16, y + size * 0.15, x - size, y);
  c.quadraticCurveTo(x - size * 0.16, y - size * 0.15, x, y - size);
  c.fillStyle = COLORS.text;
  c.fill();
}

// A deterministic cadence makes forward and reverse scrolling agree, including
// short pauses at word boundaries and longer pauses between sentences.
function typingSchedule(value: string) {
  let elapsed = 0;
  const schedule = Array.from(value, (character, index) => {
    elapsed += 0.65 + ((index * 13 + 7) % 11) / 12;
    if (character === ' ') elapsed += 0.7;
    if (/[.,]/.test(character)) elapsed += 5;
    return elapsed;
  });
  return (progress: number, start: number, end: number, initial = 0) => {
    const portion = THREE.MathUtils.clamp((progress - start) / (end - start), 0, 1);
    const until = portion * elapsed;
    const index = schedule.findIndex((time) => time > until);
    return value.slice(0, Math.max(initial, index === -1 ? value.length : index));
  };
}

const typePrompt = typingSchedule(PROMPT);
const typeIntro = typingSchedule(INTRO);
const typeResult = typingSchedule(RESULT);

function frameAt(progress: number) {
  return {
    prompt: typePrompt(progress, 0, 0.096, 4),
    submitted: progress >= 0.104,
    intro: progress >= 0.112 ? typeIntro(progress, 0.112, 0.143) : '',
    step: progress < 0.143 ? 0 : progress < 0.159 ? 1 : progress < 0.177 ? 2 : 3,
    result: progress >= 0.179 ? typeResult(progress, 0.179, 0.223) : '',
    complete: progress >= 0.223,
  };
}

function drawApp(target: Surface, progress: number) {
  const c = target.context;
  const frame = frameAt(progress);
  c.fillStyle = COLORS.background;
  c.fillRect(0, 0, WIDTH, HEIGHT);
  c.fillStyle = COLORS.sidebar;
  c.fillRect(0, 0, 390, HEIGHT);

  // Native window chrome, with the application content kept visually quiet.
  ['#e66e67', '#d7ae5a', '#6fa079'].forEach((color, i) => dot(c, 40 + i * 34, 45, 10, color));
  box(c, 326, 31, 31, 27, 4, COLORS.sidebar, COLORS.muted);
  line(c, 337, 32, 337, 57, COLORS.muted);
  label(c, 'Ghana Health AI', 452, 58, 31, COLORS.text, 560);
  chevron(c, 711, 46);
  label(c, 'Open', 2150, 57, 27, COLORS.secondary);
  chevron(c, 2246, 47);
  box(c, 2306, 20, 169, 51, 12, COLORS.background, COLORS.border);
  label(c, 'Share', 2354, 55, 26, COLORS.secondary);
  line(c, 390, 89, WIDTH, 89, '#282828', 1);

  box(c, 23, 124, 343, 63, 11, '#1b1b1b');
  box(c, 48, 145, 26, 26, 4, '#1b1b1b', COLORS.secondary);
  line(c, 61, 154, 77, 138, COLORS.secondary, 2.5);
  label(c, 'New task', 96, 165, 28, COLORS.text);
  label(c, 'Search tasks', 96, 239, 28, COLORS.secondary);
  c.beginPath();
  c.arc(59, 228, 11, 0, Math.PI * 2);
  c.strokeStyle = COLORS.secondary;
  c.lineWidth = 2;
  c.stroke();
  line(c, 68, 237, 78, 247, COLORS.secondary);
  label(c, 'Projects', 40, 356, 24, COLORS.muted, 500);
  folder(c, 44, 406);
  label(c, 'Ghana Health AI', 96, 427, 28, COLORS.text, 500);
  box(c, 25, 456, 341, 64, 10, '#262626');
  dot(c, 58, 488, 5, COLORS.blue);
  label(c, 'Conversation controls', 80, 497, 25, COLORS.text);
  label(c, 'Today', 40, 600, 24, COLORS.muted, 500);
  label(c, 'Review voice playback', 45, 663, 26, COLORS.secondary);
  label(c, 'Restore saved chats', 45, 727, 26, COLORS.secondary);
  line(c, 29, 1487, 361, 1487, '#252525', 1);
  dot(c, 61, 1538, 23, '#303030');
  label(c, 'ET', 45, 1547, 21, COLORS.text, 500);
  label(c, 'Edward Twumasi', 104, 1547, 25, COLORS.secondary);

  label(c, 'Unify home conversation controls', 501, 167, 36, COLORS.text, 560);
  label(c, 'ghana-health-ai', 502, 217, 25, COLORS.muted);
  label(c, '/', 703, 217, 25, '#515151');
  label(c, 'Local', 732, 217, 25, COLORS.muted);
  label(c, 'Implementation study', 2144, 166, 23, COLORS.muted);

  if (!frame.submitted) {
    spark(c, 1467, 636, 37);
    c.textAlign = 'center';
    label(c, 'What should we work on?', 1467, 746, 57, COLORS.text, 500);
    label(c, 'Ghana Health AI', 1467, 810, 31, COLORS.muted);
    c.textAlign = 'left';
  } else {
    box(c, 832, 281, 1556, 220, 31, '#262626');
    paragraph(c, PROMPT, 882, 344, 1444, 36, 54);

    if (progress >= 0.112) {
      spark(c, 542, 570, 20);
      label(c, 'Codex', 582, 581, 30, COLORS.text, 580);
      if (frame.complete) {
        check(c, 2364, 570);
      } else {
        label(c, 'Working', 2253, 580, 25, COLORS.muted);
      }
      paragraph(c, frame.intro, 582, 645, 1690, 35, 51, COLORS.secondary);
      if (progress >= 0.143) {
        const rows = [
          ['Restore saved interpretation', 'src/components/chat-panel.tsx'],
          ['Connect follow-up text and stop playback', 'src/components/voice-panel.tsx'],
          ['Style the home text composer', 'src/app/globals.css'],
        ];
        line(c, 544, 773, 544, 972, '#343434', 2);
        rows.forEach(([title, path], index) => {
          if (index > frame.step - 1) return;
          const y = 783 + index * 89;
          dot(c, 544, y - 6, 15, COLORS.background);
          check(c, 543, y - 5, COLORS.muted);
          label(c, title, 582, y, 30, COLORS.secondary);
          label(c, path, 582, y + 35, 24, COLORS.muted, 400, true);
        });
      }
      if (frame.result) paragraph(c, frame.result, 582, 1090, 1730, 35, 51);
      if (frame.complete) {
        label(c, '3 files changed', 582, 1236, 25, COLORS.secondary);
        label(c, '3973ffd', 819, 1236, 24, COLORS.blue, 400, true);
        label(c, 'fix(chat): unify home conversation controls (#35)', 989, 1236, 25, COLORS.muted);
      }
    }
  }

  const composerY = 1306;
  box(c, 500, composerY, 1887, 211, 29, COLORS.raised, '#454545');
  if (!frame.submitted) {
    const caret = paragraph(c, frame.prompt, 539, composerY + 58, 1784, 34, 49);
    if (frame.prompt.length < PROMPT.length) box(c, caret.x + 3, caret.y - 30, 2, 36, 0, COLORS.text);
  } else {
    label(c, 'Ask for follow-up changes', 539, composerY + 61, 33, COLORS.muted);
  }
  line(c, 543, 1461, 567, 1461, COLORS.secondary, 2.5);
  line(c, 555, 1449, 555, 1473, COLORS.secondary, 2.5);
  label(c, 'GPT-5', 605, 1471, 26, COLORS.secondary, 500);
  chevron(c, 715, 1461);
  label(c, 'Full access', 769, 1471, 25, COLORS.muted);
  chevron(c, 936, 1461);
  dot(c, 2327, 1462, 27, '#ededed');
  if (frame.submitted && !frame.complete) box(c, 2318, 1453, 18, 18, 3, '#292929');
  else {
    line(c, 2327, 1473, 2327, 1450, '#292929', 3);
    line(c, 2317, 1460, 2327, 1450, '#292929', 3);
    line(c, 2327, 1450, 2337, 1460, '#292929', 3);
  }
  label(c, 'Local', 506, 1561, 23, COLORS.muted);
  label(c, 'Ghana Health AI / implementation study', 1796, 1561, 23, COLORS.muted);
  target.texture.needsUpdate = true;
}

function drawScreenshot(target: Surface, image: HTMLImageElement | undefined, loadingLabel: string) {
  const c = target.context;
  c.fillStyle = '#08090a';
  c.fillRect(0, 0, WIDTH, HEIGHT);
  if (image?.complete && image.naturalWidth > 0) {
    const fit = Math.min(WIDTH / image.naturalWidth, HEIGHT / image.naturalHeight);
    const width = image.naturalWidth * fit;
    const height = image.naturalHeight * fit;
    c.imageSmoothingEnabled = true;
    c.imageSmoothingQuality = 'high';
    c.drawImage(image, (WIDTH - width) / 2, (HEIGHT - height) / 2, width, height);
  } else {
    c.textAlign = 'center';
    label(c, loadingLabel, WIDTH / 2, HEIGHT / 2, 38, COLORS.secondary);
    c.textAlign = 'left';
  }
  target.texture.needsUpdate = true;
}

/** Real release/product captures accompany a scroll-driven reconstruction of the task. */
export function createWorkstationTextures(onUpdate?: () => void): WorkstationTextures {
  const ide = surface();
  const release = surface();
  const operations = surface();
  const product = surface();
  const images: HTMLImageElement[] = [];
  let disposed = false;
  let lastProgress = 0;
  let lastFrame = '';
  function load(path: string, target: Surface, title: string) {
    drawScreenshot(target, undefined, title);
    const image = new Image();
    image.onload = () => { if (!disposed) { drawScreenshot(target, image, title); onUpdate?.(); } };
    image.src = path;
    images.push(image);
    return image;
  }

  load('/ghana-health-github-actions.png', release, 'GitHub Actions · Ghana Health AI');
  load('/groundcontrol-deployments.png', operations, 'GroundControl · Deployments');
  load('/ghana-health-live.png', product, 'Ghana Health AI');

  function draw(progress: number) {
    if (disposed) return;
    lastProgress = THREE.MathUtils.clamp(progress, 0, 1);
    const frame = JSON.stringify(frameAt(lastProgress));
    if (frame !== lastFrame) {
      lastFrame = frame;
      drawApp(ide, lastProgress);
    }
  }

  draw(0);
  return {
    ide: ide.texture,
    release: release.texture,
    operations: operations.texture,
    product: product.texture,
    draw,
    dispose() {
      disposed = true;
      images.forEach((image) => { image.onload = null; });
      [ide, release, operations, product].forEach(({ texture }) => texture.dispose());
    },
  };
}

type ScreenName = 'ide' | 'release' | 'operations' | 'product';

/** Long holds and reversible workspace handoffs on one physical display. */
export function screenTransition(progress: number): { from: ScreenName; to: ScreenName; amount: number } {
  const transitions: [number, number, ScreenName, ScreenName][] = [
    [.34, .44, 'ide', 'release'],
    [.58, .72, 'release', 'operations'],
    [.84, .94, 'operations', 'product'],
  ];
  let current: ScreenName = 'ide';
  for (const [start, end, from, to] of transitions) {
    if (progress < start) return { from: current, to: current, amount: 0 };
    if (progress <= end) {
      const t = THREE.MathUtils.clamp((progress - start) / (end - start), 0, 1);
      return { from, to, amount: t * t * (3 - 2 * t) };
    }
    current = to;
  }
  return { from: current, to: current, amount: 0 };
}

export function createWorkstationScreen(onUpdate?: () => void) {
  const textures = createWorkstationTextures(onUpdate);
  const combined = surface();
  combined.context.drawImage(textures.ide.image as HTMLCanvasElement, 0, 0);
  combined.texture.needsUpdate = true;
  let sourceVersion = '';
  return {
    texture: combined.texture,
    draw(progress: number) {
      textures.draw(progress);
      const { from, to, amount } = screenTransition(progress);
      const outgoing = textures[from];
      const incoming = textures[to];
      const shift = Math.round(amount * WIDTH);
      const version = `${from}:${outgoing.version}:${to}:${incoming.version}:${shift}`;
      if (version === sourceVersion) return;
      sourceVersion = version;
      combined.context.fillStyle = '#101113';
      combined.context.fillRect(0, 0, WIDTH, HEIGHT);
      combined.context.drawImage(outgoing.image as HTMLCanvasElement, -shift, 0);
      if (from !== to) combined.context.drawImage(incoming.image as HTMLCanvasElement, WIDTH - shift, 0);
      combined.texture.needsUpdate = true;
    },
    dispose() {
      textures.dispose();
      combined.texture.dispose();
    },
  };
}
