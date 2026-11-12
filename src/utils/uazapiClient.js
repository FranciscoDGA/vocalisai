/**
 * Cliente de Integração com a UazAPI (WhatsApp)
 */

export async function sendWhatsAppMessage({ phone, message, instanceName, apiUrl, apiToken }) {
  const url = apiUrl || import.meta.env.VITE_UAZAPI_URL;
  const instance = instanceName || import.meta.env.VITE_UAZAPI_INSTANCE;
  const token = apiToken || import.meta.env.VITE_UAZAPI_TOKEN;

  if (!url || !token) {
    console.info('UazAPI ainda não configurada no .env. Simulação ativa.');
    return { success: false, simulated: true, error: 'Credenciais da UazAPI pendentes no .env' };
  }

  // Remove caracteres não numéricos do telefone
  const cleanPhone = phone.replace(/\D/g, '');
  const targetPhone = cleanPhone.startsWith('55') ? cleanPhone : `55${cleanPhone}`;

  try {
    // Limpeza da URL base
    const baseUrl = url.replace(/\/$/, '');
    
    // Endpoint padrão da UazAPI
    const endpoint = instance 
      ? `${baseUrl}/message/sendText/${instance}`
      : `${baseUrl}/message/sendText`;

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': token,
        'Authorization': `Bearer ${token}`
      },
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
      console.warn('Falha no envio via UazAPI:', response.status, errBody);
      return { success: false, error: errBody };
    }

    const data = await response.json();
    return { success: true, data };
  } catch (err) {
    console.error('Erro de conexão com UazAPI:', err);
    return { success: false, error: err.message };
  }
}
