// Hand-drawn 24px line icons so nothing depends on the OS emoji font.
const base = {
  width: 26,
  height: 26,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
};

export const CricketIcon = () => (
  <svg {...base}>
    <path d="M14.5 3.5l6 6-9.2 9.2-3-3z" />
    <path d="M8.3 15.7L4 20l-1-1 4.3-4.3" />
    <circle cx="19" cy="19" r="2" />
  </svg>
);

export const DumbbellIcon = () => (
  <svg {...base}>
    <path d="M6.5 6.5v11M17.5 6.5v11M3.5 9v6M20.5 9v6M6.5 12h11" />
  </svg>
);

export const BrainIcon = () => (
  <svg {...base}>
    <path d="M9 4a3 3 0 00-3 3 3 3 0 00-2 2.8A3 3 0 005 14a3 3 0 003 3.4A3 3 0 0012 19V6a2 2 0 00-3-2z" />
    <path d="M15 4a3 3 0 013 3 3 3 0 012 2.8A3 3 0 0119 14a3 3 0 01-3 3.4A3 3 0 0112 19" />
  </svg>
);

export const ChipIcon = () => (
  <svg {...base}>
    <rect x="6" y="6" width="12" height="12" rx="2" />
    <rect x="9.5" y="9.5" width="5" height="5" rx="1" />
    <path d="M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3" />
  </svg>
);

export const ArrowIcon = ({ size = 16 }) => (
  <svg {...base} width={size} height={size} strokeWidth={2}>
    <path d="M7 17L17 7M8 7h9v9" />
  </svg>
);

export const StarIcon = () => (
  <svg {...base} width={16} height={16} fill="currentColor" stroke="none">
    <path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.7 7-6.3-3.8-6.3 3.8 1.7-7L2 9.2l7.1-.6z" />
  </svg>
);
