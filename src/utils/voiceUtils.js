/**
 * Utilitário de Voz Humana em Português do Brasil (Roberta · Vocalis)
 * Focado em fluidez máxima, entonação natural e ritmo acolhedor de atendimento
 */

import {
  speakRobertaVoice as speakGeminiRoberta,
  speakPersonaVoice as speakGeminiPersona,
  stopRobertaVoice as stopGeminiAudio
} from './geminiAudioService';

let cachedVoices = [];

// Carrega as vozes do sistema de forma segura e reativa
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

/**
 * Seleciona a voz mais humana e suave em Português do Brasil
 */
export function getBestFemalePtVoice() {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return null;
  }

  const voices = cachedVoices.length > 0 ? cachedVoices : window.speechSynthesis.getVoices();
  if (!voices || voices.length === 0) return null;

  // Filtrar vozes brasileiras
  const ptVoices = voices.filter(v => {
    const lang = (v.lang || '').toLowerCase().replace('_', '-');
    return lang.includes('pt-br') || lang === 'pt';
  });

  if (ptVoices.length === 0) {
    return voices[0] || null;
  }

  // 1. Voz Neural do Google no Chrome (Google português do Brasil) - voz feminina muito fluida e natural
  const googlePt = ptVoices.find(v => {
    const name = v.name.toLowerCase();
    return name.includes('google') && (name.includes('brasil') || name.includes('português') || name.includes('portuguese'));
  });
  if (googlePt) return googlePt;

  // 2. Vozes Naturais / Online do Microsoft Edge (Francisca Online Natural / Thalita Online Natural)
  const msNatural = ptVoices.find(v => {
    const name = v.name.toLowerCase();
    const isNatural = name.includes('natural') || name.includes('online') || name.includes('neural');
    const isFemale = name.includes('francisca') || name.includes('thalita') || name.includes('leticia') || name.includes('letícia');
    return isNatural && isFemale;
  });
  if (msNatural) return msNatural;

  // 3. Qualquer voz Natural pt-BR (exceto vozes masculinas sabidas)
  const anyNatural = ptVoices.find(v => {
    const name = v.name.toLowerCase();
    const isNatural = name.includes('natural') || name.includes('online') || name.includes('neural');
    const isMale = name.includes('daniel') || name.includes('helder') || name.includes('antonio') || name.includes('male');
    return isNatural && !isMale;
  });
  if (anyNatural) return anyNatural;

  // 4. Vozes femininas do Safari / iOS / macOS (Luciana, Yelda)
  const appleFemale = ptVoices.find(v => {
    const name = v.name.toLowerCase();
    return name.includes('luciana') || name.includes('yelda');
  });
  if (appleFemale) return appleFemale;

  // 5. Qualquer voz feminina conhecida
  const anyFemale = ptVoices.find(v => {
    const name = v.name.toLowerCase();
    const isFemale = name.includes('maria') || name.includes('camila') || name.includes('vitoria') || name.includes('female');
    return isFemale;
  });
  if (anyFemale) return anyFemale;

  // 6. Fallback evitando vozes masculinas
  const nonMale = ptVoices.find(v => {
    const name = v.name.toLowerCase();
    return !name.includes('daniel') && !name.includes('helder') && !name.includes('male');
  });
  if (nonMale) return nonMale;

  return ptVoices[0];
}

/**
 * Seleciona a melhor voz masculina em Português do Brasil (Marcus · Vocalis)
 */
export function getBestMalePtVoice() {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return null;
  }

  const voices = cachedVoices.length > 0 ? cachedVoices : window.speechSynthesis.getVoices();
  if (!voices || voices.length === 0) return null;

  const ptVoices = voices.filter(v => {
    const lang = (v.lang || '').toLowerCase().replace('_', '-');
    return lang.includes('pt-br') || lang === 'pt';
  });

  if (ptVoices.length === 0) {
    return voices[0] || null;
  }

  // 1. Vozes masculinas Microsoft (Daniel, Helder)
  const msMale = ptVoices.find(v => {
    const name = v.name.toLowerCase();
    return name.includes('daniel') || name.includes('helder') || name.includes('antonio');
  });
  if (msMale) return msMale;

  // 2. Qualquer voz masculina
  const anyMale = ptVoices.find(v => {
    const name = v.name.toLowerCase();
    return name.includes('male') || name.includes('homem') || name.includes('guy');
  });
  if (anyMale) return anyMale;

  // Fallback para melhor voz pt-BR
  return ptVoices[0];
}

/**
 * Executa a fala de acordo com a Persona selecionada (Roberta, Marcus, Camila, etc.)
 * Prioriza o áudio neural humano do Google Gemini; fallback para navegador se offline.
 */
