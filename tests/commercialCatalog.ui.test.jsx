import React from 'react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, cleanup, act } from '@testing-library/react';
import PricingSection from '../src/components/PricingSection';
import DashboardPricingModal from '../src/components/DashboardPricingModal';
import WhatsAppPage from '../src/components/WhatsAppPage';
import WebchatPage from '../src/components/WebchatPage';
import WebchatWidget from '../src/components/WebchatWidget';
import ComparisonMatrixSection from '../src/components/ComparisonMatrixSection';
import ComparisonTable from '../src/components/ComparisonTable';
import LostRevenueCalculator from '../src/components/LostRevenueCalculator';
import ExecutiveDossierModal from '../src/components/ExecutiveDossierModal';
import {
  COMMERCIAL_CATALOG,
  INFO_STATUS,
  ANNUAL_CHARGE_TYPES,
  PROMOTION_BILLING_SCOPES,
  confirmedField,
} from '../src/data/commercialCatalog';
import {
  detectPendingShownAsFact,
  getChannelComparisonTable,
  getPlanCardViewModel,
} from '../src/utils/commercialCatalogUtils';

function createConfirmedChannelTestCatalog() {
  const clone = JSON.parse(JSON.stringify(COMMERCIAL_CATALOG));

  // Confirma Telefonia (Solo com promo 3 meses, Team regular, Anual parcelado SEM acumular promo)
  const tel = clone.channels.telefone;
  tel.usageUnitDefinition.definition = confirmedField(
    'Minuto contabilizado por duração falada arredondada ao próximo segundo completo.'
  );
  clone.usageTermDefinitions.minuto.definition = confirmedField(
    'Minuto falado durante a ligação ativa entre o cliente e a IA.'
  );
  clone.usageTermDefinitions.ligacao.definition = confirmedField(
    'Chamada telefônica conectada, receptiva ou ativa, independentemente do desfecho.'
  );
  tel.limitReachedPolicy = confirmedField(
    'Ao atingir 100% da franquia mensal de minutos, você é notificado e pode optar por pacote adicional.'
  );

  const telSolo = tel.plans[0];
  telSolo.status = INFO_STATUS.CONFIRMADA;
  telSolo.pricing.status = INFO_STATUS.CONFIRMADA;
  telSolo.pricing.regularMonthly = confirmedField(719);
  telSolo.pricing.promotionalMonthly = confirmedField(503);
  telSolo.pricing.promotion = {
    status: INFO_STATUS.CONFIRMADA,
    active: true,
    discountLabel: confirmedField('Oferta introdutória confirmada'),
    durationMonths: confirmedField(3),
    durationDescription: confirmedField('Nos primeiros 3 meses'),
    billingScope: confirmedField(PROMOTION_BILLING_SCOPES.MESES_INICIAIS),
    stackingWithAnnualDiscount: confirmedField(false),
    validUntil: confirmedField('2026-12-31'),
  };
  telSolo.pricing.afterPromotion = {
    status: INFO_STATUS.CONFIRMADA,
    amountMonthly: confirmedField(719),
    billingMethod: confirmedField('mensal recorrente'),
    description: confirmedField('Depois R$ 719/mês'),
  };
  telSolo.pricing.modalities.monthly = {
    status: INFO_STATUS.CONFIRMADA,
    available: confirmedField(true),
    billingCycle: 'mensal',
    checkoutUrl: confirmedField('https://pay.kiwify.com.br/exemplo-tel-solo'),
  };
  telSolo.pricing.modalities.annual = {
    status: INFO_STATUS.CONFIRMADA,
    available: confirmedField(true),
    billingCycle: 'anual',
    chargeType: confirmedField(ANNUAL_CHARGE_TYPES.PARCELADO),
    regularMonthlyEquivalent: confirmedField(600),
    promotionalMonthlyEquivalent: confirmedField(null),
    totalAnnualAmount: confirmedField(7200),
    discountPercentage: confirmedField(17),
    checkoutUrl: confirmedField('https://pay.kiwify.com.br/exemplo-tel-solo-anual'),
  };
  telSolo.includedUsage.minutes = confirmedField('1.500 min/mês');
  telSolo.includedUsage.calls = confirmedField('Estimativa de ~500 ligações');
  telSolo.limits.simultaneousCalls = confirmedField('1 chamada simultânea');
  telSolo.limits.includedNumbers = confirmedField('1 número nacional');
  telSolo.limits.includedUsers = confirmedField('1 usuário');
  telSolo.limits.includedAssistants = confirmedField('4 assistentes');
  telSolo.overagesAndAddons.extraUsage = confirmedField('R$ 50 por 100 minutos');

  // Confirma WhatsApp Solo para garantir troca limpa de aba
  const wa = clone.channels.whatsapp;
  clone.usageTermDefinitions.conversa.definition = confirmedField(
    'Janela única de atendimento contínuo de até 24 horas por contato.'
  );
  clone.usageTermDefinitions.mensagem.definition = confirmedField(
    'Unidade de texto ou áudio trocada dentro de uma conversa ativa.'
  );
  const waSolo = wa.plans[0];
  waSolo.status = INFO_STATUS.CONFIRMADA;
  waSolo.pricing.status = INFO_STATUS.CONFIRMADA;
  waSolo.pricing.regularMonthly = confirmedField(499);
  waSolo.pricing.promotionalMonthly = confirmedField(349);
  waSolo.pricing.promotion = {
    status: INFO_STATUS.CONFIRMADA,
    active: true,
    discountLabel: confirmedField('Oferta introdutória WhatsApp'),
    durationMonths: confirmedField(3),
    durationDescription: confirmedField('Nos primeiros 3 meses'),
    billingScope: confirmedField(PROMOTION_BILLING_SCOPES.MESES_INICIAIS),
    stackingWithAnnualDiscount: confirmedField(false),
    validUntil: confirmedField('2026-12-31'),
  };
  waSolo.pricing.afterPromotion = {
    status: INFO_STATUS.CONFIRMADA,
    amountMonthly: confirmedField(499),
    billingMethod: confirmedField('mensal recorrente'),
    description: confirmedField('Depois R$ 499/mês'),
  };
  waSolo.includedUsage.conversations = confirmedField('450 conversas/mês');
  waSolo.includedUsage.messages = confirmedField('4.500 mensagens/mês');
  waSolo.limits.includedNumbers = confirmedField('1 número de WhatsApp');
  waSolo.limits.includedUsers = confirmedField('1 usuário');
  waSolo.limits.includedAssistants = confirmedField('Ilimitados');

  return clone;
}

