import React from 'react';
import { Clock, CheckCircle2 } from 'lucide-react';
import { TIMELINE_STEPS } from '../data/content';

export default function CallTimelineSection() {
  return (
    <section id="como-funciona" className="py-24 bg-[#FAF9F5] border-t border-[#EBE8E2]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Header */}
        <div className="max-w-2xl mx-auto mb-16">
          <span className="inline-block text-xs font-semibold text-[#C84B1F] uppercase tracking-wider mb-3">
            FLUXO DE UMA CHAMADA REAL
          </span>
          <h2 className="text-4xl sm:text-5xl font-normal text-[#1A1816] tracking-tight leading-[1.15]">
            Um minuto de conversa,<br />
            <span className="font-serif-title italic text-[#C84B1F]">dá até um resumo.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#5C5955] leading-relaxed">
            Veja como cada segundo é aproveitado para entender, resolver e atualizar seu sistema sem deixar o cliente esperando na fila.
          </p>
        </div>

        {/* 5 Timeline steps grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 text-left">
          {TIMELINE_STEPS.map((step, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 border border-[#E7E4DC] shadow-clean shadow-card-hover flex flex-col justify-between relative group"
            >
              <div>
                {/* Time Badge with icon */}
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#FAF5EE] border border-[#EDE5D8] text-[#C84B1F] font-mono text-xs font-bold mb-4">
                  <Clock className="w-3 h-3" />
                  <span>{step.time}</span>
                </div>

                <h3 className="text-base font-bold text-[#1A1816] mb-2 leading-snug">
                  {step.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#5C5955] leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Step indicator */}
              <div className="pt-4 mt-4 border-t border-[#F2EFE8] flex items-center justify-between text-[11px] text-[#9E9A93] font-mono">
                <span>ETAPA 0{idx + 1}</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-[#C84B1F]" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
