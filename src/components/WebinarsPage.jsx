import React, { useState } from 'react';
import { 
  Video, Calendar, Clock, Bell, CheckCircle2, ArrowRight, Sparkles 
} from 'lucide-react';
import { BRAND } from '../data/content';

export default function WebinarsPage({ onOpenDemo, onOpenAuth, onNavigateHome }) {
  const [notifyEmail, setNotifyEmail] = useState('');
  const [notified, setNotified] = useState(false);

  const handleNotifySubmit = (e) => {
    e.preventDefault();
    if (notifyEmail) {
      setNotified(true);
    }
  };

  return (
    <div className="bg-[#FAF9F5] text-[#1A1816] font-sans min-h-screen flex flex-col justify-between">
      
      {/* ========================================================
          1. HERO SECTION (Exact replica of user's uploaded print)
         ======================================================== */}
      <section className="relative pt-16 pb-24 md:pt-20 md:pb-32 overflow-hidden">
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-[#FAF4EC]/80 via-[#FAF9F5]/40 to-transparent pointer-events-none -z-10" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          {/* Tag / Badge: Webinars */}
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white border border-[#E7E4DC] text-[#1A1816] text-xs font-semibold uppercase tracking-wider mb-6 shadow-sm">
            <span>Webinars</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-normal tracking-tight text-[#1A1816] max-w-3xl mx-auto leading-[1.08] mb-4">
            Sessões ao vivo
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-[#5C5955] max-w-xl mx-auto font-normal leading-relaxed mb-14">
            Aqui você encontra todos os webinars futuros e passados da {BRAND.name}.
          </p>

          {/* Status Box */}
          <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-[#E7E4DC] shadow-sm p-6 sm:p-8 text-center mb-10">
            <p className="text-xs sm:text-sm text-[#736F69]">
              Infelizmente, não haverá webinars nos próximos dias.
            </p>
          </div>

          {/* Subtle Lead Capture for Next Session */}
          <div className="max-w-md mx-auto">
            {!notified ? (
              <form onSubmit={handleNotifySubmit} className="space-y-2">
                <p className="text-xs text-[#8C8881] font-medium">
                  Deseja ser avisado assim que abrirmos a próxima turma ao vivo?
                </p>
                <div className="flex items-center bg-white rounded-full p-1 pl-4 border border-[#DCD8D0] shadow-sm focus-within:border-[#C84B1F] transition-all">
                  <input
                    type="email"
                    required
                    value={notifyEmail}
                    onChange={(e) => setNotifyEmail(e.target.value)}
                    placeholder="Seu melhor e-mail comercial"
                    className="w-full bg-transparent text-xs text-[#1A1816] placeholder-[#9E9B95] focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-full bg-[#11100F] text-white text-xs font-semibold hover:bg-black transition-all shrink-0 cursor-pointer"
                  >
                    Me avise
                  </button>
                </div>
              </form>
            ) : (
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 text-xs font-semibold flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Pronto! Enviaremos o convite da próxima sessão para {notifyEmail}.</span>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* ========================================================
          2. BANNER CTA FINAL ESCURO
         ======================================================== */}
      <section className="pb-20 bg-[#FAF9F5]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#141312] text-white rounded-[32px] p-8 sm:p-14 relative overflow-hidden shadow-2xl border border-stone-800 text-center">
            
            <div className="relative z-10 max-w-2xl mx-auto space-y-5">
              <h2 className="text-4xl sm:text-5xl font-normal tracking-tight text-white leading-tight">
                Hoje alguém vai ligar.<br />
                <span className="font-serif-title italic text-[#FF9E7D]">Deixe a Vocalis atender.</span>
              </h2>

              <p className="text-sm text-stone-300 leading-relaxed max-w-xl mx-auto">
                Crie a sua assistente em poucos minutos e ouça como ela atende os seus clientes: por telefone, no WhatsApp e no chat do site.
              </p>

              <div className="pt-3">
                <button
                  onClick={onOpenAuth}
                  className="px-8 py-3.5 rounded-full bg-white text-[#141312] text-sm font-bold hover:bg-stone-100 transition-all shadow-xl hover:scale-105 cursor-pointer"
                >
                  Criar minha Vocalis
                </button>
              </div>
            </div>

            {/* Audio Wave Silhouette */}
            <div className="mt-10 flex items-end justify-center gap-1.5 h-12 opacity-60 pointer-events-none">
              {[8, 14, 20, 32, 24, 40, 18, 30, 48, 36, 22, 44, 30, 16, 28, 42, 26, 12, 20, 8].map((h, i) => (
                <span key={i} style={{ height: `${h}px` }} className="w-1 bg-[#C84B1F] rounded-full" />
              ))}
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
