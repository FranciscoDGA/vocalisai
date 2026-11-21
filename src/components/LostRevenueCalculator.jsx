import React, { useId, useState } from 'react';
import {
  AlertCircle,
  ArrowRight,
  Calculator,
  DollarSign,
  Info,
  Percent,
  RotateCcw,
  Trash2,
  Users,
} from 'lucide-react';
import {
  getCommercialCtaLabel,
  getCommercialEntryLabel,
  getLowestConfirmedEntryPrice,
} from '../utils/commercialCatalogUtils';

/**
 * Exemplos iniciais puramente ilustrativos e editáveis pelo usuário.
 * Não representam média de mercado nem dados comerciais comprovados.
 */
export const DEFAULT_SIMULATION_EXAMPLES = Object.freeze({
  contactsInPeriod: '300',
  unansweredPct: '20',
  recoveredPct: '50',
  conversionPct: '20',
  averageTicket: '250',
});

export const BLANK_SIMULATION_VALUES = Object.freeze({
  contactsInPeriod: '',
  unansweredPct: '',
  recoveredPct: '',
  conversionPct: '',
  averageTicket: '',
});

function round2(value) {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

function cleanFloat(value) {
  if (value === 0) return 0;
  return Number(value.toPrecision(12));
}

function sanitizeNonNegative(rawValue) {
  if (rawValue === '' || rawValue === null || rawValue === undefined) return 0;
  const parsed = typeof rawValue === 'number' ? rawValue : Number(String(rawValue).replace(',', '.'));
  if (!Number.isFinite(parsed) || parsed < 0) return 0;
  return parsed;
}

function sanitizePercentage(rawValue) {
  const numeric = sanitizeNonNegative(rawValue);
  return Math.min(100, numeric);
}

/**
 * Calcula a simulação ilustrativa de oportunidade potencial sem assumir que todo contato
 * se converte em venda e sem aplicar pisos artificiais para entradas zeradas.
 */
export function calculateOpportunitySimulation(rawParams = {}) {
  const contactsInPeriod = sanitizeNonNegative(rawParams.contactsInPeriod);
  const unansweredPct = sanitizePercentage(rawParams.unansweredPct);
  const recoveredPct = sanitizePercentage(rawParams.recoveredPct);
  const conversionPct = sanitizePercentage(rawParams.conversionPct);
  const averageTicket = sanitizeNonNegative(rawParams.averageTicket);

  const unansweredContacts = cleanFloat(contactsInPeriod * (unansweredPct / 100));
  const recoveredContacts = cleanFloat(unansweredContacts * (recoveredPct / 100));
  const estimatedConversions = cleanFloat(recoveredContacts * (conversionPct / 100));
  const estimatedOpportunityMonthly = round2(estimatedConversions * averageTicket);
  const estimatedOpportunityAnnual = round2(estimatedOpportunityMonthly * 12);

  return {
    inputs: {
      contactsInPeriod,
      unansweredPct,
      recoveredPct,
      conversionPct,
      averageTicket,
    },
    unansweredContacts,
    recoveredContacts,
    estimatedConversions,
    estimatedOpportunityMonthly,
    estimatedOpportunityAnnual,
  };
}

export function formatDecimalPtBr(value) {
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 4,
  }).format(value);
}

export function formatCurrencyPtBr(value) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
    .format(value)
    .replace(/\u00a0/g, ' ');
}

