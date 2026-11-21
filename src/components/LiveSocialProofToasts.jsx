import React, { useState, useEffect } from 'react';
import { X, Zap } from 'lucide-react';

export default function LiveSocialProofToasts({ events = [] }) {
  const validEvents = Array.isArray(events) ? events.filter(Boolean) : [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (validEvents.length === 0) return undefined;
    const initialTimer = setTimeout(() => {
      if (!isDismissed) setIsVisible(true);
    }, 4000);

    return () => clearTimeout(initialTimer);
  }, [isDismissed, validEvents.length]);

  useEffect(() => {
    if (validEvents.length <= 1 || isDismissed || isPaused) return undefined;

    const interval = setInterval(() => {
      setIsVisible(false);

      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % validEvents.length);
        setIsVisible(true);
      }, 700);
    }, 12000);

    return () => clearInterval(interval);
  }, [isDismissed, isPaused, validEvents.length]);

  if (validEvents.length === 0 || isDismissed) return null;

  const currentEvent = validEvents[currentIndex % validEvents.length];

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className={`fixed bottom-5 left-4 sm:left-6 z-40 transition-all duration-500 ease-out max-w-[340px] sm:max-w-[380px] pointer-events-auto select-none ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0 pointer-events-none'
      }`}
    >
      <div className="bg-white/95 backdrop-blur-md rounded-2xl p-3.5 sm:p-4 border border-[#E7E4DC] shadow-xl text-left flex items-start gap-3 relative group">
        <div className={`w-9 h-9 rounded-xl ${currentEvent.avatarBg || 'bg-indigo-600'} text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-sm`}>
          {currentEvent.initials || 'VA'}
        </div>

        <div className="flex-1 min-w-0 pr-4">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#1A1816] truncate">
            <span>{currentEvent.name}</span>
            {currentEvent.location && (
              <span className="text-[10px] font-normal text-[#8C8881] truncate">({currentEvent.location})</span>
            )}
          </div>

          <p className="text-[11px] sm:text-xs text-[#5C5955] leading-snug mt-0.5 line-clamp-2">
            {currentEvent.action}
          </p>

          <div className="flex items-center gap-2 mt-1.5 text-[10px] font-mono text-[#8C8881]">
            <span className="flex items-center gap-1 text-emerald-700 font-semibold">
              <Zap className="w-2.5 h-2.5 fill-current" />
              <span>Atividade verificada</span>
            </span>
            {currentEvent.timeAgo && (
              <>
                <span>·</span>
                <span>{currentEvent.timeAgo}</span>
              </>
            )}
          </div>
        </div>

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
