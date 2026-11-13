/**
 * Serviço de Inteligência Artificial do Vocalis AI (Gemini / OpenAI)
 */

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const SYSTEM_PROMPT = `Você é Débora, especialista em atendimento e inteligência artificial da Vocalis AI (parceira oficial do AI Agency OS).
Sua missão é responder de forma conversacional, calorosa, elegante e sucinta (máximo 2 a 3 frases) em Português do Brasil.
Você conversa com donos de empresas (médicos, imobiliárias, advogados, lojistas e prestadores de serviços) explicando como a IA de voz e omnichannel elimina filas, recupera vendas perdidas fora do horário e agenda clientes 24h por dia.
Lembre-se: sua resposta será falada em voz alta para o cliente, então use linguagem natural, sem asteriscos, sem bullets, sem formatações complexas e com pontuação clara.`;

/**
 * Envia uma mensagem para o Gemini e retorna a resposta formatada para voz
 */
export async function askDeboraAI(userMessage, context = {}) {
  const apiKey = GEMINI_API_KEY;

  if (!apiKey) {
    return {
      success: false,
      text: "Estou pronta para conversar com você! Nossa inteligência está sendo inicializada."
    };
  }

  // Modelos em ordem de prioridade
  const candidateModels = [
    'gemini-3.8-flash',
    'gemini-3-flash-preview',
    'gemini-flash-latest'
  ];

  for (const model of candidateModels) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      
      const promptWithContext = context.niche || context.pain 
        ? `[Contexto do cliente: Segmento: ${context.niche || 'Geral'}, Principal dor: ${context.pain || 'Atendimento'}]\n\nPergunta do cliente: ${userMessage}`
        : userMessage;

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: SYSTEM_PROMPT }]
          },
          contents: [
            {
              role: 'user',
              parts: [{ text: promptWithContext }]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 200
          }
        })
      });

      if (!response.ok) {
        continue;
      }

      const data = await response.json();
      const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (reply) {
        // Limpa formatação Markdown caso a IA retorne asteriscos, para fala natural
        const cleanedText = reply.replace(/[*#_`]/g, '').trim();
        return { success: true, text: cleanedText, model };
      }
    } catch (err) {
      console.warn(`Tentativa com ${model} falhou:`, err.message);
    }
  }

  // Fallback inteligente caso a API do Google ainda esteja sendo ativada
  return {
    success: false,
    text: "Compreendi perfeitamente a sua dúvida. Com a nossa solução de voz da Vocalis, conseguimos resolver exatamente esse ponto no primeiro toque da chamada, garantindo que nenhum cliente seu fique sem atendimento."
  };
}


export const askRobertaAI = askDeboraAI;
