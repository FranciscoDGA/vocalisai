import { describe, it, expect } from 'vitest';
import {
  COMMERCIAL_CATALOG,
  INFO_STATUS,
  ANNUAL_CHARGE_TYPES,
  PROMOTION_BILLING_SCOPES,
  PRICING_ROUNDING_RULE,
  applyDiscountWithRounding,
  calculateEffectiveDiscountPercent,
  confirmedField,
  pendingField,
} from '../src/data/commercialCatalog';
import {
  formatCommercialField,
  getPlanPricingSummary,
  getPlanCardViewModel,
  getChannelComparisonTable,
  getChannelAnnualAvailability,
  getChannelUsageTerms,
  getChannelLimitReachedPolicy,
  getVisibleOverageRowDefsForChannel,
  getPromotionRuleSummary,
  getCommercialEntryLabel,
  buildBeatrizCommercialReply,
  buildRobertaCommercialReply,
  validateCommercialCatalog,
  validateCardComparisonParity,
  detectPendingShownAsFact,
} from '../src/utils/commercialCatalogUtils';

function cloneCatalog(source = COMMERCIAL_CATALOG) {
  return JSON.parse(JSON.stringify(source));
}

function createValidTelefoniaSoloPromo(catalog) {
  const solo = catalog.channels.telefone.plans[0];
  solo.status = INFO_STATUS.CONFIRMADA;
  solo.pricing.status = INFO_STATUS.CONFIRMADA;
  solo.pricing.regularMonthly = confirmedField(719);
  solo.pricing.promotionalMonthly = confirmedField(503);
  solo.pricing.promotion = {
    status: INFO_STATUS.CONFIRMADA,
    active: true,
    discountLabel: confirmedField('Condição promocional de entrada'),
    durationMonths: confirmedField(3),
    durationDescription: confirmedField('nos primeiros 3 meses'),
    billingScope: confirmedField(PROMOTION_BILLING_SCOPES.MESES_INICIAIS),
    stackingWithAnnualDiscount: confirmedField(false),
    validUntil: confirmedField('2026-12-31'),
  };
  solo.pricing.afterPromotion = {
    status: INFO_STATUS.CONFIRMADA,
    amountMonthly: confirmedField(719),
    billingMethod: confirmedField('Mensal recorrente no cartão'),
    description: confirmedField('Depois R$ 719/mês recorrente'),
  };
  solo.pricing.modalities.monthly = {
    status: INFO_STATUS.CONFIRMADA,
    available: confirmedField(true),
    billingCycle: 'mensal',
    checkoutUrl: confirmedField('https://pay.kiwify.com.br/exemplo-confirmado'),
  };
  solo.includedUsage.minutes = confirmedField('1.500 min/mês');
  solo.limits.simultaneousCalls = confirmedField('1 chamada simultânea');
  solo.limits.includedNumbers = confirmedField('1 número nacional');
  solo.limits.includedUsers = confirmedField('1 usuário');
  solo.limits.includedAssistants = confirmedField('4 assistentes');
  return solo;
}

