import { useEffect, useRef } from 'react';
import { motion } from '../lib/runtime';

/**
 * Four small illustrations for the project cards. Pure SVG + SMIL, so they cost
 * nothing at runtime and honour reduced-motion (animations are paused).
 */
function useCalm(ref) {
  useEffect(() => {
    if (motion.reduced) ref.current?.pauseAnimations?.();
  }, [ref]);
}

const Frame = ({ children, svgRef, label }) => (
  <svg ref={svgRef} className="art-svg" viewBox="0 0 400 200" role="img" aria-label={label} preserveAspectRatio="xMidYMid slice">
    <defs>
      <linearGradient id="artBg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#241711" />
        <stop offset="1" stopColor="#0e0908" />
      </linearGradient>
      <linearGradient id="artBar" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#ff7a2e" />
        <stop offset="1" stopColor="#ff4a00" />
      </linearGradient>
      <radialGradient id="artGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0" stopColor="#ff6a1f" stopOpacity=".45" />
        <stop offset="1" stopColor="#ff6a1f" stopOpacity="0" />
      </radialGradient>
      <pattern id="artDots" width="16" height="16" patternUnits="userSpaceOnUse">
        <circle cx="1.5" cy="1.5" r="1" fill="#ffffff" opacity=".07" />
      </pattern>
    </defs>
    <rect width="400" height="200" fill="url(#artBg)" />
    <rect width="400" height="200" fill="url(#artDots)" />
    {children}
  </svg>
);

/** SPANCO funnel: six bars stepping down, with a rising conversion line. */
export function CrmArt() {
  const ref = useRef(null);
  useCalm(ref);
  const heights = [132, 112, 92, 72, 54, 38];
  const labels = ['S', 'P', 'A', 'N', 'C', 'O'];
  return (
    <Frame svgRef={ref} label="Sales pipeline bars stepping down from Suspecting to Order">
      <ellipse cx="310" cy="40" rx="120" ry="70" fill="url(#artGlow)" />
      {heights.map((h, i) => (
        <g key={i}>
          <rect
            className="art-bar"
            style={{ '--i': i }}
            x={34 + i * 56}
            y={166 - h}
            width="38"
            height={h}
            rx="6"
            fill="url(#artBar)"
            opacity={1 - i * 0.1}
          />
          <text x={53 + i * 56} y="186" textAnchor="middle" fill="#c9b8aa" fontSize="11" fontFamily="JetBrains Mono, monospace">
            {labels[i]}
          </text>
        </g>
      ))}
      <path d="M52 52 C 110 40, 150 80, 200 70 S 300 110, 350 130" fill="none" stroke="#fff1de" strokeWidth="2" strokeDasharray="5 6" className="art-dash" />
      <circle r="5" fill="#fff1de">
        <animateMotion dur="5s" repeatCount="indefinite" path="M52 52 C 110 40, 150 80, 200 70 S 300 110, 350 130" />
      </circle>
    </Frame>
  );
}

/** Facebook lead → webhook → verify → ingest, with beads moving along the path. */
export function MetaArt() {
  const ref = useRef(null);
  useCalm(ref);
  const path = 'M52 100 H148 M148 100 H252 M252 100 H348';
  return (
    <Frame svgRef={ref} label="Lead ads event flowing through a webhook gateway into a database">
      <ellipse cx="200" cy="100" rx="170" ry="70" fill="url(#artGlow)" />
      <path d="M52 100 H348" stroke="#ff8a3d" strokeWidth="2" strokeDasharray="4 7" className="art-dash" opacity=".7" />
      <rect x="28" y="76" width="48" height="48" rx="12" fill="#1877f2" />
      <text x="52" y="108" textAnchor="middle" fill="#fff" fontSize="26" fontWeight="700" fontFamily="DM Sans, sans-serif">f</text>
      <polygon points="148,70 176,85 176,115 148,130 120,115 120,85" fill="#ff5a1a" />
      <path d="M138 100 l8 8 l14 -16" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M252 72 l26 10 v20 c0 14 -10 24 -26 30 c-16 -6 -26 -16 -26 -30 v-20z" fill="none" stroke="#fff1de" strokeWidth="3" strokeLinejoin="round" />
      <ellipse cx="348" cy="82" rx="26" ry="9" fill="#2cff9a" opacity=".9" />
      <path d="M322 82 v34 c0 5 12 9 26 9 s26 -4 26 -9 v-34" fill="#134d36" opacity=".85" />
      <path d="M322 100 c0 5 12 9 26 9 s26 -4 26 -9" fill="none" stroke="#2cff9a" strokeWidth="1.5" opacity=".6" />
      {[0, 1, 2].map((i) => (
        <circle key={i} r="5" fill="#fff1de">
          <animateMotion dur="4.2s" begin={`${i * 1.4}s`} repeatCount="indefinite" path={path} />
        </circle>
      ))}
      <text x="52" y="152" textAnchor="middle" fill="#c9b8aa" fontSize="10" fontFamily="JetBrains Mono, monospace">LEAD</text>
      <text x="148" y="152" textAnchor="middle" fill="#c9b8aa" fontSize="10" fontFamily="JetBrains Mono, monospace">WEBHOOK</text>
      <text x="252" y="152" textAnchor="middle" fill="#c9b8aa" fontSize="10" fontFamily="JetBrains Mono, monospace">VERIFY</text>
      <text x="348" y="152" textAnchor="middle" fill="#c9b8aa" fontSize="10" fontFamily="JetBrains Mono, monospace">STORE</text>
    </Frame>
  );
}

