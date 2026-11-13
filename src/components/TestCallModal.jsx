import React, { useState, useEffect, useRef } from 'react';
import { 
  Phone, PhoneOff, Mic, MicOff, Volume2, Sparkles, CheckCircle2, 
  ArrowRight, X, Building, Calendar, DollarSign, Award, Bot, RefreshCw,
  MessageSquare, QrCode, Copy, ExternalLink, ShieldCheck, Zap
} from 'lucide-react';
import { BRAND } from '../data/content';
import { formatPhoneMask, formatPhoneForVoice, cleanRawPhone } from '../utils/phoneUtils';
import { speakFemalePt } from '../utils/voiceUtils';
import { saveLead, updateLead } from '../utils/supabaseClient';
import { sendWhatsAppMessage } from '../utils/uazapiClient';
import { askDeboraAI } from '../utils/aiService';

export default function TestCallModal({ isOpen, phoneNumber, countryCode = '+55', onClose, onOpenAuth }) {
  const [callState, setCallState] = useState('calling'); // 'calling' | 'connected' | 'ended'
  const [callDuration, setCallDuration] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [userNiche, setUserNiche] = useState('');
  const [userPain, setUserPain] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [callLog, setCallLog] = useState([]);
  const [whatsappToastOpen, setWhatsappToastOpen] = useState(false);
  const [whatsappModalOpen, setWhatsappModalOpen] = useState(false);
  const [pixCopied, setPixCopied] = useState(false);
  const [isListeningMic, setIsListeningMic] = useState(false);
  const [customInputText, setCustomInputText] = useState('');
  const [leadId, setLeadId] = useState(null);

  const timerRef = useRef(null);
  const recognitionRef = useRef(null);

  // Normalização do telefone para exibição visual e para pronúncia fonética
  const formattedDisplayPhone = formatPhoneMask(phoneNumber) || '(11) 98765-4321';
  const spokenPhone = formatPhoneForVoice(phoneNumber);

  // Roteiro estruturado de Diagnóstico Empresarial ao Vivo (Estilo demonstração ao vivo da Débora)
  const conversationScript = [
    {
      step: 0,
      speaker: 'Débora (Vocalis · AI Agency OS)',
      spokenText: `Olá! Aqui é a Débora da inteligência da Vocalis e do AI Agency OS. Liguei para o seu número ${spokenPhone} para fazer um diagnóstico rápido da sua empresa em menos de um minuto. Me conta: qual é o ramo da sua empresa hoje e como funciona o seu atendimento?`,
      displayText: `Olá! Aqui é a Débora da inteligência da Vocalis (AI Agency OS). Estou ligando para o seu número ${countryCode} ${formattedDisplayPhone} para fazer um diagnóstico rápido da sua empresa ao vivo. Me conta: qual é o ramo da sua empresa hoje e como funciona o seu atendimento?`,
      promptHint: 'Selecione o ramo da sua empresa ou fale no microfone:',
      options: [
        { label: '🏥 Clínica Médica / Consultório Odontológico', niche: 'Clínica Médica' },
        { label: '🏠 Imobiliária / Corretores de Imóveis', niche: 'Imobiliária' },
        { label: '⚖️ Escritório de Advocacia', niche: 'Advocacia' },
        { label: '🛍️ E-commerce / Varejo e Lojas', niche: 'E-commerce' },
        { label: '🔧 Prestação de Serviços / Manutenção', niche: 'Serviços & Manutenção' },
      ]
    },
    {
      step: 1,
      speaker: 'Débora (Vocalis · AI Agency OS)',
      spokenText: (niche) => `Perfeito! No setor de ${niche || 'empresas e serviços'}, a maior perda de faturamento acontece quando o cliente liga e cai na caixa postal ou quando a resposta no WhatsApp demora mais de três minutos. Qual é hoje a sua maior dificuldade? Perder vendas fora do horário, equipe sobrecarregada ou faltas de clientes agendados?`,
      displayText: (niche) => `Perfeito! No setor de ${niche || 'empresas e serviços'}, a maior perda de faturamento acontece quando o cliente liga e cai na caixa postal ou quando a resposta no WhatsApp demora mais de 3 minutos. Qual é hoje a maior dor no atendimento de vocês?`,
      promptHint: 'Qual é o maior gargalo no seu atendimento hoje?',
      options: [
        { label: '⏱️ Perdemos muitos clientes após as 18h e nos finais de semana', pain: 'Fora do horário' },
        { label: '👥 Nossa equipe não dá conta de responder todas as mensagens', pain: 'Sobrecarga de equipe' },
        { label: '❌ Pacientes/clientes agendam e não comparecem (no-show)', pain: 'No-show / Faltas' },
        { label: '💸 Custo alto com recepcionistas e atendentes humanos', pain: 'Custo operacional alto' },
      ]
    },
    {
      step: 2,
      speaker: 'Débora (Vocalis · AI Agency OS)',
      spokenText: (niche, pain) => `Entendi perfeitamente. Com a Vocalis, a sua IA atende no primeiro toque com voz humana, agenda consultas e resolve dúvidas no ato. E quer ver o poder do nosso sistema em tempo real? Enquanto estamos conversando aqui no telefone, eu acabei de gerar um Pix de teste de um real e mandei uma mensagem no seu WhatsApp com o resumo completo desse diagnóstico! Dá uma olhada na sua tela.`,
      displayText: (niche, pain) => `Entendi perfeitamente! Com a nossa IA, você resolve o problema de ${pain || 'atendimento'} no primeiro segundo. E olha que incrível: enquanto estamos conversando aqui no telefone, eu acabei de gerar um Pix de teste no valor de R$ 1,00 e mandei uma mensagem no seu WhatsApp com o resumo completo desse diagnóstico! Dá uma olhada na sua tela agora.`,
      promptHint: 'Ação executada em tempo real na ligação!',
      triggerAction: true,
      options: [
        { label: '💬 Ver mensagem do WhatsApp que acabou de chegar', action: 'open_whatsapp' },
        { label: '💳 Ver a cobrança Pix gerada na chamada', action: 'show_pix' },
        { label: '🚀 Impressionante! Como eu ativo na minha empresa?', action: 'activate' }
      ]
    },
    {
      step: 3,
      speaker: 'Débora (Vocalis · AI Agency OS)',
      spokenText: () => `Essa é a diferença entre um robô comum e uma IA executora de alto nível. Ela fala como humano, cobra, agenda e fecha negócios para você vinte e quatro horas por dia. Temos a condição especial de lançamento com trinta por cento de desconto e garantia de trinta dias. Quer liberar o seu acesso agora?`,
      displayText: () => `Essa é a diferença entre um robô genérico e a nossa IA executora. Ela fala como humano, cobra, agenda e fecha negócios 24 horas por dia. Hoje temos a condição de lançamento com 30% OFF nos 3 primeiros meses e 30 dias de garantia total. Quer ativar agora?`,
      promptHint: 'Ativação imediata da plataforma:',
      options: [
        { label: '🚀 Sim! Quero ativar minha assistente agora com 30% OFF', action: 'signup' },
        { label: '📅 Quero agendar uma demonstração guiada para minha equipe', action: 'demo' }
      ]
    }
  ];

  // Helper de sintetizador de voz
  const speakText = (text) => {
    speakFemalePt(
      text,
      () => setIsSpeaking(true),
      () => setIsSpeaking(false),
      () => setIsSpeaking(false)
    );
  };

  // Reconhecimento de fala nativo (Speech-to-Text) para falar diretamente com a Débora
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.lang = 'pt-BR';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setIsListeningMic(false);
        handleCustomUserSpeech(transcript);
      };

      recognition.onerror = () => {
        setIsListeningMic(false);
      };

      recognition.onend = () => {
        setIsListeningMic(false);
      };

      recognitionRef.current = recognition;
    }
  }, [currentStep, userNiche, userPain]);

  const toggleMic = () => {
    if (!recognitionRef.current) {
      alert('Seu navegador não suporta reconhecimento de fala por microfone. Por favor, utilize os botões interativos na tela.');
      return;
    }

    if (isListeningMic) {
      recognitionRef.current.stop();
      setIsListeningMic(false);
    } else {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      setIsSpeaking(false);
      try {
        recognitionRef.current.start();
        setIsListeningMic(true);
      } catch (err) {
        setIsListeningMic(false);
      }
    }
  };

  const handleCustomUserSpeech = async (text) => {
    if (!text.trim()) return;

    if (currentStep === 0) {
      setUserNiche(text);
      proceedToNextStep(text, text, '');
    } else if (currentStep === 1) {
      setUserPain(text);
      proceedToNextStep(text, userNiche, text);
    } else {
      // Registra pergunta do usuário no log
      setCallLog(prev => [...prev, { speaker: 'Você', text, time: formatDuration(callDuration) }]);
      
      // Resposta dinâmica da Débora via Gemini AI
      const aiResponse = await askDeboraAI(text, { niche: userNiche, pain: userPain });
      const replyText = aiResponse.text;

      setTimeout(() => {
        setCallLog(prev => [...prev, {
          speaker: 'Débora (Vocalis · Gemini AI)',
          text: replyText,
          time: formatDuration(callDuration + 1)
        }]);
        speakText(replyText);
      }, 400);
    }
  };

  // Simulação de chamada ao abrir o modal
  useEffect(() => {
    if (!isOpen) {
      if (timerRef.current) clearInterval(timerRef.current);
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      setCallState('calling');
      setCallDuration(0);
      setCurrentStep(0);
      setCallLog([]);
      setIsSpeaking(false);
      setWhatsappToastOpen(false);
      setWhatsappModalOpen(false);
      return;
    }

    // Toca efeito de discagem por 1.8s e conecta
    const connectTimer = setTimeout(() => {
      setCallState('connected');
      
      // Salva o lead no Supabase imediatamente
      saveLead({
        phone: `${countryCode} ${formattedDisplayPhone}`,
        notes: 'Origem: Demonstração ao vivo no site Vocalis AI'
      }).then(res => {
        if (res?.data?.id) {
          setLeadId(res.data.id);
        }
      });
      
      timerRef.current = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);

      // Inicia a primeira fala com voz feminina
      const firstStep = conversationScript[0];
      setCallLog([{ 
        speaker: 'Débora (Vocalis · AI Agency OS)', 
        text: firstStep.displayText, 
        time: '00:01' 
      }]);
      speakText(firstStep.spokenText);

    }, 1800);

    return () => {
      clearTimeout(connectTimer);
      if (timerRef.current) clearInterval(timerRef.current);
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [isOpen, phoneNumber]);

  const proceedToNextStep = (userLabel, nicheVal, painVal) => {
    // Registra resposta do usuário no log
    const userMsg = { speaker: 'Você', text: userLabel, time: formatDuration(callDuration) };
    setCallLog(prev => [...prev, userMsg]);

    const nextStep = currentStep + 1;
    if (nextStep < conversationScript.length) {
      setCurrentStep(nextStep);
      const nextScriptItem = conversationScript[nextStep];
      
      const chosenNiche = nicheVal || userNiche;
      const chosenPain = painVal || userPain;

      const nextSpoken = typeof nextScriptItem.spokenText === 'function' 
        ? nextScriptItem.spokenText(chosenNiche, chosenPain) 
        : nextScriptItem.spokenText;

      const nextDisplay = typeof nextScriptItem.displayText === 'function' 
        ? nextScriptItem.displayText(chosenNiche, chosenPain) 
        : nextScriptItem.displayText;

      // Se for a etapa de disparar WhatsApp e Pix simultâneo
      if (nextScriptItem.triggerAction) {
        setTimeout(() => {
          setWhatsappToastOpen(true);
        }, 1500);

        // Disparo real via UazAPI
        const whatsappMsg = `👋 Olá! Aqui é a Débora da *Vocalis AI*.\n\nAcabei de falar com você na demonstração ao vivo e organizei o seu diagnóstico:\n🏢 *Segmento:* ${chosenNiche || 'Empresa & Serviços'}\n🎯 *Gargalo:* ${chosenPain || 'Atendimento fora do horário'}\n⚡ *Solução:* Atendimento com voz neural em 450ms, agendamento e geração de Pix em tempo real.\n\n💬 Este é um contato de validação. Caso queira ativar essa IA na sua empresa ou agendar uma reunião, basta responder esta mensagem!`;

        sendWhatsAppMessage({
          phone: phoneNumber,
          message: whatsappMsg
        }).then(res => {
          if (res?.success && leadId) {
            updateLead(leadId, { whatsapp_sent: true });
          }
        });
      }

      // Atualiza o diagnóstico do lead no Supabase
      if (leadId) {
        updateLead(leadId, {
          niche: chosenNiche,
          pain: chosenPain,
          status: 'diagnostico_em_andamento'
        });
      }

      setTimeout(() => {
        setCallLog(prev => [...prev, { 
          speaker: 'Débora (Vocalis · AI Agency OS)', 
          text: nextDisplay, 
          time: formatDuration(callDuration + 1) 
        }]);
        speakText(nextSpoken);
      }, 500);
    }
  };

  const handleSelectOption = (opt) => {
    if (opt.niche) setUserNiche(opt.niche);
    if (opt.pain) setUserPain(opt.pain);

    if (opt.action === 'open_whatsapp') {
      setWhatsappModalOpen(true);
      return;
    }

    if (opt.action === 'show_pix') {
      setWhatsappModalOpen(true);
      return;
    }

    if (opt.action === 'signup' || opt.action === 'activate') {
      handleEndCall();
      onClose();
      if (onOpenAuth) onOpenAuth();
      return;
    }

    proceedToNextStep(opt.label, opt.niche, opt.pain);
  };

  const handleEndCall = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    if (timerRef.current) clearInterval(timerRef.current);
    setIsSpeaking(false);
    setCallState('ended');

    if (leadId) {
      updateLead(leadId, {
        call_duration: callDuration,
        status: 'diagnostico_concluido'
      });
    }
  };

  const handleRestartCall = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setCallState('connected');
    setCallDuration(0);
    setCurrentStep(0);
    setUserNiche('');
    setUserPain('');
    setIsSpeaking(false);
    setWhatsappToastOpen(false);
    setWhatsappModalOpen(false);

    timerRef.current = setInterval(() => {
      setCallDuration(prev => prev + 1);
    }, 1000);

    const firstStep = conversationScript[0];
    setCallLog([{ 
      speaker: 'Débora (Vocalis · AI Agency OS)', 
      text: firstStep.displayText, 
      time: '00:01' 
    }]);
    speakText(firstStep.spokenText);
  };

  const formatDuration = (sec) => {
    const m = String(Math.floor(sec / 60)).padStart(2, '0');
    const s = String(sec % 60).padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleCopyPix = () => {
    navigator.clipboard?.writeText('00020126580014br.gov.bcb.pix0136d8f23491-test-4b92-91f1-pixvocalis52040000530398654041.005802BR5925VOCALIS AI AGENCY OS6009SAO PAULO62070503***6304E8A1');
    setPixCopied(true);
    setTimeout(() => setPixCopied(false), 2500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      
      {/* Toast flutuante de WhatsApp simultâneo chegando durante a chamada */}
      {whatsappToastOpen && (
        <div 
          onClick={() => setWhatsappModalOpen(true)}
          className="fixed top-5 left-1/2 -translate-x-1/2 z-60 bg-[#128C7E] text-white px-4 py-3 rounded-2xl shadow-2xl border border-emerald-400/30 flex items-center gap-3 cursor-pointer hover:bg-[#075E54] transition-all animate-bounce"
        >
          <div className="w-9 h-9 rounded-full bg-white text-[#128C7E] flex items-center justify-center font-bold text-sm shrink-0">
            <MessageSquare className="w-5 h-5 fill-current" />
          </div>
          <div className="text-left text-xs pr-2">
            <div className="font-bold flex items-center gap-1.5">
              <span>WhatsApp de Débora (Vocalis)</span>
              <span className="text-[10px] bg-white/20 px-1.5 py-0.2 rounded font-mono">agora</span>
            </div>
            <p className="text-emerald-100 text-[11px] truncate max-w-xs sm:max-w-sm">
              💬 "Olá! Segue o diagnóstico da sua empresa + seu Pix de validação de R$ 1,00..."
            </p>
          </div>
          <span className="text-[10px] bg-white text-[#128C7E] font-bold px-2 py-1 rounded-full shrink-0">
            Ver mensagem
          </span>
        </div>
      )}

      {/* Modal Container Principal */}
      <div 
        className="bg-[#11100F] text-white rounded-3xl max-w-xl w-full border border-stone-800 shadow-2xl overflow-hidden flex flex-col relative font-sans max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Bar with Live Indicator */}
        <div className="px-5 sm:px-6 py-3.5 bg-stone-900/80 border-b border-stone-800/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                callState === 'connected' ? 'bg-emerald-400' : 'bg-amber-400'
              }`}></span>
              <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                callState === 'connected' ? 'bg-emerald-500' : 'bg-amber-500'
              }`}></span>
            </span>
            <span className="text-xs font-semibold text-stone-300 flex items-center gap-2">
              {callState === 'calling' && 'Discando para seu celular em tempo real...'}
              {callState === 'connected' && (
                <>
                  <span>Diagnóstico ao Vivo com Débora</span>
                  <span className="text-stone-500">•</span>
                  <span className="text-emerald-400 font-mono font-bold">{formatDuration(callDuration)}</span>
                </>
              )}
              {callState === 'ended' && 'Chamada finalizada'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-flex text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#C84B1F]/20 text-[#FF8E6B] border border-[#C84B1F]/30">
              AI Agency OS
            </span>
            <button 
              onClick={onClose}
              className="w-7 h-7 rounded-full bg-stone-800 flex items-center justify-center text-stone-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Central Call Visual */}
        <div className="p-5 sm:p-6 flex flex-col items-center text-center overflow-y-auto max-h-[calc(92vh-130px)]">
          
          {/* Avatar com aura pulsante de fala */}
          <div className="relative my-2">
            <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center transition-all ${
              isSpeaking ? 'bg-[#C84B1F] shadow-lg shadow-[#C84B1F]/50 scale-105' : 'bg-stone-800'
            }`}>
              <Bot className="w-8 h-8 sm:w-9 sm:h-9 text-white" />
            </div>
            {isSpeaking && (
              <div className="absolute -inset-2 rounded-full border-2 border-[#C84B1F]/50 animate-ping pointer-events-none" />
            )}
          </div>

          <h3 className="text-lg sm:text-xl font-bold text-white mt-1 flex items-center justify-center gap-2">
            <span>Débora · Consultora de IA</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              Voz Neural
            </span>
          </h3>
          <p className="text-xs text-stone-400 font-mono mt-0.5">
            Ligando para: {countryCode} {formattedDisplayPhone}
          </p>

          {/* Active speech waveform bar */}
          <div className="h-5 flex items-center gap-1 my-2.5">
            {[10, 22, 35, 18, 42, 58, 38, 22, 48, 65, 42, 18, 32, 12].map((h, i) => (
              <span 
                key={i} 
                style={{ height: isSpeaking ? `${h * 0.35}px` : '4px' }} 
                className={`w-1 rounded-full transition-all duration-150 ${
                  isSpeaking ? 'bg-[#C84B1F]' : 'bg-stone-700'
                }`}
              />
            ))}
          </div>

          {/* Card com Ações em Tempo Real (Action-First AI) */}
          {currentStep >= 2 && (
            <div className="w-full bg-[#181716] border border-stone-800 rounded-2xl p-3 mb-3 text-left animate-fadeIn">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  <span>Ações Executadas Simultâneas na Chamada:</span>
                </span>
                <span className="text-[10px] text-emerald-400 font-mono font-bold">100% Automatizado</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button 
                  onClick={() => setWhatsappModalOpen(true)}
                  className="p-2.5 rounded-xl bg-stone-900 border border-stone-800 hover:border-emerald-500/50 flex items-center gap-2 transition-all cursor-pointer text-left"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div>
                    <div className="font-bold text-white text-[11px]">WhatsApp Enviado</div>
                    <div className="text-[10px] text-stone-400">Diagnóstico + Áudio</div>
                  </div>
                </button>

                <button 
                  onClick={() => setWhatsappModalOpen(true)}
                  className="p-2.5 rounded-xl bg-stone-900 border border-stone-800 hover:border-[#C84B1F]/50 flex items-center gap-2 transition-all cursor-pointer text-left"
                >
                  <QrCode className="w-4 h-4 text-[#C84B1F] shrink-0" />
                  <div>
                    <div className="font-bold text-white text-[11px]">Pix Gerado na Ligação</div>
                    <div className="text-[10px] text-stone-400">R$ 1,00 Demonstrativo</div>
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* Live Transcript Box */}
          <div className="w-full bg-stone-900/90 rounded-2xl p-4 border border-stone-800 text-left my-1 max-h-40 overflow-y-auto space-y-2.5 scrollbar-thin">
            {callLog.map((log, idx) => (
              <div key={idx} className="space-y-0.5">
                <div className="flex items-center justify-between text-[10px] text-stone-400 font-mono">
                  <span className={log.speaker.includes('Débora') ? 'text-[#FF9E7D] font-bold' : 'text-stone-300'}>
                    {log.speaker}
                  </span>
                  <span>{log.time}</span>
                </div>
                <p className="text-xs text-stone-200 leading-relaxed font-sans">
                  {log.text}
                </p>
              </div>
            ))}
          </div>

          {/* Interactive Response Area (Botões rápidos + Microfone ao Vivo) */}
          {callState === 'connected' && (
            <div className="w-full mt-3 space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-[11px] text-stone-400 font-medium text-left">
                  {conversationScript[currentStep]?.promptHint}
                </p>
                
                {/* Botão de Falar no Microfone */}
                <button
                  type="button"
                  onClick={toggleMic}
                  className={`px-2.5 py-1 rounded-full text-[11px] font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                    isListeningMic 
                      ? 'bg-rose-600 text-white animate-pulse' 
                      : 'bg-stone-800 hover:bg-stone-700 text-stone-300'
                  }`}
                  title="Falar com a Débora usando seu microfone"
                >
                  {isListeningMic ? (
                    <>
                      <MicOff className="w-3 h-3" />
                      <span>Ouvindo sua voz...</span>
                    </>
                  ) : (
                    <>
                      <Mic className="w-3 h-3 text-[#C84B1F]" />
                      <span>Falar no Mic</span>
                    </>
                  )}
                </button>
              </div>

              {/* Botões de Opção Rápida */}
              <div className="grid grid-cols-1 gap-1.5">
                {conversationScript[currentStep]?.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(opt)}
                    className="w-full py-2.5 px-3.5 rounded-xl bg-stone-800/90 hover:bg-[#C84B1F] text-xs font-semibold text-white transition-all text-left flex items-center justify-between border border-stone-700 hover:border-[#C84B1F] shadow-sm hover:translate-x-1 cursor-pointer"
                  >
                    <span>{opt.label}</span>
                    <ArrowRight className="w-3.5 h-3.5 opacity-60" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Call Ended Summary */}
          {callState === 'ended' && (
            <div className="w-full mt-3 p-4 rounded-2xl bg-stone-900 border border-stone-800 space-y-3">
              <div className="flex items-center justify-center gap-2 text-emerald-400 text-xs font-bold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Diagnóstico Empresarial Concluído!</span>
              </div>
              <p className="text-xs text-stone-300">
                Você presenciou a inteligência de voz mais rápida do Brasil, com disparo de WhatsApp e cobrança Pix na chamada.
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleRestartCall}
                  className="flex-1 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-xs font-semibold text-white flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Testar Outro Ramo</span>
                </button>
                <button
                  onClick={() => {
                    onClose();
                    if (onOpenAuth) onOpenAuth();
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-[#C84B1F] hover:bg-[#A83812] text-xs font-semibold text-white flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Liberar Acesso Agora</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <a
                href={`https://wa.me/5594984423948?text=${encodeURIComponent(`Olá Francisco! Acabei de fazer o diagnóstico na Vocalis AI para o segmento ${userNiche || 'Geral'} e gostaria de falar com um especialista.`)}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-bold text-white flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-lg shadow-emerald-600/20"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Conversar com Especialista Humano no WhatsApp: (94) 98442-3948</span>
              </a>
            </div>
          )}

        </div>

        {/* Bottom Control Bar */}
        <div className="px-5 sm:px-6 py-3.5 bg-stone-900 border-t border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="text-[11px] text-stone-400">Latência Neural: 380ms · Sem Delay</span>
          </div>

          <div className="flex items-center gap-2">
            {callState === 'connected' ? (
              <button
                onClick={handleEndCall}
                className="px-4 py-2 rounded-full bg-rose-600 hover:bg-rose-700 text-xs font-semibold text-white flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <PhoneOff className="w-3.5 h-3.5" />
                <span>Desligar Chamada</span>
              </button>
            ) : (
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-full bg-stone-800 hover:bg-stone-700 text-xs font-semibold text-stone-300 transition-colors cursor-pointer"
              >
                <span>Fechar</span>
              </button>
            )}
          </div>
        </div>

      </div>

      {/* Modal Sobreposto: Simulação de WhatsApp & Pix Simultâneo Recebido */}
      {whatsappModalOpen && (
        <div className="fixed inset-0 z-70 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#0B141A] text-white rounded-3xl max-w-sm w-full border border-stone-800 shadow-2xl overflow-hidden flex flex-col font-sans">
            
            {/* WhatsApp Header */}
            <div className="px-4 py-3 bg-[#202C33] flex items-center justify-between border-b border-stone-800">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#128C7E] flex items-center justify-center text-white font-bold text-xs">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold text-stone-100 flex items-center gap-1">
                    <span>Débora · Vocalis AI</span>
                    <span className="text-[10px] text-emerald-400 font-normal">● Online</span>
                  </div>
                  <div className="text-[10px] text-stone-400">Conta Oficial Verificada</div>
                </div>
              </div>
              <button 
                onClick={() => setWhatsappModalOpen(false)}
                className="w-6 h-6 rounded-full bg-stone-800 flex items-center justify-center text-stone-400 hover:text-white cursor-pointer"
              >
                <X className="w-3 h-3" />
              </button>
            </div>

            {/* WhatsApp Chat Body */}
            <div className="p-4 space-y-3 bg-[#0B141A] text-left">
              
              {/* Balão 1: Resumo do Diagnóstico */}
              <div className="bg-[#202C33] p-3 rounded-2xl rounded-tl-sm border border-stone-800 max-w-[90%] text-xs space-y-2">
                <p className="text-stone-200 leading-relaxed">
                  👋 Olá! Aqui é a <strong>Débora da Vocalis (AI Agency OS)</strong>. Acabei de falar com você no telefone e organizei seu diagnóstico:
                </p>
                <div className="p-2 rounded-xl bg-[#111B21] text-[11px] space-y-1 border border-stone-800">
                  <div>🏢 <strong>Segmento:</strong> {userNiche || 'Empresa & Serviços'}</div>
                  <div>🎯 <strong>Gargalo Resolvido:</strong> {userPain || 'Atendimento fora do horário'}</div>
                  <div>⚡ <strong>Solução:</strong> IA com atendimento em 450ms e agendamento instantâneo.</div>
                </div>
              </div>

              {/* Balão 2: Cobrança Pix Gerada em Tempo Real */}
              <div className="bg-[#202C33] p-3 rounded-2xl rounded-tl-sm border border-stone-800 max-w-[90%] text-xs space-y-2.5">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                  <QrCode className="w-4 h-4" />
                  <span>Cobrança Pix de Demonstração</span>
                </div>
                <p className="text-[11px] text-stone-300">
                  Este é o Pix simbólico de <strong>R$ 1,00</strong> que a IA gerou durante a nossa chamada:
                </p>
                <div className="p-2.5 rounded-xl bg-[#111B21] border border-stone-700/80 space-y-2 text-center">
                  <div className="text-lg font-mono font-bold text-emerald-400">R$ 1,00</div>
                  <button
                    onClick={handleCopyPix}
                    className="w-full py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{pixCopied ? 'Chave Copiada!' : 'Copiar Código Pix'}</span>
                  </button>
                </div>
              </div>

              {/* Botão de Fechar e Ativar */}
              <button
                onClick={() => {
                  setWhatsappModalOpen(false);
                  handleEndCall();
                  onClose();
                  if (onOpenAuth) onOpenAuth();
                }}
                className="w-full py-2.5 rounded-xl bg-[#C84B1F] hover:bg-[#A83812] text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#C84B1F]/30"
              >
                <span>Ativar na Minha Empresa Agora</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              {/* Botão de Falar com Especialista Humano no WhatsApp */}
              <a
                href={`https://wa.me/5594984423948?text=${encodeURIComponent(`Olá Francisco! Acabei de ver o diagnóstico da Débora na Vocalis AI para ${userNiche || 'minha empresa'} e gostaria de falar com um especialista.`)}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md text-center"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Falar com Especialista no WhatsApp</span>
              </a>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
