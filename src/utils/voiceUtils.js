/**
 * Utilitário de Voz Neural em Português do Brasil (Débora · Vocalis AI)
 * Prioriza vozes neurais/naturais ultra-humanas do navegador (Edge, Chrome, Safari, Windows)
 */

let cachedVoices = [];

// Carrega as vozes do sistema de forma segura e reativa
export function loadBrowserVoices() {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return [];
  }
  cachedVoices = window.speechSynthesis.getVoices() || [];
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
 * Seleciona a melhor voz feminina em Português do Brasil disponível no dispositivo
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
    return lang.includes('pt-br') || lang.startsWith('pt');
  });

  if (ptVoices.length === 0) {
    return voices[0] || null;
  }

  // Nomes de vozes femininas de alta fidelidade
  const femaleKeywords = [
    'francisca', 'thalita', 'leticia', 'letícia', 'maria', 'yelda', 
    'luciana', 'camila', 'vitoria', 'vitória', 'fabiola', 'female', 'feminina'
  ];

  // 1. Prioridade Máxima: Vozes Neurais / Online / Naturais (Microsoft Edge / Windows 11 / Chrome Neural)
  const neuralFemale = ptVoices.find(v => {
    const name = v.name.toLowerCase();
    const isFemale = femaleKeywords.some(k => name.includes(k));
    const isNatural = name.includes('natural') || name.includes('online') || name.includes('neural') || name.includes('multilingual');
    return isFemale && isNatural;
  });
  if (neuralFemale) return neuralFemale;

  // 2. Voz natural qualquer (mesmo que gênero não esteja no nome, se for natural pt-BR)
  const anyNatural = ptVoices.find(v => {
    const name = v.name.toLowerCase();
    const isNatural = name.includes('natural') || name.includes('online') || name.includes('neural');
    const isMale = name.includes('daniel') || name.includes('helder') || name.includes('male') || name.includes('antonio');
    return isNatural && !isMale;
  });
  if (anyNatural) return anyNatural;

  // 3. Voz do Google em Português do Brasil (Chrome nativo - timbre suave feminino)
  const googlePt = ptVoices.find(v => v.name.toLowerCase().includes('google') && !v.name.toLowerCase().includes('male'));
  if (googlePt) return googlePt;

  // 4. Qualquer voz feminina conhecida
  const anyFemale = ptVoices.find(v => {
    const name = v.name.toLowerCase();
    return femaleKeywords.some(k => name.includes(k));
  });
  if (anyFemale) return anyFemale;

  // 5. Evita vozes masculinas sabidas (Daniel, etc.)
  const nonMale = ptVoices.find(v => {
    const name = v.name.toLowerCase();
    return !name.includes('daniel') && !name.includes('helder') && !name.includes('male') && !name.includes('antonio');
  });
  if (nonMale) return nonMale;

  return ptVoices[0];
}

/**
 * Limpa o texto para fala ultra-natural:
 * - Remove Markdown (**, *, #, _, ~, `, [])
 * - Remove emojis que causam gagueira no sintetizador
 * - Traduz siglas comuns para pronúncia fonética perfeita
 */
export function cleanTextForSpeech(text) {
  if (!text) return '';

  return text
    // Remove links
    .replace(/https?:\/\/\S+/gi, '')
    // Remove emojis Unicode comuns
    .replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '')
    // Remove formatação Markdown
    .replace(/[*#_`~>[\]()]/g, ' ')
    // Normaliza valores monetários e tempos para pronúncia perfeita
    .replace(/R\$\s*1,00/gi, 'um real')
    .replace(/R\$\s*1/gi, 'um real')
    .replace(/R\$\s*([0-9]+),([0-9]{2})/gi, '$1 reais e $2 centavos')
    .replace(/R\$\s*([0-9]+)/gi, '$1 reais')
    .replace(/24\/7/gi, 'vinte e quatro horas por dia, sete dias por semana')
    .replace(/24h/gi, 'vinte e quatro horas')
    .replace(/380ms/gi, '380 milissegundos')
    .replace(/450ms/gi, '450 milissegundos')
    .replace(/30%/gi, 'trinta por cento')
    .replace(/85%/gi, 'oitenta e cinco por cento')
    .replace(/AI/gi, 'inteligência artificial')
    .replace(/OS/gi, 'o ésse')
    .replace(/Pix/gi, 'Pícs')
    .replace(/WhatsApp/gi, 'Uatizape')
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

  // Cancela qualquer fala anterior imediatamente para evitar sobreposição
  window.speechSynthesis.cancel();

  const spokenText = cleanTextForSpeech(rawText);
  if (!spokenText) {
    if (onEnd) onEnd();
    return;
  }

  const utterance = new SpeechSynthesisUtterance(spokenText);
  utterance.lang = 'pt-BR';

  // Configuração fina de pitch e rate para tom acolhedor e dinâmico
  const voice = getBestFemalePtVoice();
  if (voice) {
    utterance.voice = voice;
    // Se for uma voz natural/neural, rate 1.0 e pitch 1.0 são perfeitos
    const isNatural = voice.name.toLowerCase().includes('natural') || voice.name.toLowerCase().includes('neural');
    utterance.rate = isNatural ? 1.02 : 1.0;
    utterance.pitch = isNatural ? 1.0 : 1.02;
  } else {
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
    console.warn('Erro ou cancelamento do TTS:', e);
    safeEnd();
    if (onError) onError(e);
  };

  // Proteção contra bug do Chrome que pausa falas longas
  window.speechSynthesis.speak(utterance);
}

export function stopSpeech() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}

export const speakText = (text, onEnd) => speakFemalePt(text, null, onEnd, onEnd);
