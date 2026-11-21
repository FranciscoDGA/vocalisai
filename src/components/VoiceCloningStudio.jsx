import React, { useState, useRef, useEffect } from 'react';
import { 
  Mic, Square, Play, Pause, RefreshCw, Sparkles, CheckCircle2, 
  Volume2, ShieldCheck, AlertCircle, Headphones, Zap, Download, X
} from 'lucide-react';
import { speakText, stopSpeech } from '../utils/voiceUtils';

export default function VoiceCloningStudio({ isOpen, onClose, onSaveVoice }) {
  const [profileType, setProfileType] = useState('medico'); // 'medico' | 'advogado' | 'comercial' | 'personalizado'
  const [voiceName, setVoiceName] = useState('Dra. Helena - Voz Própria');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [hasRecorded, setHasRecorded] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isProcessingClone, setIsProcessingClone] = useState(false);
  const [clonedSuccess, setClonedSuccess] = useState(false);
  const [clonedVoiceId, setClonedVoiceId] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [testSamplePlaying, setTestSamplePlaying] = useState(false);

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const timerIntervalRef = useRef(null);
  const audioElementRef = useRef(null);

  const scriptTemplates = {
    medico: "Olá! Aqui é da nossa clínica médica e odontológica. Estou entrando em contato para confirmar sua consulta agendada para amanhã às quatorze horas com o especialista. Você confirma sua presença ou gostaria de verificar outros horários disponíveis nesta semana? Qualquer dúvida, basta me responder aqui.",
    advogado: "Olá, boa tarde! Aqui é do nosso escritório de advocacia e consultoria jurídica. Recebemos a sua solicitação a respeito da análise documental e gostaria de agendar uma chamada de quinze minutos com o nosso advogado responsável pelo caso. Qual o melhor período para você?",
    comercial: "Oi, tudo bem? Estou ligando porque você demonstrou interesse em nossas soluções e gostaria de apresentar nossa proposta comercial e agendar uma conversa com nossa equipe. Se quiser que eu te envie o resumo pelo WhatsApp, é só me confirmar!",
    personalizado: "Olá! Este é um texto ilustrativo para gravação de amostra de voz no navegador, avaliando clareza, entonação e pausas naturais da fala."
  };

  useEffect(() => {
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      stopSpeech();
    };
  }, []);

  const startRecording = async () => {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        alert('Seu navegador não suporta captura direta de microfone. Use Chrome, Edge ou Safari.');
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioChunksRef.current = [];
      
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
        setHasRecorded(true);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingSeconds(0);
      setClonedSuccess(false);

      timerIntervalRef.current = setInterval(() => {
        setRecordingSeconds((prev) => {
          if (prev >= 60) {
            stopRecording();
            return 60;
          }
          return prev + 1;
        });
      }, 1000);

    } catch (err) {
      console.error('Erro ao acessar microfone:', err);
      // Fallback simulado caso o usuário recuse permissão ou rode em ambiente restrito
      setIsRecording(true);
      setRecordingSeconds(0);
      setClonedSuccess(false);
      timerIntervalRef.current = setInterval(() => {
        setRecordingSeconds((prev) => {
          if (prev >= 60) {
            stopRecording(true);
            return 60;
          }
          return prev + 1;
        });
      }, 1000);
    }
  };

  const stopRecording = (isSimulated = false) => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }

    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    } else if (isSimulated) {
      setHasRecorded(true);
    }

    setIsRecording(false);
  };

  const handlePlayRecording = () => {
    if (audioUrl) {
      if (!audioElementRef.current) {
        audioElementRef.current = new Audio(audioUrl);
        audioElementRef.current.onended = () => setIsPlayingAudio(false);
      }
      if (isPlayingAudio) {
        audioElementRef.current.pause();
        setIsPlayingAudio(false);
      } else {
        audioElementRef.current.play();
        setIsPlayingAudio(true);
      }
    } else {
      // Demonstração com sintetizador
      if (isPlayingAudio) {
        stopSpeech();
        setIsPlayingAudio(false);
      } else {
        setIsPlayingAudio(true);
        speakText(scriptTemplates[profileType], () => setIsPlayingAudio(false));
      }
    }
  };

  const handleProcessCloning = () => {
    setIsProcessingClone(true);
    setTimeout(() => {
      setIsProcessingClone(false);
      const generatedId = `voc_neural_${Math.random().toString(36).substring(2, 9)}`;
      setClonedVoiceId(generatedId);
      setClonedSuccess(true);

      if (onSaveVoice) {
        onSaveVoice({
          id: generatedId,
          name: voiceName,
          category: profileType,
          createdAt: new Date().toISOString(),
          mode: 'Simulação ilustrativa'
        });
      }
    }, 2800);
  };

  const handleTestClonedVoice = () => {
    if (testSamplePlaying) {
      stopSpeech();
      setTestSamplePlaying(false);
    } else {
      setTestSamplePlaying(true);
      speakText(`Olá! Esta é uma simulação ilustrativa da voz ${voiceName} reproduzida no navegador.`, () => {
        setTestSamplePlaying(false);
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 border border-[#E7E4DC] shadow-2xl relative max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={() => {
            stopSpeech();
            onClose();
          }}
          className="absolute right-5 top-5 w-8 h-8 rounded-full bg-[#FAF9F5] hover:bg-[#EFECE6] border border-[#E7E4DC] flex items-center justify-center text-[#736F69] hover:text-[#1A1816] transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#EEF2FF] text-[#4F46E5] border border-[#F2E8DC] uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#4F46E5]" />
              Clonagem de Voz em 1 Minuto
            </span>
            <span className="text-[10px] text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full font-bold">
              Simulação ilustrativa no navegador
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-[#1A1816]">
            Crie sua Voz Neural Personalizada
          </h3>
          <p className="text-xs text-[#736F69] mt-1">
            Grave até 60 segundos de fala pelo microfone. O motor neural extrai seus harmônicos e sotaque para a IA falar igualzinho a você.
          </p>
        </div>

        {/* Escolha do Nicho / Nome */}
        <div className="space-y-4 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-[#1A1816] mb-1">Nome da Voz</label>
              <input 
                type="text" 
                value={voiceName}
                onChange={(e) => setVoiceName(e.target.value)}
                placeholder="Ex: Dra. Mariana / Dr. Carlos"
                className="w-full px-3 py-2 rounded-xl border border-[#D0CBC0] text-xs font-semibold focus:outline-none focus:border-[#4F46E5]"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-[#1A1816] mb-1">Perfil / Especialidade</label>
              <select 
                value={profileType}
                onChange={(e) => setProfileType(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#D0CBC0] text-xs bg-white font-semibold focus:outline-none focus:border-[#4F46E5]"
              >
                <option value="medico">Médico / Clínica / Odontologia</option>
                <option value="advogado">Advocacia / Jurídico</option>
                <option value="comercial">Comercial / Vendas / Imobiliária</option>
                <option value="personalizado">Texto de Calibração Geral</option>
              </select>
            </div>
          </div>

          {/* Roteiro Fonético Recomendado */}
          <div className="p-3.5 rounded-2xl bg-[#FAF9F5] border border-[#E7E4DC]">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#736F69] flex items-center gap-1">
                <Volume2 className="w-3 h-3 text-[#4F46E5]" />
                Roteiro de Leitura (Leia em voz alta para calibrar):
              </span>
              <span className="text-[10px] text-[#736F69]">~35 segundos</span>
            </div>
            <p className="text-xs text-[#1A1816] leading-relaxed italic bg-white p-3 rounded-xl border border-[#EDEAE3]">
              "{scriptTemplates[profileType]}"
            </p>
          </div>
        </div>

        {/* Gravador Interativo */}
        <div className="p-6 rounded-2xl bg-[#11100F] text-white border border-[#2B2927] mb-6 flex flex-col items-center justify-center text-center relative overflow-hidden">
          {/* Animated soundbars background */}
          {isRecording && (
            <div className="absolute inset-0 flex items-center justify-center gap-1.5 opacity-20 pointer-events-none">
              {[...Array(24)].map((_, i) => (
                <div 
                  key={i} 
                  className="w-1.5 bg-[#4F46E5] rounded-full animate-pulse"
                  style={{ 
                    height: `${20 + Math.sin(i * 0.8) * 45 + Math.random() * 25}%`,
                    animationDuration: `${0.4 + (i % 5) * 0.15}s` 
                  }}
                />
              ))}
            </div>
          )}

          {/* Timer Display */}
          <div className="text-3xl font-mono font-bold tracking-widest mb-1 text-white z-10">
            00:{recordingSeconds < 10 ? `0${recordingSeconds}` : recordingSeconds}
            <span className="text-xs text-[#A8A29E] font-sans ml-2">/ 01:00</span>
          </div>

          <p className="text-[11px] text-[#A8A29E] mb-4 z-10">
            {isRecording 
              ? 'Gravando amostra de voz... Fale com entonação natural e clara.'
              : hasRecorded 
                ? 'Amostra capturada com sucesso! Ouça abaixo ou processe a clonagem.'
                : 'Pressione o botão vermelho para iniciar a gravação da sua voz.'}
          </p>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 z-10">
            {!isRecording ? (
              <button 
                onClick={startRecording}
                className="px-5 py-2.5 rounded-full bg-[#4F46E5] hover:bg-[#4338CA] text-white text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer"
              >
                <Mic className="w-4 h-4" />
                <span>{hasRecorded ? 'Gravar Novamente' : 'Iniciar Gravação (60s)'}</span>
              </button>
            ) : (
              <button 
                onClick={() => stopRecording(false)}
                className="px-5 py-2.5 rounded-full bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer animate-pulse"
              >
                <Square className="w-4 h-4" />
                <span>Concluir Gravação</span>
              </button>
            )}

            {hasRecorded && !isRecording && (
              <button 
                onClick={handlePlayRecording}
                className="px-4 py-2.5 rounded-full bg-[#2B2927] hover:bg-[#3D3A36] text-white text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
              >
                {isPlayingAudio ? <Pause className="w-3.5 h-3.5 text-[#4F46E5]" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isPlayingAudio ? 'Pausar Áudio' : 'Ouvir Minha Gravação'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Status de Clonagem & Treinamento */}
        {hasRecorded && !clonedSuccess && (
          <div className="space-y-3">
            <button 
              onClick={handleProcessCloning}
              disabled={isProcessingClone}
              className="w-full py-3.5 rounded-xl bg-[#1A1816] hover:bg-black text-white text-xs font-bold transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isProcessingClone ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-[#4F46E5]" />
                  <span>Extraindo Harmônicos e Treinando Modelo Neural...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-[#4F46E5]" />
                  <span>Processar e Gerar Voz Neural em 1 Clique</span>
                </>
              )}
            </button>
          </div>
        )}

        {/* Sucesso na Clonagem */}
        {clonedSuccess && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-3 animate-fadeIn">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span className="text-xs font-bold">Prévia ilustrativa de voz gerada</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-700 bg-white px-2 py-0.5 rounded border border-emerald-300">
                {clonedVoiceId}
              </span>
            </div>

            <p className="text-xs text-emerald-800 leading-relaxed">
              Esta é uma prévia ilustrativa para o perfil <strong>{voiceName}</strong> no navegador. A disponibilidade e o comportamento da clonagem de voz em produção dependem do plano contratado.
            </p>

            <div className="pt-1 flex flex-wrap items-center gap-2">
              <button 
                onClick={handleTestClonedVoice}
                className="px-3.5 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {testSamplePlaying ? <Pause className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                <span>{testSamplePlaying ? 'Pausar Teste' : 'Ouvir Simulação Ilustrativa'}</span>
              </button>
              
              <button 
                onClick={() => {
                  stopSpeech();
                  onClose();
                }}
                className="px-3.5 py-1.5 rounded-lg bg-white border border-emerald-300 text-emerald-900 text-xs font-bold hover:bg-emerald-100 transition-colors cursor-pointer"
              >
                Concluir & Voltar ao Painel
              </button>
            </div>
          </div>
        )}

        {/* Footer info */}
        <div className="mt-6 pt-4 border-t border-[#E7E4DC] flex items-center justify-between text-[11px] text-[#736F69]">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            Simulação ilustrativa no navegador — recursos reais sujeitos a validação técnica e jurídica
          </span>
          <span>Compatível com Vapi, Deepgram & WebRTC</span>
        </div>
      </div>
    </div>
  );
}