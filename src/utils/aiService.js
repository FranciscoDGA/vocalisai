/**
 * Serviço de Inteligência Artificial do Vocalis AI (Gemini / OpenAI)
 * Otimizado para respostas telefônicas breves, executivas e ultra-diretas (Débora)
 */

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const SYSTEM_PROMPT = `Você é Débora, consultora executiva da Vocalis falando ao telefone com empresários.
Sua missão é responder com extrema brevidade, objetividade e elegância. Empresários e médicos não têm tempo a perder ao telefone.

DIRETRIZES OBRIGATÓRIAS DE RESPOSTA TELEFÔNICA:
1. BREVIDADE MÁXIMA: Responda em no máximo 1 ou 2 frases curtas (total máximo de 20 a 25 palavras).
2. NUNCA faça discursos longos ou explicações técnicas profundas por telefone. Detalhes são para reuniões de demonstração.
3. SEMPRE finalize convidando diretamente para uma reunião rápida de 15 minutos ou para ver a demonstração na tela.
4. NUNCA use formatação Markdown, negrito, asteriscos, tópicos ou emojis.
5. Fale sempre "Vocalis". NUNCA use siglas em inglês como "AI Agency OS".

EXEMPLOS DE ESTILO ESPERADO:
- Cliente: "O que a Vocalis faz por uma clínica odontológica?"
  Débora: "Automatizamos o agendamento de consultas e o atendimento 24 horas no WhatsApp, zerando faltas. Quer ver uma demonstração de 15 minutos com nossa equipe?"
- Cliente: "Quanto custa?"
  Débora: "Nossos planos começam em duzentos e noventa e sete reais por mês com trinta por cento de desconto de lançamento. Quer ativar seu teste agora?"
- Cliente: "Você integra com meu sistema?"
  Débora: "Sim, integramos com WhatsApp, Google Agenda e os principais sistemas do mercado em poucos minutos. Quer que eu te mande o material completo?"`;

/**
 * Envia uma mensagem para o Gemini com suporte a histórico multi-turn
 */
export async function askDeboraAI(userMessage, context = {}, history = []) {
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
        const isModel = item.speaker.toLowerCase().includes('débora') || item.speaker.toLowerCase().includes('debora');
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
  let fallbackReply = "Com a Vocalis, sua empresa atende em menos de meio segundo e agenda clientes 24 horas por dia. Quer agendar uma reuniao rapida de 15 minutos?";

  if (lowerMsg.includes('odonto') || lowerMsg.includes('dentist') || lowerMsg.includes('clínica') || lowerMsg.includes('clinica')) {
    fallbackReply = "Para sua clinica, a Vocalis atende chamadas na hora, agenda avaliacoes e zera as faltas de pacientes. Quer ver uma demonstracao de 15 minutos?";
  } else if (lowerMsg.includes('preço') || lowerMsg.includes('valor') || lowerMsg.includes('quanto custa')) {
    fallbackReply = "Temos planos a partir de duzentos e noventa e sete reais por mes com trinta por cento de desconto de lancamento. Quer liberar seu acesso agora?";
  } else if (lowerMsg.includes('ouvin') || lowerMsg.includes('escut') || lowerMsg.includes('ola') || lowerMsg.includes('olá')) {
    fallbackReply = "Estou te ouvindo perfeitamente, Francisco! Qual e o ramo da sua empresa para fazermos um diagnostico rapido?";
  }

  return {
    success: false,
    text: fallbackReply
  };
}

export const askRobertaAI = askDeboraAI;
