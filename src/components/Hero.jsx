import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, Pause, Phone, ChevronDown, Check, Volume2, ArrowRight, ExternalLink 
} from 'lucide-react';
import { BRAND } from '../data/content';
import TestCallModal from './TestCallModal';
import { formatPhoneMask, cleanRawPhone } from '../utils/phoneUtils';
import { speakFemalePt } from '../utils/voiceUtils';

export default function Hero({ onOpenDemo, onOpenAuth }) {
  const [phoneInput, setPhoneInput] = useState('');
  const [selectedCountry, setSelectedCountry] = useState({ name: 'Brasil', code: '+55', flag: '🇧🇷' });
  const [countryPickerOpen, setCountryPickerOpen] = useState(false);
  const [testCallModalOpen, setTestCallModalOpen] = useState(false);

  // Audio player state
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(14); // seconds
  const progressTimerRef = useRef(null);
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

  // Web Speech API for dark card audio demonstration (Lia - Female Voice)
  const handleTogglePlay = () => {
    if (isPlaying) {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      setIsPlaying(false);
      clearInterval(progressTimerRef.current);
    } else {
      setIsPlaying(true);
      const text = "Boa noite! Consultório Vila Verde, aqui é a Lia da Vocalis. Tenho um horário na quinta-feira às 14h30 ou na sexta às 10h. Já deixei pré-agendado no sistema e enviei a confirmação para o seu WhatsApp.";
      
      speakFemalePt(
        text,
        () => setIsPlaying(true),
        () => {
          setIsPlaying(false);
          clearInterval(progressTimerRef.current);
          setProgress(54);
        },
        () => {
          setIsPlaying(false);
          clearInterval(progressTimerRef.current);
        }
      );

      progressTimerRef.current = setInterval(() => {
        setProgress(prev => {
          if (prev >= 54) {
            clearInterval(progressTimerRef.current);
            setIsPlaying(false);
            return 14;
          }
          return prev + 1;
        });
      }, 1000);
    }
  };

  useEffect(() => {
    return () => {
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    };
  }, []);

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

            {/* CTA Button: Receber ligação da Roberta agora */}
            <button
              type="submit"
              className="w-full sm:w-auto shrink-0 px-6 py-3 rounded-xl sm:rounded-full bg-[#11100F] text-white text-xs sm:text-sm font-semibold hover:bg-black transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer hover:scale-[1.01]"
            >
              <Phone className="w-4 h-4 text-[#FF8E6B]" />
              <span>Receber ligação da Roberta</span>
            </button>

          </div>
        </form>

        <p className="text-[11px] text-[#8C8881] font-medium mb-4">
          ⚡ A Roberta ligará para seu número para diagnosticar sua empresa e enviar uma demonstração no WhatsApp.
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
            THE ICONIC DARK HERO AUDIO / TRANSCRIPT CARD (Exact match)
           ======================================================== */}
        <div className="max-w-5xl mx-auto rounded-3xl bg-[#11100F] text-stone-100 p-6 sm:p-8 md:p-10 shadow-2xl border border-stone-800 text-left relative overflow-hidden">
          
          <div className="absolute top-0 right-1/4 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-10 w-60 h-60 bg-[#C84B1F]/10 rounded-full blur-3xl pointer-events-none" />

          {/* Top Status Bar inside Card */}
          <div className="flex flex-wrap items-center justify-between pb-6 border-b border-stone-800 gap-4 text-xs">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-stone-800 flex items-center justify-center text-stone-300">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <p className="font-bold text-stone-200">
                  Ligação recebida · 23:12
                </p>
                <p className="text-[11px] text-stone-400 font-mono">
                  Fora do horário comercial · +55 11 9••••-4821
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-800/80 border border-stone-700 text-[11px] text-stone-300 font-mono">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                <span>Ao vivo · 00:54</span>
              </span>
            </div>
          </div>

          {/* Card Body: Live Transcript */}
          <div className="py-6 space-y-4 text-xs sm:text-sm">
            <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-2">
              <span>TRANSCRIÇÃO AO VIVO</span>
              <span>Conversa ilustrativa</span>
            </div>

            <div className="space-y-3 font-sans">
              <div className="p-3.5 rounded-2xl bg-stone-900/80 border border-stone-800 max-w-xl">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#FF9E7D] block mb-1">
                  {BRAND.name.toUpperCase()} (LIA)
                </span>
                <p className="text-stone-200 leading-relaxed">
                  Boa noite! Consultório Vila Verde, aqui é a Lia. Como posso ajudar?
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-stone-800/60 border border-stone-700/60 max-w-xl ml-auto text-right">
                <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block mb-1">
                  CLIENTE
                </span>
                <p className="text-stone-200 leading-relaxed">
                  Oi, eu precisava de uma consulta com o Dr. Marcos pra essa semana ainda, é possível?
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-stone-900/80 border border-stone-800 max-w-xl">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#FF9E7D] block mb-1">
                  {BRAND.name.toUpperCase()} (LIA)
                </span>
                <p className="text-stone-200 leading-relaxed">
                  Com certeza! Tenho um horário na quinta-feira às 14h30 ou na sexta às 10h. Qual fica melhor para você?
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Audio Player Bar */}
          <div className="pt-4 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={handleTogglePlay}
                className="w-11 h-11 rounded-full bg-white text-[#11100F] hover:bg-stone-200 flex items-center justify-center transition-all shrink-0 shadow-lg"
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
              </button>

              <div className="flex-1 sm:w-64 space-y-1">
                <div className="w-full bg-stone-800 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-[#C84B1F] h-full transition-all duration-300"
                    style={{ width: `${(progress / 54) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-stone-400 font-mono">
                  <span>00:{String(progress).padStart(2, '0')}</span>
                  <span>00:54</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setPhoneInput('(11) 98765-4321');
                setTestCallModalOpen(true);
              }}
              className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-stone-800 hover:bg-stone-700 text-xs font-semibold text-white transition-all flex items-center justify-center gap-2 border border-stone-700"
            >
              <span>Testar com a inteligência da minha empresa</span>
              <ArrowRight className="w-3.5 h-3.5 text-stone-400" />
            </button>
          </div>

        </div>

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
