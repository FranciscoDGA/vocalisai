import React from 'react';
import { Calendar, MessageSquare, Database, CreditCard, Code2, PhoneCall, ArrowUpRight } from 'lucide-react';
import { INTEGRATIONS_LIST } from '../data/content';

export default function IntegrationsSection({ onOpenDemo }) {
  const featured = [
    { name: 'Google Calendar', type: 'Agendamento (sob consulta)', icon: Calendar, color: '#4285F4' },
    { name: 'WhatsApp', type: 'Envio de texto e áudio (conforme plano)', icon: MessageSquare, color: '#25D366' },
    { name: 'HubSpot & RD Station', type: 'CRM e leads (integração sob consulta)', icon: Database, color: '#FF7A59' },
    { name: 'Gateways de Pagamento', type: 'Fluxos financeiros (integração sob consulta)', icon: CreditCard, color: '#635BFF' },
    { name: 'Webhooks & API REST', type: 'Conexão via webhook/API sob consulta', icon: Code2, color: '#4F46E5' },
    { name: 'PABX SIP Corporativo', type: 'Telefonia SIP (conforme viabilidade técnica)', icon: PhoneCall, color: '#0088CC' },
  ];

  return (
    <section id="integracoes" className="py-16 sm:py-24 bg-[#FAF9F5] border-t border-[#EBE8E2] overflow-hidden w-full max-w-full">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-full min-w-0">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-xs font-semibold text-[#4F46E5] uppercase tracking-wider mb-3">
            INTEGRAÇÕES SOB CONSULTA
          </span>
          <h2 className="text-4xl sm:text-5xl font-normal text-[#1A1816] tracking-tight leading-[1.12]">
            Conecte com ferramentas<br />
            <span className="font-serif-title italic text-[#4F46E5]">avaliadas para o seu fluxo.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#5C5955] leading-relaxed">
            Conheça possibilidades de integração com agendas, CRMs, webhooks e telefonia. A disponibilidade nativa ou via API depende do plano contratado.
          </p>
        </div>

        {/* Integration Grid with Clean Minimalist Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-[#E7E4DC] shadow-clean shadow-card-hover flex items-start gap-4 hover:border-[#4F46E5]/30 transition-all cursor-pointer group"
                onClick={onOpenDemo}
              >
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border border-[#EBE8E2] bg-[#FAF9F5] group-hover:scale-105 transition-transform"
                >
                  <Icon className="w-6 h-6" style={{ color: item.color }} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-[#1A1816] text-base">{item.name}</h3>
                    <ArrowUpRight className="w-4 h-4 text-[#A6A29A] group-hover:text-[#4F46E5] transition-colors" />
                  </div>
                  <p className="text-xs text-[#5C5955] mt-1 leading-relaxed">
                    {item.type}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 text-center">
          <p className="text-sm text-[#736F69]">
            Precisa integrar com seu ERP ou sistema interno?{' '}
            <button 
              onClick={onOpenDemo}
              className="font-semibold text-[#4F46E5] hover:underline"
            >
              Fale com nosso time de engenharia →
            </button>
          </p>
        </div>

      </div>
    </section>
  );
}
