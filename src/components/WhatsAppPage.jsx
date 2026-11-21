import React, { useState } from 'react';
import { 
  MessageSquare, MessageCircle, Check, ArrowRight, Play, Pause, 
  Smartphone, ShieldCheck, Zap, Sparkles, ChevronDown, ChevronUp,
  Clock, Database, Users, HelpCircle, Bot, Send, CheckCheck, Phone
} from 'lucide-react';
import { BRAND } from '../data/content';
import { COMMERCIAL_CATALOG, INFO_STATUS } from '../data/commercialCatalog';
import {
  getPlanCardViewModel,
  getChannelAnnualAvailability,
  getChannelUsageTerms,
  getChannelLimitReachedPolicy,
} from '../utils/commercialCatalogUtils';
import { speakFemalePt } from '../utils/voiceUtils';

export default function WhatsAppPage({
  onOpenDemo,
  onOpenAuth,
  onNavigateHome,
  catalog = COMMERCIAL_CATALOG,
}) {
  const [billingCycle, setBillingCycle] = useState('mensal'); // 'mensal' | 'anual'
  const [faqOpenIndex, setFaqOpenIndex] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [customAssistantName, setCustomAssistantName] = useState('Sara');

  const waAnnualAvailability = getChannelAnnualAvailability('whatsapp', catalog);
  const effectiveCycle = waAnnualAvailability.isConfirmedAvailable ? billingCycle : 'mensal';
  const waPlans = catalog.channels.whatsapp.plans.map((plan) =>
    getPlanCardViewModel('whatsapp', plan.id, effectiveCycle, catalog)
  );
  const waUsageTerms = getChannelUsageTerms('whatsapp', catalog);
  const waLimitPolicy = getChannelLimitReachedPolicy('whatsapp', catalog);
  const waAnnualDiscountBadge = waAnnualAvailability.isConfirmedAvailable
    ? getPlanCardViewModel('whatsapp', waPlans[0].id, 'anual', catalog)?.pricing
        ?.annualDiscountBadge || null
    : null;

  const faqs = [
    {
      q: 'Qual a diferença entre API Oficial (Meta Cloud API) e conexões não oficiais?',
      a: 'A API Oficial (WhatsApp Business Platform / Meta Cloud API) depende de conta empresarial verificada na Meta ou provedor autorizado (BSP), aprovação de templates e eventuais tarifas oficiais da Meta por conversa/mensagem. Conexões não oficiais via emulação de WhatsApp Web (como protótipos Baileys) exigem pareamento por QR Code, dependem de servidor próprio/local ativo e apresentam risco de queda de sessão e bloqueio ou banimento do número pela Meta — por isso, não integram nossa oferta comercial pública principal.'
    },
    {
      q: 'Há integração oficial com a WhatsApp Business Platform ativa neste site ou isenção de taxas da Meta?',
      a: 'Não anunciamos isenção de taxas da Meta nem integração plug-and-play universal. Eventuais custos de provedor e tarifas da Meta Cloud API dependem da modalidade contratada e estão sinalizados como pendentes de confirmação no catálogo comercial.'
    },
    {
      q: 'Posso usar meu número atual?',
      a: 'As opções de utilizar o número atual da empresa ou contratar um número dedicado dependem da modalidade oficial aprovada na implantação e das regras da Meta.'
    },
    {
      q: 'Como funciona o envio e recebimento de áudios no WhatsApp?',
      a: 'As prévias desta página são simulações ilustrativas reproduzidas no navegador (não enviam mensagens nem áudios reais). Em operação real, envio e leitura de áudios dependem da infraestrutura do provedor contratado e dos recursos confirmados do plano.'
    },
    {
      q: 'E quando o cliente pede para falar com um humano?',
      a: 'As regras de encaminhamento para atendente humano e eventual integração com sua equipe dependem da configuração implantada no plano contratado (não há atendente humano conectado automaticamente na demonstração do site).'
    },
    {
      q: 'Vocalis conversa em grupos de WhatsApp?',
      a: 'A proposta comercial é voltada para atendimentos individuais de clientes conforme escopo confirmado na implantação.'
    },
    {
      q: 'Em quanto tempo meu assistente fica pronto?',
      a: 'O prazo real de configuração, aprovação cadastral junto à Meta/provedor e entrada em operação é informado após avaliação técnica do projeto.'
    }
  ];

  const steps = [
    {
      number: '01',
      title: 'Conecte o WhatsApp Business',
      desc: 'Escolha a modalidade de conexão disponível no seu plano com apoio da nossa equipe durante a implantação.'
    },
    {
      number: '02',
      title: 'Ensine o seu negócio',
      desc: 'Envie informações do seu negócio, catálogo de serviços e regras de agendamento para orientar as respostas do assistente.'
    },
    {
      number: '03',
      title: 'Acompanhe os atendimentos',
      desc: 'Estruture respostas automatizadas em texto ou áudio conforme o escopo configurado e os limites do seu plano.'
    }
  ];

  const handlePlayVoiceSample = () => {
    if (audioPlaying) {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      setAudioPlaying(false);
    } else {
      setAudioPlaying(true);
      const sampleText = "Oi, tudo bem? Já consultei a agenda da clínica e temos vaga nesta sexta-feira às dez da manhã ou às três da tarde. Qual horário fica melhor pra você?";
      speakFemalePt(
        sampleText,
        () => setAudioPlaying(true),
        () => setAudioPlaying(false),
        () => setAudioPlaying(false)
      );
    }
  };

  return (
    <div className="bg-[#FAF9F5] text-[#1A1816] font-sans">
      
      {/* ========================================================
          1. HERO SECTION (Exact replica of user's uploaded print)
         ======================================================== */}
      <section className="relative pt-12 pb-20 md:pt-16 md:pb-28 overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-emerald-50/70 via-[#FAF9F5]/40 to-transparent pointer-events-none -z-10" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E7E4DC] text-[#1A1816] text-xs font-semibold uppercase tracking-wider mb-8 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="text-[#075E54] font-bold">CANAL WHATSAPP · ESCOPO SUJEITO A CONFIGURAÇÃO</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-normal tracking-tight text-[#1A1816] max-w-4xl mx-auto leading-[1.08] mb-6">
            Fluxos configuráveis<br />
            para apoiar o atendimento <span className="font-serif-title italic font-normal text-[#1A1816]">no WhatsApp.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-[#5C5955] max-w-2xl mx-auto font-normal leading-relaxed mb-8">
            Conheça como assistentes configuráveis podem auxiliar em triagem inicial, agendamentos e encaminhamento no WhatsApp. Modalidade de conexão, integração com sistemas externos e eventuais custos da Meta dependem do plano confirmado.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 mb-12">
            <button
              onClick={onOpenAuth}
              className="px-7 py-3.5 rounded-full bg-[#11100F] text-white text-sm font-semibold hover:bg-black transition-all shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer"
            >
              <span>Criar meu assistente de WhatsApp</span>
              <ArrowRight className="w-4 h-4 text-white/80" />
            </button>
            <button
              onClick={onOpenDemo}
              className="px-7 py-3.5 rounded-full bg-white text-[#1A1816] border border-[#DCD8D0] text-sm font-semibold hover:bg-[#FAF9F5] transition-all cursor-pointer"
            >
              Agendar uma conversa
            </button>
          </div>

          {/* ========================================================
              SMARTPHONE WHATSAPP ILLUSTRATIVE DEMO MOCKUP
             ======================================================== */}
          <div className="max-w-md mx-auto mb-10">
            <div className="bg-[#0b141a] rounded-[40px] p-4 shadow-2xl border-4 border-stone-800 text-left overflow-hidden relative">
              
              {/* WhatsApp App Top Bar */}
              <div className="bg-[#1f2c34] rounded-2xl p-3 flex items-center justify-between text-white mb-3 shadow-sm">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-[#00a884] flex items-center justify-center font-bold text-white text-sm">
                    V
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold text-xs text-white">Sara · Assistente de IA</span>
                    </div>
                    <p className="text-[10px] text-emerald-400">simulação ilustrativa no navegador</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-medium">
                    Simulação ilustrativa
                  </span>
                </div>
              </div>

              {/* Chat Conversation Area */}
              <div className="p-3 space-y-3 text-xs bg-[#0b141a]">
                <p className="text-[10px] text-stone-400 text-center pb-1">
                  Conversa fictícia (simulação ilustrativa — não envia mensagens reais)
                </p>
                
                {/* User Message 1 */}
                <div className="bg-[#005c4b] text-white p-3 rounded-2xl rounded-tr-none ml-auto max-w-[85%] shadow-sm">
                  <p>Boa tarde! Gostaria de saber os horários para limpeza de pele essa semana.</p>
                  <span className="text-[9px] text-emerald-200 block text-right mt-1 flex items-center justify-end gap-1">
                    14:22 <CheckCheck className="w-3 h-3 text-blue-300" />
                  </span>
                </div>

                {/* AI Response 1 */}
                <div className="bg-[#202c33] text-stone-100 p-3 rounded-2xl rounded-tl-none max-w-[88%] shadow-sm space-y-1">
                  <span className="text-[10px] font-bold text-[#A5B4FC]">SARA · ASSISTENTE DE IA (SIMULAÇÃO)</span>
                  <p>Boa tarde! Temos horários disponíveis com a Dra. Camila nesta quinta às 15h ou sexta às 10h. Qual fica melhor para você?</p>
                  <span className="text-[9px] text-stone-400 block text-right">14:22</span>
                </div>

                {/* User Message 2 */}
                <div className="bg-[#005c4b] text-white p-3 rounded-2xl rounded-tr-none ml-auto max-w-[85%] shadow-sm">
                  <p>Pode ser sexta às 10h!</p>
                  <span className="text-[9px] text-emerald-200 block text-right mt-1 flex items-center justify-end gap-1">
                    14:23 <CheckCheck className="w-3 h-3 text-blue-300" />
                  </span>
                </div>

                {/* AI Audio Response */}
                <div className="bg-[#202c33] text-stone-100 p-3 rounded-2xl rounded-tl-none max-w-[88%] shadow-sm space-y-2">
                  <span className="text-[10px] font-bold text-[#A5B4FC]">MENSAGEM DE ÁUDIO · ASSISTENTE DE IA (SIMULAÇÃO)</span>
                  
                  <div className="flex items-center gap-3 bg-[#111b21] p-2 rounded-xl">
                    <button 
                      onClick={handlePlayVoiceSample}
                      className="w-8 h-8 rounded-full bg-[#00a884] text-white flex items-center justify-center shrink-0 hover:scale-105 transition-transform"
                    >
                      {audioPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current ml-0.5" />}
                    </button>
                    <div className="flex-1">
                      <div className="h-1 bg-stone-700 rounded-full overflow-hidden">
                        <div className={`h-full bg-[#00a884] ${audioPlaying ? 'w-3/4 animate-pulse' : 'w-1/3'}`}></div>
                      </div>
                      <div className="flex justify-between text-[9px] text-stone-400 mt-1">
                        <span>{audioPlaying ? 'Ouvindo...' : '0:14'}</span>
                        <span>Voz neural brasileira</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-[11px] text-stone-300">
                    Perfeito! Agendamento confirmado para sexta às 10h. Te enviei os dados de preparo aqui acima. Nos vemos em breve!
                  </p>
                  <span className="text-[9px] text-stone-400 block text-right">14:23</span>
                </div>

              </div>

            </div>
          </div>

          {/* Checklist prudente */}
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 text-xs font-semibold text-[#5C5955]">
            <div className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-[#4F46E5]" strokeWidth={2.5} />
              <span>Fluxos configuráveis</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-[#4F46E5]" strokeWidth={2.5} />
              <span>Texto e áudio em PT-BR</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-[#4F46E5]" strokeWidth={2.5} />
              <span>Integração e condições sob consulta</span>
            </div>
          </div>

          {/* Transparency Matrix: Official API vs Non-Official Baileys */}
          <div className="max-w-5xl mx-auto mt-12 text-left bg-white rounded-3xl border border-[#E7E4DC] p-6 sm:p-8 shadow-sm space-y-5">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#4F46E5] block mb-1">
                Status Técnico e Modalidades de Conexão (WhatsApp)
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#1A1816]">
                Diferenças entre API Oficial, protótipo não oficial e simulações do site
              </h2>
              <p className="text-xs sm:text-sm text-[#5C5955] mt-1 leading-relaxed">
                Conexão oficial da Meta e soluções não oficiais por QR Code não são equivalentes. Abaixo está o status real de cada modalidade no projeto:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#E7E4DC] space-y-2">
                <div className="font-bold text-[#1A1816]">WhatsApp Business Platform (API Oficial Meta)</div>
                <span className="inline-block px-2 py-0.5 rounded-full bg-indigo-50 text-[#4338CA] text-[10px] font-bold border border-indigo-200">
                  Depende de terceiros · Sob consulta
                </span>
                <p className="text-[#5C5955] leading-relaxed">
                  Requer conta empresarial verificada na Meta ou provedor BSP autorizado, aprovação de modelos e está sujeita às tarifas oficiais da Meta por conversa ou mensagem (valores e implantação pendentes de confirmação).
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-2">
                <div className="font-bold text-[#1A1816]">WhatsApp Web / Baileys (Não Oficial)</div>
                <span className="inline-block px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-bold border border-amber-300">
                  Retirado da oferta pública principal
                </span>
                <p className="text-[#5C5955] leading-relaxed">
                  Existe apenas como protótipo experimental local para testes de envio outbound via QR Code (`localhost:8080`). Depende de sessão local contínua, não garante estabilidade ou entrega e apresenta risco de desconexão e restrição/banimento do número pela Meta — aguardando decisão do proprietário.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#E7E4DC] space-y-2">
                <div className="font-bold text-[#1A1816]">Demonstrações nesta página</div>
                <span className="inline-block px-2 py-0.5 rounded-full bg-stone-100 text-[#5C5955] text-[10px] font-bold border border-stone-200">
                  Simulação ilustrativa no navegador
                </span>
                <p className="text-[#5C5955] leading-relaxed">
                  O mockup de chat e os reprodutores de áudio rodam apenas no navegador como exemplos fictícios, sem conectar números reais nem enviar mensagens reais.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================
          2. DASHBOARD CREATION MODAL PREVIEW (Exact match to print)
         ======================================================== */}
      <section className="py-20 bg-white border-y border-[#EBE8E2]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <div className="relative rounded-3xl bg-stone-100/80 p-4 sm:p-8 border border-stone-200 shadow-xl overflow-hidden mb-8">
            
            {/* Modal Card */}
            <div className="max-w-xl mx-auto bg-white rounded-2xl border border-stone-200 shadow-2xl p-6 text-left relative">
              
              <div className="flex items-center justify-between pb-4 border-b border-stone-100">
                <h3 className="text-base font-bold text-[#1A1816]">Criar assistente</h3>
                <span className="text-stone-400 text-xs cursor-pointer">✕</span>
              </div>

              <div className="py-4 space-y-4">
                <div>
                  <label className="text-xs font-bold text-stone-600 block mb-2">Tipo de assistente</label>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 relative">
                    
                    {/* Option 1: Telefone */}
                    <div className="p-3.5 rounded-xl border border-stone-200 bg-stone-50/50 opacity-60">
                      <div className="flex items-center gap-2 mb-1">
                        <Phone className="w-4 h-4 text-stone-500" />
                        <span className="text-xs font-bold text-stone-700">Assistente telefônico</span>
                      </div>
                      <p className="text-[11px] text-stone-500 leading-tight">
                        Atende ligações na voz com inteligência artificial.
                      </p>
                    </div>

                    {/* Option 2: WhatsApp (Selected) */}
                    <div className="p-3.5 rounded-xl border-2 border-[#4F46E5] bg-[#EEF2FF] relative shadow-sm">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <MessageCircle className="w-4 h-4 text-[#4F46E5]" />
                          <span className="text-xs font-bold text-[#1A1816]">Assistente de WhatsApp</span>
                        </div>
                        <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-[#4F46E5] text-white font-bold">
                          Ativo
                        </span>
                      </div>
                      <p className="text-[11px] text-stone-600 leading-tight">
                        Conversa no WhatsApp em texto e áudio.
                      </p>
                    </div>

                    {/* Floating Callout Badge */}
                    <div className="absolute -top-3 right-4 bg-[#4F46E5] text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-md flex items-center gap-1.5">
                      <span>Simulação ilustrativa do painel de criação</span>
                      <Sparkles className="w-3 h-3" />
                    </div>

                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-600 block mb-1">Nome</label>
                  <input
                    type="text"
                    value={customAssistantName}
                    onChange={(e) => setCustomAssistantName(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-sm focus:outline-none focus:border-[#4F46E5]"
                    placeholder="Ex: Sara"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-end gap-2 text-xs font-semibold">
                <button className="px-4 py-2 rounded-xl text-stone-500 hover:bg-stone-50">
                  Cancelar
                </button>
                <button 
                  onClick={onOpenAuth}
                  className="px-5 py-2 rounded-xl bg-[#11100F] text-white hover:bg-black transition-colors"
                >
                  Criar assistente
                </button>
              </div>

            </div>

          </div>

          <button
            onClick={onOpenAuth}
            className="px-8 py-3.5 rounded-full bg-[#11100F] text-white text-sm font-semibold hover:bg-black transition-all shadow-md hover:shadow-lg inline-flex items-center gap-2"
          >
            <span>Começar no WhatsApp agora</span>
            <ArrowRight className="w-4 h-4 text-white/80" />
          </button>

        </div>
      </section>

      {/* ========================================================
          3. O QUE ELA FAZ NA CONVERSA (3 Cards de Conversas Reais)
         ======================================================== */}
      <section className="py-24 bg-[#FAF9F5]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl sm:text-5xl font-normal text-[#1A1816] tracking-tight leading-[1.12]">
              O que ela faz <span className="font-serif-title italic text-[#4F46E5]">na conversa.</span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#5C5955]">
              Nossos assistentes de WhatsApp não são chatbots burros de menus numéricos. Veja como ela atua:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card 1: Responde na hora */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E7E4DC] shadow-clean flex flex-col justify-between">
              <div>
                <div className="bg-[#FAF9F5] rounded-2xl p-4 border border-[#EBE8E2] mb-6 space-y-2.5 text-xs font-sans">
                  <div className="bg-[#E7F8F0] p-2.5 rounded-xl text-stone-800 ml-auto max-w-[85%] border border-emerald-100">
                    Olá, tem mesa disponível pra hoje às 20h para 4 pessoas?
                  </div>
                  <div className="bg-white p-2.5 rounded-xl text-stone-800 border border-stone-200">
                    Boa tarde! Temos sim. Já deixei uma mesa reservada no salão principal para as 20h no seu nome. Deseja incluir alguma observação?
                  </div>
                </div>

                <h3 className="text-xl font-bold text-[#1A1816] mb-2">Respostas configuráveis</h3>
                <p className="text-xs sm:text-sm text-[#5C5955] leading-relaxed">
                  Permite configurar respostas automatizadas inclusive fora do horário comercial e em fins de semana, conforme regras do plano.
                </p>
              </div>
            </div>

            {/* Card 2: Reconhece áudio na conversa */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E7E4DC] shadow-clean flex flex-col justify-between">
              <div>
                <div className="bg-[#FAF9F5] rounded-2xl p-4 border border-[#EBE8E2] mb-6 space-y-2.5 text-xs font-sans">
                  <div className="bg-[#E7F8F0] p-2.5 rounded-xl text-stone-800 ml-auto max-w-[85%] border border-emerald-100 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px]">▶</span>
                    <span>Mensagem de voz (0:24)</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl text-stone-800 border border-stone-200">
                    Entendido! Como você mencionou no áudio que prefere atendimento matutino, agendei a consulta com a Dra. Mariana para sexta às 9h!
                  </div>
                </div>

                <h3 className="text-xl font-bold text-[#1A1816] mb-2">Reconhece áudio na conversa</h3>
                <p className="text-xs sm:text-sm text-[#5C5955] leading-relaxed">
                  Clientes adoram mandar áudios longos. A Vocalis escuta, compreende o contexto e responde de forma clara em texto ou voz.
                </p>
              </div>
            </div>

            {/* Card 3: Resolve no seu negócio */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E7E4DC] shadow-clean flex flex-col justify-between">
              <div>
                <div className="bg-[#FAF9F5] rounded-2xl p-4 border border-[#EBE8E2] mb-6 space-y-2.5 text-xs font-sans">
                  <div className="bg-[#E7F8F0] p-2.5 rounded-xl text-stone-800 ml-auto max-w-[85%] border border-emerald-100">
                    Vocês aceitam o convênio Bradesco Saúde Top Nacional?
                  </div>
                  <div className="bg-white p-2.5 rounded-xl text-stone-800 border border-stone-200">
                    Sim! Aceitamos o Bradesco Top Nacional para consultas e exames na unidade Jardins. Posso agendar a sua triagem para esta quinta?
                  </div>
                </div>

                <h3 className="text-xl font-bold text-[#1A1816] mb-2">Resolve no seu negócio</h3>
                <p className="text-xs sm:text-sm text-[#5C5955] leading-relaxed">
                  Configurada com as regras, serviços e instruções definidas pela sua empresa para orientar o atendimento.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================
          4. NO AR EM TRÊS PASSOS
         ======================================================== */}
      <section className="py-24 bg-white border-y border-[#EBE8E2]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Steps Accordion */}
            <div className="lg:col-span-5 space-y-6">
              <h2 className="text-4xl sm:text-5xl font-normal text-[#1A1816] tracking-tight leading-[1.12]">
                No ar em <span className="font-serif-title italic text-[#4F46E5]">três passos.</span>
              </h2>

              <div className="space-y-4 pt-4">
                {steps.map((st, i) => (
                  <div 
                    key={i}
                    onClick={() => setActiveStep(i)}
                    className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                      activeStep === i 
                        ? 'bg-[#EEF2FF] border-[#4F46E5]/30 shadow-sm' 
                        : 'bg-white border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-xs font-bold text-[#4F46E5]">{st.number}</span>
                      <span className="text-xs font-semibold text-stone-400">Passo {i + 1} de 3</span>
                    </div>
                    <h4 className="text-base font-bold text-[#1A1816] mb-1">{st.title}</h4>
                    <p className="text-xs sm:text-sm text-[#5C5955] leading-relaxed">{st.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Platform Mockup View (Simulação ilustrativa) */}
            <div className="lg:col-span-7">
              <div className="bg-[#141312] rounded-3xl p-6 sm:p-8 text-white border border-stone-800 shadow-2xl">
                
                <div className="flex items-center justify-between pb-4 border-b border-stone-800 text-xs text-stone-400">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-indigo-400"></span>
                    <span className="font-semibold text-stone-200">Painel Vocalis · Simulação ilustrativa</span>
                  </div>
                  <span className="font-mono text-[11px] text-stone-400">Dados fictícios</span>
                </div>

                <div className="py-6 space-y-4 text-xs">
                  <div className="p-4 rounded-xl bg-stone-900 border border-stone-800 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-white text-sm">Assistente: Sara (WhatsApp)</p>
                      <p className="text-stone-400 text-xs">Exemplo ilustrativo de canal conectado</p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 font-bold text-[11px]">
                      Ilustrativo
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="p-3 rounded-xl bg-stone-900 border border-stone-800">
                      <span className="text-stone-400 block text-[10px] uppercase">Conversas (exemplo)</span>
                      <span className="text-xl font-bold text-white">142</span>
                    </div>
                    <div className="p-3 rounded-xl bg-stone-900 border border-stone-800">
                      <span className="text-stone-400 block text-[10px] uppercase">Resposta (exemplo)</span>
                      <span className="text-xl font-bold text-emerald-400">Ilustrativo</span>
                    </div>
                    <div className="p-3 rounded-xl bg-stone-900 border border-stone-800">
                      <span className="text-stone-400 block text-[10px] uppercase">Agendamentos (exemplo)</span>
                      <span className="text-xl font-bold text-[#A5B4FC]">38</span>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={onOpenAuth}
                  className="w-full py-3 rounded-xl bg-[#4F46E5] hover:bg-[#B34018] text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Acessar Painel de Controle</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================
          5. PLANOS DE WHATSAPP (Fonte única comercial)
         ======================================================== */}
      <section className="py-24 bg-[#FAF9F5]" id="precos-whatsapp">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-4xl sm:text-5xl font-normal text-[#1A1816] tracking-tight leading-[1.12]">
              Planos para cada <span className="font-serif-title italic text-[#4F46E5]">ritmo de conversa.</span>
            </h2>
            <p className="mt-3 text-sm text-[#5C5955]">
              Condições comerciais e limites de WhatsApp espelham exatamente a fonte única da Vocalis AI.
            </p>

            {/* Monthly / Annual Toggle */}
            <div className="flex items-center justify-center gap-3 mt-6">
              {waAnnualAvailability.isConfirmedAvailable ? (
                <div className="inline-flex items-center bg-white border border-[#E7E4DC] p-1 rounded-full shadow-sm">
                  <button
                    type="button"
                    onClick={() => setBillingCycle('mensal')}
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                      effectiveCycle === 'mensal'
                        ? 'bg-[#1A1816] text-white shadow-sm'
                        : 'text-[#5C5955] hover:text-[#1A1816]'
                    }`}
                  >
                    Mensal
                  </button>
                  <button
                    type="button"
                    onClick={() => setBillingCycle('anual')}
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                      effectiveCycle === 'anual'
                        ? 'bg-[#1A1816] text-white shadow-sm'
                        : 'text-[#5C5955] hover:text-[#1A1816]'
                    }`}
                  >
                    <span>Anual</span>
                    {waAnnualDiscountBadge && (
                      <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-[#4F46E5]/15 text-[#4F46E5]">
                        {waAnnualDiscountBadge}
                      </span>
                    )}
                  </button>
                </div>
              ) : (
                <div className="inline-flex items-center gap-2 bg-white border border-[#E7E4DC] px-4 py-2 rounded-full text-xs text-[#5C5955]">
                  <strong className="text-[#1A1816]">Mensal</strong>
                  <span>·</span>
                  <span>{waAnnualAvailability.label}</span>
                </div>
              )}
            </div>

            <div className="mt-4 inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#1A1816] text-white text-[11px] font-bold tracking-wide">
              <span className="text-amber-400 uppercase">CATÁLOGO OFICIAL</span>
              <span>•</span>
              <span className="text-[#A5B4FC]">ITENS PENDENTES SINALIZADOS ATÉ CONFIRMAÇÃO</span>
            </div>
          </div>

          {/* WhatsApp Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
            {waPlans.map((card) => {
              const isFeatured = card.highlight;
              const { pricing } = card;

              return (
                <div
                  key={card.id}
                  className={`rounded-3xl p-7 flex flex-col justify-between transition-all relative ${
                    isFeatured
                      ? 'bg-white border-2 border-[#4F46E5] shadow-2xl scale-[1.02] z-10'
                      : 'bg-white border border-[#E7E4DC] shadow-clean hover:shadow-card-hover'
                  }`}
                >
                  {card.badge && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#4F46E5] text-white text-[11px] font-bold uppercase tracking-wider shadow-md">
                      {card.badge}
                    </div>
                  )}

                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-xl font-bold text-[#1A1816]">{card.name}</h3>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          pricing.status === INFO_STATUS.CONFIRMADA
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-amber-50 text-amber-800'
                        }`}
                      >
                        {pricing.statusLabel}
                      </span>
                    </div>
                    <p className="text-xs text-[#5C5955] mt-1">{card.tagline}</p>

                    {pricing.hasActiveConfirmedPromo && (
                      <div className="mt-3 text-[11px] font-bold text-[#4F46E5]">
                        {pricing.promoBadgeLabel} · {pricing.promoScopeLabel} ({pricing.promoValidUntilLabel})
                      </div>
                    )}

                    <div className="mt-5 mb-6">
                      <div className="flex items-baseline gap-2 flex-wrap">
                        {pricing.regularPriceLabel && (
                          <span className="text-sm text-[#8C8881] line-through">{pricing.regularPriceLabel}</span>
                        )}
                        <span className="text-2xl sm:text-3xl font-extrabold text-[#1A1816] tracking-tight">
                          {pricing.displayPrice}
                        </span>
                        {pricing.hasConfirmedPrice && (
                          <span className="text-xs text-[#8C8881]">/mês</span>
                        )}
                      </div>
                      <p className="text-[11px] text-[#5C5955] font-medium mt-1">
                        {pricing.afterPromoLabel}
                      </p>
                      {effectiveCycle === 'anual' && pricing.annualChargeTypeLabel && (
                        <p className="text-[11px] text-[#4F46E5] font-medium mt-1">
                          {pricing.annualChargeTypeLabel}
                        </p>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        if (card.cta.action === 'checkout' && card.cta.url) {
                          window.open(card.cta.url, '_blank', 'noopener,noreferrer');
                        } else if (onOpenDemo) {
                          onOpenDemo();
                        } else if (onOpenAuth) {
                          onOpenAuth();
                        }
                      }}
                      className={`w-full py-3 rounded-full text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer ${
                        isFeatured
                          ? 'bg-[#4F46E5] text-white hover:bg-[#4338CA]'
                          : 'bg-[#1A1816] text-white hover:bg-black'
                      }`}
                    >
                      <span>{card.cta.label}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <div className="mt-6 pt-6 border-t border-[#EBE8E2] space-y-2 text-xs">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C8881] block mb-2">
                        USO, LIMITES E FUNCIONALIDADES
                      </span>
                      {[...card.includedRows, ...card.limitRows, ...card.visibleOverageRows].map((row) => (
                        <div key={row.key} className="flex flex-col gap-0.5 border-b border-[#F5F2EB] pb-1.5">
                          <span className="text-[11px] text-[#736F69]">{row.label}</span>
                          <span className="text-[#1A1816] font-medium">{row.text}</span>
                        </div>
                      ))}
                      {card.featureRows.map((feat) => (
                        <div key={feat.key} className="flex items-center justify-between gap-2 text-[#5C5955]">
                          <span className="flex items-center gap-1.5">
                            <Check className="w-3.5 h-3.5 text-[#4F46E5] shrink-0" />
                            <span>{feat.label}</span>
                          </span>
                          <span className="text-[11px] text-[#736F69]">{feat.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="max-w-5xl mx-auto mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            {waUsageTerms.map((term) => (
              <div key={term.key} className="p-4 rounded-2xl bg-white border border-[#E7E4DC]">
                <strong className="text-[#1A1816] block mb-1">{term.term} (WhatsApp)</strong>
                <span className="text-[#5C5955]">{term.text}</span>
              </div>
            ))}
            {waLimitPolicy.isConfirmed && (
              <div className="sm:col-span-2 p-4 rounded-2xl bg-white border border-[#E7E4DC]">
                <strong className="text-[#1A1816] block mb-1">Quando o limite acaba</strong>
                <span className="text-[#5C5955]">{waLimitPolicy.text}</span>
              </div>
            )}
          </div>

          <div className="text-center mt-10">
            <button
              onClick={onOpenDemo}
              className="text-xs text-[#5C5955] hover:text-[#1A1816] underline font-medium"
            >
              Procura um plano corporativo sob medida? Conversar com a gente ➔
            </button>
          </div>

        </div>
      </section>

      {/* ========================================================
          6. CONECTADA AO QUE VOCÊ JÁ USA (Logos de Integração)
         ======================================================== */}
      <section className="py-20 bg-white border-t border-[#EBE8E2]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <h2 className="text-3xl sm:text-4xl font-normal text-[#1A1816] tracking-tight leading-[1.12] mb-3">
            Integrações <span className="font-serif-title italic text-[#4F46E5]">sob consulta.</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#5C5955] max-w-xl mx-auto mb-10">
            Possibilidades de integração com agendas, CRMs e webhooks são avaliadas conforme o plano contratado.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 max-w-4xl mx-auto opacity-75">
            {['RD Station', 'HubSpot', 'Pipedrive', 'Salesforce', 'Google Calendar', 'Slack', 'Webhooks / API'].map((tool, idx) => (
              <div 
                key={idx}
                className="px-5 py-3 rounded-2xl bg-[#FAF9F5] border border-[#E7E4DC] text-xs font-bold text-stone-700 shadow-sm"
              >
                {tool}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================
          7. PERGUNTAS FREQUENTES (FAQ Específico de WhatsApp)
         ======================================================== */}
      <section className="py-24 bg-[#FAF9F5] border-t border-[#EBE8E2]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-14">
            <h2 className="text-4xl font-normal text-[#1A1816] tracking-tight">
              Perguntas frequentes
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = faqOpenIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-[#E7E4DC] overflow-hidden transition-all shadow-sm"
                >
                  <button
                    onClick={() => setFaqOpenIndex(isOpen ? -1 : idx)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between text-sm font-bold text-[#1A1816] hover:bg-[#FAF9F5] transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <span className="text-[#8C8881] text-xs">
                      {isOpen ? '▲' : '▼'}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-[#5C5955] leading-relaxed border-t border-stone-100 font-sans">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ========================================================
          8. BANNER CTA FINAL ESCURO
         ======================================================== */}
      <section className="py-20 bg-[#FAF9F5]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#141312] text-white rounded-[32px] p-8 sm:p-14 relative overflow-hidden shadow-2xl border border-stone-800 text-center">
            
            <div className="relative z-10 max-w-2xl mx-auto space-y-5">
              <h2 className="text-4xl sm:text-5xl font-normal tracking-tight text-white leading-tight">
                Organize seu atendimento no WhatsApp<br />
                <span className="font-serif-title italic text-[#A5B4FC]">com escopo transparente.</span>
              </h2>

              <p className="text-sm text-stone-300 leading-relaxed">
                Solicite uma demonstração para conhecer os fluxos, requisitos técnicos e condições comerciais vigentes para o canal WhatsApp.
              </p>

              <div className="pt-2">
                <button
                  onClick={onOpenAuth}
                  className="px-8 py-3.5 rounded-full bg-white text-[#141312] text-sm font-bold hover:bg-stone-100 transition-all shadow-xl hover:scale-105 cursor-pointer"
                >
                  Criar meu assistente agora
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
