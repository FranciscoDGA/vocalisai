import React from 'react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import AudioShowcaseSection from '../src/components/AudioShowcaseSection';
import NicheScriptGenerator from '../src/components/NicheScriptGenerator';
import VoiceStudioPlayground from '../src/components/VoiceStudioPlayground';
import InteractiveSimulator from '../src/components/InteractiveSimulator';
import VoiceWaveformHeroCard from '../src/components/VoiceWaveformHeroCard';
import VoiceTestimonialsSection from '../src/components/VoiceTestimonialsSection';
import CentralAjudaPage from '../src/components/CentralAjudaPage';
import OutboundCampaignsSection from '../src/components/OutboundCampaignsSection';
import AgencySubaccountsSection from '../src/components/AgencySubaccountsSection';
import InsideDashboardSection from '../src/components/InsideDashboardSection';
import TestCallModal from '../src/components/TestCallModal';
import { NICHES } from '../src/data/content';

vi.mock('../src/utils/supabaseClient', () => ({
  supabase: {
    auth: {
      onAuthStateChange: vi.fn(() => ({ data: { subscription: { unsubscribe: vi.fn() } } })),
    },
  },
  getLeads: vi.fn(async () => []),
  getAssistants: vi.fn(async () => []),
  saveAssistant: vi.fn(async () => ({ success: false })),
  updateAssistant: vi.fn(async () => ({ success: false })),
  deleteAssistant: vi.fn(async () => ({ success: false })),
  saveLead: vi.fn(async () => ({ success: true, data: { id: 'mock-id' } })),
  updateLead: vi.fn(async () => ({ success: true })),
}));

vi.mock('../src/utils/uazapiClient', () => ({
  sendWhatsAppMessage: vi.fn(async () => ({ success: true })),
  sendWhatsAppAudio: vi.fn(async () => ({ success: true })),
}));

vi.mock('../src/utils/vapiService', () => ({
  createVapiAssistant: vi.fn(async () => ({ success: false })),
  triggerOutboundCall: vi.fn(async () => ({ success: false })),
}));

vi.mock('../src/utils/voiceUtils', () => ({
  speakFemalePt: vi.fn((_text, onStart, onEnd) => {
    if (onStart) onStart();
    if (onEnd) onEnd();
  }),
  speakPersonaPt: vi.fn((_persona, _text, onStart, onEnd) => {
    if (onStart) onStart();
    if (onEnd) onEnd();
  }),
  speakText: vi.fn((_text, onEnd) => {
    if (onEnd) onEnd();
  }),
  stopSpeech: vi.fn(),
}));

vi.mock('../src/utils/geminiAudioService', () => ({
  speakRobertaVoice: vi.fn((_text, onStart, onEnd) => {
    if (onStart) onStart();
    if (onEnd) onEnd();
  }),
  stopRobertaVoice: vi.fn(),
}));

