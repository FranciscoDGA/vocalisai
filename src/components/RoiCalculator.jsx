import React, { useState } from 'react';
import { Calculator, TrendingUp, DollarSign, Clock, Users, ArrowRight, Sparkles } from 'lucide-react';

export default function RoiCalculator({ onOpenDemo }) {
  const [contactsPerMonth, setContactsPerMonth] = useState(1800);
  const [humanAgentsNeeded, setHumanAgentsNeeded] = useState(3);

  // Estimativa de custo por atendente CLT incluindo encargos, benefícios e escala 24/7 (média Brasil: R$ 3.800/mês total)
  const costPerHumanAgent = 3800;
  const totalHumanCostMonthly = humanAgentsNeeded * costPerHumanAgent;
  const totalHumanCostAnnual = totalHumanCostMonthly * 12;

  // Custo estimado do Kloel (Plano Pro ou Business conforme volume)
  const kloelCostMonthly = contactsPerMonth > 5000 ? 1490 : (contactsPerMonth > 1000 ? 697 : 297);
  const kloelCostAnnual = kloelCostMonthly * 12;

  // Economia
  const monthlySavings = totalHumanCostMonthly - kloelCostMonthly;
  const annualSavings = totalHumanCostAnnual - kloelCostAnnual;

  // Leads recuperados estimados (média de 32% dos contatos chegam fora do horário comercial)
  const afterHoursLeads = Math.round(contactsPerMonth * 0.35);

  return (
    <section id="roi" className="py-24 relative bg-[#090a10] border-t border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-400">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Retorno Sobre o Investimento</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Calcule Sua Economia Real com a Vocalis
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Compare o custo de manter uma equipe humana para cobrir ligações e WhatsApp 24/7 com o investimento na Vocalis.
          </p>
        </div>

        {/* Calculator Layout */}
        <div className="max-w-4xl mx-auto rounded-3xl bg-[#12141f] border border-white/10 p-6 sm:p-10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Sliders Side (7 cols) */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* Slider 1: Contatos por mês */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm font-semibold">
                  <span className="text-white flex items-center gap-2">
                    <Clock className="w-4 h-4 text-orange-400" />
                    Atendimentos por mês (Chamadas + WhatsApp):
                  </span>
                  <span className="text-orange-400 text-base font-bold font-mono">
                    {contactsPerMonth.toLocaleString('pt-BR')} contatos
                  </span>
                </div>
                <input
                  type="range"
                  min="200"
                  max="10000"
                  step="100"
                  value={contactsPerMonth}
                  onChange={(e) => setContactsPerMonth(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-orange-500"
                />
                <div className="flex justify-between text-[11px] text-slate-500">
                  <span>200</span>
                  <span>5.000</span>
                  <span>10.000+</span>
                </div>
              </div>

              {/* Slider 2: Atendentes humanos necessários para 24/7 */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm font-semibold">
                  <span className="text-white flex items-center gap-2">
                    <Users className="w-4 h-4 text-orange-400" />
                    Atendentes humanos para cobrir dia, noite e finais de semana:
                  </span>
                  <span className="text-orange-400 text-base font-bold font-mono">
                    {humanAgentsNeeded} pessoas
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="12"
                  step="1"
                  value={humanAgentsNeeded}
                  onChange={(e) => setHumanAgentsNeeded(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-orange-500"
                />
                <div className="flex justify-between text-[11px] text-slate-500">
                  <span>1 atendente</span>
                  <span>6 atendentes</span>
                  <span>12 atendentes</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-2 text-xs text-slate-300">
                <div className="flex items-center gap-2 text-amber-400 font-semibold">
                  <Sparkles className="w-4 h-4" />
                  <span>Oportunidade oculta:</span>
                </div>
                <p>
                  Aproximadamente <strong className="text-white font-bold">{afterHoursLeads} contatos</strong> chegam à sua empresa após as 18h ou nos finais de semana. Sem IA, a maioria desses leads desiste e busca concorrentes.
                </p>
              </div>

            </div>

            {/* Result KPI Card (5 cols) */}
            <div className="lg:col-span-5 rounded-2xl bg-gradient-to-b from-orange-500/10 via-amber-500/5 to-transparent border border-orange-500/30 p-6 sm:p-8 space-y-6 text-center">
              
              <div className="space-y-1">
                <span className="text-xs uppercase font-bold tracking-wider text-slate-400">
                  Economia Anual Estimada
                </span>
                <div className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                  R$ {annualSavings.toLocaleString('pt-BR')},00
                </div>
                <p className="text-xs text-emerald-400 font-medium">
                  R$ {monthlySavings.toLocaleString('pt-BR')}/mês economizados
                </p>
              </div>

              <div className="space-y-3 pt-4 border-t border-white/10 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Custo CLT Tradicional 24/7:</span>
                  <span className="text-rose-400 font-semibold line-through">
                    R$ {totalHumanCostMonthly.toLocaleString('pt-BR')}/mês
                  </span>
                </div>

                <div className="flex justify-between text-slate-300 font-medium">
                  <span>Investimento Vocalis AI:</span>
                  <span className="text-emerald-400 font-bold">
                    R$ {kloelCostMonthly.toLocaleString('pt-BR')}/mês
                  </span>
                </div>

                <div className="flex justify-between text-slate-400">
                  <span>Disponibilidade:</span>
                  <span className="text-white font-semibold">
                    100% dos dias, 24h ininterruptas
                  </span>
                </div>
              </div>

              <button
                onClick={onOpenDemo}
                className="w-full py-3.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm shadow-lg shadow-orange-500/30 transition-all flex items-center justify-center gap-2"
              >
                <span>Garantir Essa Economia Agora</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
