/**
 * Cliente de Integração com a UazAPI / Evolution API (WhatsApp)
 */

export async function sendWhatsAppMessage({ phone, message, instanceName, apiUrl, apiToken }) {
  const url = apiUrl || import.meta.env.VITE_UAZAPI_URL;
  const instance = instanceName || import.meta.env.VITE_UAZAPI_INSTANCE;
  const token = apiToken || import.meta.env.VITE_UAZAPI_TOKEN;

  if (!url) {
    console.info('WhatsApp API ainda não configurada no .env. Simulação ativa.');
    return { success: false, simulated: true, error: 'Credenciais de WhatsApp pendentes no .env' };
  }

  // Remove caracteres não numéricos do telefone
  const cleanPhone = phone.replace(/\D/g, '');
  const targetPhone = cleanPhone.startsWith('55') ? cleanPhone : `55${cleanPhone}`;

  try {
    const baseUrl = url.replace(/\/$/, '');
    
    // Endpoint padrão Evolution API / UazAPI
    const endpoint = instance 
      ? `${baseUrl}/message/sendText/${instance}`
      : `${baseUrl}/message/sendText`;

    const headers = {
      'Content-Type': 'application/json'
    };
    if (token) {
      headers['apikey'] = token;
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(endpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        number: targetPhone,
        text: message,
        options: {
          delay: 1200,
          presence: 'composing',
          linkPreview: true
        }
      })
    });

    if (!response.ok) {
      const errBody = await response.text();
      console.warn('Falha no envio via WhatsApp API:', response.status, errBody);
      return { success: false, error: errBody };
    }

    const data = await response.json();
    return { success: true, data };
  } catch (err) {
    console.error('Erro de conexão com WhatsApp API:', err);
    return { success: false, error: err.message };
  }
}

/**
 * Disparo de nota de voz (PTT / Microfone verde)
 */
export async function sendWhatsAppAudio({ phone, audioUrl, instanceName, apiUrl, apiToken }) {
  const url = apiUrl || import.meta.env.VITE_UAZAPI_URL;
  const instance = instanceName || import.meta.env.VITE_UAZAPI_INSTANCE;
  const token = apiToken || import.meta.env.VITE_UAZAPI_TOKEN;

  if (!url) return { success: false, simulated: true };

  const cleanPhone = phone.replace(/\D/g, '');
  const targetPhone = cleanPhone.startsWith('55') ? cleanPhone : `55${cleanPhone}`;
  const baseUrl = url.replace(/\/$/, '');
  const endpoint = instance 
    ? `${baseUrl}/message/sendWhatsAppAudio/${instance}`
    : `${baseUrl}/message/sendWhatsAppAudio`;

  const headers = { 'Content-Type': 'application/json' };
  if (token) headers['apikey'] = token;

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        number: targetPhone,
        audio: audioUrl,
        options: {
          delay: 2000,
          presence: 'recording'
        }
      })
    });
    return { success: response.ok, data: await response.json() };
  } catch (err) {
    console.error('Erro ao enviar áudio:', err);
    return { success: false, error: err.message };
  }
}
