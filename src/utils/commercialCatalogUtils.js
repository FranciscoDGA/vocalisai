import {
  COMMERCIAL_CATALOG,
  INFO_STATUS,
  ANNUAL_CHARGE_TYPES,
  PROMOTION_BILLING_SCOPES,
} from '../data/commercialCatalog';

export const STATUS_LABELS = Object.freeze({
  [INFO_STATUS.CONFIRMADA]: 'Confirmado',
  [INFO_STATUS.PENDENTE]: 'Pendente de confirmação',
  [INFO_STATUS.INDISPONIVEL]: 'Indisponível',
});

export const CHANNEL_USAGE_ROW_DEFINITIONS = Object.freeze({
  telefone: [
    { key: 'minutes', label: 'Minutos incluídos', group: 'includedUsage' },
    { key: 'calls', label: 'Ligações incluídas', group: 'includedUsage' },
  ],
  whatsapp: [
    { key: 'conversations', label: 'Conversas incluídas', group: 'includedUsage' },
    { key: 'messages', label: 'Mensagens incluídas', group: 'includedUsage' },
  ],
  webchat: [
    { key: 'conversations', label: 'Conversas incluídas', group: 'includedUsage' },
    { key: 'messages', label: 'Mensagens incluídas', group: 'includedUsage' },
  ],
});

export const CHANNEL_LIMIT_ROW_DEFINITIONS = Object.freeze({
  telefone: [
    { key: 'simultaneousCalls', label: 'Chamadas simultâneas', group: 'limits' },
    { key: 'includedNumbers', label: 'Números de telefone incluídos', group: 'limits' },
    { key: 'includedUsers', label: 'Usuários incluídos', group: 'limits' },
    { key: 'includedAssistants', label: 'Assistentes incluídos', group: 'limits' },
  ],
  whatsapp: [
    { key: 'includedNumbers', label: 'Números de WhatsApp incluídos', group: 'limits' },
    { key: 'includedUsers', label: 'Usuários incluídos', group: 'limits' },
    { key: 'includedAssistants', label: 'Assistentes incluídos', group: 'limits' },
  ],
  webchat: [
    { key: 'includedUsers', label: 'Usuários incluídos', group: 'limits' },
    { key: 'includedAssistants', label: 'Assistentes / widgets incluídos', group: 'limits' },
  ],
});

export const CHANNEL_OVERAGE_ROW_DEFINITIONS = Object.freeze({
  telefone: [
    { key: 'extraUsage', label: 'Minutos excedentes', group: 'overagesAndAddons' },
    { key: 'extraNumbers', label: 'Números de telefone adicionais', group: 'overagesAndAddons' },
    { key: 'extraConnections', label: 'Conexões / integrações extras', group: 'overagesAndAddons' },
    { key: 'extraContacts', label: 'Contatos adicionais', group: 'overagesAndAddons' },
    { key: 'providerCosts', label: 'Custos de fornecedores de telefonia', group: 'overagesAndAddons' },
  ],
  whatsapp: [
    { key: 'extraUsage', label: 'Conversas / mensagens excedentes', group: 'overagesAndAddons' },
    { key: 'extraNumbers', label: 'Números de WhatsApp adicionais', group: 'overagesAndAddons' },
    { key: 'extraConnections', label: 'Integrações extras', group: 'overagesAndAddons' },
    { key: 'extraContacts', label: 'Contatos adicionais', group: 'overagesAndAddons' },
    { key: 'providerCosts', label: 'Custos de fornecedores / Meta', group: 'overagesAndAddons' },
  ],
  webchat: [
    { key: 'extraUsage', label: 'Conversas / mensagens excedentes', group: 'overagesAndAddons' },
    { key: 'extraConnections', label: 'Integrações extras', group: 'overagesAndAddons' },
    { key: 'extraContacts', label: 'Contatos adicionais', group: 'overagesAndAddons' },
    { key: 'providerCosts', label: 'Custos de fornecedores', group: 'overagesAndAddons' },
  ],
});

export const USAGE_ROW_DEFINITIONS = CHANNEL_USAGE_ROW_DEFINITIONS.telefone;
export const LIMIT_ROW_DEFINITIONS = CHANNEL_LIMIT_ROW_DEFINITIONS.telefone;
export const OVERAGE_ROW_DEFINITIONS = CHANNEL_OVERAGE_ROW_DEFINITIONS.telefone;

export function getStatusLabel(status) {
  return STATUS_LABELS[status] || STATUS_LABELS[INFO_STATUS.PENDENTE];
}

export function formatCurrencyBRL(amount) {
  if (typeof amount !== 'number' || !Number.isFinite(amount)) {
    return null;
  }
  const hasDecimals = Math.round(amount * 100) % 100 !== 0;
  return amount.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: hasDecimals ? 2 : 0,
    maximumFractionDigits: hasDecimals ? 2 : 0,
  });
}

export function formatCommercialField(field, options = {}) {
  const {
    pendingLabel = 'Pendente de confirmação',
    unavailableLabel = 'Indisponível',
    formatter = null,
  } = options;

  if (!field || typeof field !== 'object') {
    return {
      status: INFO_STATUS.PENDENTE,
      isConfirmed: false,
      isPending: true,
      isUnavailable: false,
      text: pendingLabel,
    };
  }

  if (field.status === INFO_STATUS.INDISPONIVEL) {
    return {
      status: INFO_STATUS.INDISPONIVEL,
      isConfirmed: false,
      isPending: false,
      isUnavailable: true,
      text: unavailableLabel,
    };
  }

  if (
    field.status === INFO_STATUS.CONFIRMADA &&
    field.value !== null &&
    field.value !== undefined &&
    field.value !== ''
  ) {
    let formattedText;
    if (typeof formatter === 'function') {
      formattedText = formatter(field.value);
    } else if (typeof field.value === 'boolean') {
      formattedText = field.value ? 'Incluído' : 'Não incluído';
    } else {
      formattedText = String(field.value);
    }
    return {
      status: INFO_STATUS.CONFIRMADA,
      isConfirmed: true,
      isPending: false,
      isUnavailable: false,
      text: formattedText,
    };
  }

  return {
    status: INFO_STATUS.PENDENTE,
    isConfirmed: false,
    isPending: true,
    isUnavailable: false,
    text: pendingLabel,
  };
}

export function isValidIsoDate(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }
  const [year, month, day] = value.split('-').map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  );
}

export function formatIsoDateBR(isoDate) {
  if (!isValidIsoDate(isoDate)) return null;
  const [year, month, day] = isoDate.split('-');
  return `${day}/${month}/${year}`;
}

export function canStackAnnualAndPromotion(plan) {
  const stackField = plan?.pricing?.promotion?.stackingWithAnnualDiscount;
  return stackField?.status === INFO_STATUS.CONFIRMADA && stackField.value === true;
}

export function getPromotionRuleSummary(plan) {
  const promo = plan?.pricing?.promotion;
  const durationMonths = promo?.durationMonths?.value;
  const billingScope = promo?.billingScope?.value;

  if (
    promo?.billingScope?.status !== INFO_STATUS.CONFIRMADA ||
    promo?.durationMonths?.status !== INFO_STATUS.CONFIRMADA ||
    typeof durationMonths !== 'number' ||
    durationMonths <= 0
  ) {
    return null;
  }

  if (billingScope === PROMOTION_BILLING_SCOPES.PRIMEIRA_FATURA) {
    return durationMonths === 1
      ? 'Apenas na primeira fatura'
      : `Apenas na primeira fatura (${durationMonths} ciclo)`;
  }

  if (billingScope === PROMOTION_BILLING_SCOPES.MESES_INICIAIS) {
    return durationMonths === 1
      ? 'No primeiro mês'
      : `Nos primeiros ${durationMonths} meses`;
  }

  return null;
}

