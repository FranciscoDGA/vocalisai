import React, { useState } from 'react';
import { Phone, PhoneCall, Sparkles, ArrowRight, Radio, ShieldCheck, Zap } from 'lucide-react';
import { SPECIALIST_CONTACT } from '../data/content';

export default function LivePhoneChallengeBanner({ onOpenDemo }) {
  const [copied, setCopied] = useState(false);
  const phoneNumber = SPECIALIST_CONTACT.phoneDisplay || '(94) 98442-3948';
  const phoneTel = `tel:+${SPECIALIST_CONTACT.phoneRaw || '5594984423948'}`;

  const handleCopy = () => {
    navigator.clipboard?.writeText(SPECIALIST_CONTACT.phoneRaw || '5594984423948');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
            <div className="max-w-2xl space-y-4">
              
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
                <span className="font-serif-title italic text-[#A5B4FC]">Ligue agora do seu celular.</span>
              </h2>

              <p className="text-sm sm:text-base text-stone-300 leading-relaxed">
                Pegue seu celular neste exato momento e disque para a nossa linha direta. <strong>Interrompa no meio da frase, faça perguntas difíceis e tente pegar a Vocalis no pulo.</strong> Veja se você ou seus clientes conseguem notar que é uma inteligência artificial.
              </p>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2 text-xs text-stone-400">
                <span className="flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-amber-400" />
                  <span>Latência 380ms sem pausas</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Chamada sem custo adicional</span>
                </span>
              </div>

            </div>

            {/* Right Phone Action Card */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-md text-center shrink-0 w-full lg:w-auto max-w-md space-y-5">
              
              <span className="text-xs font-bold uppercase tracking-wider text-stone-400 block">
                Disque agora mesmo para:
              </span>

              {/* Big Phone Number Display */}
              <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight bg-white/5 py-3 px-4 rounded-2xl border border-white/10 shadow-inner">
                {phoneNumber}
              </div>

              {/* Buttons Row */}
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={phoneTel}
                  className="flex-1 py-3.5 px-6 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm shadow-lg shadow-emerald-500/30 transition-all hover:scale-105 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <PhoneCall className="w-4 h-4 animate-bounce" />
                  <span>Ligar do Celular Agora</span>
                </a>

                <button
                  onClick={handleCopy}
                  className="py-3.5 px-5 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-colors cursor-pointer border border-white/10"
                >
                  {copied ? 'Copiado!' : 'Copiar'}
                </button>
              </div>

              <span className="text-[11px] text-stone-400 block">
                Disponível 24 horas por dia, 7 dias por semana.
              </span>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
