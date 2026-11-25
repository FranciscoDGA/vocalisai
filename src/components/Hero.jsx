import React, { useState } from 'react';
import { 
  Play, MessageCircle, Mail, Check, ExternalLink 
} from 'lucide-react';
import { SPECIALIST_CONTACT } from '../data/content';
import TestCallModal from './TestCallModal';
import VoiceWaveformHeroCard from './VoiceWaveformHeroCard';

const HUMAN_WHATSAPP_MESSAGE =
  'Olá! Vim pelo site da Vocalis AI e gostaria de conversar com uma pessoa sobre o atendimento com IA.';

export default function Hero({ onOpenDemo, onOpenAuth, onNavigate }) {
  const [testCallModalOpen, setTestCallModalOpen] = useState(false);
  const [contactChoiceOpen, setContactChoiceOpen] = useState(false);

  const handleListenDemo = () => {
    const demoEl = document.getElementById('audio-showcase') || document.getElementById('demo-ilustrativa');
    if (demoEl) {
      demoEl.scrollIntoView({ behavior: 'smooth' });
    } else if (onOpenDemo) {
      onOpenDemo();
    }
  };

  const handleOpenContactPage = () => {
    setContactChoiceOpen(false);
    if (onNavigate) {
      onNavigate('contato');
    }
  };

  const whatsappHref = SPECIALIST_CONTACT.getWhatsAppUrl(HUMAN_WHATSAPP_MESSAGE);

  return (
    <section className="relative pt-12 pb-24 md:pt-16 md:pb-32 overflow-hidden bg-[#FAF9F5] font-sans">
      
      {/* Subtle radial ambient warmth background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-[#F5F3FF]/80 via-[#FAF9F5]/40 to-transparent pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Top category badge */}
        <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-white border border-[#E7E4DC] text-[#1A1816] text-[10px] sm:text-xs font-semibold uppercase tracking-wider mb-6 sm:mb-8 shadow-sm max-w-full">
          <span className="w-2 h-2 rounded-full bg-[#4F46E5] shrink-0"></span>
          <span className="truncate sm:whitespace-normal">ATENDIMENTO COM IA EM PORTUGUÊS · CONFORME PLANO CONTRATADO</span>
        </div>

        {/* Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-normal tracking-tight text-[#1A1816] max-w-4xl mx-auto leading-[1.14] sm:leading-[1.08] mb-6 break-words">
          Atenda seus clientes com IA,{' '}
          <span className="font-serif-title italic font-normal text-[#4F46E5]">
            inclusive fora do horário.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-base md:text-lg text-[#4A4743] max-w-2xl mx-auto font-normal leading-relaxed mb-8 px-2 sm:px-0">
          Uma assistente para responder dúvidas, registrar contatos e encaminhar solicitações à sua equipe nos canais que estiverem realmente disponíveis no seu plano.
        </p>

        {/* Primary & Secondary CTAs (No phone input field) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 max-w-xl mx-auto mb-4 px-2 sm:px-0">
          <button
            type="button"
            onClick={handleListenDemo}
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#11100F] text-white text-sm font-semibold hover:bg-black transition-all flex items-center justify-center gap-2.5 shadow-md cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5] focus-visible:ring-offset-2"
          >
            <Play className="w-4 h-4 text-[#818CF8] fill-current" />
            <span>Ouvir demonstração</span>
          </button>

          <button
            type="button"
            onClick={() => setContactChoiceOpen((prev) => !prev)}
            aria-expanded={contactChoiceOpen}
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-white text-[#1A1816] border border-[#D4CFC7] text-sm font-semibold hover:border-[#4F46E5] hover:text-[#4F46E5] transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5] focus-visible:ring-offset-2"
          >
            <MessageCircle className="w-4 h-4 text-[#4F46E5]" />
            <span>Falar com uma pessoa</span>
          </button>
        </div>

        {/* Inline Choice Panel: WhatsApp Comercial OR Página de Contato */}
        {contactChoiceOpen && (
          <div
            role="region"
            aria-label="Opções para falar com uma pessoa"
            className="max-w-lg mx-auto mb-5 p-4 rounded-2xl bg-white border border-[#E7E4DC] shadow-lg text-left"
          >
            <p className="text-xs font-semibold text-[#1A1816] mb-3 text-center">
              Escolha como prefere falar com nossa equipe:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#16A34A] text-white text-xs font-semibold hover:bg-[#15803D] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16A34A] focus-visible:ring-offset-2"
              >
                <MessageCircle className="w-4 h-4 shrink-0" />
                <span>WhatsApp comercial</span>
                <ExternalLink className="w-3.5 h-3.5 shrink-0" />
              </a>
              <button
                type="button"
                onClick={handleOpenContactPage}
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#FAF9F5] text-[#1A1816] border border-[#DCD8D0] text-xs font-semibold hover:border-[#4F46E5] hover:text-[#4F46E5] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5] focus-visible:ring-offset-2"
              >
                <Mail className="w-4 h-4 shrink-0 text-[#4F46E5]" />
                <span>Página de Contato</span>
              </button>
            </div>
          </div>
        )}

        <p className="text-xs text-[#5C5955] font-medium mb-6 max-w-xl mx-auto">
          A demonstração abaixo é <strong>ilustrativa</strong> no navegador e não realiza ligação real em produção.
        </p>

        {/* Checklist prudente */}
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 text-xs font-semibold text-[#4A4743] mb-14">
          <div className="flex items-center gap-1.5">
            <Check className="w-4 h-4 text-[#4F46E5]" strokeWidth={2.5} />
            <span>Condições comerciais sob consulta</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Check className="w-4 h-4 text-[#4F46E5]" strokeWidth={2.5} />
            <span>Português do Brasil</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Check className="w-4 h-4 text-[#4F46E5]" strokeWidth={2.5} />
            <span>Configuração guiada</span>
          </div>
        </div>

        {/* ========================================================
            THE ICONIC DARK HERO AUDIO / TRANSCRIPT CARD
            Illustrative Waveform & Interactive Simulation Card
           ======================================================== */}
        <div id="demo-ilustrativa">
          <VoiceWaveformHeroCard 
            onTestCall={() => setTestCallModalOpen(true)}
            onOpenAuth={onOpenAuth}
          />
        </div>

      </div>

      {/* Interactive Illustrative Simulation Modal */}
      <TestCallModal
        isOpen={testCallModalOpen}
        phoneNumber="(11) 90000-0000 (exemplo fictício)"
        countryCode="+55"
        onClose={() => setTestCallModalOpen(false)}
        onOpenAuth={onOpenAuth}
      />

    </section>
  );
}
