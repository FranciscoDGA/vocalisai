import React, { useState, useEffect } from 'react';
import { X, Phone, Sparkles, ArrowRight, MessageCircle } from 'lucide-react';
import BrazilFlag from './BrazilFlag';
import { formatPhoneMask, cleanRawPhone } from '../utils/phoneUtils';
import { SPECIALIST_CONTACT } from '../data/content';

export default function ExitIntentModal({ onTriggerCall }) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Check if already dismissed in this session
    const dismissed = sessionStorage.getItem('vocalis_exit_dismissed');
    if (dismissed) return;

    const handleMouseLeave = (e) => {
      if (e.clientY <= 10 && !hasTriggered) {
        setIsOpen(true);
        setHasTriggered(true);
        sessionStorage.setItem('vocalis_exit_dismissed', 'true');
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [hasTriggered]);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const digits = cleanRawPhone(phone);
    if (digits.length >= 10) {
      setSubmitted(true);
      if (onTriggerCall) {
        onTriggerCall(digits);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn font-sans">
      <div className="bg-[#141312] text-white rounded-3xl p-6 sm:p-10 border border-stone-800 shadow-2xl max-w-lg w-full relative overflow-hidden text-center">
        
        {/* Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-[#4F46E5]/30 rounded-full blur-2xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="relative z-10 space-y-4">
          <span className="inline-block px-3 py-1 rounded-full bg-[#4F46E5]/20 border border-[#4F46E5]/40 text-[#818CF8] text-[11px] font-bold uppercase tracking-wider">
            ESPERE! ANTES DE SAIR
          </span>

          <h3 className="text-2xl sm:text-3xl font-normal text-white tracking-tight">
            Veja a Vocalis ligando para o seu celular{' '}
            <span className="font-serif-title italic text-[#A5B4FC]">em 30 segundos.</span>
          </h3>

          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed max-w-md mx-auto">
            Sem vendedores e sem compromisso. Digite seu número abaixo e teste ao vivo como a inteligência artificial conversa com naturalidade humana brasileira.
          </p>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="pt-3 space-y-3">
              <div className="flex items-center bg-[#1F1E1B] border border-stone-700 focus-within:border-[#4F46E5] rounded-full p-1.5 pl-4 transition-all">
                <BrazilFlag className="w-5 h-3.5 mr-2 shrink-0" />
                <input
                  type="tel"
                  placeholder="Seu celular com DDD"
                  value={phone}
                  onChange={(e) => setPhone(formatPhoneMask(e.target.value))}
                  className="w-full bg-transparent text-white text-sm placeholder-stone-500 focus:outline-none"
                  autoFocus
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-full bg-[#4F46E5] hover:bg-[#4338CA] text-white text-xs font-bold transition-all shrink-0 cursor-pointer"
                >
                  Receber Ligação
                </button>
              </div>

              <div className="pt-2">
                <a
                  href={SPECIALIST_CONTACT.getWhatsAppUrl('Olá Francisco! Estava no site da Vocalis e gostaria de tirar uma dúvida rápida sobre atendimento com IA.')}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-stone-400 hover:text-emerald-400 transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Ou prefere falar comigo agora no WhatsApp?</span>
                </a>
              </div>
            </form>
          ) : (
            <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs sm:text-sm">
              <p className="font-bold mb-1">Ligação iniciada!</p>
              <p className="text-stone-300 text-xs">Fique atento ao seu celular nos próximos 30 segundos. A Vocalis está chamando você.</p>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
