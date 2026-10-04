import { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import { motion, clamp } from '../lib/runtime';

/* ------------------------------------------------------------------ scroll */
let lenisRef = null;
const subscribers = new Set();

/** Smooth scroll. Holds no React state, so scrolling never re-renders the page. */
export function useLenisScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: motion.reduced ? 1 : 0.095,
      smoothWheel: !motion.reduced,
      touchMultiplier: 1.2,
    });
    lenisRef = lenis;

    const emit = (scroll, limit) => {
      const progress = limit > 0 ? clamp(scroll / limit) : 0;
      subscribers.forEach((fn) => fn(progress, scroll));
    };
    lenis.on('scroll', ({ scroll, limit }) => emit(scroll, limit));
    emit(lenis.scroll, lenis.limit);

    let raf;
    const loop = (t) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      lenisRef = null;
    };
  }, []);
}

/** fn(progress 0..1, scrollY). Returns an unsubscribe function. */
export function subscribeScroll(fn) {
  subscribers.add(fn);
  return () => subscribers.delete(fn);
}

export function lockScroll(locked) {
  if (!lenisRef) return;
  locked ? lenisRef.stop() : lenisRef.start();
}

export function scrollToTarget(target) {
  const el = typeof target === 'string' ? document.querySelector(target) : target;
  if (!el) return;
  if (lenisRef) lenisRef.scrollTo(el, { offset: -84, duration: 1.1 });
  else el.scrollIntoView({ behavior: motion.reduced ? 'auto' : 'smooth' });
}

/* ------------------------------------------------------------------ in-view */
// threshold stays near 0 on purpose: a fractional threshold never fires on very tall elements
export function useInView({ threshold = 0.01, rootMargin = '0px 0px -10% 0px', once = true } = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) io.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, rootMargin, once]);

  return [ref, inView];
}

/**
 * Scroll spy. A section is "active" while it crosses a thin band at the
 * vertical centre of the viewport, so tall and short sections behave the same.
 */
export function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const visible = new Map();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => visible.set(e.target.id, e.isIntersecting));
        const current = ids.find((id) => visible.get(id));
        if (current) setActive(current);
      },
      { rootMargin: '-45% 0px -54% 0px', threshold: 0 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [ids]);

  return active;
}

/* --------------------------------------------------------------------- tilt */
export function useTilt(enabled = true, max = 7) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled || motion.reduced) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    let raf = 0;
    let rect = null;
    let next = null;

    const apply = () => {
      raf = 0;
      if (!next) return;
      el.style.setProperty('--rx', `${next.rx.toFixed(2)}deg`);
      el.style.setProperty('--ry', `${next.ry.toFixed(2)}deg`);
      el.style.setProperty('--mx', `${next.mx.toFixed(1)}%`);
      el.style.setProperty('--my', `${next.my.toFixed(1)}%`);
    };
    const enter = () => {
      rect = el.getBoundingClientRect();
      el.classList.add('is-tilting');
    };
    const move = (e) => {
      if (!rect) rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      next = { rx: -(py - 0.5) * max, ry: (px - 0.5) * max * 1.3, mx: px * 100, my: py * 100 };
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const leave = () => {
      rect = null;
      next = { rx: 0, ry: 0, mx: 50, my: 50 };
      el.classList.remove('is-tilting');
      if (!raf) raf = requestAnimationFrame(apply);
    };

    el.addEventListener('pointerenter', enter);
    el.addEventListener('pointermove', move, { passive: true });
    el.addEventListener('pointerleave', leave);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener('pointerenter', enter);
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerleave', leave);
    };
  }, [enabled, max]);

  return ref;
}

/* ------------------------------------------------------------------ count up */
export function useCountUp(target, active, duration = 1400) {
  const [value, setValue] = useState(motion.reduced ? target : 0);

  useEffect(() => {
    if (!active || motion.reduced) {
      if (motion.reduced) setValue(target);
      return;
    }
    let raf;
    const t0 = performance.now();
    const tick = (now) => {
      const p = clamp((now - t0) / duration);
      setValue(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, active, duration]);

  return value;
}