export function speakPersonaPt(personaKey = 'roberta', rawText, onStart, onEnd, onError) {
  // 1. Tenta reproduzir o áudio neural ultra-realista do Google Gemini
  try {
    speakGeminiPersona(personaKey, rawText, onStart, onEnd, onError);
    return;
  } catch (err) {
    console.warn('Fallback para síntese do navegador:', err);
  }

  // 2. Fallback caso a API do Gemini não responda
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    if (onEnd) onEnd();
    return;
  }

  window.speechSynthesis.cancel();

  const spokenText = cleanTextForSpeech(rawText);
  if (!spokenText) {
    if (onEnd) onEnd();
    return;
  }

  const utterance = new SpeechSynthesisUtterance(spokenText);
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
    // Roberta (default)
    utterance.voice = getBestFemalePtVoice();
    utterance.rate = 1.02;
    utterance.pitch = 1.04;
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
}

/**
 * Limpa e normaliza o texto para fala ultra-fluida e natural:
 * - Remove diacríticos e acentos para IMPEDIR que sintetizadores leiam nomes de acentos ("agudo", "cedilha", "til")
 * - Nunca divide palavras com "ai" ou "os"
 * - Traduz AI Agency OS para "Vocalis"
 * - Mantém pontuação limpa para respiração natural
 */
export function cleanTextForSpeech(text) {
  if (!text) return '';

  let cleaned = text
    // Remove links/URLs
    .replace(/https?:\/\/\S+/gi, '')
    // Remove emojis Unicode
    .replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '')
    // Normalização de marcas
    .replace(/\(AI Agency OS\)/gi, '')
    .replace(/AI Agency OS/gi, 'Vocalis')
    .replace(/Agency OS/gi, 'Vocalis')
    .replace(/\bVocalis AI\b/gi, 'Vocalis')
    .replace(/\bAI\b/g, 'inteligência artificial')
    // Remove formatação Markdown
    .replace(/[*#_`~>[\]]/g, ' ')
    // Remove parênteses
    .replace(/[()]/g, ', ')
    // Normaliza valores monetários e tempos
    .replace(/R\$\s*1,00/gi, 'um real')
    .replace(/R\$\s*1\b/gi, 'um real')
    .replace(/R\$\s*([0-9]+),([0-9]{2})/gi, '$1 reais')
    .replace(/R\$\s*([0-9]+)/gi, '$1 reais')
    .replace(/24\/7/gi, 'vinte e quatro horas por dia')
    .replace(/24h/gi, 'vinte e quatro horas')
    .replace(/380ms/gi, '380 milissegundos')
    .replace(/450ms/gi, '450 milissegundos')
    .replace(/30%/gi, 'trinta por cento')
    .replace(/85%/gi, 'oitenta e cinco por cento')
    // Converte ç para c para blindar contra pronúncia de "cedilha"
    .replace(/ç/g, 'c')
    .replace(/Ç/g, 'C');

  // ELIMINAÇÃO TOTAL DE NOMES DE ACENTOS (agudo, circunflexo, til, crase):
  // Decompõe e remove todos os diacríticos combinados (\u0300-\u036f)
  // á->a, é->e, í->i, ó->o, ú->u, ã->a, õ->o, â->a, ê->e
  // Isso impede 100% que qualquer sintetizador no Windows/Chrome fale "acento agudo", "til" etc.
  cleaned = cleaned.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  return cleaned
    .replace(/,\s*,+/g, ',')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Fala o texto usando a voz neural de Roberta (Google Gemini com áudio humano real)
 * Cancela qualquer fala anterior imediatamente.
 */
export function speakFemalePt(rawText, onStart, onEnd, onError) {
  // 1. Prioriza a voz humana ultra-fluida do Google Gemini
  try {
    speakGeminiRoberta(rawText, onStart, onEnd, onError);
    return;
  } catch (err) {
    console.warn('Fallback para síntese do navegador:', err);
  }

  // 2. Fallback local de emergência
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    if (onEnd) onEnd();
    return;
  }

  // Cancela fala anterior imediatamente
  window.speechSynthesis.cancel();

  const spokenText = cleanTextForSpeech(rawText);
  if (!spokenText) {
    if (onEnd) onEnd();
    return;
  }

  const utterance = new SpeechSynthesisUtterance(spokenText);
  utterance.lang = 'pt-BR';
  utterance.rate = 1.0;
  utterance.pitch = 1.0;

  const voice = getBestFemalePtVoice();
  if (voice) {
    utterance.voice = voice;
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
}

export function stopSpeech() {
  try {
    stopGeminiAudio();
  } catch {
    // Ignora
  }
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}

export const speakText = (text, onEnd) => speakFemalePt(text, null, onEnd, onEnd);
