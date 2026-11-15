import React from 'react';

// Perfil espectral de harmônicos vocais para visualizador completo (68 barras)
const FULL_SPECTRUM_HEIGHTS = [
  8, 10, 12, 11, 14, 16, 15, 18, 22, 20, 
  26, 32, 28, 35, 42, 38, 48, 44, 52, 46,
  58, 64, 52, 70, 78, 65, 54, 60, 72, 80,
  68, 55, 62, 75, 82, 70, 58, 64, 76, 68,
  56, 62, 50, 58, 48, 42, 46, 38, 35, 30,
  28, 34, 26, 24, 20, 22, 18, 16, 14, 15,
  12, 14, 11, 10, 9, 8, 7, 6
];

// Perfil compacto para modais (Login / Cadastro / Cards pequenos)
const COMPACT_SPECTRUM_HEIGHTS = [
  12, 22, 38, 30, 48, 24, 40, 18, 10
];

export default function AudioFrequencyWave({ 
  variant = 'full', 
  className = '', 
  showLatencyBadge = false,
  latencyText = 'Latência 380ms - 450ms • Voz neural brasileira'
}) {
  const isCompact = variant === 'compact';
  const heights = isCompact ? COMPACT_SPECTRUM_HEIGHTS : FULL_SPECTRUM_HEIGHTS;

  return (
    <div className={`w-full flex flex-col items-center ${className}`}>
      {/* Waveform Bar Container */}
      <div 
        className={`w-full flex items-end justify-center overflow-hidden ${
          isCompact ? 'gap-1 h-12' : 'gap-[2px] sm:gap-[3px] md:gap-1 h-16 sm:h-20 lg:h-24'
        }`}
      >
        {heights.map((baseH, idx) => {
          const animIndex = (idx % 4) + 1;
          const animDelay = `${((idx % 12) * 0.06).toFixed(2)}s`;

          return (
            <div
              key={idx}
              className={`flex items-end justify-center h-full ${
                isCompact ? 'w-1.5' : 'flex-1 max-w-[4px] sm:max-w-[5px]'
              }`}
            >
              <span
                style={{
                  height: `${baseH}px`,
                  animationDelay: animDelay
                }}
                className={`w-full rounded-full transition-all duration-300 animate-freq-${animIndex} ${
                  isCompact
                    ? 'bg-gradient-to-t from-[#4F46E5] via-[#6366F1] to-[#A5B4FC] shadow-[0_0_6px_rgba(99,102,241,0.5)]'
                    : 'bg-gradient-to-t from-[#312E81] via-[#4F46E5] to-[#A5B4FC] shadow-[0_0_8px_rgba(99,102,241,0.4)]'
                }`}
              />
            </div>
          );
        })}
      </div>

      {/* Latency / Live Voice Badge */}
      {showLatencyBadge && (
        <div className="flex items-center gap-2 text-[11px] font-mono text-[#A8A29E] mt-3">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>{latencyText}</span>
        </div>
      )}
    </div>
  );
}