export function isPromotionConfirmedAndValid(plan) {
  const promo = plan?.pricing?.promotion;
  const promoMonthly = plan?.pricing?.promotionalMonthly;
  const regularMonthly = plan?.pricing?.regularMonthly;
  const afterPromo = plan?.pricing?.afterPromotion;

  if (!promo || promo.status !== INFO_STATUS.CONFIRMADA || promo.active !== true) {
    return false;
  }
  if (
    promoMonthly?.status !== INFO_STATUS.CONFIRMADA ||
    typeof promoMonthly.value !== 'number' ||
    promoMonthly.value <= 0
  ) {
    return false;
  }
  if (
    regularMonthly?.status !== INFO_STATUS.CONFIRMADA ||
    typeof regularMonthly.value !== 'number' ||
    regularMonthly.value <= promoMonthly.value
  ) {
    return false;
  }
  if (
    promo.durationMonths?.status !== INFO_STATUS.CONFIRMADA ||
    typeof promo.durationMonths.value !== 'number' ||
    promo.durationMonths.value <= 0
  ) {
    return false;
  }
  if (
    promo.billingScope?.status !== INFO_STATUS.CONFIRMADA ||
    ![PROMOTION_BILLING_SCOPES.PRIMEIRA_FATURA, PROMOTION_BILLING_SCOPES.MESES_INICIAIS].includes(
      promo.billingScope.value
    )
  ) {
    return false;
  }
  if (
    promo.billingScope.value === PROMOTION_BILLING_SCOPES.PRIMEIRA_FATURA &&
    promo.durationMonths.value !== 1
  ) {
    return false;
  }
  if (promo.validUntil?.status !== INFO_STATUS.CONFIRMADA || !isValidIsoDate(promo.validUntil.value)) {
    return false;
  }
  if (
    !afterPromo ||
    afterPromo.status !== INFO_STATUS.CONFIRMADA ||
    afterPromo.amountMonthly?.status !== INFO_STATUS.CONFIRMADA ||
    typeof afterPromo.amountMonthly.value !== 'number' ||
    afterPromo.billingMethod?.status !== INFO_STATUS.CONFIRMADA ||
    !afterPromo.billingMethod.value
  ) {
    return false;
  }

  return true;
}

export function normalizeBillingCycle(billingCycle) {
  return billingCycle === 'yearly' || billingCycle === 'anual' ? 'anual' : 'mensal';
}

export function getChannelPlans(channelId, catalog = COMMERCIAL_CATALOG) {
  const channel = catalog?.channels?.[channelId];
  return Array.isArray(channel?.plans) ? channel.plans : [];
}

export function findPlan(channelId, planId, catalog = COMMERCIAL_CATALOG) {
  const channel = catalog?.channels?.[channelId];
  const plan = channel?.plans?.find((item) => item.id === planId) || null;
  return { channel, plan };
}

function formatAnnualChargeTypeValue(value) {
  if (value === ANNUAL_CHARGE_TYPES.ANTECIPADO) {
    return 'Cobrança anual antecipada';
  }
  if (value === ANNUAL_CHARGE_TYPES.PARCELADO) {
    return 'Cobrança anual parcelada';
  }
  return String(value);
}

export function getChannelAnnualAvailability(channelId, catalog = COMMERCIAL_CATALOG) {
  const plans = getChannelPlans(channelId, catalog);
  const confirmedPlans = plans.filter((plan) => {
    const annual = plan?.pricing?.modalities?.annual;
    return (
      annual?.status === INFO_STATUS.CONFIRMADA &&
      annual?.available?.status === INFO_STATUS.CONFIRMADA &&
      annual.available.value === true &&
      annual?.chargeType?.status === INFO_STATUS.CONFIRMADA &&
      [ANNUAL_CHARGE_TYPES.ANTECIPADO, ANNUAL_CHARGE_TYPES.PARCELADO].includes(annual.chargeType.value)
    );
  });

  if (confirmedPlans.length > 0) {
    return {
      isConfirmedAvailable: true,
      status: INFO_STATUS.CONFIRMADA,
      label: 'Modalidade anual confirmada',
    };
  }

  return {
    isConfirmedAvailable: false,
    status: INFO_STATUS.INDISPONIVEL,
    label: 'Modalidade anual ainda não disponível',
  };
}

