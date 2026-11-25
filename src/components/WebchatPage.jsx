import React, { useState } from 'react';
import { 
  MessageSquare, Globe, Check, ArrowRight, Sparkles, Copy, 
  Code2, CheckCheck, Smartphone, Eye, Send, Bot, ShieldCheck, 
  Layers, ExternalLink, Zap
} from 'lucide-react';
import { BRAND } from '../data/content';
import { COMMERCIAL_CATALOG, INFO_STATUS } from '../data/commercialCatalog';
import {
  getPlanCardViewModel,
  getChannelAnnualAvailability,
  getChannelAnnualToggleBadge,
  getChannelUsageTerms,
  getChannelLimitReachedPolicy,
} from '../utils/commercialCatalogUtils';

export default function WebchatPage({
  onOpenDemo,
  onOpenAuth,
  onSelectPlan,
  onNavigateHome,
  catalog = COMMERCIAL_CATALOG,
}) {
  const [billingCycle, setBillingCycle] = useState('mensal'); // 'mensal' | 'anual'
  const [siteInput, setSiteInput] = useState('');
  const [activeStep, setActiveStep] = useState(0);
  const [copiedCode, setCopiedCode] = useState(false);
  const [customAssistantName, setCustomAssistantName] = useState('Luciana');
  const [chatMessages, setChatMessages] = useState([
    { sender: 'bot', text: 'Olá! Sou a Luciana, assistente virtual de Inteligência Artificial (IA) — exemplo ilustrativo. Como posso ajudar você hoje?' },
    { sender: 'user', text: 'Vocês atendem clínicas médicas?' },
    { sender: 'bot', text: 'Sim! Esta simulação ilustra fluxos configuráveis de agendamento e triagem conforme o plano. Quer solicitar demonstração com nossa equipe?' }
  ]);
  const [userChatInput, setUserChatInput] = useState('');

  const webchatAnnualAvailability = getChannelAnnualAvailability('webchat', catalog);
  const effectiveCycle = webchatAnnualAvailability.isConfirmedAvailable ? billingCycle : 'mensal';
  const webchatPlans = catalog.channels.webchat.plans.map((plan) =>
    getPlanCardViewModel('webchat', plan.id, effectiveCycle, catalog)
  );
  const webchatUsageTerms = getChannelUsageTerms('webchat', catalog);
  const webchatLimitPolicy = getChannelLimitReachedPolicy('webchat', catalog);
  const webchatAnnualDiscountBadge = webchatAnnualAvailability.isConfirmedAvailable
    ? getChannelAnnualToggleBadge('webchat', catalog)
    : null;

  const steps = [
    {
      number: '01',
      title: 'Defina as informações e instruções',
      desc: 'Informe páginas, produtos e serviços da empresa para orientar as respostas da assistente de IA.'
    },
    {
      number: '02',
      title: 'Personalize a identidade visual e identificação de IA',
      desc: 'Escolha cores, avatar, aviso claro de que se trata de uma assistente de IA e fluxo de encaminhamento para contato humano.'
    },
    {
      number: '03',
      title: 'Provisionamento e script de incorporação (sob consulta)',
      desc: 'Abaixo exibimos um exemplo ilustrativo do formato de tag <script> planejado. A ativação em sites externos depende de provisionamento técnico confirmado no plano.'
    }
  ];

  const handleCopyCode = () => {
    const code = `<script src="https://cdn.vocalis.ai/widget.js" data-assistant-id="voc_exemplo_ilustrativo" defer></script>`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(code);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  const handleSendLiveChatMessage = (e) => {
    e.preventDefault();
    if (!userChatInput.trim()) return;

    const newMsg = { sender: 'user', text: userChatInput };
    setChatMessages(prev => [...prev, newMsg]);
    setUserChatInput('');

    setTimeout(() => {
      setChatMessages(prev => [
        ...prev, 
        { 
          sender: 'bot', 
          text: 'Esta é uma resposta de simulação ilustrativa. Integrações e condições do plano são confirmadas com nossa equipe.' 
        }
      ]);
    }, 700);
  };

  const handleSiteSubmit = (e) => {
    e.preventDefault();
    onOpenAuth();
  };

  return (
    <div className="bg-[#FAF9F5] text-[#1A1816] font-sans">
      
      {/* ========================================================
          1. HERO SECTION (Exact replica of user's uploaded print)
         ======================================================== */}
      <section className="relative pt-12 pb-20 md:pt-16 md:pb-28 overflow-hidden">
        {/* Subtle Warm Gradient */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-[#F5F3FF]/90 via-[#FAF9F5]/40 to-transparent pointer-events-none -z-10" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E7E4DC] text-[#1A1816] text-xs font-semibold uppercase tracking-wider mb-8 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#4F46E5]"></span>
            <span>CANAL WEBCHAT · ASSISTENTE DE IA NO SITE</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-normal tracking-tight text-[#1A1816] max-w-4xl mx-auto leading-[1.08] mb-6">
            Quem visita o seu<br />
            site <span className="font-serif-title italic font-normal text-[#1A1816]">fala com a IA.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-[#5C5955] max-w-2xl mx-auto font-normal leading-relaxed mb-8">
            Assistente automatizada de Inteligência Artificial identificada ao visitante para responder dúvidas e coletar solicitações de contato. Implantação em site externo e eventual transbordo para sua equipe são avaliados conforme o plano.
          </p>

          {/* Large Chat Icon Illustration matching print */}
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-[#A5B4FC]/30 via-[#FFEFEA] to-[#FAF9F5] border border-[#FFD8CC] p-4 flex items-center justify-center shadow-lg relative">
              <div className="w-12 h-10 rounded-2xl bg-[#4F46E5] text-white flex items-center justify-center shadow-md">
                <MessageSquare className="w-6 h-6 fill-current" />
              </div>
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white"></span>
            </div>
          </div>

          {/* Site Input Form (Preview Trigger) */}
          <form onSubmit={handleSiteSubmit} className="max-w-md mx-auto mb-2">
            <div className="flex items-center bg-white rounded-full p-1.5 pl-4 border border-[#DCD8D0] shadow-md focus-within:border-[#4F46E5] focus-within:ring-2 focus-within:ring-[#4F46E5]/15 transition-all">
              <Globe className="w-4 h-4 text-stone-400 mr-2 shrink-0" />
              <input
                type="text"
                required
                value={siteInput}
                onChange={(e) => setSiteInput(e.target.value)}
                placeholder="Digite seu site (ex: seusite.com.br)"
                className="w-full bg-transparent text-sm text-[#1A1816] placeholder-[#9E9B95] focus:outline-none"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-full bg-[#4F46E5] text-white text-xs sm:text-sm font-semibold hover:bg-[#4338CA] transition-all whitespace-nowrap flex items-center gap-1.5 shadow-sm cursor-pointer shrink-0"
              >
                <span>Solicitar widget</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>

          <p className="text-[11px] text-[#736F69] max-w-xl mx-auto mb-8 leading-relaxed">
            Nota técnica: o widget integrado neste portal funciona como assistente de IA do catálogo comercial; a geração e hospedagem externa de script por uma linha para domínios de clientes estão em arquitetura ilustrativa / sob consulta (não há arquivo público `cdn.vocalis.ai/widget.js` ativo neste repositório).
          </p>

          {/* Checklist prudente */}
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 text-xs font-semibold text-[#5C5955]">
            <div className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-[#4F46E5]" strokeWidth={2.5} />
              <span>Condições sob consulta</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-[#4F46E5]" strokeWidth={2.5} />
              <span>Identificação clara de IA</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-[#4F46E5]" strokeWidth={2.5} />
              <span>Implantação externa sob consulta</span>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================
          2. DASHBOARD MODAL PREVIEW (Exact match to print)
         ======================================================== */}
      <section className="py-20 bg-white border-y border-[#EBE8E2]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <div className="relative rounded-3xl bg-stone-100/80 p-4 sm:p-8 border border-stone-200 shadow-xl overflow-hidden mb-8">
            
            {/* Modal Card */}
            <div className="max-w-xl mx-auto bg-white rounded-2xl border border-stone-200 shadow-2xl p-6 text-left relative">
              
              <div className="flex items-center justify-between pb-4 border-b border-stone-100">
                <h3 className="text-base font-bold text-[#1A1816]">Criar assistente</h3>
                <span className="text-stone-400 text-xs select-none" aria-hidden="true">✕</span>
              </div>

              <div className="py-4 space-y-4">
                <div>
                  <label className="text-xs font-bold text-stone-600 block mb-2">Tipo de assistente</label>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 relative">
                    
                    {/* Option 1: Telefone */}
                    <div className="p-3.5 rounded-xl border border-stone-200 bg-stone-50/50 opacity-60">
                      <div className="flex items-center gap-2 mb-1">
                        <MessageSquare className="w-4 h-4 text-stone-500" />
                        <span className="text-xs font-bold text-stone-700">Assistente de voz</span>
                      </div>
                      <p className="text-[11px] text-stone-500 leading-tight">
                        Atende ligações no telefone para chamadas.
                      </p>
                    </div>

                    {/* Option 2: Assistente de chat (Selected) */}
                    <div className="p-3.5 rounded-xl border-2 border-[#4F46E5] bg-[#EEF2FF] relative shadow-sm">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <Bot className="w-4 h-4 text-[#4F46E5]" />
                          <span className="text-xs font-bold text-[#1A1816]">Assistente de chat</span>
                        </div>
                        <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-[#4F46E5] text-white font-bold">
                          Ativo
                        </span>
                      </div>
                      <p className="text-[11px] text-stone-600 leading-tight">
                        Assistente baseado em chat para seu site.
                      </p>
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
                    placeholder="Ex: Luciana"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-end gap-2 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setCustomAssistantName('')}
                  className="px-4 py-2 rounded-xl text-stone-500 hover:bg-stone-50"
                >
                  Limpar
                </button>
                <button 
                  type="button"
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
            className="px-8 py-3.5 rounded-full bg-[#11100F] text-white text-sm font-semibold hover:bg-black transition-all shadow-md hover:shadow-lg inline-flex items-center gap-2 cursor-pointer"
          >
            <span>Criar widget configurável</span>
            <ArrowRight className="w-4 h-4 text-white/80" />
          </button>

        </div>
      </section>

      {/* ========================================================
          3. UM CHAT QUE RESOLVE (3 Cards interativos de chat)
         ======================================================== */}
      <section className="py-24 bg-[#FAF9F5]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-[#4F46E5] mb-2">
              EXEMPLOS ILUSTRATIVOS DE FLUXO NO CHAT (ASSISTENTE DE IA)
            </span>
            <h2 className="text-4xl sm:text-5xl font-normal text-[#1A1816] tracking-tight leading-[1.12]">
              Um chat que <span className="font-serif-title italic text-[#4F46E5]">apoia o visitante.</span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#5C5955]">
              Simulações ilustrativas de como uma assistente de IA identificada responde perguntas e coleta informações antes de encaminhar à equipe:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card 1 */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E7E4DC] shadow-clean flex flex-col justify-between">
              <div>
                <div className="bg-[#FAF9F5] rounded-2xl p-4 border border-[#EBE8E2] mb-6 space-y-2 text-xs font-sans">
                  <div className="bg-white p-2.5 rounded-xl border border-stone-200 text-stone-800">
                    Qual o horário de funcionamento e como funciona o agendamento?
                  </div>
                  <div className="bg-[#EEF2FF] p-2.5 rounded-xl border border-[#E0E7FF] text-stone-900">
                    <span className="text-[10px] font-bold text-[#4338CA] block mb-1">Assistente de IA (Simulação)</span>
                    Atendemos de segunda a sexta. Posso encaminhar sua solicitação de horário para nossa equipe confirmar.
                  </div>
                </div>

                <h3 className="text-xl font-bold text-[#1A1816] mb-2">Responde dúvidas configuradas</h3>
                <p className="text-xs sm:text-sm text-[#5C5955] leading-relaxed">
                  Orienta visitantes sobre regras, serviços e funcionamento cadastrados no painel, identificando-se como IA.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E7E4DC] shadow-clean flex flex-col justify-between">
              <div>
                <div className="bg-[#FAF9F5] rounded-2xl p-4 border border-[#EBE8E2] mb-6 space-y-2 text-xs font-sans">
                  <div className="bg-white p-2.5 rounded-xl border border-stone-200 text-stone-800">
                    Gostaria de um orçamento para pintura do meu apartamento.
                  </div>
                  <div className="bg-[#EEF2FF] p-2.5 rounded-xl border border-[#E0E7FF] text-stone-900 space-y-1.5">
                    <span className="font-bold text-[11px] text-[#4F46E5]">📝 Exemplo Ilustrativo de Coleta</span>
                    <div className="bg-white p-2 rounded border border-stone-200 text-[10px] space-y-1">
                      <p>• Metragem: 70m²</p>
                      <p>• Bairro: Vila Mariana</p>
                    </div>
                    <span className="text-[10px] text-[#5C5955] font-medium block">Encaminhamento depende de integração habilitada</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-[#1A1816] mb-2">Coleta dados e solicitações</h3>
                <p className="text-xs sm:text-sm text-[#5C5955] leading-relaxed">
                  Coleta informações básicas e permite encaminhamento para sua equipe ou webhook quando configurado no plano (sem integração automática entre canais por padrão).
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E7E4DC] shadow-clean flex flex-col justify-between">
              <div>
                <div className="bg-[#FAF9F5] rounded-2xl p-4 border border-[#EBE8E2] mb-6 space-y-2 text-xs font-sans">
                  <div className="bg-white p-2.5 rounded-xl border border-stone-200 text-stone-800">
                    Vocês possuem catálogo ou links com os serviços disponíveis?
                  </div>
                  <div className="bg-[#EEF2FF] p-2.5 rounded-xl border border-[#E0E7FF] text-stone-900 space-y-2">
                    <span className="text-[10px] font-bold text-[#4338CA] block">Assistente de IA (Simulação)</span>
                    <div className="flex items-center gap-2 bg-white p-2 rounded-xl border border-stone-200">
                      <div className="w-8 h-8 rounded-lg bg-stone-200 flex items-center justify-center text-stone-600 font-bold text-[10px]">
                        PDF
                      </div>
                      <div className="text-[10px]">
                        <p className="font-bold">Exemplo_Catalogo.pdf</p>
                        <p className="text-stone-400">Envio sujeito ao plano</p>
                      </div>
                    </div>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-[#1A1816] mb-2">Links e anexos conforme plano</h3>
                <p className="text-xs sm:text-sm text-[#5C5955] leading-relaxed">
                  Compartilhamento de materiais ou arquivos depende dos recursos confirmados na tabela do plano escolhido.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================
          4. DO SITE AO CHAT EM TRÊS PASSOS
         ======================================================== */}
      <section className="py-24 bg-white border-y border-[#EBE8E2]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Steps Accordion */}
            <div className="lg:col-span-5 space-y-6">
              <h2 className="text-4xl sm:text-5xl font-normal text-[#1A1816] tracking-tight leading-[1.12]">
                Do site ao chat <span className="font-serif-title italic text-[#4F46E5]">em três passos.</span>
              </h2>

              <div className="space-y-4 pt-4">
                {steps.map((st, i) => (
                  <button
                    key={i}
                    type="button"
                    aria-pressed={activeStep === i}
                    onClick={() => setActiveStep(i)}
                    className={`w-full text-left p-5 rounded-2xl border transition-all cursor-pointer ${
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
                  </button>
                ))}
              </div>
            </div>

            {/* Right Embed Code Snippet Mockup */}
            <div className="lg:col-span-7">
              <div className="bg-[#141312] rounded-3xl p-6 sm:p-8 text-white border border-stone-800 shadow-2xl space-y-6">
                
                <div className="flex items-center justify-between pb-4 border-b border-stone-800 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#4F46E5]"></span>
                    <span className="font-semibold text-stone-200">Exemplo Ilustrativo de Script (Sob Consulta)</span>
                  </div>
                  <button 
                    onClick={handleCopyCode}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-[11px] font-semibold text-stone-300 transition-colors cursor-pointer"
                  >
                    {copiedCode ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedCode ? 'Copiado!' : 'Copiar exemplo'}</span>
                  </button>
                </div>

                <div className="bg-black/60 rounded-2xl p-4 font-mono text-xs text-stone-300 overflow-x-auto border border-stone-800 leading-relaxed">
                  <span className="text-stone-500">&lt;!-- Exemplo ilustrativo de incorporação (requer provisionamento no plano) --&gt;</span>
                  <br />
                  <span className="text-purple-400">&lt;script</span>
                  <br />
                  &nbsp;&nbsp;<span className="text-amber-300">src</span>=<span className="text-emerald-400">"https://cdn.vocalis.ai/widget.js"</span>
                  <br />
                  &nbsp;&nbsp;<span className="text-amber-300">data-assistant-id</span>=<span className="text-emerald-400">"voc_exemplo_ilustrativo"</span>
                  <br />
                  &nbsp;&nbsp;<span className="text-amber-300">defer</span>
                  <br />
                  <span className="text-purple-400">&gt;&lt;/script&gt;</span>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs text-stone-400">
                  <div className="flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-amber-400" />
                    <span>CDN externo não publicado no código aberto — provisionamento sob consulta</span>
                  </div>
                </div>

                <button
                  onClick={onOpenAuth}
                  className="w-full py-3.5 rounded-xl bg-[#11100F] border border-stone-700 hover:bg-stone-900 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Configurar widget</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================
          5. PLANOS DE WEBCHAT (Fonte única comercial)
         ======================================================== */}
      <section className="py-24 bg-[#FAF9F5]" id="precos-webchat">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-4xl sm:text-5xl font-normal text-[#1A1816] tracking-tight leading-[1.12]">
              Planos para cada <span className="font-serif-title italic text-[#4F46E5]">ritmo de conversa.</span>
            </h2>
            <p className="mt-3 text-sm text-[#5C5955]">
              Condições comerciais e limites de Webchat espelham exatamente a fonte única da Vocalis AI.
            </p>

            {/* Monthly / Annual Toggle */}
            <div className="flex items-center justify-center gap-3 mt-6">
              {webchatAnnualAvailability.isConfirmedAvailable ? (
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
                    {webchatAnnualDiscountBadge && (
                      <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-[#4F46E5]/15 text-[#4F46E5]">
                        {webchatAnnualDiscountBadge}
                      </span>
                    )}
                  </button>
                </div>
              ) : (
                <div className="inline-flex items-center gap-2 bg-white border border-[#E7E4DC] px-4 py-2 rounded-full text-xs text-[#5C5955]">
                  <strong className="text-[#1A1816]">Mensal</strong>
                  <span>·</span>
                  <span>{webchatAnnualAvailability.label}</span>
                </div>
              )}
            </div>

            <div className="mt-4 inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#1A1816] text-white text-[11px] font-bold tracking-wide">
              <span className="text-amber-400 uppercase">CATÁLOGO OFICIAL</span>
              <span>•</span>
              <span className="text-[#A5B4FC]">ITENS PENDENTES SINALIZADOS ATÉ CONFIRMAÇÃO</span>
            </div>
          </div>

          {/* Webchat Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
            {webchatPlans.map((card) => {
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
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <h3 className="text-xl font-bold text-[#1A1816]">{card.name}</h3>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          pricing.status === INFO_STATUS.CONFIRMADA && pricing.isPlanFullyConfirmed
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-amber-50 text-amber-800'
                        }`}
                      >
                        {pricing.readinessLabel}
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
                          <span className="text-xs text-[#8C8881]">
                            {effectiveCycle === 'anual' ? '/mês (equiv. anual)' : '/mês'}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-[#5C5955] font-medium mt-1">
                        {pricing.afterPromoLabel}
                      </p>
                      {effectiveCycle === 'anual' && pricing.totalAnnualLabel && (
                        <p className="text-[11px] text-[#4F46E5] font-semibold mt-1">
                          Total anual antecipado (12 meses): {pricing.totalAnnualLabel}
                        </p>
                      )}
                      <p className="text-[10px] text-[#736F69] mt-1">{pricing.renewalLabel}</p>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        if (card.cta.action === 'checkout' && card.cta.url) {
                          window.open(card.cta.url, '_blank', 'noopener,noreferrer');
                          return;
                        }
                        const selection = {
                          channelId: card.channelId,
                          channelName: card.channelName,
                          planId: card.id,
                          planName: card.name,
                          billingCycle: effectiveCycle,
                          displayPrice: pricing.displayPrice,
                          totalAnnualLabel: pricing.totalAnnualLabel,
                          afterPromoLabel: pricing.afterPromoLabel,
                          billingPeriodicityLabel: pricing.billingPeriodicityLabel,
                        };
                        if (onSelectPlan) {
                          onSelectPlan(selection);
                        } else if (onOpenAuth) {
                          onOpenAuth();
                        } else if (onOpenDemo) {
                          onOpenDemo();
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
            {webchatUsageTerms.map((term) => (
              <div key={term.key} className="p-4 rounded-2xl bg-white border border-[#E7E4DC]">
                <strong className="text-[#1A1816] block mb-1">{term.term} (Webchat)</strong>
                <span className="text-[#5C5955]">{term.text}</span>
              </div>
            ))}
            <div
              data-testid="webchat-limit-reached-policy"
              className="sm:col-span-2 p-4 rounded-2xl bg-white border border-[#E7E4DC]"
            >
              <strong className="text-[#1A1816] block mb-1">
                Quando o limite acaba {!webchatLimitPolicy.isConfirmed ? '(Pendente de decisão)' : ''}
              </strong>
              <span className="text-[#5C5955]">{webchatLimitPolicy.text}</span>
            </div>
          </div>

          <div className="text-center mt-10">
            <button
              type="button"
              onClick={onOpenDemo}
              className="text-xs text-[#5C5955] hover:text-[#1A1816] underline font-medium cursor-pointer"
            >
              Procura um plano corporativo sob medida? Conversar com a gente ➔
            </button>
          </div>

        </div>
      </section>

      {/* ========================================================
          6. CONECTADA AO QUE VOCÊ JÁ USA
         ======================================================== */}
      <section className="py-20 bg-white border-t border-[#EBE8E2]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <h2 className="text-3xl sm:text-4xl font-normal text-[#1A1816] tracking-tight leading-[1.12] mb-3">
            Integrações <span className="font-serif-title italic text-[#4F46E5]">sob consulta.</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#5C5955] max-w-xl mx-auto mb-10">
            Possibilidades de integração com agendas, e-mails, plataformas e CRMs são avaliadas conforme o plano contratado.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 max-w-4xl mx-auto opacity-75">
            {['RD Station', 'Google Sheets', 'MailerLite', 'ActiveCampaign', 'HubSpot', 'Notion', 'Shopify', 'Slack', 'Webflow'].map((tool, idx) => (
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
          7. BANNER CTA FINAL ESCURO
         ======================================================== */}
      <section className="py-20 bg-[#FAF9F5]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#141312] text-white rounded-[32px] p-8 sm:p-14 relative overflow-hidden shadow-2xl border border-stone-800 text-center">
            
            <div className="relative z-10 max-w-2xl mx-auto space-y-5">
              <h2 className="text-4xl sm:text-5xl font-normal tracking-tight text-white leading-tight">
                Visita boa <span className="font-serif-title italic text-[#A5B4FC]">vira conversa.</span>
              </h2>

              <p className="text-sm text-stone-300 leading-relaxed max-w-xl mx-auto">
                Configure fluxos de atendimento automatizado por IA no seu site conforme os recursos, regras de encaminhamento e limites confirmados no seu plano.
              </p>

              <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={onOpenAuth}
                  className="px-8 py-3.5 rounded-full bg-white text-[#141312] text-sm font-bold hover:bg-stone-100 transition-all shadow-xl hover:scale-105 cursor-pointer"
                >
                  Criar widget de conversa
                </button>
                <button
                  onClick={onOpenDemo}
                  className="px-8 py-3.5 rounded-full bg-transparent border border-stone-700 hover:border-stone-500 text-white text-sm font-medium transition-colors cursor-pointer"
                >
                  Agendar uma conversa
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
