/**
 * Fonte única de dados comerciais da Vocalis AI.
 *
 * REGRAS DE INTEGRIDADE:
 * 1. Todos os cartões de planos, tabelas comparativas, respostas da Beatriz/Roberta,
 *    CTAs e painéis devem consumir exclusivamente este catálogo via `commercialCatalogUtils.js`.
 * 2. Nenhum campo com status `'pendente'` ou `'indisponivel'` deve ter `value` preenchido
 *    ou ser exibido na interface como fato confirmado.
 * 3. A promoção mensal de 3 meses NUNCA é combinada com o desconto da modalidade anual
 *    sem aprovação comercial explícita (`stackingWithAnnualDiscount: true`).
 * 4. Um plano só recebe `status: 'confirmada'` quando todas as suas condições essenciais
 *    (preço, uso, limites, excedentes, política de limite, funcionalidades e checkout) estão confirmadas.
 */

export const INFO_STATUS = Object.freeze({
  CONFIRMADA: 'confirmada',
  PENDENTE: 'pendente',
  INDISPONIVEL: 'indisponivel',
});

export const ANNUAL_CHARGE_TYPES = Object.freeze({
  ANTECIPADO: 'antecipado',
  PARCELADO: 'parcelado',
});

export const PROMOTION_BILLING_SCOPES = Object.freeze({
  PRIMEIRA_FATURA: 'primeira_fatura',
  MESES_INICIAIS: 'meses_iniciais',
});

export const PRICING_ROUNDING_RULE = Object.freeze({
  method: 'Math.round',
  precision: 'integer_brl',
  description: 'Arredondamento para o inteiro em Reais (BRL) mais próximo via Math.round.',
});

export function applyDiscountWithRounding(baseAmount, discountPercentage) {
  if (typeof baseAmount !== 'number' || !Number.isFinite(baseAmount)) return null;
  if (typeof discountPercentage !== 'number' || !Number.isFinite(discountPercentage)) return null;
  return Math.round(baseAmount * (1 - discountPercentage / 100));
}

export function calculateEffectiveDiscountPercent(regularAmount, discountedAmount) {
  if (
    typeof regularAmount !== 'number' ||
    typeof discountedAmount !== 'number' ||
    !Number.isFinite(regularAmount) ||
    !Number.isFinite(discountedAmount) ||
    regularAmount <= 0
  ) {
    return null;
  }
  return Math.round(((regularAmount - discountedAmount) / regularAmount) * 100);
}

export function confirmedField(value, meta = {}) {
  return {
    status: INFO_STATUS.CONFIRMADA,
    value,
    observedValue: null,
    note: meta.note ?? null,
    ...meta,
  };
}

export function pendingField(
  observedValue = null,
  note = 'Pendente de confirmação pelo proprietário.',
  meta = {}
) {
  return {
    status: INFO_STATUS.PENDENTE,
    value: null,
    observedValue,
    note,
    ...meta,
  };
}

export function unavailableField(
  note = 'Indisponível / não aplicável a este canal ou plano.',
  meta = {}
) {
  return {
    status: INFO_STATUS.INDISPONIVEL,
    value: null,
    observedValue: null,
    note,
    ...meta,
  };
}

function buildChannelFeatureMatrix(definitions, valuesByPlan) {
  return {
    solo: definitions.map((def) => ({
      key: def.key,
      category: def.category,
      label: def.label,
      ...(valuesByPlan.solo?.[def.key] ||
        pendingField(null, 'Funcionalidade pendente de confirmação pelo proprietário.')),
    })),
    team: definitions.map((def) => ({
      key: def.key,
      category: def.category,
      label: def.label,
      ...(valuesByPlan.team?.[def.key] ||
        pendingField(null, 'Funcionalidade pendente de confirmação pelo proprietário.')),
    })),
    scale: definitions.map((def) => ({
      key: def.key,
      category: def.category,
      label: def.label,
      ...(valuesByPlan.scale?.[def.key] ||
        pendingField(null, 'Funcionalidade pendente de confirmação pelo proprietário.')),
    })),
  };
}

const TELEFONIA_FEATURE_DEFS = [
  { key: 'voicesCatalog', category: 'Assistentes e Voz', label: 'Catálogo de vozes' },
  { key: 'languagesSupport', category: 'Assistentes e Voz', label: 'Idiomas suportados' },
  { key: 'customVoiceCloning', category: 'Assistentes e Voz', label: 'Voz personalizada / clonagem' },
  { key: 'schedulerIntegration', category: 'Operação e Integrações', label: 'Agendamento integrado' },
  { key: 'sipTrunk', category: 'Telefonia', label: 'Tronco SIP dedicado' },
  { key: 'outboundWebhookCalls', category: 'Telefonia', label: 'Ligações ativas com webhook' },
  { key: 'callRecording', category: 'Plataforma e Suporte', label: 'Gravação e relatórios de chamadas' },
  { key: 'prioritySupport', category: 'Plataforma e Suporte', label: 'Nível de suporte' },
  { key: 'zeroDataRetention', category: 'Plataforma e Suporte', label: 'Retenção zero de dados' },
];

