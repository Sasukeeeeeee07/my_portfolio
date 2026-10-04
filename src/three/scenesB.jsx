import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { pointer, clamp } from '../lib/runtime';
import { skills } from '../data/portfolio';
import { Dust, Link, Pulse, StageLights, easeOutBack, speed, useIntro } from './common';

const V = (x, y, z) => new THREE.Vector3(x, y, z);

/* ==========================================================================
   SYSTEMS — one stage, four machines. Remounted (and re-introduced) per tab.
   ========================================================================== */
function CrmModel() {
  const leds = useRef([]);
  useFrame((state) => {
    const t = state.clock.elapsedTime * speed();
    leds.current.forEach((m, i) => {
      if (m) m.emissiveIntensity = 0.5 + 1.4 * Math.max(0, Math.sin(t * 3.2 + i * 1.9));
    });
  });

  const cloudToRack = useMemo(() => new THREE.LineCurve3(V(-0.4, 1.95, 0), V(-0.4, 1.0, 0)), []);
  const rackToDb = useMemo(() => new THREE.LineCurve3(V(0.9, 0, 0.2), V(2.2, 0, 0.2)), []);

  return (
    <group position={[0, -0.25, 0]}>
      {[-0.95, 0, 0.95].map((y, row) => (
        <group key={row} position={[-0.4, y - 0.05, 0]}>
          <RoundedBox args={[2.4, 0.72, 1.3]} radius={0.06} smoothness={4}>
            <meshStandardMaterial color="#1c1917" metalness={0.9} roughness={0.32} />
          </RoundedBox>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <mesh key={i} position={[-0.9 + i * 0.22, 0.12, 0.66]}>
              <boxGeometry args={[0.1, 0.1, 0.02]} />
              <meshStandardMaterial
                ref={(el) => (leds.current[row * 6 + i] = el)}
                color="#111"
                emissive={(row + i) % 3 === 0 ? '#2cff9a' : '#ff6a1f'}
                emissiveIntensity={1}
                toneMapped={false}
              />
            </mesh>
          ))}
          <mesh position={[0.45, -0.12, 0.66]}>
            <boxGeometry args={[0.9, 0.06, 0.02]} />
            <meshBasicMaterial color="#3a3330" />
          </mesh>
        </group>
      ))}

      <group position={[2.75, 0, 0.2]}>
        {[-0.7, 0, 0.7].map((y, i) => (
          <group key={i} position={[0, y, 0]}>
            <mesh>
              <cylinderGeometry args={[0.62, 0.62, 0.5, 40]} />
              <meshStandardMaterial color="#26211e" metalness={0.9} roughness={0.28} />
            </mesh>
            <mesh position={[0, 0.0, 0]}>
              <torusGeometry args={[0.625, 0.022, 10, 60]} />
              <meshStandardMaterial color="#ff6a1f" emissive="#ff5400" emissiveIntensity={1.4} toneMapped={false} />
            </mesh>
          </group>
        ))}
      </group>

      <group position={[-0.4, 2.3, 0]}>
        {[[-0.45, 0, 0, 0.42], [0.1, 0.18, 0, 0.55], [0.62, -0.02, 0, 0.4]].map(([x, y, z, r], i) => (
          <mesh key={i} position={[x, y, z]}>
            <sphereGeometry args={[r, 32, 32]} />
            <meshPhysicalMaterial color="#fff3e6" metalness={0.2} roughness={0.25} clearcoat={1} emissive="#ff9a4a" emissiveIntensity={0.25} />
          </mesh>
        ))}
      </group>

      <Link from={[-0.4, 1.95, 0]} to={[-0.4, 1.0, 0]} />
      <Link from={[0.9, 0, 0.2]} to={[2.2, 0, 0.2]} />
      <Pulse curve={cloudToRack} rate={0.5} />
      <Pulse curve={cloudToRack} rate={0.5} offset={0.5} />
      <Pulse curve={rackToDb} rate={0.45} color="#2cff9a" />
      <Pulse curve={rackToDb} rate={0.45} offset={0.5} color="#2cff9a" />
    </group>
  );
}

