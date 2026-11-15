import React from 'react';
import { 
  Headphones, Calendar, UserCheck, ShoppingBag, FileText, 
  Sparkles, ArrowUpRight, ArrowRight 
} from 'lucide-react';
import { BRAND } from '../data/content';

export default function UseCasesSection({ onOpenDemo, onOpenAuth, onNavigate }) {
  const brandName = BRAND?.name || 'Kloel';

  const capabilities = [
    {
      id: 'recepcao',
      title: 'Recepção',
      desc: 'Atende, filtra e encaminha cada ligação para quem precisa recebê-la.',
      icon: Headphones,
      page: 'recepcionista-virtual'
    },
    {
      id: 'agendamentos',
      title: 'Agendamentos',
      desc: 'Marca, remarca e confirma horários direto na sua agenda.',
      icon: Calendar,
      page: 'agendamentos'
    },
    {
      id: 'suporte',
      title: 'Suporte ao cliente',
      desc: 'Resolve as dúvidas de sempre e segue as suas regras nos casos especiais.',
      icon: UserCheck,
      page: 'agente-suporte'
    },
    {
      id: 'pedidos',
      title: 'Pedidos',
      desc: 'Recebe pedidos e solicitações a qualquer hora, já no formato que a sua equipe usa.',
      icon: ShoppingBag,
      page: 'atendedor-automatico'
    },
    {
      id: 'recados',
      title: 'Recados e resumos',
      desc: 'Quando você não pode atender, ela anota tudo e manda por e-mail.',
      icon: FileText,
      page: 'equipe-externa'
    },
    {
      id: 'integracoes',
      title: 'O que o seu negócio pedir',
      desc: 'Fluxos sob medida, conectados às ferramentas que você já usa.',
      icon: Sparkles,
      page: 'integracoes'
    }
  ];

  const handleCardClick = (page) => {
    if (onNavigate) {
      onNavigate(page);
    } else if (onOpenDemo) {
      onOpenDemo();
    }
  };

  return (
    <section id="casos-de-uso" className="py-20 sm:py-28 bg-[#FAF9F5] border-t border-[#EBE8E2]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header (1:1 com o Kloel) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-5xl font-normal text-[#1A1816] tracking-tight leading-[1.15]">
              Feita para o <span className="font-serif-title italic text-[#C84B1F]">dia a dia</span> de quem atende.
            </h2>
            <p className="mt-4 text-sm sm:text-base text-[#5C5955] leading-relaxed">
              Do consultório à imobiliária, da oficina ao e-commerce: a {brandName} se encaixa na agenda, no CRM e no jeito de trabalhar que você já tem.
            </p>
          </div>
          
          <button
            onClick={onOpenAuth || onOpenDemo}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#D0CBC0] hover:border-[#1A1816] bg-white text-xs sm:text-sm font-semibold text-[#1A1816] hover:bg-[#FAF9F5] transition-all cursor-pointer shadow-xs self-start md:self-auto shrink-0 group"
          >
            <span>Começar agora</span>
            <ArrowRight className="w-4 h-4 text-[#736F69] group-hover:text-[#1A1816] group-hover:translate-x-0.5 transition-all" />
          </button>
        </div>

        {/* 6 Cards Container Unificado (Grid 3x2 idêntico ao Kloel) */}
        <div className="bg-white rounded-3xl border border-[#E7E4DC] shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-3">
          {capabilities.map((item, idx) => {
            const Icon = item.icon;
            
            // Bordas internas do grid 3x2:
            // Linha 1 (0, 1, 2) tem borda inferior
            // Colunas 0 e 1 de cada linha têm borda direita
            const isBottomBorder = idx < 3;
            const isRightBorder = (idx % 3) !== 2;

            return (
              <div
                key={item.id}
                onClick={() => handleCardClick(item.page)}
                className={`p-7 sm:p-8 flex flex-col justify-between group cursor-pointer transition-colors hover:bg-[#FAF9F5] ${
                  isBottomBorder ? 'border-b border-[#EBE8E2]' : ''
                } ${
                  isRightBorder ? 'md:border-r border-[#EBE8E2]' : ''
                }`}
              >
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Icon className="w-4 h-4 text-[#C84B1F] shrink-0" />
                    <h3 className="text-base sm:text-lg font-bold text-[#1A1816] flex items-center gap-1 group-hover:text-[#C84B1F] transition-colors">
                      <span>{item.title}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#A6A29A] group-hover:text-[#C84B1F] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-[#5C5955] leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-6 mt-auto">
                  <span className="text-[11px] font-semibold text-[#C84B1F] opacity-0 group-hover:opacity-100 transition-opacity inline-flex items-center gap-1">
                    Ver página detalhada ➔
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
