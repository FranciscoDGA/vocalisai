import React from 'react';
import { Check, X, Sparkles, ArrowRight } from 'lucide-react';

const COMPARISON_ROWS = [
  {
    feature: 'Custo Mensal Real',
    clt: 'R$ 3.800+ (com FGTS, 13º e férias)',
    ura: 'R$ 400 a R$ 900/mês',
    vocalis: 'A partir de R$ 297/mês',
    highlight: true
  },
  {
    feature: 'Horário de Disponibilidade',
    clt: '8h/dia (apenas dias úteis)',
    ura: '24h/dia (mas 68% desligam na cara)',
    vocalis: '24h por dia, 365 dias/ano ininterruptos',
    highlight: false
  },
  {
    feature: 'Capacidade de Chamadas Simultâneas',
    clt: 'Apenas 1 ligação (dá linha ocupada)',
    ura: 'Fila de espera com musiquinha chata',
    vocalis: '100+ chamadas simultâneas sem fila',
    highlight: true
  },
  {
    feature: 'Faltas, Atestados e Férias',
    clt: 'Sim (deixa a recepção desprotegida)',
    ura: 'Não',
    vocalis: 'Zero faltas, zero interrupções',
    highlight: false
  },
  {
    feature: 'Voz e Experiência do Cliente',
    clt: 'Varia com o cansaço do atendente',
    ura: 'Robô mecânico ("digite 1 ou 2")',
    vocalis: 'Humana, calorosa e fluente em PT-BR',
    highlight: true
  },
  {
    feature: 'WhatsApp Web Sem Taxas da Meta',
    clt: 'Não (digitação lenta no teclado)',
    ura: 'Não possui',
    vocalis: 'Sim (áudios e textos automáticos via Baileys)',
    highlight: true
  },
  {
    feature: 'Atualização Automática de Agenda e CRM',
    clt: 'Manual e sujeita a esquecimentos',
    ura: 'Não integrado',
    vocalis: 'Sincronização instantânea em tempo real',
    highlight: false
  }
];

export default function ComparisonMatrixSection({ onOpenAuth, onOpenDemo }) {
  return (
    <section className="py-16 sm:py-24 bg-white border-y border-[#EBE8E2] font-sans overflow-hidden w-full max-w-full">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-full min-w-0">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-[#4F46E5] text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>COMPARAÇÃO DIRETA</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-normal text-[#1A1816] tracking-tight leading-tight">
            Por que contratar mais um atendente{' '}
            <span className="font-serif-title italic text-[#4F46E5]">é o jeito mais caro</span> de atender?
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#5C5955] max-w-2xl mx-auto">
            Veja a comparação real entre contratar uma equipe tradicional, usar robôs antiquados de URA ou colocar a inteligência da Vocalis AI para trabalhar.
          </p>
        </div>

        {/* Mobile Swipe Hint */}
        <p className="sm:hidden text-[11px] text-[#8C8881] text-center mb-3 flex items-center justify-center gap-1.5 font-medium">
          <span>👉</span>
          <span>Deslize a tabela para o lado para ver todos os critérios</span>
        </p>

        {/* Table Container */}
        <div className="w-full max-w-full overflow-x-auto rounded-3xl border border-[#E7E4DC] shadow-sm bg-[#FAF9F5]">
          <table className="w-full text-left border-collapse min-w-[640px]">
            <thead>
              <tr className="border-b border-[#E7E4DC] bg-white">
                <th className="p-4 sm:p-6 text-xs sm:text-sm font-bold text-[#1A1816] w-1/4">Critério</th>
                <th className="p-4 sm:p-6 text-xs sm:text-sm font-semibold text-[#736F69] w-1/4">Atendente CLT</th>
                <th className="p-4 sm:p-6 text-xs sm:text-sm font-semibold text-[#736F69] w-1/4">URA Antiga ("Digite 1")</th>
                <th className="p-4 sm:p-6 text-xs sm:text-sm font-bold text-[#4F46E5] bg-indigo-50/70 border-x border-indigo-200 w-1/4 rounded-t-2xl">
                  <div className="flex items-center gap-1.5">
                    <span>Vocalis AI</span>
                    <span className="px-1.5 sm:px-2 py-0.5 rounded text-[9px] sm:text-[10px] font-bold bg-[#4F46E5] text-white uppercase">Vencedor</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E7E4DC] text-xs sm:text-sm">
              {COMPARISON_ROWS.map((row, idx) => (
                <tr key={idx} className="hover:bg-white/80 transition-colors">
                  <td className="p-3.5 sm:p-5 font-bold text-[#1A1816]">
                    {row.feature}
                  </td>
                  <td className="p-3.5 sm:p-5 text-[#736F69]">
                    <span className="inline-block mr-1.5 text-rose-500 font-bold">✕</span>
                    <span>{row.clt}</span>
                  </td>
                  <td className="p-3.5 sm:p-5 text-[#736F69]">
                    <span className="inline-block mr-1.5 text-rose-500 font-bold">✕</span>
                    <span>{row.ura}</span>
                  </td>
                  <td className="p-3.5 sm:p-5 font-semibold text-[#1A1816] bg-indigo-50/50 border-x border-indigo-200">
                    <span className="inline-block mr-1.5 text-emerald-600 font-bold">✓</span>
                    <span>{row.vocalis}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* CTA Button below table */}
        <div className="text-center mt-10">
          <button
            onClick={onOpenAuth || onOpenDemo}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#11100F] hover:bg-black text-white text-xs sm:text-sm font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105 cursor-pointer"
          >
            <span>Modernizar o Atendimento da Minha Empresa Agora</span>
            <ArrowRight className="w-4 h-4 text-white/80" />
          </button>
        </div>

      </div>
    </section>
  );
}