function MetaModel() {
  const gate = useRef();
  const ring = useRef();
  const inbound = useMemo(() => new THREE.CatmullRomCurve3([V(-3.3, 1.2, 0), V(-2, 0.4, 0.3), V(-0.9, 0, 0)]), []);
  const inbound2 = useMemo(() => new THREE.CatmullRomCurve3([V(-3.3, -1.1, 0), V(-2, -0.4, -0.3), V(-0.9, 0, 0)]), []);
  const outbound = useMemo(() => new THREE.LineCurve3(V(0.9, 0, 0), V(3.0, 0, 0)), []);

  useFrame((state, dt) => {
    gate.current.rotation.y += dt * 0.5 * speed();
    const t = state.clock.elapsedTime * speed();
    ring.current.scale.setScalar(1 + (t % 1.6) * 0.5);
    ring.current.material.opacity = 0.5 * (1 - (t % 1.6) / 1.6);
  });

  return (
    <group>
      <group ref={gate}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.95, 0.95, 0.55, 6]} />
          <meshPhysicalMaterial color="#ff5a1a" metalness={1} roughness={0.16} clearcoat={1} emissive="#ff3a00" emissiveIntensity={0.25} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.25, 0.03, 12, 6]} />
          <meshBasicMaterial color="#ffd7b0" />
        </mesh>
      </group>
      <mesh ref={ring} rotation={[0, Math.PI / 2, 0]}>
        <ringGeometry args={[1.0, 1.04, 64]} />
        <meshBasicMaterial color="#ffb066" transparent opacity={0.4} side={THREE.DoubleSide} />
      </mesh>

      {[inbound, inbound2].map((c, i) => (
        <mesh key={i}>
          <tubeGeometry args={[c, 40, 0.012, 6, false]} />
          <meshBasicMaterial color="#ff8a3d" transparent opacity={0.45} />
        </mesh>
      ))}
      <Link from={[0.9, 0, 0]} to={[3.0, 0, 0]} />
      {[0, 0.34, 0.68].map((o) => (
        <Pulse key={o} curve={inbound} offset={o} rate={0.3} size={0.09} />
      ))}
      {[0.15, 0.5, 0.85].map((o) => (
        <Pulse key={o} curve={inbound2} offset={o} rate={0.3} size={0.09} />
      ))}
      {[0, 0.5].map((o) => (
        <Pulse key={o} curve={outbound} offset={o} rate={0.5} color="#2cff9a" size={0.09} />
      ))}

      <mesh position={[3.35, 0, 0]}>
        <cylinderGeometry args={[0.38, 0.38, 0.7, 32]} />
        <meshStandardMaterial color="#26211e" metalness={0.9} roughness={0.3} emissive="#2cff9a" emissiveIntensity={0.12} />
      </mesh>
      {[-3.4, -3.4].map((x, i) => (
        <mesh key={i} position={[x, i ? -1.1 : 1.2, 0]}>
          <boxGeometry args={[0.36, 0.36, 0.36]} />
          <meshStandardMaterial color="#1877f2" emissive="#1877f2" emissiveIntensity={0.7} metalness={0.6} roughness={0.3} />
        </mesh>
      ))}
    </group>
  );
}

