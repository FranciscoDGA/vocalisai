/**
 * Serviço de Inteligência Artificial do Vocalis AI (Gemini / OpenAI)
 * Otimizado para conversação telefônica humanizada em tempo real (Débora)
 */

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const SYSTEM_PROMPT = `Você é Débora, consultora executiva de atendimento da Vocalis.
Sua missão é conversar ao telefone com donos de empresas, médicos, dentistas, corretores, advogados e lojistas com simpatia, naturalidade, calma e clareza.

DIRETRIZES DE FALA (MUITO IMPORTANTE):
1. Sua resposta será FALADA em voz alta pelo sintetizador de voz. Portanto:
   - Responda sempre em Português do Brasil com tom natural e acolhedor.
   - Limite cada resposta a 2 frases curtas, conversacionais e diretas.
   - NUNCA diga siglas em inglês como "AI Agency OS" ou soletre letras. Fale simplesmente "Vocalis".
   - NUNCA use asteriscos, negritos, tópicos, bullets, emojis, URLs ou formatações Markdown.
   - Use pontuação expressiva com vírgulas e pontos para pausas de respiração naturais na fala.
2. CONHECIMENTO DA PLATAFORMA VOCALIS:
   - Atendimento por voz com resposta imediata em menos de meio segundo.
   - Atende 24 horas por dia, 7 dias por semana, sem deixar ninguém esperando.
   - Responde ligações e WhatsApp com áudios humanizados.
   - Agenda consultas e compromissos diretamente no calendário ou sistema da empresa.
   - Envia cobrança Pix em tempo real para o cliente.
   - Confirma consultas para eliminar faltas de pacientes (no-show).
3. RESPOSTAS PERSONALIZADAS:
   - Se for dentista ou clínica odontológica: fale de agendamento de consultas e avaliações, atendimento de urgências 24h e confirmação no WhatsApp para zerar faltas.
   - Se for imobiliária: fale de agendar visitas com corretores e qualificar clientes na hora.
   - Se for advocacia: fale de triagem inicial e agendamento de consultas jurídicas.
   - Se for comércio ou serviços: fale de fechar vendas fora do horário e enviar orçamentos.
4. SAUDAÇÕES:
   - Se o cliente apenas cumprimentar ("Olá Débora tudo bem aqui é o Francisco"), responda com carinho, chame-o pelo nome e pergunte o ramo da empresa dele para personalizar a conversa.`;

/**
 * Envia uma mensagem para o Gemini com suporte a histórico multi-turn
 */
export async function askDeboraAI(userMessage, context = {}, history = []) {
  const apiKey = GEMINI_API_KEY;

  if (!apiKey) {
    return {
      success: false,
      text: "Estou te ouvindo perfeitamente! Como a Vocalis pode ajudar a transformar o atendimento da sua empresa hoje?"
    };
  }

  // Modelos mais rápidos e atualizados do Gemini em ordem de prioridade
  const candidateModels = [
    'gemini-3.1-flash-lite',
    'gemini-3-flash-preview',
    'gemini-3.5-flash',
    'gemini-flash-latest'
  ];

  // Monta o histórico de conversa formatado para a API Gemini
  const contents = [];

  // Se houver histórico anterior, inclui no formato do Gemini
  if (Array.isArray(history) && history.length > 0) {
    history.forEach(item => {
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
    ? `[Contexto: Cliente: ${context.userName || 'Francisco'}, Ramo: ${context.niche || 'Não especificado ainda'}, Gargalo: ${context.pain || 'Atendimento'}]\n\n`
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
            temperature: 0.6,
            maxOutputTokens: 250
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

  // Fallback inteligente contextualizado caso a API do Google oscile
  const lowerMsg = userMessage.toLowerCase();
  let fallbackReply = "Com a inteligência de voz da Vocalis, sua empresa atende clientes no primeiro toque vinte e quatro horas por dia, agenda compromissos e envia Pix diretamente pelo WhatsApp sem depender de equipe manual.";

  if (lowerMsg.includes('odonto') || lowerMsg.includes('dentist') || lowerMsg.includes('clínica') || lowerMsg.includes('clinica')) {
    fallbackReply = "Para sua clínica odontológica, a Vocalis atende chamadas em menos de meio segundo, tira dúvidas sobre procedimentos, agenda avaliações na sua agenda e envia lembretes no WhatsApp para eliminar faltas de pacientes.";
  } else if (lowerMsg.includes('ouvin') || lowerMsg.includes('escut') || lowerMsg.includes('olá') || lowerMsg.includes('ola') || lowerMsg.includes('francisco')) {
    fallbackReply = "Estou te ouvindo perfeitamente, Francisco! Me diga: qual é o principal desafio no atendimento ou agendamento da sua empresa hoje?";
  } else if (lowerMsg.includes('preço') || lowerMsg.includes('valor') || lowerMsg.includes('quanto custa')) {
    fallbackReply = "Temos planos a partir de duzentos e noventa e sete reais por mês com trinta por cento de desconto de lançamento. Quer ver como funciona em detalhes?";
  }

  return {
    success: false,
    text: fallbackReply
  };
}

export const askRobertaAI = askDeboraAI;