/** ESP32 board with a live-looking waveform screen and a PIR sensor pinging. */
export function DeskArt() {
  const ref = useRef(null);
  useCalm(ref);
  return (
    <Frame svgRef={ref} label="Microcontroller board with a display and a motion sensor">
      <ellipse cx="200" cy="100" rx="150" ry="70" fill="url(#artGlow)" />
      <rect x="70" y="40" width="260" height="124" rx="12" fill="#0f2a22" stroke="#1d4a3b" strokeWidth="2" />
      <rect x="92" y="56" width="150" height="92" rx="6" fill="#06141f" stroke="#35d0ff" strokeOpacity=".5" />
      <path
        d="M98 102 q10 -30 20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0"
        fill="none"
        stroke="#35d0ff"
        strokeWidth="2.4"
        strokeLinecap="round"
        className="art-wave"
      />
      <rect x="100" y="124" width="46" height="5" rx="2.5" fill="#ff6a1f" />
      <rect x="100" y="134" width="30" height="5" rx="2.5" fill="#ff6a1f" opacity=".6" />
      <rect x="262" y="58" width="48" height="34" rx="4" fill="#0b0b0c" stroke="#3a3a3c" />
      <text x="286" y="79" textAnchor="middle" fill="#8a8a8e" fontSize="8" fontFamily="JetBrains Mono, monospace">ESP32</text>
      <circle cx="286" cy="124" r="14" fill="#f4f1ea" />
      {[0, 1, 2].map((i) => (
        <circle key={i} cx="286" cy="124" r="14" fill="none" stroke="#35d0ff" strokeWidth="1.5">
          <animate attributeName="r" values="14;46" dur="2.4s" begin={`${i * 0.8}s`} repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.8;0" dur="2.4s" begin={`${i * 0.8}s`} repeatCount="indefinite" />
        </circle>
      ))}
      {[84, 316].flatMap((x) => [52, 152].map((y) => [x, y])).map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3" fill="#d4a017" />
      ))}
    </Frame>
  );
}

/** Documents feeding a small network — retrieval, reasoning, answer. */
export function AiArt() {
  const ref = useRef(null);
  useCalm(ref);
  const layers = [
    [[170, 56], [170, 100], [170, 144]],
    [[236, 40], [236, 84], [236, 128], [236, 168]],
    [[302, 70], [302, 130]],
  ];
  const edges = [];
  layers.forEach((l, li) => {
    if (!layers[li + 1]) return;
    l.forEach((a) => layers[li + 1].forEach((b) => edges.push([a, b])));
  });
  return (
    <Frame svgRef={ref} label="Documents flowing into a neural network that produces an answer">
      <ellipse cx="250" cy="100" rx="150" ry="80" fill="url(#artGlow)" />
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${44 + i * 6} ${70 + i * 7})`}>
          <rect width="64" height="80" rx="6" fill="#2a1d15" stroke="#ff8a3d" strokeOpacity=".5" />
          <rect x="10" y="14" width="40" height="4" rx="2" fill="#ff8a3d" opacity=".7" />
          <rect x="10" y="26" width="30" height="4" rx="2" fill="#c9b8aa" opacity=".5" />
          <rect x="10" y="38" width="36" height="4" rx="2" fill="#c9b8aa" opacity=".5" />
        </g>
      ))}
      <path d="M120 112 H160" stroke="#ff8a3d" strokeWidth="2" strokeDasharray="4 5" className="art-dash" />
      {edges.map(([a, b], i) => (
        <line key={i} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke="#ff8a3d" strokeOpacity=".28" />
      ))}
      {layers.flat().map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="8" fill={i > 6 ? '#fff1de' : '#ff6a1f'}>
          <animate attributeName="opacity" values="1;.45;1" dur={`${2 + (i % 4) * 0.5}s`} repeatCount="indefinite" />
        </circle>
      ))}
      <rect x="338" y="86" width="44" height="28" rx="14" fill="#2cff9a" opacity=".9" />
      <path d="M350 100 h20 M364 94 l6 6 l-6 6" fill="none" stroke="#06241a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </Frame>
  );
}

export const ART = { 'smmart-crm': CrmArt, 'meta-integration': MetaArt, smartdesk: DeskArt, 'ai-rag': AiArt };
