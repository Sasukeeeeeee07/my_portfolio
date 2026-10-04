import { useEffect, useRef, useState } from 'react';
import { Reveal, SectionHead } from '../components/Reveal';
import { Stage } from '../components/Stage';
import { subscribeScroll } from '../hooks';
import { clamp } from '../lib/runtime';

// Oldest first: the path on the right draws itself in the same order.
const timeline = [
  {
    id: 'hsc',
    when: 'Higher Secondary',
    title: 'Higher Secondary Certificate',
    place: 'Junior College · 80%',
    text: 'Scored 80% with an emphasis on science, mathematics and analytical problem-solving, which opened the door into software engineering.',
    badge: '80% in HSC',
  },
  {
    id: 'bsc',
    when: 'Undergraduate',
    title: 'BSc Information Technology',
    place: 'University of Mumbai',
    text: 'Built the fundamentals: object-oriented programming, data structures, relational database internals and networking.',
    badge: 'BSc IT completed',
  },
  {
    id: 'mca',
    when: 'Postgraduate',
    title: 'Master of Computer Applications',
    place: 'AIMSR · 14th Rank in University',
    text: 'Completed my MCA and secured the 14th Rank across the entire University, with depth in algorithms, distributed databases and systems design.',
    badge: '14th rank · MCA completed',
  },
  {
    id: '404',
    when: 'Jun – Aug 2025',
    title: 'Software Engineering Intern',
    place: '!404 Developers · Remote',
    text: 'Three months in an agile squad: shipped web features, built RESTful endpoints, and took part in sprint planning and code reviews.',
    badge: '3-month remote internship',
  },
  {
    id: 'smmart',
    when: '10 Nov 2025 – Present',
    title: 'Software Engineer',
    place: 'Smmart Training Consultancy & Services',
    text: 'I run the enterprise CRM ecosystem: production AWS EC2 and RDS, GitHub Actions deployments, and real-time Meta Lead Ads webhook gateways for multi-city sales.',
    badge: 'Full-time · Joined 10 Nov 2025',
  },
  {
    id: 'lab',
    when: 'Always on',
    title: 'AI Systems & IoT Engineering',
    place: 'Agents, RAG & ESP32-S3',
    text: 'Beyond client systems I build autonomous AI pipelines with local Ollama models, MCP and Whisper, plus custom ESP32-S3 sensor hardware.',
    badge: 'Continuous building',
  },
];

export function JourneySection() {
  const track = useRef(null);
  const progress = useRef(0); // read by the 3D path every frame
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    let fractions = [];

    const measure = () => {
      const h = el.offsetHeight || 1;
      fractions = [...el.querySelectorAll('.tl-item')].map((n) => (n.offsetTop + 40) / h);
    };

    const update = () => {
      if (!fractions.length) return;
      const rect = el.getBoundingClientRect();
      const p = clamp((window.innerHeight * 0.55 - rect.top) / rect.height);
      el.style.setProperty('--p', p.toFixed(4));

      // map page progress onto the path so node i lights exactly when item i reaches the reading line
      const last = fractions.length - 1;
      let s;
      if (p <= fractions[0]) s = 0;
      else if (p >= fractions[last]) s = 1;
      else {
        const i = fractions.findIndex((f, k) => p >= f && p < fractions[k + 1]);
        s = (i + (p - fractions[i]) / (fractions[i + 1] - fractions[i])) / last;
      }
      progress.current = s;

      let idx = 0;
      fractions.forEach((f, k) => { if (p >= f - 0.002) idx = k; });
      setActive((prev) => (prev === idx ? prev : idx));
    };

    measure();
    update();
    const unsub = subscribeScroll(update);
    const ro = new ResizeObserver(() => { measure(); update(); });
    ro.observe(el);
    return () => { unsub(); ro.disconnect(); };
  }, []);

  return (
    <section className="section" id="journey" aria-labelledby="journey-title">
      <SectionHead
        index="02"
        kicker="My trajectory & record"
        id="journey-title"
        title={<>My chronological <em>engineering journey</em>.</>}
      >
        From 80% in HSC and a 14th-rank MCA, to interning at !404 Developers and taking charge of production AWS
        systems at Smmart. Scroll, and the path on the right follows.
      </SectionHead>

      <div className="journey-grid">
        <ol className="timeline" ref={track}>
          {timeline.map((t, i) => (
            <li key={t.id} className={`tl-item ${i <= active ? 'reached' : ''} ${i === active ? 'current' : ''}`}>
              <span className="tl-dot" aria-hidden="true" />
              <Reveal className="card tl-card" tilt>
                <span className="chip">{t.when}</span>
                <h3>{t.title}</h3>
                <h4>{t.place}</h4>
                <p>{t.text}</p>
                <span className="badge">{t.badge}</span>
              </Reveal>
            </li>
          ))}
        </ol>

        <div className="journey-stage">
          <Stage scene="path" className="stage-fill" label="Fig. 02 — Trajectory" progress={progress}>
            <div className="stage-readout" aria-hidden="true">
              <small>Now at</small>
              <b>{timeline[active].title}</b>
            </div>
          </Stage>
        </div>
      </div>
    </section>
  );
}

export default JourneySection;
