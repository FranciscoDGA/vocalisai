import React, { useState, useEffect } from 'react';
import { 
  Mic, Play, Pause, Volume2, Sparkles, CheckCircle2, MessageSquare, 
  Settings2, Sliders, ArrowRight, ShieldCheck, Zap, Bot, Send
} from 'lucide-react';
import { speakText, stopSpeech } from '../utils/voiceUtils';

export default function WhatsAppVoiceToVoice() {
  const [voiceToVoiceActive, setVoiceToVoiceActive] = useState(true);
  const [speedRate, setSpeedRate] = useState(1.05); // 0.9x a 1.25x
  const [maxAudioDuration, setMaxAudioDuration] = useState(45); // 30, 45, 60 segundos
  const [sendTranscriptAlso, setSendTranscriptAlso] = useState(true);
  const [naturalBreaths, setNaturalBreaths] = useState(true);
  const [selectedVoice, setSelectedVoice] = useState('clara'); // clara | roberta | cloned

  // Simulator state
  const [isPlayingIncoming, setIsPlayingIncoming] = useState(false);
  const [isPlayingReply, setIsPlayingReply] = useState(false);
  const [simulationStatus, setSimulationStatus] = useState('idle'); // idle | transcribing | generating | ready

  const sampleIncomingText = "Oi, boa tarde! Gostaria de saber se vocês têm horário disponível para consulta de avaliação nesta quinta-feira à tarde e qual o valor da consulta?";
  const sampleReplyText = "Olá! Perfeito! Temos sim um horário na quinta-feira às quinze horas e trinta minutos com a nossa especialista. A consulta de avaliação inclui todo o planejamento do tratamento. Posso reservar esse horário para você agora?";

  useEffect(() => {
    return () => {
      stopSpeech();
    };
  }, []);

  const handlePlayIncoming = () => {
    if (isPlayingIncoming) {
      stopSpeech();
      setIsPlayingIncoming(false);
    } else {
      setIsPlayingReply(false);
      setIsPlayingIncoming(true);
      speakText(sampleIncomingText, () => setIsPlayingIncoming(false));
    }
  };

  const handleSimulateWorkflow = () => {
    stopSpeech();
    setIsPlayingIncoming(false);
    setIsPlayingReply(false);
    setSimulationStatus('transcribing');

    setTimeout(() => {
      setSimulationStatus('generating');
      setTimeout(() => {
        setSimulationStatus('ready');
        setIsPlayingReply(true);
        speakText(sampleReplyText, () => setIsPlayingReply(false));
      }, 1600);
    }, 1400);
  };

  const handlePlayReply = () => {
    if (isPlayingReply) {
      stopSpeech();
      setIsPlayingReply(false);
    } else {
      setIsPlayingIncoming(false);
      setIsPlayingReply(true);
      speakText(sampleReplyText, () => setIsPlayingReply(false));
    }
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#E6F4EA] text-emerald-800 uppercase tracking-wider flex items-center gap-1">
              <Zap className="w-3 h-3 text-emerald-600" />
              WhatsApp Voice-to-Voice Pro
            </span>
            <span className="text-[10px] text-[#C84B1F] bg-[#FAF5EE] px-2 py-0.5 rounded-full font-bold border border-[#F2E8DC]">
              STT ➔ LLM ➔ TTS Nativo
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1816] tracking-tight">
            Atendimento em Áudio no WhatsApp
          </h2>
          <p className="text-xs text-[#5C5955] mt-1 max-w-2xl">
            Sua IA escuta as mensagens de áudio que os clientes enviam no WhatsApp, transcreve em tempo real e responde de volta com áudios humanizados e sotaque brasileiro.
          </p>
        </div>

        {/* Master Toggle */}
        <div className="flex items-center gap-3 bg-white p-3 rounded-2xl border border-[#E7E4DC] shadow-xs self-start">
          <span className="text-xs font-bold text-[#1A1816]">Modo Voice-to-Voice</span>
          <button 
            onClick={() => setVoiceToVoiceActive(!voiceToVoiceActive)}
            className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
              voiceToVoiceActive ? 'bg-emerald-600' : 'bg-stone-300'
            }`}
          >
            <div className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform absolute top-0.5 ${
              voiceToVoiceActive ? 'translate-x-6' : 'translate-x-0.5'
            }`} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Coluna 1: Parâmetros de Configuração */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-2xl border border-[#E7E4DC] p-5 shadow-xs space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#1A1816] flex items-center gap-2">
              <Sliders className="w-3.5 h-3.5 text-[#C84B1F]" />
              Configuração Acústica & Comportamental
            </h4>

            {/* Voz da Assistente */}
            <div>
              <label className="block text-[11px] font-semibold text-[#1A1816] mb-1">Voz das Respostas em Áudio</label>
              <select 
                value={selectedVoice}
                onChange={(e) => setSelectedVoice(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#D0CBC0] text-xs bg-white focus:outline-none focus:border-[#C84B1F]"
              >
                <option value="clara">Clara (Voz Amigável, Português do Brasil - Padrão)</option>
                <option value="roberta">Roberta (Voz Executiva & Comercial)</option>
                <option value="cloned">Voz Clonada Própria (Dr. Marcelo / Dra. Helena)</option>
              </select>
            </div>

            {/* Velocidade da Fala */}
            <div>
              <div className="flex justify-between text-[11px] font-semibold text-[#1A1816] mb-1">
                <span>Velocidade de Conversação</span>
                <span className="font-mono text-[#C84B1F]">{speedRate}x</span>
              </div>
              <input 
                type="range" 
                min="0.9" 
                max="1.25" 
                step="0.05"
                value={speedRate}
                onChange={(e) => setSpeedRate(parseFloat(e.target.value))}
                className="w-full accent-[#C84B1F] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#736F69] mt-0.5">
                <span>0.9x (Pausado)</span>
                <span>1.05x (Natural WhatsApp)</span>
                <span>1.25x (Dinâmico)</span>
              </div>
            </div>

            {/* Duração Máxima do Áudio */}
            <div>
              <label className="block text-[11px] font-semibold text-[#1A1816] mb-1">Limite Máximo de Duração do Áudio</label>
              <div className="grid grid-cols-3 gap-2">
                {[30, 45, 60].map((sec) => (
                  <button
                    key={sec}
                    type="button"
                    onClick={() => setMaxAudioDuration(sec)}
                    className={`py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      maxAudioDuration === sec 
                        ? 'bg-[#1A1816] text-white shadow-sm' 
                        : 'bg-[#FAF9F5] border border-[#E7E4DC] text-[#736F69] hover:bg-stone-100'
                    }`}
                  >
                    Até {sec}s
                  </button>
                ))}
              </div>
            </div>

            {/* Toggles extras */}
            <div className="pt-2 border-t border-[#EDEAE3] space-y-3">
              <label className="flex items-center justify-between text-xs cursor-pointer">
                <div>
                  <div className="font-semibold text-[#1A1816]">Pausas respiratórias naturais</div>
                  <div className="text-[10px] text-[#736F69]">Insere micro-pausas entre frases para soar 100% humano</div>
                </div>
                <input 
                  type="checkbox" 
                  checked={naturalBreaths}
                  onChange={(e) => setNaturalBreaths(e.target.checked)}
                  className="rounded text-[#C84B1F] focus:ring-[#C84B1F] w-4 h-4 cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between text-xs cursor-pointer">
                <div>
                  <div className="font-semibold text-[#1A1816]">Enviar transcrição em texto junto</div>
                  <div className="text-[10px] text-[#736F69]">Manda o texto logo após o áudio para quem prefere ler</div>
                </div>
                <input 
                  type="checkbox" 
                  checked={sendTranscriptAlso}
                  onChange={(e) => setSendTranscriptAlso(e.target.checked)}
                  className="rounded text-[#C84B1F] focus:ring-[#C84B1F] w-4 h-4 cursor-pointer"
                />
              </label>
            </div>
          </div>
        </div>

        {/* Coluna 2: Simulador Interativo WhatsApp */}
        <div className="lg:col-span-7">
          <div className="bg-[#EFEAE2] rounded-3xl border border-[#D9D3C7] p-4 sm:p-6 shadow-md relative overflow-hidden flex flex-col justify-between min-h-[460px]">
            {/* Header do WhatsApp */}
            <div className="bg-[#075E54] text-white -mx-4 -mt-4 sm:-mx-6 sm:-mt-6 p-3 sm:p-4 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center font-bold text-sm">
                  VA
                </div>
                <div>
                  <div className="font-bold text-xs sm:text-sm">Vocalis AI • Atendimento WhatsApp</div>
                  <div className="text-[10px] text-emerald-200">online • Respostas por Áudio Ativas</div>
                </div>
              </div>

              <div className="text-[10px] font-mono bg-emerald-800/60 px-2 py-0.5 rounded border border-emerald-600/40">
                UazAPI Oficial
              </div>
            </div>

            {/* Chat Messages */}
            <div className="space-y-4 my-6">
              {/* Áudio recebido do Cliente */}
              <div className="flex items-start gap-2 max-w-[85%] self-start">
                <div className="bg-white rounded-2xl rounded-tl-none p-3 shadow-sm border border-stone-200 w-full space-y-2">
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={handlePlayIncoming}
                      className="w-10 h-10 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center shrink-0 transition-colors cursor-pointer"
                    >
                      {isPlayingIncoming ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                    </button>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-1 h-6">
                        {[40, 60, 30, 80, 95, 45, 60, 30, 75, 90, 50, 70, 35, 65, 80, 45].map((h, i) => (
                          <div 
                            key={i} 
                            className={`w-1 rounded-full transition-all ${
                              isPlayingIncoming ? 'bg-emerald-600' : 'bg-stone-300'
                            }`}
                            style={{ height: `${h}%` }}
                          />
                        ))}
                      </div>
                      <div className="flex justify-between text-[9px] text-stone-500 font-mono">
                        <span>0:09</span>
                        <span>Áudio do Cliente</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-[10px] text-stone-500 border-t border-stone-100 pt-1 italic">
                    Transcrição STT: "{sampleIncomingText}"
                  </div>
                </div>
              </div>

              {/* Status do Processamento */}
              {simulationStatus === 'transcribing' && (
                <div className="text-center">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 text-[10px] font-bold text-stone-700 shadow-xs border border-stone-200">
                    <Sparkles className="w-3 h-3 text-[#C84B1F] animate-spin" />
                    Transcrevendo áudio do lead com Whisper Deepgram...
                  </span>
                </div>
              )}

              {simulationStatus === 'generating' && (
                <div className="text-center">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 text-[10px] font-bold text-stone-700 shadow-xs border border-stone-200">
                    <Bot className="w-3 h-3 text-indigo-600 animate-pulse" />
                    Consultando agenda e gerando áudio de resposta...
                  </span>
                </div>
              )}

              {/* Resposta em Áudio da Vocalis */}
              <div className="flex items-start gap-2 max-w-[85%] ml-auto justify-end">
                <div className="bg-[#DCF8C6] rounded-2xl rounded-tr-none p-3 shadow-sm border border-emerald-200 w-full space-y-2">
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={handlePlayReply}
                      className="w-10 h-10 rounded-full bg-[#075E54] hover:bg-[#128C7E] text-white flex items-center justify-center shrink-0 transition-colors cursor-pointer"
                    >
                      {isPlayingReply ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                    </button>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-1 h-6">
                        {[35, 75, 90, 50, 85, 100, 60, 45, 80, 95, 40, 70, 85, 60, 90, 55].map((h, i) => (
                          <div 
                            key={i} 
                            className={`w-1 rounded-full transition-all ${
                              isPlayingReply ? 'bg-[#075E54]' : 'bg-emerald-700/40'
                            }`}
                            style={{ height: `${h}%` }}
                          />
                        ))}
                      </div>
                      <div className="flex justify-between text-[9px] text-emerald-800 font-mono">
                        <span>0:14</span>
                        <span>Áudio da Assistente (Voz {selectedVoice === 'clara' ? 'Clara' : selectedVoice === 'roberta' ? 'Roberta' : 'Clonada'})</span>
                      </div>
                    </div>
                  </div>

                  {sendTranscriptAlso && (
                    <div className="text-[10px] text-emerald-950 border-t border-emerald-200/60 pt-1.5">
                      "{sampleReplyText}"
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Bottom Bar: Disparar Simulação ao Vivo */}
            <div className="pt-2">
              <button 
                onClick={handleSimulateWorkflow}
                disabled={simulationStatus === 'transcribing' || simulationStatus === 'generating'}
                className="w-full py-3 rounded-2xl bg-[#075E54] hover:bg-[#128C7E] text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                <Sparkles className="w-4 h-4 text-emerald-300" />
                <span>Simular Recebimento de Áudio e Resposta Automática</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}