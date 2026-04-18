import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const PARTICLE_COUNT = typeof window !== 'undefined' && window.innerWidth < 640 ? 80 : 200;
const CONNECTION_DISTANCE = 0.8;
const MAX_CONNECTIONS = 3;
const MOUSE_LERP = 0.03;
const MOUSE_MAX_OFFSET = 0.15;

interface ParticleData {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  rotationSpeed: THREE.Vector3;
  baseOpacity: number;
  scale: number;
}

function Particles() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const lineRef = useRef<THREE.LineSegments>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const { camera } = useThree();

  const particleData = useMemo<ParticleData[]>(() => {
    const data: ParticleData[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      data.push({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 12,
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 6
        ),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.006,
          (Math.random() - 0.5) * 0.006,
          (Math.random() - 0.5) * 0.004
        ),
        rotationSpeed: new THREE.Vector3(
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02
        ),
        baseOpacity: 0.15 + Math.random() * 0.3,
        scale: 0.03 + Math.random() * 0.05,
      });
    }
    return data;
  }, []);

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const geometry = useMemo(() => new THREE.IcosahedronGeometry(1, 0), []);

  // Line geometry for connections
  const lineGeometry = useMemo(() => new THREE.BufferGeometry(), []);
  const lineMaterial = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color: new THREE.Color('#4f5dff'),
        transparent: true,
        opacity: 0.08,
      }),
    []
  );

  const maxLines = PARTICLE_COUNT * MAX_CONNECTIONS;
  const linePositions = useMemo(
    () => new Float32Array(maxLines * 6),
    [maxLines]
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame(() => {
    if (!meshRef.current) return;

    // Mouse camera parallax
    const mouse = mouseRef.current;
    mouse.x += (mouse.targetX * MOUSE_MAX_OFFSET - mouse.x) * MOUSE_LERP;
    mouse.y += (mouse.targetY * MOUSE_MAX_OFFSET - mouse.y) * MOUSE_LERP;
    camera.position.x = mouse.x;
    camera.position.y = -mouse.y;
    camera.lookAt(0, 0, 0);

    // Update particles
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
    let lineIdx = 0;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const p = particleData[i];

      // Drift
      p.position.add(p.velocity);

      // Wrap around
      if (p.position.x > 6) p.position.x = -6;
      if (p.position.x < -6) p.position.x = 6;
      if (p.position.y > 4) p.position.y = -4;
      if (p.position.y < -4) p.position.y = 4;
      if (p.position.z > 3) p.position.z = -3;
      if (p.position.z < -3) p.position.z = 3;

      dummy.position.copy(p.position);
      dummy.rotation.x += p.rotationSpeed.x;
      dummy.rotation.y += p.rotationSpeed.y;
      dummy.scale.setScalar(p.scale);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;

    // Update connections
    if (!isMobile && lineRef.current) {
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        let connections = 0;
        for (let j = i + 1; j < PARTICLE_COUNT; j++) {
          if (connections >= MAX_CONNECTIONS) break;
          const dist = particleData[i].position.distanceTo(particleData[j].position);
          if (dist < CONNECTION_DISTANCE) {
            const idx = lineIdx * 6;
            linePositions[idx] = particleData[i].position.x;
            linePositions[idx + 1] = particleData[i].position.y;
            linePositions[idx + 2] = particleData[i].position.z;
            linePositions[idx + 3] = particleData[j].position.x;
            linePositions[idx + 4] = particleData[j].position.y;
            linePositions[idx + 5] = particleData[j].position.z;
            lineIdx++;
            connections++;
          }
        }
      }

      // Hide unused lines by collapsing them
      for (let k = lineIdx; k < maxLines; k++) {
        const idx = k * 6;
        linePositions[idx] = 0;
        linePositions[idx + 1] = 0;
        linePositions[idx + 2] = 0;
        linePositions[idx + 3] = 0;
        linePositions[idx + 4] = 0;
        linePositions[idx + 5] = 0;
      }

      lineGeometry.setAttribute(
        'position',
        new THREE.BufferAttribute(linePositions, 3)
      );
      lineGeometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <>
      <instancedMesh ref={meshRef} args={[geometry, undefined, PARTICLE_COUNT]}>
        <meshBasicMaterial
          color="#4f5dff"
          transparent
          opacity={0.4}
          depthWrite={false}
        />
      </instancedMesh>
      {!((typeof window !== 'undefined' && window.innerWidth < 640)) && (
        <lineSegments ref={lineRef as any} geometry={lineGeometry} material={lineMaterial} />
      )}
      <fog attach="fog" args={['#000000', 4, 12]} />
    </>
  );
}

export default function ParticleField() {
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
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60, near: 0.1, far: 20 }}
        gl={{ antialias: false, alpha: false }}
        onCreated={({ gl }) => {
          gl.setClearColor('#000000');
        }}
      >
        <Particles />
      </Canvas>
    </div>
  );
}
