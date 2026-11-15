import React, { useState, useEffect } from 'react';
import { X, CheckCircle, Sparkles, MapPin, Zap } from 'lucide-react';

const SOCIAL_EVENTS = [
  {
    id: 1,
    initials: 'MO',
    name: 'Dra. Mariana O.',
    company: 'Clínica Odontológica',
    location: 'São Paulo, SP',
    action: 'conectou a Roberta no WhatsApp e na agenda',
    timeAgo: 'há 3 minutos',
    avatarBg: 'bg-emerald-600'
  },
  {
    id: 2,
    initials: 'IA',
    name: 'Grupo Imobiliário Alfa',
    company: 'Imóveis & Locação',
    location: 'Curitiba, PR',
    action: 'gerou 14 agendamentos e visitas hoje',
    timeAgo: 'há 7 minutos',
    avatarBg: 'bg-indigo-600'
  },
  {
    id: 3,
    initials: 'SA',
    name: 'Silveira & Associados',
    company: 'Advocacia Empresarial',
    location: 'Belo Horizonte, MG',
    action: 'ativou o Marcus para triagem de processos 24h',
    timeAgo: 'há 14 minutos',
    avatarBg: 'bg-stone-800'
  },
  {
    id: 4,
    initials: 'RC',
    name: 'Dr. Rodrigo Carvalho',
    company: 'Dermatologia & Saúde',
    location: 'Rio de Janeiro, RJ',
    action: 'recuperou 6 consultas em chamadas fora do expediente',
    timeAgo: 'há 21 minutos',
    avatarBg: 'bg-purple-600'
  },
  {
    id: 5,
    initials: 'AP',
    name: 'AutoCar Motors',
    company: 'Concessionária & Serviços',
    location: 'Campinas, SP',
    action: 'conectou a linha telefônica 0800 com zero espera',
    timeAgo: 'há 32 minutos',
    avatarBg: 'bg-blue-600'
  }
];

export default function LiveSocialProofToasts() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    // Initial delay before showing first notification
    const initialTimer = setTimeout(() => {
      if (!isDismissed) setIsVisible(true);
    }, 4000);

    return () => clearTimeout(initialTimer);
  }, [isDismissed]);

  useEffect(() => {
    if (isDismissed || isPaused) return;

    const interval = setInterval(() => {
      // Fade out
      setIsVisible(false);

      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % SOCIAL_EVENTS.length);
        setIsVisible(true);
      }, 700);

    }, 12000);

    return () => clearInterval(interval);
  }, [isDismissed, isPaused]);

  if (isDismissed) return null;

  const currentEvent = SOCIAL_EVENTS[currentIndex];

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className={`fixed bottom-5 left-4 sm:left-6 z-40 transition-all duration-500 ease-out max-w-[340px] sm:max-w-[380px] pointer-events-auto select-none ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0 pointer-events-none'
      }`}
    >
      <div className="bg-white/95 backdrop-blur-md rounded-2xl p-3.5 sm:p-4 border border-[#E7E4DC] shadow-xl text-left flex items-start gap-3 relative group">
        
        {/* Avatar Initials */}
        <div className={`w-9 h-9 rounded-xl ${currentEvent.avatarBg} text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-sm`}>
          {currentEvent.initials}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0 pr-4">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#1A1816] truncate">
            <span>{currentEvent.name}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
            <span className="text-[10px] font-normal text-[#8C8881] truncate">({currentEvent.location})</span>
          </div>

          <p className="text-[11px] sm:text-xs text-[#5C5955] leading-snug mt-0.5 line-clamp-2">
            {currentEvent.action}
          </p>

          <div className="flex items-center gap-2 mt-1.5 text-[10px] font-mono text-[#8C8881]">
            <span className="flex items-center gap-1 text-emerald-600 font-semibold">
              <Zap className="w-2.5 h-2.5 fill-current" />
              <span>Ao vivo</span>
            </span>
            <span>·</span>
            <span>{currentEvent.timeAgo}</span>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={() => setIsDismissed(true)}
          className="absolute top-2.5 right-2.5 p-1 text-[#8C8881] hover:text-[#1A1816] rounded-md transition-colors cursor-pointer"
          title="Fechar notificações"
        >
          <X className="w-3.5 h-3.5" />
        </button>

      </div>
    </div>
  );
}
