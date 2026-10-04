import { createElement } from 'react';
import { useInView, useTilt } from '../hooks';

/**
 * One wrapper for scroll-reveal + optional pointer tilt.
 * Reveal uses the individual `translate` property and tilt uses `transform`,
 * so both can live on the same element without fighting.
 */
export function Reveal({ as = 'div', className = '', delay = 0, tilt = false, children, style, ...rest }) {
  const [ref, inView] = useInView();
  const tiltRef = useTilt(tilt);

  const setRefs = (node) => {
    ref.current = node;
    tiltRef.current = node;
  };

  return createElement(
    as,
    {
      ref: setRefs,
      className: `reveal ${tilt ? 'tilt' : ''} ${inView ? 'is-in' : ''} ${className}`.trim(),
      style: { '--delay': `${delay * 90}ms`, ...style },
      ...rest,
    },
    children
  );
}

export function SectionHead({ index, kicker, title, id, children }) {
  return (
    <header className="section-head">
      <Reveal className="section-kicker">
        <span>
          {index} // {kicker}
        </span>
      </Reveal>
      <Reveal as="h2" id={id} className="section-title" delay={1}>
        {title}
      </Reveal>
      {children && (
        <Reveal as="p" className="section-desc" delay={2}>
          {children}
        </Reveal>
      )}
    </header>
  );
}
