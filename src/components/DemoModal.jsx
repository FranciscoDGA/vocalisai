import React, { useState, useEffect } from 'react';
import { X, Phone, CheckCircle2, Sparkles, Building, Mail, User, PhoneCall, Volume2, AlertCircle, Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { BRAND, SPECIALIST_CONTACT } from '../data/content';
import { formatPhoneMask } from '../utils/phoneUtils';
import { speakFemalePt } from '../utils/voiceUtils';
import { saveLead } from '../utils/supabaseClient';

export default function DemoModal({ isOpen, onClose, selectedPlan = null }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    company: '',
    niche: 'Clínica / Consultório Médico ou Odonto',
    testType: 'browser' // 'browser' | 'phone'
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [isCallingBrowser, setIsCallingBrowser] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose?.();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    setSubmitting(true);

    const planSummary = selectedPlan
      ? ` · Plano: ${selectedPlan.channelName || selectedPlan.channelId} ${selectedPlan.planName} (${selectedPlan.billingCycle})`
      : '';

    try {
      const res = await saveLead({
        phone: formData.phone,
        niche: formData.niche,
        notes: `Lead DemoModal: ${formData.name} · Empresa: ${formData.company || 'N/A'} · Email: ${formData.email || 'N/A'}${planSummary}`,
      });

      if (!res?.success) {
        setSubmitError(
          'Não foi possível registrar sua solicitação no servidor neste momento. Você pode tentar novamente ou falar diretamente com nossa equipe.'
        );
        return;
      }

      setSubmitted(true);

      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch {
        // ignore animation error in headless/reduced environments
      }

      if (formData.testType === 'browser') {
        setIsCallingBrowser(true);
        const text = `Olá ${formData.name || 'visitante'}! Aqui é a assistente inteligente da Vocalis. Esta é uma simulação ilustrativa no navegador para o segmento de ${formData.niche}.`;
        speakFemalePt(
          text,
          () => setIsCallingBrowser(true),
          () => setIsCallingBrowser(false),
          () => setIsCallingBrowser(false)
        );
      }
    } catch {
      setSubmitError(
        'Erro ao enviar sua solicitação. Tente novamente ou utilize nossos canais diretos abaixo.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setSubmitting(false);
    setSubmitError('');
    setIsCallingBrowser(false);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Solicitar Demonstração Vocalis AI"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
    >
      <div className="relative w-full max-w-lg rounded-3xl bg-[#12141f] border border-white/10 p-6 sm:p-8 shadow-2xl overflow-hidden font-sans">
        
        {/* Glow behind modal */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#4F46E5]/20 blur-[90px] pointer-events-none rounded-full"></div>

        {/* Close Button */}
        <button
          type="button"
          onClick={handleReset}
          aria-label="Fechar janela de demonstração"
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            {/* Modal Header */}
            <div className="space-y-2 mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#4F46E5]/15 border border-[#4F46E5]/30 text-xs font-semibold text-[#A5B4FC]">
                <Sparkles className="w-3.5 h-3.5 text-[#4F46E5]" />
                <span>Demonstração Interativa · Simulação Ilustrativa</span>
              </div>
              <h3 className="text-2xl font-bold text-white tracking-tight">
                Teste a Vocalis na Sua Empresa
              </h3>
              <p className="text-xs sm:text-sm text-slate-400">
                Preencha seus dados para ouvir uma simulação ilustrativa no navegador ou solicitar contato da nossa equipe.
              </p>
              {selectedPlan && (
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-[11px] text-[#A5B4FC]">
                  Interesse selecionado: <strong>{selectedPlan.channelName || selectedPlan.channelId} — {selectedPlan.planName}</strong> ({selectedPlan.billingCycle === 'yearly' || selectedPlan.billingCycle === 'anual' ? 'Anual' : 'Mensal'})
                </div>
              )}
              {submitError && (
                <div role="alert" className="p-3 rounded-xl bg-rose-950/80 border border-rose-500/40 text-rose-200 text-xs flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <span>{submitError}</span>
                </div>
              )}
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
                    className="w-full bg-[#181b2a] text-sm text-white pl-10 pr-4 py-2.5 rounded-xl border border-white/10 focus:outline-none focus:border-[#4F46E5]"
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
                      className="w-full bg-[#181b2a] text-sm text-white pl-10 pr-4 py-2.5 rounded-xl border border-white/10 focus:outline-none focus:border-[#4F46E5]"
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
                      className="w-full bg-[#181b2a] text-sm text-white pl-10 pr-4 py-2.5 rounded-xl border border-white/10 focus:outline-none focus:border-[#4F46E5]"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Setor / Nicho de Atuação:</label>
                <select
                  value={formData.niche}
                  onChange={(e) => setFormData({ ...formData, niche: e.target.value })}
                  className="w-full bg-[#181b2a] text-sm text-white px-4 py-2.5 rounded-xl border border-white/10 focus:outline-none focus:border-[#4F46E5] cursor-pointer"
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
                        ? 'bg-[#4F46E5]/20 border-[#4F46E5] text-[#A5B4FC]'
                        : 'bg-[#181b2a] border-white/10 text-slate-400 hover:text-white'
                    }`}
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>Simulação no Navegador</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, testType: 'phone' })}
                    className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      formData.testType === 'phone'
                        ? 'bg-[#4F46E5]/20 border-[#4F46E5] text-[#A5B4FC]'
                        : 'bg-[#181b2a] border-white/10 text-slate-400 hover:text-white'
                    }`}
                  >
                    <PhoneCall className="w-4 h-4" />
                    <span>Contato pela Equipe</span>
                  </button>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#4F46E5] to-[#6366F1] text-white font-bold text-sm shadow-xl shadow-[#4F46E5]/25 hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                  <span>{submitting ? 'Enviando solicitação...' : 'Enviar e Iniciar Simulação'}</span>
                </button>
              </div>

              <p className="text-[11px] text-center text-slate-400 leading-relaxed">
                Ao enviar, seus dados (incluindo nome, telefone/WhatsApp, e-mail e empresa) são registrados para que nossa equipe retorne sobre a demonstração solicitada, conforme a Política de Privacidade. Não enviamos spam.
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
                  ? 'Reproduzindo simulação ilustrativa no navegador para o segmento selecionado...'
                  : `Seus dados foram registrados. Nossa equipe poderá entrar em contato pelo número ${formData.phone} para agendar uma demonstração para ${formData.niche}.`}
              </p>
            </div>

            {isCallingBrowser && (
              <div className="p-4 rounded-2xl bg-[#4F46E5]/15 border border-[#4F46E5]/40 flex items-center justify-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[#4F46E5]"></span>
                <span className="text-xs font-semibold text-[#A5B4FC]">Reproduzindo simulação ilustrativa no navegador...</span>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <a
                href={SPECIALIST_CONTACT.getWhatsAppUrl(`Olá equipe Vocalis! Meu nome é ${formData.name || ''} da empresa ${formData.company || ''} (${formData.niche}). Gostaria de agendar a demonstração da Vocalis AI.`)}
                target="_blank"
                rel="noopener noreferrer"
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
