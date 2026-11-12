import React from 'react';
import { Mic, Database, PhoneCall, Sparkles, Check, ArrowRight } from 'lucide-react';
import { THREE_STEPS } from '../data/content';

export default function StepsSection({ onOpenDemo }) {
  return (
    <section id="como-funciona" className="py-24 bg-[#FAF9F5] border-t border-[#EBE8E2]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-xs font-semibold text-[#C84B1F] uppercase tracking-wider mb-3">
            CONFIGURAÇÃO RÁPIDA
          </span>
          <h2 className="text-4xl sm:text-5xl font-normal text-[#1A1816] tracking-tight leading-[1.12]">
            Três passos.<br />
            <span className="font-serif-title italic text-[#C84B1F]">Nenhuma linha de código.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#5C5955] leading-relaxed">
            Você não precisa de equipe de TI ou consultores caros. Em menos de 5 minutos, sua assistente está pronta para atender o primeiro cliente.
          </p>
        </div>

        {/* 3 Step Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Step 1 */}
          <div className="bg-white rounded-3xl p-8 border border-[#E7E4DC] shadow-clean shadow-card-hover flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-4xl font-serif-title italic font-normal text-[#C84B1F]">
                  01
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#FAF5EE] text-[#C84B1F] border border-[#EDE5D8]">
                  Personalidade
                </span>
              </div>
              <h3 className="text-xl font-bold text-[#1A1816] mb-3">
                Escolha o tom e a voz
              </h3>
              <p className="text-sm text-[#5C5955] leading-relaxed mb-6">
                Defina o sotaque brasileiro, a velocidade e a cordialidade de acordo com o público da sua marca.
              </p>
            </div>

            {/* Visual Mini Mockup */}
            <div className="bg-[#FAF9F5] rounded-2xl p-4 border border-[#EBE8E2] space-y-2">
              <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-[#E7E4DC]">
                <div className="flex items-center gap-2">
                  <Mic className="w-4 h-4 text-[#C84B1F]" />
                  <span className="text-xs font-bold text-[#1A1816]">Clara (Acolhedora)</span>
                </div>
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-xl bg-white/60 border border-[#E7E4DC]/60 opacity-60">
                <div className="flex items-center gap-2">
                  <Mic className="w-4 h-4 text-[#8C8881]" />
                  <span className="text-xs font-medium text-[#736F69]">Gabriel (Executivo)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-3xl p-8 border border-[#E7E4DC] shadow-clean shadow-card-hover flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-4xl font-serif-title italic font-normal text-[#C84B1F]">
                  02
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#FAF5EE] text-[#C84B1F] border border-[#EDE5D8]">
                  Conhecimento
                </span>
              </div>
              <h3 className="text-xl font-bold text-[#1A1816] mb-3">
                Alimente com dados
              </h3>
              <p className="text-sm text-[#5C5955] leading-relaxed mb-6">
                Cole o link do seu site ou envie tabelas e manuais. A Vocalis aprende sobre seus produtos, preços e horários.
              </p>
            </div>

            {/* Visual Mini Mockup */}
            <div className="bg-[#FAF9F5] rounded-2xl p-4 border border-[#EBE8E2] space-y-2">
              <div className="flex items-center gap-2 text-xs font-medium text-[#1A1816] p-2 bg-white rounded-xl border border-[#E7E4DC]">
                <Database className="w-4 h-4 text-[#C84B1F]" />
                <span className="truncate">catalogo-servicos-2026.pdf</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-[#1A1816] p-2 bg-white rounded-xl border border-[#E7E4DC]">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Google Agenda Sincronizada</span>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-3xl p-8 border border-[#E7E4DC] shadow-clean shadow-card-hover flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-4xl font-serif-title italic font-normal text-[#C84B1F]">
                  03
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#FAF5EE] text-[#C84B1F] border border-[#EDE5D8]">
                  Ativação
                </span>
              </div>
              <h3 className="text-xl font-bold text-[#1A1816] mb-3">
                Ative os números
              </h3>
              <p className="text-sm text-[#5C5955] leading-relaxed mb-6">
                Conecte seu WhatsApp oficial ou vincule o número fixo e 0800. A partir daí, nenhum cliente fica sem resposta.
              </p>
            </div>

            {/* Visual Mini Mockup */}
            <div className="bg-[#1A1816] text-white rounded-2xl p-4 shadow-md flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#C84B1F] flex items-center justify-center animate-pulse">
                  <PhoneCall className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="text-xs font-bold">Chamada em tempo real</div>
                  <div className="text-[11px] text-[#A6A29A]">Atendida em 1 toque</div>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-400">ATIVO</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