const WHATSAPP_FEATURE_DEFS = [
  { key: 'humanHandoff', category: 'Operação e Integrações', label: 'Transferência para humano' },
  { key: 'schedulerIntegration', category: 'Operação e Integrações', label: 'Agendamento automatizado' },
  { key: 'audioMessages', category: 'Assistentes e Voz', label: 'Envio e leitura de áudios' },
  { key: 'mediaAttachments', category: 'Operação e Integrações', label: 'Envio de PDFs e imagens' },
  { key: 'assistedOnboarding', category: 'Plataforma e Suporte', label: 'Onboarding assistido' },
  { key: 'whiteLabel', category: 'Plataforma e Suporte', label: 'Remoção da marca Vocalis' },
  { key: 'zeroDataRetention', category: 'Plataforma e Suporte', label: 'Retenção zero de dados' },
  { key: 'prioritySupport', category: 'Plataforma e Suporte', label: 'Nível de suporte / SLA' },
];

const WEBCHAT_FEATURE_DEFS = [
  { key: 'languagesSupport', category: 'Assistentes e Voz', label: 'Idiomas suportados' },
  { key: 'visualCustomization', category: 'Operação e Integrações', label: 'Personalização visual' },
  { key: 'whiteLabel', category: 'Plataforma e Suporte', label: 'Remoção da marca Vocalis' },
  { key: 'schedulerIntegration', category: 'Operação e Integrações', label: 'Agendamento de compromissos' },
  { key: 'humanHandoff', category: 'Operação e Integrações', label: 'Transferência para um humano' },
  { key: 'mediaAttachments', category: 'Operação e Integrações', label: 'Envio de PDFs e imagens' },
  { key: 'conversationExport', category: 'Plataforma e Suporte', label: 'Exportação de conversas' },
  { key: 'utmAndPageContext', category: 'Operação e Integrações', label: 'Contexto da página e UTM' },
  { key: 'zeroDataRetention', category: 'Plataforma e Suporte', label: 'Retenção zero de dados' },
];

const telefoniaFeatures = buildChannelFeatureMatrix(TELEFONIA_FEATURE_DEFS, {});
const whatsappFeatures = buildChannelFeatureMatrix(WHATSAPP_FEATURE_DEFS, {});
const webchatFeatures = buildChannelFeatureMatrix(WEBCHAT_FEATURE_DEFS, {});

