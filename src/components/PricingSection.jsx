import React, { useState } from 'react';
import {
  Check,
  X,
  ArrowRight,
  Phone,
  MessageCircle,
  MessageSquare,
  Clock,
  ShieldAlert,
  Info,
} from 'lucide-react';
import { COMMERCIAL_CATALOG, INFO_STATUS } from '../data/commercialCatalog';
import {
  getPlanCardViewModel,
  getChannelComparisonTable,
  getChannelOveragesBanner,
  getChannelAnnualAvailability,
  getChannelConfirmedPromoBanner,
  getChannelUsageTerms,
  getChannelLimitReachedPolicy,
} from '../utils/commercialCatalogUtils';

function StatusPill({ status, label }) {
  if (status === INFO_STATUS.CONFIRMADA) {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
        <Check className="w-3 h-3" />
        <span>{label || 'Confirmado'}</span>
      </span>
    );
  }
  if (status === INFO_STATUS.INDISPONIVEL) {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-stone-100 text-[#736F69] border border-[#E7E4DC]">
        <X className="w-3 h-3" />
        <span>{label || 'Indisponível'}</span>
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-amber-800 border border-amber-200">
      <Clock className="w-3 h-3" />
      <span>{label || 'Pendente de confirmação'}</span>
    </span>
  );
}

function renderFieldTextClass(status) {
  if (status === INFO_STATUS.CONFIRMADA) return 'text-[#1A1816] font-medium';
  if (status === INFO_STATUS.INDISPONIVEL) return 'text-[#8C8881]';
  return 'text-amber-800';
}