export function getPlanPricingSummary(
  channelId,
  planId,
  billingCycle = 'monthly',
  catalog = COMMERCIAL_CATALOG
) {
  const cycle = normalizeBillingCycle(billingCycle);
  const { plan } = findPlan(channelId, planId, catalog);

  if (!plan) {
    return {
      status: INFO_STATUS.PENDENTE,
      statusLabel: getStatusLabel(INFO_STATUS.PENDENTE),
      cycle,
      hasConfirmedPrice: false,
      displayPrice: 'Sob consulta',
      numericPrice: null,
      regularPriceLabel: null,
      hasActiveConfirmedPromo: false,
      promoBadgeLabel: null,
      promoDurationLabel: null,
      promoScopeLabel: null,
      promoValidUntilLabel: null,
      afterPromoLabel: 'Condições após promoção pendentes de confirmação.',
      annualChargeTypeLabel:
        cycle === 'anual' ? 'Modalidade anual ainda não disponível' : null,
      annualDiscountBadge: null,
      checkoutUrl: null,
    };
  }

  const modalities = plan.pricing?.modalities || {};
  const isAnnual = cycle === 'anual';
  const modality = isAnnual ? modalities.annual : modalities.monthly;

  const isExplicitlyUnavailable =
    modality?.status === INFO_STATUS.INDISPONIVEL ||
    (modality?.available?.status === INFO_STATUS.CONFIRMADA && modality.available.value === false);

  if (isExplicitlyUnavailable) {
    return {
      status: INFO_STATUS.INDISPONIVEL,
      statusLabel: getStatusLabel(INFO_STATUS.INDISPONIVEL),
      cycle,
      hasConfirmedPrice: false,
      displayPrice: 'Indisponível nesta modalidade',
      numericPrice: null,
      regularPriceLabel: null,
      hasActiveConfirmedPromo: false,
      promoBadgeLabel: null,
      promoDurationLabel: null,
      promoScopeLabel: null,
      promoValidUntilLabel: null,
      afterPromoLabel: 'Modalidade indisponível para este plano.',
      annualChargeTypeLabel: isAnnual ? 'Modalidade anual ainda não disponível' : null,
      annualDiscountBadge: null,
      checkoutUrl: null,
    };
  }

  const basePromoValid = isPromotionConfirmedAndValid(plan);
  const allowPromoOnCycle = !isAnnual || canStackAnnualAndPromotion(plan);
  const promoActive = basePromoValid && allowPromoOnCycle;
  const regularMonthlyField = plan.pricing?.regularMonthly;
  const promoMonthlyField = plan.pricing?.promotionalMonthly;
  const afterPromo = plan.pricing?.afterPromotion;

  let annualChargeTypeLabel = null;
  let annualDiscountBadge = null;

  if (isAnnual) {
    const formattedCharge = formatCommercialField(modality?.chargeType, {
      formatter: formatAnnualChargeTypeValue,
    });
    annualChargeTypeLabel = formattedCharge.isConfirmed
      ? formattedCharge.text
      : 'Modalidade anual ainda não disponível';

    if (
      modality?.status === INFO_STATUS.CONFIRMADA &&
      modality?.discountPercentage?.status === INFO_STATUS.CONFIRMADA &&
      typeof modality.discountPercentage.value === 'number' &&
      modality.discountPercentage.value > 0
    ) {
      annualDiscountBadge = `-${modality.discountPercentage.value}%`;
    }
  }

  let numericPrice = null;
  let regularNumeric = null;

  if (isAnnual) {
    if (modality?.status === INFO_STATUS.CONFIRMADA) {
      if (
        promoActive &&
        modality.promotionalMonthlyEquivalent?.status === INFO_STATUS.CONFIRMADA &&
        typeof modality.promotionalMonthlyEquivalent.value === 'number'
      ) {
        numericPrice = modality.promotionalMonthlyEquivalent.value;
      } else if (
        modality.regularMonthlyEquivalent?.status === INFO_STATUS.CONFIRMADA &&
        typeof modality.regularMonthlyEquivalent.value === 'number'
      ) {
        numericPrice = modality.regularMonthlyEquivalent.value;
      }
      if (
        promoActive &&
        modality.regularMonthlyEquivalent?.status === INFO_STATUS.CONFIRMADA &&
        typeof modality.regularMonthlyEquivalent.value === 'number'
      ) {
        regularNumeric = modality.regularMonthlyEquivalent.value;
      }
    }
  } else {
    if (promoActive) {
      numericPrice = promoMonthlyField.value;
      regularNumeric = regularMonthlyField.value;
    } else if (
      regularMonthlyField?.status === INFO_STATUS.CONFIRMADA &&
      typeof regularMonthlyField.value === 'number'
    ) {
      numericPrice = regularMonthlyField.value;
      regularNumeric = regularMonthlyField.value;
    }
  }

  const hasConfirmedPrice = typeof numericPrice === 'number' && Number.isFinite(numericPrice);
  const checkoutField = modality?.checkoutUrl;
  const checkoutUrl =
    checkoutField?.status === INFO_STATUS.CONFIRMADA && typeof checkoutField.value === 'string'
      ? checkoutField.value
      : null;

  const promoBadgeField = formatCommercialField(plan.pricing?.promotion?.discountLabel);
  const promoBadgeLabel = promoActive
    ? promoBadgeField.isConfirmed
      ? promoBadgeField.text
      : 'Condição promocional confirmada'
    : null;

  const promoScopeLabel = promoActive ? getPromotionRuleSummary(plan) : null;
  const promoDurationLabel = promoScopeLabel;
  const promoValidUntilLabel = promoActive
    ? `Válida até ${formatIsoDateBR(plan.pricing.promotion.validUntil.value)}`
    : null;

  let afterPromoLabel = 'Preço e cobrança pós-promoção pendentes de confirmação.';
  if (promoActive) {
    const afterAmt = formatCurrencyBRL(afterPromo.amountMonthly.value);
    afterPromoLabel = `Depois ${afterAmt}/mês · ${afterPromo.billingMethod.value}`;
  } else if (hasConfirmedPrice && !isAnnual) {
    const billingField = formatCommercialField(afterPromo?.billingMethod, {
      pendingLabel: 'Forma de cobrança pendente de confirmação',
    });
    afterPromoLabel = `Valor normal confirmado · ${billingField.text}`;
  } else if (hasConfirmedPrice && isAnnual) {
    const totalAnnual = formatCommercialField(modality?.totalAnnualAmount, {
      formatter: formatCurrencyBRL,
      pendingLabel: 'Total anual pendente de confirmação',
    });
    afterPromoLabel = `${annualChargeTypeLabel} · Total anual: ${totalAnnual.text}`;
  } else if (isAnnual) {
    afterPromoLabel = 'Modalidade anual ainda não disponível.';
  }

  const effectiveStatus = hasConfirmedPrice ? INFO_STATUS.CONFIRMADA : INFO_STATUS.PENDENTE;

  return {
    status: effectiveStatus,
    statusLabel: getStatusLabel(effectiveStatus),
    cycle,
    hasConfirmedPrice,
    displayPrice: hasConfirmedPrice ? formatCurrencyBRL(numericPrice) : 'Sob consulta',
    numericPrice,
    regularPriceLabel:
      promoActive && typeof regularNumeric === 'number' && regularNumeric > numericPrice
        ? formatCurrencyBRL(regularNumeric)
        : null,
    hasActiveConfirmedPromo: promoActive && hasConfirmedPrice,
    promoBadgeLabel,
    promoDurationLabel,
    promoScopeLabel,
    promoValidUntilLabel,
    afterPromoLabel,
    annualChargeTypeLabel,
    annualDiscountBadge,
    checkoutUrl,
  };
}

export function getChannelConfirmedPromoBanner(
  channelId,
  billingCycle = 'monthly',
  catalog = COMMERCIAL_CATALOG
) {
  const plans = getChannelPlans(channelId, catalog);
  const summaries = plans
    .map((p) => ({
      planName: p.name,
      summary: getPlanPricingSummary(channelId, p.id, billingCycle, catalog),
    }))
    .filter((entry) => entry.summary.hasActiveConfirmedPromo);

  if (summaries.length === 0) return null;

  const first = summaries[0].summary;
  return {
    badgeLabel: first.promoBadgeLabel,
    scopeLabel: first.promoScopeLabel,
    validUntilLabel: first.promoValidUntilLabel,
    afterPromoLabel: first.afterPromoLabel,
  };
}

export function getChannelUsageTerms(channelId, catalog = COMMERCIAL_CATALOG) {
  const channel = catalog?.channels?.[channelId];
  const termKeys = Array.isArray(channel?.termKeys) ? channel.termKeys : [];
  const definitions = catalog?.usageTermDefinitions || {};

  return termKeys
    .map((key) => {
      const entry = definitions[key];
      if (!entry) return null;
      const formatted = formatCommercialField(entry.definition, {
        pendingLabel: 'Definição oficial pendente de confirmação.',
      });
      return {
        key: entry.key,
        term: entry.term,
        ...formatted,
      };
    })
    .filter(Boolean);
}

export function getAllUsageTerms(catalog = COMMERCIAL_CATALOG) {
  const definitions = catalog?.usageTermDefinitions || {};
  return Object.values(definitions).map((entry) => {
    const formatted = formatCommercialField(entry.definition, {
      pendingLabel: 'Definição oficial pendente de confirmação.',
    });
    return {
      key: entry.key,
      term: entry.term,
      channels: entry.channels || [],
      ...formatted,
    };
  });
}

export function getChannelLimitReachedPolicy(channelId, catalog = COMMERCIAL_CATALOG) {
  const channel = catalog?.channels?.[channelId];
  return formatCommercialField(channel?.limitReachedPolicy, {
    pendingLabel: 'Regra de limite atingido pendente de confirmação.',
  });
}

export function getVisibleOverageRowDefsForChannel(channelId, catalog = COMMERCIAL_CATALOG) {
  const defs = CHANNEL_OVERAGE_ROW_DEFINITIONS[channelId] || [];
  const plans = getChannelPlans(channelId, catalog);
  return defs.filter((def) =>
    plans.some((plan) => plan?.[def.group]?.[def.key]?.status === INFO_STATUS.CONFIRMADA)
  );
}

export function getPlanLimitRows(plan) {
  const defs = CHANNEL_LIMIT_ROW_DEFINITIONS[plan?.channelId] || LIMIT_ROW_DEFINITIONS;
  return defs.map((def) => {
    const formatted = formatCommercialField(plan?.[def.group]?.[def.key]);
    return {
      key: def.key,
      label: def.label,
      ...formatted,
    };
  });
}

export function getPlanIncludedRows(plan) {
  const defs = CHANNEL_USAGE_ROW_DEFINITIONS[plan?.channelId] || USAGE_ROW_DEFINITIONS;
  return defs.map((def) => {
    const formatted = formatCommercialField(plan?.[def.group]?.[def.key]);
    return {
      key: def.key,
      label: def.label,
      ...formatted,
    };
  });
}

export function getPlanOverageRows(plan) {
  const defs = CHANNEL_OVERAGE_ROW_DEFINITIONS[plan?.channelId] || OVERAGE_ROW_DEFINITIONS;
  return defs.map((def) => {
    const formatted = formatCommercialField(plan?.[def.group]?.[def.key]);
    return {
      key: def.key,
      label: def.label,
      ...formatted,
    };
  });
}

