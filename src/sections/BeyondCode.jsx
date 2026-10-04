import { Reveal, SectionHead } from '../components/Reveal';
import { BrainIcon, ChipIcon, CricketIcon, DumbbellIcon } from '../components/Icons';
import { currentFocus, futureGoals } from '../data/portfolio';

const ITEMS = [
  {
    Icon: CricketIcon,
    label: 'Cricket & strategy',
    text: 'Patience, tactical reading of situations under pressure, and the mental stamina I take from the relentless consistency of Virat Kohli.',
  },
  {
    Icon: DumbbellIcon,
    label: 'Physical training',
    text: 'Disciplined conditioning, and the habit of showing up every single day regardless of mood.',
  },
  {
    Icon: BrainIcon,
    label: 'First-principles learning',
    text: 'Deconstructing distributed protocols, studying system architectures and collecting high-leverage mental models.',
  },
  {
    Icon: ChipIcon,
    label: 'Tinkering & hardware',
    text: 'Taking code into the physical world through microcontrollers, wireless telemetry and sensors.',
  },
];

export function BeyondSection() {
  return (
    <section className="section" id="beyond" aria-labelledby="beyond-title">
      <SectionHead
        index="07"
        kicker="My human dimension"
        id="beyond-title"
        title={<>Outside the <em>terminal</em>.</>}
      >
        Discipline is domain-agnostic. The mental models I build on the cricket pitch and in daily fitness inform how
        I approach and debug hard engineering problems.
      </SectionHead>

      <div className="beyond-grid">
        {ITEMS.map(({ Icon, label, text }, i) => (
          <Reveal key={label} className="card beyond-card" tilt delay={i}>
            <span className="beyond-icon"><Icon /></span>
            <h3>{label}</h3>
            <p>{text}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Ledger({ tag, title, items, accent }) {
  return (
    <Reveal className={`card ledger ${accent}`} tilt>
      <span className="chip">{tag}</span>
      <h3>{title}</h3>
      <ol>
        {items.map((t, i) => (
          <li key={t}>
            <b>{String(i + 1).padStart(2, '0')}</b>
            <span>{t}</span>
          </li>
        ))}
      </ol>
    </Reveal>
  );
}

export function NowFutureSection() {
  return (
    <section className="section" id="now" aria-labelledby="now-title">
      <SectionHead
        index="08"
        kicker="My direction & ambition"
        id="now-title"
        title={<>What I&rsquo;m <em>building toward</em>.</>}
      >
        An honest ledger of what I am learning now and where I am steering my career.
      </SectionHead>

      <div className="ledgers">
        <Ledger tag="Current focus" title="What I am learning" items={currentFocus} accent="a" />
        <Ledger tag="Long-term horizon" title="Where I am heading" items={futureGoals} accent="b" />
      </div>
    </section>
  );
}
