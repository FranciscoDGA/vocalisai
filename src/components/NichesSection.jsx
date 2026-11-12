import React, { useState } from 'react';
import { NICHES } from '../data/content';
import { 
  Stethoscope, 
  Building2, 
  Scale, 
  Car, 
  ShoppingBag, 
  UtensilsCrossed, 
  GraduationCap, 
  Landmark, 
  Play, 
  Pause, 
  Check, 
  ArrowRight, 
  Sparkles,
  PhoneForwarded,
  MessageCircle,
  TrendingUp,
  Clock,
  Layers
} from 'lucide-react';

const iconMap = {
  Stethoscope,
  Building2,
  Scale,
  Car,
  ShoppingBag,
  UtensilsCrossed,
  GraduationCap,
  Landmark,
};

export default function NichesSection({ onOpenDemo }) {
  const [selectedNicheId, setSelectedNicheId] = useState(NICHES[0].id);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const activeNiche = NICHES.find(n => n.id === selectedNicheId) || NICHES[0];
  const IconComponent = iconMap[activeNiche.icon] || Sparkles;

  const handlePlayVoice = (text) => {
    if ('speechSynthesis' in window) {
      if (isPlayingAudio) {
        window.speechSynthesis.cancel();
        setIsPlayingAudio(false);
        return;
      }

      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'pt-BR';
      utterance.rate = 1.05;

      const voices = window.speechSynthesis.getVoices();
      const ptVoice = voices.find(v => v.lang.includes('pt-BR') || v.lang.includes('pt'));
      if (ptVoice) utterance.voice = ptVoice;

      utterance.onstart = () => setIsPlayingAudio(true);
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);

      window.speechSynthesis.speak(utterance);
    } else {
      setIsPlayingAudio(!isPlayingAudio);
      setTimeout(() => setIsPlayingAudio(false), 3500);
    }
  };

  return (
    <section id="nichos" className="py-24 relative bg-[#090a10] border-t border-b border-white/5">
      
      {/* Background illumination */}
      <div className="absolute top-1/2 right-10 w-[500px] h-[500px] bg-orange-600/10 blur-[130px] pointer-events-none rounded-full"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-semibold text-amber-400">
            <Layers className="w-3.5 h-3.5" />
            <span>Treinado para o Seu Modelo de Negócio</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Soluções Especializadas para Diversos Setores
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            A Vocalis não é um chatbot genérico. Nossos agentes são pré-treinados nos fluxos, termos técnicos e regras específicas de cada segmento empresarial.
          </p>
        </div>

        {/* Niche Tabs Selector */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto gap-2 pb-4 scrollbar-none mb-10">
          {NICHES.map((niche) => {
            const TabIcon = iconMap[niche.icon] || Sparkles;
            const isSelected = niche.id === selectedNicheId;
            return (
              <button
                key={niche.id}
                onClick={() => {
                  setSelectedNicheId(niche.id);
                  if (isPlayingAudio) {
                    window.speechSynthesis?.cancel();
                    setIsPlayingAudio(false);
                  }
                }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all flex-shrink-0 ${
                  isSelected
                    ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 shadow-lg shadow-orange-500/20'
                    : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/5'
                }`}
              >
                <TabIcon className={`w-4 h-4 ${isSelected ? 'text-slate-950' : 'text-orange-400'}`} />
                <span>{niche.name}</span>
              </button>
            );
          })}
        </div>

        {/* ACTIVE NICHE DETAIL SHOWCASE */}
        <div className="rounded-3xl bg-[#12141f] border border-white/10 overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            
            {/* Left Column: Niche Pitch & Metrics (7 cols) */}
            <div className="lg:col-span-7 p-6 sm:p-10 space-y-8 flex flex-col justify-between">
              
              <div className="space-y-6">
                {/* Header info */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-white">
                      {activeNiche.name}
                    </h3>
                    <p className="text-sm text-orange-400 font-medium">
                      {activeNiche.tagline}
                    </p>
                  </div>
                </div>

                <p className="text-slate-300 text-base leading-relaxed">
                  {activeNiche.description}
                </p>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-3 gap-3 sm:gap-4 p-4 rounded-2xl bg-black/40 border border-white/5">
                  {activeNiche.metrics.map((metric, i) => (
                    <div key={i} className="text-center sm:text-left">
                      <div className="text-xl sm:text-2xl font-black text-amber-400">
                        {metric.value}
                      </div>
                      <div className="text-[11px] sm:text-xs text-slate-400 font-medium mt-0.5">
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Specific Features Checklist */}
                <div className="space-y-2.5">
                  <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider">
                    Diferenciais inclusos para {activeNiche.name}:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {activeNiche.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300">
                        <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Software Integrations */}
                <div className="pt-2">
                  <span className="text-xs text-slate-400 font-medium mr-2">Sistemas integrados comuns:</span>
                  <div className="inline-flex flex-wrap gap-1.5 mt-1">
                    {activeNiche.integrations.map((item, idx) => (
                      <span key={idx} className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs text-slate-300 font-medium">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-6 border-t border-white/10">
                <button
                  onClick={onOpenDemo}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2 transition-all"
                >
                  <span>Testar Atendimento para {activeNiche.name}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>

            {/* Right Column: Interactive Voice / Chat Simulation Box (5 cols) */}
            <div className="lg:col-span-5 bg-[#0e1018] p-6 sm:p-8 border-t lg:border-t-0 lg:border-l border-white/10 flex flex-col justify-between">
              
              <div className="space-y-6">
                {/* Audio Sample Box */}
                <div className="p-4 rounded-2xl bg-[#171a27] border border-white/10 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></div>
                      <span className="text-xs font-semibold text-white">Demonstração de Áudio em Português</span>
                    </div>
                    <span className="text-[11px] text-slate-400 font-mono">{activeNiche.sampleAudio.duration}</span>
                  </div>

                  <p className="text-xs font-medium text-orange-400">
                    {activeNiche.sampleAudio.title}
                  </p>

                  <div className="flex items-center justify-between gap-4 pt-2">
                    <div className="flex-1">
                      <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                        <div className={`h-full bg-gradient-to-r from-orange-500 to-amber-400 ${isPlayingAudio ? 'w-3/4 animate-pulse' : 'w-1/4'}`}></div>
                      </div>
                    </div>
                    <button
                      onClick={() => handlePlayVoice(activeNiche.sampleAudio.agentText)}
                      className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-md"
                    >
                      {isPlayingAudio ? (
                        <>
                          <Pause className="w-3.5 h-3.5 fill-current" />
                          <span>Pausar</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>Ouvir Chamada</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Simulated Conversation Transcript */}
                <div className="space-y-3">
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <MessageCircle className="w-3.5 h-3.5 text-orange-400" />
                    <span>Transcrição da Interação</span>
                  </div>

                  {/* Customer bubble */}
                  <div className="flex flex-col items-start space-y-1">
                    <span className="text-[10px] text-slate-400 ml-1">Cliente / Paciente:</span>
                    <div className="max-w-[85%] rounded-2xl rounded-tl-sm px-4 py-2.5 bg-slate-800/90 text-xs sm:text-sm text-slate-200 border border-slate-700">
                      {activeNiche.sampleAudio.userText}
                    </div>
                  </div>

                  {/* AI Agent bubble */}
                  <div className="flex flex-col items-end space-y-1 pt-1">
                    <div className="flex items-center gap-1.5 mr-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                      <span className="text-[10px] text-orange-400 font-semibold">{activeNiche.sampleAudio.speaker}:</span>
                    </div>
                    <div className="max-w-[90%] rounded-2xl rounded-tr-sm px-4 py-2.5 bg-gradient-to-br from-orange-600/30 to-amber-600/20 text-xs sm:text-sm text-white border border-orange-500/30 shadow-lg">
                      {activeNiche.sampleAudio.agentText}
                    </div>
                  </div>
                </div>

                {/* Outcome badge */}
                <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/20 text-xs text-emerald-300 flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Resultado: Compromisso registrado na agenda & confirmado no WhatsApp em 30s.</span>
                </div>

              </div>

              <div className="pt-4 text-center">
                <span className="text-[11px] text-slate-500">
                  Totalmente parametrizável de acordo com os horários e serviços da sua empresa.
                </span>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
