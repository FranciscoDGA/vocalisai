import React from 'react';
import { ShieldCheck, Lock, Sliders, CheckCircle2 } from 'lucide-react';
import { GUARANTEES } from '../data/content';

export default function GuaranteesSection() {
  const iconMap = [ShieldCheck, Lock, Sliders];

  return (
    <section className="py-24 bg-[#FAF9F5] border-t border-[#EBE8E2]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl sm:text-5xl font-normal text-[#1A1816] tracking-tight leading-[1.12]">
            O que a gente<br />
            <span className="font-serif-title italic text-[#C84B1F]">garante.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#5C5955] leading-relaxed">
            Sem pegadinhas, sem contratos de fidelidade forçada e com total segurança jurídica.
          </p>
        </div>

        {/* 3 Guarantees Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {GUARANTEES.map((item, idx) => {
            const Icon = iconMap[idx] || ShieldCheck;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-8 border border-[#E7E4DC] shadow-clean shadow-card-hover flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-serif-title italic text-[#C84B1F] font-normal">
                      {item.badge}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-[#FAF5EE] border border-[#EDE5D8] flex items-center justify-center text-[#C84B1F]">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-[#1A1816] mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#5C5955] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
