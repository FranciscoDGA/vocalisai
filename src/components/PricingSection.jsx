import React, { useState, useEffect } from 'react';
import { 
  Check, X, Sparkles, ArrowRight, ShieldCheck, Phone, MessageCircle, 
  MessageSquare, Info, ChevronDown, ChevronUp, Clock, HelpCircle
} from 'lucide-react';
import { PRICING_CHANNELS, COMPARISON_SECTIONS } from '../data/pricingData';

export default function PricingSection({ onOpenAuth, onOpenDemo }) {
  const [selectedChannel, setSelectedChannel] = useState('telefone'); // 'telefone' | 'whatsapp' | 'webchat'
  const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' | 'yearly'
  
  // Dynamic countdown timer for the promo banner (starts at 02:29:40)
  const [timeLeft, setTimeLeft] = useState(8980); // seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 8980));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (seconds) => {
    const h = String(Math.floor(seconds / 3600)).padStart(2, '0');
    const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  const currentChannelData = PRICING_CHANNELS[selectedChannel];

  return (
    <section id="precos" className="py-24 bg-[#FAF9F5] border-t border-[#EBE8E2] font-sans selection:bg-[#C84B1F] selection:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ========================================================
            1. SECTION HEADER (Exact replica of user screenshot 1)
           ======================================================== */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-4xl sm:text-6xl font-normal text-[#1A1816] tracking-tight leading-[1.12]">
            Planos para cada{' '}
            <span className="font-serif-title italic text-[#C84B1F]">ritmo de conversa.</span>
          </h2>

          <div className="mt-4 inline-flex items-center gap-1.5 text-xs text-[#5C5955] bg-white border border-[#E7E4DC] px-4 py-1.5 rounded-full shadow-sm">
            <span>🛡️</span>
            <span>Em dias de pico: estenda com um pacote extra feito para você, até o fim da fatura atual, de R$ 70/h.</span>
          </div>
        </div>

        {/* ========================================================
            2. PROMO BANNER RIBBON (Exact replica of user print)
           ======================================================== */}
        <div className="max-w-4xl mx-auto mb-10">
          <div className="bg-[#11100F] text-white rounded-full px-4 sm:px-6 py-2.5 flex flex-col sm:flex-row items-center justify-between gap-2 shadow-xl text-xs sm:text-sm">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#C84B1F] text-white text-[11px] font-bold uppercase tracking-wider">
                Aproveite a promoção de lançamento
              </span>
              <span className="font-medium text-white/90 hidden md:inline">
                · <strong>30% A MENOS NA SUA PRIMEIRA FATURA</strong> nos 3 primeiros meses de uso.
              </span>
            </div>
            <div className="flex items-center gap-1.5 font-mono text-[#FF9E7D] font-bold shrink-0">
              <Clock className="w-3.5 h-3.5" />
              <span>EXPIRA EM {formatTimer(timeLeft)}</span>
            </div>
          </div>
        </div>

        {/* ========================================================
            3. TOP CHANNEL SWITCHER & BILLING TOGGLE (Screenshots 1-4)
           ======================================================== */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-[#EBE8E2]">
          
          {/* Channel Selector Pills */}
          <div className="inline-flex items-center p-1 bg-[#EBE8E2] rounded-2xl gap-1 text-xs sm:text-sm font-semibold">
            <button
              onClick={() => setSelectedChannel('telefone')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                selectedChannel === 'telefone'
                  ? 'bg-white text-[#1A1816] shadow-sm'
                  : 'text-[#5C5955] hover:text-[#1A1816]'
              }`}
            >
              <Phone className="w-4 h-4 text-[#C84B1F]" />
              <span>Assistente telefônico IA</span>
            </button>

            <button
              onClick={() => setSelectedChannel('whatsapp')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                selectedChannel === 'whatsapp'
                  ? 'bg-white text-[#1A1816] shadow-sm'
                  : 'text-[#5C5955] hover:text-[#1A1816]'
              }`}
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span>IA de WhatsApp</span>
            </button>

            <button
              onClick={() => setSelectedChannel('webchat')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                selectedChannel === 'webchat'
                  ? 'bg-white text-[#1A1816] shadow-sm'
                  : 'text-[#5C5955] hover:text-[#1A1816]'
              }`}
            >
              <MessageSquare className="w-4 h-4 text-[#3B82F6]" />
              <span>Webchat de IA</span>
            </button>
          </div>

          {/* Monthly / Yearly Toggle */}
          <div className="inline-flex items-center p-1 bg-[#EBE8E2] rounded-xl text-xs sm:text-sm font-bold">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-1.5 rounded-lg transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-white text-[#1A1816] shadow-sm'
                  : 'text-[#736F69] hover:text-[#1A1816]'
              }`}
            >
              Mensal
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-4 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                billingCycle === 'yearly'
                  ? 'bg-white text-[#1A1816] shadow-sm'
                  : 'text-[#736F69] hover:text-[#1A1816]'
              }`}
            >
              <span>Anual</span>
              <span className="text-[11px] font-bold text-[#C84B1F]">
                -20%
              </span>
            </button>
          </div>

        </div>

        {/* ========================================================
            4. PRICING CARDS GRID (Solo, Team, Scale)
           ======================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch mb-12">
          {currentChannelData.plans.map((plan) => {
            const isHighlight = plan.highlight;
            const priceRegular = billingCycle === 'yearly' ? plan.priceRegularYearly : plan.priceRegularMonthly;
            const pricePromo = billingCycle === 'yearly' ? plan.pricePromoYearly : plan.pricePromoMonthly;

            return (
              <div
                key={plan.id}
                className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all bg-white relative ${
                  isHighlight
                    ? 'border-2 border-[#C84B1F] shadow-2xl scale-[1.02] ring-4 ring-[#C84B1F]/5'
                    : 'border border-[#E7E4DC] shadow-lg'
                }`}
              >
                {/* Badge Mais Escolhido */}
                {plan.badge && (
                  <div className="absolute -top-3.5 right-6 px-3.5 py-1 rounded-full bg-[#E88E23] text-white text-[10px] font-bold uppercase tracking-wider shadow">
                    {plan.badge}
                  </div>
                )}

                <div>
                  {/* Plan Name & Tagline */}
                  <h3 className="text-3xl font-serif-title font-normal text-[#1A1816] mb-1">
                    {plan.name}
                  </h3>
                  <p className="text-xs text-[#736F69] mb-4">
                    {plan.tagline}
                  </p>

                  {/* 30% Promo Tag */}
                  <div className="flex items-center gap-1 text-[11px] font-bold text-[#C84B1F] mb-3">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>30% A MENOS NOS 3 PRIMEIROS MESES</span>
                  </div>

                  {/* Price display with crossed-out regular price */}
                  <div className="mb-4">
                    <div className="flex items-baseline gap-2">
                      {plan.prefixText && (
                        <span className="text-xs text-[#736F69] font-medium">{plan.prefixText}</span>
                      )}
                      <span className="text-base text-[#8C8881] line-through font-medium">
                        R${priceRegular.toLocaleString('pt-BR')}
                      </span>
                      <span className="text-3xl sm:text-4xl font-extrabold text-[#1A1816] tracking-tight">
                        R${pricePromo.toLocaleString('pt-BR')}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#736F69] mt-1">
                      Por mês nos 3 primeiros meses · {plan.afterPromoText}
                    </p>
                  </div>

                  {/* CTA Button */}
                  <div className="my-6">
                    <button
                      onClick={onOpenAuth}
                      className={`w-full py-3 rounded-full text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5 ${
                        isHighlight
                          ? 'bg-[#C84B1F] text-white hover:bg-[#B33E15]'
                          : 'bg-[#11100F] text-white hover:bg-black'
                      }`}
                    >
                      <span>{plan.cta}</span>
                      <ArrowRight className="w-3.5 h-3.5 opacity-80" />
                    </button>
                  </div>

                  {/* Incluído */}
                  <div className="pt-4 border-t border-[#EBE8E2] space-y-3">
                    <span className="text-xs font-bold text-[#1A1816] block">
                      Incluído
                    </span>
                    <ul className="space-y-2 text-xs text-[#4A4744]">
                      {plan.included.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-[#C84B1F] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Funcionalidades */}
                  <div className="pt-4 mt-4 border-t border-[#EBE8E2] space-y-3">
                    <span className="text-xs font-bold text-[#1A1816] block">
                      Funcionalidades
                    </span>
                    <ul className="space-y-2 text-xs text-[#4A4744]">
                      {plan.features.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-[#C84B1F] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Talk to us link */}
        <div className="text-center mb-24">
          <button 
            onClick={onOpenDemo}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#1A1816] hover:text-[#C84B1F] transition-colors border border-[#E0DCD4] bg-white px-5 py-2.5 rounded-full shadow-sm"
          >
            <span>Ficou em dúvida? Converse com a gente</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* ========================================================
            5. FULL COMPARISON TABLE (Exact replica of Screenshot 1)
           ======================================================== */}
        <div className="bg-white rounded-3xl border border-[#E7E4DC] shadow-xl p-6 sm:p-10 mb-20 overflow-x-auto">
          
          <div className="text-center max-w-xl mx-auto mb-10">
            <h3 className="text-2xl sm:text-3xl font-bold text-[#1A1816]">
              Comparar planos do Assistente telefônico IA
            </h3>
          </div>

          {/* Sticky Header Row */}
          <div className="min-w-[650px]">
            <div className="grid grid-cols-4 pb-4 border-b border-[#EBE8E2] text-xs font-bold text-[#1A1816] sticky top-16 bg-white z-20">
              <div className="col-span-1 text-sm font-bold text-[#736F69]">Recursos</div>
              
              <div className="col-span-1 text-center space-y-1">
                <div className="text-sm font-bold">Solo</div>
                <div className="text-[11px] text-[#736F69]">a partir de R$ 503 / mês</div>
                <button 
                  onClick={onOpenAuth}
                  className="px-3 py-1 rounded-full border border-[#D0CBC0] text-[11px] font-bold text-[#1A1816] hover:bg-[#FAF9F5]"
                >
                  Começar agora
                </button>
              </div>

              <div className="col-span-1 text-center space-y-1">
                <div className="text-sm font-bold text-[#C84B1F]">Team</div>
                <div className="text-[11px] text-[#736F69]">a partir de R$ 1.511 / mês</div>
                <button 
                  onClick={onOpenAuth}
                  className="px-3 py-1 rounded-full bg-[#11100F] text-[11px] font-bold text-white hover:bg-black"
                >
                  Começar agora
                </button>
              </div>

              <div className="col-span-1 text-center space-y-1">
                <div className="text-sm font-bold">Scale</div>
                <div className="text-[11px] text-[#736F69]">a partir de R$ 2.519 / mês</div>
                <button 
                  onClick={onOpenDemo}
                  className="px-3 py-1 rounded-full border border-[#D0CBC0] text-[11px] font-bold text-[#1A1816] hover:bg-[#FAF9F5]"
                >
                  Configurar plano
                </button>
              </div>
            </div>

            {/* Sections */}
            <div className="divide-y divide-[#EBE8E2]">
              {COMPARISON_SECTIONS.map((sec, secIdx) => (
                <div key={secIdx} className="pt-6 pb-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#C84B1F] mb-3 flex items-center gap-1.5">
                    <span>{sec.category}</span>
                  </div>

                  <div className="divide-y divide-[#F5F2EB] text-xs">
                    {sec.items.map((item, itemIdx) => (
                      <div key={itemIdx} className="grid grid-cols-4 py-2.5 items-center hover:bg-[#FAF9F5] transition-colors rounded-lg px-2">
                        <div className="col-span-1 font-medium text-[#1A1816] pr-2">
                          {item.name}
                        </div>

                        {/* Solo column */}
                        <div className="col-span-1 text-center text-[#5C5955]">
                          {typeof item.solo === 'boolean' ? (
                            item.solo ? (
                              <Check className="w-4 h-4 text-[#C84B1F] mx-auto" />
                            ) : (
                              <X className="w-3.5 h-3.5 text-[#A6A29A] mx-auto" />
                            )
                          ) : (
                            <span>{item.solo}</span>
                          )}
                        </div>

                        {/* Team column */}
                        <div className="col-span-1 text-center text-[#1A1816] font-semibold">
                          {typeof item.team === 'boolean' ? (
                            item.team ? (
                              <Check className="w-4 h-4 text-[#C84B1F] mx-auto" />
                            ) : (
                              <X className="w-3.5 h-3.5 text-[#A6A29A] mx-auto" />
                            )
                          ) : (
                            <span>{item.team}</span>
                          )}
                        </div>

                        {/* Scale column */}
                        <div className="col-span-1 text-center text-[#5C5955]">
                          {typeof item.scale === 'boolean' ? (
                            item.scale ? (
                              <Check className="w-4 h-4 text-[#C84B1F] mx-auto" />
                            ) : (
                              <X className="w-3.5 h-3.5 text-[#A6A29A] mx-auto" />
                            )
                          ) : (
                            <span>{item.scale}</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

        {/* ========================================================
            6. BOTTOM CTA CARD: "Comece pequeno. Cresça falando."
           ======================================================== */}
        <div className="rounded-3xl bg-[#11100F] p-8 sm:p-14 text-white text-center relative overflow-hidden shadow-2xl mb-16">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-[#C84B1F]/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <h3 className="text-3xl sm:text-5xl font-normal tracking-tight">
              Comece pequeno.{' '}
              <span className="font-serif-title italic text-[#FF9E7D]">Cresça falando.</span>
            </h3>
            <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
              Crie o seu assistente hoje mesmo e tenha o primeiro ativo ainda hoje. Você tem 30 dias para decidir.
            </p>

            <div className="pt-4">
              <button
                onClick={onOpenAuth}
                className="px-8 py-3.5 rounded-full bg-white text-[#11100F] text-xs sm:text-sm font-bold hover:bg-[#FAF9F5] transition-colors shadow-lg"
              >
                Criar assistente grátis
              </button>
            </div>
          </div>

          {/* Audio Waveform Graphic */}
          <div className="mt-8 pt-4 flex items-center justify-center gap-1 opacity-25">
            {[15, 30, 45, 20, 35, 60, 75, 50, 30, 70, 95, 65, 40, 80, 100, 70, 45, 30, 60, 85, 50, 25, 40, 20].map((h, i) => (
              <span 
                key={i} 
                style={{ height: `${h * 0.4}px` }} 
                className="w-1 bg-[#C84B1F] rounded-full"
              />
            ))}
          </div>
        </div>

        {/* ========================================================
            7. BOLD BRAND SLOGAN (Exact replica of user print)
           ======================================================== */}
        <div className="text-center py-10">
          <h2 className="text-4xl sm:text-6xl font-normal text-[#1A1816] tracking-tight leading-[1.12]">
            Toda empresa tem uma voz.<br />
            <span className="font-serif-title italic text-[#C84B1F]">A sua nunca mais fica em silêncio.</span>
          </h2>
        </div>

      </div>
    </section>
  );
}
