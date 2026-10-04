// Tiny shared runtime state. Kept free of React and three so any layer can read it.

export const pointer = { x: 0, y: 0 }; // normalised -1..1, y up
export const motion = { reduced: false };

let fine = false;

if (typeof window !== 'undefined') {
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  motion.reduced = mq.matches;
  mq.addEventListener?.('change', (e) => { motion.reduced = e.matches; });

  const fq = window.matchMedia('(hover: hover) and (pointer: fine)');
  fine = fq.matches;
  fq.addEventListener?.('change', (e) => { fine = e.matches; });

  window.addEventListener(
    'pointermove',
    (e) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = -((e.clientY / window.innerHeight) * 2 - 1);
    },
    { passive: true }
  );
}

export const isFinePointer = () => fine;

let glOk;
export function hasWebGL() {
  if (glOk !== undefined) return glOk;
  try {
    const c = document.createElement('canvas');
    const gl = c.getContext('webgl2') || c.getContext('webgl');
    glOk = !!gl;
    gl?.getExtension('WEBGL_lose_context')?.loseContext();
  } catch {
    glOk = false;
  }
  return glOk;
}

export const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
