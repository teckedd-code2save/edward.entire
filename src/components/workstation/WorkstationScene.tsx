import { useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { ContactShadows } from '@react-three/drei';
import { type MotionValue } from 'framer-motion';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import WorkstationHardware from './WorkstationHardware';
import { createWorkstationScreen } from './screenTexture';

type Point = [number, number, number];
type Keyframe = [number, Point];
const smooth = (v: number) => { const t = THREE.MathUtils.clamp(v, 0, 1); return t * t * (3 - 2 * t); };
const phase = (p: number, a: number, b: number) => smooth((p - a) / (b - a));

const cameraTrack: Keyframe[] = [
  [0, [2.4, 6.8, 9.6]], [.18, [1.2, 6.4, 9.1]],
  [.30, [3.2, 7.0, 9.8]], [.44, [.4, 6.3, 8.8]],
  [.58, [.4, 6.3, 8.8]], [.72, [-2.1, 6.7, 9.5]],
  [.84, [-.6, 6.3, 9.0]], [.94, [1.0, 6.2, 8.5]], [1, [1.0, 6.2, 8.5]],
];
const targetTrack: Keyframe[] = [
  [0, [0, 2.75, -3.8]], [.18, [0, 2.85, -4.0]],
  [.44, [0, 2.85, -4.0]], [.72, [0, 2.85, -4.0]], [1, [0, 2.85, -4.0]],
];

function sample(p: number, keys: Keyframe[], out: THREE.Vector3) {
  let index = 0;
  while (index < keys.length - 2 && p > keys[index + 1][0]) index++;
  const [a, from] = keys[index];
  const [b, to] = keys[index + 1];
  const t = phase(p, a, b);
  out.set(THREE.MathUtils.lerp(from[0], to[0], t), THREE.MathUtils.lerp(from[1], to[1], t), THREE.MathUtils.lerp(from[2], to[2], t));
}

function StudioEnvironment() {
  const { gl } = useThree();
  const map = useMemo(() => {
    const generator = new THREE.PMREMGenerator(gl);
    const room = new RoomEnvironment();
    const result = generator.fromScene(room, .04);
    room.dispose();
    generator.dispose();
    return result;
  }, [gl]);
  useEffect(() => () => map.dispose(), [map]);
  return <primitive object={map.texture} attach="environment" />;
}

function Scene({ progress }: { progress: MotionValue<number> }) {
  const { camera, size, gl, invalidate } = useThree();
  const target = useMemo(() => new THREE.Vector3(), []);
  const eye = useMemo(() => new THREE.Vector3(), []);
  const screen = useMemo(() => {
    const surface = createWorkstationScreen(invalidate);
    surface.texture.anisotropy = Math.min(16, gl.capabilities.getMaxAnisotropy());
    return surface;
  }, [gl, invalidate]);

  useEffect(() => progress.on('change', () => invalidate()), [progress, invalidate]);

  useEffect(() => () => screen.dispose(), [screen]);

  useFrame(() => {
    const p = progress.get();
    screen.draw(p);
    sample(p, cameraTrack, eye);
    sample(p, targetTrack, target);
    const framing = Math.max(1, 1.4 / (size.width / size.height));
    eye.sub(target).multiplyScalar(framing).add(target);
    camera.position.copy(eye);
    camera.lookAt(target);

  });

  return <>
    <StudioEnvironment />
    <ambientLight intensity={.45} />
    <directionalLight position={[-5, 12, 7]} intensity={3.0} color="#fff9f0" />
    <directionalLight position={[8, 5, -5]} intensity={2.4} color="#e7efff" />
    <rectAreaLight position={[-8, 8, 3]} rotation={[-Math.PI / 4, -Math.PI / 4, 0]} width={8} height={12} intensity={5} color="#ffffff" />
    <group position={[0, .42, 0]}><WorkstationHardware progress={progress} screenTexture={screen.texture} /></group>
    <ContactShadows position={[0, -.06, 0]} opacity={.38} scale={55} blur={2.6} far={18} resolution={1024} color="#575963" />
  </>;
}

export default function WorkstationScene({ progress }: { progress: MotionValue<number>; product: boolean }) {
  return <Canvas frameloop="demand" camera={{ position: [2.4, 6.8, 9.6], fov: 35, near: .1, far: 120 }} dpr={[1, 2]} gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }} onCreated={({ gl }) => { gl.setClearColor('#ebeae7', 0); gl.toneMapping = THREE.ACESFilmicToneMapping; gl.toneMappingExposure = 1.05; }}>
    <Scene progress={progress} />
  </Canvas>;
}
