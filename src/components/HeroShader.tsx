import { useRef, useEffect } from 'react';

const VERT = `
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAG = `
precision highp float;
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

#define PI 3.14159265359
#define NODES 4

// ── Simplex noise ──
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                     -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
    + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
    dot(x12.zw,x12.zw)), 0.0);
  m = m*m; m = m*m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  vec2 shift = vec2(100.0);
  mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.50));
  for (int i = 0; i < 5; i++) {
    v += a * snoise(p);
    p = rot * p * 2.0 + shift;
    a *= 0.5;
  }
  return v;
}

// ── Node positions along an arc ──
vec2 nodePos(int idx) {
  float t = float(idx) / float(NODES - 1);
  float x = (t - 0.5) * 1.5;
  float y = sin(t * PI) * 0.12 - 0.08;
  return vec2(x, y);
}

// ── Soft organic node ──
float organicNode(vec2 uv, vec2 center, float t, float idx) {
  float d = length(uv - center);
  // Organic shape distortion
  float angle = atan(uv.y - center.y, uv.x - center.x);
  float organic = 1.0 + 0.15 * sin(angle * 3.0 + t * 0.8 + idx);
  d *= organic;
  
  float breathe = 0.5 + 0.5 * sin(t * 1.2 + idx * 1.7);
  float core = smoothstep(0.055, 0.025, d) * (0.7 + 0.3 * breathe);
  float halo = smoothstep(0.18, 0.06, d) * 0.08 * (0.6 + 0.4 * breathe);
  float outer = smoothstep(0.35, 0.15, d) * 0.02;
  return core + halo + outer;
}

// ── Flowing connection with light packets ──
float flowingConnection(vec2 uv, vec2 a, vec2 b, float t) {
  vec2 ab = b - a;
  float len = length(ab);
  vec2 dir = ab / len;
  vec2 pa = uv - a;
  float proj = clamp(dot(pa, dir), 0.0, len);
  vec2 closest = a + dir * proj;
  float d = length(uv - closest);
  
  // Organic curve offset
  vec2 perp = vec2(-dir.y, dir.x);
  float curve = sin(proj * 2.5 + t * 0.5) * 0.015;
  float dCurve = abs(dot(uv - closest, perp) - curve);
  d = mix(d, dCurve, 0.3);
  
  // Base line
  float base = smoothstep(0.008, 0.003, d) * 0.12;
  
  // Traveling light packets
  float pkt = 0.0;
  for (int i = 0; i < 3; i++) {
    float fi = float(i);
    float speed = 0.25 + fi * 0.08;
    float pos = fract(t * speed + fi * 0.33) * len;
    vec2 p = a + dir * pos;
    float pd = length(uv - p);
    float glow = smoothstep(0.04, 0.015, pd) * 0.4;
    float bright = smoothstep(0.015, 0.005, pd) * 0.8;
    pkt += glow + bright;
  }
  
  return base + pkt;
}

// ── Mouse distortion ripple ──
float mouseRipple(vec2 uv, vec2 mouse, float t) {
  float md = length(uv - mouse);
  float ripple1 = sin(md * 18.0 - t * 3.5) * exp(-md * 3.5) * 0.015;
  float ripple2 = sin(md * 12.0 - t * 2.0 + 1.0) * exp(-md * 2.0) * 0.008;
  return ripple1 + ripple2;
}

