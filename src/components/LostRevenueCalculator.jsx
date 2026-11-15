import React, { useState } from 'react';
import { AlertTriangle, TrendingDown, ArrowRight, DollarSign, Clock, Check } from 'lucide-react';

export default function LostRevenueCalculator({ onOpenAuth, onOpenDemo }) {
  const [contactsPerDay, setContactsPerDay] = useState(25);
  const [ticketMedio, setTicketMedio] = useState(350);

  // Média de mercado: 35% dos contatos chegam fora do expediente (noite, almoço, fim de semana)
  // Taxa de conversão média perdida por falta de resposta rápida: 22%
  const afterHoursContactsMonthly = Math.round(contactsPerDay * 30 * 0.35);
  const lostDealsMonthly = Math.max(1, Math.round(afterHoursContactsMonthly * 0.22));
  const lostMoneyMonthly = lostDealsMonthly * ticketMedio;
  const lostMoneyAnnual = lostMoneyMonthly * 12;

  return (
    <section className="py-24 bg-[#FAF9F5] border-t border-[#EBE8E2] font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold uppercase tracking-wider mb-4">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>AUDITORIA DE FATURAMENTO PERDIDO</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-normal text-[#1A1816] tracking-tight leading-tight">
            Descubra quanto dinheiro sua empresa{' '}
            <span className="font-serif-title italic text-rose-600">deixa na mesa</span> todo mês.
          </h2>
          <p className="mt-4 text-base text-[#5C5955] max-w-2xl mx-auto">
            35% dos clientes ligam ou mandam mensagem quando sua recepção já fechou ou está ocupada. Quem não recebe resposta em menos de 1 minuto vai direto para o seu concorrente.
          </p>
        </div>

        {/* Calculator Body */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-[#E7E4DC] p-6 sm:p-12 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Sliders (7 cols) */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* Slider 1: Contatos Diários */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm font-semibold">
                  <span className="text-[#1A1816] flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#4F46E5]" />
                    Ligações e mensagens por dia:
                  </span>
                  <span className="text-[#4F46E5] text-base font-bold font-mono">
                    {contactsPerDay} contatos/dia
                  </span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="150"
                  step="5"
                  value={contactsPerDay}
                  onChange={(e) => setContactsPerDay(Number(e.target.value))}
                  className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-[#4F46E5]"
                />
                <div className="flex justify-between text-[11px] text-[#8C8881]">
                  <span>5 contatos</span>
                  <span>75 contatos</span>
                  <span>150+ contatos</span>
                </div>
              </div>

              {/* Slider 2: Ticket Médio */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm font-semibold">
                  <span className="text-[#1A1816] flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-emerald-600" />
                    Valor médio da sua consulta ou serviço:
                  </span>
                  <span className="text-emerald-700 text-base font-bold font-mono">
                    R$ {ticketMedio.toLocaleString('pt-BR')}
                  </span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="2500"
                  step="50"
                  value={ticketMedio}
                  onChange={(e) => setTicketMedio(Number(e.target.value))}
                  className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
                <div className="flex justify-between text-[11px] text-[#8C8881]">
                  <span>R$ 50</span>
                  <span>R$ 1.250</span>
                  <span>R$ 2.500+</span>
                </div>
              </div>

              {/* Loss Metrics Explanation */}
              <div className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#E7E4DC] text-xs text-[#5C5955] space-y-1.5">
                <p>
                  • Estimativa de <strong>{afterHoursContactsMonthly} contatos/mês</strong> chegando fora do horário comercial ou durante linhas ocupadas.
                </p>
                <p>
                  • Pelo menos <strong>{lostDealsMonthly} clientes perdidos</strong> todo mês para a concorrência por falta de resposta imediata.
                </p>
              </div>

            </div>

            {/* Results Card (5 cols) */}
            <div className="lg:col-span-5 bg-[#141312] text-white rounded-3xl p-7 border border-stone-800 text-center space-y-6 shadow-xl">
              
              <span className="text-[11px] font-bold uppercase tracking-wider text-rose-400 block">
                Faturamento Perdido Estimado
              </span>

              <div>
                <div className="text-3xl sm:text-4xl font-extrabold text-rose-400 font-mono tracking-tight">
                  - R$ {lostMoneyMonthly.toLocaleString('pt-BR')},00
                </div>
                <span className="text-xs text-stone-400 block mt-1">
                  saindo do seu bolso todos os meses
                </span>
              </div>

              <div className="py-3 px-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-stone-300">
                <span>Perda anual acumulada: </span>
                <strong className="text-rose-300 font-bold">R$ {lostMoneyAnnual.toLocaleString('pt-BR')},00</strong>
              </div>

              <div className="pt-2">
                <button
                  onClick={onOpenAuth || onOpenDemo}
                  className="w-full py-3.5 px-4 rounded-full bg-[#4F46E5] hover:bg-[#4338CA] text-white text-xs sm:text-sm font-bold shadow-lg shadow-indigo-500/30 transition-all hover:scale-102 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Estancar Perda por R$ 297/mês</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <span className="text-[10px] text-stone-400 block mt-2">
                  Retorno garantido ou seu dinheiro de volta.
                </span>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
