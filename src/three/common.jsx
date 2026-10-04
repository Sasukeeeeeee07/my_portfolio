import { useEffect, useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { motion } from '../lib/runtime';

/** Animation speed multiplier — nearly still for people who ask for less motion. */
export const speed = () => (motion.reduced ? 0.12 : 1);

export const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
export const easeOutBack = (t) => {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
};

/** Procedural studio reflections — no HDR download, so it works offline. */
export function Env({ intensity = 1 }) {
  const gl = useThree((s) => s.gl);
  const scene = useThree((s) => s.scene);

  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl);
    const target = pmrem.fromScene(new RoomEnvironment(), 0.04);
    scene.environment = target.texture;
    scene.environmentIntensity = intensity;
    return () => {
      scene.environment = null;
      target.dispose();
      pmrem.dispose();
    };
  }, [gl, scene, intensity]);

  return null;
}

let dotTex;
export function dotTexture() {
  if (dotTex) return dotTex;
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const ctx = c.getContext('2d');
  const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(0.35, 'rgba(255,255,255,0.85)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 64, 64);
  dotTex = new THREE.CanvasTexture(c);
  return dotTex;
}

/** Soft round particles scattered through a spherical shell. */
export function Dust({
  count = 600, rmin = 2.5, rmax = 5, color = '#ffb066', size = 0.08,
  opacity = 0.85, additive = true, spin = 0.03,
}) {
  const ref = useRef();
  const positions = useMemo(() => {
    const a = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = rmin + Math.random() * (rmax - rmin);
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(2 * Math.random() - 1);
      a[i * 3] = r * Math.sin(ph) * Math.cos(th);
      a[i * 3 + 1] = r * Math.cos(ph);
      a[i * 3 + 2] = r * Math.sin(ph) * Math.sin(th);
    }
    return a;
  }, [count, rmin, rmax]);

  useFrame((_, dt) => {
    if (!ref.current) return;
    ref.current.rotation.y += dt * spin * speed();
    ref.current.rotation.x += dt * spin * 0.3 * speed();
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} count={count} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        map={dotTexture()}
        size={size}
        color={color}
        transparent
        opacity={opacity}
        depthWrite={false}
        sizeAttenuation
        blending={additive ? THREE.AdditiveBlending : THREE.NormalBlending}
      />
    </points>
  );
}

/** 0 → 1 over `duration` seconds after mount. */
export function useIntro(duration = 1.4, delay = 0) {
  const t = useRef(0);
  const clock = useRef(0);
  useFrame((_, dt) => {
    clock.current += dt;
    t.current = Math.min(1, Math.max(0, (clock.current - delay) / duration));
  });
  return t;
}

/** A small glowing bead that travels along a curve forever. */
export function Pulse({ curve, rate = 0.25, offset = 0, color = '#ffb347', size = 0.07 }) {
  const ref = useRef();
  const t = useRef(offset);
  useFrame((_, dt) => {
    if (!ref.current) return;
    t.current = (t.current + dt * rate * speed()) % 1;
    ref.current.position.copy(curve.getPoint(t.current));
    const edge = Math.sin(t.current * Math.PI);
    ref.current.scale.setScalar(0.4 + edge * 0.9);
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[size, 16, 16]} />
      <meshBasicMaterial color={color} />
    </mesh>
  );
}

/** A thin tube between two points. */
export function Link({ from, to, radius = 0.014, color = '#ff8a3d', opacity = 0.55 }) {
  const geo = useMemo(
    () => new THREE.TubeGeometry(new THREE.LineCurve3(new THREE.Vector3(...from), new THREE.Vector3(...to)), 1, radius, 6, false),
    [from, to, radius]
  );
  return (
    <mesh geometry={geo}>
      <meshBasicMaterial color={color} transparent opacity={opacity} />
    </mesh>
  );
}

/** Standard dark-stage lighting. */
export function StageLights({ warm = '#ffe3c4', cool = '#6f9bff', orange = '#ff6a1f' }) {
  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 6, 5]} intensity={2.4} color={warm} />
      <directionalLight position={[-5, 2, -3]} intensity={1.6} color={cool} />
      <pointLight position={[0, -2.5, 3]} intensity={26} distance={12} color={orange} />
    </>
  );
}
