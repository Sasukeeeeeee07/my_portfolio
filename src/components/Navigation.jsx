import { useEffect, useRef, useState } from 'react';
import { lockScroll, scrollToTarget, subscribeScroll } from '../hooks';
import { ArrowIcon } from './Icons';

export const NAV_LINKS = [
  { id: 'story', label: 'Story' },
  { id: 'journey', label: 'Journey' },
  { id: 'work', label: 'Work' },
  { id: 'systems', label: 'Systems' },
  { id: 'skills', label: 'Stack' },
  { id: 'achievements', label: 'Recognition' },
  { id: 'beyond', label: 'Beyond' },
  { id: 'contact', label: 'Contact' },
];

// sections that share a nav item
const ALIAS = { now: 'beyond' };

export function Navigation({ activeSection }) {
  const [open, setOpen] = useState(false);
  const bar = useRef(null);
  const num = useRef(null);
  const active = ALIAS[activeSection] || activeSection;

  // scroll telemetry writes straight to the DOM — no re-render per scroll tick
  useEffect(
    () =>
      subscribeScroll((p) => {
        const pct = Math.round(p * 100);
        if (bar.current) bar.current.style.transform = `scaleX(${p})`;
        if (num.current) num.current.textContent = String(pct).padStart(2, '0');
      }),
    []
  );

  useEffect(() => {
    lockScroll(open);
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      lockScroll(false);
    };
  }, [open]);

  const go = (id) => {
    setOpen(false);
    // let the menu release the scroll lock before scrolling
    setTimeout(() => scrollToTarget(`#${id}`), open ? 60 : 0);
  };

  return (
    <>
      <header className="hud" role="banner">
        <a
          href="#hero"
          className="hud-logo"
          aria-label="Chirag Yadav, back to top"
          onClick={(e) => {
            e.preventDefault();
            go('hero');
          }}
        >
          CY<span>.</span>
        </a>

        <nav className="hud-links" aria-label="Main">
          {NAV_LINKS.map((l) => (
            <button
              key={l.id}
              type="button"
              className={`hud-link ${active === l.id ? 'active' : ''}`}
              aria-current={active === l.id ? 'true' : undefined}
              onClick={() => go(l.id)}
            >
              {l.label}
            </button>
          ))}
        </nav>

        <div className="hud-right">
          <div className="hud-meter" aria-hidden="true">
            <span ref={num}>00</span>
            <i>
              <b ref={bar} />
            </i>
          </div>
          <button type="button" className="hud-cta" onClick={() => go('contact')}>
            Let&rsquo;s talk <ArrowIcon size={14} />
          </button>
          <button
            type="button"
            className={`hud-burger ${open ? 'open' : ''}`}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      <div id="mobile-menu" className={`menu ${open ? 'open' : ''}`} aria-hidden={!open}>
        <nav aria-label="Mobile">
          {NAV_LINKS.map((l, i) => (
            <button
              key={l.id}
              type="button"
              tabIndex={open ? 0 : -1}
              style={{ '--i': i }}
              className={active === l.id ? 'active' : ''}
              onClick={() => go(l.id)}
            >
              <small>{String(i + 1).padStart(2, '0')}</small>
              {l.label}
            </button>
          ))}
        </nav>
      </div>
    </>
  );
}

export default Navigation;
