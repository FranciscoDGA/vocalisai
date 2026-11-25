import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup, waitFor, within } from '@testing-library/react';
import { formatDuration } from '../src/utils/durationUtils';
import { SOCIAL_LINKS } from '../src/data/content';

const {
  mockSupabaseClient,
  mockSendWhatsAppMessage,
  mockSendWhatsAppAudio,
  mockTriggerOutboundCall,
} = vi.hoisted(() => ({
  mockSupabaseClient: {
    isSupabaseConfigured: true,
    supabase: {
      auth: {
        onAuthStateChange: vi.fn(() => ({
          data: { subscription: { unsubscribe: vi.fn() } },
        })),
      },
    },
    signUpUser: vi.fn(async () => ({ error: 'Backend de cadastro não configurado neste ambiente.' })),
    signInUser: vi.fn(async () => ({ error: 'Credenciais inválidas' })),
    resetPasswordForEmail: vi.fn(async () => ({ error: null })),
    signOutUser: vi.fn(async () => ({ error: null })),
    getCurrentUser: vi.fn(async () => null),
    saveLead: vi.fn(async () => ({ data: null, error: null })),
    getLeads: vi.fn(async () => ({ data: [], error: null })),
    saveAssistant: vi.fn(async () => ({ data: null, error: null })),
    updateAssistant: vi.fn(async () => ({ data: null, error: null })),
    deleteAssistant: vi.fn(async () => ({ error: null })),
    getAssistants: vi.fn(async () => ({ data: [], error: null })),
    saveCall: vi.fn(async () => ({ data: null, error: null })),
    getCalls: vi.fn(async () => ({ data: [], error: null })),
  },
  mockSendWhatsAppMessage: vi.fn(async () => ({ error: 'disabled' })),
  mockSendWhatsAppAudio: vi.fn(async () => ({ error: 'disabled' })),
  mockTriggerOutboundCall: vi.fn(async () => ({ error: 'disabled' })),
}));

vi.mock('../src/utils/supabaseClient', () => mockSupabaseClient);
vi.mock('../src/utils/uazapiClient', () => ({
  sendWhatsAppMessage: mockSendWhatsAppMessage,
  sendWhatsAppAudio: mockSendWhatsAppAudio,
}));
vi.mock('../src/utils/vapiService', () => ({
  createVapiAssistant: vi.fn(async () => ({ error: 'disabled' })),
  updateVapiAssistant: vi.fn(async () => ({ error: 'disabled' })),
  listVapiAssistants: vi.fn(async () => ({ data: [], error: null })),
  deleteVapiAssistant: vi.fn(async () => ({ error: 'disabled' })),
  triggerOutboundCall: mockTriggerOutboundCall,
}));
vi.mock('../src/utils/geminiAudioService', () => ({
  fetchGeminiAudioUrl: vi.fn(async () => null),
  stopRobertaVoice: vi.fn(),
  stopSpeech: vi.fn(),
  speakRobertaVoice: vi.fn(),
  speakPersonaVoice: vi.fn(),
}));

import App from '../src/App';
import AuthModal from '../src/components/AuthModal';
import InsideDashboardSection from '../src/components/InsideDashboardSection';
import WhatsAppConnectorDashboard from '../src/components/WhatsAppConnectorDashboard';
import Footer from '../src/components/Footer';
import KnowledgeBaseTab from '../src/components/KnowledgeBaseTab';
import ImprensaPage from '../src/components/ImprensaPage';
import CentralAjudaPage from '../src/components/CentralAjudaPage';
import AgencySubaccountsSection from '../src/components/AgencySubaccountsSection';

