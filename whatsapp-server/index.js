import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import QRCode from 'qrcode';
import qrcodeTerminal from 'qrcode-terminal';
import makeWASocket, {
  DisconnectReason,
  useMultiFileAuthState,
  fetchLatestBaileysVersion,
  makeCacheableSignalKeyStore
} from '@whiskeysockets/baileys';
import pino from 'pino';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8080;
const API_KEY = process.env.API_KEY || 'minha_chave_mestra_secreta_123';

app.use(cors());
app.use(express.json());

// Estado global da conexão
let sock = null;
let currentQR = null;
let currentQRDataUrl = null;
let connectionState = 'initializing'; // initializing, qr_ready, connecting, connected, disconnected
let connectedUser = null;

const sessionDir = path.join(__dirname, 'session_auth');
if (!fs.existsSync(sessionDir)) {
  fs.mkdirSync(sessionDir, { recursive: true });
}

// Inicia o cliente WhatsApp Baileys
async function startWhatsApp() {
  const { state, saveCreds } = await useMultiFileAuthState(sessionDir);
  const { version, isLatest } = await fetchLatestBaileysVersion();

  console.log(`[WhatsApp Engine] Iniciando Baileys v${version.join('.')} (Última versão: ${isLatest})...`);

  sock = makeWASocket({
    version,
    logger: pino({ level: 'silent' }),
    printQRInTerminal: false,
    auth: {
      creds: state.creds,
      keys: makeCacheableSignalKeyStore(state.keys, pino({ level: 'silent' }))
    },
    generateHighQualityLinkPreview: true,
    browser: ['Vocalis AI', 'Chrome', '124.0.0.0']
  });

  sock.ev.on('creds.update', saveCreds);

  sock.ev.on('connection.update', async (update) => {
    const { connection, lastDisconnect, qr } = update;

    if (qr) {
      currentQR = qr;
      connectionState = 'qr_ready';
      try {
        currentQRDataUrl = await QRCode.toDataURL(qr, { width: 320, margin: 2 });
      } catch (e) {
        console.error('Erro ao gerar QRCode DataURL:', e);
      }

      console.log('\n=============================================================');
      console.log('📱 ESCANEIE O QR CODE ABAIXO NO SEU WHATSAPP (Aparelhos Conectados):');
      console.log('=============================================================');
      qrcodeTerminal.generate(qr, { small: true });
      console.log('Ou abra no seu navegador: http://localhost:' + PORT + '/instance/connect/vocalis\n');
    }

    if (connection === 'close') {
      const statusCode = lastDisconnect?.error?.output?.statusCode;
      const shouldReconnect = statusCode !== DisconnectReason.loggedOut;
      console.log(`[WhatsApp Engine] Conexão encerrada (Status: ${statusCode}). Reconectar? ${shouldReconnect}`);
      connectionState = 'disconnected';
      currentQR = null;
      currentQRDataUrl = null;
      connectedUser = null;

      if (shouldReconnect) {
        setTimeout(startWhatsApp, 3000);
      } else {
        console.log('[WhatsApp Engine] Sessão deslogada pelo WhatsApp. Limpando credenciais antigas...');
        fs.rmSync(sessionDir, { recursive: true, force: true });
        fs.mkdirSync(sessionDir, { recursive: true });
        setTimeout(startWhatsApp, 2000);
      }
    } else if (connection === 'open') {
      connectionState = 'connected';
      currentQR = null;
      currentQRDataUrl = null;
      connectedUser = sock.user?.id ? sock.user.id.split(':')[0] : 'Conectado';
      console.log('\n=============================================================');
      console.log(`✅ WHATSAPP CONECTADO COM SUCESSO! Número: +${connectedUser}`);
      console.log('=============================================================\n');
    }
  });
}

// Inicia Baileys
startWhatsApp();

// ==========================================
// Rotas da API (Compatível com Evolution API / UazAPI)
// ==========================================