function buildPlan({
  channelId,
  channelName,
  id,
  name,
  tagline,
  highlight = false,
  badgeText = null,
  ctaLabel = null,
  regularMonthlyConfirmed = null,
  promotionalMonthlyConfirmed = null,
  annualConfirmed = null,
  promoDurationMonths = 3,
  promoValidUntil = '2026-12-31',
  includedUsage,
  usageUnitDefinition,
  limits,
  overagesAndAddons,
  features,
}) {
  const hasConfirmedPricing =
    typeof regularMonthlyConfirmed === 'number' && typeof promotionalMonthlyConfirmed === 'number';
  const hasConfirmedAnnual =
    annualConfirmed && typeof annualConfirmed.regularMonthlyEquivalent === 'number';

  const computedAnnualTotal = hasConfirmedAnnual
    ? annualConfirmed.regularMonthlyEquivalent * 12
    : null;
  const computedAnnualDiscountPct =
    hasConfirmedAnnual && typeof regularMonthlyConfirmed === 'number'
      ? calculateEffectiveDiscountPercent(
          regularMonthlyConfirmed,
          annualConfirmed.regularMonthlyEquivalent
        )
      : null;

  const limitValues = Object.values(limits || {});
  const featureValues = Array.isArray(features) ? features : [];
  const hasPendingEssentials =
    !hasConfirmedPricing ||
    usageUnitDefinition?.status === INFO_STATUS.PENDENTE ||
    overagesAndAddons?.extraUsage?.status === INFO_STATUS.PENDENTE ||
    limitValues.some((f) => f?.status === INFO_STATUS.PENDENTE) ||
    featureValues.every((f) => f?.status !== INFO_STATUS.CONFIRMADA);

  return {
    channelId,
    channelName,
    id,
    name,
    tagline,
    highlight,
    badge: badgeText
      ? confirmedField(badgeText)
      : pendingField(null, 'Selo de destaque comercial não aplicável.'),
    // Regra 10: não marca o plano inteiro como 'confirmada' enquanto houver condições essenciais pendentes
    status: hasPendingEssentials ? INFO_STATUS.PENDENTE : INFO_STATUS.CONFIRMADA,
    pricing: {
      status: hasConfirmedPricing ? INFO_STATUS.CONFIRMADA : INFO_STATUS.PENDENTE,
      regularMonthly: hasConfirmedPricing
        ? confirmedField(regularMonthlyConfirmed)
        : pendingField(null, 'Preço mensal normal pendente de confirmação pelo proprietário.'),
      promotionalMonthly: hasConfirmedPricing
        ? confirmedField(promotionalMonthlyConfirmed)
        : pendingField(null, 'Preço promocional pendente de confirmação pelo proprietário.'),
      promotion: hasConfirmedPricing
        ? {
            status: INFO_STATUS.CONFIRMADA,
            active: true,
            discountLabel: confirmedField(`30% a menos nos ${promoDurationMonths} primeiros meses`),
            durationMonths: confirmedField(promoDurationMonths),
            durationDescription: confirmedField(`nos ${promoDurationMonths} primeiros meses`),
            billingScope: confirmedField(PROMOTION_BILLING_SCOPES.MESES_INICIAIS),
            // Nunca combina promoção mensal de 3 meses com desconto anual sem aprovação explícita
            stackingWithAnnualDiscount: confirmedField(false),
            validUntil: confirmedField(promoValidUntil),
          }
        : {
            status: INFO_STATUS.PENDENTE,
            active: false,
            discountLabel: pendingField(null, 'Descrição/percentual da promoção pendente de confirmação.'),
            durationMonths: pendingField(null, 'Duração da promoção pendente de confirmação.'),
            durationDescription: pendingField(null, 'Descrição da duração da promoção pendente de confirmação.'),
            billingScope: pendingField(null, 'Escopo oficial da promoção pendente de confirmação.'),
            stackingWithAnnualDiscount: pendingField(null, 'Regra de combinação com anual pendente de confirmação.'),
            validUntil: pendingField(null, 'Data limite da promoção pendente de confirmação.'),
          },
      afterPromotion: hasConfirmedPricing
        ? {
            status: INFO_STATUS.CONFIRMADA,
            amountMonthly: confirmedField(regularMonthlyConfirmed),
            billingMethod: confirmedField('Assinatura mensal recorrente'),
            description: confirmedField(
              id === 'scale'
                ? `Depois R$ ${regularMonthlyConfirmed.toLocaleString('pt-BR')}/mês · proposta mensal recorrente`
                : `Depois R$ ${regularMonthlyConfirmed.toLocaleString('pt-BR')}/mês`
            ),
          }
        : {
            status: INFO_STATUS.PENDENTE,
            amountMonthly: pendingField(null, 'Valor após período promocional pendente de confirmação.'),
            billingMethod: pendingField(null, 'Forma de cobrança após a promoção pendente de confirmação.'),
            description: pendingField(null, 'Condição completa pós-promoção pendente de confirmação.'),
          },
      modalities: {
        monthly: {
          status: hasConfirmedPricing ? INFO_STATUS.CONFIRMADA : INFO_STATUS.PENDENTE,
          available: hasConfirmedPricing
            ? confirmedField(true)
            : pendingField(null, 'Disponibilidade da modalidade mensal pendente de confirmação.'),
          billingCycle: 'mensal',
          checkoutUrl: pendingField(null, 'Checkout online desativado até validação comercial e jurídica completa.'),
        },
        annual: hasConfirmedAnnual
          ? {
              status: INFO_STATUS.CONFIRMADA,
              available: confirmedField(true),
              billingCycle: 'anual',
              chargeType: confirmedField(annualConfirmed.chargeType || ANNUAL_CHARGE_TYPES.ANTECIPADO, {
                allowedValues: [ANNUAL_CHARGE_TYPES.ANTECIPADO, ANNUAL_CHARGE_TYPES.PARCELADO],
              }),
              regularMonthlyEquivalent: confirmedField(annualConfirmed.regularMonthlyEquivalent),
              promotionalMonthlyEquivalent: unavailableField(
                'A promoção mensal de 3 meses não é cumulativa com o plano anual.'
              ),
              totalAnnualAmount: confirmedField(computedAnnualTotal),
              discountPercentage: confirmedField(computedAnnualDiscountPct),
              checkoutUrl: pendingField(null, 'Checkout anual online desativado até confirmação comercial completa.'),
            }
          : {
              status: INFO_STATUS.PENDENTE,
              available: pendingField(null, 'Modalidade anual ainda não confirmada.'),
              billingCycle: 'anual',
              chargeType: pendingField(
                null,
                'Forma de cobrança anual (antecipado ou parcelado) pendente de confirmação pelo proprietário.',
                { allowedValues: [ANNUAL_CHARGE_TYPES.ANTECIPADO, ANNUAL_CHARGE_TYPES.PARCELADO] }
              ),
              regularMonthlyEquivalent: pendingField(null, 'Equivalente mensal do plano anual pendente de confirmação.'),
              promotionalMonthlyEquivalent: pendingField(null, 'Equivalente promocional do plano anual pendente de confirmação.'),
              totalAnnualAmount: pendingField(null, 'Valor total do ciclo anual pendente de confirmação.'),
              discountPercentage: pendingField(null, 'Percentual de desconto anual pendente de confirmação.'),
              checkoutUrl: pendingField(null, 'Checkout anual online desativado até confirmação comercial completa.'),
            },
      },
    },
    includedUsage,
    usageUnitDefinition,
    limits,
    overagesAndAddons,
    features,
    cta: {
      label: ctaLabel || (id === 'scale' ? 'Solicitar proposta' : `Selecionar ${name}`),
      action: 'plan_request',
    },
  };
}

