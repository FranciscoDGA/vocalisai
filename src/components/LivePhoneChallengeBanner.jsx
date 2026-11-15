import React, { useState } from 'react';
import { PhoneCall, ShieldCheck, Zap, Sparkles, ArrowRight } from 'lucide-react';
import { SPECIALIST_CONTACT } from '../data/content';
import { formatPhoneMask, cleanRawPhone } from '../utils/phoneUtils';
import BrazilFlag from './BrazilFlag';
import TestCallModal from './TestCallModal';

export default function LivePhoneChallengeBanner({ onOpenDemo, onOpenAuth }) {
  const [phoneInput, setPhoneInput] = useState('');
  const [testModalOpen, setTestModalOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const digits = cleanRawPhone(phoneInput);
    if (!digits || digits.length < 10) {
      setPhoneInput('(11) 98765-4321');
    } else {
      setPhoneInput(formatPhoneMask(digits));
    }
    setTestModalOpen(true);
  };

  return (
    <section className="py-12 bg-white border-b border-[#EBE8E2] font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Glow Frame Card */}
        <div className="relative rounded-[32px] bg-[#0E0D14] text-white p-7 sm:p-12 overflow-hidden border-2 border-indigo-500/40 shadow-2xl shadow-indigo-500/10">
          
          {/* Ambient Lighting */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#4F46E5]/30 via-[#7C3AED]/15 to-transparent rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
            
            {/* Left Content */}
            <div className="max-w-xl space-y-4">
              
              {/* Live Status Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-xs font-bold uppercase tracking-wider">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                </span>
                <span>DESAFIO DO TESTE AO VIVO • LINHA ABERTA AGORA</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal text-white tracking-tight leading-tight">
                Duvida que parece uma pessoa real?{' '}
                <span className="font-serif-title italic text-[#A5B4FC]">Receba uma ligação agora.</span>
              </h2>

              <p className="text-sm sm:text-base text-stone-300 leading-relaxed">
                Digite seu celular ao lado e <strong>atenda nossa inteligência artificial em segundos</strong>. Interrompa no meio da frase, faça perguntas difíceis e tente pegar a Roberta no pulo. Veja você mesmo se seus clientes conseguiriam notar a diferença.
              </p>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2 text-xs text-stone-400">
                <span className="flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-amber-400" />
                  <span>Latência 380ms sem pausas</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Chamada 100% gratuita</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-indigo-400" />
                  <span>Sem cadastro prévio</span>
                </span>
              </div>

            </div>

            {/* Right Action Card (Lead Capture Form - High Conversion) */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-md text-left shrink-0 w-full lg:w-[420px] space-y-4 shadow-2xl">
              
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Demonstração Imediata
                </span>
                <span className="text-[11px] text-stone-400 font-mono">Disponível 24/7</span>
              </div>

              <div className="space-y-1">
                <h3 className="text-base sm:text-lg font-semibold text-white">
                  Coloque seu número e atenda em segundos:
                </h3>
                <p className="text-xs text-stone-300 leading-relaxed">
                  A Roberta ligará agora para fazer uma demonstração personalizada e tirar todas as suas dúvidas.
                </p>
              </div>

              {/* Form Input + Button */}
              <form onSubmit={handleSubmit} className="space-y-3 pt-1">
                <div className="flex items-center bg-white/10 rounded-2xl p-1.5 border border-white/15 focus-within:border-emerald-400 focus-within:ring-2 focus-within:ring-emerald-400/20 transition-all">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white border-r border-white/10 shrink-0">
                    <BrazilFlag className="w-4 h-3" />
                    <span className="font-mono text-stone-200">+55</span>
                  </div>
                  <input
                    type="tel"
                    value={phoneInput}
                    onChange={(e) => setPhoneInput(formatPhoneMask(e.target.value))}
                    placeholder="(DDD) 99999-9999"
                    className="flex-1 px-3 py-2 bg-transparent text-white placeholder-stone-400 text-sm focus:outline-none font-medium"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm shadow-lg shadow-emerald-500/25 transition-all hover:scale-[1.02] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <PhoneCall className="w-4 h-4 animate-bounce" />
                  <span>Receber Ligação de Teste Agora</span>
                </button>
              </form>

              {/* Subtext: Specialist WhatsApp Link for Closers */}
              <div className="pt-3 border-t border-white/10 flex flex-col gap-1.5 text-left">
                <span className="text-[11px] text-stone-400">
                  ⚡ Já quer contratar ou prefere conversar com um humano?
                </span>
                <a
                  href={SPECIALIST_CONTACT.getWhatsAppUrl('Olá Francisco! Vim pelo site da Vocalis AI e gostaria de agendar uma reunião sobre atendimento com inteligência artificial para minha empresa.')}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-indigo-300 hover:text-white font-semibold inline-flex items-center gap-1.5 transition-colors group cursor-pointer"
                >
                  <span>Chamar Francisco no WhatsApp: {SPECIALIST_CONTACT.phoneDisplay}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Real-time Interactive Test Call Modal */}
      <TestCallModal
        isOpen={testModalOpen}
        phoneNumber={phoneInput || '(11) 98765-4321'}
        countryCode="+55"
        onClose={() => setTestModalOpen(false)}
        onOpenAuth={onOpenAuth}
      />
    </section>
  );
}
