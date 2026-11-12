import React, { useState } from 'react';
import { 
  Phone, Sparkles, Check, ArrowRight, Play, Pause, ChevronDown, ChevronUp,
  Volume2, Bot, Database, Calendar, Users, ShieldCheck, Clock, CheckCheck
} from 'lucide-react';
import { BRAND } from '../data/content';
import TestCallModal from './TestCallModal';
import { formatPhoneMask, cleanRawPhone } from '../utils/phoneUtils';
import { speakFemalePt } from '../utils/voiceUtils';

export default function AgendamentosPage({ onOpenDemo, onOpenAuth, onNavigateHome }) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedCountry, setSelectedCountry] = useState({ name: 'Brasil', code: '+55', flag: '🇧🇷' });
  const [countryPickerOpen, setCountryPickerOpen] = useState(false);
  const [testCallModalOpen, setTestCallModalOpen] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [faqOpenIndex, setFaqOpenIndex] = useState(0);

  const countries = [
    { name: 'Brasil', code: '+55', flag: '🇧🇷' },
    { name: 'Portugal', code: '+351', flag: '🇵🇹' },
    { name: 'Estados Unidos', code: '+1', flag: '🇺🇸' },
    { name: 'Argentina', code: '+54', flag: '🇦🇷' },
    { name: 'Espanha', code: '+34', flag: '🇪🇸' }
  ];

  const handlePhoneChange = (e) => {
    setPhoneNumber(formatPhoneMask(e.target.value));
  };

  const handleTestCallSubmit = (e) => {
    e.preventDefault();
    const digits = cleanRawPhone(phoneNumber);
    if (!digits || digits.length < 10) {
      setPhoneNumber('(11) 98765-4321');
    } else {
      setPhoneNumber(formatPhoneMask(digits));
    }
    setTestCallModalOpen(true);
  };

  const handleToggleVoiceSample = () => {
    if (isPlayingAudio) {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      setIsPlayingAudio(false);
    } else {
      setIsPlayingAudio(true);
      const text = "Olá! Aqui é a assistente de agendamentos da Vocalis. Consultei a agenda e temos disponibilidade para atendimento nesta quinta às catorze horas ou na sexta às dez horas da manhã. Qual desses horários você prefere reservar?";
      speakFemalePt(
        text,
        () => setIsPlayingAudio(true),
        () => setIsPlayingAudio(false),
        () => setIsPlayingAudio(false)
      );
    }
  };

  const setupCards = [
    {
      num: 1,
      title: 'Escolher voz e definir saudação inicial',
      text: 'Escolha uma voz natural para a IA e defina uma mensagem inicial amigável e profissional para acolher os clientes.',
      detail: 'Configure a primeira frase e o tom de voz com cadência brasileira realista.'
    },
    {
      num: 2,
      title: 'Sincronizar agenda',
      text: 'Conecte sua agenda (por exemplo, Google Agenda, Outlook ou Feegow) via integração direta com 1 clique.',
      detail: 'A IA verifica slots livres em tempo real e bloqueia horários sem nenhum risco de conflito de agenda.'
    },
    {
      num: 3,
      title: 'Testar agendamento',
      text: 'Ligue para a IA e agende um compromisso para garantir que tudo esteja funcionando perfeitamente.',
      detail: 'Simule o fluxo completo no seu próprio celular antes de divulgar para os clientes.'
    }
  ];

  const accordionItems = [
    {
      title: 'Pós-processamento automático',
      content: 'Assim que o cliente confirma o horário na ligação ou no WhatsApp, a Vocalis insere o evento no calendário, dispara mensagem de confirmação com localização e envia lembrete 24h antes para zerar no-shows.'
    },
    {
      title: 'Integração perfeita com agenda',
      content: 'Compatível nativamente com Google Calendar, Microsoft Outlook, Calendly, Cal.com e softwares clínicos como Feegow, Clinicorp e Conexa. Qualquer alteração feita manualmente pela sua recepcionista é respeitada instantaneamente pela IA.'
    },
    {
      title: 'Organização eficiente de compromissos',
      content: 'Se o cliente precisar cancelar ou reagendar de última hora, ele liga ou manda mensagem e a IA faz a alteração na hora, liberando a vaga imediatamente para novos pacientes ou clientes.'
    }
  ];

  return (
    <div className="bg-[#FAF9F5] text-[#1A1816] font-sans">
      
      {/* ========================================================
          1. HERO SECTION (Exact replica of user's uploaded print)
         ======================================================== */}
      <section className="relative pt-12 pb-20 md:pt-16 md:pb-28 overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-[#FAF4EC]/80 via-[#FAF9F5]/40 to-transparent pointer-events-none -z-10" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          {/* Main Title */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-normal tracking-tight text-[#1A1816] max-w-4xl mx-auto leading-[1.08] mb-4">
            Agendamentos e<br />perguntas frequentes
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-[#5C5955] max-w-2xl mx-auto font-normal leading-relaxed mb-10">
            Agende compromissos por telefone e responda perguntas frequentes
          </p>

          {/* Audio Wave Visualizer Circle */}
          <div className="flex justify-center mb-8">
            <button
              onClick={handleToggleVoiceSample}
              className="group relative w-24 h-24 rounded-full bg-[#11100F] border border-stone-800 shadow-2xl flex items-center justify-center hover:scale-105 transition-all cursor-pointer"
              title="Clique para ouvir a voz do agendador"
            >
              <div className={`absolute -inset-2 rounded-full border-2 border-[#C84B1F]/30 ${isPlayingAudio ? 'animate-ping' : ''}`} />
              
              <div className="flex items-center gap-1 h-9">
                {[14, 26, 38, 22, 34, 40, 28, 16, 24].map((h, i) => (
                  <span
                    key={i}
                    style={{ height: isPlayingAudio ? `${h}px` : `${h * 0.65}px` }}
                    className={`w-[3px] rounded-full transition-all duration-200 ${
                      isPlayingAudio ? 'bg-[#FF9E7D]' : 'bg-[#C84B1F]'
                    }`}
                  />
                ))}
              </div>
            </button>
          </div>

          {/* Phone Input Box matching print */}
          <form onSubmit={handleTestCallSubmit} className="max-w-xl mx-auto mb-3">
            <div className="flex items-center bg-white rounded-full p-1.5 pl-3 border border-[#DCD8D0] shadow-md focus-within:border-[#C84B1F] focus-within:ring-2 focus-within:ring-[#C84B1F]/15 transition-all relative">
              
              {/* Country Flag Selector */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setCountryPickerOpen(!countryPickerOpen)}
                  className="flex items-center gap-1 text-sm font-medium text-[#1A1816] pr-2.5 py-1 hover:opacity-80 transition-opacity shrink-0 cursor-pointer"
                >
                  <span className="text-base leading-none">{selectedCountry.flag}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-[#8C8881]" />
                </button>

                {countryPickerOpen && (
                  <div className="absolute top-10 left-0 w-56 bg-white rounded-2xl border border-[#E7E4DC] shadow-2xl p-2 z-50 text-left space-y-0.5">
                    {countries.map((c) => (
                      <button
                        key={c.code}
                        type="button"
                        onClick={() => {
                          setSelectedCountry(c);
                          setCountryPickerOpen(false);
                        }}
                        className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-[#1A1816] hover:bg-[#FAF9F5] transition-colors"
                      >
                        <span className="flex items-center gap-2">
                          <span>{c.flag}</span>
                          <span>{c.name}</span>
                        </span>
                        <span className="text-[11px] text-[#8C8881] font-mono">{c.code}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="w-[1px] h-5 bg-[#EBE8E2] mx-1"></div>

              {/* Input */}
              <input
                type="tel"
                value={phoneNumber}
                onChange={handlePhoneChange}
                placeholder="Seu celular com DDD"
                className="flex-1 px-3 py-2.5 bg-transparent text-[#1A1816] placeholder-[#9E9B95] text-sm focus:outline-none"
              />

              {/* Submit Button */}
              <button
                type="submit"
                className="shrink-0 px-6 py-3 rounded-full bg-[#11100F] text-white text-xs sm:text-sm font-semibold hover:bg-black transition-all flex items-center gap-2 shadow-sm cursor-pointer"
              >
                <Phone className="w-4 h-4 text-white" />
                <span>Ouvir a Vocalis agora</span>
              </button>

            </div>
          </form>

          {/* Secondary Link: Agendar demo */}
          <div className="mb-8">
            <button
              onClick={onOpenDemo}
              className="text-xs text-[#5C5955] hover:text-[#1A1816] underline underline-offset-2 font-medium transition-colors cursor-pointer"
            >
              Agendar demo
            </button>
          </div>

          {/* Checklist */}
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 text-xs font-semibold text-[#5C5955]">
            <div className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-[#C84B1F]" strokeWidth={2.5} />
              <span>Garantia de 30 dias</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-[#C84B1F]" strokeWidth={2.5} />
              <span>Português do Brasil</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-[#C84B1F]" strokeWidth={2.5} />
              <span>No ar em minutos</span>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================
          2. 4 METRIC STATS CARDS
         ======================================================== */}
      <section className="py-12 bg-white border-y border-[#EBE8E2]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Card 1: 24/7 */}
            <div className="bg-[#FAF9F5] rounded-3xl p-8 border border-[#E7E4DC] shadow-sm text-left">
              <span className="text-4xl sm:text-5xl font-serif-title font-normal text-[#1A1816] block mb-3">
                24/7
              </span>
              <p className="text-xs sm:text-sm text-[#5C5955] leading-relaxed">
                Atendimento, inclusive fora do expediente.
              </p>
            </div>

            {/* Card 2: 3 canais */}
            <div className="bg-[#FAF9F5] rounded-3xl p-8 border border-[#E7E4DC] shadow-sm text-left">
              <span className="text-4xl sm:text-5xl font-serif-title font-normal text-[#1A1816] block mb-3">
                3 canais
              </span>
              <p className="text-xs sm:text-sm text-[#5C5955] leading-relaxed">
                Telefone, WhatsApp e site.
              </p>
            </div>

            {/* Card 3: 100+ */}
            <div className="bg-[#FAF9F5] rounded-3xl p-8 border border-[#E7E4DC] shadow-sm text-left">
              <span className="text-4xl sm:text-5xl font-serif-title font-normal text-[#1A1816] block mb-3">
                100+
              </span>
              <p className="text-xs sm:text-sm text-[#5C5955] leading-relaxed">
                Integrações.
              </p>
            </div>

            {/* Card 4: 30 dias */}
            <div className="bg-[#FAF9F5] rounded-3xl p-8 border border-[#E7E4DC] shadow-sm text-left">
              <span className="text-4xl sm:text-5xl font-serif-title font-normal text-[#1A1816] block mb-3">
                30 dias
              </span>
              <p className="text-xs sm:text-sm text-[#5C5955] leading-relaxed">
                Para decidir, ou seu dinheiro de volta.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================
          3. CONFIGURAR AGENDAMENTOS (3 Cards Grid + CTA Button)
         ======================================================== */}
      <section className="py-24 bg-[#FAF9F5]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <div className="max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-normal text-[#1A1816] tracking-tight">
              Configurar agendamentos
            </h2>
          </div>

          {/* 3 Cards Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto text-left mb-12">
            {setupCards.map((item) => (
              <div 
                key={item.num}
                className="bg-white rounded-3xl p-7 border border-[#E7E4DC] shadow-clean flex flex-col justify-between"
              >
                <div>
                  <div className="w-8 h-8 rounded-full bg-[#FAF5EE] border border-[#EDE5D8] text-[#C84B1F] flex items-center justify-center font-bold text-xs mb-5">
                    {item.num}
                  </div>
                  <h3 className="text-base font-bold text-[#1A1816] mb-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5C5955] leading-relaxed mb-4">
                    {item.text}
                  </p>
                </div>
                <button 
                  onClick={onOpenDemo}
                  className="text-xs text-[#C84B1F] font-semibold hover:underline inline-flex items-center gap-1 text-left cursor-pointer"
                >
                  <span>Leia mais</span>
                  <span>→</span>
                </button>
              </div>
            ))}
          </div>

          {/* Pill CTA button */}
          <button
            onClick={onOpenAuth}
            className="px-8 py-3.5 rounded-full bg-[#11100F] text-white text-xs sm:text-sm font-semibold hover:bg-black transition-all shadow-md hover:shadow-lg inline-flex items-center gap-2 cursor-pointer"
          >
            <span>Conhecer a plataforma agora</span>
            <ArrowRight className="w-3.5 h-3.5 text-white/80" />
          </button>

        </div>
      </section>

      {/* ========================================================
          4. AGENDAMENTOS E RESPOSTAS A PERGUNTAS FREQUENTES (Accordion)
         ======================================================== */}
      <section className="py-24 bg-white border-y border-[#EBE8E2]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-normal text-[#1A1816] tracking-tight">
              Agendamentos e respostas<br />a perguntas frequentes
            </h2>
          </div>

          <div className="space-y-4">
            {accordionItems.map((item, i) => {
              const isOpen = faqOpenIndex === i;
              return (
                <div 
                  key={i}
                  className="border-b border-stone-200 pb-4 transition-all"
                >
                  <button
                    onClick={() => setFaqOpenIndex(isOpen ? -1 : i)}
                    className="w-full flex items-center justify-between text-left py-2 font-bold text-base text-[#1A1816] hover:text-[#C84B1F] transition-colors cursor-pointer"
                  >
                    <span>{item.title}</span>
                    <span className="text-stone-400 text-lg font-mono">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="pt-2 pb-2 text-sm text-[#5C5955] leading-relaxed font-sans">
                      {item.content}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ========================================================
          5. BANNER CTA FINAL ESCURO
         ======================================================== */}
      <section className="py-20 bg-[#FAF9F5]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#141312] text-white rounded-[32px] p-8 sm:p-14 relative overflow-hidden shadow-2xl border border-stone-800 text-center">
            
            <div className="relative z-10 max-w-2xl mx-auto space-y-5">
              <h2 className="text-4xl sm:text-5xl font-normal tracking-tight text-white leading-tight">
                Hoje alguém vai ligar.<br />
                <span className="font-serif-title italic text-[#FF9E7D]">Deixe a Vocalis atender.</span>
              </h2>

              <p className="text-sm text-stone-300 leading-relaxed max-w-xl mx-auto">
                Crie a sua assistente em poucos minutos e ouça como ela atende com calma, em português, a qualquer hora.
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

      {/* Interactive Live Test Call Modal */}
      <TestCallModal
        isOpen={testCallModalOpen}
        phoneNumber={phoneNumber}
        countryCode={selectedCountry.code}
        onClose={() => setTestCallModalOpen(false)}
        onOpenAuth={onOpenAuth}
      />

    </div>
  );
}
