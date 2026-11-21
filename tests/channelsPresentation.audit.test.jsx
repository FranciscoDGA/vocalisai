import React from 'react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, cleanup, act } from '@testing-library/react';
import WhatsAppPage from '../src/components/WhatsAppPage';
import WhatsAppConnectorDashboard from '../src/components/WhatsAppConnectorDashboard';
import RecepcionistaVirtualPage from '../src/components/RecepcionistaVirtualPage';
import AtendedorAutomaticoPage from '../src/components/AtendedorAutomaticoPage';
import EquipeExternaPage from '../src/components/EquipeExternaPage';
import AgendamentosPage from '../src/components/AgendamentosPage';
import AgenteSuportePage from '../src/components/AgenteSuportePage';
import WebchatWidget from '../src/components/WebchatWidget';
import WebchatPage from '../src/components/WebchatPage';
import ChannelsSection from '../src/components/ChannelsSection';
import SobrePage from '../src/components/SobrePage';
import CentralAjudaPage from '../src/components/CentralAjudaPage';

vi.mock('../src/utils/supabaseClient', () => ({
  supabase: {
    auth: {
      onAuthStateChange: vi.fn(() => ({ data: { subscription: { unsubscribe: vi.fn() } } })),
    },
  },
  saveLead: vi.fn(async () => ({ success: true, data: { id: 'mock-id' } })),
  updateLead: vi.fn(async () => ({ success: true })),
}));

vi.mock('../src/utils/uazapiClient', () => ({
  sendWhatsAppMessage: vi.fn(async () => ({ success: true })),
  sendWhatsAppAudio: vi.fn(async () => ({ success: true })),
}));

vi.mock('../src/utils/geminiAudioService', () => ({
  speakRobertaVoice: vi.fn((_text, onStart, onEnd) => {
    if (onStart) onStart();
    if (onEnd) onEnd();
  }),
  stopRobertaVoice: vi.fn(),
}));

