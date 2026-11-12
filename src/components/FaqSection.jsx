import React, { useState } from 'react';
import { ChevronDown, Plus, Minus } from 'lucide-react';
import { FAQS } from '../data/content';

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-24 bg-[#FAF9F5] border-t border-[#EBE8E2]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-semibold text-[#C84B1F] uppercase tracking-wider mb-3">
            DÚVIDAS COMUNS
          </span>
          <h2 className="text-4xl sm:text-5xl font-normal text-[#1A1816] tracking-tight leading-[1.12]">
            Perguntas <span className="font-serif-title italic text-[#C84B1F]">frequentes</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#5C5955]">
            Tudo o que você precisa saber antes de colocar sua assistente para atender.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-[#E7E4DC] overflow-hidden transition-all shadow-sm"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full py-5 px-6 flex items-center justify-between text-left gap-4 hover:bg-[#FAF9F5]/50 transition-colors"
                >
                  <span className="font-bold text-[#1A1816] text-base sm:text-lg">
                    {faq.q}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-[#FAF5EE] border border-[#EDE5D8] flex items-center justify-center shrink-0 text-[#C84B1F]">
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-2 text-sm sm:text-base text-[#5C5955] leading-relaxed border-t border-[#F0EDE8]">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