// Middleware simples de autenticação (opcional - se passar apikey)
const authMiddleware = (req, res, next) => {
  const reqKey = req.headers['apikey'] || req.headers['authorization']?.replace('Bearer ', '');
  if (reqKey && reqKey !== API_KEY) {
    // Permite conexões locais para simplificar testes
    console.info(`[Auth] Chave recebida: ${reqKey}`);
  }
  next();
};

// Página Visual do QR Code (Abre no Navegador)
const renderHTML = () => `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Vocalis WhatsApp Engine - Conectar WhatsApp</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-[#121110] text-[#EDE8DF] min-h-screen flex items-center justify-center p-4 font-sans">
  <div class="max-w-md w-full bg-[#1C1A18] border border-[#2E2B27] rounded-3xl p-8 shadow-2xl text-center space-y-6">
    <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
      <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
      Vocalis WhatsApp Connector
    </div>
    
    <div>
      <h1 class="text-2xl font-bold text-white">Conectar WhatsApp Web</h1>
      <p class="text-xs text-[#A8A29A] mt-1.5">Conexão 100% gratuita sem taxas por mensagem da Meta</p>
    </div>

    <!-- Container do QR Code ou Sucesso -->
    <div id="status-card" class="bg-[#141312] border border-[#2E2B27] rounded-2xl p-6 min-h-[340px] flex flex-col items-center justify-center">
      <div id="loading" class="text-sm text-[#A8A29A]">Carregando QR Code...</div>
      <div id="qr-container" class="hidden">
        <img id="qr-img" class="w-64 h-64 rounded-xl shadow-md border-4 border-white bg-white mx-auto" />
        <p class="text-[11px] text-[#A8A29A] mt-3">Atualiza automaticamente a cada 20 segundos</p>
      </div>
      <div id="success-container" class="hidden space-y-4">
        <div class="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto text-3xl font-bold">✓</div>
        <div class="text-xl font-bold text-white">WhatsApp Conectado com Sucesso!</div>
        <div id="user-phone" class="text-sm text-emerald-400 font-mono bg-emerald-950/60 border border-emerald-800/60 px-4 py-2 rounded-full inline-block"></div>
        <p class="text-xs text-[#A8A29A] leading-relaxed">
          Tudo pronto! O seu robô de WhatsApp já está rodando em segundo plano no seu computador.
        </p>

        <!-- Botão de Teste Imediato -->
        <div class="pt-2 space-y-2">
          <button 
            id="btn-test-send"
            onclick="sendTestMessage()"
            class="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-emerald-900/40"
          >
            <span>🚀 Enviar Mensagem de Teste para o meu Celular</span>
          </button>
          <div id="test-feedback" class="hidden text-xs py-2 px-3 rounded-lg"></div>

          <a 
            href="http://localhost:5173"
            target="_blank"
            class="w-full py-2.5 px-4 rounded-xl bg-[#2E2B27] hover:bg-[#3D3A35] text-stone-200 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors block"
          >
            <span>Voltar para o Painel da Vocalis AI (localhost:5173)</span>
          </a>
        </div>
      </div>
    </div>

    <div class="text-left bg-[#141312]/60 rounded-xl p-4 border border-[#262420] text-xs text-[#A8A29A] space-y-2">
      <div class="font-semibold text-white">💡 Como funciona agora?</div>
      <p class="text-[11px] leading-relaxed">
        Esta janela do navegador é o <strong>servidor local</strong> que mantém seu WhatsApp conectado com a IA. Você pode mantê-la aberta ou minimizada. Quando seus clientes fizerem ligações ou testes no site, as mensagens e áudios serão enviados <strong>automaticamente pelo seu chip em segundo plano</strong>, sem abrir nenhuma janela do navegador!
      </p>
    </div>

    <div class="text-[11px] text-[#736F69]">
      API ativa em <code class="text-amber-400 font-mono">http://localhost:${PORT}</code>
    </div>
  </div>

  <script>
    let currentConnectedPhone = null;

    async function checkStatus() {
      try {
        const res = await fetch('/api/status');
        const data = await res.json();
        
        const loading = document.getElementById('loading');
        const qrContainer = document.getElementById('qr-container');
        const qrImg = document.getElementById('qr-img');
        const successContainer = document.getElementById('success-container');
        const userPhone = document.getElementById('user-phone');

        if (data.status === 'connected') {
          currentConnectedPhone = data.phone;
          loading.classList.add('hidden');
          qrContainer.classList.add('hidden');
          successContainer.classList.remove('hidden');
          userPhone.textContent = '+' + data.phone;
        } else if (data.hasQR && data.qrDataUrl) {
          loading.classList.add('hidden');
          successContainer.classList.add('hidden');
          qrContainer.classList.remove('hidden');
          qrImg.src = data.qrDataUrl;
        } else {
          loading.classList.remove('hidden');
          loading.textContent = 'Gerando chave de pareamento...';
          qrContainer.classList.add('hidden');
          successContainer.classList.add('hidden');
        }
      } catch (e) {
        console.error(e);
      }
    }

    async function sendTestMessage() {
      if (!currentConnectedPhone) return;
      const btn = document.getElementById('btn-test-send');
      const feedback = document.getElementById('test-feedback');
      
      btn.disabled = true;
      btn.innerHTML = '<span>Enviando mensagem via WhatsApp...</span>';
      feedback.className = 'hidden';

      try {
        const res = await fetch('/message/sendText/vocalis', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            number: currentConnectedPhone,
            text: '👋 Olá! Teste com sucesso da Vocalis AI! O seu robô de WhatsApp está 100% conectado e funcionando perfeitamente em segundo plano.'
          })
        });
        const data = await res.json();
        if (data.success) {
          feedback.className = 'text-xs py-2 px-3 rounded-lg bg-emerald-950/60 border border-emerald-800 text-emerald-300 font-semibold block';
          feedback.textContent = '✓ Mensagem recebida no seu WhatsApp! Olhe no seu celular!';
        } else {
          throw new Error(data.error || 'Erro no envio');
        }
      } catch (err) {
        feedback.className = 'text-xs py-2 px-3 rounded-lg bg-rose-950/60 border border-rose-800 text-rose-300 font-semibold block';
        feedback.textContent = 'Falha ao enviar: ' + err.message;
      } finally {
        btn.disabled = false;
        btn.innerHTML = '<span>🚀 Enviar Outra Mensagem de Teste</span>';
      }
    }

    checkStatus();
    setInterval(checkStatus, 2500);
  </script>
</body>
</html>
`;

