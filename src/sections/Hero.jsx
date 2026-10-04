import { scrollToTarget } from '../hooks';
import { Stage } from '../components/Stage';
import { ArrowIcon } from '../components/Icons';

const FACTS = [
  { k: '14th', v: 'University rank, MCA' },
  { k: 'Nov 2025', v: 'Software Engineer at Smmart' },
  { k: 'AWS · AI · IoT', v: 'Cloud, agents & firmware' },
];

export function HeroSection() {
  return (
    <section className="hero" id="hero" aria-label="Introduction">
      <Stage scene="hero" className="stage-hero" eager />

      <div className="hero-content">
        <p className="hero-pill hero-in" style={{ '--d': 0 }}>
          <i /> Software Engineer · Smmart · 14th Rank MCA
        </p>

        <h1 className="hero-headline" aria-label="Chirag Yadav">
          <span className="mask">
            <span className="hero-in hero-first" style={{ '--d': 1 }}>Chirag</span>
          </span>
          <span className="mask">
            <span className="hero-in hero-last" style={{ '--d': 2 }}>Yadav</span>
          </span>
        </h1>

        <p className="hero-sub hero-in" style={{ '--d': 3 }}>
          I build the quiet machinery behind busy businesses: production backends, AWS infrastructure,
          real-time Meta API webhooks, and agentic AI systems.
        </p>

        <div className="hero-cta hero-in" style={{ '--d': 4 }}>
          <button type="button" className="btn-primary" data-cursor onClick={() => scrollToTarget('#work')}>
            Explore my work <ArrowIcon />
          </button>
          <button type="button" className="btn-secondary" data-cursor onClick={() => scrollToTarget('#story')}>
            My story
          </button>
        </div>

        <ul className="hero-facts hero-in" style={{ '--d': 5 }}>
          {FACTS.map((f) => (
            <li key={f.k}>
              <b>{f.k}</b>
              <span>{f.v}</span>
            </li>
          ))}
        </ul>
      </div>

      <a className="hero-cue" href="#story" aria-label="Scroll to story" onClick={(e) => { e.preventDefault(); scrollToTarget('#story'); }}>
        <span>Scroll</span>
        <i />
      </a>
    </section>
  );
}

export default HeroSection;
