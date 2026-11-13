/**
 * Serviço de Telefonia Real com IA (Vapi Outbound Calls)
 */

const VAPI_PRIVATE_KEY = import.meta.env.VITE_VAPI_PRIVATE_KEY || 'e1b74a9f-f7c1-44ad-8929-9075bd100993';
const VAPI_ASSISTANT_ID = import.meta.env.VITE_VAPI_ASSISTANT_ID || '5907a01b-07c9-4f00-977e-e828d913ee37';
const VAPI_PHONE_NUMBER_ID = import.meta.env.VITE_VAPI_PHONE_NUMBER_ID || '6df4fbe0-27e2-4913-a20b-f5517a5361b6';

/**
 * Dispara uma chamada telefônica real para o celular do lead
 * @param {string} rawPhone - Número do telefone (ex: 94984478168 ou (94) 98447-8168)
 * @param {string} countryCode - Código do país (padrão: +55)
 */
export async function triggerOutboundCall(rawPhone, countryCode = '+55') {
  try {
    const digits = rawPhone.replace(/\D/g, '');
    let targetPhone = digits;

    if (!targetPhone.startsWith('55')) {
      targetPhone = `55${targetPhone}`;
    }

    const formattedE164 = `+${targetPhone}`;

    const response = await fetch('https://api.vapi.ai/call', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${VAPI_PRIVATE_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        phoneNumberId: VAPI_PHONE_NUMBER_ID,
        assistantId: VAPI_ASSISTANT_ID,
        customer: {
          number: formattedE164
        }
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.warn('Erro na resposta da Vapi:', data);
      return { success: false, error: data.message || 'Erro ao discar para o número' };
    }

    return { success: true, data };
  } catch (err) {
    console.error('Exceção ao disparar chamada Vapi:', err);
    return { success: false, error: err.message };
  }
}
