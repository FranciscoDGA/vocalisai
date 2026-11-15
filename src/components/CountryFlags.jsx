import React from 'react';

export function FlagBR({ className = "w-6 h-4" }) {
  return (
    <svg viewBox="0 0 720 504" className={`rounded-[2px] object-cover shrink-0 ${className}`}>
      <rect width="720" height="504" fill="#009c3b" />
      <polygon points="360,42 672,252 360,462 48,252" fill="#ffdf00" />
      <circle cx="360" cy="252" r="126" fill="#002776" />
      <path d="M 234 252 A 126 126 0 0 0 486 252 A 132 132 0 0 1 234 252" fill="#ffffff" />
    </svg>
  );
}

export function FlagPT({ className = "w-6 h-4" }) {
  return (
    <svg viewBox="0 0 600 400" className={`rounded-[2px] object-cover shrink-0 ${className}`}>
      <rect width="240" height="400" fill="#006600" />
      <rect x="240" width="360" height="400" fill="#ff0000" />
      <circle cx="240" cy="200" r="70" fill="#ffcc00" stroke="#000" strokeWidth="2" />
      <rect x="210" y="160" width="60" height="80" rx="6" fill="#ffffff" stroke="#ff0000" strokeWidth="8" />
    </svg>
  );
}

export function FlagES({ className = "w-6 h-4" }) {
  return (
    <svg viewBox="0 0 750 500" className={`rounded-[2px] object-cover shrink-0 ${className}`}>
      <rect width="750" height="500" fill="#c60b1e" />
      <rect y="125" width="750" height="250" fill="#ffc400" />
      <circle cx="200" cy="250" r="35" fill="#c60b1e" />
    </svg>
  );
}

export function FlagUS({ className = "w-6 h-4" }) {
  return (
    <svg viewBox="0 0 741 390" className={`rounded-[2px] object-cover shrink-0 ${className}`}>
      <rect width="741" height="390" fill="#b22234" />
      <path d="M0,30h741M0,90h741M0,150h741M0,210h741M0,270h741M0,330h741" stroke="#fff" strokeWidth="30" />
      <rect width="296" height="210" fill="#3c3b6e" />
      <circle cx="70" cy="50" r="12" fill="#fff" />
      <circle cx="150" cy="50" r="12" fill="#fff" />
      <circle cx="230" cy="50" r="12" fill="#fff" />
      <circle cx="110" cy="110" r="12" fill="#fff" />
      <circle cx="190" cy="110" r="12" fill="#fff" />
      <circle cx="70" cy="160" r="12" fill="#fff" />
      <circle cx="150" cy="160" r="12" fill="#fff" />
      <circle cx="230" cy="160" r="12" fill="#fff" />
    </svg>
  );
}

export function FlagUK({ className = "w-6 h-4" }) {
  return (
    <svg viewBox="0 0 600 300" className={`rounded-[2px] object-cover shrink-0 ${className}`}>
      <rect width="600" height="300" fill="#012169" />
      <path d="M0,0 L600,300 M600,0 L0,300" stroke="#fff" strokeWidth="60" />
      <path d="M0,0 L600,300 M600,0 L0,300" stroke="#c8102e" strokeWidth="20" />
      <path d="M300,0 V300 M0,150 H600" stroke="#fff" strokeWidth="100" />
      <path d="M300,0 V300 M0,150 H600" stroke="#c8102e" strokeWidth="60" />
    </svg>
  );
}

export function FlagFR({ className = "w-6 h-4" }) {
  return (
    <svg viewBox="0 0 900 600" className={`rounded-[2px] object-cover shrink-0 ${className}`}>
      <rect width="300" height="600" fill="#002395" />
      <rect x="300" width="300" height="600" fill="#ffffff" />
      <rect x="600" width="300" height="600" fill="#ed2939" />
    </svg>
  );
}

export function FlagDE({ className = "w-6 h-4" }) {
  return (
    <svg viewBox="0 0 500 300" className={`rounded-[2px] object-cover shrink-0 ${className}`}>
      <rect width="500" height="100" fill="#000000" />
      <rect y="100" width="500" height="100" fill="#dd0000" />
      <rect y="200" width="500" height="100" fill="#ffce00" />
    </svg>
  );
}

export function FlagIT({ className = "w-6 h-4" }) {
  return (
    <svg viewBox="0 0 900 600" className={`rounded-[2px] object-cover shrink-0 ${className}`}>
      <rect width="300" height="600" fill="#009246" />
      <rect x="300" width="300" height="600" fill="#ffffff" />
      <rect x="600" width="300" height="600" fill="#ce2b37" />
    </svg>
  );
}

export function FlagMX({ className = "w-6 h-4" }) {
  return (
    <svg viewBox="0 0 700 400" className={`rounded-[2px] object-cover shrink-0 ${className}`}>
      <rect width="233" height="400" fill="#006847" />
      <rect x="233" width="234" height="400" fill="#ffffff" />
      <rect x="467" width="233" height="400" fill="#ce1126" />
      <circle cx="350" cy="200" r="30" fill="#8b5a2b" />
    </svg>
  );
}

export function FlagAR({ className = "w-6 h-4" }) {
  return (
    <svg viewBox="0 0 800 500" className={`rounded-[2px] object-cover shrink-0 ${className}`}>
      <rect width="800" height="166.7" fill="#74acdf" />
      <rect y="166.7" width="800" height="166.7" fill="#ffffff" />
      <rect y="333.4" width="800" height="166.7" fill="#74acdf" />
      <circle cx="400" cy="250" r="32" fill="#f6b40e" />
    </svg>
  );
}

export function FlagNL({ className = "w-6 h-4" }) {
  return (
    <svg viewBox="0 0 900 600" className={`rounded-[2px] object-cover shrink-0 ${className}`}>
      <rect width="900" height="200" fill="#ae1c28" />
      <rect y="200" width="900" height="200" fill="#ffffff" />
      <rect y="400" width="900" height="200" fill="#21468b" />
    </svg>
  );
}

export function FlagPL({ className = "w-6 h-4" }) {
  return (
    <svg viewBox="0 0 800 500" className={`rounded-[2px] object-cover shrink-0 border border-stone-200/80 ${className}`}>
      <rect width="800" height="250" fill="#ffffff" />
      <rect y="250" width="800" height="250" fill="#dc143c" />
    </svg>
  );
}

export const FlagGB = FlagUK;

export function FlagJP({ className = "w-6 h-4" }) {
  return (
    <svg viewBox="0 0 900 600" className={`rounded-[2px] object-cover shrink-0 ${className}`}>
      <rect width="900" height="600" fill="#ffffff" />
      <circle cx="450" cy="300" r="180" fill="#bc002d" />
    </svg>
  );
}
