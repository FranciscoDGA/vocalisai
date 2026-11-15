import React from 'react';
import LiveSoundwaveBars from './LiveSoundwaveBars';
import { 
  Sparkles, ShieldCheck, Zap, Headphones, CheckCircle2, ArrowRight, 
  Users, Building2, Phone, MessageSquare, Award, HeartHandshake, Globe2
} from 'lucide-react';
import { BRAND } from '../data/content';
import VocalisLogo from './VocalisLogo';

export default function SobrePage({ onOpenDemo, onOpenAuth, onNavigate }) {
  const milestones = [
    { number: '<380ms', label: 'Latência de Conversação', desc: 'Respostas quase instantâneas que eliminam silêncios e pausas mecânicas.' },
    { number: '+150.000', label: 'Chamadas Processadas', desc: 'Minutos de conversas reais gerenciados com precisão e empatia no Brasil.' },
    { number: '99.8%', label: 'Taxa de Disponibilidade', desc: 'Infraestrutura redundante com comutação de alta disponibilidade 24/7/365.' },
    { number: 'Zero', label: 'Perda de Vendas Fora do Horário', desc: 'Atendimento e agendamento contínuos em noites, fins de semana e feriados.' }
  ];

  const pillars = [
    {
      icon: Zap,
      title: 'Action-First AI (Ações em Tempo Real)',
      desc: 'Nossa inteligência não se limita a anotar recados ou responder dúvidas básicas. Durante a chamada telefônica ou conversa de WhatsApp, a Vocalis emite cobranças Pix com desconto, sincroniza horários no Google Agenda e transfere clientes quentes para o especialista humano.'
    },
    {
      icon: Headphones,
      title: 'Voz Neural Brasileira com Sotaque Nativo',
      desc: 'Adeus às URAs robóticas de "digite 1 para falar com financeiro". A Vocalis foi calibrada para a cadência, respiração e modulação fonética autêntica do português brasileiro, entendendo interrupções naturais e expressões regionais.'
    },
    {
      icon: ShieldCheck,
      title: 'Segurança Institucional & Blindagem LGPD',
      desc: 'Em total conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018). Dados criptografados de ponta a ponta, armazenamento seguro em solo brasileiro e garantia absoluta de que seus dados e de seus clientes jamais serão compartilhados ou usados para treinar IAs públicas.'
    },
    {
      icon: HeartHandshake,
      title: 'Modelo White-Label para Agências & Negócios',
      desc: 'Criada para empoderar tanto o empresário final quanto donos de agência de inteligência artificial. Permite personalização de marca, implantação ágil em menos de 24 horas e suporte prioritário de engenharia.'
    }
  ];

  const teamAgents = [
    {
      name: 'Roberta',
      role: 'SDR & Consultora Comercial de Voz',
      channel: 'Telefonia VoIP & Chamadas Outbound',
      desc: 'Atende clientes no primeiro toque, realiza diagnóstico rápido de negócios, tira dúvidas em tempo real e encaminha oportunidades prontas para a mesa de fechamento.',
      badge: 'Linha de Frente Telefônica'
    },
    {
      name: 'Camila',
      role: 'Especialista em WhatsApp Business',
      channel: 'WhatsApp Omnichannel 24/7',
      desc: 'Conversa no WhatsApp com notas de voz humanizadas, envia propostas comerciais em PDF, gera Pix copia-e-cola e recupera clientes inativos de forma automática.',
      badge: 'Fechamento & Conversão'
    },
    {
      name: 'Beatriz',
      role: 'Atendente de Webchat Interativo',
      channel: 'Widget Web no Site',
      desc: 'Engaja visitantes assim que eles entram no site, reduzindo a taxa de rejeição e capturando números de telefone qualificados para a equipe comercial.',
      badge: 'Engajamento no Site'
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-[#1A1816] font-sans selection:bg-[#4F46E5] selection:text-white animate-fadeIn">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-20 pb-16 overflow-hidden text-center border-b border-[#EBE8E2]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-gradient-to-b from-[#EEF2FF] via-[#E0E7FF]/40 to-transparent rounded-full blur-3xl opacity-70 -z-10 pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E7E4DC] text-xs font-semibold text-[#4F46E5] shadow-xs mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Nossa História & Propósito</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-normal text-[#1A1816] tracking-tight leading-[1.12] mb-6">
            A voz inteligente que devolve o{' '}
            <span className="font-serif-title italic text-[#4F46E5]">tempo e o lucro</span>{' '}
            às empresas do Brasil.
          </h1>

          <p className="text-base sm:text-lg text-[#5C5955] max-w-2xl mx-auto leading-relaxed mb-8">
            Nascemos com uma missão clara: erradicar a perda de clientes por falta de atendimento imediato. Unimos o que há de mais avançado em inteligência artificial conversacional à naturalidade e calidez humana do português brasileiro.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => {
                if (onNavigate) onNavigate('home');
                setTimeout(() => {
                  const el = document.getElementById('hero-test');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }, 150);
              }}
              className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-[#11100F] text-white text-xs sm:text-sm font-semibold hover:bg-black transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer hover:scale-[1.01]"
            >
              <Phone className="w-4 h-4 text-[#6366F1]" />
              <span>Testar Ligação da Roberta</span>
            </button>

            <button
              onClick={() => {
                if (onNavigate) onNavigate('contato');
              }}
              className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white text-[#1A1816] border border-[#DCD8D0] text-xs sm:text-sm font-semibold hover:bg-[#F5F2EB] transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 text-[#4F46E5]" />
              <span>Falar com Nossa Equipe</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. STATS BAR */}
      <section className="py-12 bg-white border-b border-[#EBE8E2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {milestones.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="text-3xl sm:text-4xl font-extrabold text-[#4F46E5] tracking-tight">
                  {item.number}
                </div>
                <div className="text-xs sm:text-sm font-bold text-[#1A1816]">
                  {item.label}
                </div>
                <p className="text-[11px] text-[#736F69] max-w-[200px] mx-auto leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. MANIFESTO / QUEM SOMOS */}
      <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E7E4DC] shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#4F46E5]/5 rounded-bl-full pointer-events-none" />

          <div className="flex items-center gap-3 mb-6">
            <VocalisLogo size="md" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#8C8881]">Manifesto Oficial</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-normal text-[#1A1816] tracking-tight mb-6">
            Por que criamos a <span className="font-serif-title italic text-[#4F46E5]">Vocalis AI</span>?
          </h2>

          <div className="space-y-4 text-sm sm:text-base text-[#5C5955] leading-relaxed">
            <p>
              No Brasil, mais de <strong>60% das oportunidades de vendas e agendamentos médicos são perdidas</strong> simplesmente porque o cliente liga ou manda mensagem fora do horário comercial, no intervalo de almoço ou nos finais de semana — exatamente nos momentos em que ele tem tempo livre para pesquisar e contratar.
            </p>
            <p>
              As soluções tradicionais do mercado ou são caras demais para o pequeno e médio empresário (contratar turnos inteiros de atendentes CLT) ou geram uma péssima experiência para quem liga (URAs mecânicas e robôs que não entendem sotaques e irritam quem está com pressa).
            </p>
            <p>
              A <strong>Vocalis AI</strong> nasceu para quebrar esse paradigma. Construímos uma plataforma onde qualquer consultório, imobiliária, escritório ou empresa comercial possa ter uma equipe de atendimento com voz neural humana operando 24 horas por dia, 7 dias por semana, com custo acessível e retorno financeiro imediato.
            </p>
          </div>
        </div>
      </section>

      {/* 4. OS 4 PILARES TECNOLÓGICOS */}
      <section className="py-16 bg-[#F6F5F0] border-t border-b border-[#EBE8E2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl font-normal text-[#1A1816] tracking-tight">
              Os pilares que sustentam a nossa{' '}
              <span className="font-serif-title italic text-[#4F46E5]">excelência técnica.</span>
            </h2>
            <p className="text-sm text-[#5C5955] mt-3">
              Engenharia de precisão desenvolvida no Brasil e para o mercado brasileiro.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div key={idx} className="bg-white rounded-3xl p-8 border border-[#E7E4DC] shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 rounded-2xl bg-[#EEF2FF] border border-[#E0E7FF] text-[#4F46E5] flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-[#1A1816] mb-3">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5C5955] leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. A EQUIPE DE ASSISTENTES INTELIGENTES */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#E7E4DC] text-xs font-semibold text-[#4F46E5] mb-3">
            <Users className="w-3.5 h-3.5" />
            <span>Nossos Agentes Neurais</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-normal text-[#1A1816] tracking-tight">
            Conheça os funcionários virtuais da{' '}
            <span className="font-serif-title italic text-[#4F46E5]">sua empresa.</span>
          </h2>
          <p className="text-sm text-[#5C5955] mt-3">
            Especialistas desenhados para cada etapa da jornada do cliente.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamAgents.map((agent, idx) => (
            <div key={idx} className="bg-white rounded-3xl p-6 border border-[#E7E4DC] shadow-sm flex flex-col justify-between hover:border-[#4F46E5]/40 transition-all">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#EEF2FF] text-[#4F46E5] border border-[#E0E7FF]">
                    {agent.badge}
                  </span>
                  <span className="text-[11px] font-mono text-emerald-600 font-bold">● Ativa 24/7</span>
                </div>

                <h3 className="text-2xl font-serif-title font-normal text-[#1A1816] mb-1">
                  {agent.name}
                </h3>
                <div className="text-xs font-bold text-[#4F46E5] mb-2">
                  {agent.role}
                </div>
                <div className="text-[11px] text-[#8C8881] font-mono mb-4 pb-3 border-b border-[#F0EFEB]">
                  Canal: {agent.channel}
                </div>

                <p className="text-xs text-[#5C5955] leading-relaxed mb-6">
                  {agent.desc}
                </p>
              </div>

              {agent.name === 'Roberta' && (
                <button
                  onClick={() => {
                    if (onNavigate) onNavigate('home');
                    setTimeout(() => {
                      const el = document.getElementById('hero-test');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }, 150);
                  }}
                  className="w-full py-2.5 rounded-xl bg-[#11100F] text-white text-xs font-semibold hover:bg-black transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5 text-[#6366F1]" />
                  <span>Ouvir a Roberta Agora</span>
                </button>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 6. CTA FINAL (Banner com Frequência Sonora & Latência em Tempo Real) */}
      <section className="py-16 bg-white border-t border-[#EBE8E2] px-4 sm:px-6 lg:px-8">
        <div className="relative max-w-5xl mx-auto rounded-3xl bg-[#11100F] text-white p-8 sm:p-12 text-center overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-40 bg-[#4F46E5]/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-normal text-white tracking-tight mb-4">
              Pronto para colocar a Vocalis na{' '}
              <span className="font-serif-title italic text-[#E89574]">sua empresa hoje?</span>
            </h2>
            <p className="text-sm text-[#A8A49C] max-w-xl mx-auto mb-8">
              Nossos engenheiros entregam sua assistente configurada, integrada à sua agenda e com garantia incondicional de 14 dias.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => {
                  if (onNavigate) onNavigate('precos');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#4F46E5] text-white text-xs sm:text-sm font-bold hover:bg-[#4338CA] transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Ver Planos & Preços</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="https://wa.me/5594984423948?text=Ol%C3%A1%20Francisco!%20Li%20a%20p%C3%A1gina%20Sobre%20da%20Vocalis%20AI%20e%20gostaria%20de%20conversar."
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-emerald-600 text-white text-xs sm:text-sm font-bold hover:bg-emerald-700 transition-all shadow-sm cursor-pointer flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Falar no WhatsApp: (94) 98442-3948</span>
              </a>
            </div>
          </div>

          {/* Soundwave animada com frequência e latência ao vivo */}
          <LiveSoundwaveBars />
        </div>
      </section>

    </div>
  );
}
