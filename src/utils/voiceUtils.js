/**
 * Utilitário de Voz em Português do Brasil (Vocalis AI)
 * Orquestra áudio neural via `/api/tts` com fallback único para Web Speech API.
 */

import {
  speakRobertaVoice,
  speakPersonaVoice,
  stopRobertaVoice,
} from './geminiAudioService';

let cachedVoices = [];

export function isBrowserSpeechSupported() {
  return (
    typeof window !== 'undefined' &&
    'speechSynthesis' in window &&
    typeof window.SpeechSynthesisUtterance !== 'undefined'
  );
}

export function loadBrowserVoices() {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return [];
  }
  const loaded = window.speechSynthesis.getVoices();
  if (loaded && loaded.length > 0) {
    cachedVoices = loaded;
  }
  return cachedVoices;
}

if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  loadBrowserVoices();
  if (window.speechSynthesis.onvoiceschanged !== undefined) {
    window.speechSynthesis.onvoiceschanged = () => {
      loadBrowserVoices();
    };
  }
}

export function getBestFemalePtVoice() {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return null;
  }

  const voices = cachedVoices.length > 0 ? cachedVoices : window.speechSynthesis.getVoices();
  if (!voices || voices.length === 0) return null;

  const ptVoices = voices.filter((v) => {
    const lang = (v.lang || '').toLowerCase().replace('_', '-');
    return lang.includes('pt-br') || lang === 'pt';
  });

  if (ptVoices.length === 0) {
    return voices[0] || null;
  }

  const googlePt = ptVoices.find((v) => {
    const name = v.name.toLowerCase();
    return (
      name.includes('google') &&
      (name.includes('brasil') || name.includes('português') || name.includes('portuguese'))
    );
  });
  if (googlePt) return googlePt;

  const msNatural = ptVoices.find((v) => {
    const name = v.name.toLowerCase();
    const isNatural = name.includes('natural') || name.includes('online') || name.includes('neural');
    const isFemale =
      name.includes('francisca') ||
      name.includes('thalita') ||
      name.includes('leticia') ||
      name.includes('letícia');
    return isNatural && isFemale;
  });
  if (msNatural) return msNatural;

  const anyNatural = ptVoices.find((v) => {
    const name = v.name.toLowerCase();
    const isNatural = name.includes('natural') || name.includes('online') || name.includes('neural');
    const isMale =
      name.includes('daniel') || name.includes('helder') || name.includes('antonio') || name.includes('male');
    return isNatural && !isMale;
  });
  if (anyNatural) return anyNatural;

  const appleFemale = ptVoices.find((v) => {
    const name = v.name.toLowerCase();
    return name.includes('luciana') || name.includes('yelda');
  });
  if (appleFemale) return appleFemale;

  const anyFemale = ptVoices.find((v) => {
    const name = v.name.toLowerCase();
    return (
      name.includes('maria') ||
      name.includes('camila') ||
      name.includes('vitoria') ||
      name.includes('female')
    );
  });
  if (anyFemale) return anyFemale;

  const nonMale = ptVoices.find((v) => {
    const name = v.name.toLowerCase();
    return !name.includes('daniel') && !name.includes('helder') && !name.includes('male');
  });
  if (nonMale) return nonMale;

  return ptVoices[0];
}

export function getBestMalePtVoice() {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return null;
  }

  const voices = cachedVoices.length > 0 ? cachedVoices : window.speechSynthesis.getVoices();
  if (!voices || voices.length === 0) return null;

  const ptVoices = voices.filter((v) => {
    const lang = (v.lang || '').toLowerCase().replace('_', '-');
    return lang.includes('pt-br') || lang === 'pt';
  });

  if (ptVoices.length === 0) {
    return voices[0] || null;
  }

  const msMale = ptVoices.find((v) => {
    const name = v.name.toLowerCase();
    return name.includes('daniel') || name.includes('helder') || name.includes('antonio');
  });
  if (msMale) return msMale;

  const anyMale = ptVoices.find((v) => {
    const name = v.name.toLowerCase();
    return name.includes('male') || name.includes('homem') || name.includes('guy');
  });
  if (anyMale) return anyMale;

  return ptVoices[0];
}