describe('Integridade comercial e isolamento por canal na renderização dos componentes React', () => {
  beforeEach(() => {
    if (!Element.prototype.scrollIntoView) {
      Element.prototype.scrollIntoView = vi.fn();
    }
  });

  afterEach(() => {
    cleanup();
    vi.useRealTimers();
  });

  it('PricingSection exibe exclusivamente métricas e termos do canal selecionado, alterna mensal/anual sem acumular promoções e oculta anual quando não confirmado', () => {
    const { container } = render(<PricingSection onOpenDemo={vi.fn()} onOpenAuth={vi.fn()} />);

    // Catálogo oficial possui modalidade anual confirmada para Telefonia, WhatsApp e Webchat
    const annualBtn = screen.getByRole('button', { name: /Anual/i });
    const monthlyBtn = screen.getByRole('button', { name: 'Mensal' });
    expect(annualBtn).toBeTruthy();
    expect(monthlyBtn).toBeTruthy();
    expect(screen.getByTestId('limit-reached-policy').textContent).toContain('Pendente de confirmação');

    // Aba Telefonia: deve conter Minutos, Ligações, Minuto, Ligação — NÃO Conversas/Mensagens
    const telTable = screen.getByTestId('pricing-comparison-table');
    const telCard = screen.getByTestId('plan-card-telefone-solo');
    expect(telCard.textContent).toContain('Minutos incluídos');
    expect(telCard.textContent).toContain('Ligações incluídas');
    expect(telCard.textContent).toContain('503');
    expect(telCard.textContent).toContain('719');
    expect(telTable.textContent).toContain('Minutos incluídos');
    expect(telTable.textContent).toContain('Chamadas simultâneas');
    expect(telTable.textContent).not.toContain('Conversas incluídas');
    expect(telTable.textContent).not.toContain('Mensagens incluídas');
    expect(telCard.textContent).toContain('+R$ 49/mês por número extra');
    expect(screen.getByTestId('usage-terms-section').textContent).toContain('Minuto');
    expect(screen.getByTestId('usage-terms-section').textContent).toContain('Ligação');
    expect(detectPendingShownAsFact(container.textContent, COMMERCIAL_CATALOG).violations).toEqual([]);

    // Alternar para Anual em Telefonia: exibe 599 e total 7.188 sem misturar R$ 503 ou Assinatura mensal recorrente
    fireEvent.click(annualBtn);
    expect(telCard.textContent).toContain('599');
    expect(telCard.textContent).toContain('7.188');
    expect(telCard.textContent).toContain('Cobrança anual antecipada');
    expect(telCard.textContent).not.toContain('503');
    expect(telCard.textContent).not.toContain('Assinatura mensal recorrente');

    // Retorna para Mensal
    fireEvent.click(monthlyBtn);
    expect(telCard.textContent).toContain('503');

    // Aba WhatsApp: deve conter Conversas/Mensagens/Números WhatsApp — ZERO Minutos/Ligações/Simultâneas
    fireEvent.click(screen.getByRole('tab', { name: COMMERCIAL_CATALOG.channels.whatsapp.name }));
    const waTable = screen.getByTestId('pricing-comparison-table');
    const waCard = screen.getByTestId('plan-card-whatsapp-solo');
    expect(waCard.textContent).toContain('Conversas incluídas');
    expect(waCard.textContent).toContain('Mensagens incluídas');
    expect(waCard.textContent).toContain('Números de WhatsApp incluídos');
    expect(waCard.textContent).toContain('349');
    expect(waTable.textContent).toContain('Conversas incluídas');
    expect(waTable.textContent).not.toContain('Minutos incluídos');
    expect(waTable.textContent).not.toContain('Ligações incluídas');
    expect(waTable.textContent).not.toContain('Chamadas simultâneas');
    expect(waCard.textContent).not.toContain('Minutos incluídos');
    expect(screen.getByTestId('usage-terms-section').textContent).toContain('Conversa');
    expect(screen.getByTestId('usage-terms-section').textContent).toContain('Mensagem');
    expect(detectPendingShownAsFact(container.textContent, COMMERCIAL_CATALOG).violations).toEqual([]);

    // Anual WhatsApp Solo: 399/mês equiv. e R$ 4.788 antecipado, sem "Assinatura mensal recorrente"
    fireEvent.click(screen.getByRole('button', { name: /Anual/i }));
    expect(waCard.textContent).toContain('399');
    expect(waCard.textContent).toContain('4.788');
    expect(waCard.textContent).toContain('Cobrança anual antecipada');
    expect(waCard.textContent).not.toContain('349');
    expect(waCard.textContent).not.toContain('Assinatura mensal recorrente');
    fireEvent.click(screen.getByRole('button', { name: 'Mensal' }));

    // Aba Webchat: deve conter Conversas/Mensagens — ZERO Minutos/Ligações/Simultâneas/Números
    fireEvent.click(screen.getByRole('tab', { name: COMMERCIAL_CATALOG.channels.webchat.name }));
    const webTable = screen.getByTestId('pricing-comparison-table');
    const webCard = screen.getByTestId('plan-card-webchat-solo');
    expect(webCard.textContent).toContain('Conversas incluídas');
    expect(webCard.textContent).toContain('Mensagens incluídas');
    expect(webCard.textContent).toContain('209');
    expect(webTable.textContent).toContain('Conversas incluídas');
    expect(webTable.textContent).not.toContain('Minutos incluídos');
    expect(webTable.textContent).not.toContain('Ligações incluídas');
    expect(webTable.textContent).not.toContain('Chamadas simultâneas');
    expect(webTable.textContent).not.toContain('Números de telefone incluídos');
    expect(webTable.textContent).not.toContain('Números de WhatsApp incluídos');

    // Confere paridade total em todos os canais
    ['telefone', 'whatsapp', 'webchat'].forEach((cid) => {
      fireEvent.click(screen.getByRole('tab', { name: COMMERCIAL_CATALOG.channels[cid].name }));
      const table = getChannelComparisonTable(cid, 'monthly', COMMERCIAL_CATALOG);
      const tableEl = screen.getByTestId('pricing-comparison-table');
      expect(tableEl.textContent).toContain(`Comparar planos — ${table.channelName}`);

      ['solo', 'team', 'scale'].forEach((planId) => {
        const cardEl = screen.getByTestId(`plan-card-${cid}-${planId}`);
        const vm = getPlanCardViewModel(cid, planId, 'monthly', COMMERCIAL_CATALOG);
        expect(cardEl.textContent).toContain(vm.pricing.displayPrice);
        expect(tableEl.textContent).toContain(vm.pricing.displayPrice);

        [...vm.includedRows, ...vm.limitRows].forEach((row) => {
          expect(cardEl.textContent).toContain(row.label);
          expect(cardEl.textContent).toContain(row.text);
          expect(tableEl.textContent).toContain(row.label);
          expect(tableEl.textContent).toContain(row.text);
        });
      });
    });

    // Quando catálogo tem modalidade anual pendente, PricingSection oculta botão Anual e exibe aviso
    cleanup();
    const noAnnualCatalog = JSON.parse(JSON.stringify(COMMERCIAL_CATALOG));
    noAnnualCatalog.channels.telefone.plans.forEach((p) => {
      p.pricing.modalities.annual.status = INFO_STATUS.PENDENTE;
      p.pricing.modalities.annual.available = { status: INFO_STATUS.PENDENTE, value: null, observedValue: null };
    });
    render(<PricingSection onOpenDemo={vi.fn()} onOpenAuth={vi.fn()} catalog={noAnnualCatalog} />);
    expect(screen.queryByRole('button', { name: /Anual/i })).toBeNull();
    expect(screen.getByTestId('annual-unavailable-notice').textContent).toContain('Modalidade anual ainda não disponível');
  });

  it('PricingSection propaga promoção, pós-promoção, termos, limite atingido, adicional confirmado e não acumula anual com promoção mensal', () => {
    const confirmedCatalog = createConfirmedChannelTestCatalog();
    const { container } = render(
      <PricingSection onOpenDemo={vi.fn()} onOpenAuth={vi.fn()} catalog={confirmedCatalog} />
    );

    // Banner, cartão Solo e tabela mostram os mesmos dados na Telefonia Mensal
    const banner = screen.getByTestId('confirmed-promo-banner');
    const telSoloCard = screen.getByTestId('plan-card-telefone-solo');
    const telTable = screen.getByTestId('pricing-comparison-table');

    [banner.textContent, telSoloCard.textContent, telTable.textContent].forEach((text) => {
      expect(text).toContain('Nos primeiros 3 meses');
      expect(text).toContain('719');
    });
    expect(banner.textContent).toContain('31/12/2026');
    expect(telSoloCard.textContent).toContain('503');
    expect(telTable.textContent).toContain('503');

    // Definição confirmada, regra de limite atingido e custo adicional confirmado aparecem
    expect(screen.getByTestId('usage-terms-section').textContent).toContain(
      'Minuto falado durante a ligação ativa'
    );
    expect(screen.getByTestId('limit-reached-policy').textContent).toContain(
      'Ao atingir 100% da franquia mensal de minutos'
    );
    expect(telSoloCard.textContent).toContain('R$ 50 por 100 minutos');
    expect(telTable.textContent).toContain('R$ 50 por 100 minutos');
    expect(telCardDoesNotShowUnconfirmedOverage(telSoloCard.textContent)).toBe(true);

    // Anual confirmado aparece para Telefonia e NÃO combina a promoção de R$ 503
    fireEvent.click(screen.getByRole('button', { name: /Anual/i }));
    expect(screen.queryByTestId('confirmed-promo-banner')).toBeNull();
    expect(telSoloCard.textContent).toContain('600');
    expect(telSoloCard.textContent).toContain('Cobrança anual parcelada');
    expect(telSoloCard.textContent).not.toContain('503');
    expect(telTable.textContent).toContain('600');
    expect(telTable.textContent).not.toContain('503');

    // Alternar para aba WhatsApp muda completamente os valores e recursos para WhatsApp (e volta ao Mensal para validar promo 349)
    fireEvent.click(screen.getByRole('tab', { name: confirmedCatalog.channels.whatsapp.name }));
    fireEvent.click(screen.getByRole('button', { name: 'Mensal' }));
    const waSoloCard = screen.getByTestId('plan-card-whatsapp-solo');
    const waTable = screen.getByTestId('pricing-comparison-table');
    expect(waSoloCard.textContent).toContain('349');
    expect(waSoloCard.textContent).toContain('450 conversas/mês');
    expect(waTable.textContent).toContain('349');
    expect(waTable.textContent).toContain('450 conversas/mês');
    expect(waTable.textContent).not.toContain('1.500 min/mês');
    expect(waTable.textContent).not.toContain('Minutos incluídos');
    expect(waTable.textContent).not.toContain('503');
    expect(detectPendingShownAsFact(container.textContent, confirmedCatalog).violations).toEqual([]);
  });

  it('DashboardPricingModal, WhatsAppPage e WebchatPage isolam métricas por canal e respeitam modalidade anual confirmada', () => {
    const modalRender = render(<DashboardPricingModal isOpen={true} onClose={vi.fn()} onOpenDemo={vi.fn()} />);
    const annualToggle = screen.getByRole('button', { name: 'Alternar modalidade anual' });
    expect(annualToggle).toBeTruthy();
    expect(detectPendingShownAsFact(modalRender.container.textContent, COMMERCIAL_CATALOG).violations).toEqual([]);

    fireEvent.click(annualToggle);
    expect(modalRender.container.textContent).toMatch(/Total anual antecipado \(12 meses\):\s*R\$\s*7\.188/);

    fireEvent.click(screen.getByRole('button', { name: 'WhatsApp IA' }));
    expect(modalRender.container.textContent).toContain('Conversas incluídas');
    expect(modalRender.container.textContent).toContain('4.788');
    expect(modalRender.container.textContent).not.toContain('Minutos incluídos');
    expect(modalRender.container.textContent).not.toContain('Chamadas simultâneas');

    fireEvent.click(screen.getByRole('button', { name: 'Webchat / Chatbot de IA' }));
    expect(modalRender.container.textContent).toContain('Conversas incluídas');
    expect(modalRender.container.textContent).toContain('2.988');
    expect(modalRender.container.textContent).not.toContain('Minutos incluídos');
    expect(modalRender.container.textContent).not.toContain('Números de WhatsApp');
    cleanup();

    const waRender = render(<WhatsAppPage onOpenDemo={vi.fn()} onOpenAuth={vi.fn()} />);
    expect(waRender.container.textContent).toContain('Conversas incluídas');
    expect(waRender.container.textContent).toContain('349');
    expect(waRender.container.textContent).not.toContain('Minutos incluídos');
    expect(detectPendingShownAsFact(waRender.container.textContent, COMMERCIAL_CATALOG).violations).toEqual([]);
    cleanup();

    const webRender = render(<WebchatPage onOpenDemo={vi.fn()} onOpenAuth={vi.fn()} />);
    expect(webRender.container.textContent).toContain('Conversas incluídas');
    expect(webRender.container.textContent).toContain('209');
    expect(webRender.container.textContent).not.toContain('Minutos incluídos');
    expect(detectPendingShownAsFact(webRender.container.textContent, COMMERCIAL_CATALOG).violations).toEqual([]);
  });

  it('ComparisonMatrixSection, ComparisonTable, LostRevenueCalculator e ExecutiveDossierModal não exibem R$ 297 ou pendentes como fato', () => {
    [
      <ComparisonMatrixSection key="cm" onOpenDemo={vi.fn()} onOpenAuth={vi.fn()} />,
      <ComparisonTable key="ct" />,
      <LostRevenueCalculator key="lr" onOpenDemo={vi.fn()} onOpenAuth={vi.fn()} />,
      <ExecutiveDossierModal key="ed" isOpen={true} onClose={vi.fn()} onOpenDemo={vi.fn()} />,
    ].forEach((node) => {
      const { container } = render(node);
      expect(container.textContent).not.toMatch(/297/);
      expect(detectPendingShownAsFact(container.textContent, COMMERCIAL_CATALOG).violations).toEqual([]);
      cleanup();
    });
  });

  it('WebchatWidget (Beatriz) responde perguntas comerciais e sobre excedentes com base na fonte única sem vazar pendentes', () => {
    vi.useFakeTimers();
    const { container } = render(<WebchatWidget onOpenDemo={vi.fn()} onOpenAuth={vi.fn()} />);

    fireEvent.click(screen.getByRole('button', { name: /Beatriz/i }));
    fireEvent.click(screen.getByRole('button', { name: /Planos & Preços/i }));

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(container.textContent).toContain('pendentes de confirmação comercial');
    expect(detectPendingShownAsFact(container.textContent, COMMERCIAL_CATALOG).violations).toEqual([]);

    // Pergunta específica: valor do WhatsApp e o que acontece ao ultrapassar o limite
    const input = screen.getByPlaceholderText('Pergunte à Beatriz...');
    fireEvent.change(input, {
      target: { value: 'Qual o valor do plano de WhatsApp e o que acontece após ultrapassar o limite?' },
    });
    fireEvent.submit(input.closest('form'));

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    const fullText = container.textContent || '';
    expect(fullText).toContain('349');
    expect(fullText).toContain('499');
    expect(fullText).toContain('4.788');
    expect(fullText).toContain('ultrapassar o limite está pendente de confirmação comercial');
    expect(fullText).toContain('excedente também está pendente de confirmação comercial');
    expect(detectPendingShownAsFact(fullText, COMMERCIAL_CATALOG).violations).toEqual([]);
  });
});

function telCardDoesNotShowUnconfirmedOverage(text) {
  return !text.includes('Contatos adicionais');
}
