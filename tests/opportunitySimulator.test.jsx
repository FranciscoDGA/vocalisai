import React from 'react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import LostRevenueCalculator, {
  BLANK_SIMULATION_VALUES,
  DEFAULT_SIMULATION_EXAMPLES,
  calculateOpportunitySimulation,
} from '../src/components/LostRevenueCalculator';
import { COMMERCIAL_CATALOG } from '../src/data/commercialCatalog';
import { detectPendingShownAsFact } from '../src/utils/commercialCatalogUtils';

describe('Simulador transparente de oportunidade potencial (LostRevenueCalculator)', () => {
  beforeEach(() => {
    if (!Element.prototype.scrollIntoView) {
      Element.prototype.scrollIntoView = vi.fn();
    }
  });

  afterEach(() => {
    cleanup();
  });

  it('calcula exatamente o funil em cascata com os exemplos editáveis iniciais sem assumir 100% de conversão', () => {
    const result = calculateOpportunitySimulation(DEFAULT_SIMULATION_EXAMPLES);

    // 300 × 20% = 60 sem resposta × 50% = 30 recuperados × 20% = 6 conversões × R$ 250 = R$ 1.500,00/mês
    expect(result.inputs.contactsInPeriod).toBe(300);
    expect(result.unansweredContacts).toBe(60);
    expect(result.recoveredContacts).toBe(30);
    expect(result.estimatedConversions).toBe(6);
    expect(result.estimatedOpportunityMonthly).toBe(1500);
    expect(result.estimatedOpportunityAnnual).toBe(18000);
  });

  it('preserva precisão para valores fracionários e limita percentuais entre 0% e 100%', () => {
    const fractional = calculateOpportunitySimulation({
      contactsInPeriod: 25,
      unansweredPct: 10,
      recoveredPct: 50,
      conversionPct: 20,
      averageTicket: 400,
    });

    // 25 × 10% = 2,5 × 50% = 1,25 × 20% = 0,25 × R$ 400 = R$ 100,00
    expect(fractional.unansweredContacts).toBe(2.5);
    expect(fractional.recoveredContacts).toBe(1.25);
    expect(fractional.estimatedConversions).toBe(0.25);
    expect(fractional.estimatedOpportunityMonthly).toBe(100);
    expect(fractional.estimatedOpportunityAnnual).toBe(1200);

    const clamped = calculateOpportunitySimulation({
      contactsInPeriod: -50,
      unansweredPct: 180,
      recoveredPct: -10,
      conversionPct: 120,
      averageTicket: -200,
    });

    expect(clamped.inputs.contactsInPeriod).toBe(0);
    expect(clamped.inputs.unansweredPct).toBe(100);
    expect(clamped.inputs.recoveredPct).toBe(0);
    expect(clamped.inputs.conversionPct).toBe(100);
    expect(clamped.inputs.averageTicket).toBe(0);
    expect(clamped.estimatedOpportunityMonthly).toBe(0);
    expect(clamped.estimatedOpportunityAnnual).toBe(0);
  });

  it('retorna 0 quando qualquer parâmetro é zero ou está em branco (sem piso artificial Math.max)', () => {
    const keys = [
      'contactsInPeriod',
      'unansweredPct',
      'recoveredPct',
      'conversionPct',
      'averageTicket',
    ];

    keys.forEach((zeroKey) => {
      const zeroCase = calculateOpportunitySimulation({
        ...DEFAULT_SIMULATION_EXAMPLES,
        [zeroKey]: 0,
      });
      expect(zeroCase.estimatedOpportunityMonthly).toBe(0);
      expect(zeroCase.estimatedOpportunityAnnual).toBe(0);

      const blankCase = calculateOpportunitySimulation({
        ...DEFAULT_SIMULATION_EXAMPLES,
        [zeroKey]: '',
      });
      expect(blankCase.estimatedOpportunityMonthly).toBe(0);
      expect(blankCase.estimatedOpportunityAnnual).toBe(0);
    });

    const allBlank = calculateOpportunitySimulation(BLANK_SIMULATION_VALUES);
    expect(allBlank.estimatedOpportunityMonthly).toBe(0);
    expect(allBlank.estimatedOpportunityAnnual).toBe(0);
  });

  it('suporta valores altos na função pura e nos campos digitáveis da interface', () => {
    const highResult = calculateOpportunitySimulation({
      contactsInPeriod: 50000,
      unansweredPct: 40,
      recoveredPct: 75,
      conversionPct: 30,
      averageTicket: 10000,
    });

    // 50.000 × 40% = 20.000 × 75% = 15.000 × 30% = 4.500 × R$ 10.000 = R$ 45.000.000,00
    expect(highResult.unansweredContacts).toBe(20000);
    expect(highResult.recoveredContacts).toBe(15000);
    expect(highResult.estimatedConversions).toBe(4500);
    expect(highResult.estimatedOpportunityMonthly).toBe(45000000);
    expect(highResult.estimatedOpportunityAnnual).toBe(540000000);

    render(<LostRevenueCalculator onOpenDemo={vi.fn()} onOpenAuth={vi.fn()} />);

    fireEvent.change(screen.getByRole('spinbutton', { name: /^Contatos recebidos no período/i }), {
      target: { value: '50000' },
    });
    fireEvent.change(screen.getByRole('spinbutton', { name: /^Percentual que fica sem resposta/i }), {
      target: { value: '40' },
    });
    fireEvent.change(screen.getByRole('spinbutton', { name: /^Percentual de contatos recuperados/i }), {
      target: { value: '75' },
    });
    fireEvent.change(screen.getByRole('spinbutton', { name: /^Taxa de conversão em venda ou agendamento/i }), {
      target: { value: '30' },
    });
    fireEvent.change(screen.getByRole('spinbutton', { name: /^Valor médio da venda ou do serviço/i }), {
      target: { value: '10000' },
    });

    expect(screen.getByTestId('opportunity-monthly-output').textContent).toBe('R$ 45.000.000,00');
    expect(screen.getByTestId('opportunity-annual-output').textContent).toBe('R$ 540.000.000,00');
  });

  it('atualiza resultados e memória de cálculo ao alterar controles, limpar valores e restaurar exemplo', () => {
    const { container } = render(<LostRevenueCalculator onOpenDemo={vi.fn()} onOpenAuth={vi.fn()} />);

    // Estado inicial: exemplo editável transparente
    expect(screen.getByTestId('opportunity-monthly-output').textContent).toBe('R$ 1.500,00');
    expect(screen.getByTestId('opportunity-annual-output').textContent).toBe('R$ 18.000,00');
    expect(screen.getAllByText('Exemplo editável').length).toBe(5);

    // Ajusta via sliders e inputs numéricos
    fireEvent.change(screen.getByLabelText(/Controle deslizante: Contatos recebidos no período/i), {
      target: { value: '1000' },
    });
    fireEvent.change(screen.getByLabelText(/Controle deslizante: Percentual que fica sem resposta/i), {
      target: { value: '30' },
    });
    fireEvent.change(screen.getByLabelText(/Controle deslizante: Percentual de contatos recuperados/i), {
      target: { value: '60' },
    });
    fireEvent.change(screen.getByLabelText(/Controle deslizante: Taxa de conversão/i), {
      target: { value: '25' },
    });
    fireEvent.change(screen.getByLabelText(/Controle deslizante: Valor médio da venda/i), {
      target: { value: '500' },
    });

    // 1000 × 30% = 300 × 60% = 180 × 25% = 45 × R$ 500 = R$ 22.500,00/mês | R$ 270.000,00/ano
    expect(screen.getByTestId('opportunity-monthly-output').textContent).toBe('R$ 22.500,00');
    expect(screen.getByTestId('opportunity-annual-output').textContent).toBe('R$ 270.000,00');
    expect(screen.getAllByText('Valor definido por você').length).toBe(5);

    const breakdown = screen.getByTestId('opportunity-calculation-breakdown').textContent || '';
    expect(breakdown).toContain('1.000 × 30% = 300');
    expect(breakdown).toContain('300 × 60% = 180');
    expect(breakdown).toContain('180 × 25% = 45');
    expect(breakdown).toContain('45 × R$ 500,00 = R$ 22.500,00');

    // Botão limpar valores zera todas as entradas e o cálculo
    fireEvent.click(screen.getByRole('button', { name: /Limpar valores/i }));
    expect(screen.getByTestId('opportunity-monthly-output').textContent).toBe('R$ 0,00');
    expect(screen.getByTestId('opportunity-annual-output').textContent).toBe('R$ 0,00');
    expect(screen.getAllByText('Em branco (0)').length).toBe(5);

    // Botão restaurar exemplo retorna aos valores ilustrativos editáveis
    fireEvent.click(screen.getByRole('button', { name: /Restaurar exemplo editável/i }));
    expect(screen.getByTestId('opportunity-monthly-output').textContent).toBe('R$ 1.500,00');
    expect(screen.getAllByText('Exemplo editável').length).toBe(5);

    // Requisitos de conformidade comercial e transparência
    const fullText = container.textContent || '';
    expect(fullText).not.toMatch(/297/);
    expect(fullText).not.toMatch(/faturamento perdido/i);
    expect(fullText.toLowerCase()).toContain('estimativa ilustrativa');
    expect(fullText.toLowerCase()).toContain('nem todo contato vira cliente');
    expect(fullText.toLowerCase()).toContain(
      'os resultados variam conforme negócio, canal, equipe, demanda e configuração'
    );
    expect(detectPendingShownAsFact(fullText, COMMERCIAL_CATALOG).violations).toEqual([]);
  });

  it('oferece estrutura acessível para celular, teclado e leitor de tela', () => {
    render(<LostRevenueCalculator onOpenDemo={vi.fn()} onOpenAuth={vi.fn()} />);

    const resultRegion = screen.getByRole('region', {
      name: /Estimativa Ilustrativa de Oportunidade/i,
    });
    expect(resultRegion.getAttribute('aria-live')).toBe('polite');

    const spinbuttons = screen.getAllByRole('spinbutton');
    const sliders = screen.getAllByRole('slider');
    expect(spinbuttons.length).toBe(5);
    expect(sliders.length).toBe(5);

    spinbuttons.forEach((input) => {
      expect(input.getAttribute('inputmode')).toBe('decimal');
      expect(input.getAttribute('aria-describedby')).toBeTruthy();
    });

    sliders.forEach((slider) => {
      expect(slider.getAttribute('aria-label')).toContain('Controle deslizante:');
      expect(slider.getAttribute('aria-valuetext')).toBeTruthy();
      expect(slider.getAttribute('aria-describedby')).toBeTruthy();
    });
  });
});
