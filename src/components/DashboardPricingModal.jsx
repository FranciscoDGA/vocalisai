import React, { useState, useEffect } from 'react';
import { X, Check, Clock, User } from 'lucide-react';
import { COMMERCIAL_CATALOG, INFO_STATUS } from '../data/commercialCatalog';
import {
  getPlanCardViewModel,
  getChannelAnnualAvailability,
  getChannelAnnualToggleBadge,
  getChannelUsageTerms,
  getChannelLimitReachedPolicy,
} from '../utils/commercialCatalogUtils';

export default function DashboardPricingModal({
  isOpen,
  onClose,
  onOpenDemo,
  onSelectPlan,
  catalog = COMMERCIAL_CATALOG,
}) {
  const [activeChannel, setActiveChannel] = useState('telefone'); // 'telefone' | 'whatsapp' | 'webchat'
  const [isYearly, setIsYearly] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose?.();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const annualAvailability = getChannelAnnualAvailability(activeChannel, catalog);
  const billingCycle = annualAvailability.isConfirmedAvailable && isYearly ? 'yearly' : 'monthly';
  const channel = catalog.channels[activeChannel];
  const planCards = channel.plans.map((p) =>
    getPlanCardViewModel(activeChannel, p.id, billingCycle, catalog)
  );
  const usageTerms = getChannelUsageTerms(activeChannel, catalog);
  const limitReachedPolicy = getChannelLimitReachedPolicy(activeChannel, catalog);

  const annualDiscountBadge = annualAvailability.isConfirmedAvailable
    ? getChannelAnnualToggleBadge(activeChannel, catalog)
    : null;

  const handleSelectPlan = (card) => {
    if (card?.cta?.action === 'checkout' && card.cta.url) {
      window.open(card.cta.url, '_blank', 'noopener,noreferrer');
      return;
    }

    const selection = {
      channelId: card.channelId || activeChannel,
      channelName: card.channelName || channel.name,
      planId: card.id,
      planName: card.name,
      billingCycle: billingCycle === 'yearly' ? 'anual' : 'mensal',
      displayPrice: card.pricing?.displayPrice,
      totalAnnualLabel: card.pricing?.totalAnnualLabel,
      afterPromoLabel: card.pricing?.afterPromoLabel,
      billingPeriodicityLabel: card.pricing?.billingPeriodicityLabel,
    };

    if (onSelectPlan) {
      onClose?.();
      onSelectPlan(selection);
      return;
    }

    if (onOpenDemo) {
      onClose?.();
      onOpenDemo();
      return;
    }

    const periodText = billingCycle === 'yearly' ? 'Anual' : 'Mensal';
    const msg = `Olá! Gostaria de consultar as condições do plano ${card.name} (${card.channelName}) na modalidade ${periodText}.`;
    const url = `https://api.whatsapp.com/send?phone=5594984423948&text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Planos e condições comerciais"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-fadeIn overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-5xl w-full shadow-2xl border border-[#E7E4DC] p-6 sm:p-8 relative my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          aria-label="Fechar"
          onClick={onClose}
          className="absolute top-5 right-5 z-20 w-8 h-8 rounded-full bg-white hover:bg-[#FAF9F5] border border-[#E7E4DC] flex items-center justify-center text-[#736F69] hover:text-[#1A1816] transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header: Logo + Channel Switcher Pills */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 pt-1">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-[3px] h-5" aria-hidden="true">
              <span className="w-[3px] h-3.5 bg-[#4F46E5] rounded-full"></span>
              <span className="w-[3px] h-5 bg-[#4F46E5] rounded-full"></span>
              <span className="w-[3px] h-3 bg-[#4F46E5] rounded-full"></span>
            </div>
            <span className="text-xl font-bold tracking-tight text-[#1A1816]">
              Vocalis <span className="text-[#4F46E5]">AI</span>
            </span>
          </div>

          <div className="flex items-center p-1 rounded-full bg-[#FAF9F5] border border-[#E7E4DC]">
            <button
              type="button"
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
              type="button"
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
              type="button"
              onClick={() => setActiveChannel('webchat')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeChannel === 'webchat'
                  ? 'bg-white text-[#1A1816] shadow-sm border border-[#E7E4DC]'
                  : 'text-[#736F69] hover:text-[#1A1816]'
              }`}
            >
              Webchat / Chatbot de IA
            </button>
          </div>

          <div className="w-8 hidden sm:block"></div>
        </div>

        {/* Source notice */}
        <div className="mb-6 px-4 py-3 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center gap-2.5 text-center sm:text-left">
          <div className="w-5 h-5 rounded-full bg-amber-600 text-white flex items-center justify-center shrink-0">
            <Clock className="w-3.5 h-3.5" aria-hidden="true" />
          </div>
          <div className="text-xs text-amber-950">
            <strong>Fonte única de condições comerciais</strong>{' '}
            <span className="opacity-85 block sm:inline">
              Métricas exclusivas de {channel.name}; itens ainda não confirmados ficam sinalizados como pendentes (sem cobrança automática no site).
            </span>
          </div>
        </div>

        {/* Modality bar */}
        <div className="mb-5 flex items-center justify-center">
          {annualAvailability.isConfirmedAvailable ? (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#FAF9F5] border border-[#E7E4DC]">
              <span className="text-xs text-[#5C5955]">Mensal</span>
              <button
                type="button"
                aria-label="Alternar modalidade anual"
                aria-pressed={isYearly}
                onClick={() => setIsYearly(!isYearly)}
                className={`w-9 h-5 rounded-full transition-colors relative p-0.5 cursor-pointer ${
                  isYearly ? 'bg-[#4F46E5]' : 'bg-[#D0CBC0]'
                }`}
              >
                <span
                  className={`block w-4 h-4 rounded-full bg-white transition-transform ${
                    isYearly ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </button>
              <span className="text-xs text-[#5C5955]">Anual</span>
              {annualDiscountBadge && (
                <span className="px-1.5 py-0.5 rounded bg-indigo-50 text-[#4F46E5] text-[10px] font-bold">
                  {annualDiscountBadge}
                </span>
              )}
            </div>
          ) : (
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-xl bg-[#FAF9F5] border border-[#E7E4DC] text-xs text-[#5C5955]">
              <strong className="text-[#1A1816]">Mensal</strong>
              <span>·</span>
              <span>{annualAvailability.label}</span>
            </div>
          )}
        </div>

        {/* 3 Columns Plan Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {planCards.map((card) => {
            const { pricing } = card;
            return (
              <div
                key={card.id}
                className={`bg-white rounded-2xl p-6 flex flex-col justify-between transition-colors relative ${
                  card.highlight
                    ? 'border-2 border-[#4F46E5] shadow-lg'
                    : 'border border-[#E7E4DC] hover:border-[#D0CBC0]'
                }`}
              >
                {card.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-[#4F46E5] text-white text-[11px] font-bold shadow-sm whitespace-nowrap">
                    {card.badge}
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <h3 className="text-2xl font-bold text-[#1A1816]">{card.name}</h3>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        pricing.status === INFO_STATUS.CONFIRMADA && pricing.isPlanFullyConfirmed
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-amber-50 text-amber-800'
                      }`}
                    >
                      {pricing.readinessLabel}
                    </span>
                  </div>
                  <p className="text-xs text-[#736F69] mt-1">{card.tagline}</p>

                  {pricing.hasActiveConfirmedPromo && (
                    <div className="mt-4 text-[11px] font-bold text-[#4F46E5]">
                      {pricing.promoBadgeLabel} · {pricing.promoScopeLabel} ({pricing.promoValidUntilLabel})
                    </div>
                  )}

                  {/* Price Area */}
                  <div className="mt-4">
                    <div className="flex items-baseline gap-2 flex-wrap">
                      {pricing.regularPriceLabel && (
                        <span className="line-through text-sm text-[#A6A29A]">
                          {pricing.regularPriceLabel}
                        </span>
                      )}
                      <span className="text-2xl font-extrabold text-[#1A1816]">
                        {pricing.displayPrice}
                      </span>
                      {pricing.hasConfirmedPrice && (
                        <span className="text-xs text-[#736F69]">
                          {billingCycle === 'yearly' ? '/ mês (equiv. anual)' : '/ mês'}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-[#5C5955] mt-1">{pricing.afterPromoLabel}</p>
                    {billingCycle === 'yearly' && pricing.totalAnnualLabel && (
                      <p className="text-[11px] text-[#4F46E5] font-semibold mt-1">
                        Total anual antecipado (12 meses): {pricing.totalAnnualLabel}
                      </p>
                    )}
                    <p className="text-[10px] text-[#8C8881] mt-1">{pricing.renewalLabel}</p>
                  </div>

                  {/* CTA Button */}
                  <button
                    type="button"
                    onClick={() => handleSelectPlan(card)}
                    className={`w-full mt-6 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                      card.highlight
                        ? 'bg-[#4F46E5] hover:bg-[#4338CA] text-white shadow-md'
                        : 'border border-[#D0CBC0] hover:bg-[#FAF9F5] text-[#1A1816]'
                    }`}
                  >
                    {card.cta.label}
                  </button>

                  {/* Channel-scoped Usage & Limits List */}
                  <div className="mt-6 pt-5 border-t border-[#F0EDE8]">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-[#8C8881] mb-3">
                      USO E LIMITES ({channel.shortName})
                    </div>
                    <ul className="space-y-2 text-xs text-[#5C5955]">
                      {[...card.includedRows, ...card.limitRows, ...card.visibleOverageRows].map((row) => (
                        <li key={row.key} className="flex items-start gap-2">
                          <div className="w-4 h-4 rounded-full border border-[#D0CBC0] flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-2.5 h-2.5 text-[#1A1816]" aria-hidden="true" />
                          </div>
                          <div className="leading-tight">
                            <span className="text-[#1A1816] font-medium block">{row.label}</span>
                            <span className="text-[11px] text-[#736F69] block mt-0.5">{row.text}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Usage terms & limit-reached policy */}
        <div className="mt-6 pt-4 border-t border-[#F0EDE8] grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          {usageTerms.map((term) => (
            <div key={term.key} className="p-3 rounded-xl bg-[#FAF9F5] border border-[#E7E4DC]">
              <strong className="text-[#1A1816] block">{term.term}</strong>
              <span className="text-[11px] text-[#5C5955]">{term.text}</span>
            </div>
          ))}
          <div className="sm:col-span-2 p-3 rounded-xl bg-[#FAF9F5] border border-[#E7E4DC]">
            <strong className="text-[#1A1816] block">Quando o limite acaba</strong>
            <span className="text-[11px] text-[#5C5955]">{limitReachedPolicy.text}</span>
          </div>
        </div>

        {/* Bottom Bar: Demo Button */}
        <div className="mt-6 pt-4 border-t border-[#F0EDE8] flex justify-center">
          <button
            type="button"
            onClick={() => {
              if (onOpenDemo) {
                onClose?.();
                onOpenDemo();
              }
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#D0CBC0] hover:border-[#1A1816] bg-white text-xs font-bold text-[#1A1816] hover:bg-[#FAF9F5] transition-all shadow-sm cursor-pointer"
          >
            <User className="w-3.5 h-3.5 text-[#736F69]" aria-hidden="true" />
            <span>Reservar uma demonstração gratuita</span>
          </button>
        </div>
      </div>
    </div>
  );
}
