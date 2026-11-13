import React, { useState } from 'react';
import { X, Check, ShieldCheck, Sparkles, User, HelpCircle, Phone, MessageSquare, MessageCircle, ArrowRight } from 'lucide-react';
import { BRAND } from '../data/content';

export default function DashboardPricingModal({ isOpen, onClose, onOpenDemo }) {
  const [activeChannel, setActiveChannel] = useState('telefone'); // 'telefone' | 'whatsapp' | 'chatbot'
  const [isYearly, setIsYearly] = useState(false);

  if (!isOpen) return null;

  // Plan Data matching Kloel's exact uploaded screenshots
  const plansByChannel = {
    telefone: {
      solo: {
        name: 'Solo',
        tagline: 'Para 10-20 ligações por dia',
        oldPriceMonthly: 'R$ 719',
        priceMonthly: '503',
        oldPriceYearly: 'R$ 575',
        priceYearly: '402',
        subtextMonthly: 'nos 3 primeiros meses · depois R$ 719/mês',
        subtextYearly: 'nos 3 primeiros meses · faturado anualmente',
        features: [
          { text: '1000 minutos', detail: 'corresponde a R$ 0,72 / min' },
          { text: '1 ligação simultânea' },
          { text: '1 número de telefone', detail: 'R$ 49 / número extra' },
          { text: 'Assistentes ilimitados' },
          { text: '1 usuário' }
        ]
      },
      team: {
        name: 'Team',
        tagline: 'Para 20-100 ligações por dia',
        badge: '☆ Nossa recomendação',
        oldPriceMonthly: 'R$ 2.159',
        priceMonthly: '1.511',
        oldPriceYearly: 'R$ 1.727',
        priceYearly: '1.209',
        subtextMonthly: 'nos 3 primeiros meses · depois R$ 2.159/mês',
        subtextYearly: 'nos 3 primeiros meses · faturado anualmente',
        features: [
          { text: '3600 minutos', detail: 'corresponde a R$ 0,60 / min' },
          { text: '3 ligações simultâneas' },
          { text: '3 números de telefone', detail: 'R$ 49 / número extra' },
          { text: 'Assistentes ilimitados' },
          { text: 'Usuários ilimitados' }
        ]
      },
      scale: {
        name: 'Scale',
        tagline: '100+ ligações por dia',
        priceLabel: 'Preço individual',
        features: [
          { text: 'A partir de 6000 minutos', hasTooltip: true },
          { text: 'Chamadas simultâneas ilimitadas' },
          { text: 'Números de tel. sob medida' },
          { text: 'Assistentes ilimitados' },
          { text: 'Usuários ilimitados' }
        ]
      }
    },

    whatsapp: {
      solo: {
        name: 'Solo',
        tagline: 'Para até 100 conversas por mês',
        oldPriceMonthly: 'R$ 299',
        priceMonthly: '209',
        oldPriceYearly: 'R$ 239',
        priceYearly: '167',
        subtextMonthly: 'nos 3 primeiros meses · depois R$ 299/mês',
        subtextYearly: 'nos 3 primeiros meses · faturado anualmente',
        features: [
          { text: '100 conversas', detail: 'Até 1000 mensagens', hasTooltip: true },
          { text: 'Assistentes ilimitados' },
          { text: '1 usuário' },
          { text: `Powered by ${BRAND.name.toLowerCase()}` }
        ]
      },
      team: {
        name: 'Team',
        tagline: 'Para até 400 conversas por mês',
        badge: '☆ Nossa recomendação',
        oldPriceMonthly: 'R$ 899',
        priceMonthly: '629',
        oldPriceYearly: 'R$ 719',
        priceYearly: '503',
        subtextMonthly: 'nos 3 primeiros meses · depois R$ 899/mês',
        subtextYearly: 'nos 3 primeiros meses · faturado anualmente',
        features: [
          { text: '400 conversas', detail: 'Até 4000 mensagens', hasTooltip: true },
          { text: 'Agendamento de horários incluído', detail: 'R$ 36 / integração extra', hasTooltip: true },
          { text: 'Envio de PDFs e imagens' },
          { text: 'Transferência para sua equipe' },
          { text: `Sem a marca ${BRAND.name.toLowerCase()}` }
        ]
      },
      scale: {
        name: 'Scale',
        tagline: 'Volume de conversas personalizado',
        priceLabel: 'Preço individual',
        features: [
          { text: 'Volumes de conversas personalizados' },
          { text: 'Tudo o que está incluído no Team' },
          { text: 'Chatbot de IA incorporado à página' },
          { text: 'Contexto do site' }
        ]
      }
    },

    chatbot: {
      solo: {
        name: 'Solo',
        tagline: 'Para até 100 conversas por mês',
        oldPriceMonthly: 'R$ 299',
        priceMonthly: '209',
        oldPriceYearly: 'R$ 239',
        priceYearly: '167',
        subtextMonthly: 'nos 3 primeiros meses · depois R$ 299/mês',
        subtextYearly: 'nos 3 primeiros meses · faturado anualmente',
        features: [
          { text: '100 conversas', detail: 'Até 1000 mensagens', hasTooltip: true },
          { text: 'Assistentes ilimitados' },
          { text: '1 usuário' },
          { text: `Powered by ${BRAND.name.toLowerCase()}` }
        ]
      },
      team: {
        name: 'Team',
        tagline: 'Para até 400 conversas por mês',
        badge: '☆ Nossa recomendação',
        oldPriceMonthly: 'R$ 899',
        priceMonthly: '629',
        oldPriceYearly: 'R$ 719',
        priceYearly: '503',
        subtextMonthly: 'nos 3 primeiros meses · depois R$ 899/mês',
        subtextYearly: 'nos 3 primeiros meses · faturado anualmente',
        features: [
          { text: '400 conversas', detail: 'Até 4000 mensagens', hasTooltip: true },
          { text: 'Agendamento de horários incluído', detail: 'R$ 36 / integração extra', hasTooltip: true },
          { text: 'Envio de PDFs e imagens' },
          { text: 'Transferência para sua equipe' },
          { text: `Sem a marca ${BRAND.name.toLowerCase()}` }
        ]
      },
      scale: {
        name: 'Scale',
        tagline: 'Volume de conversas personalizado',
        priceLabel: 'Preço individual',
        features: [
          { text: 'Volumes de conversas personalizados' },
          { text: 'Tudo o que está incluído no Team' },
          { text: 'Chatbot de IA incorporado à página' },
          { text: 'Contexto do site' }
        ]
      }
    }
  };

  const currentPlans = plansByChannel[activeChannel];

  const handleSelectPlan = (planName) => {
    const channelNames = {
      telefone: 'Telefone IA',
      whatsapp: 'WhatsApp IA',
      chatbot: 'Chatbot de IA'
    };
    const channelText = channelNames[activeChannel] || 'Telefone IA';
    const periodText = isYearly ? 'Anual (-20% OFF)' : 'Mensal';
    const msg = `Olá! Quero ativar o Plano *${planName}* (${channelText}) no ciclo *${periodText}* com 30% OFF na ${BRAND.name}!`;
    const url = `https://api.whatsapp.com/send?phone=5594984423948&text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-fadeIn overflow-y-auto">
      <div 
        className="bg-white rounded-3xl max-w-5xl w-full shadow-2xl border border-[#E7E4DC] p-6 sm:p-8 relative my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-20 w-8 h-8 rounded-full bg-white hover:bg-[#FAF9F5] border border-[#E7E4DC] flex items-center justify-center text-[#736F69] hover:text-[#1A1816] transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header: Logo + Channel Switcher Pills */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 pt-1">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-[3px] h-5">
              <span className="w-[3px] h-3.5 bg-[#C84B1F] rounded-full"></span>
              <span className="w-[3px] h-5 bg-[#C84B1F] rounded-full"></span>
              <span className="w-[3px] h-3 bg-[#C84B1F] rounded-full"></span>
            </div>
            <span className="text-xl font-bold tracking-tight text-[#1A1816]">
              {BRAND.name.toLowerCase()}
            </span>
          </div>

          {/* Product Switcher Pills (Exact match to print: Telefone IA | WhatsApp IA | Chatbot de IA) */}
          <div className="flex items-center p-1 rounded-full bg-[#FAF9F5] border border-[#E7E4DC]">
            <button
              onClick={() => setActiveChannel('telefone')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeChannel === 'telefone'
                  ? 'bg-white text-[#1A1816] shadow-sm border border-[#E7E4DC]'
                  : 'text-[#736F69] hover:text-[#1A1816]'
              }`}
            >
              Telefone IA
            </button>
            <button
              onClick={() => setActiveChannel('whatsapp')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeChannel === 'whatsapp'
                  ? 'bg-white text-[#1A1816] shadow-sm border border-[#E7E4DC]'
                  : 'text-[#736F69] hover:text-[#1A1816]'
              }`}
            >
              WhatsApp IA
            </button>
            <button
              onClick={() => setActiveChannel('chatbot')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeChannel === 'chatbot'
                  ? 'bg-white text-[#1A1816] shadow-sm border border-[#E7E4DC]'
                  : 'text-[#736F69] hover:text-[#1A1816]'
              }`}
            >
              Chatbot de IA
            </button>
          </div>

          {/* Spacer on right for symmetry with close button */}
          <div className="w-8 hidden sm:block"></div>
        </div>

        {/* 30 Days Guarantee Banner (Exact replica of green banner in print) */}
        <div className="mb-6 px-4 py-3 rounded-2xl bg-[#EBF7F0] border border-[#CDEED7] flex items-center justify-center gap-2.5 text-center sm:text-left">
          <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
            <Check className="w-3.5 h-3.5 stroke-[3]" />
          </div>
          <div className="text-xs text-emerald-950">
            <strong>30 dias para decidir — ou seu dinheiro de volta</strong>{' '}
            <span className="opacity-80 block sm:inline">
              Experimente o {BRAND.name.toLowerCase()} sem riscos. Reembolso total em até 30 dias.
            </span>
          </div>
        </div>

        {/* 3 Columns Plan Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          {/* ========================================================
              CARD 1: SOLO
             ======================================================== */}
          <div className="bg-white rounded-2xl border border-[#E7E4DC] p-6 flex flex-col justify-between hover:border-[#D0CBC0] transition-colors relative">
            <div>
              <h3 className="text-2xl font-bold text-[#1A1816]">{currentPlans.solo.name}</h3>
              <p className="text-xs text-[#736F69] mt-1">{currentPlans.solo.tagline}</p>

              {/* 30% OFF Promo Badge */}
              <div className="mt-6 flex items-center gap-1.5 text-[11px] font-bold text-[#C84B1F] uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>30% A MENOS NOS 3 PRIMEIROS MESES</span>
              </div>

              {/* Price Area */}
              <div className="mt-2">
                <div className="flex items-baseline gap-2">
                  <span className="line-through text-sm text-[#A6A29A]">
                    {isYearly ? currentPlans.solo.oldPriceYearly : currentPlans.solo.oldPriceMonthly}
                  </span>
                  <span className="text-3xl font-extrabold text-[#1A1816]">
                    R$ {isYearly ? currentPlans.solo.priceYearly : currentPlans.solo.priceMonthly}
                  </span>
                  <span className="text-xs text-[#736F69]">/ mês</span>
                </div>
                <p className="text-[11px] text-[#8C8881] mt-1">
                  {isYearly ? currentPlans.solo.subtextYearly : currentPlans.solo.subtextMonthly}
                </p>
              </div>

              {/* Yearly toggle */}
              <div className="mt-4 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsYearly(!isYearly)}
                  className={`w-9 h-5 rounded-full transition-colors relative p-0.5 cursor-pointer ${
                    isYearly ? 'bg-[#C84B1F]' : 'bg-[#D0CBC0]'
                  }`}
                >
                  <span 
                    className={`block w-4 h-4 rounded-full bg-white transition-transform ${
                      isYearly ? 'translate-x-4' : 'translate-x-0'
                    }`}
                  />
                </button>
                <span className="text-xs text-[#5C5955]">cobrança anual</span>
                <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                  -20%
                </span>
              </div>

              {/* CTA Button */}
              <button
                onClick={() => handleSelectPlan('Solo')}
                className="w-full mt-6 py-2.5 rounded-xl border border-[#D0CBC0] hover:bg-[#FAF9F5] text-xs font-bold text-[#1A1816] transition-colors cursor-pointer"
              >
                Selecionar plano
              </button>

              {/* Features List */}
              <div className="mt-6 pt-5 border-t border-[#F0EDE8]">
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#8C8881] mb-3">
                  RECURSOS PRINCIPAIS
                </div>
                <ul className="space-y-2.5 text-xs text-[#5C5955]">
                  {currentPlans.solo.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <div className="w-4 h-4 rounded-full border border-[#D0CBC0] flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5 text-[#1A1816]" />
                      </div>
                      <div className="leading-tight">
                        <span className="text-[#1A1816] font-medium">{f.text}</span>
                        {f.detail && (
                          <span className="text-[11px] text-[#8C8881] block italic mt-0.5">{f.detail}</span>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* ========================================================
              CARD 2: TEAM (Nossa Recomendação - Destaque Terracota)
             ======================================================== */}
          <div className="bg-white rounded-2xl border-2 border-[#C84B1F] p-6 flex flex-col justify-between shadow-lg relative">
            {/* Top Badge: Nossa recomendação */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-[#C84B1F] text-white text-[11px] font-bold shadow-sm whitespace-nowrap">
              ☆ Nossa recomendação
            </div>

            <div>
              <h3 className="text-2xl font-bold text-[#1A1816]">{currentPlans.team.name}</h3>
              <p className="text-xs text-[#736F69] mt-1">{currentPlans.team.tagline}</p>

              {/* 30% OFF Promo Badge */}
              <div className="mt-6 flex items-center gap-1.5 text-[11px] font-bold text-[#C84B1F] uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>30% A MENOS NOS 3 PRIMEIROS MESES</span>
              </div>

              {/* Price Area */}
              <div className="mt-2">
                <div className="flex items-baseline gap-2">
                  <span className="line-through text-sm text-[#A6A29A]">
                    {isYearly ? currentPlans.team.oldPriceYearly : currentPlans.team.oldPriceMonthly}
                  </span>
                  <span className="text-3xl font-extrabold text-[#1A1816]">
                    R$ {isYearly ? currentPlans.team.priceYearly : currentPlans.team.priceMonthly}
                  </span>
                  <span className="text-xs text-[#736F69]">/ mês</span>
                </div>
                <p className="text-[11px] text-[#8C8881] mt-1">
                  {isYearly ? currentPlans.team.subtextYearly : currentPlans.team.subtextMonthly}
                </p>
              </div>

              {/* Yearly toggle */}
              <div className="mt-4 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsYearly(!isYearly)}
                  className={`w-9 h-5 rounded-full transition-colors relative p-0.5 cursor-pointer ${
                    isYearly ? 'bg-[#C84B1F]' : 'bg-[#D0CBC0]'
                  }`}
                >
                  <span 
                    className={`block w-4 h-4 rounded-full bg-white transition-transform ${
                      isYearly ? 'translate-x-4' : 'translate-x-0'
                    }`}
                  />
                </button>
                <span className="text-xs text-[#5C5955]">cobrança anual</span>
                <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                  -20%
                </span>
              </div>

              {/* CTA Button */}
              <button
                onClick={() => handleSelectPlan('Team')}
                className="w-full mt-6 py-2.5 rounded-xl bg-[#C84B1F] hover:bg-[#B34018] text-xs font-bold text-white transition-colors shadow-md cursor-pointer"
              >
                Selecionar plano
              </button>

              {/* Features List */}
              <div className="mt-6 pt-5 border-t border-[#F0EDE8]">
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#8C8881] mb-3">
                  RECURSOS PRINCIPAIS
                </div>
                <ul className="space-y-2.5 text-xs text-[#5C5955]">
                  {currentPlans.team.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <div className="w-4 h-4 rounded-full border border-[#C84B1F] bg-[#C84B1F]/10 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5 text-[#C84B1F] stroke-[2.5]" />
                      </div>
                      <div className="leading-tight">
                        <span className="text-[#1A1816] font-medium">{f.text}</span>
                        {f.detail && (
                          <span className="text-[11px] text-[#8C8881] block italic mt-0.5">{f.detail}</span>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* ========================================================
              CARD 3: SCALE
             ======================================================== */}
          <div className="bg-white rounded-2xl border border-[#E7E4DC] p-6 flex flex-col justify-between hover:border-[#D0CBC0] transition-colors relative">
            <div>
              <h3 className="text-2xl font-bold text-[#1A1816]">{currentPlans.scale.name}</h3>
              <p className="text-xs text-[#736F69] mt-1">{currentPlans.scale.tagline}</p>

              {/* Scale Price Label */}
              <div className="my-8">
                <span className="text-2xl font-extrabold text-[#1A1816]">
                  {currentPlans.scale.priceLabel}
                </span>
              </div>

              {/* 2 Buttons for Scale */}
              <div className="space-y-2 mt-4">
                <button
                  onClick={() => handleSelectPlan('Scale - Falar com vendas')}
                  className="w-full py-2.5 rounded-xl border border-[#D0CBC0] hover:bg-[#FAF9F5] text-xs font-bold text-[#1A1816] transition-colors cursor-pointer"
                >
                  Falar com vendas
                </button>
                <button
                  onClick={() => handleSelectPlan('Scale - Configurar plano')}
                  className="w-full py-2.5 rounded-xl border border-[#D0CBC0] hover:bg-[#FAF9F5] text-xs font-bold text-[#1A1816] transition-colors cursor-pointer"
                >
                  Configurar plano
                </button>
              </div>

              {/* Features List */}
              <div className="mt-6 pt-5 border-t border-[#F0EDE8]">
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#8C8881] mb-3">
                  RECURSOS PRINCIPAIS
                </div>
                <ul className="space-y-2.5 text-xs text-[#5C5955]">
                  {currentPlans.scale.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <div className="w-4 h-4 rounded-full border border-[#D0CBC0] flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5 text-[#1A1816]" />
                      </div>
                      <div className="leading-tight">
                        <span className="text-[#1A1816] font-medium">{f.text}</span>
                        {f.hasTooltip && (
                          <span className="inline-block ml-1 text-[#8C8881] text-[10px]">ⓘ</span>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Demo Button (Exact match: Reservar uma demonstração gratuita) */}
        <div className="mt-8 pt-4 border-t border-[#F0EDE8] flex justify-center">
          <button
            onClick={() => {
              if (onOpenDemo) onOpenDemo();
              else handleSelectPlan('Demonstração');
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#D0CBC0] hover:border-[#1A1816] bg-white text-xs font-bold text-[#1A1816] hover:bg-[#FAF9F5] transition-all shadow-sm cursor-pointer"
          >
            <User className="w-3.5 h-3.5 text-[#736F69]" />
            <span>Reservar uma demonstração gratuita</span>
          </button>
        </div>

      </div>
    </div>
  );
}