export function getPlanVisibleOverageRows(plan, catalog = COMMERCIAL_CATALOG) {
  const visibleDefs = getVisibleOverageRowDefsForChannel(plan?.channelId, catalog);
  return visibleDefs.map((def) => {
    const formatted = formatCommercialField(plan?.[def.group]?.[def.key], {
      pendingLabel: 'Sob confirmação',
    });
    return {
      key: def.key,
      label: def.label,
      ...formatted,
    };
  });
}

export function getPlanFeatureRows(plan) {
  if (!Array.isArray(plan?.features)) return [];
  return plan.features.map((feat) => {
    const formatted = formatCommercialField(feat);
    return {
      key: feat.key,
      category: feat.category,
      label: feat.label,
      ...formatted,
    };
  });
}

export function getPlanCardViewModel(
  channelId,
  planId,
  billingCycle = 'monthly',
  catalog = COMMERCIAL_CATALOG
) {
  const { channel, plan } = findPlan(channelId, planId, catalog);
  if (!channel || !plan) return null;

  const pricing = getPlanPricingSummary(channelId, planId, billingCycle, catalog);
  const badgeFormatted = formatCommercialField(plan.badge, { pendingLabel: null });
  const usageDefField = plan.usageUnitDefinition || channel.usageUnitDefinition?.definition;
  const usageUnitFormatted = formatCommercialField(usageDefField);

  return {
    channelId: channel.id,
    channelName: channel.name,
    channelShortName: channel.shortName,
    id: plan.id,
    name: plan.name,
    tagline: plan.tagline,
    highlight: Boolean(plan.highlight),
    status: plan.status,
    statusLabel: getStatusLabel(plan.status),
    badge: badgeFormatted.isConfirmed ? badgeFormatted.text : null,
    pricing,
    usageUnitDefinition: {
      unit: channel.usageUnitDefinition?.unit || 'unidade',
      label: channel.usageUnitDefinition?.label || 'Definição da unidade',
      ...usageUnitFormatted,
    },
    includedRows: getPlanIncludedRows(plan),
    limitRows: getPlanLimitRows(plan),
    overageRows: getPlanOverageRows(plan),
    visibleOverageRows: getPlanVisibleOverageRows(plan, catalog),
    featureRows: getPlanFeatureRows(plan),
    cta: {
      label: pricing.checkoutUrl ? `Selecionar ${plan.name}` : plan.cta?.label || 'Consultar condições',
      action: pricing.checkoutUrl ? 'checkout' : plan.cta?.action || 'demo',
      url: pricing.checkoutUrl,
    },
  };
}

export function getChannelComparisonTable(
  channelId,
  billingCycle = 'monthly',
  catalog = COMMERCIAL_CATALOG
) {
  const channel = catalog?.channels?.[channelId];
  if (!channel) return null;

  const cardViewModels = channel.plans.map((p) =>
    getPlanCardViewModel(channelId, p.id, billingCycle, catalog)
  );

  const buildRowGroup = (category, rowDefs, getter) => ({
    category,
    items: rowDefs.map((def) => {
      const cells = {};
      cardViewModels.forEach((card) => {
        const match = getter(card).find((row) => row.key === def.key);
        cells[card.id] = match || {
          key: def.key,
          label: def.label,
          status: INFO_STATUS.PENDENTE,
          text: getStatusLabel(INFO_STATUS.PENDENTE),
        };
      });
      return {
        key: def.key,
        name: def.label,
        solo: cells.solo,
        team: cells.team,
        scale: cells.scale,
      };
    }),
  });

  const usageDefs = CHANNEL_USAGE_ROW_DEFINITIONS[channelId] || [];
  const limitDefs = CHANNEL_LIMIT_ROW_DEFINITIONS[channelId] || [];
  const visibleOverageDefs = getVisibleOverageRowDefsForChannel(channelId, catalog);

  const usageSection = buildRowGroup('Uso incluído e unidade', usageDefs, (card) => card.includedRows);
  usageSection.items.push({
    key: 'usageUnitDefinition',
    name: channel.usageUnitDefinition?.label || 'Definição da unidade de uso',
    solo: cardViewModels.find((c) => c.id === 'solo')?.usageUnitDefinition,
    team: cardViewModels.find((c) => c.id === 'team')?.usageUnitDefinition,
    scale: cardViewModels.find((c) => c.id === 'scale')?.usageUnitDefinition,
  });

  const limitsSection = buildRowGroup('Limites e capacidade', limitDefs, (card) => card.limitRows);

  const sections = [usageSection, limitsSection];
  if (visibleOverageDefs.length > 0) {
    sections.push(
      buildRowGroup(
        'Adicionais, excedentes e integrações',
        visibleOverageDefs,
        (card) => card.visibleOverageRows
      )
    );
  }

  const featureCategories = [];
  const baseFeatures = cardViewModels[0]?.featureRows || [];
  baseFeatures.forEach((feat) => {
    let catObj = featureCategories.find((c) => c.category === feat.category);
    if (!catObj) {
      catObj = { category: feat.category, items: [] };
      featureCategories.push(catObj);
    }
    const cells = {};
    cardViewModels.forEach((card) => {
      const match = card.featureRows.find((r) => r.key === feat.key);
      cells[card.id] = match || {
        key: feat.key,
        label: feat.label,
        status: INFO_STATUS.PENDENTE,
        text: getStatusLabel(INFO_STATUS.PENDENTE),
      };
    });
    catObj.items.push({
      key: feat.key,
      name: feat.label,
      solo: cells.solo,
      team: cells.team,
      scale: cells.scale,
    });
  });

  sections.push(...featureCategories);

  return {
    channelId: channel.id,
    channelName: channel.name,
    columns: cardViewModels.map((card) => ({
      id: card.id,
      name: card.name,
      highlight: card.highlight,
      pricing: card.pricing,
      cta: card.cta,
    })),
    sections,
  };
}

export function getLowestConfirmedEntryPrice(channelId = null, catalog = COMMERCIAL_CATALOG) {
  const channelIds = channelId ? [channelId] : Object.keys(catalog?.channels || {});
  const prices = [];

  channelIds.forEach((cid) => {
    const plans = getChannelPlans(cid, catalog);
    plans.forEach((plan) => {
      const summary = getPlanPricingSummary(cid, plan.id, 'monthly', catalog);
      if (summary.hasConfirmedPrice && typeof summary.numericPrice === 'number') {
        prices.push(summary.numericPrice);
      }
    });
  });

  if (prices.length === 0) return null;
  return Math.min(...prices);
}

export function getCommercialEntryLabel(channelId = null, catalog = COMMERCIAL_CATALOG) {
  const lowest = getLowestConfirmedEntryPrice(channelId, catalog);
  if (typeof lowest === 'number') {
    return `A partir de ${formatCurrencyBRL(lowest)}/mês`;
  }
  return 'Condições sob consulta (pendente de confirmação)';
}

export function getCommercialCtaLabel(
  fallback = 'Consultar Planos e Condições',
  catalog = COMMERCIAL_CATALOG
) {
  const lowest = getLowestConfirmedEntryPrice(null, catalog);
  if (typeof lowest === 'number') {
    return `Começar a partir de ${formatCurrencyBRL(lowest)}/mês`;
  }
  return fallback;
}

export function getSimultaneousCallsSummary(channelId = 'telefone', catalog = COMMERCIAL_CATALOG) {
  const plans = getChannelPlans(channelId, catalog);
  const confirmed = plans
    .map((p) => formatCommercialField(p?.limits?.simultaneousCalls))
    .filter((f) => f.isConfirmed)
    .map((f) => f.text);

  if (confirmed.length > 0) {
    return `Conforme plano (${confirmed.join(', ')})`;
  }
  return 'Conforme plano contratado (limites em confirmação)';
}

