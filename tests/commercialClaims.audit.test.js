import fs from 'node:fs';
import path from 'node:path';
import React from 'react';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, cleanup, fireEvent, screen } from '@testing-library/react';
import LiveSocialProofToasts from '../src/components/LiveSocialProofToasts';
import VoiceTestimonialsSection from '../src/components/VoiceTestimonialsSection';
import SystemStatusBadge from '../src/components/SystemStatusBadge';
import LiveSoundwaveBars from '../src/components/LiveSoundwaveBars';
import VoiceWaveformHeroCard from '../src/components/VoiceWaveformHeroCard';
import AudioShowcaseSection from '../src/components/AudioShowcaseSection';

const ROOT_DIR = path.resolve(import.meta.dirname, '..');

function collectAuditTargets() {
  const targets = [
    {
      relPath: 'index.html',
      content: fs.readFileSync(path.join(ROOT_DIR, 'index.html'), 'utf8'),
    },
    {
      relPath: 'public/llms.txt',
      content: fs.readFileSync(path.join(ROOT_DIR, 'public', 'llms.txt'), 'utf8'),
    },
    {
      relPath: 'src/App.jsx',
      content: fs.readFileSync(path.join(ROOT_DIR, 'src', 'App.jsx'), 'utf8'),
    },
    {
      relPath: 'src/utils/aiService.js',
      content: fs.readFileSync(path.join(ROOT_DIR, 'src', 'utils', 'aiService.js'), 'utf8'),
    },
  ];

  // Em content.js auditamos exclusivamente o trecho comercial anterior aos textos legais
  const rawContentJs = fs.readFileSync(path.join(ROOT_DIR, 'src', 'data', 'content.js'), 'utf8');
  const privacyMarkerIdx = rawContentJs.indexOf('export const PRIVACY_POLICY');
  targets.push({
    relPath: 'src/data/content.js (trecho comercial)',
    content: privacyMarkerIdx >= 0 ? rawContentJs.slice(0, privacyMarkerIdx) : rawContentJs,
  });

  const componentsDir = path.join(ROOT_DIR, 'src', 'components');
  fs.readdirSync(componentsDir).forEach((entry) => {
    if (!/\.jsx$/.test(entry)) return;
    if (entry === 'DocsPortal.jsx' || entry === 'LegalModal.jsx') return;
    const fullPath = path.join(componentsDir, entry);
    targets.push({
      relPath: `src/components/${entry}`,
      content: fs.readFileSync(fullPath, 'utf8'),
    });
  });

  return targets;
}

const PROHIBITED_CLAIM_PATTERNS = [
  // Garantias absolutas
  { label: 'Garantia absoluta: nunca perde uma venda', re: /nunca perde uma venda/i },
  { label: 'Garantia absoluta: nunca dorme', re: /nunca dorme/i },
  { label: 'Garantia absoluta: nenhum cliente fica sem resposta', re: /nenhum cliente fica sem resposta/i },
  { label: 'Garantia absoluta: zero interrupções', re: /zero interrupç/i },
  { label: 'Garantia absoluta: zero faltas / zerar no-show', re: /(?:zero faltas|zerar no-show|zerar o no-show|zerando faltas|zera as faltas)/i },
  { label: 'Garantia absoluta: zero risco / garantia blindada', re: /(?:zero risco|garantia blindada)/i },
  { label: 'Garantia absoluta: 100% disponibilidade / operacionais / precisão', re: /(?:100% de disponibilidade|100% operacionais|100% de precis|100% no ar e atendendo)/i },
  { label: 'Garantia absoluta: sem alucinar / blindado contra alucinações', re: /(?:sem alucinar|blindado contra alucinações)/i },
  { label: 'Garantia absoluta: zero vazamento / elimina perda / retorno imediato', re: /(?:zero vazamento de dados|elimina perda de faturamento|retorno financeiro imediato|sem perder nenhum lead|nunca mais perca)/i },
  { label: 'Garantia absoluta: atendimento no primeiro toque', re: /(?:atende(?:m)?|atendimento|atendida|responde)\s+no\s+(?:primeiro|1º)\s+toque|no\s+1º\s+toque|no\s+primeiro\s+segundo/i },

  // Métricas, SLA, latência e escala não comprovadas
  {
    label: 'Latência numérica não comprovada',
    re: /(?:<|&lt;|abaixo de|inferior a|Latência(?:\s+Neural)?\s*:?)\s*(?:310|320|340|360|380|390|420|450|500|quatrocentos e cinquenta)\s*(?:ms|milissegundos)/i,
  },
  { label: 'Estatística não comprovada: 90% não percebem IA', re: /90% das pessoas não percebem/i },
  { label: 'Uptime/disponibilidade numérica não comprovada (99,98% / 99,8%)', re: /(?:99[.,]98%|99[.,]8%)/i },
  { label: 'SLA Contratual numérico não comprovado', re: /SLA Contratual:\s*99[.,]9%/i },
  { label: 'Escala de integrações/CRMs não comprovada (100+ / 2.000+)', re: /(?:100\+\s*(?:chamadas|CRMs|integraç)|mais de 100\s+(?:CRMs|integraç|conectores)|2\.000\+\s*ferramentas)/i },
  { label: 'Escala simultânea não comprovada (centenas)', re: /centenas de (?:pessoas|clientes)/i },
  { label: 'Estatísticas institucionais não comprovadas', re: /(?:1 milhão de minutos|\+150\.000|superou 82%|68% desligam|98\.7%|52\.8% de conversão final|10x mais barato que call center|R\$ 0,42)/i },
  { label: 'Alegação técnica não comprovada: nível militar', re: /nível militar/i },

  // Afirmações Meta / WhatsApp não comprovadas
  { label: 'Alegação não comprovada: sem taxas Meta / zero taxas', re: /(?:sem taxas.*meta|sem pagar taxas.*meta|zero taxas por mensagem|sem as tarifas de cobrança.*meta)/i },
  { label: 'Alegação não comprovada: parceria/homologação oficial Meta', re: /(?:meta business partner|como parceiros oficiais|homologado na cloud api)/i },

  // Prazos de implantação e garantias contraditórias não confirmadas
  {
    label: 'Prazo de implantação/teste não comprovado',
    re: /(?:em menos de (?:5|10) minutos|pronto em 5 minutos|em 3 minutos|em 2 minutos|em poucos minutos|configuração em minutos|no ar em minutos|entregamos tudo pronto em 24h|em menos de 24 horas|chave na mão em 24 horas|chave na mão \(24 horas\)|em 30 segundos)/i,
  },
  {
    label: 'Garantia comercial não confirmada (14 vs 30 dias / dinheiro de volta)',
    re: /(?:garantia (?:incondicional )?de (?:14|30) dias|30 dias de teste sem risco|14 dias de teste|ou receba seu dinheiro|ou seu dinheiro de volta)/i,
  },

  // Depoimentos, avaliações e notificações fictícias
  { label: 'Título enganoso: PROVA SOCIAL EM ÁUDIO REAL', re: /PROVA SOCIAL EM ÁUDIO REAL/i },
  { label: 'Avaliação Schema.org não comprovada (aggregateRating)', re: /aggregateRating/i },
  {
    label: 'Depoimentos/notificações atribuídos a nomes fictícios sem autorização',
    re: /(?:Marcos Silveira|Juliana Vasconcelos|Eduardo Mendonça|Rodrigo Camargo|Mariana O\.|Grupo Imobiliário Alfa|Silveira & Associados|Rodrigo Carvalho|AutoCar Motors|Fechamos 3x mais orçamentos|pagou em 4 dias)/i,
  },
];