describe('Auditoria de exemplos e demonstrações para setores sensíveis', () => {
  beforeEach(() => {
    if (!Element.prototype.scrollIntoView) {
      Element.prototype.scrollIntoView = vi.fn();
    }
    if (!Element.prototype.scrollTo) {
      Element.prototype.scrollTo = vi.fn();
    }
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('AudioShowcaseSection substitui urgência odontológica por agendamento de rotina, remove promessa jurídica e explicita regras/aprovação', () => {
    const { container } = render(<AudioShowcaseSection onOpenDemo={vi.fn()} />);
    const clinicaText = container.textContent || '';

    expect(clinicaText).not.toMatch(/dor insuportável|siso|Descanse esta noite|dor de dente|horário de urgência amanhã/i);
    expect(clinicaText).toMatch(/Agendamento de Rotina/i);
    expect(clinicaText).toMatch(/sem sintomas urgentes|sem urgência/i);
    expect(clinicaText).toMatch(/responsável técnico/i);
    expect(clinicaText).toMatch(/encaminhamento humano|equipe humana/i);
    expect(clinicaText).toMatch(/base de conhecimento/i);
    expect(clinicaText).toMatch(/Simulação ilustrativa/i);
    expect(clinicaText).toMatch(/não oferecem conformidade clínica ou jurídica automática/i);

    // Aba Advocacia
    fireEvent.click(screen.getByRole('button', { name: /Escritório de Advocacia/i }));
    const advocaciaText = container.textContent || '';

    expect(advocaciaText).not.toMatch(/total sigilo|rescisão indireta|quebra de contrato|pasta jurídica|salvos com criptografia/i);
    expect(advocaciaText).toMatch(/Recepção Administrativa/i);
    expect(advocaciaText).toMatch(/não realizo análise jurídica|não avalio mérito|estimativa de valor de causa|estimo valor de causa/i);
    expect(advocaciaText).toMatch(/advogado habilitado|advogado responsável/i);
  });

  it('NicheScriptGenerator veda diagnóstico, triagem própria de urgência, parecer jurídico e coleta de CPF em demonstrações públicas', () => {
    const { container } = render(<NicheScriptGenerator onOpenAuth={vi.fn()} onOpenDemo={vi.fn()} />);

    // Clínica & Odontologia (aba inicial)
    const clinicaText = container.textContent || '';
    expect(clinicaText).not.toMatch(/priorize horários do mesmo dia ou dia seguinte/i);
    expect(clinicaText).toMatch(/agendamentos de rotina sem sintomas urgentes/i);
    expect(clinicaText).toMatch(/PROIBIDO DIAGNOSTICAR/i);
    expect(clinicaText).toMatch(/protocolo previamente revisado e aprovado pelo responsável técnico/i);
    expect(clinicaText).toMatch(/base de conhecimento/i);
    expect(clinicaText).toMatch(/sem conformidade clínica ou jurídica automática/i);

    // Advocacia
    fireEvent.click(screen.getByRole('button', { name: /Escritório de Advocacia/i }));
    const advText = container.textContent || '';
    expect(advText).toMatch(/PROIBIDO CONCLUIR OU ESTIMAR VALOR DE CAUSA/i);
    expect(advText).toMatch(/não prometa conformidade ética\/OAB automática/i);
    expect(advText).toMatch(/sujeito à aprovação do advogado responsável/i);

    // Finanças & Lembretes
    fireEvent.click(screen.getByRole('button', { name: /Finanças & Lembretes/i }));
    const finText = container.textContent || '';
    expect(finText).toMatch(/validação jurídica e de compliance da empresa/i);
    expect(finText).toMatch(/sem expor dados bancários, CPF ou informações sensíveis/i);

    // E-commerce & Varejo (não pede CPF real)
    fireEvent.click(screen.getByRole('button', { name: /E-commerce & Varejo/i }));
    const varejoText = container.textContent || '';
    expect(varejoText).not.toMatch(/Identifique o número do pedido ou CPF/i);
    expect(varejoText).toMatch(/código fictício do pedido/i);
  });

  it('VoiceStudioPlayground, InteractiveSimulator e VoiceWaveformHeroCard usam apenas dados fictícios e agendamento de rotina', () => {
    const playground = render(<VoiceStudioPlayground onOpenDemo={vi.fn()} onOpenAuth={vi.fn()} />);
    expect(playground.container.textContent).toContain('não oferecem conformidade clínica ou jurídica automática');
    fireEvent.click(screen.getByText('Camila'));
    expect(screen.getByPlaceholderText(/avaliação periódica de rotina/i)).toBeTruthy();
    expect(screen.queryByPlaceholderText(/Entendo a urgência do seu agendamento/i)).toBeNull();
    fireEvent.click(screen.getByText('Marcus'));
    expect(screen.queryByPlaceholderText(/atualizar o andamento do seu caso imediatamente/i)).toBeNull();
    expect(screen.getByPlaceholderText(/agendamento administrativo/i)).toBeTruthy();
    cleanup();

    const sim = render(<InteractiveSimulator onOpenDemo={vi.fn()} />);
    const simText = sim.container.textContent || '';
    expect(simText).not.toContain('Mariana Silveira');
    expect(simText).toContain('Exemplo Ilustrativo (00) 00000-0000');
    expect(simText).toContain('base de conhecimento e das regras definidas pelo cliente');
    fireEvent.click(screen.getByRole('button', { name: /Simulador de WhatsApp/i }));
    expect(sim.container.textContent).not.toContain('me informe a placa do carro');
    expect(sim.container.textContent).toContain('não informe placas, documentos ou dados pessoais reais');
    cleanup();

    const heroCard = render(<VoiceWaveformHeroCard onTestCall={vi.fn()} onOpenAuth={vi.fn()} />);
    expect(heroCard.container.textContent).toContain('consulta de rotina');
    fireEvent.click(screen.getByTitle('Pular para fala 2'));
    const heroText = heroCard.container.textContent || '';
    expect(heroText).toContain('Dados fictícios');
    expect(heroText).toContain('+55 00 00000-0000');
    expect(heroText).toContain('sem sintomas urgentes');
    expect(heroText).toContain('base de conhecimento e regras do cliente');
  });

  it('NICHES, VoiceTestimonialsSection e CentralAjudaPage explicitam ilustratividade, base do cliente e ausência de conformidade automática', () => {
    const saudeNiche = NICHES.find((n) => n.id === 'saude');
    const jurNiche = NICHES.find((n) => n.id === 'juridico');
    const finNiche = NICHES.find((n) => n.id === 'financeiro');

    expect(saudeNiche.description).toMatch(/rotina \(sem sintomas urgentes\)/i);
    expect(saudeNiche.description).toMatch(/Não realiza diagnóstico/i);
    expect(jurNiche.description).toMatch(/Não promete conclusão jurídica, valor de causa/i);
    expect(finNiche.description).toMatch(/sem consultoria financeira ou conformidade regulatória automática/i);

    const testimonials = render(<VoiceTestimonialsSection />);
    const testText = testimonials.container.textContent || '';
    expect(testText).toMatch(/simulações ilustrativas com dados fictícios/i);
    expect(testText).toMatch(/base de conhecimento e das regras definidas pelo cliente/i);
    expect(testText).toMatch(/sem diagnóstico clínico, parecer jurídico ou conformidade automática/i);
    cleanup();

    const ajuda = render(<CentralAjudaPage onBack={vi.fn()} onOpenAuth={vi.fn()} onOpenDemo={vi.fn()} />);
    fireEvent.click(screen.getByRole('button', { name: 'Como escrever um ótimo prompt' }));
    const ajudaText = ajuda.container.textContent || '';
    expect(ajudaText).not.toContain('Para números de telefone ou CPF, oriente a IA');
    expect(ajudaText).toContain('Evite coletar CPF ou dados pessoais sensíveis');
    expect(ajudaText).toContain('não avalie gravidade clínica nem recomende aguardar');
  });

  it('Painel (InsideDashboardSection), OutboundCampaignsSection, AgencySubaccountsSection e TestCallModal utilizam contatos fictícios e exigem aprovação profissional', () => {
    const out = render(<OutboundCampaignsSection />);
    fireEvent.click(screen.getByRole('button', { name: /Criar Nova Campanha/i }));
    fireEvent.click(screen.getByRole('button', { name: /Carregar Planilha Modelo/i }));
    const outText = out.container.textContent || '';
    expect(outText).toContain('exemplo_ficticio_confirmacao_rotina.csv (5 contatos)');
    expect(outText).not.toContain('pacientes_confirmacao_amanha.csv');
    cleanup();

    const agency = render(<AgencySubaccountsSection />);
    const agencyText = agency.container.textContent || '';
    expect(agencyText).toContain('Clínica Modelo Odonto (Exemplo Fictício)');
    expect(agencyText).toContain('Responsável Técnico (Exemplo)');
    expect(agencyText).toContain('Jurídico (Recepção Administrativa)');
    expect(agencyText).not.toContain('Carvalho & Advogados Associados');
    expect(agencyText).not.toContain('Dra. Camila Santos');
    cleanup();

    const dash = render(<InsideDashboardSection onOpenDemo={vi.fn()} onOpenLegal={vi.fn()} onOpenAuth={vi.fn()} />);
    // Expande menu "Mais" e abre "Templates de nicho"
    fireEvent.click(screen.getByTitle('Mais'));
    fireEvent.click(screen.getAllByRole('button', { name: /Templates de nicho/i })[0]);
    expect(dash.container.textContent).toContain('sem conformidade clínica ou jurídica automática');
    expect(dash.container.textContent).toContain('agendamento de rotina (sem sintomas urgentes)');

    // Abre BI de Vendas e confere contatos fictícios
    if (!screen.queryAllByRole('button', { name: /Radar de Objeções \(BI\)|BI de Vendas/i }).length) {
      fireEvent.click(screen.getByTitle('Mais'));
    }
    fireEvent.click(screen.getAllByRole('button', { name: /Radar de Objeções \(BI\)|BI de Vendas/i })[0]);
    const biText = dash.container.textContent || '';
    expect(biText).toContain('Contato Fictício 01 (Demo)');
    expect(biText).not.toContain('Dr. Rodrigo Menezes');
    cleanup();

    const modal = render(
      <TestCallModal isOpen={true} phoneNumber="(00) 00000-0000" onClose={vi.fn()} onOpenAuth={vi.fn()} />
    );
    expect(modal.container.textContent).toMatch(/simulação ilustrativa/i);
  });
});
