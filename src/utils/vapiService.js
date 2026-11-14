/**
 * Serviço de Telefonia Real com IA (Vapi Outbound Calls & Assistant Management)
 */

const VAPI_PRIVATE_KEY = import.meta.env.VITE_VAPI_PRIVATE_KEY || 'e1b74a9f-f7c1-44ad-8929-9075bd100993';
const DEFAULT_ASSISTANT_ID = import.meta.env.VITE_VAPI_ASSISTANT_ID || '5907a01b-07c9-4f00-977e-e828d913ee37';
const VAPI_PHONE_NUMBER_ID = import.meta.env.VITE_VAPI_PHONE_NUMBER_ID || '6df4fbe0-27e2-4913-a20b-f5517a5361b6';
const VAPI_BASE_URL = 'https://api.vapi.ai';

const defaultHeaders = {
  'Authorization': `Bearer ${VAPI_PRIVATE_KEY}`,
  'Content-Type': 'application/json'
};

/**
 * Cria um novo assistente na Vapi
 * @param {Object} params
 * @param {string} params.name - Nome do assistente
 * @param {string} params.systemPrompt - Prompt de comando/sistema da IA
 * @param {string} params.firstMessage - Mensagem inicial falada ao atender
 * @param {string} [params.voiceId] - ID da voz (padrão: Clara)
 * @param {string} [params.model] - Modelo LLM (padrão: gpt-4o-mini)
 */
export async function createVapiAssistant({
  name = 'Assistente Vocalis',
  systemPrompt = 'Você é uma assistente executiva de voz com IA que atende em português brasileiro com simpatia e foco em conversão.',
  firstMessage = 'Olá! Como posso ajudar você hoje?',
  voiceId = 'Clara',
  model = 'gpt-4o-mini'
}) {
  try {
    const payload = {
      name,
      firstMessage,
      firstMessageMode: 'assistant-speaks-first',
      transcriber: {
        provider: 'deepgram',
        model: 'nova-2',
        language: 'pt-BR'
      },
      model: {
        provider: 'openai',
        model,
        messages: [
          {
            role: 'system',
            content: systemPrompt
          }
        ]
      },
      voice: {
        provider: 'vapi',
        voiceId: voiceId || 'Clara'
      }
    };

    const response = await fetch(`${VAPI_BASE_URL}/assistant`, {
      method: 'POST',
      headers: defaultHeaders,
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (!response.ok) {
      console.warn('Erro ao criar assistente na Vapi:', data);
      return { success: false, error: data.message || 'Erro ao criar assistente na Vapi' };
    }

    return { success: true, data, assistantId: data.id };
  } catch (err) {
    console.error('Exceção ao criar assistente Vapi:', err);
    return { success: false, error: err.message };
  }
}

/**
 * Atualiza um assistente existente na Vapi
 * @param {string} vapiAssistantId - ID do assistente na Vapi
 * @param {Object} updates
 */
export async function updateVapiAssistant(vapiAssistantId, {
  name,
  systemPrompt,
  firstMessage,
  voiceId,
  model = 'gpt-4o-mini'
}) {
  if (!vapiAssistantId) {
    return { success: false, error: 'ID do assistente Vapi não fornecido' };
  }

  try {
    const patchPayload = {};
    if (name) patchPayload.name = name;
    if (firstMessage) patchPayload.firstMessage = firstMessage;
    if (voiceId) {
      patchPayload.voice = {
        provider: 'vapi',
        voiceId
      };
    }
    if (systemPrompt) {
      patchPayload.model = {
        provider: 'openai',
        model,
        messages: [
          {
            role: 'system',
            content: systemPrompt
          }
        ]
      };
    }

    const response = await fetch(`${VAPI_BASE_URL}/assistant/${vapiAssistantId}`, {
      method: 'PATCH',
      headers: defaultHeaders,
      body: JSON.stringify(patchPayload)
    });

    const data = await response.json();

    if (!response.ok) {
      console.warn('Erro ao atualizar assistente na Vapi:', data);
      return { success: false, error: data.message || 'Erro ao atualizar assistente na Vapi' };
    }

    return { success: true, data };
  } catch (err) {
    console.error('Exceção ao atualizar assistente Vapi:', err);
    return { success: false, error: err.message };
  }
}

/**
 * Lista todos os assistentes na conta Vapi
 */
export async function listVapiAssistants() {
  try {
    const response = await fetch(`${VAPI_BASE_URL}/assistant`, {
      method: 'GET',
      headers: defaultHeaders
    });

    const data = await response.json();

    if (!response.ok) {
      console.warn('Erro ao listar assistentes Vapi:', data);
      return { success: false, data: [] };
    }

    return { success: true, data: Array.isArray(data) ? data : data.value || [] };
  } catch (err) {
    console.error('Exceção ao listar assistentes Vapi:', err);
    return { success: false, data: [] };
  }
}

/**
 * Deleta um assistente na Vapi
 * @param {string} vapiAssistantId
 */
export async function deleteVapiAssistant(vapiAssistantId) {
  if (!vapiAssistantId) return { success: false, error: 'ID ausente' };
  try {
    const response = await fetch(`${VAPI_BASE_URL}/assistant/${vapiAssistantId}`, {
      method: 'DELETE',
      headers: defaultHeaders
    });
    return { success: response.ok };
  } catch (err) {
    console.error('Erro ao deletar assistente Vapi:', err);
    return { success: false, error: err.message };
  }
}

/**
 * Dispara uma chamada telefônica real para o celular do lead
 * @param {string} rawPhone - Número do telefone (ex: 94984478168 ou (94) 98447-8168)
 * @param {string} countryCode - Código do país (padrão: +55)
 * @param {string} [customAssistantId] - ID específico do assistente Vapi
 */
export async function triggerOutboundCall(rawPhone, countryCode = '+55', customAssistantId = null) {
  try {
    const digits = rawPhone.replace(/\D/g, '');
    let targetPhone = digits;

    if (!targetPhone.startsWith('55')) {
      targetPhone = `55${targetPhone}`;
    }

    const formattedE164 = `+${targetPhone}`;
    const assistantIdToUse = customAssistantId || DEFAULT_ASSISTANT_ID;

    const response = await fetch(`${VAPI_BASE_URL}/call`, {
      method: 'POST',
      headers: defaultHeaders,
      body: JSON.stringify({
        phoneNumberId: VAPI_PHONE_NUMBER_ID,
        assistantId: assistantIdToUse,
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

