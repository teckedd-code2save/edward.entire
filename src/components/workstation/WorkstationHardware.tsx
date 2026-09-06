import { useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import type { MotionValue } from 'framer-motion';
import {
  BufferGeometry, CanvasTexture, CatmullRomCurve3, DoubleSide, ExtrudeGeometry,
  Float32BufferAttribute, Group, InstancedMesh, MeshBasicMaterial,
  MeshPhysicalMaterial, MeshStandardMaterial, Object3D, Path, Shape,
  SRGBColorSpace, TubeGeometry, Vector3,
} from 'three';
import type { Material, Texture } from 'three';

export const SCREEN_WIDTH = 9.9;
export const SCREEN_HEIGHT = 6.05;
const HINGE_POSITION: [number, number, number] = [0, 0.2, -3.25];
const SCREEN_POSITION: [number, number, number] = [0, 3.26, 0.153];

type HardwareProps = { progress: MotionValue<number>; screenTexture: Texture; compact?: boolean };
type Point = [number, number, number];
type Instance = { position: Point; scale?: Point; rotation?: Point };

const HALF_PI = Math.PI / 2;
const KEYBOARD_WIDTH = 8.352;
const KEYBOARD_DEPTH = 3.45;
const KEYBOARD_Z = -1.225;

function roundedPath(width: number, height: number, radius: number) {
  const path = new Shape();
  const x = -width / 2;
  const y = -height / 2;
  const r = Math.min(radius, width / 2, height / 2);
  path.moveTo(x + r, y);
  path.lineTo(x + width - r, y);
  path.quadraticCurveTo(x + width, y, x + width, y + r);
  path.lineTo(x + width, y + height - r);
  path.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
  path.lineTo(x + r, y + height);
  path.quadraticCurveTo(x, y + height, x, y + height - r);
  path.lineTo(x, y + r);
  path.quadraticCurveTo(x, y, x + r, y);
  path.closePath();
  return path;
}

function plateGeometry(width: number, height: number, depth: number, radius: number, rim = 0) {
  const bevel = Math.min(0.022, depth * 0.22, rim > 0 ? rim * 0.2 : Infinity);
  const shape = roundedPath(width - bevel * 2, height - bevel * 2, Math.max(0.01, radius - bevel));
  if (rim > 0) {
    const inner = roundedPath(width - rim * 2 + bevel * 2, height - rim * 2 + bevel * 2, Math.max(0.025, radius - rim + bevel));
    shape.holes.push(new Path(inner.getPoints(12).reverse()));
  }
  const geometry = new ExtrudeGeometry(shape, {
    depth: depth - bevel * 2, bevelEnabled: true, bevelSize: bevel,
    bevelThickness: bevel, bevelSegments: 2, curveSegments: 8, steps: 1,
  });
  geometry.translate(0, 0, -depth / 2 + bevel);
  return geometry;
}

function Plate({ size, position, material, radius = 0.12, rim = 0, flat = false }: {
  size: Point; position: Point; material: Material; radius?: number; rim?: number; flat?: boolean;
}) {
  const [width, height, depth] = size;
  const geometry = useMemo(() => plateGeometry(width, height, depth, radius, rim), [width, height, depth, radius, rim]);
  useEffect(() => () => geometry.dispose(), [geometry]);
  return <mesh geometry={geometry} material={material} position={position} rotation={flat ? [-HALF_PI, 0, 0] : undefined} castShadow receiveShadow />;
}

function Instances({ geometry, material, items }: { geometry: BufferGeometry; material: Material; items: Instance[] }) {
  const ref = useRef<InstancedMesh>(null);
  useLayoutEffect(() => {
    if (!ref.current) return;
    const object = new Object3D();
    items.forEach(({ position, scale = [1, 1, 1], rotation = [0, 0, 0] }, index) => {
      object.position.set(...position);
      object.scale.set(...scale);
      object.rotation.set(...rotation);
      object.updateMatrix();
      ref.current!.setMatrixAt(index, object.matrix);
    });
    ref.current.instanceMatrix.needsUpdate = true;
    ref.current.computeBoundingSphere();
  }, [items]);
  return <instancedMesh ref={ref} args={[geometry, material, items.length]} castShadow receiveShadow />;
}

type Key = { label: string; x: number; z: number; width: number; depth: number };

function keyboardLayout() {
  const keys: Key[] = [];
  const unit = 0.576;
  const row = (labels: (string | [string, number])[], z: number, depth = 0.462) => {
    let cursor = -KEYBOARD_WIDTH / 2;
    labels.forEach((entry) => {
      const [label, units] = typeof entry === 'string' ? [entry, 1] : entry;
      const width = units * unit;
      keys.push({ label, x: cursor + width / 2, z, width: width - 0.046, depth });
      cursor += width;
    });
  };
  row([['esc', 1.5], 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12', '◉'], -2.77, 0.275);
  row(['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '−', '=', ['delete', 1.5]], -2.286);
  row([['tab', 1.35], 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', ['\\', 1.15]], -1.746);
  row([['caps lock', 1.6], 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', "'", ['return', 1.9]], -1.206);
  row([['shift', 2.05], 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/', ['shift', 2.45]], -0.666);
  row(['fn', 'control', 'option', ['⌘', 1.3], ['', 5.1], ['⌘', 1.3], 'option', ['←', 0.9], ['↑', 0.9], ['→', 1]], -0.126);
  const up = keys.find((key) => key.label === '↑')!;
  up.depth = 0.211;
  up.z -= 0.125;
  keys.push({ ...up, label: '↓', z: up.z + 0.25 });
  return keys;
}

function keyboardTexture(keys: Key[]) {
  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 1024;
  const context = canvas.getContext('2d');
  if (context) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = '#d0d5d7';
    context.textBaseline = 'middle';
    context.textAlign = 'center';
    keys.forEach((key) => {
      const x = ((key.x + KEYBOARD_WIDTH / 2) / KEYBOARD_WIDTH) * canvas.width;
      const y = ((key.z - KEYBOARD_Z + KEYBOARD_DEPTH / 2) / KEYBOARD_DEPTH) * canvas.height;
      const size = key.label.length > 2 ? 23 : /^F\d+$/.test(key.label) ? 26 : 39;
      context.font = `500 ${size}px -apple-system, BlinkMacSystemFont, "Helvetica Neue", sans-serif`;
      context.fillText(key.label, x, y);
      if (key.label === 'F' || key.label === 'J') {
        context.fillStyle = '#73787b';
        context.fillRect(x - 8, y + 36, 16, 2);
        context.fillStyle = '#d0d5d7';
      }
    });
  }
  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  texture.anisotropy = 8;
  return texture;
}

function engineeringTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1536;
  canvas.height = 512;
  const context = canvas.getContext('2d');
  if (context) {
    context.fillStyle = '#14191a';
    context.fillRect(0, 0, 1536, 512);
    context.fillStyle = '#798286';
    context.font = '500 23px ui-monospace, monospace';
    context.fillText('EDWARD / MOBILE WORKSTATION', 64, 88);
    context.font = '17px ui-monospace, monospace';
    context.fillText('RECHARGEABLE LITHIUM POLYMER BATTERY', 64, 142);
    context.fillText('11.4V       7,020mAh       80.0Wh', 64, 182);
    context.fillStyle = '#576165';
    context.fillText('ENGINEERED FOR WHAT COMES NEXT.', 64, 294);
    context.fillText('DESIGNED IN ACCRA     /     REV. 2026.09', 64, 336);
    context.strokeStyle = '#647074';
    context.lineWidth = 2;
    context.strokeRect(1270, 62, 178, 54);
    context.font = '23px ui-monospace, monospace';
    context.fillText('80.0 Wh', 1299, 98);
    for (let i = 0; i < 70; i++) {
      const width = i % 3 === 0 ? 5 : 2;
      context.fillRect(1110 + i * 4.6, 294, width, 58);
    }
    context.font = '14px ui-monospace, monospace';
    context.fillText('ET-WKS-2609-001', 1136, 376);
  }
  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  texture.anisotropy = 8;
  return texture;
}

function useHardwareMaterials() {
  const materials = useMemo(() => ({
    shell: new MeshStandardMaterial({ color: '#a9afb1', metalness: 0.84, roughness: 0.32 }),
    deck: new MeshStandardMaterial({ color: '#b3b9bc', metalness: 0.8, roughness: 0.35 }),
    bevel: new MeshStandardMaterial({ color: '#cbd2d5', metalness: 0.96, roughness: 0.2 }),
    graphite: new MeshStandardMaterial({ color: '#202426', metalness: 0.5, roughness: 0.38 }),
    gasket: new MeshStandardMaterial({ color: '#080b0c', metalness: 0.15, roughness: 0.64 }),
    key: new MeshStandardMaterial({ color: '#151a1d', metalness: 0.22, roughness: 0.42 }),
    hole: new MeshBasicMaterial({ color: '#242b2e' }),
    pcb: new MeshStandardMaterial({ color: '#182323', metalness: 0.45, roughness: 0.53 }),
    chip: new MeshStandardMaterial({ color: '#252c2e', metalness: 0.5, roughness: 0.4 }),
    copper: new MeshStandardMaterial({ color: '#826044', metalness: 0.88, roughness: 0.32 }),
    fan: new MeshStandardMaterial({ color: '#42494c', metalness: 0.78, roughness: 0.32 }),
    glass: new MeshPhysicalMaterial({ color: '#111518', metalness: 0.18, roughness: 0.18, clearcoat: 1, clearcoatRoughness: 0.12 }),
    camera: new MeshPhysicalMaterial({ color: '#112025', metalness: 0.65, roughness: 0.1, clearcoat: 1 }),
  }), []);
  useEffect(() => () => Object.values(materials).forEach((material) => material.dispose()), [materials]);
  return materials;
}

type Materials = ReturnType<typeof useHardwareMaterials>;

function Keyboard({ materials }: { materials: Materials }) {
  const keys = useMemo(() => keyboardLayout(), []);
  const texture = useMemo(() => keyboardTexture(keys), [keys]);
  const geometry = useMemo(() => {
    const result = plateGeometry(1, 1, 0.066, 0.105);
    result.rotateX(-HALF_PI);
    return result;
  }, []);
  const keyInstances = useMemo(() => keys.map((key) => ({
    position: [key.x, 0.285, key.z] as Point, scale: [key.width, 1, key.depth] as Point,
  })), [keys]);
  const holes = useMemo(() => {
    const points: Instance[] = [];
    for (const side of [-1, 1]) {
      for (let column = 0; column < 7; column++) {
        for (let row = 0; row < 44; row++) {
          points.push({ position: [side * (4.55 + column * 0.075), 0.243, -2.79 + row * 0.071], scale: [0.025, 0.025, 0.006], rotation: [-HALF_PI, 0, 0] });
        }
      }
    }
    return points;
  }, []);
  const holeGeometry = useMemo(() => plateGeometry(1, 1, 1, 0.48), []);
  useEffect(() => () => { texture.dispose(); geometry.dispose(); holeGeometry.dispose(); }, [texture, geometry, holeGeometry]);
  return <>
    <Plate size={[8.57, 3.46, 0.018]} position={[0, 0.236, -1.285]} material={materials.gasket} radius={0.13} flat />
    <Instances geometry={geometry} material={materials.key} items={keyInstances} />
    <mesh position={[0, 0.328, KEYBOARD_Z]} rotation={[-HALF_PI, 0, 0]}>
      <planeGeometry args={[KEYBOARD_WIDTH, KEYBOARD_DEPTH]} />
      <meshBasicMaterial map={texture} transparent alphaTest={0.015} depthWrite={false} polygonOffset polygonOffsetFactor={-1} polygonOffsetUnits={-1} toneMapped={false} />
    </mesh>
    <Instances geometry={holeGeometry} material={materials.hole} items={holes} />
  </>;
}

function CoolingFan({ position, materials }: { position: Point; materials: Materials }) {
  const rotor = useRef<Group>(null);
  const blade = useMemo(() => {
    const shape = new Shape();
    shape.moveTo(0.19, 0.045);
    shape.quadraticCurveTo(0.54, 0.035, 0.78, 0.28);
    shape.lineTo(0.745, 0.34);
    shape.quadraticCurveTo(0.49, 0.17, 0.185, 0.08);
    shape.closePath();
    const geometry = new ExtrudeGeometry(shape, { depth: 0.033, bevelEnabled: false, curveSegments: 5 });
    geometry.rotateX(-HALF_PI);
    return geometry;
  }, []);
  const blades = useMemo(() => Array.from({ length: 37 }, (_, index) => ({
    position: [0, 0, 0] as Point, rotation: [0, (index / 37) * Math.PI * 2, 0] as Point,
  })), []);
  useFrame(({ clock }) => { if (rotor.current) rotor.current.rotation.y = clock.elapsedTime * 0.28; });
  useEffect(() => () => blade.dispose(), [blade]);
  return <group position={position}>
    <Plate size={[2.02, 2.04, 0.045]} position={[0, 0, 0]} material={materials.graphite} radius={0.27} flat />
    <mesh position={[0, 0.018, 0]} receiveShadow><cylinderGeometry args={[0.893, 0.893, 0.045, 64]} /><primitive object={materials.gasket} attach="material" /></mesh>
    <mesh position={[0, 0.065, 0]} rotation={[-HALF_PI, 0, 0]}><torusGeometry args={[0.898, 0.028, 5, 64]} /><primitive object={materials.fan} attach="material" /></mesh>
    <group ref={rotor} position={[0, 0.043, 0]}><Instances geometry={blade} material={materials.fan} items={blades} /></group>
    <mesh position={[0, 0.085, 0]} castShadow><cylinderGeometry args={[0.24, 0.25, 0.065, 40]} /><primitive object={materials.graphite} attach="material" /></mesh>
    <mesh position={[0, 0.119, 0]}><cylinderGeometry args={[0.078, 0.078, 0.004, 20]} /><primitive object={materials.bevel} attach="material" /></mesh>
  </group>;
}

function Internals({ materials }: { materials: Materials }) {
  const batteryTexture = useMemo(() => engineeringTexture(), []);
  const componentGeometry = useMemo(() => {
    const geometry = plateGeometry(1, 1, 1, 0.08);
    geometry.rotateX(-HALF_PI);
    return geometry;
  }, []);
  const components = useMemo(() => {
    const items: Instance[] = [];
    for (let row = 0; row < 2; row++) {
      for (let i = 0; i < 8; i++) items.push({ position: [-1.94 + i * 0.54, 0.065, -2.85 + row * 2.57], scale: [0.36, 0.09, 0.28] });
    }
    for (const side of [-1, 1]) {
      for (let i = 0; i < 7; i++) items.push({ position: [side * 1.59, 0.067, -2.35 + i * 0.27], scale: [0.19, 0.07, 0.14] });
      for (let i = 0; i < 20; i++) items.push({ position: [side * 3.50 - 0.8 + i * 0.084, 0.09, -2.91], scale: [0.034, 0.14, 0.49] });
    }
    return items;
  }, []);
  const traces = useMemo(() => {
    const points: number[] = [];
    const line = (ax: number, az: number, bx: number, bz: number) => points.push(ax, 0.025, az, bx, 0.025, bz);
    for (let i = 0; i < 29; i++) {
      const x = -1.38 + i * 0.098;
      const end = -2.60 + (i % 5) * 0.036;
      line(x, -1.95, x, -2.14);
      line(x, -2.14, x - 0.19, -2.33);
      line(x - 0.19, -2.33, x - 0.19, end);
      line(x, -0.87, x, -0.61);
      line(x, -0.61, x + 0.22, -0.39);
    }
    for (const side of [-1, 1]) {
      for (let i = 0; i < 12; i++) {
        const z = -2.2 + i * 0.12;
        line(side * 0.72, z, side * 1.05, z);
        line(side * 1.05, z, side * 1.25, z + 0.12);
        line(side * 1.25, z + 0.12, side * 1.9, z + 0.12);
      }
    }
    const geometry = new BufferGeometry();
    geometry.setAttribute('position', new Float32BufferAttribute(points, 3));
    return geometry;
  }, []);
  const pipes = useMemo(() => [-1, 1].map((side) => new TubeGeometry(new CatmullRomCurve3([
    new Vector3(side * 0.2, 0.233, -1.15), new Vector3(side * 0.97, 0.24, -1.18),
    new Vector3(side * 1.97, 0.24, -2.55), new Vector3(side * 3.60, 0.24, -2.68),
  ]), 32, 0.069, 8, false)), []);
  useEffect(() => () => {
    batteryTexture.dispose(); componentGeometry.dispose(); traces.dispose(); pipes.forEach((geometry) => geometry.dispose());
  }, [batteryTexture, componentGeometry, traces, pipes]);
  return <group>
    <Plate size={[9.79, 3.09, 0.055]} position={[0, -0.006, -1.58]} material={materials.pcb} radius={0.18} flat />
    <lineSegments geometry={traces}><lineBasicMaterial color="#52605a" transparent opacity={0.6} /></lineSegments>
    <Instances geometry={componentGeometry} material={materials.chip} items={components} />
    <CoolingFan position={[-3.53, 0.008, -1.43]} materials={materials} />
    <CoolingFan position={[3.53, 0.008, -1.43]} materials={materials} />
    <Plate size={[1.45, 1.39, 0.045]} position={[0, 0.068, -1.46]} material={materials.graphite} radius={0.055} flat />
    <Plate size={[1.22, 1.16, 0.047]} position={[0, 0.086, -1.46]} material={materials.bevel} radius={0.03} flat />
    <Plate size={[0.79, 0.77, 0.018]} position={[0, 0.115, -1.46]} material={materials.chip} radius={0.02} flat />
    {pipes.map((geometry, i) => <mesh key={i} geometry={geometry} scale={[1, 0.4, 1]} material={materials.copper} castShadow />)}
    <Plate size={[9.76, 2.86, 0.07]} position={[0, -0.012, 1.69]} material={materials.graphite} radius={0.14} flat />
    {[-3.19, 0, 3.19].map((x) => <Plate key={x} size={[3.08, 2.66, 0.063]} position={[x, 0.033, 1.70]} material={materials.gasket} radius={0.09} flat />)}
    <mesh position={[0, 0.067, 1.72]} rotation={[-HALF_PI, 0, 0]} receiveShadow>
      <planeGeometry args={[8.98, 2.4]} />
      <meshStandardMaterial map={batteryTexture} roughness={0.6} metalness={0.2} />
    </mesh>
    <Plate size={[0.36, 0.75, 0.018]} position={[1.43, 0.073, 0.16]} material={materials.copper} radius={0.028} flat />
    <Plate size={[0.57, 0.12, 0.07]} position={[1.43, 0.07, -0.11]} material={materials.gasket} radius={0.025} flat />
  </group>;
}

function Ports({ materials }: { materials: Materials }) {
  return <>
    {[-1, 1].flatMap((side) => [-2.20, -1.39].map((z) => <group key={`${side}-${z}`} position={[side * 5.397, -0.018, z]} rotation={[0, side * HALF_PI, 0]}>
      <Plate size={[0.44, 0.125, 0.019]} position={[0, 0, 0]} material={materials.gasket} radius={0.058} />
      <Plate size={[0.384, 0.087, 0.009]} position={[0, 0, 0.012]} material={materials.bevel} radius={0.04} rim={0.009} />
      <Plate size={[0.291, 0.031, 0.011]} position={[0, 0, 0.014]} material={materials.graphite} radius={0.012} />
    </group>))}
    <group position={[-5.399, -0.018, -0.62]} rotation={[0, -HALF_PI, 0]}>
      <mesh rotation={[HALF_PI, 0, 0]}><cylinderGeometry args={[0.061, 0.061, 0.012, 24]} /><primitive object={materials.gasket} attach="material" /></mesh>
      <mesh position={[0, 0, 0.008]}><torusGeometry args={[0.065, 0.009, 5, 24]} /><primitive object={materials.bevel} attach="material" /></mesh>
    </group>
    <group position={[5.399, -0.022, 0.04]} rotation={[0, HALF_PI, 0]}>
      <Plate size={[0.82, 0.058, 0.015]} position={[0, 0, 0]} material={materials.gasket} radius={0.024} />
    </group>
  </>;
}

function Fasteners({ materials }: { materials: Materials }) {
  return <>
    {[-1, 1].flatMap((x) => [-1, 1].map((z) => <group key={`foot-${x}-${z}`} position={[x * 4.57, -0.205, z * 2.81]}>
      <mesh castShadow><cylinderGeometry args={[0.27, 0.255, 0.045, 32]} /><primitive object={materials.gasket} attach="material" /></mesh>
      <mesh position={[0, -0.023, 0]}><cylinderGeometry args={[0.195, 0.195, 0.008, 32]} /><primitive object={materials.graphite} attach="material" /></mesh>
    </group>))}
    {[-4.89, 0, 4.89].flatMap((x) => [-3.11, 3.11].map((z) => <group key={`screw-${x}-${z}`} position={[x, -0.185, z]}>
      <mesh><cylinderGeometry args={[0.043, 0.043, 0.007, 16]} /><primitive object={materials.graphite} attach="material" /></mesh>
      <mesh position={[0, -0.005, 0]} rotation={[0, Math.PI / 4, 0]}><boxGeometry args={[0.042, 0.003, 0.011]} /><primitive object={materials.gasket} attach="material" /></mesh>
    </group>))}
  </>;
}

function smoothRange(value: number, start: number, end: number) {
  const t = Math.min(1, Math.max(0, (value - start) / (end - start)));
  return t * t * (3 - 2 * t);
}

/** The page owns camera choreography; every hardware transform is local to the hinge/base. */
export default function WorkstationHardware({ progress, screenTexture, compact = false }: HardwareProps) {
  const materials = useHardwareMaterials();
  const hinge = useRef<Group>(null);

  useFrame(() => {
    if (hinge.current) {
      hinge.current.rotation.x = -0.22 - smoothRange(progress.get(), 0, 0.18) * 0.12;
    }
  });

  return <group>
    {/* The casing, keyboard deck, and display remain one assembled physical device. */}
    <Plate size={[10.8, 7.1, 0.13]} position={[0, -0.115, 0]} material={materials.shell} radius={0.34} flat />
    <Plate size={[10.8, 7.1, 0.215]} position={[0, -0.011, 0]} material={materials.shell} radius={0.34} rim={0.145} flat />
    <Plate size={[10.77, 7.07, 0.021]} position={[0, 0.105, 0]} material={materials.bevel} radius={0.33} rim={0.053} flat />
    <Plate size={[10.75, 7.05, 0.009]} position={[0, 0.12, 0]} material={materials.graphite} radius={0.32} rim={0.049} flat />
    {!compact && <Internals materials={materials} />}
    <Ports materials={materials} />
    <Fasteners materials={materials} />

    <group>
      <Plate size={[10.78, 7.08, 0.101]} position={[0, 0.181, 0]} material={materials.deck} radius={0.335} flat />
      <Plate size={[10.76, 7.06, 0.018]} position={[0, 0.233, 0]} material={materials.bevel} radius={0.327} rim={0.024} flat />
      <Keyboard materials={materials} />
      <Plate size={[4.17, 2.25, 0.012]} position={[0, 0.239, 1.965]} material={materials.graphite} radius={0.135} flat />
      <Plate size={[4.12, 2.2, 0.015]} position={[0, 0.244, 1.965]} material={materials.shell} radius={0.117} flat />
      <Plate size={[1.23, 0.071, 0.029]} position={[0, 0.181, 3.54]} material={materials.graphite} radius={0.035} />
      <group>
        <Plate size={[8.79, 3.68, 0.036]} position={[0, 0.104, -1.265]} material={materials.graphite} radius={0.12} flat />
        <Plate size={[3.98, 2.11, 0.021]} position={[0, 0.111, 1.965]} material={materials.graphite} radius={0.10} flat />
        <Plate size={[0.51, 0.69, 0.008]} position={[0.9, 0.089, 0.78]} material={materials.copper} radius={0.025} flat />
      </group>
    </group>

    {[-3.83, 3.83].map((x) => <mesh key={`hinge-${x}`} position={[x, 0.172, -3.247]} rotation={[0, 0, HALF_PI]} castShadow>
      <cylinderGeometry args={[0.156, 0.156, 1.13, 32]} /><primitive object={materials.graphite} attach="material" />
    </mesh>)}
    <Plate size={[6.57, 0.23, 0.18]} position={[0, 0.128, -3.242]} material={materials.gasket} radius={0.11} flat />

    <group ref={hinge} position={HINGE_POSITION} rotation={[-0.22, 0, 0]}>
      <group>
        <Plate size={[10.5, 6.4, 0.171]} position={[0, 3.2, -0.015]} material={materials.shell} radius={0.26} />
        <Plate size={[10.47, 6.37, 0.022]} position={[0, 3.2, 0.073]} material={materials.bevel} radius={0.245} rim={0.035} />
        <Plate size={[10.14, 6.04, 0.025]} position={[0, 3.2, 0.083]} material={materials.graphite} radius={0.16} />
        <mesh position={[0, 3.3, -0.104]} rotation={[0, Math.PI, 0]}>
          <ringGeometry args={[0.23, 0.255, 48]} /><primitive object={materials.graphite} attach="material" />
        </mesh>
        <mesh position={[0, 3.3, -0.105]} rotation={[0, Math.PI, Math.PI / 4]}>
          <planeGeometry args={[0.115, 0.115]} /><primitive object={materials.graphite} attach="material" />
        </mesh>
      </group>
      <Plate size={[10.44, 6.34, 0.047]} position={[0, 3.2, 0.094]} material={materials.gasket} radius={0.24} rim={0.095} />
      <group>
        <Plate size={[10.31, 6.26, 0.045]} position={[0, 3.215, 0.123]} material={materials.glass} radius={0.188} />
        <mesh position={SCREEN_POSITION}>
          <planeGeometry args={[SCREEN_WIDTH, SCREEN_HEIGHT]} />
          <meshBasicMaterial map={screenTexture} toneMapped={false} side={DoubleSide} />
        </mesh>
        <mesh position={[0, 6.333, 0.154]}><circleGeometry args={[0.029, 24]} /><primitive object={materials.gasket} attach="material" /></mesh>
        <mesh position={[0, 6.333, 0.157]}><circleGeometry args={[0.017, 20]} /><primitive object={materials.camera} attach="material" /></mesh>
        <mesh position={[0.099, 6.333, 0.155]}><circleGeometry args={[0.008, 12]} /><meshBasicMaterial color="#61706c" /></mesh>
      </group>
    </group>
  </group>;
}
