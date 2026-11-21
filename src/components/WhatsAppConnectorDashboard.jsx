import React, { useState, useEffect } from 'react';
import { 
  MessageSquare, Check, RefreshCw, Send, Smartphone, ShieldCheck, 
  Zap, AlertCircle, Copy, Mic, Play, Bot, PhoneCall, CheckCircle2,
  Terminal, ExternalLink, QrCode
} from 'lucide-react';
import { sendWhatsAppMessage, sendWhatsAppAudio } from '../utils/uazapiClient';
import { getProviderCostSummary } from '../utils/commercialCatalogUtils';

export default function WhatsAppConnectorDashboard({ userPhone = '559484423948' }) {
  const [serverStatus, setServerStatus] = useState('checking'); // checking, connected, qr_ready, offline
  const [connectedNumber, setConnectedNumber] = useState('');
  const [qrCodeImg, setQrCodeImg] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  // Test form state
  const [testNumber, setTestNumber] = useState(userPhone);
  const [testMessage, setTestMessage] = useState('Mensagem de teste local do protótipo Vocalis AI (uso restrito a desenvolvimento).');
  const [isSending, setIsSending] = useState(false);
  const [sendResult, setSendResult] = useState(null);

  // Audio test state
  const [isSendingAudio, setIsSendingAudio] = useState(false);
  const [audioResult, setAudioResult] = useState(null);

  const checkStatus = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/status', {
        headers: { 'Cache-Control': 'no-cache' }
      });
      if (!res.ok) throw new Error('Servidor indisponível');
      const data = await res.json();

      if (data.status === 'connected') {
        setServerStatus('connected');
        setConnectedNumber(data.phone || userPhone);
        setQrCodeImg(null);
      } else if (data.hasQR && data.qrDataUrl) {
        setServerStatus('qr_ready');
        setQrCodeImg(data.qrDataUrl);
      } else {
        setServerStatus('connecting');
      }
    } catch {
      setServerStatus('offline');
    }
  };

  useEffect(() => {
    checkStatus();
    const interval = setInterval(checkStatus, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleManualRefresh = async () => {
    setRefreshing(true);
    await checkStatus();
    setTimeout(() => setRefreshing(false), 500);
  };

  const handleSendTestMessage = async (e) => {
    e.preventDefault();
    if (!testNumber || !testMessage) return;

    setIsSending(true);
    setSendResult(null);

    try {
      const res = await sendWhatsAppMessage({
        phone: testNumber,
        message: testMessage
      });

      if (res?.success) {
        setSendResult({
          type: 'success',
          text: `✓ Mensagem enviada com sucesso para +${testNumber.replace(/\D/g, '')}!`
        });
      } else {
        setSendResult({
          type: 'error',
          text: `Falha no envio: ${res?.error || 'Erro desconhecido'}`
        });
      }
    } catch (err) {
      setSendResult({
        type: 'error',
        text: `Erro ao enviar: ${err.message}`
      });
    } finally {
      setIsSending(false);
    }
  };

  const handleSendAudioTest = async () => {
    if (!testNumber) return;
    setIsSendingAudio(true);
    setAudioResult(null);

    try {
      // Áudio de demonstração em voz neural feminina brasileira
      const demoAudioUrl = 'https://actions.google.com/sounds/v1/communication/answering_machine_female.ogg';
      const res = await sendWhatsAppAudio({
        phone: testNumber,
        audioUrl: demoAudioUrl
      });

      if (res?.success) {
        setAudioResult({
          type: 'success',
          text: `✓ Nota de voz (áudio PTT) enviada para +${testNumber.replace(/\D/g, '')}!`
        });
      } else {
        setAudioResult({
          type: 'error',
          text: `Falha no envio do áudio: ${res?.error || 'Erro no endpoint'}`
        });
      }
    } catch (err) {
      setAudioResult({
        type: 'error',
        text: `Erro: ${err.message}`
      });
    } finally {
      setIsSendingAudio(false);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-5xl">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#EBE8E2]">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300 uppercase tracking-wider flex items-center gap-1">
              <span>Protótipo Experimental Local (Não Oficial · Fora da Oferta Comercial Pública)</span>
            </span>
            <span className="text-[10px] text-stone-500 bg-stone-100 px-2 py-0.5 rounded-full font-mono">
              Porta local 8080 · Baileys
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1816] tracking-tight">
            Protótipo Local WhatsApp Web (Uso Interno / Testes)
          </h2>
          <p className="text-xs text-[#5C5955] mt-1">
            Interface de teste local para o servidor experimental baseado em Baileys (`localhost:8080`). Não integra a oferta comercial principal nem equivale à WhatsApp Business Platform (Meta Cloud API).
          </p>
        </div>

        <button 
          onClick={handleManualRefresh}
          disabled={refreshing}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[#D0CBC0] bg-white text-xs font-bold text-[#1A1816] hover:bg-[#FAF9F5] transition-colors self-start cursor-pointer shadow-xs"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
          <span>Atualizar Status</span>
        </button>
      </div>

      {/* Warning Notice */}
      <div className="p-4 rounded-2xl border border-amber-200 bg-amber-50/70 text-xs text-[#5C5955] space-y-1.5 leading-relaxed">
        <div className="font-bold text-amber-950 flex items-center gap-1.5">
          <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
          <span>Aviso de Risco e Decisão Pendente (Não Oficial vs. API Oficial Meta)</span>
        </div>
        <p>
          Esta conexão não oficial (WhatsApp Web / Baileys) foi <strong>retirada da oferta comercial pública principal</strong>: o servidor local executa apenas disparos outbound manuais de teste (sem receptor `messages.upsert` integrado à IA), depende de sessão pareada localmente em um processo Node e está sujeito a desconexões e risco de restrição ou banimento do número pela Meta. Para operação comercial oficial, utilize integração aprovada via Meta Cloud API / provedor oficial (sujeita às regras e tarifas da Meta).
        </p>
      </div>

      {/* ========================================================
          CARD 1: STATUS DA CONEXÃO
         ======================================================== */}
      {serverStatus === 'connected' && (
        <div className="p-6 rounded-3xl border border-emerald-200 bg-gradient-to-br from-emerald-50/60 via-white to-white shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center text-xl shadow-md shadow-emerald-600/20">
                <Check className="w-6 h-6 stroke-[3]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-[#1A1816]">WhatsApp Conectado e Operacional</h3>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                    ONLINE
                  </span>
                </div>
                <div className="text-xs text-[#5C5955] flex items-center gap-2 mt-0.5 font-mono">
                  <span>Número Ativo:</span>
                  <strong className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    +{connectedNumber}
                  </strong>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] text-stone-400 font-mono">Motor: Baileys v6 / Evolution</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
            <div className="p-3.5 rounded-2xl bg-white border border-[#EBE8E2] space-y-1">
              <div className="text-[10px] text-stone-400 uppercase font-bold">Modo de Operação</div>
              <div className="font-bold text-[#1A1816]">Voz Neural + WhatsApp</div>
              <div className="text-[11px] text-emerald-700 font-semibold">{getProviderCostSummary('whatsapp')}</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-white border border-[#EBE8E2] space-y-1">
              <div className="text-[10px] text-stone-400 uppercase font-bold">Simulação de Presença</div>
              <div className="font-bold text-[#1A1816]">Digitando & Gravando</div>
              <div className="text-[11px] text-stone-500">Comportamento humano natural</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-white border border-[#EBE8E2] space-y-1">
              <div className="text-[10px] text-stone-400 uppercase font-bold">Sessão Local (Baileys)</div>
              <div className="font-bold text-[#1A1816]">Sujeita a expiração</div>
              <div className="text-[11px] text-stone-500">Pode exigir nova leitura de QR Code ou encerrar pelo WhatsApp</div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          CARD 2: QR CODE READY (DESCONECTADO - PRECISA ESCANEAR)
         ======================================================== */}
      {serverStatus === 'qr_ready' && (
        <div className="p-8 rounded-3xl border border-amber-200 bg-[#FFFDF7] text-center space-y-6">
          <div className="max-w-md mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold">
              <QrCode className="w-3.5 h-3.5" />
              Aguardando Leitura do QR Code
            </div>
            <h3 className="text-xl font-bold text-[#1A1816]">Escaneie o código abaixo com seu WhatsApp</h3>
            <p className="text-xs text-[#5C5955]">
              No seu celular, abra o WhatsApp &gt; <strong>Aparelhos Conectados</strong> &gt; <strong>Conectar um aparelho</strong> e aponte para a imagem abaixo:
            </p>

            {qrCodeImg && (
              <div className="p-4 bg-white rounded-2xl border-2 border-stone-200 shadow-md inline-block mx-auto">
                <img src={qrCodeImg} alt="QR Code WhatsApp" className="w-64 h-64 mx-auto rounded-lg" />
              </div>
            )}

            <div className="text-[11px] text-stone-400">
              O código atualiza automaticamente. Assim que você ler, o status mudará para conectado.
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          CARD 3: SERVIDOR OFFLINE
         ======================================================== */}
      {serverStatus === 'offline' && (
        <div className="p-6 rounded-3xl border border-rose-200 bg-rose-50/50 space-y-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-rose-950">Servidor Local de WhatsApp Desconectado</h4>
              <p className="text-xs text-rose-800 leading-relaxed">
                O motor do WhatsApp não foi encontrado em <code>http://localhost:8080</code>.
              </p>
              <div className="pt-2">
                <p className="text-xs text-stone-700 font-semibold mb-1">Como iniciar:</p>
                <div className="p-3 bg-stone-900 text-emerald-400 rounded-xl font-mono text-xs">
                  npm run server:wa
                </div>
                <p className="text-[11px] text-stone-500 mt-1">
                  Ou dê duplo clique no arquivo <strong>iniciar-whatsapp.bat</strong> na pasta do projeto.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          CARD 4: TESTE DE DISPARO AO VIVO (TEXTO & ÁUDIO)
         ======================================================== */}
      {serverStatus === 'connected' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Teste de Mensagem de Texto */}
          <div className="p-6 rounded-3xl border border-[#E7E4DC] bg-white shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-sm font-bold text-[#1A1816]">
              <MessageSquare className="w-4 h-4 text-[#4F46E5]" />
              <span>Testar Envio de Mensagem de Texto</span>
            </div>

            <form onSubmit={handleSendTestMessage} className="space-y-3">
              <div>
                <label className="text-[11px] font-bold text-[#5C5955] block mb-1">
                  Número de Destino (com DDD):
                </label>
                <input 
                  type="text"
                  value={testNumber}
                  onChange={(e) => setTestNumber(e.target.value)}
                  placeholder="Ex: 5594984423948"
                  className="w-full px-3.5 py-2 rounded-xl border border-[#D0CBC0] text-xs font-mono focus:outline-none focus:border-[#4F46E5]"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#5C5955] block mb-1">
                  Texto da Mensagem:
                </label>
                <textarea 
                  rows={3}
                  value={testMessage}
                  onChange={(e) => setTestMessage(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#D0CBC0] text-xs focus:outline-none focus:border-[#4F46E5]"
                />
              </div>

              {sendResult && (
                <div className={`p-3 rounded-xl text-xs font-semibold ${
                  sendResult.type === 'success' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-rose-50 text-rose-800 border border-rose-200'
                }`}>
                  {sendResult.text}
                </div>
              )}

              <button 
                type="submit"
                disabled={isSending}
                className="w-full py-2.5 rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer disabled:opacity-60 shadow-md shadow-[#4F46E5]/20"
              >
                {isSending ? (
                  <span>Enviando pelo robô...</span>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Disparar Mensagem Agora</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Teste de Nota de Voz Neural (Áudio Humanizado) */}
          <div className="p-6 rounded-3xl border border-[#E7E4DC] bg-white shadow-xs space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm font-bold text-[#1A1816]">
                <Mic className="w-4 h-4 text-emerald-600" />
                <span>Testar Envio de Nota de Voz (Áudio PTT)</span>
              </div>

              <p className="text-xs text-[#5C5955] leading-relaxed">
                A Vocalis envia o áudio como se fosse gravado na hora com o <strong>microfone verde</strong> nativo do WhatsApp, simulando a presença *"Roberta está gravando áudio..."*.
              </p>

              <div className="p-3.5 rounded-2xl bg-[#FAF9F5] border border-[#EBE8E2] text-xs space-y-1">
                <div className="font-bold text-[#1A1816]">Exemplo de Áudio Neural:</div>
                <div className="text-[11px] text-[#5C5955] italic">
                  "Oi! Já consultei a agenda da clínica e temos horários disponíveis nesta quinta-feira..."
                </div>
              </div>

              {audioResult && (
                <div className={`p-3 rounded-xl text-xs font-semibold ${
                  audioResult.type === 'success' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-rose-50 text-rose-800 border border-rose-200'
                }`}>
                  {audioResult.text}
                </div>
              )}
            </div>

            <button 
              type="button"
              onClick={handleSendAudioTest}
              disabled={isSendingAudio}
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer disabled:opacity-60 shadow-md shadow-emerald-600/20"
            >
              {isSendingAudio ? (
                <span>Gravando e enviando áudio...</span>
              ) : (
                <>
                  <Mic className="w-3.5 h-3.5" />
                  <span>Enviar Nota de Voz para o Celular</span>
                </>
              )}
            </button>
          </div>

        </div>
      )}

      {/* ========================================================
          CARD 5: INFORMAÇÕES DE INTEGRAÇÃO & SEGURANÇA
         ======================================================== */}
      <div className="p-6 rounded-3xl border border-[#E7E4DC] bg-[#FAF9F5] text-xs text-[#5C5955] space-y-3">
        <h4 className="font-bold text-[#1A1816] flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Diretrizes de Segurança & Aquecimento de Chip</span>
        </h4>
        <ul className="list-disc list-inside space-y-1 leading-relaxed">
          <li><strong>Atendimento Receptivo:</strong> Os envios dependem da integração configurada e das interações autorizadas pelo usuário.</li>
          <li><strong>Boas práticas contra restrições:</strong> o atendimento consentido reduz denúncias, mas não elimina a necessidade de cumprir as políticas da Meta nem garante ausência de bloqueios.</li>
          <li><strong>Desconexão:</strong> Caso queira desconectar uma sessão conectada, basta acessar <em>Aparelhos Conectados</em> no seu WhatsApp e encerrar o vínculo ativo.</li>
        </ul>
      </div>

    </div>
  );
}
