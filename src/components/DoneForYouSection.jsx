import React from 'react';
import { Wrench, CheckCircle2, Clock, Users, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

const DFY_STEPS = [
  {
    step: '01',
    title: 'Briefing Expresso de 15 Minutos',
    desc: 'Você só nos envia o link do seu site, tabela de preços ou um documento simples com suas dúvidas frequentes e horários de atendimento.'
  },
  {
    step: '02',
    title: 'Treinamento Neural por Engenheiros',
    desc: 'Nosso time de especialistas cria os prompts personalizados, ajusta a cadência da voz em português brasileiro e configura as regras de triagem e agendamento.'
  },
  {
    step: '03',
    title: 'Chave na Mão em 24 Horas',
    desc: 'Conectamos a IA ao seu WhatsApp e à sua agenda. Você recebe um teste exclusivo no seu próprio celular para aprovar antes de ir ao ar.'
  }
];

export default function DoneForYouSection({ onOpenAuth, onOpenDemo }) {
  return (
    <section className="py-24 bg-[#FAF9F5] border-t border-[#EBE8E2] font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-[#4F46E5] text-xs font-semibold uppercase tracking-wider mb-4">
            <Wrench className="w-3.5 h-3.5" />
            <span>IMPLANTAÇÃO CHAVE NA MÃO • SEM TRABALHO PARA VOCÊ</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-normal text-[#1A1816] tracking-tight leading-tight">
            Você não precisa aprender a mexer em IA.{' '}
            <span className="font-serif-title italic text-[#4F46E5]">Nós entregamos tudo pronto</span> em 24h.
          </h2>
          <p className="mt-4 text-base text-[#5C5955] max-w-2xl mx-auto">
            Sem telas complexas, sem prompt engineering e sem perder tempo. Nossos engenheiros configuram a voz, treinam com as regras do seu negócio e entregam funcionando no seu WhatsApp e telefone.
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
                Quer sua empresa atendendo 24/7 a partir de amanhã?
              </h4>
              <p className="text-xs text-[#5C5955]">
                Onboarding assistido por engenheiro dedicado no Brasil incluído em todos os planos anuais.
              </p>
            </div>
          </div>

          <button
            onClick={onOpenAuth || onOpenDemo}
            className="px-6 py-3.5 rounded-full bg-[#11100F] hover:bg-black text-white text-xs sm:text-sm font-semibold shadow-md transition-all hover:scale-105 shrink-0 flex items-center gap-2 cursor-pointer"
          >
            <span>Quero Minha IA Pronta em 24h</span>
            <ArrowRight className="w-4 h-4 text-white/80" />
          </button>
        </div>

      </div>
    </section>
  );
}