const PARAMETER_DEFINITIONS = [
  {
    key: 'contactsInPeriod',
    label: 'Contatos recebidos no período (mês)',
    unit: 'contatos',
    isCurrency: false,
    isPercent: false,
    sliderMin: 0,
    sliderMax: 2000,
    sliderStep: 10,
    inputStep: 1,
    icon: Users,
    iconColor: 'text-[#4F46E5]',
    accentClass: 'accent-[#4F46E5]',
    helperText:
      'Total de ligações, mensagens ou chats recebidos pela sua empresa em um mês. Digite qualquer valor (inclusive acima do limite do controle deslizante) ou deixe em branco para considerar 0.',
  },
  {
    key: 'unansweredPct',
    label: 'Percentual que fica sem resposta (%)',
    unit: '%',
    isCurrency: false,
    isPercent: true,
    sliderMin: 0,
    sliderMax: 100,
    sliderStep: 1,
    inputStep: 1,
    icon: Percent,
    iconColor: 'text-amber-600',
    accentClass: 'accent-amber-600',
    helperText:
      'Parcela estimada de contatos que fica sem retorno no tempo adequado (ex.: fora do horário comercial ou em horários de pico).',
  },
  {
    key: 'recoveredPct',
    label: 'Percentual de contatos recuperados pelo atendimento (%)',
    unit: '%',
    isCurrency: false,
    isPercent: true,
    sliderMin: 0,
    sliderMax: 100,
    sliderStep: 1,
    inputStep: 1,
    icon: Percent,
    iconColor: 'text-[#4F46E5]',
    accentClass: 'accent-[#4F46E5]',
    helperText:
      'Proporção desses contatos sem resposta que você estima conseguir atender e qualificar com o fluxo configurado.',
  },
  {
    key: 'conversionPct',
    label: 'Taxa de conversão em venda ou agendamento (%)',
    unit: '%',
    isCurrency: false,
    isPercent: true,
    sliderMin: 0,
    sliderMax: 100,
    sliderStep: 1,
    inputStep: 1,
    icon: Percent,
    iconColor: 'text-emerald-700',
    accentClass: 'accent-emerald-600',
    helperText:
      'Nem todo contato atendido vira cliente. Informe apenas a parcela dos contatos recuperados que tende a fechar venda ou agendamento pago.',
  },
  {
    key: 'averageTicket',
    label: 'Valor médio da venda ou do serviço (R$)',
    unit: 'R$',
    isCurrency: true,
    isPercent: false,
    sliderMin: 0,
    sliderMax: 5000,
    sliderStep: 50,
    inputStep: 10,
    icon: DollarSign,
    iconColor: 'text-emerald-700',
    accentClass: 'accent-emerald-600',
    helperText:
      'Ticket médio por venda ou serviço convertido. Você pode digitar valores maiores diretamente no campo numérico.',
  },
];

function getFieldOriginBadge(rawValue, defaultValue) {
  if (rawValue === '') {
    return {
      text: 'Em branco (0)',
      badgeClass: 'bg-stone-100 text-[#5C5955] border-stone-200',
    };
  }
  if (rawValue === defaultValue) {
    return {
      text: 'Exemplo editável',
      badgeClass: 'bg-indigo-50 text-[#4338CA] border-indigo-200',
    };
  }
  return {
    text: 'Valor definido por você',
    badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  };
}

