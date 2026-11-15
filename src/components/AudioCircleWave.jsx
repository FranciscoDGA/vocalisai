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
        className={`absolute -inset-2.5 rounded-full border border-[#F0D5C7]/70 bg-gradient-to-tr from-[#C84B1F]/10 via-[#F3DFD6]/30 to-transparent pointer-events-none transition-all ${
          isPlaying ? 'animate-ping opacity-75' : 'animate-circle-glow'
        }`} 
      />

      {/* Second Inner Ring (Fine Peach Border) */}
      <div className="absolute -inset-1 rounded-full border border-[#E8D4C8]/80 pointer-events-none shadow-[0_0_24px_rgba(200,75,31,0.18)]" />

      {/* Main Dark Circular Button */}
      <button
        type="button"
        onClick={onToggle}
        className={`group relative ${sizeClasses} rounded-full bg-[#11100F] border border-[#2A2724] shadow-2xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer overflow-hidden z-10`}
        title={isPlaying ? "Clique para pausar" : "Clique para ouvir a voz neural em tempo real"}
      >
        {/* Subtle Ambient Radial Glow inside circle */}
        <div className="absolute inset-0 bg-radial from-[#C84B1F]/15 via-transparent to-transparent pointer-events-none" />

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
                    ? 'bg-gradient-to-t from-[#E25C2B] via-[#FF9E7D] to-white shadow-[0_0_8px_rgba(255,158,125,0.7)]'
                    : 'bg-gradient-to-t from-[#A63812] via-[#C84B1F] to-[#E25C2B] shadow-[0_0_4px_rgba(200,75,31,0.35)]'
                }`}
              />
            );
          })}
        </div>
      </button>
    </div>
  );
}