function DeskModel() {
  const wave = useRef();
  const pir = useRef();

  const screen = useMemo(() => {
    const c = document.createElement('canvas');
    c.width = 512;
    c.height = 320;
    const x = c.getContext('2d');
    x.fillStyle = '#06141f';
    x.fillRect(0, 0, 512, 320);
    x.strokeStyle = 'rgba(80,200,255,.18)';
    x.lineWidth = 1;
    for (let i = 0; i < 512; i += 32) { x.beginPath(); x.moveTo(i, 0); x.lineTo(i, 320); x.stroke(); }
    for (let i = 0; i < 320; i += 32) { x.beginPath(); x.moveTo(0, i); x.lineTo(512, i); x.stroke(); }
    x.strokeStyle = '#35d0ff';
    x.lineWidth = 4;
    x.beginPath();
    for (let i = 0; i <= 512; i += 4) {
      const y = 170 + Math.sin(i / 38) * 46 + Math.sin(i / 11) * 12;
      i ? x.lineTo(i, y) : x.moveTo(i, y);
    }
    x.stroke();
    x.fillStyle = '#ff6a1f';
    [60, 120, 180, 240].forEach((w, i) => x.fillRect(28, 236 + i * 18, w, 10));
    x.fillStyle = '#e8f6ff';
    x.font = '700 30px monospace';
    x.fillText('SMARTDESK', 28, 52);
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);

  useEffect(() => () => screen.dispose(), [screen]);

  useFrame((state) => {
    const t = (state.clock.elapsedTime * speed()) % 2;
    pir.current.scale.setScalar(0.6 + t * 1.6);
    pir.current.material.opacity = 0.55 * (1 - t / 2);
    wave.current.material.emissiveIntensity = 0.5 + Math.sin(state.clock.elapsedTime * 3) * 0.12;
  });

  return (
    <group rotation={[0.55, 0, 0]} position={[0, -0.2, 0]}>
      <RoundedBox args={[3.8, 0.16, 2.5]} radius={0.05} smoothness={3}>
        <meshStandardMaterial color="#0f2a22" metalness={0.5} roughness={0.45} />
      </RoundedBox>
      <mesh ref={wave} position={[-0.35, 0.1, 0.1]}>
        <boxGeometry args={[2.2, 0.05, 1.4]} />
        <meshStandardMaterial map={screen} emissiveMap={screen} emissive="#ffffff" emissiveIntensity={0.55} toneMapped={false} />
      </mesh>
      <mesh position={[1.35, 0.14, -0.7]}>
        <boxGeometry args={[0.62, 0.1, 0.62]} />
        <meshStandardMaterial color="#0b0b0c" metalness={0.8} roughness={0.25} />
      </mesh>
      <mesh position={[1.35, 0.14, 0.45]}>
        <sphereGeometry args={[0.26, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshPhysicalMaterial color="#f4f1ea" roughness={0.3} clearcoat={0.8} />
      </mesh>
      <mesh ref={pir} position={[1.35, 0.2, 0.45]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.28, 0.31, 48]} />
        <meshBasicMaterial color="#35d0ff" transparent opacity={0.5} side={THREE.DoubleSide} />
      </mesh>
      {[-1.7, 1.7].flatMap((x) => [-1, 1].map((z) => [x, z])).map(([x, z], i) => (
        <mesh key={i} position={[x * 0.94, 0.1, z * 0.52]}>
          <cylinderGeometry args={[0.06, 0.06, 0.1, 12]} />
          <meshStandardMaterial color="#d4a017" metalness={1} roughness={0.2} />
        </mesh>
      ))}
    </group>
  );
}

function AiModel() {
  const group = useRef();
  const layers = [3, 5, 4, 2];

  const { nodes, edges, curves } = useMemo(() => {
    const ns = [];
    layers.forEach((count, l) => {
      for (let i = 0; i < count; i++) {
        ns.push({
          l,
          p: V(-2.4 + l * 1.6, (i - (count - 1) / 2) * 0.95, (Math.random() - 0.5) * 0.9),
        });
      }
    });
    const es = [];
    ns.forEach((a) => ns.forEach((b) => b.l === a.l + 1 && es.push([a.p, b.p])));
    const geo = new THREE.BufferGeometry().setFromPoints(es.flat());
    const cs = es.filter((_, i) => i % 3 === 0).map(([a, b]) => new THREE.LineCurve3(a, b));
    return { nodes: ns, edges: geo, curves: cs };
  }, []);

  useFrame((state, dt) => {
    group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.35 * speed()) * 0.5;
  });

  return (
    <group ref={group}>
      <lineSegments geometry={edges}>
        <lineBasicMaterial color="#ff8a3d" transparent opacity={0.2} />
      </lineSegments>
      {nodes.map((n, i) => (
        <mesh key={i} position={n.p}>
          <sphereGeometry args={[0.15 + (n.l === 3 ? 0.05 : 0), 24, 24]} />
          <meshStandardMaterial
            color={n.l === 3 ? '#fff1de' : '#ff6a1f'}
            emissive={n.l === 3 ? '#ffb066' : '#ff4a00'}
            emissiveIntensity={n.l === 3 ? 1.2 : 0.7}
            metalness={0.6}
            roughness={0.25}
          />
        </mesh>
      ))}
      {curves.map((c, i) => (
        <Pulse key={i} curve={c} offset={(i * 0.137) % 1} rate={0.35 + (i % 3) * 0.07} size={0.05} color="#fff1de" />
      ))}
    </group>
  );
}

// half-width of each model in world units, and where its visual centre sits on x
const MODELS = {
  crm: { Model: CrmModel, extent: 2.6, cx: -0.9 },
  meta: { Model: MetaModel, extent: 3.8, cx: 0 },
  smartdesk: { Model: DeskModel, extent: 2.3, cx: 0 },
  ai: { Model: AiModel, extent: 2.9, cx: 0 },
};

export function SystemsScene({ model = 'crm' }) {
  const { Model, extent, cx } = MODELS[model] || MODELS.crm;
  return (
    <>
      <StageLights />
      <Intro key={model} extent={extent} cx={cx}>
        <Model />
      </Intro>
      <Sparkles count={30} scale={[8, 5, 5]} size={2} speed={0.3} color="#ffb066" opacity={0.6} />
    </>
  );
}

/** Pops its children in, sized to fit the stage width, with a gentle idle float. */
function Intro({ children, extent, cx }) {
  const g = useRef();
  const t = useIntro(0.9);
  useFrame((state) => {
    const fit = Math.min(1, (state.viewport.width * 0.92) / (extent * 2));
    const k = easeOutBack(clamp(t.current));
    g.current.scale.setScalar(Math.max(0.001, k) * fit);
    g.current.position.x = cx * fit;
    g.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4 * speed()) * 0.05;
    g.current.rotation.y = pointer.x * 0.25 * speed();
  });
  return <group ref={g}>{children}</group>;
}

