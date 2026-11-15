import React from 'react';

const WAVE_BARS = [14, 26, 38, 22, 34, 40, 28, 18, 24];

export default function AudioCircleWave({ 
  isPlaying = false, 
  onToggle, 
  size = 'md',
  className = '' 
}) {
  const sizeClasses = {
    sm: 'w-20 h-20',
    md: 'w-24 h-24 sm:w-28 sm:h-28',
    lg: 'w-28 h-28 sm:w-32 sm:h-32'
  }[size] || 'w-24 h-24 sm:w-28 sm:h-28';

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      {/* Outer Glowing Breathing Ring (Loop Suave) */}
      <div 
        className={`absolute -inset-2.5 rounded-full border border-indigo-200/60 bg-gradient-to-tr from-[#4F46E5]/15 via-indigo-100/30 to-transparent pointer-events-none transition-all ${
          isPlaying ? 'animate-ping opacity-75' : 'animate-circle-glow'
        }`} 
      />

      {/* Second Inner Ring (Fine Indigo Border) */}
      <div className="absolute -inset-1 rounded-full border border-indigo-200/80 pointer-events-none shadow-[0_0_24px_rgba(79,70,229,0.2)]" />

      {/* Main Dark Circular Button */}
      <button
        type="button"
        onClick={onToggle}
        className={`group relative ${sizeClasses} rounded-full bg-[#0F0E17] border border-[#232136] shadow-2xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer overflow-hidden z-10`}
        title={isPlaying ? "Clique para pausar" : "Clique para ouvir a voz neural em tempo real"}
      >
        {/* Subtle Ambient Radial Glow inside circle */}
        <div className="absolute inset-0 bg-radial from-[#4F46E5]/25 via-transparent to-transparent pointer-events-none" />

        {/* Waveform Bars in Continuous Natural Loop */}
        <div className="flex items-center gap-[4px] h-10 relative z-10">
          {WAVE_BARS.map((baseH, idx) => {
            const animIndex = (idx % 4) + 1;
            const animDelay = `${((idx % 9) * 0.1).toFixed(2)}s`;
            const duration = isPlaying ? '0.45s' : undefined;

            return (
              <span
                key={idx}
                style={{
                  height: `${isPlaying ? baseH * 1.15 : baseH}px`,
                  animationDelay: animDelay,
                  animationDuration: duration
                }}
                className={`w-[3.5px] rounded-full transition-colors duration-300 animate-wave-center-${animIndex} ${
                  isPlaying
                    ? 'bg-gradient-to-t from-[#4F46E5] via-[#818CF8] to-white shadow-[0_0_10px_rgba(129,140,248,0.8)]'
                    : 'bg-gradient-to-t from-[#3730A3] via-[#4F46E5] to-[#818CF8] shadow-[0_0_5px_rgba(79,70,229,0.4)]'
                }`}
              />
            );
          })}
        </div>
      </button>
    </div>
  );
}
