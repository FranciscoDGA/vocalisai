/**
 * Serviço de Áudio Neural via Proxy Serverless (/api/tts).
 *
 * REGRAS DE SEGURANÇA E ARQUITETURA:
 * 1. Nenhuma chave de API (GEMINI_API_KEY / VITE_GEMINI_API_KEY) é lida ou usada no navegador.
 * 2. Este módulo não importa `voiceUtils.js` para evitar dependência circular e recursão infinita.
 */

let currentAudioElement = null;
const audioMemoryCache = new Map();

/**
 * Obtém URL de áudio WAV gerada pelo proxy serverless `/api/tts`.
 * Retorna `null` caso o servidor de síntese não esteja disponível.
 */
export async function fetchGeminiAudioUrl(text, voiceName = 'Kore') {
  const cleanText = String(text || '').trim();
  if (!cleanText) return null;

  const cacheKey = `${voiceName}:${cleanText.toLowerCase()}`;
  if (audioMemoryCache.has(cacheKey)) {
    return audioMemoryCache.get(cacheKey);
  }

  try {
    const res = await fetch('/api/tts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: cleanText.slice(0, 500), voice: voiceName }),
    });
    if (res.ok) {
      const json = await res.json();
      if (json?.audioBase64) {
        audioMemoryCache.set(cacheKey, json.audioBase64);
        return json.audioBase64;
      }
    }
  } catch {
    // Endpoint indisponível ou ambiente offline; o chamador decide o fallback local.
  }

  return null;
}

/**
 * Interrompe apenas o elemento `<audio>` neural ativo neste módulo.
 */
export function stopRobertaVoice() {
  if (currentAudioElement) {
    try {
      currentAudioElement.pause();
      currentAudioElement.currentTime = 0;
    } catch {
      // Ignora erro ao pausar elemento de áudio
    }
    currentAudioElement = null;
  }
}

export const stopSpeech = stopRobertaVoice;

async function playGeminiVoiceAudio(text, voiceName = 'Kore', onStart, onEnd, onError) {
  stopRobertaVoice();

  try {
    const audioUrl = await fetchGeminiAudioUrl(text, voiceName);
    if (!audioUrl) {
      if (onError) onError(new Error('TTS_UNAVAILABLE'));
      return false;
    }

    if (typeof Audio === 'undefined') {
      if (onError) onError(new Error('AUDIO_ELEMENT_UNAVAILABLE'));
      return false;
    }

    const audio = new Audio(audioUrl);
    currentAudioElement = audio;

    audio.onplay = () => {
      if (onStart) onStart();
    };

    audio.onended = () => {
      currentAudioElement = null;
      if (onEnd) onEnd();
    };

    audio.onerror = (e) => {
      currentAudioElement = null;
      if (onError) onError(e);
    };

    await audio.play();
    return true;
  } catch (err) {
    currentAudioElement = null;
    if (onError) onError(err);
    return false;
  }
}

/**
 * Reproduz texto com a voz neural padrão (Roberta / Kore) exclusivamente via `/api/tts`.
 * Em caso de falha, invoca `onError` uma única vez sem recursão.
 */
export function speakRobertaVoice(text, onStart, onEnd, onError) {
  return playGeminiVoiceAudio(text, 'Kore', onStart, onEnd, onError);
}

/**
 * Reproduz texto com a persona selecionada exclusivamente via `/api/tts`.
 */
export function speakPersonaVoice(personaKey = 'roberta', text, onStart, onEnd, onError) {
  let voiceName = 'Kore';
  if (personaKey === 'marcus') voiceName = 'Fenrir';
  if (personaKey === 'camila') voiceName = 'Puck';
  if (personaKey === 'leticia') voiceName = 'Aoede';

  return playGeminiVoiceAudio(text, voiceName, onStart, onEnd, onError);
}
