import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { ContactShadows, MeshDistortMaterial, RoundedBox, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { pointer, clamp } from '../lib/runtime';
import { Dust, StageLights, easeOutBack, easeOutCubic, speed, useIntro } from './common';

/* ==========================================================================
   HERO — liquid-metal core inside an instrument of orbiting rings.
   Sits on the right of the text on desktop, above it on a phone.
   ========================================================================== */
const RINGS = [
  { r: 1.62, tilt: [1.15, 0.2, 0], spin: 0.42, color: '#1b1613', sat: '#ff5400' },
  { r: 2.02, tilt: [0.4, 0.9, 0.3], spin: -0.3, color: '#ff5400', sat: '#fff1de' },
  { r: 2.42, tilt: [-0.7, -0.4, 0.8], spin: 0.22, color: '#1b1613', sat: '#f59e0b' },
];

function Ring({ r, tilt, spin, color, sat }) {
  const spinner = useRef();
  useFrame((_, dt) => {
    if (spinner.current) spinner.current.rotation.z += dt * spin * speed();
  });
  return (
    <group rotation={tilt}>
      <group ref={spinner}>
        <mesh>
          <torusGeometry args={[r, 0.016, 12, 220]} />
          <meshStandardMaterial color={color} metalness={1} roughness={0.28} />
        </mesh>
        <mesh position={[r, 0, 0]}>
          <sphereGeometry args={[0.075, 24, 24]} />
          <meshStandardMaterial color={sat} emissive={sat} emissiveIntensity={1.6} toneMapped={false} />
        </mesh>
      </group>
    </group>
  );
}

export function HeroScene() {
  const rig = useRef();
  const swivel = useRef();
  const core = useRef();
  const intro = useIntro(1.9, 0.15);

  useFrame((state, dt) => {
    if (!rig.current) return;
    const { viewport, size } = state;
    const narrow = size.width < 820;
    const k = easeOutBack(clamp(intro.current));

    const unit = narrow
      ? Math.min(viewport.width * 0.78, viewport.height * 0.34) / 5
      : Math.min(viewport.height * 0.8, viewport.width * 0.52) / 5;
    const s = Math.max(0.01, unit * k);
    rig.current.scale.setScalar(s);

    const tx = narrow ? 0 : viewport.width * 0.225;
    const ty = narrow ? viewport.height * 0.25 : 0.05;
    rig.current.position.x += (tx - rig.current.position.x) * Math.min(1, dt * 6);
    rig.current.position.y += (ty - rig.current.position.y) * Math.min(1, dt * 6);

    const px = pointer.x * 0.45 * speed();
    const py = pointer.y * 0.3 * speed();
    swivel.current.rotation.y += (px - swivel.current.rotation.y) * Math.min(1, dt * 3);
    swivel.current.rotation.x += (-py - swivel.current.rotation.x) * Math.min(1, dt * 3);

    core.current.rotation.y += dt * 0.18 * speed();
  });

  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight position={[4, 6, 5]} intensity={2.6} color="#fff0dc" />
      <directionalLight position={[-6, 1, -2]} intensity={1.8} color="#7aa6ff" />
      <pointLight position={[-3, -2, 4]} intensity={24} distance={14} color="#ff7a2e" />

      <group ref={rig} scale={0.01}>
        <group ref={swivel}>
          <mesh ref={core}>
            <sphereGeometry args={[1.08, 128, 128]} />
            <MeshDistortMaterial
              color="#ff5a1a"
              roughness={0.14}
              metalness={1}
              distort={0.3}
              speed={1.5}
              envMapIntensity={1.5}
              clearcoat={1}
              clearcoatRoughness={0.08}
            />
          </mesh>
          {RINGS.map((ring, i) => (
            <Ring key={i} {...ring} />
          ))}
        </group>
        <ContactShadows position={[0, -2.75, 0]} opacity={0.42} scale={11} blur={2.8} far={5} resolution={256} color="#7a2f08" />
        <Dust count={700} rmin={2.9} rmax={5.4} color="#ff7a2e" size={0.09} opacity={0.85} additive={false} spin={0.035} />
      </group>
    </>
  );
}

/* ==========================================================================
   STORY — four slabs twisting upward: HSC → BSc → MCA → Smmart.
   ========================================================================== */
const SLABS = [
  { w: 2.7, color: '#4a3f39', metal: 0.7, rough: 0.34, emissive: '#000000', ei: 0 },
  { w: 2.4, color: '#a07a56', metal: 0.9, rough: 0.28, emissive: '#000000', ei: 0 },
  { w: 2.1, color: '#f5a623', metal: 1, rough: 0.22, emissive: '#6b3a00', ei: 0.25 },
  { w: 1.8, color: '#ff5400', metal: 0.9, rough: 0.2, emissive: '#ff3300', ei: 0.55 },
];

