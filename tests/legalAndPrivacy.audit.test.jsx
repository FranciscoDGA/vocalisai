import React from 'react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, cleanup, act } from '@testing-library/react';
import DocsPortal from '../src/components/DocsPortal';
import LegalModal from '../src/components/LegalModal';
import Footer from '../src/components/Footer';
import DemoModal from '../src/components/DemoModal';
import ExitIntentModal from '../src/components/ExitIntentModal';
import ContatoPage from '../src/components/ContatoPage';
import TestCallModal from '../src/components/TestCallModal';
import * as supabaseClient from '../src/utils/supabaseClient';
import * as uazapiClient from '../src/utils/uazapiClient';

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

describe('Revisão técnica e jurídica: Privacidade, Termos, Garantias e Coleta de Telefone', () => {
  beforeEach(() => {
    if (!Element.prototype.scrollIntoView) {
      Element.prototype.scrollIntoView = vi.fn();
    }
    sessionStorage.clear();
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it('DocsPortal e LegalModal removem alegações não comprovadas e sinalizam pendências de confirmação', () => {
    ['privacidade', 'termos', 'dpa', 'exclusao'].forEach((docKey) => {
      const { container } = render(
        <DocsPortal isOpen={true} initialDoc={docKey} onClose={vi.fn()} onOpenApp={vi.fn()} />
      );
      const text = container.textContent || '';

      expect(text).not.toMatch(/criptografia ponta a ponta/i);
      expect(text).not.toContain('Segurança e Privacidade Garantidas');
      expect(text).not.toContain('em estrita observância à Lei Geral de Proteção de Dados');
      expect(text.toUpperCase()).toContain('PENDENTE DE CONFIRMAÇÃO');
      cleanup();
    });

    ['privacidade', 'termos'].forEach((tabKey) => {
      const { container } = render(
        <LegalModal isOpen={true} initialTab={tabKey} onClose={vi.fn()} />
      );
      const text = container.textContent || '';

      expect(text).not.toMatch(/criptografia ponta a ponta/i);
      expect(text).not.toContain('Segurança e Privacidade Garantidas');
      expect(text).not.toContain('em estrita observância à Lei Geral de Proteção de Dados');
      expect(text.toUpperCase()).toContain('PENDENTE');
      cleanup();
    });
  });

  it('Footer abre a aba correta de Exclusão de dados (exclusao)', () => {
    const onOpenDocs = vi.fn();
    render(
      <Footer
        onOpenDocs={onOpenDocs}
        onOpenDemo={vi.fn()}
        onNavigate={vi.fn()}
        onOpenDossier={vi.fn()}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: 'Exclusão de dados' }));
    expect(onOpenDocs).toHaveBeenCalledWith('exclusao');
  });

  it('TestCallModal executa simulação ilustrativa sem salvar lead ocultamente nem disparar WhatsApp real', () => {
    vi.useFakeTimers();
    const saveLeadSpy = supabaseClient.saveLead;
    const updateLeadSpy = supabaseClient.updateLead;
    const sendWaSpy = uazapiClient.sendWhatsAppMessage;
    saveLeadSpy.mockClear();
    updateLeadSpy.mockClear();
    sendWaSpy.mockClear();

    render(
      <TestCallModal
        isOpen={true}
        phoneNumber="(11) 98765-4321"
        countryCode="+55"
        onClose={vi.fn()}
        onOpenAuth={vi.fn()}
      />
    );

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    // Avança pelas etapas da simulação (ramo -> gargalo -> prévia de WhatsApp/Pix)
    fireEvent.click(screen.getByRole('button', { name: /Clínica Odontológica/i }));
    fireEvent.click(screen.getByRole('button', { name: /Perdemos muitos clientes após as 18h/i }));

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(saveLeadSpy).not.toHaveBeenCalled();
    expect(updateLeadSpy).not.toHaveBeenCalled();
    expect(sendWaSpy).not.toHaveBeenCalled();
  });

  it('DemoModal, ExitIntentModal e ContatoPage informam claramente o uso dos dados ao enviar contato', () => {
    const demoRender = render(<DemoModal isOpen={true} onClose={vi.fn()} />);
    expect(demoRender.container.textContent).toContain(
      'Ao enviar, seus dados (incluindo nome, telefone/WhatsApp, e-mail e empresa) são registrados para que nossa equipe retorne sobre a demonstração solicitada'
    );
    cleanup();

    const exitRender = render(<ExitIntentModal onTriggerCall={vi.fn()} />);
    fireEvent(document, new MouseEvent('mouseleave', { clientY: 5 }));
    expect(exitRender.container.textContent).toContain(
      'os dados são registrados apenas ao enviar sua solicitação para contato da equipe'
    );
    cleanup();

    const contatoRender = render(<ContatoPage onOpenAuth={vi.fn()} onOpenDemo={vi.fn()} />);
    fireEvent.click(screen.getByRole('button', { name: /Quero ser cliente/i }));
    expect(contatoRender.container.textContent).toContain(
      'os dados informados (nome, e-mail, telefone/WhatsApp e mensagem) serão utilizados para retorno da equipe comercial ou de parcerias'
    );
  });
});
