/**
 * Utilitário de Voz Humana em Português do Brasil (Débora · Vocalis)
 * Focado em fluidez máxima, entonação natural e ritmo acolhedor de atendimento
 */

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
 * Limpa o texto para fala ultra-natural e fluida:
 * - NUNCA quebra palavras que contenham "ai" (como mais, vai, cai, abaixo)
 * - NUNCA quebra palavras que contenham "os" (como estamos, minutos, nossos)
 * - Traduz AI Agency OS para pronúncia natural "Vocalis"
 * - Mantém pontuação limpa com pausas de respiração
 */
export function cleanTextForSpeech(text) {
  if (!text) return '';

  return text
    // Remove links/URLs
    .replace(/https?:\/\/\S+/gi, '')
    // Remove emojis Unicode que causam pausas ou soletrações
    .replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '')
    // Normalização de marcas para não soletrar siglas em inglês
    .replace(/\(AI Agency OS\)/gi, '')
    .replace(/AI Agency OS/gi, 'Vocalis')
    .replace(/Agency OS/gi, 'Vocalis')
    .replace(/\bVocalis AI\b/gi, 'Vocalis')
    // Substitui AI isolado por inteligência artificial (com limite de palavra \b)
    .replace(/\bAI\b/g, 'inteligência artificial')
    // Remove formatação Markdown
    .replace(/[*#_`~>[\]]/g, ' ')
    // Remove parênteses
    .replace(/[()]/g, ', ')
    // Normaliza valores monetários e tempos
    .replace(/R\$\s*1,00/gi, 'um real')
    .replace(/R\$\s*1\b/gi, 'um real')
    .replace(/R\$\s*([0-9]+),([0-9]{2})/gi, '$1 reais e $2 centavos')
    .replace(/R\$\s*([0-9]+)/gi, '$1 reais')
    .replace(/24\/7/gi, 'vinte e quatro horas por dia')
    .replace(/24h/gi, 'vinte e quatro horas')
    .replace(/380ms/gi, '380 milissegundos')
    .replace(/450ms/gi, '450 milissegundos')
    .replace(/30%/gi, 'trinta por cento')
    .replace(/85%/gi, 'oitenta e cinco por cento')
    // Limpa pontuações repetidas
    .replace(/,\s*,+/g, ',')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Fala o texto usando a voz de Débora com cancelamento prévio e tratamento de erro
 */
export function speakFemalePt(rawText, onStart, onEnd, onError) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    if (onEnd) onEnd();
    return;
  }

  // Cancela fala anterior
  window.speechSynthesis.cancel();

  const spokenText = cleanTextForSpeech(rawText);
  if (!spokenText) {
    if (onEnd) onEnd();
    return;
  }

  const utterance = new SpeechSynthesisUtterance(spokenText);
  utterance.lang = 'pt-BR';
  // Taxa de fala natural brasileira (1.0 = ritmo calmo e fluido)
  utterance.rate = 1.0;
  // Pitch 1.0 (tom natural humano, sem afinação artificial)
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
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}

export const speakText = (text, onEnd) => speakFemalePt(text, null, onEnd, onEnd);
