const ITEMS = [
  'PHP', 'CodeIgniter', 'MySQL', 'AWS EC2', 'AWS RDS', 'GitHub Actions', 'Meta Graph API', 'Webhooks',
  'Node.js', 'React', 'Java', 'ESP32-S3', 'RAG', 'MCP', 'Ollama', 'Whisper', 'n8n', 'Linux',
];

/** Slow ticker under the hero — pure CSS, paused for reduced-motion. */
export function Marquee() {
  const row = ITEMS.map((t) => (
    <span key={t}>
      {t}
      <i aria-hidden="true">✦</i>
    </span>
  ));
  return (
    <div className="marquee" aria-label="Technologies I work with">
      <div className="marquee-track" aria-hidden="true">
        <div>{row}</div>
        <div>{row}</div>
      </div>
    </div>
  );
}
