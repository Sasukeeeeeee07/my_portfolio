import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { hasWebGL } from '../lib/runtime';

// The whole three.js stack lives in this chunk, so the page text paints first.
const StageCanvas = lazy(() => import('../three/StageCanvas'));

/**
 * A 3D "window" placed in the normal page flow.
 * - the canvas mounts only when the stage is near the viewport and is torn
 *   down again when it is far away, so at most two or three WebGL contexts
 *   ever exist at once;
 * - while it is on screen it renders, otherwise the frame loop is paused.
 */
export function Stage({ scene, className = '', label, children, eager = false, ...props }) {
  const ref = useRef(null);
  const [near, setNear] = useState(eager);
  const [live, setLive] = useState(eager);
  const [ready, setReady] = useState(false);
  const [gl] = useState(() => hasWebGL());

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) {
      setNear(true);
      setLive(true);
      return;
    }
    const a = new IntersectionObserver(([e]) => setNear(e.isIntersecting), { rootMargin: '600px 0px' });
    const b = new IntersectionObserver(([e]) => setLive(e.isIntersecting), { rootMargin: '30px 0px' });
    a.observe(el);
    b.observe(el);
    return () => {
      a.disconnect();
      b.disconnect();
    };
  }, []);

  return (
    <div ref={ref} className={`stage ${ready ? 'is-ready' : ''} ${className}`} data-scene={scene} aria-hidden="true">
      <span className="stage-glow" aria-hidden="true" />
      {scene === 'hero' && <span className="hero-orb" aria-hidden="true" />}
      {gl && near && (
        <Suspense fallback={null}>
          <StageCanvas scene={scene} live={live} onReady={() => setReady(true)} {...props} />
        </Suspense>
      )}
      {label && (
        <span className="stage-label" aria-hidden="true">
          {label}
        </span>
      )}
      {children}
    </div>
  );
}
