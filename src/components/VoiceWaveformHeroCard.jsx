import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, Pause, Phone, ArrowRight, Volume2, VolumeX, RotateCcw, 
  Sparkles, Check, CheckCheck, Calendar, MessageSquare, Zap
} from 'lucide-react';
import { BRAND } from '../data/content';
import { speakFemalePt } from '../utils/voiceUtils';

// Harmonic base profile for 38 frequency bars (symmetrical vocal frequency spectrum)
const FREQUENCY_BARS = [
  { baseHeight: 10, animVar: 1 },
  { baseHeight: 14, animVar: 2 },
  { baseHeight: 18, animVar: 3 },
  { baseHeight: 24, animVar: 1 },
  { baseHeight: 30, animVar: 4 },
  { baseHeight: 36, animVar: 2 },
  { baseHeight: 42, animVar: 3 },
  { baseHeight: 46, animVar: 1 },
  { baseHeight: 40, animVar: 4 },
  { baseHeight: 44, animVar: 2 },
  { baseHeight: 48, animVar: 3 },
  { baseHeight: 52, animVar: 1 },
  { baseHeight: 46, animVar: 4 },
  { baseHeight: 50, animVar: 2 },
  { baseHeight: 54, animVar: 3 },
  { baseHeight: 48, animVar: 1 },
  { baseHeight: 52, animVar: 4 },
  { baseHeight: 50, animVar: 2 },
  { baseHeight: 54, animVar: 3 },
  { baseHeight: 52, animVar: 1 },
  { baseHeight: 48, animVar: 4 },
  { baseHeight: 54, animVar: 2 },
  { baseHeight: 50, animVar: 3 },
  { baseHeight: 46, animVar: 1 },
  { baseHeight: 52, animVar: 4 },
  { baseHeight: 48, animVar: 2 },
  { baseHeight: 44, animVar: 3 },
  { baseHeight: 40, animVar: 1 },
  { baseHeight: 46, animVar: 4 },
  { baseHeight: 42, animVar: 2 },
  { baseHeight: 36, animVar: 3 },
  { baseHeight: 30, animVar: 1 },
  { baseHeight: 24, animVar: 4 },
  { baseHeight: 18, animVar: 2 },
  { baseHeight: 14, animVar: 3 },
  { baseHeight: 12, animVar: 1 },
  { baseHeight: 10, animVar: 4 },
  { baseHeight: 8, animVar: 2 }
];

const DIALOGUE_STEPS = [
  {
    id: 1,
    speaker: 'vocalis',
    speakerName: 'VOCALIS (DÉBORA)',
    text: 'Boa noite! Consultório Vila Verde, aqui é a Débora. Como posso ajudar?',
    durationMs: 4500,
    latency: '340ms',
    actions: []
  },
  {
    id: 2,
    speaker: 'cliente',
    speakerName: 'CLIENTE',
    text: 'Oi, Débora. Queria marcar uma limpeza ou consulta ainda esta semana.',
    durationMs: 4200,
    latency: null,
    actions: []
  },
  {
    id: 3,
    speaker: 'vocalis',
    speakerName: 'VOCALIS (DÉBORA)',
    text: 'Claro! Tenho quinta às 14h ou sexta às 9h30. Qual fica melhor para você?',
    durationMs: 4800,
    latency: '380ms',
    actions: ['agenda']
  },
  {
    id: 4,
    speaker: 'cliente',
    speakerName: 'CLIENTE',
    text: 'Quinta às 14h, por favor.',
    durationMs: 3200,
    latency: null,
    actions: ['agenda']
  },
  {
    id: 5,
    speaker: 'vocalis',
    speakerName: 'VOCALIS (DÉBORA)',
    text: 'Pronto: quinta, 14h, com a Dra. Marina. Mandei a confirmação no seu WhatsApp.',
    durationMs: 5000,
    latency: '360ms',
    actions: ['agenda', 'agendado', 'whatsapp']
  },
  {
    id: 6,
    speaker: 'cliente',
    speakerName: 'CLIENTE',
    text: 'Perfeito. Muito obrigada!',
    durationMs: 3000,
    latency: null,
    actions: ['agenda', 'agendado', 'whatsapp']
  }
];

