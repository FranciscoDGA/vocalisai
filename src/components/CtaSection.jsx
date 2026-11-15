import React, { useState } from 'react';
import { Phone, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { BRAND } from '../data/content';
import TestCallModal from './TestCallModal';
import AudioFrequencyWave from './AudioFrequencyWave';
import BrazilFlag from './BrazilFlag';
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
    <section className="py-16 sm:py-24 bg-[#FAF9F5] border-t border-[#EBE8E2] overflow-hidden w-full max-w-full">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-full min-w-0">
        
        {/* Big Onyx Black Hero Card */}
        <div className="bg-[#141312] text-white rounded-[32px] p-6 sm:p-14 lg:p-16 relative overflow-hidden shadow-2xl border border-[#2D2A26] text-center w-full max-w-full">
          
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-[#4F46E5]/20 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <span className="inline-block text-xs font-bold tracking-widest text-[#A5B4FC] uppercase">
              COMECE EM MENOS DE 5 MINUTOS
            </span>

            <h2 className="text-3xl sm:text-6xl font-normal tracking-tight text-white leading-[1.1] break-words">
              Seu próximo cliente vai ligar.<br />
              <span className="font-serif-title italic text-[#A5B4FC]">A Vocalis vai atender no 1º toque.</span>
            </h2>

            <p className="text-sm sm:text-lg text-[#B5B0A8] max-w-2xl mx-auto leading-relaxed">
              Pare de perder clientes por demora no WhatsApp ou telefone ocupado. Coloque a inteligência da Vocalis para atender sua empresa 24 horas por dia com voz humana ultra-realista.
            </p>

            {/* Quick Test Call Form */}
            <form onSubmit={handleTestCall} className="max-w-md mx-auto pt-4 w-full px-1 sm:px-0">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center bg-[#1F1E1B] border border-[#383531] rounded-2xl sm:rounded-full p-1.5 sm:pl-4 focus-within:border-[#4F46E5] transition-all gap-2 sm:gap-0 w-full">
                <div className="flex items-center flex-1 px-2 sm:px-0 min-w-0">
                  <BrazilFlag className="w-5 h-3.5 mr-2 shrink-0" />
                  <input
                    type="tel"
                    placeholder="Seu celular com DDD"
                    value={phoneNumber}
                    onChange={handlePhoneChange}
                    className="w-full min-w-0 bg-transparent text-white text-sm placeholder-[#736F69] focus:outline-none py-1.5 sm:py-0"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-3 rounded-xl sm:rounded-full bg-[#4F46E5] text-white text-xs sm:text-sm font-bold hover:bg-[#4338CA] transition-all whitespace-nowrap flex items-center justify-center gap-2 shrink-0 shadow-md cursor-pointer"
                >
                  <Phone className="w-4 h-4 text-[#A5B4FC]" />
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

            {/* Audio Frequency Spectrum Wave in Active Motion (Bottom Border) */}
            <div className="pt-8 -mx-8 sm:-mx-14 lg:-mx-16 -mb-8 sm:-mb-14 lg:-mb-16">
              <AudioFrequencyWave 
                variant="full" 
                showLatencyBadge={true}
                latencyText="Latência 380ms • Frequência Vocal em Tempo Real"
              />
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
