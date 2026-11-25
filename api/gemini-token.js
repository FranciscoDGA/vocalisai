// Vercel Serverless Function: Geração de Token Efêmero do Gemini Live (somente usuário autenticado)
import { applyCorsHeaders, checkRateLimit, verifySupabaseBearerToken } from './_security.js';

export default async function handler(req, res) {
  const originAllowed = applyCorsHeaders(req, res, 'POST,OPTIONS', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(originAllowed ? 200 : 403).end();
  }

  if (!originAllowed) {
    return res.status(403).json({ success: false, error: 'Origem não autorizada.' });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Método não permitido. Utilize POST.' });
  }

  const rateCheck = checkRateLimit(req, 'gemini-token', 10, 60_000);
  if (!rateCheck.allowed) {
    res.setHeader('Retry-After', String(rateCheck.retryAfterSeconds));
    return res.status(429).json({ success: false, error: 'Limite temporário de requisições excedido.' });
  }

  const authResult = await verifySupabaseBearerToken(req);
  if (!authResult.authenticated) {
    return res.status(authResult.status).json({ success: false, error: authResult.error });
  }

  try {
    const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(503).json({
        success: false,
        error: 'Serviço de voz em tempo real não configurado no servidor.',
      });
    }

    const now = Date.now();
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1alpha/auth_tokens?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          uses: 1,
          expireTime: new Date(now + 30 * 60e3).toISOString(),
          newSessionExpireTime: new Date(now + 2 * 60e3).toISOString(),
        }),
      }
    );

    if (!response.ok) {
      return res.status(502).json({
        success: false,
        error: 'Não foi possível gerar sessão efêmera de áudio no provedor.',
      });
    }

    const data = await response.json();
    return res.status(200).json({
      success: true,
      token: data.name,
      model: 'gemini-3.8-live',
      voice: 'Kore',
    });
  } catch {
    return res.status(500).json({
      success: false,
      error: 'Erro interno ao gerar sessão de áudio.',
    });
  }
}
