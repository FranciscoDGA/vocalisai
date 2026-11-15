import React from 'react';

/**
 * VocalisLogo — Símbolo de onda sonora em formato de "V" estilizado (V-Wave).
 * Identidade 100% proprietária da Vocalis AI, distante de qualquer traço do Kloel.
 */
export default function VocalisLogo({ size = 'md', light = false, showTag = false, className = '' }) {
  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10'
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl'
  };

  const barH = {
    sm: 'h-3.5',
    md: 'h-4.5',
    lg: 'h-6'
  };

  return (
    <div className={`flex items-center gap-2.5 shrink-0 ${className}`}>
      {/* V-Wave Icon Badge with glowing gradient */}
      <div 
        className={`${iconSizes[size] || iconSizes.md} rounded-xl bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] flex items-center justify-center shadow-sm shadow-indigo-500/25 shrink-0`}
      >
        <svg viewBox="0 0 24 24" fill="none" className="w-[62%] h-[62%]" stroke="currentColor">
          {/* Sound bars tapering down to center forming a dynamic V */}
          <path d="M4 7v10" stroke="white" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M8 4v16" stroke="white" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M12 11v2" stroke="white" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M16 4v16" stroke="white" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M20 7v10" stroke="white" strokeWidth="2.4" strokeLinecap="round" />
        </svg>
      </div>

      {/* Typography */}
      <div className="flex items-center gap-1 leading-none">
        <span 
          className={`${textSizes[size] || textSizes.md} font-bold tracking-tight font-sans ${
            light ? 'text-white' : 'text-[#1A1816]'
          }`}
        >
          Vocalis
        </span>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] font-extrabold text-lg sm:text-xl">
          AI
        </span>
        {showTag && (
          <span className="ml-1.5 px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-200">
            PRO
          </span>
        )}
      </div>
    </div>
  );
}