void main() {
  vec2 uv = (gl_FragCoord.xy - u_resolution * 0.5) / u_resolution.y;
  float t = u_time;
  
  // ── Cinematic warm background ──
  vec2 bgUV = uv * 0.8;
  float n1 = fbm(bgUV + t * 0.03) * 0.012;
  float n2 = fbm(bgUV * 2.0 - t * 0.02) * 0.006;
  float n3 = snoise(uv * 1.5 + t * 0.04) * 0.004;
  
  // Warm cream base with subtle blue shift
  vec3 baseCol = vec3(0.985, 0.982, 0.978);
  vec3 col = baseCol + vec3(n1 * 0.5, n1 * 0.6, n1 * 0.9 + n2);
  
  // ── Mouse interaction ──
  vec2 mouseUV = (u_mouse - u_resolution * 0.5) / u_resolution.y;
  float mouseDist = length(uv - mouseUV);
  
  // Subtle cursor glow
  float cursorGlow = smoothstep(0.4, 0.0, mouseDist) * 0.015;
  col += vec3(0.357, 0.427, 0.961) * cursorGlow;
  
  // Ripple distortion applied to UV for subsequent effects
  float ripple = mouseRipple(uv, mouseUV, t);
  vec2 distortUV = uv + vec2(ripple) * 0.5;
  
  // ── Flowing ambient orbs ──
  for (int i = 0; i < 3; i++) {
    float fi = float(i);
    vec2 orbCenter = vec2(
      sin(t * 0.15 + fi * 2.1) * 0.6,
      cos(t * 0.12 + fi * 1.3) * 0.25
    );
    float od = length(distortUV - orbCenter);
    float orb = smoothstep(0.5, 0.0, od) * 0.008;
    col += vec3(0.42, 0.48, 0.95) * orb;
  }
  
  // ── Stage nodes (data pipeline) ──
  vec3 nodeColors[NODES];
  nodeColors[0] = vec3(0.37, 0.43, 0.96); // Backend — deep indigo
  nodeColors[1] = vec3(0.45, 0.52, 0.98); // Data — lighter indigo
  nodeColors[2] = vec3(0.55, 0.48, 0.95); // Infra — purple
  nodeColors[3] = vec3(0.65, 0.42, 0.90); // AI — violet
  
  for (int i = 0; i < NODES; i++) {
    vec2 p = nodePos(i);
    float n = organicNode(distortUV, p, t, float(i));
    col += nodeColors[i] * n;
  }
  
  // ── Connections ──
  for (int i = 0; i < NODES - 1; i++) {
    vec2 a = nodePos(i);
    vec2 b = nodePos(i + 1);
    float line = flowingConnection(distortUV, a, b, t);
    vec3 lineCol = mix(nodeColors[i], nodeColors[i + 1], 0.5);
    col += lineCol * line;
  }
  
  // ── Film grain ──
  float grain = snoise(gl_FragCoord.xy * 0.5 + t * 100.0) * 0.008;
  col += vec3(grain);
  
  // ── Cinematic vignette ──
  float vig = 1.0 - smoothstep(0.3, 1.4, length(uv * vec2(0.9, 1.0))) * 0.25;
  col *= vig;
  
  // Tone mapping — soft clamp for cinematic look
  col = col / (1.0 + col * 0.1);
  
  gl_FragColor = vec4(col, 1.0);
}
`;

export default function HeroShader() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', { alpha: false, antialias: false });
    if (!gl) return;

    const compile = (type: number, source: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, source);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.error('Shader compile error:', gl.getShaderInfoLog(s));
      }
      return s;
    };

    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const pos = gl.getAttribLocation(prog, 'position');
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(prog, 'u_time');
    const uRes = gl.getUniformLocation(prog, 'u_resolution');
    const uMouse = gl.getUniformLocation(prog, 'u_mouse');

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 1.5);
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener('resize', resize);

    const onMouse = (e: MouseEvent) => {
      const dpr = Math.min(window.devicePixelRatio, 1.5);
      mouseRef.current.x = e.clientX * dpr;
      mouseRef.current.y = (canvas.clientHeight - e.clientY) * dpr;
    };
    window.addEventListener('mousemove', onMouse);

    let start = performance.now();
    let visible = true;

    const observer = new IntersectionObserver(
      ([entry]) => { visible = entry.isIntersecting; },
      { threshold: 0.01 }
    );
    observer.observe(canvas);

    const render = () => {
      if (visible) {
        const elapsed = (performance.now() - start) / 1000;
        gl.uniform1f(uTime, elapsed);
        gl.uniform2f(uRes, canvas.width, canvas.height);
        gl.uniform2f(uMouse, mouseRef.current.x, mouseRef.current.y);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      }
      rafRef.current = requestAnimationFrame(render);
    };
    rafRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouse);
      observer.disconnect();
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
        zIndex: 0,
      }}
    />
  );
}
