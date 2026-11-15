import React, { useState, useEffect, useRef } from 'react';
import { 
  Phone, PhoneOff, Mic, MicOff, Volume2, Sparkles, CheckCircle2, 
  ArrowRight, X, Building, Calendar, DollarSign, Award, Bot, RefreshCw,
  MessageSquare, QrCode, Copy, ExternalLink, ShieldCheck, Zap, Send, Loader2
} from 'lucide-react';
import { BRAND } from '../data/content';
import { formatPhoneMask, formatPhoneForVoice, cleanRawPhone } from '../utils/phoneUtils';
import { speakRobertaVoice as speakFemalePt, stopRobertaVoice as stopSpeech } from '../utils/geminiAudioService';
import { saveLead, updateLead } from '../utils/supabaseClient';
import { sendWhatsAppMessage } from '../utils/uazapiClient';
import { askRobertaAI } from '../utils/aiService';

export default function TestCallModal({ isOpen, phoneNumber, countryCode = '+55', onClose, onOpenAuth }) {
  const [callState, setCallState] = useState('calling'); // 'calling' | 'connected' | 'ended'
  const [callDuration, setCallDuration] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [userNiche, setUserNiche] = useState('');
  const [userPain, setUserPain] = useState('');
  const [userName, setUserName] = useState('Francisco');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [callLog, setCallLog] = useState([]);
  const [whatsappToastOpen, setWhatsappToastOpen] = useState(false);
  const [whatsappModalOpen, setWhatsappModalOpen] = useState(false);
  const [pixCopied, setPixCopied] = useState(false);
  const [isListeningMic, setIsListeningMic] = useState(false);
  const [interimSpeech, setInterimSpeech] = useState('');
  const [customInputText, setCustomInputText] = useState('');
  const [leadId, setLeadId] = useState(null);

  const timerRef = useRef(null);
  const recognitionRef = useRef(null);
  const silenceTimerRef = useRef(null);
  const transcriptAccumulatorRef = useRef('');
  const chatBottomRef = useRef(null);
  const isSpeakingRef = useRef(false);
  const isProcessingSpeechRef = useRef(false);
  const isListeningMicRef = useRef(false);

  // Mantém a ref sincronizada com o estado do microfone
  useEffect(() => {
    isListeningMicRef.current = isListeningMic;
  }, [isListeningMic]);

  // Normalização do telefone para exibição visual e pronúncia fonética
  const formattedDisplayPhone = formatPhoneMask(phoneNumber) || '(94) 98447-8168';
  const spokenPhone = formatPhoneForVoice(phoneNumber || '94984478168');

  // Auto-scroll para última mensagem do chat
  useEffect(() => {
    if (chatBottomRef.current) {
      chatBottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [callLog, interimSpeech]);

  // Roteiro estruturado de Diagnóstico Empresarial ao Vivo (Executivo, Breve e Natural)
  const conversationScript = [
    {
      step: 0,
      speaker: 'Roberta · Vocalis',
      spokenText: `Olá! Aqui é a Roberta, da Vocalis. Estou ligando para um diagnóstico rápido do seu atendimento. Qual é o ramo da sua empresa?`,
      displayText: `Olá! Aqui é a Roberta, da Vocalis. Estou ligando para o seu número ${countryCode} ${formattedDisplayPhone} para um diagnóstico rápido do seu atendimento. Qual é o ramo da sua empresa hoje?`,
      promptHint: 'Fale no microfone, digite abaixo ou escolha seu segmento:',
      options: [
        { label: '🏥 Clínica Odontológica / Consultório Médico', niche: 'Clínica Odontológica' },
        { label: '🏠 Imobiliária / Corretores de Imóveis', niche: 'Imobiliária' },
        { label: '⚖️ Escritório de Advocacia', niche: 'Advocacia' },
        { label: '🛍️ E-commerce / Varejo e Lojas', niche: 'E-commerce' },
        { label: '🔧 Prestação de Serviços / Manutenção', niche: 'Serviços & Manutenção' },
      ]
    },
    {
      step: 1,
      speaker: 'Roberta · Vocalis',
      spokenText: (niche) => `Perfeito! No setor de ${niche || 'empresas'}, qual é o seu maior gargalo: perder clientes fora do horário, sobrecarga da equipe ou faltas em agendamentos?`,
      displayText: (niche) => `Perfeito! No setor de ${niche || 'empresas'}, qual é hoje o seu maior gargalo: perder clientes fora do horário, sobrecarga da equipe ou faltas de clientes agendados?`,
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
      speaker: 'Roberta · Vocalis',
      spokenText: (niche, pain) => `Entendi! Com a Vocalis, sua assistente atende no primeiro toque e resolve na hora. E acabei de mandar o resumo no seu WhatsApp com um Pix de teste de um real! Dá uma olhada na tela.`,
      displayText: (niche, pain) => `Entendi! Com a Vocalis, sua assistente atende no primeiro toque e resolve na hora. E acabei de mandar o resumo no seu WhatsApp com um Pix de teste de R$ 1,00! Dá uma olhada na tela.`,
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
      speaker: 'Roberta · Vocalis',
      spokenText: () => `Essa é a força de uma inteligência executora real. Quer agendar uma demonstração rápida de 15 minutos com nossa equipe para ver rodando na sua empresa?`,
      displayText: () => `Essa é a força de uma inteligência executora real. Quer agendar uma demonstração de 15 minutos para ver rodando na sua empresa?`,
      promptHint: 'Ativação imediata da plataforma:',
      options: [
        { label: '🚀 Sim! Quero ativar minha assistente agora com 30% OFF', action: 'signup' },
        { label: '📅 Quero agendar uma demonstração guiada para minha equipe', action: 'demo' }
      ]
    }
  ];

  // Helper de sintetizador de voz com controle anti-eco absoluto
  const speakText = (text, onFinished) => {
    // 1. Marca imediatamente como falando
    isSpeakingRef.current = true;
    setIsSpeaking(true);

    // 2. Aborta temporariamente o microfone para Roberta NÃO ouvir o próprio som vindo das caixas/alto-falantes
    if (silenceTimerRef.current) {
      clearTimeout(silenceTimerRef.current);
    }
    transcriptAccumulatorRef.current = '';
    setInterimSpeech('');
    if (recognitionRef.current) {
      try {
        recognitionRef.current.abort();
      } catch (e) {}
    }

    speakFemalePt(
      text,
      () => {
        isSpeakingRef.current = true;
        setIsSpeaking(true);
      },
      () => {
        isSpeakingRef.current = false;
        setIsSpeaking(false);
        if (onFinished) onFinished();

        // 3. Se o microfone estiver ativo pelo usuário, religa após 300ms de silêncio
        setTimeout(() => {
          if (isListeningMicRef.current && !isSpeakingRef.current && recognitionRef.current) {
            try {
              transcriptAccumulatorRef.current = '';
              setInterimSpeech('');
              recognitionRef.current.start();
            } catch (e) {}
          }
        }, 300);
      },
      () => {
        isSpeakingRef.current = false;
        setIsSpeaking(false);
        if (onFinished) onFinished();
      }
    );
  };

  // Inicialização estável do reconhecimento de voz contínuo
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.lang = 'pt-BR';
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      // Se Roberta estiver falando ou processando, ignora todo áudio para evitar feedback de eco
      if (isSpeakingRef.current || isProcessingSpeechRef.current) {
        return;
      }

      let finalStr = '';
      let interimStr = '';

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const item = event.results[i];
        if (item.isFinal) {
          finalStr += item[0].transcript + ' ';
        } else {
          interimStr += item[0].transcript;
        }
      }

      if (finalStr) {
        transcriptAccumulatorRef.current = (transcriptAccumulatorRef.current + ' ' + finalStr).trim();
      }

      setInterimSpeech(interimStr || transcriptAccumulatorRef.current);

      // Debounce inteligente de silêncio: aguarda 2.2 segundos para garantir que o cliente concluiu a fala
      if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
      silenceTimerRef.current = setTimeout(() => {
        if (isSpeakingRef.current || isProcessingSpeechRef.current) return;
        const textToSend = (transcriptAccumulatorRef.current + ' ' + interimStr).trim();
        if (textToSend.length > 2) {
          transcriptAccumulatorRef.current = '';
          setInterimSpeech('');
          handleCustomUserSpeech(textToSend);
        }
      }, 2200);
    };

    recognition.onerror = (e) => {
      console.warn('SpeechRecognition error:', e);
      if (e.error !== 'no-speech') {
        setIsListeningMic(false);
      }
    };

    recognition.onend = () => {
      // Se Roberta estiver falando, a fala dela religará o microfone no momento correto
      if (isSpeakingRef.current || isProcessingSpeechRef.current) {
        return;
      }
      // Se ainda estava marcado como ouvindo, reinicia automaticamente para não cortar
      if (isListeningMicRef.current && callState === 'connected') {
        try {
          recognition.start();
        } catch (err) {
          // ignore already started
        }
      }
    };

    recognitionRef.current = recognition;

    return () => {
      if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
      try {
        recognition.stop();
      } catch (e) {}
    };
  }, [callState]);

  // Controle de ativação do microfone
  const toggleMic = () => {
    if (!recognitionRef.current) {
      alert('Seu navegador não suporta reconhecimento de fala por microfone nativo. Você pode digitar sua pergunta na caixa de texto logo abaixo!');
      return;
    }

    if (isListeningMic) {
      if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
      const textToSend = (transcriptAccumulatorRef.current + ' ' + interimSpeech).trim();
      transcriptAccumulatorRef.current = '';
      setInterimSpeech('');
      isListeningMicRef.current = false;
      setIsListeningMic(false);
      try {
        recognitionRef.current.abort();
      } catch (e) {}

      if (textToSend.length > 2 && !isSpeakingRef.current && !isProcessingSpeechRef.current) {
        handleCustomUserSpeech(textToSend);
      }
    } else {
      stopSpeech();
      isSpeakingRef.current = false;
      setIsSpeaking(false);
      transcriptAccumulatorRef.current = '';
      setInterimSpeech('');
      isListeningMicRef.current = true;
      setIsListeningMic(true);
      try {
        recognitionRef.current.start();
      } catch (err) {
        console.warn('Falha ao iniciar SpeechRecognition:', err);
      }
    }
  };

  // Extração inteligente de nicho caso o usuário mencione na fala
  const detectNicheFromText = (text) => {
    const lower = text.toLowerCase();
    if (lower.includes('odonto') || lower.includes('dentist')) return 'Clínica Odontológica';
    if (lower.includes('médic') || lower.includes('medic') || lower.includes('consultório') || lower.includes('consultorio') || lower.includes('saúde') || lower.includes('saude')) return 'Clínica Médica';
    if (lower.includes('imob') || lower.includes('imóve') || lower.includes('imove') || lower.includes('corretor')) return 'Imobiliária';
    if (lower.includes('advoc') || lower.includes('jurídic') || lower.includes('juridic') || lower.includes('direito') || lower.includes('advogad')) return 'Escritório de Advocacia';
    if (lower.includes('loja') || lower.includes('e-commerce') || lower.includes('ecommerce') || lower.includes('varejo') || lower.includes('produto') || lower.includes('calçado')) return 'E-commerce & Varejo';
    if (lower.includes('serviço') || lower.includes('servico') || lower.includes('manuten') || lower.includes('reforma') || lower.includes('oficina') || lower.includes('refrigera')) return 'Serviços & Manutenção';
    return null;
  };

  // Processador central de fala ou texto do usuário
  const handleCustomUserSpeech = async (text) => {
    if (!text || !text.trim()) return;
    if (isProcessingSpeechRef.current) return;
    isProcessingSpeechRef.current = true;

    try {
      const cleanText = text.trim();
      const lower = cleanText.toLowerCase();

      // Detecção de nome do usuário
      if ((lower.includes('sou o ') || lower.includes('aqui é o ') || lower.includes('aqui e o ')) && lower.includes('francisco')) {
        setUserName('Francisco');
      }

      // Registra a fala do usuário no log imediatamente
      const userMsg = { speaker: 'Você', text: cleanText, time: formatDuration(callDuration) };
      setCallLog(prev => [...prev, userMsg]);

      // 1. O usuário está apenas saudando ou testando o áudio?
      const isGreetingOrAudioTest = (
        lower.includes('está me ouvindo') || 
        lower.includes('ta me ouvindo') || 
        lower.includes('voce me ouve') || 
        lower.includes('você me ouve') || 
        lower.includes('me escuta') ||
        lower.includes('confirme se') ||
        ((lower.startsWith('olá') || lower.startsWith('ola') || lower.startsWith('oi') || lower.startsWith('bom dia') || lower.startsWith('boa tarde') || lower.startsWith('tudo bem')) && 
         !lower.includes('odonto') && !lower.includes('clínica') && !lower.includes('clinica') && !lower.includes('empresa') && !lower.includes('imob') && !lower.includes('advoc'))
      );

      if (isGreetingOrAudioTest && !userNiche && currentStep === 0) {
        const warmReply = `Olá! Te ouço com total clareza. Me conta: qual é o ramo da sua empresa para começarmos?`;
        setTimeout(() => {
          setCallLog(prev => [...prev, {
            speaker: 'Roberta · Vocalis',
            text: warmReply,
            time: formatDuration(callDuration + 1)
          }]);
          speakText(warmReply, () => {
            isProcessingSpeechRef.current = false;
          });
        }, 300);
        return;
      }

      // 2. Se o usuário estiver na etapa 0 e informar o nicho diretamente
      const detectedNiche = detectNicheFromText(cleanText);
      if (currentStep === 0 && detectedNiche) {
        setUserNiche(detectedNiche);
        proceedToNextStep(`Meu segmento é ${detectedNiche}`, detectedNiche, '');

        // Se ele também fez uma pergunta junto
        if (lower.includes('o que') || lower.includes('como') || lower.includes('pode fazer') || lower.includes('ajuda')) {
          setIsThinking(true);
          const aiResponse = await askRobertaAI(cleanText, { niche: detectedNiche, pain: userPain, userName }, callLog);
          setIsThinking(false);
          if (aiResponse?.text) {
            setTimeout(() => {
              setCallLog(prev => [...prev, {
                speaker: 'Roberta (Vocalis · Gemini AI)',
                text: aiResponse.text,
                time: formatDuration(callDuration + 2)
              }]);
              speakText(aiResponse.text, () => {
                isProcessingSpeechRef.current = false;
              });
            }, 500);
          } else {
            isProcessingSpeechRef.current = false;
          }
        }
        return;
      }

      // 3. Se estiver na etapa 1 e o usuário responder sobre dores
      if (currentStep === 1 && (lower.includes('falta') || lower.includes('no-show') || lower.includes('cliente') || lower.includes('horário') || lower.includes('equipe') || lower.includes('custo'))) {
        const detectedPain = lower.includes('falta') ? 'No-show e faltas de clientes' : cleanText;
        setUserPain(detectedPain);
        proceedToNextStep(cleanText, userNiche, detectedPain);
        return;
      }

      // 4. Pergunta livre para a Roberta (Gemini AI com histórico)
      setIsThinking(true);
      const aiResponse = await askRobertaAI(
        cleanText, 
        { niche: userNiche || detectedNiche, pain: userPain, userName }, 
        callLog
      );
      setIsThinking(false);
      const replyText = aiResponse.text;

      setTimeout(() => {
        setCallLog(prev => [...prev, {
          speaker: 'Roberta (Vocalis · Gemini AI)',
          text: replyText,
          time: formatDuration(callDuration + 1)
        }]);
        speakText(replyText, () => {
          isProcessingSpeechRef.current = false;
        });
      }, 300);

      // Se estiver na etapa de demonstrar WhatsApp/Pix e ainda não tiver acionado
      if (currentStep >= 1 && !whatsappToastOpen) {
        setTimeout(() => {
          setWhatsappToastOpen(true);
        }, 1500);
      }
    } catch (err) {
      console.error('Erro ao processar fala:', err);
      isProcessingSpeechRef.current = false;
    }
  };

  const handleSendCustomText = () => {
    if (!customInputText.trim()) return;
    const t = customInputText;
    setCustomInputText('');
    handleCustomUserSpeech(t);
  };

  // Simulação de chamada ao abrir o modal
  useEffect(() => {
    if (!isOpen) {
      if (timerRef.current) clearInterval(timerRef.current);
      stopSpeech();
      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch(e) {}
      }
      setCallState('calling');
      setCallDuration(0);
      setCurrentStep(0);
      setUserNiche('');
      setUserPain('');
      setCallLog([]);
      setIsSpeaking(false);
      setIsListeningMic(false);
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

      // Inicia a primeira fala com voz feminina neural
      const firstStep = conversationScript[0];
      setCallLog([{ 
        speaker: 'Roberta · Vocalis', 
        text: firstStep.displayText, 
        time: '00:01' 
      }]);
      speakText(firstStep.spokenText, () => {
        isProcessingSpeechRef.current = false;
      });

    }, 1800);

    return () => {
      clearTimeout(connectTimer);
      if (timerRef.current) clearInterval(timerRef.current);
      stopSpeech();
    };
  }, [isOpen, phoneNumber]);

  const proceedToNextStep = (userLabel, nicheVal, painVal) => {
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

      // Dispara o WhatsApp e o Pix simultâneo
      if (nextScriptItem.triggerAction || nextStep >= 2) {
        setTimeout(() => {
          setWhatsappToastOpen(true);
        }, 1200);

        // Disparo via UazAPI
        const whatsappMsg = `👋 Olá! Aqui é a Roberta da *Vocalis AI*.\n\nAcabei de falar com você na demonstração ao vivo e organizei o seu diagnóstico:\n🏢 *Segmento:* ${chosenNiche || 'Empresa & Serviços'}\n🎯 *Gargalo:* ${chosenPain || 'Atendimento fora do horário'}\n⚡ *Solução:* Atendimento com voz neural em 380ms, agendamento de consultas e geração de Pix em tempo real.\n\n💬 Caso queira ativar essa IA na sua empresa ou agendar uma reunião guiada, basta responder esta mensagem!`;

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
          speaker: 'Roberta · Vocalis', 
          text: nextDisplay, 
          time: formatDuration(callDuration + 1) 
        }]);
        speakText(nextSpoken, () => {
          isProcessingSpeechRef.current = false;
        });
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

    // Registra escolha no log
    setCallLog(prev => [...prev, { speaker: 'Você', text: opt.label, time: formatDuration(callDuration) }]);
    proceedToNextStep(opt.label, opt.niche, opt.pain);
  };

  const handleEndCall = () => {
    stopSpeech();
    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch(e) {}
    }
    if (timerRef.current) clearInterval(timerRef.current);
    setIsSpeaking(false);
    setIsListeningMic(false);
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
    stopSpeech();
    setCallState('connected');
    setCallDuration(0);
    setCurrentStep(0);
    setUserNiche('');
    setUserPain('');
    setIsSpeaking(false);
    setIsListeningMic(false);
    setWhatsappToastOpen(false);
    setWhatsappModalOpen(false);

    timerRef.current = setInterval(() => {
      setCallDuration(prev => prev + 1);
    }, 1000);

    const firstStep = conversationScript[0];
    setCallLog([{ 
      speaker: 'Roberta · Vocalis', 
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
              <span>WhatsApp de Roberta (Vocalis)</span>
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
        className="bg-[#11100F] text-white rounded-3xl max-w-xl w-full border border-stone-800 shadow-2xl overflow-hidden flex flex-col relative font-sans max-h-[94vh]"
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
                  <span>Diagnóstico ao Vivo com Roberta</span>
                  <span className="text-stone-500">•</span>
                  <span className="text-emerald-400 font-mono font-bold">{formatDuration(callDuration)}</span>
                </>
              )}
              {callState === 'ended' && 'Chamada finalizada'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-flex text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#4F46E5]/20 text-[#A5B4FC] border border-[#4F46E5]/30">
              Vocalis AI
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
        <div className="p-4 sm:p-6 flex flex-col items-center text-center overflow-y-auto max-h-[calc(94vh-130px)]">
          
          {/* Avatar com aura pulsante de fala */}
          <div className="relative my-1.5">
            <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center transition-all ${
              isSpeaking ? 'bg-[#4F46E5] shadow-lg shadow-[#4F46E5]/50 scale-105' : 'bg-stone-800'
            }`}>
              <Bot className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
            </div>
            {isSpeaking && (
              <div className="absolute -inset-2 rounded-full border-2 border-[#4F46E5]/50 animate-ping pointer-events-none" />
            )}
          </div>

          <h3 className="text-base sm:text-lg font-bold text-white mt-1 flex items-center justify-center gap-2">
            <span>Roberta · SDR & Consultora Executiva de IA</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              Voz Neural HD
            </span>
          </h3>
          <p className="text-xs text-stone-400 font-mono mt-0.5">
            Em ligação com: {countryCode} {formattedDisplayPhone}
          </p>

          {/* Active speech waveform bar */}
          <div className="h-4 flex items-center gap-1 my-2">
            {[10, 22, 35, 18, 42, 58, 38, 22, 48, 65, 42, 18, 32, 12].map((h, i) => (
              <span 
                key={i} 
                style={{ height: isSpeaking ? `${h * 0.3}px` : (isListeningMic ? `${(i % 5 + 1) * 3}px` : '3px') }} 
                className={`w-1 rounded-full transition-all duration-150 ${
                  isSpeaking ? 'bg-[#4F46E5]' : (isListeningMic ? 'bg-emerald-400 animate-pulse' : 'bg-stone-700')
                }`}
              />
            ))}
          </div>

          {/* Card com Ações em Tempo Real (Action-First AI) */}
          {currentStep >= 2 && (
            <div className="w-full bg-[#181716] border border-stone-800 rounded-2xl p-3 mb-2.5 text-left animate-fadeIn">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  <span>Ações Executadas em Tempo Real na Chamada:</span>
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
                  className="p-2.5 rounded-xl bg-stone-900 border border-stone-800 hover:border-[#4F46E5]/50 flex items-center gap-2 transition-all cursor-pointer text-left"
                >
                  <QrCode className="w-4 h-4 text-[#4F46E5] shrink-0" />
                  <div>
                    <div className="font-bold text-white text-[11px]">Pix Gerado na Ligação</div>
                    <div className="text-[10px] text-stone-400">R$ 1,00 Demonstrativo</div>
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* Live Transcript Box */}
          <div className="w-full bg-stone-900/90 rounded-2xl p-3.5 border border-stone-800 text-left my-1 max-h-44 overflow-y-auto space-y-2 scrollbar-thin">
            {callLog.map((log, idx) => (
              <div key={idx} className="space-y-0.5">
                <div className="flex items-center justify-between text-[10px] text-stone-400 font-mono">
                  <span className={log.speaker.includes('Roberta') ? 'text-[#A5B4FC] font-bold' : 'text-stone-300 font-semibold'}>
                    {log.speaker}
                  </span>
                  <span>{log.time}</span>
                </div>
                <p className="text-xs text-stone-200 leading-relaxed font-sans">
                  {log.text}
                </p>
              </div>
            ))}

            {/* Feedback visual enquanto Roberta processa a IA */}
            {isThinking && (
              <div className="flex items-center gap-2 text-xs text-[#A5B4FC] italic">
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Roberta formulando resposta...</span>
              </div>
            )}

            {/* Feedback visual enquanto o microfone está captando fala */}
            {isListeningMic && (
              <div className="p-2 rounded-xl bg-stone-800/80 border border-emerald-500/30 text-xs text-emerald-300 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping shrink-0" />
                <span className="truncate">
                  {interimSpeech ? `Ouvindo: "${interimSpeech}"` : 'Ouvindo sua voz... fale agora com a Roberta'}
                </span>
              </div>
            )}
            
            <div ref={chatBottomRef} />
          </div>

          {/* Área de Entrada Multimodal (Microfone + Caixa de Texto + Botões Rápidos) */}
          {callState === 'connected' && (
            <div className="w-full mt-2.5 space-y-2">
              
              {/* Barra de Microfone e Digitação */}
              <div className="flex items-center gap-2">
                {/* Botão de Falar no Microfone */}
                <button
                  type="button"
                  onClick={toggleMic}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shrink-0 ${
                    isListeningMic 
                      ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30 animate-pulse' 
                      : 'bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700'
                  }`}
                  title="Falar com a Roberta usando seu microfone"
                >
                  {isListeningMic ? (
                    <>
                      <MicOff className="w-3.5 h-3.5" />
                      <span>Concluir Fala</span>
                    </>
                  ) : (
                    <>
                      <Mic className="w-3.5 h-3.5 text-[#4F46E5]" />
                      <span>Falar no Mic</span>
                    </>
                  )}
                </button>

                {/* Input de Texto alternativo para digitação */}
                <div className="flex-1 relative flex items-center">
                  <input
                    type="text"
                    value={customInputText}
                    onChange={(e) => setCustomInputText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleSendCustomText();
                      }
                    }}
                    placeholder="Ou digite sua pergunta para Roberta..."
                    className="w-full py-2 pl-3 pr-9 rounded-xl bg-stone-800/90 border border-stone-700 text-xs text-white placeholder-stone-400 focus:outline-none focus:border-[#4F46E5] transition-all"
                  />
                  <button
                    type="button"
                    onClick={handleSendCustomText}
                    disabled={!customInputText.trim()}
                    className="absolute right-1.5 w-6 h-6 rounded-lg bg-[#4F46E5] hover:bg-[#4338CA] disabled:opacity-40 text-white flex items-center justify-center transition-all cursor-pointer"
                  >
                    <Send className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Botões de Opção Rápida */}
              <div className="text-left">
                <p className="text-[10px] text-stone-400 font-medium mb-1">
                  {conversationScript[currentStep]?.promptHint}
                </p>
                <div className="grid grid-cols-1 gap-1.5">
                  {conversationScript[currentStep]?.options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(opt)}
                      className="w-full py-2 px-3 rounded-xl bg-stone-800/80 hover:bg-[#4F46E5] text-xs font-semibold text-white transition-all text-left flex items-center justify-between border border-stone-700/80 hover:border-[#4F46E5] shadow-sm hover:translate-x-1 cursor-pointer"
                    >
                      <span>{opt.label}</span>
                      <ArrowRight className="w-3 h-3 opacity-60" />
                    </button>
                  ))}
                </div>
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
                  className="flex-1 py-2.5 rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] text-xs font-semibold text-white flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
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
        <div className="px-5 sm:px-6 py-3 bg-stone-900 border-t border-stone-800 flex items-center justify-between">
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
                    <span>Roberta · Vocalis AI</span>
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
                  👋 Olá! Aqui é a <strong>Roberta da Vocalis</strong>. Acabei de falar com você no telefone e organizei seu diagnóstico:
                </p>
                <div className="p-2 rounded-xl bg-[#111B21] text-[11px] space-y-1 border border-stone-800">
                  <div>🏢 <strong>Segmento:</strong> {userNiche || 'Empresa & Serviços'}</div>
                  <div>🎯 <strong>Gargalo Resolvido:</strong> {userPain || 'Atendimento fora do horário'}</div>
                  <div>⚡ <strong>Solução:</strong> IA com atendimento em 380ms e agendamento instantâneo.</div>
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
                className="w-full py-2.5 rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#4F46E5]/30"
              >
                <span>Ativar na Minha Empresa Agora</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              {/* Botão de Falar com Especialista Humano no WhatsApp */}
              <a
                href={`https://wa.me/5594984423948?text=${encodeURIComponent(`Olá Francisco! Acabei de ver o diagnóstico da Roberta na Vocalis AI para ${userNiche || 'minha empresa'} e gostaria de falar com um especialista.`)}`}
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