/* ==========================================================================
   SKILLS — every skill from the data file is a node on a slowly turning globe,
   coloured by honesty level; the closest nodes are wired together.
   ========================================================================== */
const LEVEL = {
  strong: { color: '#ff5400', size: 0.15 },
  working: { color: '#f59e0b', size: 0.12 },
  exploring: { color: '#10b981', size: 0.1 },
};

export function GlobeScene() {
  const group = useRef();
  const items = useMemo(() => Object.values(skills).flatMap((c) => c.items), []);

  const { pts, lines } = useMemo(() => {
    const n = items.length;
    const golden = Math.PI * (3 - Math.sqrt(5));
    const p = items.map((_, i) => {
      const y = 1 - (i / (n - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const th = golden * i;
      return V(Math.cos(th) * r * 2, y * 2, Math.sin(th) * r * 2);
    });
    const seg = [];
    p.forEach((a, i) => {
      p.map((b, j) => ({ j, d: a.distanceTo(b) }))
        .filter((o) => o.j > i)
        .sort((x, y) => x.d - y.d)
        .slice(0, 2)
        .forEach((o) => seg.push(a, p[o.j]));
    });
    return { pts: p, lines: new THREE.BufferGeometry().setFromPoints(seg) };
  }, [items]);

  useFrame((state, dt) => {
    group.current.scale.setScalar(Math.min(1, (state.viewport.width * 0.9) / 4.5));
    group.current.rotation.y += dt * 0.22 * speed();
    group.current.rotation.x += (pointer.y * -0.25 * speed() - group.current.rotation.x) * Math.min(1, dt * 2);
  });

  return (
    <>
      <StageLights />
      <group ref={group}>
        <mesh>
          <icosahedronGeometry args={[1.95, 2]} />
          <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.05} />
        </mesh>
        <lineSegments geometry={lines}>
          <lineBasicMaterial color="#ff8a3d" transparent opacity={0.4} />
        </lineSegments>
        {pts.map((p, i) => {
          const lv = LEVEL[items[i].level] || LEVEL.working;
          return (
            <mesh key={i} position={p}>
              <sphereGeometry args={[lv.size, 24, 24]} />
              <meshStandardMaterial color={lv.color} emissive={lv.color} emissiveIntensity={0.9} metalness={0.5} roughness={0.25} toneMapped={false} />
            </mesh>
          );
        })}
        <mesh>
          <sphereGeometry args={[0.55, 48, 48]} />
          <meshPhysicalMaterial color="#1c1410" metalness={1} roughness={0.15} clearcoat={1} emissive="#ff5400" emissiveIntensity={0.18} />
        </mesh>
      </group>
      <Dust count={260} rmin={3} rmax={4.6} size={0.07} opacity={0.6} />
    </>
  );
}

/* ==========================================================================
   RECOGNITION — a gold medal with a star, hanging from an orange ribbon.
   ========================================================================== */
export function MedalScene() {
  const medal = useRef();
  const intro = useIntro(1.4);

  const star = useMemo(() => {
    const s = new THREE.Shape();
    const R = 0.72;
    const r = 0.3;
    for (let i = 0; i < 10; i++) {
      const a = Math.PI / 2 + (i * Math.PI) / 5;
      const rad = i % 2 ? r : R;
      const x = Math.cos(a) * rad;
      const y = Math.sin(a) * rad;
      i ? s.lineTo(x, y) : s.moveTo(x, y);
    }
    s.closePath();
    return s;
  }, []);

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime * speed();
    const k = easeOutBack(clamp(intro.current));
    // the medal + ribbon is ~3 wide and ~4.4 tall: fit whichever dimension is tighter
    const fit = Math.min(1, (state.viewport.width * 0.8) / 3, (state.viewport.height * 0.9) / 4.4);
    medal.current.scale.setScalar(Math.max(0.001, k) * fit);
    medal.current.rotation.y = Math.sin(t * 0.7) * 0.7 + pointer.x * 0.3 * speed();
    medal.current.rotation.x = Math.sin(t * 0.5) * 0.08 + pointer.y * -0.15 * speed();
    medal.current.position.y = (-0.75 + Math.sin(t * 1.1) * 0.08) * fit;
  });

  const gold = { color: '#f6b93b', metalness: 1, roughness: 0.2 };

  return (
    <>
      <StageLights warm="#fff0d2" />
      <group ref={medal}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[1.3, 1.3, 0.2, 80]} />
          <meshStandardMaterial {...gold} />
        </mesh>
        <mesh>
          <torusGeometry args={[1.3, 0.075, 24, 100]} />
          <meshStandardMaterial {...gold} roughness={0.14} />
        </mesh>
        <mesh position={[0, 0, 0.1]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[1.02, 1.02, 0.06, 80]} />
          <meshStandardMaterial color="#c88a12" metalness={1} roughness={0.3} />
        </mesh>
        <mesh position={[0, -0.02, 0.12]}>
          <extrudeGeometry args={[star, { depth: 0.1, bevelEnabled: true, bevelSize: 0.03, bevelThickness: 0.03, bevelSegments: 4 }]} />
          <meshStandardMaterial color="#ffe08a" metalness={1} roughness={0.12} emissive="#ff9a1a" emissiveIntensity={0.25} />
        </mesh>
        {[-1, 1].map((s) => (
          <mesh key={s} position={[s * 0.34, 2.0, -0.04]} rotation={[0, 0, s * -0.32]}>
            <boxGeometry args={[0.55, 1.9, 0.05]} />
            <meshStandardMaterial color={s < 0 ? '#ff5400' : '#e04800'} roughness={0.5} metalness={0.1} />
          </mesh>
        ))}
      </group>
      <Sparkles count={60} scale={[5, 5, 4]} size={3.5} speed={0.5} color="#ffd27a" opacity={0.9} />
    </>
  );
}

