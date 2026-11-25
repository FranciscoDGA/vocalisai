/**
 * Formata uma duração em segundos para `MM:SS` (< 1h) ou `HH:MM:SS` (>= 1h).
 * Garante que segundos e minutos nunca ultrapassem 59 (ex.: 63 -> "01:03", nunca "00:63").
 */
export function formatDuration(totalSeconds) {
  const numeric = typeof totalSeconds === 'number' ? totalSeconds : Number(totalSeconds);
  if (!Number.isFinite(numeric) || numeric <= 0) {
    return '00:00';
  }

  const wholeSeconds = Math.floor(numeric);
  const hours = Math.floor(wholeSeconds / 3600);
  const minutes = Math.floor((wholeSeconds % 3600) / 60);
  const seconds = wholeSeconds % 60;

  const mm = String(minutes).padStart(2, '0');
  const ss = String(seconds).padStart(2, '0');

  if (hours > 0) {
    const hh = String(hours).padStart(2, '0');
    return `${hh}:${mm}:${ss}`;
  }

  return `${mm}:${ss}`;
}
