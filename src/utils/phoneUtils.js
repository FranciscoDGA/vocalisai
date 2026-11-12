/**
 * Phone Number Utilities for Brazilian Format and Natural Voice Speech
 */

// Limpa caracteres não numéricos e remove DDI 55 redundante se presente
export function cleanRawPhone(value = '') {
  let digits = String(value).replace(/\D/g, '');
  
  // Se o usuário colou com 55 na frente (ex: 5594984423948 -> 13 dígitos, ou 5511987654321)
  if (digits.length >= 12 && digits.startsWith('55')) {
    digits = digits.slice(2);
  }
  
  // Limita a 11 dígitos (DDD + 9 dígitos)
  return digits.slice(0, 11);
}

// Formata visualmente com máscara brasileira: (XX) XXXXX-XXXX ou (XX) XXXX-XXXX
export function formatPhoneMask(value = '') {
  const digits = cleanRawPhone(value);
  
  if (!digits) return '';
  if (digits.length <= 2) {
    return `(${digits}`;
  }
  if (digits.length <= 6) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  }
  if (digits.length <= 10) {
    // Telefone fixo (8 dígitos após DDD)
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }
  // Celular com 9 dígitos: (XX) 9XXXX-XXXX
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
}

// Converte o telefone para pronúncia fonética natural em português
// Evita que o sintetizador leia como bilhão ou trilhão
export function formatPhoneForVoice(value = '') {
  const digits = cleanRawPhone(value);
  if (!digits || digits.length < 10) {
    return 'celular cadastrado';
  }

  const ddd = digits.slice(0, 2);
  const dddSpoken = `${ddd[0]} ${ddd[1]}`; // ex: "9 4" -> fala "nove quatro"

  if (digits.length === 11) {
    // 9 dígitos: 9 8442 3948
    const nono = digits[2]; // '9'
    const part1 = digits.slice(3, 7).split('').join(' '); // "8 4 4 2"
    const part2 = digits.slice(7, 11).split('').join(' '); // "3 9 4 8"
    return `com DDD ${dddSpoken}, ${nono}, ${part1}, ${part2}`;
  } else {
    // 8 dígitos: 3322 1100
    const part1 = digits.slice(2, 6).split('').join(' ');
    const part2 = digits.slice(6, 10).split('').join(' ');
    return `com DDD ${dddSpoken}, ${part1}, ${part2}`;
  }
}
