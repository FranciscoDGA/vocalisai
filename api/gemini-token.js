// Vercel Serverless Function: Geração de Token Efêmero do Gemini Live (Google)
// Permite que o navegador abra WebSockets diretamente com o Gemini Live
// SEM expor a chave de API mestra do usuário no código do cliente.

export default async function handler(req, res) {
  // Configuração de CORS para permitir chamadas do próprio app
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        success: false,
        error: 'Chave GEMINI_API_KEY não configurada no ambiente da aplicação.'
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
          expireTime: new Date(now + 30 * 60e3).toISOString(), // 30 minutos
          newSessionExpireTime: new Date(now + 2 * 60e3).toISOString() // 2 minutos para estabelecer
        })
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      return res.status(response.status).json({
        success: false,
        error: `Erro ao obter token do Gemini: ${errText}`
      });
    }

    const data = await response.json();

    return res.status(200).json({
      success: true,
      token: data.name,
      model: 'gemini-3.8-live',
      voice: 'Kore'
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message || 'Erro interno ao gerar sessão de áudio'
    });
  }
}
