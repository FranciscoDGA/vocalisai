import React from 'react';

// Perfil padrão de harmônicos vocais (36 barras) usado nos banners escuros de CTA
const DEFAULT_HEIGHTS = [
  12, 18, 26, 38, 22, 15, 30, 48, 55, 32, 20, 35, 50, 42, 28, 18, 24, 38,
  54, 30, 22, 40, 52, 45, 30, 16, 25, 36, 48, 32, 19, 28, 42, 24, 15, 10
];

const PALETTES = {
  ember: 'bg-gradient-to-t from-[#B04118] via-[#E25C2B] to-[#F39C6B] shadow-[0_0_6px_rgba(226,92,43,0.35)]',
  indigo: 'bg-gradient-to-t from-[#312E81] via-[#4F46E5] to-[#A5B4FC] shadow-[0_0_6px_rgba(99,102,241,0.4)]'
};

/**
 * Onda sonora animada com legenda ilustrativa estática (sem simulação aleatória de latência).
 */
export default function LiveSoundwaveBars({
  heights = DEFAULT_HEIGHTS,
  palette = 'ember',
  className = 'mt-12',
  heightClass = 'h-14',
  showLatency = true,
  caption = 'Visualização ilustrativa de áudio · Português brasileiro',
  latencySuffix,
}) {
  const barColor = PALETTES[palette] || PALETTES.ember;
  const displayCaption = caption || (latencySuffix ? `Visualização ilustrativa · ${latencySuffix}` : 'Visualização ilustrativa de áudio · Português brasileiro');

  return (
    <div className={`relative z-10 flex flex-col items-center ${className}`}>
      <div className={`w-full flex items-end justify-center gap-1 sm:gap-1.5 ${heightClass} opacity-80`} aria-hidden="true">
        {heights.map((height, i) => (
          <span
            key={i}
            className={`w-1 sm:w-1.5 rounded-full animate-freq-${(i % 4) + 1} ${barColor}`}
            style={{ height: `${height}%`, animationDelay: `${((i % 12) * 0.07).toFixed(2)}s` }}
          />
        ))}
      </div>

      {showLatency && (
        <div className="flex items-center gap-2 text-[10px] sm:text-[11px] font-mono text-[#A8A49C] mt-4">
          <span className="inline-flex rounded-full h-2 w-2 bg-[#6366F1]" aria-hidden="true" />
          <span>{displayCaption}</span>
        </div>
      )}
    </div>
  );
}
