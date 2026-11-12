import React from 'react';
import { Stethoscope, Building2, Scale, ShoppingBag, Wrench, Banknote, ArrowUpRight } from 'lucide-react';
import { NICHES } from '../data/content';

const iconMap = {
  Stethoscope,
  Building2,
  Scale,
  ShoppingBag,
  Wrench,
  Banknote,
};

export default function UseCasesSection({ onOpenDemo }) {
  return (
    <section id="casos-de-uso" className="py-24 bg-[#FAF9F5] border-t border-[#EBE8E2]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="inline-block text-xs font-semibold text-[#C84B1F] uppercase tracking-wider mb-3">
              CASOS DE USO
            </span>
            <h2 className="text-4xl sm:text-5xl font-normal text-[#1A1816] tracking-tight leading-[1.12]">
              Feita para a rotina<br />
              <span className="font-serif-title italic text-[#C84B1F]">de quem atende.</span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#5C5955] leading-relaxed">
              Descubra como empresas de diferentes setores estão escalando seus atendimentos com humanidade e zero fila.
            </p>
          </div>
          
          <button
            onClick={onOpenDemo}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#C84B1F] hover:text-[#9E3612] transition-colors"
          >
            <span>Ver todos os nichos</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* 6 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {NICHES.map((niche) => {
            const Icon = iconMap[niche.icon] || Stethoscope;
            return (
              <div
                key={niche.id}
                className="bg-white rounded-3xl p-7 border border-[#E7E4DC] shadow-clean shadow-card-hover flex flex-col justify-between group cursor-pointer transition-all hover:-translate-y-1"
                onClick={onOpenDemo}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-[#FAF5EE] border border-[#EDE5D8] flex items-center justify-center text-[#C84B1F] group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-[#A6A29A] group-hover:text-[#C84B1F] transition-colors" />
                  </div>

                  <h3 className="text-xl font-bold text-[#1A1816] mb-2">
                    {niche.name}
                  </h3>
                  <p className="text-xs font-medium text-[#C84B1F] mb-3">
                    {niche.tagline}
                  </p>
                  <p className="text-sm text-[#5C5955] leading-relaxed mb-6">
                    {niche.description}
                  </p>
                </div>

                {/* Metrics Pill */}
                <div className="pt-4 border-t border-[#F0EDE8] grid grid-cols-2 gap-2">
                  {niche.metrics.map((m, idx) => (
                    <div key={idx} className="bg-[#FAF9F5] p-2.5 rounded-xl border border-[#EBE8E2]">
                      <div className="text-base font-bold text-[#1A1816]">{m.value}</div>
                      <div className="text-[11px] text-[#736F69] truncate">{m.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
