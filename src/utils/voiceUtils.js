/**
 * Voice selection utility prioritizes natural Brazilian Portuguese female voices
 */

export function getBestFemalePtVoice() {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return null;
  }

  const voices = window.speechSynthesis.getVoices();
  if (!voices || voices.length === 0) return null;

  // Filtrar vozes em português
  const ptVoices = voices.filter(v => 
    v.lang && (v.lang.toLowerCase().includes('pt-br') || v.lang.toLowerCase().includes('pt_br') || v.lang.toLowerCase().startsWith('pt'))
  );

  if (ptVoices.length === 0) {
    return voices[0] || null;
  }

  // 1. Procurar por vozes femininas conhecidas de alta fidelidade
  const femaleKeywords = [
    'francisca', 'maria', 'thalita', 'yelda', 'camila', 'luciana', 
    'leticia', 'vitoria', 'vitória', 'fabiola', 'female', 'feminina'
  ];

  // Vozes naturais / neurais da Microsoft (Edge/Windows) ou Google
  const highQualityFemale = ptVoices.find(v => {
    const name = v.name.toLowerCase();
    const isFemale = femaleKeywords.some(k => name.includes(k));
    const isNatural = name.includes('natural') || name.includes('online') || name.includes('neural');
    return isFemale && isNatural;
  });
  if (highQualityFemale) return highQualityFemale;

  // Qualquer voz feminina brasileira
  const anyFemale = ptVoices.find(v => {
    const name = v.name.toLowerCase();
    return femaleKeywords.some(k => name.includes(k));
  });
  if (anyFemale) return anyFemale;

  // Voz padrão do Google português do Brasil (geralmente é feminina)
  const googlePt = ptVoices.find(v => v.name.toLowerCase().includes('google'));
  if (googlePt) return googlePt;

  // Evitar vozes sabidamente masculinas (Daniel, Helder, etc.)
  const nonMale = ptVoices.find(v => {
    const name = v.name.toLowerCase();
    return !name.includes('daniel') && !name.includes('helder') && !name.includes('male');
  });
  if (nonMale) return nonMale;

  // Fallback para qualquer voz em pt-BR
  return ptVoices[0];
}

export function speakFemalePt(text, onStart, onEnd, onError) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    if (onEnd) onEnd();
    return;
  }

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'pt-BR';
  utterance.rate = 1.0;
  utterance.pitch = 1.08; // Pitch ligeiramente elevado para tom feminino acolhedor

  const voice = getBestFemalePtVoice();
  if (voice) {
    utterance.voice = voice;
  }

  if (onStart) utterance.onstart = onStart;
  if (onEnd) utterance.onend = onEnd;
  if (onError) utterance.onerror = onError;

  window.speechSynthesis.speak(utterance);
}
