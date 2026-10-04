import { useEffect, useRef } from 'react';
import { isFinePointer, motion } from '../lib/runtime';

const INTERACTIVE = 'a, button, [data-cursor], input, textarea, [role="tab"]';

/** Dot + trailing ring. One delegated listener, so late-rendered elements work too. */
export function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);

  useEffect(() => {
    if (!isFinePointer()) return;
    const d = dot.current;
    const r = ring.current;
    let mx = 0;
    let my = 0;
    let rx = 0;
    let ry = 0;
    let raf;
    let shown = false;

    const show = (on) => {
      if (shown === on) return;
      shown = on;
      d.classList.toggle('on', on);
      r.classList.toggle('on', on);
    };
    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      if (!shown) {
        rx = mx;
        ry = my;
        show(true);
      }
      d.style.transform = `translate3d(${mx - 4}px, ${my - 4}px, 0)`;
    };
    const onOver = (e) => r.classList.toggle('hover', !!e.target.closest?.(INTERACTIVE));
    const onLeave = () => show(false);

    const loop = () => {
      const k = motion.reduced ? 1 : 0.2;
      rx += (mx - rx) * k;
      ry += (my - ry) * k;
      r.style.transform = `translate3d(${rx - 18}px, ${ry - 18}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerover', onOver, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerover', onOver);
      document.documentElement.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return (
    <>
      <div ref={dot} className="cursor-dot" aria-hidden="true" />
      <div ref={ring} className="cursor-ring" aria-hidden="true" />
    </>
  );
}
