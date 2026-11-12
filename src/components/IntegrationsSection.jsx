import React from 'react';
import { Calendar, MessageSquare, Database, CreditCard, Code2, PhoneCall, ArrowUpRight } from 'lucide-react';
import { INTEGRATIONS_LIST } from '../data/content';

export default function IntegrationsSection({ onOpenDemo }) {
  const featured = [
    { name: 'Google Calendar', type: 'Agendamento em tempo real', icon: Calendar, color: '#4285F4' },
    { name: 'WhatsApp Cloud API', type: 'Envio de áudio e texto', icon: MessageSquare, color: '#25D366' },
    { name: 'HubSpot & RD Station', type: 'CRM e criação de leads', icon: Database, color: '#FF7A59' },
    { name: 'Stripe & Asaas', type: 'Pagamentos e Pix imediato', icon: CreditCard, color: '#635BFF' },
    { name: 'Webhooks & API REST', type: 'Conexão com ERP próprio', icon: Code2, color: '#C84B1F' },
    { name: 'PABX SIP Corporativo', type: '0800 e ramais telefônicos', icon: PhoneCall, color: '#0088CC' },
  ];

  return (
    <section id="integracoes" className="py-24 bg-[#FAF9F5] border-t border-[#EBE8E2]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-xs font-semibold text-[#C84B1F] uppercase tracking-wider mb-3">
            CONECTIVIDADE TOTAL
          </span>
          <h2 className="text-4xl sm:text-5xl font-normal text-[#1A1816] tracking-tight leading-[1.12]">
            Conversa com as ferramentas<br />
            <span className="font-serif-title italic text-[#C84B1F]">que você já usa.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#5C5955] leading-relaxed">
            Agendas, CRMs e gateways: a Vocalis se integra em minutos às ferramentas do seu dia a dia, mantendo cada dado registrado automaticamente.
          </p>
        </div>

        {/* Integration Grid with Clean Minimalist Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-[#E7E4DC] shadow-clean shadow-card-hover flex items-start gap-4 hover:border-[#C84B1F]/30 transition-all cursor-pointer group"
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
                    <ArrowUpRight className="w-4 h-4 text-[#A6A29A] group-hover:text-[#C84B1F] transition-colors" />
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
              className="font-semibold text-[#C84B1F] hover:underline"
            >
              Fale com nosso time de engenharia →
            </button>
          </p>
        </div>

      </div>
    </section>
  );
}