describe('Auditoria de afirmações comerciais e simulações ilustrativas', () => {
  beforeEach(() => {
    if (!Element.prototype.scrollTo) {
      Element.prototype.scrollTo = () => {};
    }
  });

  afterEach(() => {
    cleanup();
  });

  it('garante ausência de garantias absolutas, métricas não comprovadas, selos falsos e depoimentos fictícios no código público', () => {
    const violations = [];
    const targets = collectAuditTargets();

    targets.forEach(({ relPath, content }) => {
      PROHIBITED_CLAIM_PATTERNS.forEach(({ label, re }) => {
        const match = content.match(re);
        if (match) {
          violations.push(`${relPath}: [${label}] -> "${match[0]}"`);
        }
      });
    });

    expect(violations).toEqual([]);
  });

  it('LiveSocialProofToasts sem eventos verificados não renderiza notificações fictícias', () => {
    const { container } = render(React.createElement(LiveSocialProofToasts));
    expect(container.firstChild).toBeNull();
  });

  it('VoiceTestimonialsSection identifica exemplos como simulação ilustrativa sem nomes fictícios ou PROVA SOCIAL EM ÁUDIO REAL', () => {
    const { container } = render(React.createElement(VoiceTestimonialsSection));
    const text = container.textContent || '';

    expect(text.toLowerCase()).toContain('simulação ilustrativa');
    expect(text).not.toContain('PROVA SOCIAL EM ÁUDIO REAL');
    expect(text).not.toContain('Marcos Silveira');
    expect(text).not.toContain('Juliana Vasconcelos');
    expect(text).not.toContain('Eduardo Mendonça');
  });

  it('SystemStatusBadge não exibe telemetria ou uptime fictícios (99.98% / Sistemas 100% Operacionais)', () => {
    const { container } = render(React.createElement(SystemStatusBadge));
    expect(container.textContent).not.toContain('99.98%');
    expect(container.textContent).not.toContain('Sistemas 100% Operacionais');

    fireEvent.click(screen.getByRole('button', { name: /Informações de Operação e SLA/i }));
    expect(container.textContent).not.toContain('99.98%');
    expect(container.textContent).not.toContain('320ms');
    expect(container.textContent).toContain('não são publicados por telemetria pública');
  });

  it('LiveSoundwaveBars não exibe latência numérica aleatória ou fixa em milissegundos', () => {
    const { container } = render(React.createElement(LiveSoundwaveBars));
    expect(container.textContent).not.toMatch(/\d+\s*ms/i);
    expect(container.textContent.toLowerCase()).toContain('ilustrativa');
  });

  it('VoiceWaveformHeroCard e AudioShowcaseSection identificam explicitamente as demonstrações como simulação ilustrativa', () => {
    const heroRender = render(React.createElement(VoiceWaveformHeroCard, { onTestCall: () => {}, onOpenAuth: () => {} }));
    expect((heroRender.container.textContent || '').toLowerCase()).toContain('simulação ilustrativa');
    expect(heroRender.container.textContent).not.toMatch(/\b(?:340|360|380)ms\b/i);
    cleanup();

    const showcaseRender = render(React.createElement(AudioShowcaseSection, { onOpenDemo: () => {} }));
    expect((showcaseRender.container.textContent || '').toLowerCase()).toContain('simulação ilustrativa');
    expect(showcaseRender.container.textContent).not.toContain('380ms');
  });
});
