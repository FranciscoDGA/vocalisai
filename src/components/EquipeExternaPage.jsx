import React, { useState } from 'react';
import { 
  Phone, Sparkles, Check, ArrowRight, Play, Pause, ChevronDown, ChevronUp,
  Volume2, Bot, Database, Calendar, Users, ShieldCheck, Clock, CheckCheck,
  Truck, Briefcase, Car, FileText, ArrowUpRight
} from 'lucide-react';
import { BRAND } from '../data/content';
import TestCallModal from './TestCallModal';
import AudioFrequencyWave from './AudioFrequencyWave';
import AudioCircleWave from './AudioCircleWave';
import BrazilFlag from './BrazilFlag';
import { formatPhoneMask, cleanRawPhone } from '../utils/phoneUtils';
import { speakFemalePt } from '../utils/voiceUtils';

export default function EquipeExternaPage({ onOpenDemo, onOpenAuth, onNavigateHome }) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedCountry, setSelectedCountry] = useState({ name: 'Brasil', code: '+55', flag: '🇧🇷' });
  const [countryPickerOpen, setCountryPickerOpen] = useState(false);
  const [testCallModalOpen, setTestCallModalOpen] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [expandedHowItWorks, setExpandedHowItWorks] = useState({});

  const toggleHowItWorks = (num) => {
    setExpandedHowItWorks(prev => ({ ...prev, [num]: !prev[num] }));
  };

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
      const text = "Olá, Carlos! Vi que você acabou de sair da reunião na Construtora Alpha. Me conte: qual foi o valor proposto, quem foi o tomador de decisão e qual é a próxima ação para fechamento? Já estou registrando tudo no seu CRM.";
      speakFemalePt(
        text,
        () => setIsPlayingAudio(true),
        () => setIsPlayingAudio(false),
        () => setIsPlayingAudio(false)
      );
    }
  };

  const howItWorksCards = [
    {
      num: 1,
      title: 'Ligue para seu assistente de IA',
      shortDesc: 'Simplesmente disque pelo viva-voz do carro ou fone bluetooth, através do número de telefone exclusivo...',
      fullDesc: 'Simplesmente disque pelo viva-voz do carro ou fone bluetooth, através do número de telefone exclusivo atribuído ao seu assistente de IA ao sair da reunião.'
    },
    {
      num: 2,
      title: 'Faça debriefings e deixe a IA entrevistá-lo',
      shortDesc: 'Diferente de um gravador passivo, você treina seu assistente para perguntar ativamente dados que faltam...',
      fullDesc: 'Diferente de um gravador passivo, você treina seu assistente para perguntar ativamente dados que faltam: decisores, objeções, budget e prazos acordados.'
    },
    {
      num: 3,
      title: 'Processamento inteligente',
      shortDesc: 'Linguagem falada vira dados estruturados. A IA filtra vícios de linguagem, ruído da estrada e extrai valores...',
      fullDesc: 'Linguagem falada vira dados estruturados. A IA filtra vícios de linguagem, ruído da estrada e extrai valores monetários, tarefas e próximas etapas.'
    },
    {
      num: 4,
      title: 'Sincronização com CRM e fechamento',
      shortDesc: 'Antes de você chegar ao próximo cliente, o debriefing da última reunião já está documentado no HubSpot...',
      fullDesc: 'Antes de você chegar ao próximo cliente, o debriefing da última reunião já está documentado no HubSpot, Salesforce ou Pipedrive sem digitação manual.'
    }
  ];

  return (
    <div className="bg-[#FAF9F5] text-[#1A1816] font-sans">
      
      {/* ========================================================
          1. HERO SECTION (Exact replica of user's uploaded print)
         ======================================================== */}
      <section className="relative pt-12 pb-20 md:pt-16 md:pb-28 overflow-hidden">
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-[#F5F3FF]/80 via-[#FAF9F5]/40 to-transparent pointer-events-none -z-10" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          {/* Main Title with subtle peach container */}
          <div className="mb-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-[#1A1816] max-w-4xl mx-auto leading-[1.12]">
              <span className="bg-[#F6E1D7] px-4 py-1.5 rounded-2xl inline-block shadow-sm">
                Assistente de IA
              </span>
              <br />
              para equipe externa
            </h1>
          </div>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-[#5C5955] max-w-2xl mx-auto font-normal leading-relaxed mb-10">
            Realize um breve debriefing por telefone e registre imediatamente no CRM.
          </p>

          {/* Audio Wave Visualizer Circle with Loop */}
          <div className="flex justify-center mb-8">
            <AudioCircleWave 
              isPlaying={isPlayingAudio}
              onToggle={handleToggleVoiceSample}
              size="md"
            />
          </div>

          {/* Phone Input Box matching print */}
          <form onSubmit={handleTestCallSubmit} className="max-w-xl mx-auto mb-3">
            <div className="flex items-center bg-white rounded-full p-1.5 pl-3 border border-[#DCD8D0] shadow-md focus-within:border-[#4F46E5] focus-within:ring-2 focus-within:ring-[#4F46E5]/15 transition-all relative">
              
              {/* Country Flag Selector (1:1 com o Kloel) */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setCountryPickerOpen(!countryPickerOpen)}
                  className="flex items-center gap-1.5 text-sm font-medium text-[#1A1816] pl-1.5 pr-2 py-1 hover:opacity-80 transition-opacity shrink-0 cursor-pointer"
                >
                  {selectedCountry.code === '+55' ? (
                    <BrazilFlag className="w-5 h-3.5" />
                  ) : (
                    <span className="text-base leading-none">{selectedCountry.flag}</span>
                  )}
                  <ChevronDown className="w-3 h-3 text-[#736F69]" />
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
                          {c.code === '+55' ? <BrazilFlag className="w-4 h-3" /> : <span>{c.flag}</span>}
                          <span>{c.name}</span>
                        </span>
                        <span className="text-[11px] text-[#8C8881] font-mono">{c.code}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

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
              <Check className="w-4 h-4 text-[#4F46E5]" strokeWidth={2.5} />
              <span>Garantia de 30 dias</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-[#4F46E5]" strokeWidth={2.5} />
              <span>Português do Brasil</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-[#4F46E5]" strokeWidth={2.5} />
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
          3. COMO FUNCIONA (4 Cards Grid)
         ======================================================== */}
      <section className="py-24 bg-[#FAF9F5]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-normal text-[#1A1816] tracking-tight">
              Como funciona
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {howItWorksCards.map((c) => {
              const isExpanded = !!expandedHowItWorks[c.num];
              return (
                <div 
                  key={c.num}
                  className="bg-white rounded-3xl p-7 sm:p-8 border border-[#E7E4DC] shadow-sm flex flex-col justify-between transition-all duration-300"
                >
                  <div>
                    <div className="w-8 h-8 rounded-full bg-[#EEF2FF] border border-[#E0E7FF] text-[#4F46E5] flex items-center justify-center font-bold text-xs mb-4">
                      {c.num}
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-[#1A1816] mb-3 leading-snug">
                      {c.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#5C5955] leading-relaxed mb-4">
                      {isExpanded ? c.fullDesc : c.shortDesc}
                    </p>
                  </div>
                  <div className="pt-2 mt-auto">
                    <button 
                      onClick={() => toggleHowItWorks(c.num)}
                      className="text-xs text-[#8C8881] hover:text-[#1A1816] font-medium inline-flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <span>{isExpanded ? 'Mostrar menos' : 'Leia mais'}</span>
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ========================================================
          4. BANNER CTA FINAL ESCURO
         ======================================================== */}
      <section className="py-20 bg-[#FAF9F5]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#141312] text-white rounded-[32px] p-8 sm:p-14 relative overflow-hidden shadow-2xl border border-stone-800 text-center">
            
            <div className="relative z-10 max-w-2xl mx-auto space-y-5">
              <h2 className="text-4xl sm:text-5xl font-normal tracking-tight text-white leading-tight">
                Hoje alguém vai ligar.<br />
                <span className="font-serif-title italic text-[#A5B4FC]">Deixe a Vocalis atender.</span>
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

            {/* Audio Wave Frequency Spectrum in Active Motion */}
            <div className="pt-8 -mx-8 sm:-mx-14 -mb-8 sm:-mb-14">
              <AudioFrequencyWave 
                variant="full" 
                showLatencyBadge={true}
                latencyText="Latência 380ms • Frequência Vocal em Tempo Real"
              />
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
