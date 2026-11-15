// Vercel Serverless Function: Síntese de Voz Neural do Google Gemini (WAV)
// Converte texto em fala humana fluida e natural sem custo de ElevenLabs

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
  header.writeUInt16LE(1, 20); // PCM linear
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
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Chave GEMINI_API_KEY não configurada' });
  }

  const body = req.method === 'POST' ? req.body : req.query;
  const text = body?.text || req.query?.text || 'Olá, sou a Roberta da Vocalis AI.';
  const voiceName = body?.voice || req.query?.voice || 'Kore';

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-tts:generateContent?key=${apiKey}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: text.slice(0, 500) }] }],
        generationConfig: {
          responseModalities: ['AUDIO'],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: {
                voiceName
              }
            }
          }
        }
      })
    });

    if (!response.ok) {
      const err = await response.text();
      return res.status(response.status).json({ error: err });
    }

    const data = await response.json();
    const inlineData = data.candidates?.[0]?.content?.parts?.[0]?.inlineData;

    if (!inlineData?.data) {
      return res.status(500).json({ error: 'Nenhum áudio retornado pelo modelo' });
    }

    const pcmBuffer = Buffer.from(inlineData.data, 'base64');
    const wavBuffer = pcmToWav(pcmBuffer, 24000);

    // Se solicitado formato binário direto de áudio (para tocar via <audio src="...">)
    if (req.query?.format === 'audio' || req.headers?.accept?.includes('audio/')) {
      res.setHeader('Content-Type', 'audio/wav');
      res.setHeader('Cache-Control', 'public, max-age=86400, s-maxage=86400');
      return res.status(200).send(wavBuffer);
    }

    // Retorna JSON com o base64 do WAV
    return res.status(200).json({
      success: true,
      audioBase64: `data:audio/wav;base64,${wavBuffer.toString('base64')}`,
      durationEstimateMs: Math.round((pcmBuffer.length / (24000 * 2)) * 1000)
    });
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Erro ao sintetizar áudio' });
  }
}
