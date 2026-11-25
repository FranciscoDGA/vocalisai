// Vercel Serverless Function: Síntese de Voz Neural via Gemini (proxy seguro)
import { applyCorsHeaders, checkRateLimit } from './_security.js';

const ALLOWED_VOICES = new Set(['Kore', 'Fenrir', 'Puck', 'Aoede']);

function pcmToWav(pcmBuffer, sampleRate = 24000) {
  const numChannels = 1;
  const bitsPerSample = 16;
  const byteRate = (sampleRate * numChannels * bitsPerSample) / 8;
  const blockAlign = (numChannels * bitsPerSample) / 8;
  const dataSize = pcmBuffer.length;
  const header = Buffer.alloc(44);

  header.write('RIFF', 0);
  header.writeUInt32LE(36 + dataSize, 4);
  header.write('WAVE', 8);
  header.write('fmt ', 12);
  header.writeUInt32LE(16, 16);
  header.writeUInt16LE(1, 20);
  header.writeUInt16LE(numChannels, 22);
  header.writeUInt32LE(sampleRate, 24);
  header.writeUInt32LE(byteRate, 28);
  header.writeUInt16LE(blockAlign, 32);
  header.writeUInt16LE(bitsPerSample, 34);
  header.write('data', 36);
  header.writeUInt32LE(dataSize, 40);

  return Buffer.concat([header, pcmBuffer]);
}

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

  const rateCheck = checkRateLimit(req, 'tts', 20, 60_000);
  if (!rateCheck.allowed) {
    res.setHeader('Retry-After', String(rateCheck.retryAfterSeconds));
    return res.status(429).json({ success: false, error: 'Limite temporário de requisições excedido.' });
  }

  const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(503).json({ success: false, error: 'Serviço de síntese neural indisponível no momento.' });
  }

  const body = req.body && typeof req.body === 'object' ? req.body : {};
  const rawText = typeof body.text === 'string' ? body.text.trim() : '';
  const voiceName = ALLOWED_VOICES.has(body.voice) ? body.voice : 'Kore';

  if (!rawText) {
    return res.status(400).json({ success: false, error: 'Informe um texto válido para síntese.' });
  }

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-tts:generateContent?key=${apiKey}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: rawText.slice(0, 500) }] }],
        generationConfig: {
          responseModalities: ['AUDIO'],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: {
                voiceName,
              },
            },
          },
        },
      }),
    });

    if (!response.ok) {
      return res.status(502).json({ success: false, error: 'Falha ao sintetizar áudio no provedor.' });
    }

    const data = await response.json();
    const inlineData = data.candidates?.[0]?.content?.parts?.[0]?.inlineData;

    if (!inlineData?.data) {
      return res.status(502).json({ success: false, error: 'Resposta de áudio indisponível no provedor.' });
    }

    const pcmBuffer = Buffer.from(inlineData.data, 'base64');
    const wavBuffer = pcmToWav(pcmBuffer, 24000);

    return res.status(200).json({
      success: true,
      audioBase64: `data:audio/wav;base64,${wavBuffer.toString('base64')}`,
      durationEstimateMs: Math.round((pcmBuffer.length / (24000 * 2)) * 1000),
    });
  } catch {
    return res.status(500).json({ success: false, error: 'Erro interno ao sintetizar áudio.' });
  }
}
