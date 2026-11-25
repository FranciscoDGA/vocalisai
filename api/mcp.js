// Vercel Serverless Function: MCP (Model Context Protocol) — Protegido e sem simulação de sucesso
import { applyCorsHeaders, checkRateLimit, safeCompareSecret } from './_security.js';

export default async function handler(req, res) {
  const originAllowed = applyCorsHeaders(
    req,
    res,
    'GET,POST,OPTIONS',
    'Content-Type, Authorization, X-OpenBot-Agent'
  );

  if (req.method === 'OPTIONS') {
    return res.status(originAllowed ? 200 : 403).end();
  }

  if (!originAllowed) {
    return res.status(403).json({ success: false, error: 'Origem não autorizada.' });
  }

  const rateCheck = checkRateLimit(req, 'mcp', 30, 60_000);
  if (!rateCheck.allowed) {
    res.setHeader('Retry-After', String(rateCheck.retryAfterSeconds));
    return res.status(429).json({ success: false, error: 'Limite de requisições excedido.' });
  }

  const configuredKey = process.env.MCP_API_KEY;
  if (!configuredKey) {
    return res.status(503).json({
      success: false,
      error: 'Endpoint MCP desativado: variável de servidor MCP_API_KEY não configurada.',
    });
  }

  const authHeader = req.headers?.authorization || '';
  const providedKey = authHeader.startsWith('Bearer ') ? authHeader.slice(7).trim() : '';
  if (!safeCompareSecret(providedKey, configuredKey)) {
    return res.status(401).json({ success: false, error: 'Não autorizado.' });
  }

  const tools = [
    {
      name: 'vocalis_trigger_call',
      status: 'not_implemented',
      description: 'Desativado até integração autenticada de telefonia no servidor.',
    },
    {
      name: 'vocalis_send_whatsapp',
      status: 'not_implemented',
      description: 'Desativado até integração oficial Meta Cloud API no servidor.',
    },
    {
      name: 'vocalis_get_leads',
      status: 'not_implemented',
      description: 'Desativado até autenticação multi-tenant por empresa.',
    },
    {
      name: 'vocalis_system_status',
      status: 'not_implemented',
      description: 'Telemetria automática indisponível no momento.',
    },
  ];

  if (req.method === 'GET') {
    return res.status(200).json({
      name: 'vocalis-ai-mcp',
      version: '2.0.0',
      operational: false,
      tools,
    });
  }

  if (req.method === 'POST') {
    const { action, tool } = req.body || {};
    if (action === 'list_tools' || (!tool && !action)) {
      return res.status(200).json({ operational: false, tools });
    }

    return res.status(501).json({
      success: false,
      implemented: false,
      tool: tool || null,
      error:
        'Execução remota via MCP ainda não está implementada em produção; nenhuma ação externa foi disparada.',
    });
  }

  return res.status(405).json({ success: false, error: 'Método não permitido.' });
}