describe('Auditoria por canal: WhatsApp, Telefone e Webchat', () => {
  beforeEach(() => {
    if (!Element.prototype.scrollIntoView) {
      Element.prototype.scrollIntoView = vi.fn();
    }
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => ({
        ok: false,
        json: async () => ({ status: 'offline' }),
      }))
    );
  });

  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
    vi.useRealTimers();
  });

  it('WhatsAppPage e WhatsAppConnectorDashboard distinguem API Oficial vs Baileys não oficial e retiram conexão não oficial da oferta pública', () => {
    const waRender = render(<WhatsAppPage onOpenDemo={vi.fn()} onOpenAuth={vi.fn()} />);
    const waText = waRender.container.textContent || '';

    expect(waText).toContain('WhatsApp Business Platform (API Oficial Meta)');
    expect(waText).toContain('WhatsApp Web / Baileys (Não Oficial)');
    expect(waText).toContain('Retirado da oferta pública principal');
    expect(waText).not.toContain('Toda mensagem respondida');
    expect(waText).not.toContain('Seu cliente mandou mensagem, já foi respondido');
    cleanup();

    const dashRender = render(<WhatsAppConnectorDashboard userPhone="559484423948" />);
    const dashText = dashRender.container.textContent || '';

    expect(dashText).toContain('Protótipo Experimental Local');
    expect(dashText).toContain('retirada da oferta comercial pública principal');
    expect(dashText).not.toContain('Sessão SalvaPermanente');
    expect(dashText).not.toContain('Não precisa escanear novamente');
  });

  it('Páginas de soluções telefônicas rotulam formulário como simulação ilustrativa e citam terceiros/limites do catálogo', () => {
    const telephonyPages = [
      <RecepcionistaVirtualPage key="rec" onOpenDemo={vi.fn()} onOpenAuth={vi.fn()} />,
      <AtendedorAutomaticoPage key="ate" onOpenDemo={vi.fn()} onOpenAuth={vi.fn()} />,
      <EquipeExternaPage key="equ" onOpenDemo={vi.fn()} onOpenAuth={vi.fn()} />,
      <AgendamentosPage key="age" onOpenDemo={vi.fn()} onOpenAuth={vi.fn()} />,
      <AgenteSuportePage key="sup" onOpenDemo={vi.fn()} onOpenAuth={vi.fn()} />,
    ];

    telephonyPages.forEach((node) => {
      const { container } = render(node);
      const text = container.textContent || '';

      expect(text).toContain('Abrir simulação ilustrativa');
      expect(text).toContain('Simulação ilustrativa no navegador (Web Speech / TTS)');
      expect(text).toContain('provedores terceiros (como Vapi e operadora SIP)');
      expect(text).not.toMatch(/nunca perca uma ligação/i);
      cleanup();
    });
  });

  it('WebchatWidget identifica claramente que é IA em todos os estados e encaminha para formulário humano quando solicitado', () => {
    vi.useFakeTimers();
    const onOpenDemo = vi.fn();
    const { container } = render(<WebchatWidget onOpenDemo={onOpenDemo} onOpenAuth={vi.fn()} />);

    // Botão fechado já informa IA
    const closedButton = screen.getByRole('button', { name: /Beatriz/i });
    expect(closedButton.textContent).toContain('Assistente de IA');
    expect(closedButton.textContent).toContain('Chat Automatizado por IA');

    // Abre o chat e verifica identificação explícita de IA
    fireEvent.click(closedButton);
    expect(container.textContent).toContain('Você está falando com uma IA');
    expect(container.textContent).toContain('IA Automatizada');
    expect(container.textContent).toContain('assistente virtual de Inteligência Artificial (IA)');

    // Ao pedir atendente humano, responde como IA e oferece botão para equipe humana
    const input = screen.getByPlaceholderText('Pergunte à Beatriz...');
    fireEvent.change(input, { target: { value: 'Quero falar com um humano' } });
    fireEvent.submit(input.closest('form'));

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(container.textContent).toContain('não transfere automaticamente para atendente humano ao vivo');
    const handoffButtons = screen.getAllByRole('button', { name: /Falar com a equipe humana/i });
    expect(handoffButtons.length).toBeGreaterThan(0);
    fireEvent.click(handoffButtons[0]);
    expect(onOpenDemo).toHaveBeenCalled();
  });

  it('WebchatPage, ChannelsSection, SobrePage e CentralAjudaPage diferenciam simulação/sob consulta e não prometem contexto unificado universal', () => {
    const webPage = render(<WebchatPage onOpenDemo={vi.fn()} onOpenAuth={vi.fn()} />);
    const webText = webPage.container.textContent || '';
    expect(webText).toContain('Exemplo Ilustrativo de Script (Sob Consulta)');
    expect(webText).toContain('CDN externo não publicado no código aberto');
    expect(webText).not.toContain('Deixe a Vocalis responder dúvidas e fechar vendas');
    cleanup();

    const channels = render(<ChannelsSection onOpenDemo={vi.fn()} />);
    expect(channels.container.textContent).not.toContain('unifica o atendimento');
    expect(channels.container.textContent).not.toContain('contexto unificado');
    cleanup();

    const sobre = render(<SobrePage onOpenDemo={vi.fn()} onOpenAuth={vi.fn()} />);
    expect(sobre.container.textContent).not.toContain('Atendimento Unificado');
    cleanup();

    const ajuda = render(<CentralAjudaPage onNavigateHome={vi.fn()} onOpenDemo={vi.fn()} onOpenAuth={vi.fn()} />);
    const ajudaText = ajuda.container.textContent || '';
    expect(ajudaText).not.toContain('Histórico unificado de conversas');
    expect(ajudaText).not.toContain('margem de até 50%');
    expect(ajudaText).not.toContain('em milissegundos');
  });
});