function SimulationParameterControl({
  baseId,
  config,
  rawValue,
  numericValue,
  defaultValue,
  onChange,
}) {
  const Icon = config.icon;
  const inputId = `${baseId}-${config.key}-input`;
  const sliderId = `${baseId}-${config.key}-slider`;
  const helpId = `${baseId}-${config.key}-help`;
  const originBadge = getFieldOriginBadge(rawValue, defaultValue);
  const clampedSliderValue = Math.min(config.sliderMax, Math.max(config.sliderMin, numericValue));

  const valueText = config.isCurrency
    ? formatCurrencyPtBr(numericValue)
    : config.isPercent
      ? `${formatDecimalPtBr(numericValue)}%`
      : `${formatDecimalPtBr(numericValue)} contatos`;

  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF9F5] border border-[#E7E4DC] space-y-3">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <label
          htmlFor={inputId}
          className="text-sm font-semibold text-[#1A1816] flex items-center gap-2 cursor-pointer"
        >
          <Icon className={`w-4 h-4 shrink-0 ${config.iconColor}`} aria-hidden="true" />
          <span>{config.label}</span>
        </label>

        <span
          className={`inline-flex items-center self-start sm:self-auto px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${originBadge.badgeClass}`}
        >
          {originBadge.text}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
        <div className="sm:col-span-5">
          <div className="flex items-center rounded-xl bg-white border border-[#D6D2C9] focus-within:border-[#4F46E5] focus-within:ring-2 focus-within:ring-[#4F46E5]/20 px-3 min-h-[44px]">
            {config.isCurrency && (
              <span className="text-xs font-bold text-[#5C5955] mr-1.5 select-none" aria-hidden="true">
                R$
              </span>
            )}
            <input
              id={inputId}
              name={config.key}
              type="number"
              inputMode="decimal"
              min={0}
              max={config.isPercent ? 100 : undefined}
              step={config.inputStep}
              value={rawValue}
              placeholder="0"
              aria-describedby={helpId}
              onChange={(e) => onChange(config.key, e.target.value, config.isPercent)}
              className="w-full bg-transparent text-sm font-mono font-bold text-[#1A1816] py-2 focus:outline-none"
            />
            {config.isPercent && (
              <span className="text-xs font-bold text-[#5C5955] ml-1.5 select-none" aria-hidden="true">
                %
              </span>
            )}
          </div>
        </div>

        <div className="sm:col-span-7 space-y-1.5">
          <input
            id={sliderId}
            type="range"
            min={config.sliderMin}
            max={config.sliderMax}
            step={config.sliderStep}
            value={clampedSliderValue}
            aria-label={`Controle deslizante: ${config.label}`}
            aria-valuemin={config.sliderMin}
            aria-valuemax={config.sliderMax}
            aria-valuenow={clampedSliderValue}
            aria-valuetext={valueText}
            aria-describedby={helpId}
            onChange={(e) => onChange(config.key, e.target.value, config.isPercent)}
            className={`w-full h-3 min-h-[44px] py-3 bg-transparent rounded-lg cursor-pointer ${config.accentClass} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5]`}
          />
          <div className="flex justify-between text-[11px] text-[#736F69] font-mono -mt-2" aria-hidden="true">
            <span>
              {config.isCurrency
                ? 'R$ 0'
                : config.isPercent
                  ? '0%'
                  : '0'}
            </span>
            <span>
              {config.isCurrency
                ? `até ${formatCurrencyPtBr(config.sliderMax)} no slider`
                : config.isPercent
                  ? '100%'
                  : `até ${formatDecimalPtBr(config.sliderMax)} no slider`}
            </span>
          </div>
        </div>
      </div>

      <p id={helpId} className="text-xs text-[#5C5955] leading-relaxed">
        {config.helperText}
      </p>
    </div>
  );
}

