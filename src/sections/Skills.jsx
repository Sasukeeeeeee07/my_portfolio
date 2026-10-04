import { Reveal, SectionHead } from '../components/Reveal';
import { Stage } from '../components/Stage';
import { skills } from '../data/portfolio';

const LEGEND = [
  ['strong', 'Production strong'],
  ['working', 'Working knowledge'],
  ['exploring', 'Active exploration'],
];

export function SkillsSection() {
  const total = Object.values(skills).reduce((n, c) => n + c.items.length, 0);

  return (
    <section className="section" id="skills" aria-labelledby="skills-title">
      <SectionHead
        index="05"
        kicker="Capabilities & ecosystem"
        id="skills-title"
        title={<>Technical <em>ecosystem</em>.</>}
      >
        Graded with honest engineering discernment. Each of the {total} nodes on the globe is one skill below,
        coloured by how deep it runs.
      </SectionHead>

      <Reveal className="legend" delay={2}>
        {LEGEND.map(([level, label]) => (
          <span key={level}><i className={`dot level-${level}`} />{label}</span>
        ))}
      </Reveal>

      <div className="skills-grid">
        {Object.entries(skills).map(([key, cat], i) => (
          <Reveal key={key} className={`card skill-card area-${key}`} tilt delay={i % 2}>
            <h3>
              {cat.label}
              <small>{String(cat.items.length).padStart(2, '0')}</small>
            </h3>
            <ul className="skill-chips">
              {cat.items.map((s) => (
                <li key={s.name}>
                  <i className={`dot level-${s.level}`} />
                  {s.name}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}

        <Reveal className="skills-stage" delay={1}>
          <Stage scene="globe" className="stage-fill" label="Fig. 04 — Skill globe" />
        </Reveal>
      </div>
    </section>
  );
}

export default SkillsSection;
