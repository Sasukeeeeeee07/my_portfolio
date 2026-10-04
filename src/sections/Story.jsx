import { Reveal, SectionHead } from '../components/Reveal';
import { Stage } from '../components/Stage';
import { useCountUp, useInView } from '../hooks';

function Stat({ value, suffix = '', text, label, note, delay }) {
  const [ref, inView] = useInView({ threshold: 0.4 });
  const n = useCountUp(value ?? 0, inView);
  return (
    <Reveal className="card stat" tilt delay={delay}>
      <div ref={ref} className="stat-number">
        {text ?? `${n}${suffix}`}
      </div>
      <div className="stat-label">{label}</div>
      <p>{note}</p>
    </Reveal>
  );
}

export function StorySection() {
  return (
    <section className="section" id="story" aria-labelledby="story-title">
      <SectionHead
        index="01"
        kicker="My story & origin"
        id="story-title"
        title={<>How I became an engineer. <em>Driven by mechanics, not trends.</em></>}
      />

      <div className="story-grid">
        <Reveal className="card story-copy" tilt={false}>
          <p className="story-lead">
            I didn&rsquo;t just study computer science to get a degree; I fell in love with the machinery underneath.
          </p>
          <p>
            My academic journey began with <strong>80% in HSC</strong>, which led me into a{' '}
            <strong>BSc in Information Technology</strong>. I wanted to understand how data moves across networks,
            how relational tables organise truth, and how software solves human problems.
          </p>
          <p>
            I continued into my <strong>Master of Computer Applications</strong> at AIMSR. By focusing on principles
            rather than memorising syntax, I completed my MCA and <strong>secured the 14th Rank across the entire
            University</strong>.
          </p>
          <p>
            Before finishing my master&rsquo;s, I sharpened my engineering through a{' '}
            <strong>3-month remote internship at !404 Developers</strong> (June&ndash;August 2025). On{' '}
            <strong>10 November 2025</strong> I joined <strong>Smmart Training Consultancy and Services</strong> as a
            Software Engineer, taking ownership of the core CRM platform, the AWS EC2/RDS infrastructure and the
            automated Meta lead pipelines.
          </p>
        </Reveal>

        <div className="story-side">
          <Reveal>
            <Stage scene="ascent" className="stage-tall" label="Fig. 01 — Ascent">
              <ol className="stage-legend" aria-label="Milestones, bottom to top">
                <li>HSC</li>
                <li>BSc IT</li>
                <li>MCA</li>
                <li>Smmart</li>
              </ol>
            </Stage>
          </Reveal>

          <div className="stats">
            <Stat value={14} suffix="th" label="University rank in MCA" note="Across the entire University cohort." delay={0} />
            <Stat value={80} suffix="%" label="HSC, science & maths" note="The base that led into BSc IT and computing." delay={1} />
            <Stat text="Nov 2025" label="Joined Smmart full-time" note="Core CRM, AWS cloud and Meta integrations." delay={2} />
            <Stat text="!404" label="Developers internship" note="3-month remote engineering, June–Aug 2025." delay={3} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default StorySection;
