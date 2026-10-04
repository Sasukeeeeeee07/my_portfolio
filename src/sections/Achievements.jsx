import { Reveal, SectionHead } from '../components/Reveal';
import { Stage } from '../components/Stage';
import { StarIcon } from '../components/Icons';
import { events } from '../data/portfolio';

export function AchievementsSection() {
  return (
    <section className="section" id="achievements" aria-labelledby="achievements-title">
      <SectionHead
        index="06"
        kicker="Recognition & citations"
        id="achievements-title"
        title={<>Academic distinction & <em>community</em>.</>}
      >
        A record of academic diligence and active contribution to the wider engineering ecosystem.
      </SectionHead>

      <div className="ach-grid">
        <Reveal className="card spotlight" tilt>
          <div className="spotlight-copy">
            <span className="rank-badge"><StarIcon /> University academic honours</span>
            <h3><em>14th Rank</em> in University</h3>
            <p className="spotlight-sub">Master of Computer Applications · University of Mumbai</p>
            <p>
              I was honoured to secure the 14th Rank across the entire University in my MCA at AIMSR. It reflects
              how I study: computational theory, distributed databases and systems architecture, from first
              principles.
            </p>
            <div className="merit">
              <span>Foundational merit</span>
              <b>80% in Higher Secondary Certificate (HSC)</b>
            </div>
          </div>
          <div className="spotlight-stage">
            <Stage scene="medal" className="stage-fill" label="Fig. 05 — Rank" />
          </div>
        </Reveal>

        <div className="events">
          {events.map((e, i) => (
            <Reveal key={e.id} className="card event" tilt delay={i + 1}>
              <span className="event-meta">{e.role} · {e.date}</span>
              <h4>{e.event}</h4>
              <p>{e.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AchievementsSection;