export function AscentScene() {
  const group = useRef();
  const slabs = useRef([]);
  const gem = useRef();
  const intro = useIntro(1.6);

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime * speed();
    const k = easeOutCubic(intro.current);
    group.current.rotation.y += dt * 0.28 * speed();
    slabs.current.forEach((m, i) => {
      if (!m) return;
      const delay = clamp(k * 1.6 - i * 0.28);
      m.position.y = -1.55 + i * 1.02 + Math.sin(t * 0.9 + i) * 0.05 + (1 - easeOutCubic(delay)) * -2.5;
      m.scale.setScalar(0.001 + easeOutCubic(delay));
    });
    gem.current.rotation.y += dt * 1.1 * speed();
    gem.current.position.y = 2.95 + Math.sin(t * 1.3) * 0.12;
  });

  return (
    <>
      <StageLights />
      <group ref={group} position={[0, -0.1, 0]}>
        {SLABS.map((s, i) => (
          <RoundedBox
            key={i}
            ref={(el) => (slabs.current[i] = el)}
            args={[s.w, 0.42, s.w]}
            radius={0.12}
            smoothness={5}
            rotation={[0, i * 0.42, 0]}
          >
            <meshPhysicalMaterial
              color={s.color}
              metalness={s.metal}
              roughness={s.rough}
              clearcoat={0.6}
              emissive={s.emissive}
              emissiveIntensity={s.ei}
            />
          </RoundedBox>
        ))}
        <mesh ref={gem}>
          <octahedronGeometry args={[0.34, 0]} />
          <meshPhysicalMaterial color="#ffd36b" metalness={1} roughness={0.12} emissive="#ff9a1a" emissiveIntensity={0.5} />
        </mesh>
      </group>
      <Sparkles count={45} scale={[6, 7, 6]} size={3} speed={0.35} color="#ffb066" opacity={0.8} />
    </>
  );
}

/* ==========================================================================
   JOURNEY — a glowing path that draws itself as the timeline is scrolled.
   `progress.current` (0..1) is written by the section, one value per frame.
   Node i is lit once progress reaches i / (n - 1).
   ========================================================================== */
const NODE_COUNT = 6;
const SEG = 320;
const RAD = 10;

export function PathScene({ progress }) {
  const front = useRef();
  const head = useRef();
  const headLight = useRef();
  const nodes = useRef([]);
  const smooth = useRef(0);

  const { curve, back, lit, points } = useMemo(() => {
    const pts = Array.from({ length: NODE_COUNT }, (_, i) =>
      new THREE.Vector3(Math.sin(i * 1.3 + 0.5) * 1.55, 3.4 - i * 1.36, Math.cos(i * 1.3 + 0.5) * 1.1)
    );
    const c = new THREE.CatmullRomCurve3(pts, false, 'catmullrom', 0.5);
    const geo = new THREE.TubeGeometry(c, SEG, 0.045, RAD, false);
    const litGeo = geo.clone();
    return { curve: c, back: geo, lit: litGeo, points: pts };
  }, []);

  useFrame((state, dt) => {
    const target = clamp(progress?.current ?? 0);
    smooth.current += (target - smooth.current) * Math.min(1, dt * 6);
    const s = smooth.current;

    lit.setDrawRange(0, Math.floor(s * SEG) * RAD * 6);
    const p = curve.getPoint(s);
    head.current.position.copy(p);
    headLight.current.position.copy(p);

    nodes.current.forEach((n, i) => {
      if (!n) return;
      const on = s >= i / (NODE_COUNT - 1) - 0.012;
      const m = n.material;
      m.emissiveIntensity += ((on ? 1.7 : 0) - m.emissiveIntensity) * Math.min(1, dt * 8);
      m.color.lerp(on ? ON : OFF, Math.min(1, dt * 8));
      const sc = n.scale.x + ((on ? 1.25 : 1) - n.scale.x) * Math.min(1, dt * 8);
      n.scale.setScalar(sc);
    });

    const cam = state.camera;
    cam.position.y += (p.y * 0.8 - cam.position.y) * Math.min(1, dt * 3);
    cam.position.x += (pointer.x * 0.6 * speed() - cam.position.x) * Math.min(1, dt * 2);
    cam.lookAt(0, cam.position.y - 0.1, 0);
  });

  return (
    <>
      <StageLights />
      <mesh geometry={back}>
        <meshBasicMaterial color="#ffffff" transparent opacity={0.1} />
      </mesh>
      <mesh ref={front} geometry={lit}>
        <meshStandardMaterial color="#ff6a1f" emissive="#ff4a00" emissiveIntensity={1.1} metalness={0.6} roughness={0.3} toneMapped={false} />
      </mesh>

      {points.map((pt, i) => (
        <group key={i} position={pt}>
          <mesh ref={(el) => (nodes.current[i] = el)}>
            <sphereGeometry args={[0.2, 32, 32]} />
            <meshStandardMaterial color="#3a302b" emissive="#ff5400" emissiveIntensity={0} metalness={0.8} roughness={0.25} />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.36, 0.008, 8, 64]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.28} />
          </mesh>
        </group>
      ))}

      <mesh ref={head}>
        <sphereGeometry args={[0.11, 24, 24]} />
        <meshBasicMaterial color="#fff4e0" toneMapped={false} />
      </mesh>
      <pointLight ref={headLight} intensity={14} distance={5} color="#ff7a1a" />
      <Sparkles count={50} scale={[7, 9, 6]} size={2.4} speed={0.3} color="#ffb066" opacity={0.7} />
    </>
  );
}

const ON = new THREE.Color('#ff7a1a');
const OFF = new THREE.Color('#3a302b');
