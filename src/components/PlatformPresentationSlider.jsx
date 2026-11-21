import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, ChevronRight, X, Sparkles, Bot, Phone, MessageSquare, 
  Play, CheckCircle2, ShieldCheck, DollarSign, Cloud, Laptop, Layers, 
  ArrowRight, Maximize2, Minimize2, Star, Zap, Users, Building2
} from 'lucide-react';
import {
  getAgencyProgramSummary,
  getProviderCostSummary,
} from '../utils/commercialCatalogUtils';

export default function PlatformPresentationSlider({ isOpen, onClose }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const agencySummary = getAgencyProgramSummary();
  const providerCostText = getProviderCostSummary('telefone');

  const slides = [
    {
      id: 'intro',
      badge: 'VISÃO GERAL DO ECOSSISTEMA',
      title: 'Vocalis AI: Automação de Atendimento por Voz, WhatsApp e Webchat',
      subtitle: 'Como a plataforma organiza telefonia, WhatsApp e webchat em canais estruturados de atendimento automatizado.',
      theme: 'dark',
      content: (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 text-white">
            <div className="w-10 h-10 rounded-xl bg-[#4F46E5]/20 text-[#4F46E5] flex items-center justify-center font-bold mb-3">
              <Phone className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm mb-1">Voz em Português Brasileiro</h4>
            <p className="text-xs text-stone-300 leading-relaxed">
              Voz configurável em português do Brasil para atendimento telefônico conforme o fluxo e o plano contratado.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 text-white">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold mb-3">
              <MessageSquare className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm mb-1">WhatsApp em Texto e Áudio</h4>
            <p className="text-xs text-stone-300 leading-relaxed">
              Fluxos configuráveis para receber e responder mensagens em texto e áudio conforme a modalidade contratada.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 text-white">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold mb-3">
              <Layers className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm mb-1">Integrações Configuráveis</h4>
            <p className="text-xs text-stone-300 leading-relaxed">
              Possibilidade de integrar agenda, geração de Pix e envios no WhatsApp conforme as integrações habilitadas no plano.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'create-assistant',
      badge: 'PASSO A PASSO TÉCNICO',
      title: 'Como Criar um Assistente em 3 Passos Simples',
      subtitle: 'Sem linhas de código complexas: você pode criar e testar agentes para qualquer nicho de mercado.',
      theme: 'light',
      content: (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
          <div className="p-5 rounded-2xl bg-[#FAF9F5] border border-[#E7E4DC] relative">
            <div className="w-8 h-8 rounded-full bg-[#1A1816] text-white flex items-center justify-center text-xs font-bold mb-3">
              1
            </div>
            <h4 className="font-bold text-sm text-[#1A1816] mb-1.5">Escolha o Canal & Nicho</h4>
            <p className="text-xs text-[#5C5955] leading-relaxed">
              Selecione se o agente atenderá Telefone, WhatsApp ou Webchat. Use templates prontos para <strong>Clínica</strong>, <strong>Imobiliária</strong>, <strong>Advocacia</strong> ou crie um do zero.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#FAF9F5] border border-[#E7E4DC] relative">
            <div className="w-8 h-8 rounded-full bg-[#4F46E5] text-white flex items-center justify-center text-xs font-bold mb-3">
              2
            </div>
            <h4 className="font-bold text-sm text-[#1A1816] mb-1.5">Defina a Voz e Regras</h4>
            <p className="text-xs text-[#5C5955] leading-relaxed">
              Escolha a voz da Clara, da Roberta ou grave 60 segundos no microfone para clonar a voz do próprio médico ou advogado. Insira preços e horários autorizados.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#FAF9F5] border border-[#E7E4DC] relative">
            <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold mb-3">
              3
            </div>
            <h4 className="font-bold text-sm text-[#1A1816] mb-1.5">Sincronização & Ativação</h4>
            <p className="text-xs text-[#5C5955] leading-relaxed">
              O assistente é salvo no Supabase e sincronizado com a telefonia da Vapi. Conecte o número de DDD desejado e o agente já começa a atender chamadas reais.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'demo-mode',
      badge: 'TESTES SEM CUSTO / MODO SIMULAÇÃO',
      title: 'Como Testar Tudo Mesmo Sem Vapi ou UazAPI Configuradas',
      subtitle: 'A plataforma possui modo de demonstração autônomo com IA nativa para você validar antes de gastar 1 centavo.',
      theme: 'light',
      content: (
        <div className="bg-[#FAF9F5] rounded-2xl border border-[#E7E4DC] p-6 mt-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-start gap-3 p-3.5 bg-white rounded-xl border border-[#EDEAE3]">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <h5 className="font-bold text-xs text-[#1A1816]">Simulação Completa no Navegador</h5>
                <p className="text-[11px] text-[#736F69] mt-0.5">
                  O modal de simulação ilustrativa funciona no navegador usando microfone e sintetizador de voz do sistema operacional.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 bg-white rounded-xl border border-[#EDEAE3]">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <h5 className="font-bold text-xs text-[#1A1816]">Gemini AI Ativo para Respostas</h5>
                <p className="text-[11px] text-[#736F69] mt-0.5">
                  A assistente pensa e responde usando o Google Gemini integrado, entendendo perfeitamente o contexto do negócio sem você precisar de telefonia externa.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 bg-white rounded-xl border border-[#EDEAE3]">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <h5 className="font-bold text-xs text-[#1A1816]">WhatsApp em Modo Demonstração</h5>
                <p className="text-[11px] text-[#736F69] mt-0.5">
                  Se a UazAPI não estiver configurada no .env, o sistema aciona a notificação deslizante e o modal de WhatsApp com o Pix de R$ 1,00 para o lead ver o efeito visual.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 bg-white rounded-xl border border-[#EDEAE3]">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <h5 className="font-bold text-xs text-[#1A1816]">Gravação & Banco Supabase Real</h5>
                <p className="text-[11px] text-[#736F69] mt-0.5">
                  Todos os leads que colocam o telefone na Landing Page são salvos automaticamente no seu banco de dados Supabase para você fazer o acompanhamento.
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'meeting-script',
      badge: 'ROTEIRO COMERCIAL B2B',
      title: 'A Reunião Perfeita de 20 Minutos com o Cliente',
      subtitle: 'Passo a passo consultivo com condições definidas conforme o catálogo oficial.',
      theme: 'dark',
      content: (
        <div className="space-y-3 mt-6">
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3 text-white">
            <span className="px-2 py-0.5 rounded bg-[#4F46E5] text-[10px] font-bold shrink-0 mt-0.5">00-05 min</span>
            <div>
              <h5 className="text-xs font-bold text-white">Diagnóstico do Gargalo de Atendimento</h5>
              <p className="text-[11px] text-stone-300 mt-0.5">
                Pergunte o que acontece quando o paciente ou cliente entra em contato no horário de almoço ou após as 18h e estime o impacto no negócio dele.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3 text-white">
            <span className="px-2 py-0.5 rounded bg-emerald-600 text-[10px] font-bold shrink-0 mt-0.5">06-12 min</span>
            <div>
              <h5 className="text-xs font-bold text-white">Demonstração Interativa</h5>
              <p className="text-[11px] text-stone-300 mt-0.5">
                Apresente a simulação ilustrativa no navegador para validar fluxo, voz e exemplo de resumo antes da contratação.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3 text-white">
            <span className="px-2 py-0.5 rounded bg-indigo-600 text-[10px] font-bold shrink-0 mt-0.5">13-20 min</span>
            <div>
              <h5 className="text-xs font-bold text-white">Apresentação do Painel & Proposta Comercial</h5>
              <p className="text-[11px] text-stone-300 mt-0.5">
                Mostre o painel de atendimentos e apresente setup ({agencySummary.setupFee.text}) e gestão recorrente ({agencySummary.monthlyManagementFee.text}) conforme condições oficiais.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'architecture',
      badge: 'ARQUITETURA & HOSPEDAGEM',
      title: 'Como Funciona a Arquitetura na Nuvem',
      subtitle: 'Ambiente local de configuração e infraestrutura na nuvem conforme operação contratada.',
      theme: 'light',
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
          <div className="p-5 rounded-2xl bg-white border border-[#E7E4DC] shadow-xs">
            <div className="flex items-center gap-2 mb-2 text-[#1A1816]">
              <Laptop className="w-5 h-5 text-[#736F69]" />
              <h4 className="font-bold text-sm">Ambiente Local de Testes</h4>
            </div>
            <div className="text-[11px] font-mono text-stone-500 mb-2">Laboratório local</div>
            <p className="text-xs text-[#5C5955] leading-relaxed">
              Usado para você criar novos fluxos visuais, testar automações e desenhar regras em ambiente controlado.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#EEF2FF] border border-[#F2E8DC] shadow-xs">
            <div className="flex items-center gap-2 mb-2 text-[#4F46E5]">
              <Cloud className="w-5 h-5" />
              <h4 className="font-bold text-sm">Servidor na Nuvem</h4>
            </div>
            <div className="text-[11px] font-mono text-[#4F46E5] mb-2">Infraestrutura gerenciada</div>
            <p className="text-xs text-[#5C5955] leading-relaxed">
              Hospedagem dedicada para atender empresas clientes simultaneamente (custos de servidor e fornecedores sob consulta conforme operação).
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'pricing-model',
      badge: 'MODELO COMERCIAL WHITE-LABEL',
      title: 'Estrutura de Receita para Agências',
      subtitle: 'Valores oficiais de implantação, mensalidade e custos por minuto seguem a fonte única comercial.',
      theme: 'dark',
      content: (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 text-white">
            <div className="text-[10px] uppercase font-bold text-[#4F46E5] mb-1">Passo 1: Setup</div>
            <div className="text-lg font-bold text-white mb-2">{agencySummary.setupFee.text}</div>
            <p className="text-xs text-stone-300">
              Implantação inicial para cadastrar serviços, regras e fluxos do cliente.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 text-white">
            <div className="text-[10px] uppercase font-bold text-emerald-400 mb-1">Passo 2: Mensalidade</div>
            <div className="text-lg font-bold text-emerald-400 mb-2">{agencySummary.monthlyManagementFee.text}</div>
            <p className="text-xs text-stone-300">
              Receita recorrente contratual por cliente para suporte e acompanhamento do assistente.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 text-white">
            <div className="text-[10px] uppercase font-bold text-indigo-400 mb-1">Passo 3: Custos e Repasse</div>
            <div className="text-lg font-bold text-indigo-400 mb-2">{agencySummary.resaleMinutePrice.text}</div>
            <p className="text-xs text-stone-300">
              {providerCostText}
            </p>
          </div>
        </div>
      )
    }
  ];

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        setCurrentSlide((prev) => (prev < slides.length - 1 ? prev + 1 : prev));
      } else if (e.key === 'ArrowLeft') {
        setCurrentSlide((prev) => (prev > 0 ? prev - 1 : prev));
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, slides.length, onClose]);

  if (!isOpen) return null;

  const slide = slides[currentSlide];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className={`w-full rounded-3xl transition-all duration-300 relative flex flex-col justify-between overflow-hidden shadow-2xl border ${
          slide.theme === 'dark' 
            ? 'bg-[#11100F] border-[#2C2927] text-white' 
            : 'bg-white border-[#E7E4DC] text-[#1A1816]'
        } ${
          isFullscreen ? 'h-full max-w-full rounded-none' : 'max-w-4xl min-h-[580px] p-6 sm:p-10'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Bar Controls */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-500/20">
          <div className="flex items-center gap-2">
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
              slide.theme === 'dark'
                ? 'bg-white/10 text-white border border-white/10'
                : 'bg-[#EEF2FF] text-[#4F46E5] border border-[#F2E8DC]'
            }`}>
              {slide.badge}
            </span>
            <span className="text-[11px] text-stone-400 font-mono">
              Slide {currentSlide + 1} de {slides.length}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-1.5 rounded-lg hover:bg-stone-500/20 text-stone-400 hover:text-stone-200 transition-colors cursor-pointer"
              title={isFullscreen ? 'Sair da tela cheia' : 'Tela cheia'}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
            <button 
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-stone-500/20 text-stone-400 hover:text-stone-200 transition-colors cursor-pointer"
              title="Fechar apresentação"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Slide Body */}
        <div className="py-6 flex-1 flex flex-col justify-center animate-fadeIn key={slide.id}">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            {slide.title}
          </h2>
          <p className={`text-xs sm:text-sm mt-1.5 max-w-2xl ${
            slide.theme === 'dark' ? 'text-stone-300' : 'text-[#5C5955]'
          }`}>
            {slide.subtitle}
          </p>

          <div className="mt-2">
            {slide.content}
          </div>
        </div>

        {/* Bottom Navigation Controls */}
        <div className="pt-4 border-t border-stone-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Slide Indicator Dots */}
          <div className="flex items-center gap-1.5">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  currentSlide === i 
                    ? 'w-6 bg-[#4F46E5]' 
                    : 'w-2 bg-stone-400/40 hover:bg-stone-400'
                }`}
                title={`Ir para o slide ${i + 1}`}
              />
            ))}
          </div>

          {/* Previous / Next Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentSlide((prev) => (prev > 0 ? prev - 1 : prev))}
              disabled={currentSlide === 0}
              className="px-4 py-2 rounded-xl border border-stone-500/30 text-xs font-semibold hover:bg-stone-500/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Anterior</span>
            </button>

            {currentSlide < slides.length - 1 ? (
              <button
                onClick={() => setCurrentSlide((prev) => prev + 1)}
                className="px-5 py-2 rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
              >
                <span>Próximo</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={onClose}
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
              >
                <span>Concluir Apresentação</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}