export function getChannelOveragesBanner(channelId = 'telefone', catalog = COMMERCIAL_CATALOG) {
  const peak = formatCommercialField(catalog?.commercialExtras?.peakPackage);
  if (peak.isConfirmed) {
    return `Pacotes adicionais em dias de pico: ${peak.text}.`;
  }
  const plans = getChannelPlans(channelId, catalog);
  const firstConfirmedOverage = plans
    .map((p) => formatCommercialField(p?.overagesAndAddons?.extraUsage))
    .find((f) => f.isConfirmed);

  if (firstConfirmedOverage) {
    return `Uso excedente oficial: ${firstConfirmedOverage.text}.`;
  }
  return null;
}

export function getOnboardingConditionLabel(catalog = COMMERCIAL_CATALOG) {
  const field = formatCommercialField(catalog?.commercialExtras?.onboardingAssisted);
  if (field.isConfirmed) return field.text;
  return 'Consulte elegibilidade e condições de onboarding assistido com nossa equipe comercial.';
}

export function getVoiceCloningAvailabilityLabel(catalog = COMMERCIAL_CATALOG) {
  const field = formatCommercialField(catalog?.commercialExtras?.voiceCloning);
  if (field.isConfirmed) return field.text;
  return 'Disponibilidade e elegibilidade de voz personalizada por plano estão em confirmação comercial.';
}

export function getCommercialActivationOptionLabel(catalog = COMMERCIAL_CATALOG) {
  const field = formatCommercialField(catalog?.commercialExtras?.activationCondition);
  if (field.isConfirmed) return field.text;
  return 'Sim! Quero consultar planos e condições com a equipe';
}

export function getProviderCostSummary(channelId = 'telefone', catalog = COMMERCIAL_CATALOG) {
  const field = formatCommercialField(catalog?.commercialExtras?.providerCostsByChannel?.[channelId]);
  if (field.isConfirmed) return field.text;
  return 'Custos de provedores/tarifas conforme plano e fornecedor (pendente de confirmação)';
}

export function getOverageOrUnitCostHint(channelId = 'telefone', catalog = COMMERCIAL_CATALOG) {
  const entry = getLowestConfirmedEntryPrice(channelId, catalog);
  if (typeof entry === 'number') {
    return `Compare o custo dos planos confirmados da Vocalis (${formatCurrencyBRL(entry)}/mês iniciais) com o custo de atendimento manual.`;
  }
  return 'Compare a operação da Vocalis (valores e tarifas por minuto sob consulta, em confirmação) contra o custo de atendimento tradicional.';
}

export function getDashboardAddonPriceLabel(catalog = COMMERCIAL_CATALOG) {
  const field = formatCommercialField(catalog?.commercialExtras?.dashboardAddonsUnitPrice);
  if (field.isConfirmed) return field.text;
  return 'Sob consulta (em confirmação)';
}

export function getReferralCreditLabel(key, catalog = COMMERCIAL_CATALOG) {
  const field = formatCommercialField(catalog?.commercialExtras?.referralCredits?.[key]);
  if (field.isConfirmed) return field.text;
  return 'Em confirmação';
}

export function getAgencyPlanOptions(catalog = COMMERCIAL_CATALOG) {
  const plans = catalog?.commercialExtras?.agencyProgram?.subaccountPlans || [];
  return plans.map((item) => {
    const minutes = formatCommercialField(item.minutes);
    const price = formatCommercialField(item.monthlyPrice, { formatter: formatCurrencyBRL });
    const margin = formatCommercialField(item.suggestedMargin, { formatter: formatCurrencyBRL });
    return {
      id: item.id,
      name: item.name,
      minutesText: minutes.text,
      monthlyPriceText: price.text,
      suggestedMarginText: margin.text,
      optionLabel: price.isConfirmed
        ? `Plano ${item.name} (${minutes.text} · ${price.text})`
        : `Plano ${item.name} (franquia e condições em confirmação)`,
    };
  });
}

export function getAgencyProgramSummary(catalog = COMMERCIAL_CATALOG) {
  const agency = catalog?.commercialExtras?.agencyProgram;
  return {
    setupFee: formatCommercialField(agency?.setupFee, { formatter: formatCurrencyBRL }),
    monthlyManagementFee: formatCommercialField(agency?.monthlyManagementFee, { formatter: formatCurrencyBRL }),
    resaleMinutePrice: formatCommercialField(agency?.resaleMinutePrice),
    plans: getAgencyPlanOptions(catalog),
  };
}

export function getPartnerProgramSummary(catalog = COMMERCIAL_CATALOG) {
  const partner = catalog?.commercialExtras?.partnerProgram;
  return {
    commissionSummary: formatCommercialField(partner?.commissionSummary),
    sampleRevenue: formatCommercialField(partner?.sampleRevenue),
    tiers: (partner?.tiers || []).map((tier) => ({
      id: tier.id,
      name: tier.name,
      threshold: formatCommercialField(tier.threshold),
      commission: formatCommercialField(tier.commission),
    })),
  };
}

function summarizeChannelForAssistant(channelId, catalog) {
  const channel = catalog?.channels?.[channelId];
  if (!channel) return null;

  const confirmedPlans = channel.plans
    .map((plan) => ({
      plan,
      summary: getPlanPricingSummary(channelId, plan.id, 'monthly', catalog),
    }))
    .filter((item) => item.summary.hasConfirmedPrice);

  if (confirmedPlans.length === 0) {
    return `${channel.name}: condições comerciais e preços pendentes de confirmação`;
  }

  const parts = confirmedPlans.map(({ plan, summary }) => {
    if (summary.hasActiveConfirmedPromo) {
      return `${plan.name} a ${summary.displayPrice}/mês (${summary.promoScopeLabel}, ${summary.promoValidUntilLabel}; ${summary.afterPromoLabel})`;
    }
    return `${plan.name} a ${summary.displayPrice}/mês`;
  });

  return `${channel.name}: ${parts.join(' | ')}`;
}

export function buildBeatrizCommercialReply(userText = '', catalog = COMMERCIAL_CATALOG) {
  const lower = String(userText || '').toLowerCase();
  const channelEntries = ['telefone', 'whatsapp', 'webchat'].map((cid) => ({
    cid,
    text: summarizeChannelForAssistant(cid, catalog),
  }));

  const anyConfirmed = channelEntries.some(
    (entry) => entry.text && !entry.text.includes('pendentes de confirmação')
  );

  if (!anyConfirmed) {
    return 'Atuamos nos canais Telefonia (Solo, Team e Scale), WhatsApp (Solo, Team e Scale) e Webchat (Solo, Team e Scale). Os preços, condições promocionais, planos anuais, limites de uso e excedentes estão atualmente pendentes de confirmação oficial. Posso encaminhar seu atendimento para nossa equipe apresentar a proposta vigente.';
  }

  if (lower.includes('whatsapp') && !lower.includes('telefone') && !lower.includes('webchat')) {
    return `Condições confirmadas para IA de WhatsApp: ${channelEntries[1].text}. Itens sem valor confirmado são informados diretamente pela nossa equipe comercial.`;
  }

  if ((lower.includes('webchat') || lower.includes('chat') || lower.includes('site')) && !lower.includes('telefone')) {
    return `Condições confirmadas para Webchat de IA: ${channelEntries[2].text}. Itens sem valor confirmado são informados diretamente pela nossa equipe comercial.`;
  }

  if (lower.includes('telefone') || lower.includes('voz') || lower.includes('ligação') || lower.includes('ligacao')) {
    return `Condições confirmadas para Telefonia: ${channelEntries[0].text}. Itens sem valor confirmado são informados diretamente pela nossa equipe comercial.`;
  }

  const summary = channelEntries.map((e) => e.text).filter(Boolean).join('; ');
  return `Resumo comercial oficial da Vocalis AI — ${summary}. Qualquer condição não confirmada é apresentada sob consulta pela nossa equipe.`;
}

