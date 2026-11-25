import React from 'react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import Hero from '../src/components/Hero';
import App from '../src/App';

vi.mock('../src/utils/supabaseClient', () => ({
  isSupabaseConfigured: false,
  supabase: {
    auth: {
      onAuthStateChange: vi.fn(() => ({
        data: { subscription: { unsubscribe: vi.fn() } },
      })),
    },
  },
  getCurrentUser: vi.fn(async () => null),
  signOutUser: vi.fn(async () => ({ success: true })),
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

describe('Smoke test de renderização do Hero e App', () => {
  beforeEach(() => {
    window.history.pushState({}, '', '/');
    window.scrollTo = vi.fn();
    if (!Element.prototype.scrollIntoView) {
      Element.prototype.scrollIntoView = vi.fn();
    }
    if (!window.IntersectionObserver) {
      window.IntersectionObserver = vi.fn(() => ({
        observe: vi.fn(),
        unobserve: vi.fn(),
        disconnect: vi.fn(),
      }));
    }
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('renderiza o Hero sem erros e monta link válido de WhatsApp ao clicar em "Falar com uma pessoa"', () => {
    render(<Hero onOpenDemo={vi.fn()} onOpenAuth={vi.fn()} onNavigate={vi.fn()} />);

    expect(
      screen.getByRole('heading', { level: 1, name: /Atenda seus clientes com IA/i })
    ).toBeTruthy();

    fireEvent.click(screen.getByRole('button', { name: /Falar com uma pessoa/i }));

    const whatsappLink = screen.getByRole('link', { name: /WhatsApp comercial/i });
    const href = whatsappLink.getAttribute('href') || '';
    const expectedMessage =
      'Olá! Vim pelo site da Vocalis AI e gostaria de conversar com uma pessoa sobre o atendimento com IA.';

    expect(href.startsWith('https://wa.me/5594984423948?text=')).toBe(true);
    expect(href).toContain(encodeURIComponent(expectedMessage));
  });

  it('renderiza a página inicial completa do App sem exceções', async () => {
    render(<App />);

    expect(
      screen.getByRole('heading', { level: 1, name: /Atenda seus clientes com IA/i })
    ).toBeTruthy();
    expect(screen.getAllByRole('navigation').length).toBeGreaterThan(0);
    expect(screen.getByText(/© 2026 Vocalis AI\. Todos os direitos reservados\./i)).toBeTruthy();
  });

  it('renderiza a rota /blog/melhor-ia-para-atendimento-whatsapp sem exceções', async () => {
    window.history.pushState({}, '', '/blog/melhor-ia-para-atendimento-whatsapp');
    render(<App />);

    const heading = await screen.findByRole('heading', {
      level: 1,
      name: /Melhor IA para Atendimento no WhatsApp \(2026\)/i,
    });
    expect(heading).toBeTruthy();
  });

  it('renderiza a rota /blog/atendimento-automatico-whatsapp-inteligencia-artificial sem exceções', async () => {
    window.history.pushState({}, '', '/blog/atendimento-automatico-whatsapp-inteligencia-artificial');
    render(<App />);

    const heading = await screen.findByRole('heading', {
      level: 1,
      name: /Atendimento Automático no WhatsApp com Inteligência Artificial/i,
    });
    expect(heading).toBeTruthy();
  });
});
