import React, { useEffect, useState } from 'react';

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
 * Onda sonora animada (frequência em movimento) + indicador de latência ao vivo.
 * Animação 100% CSS via transform (GPU), sem custo de re-render nas barras.
 */
export default function LiveSoundwaveBars({
  heights = DEFAULT_HEIGHTS,
  palette = 'ember',
  className = 'mt-12',
  heightClass = 'h-14',
  showLatency = true,
  latencyLabel = 'Latência',
  latencySuffix = 'Voz neural brasileira ao vivo',
  minLatency = 310,
  maxLatency = 420
}) {
  const [latency, setLatency] = useState(Math.round((minLatency + maxLatency) / 2));

  useEffect(() => {
    if (!showLatency) return undefined;
    const timer = setInterval(() => {
      setLatency(Math.round(minLatency + Math.random() * (maxLatency - minLatency)));
    }, 1400);
    return () => clearInterval(timer);
  }, [showLatency, minLatency, maxLatency]);

  const barColor = PALETTES[palette] || PALETTES.ember;

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
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span>
            {latencyLabel}{' '}
            <span className="text-emerald-400 font-semibold tabular-nums transition-colors">{latency}ms</span>
            <span className="hidden sm:inline"> · {latencySuffix}</span>
          </span>
        </div>
      )}
    </div>
  );
}
