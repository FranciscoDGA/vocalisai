import React, { useState } from 'react';
import { Phone, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { BRAND } from '../data/content';
import TestCallModal from './TestCallModal';
import { formatPhoneMask, cleanRawPhone } from '../utils/phoneUtils';

export default function CtaSection({ onOpenDemo, onOpenAuth }) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [testModalOpen, setTestModalOpen] = useState(false);

  const handleTestCall = (e) => {
    e.preventDefault();
    const digits = cleanRawPhone(phoneNumber);
    if (!digits || digits.length < 10) {
      setPhoneNumber('(11) 98765-4321');
    } else {
      setPhoneNumber(formatPhoneMask(digits));
    }
    setTestModalOpen(true);
  };

  const handlePhoneChange = (e) => {
    setPhoneNumber(formatPhoneMask(e.target.value));
  };

  return (
    <section className="py-24 bg-[#FAF9F5] border-t border-[#EBE8E2]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Big Onyx Black Hero Card */}
        <div className="bg-[#141312] text-white rounded-[32px] p-8 sm:p-14 lg:p-16 relative overflow-hidden shadow-2xl border border-[#2D2A26] text-center">
          
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-[#C84B1F]/20 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <span className="inline-block text-xs font-bold tracking-widest text-[#FF7A59] uppercase">
              COMECE EM MENOS DE 5 MINUTOS
            </span>

            <h2 className="text-4xl sm:text-6xl font-normal tracking-tight text-white leading-[1.1]">
              Seu próximo cliente vai ligar.<br />
              <span className="font-serif-title italic text-[#FF9E7D]">Alguém vai atender.</span>
            </h2>

            <p className="text-base sm:text-lg text-[#B5B0A8] max-w-2xl mx-auto leading-relaxed">
              Pare de perder clientes por demora no WhatsApp ou telefone ocupado. Coloque a inteligência da sua empresa (AI Agency OS) para atender 24 horas por dia com voz humana ultra-realista.
            </p>

            {/* Quick Test Call Form (Pill matching Kloel) */}
            <form onSubmit={handleTestCall} className="max-w-md mx-auto pt-4">
              <div className="flex items-center bg-[#1F1E1B] border border-[#383531] rounded-full p-1.5 pl-4 focus-within:border-[#C84B1F] transition-all">
                <span className="text-base mr-2">🇧🇷</span>
                <input
                  type="tel"
                  placeholder="Seu celular com DDD"
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                  className="w-full bg-transparent text-white text-sm placeholder-[#736F69] focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-full bg-[#C84B1F] text-white text-xs sm:text-sm font-bold hover:bg-[#B34018] transition-all whitespace-nowrap flex items-center gap-2 shrink-0 shadow-md"
                >
                  <Phone className="w-4 h-4" />
                  <span>Ouvir a Vocalis agora</span>
                </button>
              </div>
            </form>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <button
                onClick={onOpenAuth}
                className="px-8 py-3.5 rounded-full bg-white text-[#1A1816] text-sm font-bold hover:bg-[#FAF9F5] transition-all shadow-lg hover:scale-105"
              >
                Criar assistente grátis
              </button>
              <button
                onClick={onOpenDemo}
                className="px-8 py-3.5 rounded-full bg-transparent text-stone-300 hover:text-white border border-stone-700 text-sm font-medium hover:border-stone-500 transition-all"
              >
                Falar com especialista humano
              </button>
            </div>

            {/* Quote attribution */}
            <div className="pt-6 border-t border-stone-800 text-xs text-stone-400 max-w-md mx-auto">
              <p className="italic">
                "Substituímos nossa fila de espera de 18 minutos por atendimento instantâneo com a Vocalis. Fechamos 3x mais orçamentos no primeiro mês."
              </p>
              <p className="mt-1 font-semibold text-stone-300">
                — Rodrigo Camargo, Diretor de Operações
              </p>
            </div>

          </div>

        </div>

      </div>

      <TestCallModal
        isOpen={testModalOpen}
        phoneNumber={phoneNumber}
        countryCode="+55"
        onClose={() => setTestModalOpen(false)}
        onOpenAuth={onOpenAuth}
      />
    </section>
  );
}
