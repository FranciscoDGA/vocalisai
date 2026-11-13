import React, { useState, useEffect, useRef } from 'react';
import { 
  Phone, ChevronDown, Check, ArrowRight, ExternalLink 
} from 'lucide-react';
import { BRAND } from '../data/content';
import TestCallModal from './TestCallModal';
import VoiceWaveformHeroCard from './VoiceWaveformHeroCard';
import { formatPhoneMask, cleanRawPhone } from '../utils/phoneUtils';

export default function Hero({ onOpenDemo, onOpenAuth }) {
  const [phoneInput, setPhoneInput] = useState('');
  const [selectedCountry, setSelectedCountry] = useState({ name: 'Brasil', code: '+55', flag: '🇧🇷' });
  const [countryPickerOpen, setCountryPickerOpen] = useState(false);
  const [testCallModalOpen, setTestCallModalOpen] = useState(false);

  const countryPickerRef = useRef(null);

  const countries = [
    { name: 'Brasil', code: '+55', flag: '🇧🇷' },
    { name: 'Portugal', code: '+351', flag: '🇵🇹' },
    { name: 'Estados Unidos', code: '+1', flag: '🇺🇸' },
    { name: 'Argentina', code: '+54', flag: '🇦🇷' },
    { name: 'México', code: '+52', flag: '🇲🇽' },
    { name: 'Espanha', code: '+34', flag: '🇪🇸' },
    { name: 'Alemanha', code: '+49', flag: '🇩🇪' },
    { name: 'Reino Unido', code: '+44', flag: '🇬🇧' }
  ];

  // Close country picker on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (countryPickerRef.current && !countryPickerRef.current.contains(event.target)) {
        setCountryPickerOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Formatter for phone numbers with intelligent Brazilian mask & 55-prefix stripping
  const handlePhoneChange = (e) => {
    const formatted = formatPhoneMask(e.target.value);
    setPhoneInput(formatted);
  };

  const handleTestCallSubmit = (e) => {
    e.preventDefault();
    const digits = cleanRawPhone(phoneInput);
    if (!digits || digits.length < 10) {
      setPhoneInput('(11) 98765-4321');
    } else {
      setPhoneInput(formatPhoneMask(digits));
    }
    setTestCallModalOpen(true);
  };



  return (
    <section className="relative pt-12 pb-24 md:pt-16 md:pb-32 overflow-hidden bg-[#FAF9F5] font-sans">
      
      {/* Subtle radial ambient warmth background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-[#FAF4EC]/80 via-[#FAF9F5]/40 to-transparent pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Top category badge (Exact replica of user's uploaded print) */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E7E4DC] text-[#1A1816] text-xs font-semibold uppercase tracking-wider mb-8 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-[#C84B1F] animate-pulse"></span>
          <span>IA DE VOZ FEITA NO BRASIL</span>
        </div>

        {/* Headline (Exact replica of user's uploaded print) */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-normal tracking-tight text-[#1A1816] max-w-4xl mx-auto leading-[1.08] mb-6">
          A voz da sua empresa,<br />
          <span className="font-serif-title italic font-normal text-[#1A1816]">a qualquer hora.</span>
        </h1>

        {/* Subtitle (Exact replica of user's uploaded print) */}
        <p className="text-base sm:text-lg text-[#5C5955] max-w-2xl mx-auto font-normal leading-relaxed mb-8">
          A Vocalis atende o telefone, o WhatsApp e o chat do seu site com a calma de quem conhece o seu negócio. Agenda, responde, resolve — e chama a sua equipe quando é preciso uma pessoa.
        </p>

        {/* ========================================================
            PHONE TEST INPUT CONTAINER (Exact replica of Kloel print)
           ======================================================== */}
        <form onSubmit={handleTestCallSubmit} className="max-w-xl mx-auto mb-3">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center bg-white rounded-2xl sm:rounded-full p-1.5 sm:pl-3 border border-[#DCD8D0] shadow-md focus-within:border-[#C84B1F] focus-within:ring-2 focus-within:ring-[#C84B1F]/15 transition-all relative gap-2 sm:gap-0">
            
            {/* Input Row on mobile / inline on desktop */}
            <div className="flex items-center flex-1 px-2 sm:px-0">
              {/* Country Flag Selector with Dropdown */}
              <div className="relative" ref={countryPickerRef}>
                <button
                  type="button"
                  onClick={() => setCountryPickerOpen(!countryPickerOpen)}
                  className="flex items-center gap-1 text-sm font-medium text-[#1A1816] pr-2.5 py-1 hover:opacity-80 transition-opacity shrink-0"
                >
                  <span className="text-base leading-none">{selectedCountry.flag}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-[#8C8881]" />
                </button>

                {/* Country Picker Dropdown (Exact match to user's uploaded print) */}
                {countryPickerOpen && (
                  <div className="absolute top-10 left-0 w-60 bg-white rounded-2xl border border-[#E7E4DC] shadow-2xl p-2 z-50 animate-fadeIn text-left space-y-0.5">
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
                        <span className="flex items-center gap-2.5">
                          <span className="text-base leading-none">{c.flag}</span>
                          <span>{c.name}</span>
                        </span>
                        <span className="text-[11px] text-[#8C8881] font-mono">{c.code}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="w-[1px] h-5 bg-[#EBE8E2] mx-1"></div>

              {/* Phone Number Input */}
              <input
                type="tel"
                value={phoneInput}
                onChange={handlePhoneChange}
                placeholder="Seu celular com DDD"
                className="flex-1 px-3 py-2.5 bg-transparent text-[#1A1816] placeholder-[#9E9B95] text-sm focus:outline-none"
              />
            </div>

            {/* CTA Button: Receber ligação da Débora agora */}
            <button
              type="submit"
              className="w-full sm:w-auto shrink-0 px-6 py-3 rounded-xl sm:rounded-full bg-[#11100F] text-white text-xs sm:text-sm font-semibold hover:bg-black transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer hover:scale-[1.01]"
            >
              <Phone className="w-4 h-4 text-[#FF8E6B]" />
              <span>Receber ligação da Débora</span>
            </button>

          </div>
        </form>

        <p className="text-[11px] text-[#8C8881] font-medium mb-4">
          ⚡ A Débora ligará para seu número para diagnosticar sua empresa e enviar uma demonstração no WhatsApp.
        </p>

        {/* Link: Prefiro conversar com uma pessoa */}
        <div className="mb-6">
          <a
            href="https://wa.me/5594984423948?text=Ol%C3%A1%20Francisco!%20Vim%20pelo%20site%20da%20Vocalis%20AI%20e%20prefiro%20conversar%20diretamente%20com%20um%20especialista."
            target="_blank"
            rel="noreferrer"
            className="text-xs text-[#5C5955] hover:text-[#1A1816] underline underline-offset-2 font-medium transition-colors inline-flex items-center gap-1 cursor-pointer"
          >
            <span>Prefiro conversar com uma pessoa no WhatsApp</span>
            <span className="text-[10px]">↗</span>
          </a>
        </div>

        {/* Social Proof Checklist (Exact replica of user's uploaded print) */}
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 text-xs font-semibold text-[#5C5955] mb-14">
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

        {/* ========================================================
            THE ICONIC DARK HERO AUDIO / TRANSCRIPT CARD
            Live Voice Frequency Waveform (Orange Vocalis / White Cliente)
            + Sub-400ms Latency Simulation & Real-time Action Badges
           ======================================================== */}
        <VoiceWaveformHeroCard 
          onTestCall={() => {
            setPhoneInput('(11) 98765-4321');
            setTestCallModalOpen(true);
          }}
          onOpenAuth={onOpenAuth}
        />

      </div>

      {/* Real-time Interactive Test Call Modal (AI Agency OS) */}
      <TestCallModal
        isOpen={testCallModalOpen}
        phoneNumber={phoneInput}
        countryCode={selectedCountry.code}
        onClose={() => setTestCallModalOpen(false)}
        onOpenAuth={onOpenAuth}
      />

    </section>
  );
}