export function buildRobertaCommercialReply(catalog = COMMERCIAL_CATALOG) {
  const lowest = getLowestConfirmedEntryPrice(null, catalog);
  if (typeof lowest === 'number') {
    return `Nossos planos confirmados começam em ${formatCurrencyBRL(lowest)} por mês. Quer agendar uma demonstração rápida para ver qual canal atende melhor sua empresa?`;
  }
  return 'Atendemos por telefone, WhatsApp e Webchat nos perfis Solo, Team e Scale, com valores e condições sob consulta em confirmação. Quer agendar uma demonstração rápida de 15 minutos com nossa equipe?';
}

const VALID_STATUS_SET = new Set([
  INFO_STATUS.CONFIRMADA,
  INFO_STATUS.PENDENTE,
  INFO_STATUS.INDISPONIVEL,
]);

function checkTrackedField(errors, path, field, options = {}) {
  const { allowNullOnConfirmed = false } = options;
  if (!field || typeof field !== 'object') {
    errors.push({
      code: 'MISSING_FIELD',
      path,
      message: `Campo obrigatório ausente em ${path}.`,
    });
    return;
  }

  if (!VALID_STATUS_SET.has(field.status)) {
    errors.push({
      code: 'INVALID_STATUS',
      path,
      message: `Status inválido "${String(field.status)}" em ${path}. Esperado: confirmada, pendente ou indisponivel.`,
    });
    return;
  }

  if (field.status !== INFO_STATUS.CONFIRMADA && field.value !== null && field.value !== undefined) {
    errors.push({
      code: 'PENDING_FIELD_HAS_PUBLIC_VALUE',
      path,
      message: `Campo ${path} com status "${field.status}" não pode possuir value público (${String(field.value)}).`,
    });
  }

  if (
    field.status === INFO_STATUS.CONFIRMADA &&
    !allowNullOnConfirmed &&
    (field.value === null || field.value === undefined || field.value === '')
  ) {
    errors.push({
      code: 'CONFIRMED_FIELD_MISSING_VALUE',
      path,
      message: `Campo confirmado ${path} não possui valor definido.`,
    });
  }
}