export default function LostRevenueCalculator({ onOpenAuth, onOpenDemo }) {
  const baseId = useId();
  const [formValues, setFormValues] = useState(DEFAULT_SIMULATION_EXAMPLES);

  const handleFieldChange = (fieldKey, nextValue, isPercent) => {
    if (nextValue === '') {
      setFormValues((prev) => ({ ...prev, [fieldKey]: '' }));
      return;
    }

    const numeric = Number(String(nextValue).replace(',', '.'));
    if (!Number.isFinite(numeric)) {
      return;
    }

    const clamped = isPercent
      ? Math.min(100, Math.max(0, numeric))
      : Math.max(0, numeric);

    setFormValues((prev) => ({ ...prev, [fieldKey]: String(clamped) }));
  };

  const handleClearValues = () => {
    setFormValues(BLANK_SIMULATION_VALUES);
  };

  const handleRestoreExamples = () => {
    setFormValues(DEFAULT_SIMULATION_EXAMPLES);
  };

  const simulation = calculateOpportunitySimulation(formValues);
  const { inputs } = simulation;

  const confirmedFloorMonthly = getLowestConfirmedEntryPrice();
  const commercialReferenceLabel = getCommercialEntryLabel();
  const hasConfirmedFloor = typeof confirmedFloorMonthly === 'number';

  return (
    <section
      aria-labelledby={`${baseId}-heading`}
      className="py-16 sm:py-24 bg-[#FAF9F5] border-t border-[#EBE8E2] font-sans overflow-hidden w-full max-w-full"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-full min-w-0">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-[#4338CA] text-xs font-semibold uppercase tracking-wider mb-4">
            <Calculator className="w-3.5 h-3.5" aria-hidden="true" />
            <span>SIMULADOR TRANSPARENTE DE OPORTUNIDADE POTENCIAL</span>
          </div>

          <h2
            id={`${baseId}-heading`}
            className="text-3xl sm:text-5xl font-normal text-[#1A1816] tracking-tight leading-tight"
          >
            Estime oportunidades potenciais com{' '}
            <span className="font-serif-title italic text-[#4F46E5]">premissas editáveis.</span>
          </h2>

          <p className="mt-4 text-sm sm:text-base text-[#5C5955] max-w-2xl mx-auto leading-relaxed">
            Ajuste todas as etapas do seu funil para gerar uma estimativa ilustrativa. Os valores iniciais são
            apenas um <strong>exemplo editável</strong> — não representam médias comprovadas, auditoria de
            perdas nem promessa de faturamento.
          </p>
        </div>

        {/* Body */}
        <div className="max-w-5xl mx-auto bg-white rounded-3xl border border-[#E7E4DC] p-5 sm:p-10 shadow-sm">
          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-6 mb-6 border-b border-[#EBE8E2]">
            <div className="flex items-start gap-2 text-xs text-[#5C5955]">
              <Info className="w-4 h-4 text-[#4F46E5] shrink-0 mt-0.5" aria-hidden="true" />
              <span>
                Preencha os números pelos campos digitáveis ou pelos controles deslizantes. Você pode zerar tudo ou restaurar o exemplo editável a qualquer momento.
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={handleClearValues}
                className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 min-h-[44px] rounded-xl border border-[#D6D2C9] bg-white hover:bg-[#FAF9F5] text-xs font-semibold text-[#1A1816] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5]"
              >
                <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Limpar valores</span>
              </button>

              <button
                type="button"
                onClick={handleRestoreExamples}
                className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 min-h-[44px] rounded-xl border border-indigo-200 bg-indigo-50 hover:bg-indigo-100 text-xs font-semibold text-[#4338CA] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5]"
              >
                <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Restaurar exemplo editável</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Inputs column */}
            <div className="lg:col-span-7 space-y-4">
              {PARAMETER_DEFINITIONS.map((config) => (
                <SimulationParameterControl
                  key={config.key}
                  baseId={baseId}
                  config={config}
                  rawValue={formValues[config.key]}
                  numericValue={inputs[config.key]}
                  defaultValue={DEFAULT_SIMULATION_EXAMPLES[config.key]}
                  onChange={handleFieldChange}
                />
              ))}
            </div>

            {/* Results & calculation breakdown column */}
            <div className="lg:col-span-5 space-y-5">
              <div
                role="region"
                aria-labelledby={`${baseId}-result-heading`}
                aria-live="polite"
                className="bg-[#141312] text-white rounded-3xl p-6 sm:p-7 border border-stone-800 space-y-5 shadow-xl"
              >
                <span
                  id={`${baseId}-result-heading`}
                  className="text-[11px] font-bold uppercase tracking-wider text-[#A5B4FC] block text-center"
                >
                  Estimativa Ilustrativa de Oportunidade
                </span>

                <div className="text-center">
                  <output
                    htmlFor={`${baseId}-contactsInPeriod-input ${baseId}-unansweredPct-input ${baseId}-recoveredPct-input ${baseId}-conversionPct-input ${baseId}-averageTicket-input`}
                    data-testid="opportunity-monthly-output"
                    className="block text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight"
                  >
                    {formatCurrencyPtBr(simulation.estimatedOpportunityMonthly)}
                  </output>
                  <span className="text-xs text-stone-300 block mt-1.5">
                    estimativa ilustrativa mensal (não é faturamento certo ou garantido)
                  </span>
                </div>

                <div className="py-3 px-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-stone-200 flex items-center justify-between gap-2">
                  <span>Projeção em 12 meses (× 12):</span>
                  <output
                    data-testid="opportunity-annual-output"
                    className="text-[#A5B4FC] font-bold font-mono"
                  >
                    {formatCurrencyPtBr(simulation.estimatedOpportunityAnnual)}
                  </output>
                </div>

                {/* Premissas e Memória de Cálculo */}
                <div
                  data-testid="opportunity-calculation-breakdown"
                  className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-stone-200 space-y-2.5"
                >
                  <div className="font-bold text-white uppercase tracking-wider text-[11px]">
                    Memória de Cálculo e Premissas Aplicadas
                  </div>

                  <p className="text-[11px] text-stone-300 font-mono leading-relaxed bg-black/30 rounded-lg p-2.5 border border-white/10">
                    Fórmula: Contatos × (% sem resposta) × (% recuperados) × (% conversão) × Valor médio
                  </p>

                  <ol className="space-y-1.5 text-[11px] sm:text-xs text-stone-300 list-decimal list-inside">
                    <li>
                      Contatos sem resposta:{' '}
                      <span className="font-mono text-white">
                        {formatDecimalPtBr(inputs.contactsInPeriod)} × {formatDecimalPtBr(inputs.unansweredPct)}% ={' '}
                        {formatDecimalPtBr(simulation.unansweredContacts)}
                      </span>
                    </li>
                    <li>
                      Contatos recuperados pelo atendimento:{' '}
                      <span className="font-mono text-white">
                        {formatDecimalPtBr(simulation.unansweredContacts)} × {formatDecimalPtBr(inputs.recoveredPct)}% ={' '}
                        {formatDecimalPtBr(simulation.recoveredContacts)}
                      </span>
                    </li>
                    <li>
                      Vendas ou agendamentos estimados:{' '}
                      <span className="font-mono text-white">
                        {formatDecimalPtBr(simulation.recoveredContacts)} × {formatDecimalPtBr(inputs.conversionPct)}% ={' '}
                        {formatDecimalPtBr(simulation.estimatedConversions)}
                      </span>
                    </li>
                    <li>
                      Oportunidade ilustrativa no período:{' '}
                      <span className="font-mono text-white">
                        {formatDecimalPtBr(simulation.estimatedConversions)} × {formatCurrencyPtBr(inputs.averageTicket)} ={' '}
                        {formatCurrencyPtBr(simulation.estimatedOpportunityMonthly)}
                      </span>
                    </li>
                  </ol>
                </div>

                {/* Condição comercial da fonte única */}
                <div className="py-3 px-4 rounded-2xl bg-white/5 border border-white/10 text-[11px] text-stone-300 space-y-1">
                  <div className="font-semibold text-white">Referência comercial oficial:</div>
                  <div>
                    {hasConfirmedFloor ? commercialReferenceLabel : 'Condições de investimento: sob consulta (pendente de confirmação pelo proprietário).'}
                  </div>
                </div>

                <div>
                  <button
                    type="button"
                    onClick={onOpenDemo || onOpenAuth}
                    className="w-full py-3.5 px-4 min-h-[44px] rounded-full bg-[#4F46E5] hover:bg-[#4338CA] text-white text-xs sm:text-sm font-bold shadow-lg shadow-indigo-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    <span>{getCommercialCtaLabel('Consultar Planos e Condições')}</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
              </div>

              {/* Mandatory disclaimer box */}
              <div
                role="note"
                aria-label="Avisos sobre as premissas do simulador"
                className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-[#5C5955] space-y-2 leading-relaxed"
              >
                <div className="flex items-center gap-1.5 font-bold text-[#1A1816]">
                  <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" aria-hidden="true" />
                  <span>Importante sobre esta estimativa</span>
                </div>
                <p>
                  <strong>Nem todo contato vira cliente:</strong> o resultado aplica em cascata os percentuais de
                  contatos sem resposta, taxa de recuperação no atendimento e conversão em venda ou agendamento
                  informados acima.
                </p>
                <p>
                  <strong>Os resultados variam conforme negócio, canal, equipe, demanda e configuração.</strong>{' '}
                  Os valores exibidos configuram apenas uma simulação ilustrativa baseada nos dados editáveis
                  inseridos por você e não representam faturamento certo ou garantido.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
