// Vercel Serverless Function: Webhook Inbound do OpenBot para a Vocalis AI
// Recebe tarefas, acionamentos e mensagens dos agentes do OpenBot

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-OpenBot-Token');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Apenas POST é permitido' });
  }

  const payload = req.body || {};
  console.log('[OpenBot Webhook] Evento recebido:', payload.event || 'desconhecido');

  return res.status(200).json({
    received: true,
    status: 'processed',
    timestamp: new Date().toISOString(),
    event: payload.event || 'custom_task',
    message: 'Evento processado com sucesso pelo ecossistema Vocalis AI.'
  });
}