export function validateCommercialCatalog(catalog = COMMERCIAL_CATALOG) {
  const errors = [];
  if (!catalog || typeof catalog !== 'object' || !catalog.channels) {
    errors.push({
      code: 'MISSING_CATALOG',
      path: 'catalog.channels',
      message: 'Catálogo comercial inválido ou sem canais definidos.',
    });
    return { valid: false, errors };
  }

  ['minuto', 'ligacao', 'conversa', 'mensagem'].forEach((termKey) => {
    const entry = catalog?.usageTermDefinitions?.[termKey];
    checkTrackedField(errors, `usageTermDefinitions.${termKey}.definition`, entry?.definition);
  });

  Object.entries(catalog.channels).forEach(([channelId, channel]) => {
    if (!channel?.name) {
      errors.push({
        code: 'MISSING_FIELD',
        path: `channels.${channelId}.name`,
        message: `Canal ${channelId} sem nome definido.`,
      });
    }

    checkTrackedField(
      errors,
      `channels.${channelId}.limitReachedPolicy`,
      channel?.limitReachedPolicy
    );

    checkTrackedField(
      errors,
      `channels.${channelId}.usageUnitDefinition.definition`,
      channel?.usageUnitDefinition?.definition
    );

    if (!Array.isArray(channel?.plans) || channel.plans.length === 0) {
      errors.push({
        code: 'MISSING_FIELD',
        path: `channels.${channelId}.plans`,
        message: `Canal ${channelId} não possui planos.`,
      });
      return;
    }

    channel.plans.forEach((plan) => {
      const pPath = `channels.${channelId}.plans.${plan?.id || 'unknown'}`;
      if (!plan?.name || !plan?.channelName) {
        errors.push({
          code: 'MISSING_FIELD',
          path: pPath,
          message: `Plano em ${pPath} sem nome de canal/plano.`,
        });
      }

      if (!VALID_STATUS_SET.has(plan?.status)) {
        errors.push({
          code: 'INVALID_STATUS',
          path: `${pPath}.status`,
          message: `Status inválido no plano ${pPath}.`,
        });
      }

      const regularMonthly = plan?.pricing?.regularMonthly;
      const promotionalMonthly = plan?.pricing?.promotionalMonthly;
      const promo = plan?.pricing?.promotion;
      const afterPromo = plan?.pricing?.afterPromotion;
      const monthlyModality = plan?.pricing?.modalities?.monthly;
      const annualModality = plan?.pricing?.modalities?.annual;

      checkTrackedField(errors, `${pPath}.pricing.regularMonthly`, regularMonthly);
      checkTrackedField(errors, `${pPath}.pricing.promotionalMonthly`, promotionalMonthly);
      checkTrackedField(errors, `${pPath}.pricing.promotion.durationMonths`, promo?.durationMonths);
      checkTrackedField(errors, `${pPath}.pricing.promotion.durationDescription`, promo?.durationDescription);
      checkTrackedField(errors, `${pPath}.pricing.promotion.billingScope`, promo?.billingScope);
      checkTrackedField(
        errors,
        `${pPath}.pricing.promotion.stackingWithAnnualDiscount`,
        promo?.stackingWithAnnualDiscount
      );
      checkTrackedField(errors, `${pPath}.pricing.promotion.validUntil`, promo?.validUntil);
      checkTrackedField(errors, `${pPath}.pricing.afterPromotion.amountMonthly`, afterPromo?.amountMonthly);
      checkTrackedField(errors, `${pPath}.pricing.afterPromotion.billingMethod`, afterPromo?.billingMethod);
      checkTrackedField(errors, `${pPath}.pricing.modalities.monthly.available`, monthlyModality?.available);
      checkTrackedField(errors, `${pPath}.pricing.modalities.monthly.checkoutUrl`, monthlyModality?.checkoutUrl);
      checkTrackedField(errors, `${pPath}.pricing.modalities.annual.available`, annualModality?.available);
      checkTrackedField(errors, `${pPath}.pricing.modalities.annual.chargeType`, annualModality?.chargeType);
      checkTrackedField(
        errors,
        `${pPath}.pricing.modalities.annual.regularMonthlyEquivalent`,
        annualModality?.regularMonthlyEquivalent
      );
      checkTrackedField(
        errors,
        `${pPath}.pricing.modalities.annual.totalAnnualAmount`,
        annualModality?.totalAnnualAmount
      );

      const promoClaimed =
        promo?.active === true ||
        promo?.status === INFO_STATUS.CONFIRMADA ||
        promotionalMonthly?.status === INFO_STATUS.CONFIRMADA;

      if (promoClaimed) {
        if (
          promo?.durationMonths?.status !== INFO_STATUS.CONFIRMADA ||
          typeof promo?.durationMonths?.value !== 'number' ||
          promo.durationMonths.value <= 0
        ) {
          errors.push({
            code: 'PROMOTION_MISSING_DURATION',
            path: `${pPath}.pricing.promotion.durationMonths`,
            message: `Promoção em ${pPath} ativa/confirmada sem duração definida em meses.`,
          });
        }

        const billingScopeVal = promo?.billingScope?.value;
        if (
          promo?.billingScope?.status !== INFO_STATUS.CONFIRMADA ||
          ![PROMOTION_BILLING_SCOPES.PRIMEIRA_FATURA, PROMOTION_BILLING_SCOPES.MESES_INICIAIS].includes(
            billingScopeVal
          )
        ) {
          errors.push({
            code: 'PROMOTION_SCOPE_DURATION_MISMATCH',
            path: `${pPath}.pricing.promotion.billingScope`,
            message: `Promoção em ${pPath} deve definir billingScope confirmado ('primeira_fatura' ou 'meses_iniciais').`,
          });
        } else if (
          billingScopeVal === PROMOTION_BILLING_SCOPES.PRIMEIRA_FATURA &&
          promo?.durationMonths?.value !== 1
        ) {
          errors.push({
            code: 'PROMOTION_SCOPE_DURATION_MISMATCH',
            path: `${pPath}.pricing.promotion`,
            message: `Promoção 'primeira_fatura' em ${pPath} é incompatível com durationMonths=${promo?.durationMonths?.value}.`,
          });
        }

        if (
          promo?.validUntil?.status !== INFO_STATUS.CONFIRMADA ||
          !isValidIsoDate(promo?.validUntil?.value)
        ) {
          errors.push({
            code: 'PROMOTION_MISSING_VALID_UNTIL',
            path: `${pPath}.pricing.promotion.validUntil`,
            message: `Promoção em ${pPath} ativa/confirmada sem data de validade ISO (YYYY-MM-DD) confirmada.`,
          });
        }

        if (
          afterPromo?.status !== INFO_STATUS.CONFIRMADA ||
          afterPromo?.amountMonthly?.status !== INFO_STATUS.CONFIRMADA ||
          afterPromo?.billingMethod?.status !== INFO_STATUS.CONFIRMADA
        ) {
          errors.push({
            code: 'PROMOTION_MISSING_AFTER_PROMO',
            path: `${pPath}.pricing.afterPromotion`,
            message: `Promoção em ${pPath} sem valor e forma de cobrança pós-promoção confirmados.`,
          });
        }

        if (
          promotionalMonthly?.status !== INFO_STATUS.CONFIRMADA ||
          regularMonthly?.status !== INFO_STATUS.CONFIRMADA ||
          typeof promotionalMonthly.value !== 'number' ||
          typeof regularMonthly.value !== 'number' ||
          promotionalMonthly.value >= regularMonthly.value
        ) {
          errors.push({
            code: 'PROMOTION_INVALID_PRICE',
            path: `${pPath}.pricing.promotionalMonthly`,
            message: `Promoção em ${pPath} exige preço promocional confirmado menor que o preço normal confirmado.`,
          });
        }
      }

      const annualConfirmed =
        annualModality?.status === INFO_STATUS.CONFIRMADA ||
        annualModality?.available?.value === true;

      if (annualConfirmed) {
        const chargeTypeValue = annualModality?.chargeType?.value;
        if (
          annualModality?.chargeType?.status !== INFO_STATUS.CONFIRMADA ||
          ![ANNUAL_CHARGE_TYPES.ANTECIPADO, ANNUAL_CHARGE_TYPES.PARCELADO].includes(chargeTypeValue)
        ) {
          errors.push({
            code: 'ANNUAL_MISSING_CHARGE_TYPE',
            path: `${pPath}.pricing.modalities.annual.chargeType`,
            message: `Modalidade anual em ${pPath} exige definição confirmada se é 'antecipado' ou 'parcelado'.`,
          });
        }

        const attemptsStackingWithPromo =
          promoClaimed &&
          (annualModality?.promotionalMonthlyEquivalent?.status === INFO_STATUS.CONFIRMADA ||
            (annualModality?.discountPercentage?.status === INFO_STATUS.CONFIRMADA &&
              annualModality.discountPercentage.value > 0 &&
              annualModality?.promotionalMonthlyEquivalent?.status === INFO_STATUS.CONFIRMADA));

        const annualHasDiscountTryingToStack =
          promoClaimed &&
          (annualModality?.promotionalMonthlyEquivalent?.status === INFO_STATUS.CONFIRMADA ||
            (annualModality?.discountPercentage?.status === INFO_STATUS.CONFIRMADA &&
              annualModality.discountPercentage.value > 0));

        if (
          (attemptsStackingWithPromo || annualHasDiscountTryingToStack) &&
          !canStackAnnualAndPromotion(plan)
        ) {
          errors.push({
            code: 'PROMOTION_ANNUAL_STACKING_UNAPPROVED',
            path: `${pPath}.pricing.promotion.stackingWithAnnualDiscount`,
            message: `Combinação de desconto anual com promoção mensal em ${pPath} requer aprovação explícita em stackingWithAnnualDiscount.`,
          });
        }
      }

      const usageDefs = CHANNEL_USAGE_ROW_DEFINITIONS[channelId] || [];
      usageDefs.forEach((def) => {
        checkTrackedField(errors, `${pPath}.includedUsage.${def.key}`, plan?.includedUsage?.[def.key]);
      });

      checkTrackedField(errors, `${pPath}.usageUnitDefinition`, plan?.usageUnitDefinition);

      const limitDefs = CHANNEL_LIMIT_ROW_DEFINITIONS[channelId] || [];
      limitDefs.forEach((def) => {
        checkTrackedField(errors, `${pPath}.limits.${def.key}`, plan?.limits?.[def.key]);
      });

      const overageDefs = CHANNEL_OVERAGE_ROW_DEFINITIONS[channelId] || [];
      overageDefs.forEach((def) => {
        checkTrackedField(errors, `${pPath}.overagesAndAddons.${def.key}`, plan?.overagesAndAddons?.[def.key]);
      });

      if (!Array.isArray(plan?.features) || plan.features.length === 0) {
        errors.push({
          code: 'MISSING_FIELD',
          path: `${pPath}.features`,
          message: `Plano ${pPath} sem lista estruturada de funcionalidades.`,
        });
      } else {
        plan.features.forEach((feat) => {
          checkTrackedField(errors, `${pPath}.features.${feat?.key || 'unknown'}`, feat);
        });
      }

      if (plan?.status === INFO_STATUS.CONFIRMADA) {
        const coreFields = [
          regularMonthly,
          monthlyModality?.available,
          ...limitDefs.map((d) => plan?.limits?.[d.key]),
        ];
        const hasPendingCore = coreFields.some((f) => f?.status === INFO_STATUS.PENDENTE);
        if (hasPendingCore) {
          errors.push({
            code: 'CONFIRMED_PLAN_HAS_PENDING_CORE_FIELDS',
            path: pPath,
            message: `Plano ${pPath} está marcado como 'confirmada', mas ainda possui campos essenciais pendentes.`,
          });
        }
      }
    });
  });

  return { valid: errors.length === 0, errors };
}

const DISALLOWED_METRICS_BY_CHANNEL = Object.freeze({
  telefone: new Set(['conversations', 'messages']),
  whatsapp: new Set(['minutes', 'calls', 'simultaneousCalls']),
  webchat: new Set(['minutes', 'calls', 'simultaneousCalls', 'includedNumbers', 'extraNumbers']),
});