describe('Auditoria de Fluxos, Segurança, Autenticação e Isolamento Demo vs Produção', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    window.sessionStorage.clear();
    window.localStorage.clear();
    window.history.pushState({}, '', '/');

    window.scrollTo = vi.fn();
    Element.prototype.scrollIntoView = vi.fn();
    window.IntersectionObserver = class {
      observe() {}
      unobserve() {}
      disconnect() {}
    };
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it('normaliza durações de chamadas sem exibir 00:63 e tratando >= 1 hora corretamente', () => {
    expect(formatDuration(0)).toBe('00:00');
    expect(formatDuration(59)).toBe('00:59');
    expect(formatDuration(60)).toBe('01:00');
    expect(formatDuration(63)).toBe('01:03');
    expect(formatDuration(3599)).toBe('59:59');
    expect(formatDuration(3600)).toBe('01:00:00');
    expect(formatDuration(-5)).toBe('00:00');
  });

  it('bloqueia acesso direto à rota /dashboard sem autenticação e não renderiza o painel real', async () => {
    window.history.pushState({}, '', '/dashboard');
    mockSupabaseClient.getCurrentUser.mockResolvedValueOnce(null);

    render(<App />);

    const authGate = await screen.findByTestId('dashboard-auth-gate');
    expect(authGate.textContent).toContain('Acesso restrito — faça login');
    expect(screen.queryByTestId('demo-mode-banner')).toBeNull();
  });

  it('preserva canal, plano e periodicidade escolhidos do PricingSection até o AuthModal e limpa ao cancelar', async () => {
    render(<App />);

    // Verificar que o botão "Ver planos (...)" do simulador navega para /precos corretamente
    const verPlanosBtn = screen.getByRole('button', { name: /Ver planos \(Webchat/i });
    fireEvent.click(verPlanosBtn);
    expect(window.location.pathname).toBe('/precos');

    // Mudar para aba IA de WhatsApp na seção de preços
    const waTab = await screen.findByRole('tab', { name: /IA de WhatsApp/i });
    fireEvent.click(waTab);

    // Selecionar plano Solo em WhatsApp
    const waSoloCard = screen.getByTestId('plan-card-whatsapp-solo');
    const selectWaSolo = within(waSoloCard).getByRole('button', { name: /Selecionar|Solicitar/i });
    fireEvent.click(selectWaSolo);

    const selectedBanner = await screen.findByTestId('auth-selected-plan');
    expect(selectedBanner.textContent).toContain('IA de WhatsApp');
    expect(selectedBanner.textContent).toContain('Solo');
    expect(selectedBanner.textContent).toContain('Mensal');

    const stored = JSON.parse(window.sessionStorage.getItem('vocalis_selected_plan'));
    expect(stored).toMatchObject({
      channelId: 'whatsapp',
      planName: 'Solo',
      billingCycle: 'mensal',
    });

    // Fechar AuthModal e confirmar fechamento seguro
    fireEvent.click(screen.getByRole('button', { name: 'Fechar janela de acesso' }));
    await waitFor(() => {
      expect(screen.queryByTestId('auth-selected-plan')).toBeNull();
    });
  });

  it('valida campos de AuthModal, bloqueia múltiplas falhas (rate-limit) e trata recuperação de senha sem simular login', async () => {
    const onClose = vi.fn();
    const authRender = render(
      <AuthModal
        isOpen={true}
        onClose={onClose}
        initialMode="signup"
        selectedPlan={{
          channelId: 'webchat',
          channelName: 'Webchat / Chatbot de IA',
          planKey: 'solo',
          planName: 'Solo',
          billingCycle: 'monthly',
          displayPrice: 'R$ 209',
        }}
      />
    );

    expect(screen.getByTestId('auth-selected-plan').textContent).toContain('Webchat');

    const formEl = authRender.container.querySelector('form');

    // Validação cliente: empresa curta + senha curta (dispara onSubmit diretamente para testar validação JS)
    fireEvent.change(screen.getByLabelText(/Nome da Empresa/i), { target: { value: 'A' } });
    fireEvent.change(screen.getByLabelText(/E-mail Comercial/i), { target: { value: 'teste@empresa.com' } });
    fireEvent.change(screen.getByLabelText(/Senha/i), { target: { value: '123' } });

    fireEvent.submit(formEl);
    expect(screen.getByText(/Informe o nome da empresa/i)).toBeTruthy();

    fireEvent.change(screen.getByLabelText(/Nome da Empresa/i), { target: { value: 'Clínica Exemplo' } });
    fireEvent.submit(formEl);
    expect(screen.getByText(/pelo menos 8 caracteres/i)).toBeTruthy();

    // Alternar para modo Login e disparar 3 falhas para acionar rate-limit cliente
    fireEvent.click(screen.getByRole('button', { name: /^Entrar$/i }));
    fireEvent.change(screen.getByLabelText(/E-mail Comercial/i), { target: { value: 'teste@empresa.com' } });
    fireEvent.change(screen.getByLabelText(/Senha/i), { target: { value: 'SenhaFalsa123' } });

    const loginFormEl = authRender.container.querySelector('form');
    fireEvent.submit(loginFormEl);
    await waitFor(() => expect(mockSupabaseClient.signInUser).toHaveBeenCalledTimes(1));

    fireEvent.submit(loginFormEl);
    await waitFor(() => expect(mockSupabaseClient.signInUser).toHaveBeenCalledTimes(2));

    fireEvent.submit(loginFormEl);
    await waitFor(() => expect(mockSupabaseClient.signInUser).toHaveBeenCalledTimes(3));

    fireEvent.submit(loginFormEl);
    expect(screen.getByText(/Muitas tentativas seguidas/i)).toBeTruthy();
  });

  it('isola painel demonstrativo de chamadas/envios reais e elimina Roberta e durações inválidas', () => {
    const { container } = render(
      <InsideDashboardSection isStandalone={false} currentUser={null} />
    );

    const banner = screen.getByTestId('demo-mode-banner');
    expect(banner.textContent).toContain('Ambiente de demonstração — dados fictícios');
    expect(container.textContent).not.toContain('00:63');
    expect(container.textContent).not.toContain('5594984423948');
    expect(container.textContent).not.toMatch(/\bRoberta\b/);

    // Navegar para aba Conversas e checar formatação 01:03 no histórico demo
    const conversasTabBtn = container.querySelector('button[title="Conversas"]');
    fireEvent.click(conversasTabBtn);
    expect(container.textContent).toContain('01:03');
    expect(container.textContent).not.toContain('00:63');

    // Abrir criação de assistente no modo demo e confirmar que não persiste em Supabase/Vapi/WhatsApp
    const assistantsTabBtn = container.querySelector('button[title="Assistentes"]');
    fireEvent.click(assistantsTabBtn);
    fireEvent.click(screen.getByRole('button', { name: /Criar assistente/i }));
    const createDialog = screen.getByRole('dialog');
    fireEvent.submit(createDialog.querySelector('form'));

    expect(mockSupabaseClient.saveAssistant).not.toHaveBeenCalled();
    expect(mockSupabaseClient.saveLead).not.toHaveBeenCalled();
    expect(mockSendWhatsAppMessage).not.toHaveBeenCalled();
    expect(mockTriggerOutboundCall).not.toHaveBeenCalled();
  });

  it('isola conta autenticada dos dados do workspace demo', async () => {
    const fakeUser = {
      id: 'user-test-001',
      email: 'conta@cliente-teste.example',
      user_metadata: { company_name: 'Empresa Autenticada Teste' },
    };

    const { container } = render(
      <InsideDashboardSection isStandalone={true} currentUser={fakeUser} />
    );

    expect(screen.queryByTestId('demo-mode-banner')).toBeNull();
    expect(container.textContent).toContain('Empresa Autenticada Teste');
    expect(container.textContent).not.toContain('Clara (Demo)');
    expect(container.textContent).not.toContain('01:03');
  });

  it('bloqueia completamente chamadas a localhost:8080 no ambiente público/demo', () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch');

    const { container } = render(
      <WhatsAppConnectorDashboard isDemoMode={true} isAuthenticatedAccount={false} />
    );

    expect(container.textContent).not.toContain('localhost:8080');
    expect(container.textContent).not.toContain('Baileys');
    expect(container.textContent).toContain('Modo Demonstração');
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it('oculta links sociais não confirmados no rodapé e mantém documentos legais acessíveis', () => {
    expect(SOCIAL_LINKS).toEqual([]);
    const onOpenDocs = vi.fn();
    const onNavigate = vi.fn();

    render(<Footer onOpenDocs={onOpenDocs} onNavigate={onNavigate} />);

    expect(screen.queryByRole('link', { name: /instagram\.com/i })).toBeNull();
    expect(screen.queryByRole('link', { name: /facebook\.com/i })).toBeNull();

    fireEvent.click(screen.getByRole('button', { name: 'Proteção de dados' }));
    expect(onOpenDocs).toHaveBeenCalledWith('privacidade');

    fireEvent.click(screen.getByRole('button', { name: 'Aviso legal' }));
    expect(onOpenDocs).toHaveBeenCalledWith('termos');
  });

  it('substitui window.alert por feedbacks honestos em tela em Imprensa, Central de Ajuda, Base de Conhecimento e Agência', () => {
    const originalAlert = window.alert;
    const alertSpy = vi.fn();
    window.alert = alertSpy;

    try {
      const imprensa = render(<ImprensaPage />);
      fireEvent.click(screen.getByRole('button', { name: /Logos/i }));
      const solicitarBtns = screen.getAllByRole('button', { name: 'Solicitar' });
      fireEvent.click(solicitarBtns[0]);
      expect(imprensa.container.textContent).toContain('contato@vocalis.ai');
      cleanup();

      const ajuda = render(<CentralAjudaPage onNavigateHome={vi.fn()} />);
      fireEvent.click(screen.getAllByText('Primeiros passos')[0]);
      fireEvent.click(screen.getByRole('button', { name: /👍 Sim/i }));
      expect(ajuda.container.textContent).toContain('Obrigado pelo seu feedback!');
      cleanup();

      const agency = render(<AgencySubaccountsSection isDemoMode={true} onSwitchWorkspace={vi.fn()} />);
      fireEvent.click(screen.getAllByRole('button', { name: /Ver prévia/i })[0]);
      expect(agency.container.textContent).toContain('Prévia demonstrativa');
      cleanup();

      const kb = render(
        <KnowledgeBaseTab
          knowledgeList={[
            { id: 1, name: 'Tabela de Preços', type: 'PDF', tokens: '1.200', status: 'Demonstração', description: 'Regra de teste local.' },
          ]}
          setKnowledgeList={vi.fn()}
          createdAssistants={[{ id: 1, name: 'Clara (Demo)' }]}
          isDemoMode={true}
          onOpenDemo={vi.fn()}
        />
      );
      expect(kb.container.textContent).toContain('Base Fictícia (Demo)');
      expect(kb.container.textContent).not.toContain('IA Neural Sincronizada');

      expect(alertSpy).not.toHaveBeenCalled();
    } finally {
      window.alert = originalAlert;
    }
  });
});