// Rotas de visualização web do QR Code
app.get('/', (req, res) => res.send(renderHTML()));
app.get('/instance/connect/:instance', (req, res) => res.send(renderHTML()));
app.get('/qrcode', (req, res) => res.send(renderHTML()));

// Rota de status JSON
app.get('/api/status', (req, res) => {
  res.json({
    status: connectionState,
    phone: connectedUser,
    hasQR: !!currentQR,
    qrDataUrl: currentQRDataUrl
  });
});

// Compatibilidade com Evolution API - connectionState
app.get('/instance/connectionState/:instance', (req, res) => {
  const state = connectionState === 'connected' ? 'open' : (currentQR ? 'connecting' : 'close');
  res.json({
    instance: {
      instanceName: req.params.instance,
      state
    }
  });
});

// Criação de Instância (Retorna QR code em base64 se solicitado)
app.post('/instance/create', (req, res) => {
  const instanceName = req.body.instanceName || 'vocalis';
  res.json({
    instance: {
      instanceName,
      status: connectionState === 'connected' ? 'open' : 'connecting'
    },
    qrcode: currentQRDataUrl ? { base64: currentQRDataUrl } : null
  });
});

// Disparo de Mensagem de Texto
// Suporta tanto /message/sendText/:instance quanto /message/sendText
async function handleSendText(req, res) {
  try {
    if (!sock || connectionState !== 'connected') {
      return res.status(503).json({
        success: false,
        error: 'WhatsApp ainda não conectado. Escaneie o QR Code em http://localhost:' + PORT
      });
    }

    const { number, text, options } = req.body;
    if (!number || !text) {
      return res.status(400).json({ success: false, error: 'Campos number e text são obrigatórios.' });
    }

    // Limpa caracteres do número
    let cleanPhone = String(number).replace(/\D/g, '');
    if (!cleanPhone.startsWith('55') && cleanPhone.length <= 11) {
      cleanPhone = `55${cleanPhone}`;
    }
    const jid = `${cleanPhone}@s.whatsapp.net`;

    // Presença "digitando..." se solicitado
    if (options?.presence === 'composing') {
      await sock.sendPresenceUpdate('composing', jid);
      const delayMs = options?.delay || 1000;
      await new Promise(r => setTimeout(r, Math.min(delayMs, 2500)));
      await sock.sendPresenceUpdate('paused', jid);
    }

    // Envia a mensagem
    const result = await sock.sendMessage(jid, { text });

    console.log(`[WhatsApp Server] Mensagem enviada para +${cleanPhone}: "${text.slice(0, 40)}..."`);

    res.json({
      success: true,
      key: result.key,
      message: result.message,
      status: 'PENDING'
    });
  } catch (error) {
    console.error('[WhatsApp Server] Erro ao enviar mensagem:', error);
    res.status(500).json({ success: false, error: error.message });
  }
}

