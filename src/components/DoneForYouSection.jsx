import React from 'react';
import { Wrench, CheckCircle2, Clock, Users, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { getOnboardingConditionLabel } from '../utils/commercialCatalogUtils';

const DFY_STEPS = [
  {
    step: '01',
    title: 'Briefing Inicial de Configuração',
    desc: 'Você compartilha informações do seu negócio, lista de serviços, dúvidas frequentes e horários de atendimento desejados.'
  },
  {
    step: '02',
    title: 'Configuração de Fluxos e Voz',
    desc: 'Nosso time apoia a estruturação dos roteiros, ajusta a voz em português brasileiro e define as regras de triagem e encaminhamento.'
  },
  {
    step: '03',
    title: 'Entrega e Validação Assistida',
    desc: 'Alinhamos os canais previstos no seu plano e realizamos testes com você antes de publicar o atendimento.'
  }
];

export default function DoneForYouSection({ onOpenAuth, onOpenDemo }) {
  return (
    <section className="py-16 sm:py-24 bg-[#FAF9F5] border-t border-[#EBE8E2] font-sans overflow-hidden w-full max-w-full">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-full min-w-0">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-[#4F46E5] text-xs font-semibold uppercase tracking-wider mb-4">
            <Wrench className="w-3.5 h-3.5" />
            <span>IMPLANTAÇÃO ASSISTIDA • ESCOPO SOB CONSULTA</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-normal text-[#1A1816] tracking-tight leading-tight">
            Você não precisa configurar tudo sozinho.{' '}
            <span className="font-serif-title italic text-[#4F46E5]">Nossa equipe apoia toda a implantação.</span>
          </h2>
          <p className="mt-4 text-base text-[#5C5955] max-w-2xl mx-auto">
            Apoiamos a configuração da voz, dos roteiros e dos canais habilitados no seu plano, com escopo e cronograma combinados na proposta.
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {DFY_STEPS.map((s, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-8 border border-[#E7E4DC] shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden"
            >
              <div className="space-y-4">
                <span className="text-4xl sm:text-5xl font-serif-title font-normal text-[#4F46E5] block">
                  {s.step}
                </span>
                <h3 className="text-lg font-bold text-[#1A1816] leading-snug">
                  {s.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#5C5955] leading-relaxed">
                  {s.desc}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[#EBE8E2] flex items-center gap-2 text-xs text-emerald-700 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Zero linha de código necessária</span>
              </div>
            </div>
          ))}
        </div>

        {/* Value Banner */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E4DC] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6 max-w-4xl mx-auto text-center sm:text-left">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-200 text-[#4F46E5] flex items-center justify-center shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-[#1A1816]">
                Quer estruturar seu atendimento automatizado com apoio técnico?
              </h4>
              <p className="text-xs text-[#5C5955]">
                {getOnboardingConditionLabel()}
              </p>
            </div>
          </div>

          <button
            onClick={onOpenAuth || onOpenDemo}
            className="px-6 py-3.5 rounded-full bg-[#11100F] hover:bg-black text-white text-xs sm:text-sm font-semibold shadow-md transition-all hover:scale-105 shrink-0 flex items-center gap-2 cursor-pointer"
          >
            <span>Solicitar Implantação Assistida</span>
            <ArrowRight className="w-4 h-4 text-white/80" />
          </button>
        </div>

      </div>
    </section>
  );
}
