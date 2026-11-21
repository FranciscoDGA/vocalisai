import React, { useState } from 'react';
import { ShieldCheck, Info, Server, Phone, MessageSquare, Database, Globe, X } from 'lucide-react';

export default function SystemStatusBadge() {
  const [modalOpen, setModalOpen] = useState(false);

  const PLATFORM_AREAS = [
    { name: 'Telefonia e rotas SIP / DDD / 0800', status: 'Sob consulta / conforme plano', icon: Phone },
    { name: 'Automação WhatsApp (modalidade por plano)', status: 'Sob consulta / conforme plano', icon: MessageSquare },
    { name: 'Widget Webchat para site', status: 'Conforme plano contratado', icon: Globe },
    { name: 'Webhooks e integrações externas', status: 'Sob consulta / conforme plano', icon: Server },
    { name: 'Práticas de privacidade e LGPD', status: 'Conforme Política de Privacidade', icon: Database }
  ];

  return (
    <>
      {/* Clickable Badge */}
      <button
        onClick={() => setModalOpen(true)}
        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF9F5] border border-[#E7E4DC] text-[#5C5955] text-[11px] font-medium hover:bg-[#F2EFE8] transition-all cursor-pointer shadow-2xs group"
        title="Ver informações de operação e SLA"
      >
        <Info className="w-3.5 h-3.5 text-[#4F46E5] shrink-0" />
        <span className="font-semibold text-[#1A1816]">Informações de Operação e SLA</span>
      </button>

      {/* Modal Operation Info */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 border border-[#E7E4DC] shadow-2xl relative text-left max-h-[90vh] overflow-y-auto">

            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#EBE8E2]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-200 text-[#4F46E5] flex items-center justify-center">
                  <Info className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#1A1816]">Informações de Operação e SLA</h3>
                  <p className="text-xs text-[#5C5955]">Escopo técnico e termos confirmados por contrato</p>
                </div>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-2 text-[#8C8881] hover:text-[#1A1816] rounded-xl hover:bg-[#FAF9F5] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Honest Telemetry Disclosure */}
            <div className="my-5 p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-[#5C5955] leading-relaxed">
              Monitoramento em tempo real, histórico de disponibilidade (uptime), latência medida em produção, regiões de hospedagem e eventual SLA contratual não são publicados por telemetria pública neste site e são informados sob consulta na proposta comercial.
            </div>

            {/* Areas List */}
            <div className="space-y-2.5 mb-6">
              <div className="text-xs font-bold uppercase tracking-wider text-[#8C8881] mb-2">
                Áreas da plataforma
              </div>

              {PLATFORM_AREAS.map((area, idx) => {
                const Icon = area.icon;
                return (
                  <div key={idx} className="flex items-center justify-between gap-3 p-3 rounded-xl border border-[#EBE8E2] bg-white text-xs">
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4 text-[#4F46E5] shrink-0" />
                      <span className="font-semibold text-[#1A1816]">{area.name}</span>
                    </div>
                    <span className="text-[11px] font-medium text-[#5C5955] bg-[#FAF9F5] px-2.5 py-0.5 rounded-md border border-[#EBE8E2] shrink-0">
                      {area.status}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Governance Note */}
            <div className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#E7E4DC] text-xs space-y-1">
              <div className="font-bold text-[#1A1816] flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#4F46E5]" />
                <span>Condições técnicas e contratuais</span>
              </div>
              <p className="text-[#5C5955] text-[11px] leading-relaxed">
                Requisitos de disponibilidade, integrações e níveis de suporte variam conforme o plano contratado e constam na documentação comercial aplicável.
              </p>
            </div>

            {/* Footer Close */}
            <div className="mt-6 text-right">
              <button
                onClick={() => setModalOpen(false)}
                className="px-5 py-2.5 rounded-full bg-[#11100F] text-white text-xs font-semibold hover:bg-black transition-colors cursor-pointer"
              >
                Entendido
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
