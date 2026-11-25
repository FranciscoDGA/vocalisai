/**
 * Motor Determinístico de Simulação Ilustrativa da Roberta (Vocalis AI)
 *
 * REGRAS DE SEGURANÇA E TRANSPARÊNCIA:
 * - Não expõe nem lê nenhuma chave de API (VITE_GEMINI_API_KEY / VITE_OPENAI_API_KEY) no navegador.
 * - Utiliza exclusivamente a fonte única comercial (`commercialCatalogUtils.js`) e regras rígidas para setores sensíveis.
 */

import {
  buildBeatrizCommercialReply,
  buildRobertaCommercialReply,
} from './commercialCatalogUtils';

export async function askRobertaAI(userMessage) {
  const rawMessage = String(userMessage || '').trim();
  const lowerMsg = rawMessage.toLowerCase();

  if (
    lowerMsg.includes('preço') ||
    lowerMsg.includes('preco') ||
    lowerMsg.includes('valor') ||
    lowerMsg.includes('plano') ||
    lowerMsg.includes('quanto custa') ||
    lowerMsg.includes('excedent') ||
    lowerMsg.includes('limite') ||
    lowerMsg.includes('anual')
  ) {
    return {
      success: true,
      simulated: true,
      text:
        lowerMsg.includes('whatsapp') || lowerMsg.includes('webchat') || lowerMsg.includes('excedent') || lowerMsg.includes('limite')
          ? buildBeatrizCommercialReply(rawMessage)
          : buildRobertaCommercialReply(),
    };
  }

  if (
    lowerMsg.includes('odonto') ||
    lowerMsg.includes('dentist') ||
    lowerMsg.includes('clínica') ||
    lowerMsg.includes('clinica') ||
    lowerMsg.includes('saúde') ||
    lowerMsg.includes('saude') ||
    lowerMsg.includes('médic') ||
    lowerMsg.includes('medic') ||
    lowerMsg.includes('dor')
  ) {
    return {
      success: true,
      simulated: true,
      text: 'Esta é uma simulação ilustrativa para agendamento de rotina. Não realizamos diagnóstico clínico nem triagem de urgência sem protocolo aprovado pelo responsável técnico e encaminhamento humano imediato.',
    };
  }

  if (
    lowerMsg.includes('advoca') ||
    lowerMsg.includes('juríd') ||
    lowerMsg.includes('jurid') ||
    lowerMsg.includes('processo')
  ) {
    return {
      success: true,
      simulated: true,
      text: 'Para escritórios jurídicos, esta simulação ilustra recepção administrativa conforme regras do escritório, sem parecer jurídico, estimativa de causa ou conformidade automática.',
    };
  }

  if (
    lowerMsg.includes('financ') ||
    lowerMsg.includes('cobran') ||
    lowerMsg.includes('banco') ||
    lowerMsg.includes('invest')
  ) {
    return {
      success: true,
      simulated: true,
      text: 'Para área financeira, o fluxo ilustra lembretes administrativos segundo regras aprovadas pela empresa, sem aconselhamento financeiro ou conformidade regulatória automática.',
    };
  }

  if (
    lowerMsg.includes('humano') ||
    lowerMsg.includes('atendente') ||
    lowerMsg.includes('pessoa') ||
    lowerMsg.includes('equipe')
  ) {
    return {
      success: true,
      simulated: true,
      text: 'Esta demonstração roda no navegador de forma ilustrativa. Para falar com uma pessoa da nossa equipe, utilize o formulário de contato ou WhatsApp comercial.',
    };
  }

  if (
    lowerMsg.includes('ouvin') ||
    lowerMsg.includes('escut') ||
    lowerMsg.includes('ola') ||
    lowerMsg.includes('olá') ||
    lowerMsg.includes('oi')
  ) {
    return {
      success: true,
      simulated: true,
      text: 'Simulação ilustrativa ativa no navegador! Qual é o segmento da sua empresa para testarmos um exemplo de roteiro?',
    };
  }

  return {
    success: true,
    simulated: true,
    text: 'Esta é uma simulação ilustrativa no navegador. Em operação real, as respostas seguem a base de conhecimento configurada e podem encaminhar o contato para a equipe humana.',
  };
}

export const askDeboraAI = askRobertaAI;
