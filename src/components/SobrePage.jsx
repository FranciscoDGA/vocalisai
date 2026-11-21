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
    { number: '3 Canais', label: 'Canais Configuráveis', desc: 'Opções para Telefone, WhatsApp e Webchat, cada qual com escopo e integrações próprias por plano.' },
    { number: 'PT-BR', label: 'Foco em Português Brasileiro', desc: 'Fluxos conversacionais pensados para a comunicação cotidiana no Brasil.' },
    { number: 'Configurável', label: 'Fluxos Adaptados à Operação', desc: 'Regras de triagem, horários e transbordo humano conforme o negócio.' },
    { number: 'Transparência', label: 'Escopo Confirmado na Proposta', desc: 'Condições comerciais, limites e integrações alinhados antes da contratação.' }
  ];

  const pillars = [
    {
      icon: Zap,
      title: 'Fluxos Orientados a Ações',
      desc: 'Estruture atendimentos com coleta de informações, apoio a agendamentos, envio de resumos e possibilidades de integração via webhook conforme o plano contratado.'
    },
    {
      icon: Headphones,
      title: 'Voz e Texto em Português Brasileiro',
      desc: 'Alternativa conversacional aos menus numéricos tradicionais ("digite 1 para..."), configurável para diferentes perfis de empresa.'
    },
    {
      icon: ShieldCheck,
      title: 'Privacidade e Boas Práticas LGPD',
      desc: 'Tratamento de dados orientado pela Lei Geral de Proteção de Dados (Lei nº 13.709/2018), conforme descrito em nossa Política de Privacidade e nos termos contratuais aplicáveis.'
    },
    {
      icon: HeartHandshake,
      title: 'Atendimento para Empresas e Agências',
      desc: 'Estruturas configuráveis tanto para operação direta de empresas quanto para agências, com escopo e prazos definidos na proposta.'
    }
  ];

  const teamAgents = [
    {
      name: 'Roberta',
      role: 'Perfil ilustrativo · Atendimento por Voz',
      channel: 'Telefonia',
      desc: 'Exemplo de assistente configurável para recepção inicial, triagem e encaminhamento para a equipe responsável.',
      badge: 'Telefonia'
    },
    {
      name: 'Camila',
      role: 'Perfil ilustrativo · WhatsApp',
      channel: 'WhatsApp',
      desc: 'Exemplo de assistente configurável para responder mensagens em texto ou áudio e organizar solicitações de clientes.',
      badge: 'WhatsApp'
    },
    {
      name: 'Beatriz',
      role: 'Perfil ilustrativo · Webchat',
      channel: 'Widget Web no Site',
      desc: 'Exemplo de assistente configurável para orientar visitantes no site e encaminhar demandas ao time comercial.',
      badge: 'Webchat'
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
              Muitas empresas perdem oportunidades de atendimento quando clientes tentam contato fora do horário comercial, no intervalo de almoço ou em horários de pico — exatamente quando o cliente tem tempo disponível para pesquisar.
            </p>
            <p>
              As soluções tradicionais do mercado podem exigir equipes extensas para cobertura estendida ou depender de menus numéricos rígidos que geram atrito no atendimento.
            </p>
            <p>
              A <strong>Vocalis AI</strong> surgiu para ajudar consultórios, imobiliárias, escritórios e empresas de serviços a estruturarem atendimentos automatizados em português brasileiro com foco em ampliar a cobertura de atendimento e organizar a triagem inicial.
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
            <span>Perfis Ilustrativos de Assistentes</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-normal text-[#1A1816] tracking-tight">
            Conheça exemplos de perfis configuráveis para a{' '}
            <span className="font-serif-title italic text-[#4F46E5]">sua empresa.</span>
          </h2>
          <p className="text-sm text-[#5C5955] mt-3">
            Modelos ilustrativos que podem ser adaptados ao tom de voz e às regras de cada empresa.
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
                  <span className="text-[11px] font-mono text-[#736F69] font-semibold">● Exemplo de perfil</span>
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
              Nossa equipe apresenta a demonstração, o escopo de implantação e as condições comerciais vigentes antes da contratação.
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
