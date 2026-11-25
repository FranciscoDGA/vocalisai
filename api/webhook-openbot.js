// Vercel Serverless Function: Webhook Inbound do OpenBot (autenticado por segredo)
import { applyCorsHeaders, checkRateLimit, safeCompareSecret } from './_security.js';

export default async function handler(req, res) {
  const originAllowed = applyCorsHeaders(req, res, 'POST,OPTIONS', 'Content-Type, Authorization, X-OpenBot-Token');

  if (req.method === 'OPTIONS') {
    return res.status(originAllowed ? 200 : 403).end();
  }

  if (!originAllowed) {
    return res.status(403).json({ success: false, error: 'Origem não autorizada.' });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Apenas POST é permitido.' });
  }

  const rateCheck = checkRateLimit(req, 'webhook-openbot', 30, 60_000);
  if (!rateCheck.allowed) {
    res.setHeader('Retry-After', String(rateCheck.retryAfterSeconds));
    return res.status(429).json({ success: false, error: 'Limite de requisições excedido.' });
  }

  const expectedSecret = process.env.OPENBOT_WEBHOOK_SECRET;
  if (!expectedSecret) {
    return res.status(503).json({
      received: false,
      error: 'Webhook desativado: variável OPENBOT_WEBHOOK_SECRET não configurada no servidor.',
    });
  }

  const providedToken = req.headers?.['x-openbot-token'] || '';
  if (!safeCompareSecret(String(providedToken), expectedSecret)) {
    return res.status(401).json({ received: false, error: 'Assinatura/token inválido.' });
  }

  return res.status(501).json({
    received: false,
    implemented: false,
    timestamp: new Date().toISOString(),
    message: 'Webhook autenticado, porém o processamento assíncrono em produção ainda está em desenvolvimento.',
  });
}
