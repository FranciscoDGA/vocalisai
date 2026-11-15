import React from 'react';

export default function BrazilFlag({ className = "w-5 h-3.5" }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 720 504" 
      className={`rounded-[2px] inline-block shrink-0 shadow-[0_0.5px_2px_rgba(0,0,0,0.15)] ${className}`}
    >
      {/* Green Field */}
      <rect width="720" height="504" fill="#009c3b" />
      {/* Yellow Rhombus */}
      <polygon points="360,42 672,252 360,462 48,252" fill="#ffdf00" />
      {/* Blue Celestial Globe */}
      <circle cx="360" cy="252" r="126" fill="#002776" />
      {/* White Arc (Ordem e Progresso band) */}
      <path 
        d="M 234 252 A 126 126 0 0 0 486 252 A 132 132 0 0 1 234 252" 
        fill="#ffffff" 
      />
    </svg>
  );
}
