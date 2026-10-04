import { Reveal, SectionHead } from '../components/Reveal';
import { ART } from '../components/Art';
import { ArrowIcon } from '../components/Icons';
import { experience, projects } from '../data/portfolio';
import { scrollToTarget } from '../hooks';

const SYSTEM_TAB = { 'smmart-crm': 'crm', 'meta-integration': 'meta', smartdesk: 'smartdesk', 'ai-rag': 'ai' };

const stackOf = (p) => p.architecture?.stack || p.technologies || p.libraries || p.areas?.slice(0, 4) || [];

function openSystem(id) {
  window.dispatchEvent(new CustomEvent('open-system', { detail: SYSTEM_TAB[id] }));
  scrollToTarget('#systems');
}

export function WorkSection() {
  const smmart = experience.find((e) => e.id === 'smmart');
  const intern = experience.find((e) => e.id === '404-developers');

  return (
    <section className="section" id="work" aria-labelledby="work-title">
      <SectionHead
        index="03"
        kicker="My professional work"
        id="work-title"
        title={<>Production systems with <em>real responsibility</em>.</>}
      >
        Where I&rsquo;ve applied my skills: a full-time role at Smmart running AWS infrastructure and live sales
        pipelines, and a three-month engineering internship at !404 Developers.
      </SectionHead>

      <Reveal className="card role" tilt>
        <div className="role-main">
          <div className="role-top">
            <span className="chip">Full-time · Joined 10 Nov 2025</span>
            <span className="live"><i /> Active in production</span>
          </div>
          <h3 className="role-title">{smmart.company}</h3>
          <p className="role-meta">{smmart.role} · {smmart.durationLabel}</p>
          <p className="role-lead">{smmart.summary}</p>
          <p className="role-body">{smmart.description}</p>
        </div>

        <div className="role-side">
          <h4 className="label">Modules I engineered</h4>
          <ul className="chips">
            {smmart.modules.map((m) => <li key={m}>{m}</li>)}
          </ul>
          <h4 className="label">Stack</h4>
          <p className="stack-line">{smmart.technologies.join('  ·  ')}</p>
        </div>
      </Reveal>

      {intern && (
        <Reveal className="card role role-compact" tilt delay={1}>
          <div className="role-main">
            <div className="role-top">
              <span className="chip">Remote internship · 3 months</span>
              <span className="when">Jun – Aug 2025</span>
            </div>
            <h3 className="role-title role-title-sm">{intern.company}</h3>
            <p className="role-meta">{intern.role}</p>
            <p className="role-body">{intern.description}</p>
          </div>
          <div className="role-side">
            <h4 className="label">Stack</h4>
            <p className="stack-line">{intern.technologies.join('  ·  ')}</p>
          </div>
        </Reveal>
      )}

      <div className="projects">
        {projects.map((p, i) => {
          const Art = ART[p.id];
          return (
            <Reveal key={p.id} as="article" className="card project" tilt delay={i % 2}>
              <div className="project-art">{Art && <Art />}</div>
              <div className="project-body">
                <span className="chip">{p.tag}</span>
                <h3>{p.name}</h3>
                <p className="project-problem">{p.problem}</p>
                {p.myRole && <p className="project-role">{p.myRole}</p>}
                <ul className="pills">
                  {stackOf(p).map((t) => <li key={t}>{t}</li>)}
                </ul>
                <button type="button" className="link-btn" data-cursor onClick={() => openSystem(p.id)}>
                  See the architecture <ArrowIcon size={15} />
                </button>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

export default WorkSection;