export default function VoiceWaveformHeroCard({ onTestCall, onOpenAuth }) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isAudioMuted, setIsAudioMuted] = useState(true);
  const [callSeconds, setCallSeconds] = useState(27);
  const [isTransitioningLatency, setIsTransitioningLatency] = useState(false);

  const stepTimerRef = useRef(null);
  const clockTimerRef = useRef(null);
  const transcriptContainerRef = useRef(null);

  const currentStep = DIALOGUE_STEPS[currentStepIndex];
  const isVocalisSpeaking = isPlaying && currentStep.speaker === 'vocalis' && !isTransitioningLatency;
  const isClienteSpeaking = isPlaying && currentStep.speaker === 'cliente' && !isTransitioningLatency;

  // Live call clock ticker
  useEffect(() => {
    if (isPlaying) {
      clockTimerRef.current = setInterval(() => {
        setCallSeconds(prev => (prev >= 99 ? 12 : prev + 1));
      }, 1000);
    } else {
      clearInterval(clockTimerRef.current);
    }
    return () => clearInterval(clockTimerRef.current);
  }, [isPlaying]);

  // Dialogue steps simulation sequencer
  useEffect(() => {
    if (!isPlaying) {
      if (stepTimerRef.current) clearTimeout(stepTimerRef.current);
      return;
    }

    const current = DIALOGUE_STEPS[currentStepIndex];

    // Optional audio voice synthesis when unmuted
    if (!isAudioMuted && current.speaker === 'vocalis' && typeof window !== 'undefined') {
      speakFemalePt(current.text);
    }

    // Schedule next turn
    stepTimerRef.current = setTimeout(() => {
      // Small latency transition pulse before Vocalis speaks
      const nextIndex = (currentStepIndex + 1) % DIALOGUE_STEPS.length;
      const nextStep = DIALOGUE_STEPS[nextIndex];

      if (nextStep.speaker === 'vocalis') {
        setIsTransitioningLatency(true);
        setTimeout(() => {
          setIsTransitioningLatency(false);
          setCurrentStepIndex(nextIndex);
        }, 380); // Ultra-low 380ms latency simulation
      } else {
        setCurrentStepIndex(nextIndex);
      }
    }, current.durationMs);

    return () => {
      if (stepTimerRef.current) clearTimeout(stepTimerRef.current);
    };
  }, [currentStepIndex, isPlaying, isAudioMuted]);

  // Auto-scroll transcript container to bottom when new messages appear
  useEffect(() => {
    if (transcriptContainerRef.current) {
      transcriptContainerRef.current.scrollTo({
        top: transcriptContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [currentStepIndex]);

  const handleTogglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    } else {
      setIsPlaying(true);
    }
  };

  const handleRestart = () => {
    setCurrentStepIndex(0);
    setCallSeconds(12);
    setIsPlaying(true);
  };

  const handleToggleAudio = () => {
    const nextState = !isAudioMuted;
    setIsAudioMuted(nextState);
    if (!nextState && currentStep.speaker === 'vocalis') {
      speakFemalePt(currentStep.text);
    } else if (nextState && typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  };

  const visibleSteps = DIALOGUE_STEPS.slice(0, currentStepIndex + 1);

  return (
    <div className="w-full max-w-5xl mx-auto rounded-3xl bg-[#11100F] text-stone-100 p-5 sm:p-7 md:p-9 shadow-2xl border border-stone-800 text-left relative overflow-hidden select-none">
      
      {/* Dynamic keyframe styles for buttery smooth 60fps waveform frequency animation */}
      <style>{`
        @keyframes waveOscillate1 {
          0%, 100% { transform: scaleY(0.18); }
          50% { transform: scaleY(1.0); }
        }
        @keyframes waveOscillate2 {
          0%, 100% { transform: scaleY(0.24); }
          50% { transform: scaleY(0.85); }
        }
        @keyframes waveOscillate3 {
          0%, 100% { transform: scaleY(0.12); }
          50% { transform: scaleY(0.95); }
        }
        @keyframes waveOscillate4 {
          0%, 100% { transform: scaleY(0.3); }
          50% { transform: scaleY(0.7); }
        }
        .anim-wave-1 { animation: waveOscillate1 0.55s ease-in-out infinite alternate; }
        .anim-wave-2 { animation: waveOscillate2 0.70s ease-in-out infinite alternate; }
        .anim-wave-3 { animation: waveOscillate3 0.48s ease-in-out infinite alternate; }
        .anim-wave-4 { animation: waveOscillate4 0.62s ease-in-out infinite alternate; }
      `}</style>

      {/* Ambient background glows */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-72 h-72 bg-[#C84B1F]/15 rounded-full blur-3xl pointer-events-none" />

      {/* ========================================================
          1. TOP STATUS BAR (Exact Kloel replica)
         ======================================================== */}
      <div className="flex flex-wrap items-center justify-between pb-5 border-b border-stone-800/80 gap-3 text-xs">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-stone-800/90 border border-stone-700/60 flex items-center justify-center text-stone-300 shadow-inner">
            <Phone className="w-4 h-4 text-orange-400" />
          </div>
          <div>
            <p className="font-bold text-stone-100 flex items-center gap-2">
              <span>Ligação recebida · 23:12</span>
            </p>
            <p className="text-[11px] text-stone-400 font-mono">
              Fora do horário comercial · +55 11 9••••-4821
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          {/* Latency feedback badge */}
          <div className={`px-2.5 py-1 rounded-full border text-[11px] font-mono transition-all duration-300 flex items-center gap-1.5 ${
            isTransitioningLatency 
              ? 'bg-orange-500/20 border-orange-500 text-orange-300 scale-105' 
              : 'bg-stone-800/80 border-stone-700/60 text-stone-300'
          }`}>
            <Zap className={`w-3 h-3 ${isTransitioningLatency ? 'text-orange-400 animate-spin' : 'text-amber-400'}`} />
            <span>
              {isTransitioningLatency ? '⚡ Latência: 340ms' : currentStep.latency ? `⚡ Latência: ${currentStep.latency}` : '⚡ Latência: ultrabaixa'}
            </span>
          </div>

          {/* Live indicator badge */}
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-800/80 border border-stone-700 text-[11px] text-stone-200 font-mono shadow-sm">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            <span>Ao vivo · 00:{String(callSeconds).padStart(2, '0')}</span>
          </span>
        </div>
      </div>

      {/* ========================================================
          2. MAIN BODY (2-COLUMN GRID: WAVEFORMS VS TRANSCRIPT)
         ======================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 py-6 items-start">
        
        {/* ======================================================
            LEFT COLUMN: REAL-TIME FREQUENCY WAVEFORMS + WORKFLOW ACTIONS
           ====================================================== */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
          
          <div className="space-y-6">
            
            {/* --- VOCALIS AI WAVEFORM (ORANGE) --- */}
            <div className={`p-4 rounded-2xl border transition-all duration-300 ${
              isVocalisSpeaking 
                ? 'bg-gradient-to-r from-stone-900/90 to-stone-900/60 border-orange-500/40 shadow-lg shadow-orange-500/5' 
                : 'bg-stone-900/30 border-stone-800/40 opacity-70'
            }`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    isVocalisSpeaking ? 'bg-orange-500 animate-ping' : 'bg-stone-600'
                  }`} />
                  <span className={`text-xs font-bold tracking-wider uppercase transition-colors ${
                    isVocalisSpeaking ? 'text-[#F97316]' : 'text-stone-400'
                  }`}>
                    VOCALIS AI
                  </span>
                </div>
                {isVocalisSpeaking && (
                  <span className="text-[10px] uppercase font-mono tracking-widest text-orange-400 font-semibold flex items-center gap-1">
                    <span>Falando</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
                  </span>
                )}
              </div>

              {/* Dynamic Orange Frequency Bars */}
              <div className="h-14 flex items-center justify-between gap-[2px] sm:gap-[3px] px-1 overflow-hidden">
                {FREQUENCY_BARS.map((bar, i) => {
                  const animClass = isVocalisSpeaking ? `anim-wave-${bar.animVar}` : '';
                  const animDelay = isVocalisSpeaking ? `${(i % 12) * 0.045}s` : '0s';

                  return (
                    <div
                      key={`voc-${i}`}
                      className="flex items-center justify-center flex-1 h-full"
                    >
                      <div
                        className={`w-full max-w-[4px] rounded-full transition-all duration-200 ${
                          isVocalisSpeaking
                            ? 'bg-gradient-to-t from-[#EA580C] via-[#F97316] to-[#FB923C] shadow-[0_0_8px_rgba(249,115,22,0.45)]'
                            : 'h-[3px] bg-stone-700/60'
                        } ${animClass}`}
                        style={{
                          height: isVocalisSpeaking ? `${bar.baseHeight}px` : '3px',
                          transformOrigin: 'center',
                          animationDelay: animDelay
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* --- CLIENTE WAVEFORM (WHITE) --- */}
            <div className={`p-4 rounded-2xl border transition-all duration-300 ${
              isClienteSpeaking 
                ? 'bg-gradient-to-r from-stone-900/90 to-stone-900/60 border-stone-600 shadow-lg shadow-white/5' 
                : 'bg-stone-900/30 border-stone-800/40 opacity-70'
            }`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    isClienteSpeaking ? 'bg-white animate-ping' : 'bg-stone-600'
                  }`} />
                  <span className={`text-xs font-bold tracking-wider uppercase transition-colors ${
                    isClienteSpeaking ? 'text-white' : 'text-stone-400'
                  }`}>
                    CLIENTE
                  </span>
                </div>
                {isClienteSpeaking && (
                  <span className="text-[10px] uppercase font-mono tracking-widest text-stone-200 font-semibold flex items-center gap-1">
                    <span>Falando</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  </span>
                )}
              </div>

              {/* Dynamic White Frequency Bars */}
              <div className="h-14 flex items-center justify-between gap-[2px] sm:gap-[3px] px-1 overflow-hidden">
                {FREQUENCY_BARS.map((bar, i) => {
                  const animClass = isClienteSpeaking ? `anim-wave-${bar.animVar}` : '';
                  const animDelay = isClienteSpeaking ? `${(i % 12) * 0.045}s` : '0s';

                  return (
                    <div
                      key={`cli-${i}`}
                      className="flex items-center justify-center flex-1 h-full"
                    >
                      <div
                        className={`w-full max-w-[4px] rounded-full transition-all duration-200 ${
                          isClienteSpeaking
                            ? 'bg-gradient-to-t from-stone-200 via-white to-white shadow-[0_0_8px_rgba(255,255,255,0.45)]'
                            : 'h-[3px] bg-stone-700/60'
                        } ${animClass}`}
                        style={{
                          height: isClienteSpeaking ? `${bar.baseHeight}px` : '3px',
                          transformOrigin: 'center',
                          animationDelay: animDelay
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* --- WORKFLOW ACTIONS (Dynamic Pop-in Pills from Kloel) --- */}
          <div className="space-y-2 pt-1">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              
              {/* Pill 1: Agenda Consultada */}
              <div className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 border transition-all duration-500 ${
                currentStep.actions.includes('agenda')
                  ? 'bg-stone-800/90 border-stone-700 text-stone-200 scale-100 opacity-100 shadow-sm'
                  : 'bg-stone-900/20 border-stone-800/30 text-stone-600 scale-95 opacity-30'
              }`}>
                <span>🔍 Agenda consultada</span>
                <Check className={`w-3.5 h-3.5 ${currentStep.actions.includes('agenda') ? 'text-emerald-400' : 'text-stone-600'}`} />
              </div>

              {/* Pill 2: Agendado */}
              <div className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 border transition-all duration-500 ${
                currentStep.actions.includes('agendado')
                  ? 'bg-stone-800/90 border-stone-700 text-stone-200 scale-100 opacity-100 shadow-sm'
                  : 'bg-stone-900/20 border-stone-800/30 text-stone-600 scale-95 opacity-30'
              }`}>
                <span>📅 Agendado · qui, 14h</span>
                <Check className={`w-3.5 h-3.5 ${currentStep.actions.includes('agendado') ? 'text-emerald-400' : 'text-stone-600'}`} />
              </div>

              {/* Pill 3: Confirmação enviada */}
              <div className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 border transition-all duration-500 ${
                currentStep.actions.includes('whatsapp')
                  ? 'bg-stone-800/90 border-stone-700 text-stone-200 scale-100 opacity-100 shadow-sm'
                  : 'bg-stone-900/20 border-stone-800/30 text-stone-600 scale-95 opacity-30'
              }`}>
                <span>💬 Confirmação enviada</span>
                <Check className={`w-3.5 h-3.5 ${currentStep.actions.includes('whatsapp') ? 'text-emerald-400' : 'text-stone-600'}`} />
              </div>

            </div>

            <p className="text-[11px] text-stone-400 pt-1">
              Telefone · WhatsApp · Webchat — tudo em um só painel
            </p>
          </div>

        </div>

        {/* ======================================================
            RIGHT COLUMN: LIVE TRANSCRIPTION (CHAT BUBBLES)
           ====================================================== */}
        <div className="lg:col-span-6 flex flex-col justify-between">
          
          <div>
            {/* Header */}
            <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-3 px-1">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                <span>TRANSCRIÇÃO AO VIVO</span>
              </span>
              <span>Conversa ilustrativa</span>
            </div>

            {/* Chat Messages Scroll Container */}
            <div 
              ref={transcriptContainerRef}
              className="space-y-3 font-sans max-h-[310px] sm:max-h-[340px] overflow-y-auto pr-1 no-scrollbar scroll-smooth"
            >
              {visibleSteps.map((step) => {
                const isVocalis = step.speaker === 'vocalis';

                return (
                  <div
                    key={`msg-${step.id}`}
                    className={`transition-all duration-400 transform animate-in fade-in slide-in-from-bottom-2 ${
                      isVocalis ? 'max-w-[92%]' : 'max-w-[90%] ml-auto text-right'
                    }`}
                  >
                    {isVocalis ? (
                      /* Vocalis Bubble: Dark card with Orange header */
                      <div className="p-3.5 sm:p-4 rounded-2xl bg-stone-900/90 border border-stone-800 shadow-sm text-left">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#F97316] block mb-1">
                          {step.speakerName}
                        </span>
                        <p className="text-stone-200 text-xs sm:text-[13px] leading-relaxed">
                          {step.text}
                        </p>
                      </div>
                    ) : (
                      /* Cliente Bubble: White card with dark text */
                      <div className="p-3.5 sm:p-4 rounded-2xl bg-white text-stone-900 shadow-md text-left ml-auto">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block mb-1">
                          {step.speakerName}
                        </span>
                        <p className="text-stone-900 text-xs sm:text-[13px] font-medium leading-relaxed">
                          {step.text}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column Footer Subtext */}
          <div className="pt-3 border-t border-stone-800/60 mt-3">
            <p className="text-[11px] text-stone-400 text-right">
              Resumo e gravação disponíveis assim que a ligação termina
            </p>
          </div>

        </div>

      </div>

      {/* ========================================================
          3. BOTTOM AUDIO & INTERACTIVE CONTROLS BAR
         ======================================================== */}
      <div className="pt-4 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Controls: Play/Pause, Audio Mute, Restart */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          
          {/* Play/Pause Button */}
          <button
            onClick={handleTogglePlay}
            title={isPlaying ? 'Pausar simulação' : 'Continuar simulação'}
            className="w-10 h-10 rounded-full bg-white text-stone-950 hover:bg-stone-200 flex items-center justify-center transition-all shrink-0 shadow-lg cursor-pointer"
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 fill-current" />
            ) : (
              <Play className="w-4 h-4 fill-current ml-0.5" />
            )}
          </button>

          {/* Restart simulation */}
          <button
            onClick={handleRestart}
            title="Reiniciar conversa do início"
            className="w-9 h-9 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 flex items-center justify-center transition-all shrink-0 border border-stone-700 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          {/* Sound Toggle (Speech Synthesis audio) */}
          <button
            onClick={handleToggleAudio}
            title={isAudioMuted ? 'Ativar voz em áudio' : 'Mutar voz'}
            className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 border transition-all cursor-pointer ${
              !isAudioMuted 
                ? 'bg-orange-500/20 border-orange-500/60 text-orange-300' 
                : 'bg-stone-800/80 border-stone-700 text-stone-400 hover:text-stone-200'
            }`}
          >
            {!isAudioMuted ? <Volume2 className="w-3.5 h-3.5 text-orange-400 animate-pulse" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{!isAudioMuted ? 'Áudio ativado' : 'Ouvir voz'}</span>
          </button>

          {/* Step Timeline Pills */}
          <div className="flex items-center gap-1 ml-1">
            {DIALOGUE_STEPS.map((_, i) => (
              <button
                key={`dot-${i}`}
                onClick={() => {
                  setCurrentStepIndex(i);
                  setIsPlaying(true);
                }}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  i === currentStepIndex
                    ? 'w-6 bg-[#F97316]'
                    : i < currentStepIndex
                    ? 'w-2 bg-stone-500'
                    : 'w-2 bg-stone-800'
                }`}
                title={`Pular para fala ${i + 1}`}
              />
            ))}
          </div>

        </div>

        {/* CTA Button to test directly */}
        <button
          onClick={onTestCall}
          className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-gradient-to-r from-orange-600 to-[#C84B1F] hover:from-orange-500 hover:to-orange-600 text-xs font-bold text-white transition-all flex items-center justify-center gap-2 shadow-lg shadow-orange-950/40 cursor-pointer border border-orange-500/30"
        >
          <span>Testar com a inteligência da minha empresa</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

      </div>

    </div>
  );
}
