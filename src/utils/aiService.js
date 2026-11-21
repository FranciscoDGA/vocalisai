/**
 * Serviço de Inteligência Artificial do Vocalis AI (Gemini / OpenAI)
 * Otimizado para respostas telefônicas breves, executivas e ultra-diretas (Roberta · SDR)
 */

import { buildRobertaCommercialReply } from './commercialCatalogUtils';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const ROBERTA_COMMERCIAL_REPLY = buildRobertaCommercialReply();

const SYSTEM_PROMPT = `Você é Roberta, SDR e consultora executiva da Vocalis falando ao telefone com empresários.
Sua missão é responder com extrema brevidade, objetividade e elegância. Empresários e médicos não têm tempo a perder ao telefone.

DIRETRIZES OBRIGATÓRIAS DE RESPOSTA TELEFÔNICA:
1. BREVIDADE MÁXIMA: Responda em no máximo 1 ou 2 frases curtas (total máximo de 20 a 25 palavras).
2. NUNCA faça discursos longos ou explicações técnicas profundas por telefone. Detalhes são para reuniões de demonstração.
3. SEMPRE finalize convidando diretamente para uma reunião rápida de 15 minutos ou para ver a demonstração na tela.
4. NUNCA use formatação Markdown, negrito, asteriscos, tópicos ou emojis.
5. Fale sempre "Vocalis". NUNCA use siglas em inglês como "AI Agency OS".
6. SETORES SENSÍVEIS: Nunca faça diagnóstico médico/odontológico, não avalie gravidade nem recomende aguardar em casos de dor ou urgência; protocolos de saúde e urgência exigem aprovação do profissional responsável e encaminhamento humano imediato. Em advocacia e finanças, não emita parecer jurídico, valor de causa nem garanta conformidade automática; respostas em operação dependem da base de conhecimento e regras do cliente.

EXEMPLOS DE ESTILO ESPERADO:
- Cliente: "O que a Vocalis faz por uma clínica odontológica?"
  Roberta: "Apoiamos agendamentos de rotina e lembretes conforme a base da clínica, sem diagnóstico nem orientação de urgência sem protocolo aprovado pelo responsável técnico. Quer ver uma demonstração?"
- Cliente: "Quanto custa?"
  Roberta: "${ROBERTA_COMMERCIAL_REPLY}"
- Cliente: "Você integra com meu sistema?"
  Roberta: "Integrações com WhatsApp, agendas e sistemas externos são alinhadas conforme o plano. Quer agendar uma demonstração?"`;

/**
 * Envia uma mensagem para o Gemini com suporte a histórico multi-turn
 */
export async function askRobertaAI(userMessage, context = {}, history = []) {
  const apiKey = GEMINI_API_KEY;

  if (!apiKey) {
    return {
      success: false,
      text: "Estou te ouvindo perfeitamente! Quer agendar uma demonstracao rapida de 15 minutos para ver na pratica?"
    };
  }

  // Modelos mais rápidos e atualizados do Gemini em ordem de prioridade
  const candidateModels = [
    'gemini-2.5-flash',
    'gemini-2.5-pro',
    'gemini-3.1-flash-lite',
    'gemini-flash-latest'
  ];

  // Monta o histórico de conversa formatado para a API Gemini
  const contents = [];

  // Se houver histórico anterior, inclui no formato do Gemini
  if (Array.isArray(history) && history.length > 0) {
    history.slice(-4).forEach(item => {
      if (item.text && item.speaker) {
        const isModel = item.speaker.toLowerCase().includes('roberta') || item.speaker.toLowerCase().includes('débora') || item.speaker.toLowerCase().includes('debora');
        contents.push({
          role: isModel ? 'model' : 'user',
          parts: [{ text: item.text }]
        });
      }
    });
  }

  // Adiciona a pergunta atual com contexto empresarial embutido
  const contextPrefix = (context.niche || context.pain || context.userName)
    ? `[Contexto: Cliente: ${context.userName || 'Francisco'}, Ramo: ${context.niche || 'Geral'}]\n\n`
    : '';

  contents.push({
    role: 'user',
    parts: [{ text: `${contextPrefix}${userMessage}` }]
  });

  for (const model of candidateModels) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: SYSTEM_PROMPT }]
          },
          contents: contents,
          generationConfig: {
            temperature: 0.4,
            maxOutputTokens: 80
          }
        })
      });

      if (!response.ok) {
        continue;
      }

      const data = await response.json();
      const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (reply) {
        // Limpa formatações Markdown e caracteres especiais para fala fluida
        const cleanedText = reply
          .replace(/[*#_`~]/g, '')
          .replace(/\n+/g, ' ')
          .trim();
        return { success: true, text: cleanedText, model };
      }
    } catch (err) {
      console.warn(`Tentativa com ${model} falhou:`, err.message);
    }
  }

  // Fallback breve e executivo
  const lowerMsg = userMessage.toLowerCase();
  let fallbackReply = "Com a Vocalis, sua empresa pode automatizar atendimentos e agendamentos conforme a configuração do plano. Quer agendar uma reuniao rapida de 15 minutos?";

  if (lowerMsg.includes('odonto') || lowerMsg.includes('dentist') || lowerMsg.includes('clínica') || lowerMsg.includes('clinica')) {
    fallbackReply = "Para clínicas, esta é uma simulação ilustrativa de agendamento de rotina conforme as regras aprovadas pelo responsável técnico, sem diagnóstico por IA. Quer ver uma demonstração com nossa equipe?";
  } else if (lowerMsg.includes('advoca') || lowerMsg.includes('juríd') || lowerMsg.includes('jurid')) {
    fallbackReply = "Para escritórios, apoiamos apenas recepção administrativa conforme regras do cliente, sem parecer jurídico ou valor de causa. Quer ver uma demonstração?";
  } else if (lowerMsg.includes('preço') || lowerMsg.includes('valor') || lowerMsg.includes('quanto custa')) {
    fallbackReply = buildRobertaCommercialReply();
  } else if (lowerMsg.includes('ouvin') || lowerMsg.includes('escut') || lowerMsg.includes('ola') || lowerMsg.includes('olá')) {
    fallbackReply = "Estou te ouvindo perfeitamente, Francisco! Qual e o ramo da sua empresa para fazermos um diagnostico rapido?";
  }

  return {
    success: false,
    text: fallbackReply
  };
}

export const askDeboraAI = askRobertaAI;
