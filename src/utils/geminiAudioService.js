/**
 * Serviço de Voz Neural Humana do Google Gemini (Voz Real de Alta Fidelidade)
 * Elimina completamente as vozes robóticas do Windows/SpeechSynthesis
 * tocando áudio WAV real sintetizado pelos modelos neurais do Google.
 */

import { speakFemalePt as fallbackBrowserSpeech, stopSpeech as stopLocalBrowserSpeech } from './voiceUtils';

let currentAudioElement = null;
const audioMemoryCache = new Map();

/**
 * Converte base64 de áudio PCM linear 16-bit 24kHz em Blob WAV reproduzível pelo navegador
 */
function pcmBase64ToWavUrl(pcmBase64, sampleRate = 24000) {
  const binary = atob(pcmBase64);
  const len = binary.length;
  const pcmBytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    pcmBytes[i] = binary.charCodeAt(i);
  }

  const numChannels = 1;
  const bitsPerSample = 16;
  const byteRate = (sampleRate * numChannels * bitsPerSample) / 8;
  const blockAlign = (numChannels * bitsPerSample) / 8;
  const dataSize = pcmBytes.length;

  const header = new ArrayBuffer(44);
  const view = new DataView(header);

  // RIFF identifier
  view.setUint32(0, 0x52494646, false); // "RIFF"
  view.setUint32(4, 36 + dataSize, true);
  view.setUint32(8, 0x57415645, false); // "WAVE"
  // fmt sub-chunk
  view.setUint32(12, 0x666d7420, false); // "fmt "
  view.setUint32(16, 16, true); // Subchunk1Size (16 for PCM)
  view.setUint16(20, 1, true); // AudioFormat (1 for PCM)
  view.setUint16(22, numChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, byteRate, true);
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, bitsPerSample, true);
  // data sub-chunk
  view.setUint32(36, 0x64617461, false); // "data"
  view.setUint32(40, dataSize, true);

  const blob = new Blob([header, pcmBytes], { type: 'audio/wav' });
  return URL.createObjectURL(blob);
}

/**
 * Obtém URL de áudio WAV gerada pelo Google Gemini
 */
export async function fetchGeminiAudioUrl(text, voiceName = 'Kore') {
  const cacheKey = `${voiceName}:${text.trim().toLowerCase()}`;
  if (audioMemoryCache.has(cacheKey)) {
    return audioMemoryCache.get(cacheKey);
  }

  // 1. Tenta a rota serverless da Vercel
  try {
    const res = await fetch('/api/tts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, voice: voiceName })
    });
    if (res.ok) {
      const json = await res.json();
      if (json.audioBase64) {
        audioMemoryCache.set(cacheKey, json.audioBase64);
        return json.audioBase64;
      }
    }
  } catch {
    // Falha silenciosa para prosseguir para chamada direta
  }

  // 2. Se estiver em ambiente dev ou a rota falhar, chama direto a API do Gemini com a chave local
  const apiKey = import.meta.env?.VITE_GEMINI_API_KEY;
  if (apiKey) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-tts:generateContent?key=${apiKey}`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: text.slice(0, 500) }] }],
          generationConfig: {
            responseModalities: ['AUDIO'],
            speechConfig: {
              voiceConfig: {
                prebuiltVoiceConfig: {
                  voiceName
                }
              }
            }
          }
        })
      });

      if (res.ok) {
        const data = await res.json();
        const pcm = data.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
        if (pcm) {
          const wavUrl = pcmBase64ToWavUrl(pcm, 24000);
          audioMemoryCache.set(cacheKey, wavUrl);
          return wavUrl;
        }
      }
    } catch (e) {
      console.warn('Erro ao chamar Gemini TTS direto:', e);
    }
  }

  return null;
}

/**
 * Reproduz o texto com voz neural natural do Google (Roberta / Camila / Marcus)
 * Sem custo de ElevenLabs e com som humano real
 */
export async function speakRobertaVoice(text, onStart, onEnd, onError) {
  stopRobertaVoice();

  try {
    const audioUrl = await fetchGeminiAudioUrl(text, 'Kore');

    if (audioUrl) {
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
        console.warn('Erro na reprodução do áudio neural, usando fallback:', e);
        currentAudioElement = null;
        fallbackBrowserSpeech(text, onStart, onEnd, onError);
      };

      await audio.play();
      return;
    }
  } catch (err) {
    console.warn('Falha no motor de áudio Google, acionando fallback:', err);
  }

  // Fallback caso não haja conexão com a API do Gemini
  fallbackBrowserSpeech(text, onStart, onEnd, onError);
}

/**
 * Fala de acordo com a Persona selecionada (Roberta, Marcus, Camila)
 */
export async function speakPersonaVoice(personaKey = 'roberta', text, onStart, onEnd, onError) {
  stopRobertaVoice();

  let voiceName = 'Kore'; // Roberta (feminina acolhedora)
  if (personaKey === 'marcus') voiceName = 'Fenrir'; // Masculina firme
  if (personaKey === 'camila') voiceName = 'Puck'; // Feminina enérgica
  if (personaKey === 'leticia') voiceName = 'Aoede'; // Feminina suave

  try {
    const audioUrl = await fetchGeminiAudioUrl(text, voiceName);

    if (audioUrl) {
      const audio = new Audio(audioUrl);
      currentAudioElement = audio;

      audio.onplay = () => {
        if (onStart) onStart();
      };

      audio.onended = () => {
        currentAudioElement = null;
        if (onEnd) onEnd();
      };

      audio.onerror = () => {
        currentAudioElement = null;
        fallbackBrowserSpeech(text, onStart, onEnd, onError);
      };

      await audio.play();
      return;
    }
  } catch (err) {
    console.warn('Falha na persona de áudio Google:', err);
  }

  fallbackBrowserSpeech(text, onStart, onEnd, onError);
}

/**
 * Interrompe qualquer fala em andamento imediatamente
 */
export function stopRobertaVoice() {
  if (currentAudioElement) {
    try {
      currentAudioElement.pause();
      currentAudioElement.currentTime = 0;
    } catch {
      // Ignora erro
    }
    currentAudioElement = null;
  }
  stopLocalBrowserSpeech();
}

export const stopSpeech = stopRobertaVoice;