/* ==========================================================================
   CONTACT — a glossy torus knot in a wire cage, offset to the right.
   ========================================================================== */
export function KnotScene() {
  const rig = useRef();
  const knot = useRef();
  const cage = useRef();
  const intro = useIntro(1.8);

  useFrame((state, dt) => {
    const { viewport, size } = state;
    const narrow = size.width < 820;
    const k = easeOutBack(clamp(intro.current));
    const unit = narrow
      ? Math.min(viewport.width * 0.52, viewport.height * 0.22) / 4.2
      : Math.min(viewport.height * 0.6, viewport.width * 0.38) / 4.2;
    rig.current.scale.setScalar(Math.max(0.01, unit * k));
    const tx = narrow ? 0 : viewport.width * 0.24;
    const ty = narrow ? viewport.height * 0.27 : 0;
    rig.current.position.x += (tx - rig.current.position.x) * Math.min(1, dt * 6);
    rig.current.position.y += (ty - rig.current.position.y) * Math.min(1, dt * 6);

    knot.current.rotation.y += dt * 0.35 * speed();
    knot.current.rotation.x += dt * 0.12 * speed();
    cage.current.rotation.y -= dt * 0.18 * speed();
    rig.current.rotation.y += (pointer.x * 0.5 * speed() - rig.current.rotation.y) * Math.min(1, dt * 3);
    rig.current.rotation.x += (-pointer.y * 0.3 * speed() - rig.current.rotation.x) * Math.min(1, dt * 3);
  });

  return (
    <>
      <StageLights />
      <group ref={rig} scale={0.01}>
        <mesh ref={knot}>
          <torusKnotGeometry args={[1.05, 0.34, 320, 36, 2, 3]} />
          <meshPhysicalMaterial color="#ff5a1a" metalness={1} roughness={0.16} clearcoat={1} clearcoatRoughness={0.08} emissive="#ff3a00" emissiveIntensity={0.12} />
        </mesh>
        <mesh ref={cage} scale={1.3}>
          <icosahedronGeometry args={[1.7, 1]} />
          <meshBasicMaterial color="#ffb066" wireframe transparent opacity={0.16} />
        </mesh>
      </group>
      <Dust count={500} rmin={3} rmax={7} size={0.08} opacity={0.7} />
      <Sparkles count={50} scale={[10, 6, 5]} size={3} speed={0.35} color="#ffb066" opacity={0.7} />
    </>
  );
}
