import React, { useState } from 'react';
import { X, Phone, CheckCircle2, Sparkles, Building, Mail, User, PhoneCall, Volume2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { BRAND, SPECIALIST_CONTACT } from '../data/content';
import { formatPhoneMask } from '../utils/phoneUtils';
import { speakFemalePt } from '../utils/voiceUtils';
import { saveLead } from '../utils/supabaseClient';

export default function DemoModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    company: '',
    niche: 'Clínica / Consultório Médico ou Odonto',
    testType: 'browser' // 'browser' | 'phone'
  });

  const [submitted, setSubmitted] = useState(false);
  const [isCallingBrowser, setIsCallingBrowser] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    // Salva o lead no Supabase
    saveLead({
      phone: formData.phone,
      niche: formData.niche,
      notes: `Lead DemoModal: ${formData.name} · Empresa: ${formData.company || 'N/A'} · Email: ${formData.email || 'N/A'}`
    });

    // Trigger confetti
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {
      console.log('Confetti error', err);
    }

    if (formData.testType === 'browser') {
      setIsCallingBrowser(true);
      const text = `Olá ${formData.name || 'amigo'}! Aqui é a assistente inteligente da Vocalis. Que satisfação demonstrar nosso atendimento para a sua empresa no segmento de ${formData.niche}. Como posso agendar seu teste completo?`;
      speakFemalePt(
        text,
        () => setIsCallingBrowser(true),
        () => setIsCallingBrowser(false),
        () => setIsCallingBrowser(false)
      );
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setIsCallingBrowser(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg rounded-3xl bg-[#12141f] border border-white/10 p-6 sm:p-8 shadow-2xl overflow-hidden font-sans">
        
        {/* Glow behind modal */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#C84B1F]/20 blur-[90px] pointer-events-none rounded-full"></div>

        {/* Close Button */}
        <button
          onClick={handleReset}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            {/* Modal Header */}
            <div className="space-y-2 mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C84B1F]/15 border border-[#C84B1F]/30 text-xs font-semibold text-[#FF9E7D]">
                <Sparkles className="w-3.5 h-3.5 text-[#C84B1F]" />
                <span>Demonstração Interativa Sem Custo</span>
              </div>
              <h3 className="text-2xl font-bold text-white tracking-tight">
                Teste a Vocalis na Sua Empresa
              </h3>
              <p className="text-xs sm:text-sm text-slate-400">
                Experimente a voz com inteligência artificial configurada para o seu setor em poucos segundos.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Seu Nome:</label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ex: Dra. Mariana Costa"
                    className="w-full bg-[#181b2a] text-sm text-white pl-10 pr-4 py-2.5 rounded-xl border border-white/10 focus:outline-none focus:border-[#C84B1F]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">WhatsApp / Telefone:</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: formatPhoneMask(e.target.value) })}
                      placeholder="(11) 99999-9999"
                      className="w-full bg-[#181b2a] text-sm text-white pl-10 pr-4 py-2.5 rounded-xl border border-white/10 focus:outline-none focus:border-[#C84B1F]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Nome da Empresa:</label>
                  <div className="relative">
                    <Building className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      required
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Ex: Clínica Sanitas"
                      className="w-full bg-[#181b2a] text-sm text-white pl-10 pr-4 py-2.5 rounded-xl border border-white/10 focus:outline-none focus:border-[#C84B1F]"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Setor / Nicho de Atuação:</label>
                <select
                  value={formData.niche}
                  onChange={(e) => setFormData({ ...formData, niche: e.target.value })}
                  className="w-full bg-[#181b2a] text-sm text-white px-4 py-2.5 rounded-xl border border-white/10 focus:outline-none focus:border-[#C84B1F] cursor-pointer"
                >
                  <option value="Clínica / Consultório Médico ou Odonto">Clínica / Consultório Médico ou Odonto</option>
                  <option value="Imobiliária / Corretores de Imóveis">Imobiliária / Corretores de Imóveis</option>
                  <option value="Escritório de Advocacia / Jurídico">Escritório de Advocacia / Jurídico</option>
                  <option value="Concessionária / Oficina Automotiva">Concessionária / Oficina Automotiva</option>
                  <option value="E-commerce / Loja Virtual">E-commerce / Loja Virtual</option>
                  <option value="Restaurante / Gastronomia">Restaurante / Gastronomia</option>
                  <option value="Escola / Cursos / Educação">Escola / Cursos / Educação</option>
                  <option value="Contabilidade / Finanças">Contabilidade / Finanças</option>
                  <option value="Outro Segmento">Outro Segmento</option>
                </select>
              </div>

              {/* Mode choice */}
              <div className="pt-2">
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">Como deseja ouvir agora?</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, testType: 'browser' })}
                    className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      formData.testType === 'browser'
                        ? 'bg-[#C84B1F]/20 border-[#C84B1F] text-[#FF9E7D]'
                        : 'bg-[#181b2a] border-white/10 text-slate-400 hover:text-white'
                    }`}
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>Neste Navegador</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, testType: 'phone' })}
                    className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      formData.testType === 'phone'
                        ? 'bg-[#C84B1F]/20 border-[#C84B1F] text-[#FF9E7D]'
                        : 'bg-[#181b2a] border-white/10 text-slate-400 hover:text-white'
                    }`}
                  >
                    <PhoneCall className="w-4 h-4" />
                    <span>No Meu WhatsApp</span>
                  </button>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#C84B1F] to-[#E06336] text-white font-bold text-sm shadow-xl shadow-[#C84B1F]/25 hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Iniciar Demonstração ao Vivo</span>
                </button>
              </div>

              <p className="text-[10px] text-center text-slate-500">
                Seus dados estão protegidos pela LGPD. Não enviamos spam.
              </p>
            </form>
          </div>
        ) : (
          /* SUCCESS STATE */
          <div className="text-center py-8 space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-white">Solicitação Concluída!</h3>
              <p className="text-sm text-slate-300 max-w-sm mx-auto">
                {formData.testType === 'browser'
                  ? 'Aguarde a IA da Vocalis falar a introdução personalizada com a sua empresa...'
                  : `A inteligência da Vocalis entrará em contato pelo telefone ${formData.phone} em instantes com a simulação para ${formData.niche}.`}
              </p>
            </div>

            {isCallingBrowser && (
              <div className="p-4 rounded-2xl bg-[#C84B1F]/15 border border-[#C84B1F]/40 flex items-center justify-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[#C84B1F] animate-ping"></span>
                <span className="text-xs font-semibold text-[#FF9E7D]">Reproduzindo voz neural da Vocalis...</span>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <a
                href={SPECIALIST_CONTACT.getWhatsAppUrl(`Olá Francisco! Meu nome é ${formData.name || ''} da empresa ${formData.company || ''} (${formData.niche}). Gostaria de agendar a demonstração da Vocalis AI.`)}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-600/30"
              >
                <span>Falar no WhatsApp do Especialista</span>
                <span>(94) 98442-3948</span>
              </a>

              <button
                onClick={handleReset}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-colors cursor-pointer"
              >
                Fechar
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
