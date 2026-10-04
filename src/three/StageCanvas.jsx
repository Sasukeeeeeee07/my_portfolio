import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PresentationControls } from '@react-three/drei';
import * as THREE from 'three';
import { isFinePointer } from '../lib/runtime';
import { Env } from './common';
import { HeroScene, AscentScene, PathScene } from './scenesA';
import { SystemsScene, GlobeScene, MedalScene, KnotScene } from './scenesB';

/**
 * cam   – camera position
 * fov   – field of view
 * drag  – allow drag-to-rotate (fine pointers only; never on touch, so scrolling is untouched)
 * env   – environment-map strength
 */
const SCENES = {
  hero: { Component: HeroScene, cam: [0, 0, 8], fov: 40, env: 0.95, exposure: 1.05 },
  ascent: { Component: AscentScene, cam: [0, 0.4, 9], fov: 38, env: 1, drag: true },
  path: { Component: PathScene, cam: [0, 3, 9.2], fov: 38, env: 0.9 },
  systems: { Component: SystemsScene, cam: [0, 0.2, 8.4], fov: 40, env: 1, drag: true },
  globe: { Component: GlobeScene, cam: [0, 0, 8], fov: 40, env: 0.9, drag: true },
  medal: { Component: MedalScene, cam: [0, 0.2, 7.2], fov: 38, env: 1.1, drag: true },
  knot: { Component: KnotScene, cam: [0, 0, 8], fov: 40, env: 1, exposure: 1.1 },
};

/** Reports back once real pixels have been drawn, so placeholders can fade out. */
function Ready({ onReady }) {
  const frames = useRef(0);
  useFrame(() => {
    if (frames.current === 4) onReady?.();
    frames.current++;
  });
  return null;
}

export default function StageCanvas({ scene, live, onReady, ...props }) {
  const def = SCENES[scene];
  if (!def) return null;
  const { Component } = def;
  const body = <Component {...props} />;

  return (
    <Canvas
      className="stage-canvas"
      camera={{ position: def.cam, fov: def.fov, near: 0.1, far: 60 }}
      dpr={[1, 1.75]}
      frameloop={live ? 'always' : 'never'}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = def.exposure || 1.1;
        gl.setClearColor(0x000000, 0);
      }}
    >
      <Env intensity={def.env} />
      <Ready onReady={onReady} />
      {def.drag && isFinePointer() ? (
        <PresentationControls global snap speed={1.6} polar={[-0.35, 0.35]} azimuth={[-1.1, 1.1]}>
          {body}
        </PresentationControls>
      ) : (
        body
      )}
    </Canvas>
  );
}
