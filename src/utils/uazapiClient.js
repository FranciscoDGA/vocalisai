/**
 * Adaptador de Mensageria WhatsApp no Frontend.
 *
 * REGRAS DE SEGURANÇA:
 * - Tokens privados de API (UazAPI / Meta Cloud API) nunca são lidos nem embutidos no cliente (`VITE_*`).
 * - O navegador público nunca dispara mensagens reais diretamente; qualquer envio real exige backend autenticado.
 */

export async function sendWhatsAppMessage({ phone, message } = {}) {
  if (!phone || !message) {
    return {
      success: false,
      simulated: true,
      disabled: true,
      error: 'Informe destinatário e mensagem para a simulação.',
    };
  }

  return {
    success: false,
    simulated: true,
    disabled: true,
    error:
      'O disparo real de mensagens no WhatsApp exige integração oficial autenticada no servidor e não é executado diretamente pelo navegador público.',
  };
}

export async function sendWhatsAppAudio({ phone } = {}) {
  if (!phone) {
    return {
      success: false,
      simulated: true,
      disabled: true,
      error: 'Informe um destinatário válido.',
    };
  }

  return {
    success: false,
    simulated: true,
    disabled: true,
    error:
      'O disparo real de áudio no WhatsApp exige integração oficial autenticada no servidor e não é executado diretamente pelo navegador público.',
  };
}
