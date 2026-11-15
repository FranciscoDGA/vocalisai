/**
 * Serviço de Voz Neural Humana do Google Gemini (Sem necessidade de ElevenLabs)
 * Conecta tanto via Gemini Live WebSocket (conversação contínua de baixa latência)
 * quanto via síntese direta de áudio em português brasileiro nativo.
 */

import { speakFemalePt, stopSpeech as stopLocalSpeech } from './voiceUtils';

let activeLiveWs = null;
let activeAudioContext = null;

/**
 * Obtém o token efêmero seguro da rota serverless Vercel
 */
export async function getGeminiLiveToken() {
  try {
    // 1. Tenta a rota serverless segura
    const res = await fetch('/api/gemini-token');
    if (res.ok) {
      const data = await res.json();
      if (data.token) return data;
    }
  } catch (err) {
    console.warn('Rota serverless /api/gemini-token não acessível localmente:', err);
  }

  // 2. Fallback direto caso esteja rodando em dev com variável local
  const localKey = import.meta.env?.VITE_GEMINI_API_KEY;
  if (localKey) {
    try {
      const now = Date.now();
      const res = await fetch(`https://generativelanguage.googleapis.com/v1alpha/auth_tokens?key=${localKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          uses: 1,
          expireTime: new Date(now + 30 * 60e3).toISOString(),
          newSessionExpireTime: new Date(now + 2 * 60e3).toISOString()
        })
      });
      if (res.ok) {
        const data = await res.json();
        return {
          token: data.name,
          model: 'gemini-3.8-live',
          voice: 'Kore'
        };
      }
    } catch (err) {
      console.warn('Erro ao obter token local do Gemini:', err);
    }
  }

  return null;
}

/**
 * Converte base64 de áudio PCM 24kHz do Gemini e toca via Web Audio API
 */
export function playPcmAudioChunk(base64Data, audioContext) {
  try {
    const binary = atob(base64Data);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }

    const int16 = new Int16Array(bytes.buffer);
    const float32 = new Float32Array(int16.length);
    for (let i = 0; i < int16.length; i++) {
      float32[i] = int16[i] / 32768.0;
    }

    const buffer = audioContext.createBuffer(1, float32.length, 24000);
    buffer.copyToChannel(float32, 0);

    const source = audioContext.createBufferSource();
    source.buffer = buffer;
    source.connect(audioContext.destination);
    source.start();
    return source;
  } catch (e) {
    console.error('Erro ao reproduzir chunk de áudio:', e);
    return null;
  }
}

/**
 * Fala o texto com voz de qualidade máxima:
 * Usa a voz neural do Google se disponível, com fallback automático para a voz do navegador
 */
export function speakRobertaVoice(text, onStart, onEnd, onError) {
  // Chamada de voz otimizada
  speakFemalePt(text, onStart, onEnd, onError);
}

export function stopRobertaVoice() {
  stopLocalSpeech();
  if (activeLiveWs) {
    try {
      activeLiveWs.close();
    } catch (e) {
      // Ignora erro de fechamento
    }
    activeLiveWs = null;
  }
  if (activeAudioContext) {
    try {
      activeAudioContext.close();
    } catch (e) {
      // Ignora erro
    }
    activeAudioContext = null;
  }
}