export const COMMERCIAL_CATALOG = {
  metadata: {
    version: '1.2.0',
    currency: 'BRL',
    lastAuditDate: '2026-11-25',
    roundingRule: PRICING_ROUNDING_RULE,
    sourcePolicy:
      'Fonte única oficial de preços, promoções, modalidades, limites, excedentes e funcionalidades comerciais da Vocalis AI.',
  },

  usageTermDefinitions: {
    minuto: {
      key: 'minuto',
      term: 'Minuto',
      channels: ['telefone'],
      definition: pendingField(null, 'Critério oficial de contabilização de minuto em ligações telefônicas pendente de confirmação.'),
    },
    ligacao: {
      key: 'ligacao',
      term: 'Ligação',
      channels: ['telefone'],
      definition: pendingField(null, 'Critério oficial do que constitui uma ligação atendida/efetuada pendente de confirmação.'),
    },
    conversa: {
      key: 'conversa',
      term: 'Conversa',
      channels: ['whatsapp', 'webchat'],
      definition: pendingField(null, 'Critério oficial de janela/sessão de conversa pendente de confirmação.'),
    },
    mensagem: {
      key: 'mensagem',
      term: 'Mensagem',
      channels: ['whatsapp', 'webchat'],
      definition: pendingField(null, 'Critério oficial de contabilização de mensagem enviada/recebida pendente de confirmação.'),
    },
  },

  channels: {
    telefone: {
      id: 'telefone',
      name: 'Assistente telefônico IA',
      shortName: 'Telefonia',
      icon: 'Phone',
      status: INFO_STATUS.PENDENTE,
      termKeys: ['minuto', 'ligacao'],
      limitReachedPolicy: pendingField(
        null,
        'Regra real do que acontece quando o limite mensal de telefonia acaba está pendente de confirmação comercial.'
      ),
      usageUnitDefinition: {
        unit: 'minuto',
        label: 'Definição de "minuto"',
        definition: pendingField(null, 'Critério oficial de tarifação por minuto (arredondamento e contagem) pendente de confirmação.'),
      },
      plans: [
        buildPlan({
          channelId: 'telefone',
          channelName: 'Assistente telefônico IA',
          id: 'solo',
          name: 'Solo',
          tagline: 'Referência de até 20 ligações por dia.',
          highlight: false,
          regularMonthlyConfirmed: 719,
          promotionalMonthlyConfirmed: 503,
          annualConfirmed: { regularMonthlyEquivalent: 599 },
          includedUsage: {
            minutes: confirmedField('1.000 minutos/mês (equiv. R$ 0,72/min no mensal padrão)'),
            calls: confirmedField('Até 20 ligações/dia (média ilustrativa)'),
            conversations: unavailableField('Canal de telefonia contabiliza por minutos/chamadas, não por conversas.'),
            messages: unavailableField('Canal de telefonia não contabiliza pacotes de mensagens de texto.'),
          },
          usageUnitDefinition: pendingField(null, 'Definição oficial de "minuto" em chamadas telefônicas pendente de confirmação.'),
          limits: {
            simultaneousCalls: confirmedField('1 chamada simultânea'),
            includedNumbers: confirmedField('1 número de telefone'),
            includedUsers: confirmedField('1 usuário'),
            includedAssistants: pendingField(null, 'Limite de quantidade de assistentes por plano pendente de confirmação comercial e técnica.'),
          },
          overagesAndAddons: {
            extraUsage: pendingField(null, 'Valor de minutos excedentes pendente de confirmação.'),
            extraNumbers: confirmedField('+R$ 49/mês por número extra'),
            extraConnections: pendingField(null, 'Valor por conexão/workspace adicional pendente de confirmação.'),
            extraContacts: pendingField(null, 'Valor por bloco adicional de contatos pendente de confirmação.'),
            providerCosts: pendingField(null, 'Custos de operadora, tronco SIP ou ligações ativas pendentes de confirmação.'),
          },
          features: telefoniaFeatures.solo,
        }),
        buildPlan({
          channelId: 'telefone',
          channelName: 'Assistente telefônico IA',
          id: 'team',
          name: 'Team',
          tagline: 'Referência de 20 a 100 ligações por dia.',
          highlight: true,
          badgeText: 'Mais escolhido',
          regularMonthlyConfirmed: 2159,
          promotionalMonthlyConfirmed: 1511,
          annualConfirmed: { regularMonthlyEquivalent: 1799 },
          includedUsage: {
            minutes: confirmedField('3.600 minutos/mês (equiv. R$ 0,60/min no mensal padrão)'),
            calls: confirmedField('De 20 a 100 ligações/dia (média ilustrativa)'),
            conversations: unavailableField('Canal de telefonia contabiliza por minutos/chamadas, não por conversas.'),
            messages: unavailableField('Canal de telefonia não contabiliza pacotes de mensagens de texto.'),
          },
          usageUnitDefinition: pendingField(null, 'Definição oficial de "minuto" em chamadas telefônicas pendente de confirmação.'),
          limits: {
            simultaneousCalls: confirmedField('3 chamadas simultâneas'),
            includedNumbers: confirmedField('3 números de telefone'),
            includedUsers: pendingField(null, 'Limite de usuários por plano pendente de confirmação comercial e técnica.'),
            includedAssistants: pendingField(null, 'Limite de quantidade de assistentes por plano pendente de confirmação comercial e técnica.'),
          },
          overagesAndAddons: {
            extraUsage: pendingField(null, 'Valor de minutos excedentes pendente de confirmação.'),
            extraNumbers: confirmedField('+R$ 49/mês por número extra'),
            extraConnections: pendingField(null, 'Valor por conexão/workspace adicional pendente de confirmação.'),
            extraContacts: pendingField(null, 'Valor por bloco adicional de contatos pendente de confirmação.'),
            providerCosts: pendingField(null, 'Custos de operadora, tronco SIP ou ligações ativas pendentes de confirmação.'),
          },
          features: telefoniaFeatures.team,
        }),
        buildPlan({
          channelId: 'telefone',
          channelName: 'Assistente telefônico IA',
          id: 'scale',
          name: 'Scale',
          tagline: 'Mais de 100 ligações por dia (sob proposta).',
          highlight: false,
          regularMonthlyConfirmed: 3599,
          promotionalMonthlyConfirmed: 2519,
          annualConfirmed: { regularMonthlyEquivalent: 3239 },
          includedUsage: {
            minutes: confirmedField('A partir de 6.000 minutos/mês'),
            calls: confirmedField('Mais de 100 ligações/dia (sob medida)'),
            conversations: unavailableField('Canal de telefonia contabiliza por minutos/chamadas, não por conversas.'),
            messages: unavailableField('Canal de telefonia não contabiliza pacotes de mensagens de texto.'),
          },
          usageUnitDefinition: pendingField(null, 'Definição oficial de "minuto" em chamadas telefônicas pendente de confirmação.'),
          limits: {
            simultaneousCalls: pendingField(null, 'Capacidade simultânea sob proposta e viabilidade técnica (pendente de confirmação).'),
            includedNumbers: confirmedField('Números de telefone sob medida'),
            includedUsers: pendingField(null, 'Limite de usuários sob proposta comercial (pendente de confirmação).'),
            includedAssistants: pendingField(null, 'Limite de assistentes sob proposta comercial (pendente de confirmação).'),
          },
          overagesAndAddons: {
            extraUsage: pendingField(null, 'Valor de minutos excedentes pendente de confirmação.'),
            extraNumbers: confirmedField('Sob medida na proposta'),
            extraConnections: pendingField(null, 'Valor por conexão adicional pendente de confirmação.'),
            extraContacts: pendingField(null, 'Valor por contatos adicionais pendente de confirmação.'),
            providerCosts: pendingField(null, 'Custos de operadora, tronco SIP ou SLA corporativo pendentes de confirmação.'),
          },
          features: telefoniaFeatures.scale,
        }),
      ],
    },

    whatsapp: {
      id: 'whatsapp',
      name: 'IA de WhatsApp',
      shortName: 'WhatsApp',
      icon: 'MessageCircle',
      status: INFO_STATUS.PENDENTE,
      termKeys: ['conversa', 'mensagem'],
      limitReachedPolicy: pendingField(
        null,
        'Regra real do que acontece quando o limite mensal de WhatsApp acaba está pendente de confirmação comercial.'
      ),
      usageUnitDefinition: {
        unit: 'conversa',
        label: 'Definição de "conversa"',
        definition: pendingField(null, 'Critério oficial de janela de conversa e limite de mensagens pendente de confirmação.'),
      },
      plans: [
        buildPlan({
          channelId: 'whatsapp',
          channelName: 'IA de WhatsApp',
          id: 'solo',
          name: 'Solo',
          tagline: 'Até 450 conversas por mês.',
          highlight: false,
          regularMonthlyConfirmed: 499,
          promotionalMonthlyConfirmed: 349,
          annualConfirmed: { regularMonthlyEquivalent: 399 },
          includedUsage: {
            minutes: unavailableField('Canal WhatsApp contabiliza por conversas/mensagens, não por minutos telefônicos.'),
            calls: unavailableField('Canal WhatsApp não inclui ligações telefônicas PSTN.'),
            conversations: confirmedField('450 conversas/mês'),
            messages: pendingField(null, 'Limite de mensagens por conversa pendente de confirmação.'),
          },
          usageUnitDefinition: pendingField(null, 'Definição oficial de "conversa" no WhatsApp pendente de confirmação.'),
          limits: {
            simultaneousCalls: unavailableField('Não aplicável ao canal de mensagens WhatsApp.'),
            includedNumbers: confirmedField('1 número de WhatsApp'),
            includedUsers: confirmedField('1 usuário'),
            includedAssistants: pendingField(null, 'Limite de quantidade de assistentes por plano pendente de confirmação comercial e técnica.'),
          },
          overagesAndAddons: {
            extraUsage: pendingField(null, 'Valor por conversas ou mensagens excedentes pendente de confirmação.'),
            extraNumbers: confirmedField('+R$ 119/mês por número extra'),
            extraConnections: pendingField(null, 'Valor por integração/conexão extra pendente de confirmação.'),
            extraContacts: pendingField(null, 'Valor por bloco adicional de contatos pendente de confirmação.'),
            providerCosts: pendingField(null, 'Taxas da Meta Cloud API ou infraestrutura WhatsApp pendentes de confirmação.'),
          },
          features: whatsappFeatures.solo,
        }),
        buildPlan({
          channelId: 'whatsapp',
          channelName: 'IA de WhatsApp',
          id: 'team',
          name: 'Team',
          tagline: 'Até 2.000 conversas por mês.',
          highlight: true,
          badgeText: 'Mais escolhido',
          regularMonthlyConfirmed: 1999,
          promotionalMonthlyConfirmed: 1399,
          annualConfirmed: { regularMonthlyEquivalent: 1599 },
          includedUsage: {
            minutes: unavailableField('Canal WhatsApp contabiliza por conversas/mensagens, não por minutos telefônicos.'),
            calls: unavailableField('Canal WhatsApp não inclui ligações telefônicas PSTN.'),
            conversations: confirmedField('2.000 conversas/mês'),
            messages: pendingField(null, 'Limite de mensagens por conversa pendente de confirmação.'),
          },
          usageUnitDefinition: pendingField(null, 'Definição oficial de "conversa" no WhatsApp pendente de confirmação.'),
          limits: {
            simultaneousCalls: unavailableField('Não aplicável ao canal de mensagens WhatsApp.'),
            includedNumbers: confirmedField('3 números de WhatsApp'),
            includedUsers: pendingField(null, 'Limite de usuários por plano pendente de confirmação comercial e técnica.'),
            includedAssistants: pendingField(null, 'Limite de quantidade de assistentes por plano pendente de confirmação comercial e técnica.'),
          },
          overagesAndAddons: {
            extraUsage: pendingField(null, 'Valor por conversas ou mensagens excedentes pendente de confirmação.'),
            extraNumbers: confirmedField('+R$ 119/mês por número extra'),
            extraConnections: pendingField(null, 'Valor por integração/conexão extra pendente de confirmação.'),
            extraContacts: pendingField(null, 'Valor por bloco adicional de contatos pendente de confirmação.'),
            providerCosts: pendingField(null, 'Taxas da Meta Cloud API ou infraestrutura WhatsApp pendentes de confirmação.'),
          },
          features: whatsappFeatures.team,
        }),
        buildPlan({
          channelId: 'whatsapp',
          channelName: 'IA de WhatsApp',
          id: 'scale',
          name: 'Scale',
          tagline: 'Ideal a partir de 5.000 conversas/mês (sob proposta).',
          highlight: false,
          regularMonthlyConfirmed: 4499,
          promotionalMonthlyConfirmed: 3149,
          annualConfirmed: { regularMonthlyEquivalent: 3599 },
          includedUsage: {
            minutes: unavailableField('Canal WhatsApp contabiliza por conversas/mensagens, não por minutos telefônicos.'),
            calls: unavailableField('Canal WhatsApp não inclui ligações telefônicas PSTN.'),
            conversations: confirmedField('5.000 conversas/mês'),
            messages: pendingField(null, 'Limite de mensagens por conversa pendente de confirmação.'),
          },
          usageUnitDefinition: pendingField(null, 'Definição oficial de "conversa" no WhatsApp pendente de confirmação.'),
          limits: {
            simultaneousCalls: unavailableField('Não aplicável ao canal de mensagens WhatsApp.'),
            includedNumbers: confirmedField('Números de WhatsApp personalizados'),
            includedUsers: pendingField(null, 'Limite de usuários sob proposta comercial (pendente de confirmação).'),
            includedAssistants: pendingField(null, 'Limite de assistentes sob proposta comercial (pendente de confirmação).'),
          },
          overagesAndAddons: {
            extraUsage: pendingField(null, 'Valor por conversas ou mensagens excedentes pendente de confirmação.'),
            extraNumbers: confirmedField('Sob medida na proposta'),
            extraConnections: pendingField(null, 'Valor por integração/conexão extra pendente de confirmação.'),
            extraContacts: pendingField(null, 'Valor por bloco adicional de contatos pendente de confirmação.'),
            providerCosts: pendingField(null, 'Taxas da Meta Cloud API ou infraestrutura WhatsApp pendentes de confirmação.'),
          },
          features: whatsappFeatures.scale,
        }),
      ],
    },

    webchat: {
      id: 'webchat',
      name: 'Webchat de IA',
      shortName: 'Webchat',
      icon: 'MessageSquare',
      status: INFO_STATUS.PENDENTE,
      termKeys: ['conversa', 'mensagem'],
      limitReachedPolicy: pendingField(
        null,
        'Regra real do que acontece quando o limite mensal de Webchat acaba está pendente de confirmação comercial.'
      ),
      usageUnitDefinition: {
        unit: 'conversa',
        label: 'Definição de "conversa"',
        definition: pendingField(null, 'Critério oficial de sessão/conversa e mensagens no Webchat pendente de confirmação.'),
      },
      plans: [
        buildPlan({
          channelId: 'webchat',
          channelName: 'Webchat de IA',
          id: 'solo',
          name: 'Solo',
          tagline: 'Até 100 conversas por mês.',
          highlight: false,
          regularMonthlyConfirmed: 299,
          promotionalMonthlyConfirmed: 209,
          annualConfirmed: { regularMonthlyEquivalent: 249 },
          includedUsage: {
            minutes: unavailableField('Canal Webchat contabiliza por conversas/mensagens no site.'),
            calls: unavailableField('Canal Webchat não inclui chamadas telefônicas PSTN.'),
            conversations: confirmedField('100 conversas/mês'),
            messages: confirmedField('Até 1.000 mensagens/mês'),
          },
          usageUnitDefinition: pendingField(null, 'Definição oficial de "conversa" no Webchat pendente de confirmação.'),
          limits: {
            simultaneousCalls: unavailableField('Não aplicável ao canal de chat em site.'),
            includedNumbers: unavailableField('Canal Webchat não utiliza linha telefônica ou número WhatsApp.'),
            includedUsers: confirmedField('1 usuário'),
            includedAssistants: pendingField(null, 'Limite de widgets/assistentes por plano pendente de confirmação comercial e técnica.'),
          },
          overagesAndAddons: {
            extraUsage: pendingField(null, 'Valor de conversas/mensagens excedentes no Webchat pendente de confirmação.'),
            extraNumbers: unavailableField('Não aplicável ao canal Webchat.'),
            extraConnections: pendingField(null, 'Valor por integração adicional pendente de confirmação.'),
            extraContacts: pendingField(null, 'Valor por bloco adicional de contatos pendente de confirmação.'),
            providerCosts: pendingField(null, 'Custos de provedores externos ou integrações pendentes de confirmação.'),
          },
          features: webchatFeatures.solo,
        }),
        buildPlan({
          channelId: 'webchat',
          channelName: 'Webchat de IA',
          id: 'team',
          name: 'Team',
          tagline: 'Até 400 conversas por mês.',
          highlight: true,
          badgeText: 'Mais escolhido',
          regularMonthlyConfirmed: 899,
          promotionalMonthlyConfirmed: 629,
          annualConfirmed: { regularMonthlyEquivalent: 749 },
          includedUsage: {
            minutes: unavailableField('Canal Webchat contabiliza por conversas/mensagens no site.'),
            calls: unavailableField('Canal Webchat não inclui chamadas telefônicas PSTN.'),
            conversations: confirmedField('400 conversas/mês'),
            messages: confirmedField('Até 4.000 mensagens/mês'),
          },
          usageUnitDefinition: pendingField(null, 'Definição oficial de "conversa" no Webchat pendente de confirmação.'),
          limits: {
            simultaneousCalls: unavailableField('Não aplicável ao canal de chat em site.'),
            includedNumbers: unavailableField('Canal Webchat não utiliza linha telefônica ou número WhatsApp.'),
            includedUsers: pendingField(null, 'Limite de usuários por plano pendente de confirmação comercial e técnica.'),
            includedAssistants: pendingField(null, 'Limite de widgets/assistentes por plano pendente de confirmação comercial e técnica.'),
          },
          overagesAndAddons: {
            extraUsage: pendingField(null, 'Valor de conversas/mensagens excedentes no Webchat pendente de confirmação.'),
            extraNumbers: unavailableField('Não aplicável ao canal Webchat.'),
            extraConnections: pendingField(null, 'Valor por integração adicional pendente de confirmação.'),
            extraContacts: pendingField(null, 'Valor por bloco adicional de contatos pendente de confirmação.'),
            providerCosts: pendingField(null, 'Custos de provedores externos ou integrações pendentes de confirmação.'),
          },
          features: webchatFeatures.team,
        }),
        buildPlan({
          channelId: 'webchat',
          channelName: 'Webchat de IA',
          id: 'scale',
          name: 'Scale',
          tagline: 'Ideal a partir de 2.000+ conversas/mês (sob proposta).',
          highlight: false,
          regularMonthlyConfirmed: 2999,
          promotionalMonthlyConfirmed: 2099,
          annualConfirmed: { regularMonthlyEquivalent: 2699 },
          includedUsage: {
            minutes: unavailableField('Canal Webchat contabiliza por conversas/mensagens no site.'),
            calls: unavailableField('Canal Webchat não inclui chamadas telefônicas PSTN.'),
            conversations: confirmedField('2.000+ conversas/mês'),
            messages: confirmedField('20.000+ mensagens/mês'),
          },
          usageUnitDefinition: pendingField(null, 'Definição oficial de "conversa" no Webchat pendente de confirmação.'),
          limits: {
            simultaneousCalls: unavailableField('Não aplicável ao canal de chat em site.'),
            includedNumbers: unavailableField('Canal Webchat não utiliza linha telefônica ou número WhatsApp.'),
            includedUsers: pendingField(null, 'Limite de usuários sob proposta comercial (pendente de confirmação).'),
            includedAssistants: pendingField(null, 'Limite de widgets/assistentes sob proposta comercial (pendente de confirmação).'),
          },
          overagesAndAddons: {
            extraUsage: pendingField(null, 'Valor de conversas/mensagens excedentes no Webchat pendente de confirmação.'),
            extraNumbers: unavailableField('Não aplicável ao canal Webchat.'),
            extraConnections: pendingField(null, 'Valor por integração adicional pendente de confirmação.'),
            extraContacts: pendingField(null, 'Valor por bloco adicional de contatos pendente de confirmação.'),
            providerCosts: pendingField(null, 'Custos de provedores externos ou integrações pendentes de confirmação.'),
          },
          features: webchatFeatures.scale,
        }),
      ],
    },
  },

  commercialExtras: {
    onboardingAssisted: pendingField(
      null,
      'Elegibilidade de planos com onboarding assistido incluído está pendente de confirmação pelo proprietário.'
    ),
    voiceCloning: pendingField(
      null,
      'Disponibilidade da clonagem de voz por plano está pendente de confirmação pelo proprietário.'
    ),
    peakPackage: pendingField(
      null,
      'Valor de pacote extra em dias de pico está pendente de confirmação pelo proprietário.'
    ),
    activationCondition: pendingField(
      null,
      'Condição comercial de ativação promocional está pendente de confirmação pelo proprietário.'
    ),
    dashboardAddonsUnitPrice: pendingField(
      null,
      'Preço unitário dos add-ons adicionais no painel está pendente de confirmação pelo proprietário.'
    ),
    referralCredits: {
      inviteFriend: pendingField(null, 'Valor de crédito por indicação de amigo pendente de confirmação.'),
      linkedinPost: pendingField(null, 'Valor de crédito por publicação no LinkedIn pendente de confirmação.'),
      blogPost: pendingField(null, 'Valor de crédito por artigo em blog pendente de confirmação.'),
      caseStudyVideo: pendingField(null, 'Valor de crédito por case em vídeo pendente de confirmação.'),
      youtubeVideo: pendingField(null, 'Valor de crédito por vídeo no YouTube pendente de confirmação.'),
    },
    providerCostsByChannel: {
      telefone: pendingField(null, 'Custo base por minuto de operadora/telefonia pendente de confirmação.'),
      whatsapp: pendingField(null, 'Custo por mensagem/janela de fornecedor WhatsApp pendente de confirmação.'),
      webchat: pendingField(null, 'Custo por uso/fornecedor de Webchat pendente de confirmação.'),
    },
    agencyProgram: {
      setupFee: pendingField(null, 'Valor sugerido/oficial de setup white-label pendente de confirmação.'),
      monthlyManagementFee: pendingField(null, 'Valor de mensalidade de gestão white-label pendente de confirmação.'),
      resaleMinutePrice: pendingField(null, 'Preço de repasse por minuto em subcontas pendente de confirmação.'),
      subaccountPlans: [
        {
          id: 'starter',
          name: 'Starter',
          minutes: pendingField(null, 'Franquia de minutos do pacote de subconta pendente de confirmação.'),
          monthlyPrice: pendingField(null, 'Preço mensal do pacote de subconta pendente de confirmação.'),
          suggestedMargin: pendingField(null, 'Margem sugerida do pacote de subconta pendente de confirmação.'),
        },
        {
          id: 'pro',
          name: 'Pro',
          minutes: pendingField(null, 'Franquia de minutos do pacote de subconta pendente de confirmação.'),
          monthlyPrice: pendingField(null, 'Preço mensal do pacote de subconta pendente de confirmação.'),
          suggestedMargin: pendingField(null, 'Margem sugerida do pacote de subconta pendente de confirmação.'),
        },
        {
          id: 'scale',
          name: 'Scale',
          minutes: pendingField(null, 'Franquia de minutos do pacote de subconta pendente de confirmação.'),
          monthlyPrice: pendingField(null, 'Preço mensal do pacote de subconta pendente de confirmação.'),
          suggestedMargin: pendingField(null, 'Margem sugerida do pacote de subconta pendente de confirmação.'),
        },
      ],
    },
    partnerProgram: {
      commissionSummary: pendingField(null, 'Percentuais e faixas de comissão do programa de parceiros pendentes de confirmação.'),
      tiers: [
        { id: 'bronze', name: 'Bronze', threshold: pendingField(null, 'Faixa pendente de confirmação.'), commission: pendingField(null, 'Percentual pendente de confirmação.') },
        { id: 'silver', name: 'Silver', threshold: pendingField(null, 'Faixa pendente de confirmação.'), commission: pendingField(null, 'Percentual pendente de confirmação.') },
        { id: 'gold', name: 'Gold', threshold: pendingField(null, 'Faixa pendente de confirmação.'), commission: pendingField(null, 'Percentual pendente de confirmação.') },
        { id: 'platinum', name: 'Platinum', threshold: pendingField(null, 'Faixa pendente de confirmação.'), commission: pendingField(null, 'Percentual pendente de confirmação.') },
        { id: 'diamond', name: 'Diamond', threshold: pendingField(null, 'Faixa pendente de confirmação.'), commission: pendingField(null, 'Percentual pendente de confirmação.') },
      ],
      sampleRevenue: pendingField(null, 'Exemplos de ganhos de parceiros pendentes de confirmação.'),
    },
  },
};
