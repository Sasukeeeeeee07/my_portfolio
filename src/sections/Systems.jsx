import { useEffect, useState } from 'react';
import { Reveal, SectionHead } from '../components/Reveal';
import { Stage } from '../components/Stage';
import { projects } from '../data/portfolio';

const byId = (id) => projects.find((p) => p.id === id);

const TABS = [
  { id: 'crm', n: '01', label: 'Smmart CRM', project: 'smmart-crm', figure: 'Fig. 03 — CRM on AWS' },
  { id: 'meta', n: '02', label: 'Meta Webhook Gateway', project: 'meta-integration', figure: 'Fig. 03 — Webhook gateway' },
  { id: 'smartdesk', n: '03', label: 'SmartDesk ESP32', project: 'smartdesk', figure: 'Fig. 03 — SmartDesk board' },
  { id: 'ai', n: '04', label: 'AI & RAG', project: 'ai-rag', figure: 'Fig. 03 — Retrieval network' },
];

function Steps({ items, tag }) {
  return (
    <ol className="steps">
      {items.map((s, i) => (
        <li key={s.key} style={{ '--i': i }}>
          <span className="step-n">{tag} {String(i + 1).padStart(2, '0')}{s.kicker ? ` · ${s.kicker}` : ''}</span>
          <b>{s.title}</b>
          {s.note && <span className="step-note">{s.note}</span>}
        </li>
      ))}
    </ol>
  );
}

function Panel({ tab }) {
  const p = byId(tab.project);

  if (tab.id === 'crm') {
    const layers = [
      ['Application', p.architecture.stack],
      ['Infrastructure', p.architecture.infrastructure],
      ['Integrations', p.architecture.integrations],
    ];
    return (
      <>
        <p className="panel-lead">{p.problem}</p>
        <p className="panel-role">{p.myRole}</p>
        <h4 className="label">SPANCO sales pipeline</h4>
        <Steps
          tag="Stage"
          items={p.spanco.map((s, i) => ({ key: s, title: s, note: p.spancoNotes[i] }))}
        />
        <h4 className="label">Architecture layers</h4>
        <div className="layers">
          {layers.map(([name, list]) => (
            <div key={name}>
              <span>{name}</span>
              <ul className="pills">{list.map((t) => <li key={t}>{t}</li>)}</ul>
            </div>
          ))}
        </div>
        <h4 className="label">Engineering challenges solved</h4>
        <ul className="bullets">
          {p.challenges.map((c) => <li key={c}>{c}</li>)}
        </ul>
      </>
    );
  }

  if (tab.id === 'meta') {
    return (
      <>
        <p className="panel-lead">{p.problem}</p>
        <p className="panel-role">{p.myRole}</p>
        <h4 className="label">Real-time webhook pipeline</h4>
        <Steps
          tag="Step"
          items={p.architecture.flow.map((s) => ({ key: s.step, kicker: s.label, title: s.name, note: s.sub }))}
        />
        <ul className="pills spaced">{p.technologies.map((t) => <li key={t}>{t}</li>)}</ul>
      </>
    );
  }

  if (tab.id === 'smartdesk') {
    const h = p.hardware;
    return (
      <>
        <p className="panel-lead">{p.problem}</p>
        <p className="panel-role">{p.myRole}</p>
        <div className="spec-grid">
          <div className="spec">
            <h4 className="label">Core hardware</h4>
            <dl>
              <dt>MCU</dt><dd>{h.primary}</dd>
              <dt>Display</dt><dd>{h.display}</dd>
              <dt>Touch</dt><dd>{h.touch}</dd>
            </dl>
          </div>
          <div className="spec">
            <h4 className="label">Sensors & telemetry</h4>
            <dl>
              <dt>Sensors</dt><dd>{h.sensors.join(' · ')}</dd>
              <dt>Links</dt><dd>{h.connectivity.join(' · ')}</dd>
            </dl>
          </div>
        </div>
        <h4 className="label">Firmware libraries</h4>
        <ul className="pills">{p.libraries.map((t) => <li key={t}>{t}</li>)}</ul>
      </>
    );
  }

  return (
    <>
      <p className="panel-lead">{p.problem}</p>
      <p className="panel-role">{p.myRole}</p>
      <h4 className="label">Areas I work in</h4>
      <Steps tag="Focus" items={p.areas.map((a) => ({ key: a, title: a }))} />
    </>
  );
}

export function SystemsSection() {
  const [tabId, setTabId] = useState('crm');
  const tab = TABS.find((t) => t.id === tabId);

  // "See the architecture" buttons in the Work section jump straight to a tab
  useEffect(() => {
    const handler = (e) => TABS.some((t) => t.id === e.detail) && setTabId(e.detail);
    window.addEventListener('open-system', handler);
    return () => window.removeEventListener('open-system', handler);
  }, []);

  const onKey = (e) => {
    const i = TABS.findIndex((t) => t.id === tabId);
    const next = e.key === 'ArrowRight' ? i + 1 : e.key === 'ArrowLeft' ? i - 1 : null;
    if (next === null) return;
    e.preventDefault();
    const t = TABS[(next + TABS.length) % TABS.length];
    setTabId(t.id);
    document.getElementById(`tab-${t.id}`)?.focus();
  };

  return (
    <section className="section" id="systems" aria-labelledby="systems-title">
      <SectionHead
        index="04"
        kicker="Architectural lab"
        id="systems-title"
        title={<>Systems & <em>Pipelines</em> explorer.</>}
      >
        Pick a system. The model on the right changes with it, and the notes below show how it is put together.
      </SectionHead>

      <Reveal className="card showcase">
        <div className="tabs" role="tablist" aria-label="Systems" onKeyDown={onKey}>
          {TABS.map((t) => (
            <button
              key={t.id}
              id={`tab-${t.id}`}
              type="button"
              role="tab"
              aria-selected={tabId === t.id}
              aria-controls="systems-panel"
              tabIndex={tabId === t.id ? 0 : -1}
              className={`tab ${tabId === t.id ? 'active' : ''}`}
              onClick={() => setTabId(t.id)}
            >
              <small>{t.n}</small> {t.label}
            </button>
          ))}
        </div>

        <div className="showcase-body">
          <div className="panel" id="systems-panel" role="tabpanel" aria-labelledby={`tab-${tabId}`} key={tabId}>
            <div className="panel-head">
              <h3>{byId(tab.project).name}</h3>
              <span className="chip">{byId(tab.project).tag}</span>
            </div>
            <Panel tab={tab} />
          </div>

          <div className="showcase-stage">
            <Stage scene="systems" model={tabId} className="stage-fill" label={tab.figure} />
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export default SystemsSection;