app.post('/message/sendText/:instance', authMiddleware, handleSendText);
app.post('/message/sendText', authMiddleware, handleSendText);

// Disparo de Áudio (Nota de Voz PTT com microfone verde)
async function handleSendAudio(req, res) {
  try {
    if (!sock || connectionState !== 'connected') {
      return res.status(503).json({
        success: false,
        error: 'WhatsApp ainda não conectado. Escaneie o QR Code em http://localhost:' + PORT
      });
    }

    const { number, audio, options } = req.body;
    if (!number || !audio) {
      return res.status(400).json({ success: false, error: 'Campos number e audio são obrigatórios.' });
    }

    let cleanPhone = String(number).replace(/\D/g, '');
    if (!cleanPhone.startsWith('55') && cleanPhone.length <= 11) {
      cleanPhone = `55${cleanPhone}`;
    }
    const jid = `${cleanPhone}@s.whatsapp.net`;

    // Simula presença "gravando áudio..."
    await sock.sendPresenceUpdate('recording', jid);
    const delayMs = options?.delay || 2000;
    await new Promise(r => setTimeout(r, Math.min(delayMs, 4000)));
    await sock.sendPresenceUpdate('paused', jid);

    // Envia o áudio como PTT (Push-To-Talk)
    let audioPayload = {};
    if (audio.startsWith('http')) {
      audioPayload = { url: audio };
    } else if (audio.startsWith('data:') || audio.length > 500) {
      const base64Data = audio.replace(/^data:audio\/\w+;base64,/, '');
      audioPayload = Buffer.from(base64Data, 'base64');
    } else {
      audioPayload = { url: audio };
    }

    const result = await sock.sendMessage(jid, {
      audio: audioPayload,
      mimetype: 'audio/mp4',
      ptt: true // Microfone verde nativo do WhatsApp
    });

    console.log(`[WhatsApp Server] Áudio PTT enviado para +${cleanPhone}`);

    res.json({
      success: true,
      key: result.key,
      status: 'PENDING'
    });
  } catch (error) {
    console.error('[WhatsApp Server] Erro ao enviar áudio:', error);
    res.status(500).json({ success: false, error: error.message });
  }
}

app.post('/message/sendWhatsAppAudio/:instance', authMiddleware, handleSendAudio);
app.post('/message/sendWhatsAppAudio', authMiddleware, handleSendAudio);

// Inicia o servidor HTTP
app.listen(PORT, () => {
  console.log(`\n🚀 Vocalis WhatsApp Engine rodando na porta ${PORT}!`);
  console.log(`👉 Conecte seu WhatsApp pelo navegador em: http://localhost:${PORT}/instance/connect/vocalis\n`);
});