describe('Fonte única de dados comerciais — validações estruturais e regras', () => {
  it('valida que COMMERCIAL_CATALOG oficial está estruturalmente íntegro e sem erros', () => {
    const result = validateCommercialCatalog(COMMERCIAL_CATALOG);
    expect(result.valid).toBe(true);
    expect(result.errors).toEqual([]);
  });

  it('confirma preços e modalidades anuais aprovadas mantendo limites, excedentes e termos pendentes até confirmação do proprietário', () => {
    const telSolo = COMMERCIAL_CATALOG.channels.telefone.plans.find((p) => p.id === 'solo');
    const waSolo = COMMERCIAL_CATALOG.channels.whatsapp.plans.find((p) => p.id === 'solo');
    const webSolo = COMMERCIAL_CATALOG.channels.webchat.plans.find((p) => p.id === 'solo');

    // Preços mensais e anuais confirmados sem acúmulo com promo de 3 meses
    expect(telSolo.pricing.promotionalMonthly.status).toBe(INFO_STATUS.CONFIRMADA);
    expect(telSolo.pricing.promotionalMonthly.value).toBe(503);
    expect(telSolo.pricing.regularMonthly.value).toBe(719);
    expect(telSolo.pricing.promotion.durationMonths.value).toBe(3);
    expect(telSolo.pricing.promotion.stackingWithAnnualDiscount.value).toBe(false);
    expect(telSolo.pricing.modalities.annual.regularMonthlyEquivalent.value).toBe(599);
    expect(telSolo.pricing.modalities.annual.totalAnnualAmount.value).toBe(7188);
    expect(telSolo.pricing.modalities.annual.discountPercentage.value).toBe(17);

    expect(waSolo.pricing.promotionalMonthly.value).toBe(349);
    expect(waSolo.pricing.regularMonthly.value).toBe(499);
    expect(waSolo.pricing.modalities.annual.regularMonthlyEquivalent.value).toBe(399);
    expect(waSolo.pricing.modalities.annual.totalAnnualAmount.value).toBe(4788);
    expect(waSolo.pricing.modalities.annual.discountPercentage.value).toBe(20);
    expect(waSolo.pricing.modalities.annual.promotionalMonthlyEquivalent.status).toBe(INFO_STATUS.INDISPONIVEL);

    expect(webSolo.pricing.promotionalMonthly.value).toBe(209);
    expect(webSolo.pricing.regularMonthly.value).toBe(299);
    expect(webSolo.pricing.modalities.annual.regularMonthlyEquivalent.value).toBe(249);
    expect(webSolo.pricing.modalities.annual.totalAnnualAmount.value).toBe(2988);
    expect(webSolo.pricing.modalities.annual.discountPercentage.value).toBe(17);

    // Plano completo segue PENDENTE enquanto franquias, excedentes e SLA não estão confirmados
    expect(telSolo.status).toBe(INFO_STATUS.PENDENTE);
    expect(waSolo.status).toBe(INFO_STATUS.PENDENTE);
    expect(webSolo.status).toBe(INFO_STATUS.PENDENTE);
  });

  it('valida regra de arredondamento, expiração de promoção e cálculo de total anual', () => {
    expect(PRICING_ROUNDING_RULE.description).toMatch(/inteiro.*mais próximo/i);
    expect(applyDiscountWithRounding(719, 30)).toBe(503);
    expect(applyDiscountWithRounding(499, 30)).toBe(349);
    expect(applyDiscountWithRounding(299, 30)).toBe(209);
    expect(calculateEffectiveDiscountPercent(719, 599)).toBe(17);
    expect(calculateEffectiveDiscountPercent(499, 399)).toBe(20);

    // Antes do fim da validade (2026-12-31), promoção ativa; após expiração, aplica valor padrão
    const waActive = getPlanPricingSummary('whatsapp', 'solo', 'monthly', COMMERCIAL_CATALOG, {
      referenceDate: '2026-12-31',
    });
    expect(waActive.hasActiveConfirmedPromo).toBe(true);
    expect(waActive.numericPrice).toBe(349);

    const waExpired = getPlanPricingSummary('whatsapp', 'solo', 'monthly', COMMERCIAL_CATALOG, {
      referenceDate: '2027-01-01',
    });
    expect(waExpired.hasActiveConfirmedPromo).toBe(false);
    expect(waExpired.numericPrice).toBe(499);

    // Modalidade anual de WhatsApp Solo não mistura "Assinatura mensal recorrente" nem R$ 349
    const waAnnual = getPlanPricingSummary('whatsapp', 'solo', 'yearly', COMMERCIAL_CATALOG);
    expect(waAnnual.numericPrice).toBe(399);
    expect(waAnnual.hasActiveConfirmedPromo).toBe(false);
    expect(waAnnual.totalAnnualLabel).toContain('4.788');
    expect(waAnnual.afterPromoLabel).toContain('Cobrança anual antecipada');
    expect(waAnnual.afterPromoLabel).not.toContain('Assinatura mensal recorrente');
  });

  it('garante definições por canal, política de limite atingido e modalidade anual coerentes', () => {
    const telTerms = getChannelUsageTerms('telefone', COMMERCIAL_CATALOG);
    const waTerms = getChannelUsageTerms('whatsapp', COMMERCIAL_CATALOG);
    const webTerms = getChannelUsageTerms('webchat', COMMERCIAL_CATALOG);

    expect(telTerms.map((t) => t.key)).toEqual(['minuto', 'ligacao']);
    expect(waTerms.map((t) => t.key)).toEqual(['conversa', 'mensagem']);
    expect(webTerms.map((t) => t.key)).toEqual(['conversa', 'mensagem']);

    ['telefone', 'whatsapp', 'webchat'].forEach((cid) => {
      expect(getChannelLimitReachedPolicy(cid, COMMERCIAL_CATALOG).isConfirmed).toBe(false);
      expect(getChannelAnnualAvailability(cid, COMMERCIAL_CATALOG).isConfirmedAvailable).toBe(true);
    });
    expect(getVisibleOverageRowDefsForChannel('telefone', COMMERCIAL_CATALOG).map((d) => d.key)).toEqual([
      'extraNumbers',
    ]);
    expect(getVisibleOverageRowDefsForChannel('whatsapp', COMMERCIAL_CATALOG).map((d) => d.key)).toEqual([
      'extraNumbers',
    ]);
    expect(getVisibleOverageRowDefsForChannel('webchat', COMMERCIAL_CATALOG)).toEqual([]);
  });

  it('detecta promoção sem data de validade, sem duração ou com conflito entre "primeira fatura" e meses', () => {
    const brokenNoDuration = cloneCatalog();
    const solo1 = createValidTelefoniaSoloPromo(brokenNoDuration);
    solo1.pricing.promotion.durationMonths = pendingField(3);

    const res1 = validateCommercialCatalog(brokenNoDuration);
    expect(res1.valid).toBe(false);
    expect(res1.errors.some((e) => e.code === 'PROMOTION_MISSING_DURATION')).toBe(true);

    const brokenNoDate = cloneCatalog();
    const solo2 = createValidTelefoniaSoloPromo(brokenNoDate);
    solo2.pricing.promotion.validUntil = pendingField(null);

    const res2 = validateCommercialCatalog(brokenNoDate);
    expect(res2.valid).toBe(false);
    expect(res2.errors.some((e) => e.code === 'PROMOTION_MISSING_VALID_UNTIL')).toBe(true);

    const brokenScopeMismatch = cloneCatalog();
    const solo3 = createValidTelefoniaSoloPromo(brokenScopeMismatch);
    solo3.pricing.promotion.billingScope = confirmedField(PROMOTION_BILLING_SCOPES.PRIMEIRA_FATURA);
    solo3.pricing.promotion.durationMonths = confirmedField(3);

    const res3 = validateCommercialCatalog(brokenScopeMismatch);
    expect(res3.valid).toBe(false);
    expect(res3.errors.some((e) => e.code === 'PROMOTION_SCOPE_DURATION_MISMATCH')).toBe(true);

    // Regra consistente para "primeira_fatura" exige 1 ciclo
    solo3.pricing.promotion.durationMonths = confirmedField(1);
    expect(validateCommercialCatalog(brokenScopeMismatch).valid).toBe(true);
    expect(getPromotionRuleSummary(solo3)).toBe('Apenas na primeira fatura');
  });

  it('proíbe combinar desconto anual com promoção de 3 meses sem aprovação explícita', () => {
    const unapprovedStack = cloneCatalog();
    const solo = createValidTelefoniaSoloPromo(unapprovedStack);
    solo.pricing.modalities.annual.status = INFO_STATUS.CONFIRMADA;
    solo.pricing.modalities.annual.available = confirmedField(true);
    solo.pricing.modalities.annual.chargeType = confirmedField(ANNUAL_CHARGE_TYPES.ANTECIPADO);
    solo.pricing.modalities.annual.regularMonthlyEquivalent = confirmedField(600);
    solo.pricing.modalities.annual.promotionalMonthlyEquivalent = confirmedField(402);
    solo.pricing.modalities.annual.totalAnnualAmount = confirmedField(7200);
    solo.pricing.modalities.annual.discountPercentage = confirmedField(17);

    const resInvalid = validateCommercialCatalog(unapprovedStack);
    expect(resInvalid.valid).toBe(false);
    expect(resInvalid.errors.some((e) => e.code === 'PROMOTION_ANNUAL_STACKING_UNAPPROVED')).toBe(true);

    // Mesmo que alguém tente forçar no annual, sem stackingWithAnnualDiscount: true o summary anual não aplica promo mensal
    const annualSummaryBlocked = getPlanPricingSummary('telefone', 'solo', 'yearly', unapprovedStack);
    expect(annualSummaryBlocked.hasActiveConfirmedPromo).toBe(false);
    expect(annualSummaryBlocked.numericPrice).toBe(600);

    // Modelo aprovado sem combinação: anual cobra valor anual próprio, sem desconto promocional de 3 meses
    const nonStackingCatalog = cloneCatalog();
    const soloClean = createValidTelefoniaSoloPromo(nonStackingCatalog);
    soloClean.pricing.modalities.annual.status = INFO_STATUS.CONFIRMADA;
    soloClean.pricing.modalities.annual.available = confirmedField(true);
    soloClean.pricing.modalities.annual.chargeType = confirmedField(ANNUAL_CHARGE_TYPES.PARCELADO);
    soloClean.pricing.modalities.annual.regularMonthlyEquivalent = confirmedField(600);
    soloClean.pricing.modalities.annual.totalAnnualAmount = confirmedField(7200);

    expect(validateCommercialCatalog(nonStackingCatalog).valid).toBe(true);
    const annualSummaryClean = getPlanPricingSummary('telefone', 'solo', 'yearly', nonStackingCatalog);
    expect(annualSummaryClean.numericPrice).toBe(600);
    expect(annualSummaryClean.hasActiveConfirmedPromo).toBe(false);
    expect(annualSummaryClean.annualChargeTypeLabel).toBe('Cobrança anual parcelada');
  });

  it('detecta modalidade anual confirmada sem informar antecipado ou parcelado', () => {
    const brokenAnnual = cloneCatalog();
    const solo = brokenAnnual.channels.telefone.plans[0];
    solo.pricing.modalities.annual.status = INFO_STATUS.CONFIRMADA;
    solo.pricing.modalities.annual.available = confirmedField(true);
    solo.pricing.modalities.annual.chargeType = pendingField(null);
    solo.pricing.modalities.annual.regularMonthlyEquivalent = confirmedField(600);
    solo.pricing.modalities.annual.totalAnnualAmount = confirmedField(7200);

    const res = validateCommercialCatalog(brokenAnnual);
    expect(res.valid).toBe(false);
    expect(res.errors.some((e) => e.code === 'ANNUAL_MISSING_CHARGE_TYPE')).toBe(true);
  });

  it('detecta divergência de limite e vazamento de métricas entre canais', () => {
    ['telefone', 'whatsapp', 'webchat'].forEach((channelId) => {
      ['monthly', 'yearly'].forEach((cycle) => {
        const parity = validateCardComparisonParity(channelId, cycle, COMMERCIAL_CATALOG);
        expect(parity.valid).toBe(true);
        expect(parity.errors).toEqual([]);
      });
    });

    const tamperedTable = getChannelComparisonTable('telefone', 'monthly', COMMERCIAL_CATALOG);
    const simRow = tamperedTable.sections
      .flatMap((s) => s.items)
      .find((item) => item.key === 'simultaneousCalls');
    simRow.solo = { ...simRow.solo, status: INFO_STATUS.CONFIRMADA, text: '99 chamadas simultâneas (divergente)' };

    const brokenParity = validateCardComparisonParity(
      'telefone',
      'monthly',
      COMMERCIAL_CATALOG,
      tamperedTable
    );
    expect(brokenParity.valid).toBe(false);
    expect(brokenParity.errors.some((e) => e.code === 'CARD_COMPARISON_LIMIT_MISMATCH')).toBe(true);

    // Simula vazamento de "minutes" dentro da tabela de WhatsApp
    const leakedWhatsAppTable = getChannelComparisonTable('whatsapp', 'monthly', COMMERCIAL_CATALOG);
    leakedWhatsAppTable.sections[0].items.push({
      key: 'minutes',
      name: 'Minutos incluídos',
      solo: { status: INFO_STATUS.PENDENTE, text: 'Pendente de confirmação' },
      team: { status: INFO_STATUS.PENDENTE, text: 'Pendente de confirmação' },
      scale: { status: INFO_STATUS.PENDENTE, text: 'Pendente de confirmação' },
    });
    const leakCheck = validateCardComparisonParity(
      'whatsapp',
      'monthly',
      COMMERCIAL_CATALOG,
      leakedWhatsAppTable
    );
    expect(leakCheck.valid).toBe(false);
    expect(leakCheck.errors.some((e) => e.code === 'CHANNEL_MISMATCH_METRIC')).toBe(true);
  });

  it('nunca exibe campo pendente como fato nos helpers e detecta vazamentos quando simulados', () => {
    const telCard = getPlanCardViewModel('telefone', 'solo', 'monthly');
    expect(telCard.pricing.hasConfirmedPrice).toBe(true);
    expect(telCard.pricing.displayPrice).toContain('503');
    expect(telCard.pricing.isPlanFullyConfirmed).toBe(false);
    expect(telCard.pricing.readinessLabel).toContain('Sob validação');
    expect(formatCommercialField({ status: INFO_STATUS.PENDENTE, value: null, observedValue: 503 }).text).toBe(
      'Pendente de confirmação'
    );

    const helpersText = [
      getCommercialEntryLabel(),
      buildBeatrizCommercialReply('Qual o preço dos planos?'),
      buildRobertaCommercialReply(),
      JSON.stringify(getPlanPricingSummary('telefone', 'solo', 'monthly')),
      JSON.stringify(getPlanPricingSummary('whatsapp', 'solo', 'monthly')),
      JSON.stringify(getPlanPricingSummary('webchat', 'solo', 'monthly')),
    ].join(' | ');

    const cleanCheck = detectPendingShownAsFact(helpersText, COMMERCIAL_CATALOG);
    expect(cleanCheck.valid).toBe(true);
    expect(cleanCheck.violations).toEqual([]);

    const leakedCheck = detectPendingShownAsFact(
      'Plano Telefonia Solo na sua primeira fatura sem custo adicional.',
      COMMERCIAL_CATALOG
    );
    expect(leakedCheck.valid).toBe(false);
    expect(leakedCheck.violations.length).toBeGreaterThanOrEqual(1);
  });

  it('propaga alterações confirmadas na fonte única de forma idêntica para cartão, comparação, Beatriz e entrada', () => {
    const confirmedClone = cloneCatalog();
    createValidTelefoniaSoloPromo(confirmedClone);
    const solo = confirmedClone.channels.telefone.plans[0];
    solo.pricing.modalities.annual.status = INFO_STATUS.CONFIRMADA;
    solo.pricing.modalities.annual.available = confirmedField(true);
    solo.pricing.modalities.annual.chargeType = confirmedField(ANNUAL_CHARGE_TYPES.PARCELADO);
    solo.pricing.modalities.annual.regularMonthlyEquivalent = confirmedField(600);
    solo.pricing.modalities.annual.totalAnnualAmount = confirmedField(7200);
    solo.pricing.modalities.annual.discountPercentage = confirmedField(17);

    expect(validateCommercialCatalog(confirmedClone).valid).toBe(true);
    expect(validateCardComparisonParity('telefone', 'monthly', confirmedClone).valid).toBe(true);

    const card = getPlanCardViewModel('telefone', 'solo', 'monthly', confirmedClone);
    const table = getChannelComparisonTable('telefone', 'monthly', confirmedClone);
    const beatrizReply = buildBeatrizCommercialReply('preço telefone', confirmedClone);
    const robertaReply = buildRobertaCommercialReply(confirmedClone);
    const entryLabel = getCommercialEntryLabel('telefone', confirmedClone);
    const lowestEntryLabel = getCommercialEntryLabel(null, confirmedClone);

    expect(card.pricing.displayPrice).toMatch(/503/);
    expect(card.pricing.promoScopeLabel).toBe('Nos primeiros 3 meses');
    expect(table.columns[0].pricing.displayPrice).toBe(card.pricing.displayPrice);
    expect(beatrizReply).toContain('31/12/2026');
    expect(beatrizReply).toContain('719');
    expect(robertaReply).toContain('Webchat Solo');
    expect(robertaReply).toContain('209');
    expect(entryLabel).toContain('503');
    expect(lowestEntryLabel).toContain('Webchat Solo');
    expect(lowestEntryLabel).toContain('209');

    expect(detectPendingShownAsFact(beatrizReply, confirmedClone).valid).toBe(true);
    expect(detectPendingShownAsFact('Atendimentos ilimitados por 0 reais', confirmedClone).valid).toBe(false);
  });
});