export function validateCardComparisonParity(
  channelId,
  billingCycle = 'monthly',
  catalog = COMMERCIAL_CATALOG,
  customComparisonTable = null
) {
  const errors = [];
  const plans = getChannelPlans(channelId, catalog);
  const table = customComparisonTable || getChannelComparisonTable(channelId, billingCycle, catalog);

  if (!table || plans.length === 0) {
    errors.push({
      code: 'CARD_COMPARISON_MISSING_DATA',
      channelId,
      message: `Dados ausentes para comparar cartões e tabela do canal ${channelId}.`,
    });
    return { valid: false, errors };
  }

  const allTableRows = table.sections.flatMap((sec) => sec.items || []);
  const disallowedSet = DISALLOWED_METRICS_BY_CHANNEL[channelId] || new Set();

  allTableRows.forEach((row) => {
    if (disallowedSet.has(row.key)) {
      errors.push({
        code: 'CHANNEL_MISMATCH_METRIC',
        channelId,
        field: row.key,
        message: `Métrica incompatível "${row.key}" encontrada na tabela comparativa do canal ${channelId}.`,
      });
    }
  });

  plans.forEach((plan) => {
    const card = getPlanCardViewModel(channelId, plan.id, billingCycle, catalog);
    const tableCol = table.columns.find((col) => col.id === plan.id);

    if (!tableCol) {
      errors.push({
        code: 'CARD_COMPARISON_LIMIT_MISMATCH',
        channelId,
        planId: plan.id,
        field: 'column',
        message: `Coluna do plano ${plan.id} ausente na tabela comparativa do canal ${channelId}.`,
      });
      return;
    }

    if (
      card.pricing.displayPrice !== tableCol.pricing.displayPrice ||
      card.pricing.status !== tableCol.pricing.status
    ) {
      errors.push({
        code: 'CARD_COMPARISON_LIMIT_MISMATCH',
        channelId,
        planId: plan.id,
        field: 'pricing.displayPrice',
        message: `Preço divergente entre cartão (${card.pricing.displayPrice}) e comparação (${tableCol.pricing.displayPrice}) no plano ${plan.id}.`,
      });
    }

    const cardRows = [
      ...card.includedRows,
      {
        key: 'usageUnitDefinition',
        label: card.usageUnitDefinition.label,
        status: card.usageUnitDefinition.status,
        text: card.usageUnitDefinition.text,
      },
      ...card.limitRows,
      ...card.visibleOverageRows,
      ...card.featureRows,
    ];

    cardRows.forEach((cardRow) => {
      if (disallowedSet.has(cardRow.key)) {
        errors.push({
          code: 'CHANNEL_MISMATCH_METRIC',
          channelId,
          planId: plan.id,
          field: cardRow.key,
          message: `Métrica incompatível "${cardRow.key}" encontrada no cartão ${channelId}/${plan.id}.`,
        });
      }

      const tableRow = allTableRows.find((r) => r.key === cardRow.key);
      const tableCell = tableRow?.[plan.id];

      if (!tableCell) {
        errors.push({
          code: 'CARD_COMPARISON_LIMIT_MISMATCH',
          channelId,
          planId: plan.id,
          field: cardRow.key,
          message: `Linha ${cardRow.key} ausente na tabela comparativa para ${channelId}/${plan.id}.`,
        });
        return;
      }

      if (cardRow.text !== tableCell.text || cardRow.status !== tableCell.status) {
        errors.push({
          code: 'CARD_COMPARISON_LIMIT_MISMATCH',
          channelId,
          planId: plan.id,
          field: cardRow.key,
          message: `Divergência em ${channelId}/${plan.id}.${cardRow.key}: cartão="${cardRow.text}" (${cardRow.status}) vs comparação="${tableCell.text}" (${tableCell.status}).`,
        });
      }
    });
  });

  return { valid: errors.length === 0, errors };
}

function collectObservedValuesFromCatalog(catalog) {
  const confirmedNumbers = new Set();
  const pendingNumbers = new Set();
  let hasAnyConfirmedActivePromo = false;
  let hasConfirmedFirstInvoicePromo = false;
  let hasConfirmed20PercentAnnual = false;

  const visit = (node) => {
    if (!node || typeof node !== 'object') return;
    if (Array.isArray(node)) {
      node.forEach(visit);
      return;
    }

    if (typeof node.status === 'string' && ('value' in node || 'observedValue' in node)) {
      if (node.status === INFO_STATUS.CONFIRMADA && typeof node.value === 'number') {
        confirmedNumbers.add(node.value);
      }
      if (node.status !== INFO_STATUS.CONFIRMADA && typeof node.observedValue === 'number') {
        pendingNumbers.add(node.observedValue);
      }
      return;
    }

    Object.values(node).forEach(visit);
  };

  Object.values(catalog?.channels || {}).forEach((channel) => {
    channel.plans?.forEach((plan) => {
      if (isPromotionConfirmedAndValid(plan)) {
        hasAnyConfirmedActivePromo = true;
        if (plan.pricing?.promotion?.billingScope?.value === PROMOTION_BILLING_SCOPES.PRIMEIRA_FATURA) {
          hasConfirmedFirstInvoicePromo = true;
        }
      }
      const annualDiscount = plan?.pricing?.modalities?.annual?.discountPercentage;
      if (annualDiscount?.status === INFO_STATUS.CONFIRMADA && annualDiscount.value === 20) {
        hasConfirmed20PercentAnnual = true;
      }
    });
  });

  visit(catalog);

  return {
    confirmedNumbers,
    pendingNumbers,
    hasAnyConfirmedActivePromo,
    hasConfirmedFirstInvoicePromo,
    hasConfirmed20PercentAnnual,
  };
}

function formatNumberRegexFragment(num) {
  return num.toLocaleString('pt-BR').replace(/\./g, '\\.?');
}

export function detectPendingShownAsFact(renderedText, catalog = COMMERCIAL_CATALOG) {
  const normalized = String(renderedText || '').replace(/\s+/g, ' ');
  const violations = [];

  const {
    confirmedNumbers,
    pendingNumbers,
    hasAnyConfirmedActivePromo,
    hasConfirmedFirstInvoicePromo,
    hasConfirmed20PercentAnnual,
  } = collectObservedValuesFromCatalog(catalog);

  pendingNumbers.forEach((num) => {
    if (confirmedNumbers.has(num) || num <= 12) return;
    const frag = formatNumberRegexFragment(num);
    const currencyRe = new RegExp(`(?:R\\$\\s*${frag}\\b|\\b${frag}\\s*(?:/\\s*m[eê]s|reais))`, 'i');
    const match = normalized.match(currencyRe);
    if (match) {
      violations.push({
        code: 'PENDING_SHOWN_AS_FACT',
        matchedText: match[0],
        message: `Valor pendente (${num}) exibido como fato confirmado no texto: "${match[0]}".`,
      });
    }
  });

  if (!hasAnyConfirmedActivePromo) {
    const unconfirmedPromoPatterns = [
      /30%\s*(?:OFF|A MENOS|DE DESCONTO)/i,
      /trinta por cento de desconto/i,
      /nos\s+(?:3\s+)?primeiros\s+(?:3|tr[eê]s)\s+meses/i,
    ];
    unconfirmedPromoPatterns.forEach((pattern) => {
      const match = normalized.match(pattern);
      if (match) {
        violations.push({
          code: 'PENDING_SHOWN_AS_FACT',
          matchedText: match[0],
          message: `Promoção não confirmada exibida como fato: "${match[0]}".`,
        });
      }
    });
  }

  if (!hasConfirmedFirstInvoicePromo) {
    const firstInvoiceMatch = normalized.match(/(?:na\s+primeira\s+fatura|sua\s+primeira\s+fatura)/i);
    if (firstInvoiceMatch) {
      violations.push({
        code: 'PENDING_SHOWN_AS_FACT',
        matchedText: firstInvoiceMatch[0],
        message: `Regra não confirmada de "primeira fatura" exibida como fato: "${firstInvoiceMatch[0]}".`,
      });
    }
  }

  if (!hasConfirmed20PercentAnnual) {
    const annualDiscountRe = /(?:Anual\s*\(\s*-20%|(?:^|\s)-20%(?:\s|$))/i;
    const match = normalized.match(annualDiscountRe);
    if (match) {
      violations.push({
        code: 'PENDING_SHOWN_AS_FACT',
        matchedText: match[0].trim(),
        message: `Desconto anual não confirmado (-20%) exibido como fato: "${match[0].trim()}".`,
      });
    }
  }

  const legacyUnconfirmedPricePatterns = [
    { re: /R\$\s*297\b/i, num: 297 },
    { re: /duzentos e noventa e sete reais/i, num: 297 },
    { re: /R\$\s*70\s*\/\s*h/i, num: 70 },
    { re: /R\$\s*0,25\s*\/\s*min/i, num: 0.25 },
    { re: /R\$\s*0,80\s*por conversa/i, num: 0.8 },
  ];

  legacyUnconfirmedPricePatterns.forEach(({ re, num }) => {
    if (confirmedNumbers.has(num)) return;
    const match = normalized.match(re);
    if (match) {
      violations.push({
        code: 'PENDING_SHOWN_AS_FACT',
        matchedText: match[0],
        message: `Valor comercial não confirmado exibido como fato: "${match[0]}".`,
      });
    }
  });

  return {
    valid: violations.length === 0,
    violations,
  };
}