export default function PricingSection({ onOpenAuth, onOpenDemo, catalog = COMMERCIAL_CATALOG }) {
  const [selectedChannel, setSelectedChannel] = useState('telefone'); // 'telefone' | 'whatsapp' | 'webchat'
  const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' | 'yearly'

  const channelMeta = catalog.channels[selectedChannel];
  const annualAvailability = getChannelAnnualAvailability(selectedChannel, catalog);
  const effectiveCycle = annualAvailability.isConfirmedAvailable ? billingCycle : 'monthly';

  const cardViewModels = channelMeta.plans.map((plan) =>
    getPlanCardViewModel(selectedChannel, plan.id, effectiveCycle, catalog)
  );
  const comparisonTable = getChannelComparisonTable(selectedChannel, effectiveCycle, catalog);
  const overagesBannerText = getChannelOveragesBanner(selectedChannel, catalog);
  const promoBanner = getChannelConfirmedPromoBanner(selectedChannel, effectiveCycle, catalog);
  const usageTerms = getChannelUsageTerms(selectedChannel, catalog);
  const limitReachedPolicy = getChannelLimitReachedPolicy(selectedChannel, catalog);

  const annualDiscountBadge =
    effectiveCycle === 'yearly' || annualAvailability.isConfirmedAvailable
      ? cardViewModels.find((c) => {
          const annualSummary = getPlanCardViewModel(selectedChannel, c.id, 'yearly', catalog);
          return annualSummary?.pricing?.annualDiscountBadge;
        })
        ? getPlanCardViewModel(selectedChannel, cardViewModels[0].id, 'yearly', catalog)?.pricing
            ?.annualDiscountBadge
        : null
      : null;

  const handlePlanAction = (cta) => {
    if (cta?.action === 'checkout' && cta.url) {
      window.open(cta.url, '_blank', 'noopener,noreferrer');
      return;
    }
    if (onOpenDemo) {
      onOpenDemo();
    } else if (onOpenAuth) {
      onOpenAuth();
    }
  };

  return (
    <section
      id="precos"
      className="py-16 sm:py-24 bg-[#FAF9F5] border-t border-[#EBE8E2] font-sans selection:bg-[#4F46E5] selection:text-white overflow-hidden w-full max-w-full"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-full min-w-0">
        {/* 1. SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-4xl sm:text-6xl font-normal text-[#1A1816] tracking-tight leading-[1.12]">
            Planos para cada{' '}
            <span className="font-serif-title italic text-[#4F46E5]">ritmo de conversa.</span>
          </h2>

          {overagesBannerText && (
            <div className="mt-4 inline-flex items-center gap-2 text-xs text-[#5C5955] bg-white border border-[#E7E4DC] px-4 py-1.5 rounded-full shadow-sm">
              <ShieldAlert className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
              <span>{overagesBannerText}</span>
            </div>
          )}
        </div>

        {/* 2. PROMO OR OFFICIAL CATALOG BANNER */}
        <div className="max-w-4xl mx-auto mb-10">
          {promoBanner ? (
            <div
              data-testid="confirmed-promo-banner"
              className="bg-[#11100F] text-white rounded-2xl sm:rounded-full px-5 py-3 flex flex-col sm:flex-row items-center justify-between gap-2 shadow-xl text-xs sm:text-sm"
            >
              <div className="flex items-center gap-2 text-center sm:text-left flex-wrap justify-center sm:justify-start">
                <span className="px-2.5 py-0.5 rounded-full bg-[#4F46E5] text-white text-[11px] font-bold uppercase tracking-wider shrink-0">
                  {promoBanner.badgeLabel}
                </span>
                <span className="font-medium text-white/95">
                  {promoBanner.scopeLabel} · {promoBanner.afterPromoLabel}
                </span>
              </div>
              <span className="text-[11px] font-mono text-[#A5B4FC] shrink-0">
                {promoBanner.validUntilLabel}
              </span>
            </div>
          ) : (
            <div className="bg-[#11100F] text-white rounded-2xl sm:rounded-full px-5 py-3 flex flex-col sm:flex-row items-center justify-between gap-2 shadow-xl text-xs sm:text-sm">
              <div className="flex items-center gap-2 text-center sm:text-left">
                <span className="px-2.5 py-0.5 rounded-full bg-[#4F46E5] text-white text-[11px] font-bold uppercase tracking-wider shrink-0">
                  Catálogo Oficial
                </span>
                <span className="font-medium text-white/90">
                  Exibindo exclusivamente os recursos de {channelMeta.name}; itens não confirmados ficam sinalizados como pendentes.
                </span>
              </div>
              <span className="text-[11px] font-mono text-[#A5B4FC] shrink-0">
                {channelMeta.shortName}
              </span>
            </div>
          )}
        </div>

        {/* 3. TOP CHANNEL SWITCHER & BILLING TOGGLE */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-[#EBE8E2]">
          <div className="w-full sm:w-auto overflow-x-auto no-scrollbar flex items-center p-1 bg-[#EBE8E2] rounded-2xl gap-1 text-xs sm:text-sm font-semibold whitespace-nowrap">
            <button
              type="button"
              onClick={() => setSelectedChannel('telefone')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all cursor-pointer ${
                selectedChannel === 'telefone'
                  ? 'bg-white text-[#1A1816] shadow-sm'
                  : 'text-[#5C5955] hover:text-[#1A1816]'
              }`}
            >
              <Phone className="w-4 h-4 text-[#4F46E5]" />
              <span>{catalog.channels.telefone.name}</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedChannel('whatsapp')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all cursor-pointer ${
                selectedChannel === 'whatsapp'
                  ? 'bg-white text-[#1A1816] shadow-sm'
                  : 'text-[#5C5955] hover:text-[#1A1816]'
              }`}
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span>{catalog.channels.whatsapp.name}</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedChannel('webchat')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all cursor-pointer ${
                selectedChannel === 'webchat'
                  ? 'bg-white text-[#1A1816] shadow-sm'
                  : 'text-[#5C5955] hover:text-[#1A1816]'
              }`}
            >
              <MessageSquare className="w-4 h-4 text-[#3B82F6]" />
              <span>{catalog.channels.webchat.name}</span>
            </button>
          </div>

          {annualAvailability.isConfirmedAvailable ? (
            <div className="inline-flex items-center p-1 bg-[#EBE8E2] rounded-xl text-xs sm:text-sm font-bold">
              <button
                type="button"
                onClick={() => setBillingCycle('monthly')}
                className={`px-4 py-1.5 rounded-lg transition-all cursor-pointer ${
                  effectiveCycle === 'monthly'
                    ? 'bg-white text-[#1A1816] shadow-sm'
                    : 'text-[#736F69] hover:text-[#1A1816]'
                }`}
              >
                Mensal
              </button>
              <button
                type="button"
                onClick={() => setBillingCycle('yearly')}
                className={`px-4 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                  effectiveCycle === 'yearly'
                    ? 'bg-white text-[#1A1816] shadow-sm'
                    : 'text-[#736F69] hover:text-[#1A1816]'
                }`}
              >
                <span>Anual</span>
                {annualDiscountBadge && (
                  <span className="text-[11px] font-bold text-[#4F46E5]">
                    {annualDiscountBadge}
                  </span>
                )}
              </button>
            </div>
          ) : (
            <div
              data-testid="annual-unavailable-notice"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-[#E7E4DC] text-xs font-medium text-[#5C5955]"
            >
              <span className="font-bold text-[#1A1816]">Mensal</span>
              <span>·</span>
              <span>{annualAvailability.label}</span>
            </div>
          )}
        </div>

        {/* 4. PRICING CARDS GRID (Solo, Team, Scale) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch mb-12">
          {cardViewModels.map((card) => {
            const isHighlight = card.highlight;
            const { pricing } = card;

            return (
              <div
                key={`${card.channelId}-${card.id}`}
                data-testid={`plan-card-${card.channelId}-${card.id}`}
                className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all bg-white relative ${
                  isHighlight
                    ? 'border-2 border-[#4F46E5] shadow-2xl md:scale-[1.01] ring-4 ring-[#4F46E5]/5'
                    : 'border border-[#E7E4DC] shadow-lg'
                }`}
              >
                {card.badge && (
                  <div className="absolute -top-3.5 right-6 px-3.5 py-1 rounded-full bg-gradient-to-r from-[#4F46E5] to-[#6366F1] text-white text-[10px] font-bold uppercase tracking-wider shadow-md">
                    {card.badge}
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#736F69]">
                      {card.channelName}
                    </span>
                    <StatusPill status={pricing.status} label={pricing.statusLabel} />
                  </div>

                  <h3 className="text-3xl font-serif-title font-normal text-[#1A1816] mb-1">
                    {card.name}
                  </h3>
                  <p className="text-xs text-[#736F69] mb-4">{card.tagline}</p>

                  {pricing.hasActiveConfirmedPromo && (
                    <div className="mb-3 space-y-1">
                      <div className="text-[11px] font-bold text-[#4F46E5]">
                        {pricing.promoBadgeLabel}
                      </div>
                      <div className="text-[11px] text-[#5C5955]">
                        {pricing.promoScopeLabel} · {pricing.promoValidUntilLabel}
                      </div>
                    </div>
                  )}

                  {/* Price block */}
                  <div className="mb-4">
                    <div className="flex items-baseline gap-2 flex-wrap">
                      {pricing.regularPriceLabel && (
                        <span className="text-base text-[#8C8881] line-through font-medium">
                          {pricing.regularPriceLabel}
                        </span>
                      )}
                      <span className="text-2xl sm:text-3xl font-extrabold text-[#1A1816] tracking-tight">
                        {pricing.displayPrice}
                      </span>
                      {pricing.hasConfirmedPrice && (
                        <span className="text-xs text-[#736F69]">/mês</span>
                      )}
                    </div>
                    <p className="text-[11px] text-[#736F69] mt-1">
                      {pricing.afterPromoLabel}
                    </p>
                    {effectiveCycle === 'yearly' && pricing.annualChargeTypeLabel && (
                      <p className="text-[11px] text-[#4F46E5] font-medium mt-1">
                        {pricing.annualChargeTypeLabel}
                      </p>
                    )}
                  </div>

                  {/* CTA Button */}
                  <div className="my-6">
                    <button
                      type="button"
                      onClick={() => handlePlanAction(card.cta)}
                      className={`w-full py-3 rounded-full text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer ${
                        isHighlight
                          ? 'bg-[#4F46E5] text-white hover:bg-[#4338CA]'
                          : 'bg-[#11100F] text-white hover:bg-black'
                      }`}
                    >
                      <span>{card.cta.label}</span>
                      <ArrowRight className="w-3.5 h-3.5 opacity-80" />
                    </button>
                  </div>

                  {/* Uso incluído e definição (estrito do canal) */}
                  <div className="pt-4 border-t border-[#EBE8E2] space-y-2.5">
                    <span className="text-xs font-bold text-[#1A1816] block">
                      Uso incluído e unidade
                    </span>
                    <ul className="space-y-2 text-xs">
                      {card.includedRows.map((row) => (
                        <li key={row.key} className="flex flex-col gap-0.5 border-b border-[#F5F2EB] pb-1.5">
                          <span className="text-[11px] text-[#736F69]">{row.label}</span>
                          <span className={renderFieldTextClass(row.status)}>{row.text}</span>
                        </li>
                      ))}
                      <li className="flex flex-col gap-0.5 pb-1">
                        <span className="text-[11px] text-[#736F69]">{card.usageUnitDefinition.label}</span>
                        <span className={renderFieldTextClass(card.usageUnitDefinition.status)}>
                          {card.usageUnitDefinition.text}
                        </span>
                      </li>
                    </ul>
                  </div>

                  {/* Limites do canal */}
                  <div className="pt-4 mt-4 border-t border-[#EBE8E2] space-y-2.5">
                    <span className="text-xs font-bold text-[#1A1816] block">
                      Limites e capacidade
                    </span>
                    <ul className="space-y-2 text-xs">
                      {card.limitRows.map((row) => (
                        <li key={row.key} className="flex flex-col gap-0.5 border-b border-[#F5F2EB] pb-1.5 last:border-none">
                          <span className="text-[11px] text-[#736F69]">{row.label}</span>
                          <span className={renderFieldTextClass(row.status)}>{row.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Adicionais e excedentes: renderiza somente se houver custos confirmados */}
                  {card.visibleOverageRows.length > 0 && (
                    <div className="pt-4 mt-4 border-t border-[#EBE8E2] space-y-2.5">
                      <span className="text-xs font-bold text-[#1A1816] block">
                        Adicionais, excedentes e integrações
                      </span>
                      <ul className="space-y-2 text-xs">
                        {card.visibleOverageRows.map((row) => (
                          <li key={row.key} className="flex flex-col gap-0.5 border-b border-[#F5F2EB] pb-1.5 last:border-none">
                            <span className="text-[11px] text-[#736F69]">{row.label}</span>
                            <span className={renderFieldTextClass(row.status)}>{row.text}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Funcionalidades */}
                  <div className="pt-4 mt-4 border-t border-[#EBE8E2] space-y-2.5">
                    <span className="text-xs font-bold text-[#1A1816] block">
                      Funcionalidades incluídas
                    </span>
                    <ul className="space-y-2 text-xs">
                      {card.featureRows.map((feat) => (
                        <li key={feat.key} className="flex items-start justify-between gap-2">
                          <span className="text-[#4A4744]">{feat.label}</span>
                          <span className={`text-right shrink-0 ${renderFieldTextClass(feat.status)}`}>
                            {feat.text}
                          </span>
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
        <div className="text-center mb-16">
          <button
            type="button"
            onClick={onOpenDemo}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#1A1816] hover:text-[#4F46E5] transition-colors border border-[#E0DCD4] bg-white px-5 py-2.5 rounded-full shadow-sm cursor-pointer"
          >
            <span>Ficou em dúvida? Converse com a gente</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 5. FULL COMPARISON TABLE (100% espelhada para o canal selecionado) */}
        {comparisonTable && (
          <div
            data-testid="pricing-comparison-table"
            className="bg-white rounded-3xl border border-[#E7E4DC] shadow-xl p-4 sm:p-10 mb-12 overflow-hidden"
          >
            <div className="text-center max-w-xl mx-auto mb-6 sm:mb-10">
              <h3 className="text-2xl sm:text-3xl font-bold text-[#1A1816]">
                Comparar planos — {comparisonTable.channelName}
              </h3>
              <p className="sm:hidden text-[11px] text-[#8C8881] mt-2 flex items-center justify-center gap-1.5 font-medium">
                <span>Deslize a tabela para o lado para ver todos os planos</span>
              </p>
            </div>

            <div className="w-full max-w-full overflow-x-auto">
              <div className="min-w-[640px]">
                <div className="grid grid-cols-4 pb-4 border-b border-[#EBE8E2] text-xs font-bold text-[#1A1816] sticky top-16 bg-white z-20 gap-3">
                  <div className="col-span-1 text-sm font-bold text-[#736F69]">Critério</div>

                  {comparisonTable.columns.map((col) => (
                    <div key={col.id} className="col-span-1 text-center space-y-1.5">
                      <div className={`text-sm font-bold ${col.highlight ? 'text-[#4F46E5]' : ''}`}>
                        {col.name}
                      </div>
                      <div className="text-[11px] text-[#5C5955] font-semibold">
                        {col.pricing.regularPriceLabel && (
                          <span className="line-through text-[#8C8881] mr-1">
                            {col.pricing.regularPriceLabel}
                          </span>
                        )}
                        <span>
                          {col.pricing.displayPrice}
                          {col.pricing.hasConfirmedPrice ? '/mês' : ''}
                        </span>
                      </div>
                      {col.pricing.hasActiveConfirmedPromo && (
                        <div className="text-[10px] text-[#4F46E5] font-medium">
                          {col.pricing.promoScopeLabel} · {col.pricing.afterPromoLabel}
                        </div>
                      )}
                      <div>
                        <StatusPill status={col.pricing.status} label={col.pricing.statusLabel} />
                      </div>
                      <button
                        type="button"
                        onClick={() => handlePlanAction(col.cta)}
                        className={`px-3 py-1 rounded-full text-[11px] font-bold cursor-pointer ${
                          col.highlight
                            ? 'bg-[#11100F] text-white hover:bg-black'
                            : 'border border-[#D0CBC0] text-[#1A1816] hover:bg-[#FAF9F5]'
                        }`}
                      >
                        {col.cta.label}
                      </button>
                    </div>
                  ))}
                </div>

                <div className="divide-y divide-[#EBE8E2]">
                  {comparisonTable.sections.map((sec) => (
                    <div key={sec.category} className="pt-6 pb-2">
                      <div className="text-xs font-bold uppercase tracking-wider text-[#4F46E5] mb-3">
                        <span>{sec.category}</span>
                      </div>

                      <div className="divide-y divide-[#F5F2EB] text-xs">
                        {sec.items.map((item) => (
                          <div
                            key={item.key}
                            className="grid grid-cols-4 py-2.5 items-center hover:bg-[#FAF9F5] transition-colors rounded-lg px-2 gap-3"
                          >
                            <div className="col-span-1 font-medium text-[#1A1816] pr-2">
                              {item.name}
                            </div>

                            {['solo', 'team', 'scale'].map((planKey) => {
                              const cell = item[planKey];
                              return (
                                <div
                                  key={planKey}
                                  className={`col-span-1 text-center ${renderFieldTextClass(cell?.status)}`}
                                >
                                  <span>{cell?.text || 'Pendente de confirmação'}</span>
                                </div>
                              );
                            })}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 6. GLOSSÁRIO OFICIAL DE UNIDADES DO CANAL E REGRA DE LIMITE ATINGIDO */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <div
            data-testid="usage-terms-section"
            className={`bg-white rounded-3xl border border-[#E7E4DC] p-6 sm:p-8 shadow-sm ${
              limitReachedPolicy.isConfirmed ? '' : 'md:col-span-2'
            }`}
          >
            <div className="flex items-center gap-2 mb-4">
              <Info className="w-4 h-4 text-[#4F46E5]" />
              <h4 className="text-sm font-bold text-[#1A1816]">
                Definições de uso — {channelMeta.name}
              </h4>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {usageTerms.map((entry) => (
                <div
                  key={entry.key}
                  className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#EBE8E2] space-y-1.5"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-[#1A1816]">{entry.term}</span>
                    <StatusPill status={entry.status} />
                  </div>
                  <p className={`text-xs leading-relaxed ${renderFieldTextClass(entry.status)}`}>
                    {entry.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Só exibe regra de quando o limite acaba se estiver confirmada */}
          {limitReachedPolicy.isConfirmed && (
            <div
              data-testid="limit-reached-policy"
              className="bg-white rounded-3xl border border-[#E7E4DC] p-6 sm:p-8 shadow-sm space-y-3"
            >
              <div className="flex items-center justify-between gap-2">
                <h4 className="text-sm font-bold text-[#1A1816]">
                  O que acontece quando o limite acaba ({channelMeta.shortName})
                </h4>
                <StatusPill status={limitReachedPolicy.status} />
              </div>
              <p className="text-xs text-[#4A4744] leading-relaxed">
                {limitReachedPolicy.text}
              </p>
            </div>
          )}
        </div>

        {/* 7. BOTTOM CTA CARD */}
        <div className="rounded-3xl bg-[#11100F] p-8 sm:p-14 text-white text-center relative overflow-hidden shadow-2xl mb-16">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-[#4F46E5]/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <h3 className="text-3xl sm:text-5xl font-normal tracking-tight">
              Comece pequeno.{' '}
              <span className="font-serif-title italic text-[#A5B4FC]">Cresça falando.</span>
            </h3>
            <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
              Fale com nossa equipe para conhecer as condições vigentes e agendar uma demonstração.
            </p>

            <div className="pt-4">
              <button
                type="button"
                onClick={onOpenDemo || onOpenAuth}
                className="px-8 py-3.5 rounded-full bg-white text-[#11100F] text-xs sm:text-sm font-bold hover:bg-[#FAF9F5] transition-colors shadow-lg cursor-pointer"
              >
                Agendar demonstração
              </button>
            </div>
          </div>

          <div className="mt-8 pt-4 flex items-center justify-center gap-1 opacity-25">
            {[15, 30, 45, 20, 35, 60, 75, 50, 30, 70, 95, 65, 40, 80, 100, 70, 45, 30, 60, 85, 50, 25, 40, 20].map(
              (h, i) => (
                <span key={i} style={{ height: `${h * 0.4}px` }} className="w-1 bg-[#4F46E5] rounded-full" />
              )
            )}
          </div>
        </div>

        {/* 8. BRAND SLOGAN */}
        <div className="text-center py-10">
          <h2 className="text-4xl sm:text-6xl font-normal text-[#1A1816] tracking-tight leading-[1.12]">
            Toda empresa tem uma voz.
            <br />
            <span className="font-serif-title italic text-[#4F46E5]">Mais clareza e agilidade para o atendimento da sua empresa.</span>
          </h2>
        </div>
      </div>
    </section>
  );
}
