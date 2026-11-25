/**
 * Adaptador de Telefonia (Vapi) — Desativado no Frontend Público por Segurança.
 *
 * Credenciais privadas e chamadas diretas à API da Vapi nunca devem residir
 * ou ser executadas no código do navegador. Qualquer operação real exige
 * proxy autenticado no servidor com isolamento por empresa.
 */

const DISABLED_RESPONSE = Object.freeze({
  success: false,
  disabled: true,
  error:
    'A integração de telefonia Vapi exige proxy autenticado no servidor e está desativada no navegador por segurança.',
});

export async function createVapiAssistant() {
  return { ...DISABLED_RESPONSE, assistantId: null };
}

export async function updateVapiAssistant() {
  return { ...DISABLED_RESPONSE };
}

export async function listVapiAssistants() {
  return { ...DISABLED_RESPONSE, data: [] };
}

export async function deleteVapiAssistant() {
  return { ...DISABLED_RESPONSE };
}

export async function triggerOutboundCall() {
  return { ...DISABLED_RESPONSE };
}
