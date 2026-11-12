import React from 'react';
import { Check, X, Sparkles, AlertCircle } from 'lucide-react';

export default function ComparisonTable() {
  const comparisons = [
    {
      feature: 'Voz humana fluida com entonação brasileira',
      vocalis: true,
      chatbot: false,
      human: true,
      note: 'Vocalis fala naturalmente sem pausas mecânicas'
    },
    {
      feature: 'Atendimento simultâneo de centenas de ligações',
      vocalis: true,
      chatbot: false,
      human: false,
      note: 'Humano atende 1 por vez; linhas ficam ocupadas'
    },
    {
      feature: 'Disponibilidade 24 horas por dia, 365 dias/ano',
      vocalis: true,
      chatbot: true,
      human: false,
      note: 'Cobrir noite e fins de semana com CLT custa 3x mais'
    },
    {
      feature: 'Latência de resposta ultrarrápida (< 450ms)',
      vocalis: true,
      chatbot: false,
      human: true,
      note: 'Respostas quase instantâneas sem silêncio incômodo'
    },
    {
      feature: 'Entende sotaques, gírias e interrupções na fala',
      vocalis: true,
      chatbot: false,
      human: true,
      note: 'Chatbots travam se o cliente não digitar o número do menu'
    },
    {
      feature: 'Agendamento direto na agenda sem conflitos',
      vocalis: true,
      chatbot: false,
      human: true,
      note: 'Integrado em tempo real com Google Agenda, Feegow, etc.'
    },
    {
      feature: 'Custo por minuto até 80% mais econômico',
      vocalis: true,
      chatbot: true,
      human: false,
      note: 'Economia direta em folha de pagamento e encargos'
    },
    {
      feature: 'Transbordo humanizado quando solicitado',
      vocalis: true,
      chatbot: false,
      human: true,
      note: 'Transfere para o ramal do atendente com histórico resumido'
    }
  ];

  return (
    <section className="py-24 relative bg-[#0b0c12]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-xs font-semibold text-orange-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Por que Somos Diferentes</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Vocalis vs. Chatbots Antigos vs. Equipe Humana
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Esqueça os robôs de "digite 1 para vendas, 2 para suporte" que irritam seus clientes. Conheça a diferença da nova geração.
          </p>
        </div>

        {/* Comparison Table Card */}
        <div className="max-w-4xl mx-auto rounded-3xl bg-[#12141f] border border-white/10 overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="p-4 sm:p-6 text-sm font-bold text-slate-300 w-1/2">
                    Recurso / Capacidade
                  </th>
                  <th className="p-4 sm:p-6 text-center text-sm font-extrabold text-orange-400 bg-orange-500/10 border-x border-orange-500/20">
                    <div className="flex flex-col items-center gap-1">
                      <span>Vocalis AI</span>
                      <span className="text-[10px] uppercase font-bold text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded-full">
                        Recomendado
                      </span>
                    </div>
                  </th>
                  <th className="p-4 sm:p-6 text-center text-xs sm:text-sm font-semibold text-slate-400">
                    Chatbots Antigos (Menus)
                  </th>
                  <th className="p-4 sm:p-6 text-center text-xs sm:text-sm font-semibold text-slate-400">
                    Equipe Humana Pura
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-xs sm:text-sm">
                {comparisons.map((row, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-4 sm:p-5 text-slate-200">
                      <div className="font-semibold">{row.feature}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">{row.note}</div>
                    </td>

                    {/* Vocalis */}
                    <td className="p-4 sm:p-5 text-center bg-orange-500/5 border-x border-orange-500/20">
                      <div className="inline-flex w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 items-center justify-center">
                        <Check className="w-4 h-4 stroke-[3]" />
                      </div>
                    </td>

                    {/* Old Chatbot */}
                    <td className="p-4 sm:p-5 text-center">
                      {row.chatbot ? (
                        <div className="inline-flex w-7 h-7 rounded-full bg-slate-800 text-slate-300 items-center justify-center">
                          <Check className="w-4 h-4" />
                        </div>
                      ) : (
                        <div className="inline-flex w-7 h-7 rounded-full bg-rose-500/10 text-rose-400 items-center justify-center">
                          <X className="w-4 h-4" />
                        </div>
                      )}
                    </td>

                    {/* Human only */}
                    <td className="p-4 sm:p-5 text-center">
                      {row.human ? (
                        <div className="inline-flex w-7 h-7 rounded-full bg-slate-800 text-slate-300 items-center justify-center">
                          <Check className="w-4 h-4" />
                        </div>
                      ) : (
                        <div className="inline-flex w-7 h-7 rounded-full bg-rose-500/10 text-rose-400 items-center justify-center">
                          <X className="w-4 h-4" />
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
}
