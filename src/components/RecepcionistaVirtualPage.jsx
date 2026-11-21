import React, { useState } from 'react';
import { 
  Phone, Sparkles, Check, ArrowRight, ArrowLeft, Play, Pause, ChevronDown, ChevronUp,
  Volume2, Bot, Database, Calendar, Users, ShieldCheck, Clock, CheckCheck,
  Languages, FileText, GitBranch, ArrowUpRight, Inbox, BarChart2
} from 'lucide-react';
import { BRAND } from '../data/content';
import TestCallModal from './TestCallModal';
import AudioFrequencyWave from './AudioFrequencyWave';
import AudioCircleWave from './AudioCircleWave';
import BrazilFlag from './BrazilFlag';
import { 
  FlagBR, FlagPT, FlagES, FlagUS, FlagUK, FlagFR, 
  FlagDE, FlagIT, FlagMX, FlagAR, FlagNL, FlagJP 
} from './CountryFlags';
import { formatPhoneMask, cleanRawPhone } from '../utils/phoneUtils';
import { speakFemalePt } from '../utils/voiceUtils';

export default function RecepcionistaVirtualPage({ onOpenDemo, onOpenAuth, onNavigateHome }) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedCountry, setSelectedCountry] = useState({ name: 'Brasil', code: '+55', flag: '🇧🇷' });
  const [countryPickerOpen, setCountryPickerOpen] = useState(false);
  const [testCallModalOpen, setTestCallModalOpen] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [faqOpenIndex, setFaqOpenIndex] = useState(0);

  // Estados de expansão inline ("Leia mais" / "Mostrar menos") 1:1 com Kloel
  const [expandedHowItWorks, setExpandedHowItWorks] = useState({});
  const [expandedWhatIs, setExpandedWhatIs] = useState({});
  const [expandedAdvantages, setExpandedAdvantages] = useState({});
  const [expandedTopAdvantage, setExpandedTopAdvantage] = useState(false);

  const toggleHowItWorks = (num) => {
    setExpandedHowItWorks(prev => ({ ...prev, [num]: !prev[num] }));
  };

  const toggleWhatIs = (key) => {
    setExpandedWhatIs(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleAdvantage = (idx) => {
    setExpandedAdvantages(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const countries = [
    { name: 'Brasil', code: '+55', flag: '🇧🇷' },
    { name: 'Portugal', code: '+351', flag: '🇵🇹' },
    { name: 'Estados Unidos', code: '+1', flag: '🇺🇸' },
    { name: 'Argentina', code: '+54', flag: '🇦🇷' },
    { name: 'Espanha', code: '+34', flag: '🇪🇸' }
  ];

  const handlePhoneChange = (e) => {
    setPhoneNumber(formatPhoneMask(e.target.value));
  };

  const handleTestCallSubmit = (e) => {
    e.preventDefault();
    const digits = cleanRawPhone(phoneNumber);
    if (!digits || digits.length < 10) {
      setPhoneNumber('(11) 98765-4321');
    } else {
      setPhoneNumber(formatPhoneMask(digits));
    }
    setTestCallModalOpen(true);
  };

  const handleToggleVoiceSample = () => {
    if (isPlayingAudio) {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      setIsPlayingAudio(false);
    } else {
      setIsPlayingAudio(true);
      const text = "Olá! Seja muito bem-vindo. Sou a recepcionista virtual da Vocalis. Posso transferir sua ligação para o departamento comercial, agendar um atendimento ou responder suas dúvidas na hora. Com quem você gostaria de falar?";
      speakFemalePt(
        text,
        () => setIsPlayingAudio(true),
        () => setIsPlayingAudio(false),
        () => setIsPlayingAudio(false)
      );
    }
  };

  const howItWorksCards = [
    {
      num: 1,
      title: 'Deixe a IA assumir suas ligações',
      shortDesc: 'A recepcionista de IA funciona ao assumir todas as ligações recebidas, compreendê-las e executar as ações desejadas. A IA...',
      fullDesc: 'A recepcionista de IA funciona ao assumir todas as ligações recebidas, compreendê-las e executar as ações desejadas. A IA atende os clientes de forma humanizada, tira dúvidas comuns e direciona ligações prioritárias para as pessoas certas.'
    },
    {
      num: 2,
      title: 'Definir comportamento e pós-processamento',
      shortDesc: 'Durante a configuração da recepcionista de IA, é definido para qual colaborador a IA deve transferir quem ligou em determinad...',
      fullDesc: 'Durante a configuração da recepcionista de IA, é definido para qual colaborador a IA deve transferir quem ligou em determinada situação, quais dados registrar e quais ações automáticas disparar após o término da ligação.'
    },
    {
      num: 3,
      title: 'Registro estruturado de recados',
      shortDesc: 'Se o colaborador não atender, a recepcionista virtual registra a solicitação para envio ou consulta pela equipe...',
      fullDesc: 'Se o colaborador não atender, a recepcionista virtual registra a solicitação do cliente para envio ou acompanhamento pela equipe responsável, conforme as regras configuradas.'
    },
    {
      num: 4,
      title: 'Integrada perfeitamente à sua infraestrutura',
      shortDesc: 'A partir do número principal da empresa, é configurada uma transferência de chamada para o número da IA, para que a...',
      fullDesc: 'A partir do número principal da empresa, é configurada uma transferência de chamada para o número da IA, para que a recepcionista assuma quando você estiver ocupado, fora do horário comercial ou sempre que desejar.'
    }
  ];

  const advantages = [
    {
      title: 'Triagem de ligações',
      shortDesc: 'A recepcionista virtual com IA classifica ligações antecipadamente e processa os...',
      fullDesc: 'A recepcionista virtual com IA classifica ligações antecipadamente e processa os contatos com agilidade, direcionando cada caso ao setor ou profissional correto.',
      visual: (
        <div className="h-44 sm:h-48 rounded-2xl bg-[#FAF9F5] border border-[#EBE8E2] p-4 flex flex-col items-center justify-center relative overflow-hidden bg-[radial-gradient(#E2DDD5_1px,transparent_1px)] [background-size:12px_12px]">
          {/* Card 1 (top) */}
          <div className="w-[84%] bg-white/95 px-3 py-1.5 rounded-xl border border-stone-200/80 shadow-xs flex items-center justify-between text-[11px] z-10">
            <span className="flex items-center gap-1.5 text-stone-700">
              <Phone className="w-3 h-3 text-stone-400" />
              <span>Ligação salva</span>
            </span>
            <span className="px-1.5 py-0.2 rounded bg-rose-50 text-rose-600 font-bold text-[9px] border border-rose-200">
              Urgente
            </span>
          </div>

          {/* Card 2 (middle) */}
          <div className="w-[89%] bg-white/95 px-3 py-1.5 rounded-xl border border-stone-200/80 shadow-xs flex items-center justify-between text-[11px] -mt-1.5 z-20">
            <span className="flex items-center gap-1.5 text-stone-700">
              <Phone className="w-3 h-3 text-stone-400" />
              <span>Ligação salva</span>
            </span>
            <span className="px-1.5 py-0.2 rounded bg-amber-50 text-amber-700 font-bold text-[9px] border border-amber-200">
              Média
            </span>
          </div>

          {/* Card 3 (bottom) */}
          <div className="w-[94%] bg-white px-3.5 py-2.5 rounded-xl border border-stone-200 shadow-md text-[11px] -mt-1.5 z-30 space-y-2">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-stone-700 font-medium">
                <Phone className="w-3 h-3 text-stone-400" />
                <span>Ligação salva</span>
              </span>
              <span className="px-1.5 py-0.2 rounded bg-sky-50 text-sky-700 font-bold text-[9px] border border-sky-200">
                Info
              </span>
            </div>
            <div>
              <span className="text-[10px] text-stone-400 font-medium block mb-1">Transcrição</span>
              <div className="space-y-1">
                <div className="h-1.5 bg-stone-100 rounded-full w-full" />
                <div className="h-1.5 bg-stone-100 rounded-full w-2/3" />
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Multilíngue',
      shortDesc: 'Nossa recepcionista virtual com IA é multilíngue e capaz de processar ligações...',
      fullDesc: 'Nossa recepcionista virtual com IA é multilíngue e capaz de processar ligações em diversos idiomas com sotaque nativo, compreendendo gírias e sotaques regionais.',
      visual: (
        <div className="h-44 sm:h-48 rounded-2xl bg-[#FAF9F5] border border-[#EBE8E2] p-4 flex items-center justify-center relative overflow-hidden bg-[radial-gradient(#E2DDD5_1px,transparent_1px)] [background-size:12px_12px]">
          <div className="grid grid-cols-6 gap-2 sm:gap-2.5">
            {[
              { Component: FlagBR, name: 'Brasil' },
              { Component: FlagPT, name: 'Portugal' },
              { Component: FlagES, name: 'Espanha' },
              { Component: FlagUS, name: 'Estados Unidos' },
              { Component: FlagUK, name: 'Reino Unido' },
              { Component: FlagFR, name: 'França' },
              { Component: FlagDE, name: 'Alemanha' },
              { Component: FlagIT, name: 'Itália' },
              { Component: FlagMX, name: 'México' },
              { Component: FlagAR, name: 'Argentina' },
              { Component: FlagNL, name: 'Holanda' },
              { Component: FlagJP, name: 'Japão' }
            ].map((f, i) => (
              <div
                key={i}
                className="w-8 h-8 sm:w-9 sm:h-9 bg-white rounded-xl shadow-xs border border-stone-200/90 flex items-center justify-center hover:scale-110 hover:shadow-md transition-all cursor-pointer"
                title={f.name}
              >
                <f.Component className="w-5 h-3.5 sm:w-6 sm:h-4" />
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      title: 'Documentação precisa de cada ligação',
      shortDesc: 'A recepcionista virtual com IA documenta cada ligação com precisão, salvando o...',
      fullDesc: 'A recepcionista virtual com IA documenta cada ligação com precisão, salvando o áudio gravado, transcrição completa, análise de sentimento e notas estruturadas direto no seu CRM.',
      visual: (
        <div className="h-44 sm:h-48 rounded-2xl bg-[#FAF9F5] border border-[#EBE8E2] p-3 flex flex-col items-center justify-center relative overflow-hidden bg-[radial-gradient(#E2DDD5_1px,transparent_1px)] [background-size:12px_12px]">
          <div className="w-full max-w-[260px] relative py-2">
            <svg viewBox="0 0 240 65" className="w-full h-14 mb-1" fill="none">
              <path 
                d="M 60 12 Q 120 18 120 55 Q 120 18 180 12" 
                stroke="#4F46E5" 
                strokeWidth="1.5" 
                strokeDasharray="3 3" 
                opacity="0.45"
              />
            </svg>

            {/* Top row pills */}
            <div className="flex items-center justify-between absolute top-0 inset-x-0">
              <div className="px-2.5 py-1 rounded-full bg-white border border-stone-200 shadow-xs text-[10px] font-semibold text-stone-700 flex items-center gap-1">
                <Database className="w-3 h-3 text-[#4F46E5]" />
                <span>Sistemas de CRM</span>
              </div>
              <div className="px-2.5 py-1 rounded-full bg-white border border-stone-200 shadow-xs text-[10px] font-semibold text-stone-700 flex items-center gap-1">
                <BarChart2 className="w-3 h-3 text-[#4F46E5]" />
                <span>Ferramentas de gestão</span>
              </div>
            </div>

            {/* Bottom center pill */}
            <div className="flex justify-center mt-2">
              <div className="px-3 py-1 rounded-full bg-white border border-stone-200 shadow-xs text-[10px] font-semibold text-stone-700 flex items-center gap-1">
                <Calendar className="w-3 h-3 text-[#4F46E5]" />
                <span>Agenda de compromissos</span>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  const accordionItems = [
    {
      title: 'Feita para qualquer tamanho de empresa',
      content: 'Desde consultórios individuais e escritórios de advocacia até redes de clínicas e empresas com múltiplos ramais e filiais. A IA adapta o atendimento ao volume exato do seu negócio.'
    },
    {
      title: 'Ativação em nuvem',
      content: 'Não é preciso instalar aparelhos físicos no escritório. A implantação e o prazo de ativação são definidos com nossa equipe conforme o ambiente telefônico.'
    },
    {
      title: 'Atendimento simultâneo conforme o plano',
      content: 'Capacidade de atendimentos simultâneos dimensionada de acordo com as condições do plano contratado.'
    }
  ];

  return (
    <div className="bg-[#FAF9F5] text-[#1A1816] font-sans">
      
      {/* ========================================================
          1. HERO SECTION (Exact replica of user's uploaded print)
         ======================================================== */}
      <section className="relative pt-12 pb-20 md:pt-16 md:pb-28 overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-[#F5F3FF]/80 via-[#FAF9F5]/40 to-transparent pointer-events-none -z-10" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          {/* Main Title */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-normal tracking-tight text-[#1A1816] max-w-4xl mx-auto leading-[1.08] mb-4">
            Recepcionista<br />virtual com IA
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-[#5C5955] max-w-2xl mx-auto font-normal leading-relaxed mb-10">
            Apoie a triagem de chamadas e organize o atendimento telefônico conforme a capacidade e as regras do plano contratado.
          </p>

          {/* Audio Wave Visualizer Circle with Loop */}
          <div className="flex justify-center mb-8">
            <AudioCircleWave 
              isPlaying={isPlayingAudio}
              onToggle={handleToggleVoiceSample}
              size="md"
            />
          </div>

          {/* Phone Input Box matching print */}
          <form onSubmit={handleTestCallSubmit} className="max-w-xl mx-auto mb-2">
            <div className="flex items-center bg-white rounded-full p-1.5 pl-3 border border-[#DCD8D0] shadow-md focus-within:border-[#4F46E5] focus-within:ring-2 focus-within:ring-[#4F46E5]/15 transition-all relative">
              
              {/* Country Flag Selector (1:1 com o Kloel) */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setCountryPickerOpen(!countryPickerOpen)}
                  className="flex items-center gap-1.5 text-sm font-medium text-[#1A1816] pl-1.5 pr-2 py-1 hover:opacity-80 transition-opacity shrink-0 cursor-pointer"
                >
                  {selectedCountry.code === '+55' ? (
                    <BrazilFlag className="w-5 h-3.5" />
                  ) : (
                    <span className="text-base leading-none">{selectedCountry.flag}</span>
                  )}
                  <ChevronDown className="w-3 h-3 text-[#736F69]" />
                </button>

                {countryPickerOpen && (
                  <div className="absolute top-10 left-0 w-56 bg-white rounded-2xl border border-[#E7E4DC] shadow-2xl p-2 z-50 text-left space-y-0.5">
                    {countries.map((c) => (
                      <button
                        key={c.code}
                        type="button"
                        onClick={() => {
                          setSelectedCountry(c);
                          setCountryPickerOpen(false);
                        }}
                        className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-[#1A1816] hover:bg-[#FAF9F5] transition-colors"
                      >
                        <span className="flex items-center gap-2">
                          {c.code === '+55' ? <BrazilFlag className="w-4 h-3" /> : <span>{c.flag}</span>}
                          <span>{c.name}</span>
                        </span>
                        <span className="text-[11px] text-[#8C8881] font-mono">{c.code}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Input */}
              <input
                type="tel"
                value={phoneNumber}
                onChange={handlePhoneChange}
                placeholder="Seu celular com DDD (opcional)"
                className="flex-1 px-3 py-2.5 bg-transparent text-[#1A1816] placeholder-[#9E9B95] text-sm focus:outline-none"
              />

              {/* Submit Button */}
              <button
                type="submit"
                className="shrink-0 px-6 py-3 rounded-full bg-[#11100F] text-white text-xs sm:text-sm font-semibold hover:bg-black transition-all flex items-center gap-2 shadow-sm cursor-pointer"
              >
                <Phone className="w-4 h-4 text-white" />
                <span>Abrir simulação ilustrativa</span>
              </button>

            </div>
          </form>

          <p className="text-[11px] text-[#736F69] max-w-2xl mx-auto mb-3 leading-relaxed">
            Simulação ilustrativa no navegador (Web Speech / TTS): não realiza chamada telefônica real e não armazena seu número. Em operação real, telefonia, números/SIP, transferência, gravação, limites de minutos, chamadas simultâneas e regras de excedente dependem de provedores terceiros (como Vapi e operadora SIP) e de confirmação no catálogo oficial.
          </p>

          {/* Secondary Link: Agendar demo */}
          <div className="mb-8">
            <button
              onClick={onOpenDemo}
              className="text-xs text-[#5C5955] hover:text-[#1A1816] underline underline-offset-2 font-medium transition-colors cursor-pointer"
            >
              Agendar demo
            </button>
          </div>

          {/* Checklist prudente */}
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 text-xs font-semibold text-[#5C5955]">
            <div className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-[#4F46E5]" strokeWidth={2.5} />
              <span>Condições comerciais sob consulta</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-[#4F46E5]" strokeWidth={2.5} />
              <span>Português do Brasil</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-[#4F46E5]" strokeWidth={2.5} />
              <span>Configuração guiada</span>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================
          2. 4 METRIC STATS CARDS
         ======================================================== */}
      <section className="py-12 bg-white border-y border-[#EBE8E2]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Card 1: 24/7 */}
            <div className="bg-[#FAF9F5] rounded-3xl p-8 border border-[#E7E4DC] shadow-sm text-left">
              <span className="text-4xl sm:text-5xl font-serif-title font-normal text-[#1A1816] block mb-3">
                24/7
              </span>
              <p className="text-xs sm:text-sm text-[#5C5955] leading-relaxed">
                Atendimento configurável, inclusive fora do expediente.
              </p>
            </div>

            {/* Card 2: 3 canais */}
            <div className="bg-[#FAF9F5] rounded-3xl p-8 border border-[#E7E4DC] shadow-sm text-left">
              <span className="text-4xl sm:text-5xl font-serif-title font-normal text-[#1A1816] block mb-3">
                3 canais
              </span>
              <p className="text-xs sm:text-sm text-[#5C5955] leading-relaxed">
                Telefone, WhatsApp e site.
              </p>
            </div>

            {/* Card 3: API & Webhooks */}
            <div className="bg-[#FAF9F5] rounded-3xl p-8 border border-[#E7E4DC] shadow-sm text-left">
              <span className="text-3xl sm:text-4xl font-serif-title font-normal text-[#1A1816] block mb-3">
                API &amp; Webhooks
              </span>
              <p className="text-xs sm:text-sm text-[#5C5955] leading-relaxed">
                Integrações sob consulta conforme o plano.
              </p>
            </div>

            {/* Card 4: PT-BR */}
            <div className="bg-[#FAF9F5] rounded-3xl p-8 border border-[#E7E4DC] shadow-sm text-left">
              <span className="text-4xl sm:text-5xl font-serif-title font-normal text-[#1A1816] block mb-3">
                PT-BR
              </span>
              <p className="text-xs sm:text-sm text-[#5C5955] leading-relaxed">
                Foco em atendimento em português brasileiro.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================
          3. O QUE É UMA RECEPCIONISTA VIRTUAL COM IA? (2 Cards)
         ======================================================== */}
      <section className="py-24 bg-[#FAF9F5]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <h2 className="text-3xl sm:text-4xl font-normal text-[#1A1816] tracking-tight mb-16">
            O que é uma recepcionista virtual com IA?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto text-left mb-12">
            
            {/* Card 1: Recepcionista com IA */}
            <div className="bg-white rounded-3xl p-8 border border-[#E7E4DC] shadow-clean flex flex-col justify-between transition-all duration-300">
              <div>
                <h3 className="text-xl font-bold text-[#1A1816] mb-3">Recepcionista com IA</h3>
                <p className="text-xs sm:text-sm text-[#5C5955] leading-relaxed mb-6">
                  {expandedWhatIs['rec'] ? (
                    'Como uma recepcionista humana, a recepcionista com IA cuida do atendimento telefônico da sua empresa. Atende de forma acolhedora, tira dúvidas sobre horários e serviços, transfere ligações e agenda compromissos sem pausas mecânicas.'
                  ) : (
                    'Como uma recepcionista humana, a recepcionista com IA cuida do atendimento telefônico da sua empresa. Atende de forma acolhedora, tira dúvidas sobre...'
                  )}
                </p>
              </div>
              <button 
                onClick={() => toggleWhatIs('rec')}
                className="text-xs text-[#8C8881] hover:text-[#1A1816] font-medium inline-flex items-center gap-1 cursor-pointer transition-colors w-fit"
              >
                <span>{expandedWhatIs['rec'] ? 'Mostrar menos' : 'Leia mais'}</span>
                {expandedWhatIs['rec'] ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Card 2: Assistente de telefone digital */}
            <div className="bg-white rounded-3xl p-8 border border-[#E7E4DC] shadow-clean flex flex-col justify-between transition-all duration-300">
              <div>
                <h3 className="text-xl font-bold text-[#1A1816] mb-3">Assistente de telefone digital</h3>
                <p className="text-xs sm:text-sm text-[#5C5955] leading-relaxed mb-6">
                  {expandedWhatIs['assist'] ? (
                    'Uma recepcionista virtual com IA é um assistente de telefone digital inteligente que executa tarefas de atendimento breves como identificar a intenção do cliente, consultar dados cadastrais e encaminhar o cliente diretamente para a pessoa certa.'
                  ) : (
                    'Uma recepcionista virtual com IA é um assistente de telefone digital inteligente que executa tarefas de atendimento breves como identificar a intenção do...'
                  )}
                </p>
              </div>
              <button 
                onClick={() => toggleWhatIs('assist')}
                className="text-xs text-[#8C8881] hover:text-[#1A1816] font-medium inline-flex items-center gap-1 cursor-pointer transition-colors w-fit"
              >
                <span>{expandedWhatIs['assist'] ? 'Mostrar menos' : 'Leia mais'}</span>
                {expandedWhatIs['assist'] ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            </div>

          </div>

          <button
            onClick={onOpenAuth}
            className="px-8 py-3.5 rounded-full bg-[#11100F] text-white text-xs sm:text-sm font-semibold hover:bg-black transition-all shadow-md hover:shadow-lg inline-flex items-center gap-2 cursor-pointer"
          >
            <span>Conhecer a plataforma agora</span>
            <ArrowRight className="w-3.5 h-3.5 text-white/80" />
          </button>

        </div>
      </section>

      {/* ========================================================
          4. COMO FUNCIONA A RECEPCIONISTA VIRTUAL COM IA? (4 Cards)
         ======================================================== */}
      <section className="py-24 bg-white border-y border-[#EBE8E2]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-normal text-[#1A1816] tracking-tight">
              Como funciona a recepcionista virtual com IA?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {howItWorksCards.map((c) => {
              const isExpanded = !!expandedHowItWorks[c.num];
              return (
                <div 
                  key={c.num}
                  className="bg-white rounded-3xl p-7 sm:p-8 border border-[#E7E4DC] shadow-sm flex flex-col justify-between transition-all duration-300"
                >
                  <div>
                    <div className="w-8 h-8 rounded-full bg-[#FAF9F5] border border-[#E0E7FF] text-[#1A1816] flex items-center justify-center font-bold text-xs mb-4">
                      {c.num}
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-[#1A1816] mb-3 leading-snug">
                      {c.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#5C5955] leading-relaxed mb-4">
                      {isExpanded ? c.fullDesc : c.shortDesc}
                    </p>
                  </div>
                  <div className="pt-2 mt-auto">
                    <button 
                      onClick={() => toggleHowItWorks(c.num)}
                      className="text-xs text-[#8C8881] hover:text-[#1A1816] font-medium inline-flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <span>{isExpanded ? 'Mostrar menos' : 'Leia mais'}</span>
                      {isExpanded ? (
                        <ChevronUp className="w-3.5 h-3.5" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ========================================================
          5. VANTAGENS DA NOSSA RECEPCIONISTA (3 Cards com Visual - 1:1 Kloel)
         ======================================================== */}
      <section className="py-24 bg-[#FAF9F5]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-xl">
              <h2 className="text-3xl sm:text-4xl font-normal text-[#1A1816] tracking-tight leading-tight">
                Vantagens da nossa<br />
                <span className="font-serif-title italic text-[#4F46E5]">recepcionista virtual com IA</span>
              </h2>
            </div>
            <div className="max-w-md text-xs sm:text-sm text-[#5C5955] leading-relaxed">
              {expandedTopAdvantage ? (
                <span>
                  A recepcionista virtual com IA ajuda a organizar o atendimento fora do expediente, estruturar a triagem de solicitações e registrar informações conforme as regras configuradas no plano.
                </span>
              ) : (
                <span>
                  A recepcionista virtual com IA ajuda a organizar o atendimento fora do expediente, estruturar a triagem...
                </span>
              )}
              <button 
                onClick={() => setExpandedTopAdvantage(!expandedTopAdvantage)}
                className="text-[#736F69] hover:text-[#1A1816] font-medium text-xs ml-1 inline-flex items-center gap-0.5 cursor-pointer transition-colors"
              >
                <span>{expandedTopAdvantage ? 'Mostrar menos' : 'Leia mais'}</span>
                {expandedTopAdvantage ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {advantages.map((adv, idx) => {
              const isExpanded = !!expandedAdvantages[idx];
              return (
                <div 
                  key={idx}
                  className="bg-white rounded-3xl p-6 border border-[#E7E4DC] shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
                >
                  <div>
                    <div className="mb-5">
                      {adv.visual}
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-[#1A1816] mb-2">
                      {adv.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#5C5955] leading-relaxed">
                      {isExpanded ? adv.fullDesc : adv.shortDesc}
                    </p>
                  </div>
                  
                  <div className="pt-4 mt-auto">
                    <button 
                      onClick={() => toggleAdvantage(idx)}
                      className="text-xs text-[#8C8881] hover:text-[#1A1816] font-medium inline-flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <span>{isExpanded ? 'Mostrar menos' : 'Leia mais'}</span>
                      {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Centered Pagination Arrows (1:1 com print do Kloel) */}
          <div className="flex items-center justify-center gap-3 mt-10">
            <button 
              type="button"
              className="w-9 h-9 rounded-full bg-white border border-[#E7E4DC] hover:border-[#1A1816] flex items-center justify-center text-stone-600 hover:text-[#1A1816] transition-colors shadow-xs cursor-pointer"
              title="Anterior"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button 
              type="button"
              className="w-9 h-9 rounded-full bg-white border border-[#E7E4DC] hover:border-[#1A1816] flex items-center justify-center text-stone-600 hover:text-[#1A1816] transition-colors shadow-xs cursor-pointer"
              title="Próximo"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>

      {/* ========================================================
          6. VOCALIS RECEPCIONISTA VIRTUAL COM IA (Accordion)
         ======================================================== */}
      <section className="py-24 bg-white border-y border-[#EBE8E2]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-normal text-[#1A1816] tracking-tight">
              {BRAND.name} Recepcionista Virtual com IA
            </h2>
          </div>

          <div className="space-y-4">
            {accordionItems.map((item, i) => {
              const isOpen = faqOpenIndex === i;
              return (
                <div 
                  key={i}
                  className="border-b border-stone-200 pb-4 transition-all"
                >
                  <button
                    onClick={() => setFaqOpenIndex(isOpen ? -1 : i)}
                    className="w-full flex items-center justify-between text-left py-2 font-bold text-base text-[#1A1816] hover:text-[#4F46E5] transition-colors cursor-pointer"
                  >
                    <span>{item.title}</span>
                    <span className="text-stone-400 text-lg font-mono">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="pt-2 pb-2 text-sm text-[#5C5955] leading-relaxed font-sans">
                      {item.content}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ========================================================
          7. BANNER CTA FINAL ESCURO
         ======================================================== */}
      <section className="py-20 bg-[#FAF9F5]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#141312] text-white rounded-[32px] p-8 sm:p-14 relative overflow-hidden shadow-2xl border border-stone-800 text-center">
            
            <div className="relative z-10 max-w-2xl mx-auto space-y-5">
              <h2 className="text-4xl sm:text-5xl font-normal tracking-tight text-white leading-tight">
                Organize cada contato.<br />
                <span className="font-serif-title italic text-[#A5B4FC]">Estruture o atendimento da sua empresa.</span>
              </h2>

              <p className="text-sm text-stone-300 leading-relaxed max-w-xl mx-auto">
                Configure a recepcionista virtual conforme o plano contratado e apresente um fluxo claro de triagem e encaminhamento.
              </p>

              <div className="pt-3">
                <button
                  onClick={onOpenAuth}
                  className="px-8 py-3.5 rounded-full bg-white text-[#141312] text-sm font-bold hover:bg-stone-100 transition-all shadow-xl hover:scale-105 cursor-pointer"
                >
                  Criar minha Vocalis AI
                </button>
              </div>
            </div>

            {/* Audio Wave Frequency Spectrum in Active Motion */}
            <div className="pt-8 -mx-8 sm:-mx-14 -mb-8 sm:-mb-14">
              <AudioFrequencyWave 
                variant="full" 
                showLatencyBadge={true}
                latencyText="Visualização ilustrativa • Voz em português brasileiro"
              />
            </div>

          </div>
        </div>
      </section>

      {/* Interactive Live Test Call Modal */}
      <TestCallModal
        isOpen={testCallModalOpen}
        phoneNumber={phoneNumber}
        countryCode={selectedCountry.code}
        onClose={() => setTestCallModalOpen(false)}
        onOpenAuth={onOpenAuth}
      />

    </div>
  );
}
