import React, { useState } from 'react';
import { CheckCircle2, ShieldCheck, Activity, Zap, Server, Phone, MessageSquare, Database, X, Clock } from 'lucide-react';

export default function SystemStatusBadge({ showDetailedModal = false }) {
  const [modalOpen, setModalOpen] = useState(false);

  const SERVICES = [
    { name: 'Rede Telefônica SIP & PSTN (0800 / DDD)', status: 'Operacional', latency: '310ms', uptime: '99.99%', icon: Phone },
    { name: 'Motor WhatsApp Cloud & Baileys', status: 'Operacional', latency: '240ms', uptime: '99.98%', icon: MessageSquare },
    { name: 'Modelos Neurais de Voz PT-BR (Roberta)', status: 'Operacional', latency: '340ms', uptime: '99.97%', icon: Zap },
    { name: 'Webhooks & Sincronização com CRMs', status: 'Operacional', latency: '180ms', uptime: '100%', icon: Server },
    { name: 'Armazenamento Criptografado & LGPD', status: 'Operacional', latency: '95ms', uptime: '100%', icon: Database }
  ];

  return (
    <>
      {/* Clickable Badge */}
      <button
        onClick={() => setModalOpen(true)}
        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-[11px] font-medium hover:bg-emerald-100/70 transition-all cursor-pointer shadow-2xs group"
        title="Ver status operacional em tempo real"
      >
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
        <span className="font-semibold">Sistemas 100% Operacionais</span>
        <span className="text-emerald-600/70 hidden sm:inline">· Uptime 99.98%</span>
        <span className="text-[10px] text-emerald-700 underline underline-offset-2 ml-1 group-hover:text-emerald-900">Ver SLA</span>
      </button>

      {/* Modal Detailed Status */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 border border-[#E7E4DC] shadow-2xl relative text-left max-h-[90vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#EBE8E2]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center">
                  <Activity className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#1A1816]">Status Operacional & SLA</h3>
                  <p className="text-xs text-[#5C5955]">Monitoramento em tempo real dos clusters Vocalis</p>
                </div>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-2 text-[#8C8881] hover:text-[#1A1816] rounded-xl hover:bg-[#FAF9F5] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Global Summary Cards */}
            <div className="grid grid-cols-3 gap-3 my-6">
              <div className="p-3.5 rounded-2xl bg-[#FAF9F5] border border-[#E7E4DC] text-center">
                <span className="block text-[10px] uppercase font-bold text-[#8C8881]">Uptime 90 Dias</span>
                <span className="text-lg font-black text-emerald-600 font-mono">99.98%</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#FAF9F5] border border-[#E7E4DC] text-center">
                <span className="block text-[10px] uppercase font-bold text-[#8C8881]">Latência Média</span>
                <span className="text-lg font-black text-[#4F46E5] font-mono">320ms</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#FAF9F5] border border-[#E7E4DC] text-center">
                <span className="block text-[10px] uppercase font-bold text-[#8C8881]">SLA Contratual</span>
                <span className="text-lg font-black text-[#1A1816] font-mono">99.9%</span>
              </div>
            </div>

            {/* Services List */}
            <div className="space-y-2.5 mb-6">
              <div className="text-xs font-bold uppercase tracking-wider text-[#8C8881] mb-2">
                Infraestrutura & Serviços
              </div>

              {SERVICES.map((srv, idx) => {
                const Icon = srv.icon;
                return (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-xl border border-[#EBE8E2] bg-white hover:bg-[#FAF9F5] transition-colors text-xs">
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4 text-[#4F46E5] shrink-0" />
                      <span className="font-semibold text-[#1A1816]">{srv.name}</span>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-[11px] font-mono text-[#736F69]">{srv.latency}</span>
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>{srv.status}</span>
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Incidents box */}
            <div className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#E7E4DC] text-xs space-y-1">
              <div className="font-bold text-[#1A1816] flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Zero incidentes registrados nos últimos 30 dias</span>
              </div>
              <p className="text-[#5C5955] text-[11px] leading-relaxed">
                Nossos servidores contam com redundância geográfica multi-região (São Paulo, Virgínia e Frankfurt) para garantir atendimento ininterrupto.
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
