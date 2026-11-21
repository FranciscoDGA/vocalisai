import React from 'react';
import { ShieldCheck, ArrowRight, RotateCcw, Lock } from 'lucide-react';

export default function GuaranteeBadgeSection({ onOpenAuth, onOpenDemo }) {
  return (
    <section className="py-16 sm:py-20 bg-white border-y border-[#EBE8E2] font-sans overflow-hidden w-full max-w-full">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-full min-w-0">
        <div className="bg-[#FAF9F5] rounded-3xl p-8 sm:p-12 border-2 border-indigo-200/90 shadow-clean flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
          
          {/* Shield Badge Icon */}
          <div className="relative shrink-0">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] flex items-center justify-center text-white shadow-xl shadow-indigo-500/25">
              <ShieldCheck className="w-12 h-12 text-white" />
            </div>
            <div className="absolute -bottom-2 inset-x-0 flex justify-center">
              <span className="px-3 py-0.5 rounded-full bg-amber-400 text-[#1A1816] font-black text-[10px] uppercase tracking-wider shadow-sm">
                TRANSPARÊNCIA
              </span>
            </div>
          </div>

          {/* Text Content */}
          <div className="flex-1 space-y-3">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#4F46E5]">
                CONDIÇÕES COMERCIAIS CLARAS
              </span>
              <span className="text-xs text-stone-400">•</span>
              <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                <Lock className="w-3 h-3 text-emerald-600" />
                Sem promessas irreais
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-normal text-[#1A1816] tracking-tight">
              Conheça a plataforma e as condições vigentes antes de contratar.
            </h3>

            <p className="text-xs sm:text-sm text-[#5C5955] leading-relaxed">
              Apresentamos uma demonstração do produto, o escopo técnico e os termos comerciais antes da contratação. Regras de avaliação, cancelamento e eventual reembolso seguem o contrato confirmado e a legislação aplicável.
            </p>

            <div className="pt-2">
              <button
                onClick={onOpenAuth || onOpenDemo}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#11100F] hover:bg-black text-white text-xs sm:text-sm font-semibold shadow-md transition-all hover:scale-105 cursor-pointer"
              >
                <span>Solicitar Demonstração e Condições</span>
                <ArrowRight className="w-4 h-4 text-white/80" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
