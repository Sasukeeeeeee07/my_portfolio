import { useState } from 'react';
import { Reveal } from '../components/Reveal';
import { Stage } from '../components/Stage';
import { ArrowIcon } from '../components/Icons';
import { person } from '../data/portfolio';

export function ContactSection() {
  const [copied, setCopied] = useState(false);
  const { email, linkedin, github, resume } = person.contact;

  // only channels that have a real value are rendered
  const channels = [
    email && { label: 'Email', href: `mailto:${email}` },
    linkedin && { label: 'LinkedIn', href: linkedin },
    github && { label: 'GitHub', href: github },
    resume && { label: 'Résumé', href: resume },
  ].filter(Boolean);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <section className="contact" id="contact" aria-labelledby="contact-title">
      <Stage scene="knot" className="stage-band" />
      <div className="contact-inner">
        <Reveal className="section-kicker on-dark">
          <span>09 // Connect directly with me</span>
        </Reveal>
        <Reveal as="h2" id="contact-title" className="contact-title" delay={1}>
          Let&rsquo;s build something <em>extraordinary</em>.
        </Reveal>
        <Reveal as="p" className="contact-lead" delay={2}>
          I&rsquo;m open to high-impact software engineering roles, distributed-systems challenges, AI engineering
          opportunities and ambitious collaborations.
        </Reveal>

        {channels.length > 0 && (
          <Reveal className="channels" delay={3}>
            {email && (
              <button type="button" className="btn-primary" data-cursor onClick={copy}>
                {copied ? 'Copied to clipboard' : email}
              </button>
            )}
            {channels.map((c) => (
              <a
                key={c.label}
                className="btn-ghost"
                data-cursor
                href={c.href}
                target={c.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
              >
                {c.label} <ArrowIcon size={14} />
              </a>
            ))}
          </Reveal>
        )}

        <Reveal className="location" delay={4}>
          <i /> Based in Mumbai, India · IST (UTC+5:30)
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div>
        <b>CHIRAG YADAV</b>
        <span> / </span>
        <span>My personal digital record</span>
      </div>
      <div>Built with React, three.js &amp; Lenis</div>
    </footer>
  );
}