export function cleanTextForSpeech(text) {
  if (!text) return '';

  let cleaned = text
    .replace(/https?:\/\/\S+/gi, '')
    .replace(
      /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
      ''
    )
    .replace(/\(AI Agency OS\)/gi, '')
    .replace(/AI Agency OS/gi, 'Vocalis')
    .replace(/Agency OS/gi, 'Vocalis')
    .replace(/\bVocalis AI\b/gi, 'Vocalis')
    .replace(/\bAI\b/g, 'inteligência artificial')
    .replace(/[*#_`~>[\]]/g, ' ')
    .replace(/[()]/g, ', ')
    .replace(/R\$\s*1,00/gi, 'um real')
    .replace(/R\$\s*1\b/gi, 'um real')
    .replace(/R\$\s*([0-9]+),([0-9]{2})/gi, '$1 reais')
    .replace(/R\$\s*([0-9]+)/gi, '$1 reais')
    .replace(/24\/7/gi, 'vinte e quatro horas por dia')
    .replace(/24h/gi, 'vinte e quatro horas')
    .replace(/30%/gi, 'trinta por cento')
    .replace(/85%/gi, 'oitenta e cinco por cento')
    .replace(/ç/g, 'c')
    .replace(/Ç/g, 'C');

  cleaned = cleaned.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  return cleaned
    .replace(/,\s*,+/g, ',')
    .replace(/\s+/g, ' ')
    .trim();
}

function stopBrowserSynthesis() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
    } catch {
      // Ignora erro ao cancelar síntese local
    }
  }
}

function speakWithBrowserSynthesis(personaKey, rawText, onStart, onEnd, onError) {
  if (!isBrowserSpeechSupported()) {
    if (onError) {
      onError({
        code: 'UNSUPPORTED_AUDIO',
        message: 'Síntese de voz não suportada neste navegador. A transcrição permanece visível na tela.',
      });
    }
    if (onEnd) onEnd();
    return false;
  }

  stopBrowserSynthesis();

  const spokenText = cleanTextForSpeech(rawText);
  if (!spokenText) {
    if (onEnd) onEnd();
    return false;
  }

  const utterance = new window.SpeechSynthesisUtterance(spokenText);
  utterance.lang = 'pt-BR';

  if (personaKey === 'marcus') {
    utterance.voice = getBestMalePtVoice();
    utterance.rate = 0.96;
    utterance.pitch = 0.85;
  } else if (personaKey === 'camila') {
    utterance.voice = getBestFemalePtVoice();
    utterance.rate = 0.94;
    utterance.pitch = 0.98;
  } else if (personaKey === 'leticia') {
    utterance.voice = getBestFemalePtVoice();
    utterance.rate = 1.08;
    utterance.pitch = 1.08;
  } else {
    utterance.voice = getBestFemalePtVoice();
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
  }

  let completed = false;
  const safeEnd = () => {
    if (!completed) {
      completed = true;
      if (onEnd) onEnd();
    }
  };

  utterance.onstart = () => {
    if (onStart) onStart();
  };

  utterance.onend = safeEnd;
  utterance.onerror = (e) => {
    safeEnd();
    if (onError) onError(e);
  };

  window.speechSynthesis.speak(utterance);
  return true;
}

/**
 * Executa a fala de acordo com a Persona selecionada via `/api/tts` com fallback único local.
 */
export function speakPersonaPt(personaKey = 'roberta', rawText, onStart, onEnd, onError) {
  let fellBack = false;
  const triggerLocalFallback = () => {
    if (fellBack) return;
    fellBack = true;
    speakWithBrowserSynthesis(personaKey, rawText, onStart, onEnd, onError);
  };

  try {
    const maybePromise = speakPersonaVoice(personaKey, rawText, onStart, onEnd, triggerLocalFallback);
    if (maybePromise && typeof maybePromise.catch === 'function') {
      maybePromise.catch(triggerLocalFallback);
    }
  } catch {
    triggerLocalFallback();
  }
}

/**
 * Fala o texto usando a voz da demonstração (Roberta) via `/api/tts` com fallback único local.
 */
export function speakFemalePt(rawText, onStart, onEnd, onError) {
  let fellBack = false;
  const triggerLocalFallback = () => {
    if (fellBack) return;
    fellBack = true;
    speakWithBrowserSynthesis('roberta', rawText, onStart, onEnd, onError);
  };

  try {
    const maybePromise = speakRobertaVoice(rawText, onStart, onEnd, triggerLocalFallback);
    if (maybePromise && typeof maybePromise.catch === 'function') {
      maybePromise.catch(triggerLocalFallback);
    }
  } catch {
    triggerLocalFallback();
  }
}

export function stopSpeech() {
  try {
    stopRobertaVoice();
  } catch {
    // Ignora erro ao parar áudio remoto
  }
  stopBrowserSynthesis();
}

export const speakText = (text, onEnd, onError) => speakFemalePt(text, null, onEnd, onError || onEnd);
