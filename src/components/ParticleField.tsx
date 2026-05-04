import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const vertexShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uMouseActive;
  varying float vElevation;
  varying vec2 vUv;
  varying vec3 vViewPosition;
  varying vec3 vWorldPosition;

  // Simplex noise helper
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
             -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
      + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m;
    m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vec3 pos = position;
    float dist = length(pos.xy);
    float t = uTime;

    // Primary propagating ripple from center - clear outward motion
    float wave1 = sin(dist * 12.0 - t * 3.0);
    
    // Faster secondary harmonic for surface detail
    float wave2 = sin(dist * 24.0 - t * 4.5) * 0.3;
    
    // Slow, broad undulation for depth
    float wave3 = sin(dist * 6.0 - t * 1.5) * 0.35;
    
    // Cross-wave interference for realism
    float crossWave = sin(pos.x * 8.0 + t * 0.8) * cos(pos.y * 8.0 + t * 0.6) * 0.08;
    
    // Surface noise for micro-detail
    float noise = snoise(pos.xy * 3.0 + t * 0.2) * 0.04;

    // Mouse interaction ripple
    float mouseDist = length(pos.xy - uMouse);
    float mouseWave = sin(mouseDist * 20.0 - t * 6.0) * exp(-mouseDist * 2.5) * uMouseActive * 0.4;
    float mouseWave2 = sin(mouseDist * 35.0 - t * 8.0) * exp(-mouseDist * 4.0) * uMouseActive * 0.15;

    // Decay - stronger near center, fades toward edges
    float decay = exp(-dist * 0.6) * 0.55 + 0.45;
    decay *= smoothstep(5.0, 1.2, dist);

    float elevation = (wave1 + wave2 + wave3 + crossWave + noise) * decay * 0.4 + mouseWave + mouseWave2;
    pos.z += elevation;

    vElevation = elevation;
    vUv = uv;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    vViewPosition = -mvPosition.xyz;
    vWorldPosition = (modelMatrix * vec4(pos, 1.0)).xyz;
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = `
  uniform float uTime;
  varying float vElevation;
  varying vec2 vUv;
  varying vec3 vViewPosition;
  varying vec3 vWorldPosition;

  void main() {
    // Compute normal from elevation derivatives for realistic 3D lighting
    vec3 normal = normalize(vec3(
      -dFdx(vElevation) * 25.0,
      -dFdy(vElevation) * 25.0,
      1.0
    ));

    // Multiple light sources for water realism
    vec3 lightDir1 = normalize(vec3(0.5, -0.4, 1.0));
    vec3 lightDir2 = normalize(vec3(-0.3, 0.2, 0.8));
    
    float diffuse1 = max(dot(normal, lightDir1), 0.0);
    float diffuse2 = max(dot(normal, lightDir2), 0.0) * 0.4;
    float diffuse = diffuse1 + diffuse2;

    // Ambient base - deep water
    float ambient = 0.2;

    // Specular - sharp highlights on wave crests (Blinn-Phong)
    vec3 viewDir = normalize(vViewPosition);
    vec3 halfDir1 = normalize(lightDir1 + viewDir);
    vec3 halfDir2 = normalize(lightDir2 + viewDir);
    float spec1 = pow(max(dot(normal, halfDir1), 0.0), 64.0) * 0.7;
    float spec2 = pow(max(dot(normal, halfDir2), 0.0), 32.0) * 0.3;
    float spec = spec1 + spec2;

    // Brand palette — mauve abyss climbing to orange crests
    vec3 abyssColor   = vec3(0.008, 0.004, 0.014);
    vec3 deepColor    = vec3(0.022, 0.010, 0.030);
    vec3 midColor     = vec3(0.055, 0.022, 0.075);
    vec3 surfaceColor = vec3(0.110, 0.045, 0.135);
    vec3 crestColor   = vec3(0.260, 0.090, 0.130);
    vec3 specColor    = vec3(0.620, 0.220, 0.060);
    vec3 foamColor    = vec3(0.900, 0.380, 0.070);

    // Mix colors based on elevation for visible wave propagation
    vec3 color = abyssColor;
    color = mix(color, deepColor, smoothstep(-0.3, -0.1, vElevation));
    color = mix(color, midColor, smoothstep(-0.15, 0.0, vElevation));
    color = mix(color, surfaceColor, smoothstep(-0.05, 0.1, vElevation));
    color = mix(color, crestColor, smoothstep(0.05, 0.18, vElevation));
    
    // Foam on highest crests
    float foam = smoothstep(0.15, 0.28, vElevation);
    color = mix(color, foamColor, foam * 0.35);

    // Apply lighting - subdued
    color = color * (ambient + diffuse * 0.55);

    // Add specular shine on crests - dimmed
    color += specColor * spec * 0.6;

    // Extra sparkle on very high crests - orange burn
    float sparkle = pow(spec, 3.0) * smoothstep(0.1, 0.25, vElevation) * 0.35;
    color += vec3(1.00, 0.45, 0.10) * sparkle;

    // Fresnel / rim — mauve glow at grazing angles
    float fresnel = pow(1.0 - abs(normal.z), 3.0);
    color += vec3(0.18, 0.06, 0.20) * fresnel;

    // Mauve caustic shimmer
    float caustic = sin(vWorldPosition.x * 15.0 + uTime * 1.5) * sin(vWorldPosition.y * 15.0 - uTime * 1.2);
    caustic = pow(max(0.0, caustic), 4.0) * 0.015;
    color += vec3(0.18, 0.06, 0.22) * caustic;

    // Vignette - darken edges
    float d = length(vUv - 0.5) * 2.0;
    color *= 1.0 - smoothstep(0.4, 1.0, d);

    gl_FragColor = vec4(color, 1.0);
  }
`;

export default function ParticleField() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene
    const scene = new THREE.Scene();

    // Camera - angled to see the 3D depth
    const camera = new THREE.PerspectiveCamera(
      50,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, -1.8, 2.8);
    camera.lookAt(0, 0, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // High-res plane for smooth ripples
    const geometry = new THREE.PlaneGeometry(8, 8, 350, 350);

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(999, 999) },
        uMouseActive: { value: 0 },
      },
      side: THREE.DoubleSide,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Mouse tracking
    const mouse = new THREE.Vector2(999, 999);
    let mouseActive = 0;
    let mouseTimeout: ReturnType<typeof setTimeout>;

    const handlePointerMove = (event: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      // Project mouse to world space on the plane
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(new THREE.Vector2(x, y), camera);
      const intersects = raycaster.intersectObject(mesh);

      if (intersects.length > 0) {
        const point = intersects[0].point;
        mouse.set(point.x, point.y);
        mouseActive = 1;

        clearTimeout(mouseTimeout);
        mouseTimeout = setTimeout(() => {
          mouseActive = 0;
        }, 800);
      }
    };

    container.addEventListener('pointermove', handlePointerMove, { passive: true });

    // Animation loop
    let animationId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsed = clock.getElapsedTime();
      material.uniforms.uTime.value = elapsed;
      material.uniforms.uMouse.value.copy(mouse);
      material.uniforms.uMouseActive.value += (mouseActive - material.uniforms.uMouseActive.value) * 0.08;

      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };

    animate();

    // Resize handler
    const handleResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      clearTimeout(mouseTimeout);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('pointermove', handlePointerMove);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 1,
        background: '#000000',
      }}
    />
  );
}
