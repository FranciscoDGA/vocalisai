import React, { useState } from 'react';
import { 
  MessageSquare, Globe, Check, ArrowRight, Sparkles, Copy, 
  Code2, CheckCheck, Smartphone, Eye, Send, Bot, ShieldCheck, 
  Layers, ExternalLink, Zap
} from 'lucide-react';
import { BRAND } from '../data/content';
import { PRICING_CHANNELS } from '../data/pricingData';

export default function WebchatPage({ onOpenDemo, onOpenAuth, onNavigateHome }) {
  const [billingCycle, setBillingCycle] = useState('mensal'); // 'mensal' | 'anual'
  const [siteInput, setSiteInput] = useState('');
  const [activeStep, setActiveStep] = useState(0);
  const [copiedCode, setCopiedCode] = useState(false);
  const [customAssistantName, setCustomAssistantName] = useState('Luciana');
  const [chatMessages, setChatMessages] = useState([
    { sender: 'bot', text: 'Olá! Sou a Luciana da Vocalis. Como posso ajudar você hoje?' },
    { sender: 'user', text: 'Vocês atendem clínicas médicas?' },
    { sender: 'bot', text: 'Sim! Temos fluxos pré-prontos para agendamento de consultas, confirmação de exames e esclarecimento de convênios. Quer ver um teste rápido?' }
  ]);
  const [userChatInput, setUserChatInput] = useState('');

  const webchatPlans = PRICING_CHANNELS.webchat.plans;

  const steps = [
    {
      number: '01',
      title: 'Insira o seu site',
      desc: 'Nossa inteligência artificial navega pelas páginas do seu site, lê as informações, produtos e serviços em segundos.'
    },
    {
      number: '02',
      title: 'Personalize o widget',
      desc: 'Escolha a cor da sua marca, a foto do avatar, a mensagem inicial de boas-vindas e a posição do botão na tela.'
    },
    {
      number: '03',
      title: 'Cole no seu site',
      desc: 'Copie 1 única linha de script e cole antes do fechamento da tag </body> do seu WordPress, Wix, Shopify ou site personalizado.'
    }
  ];

  const handleCopyCode = () => {
    const code = `<script src="https://cdn.vocalis.ai/widget.js" data-assistant-id="voc_89f42a" defer></script>`;
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
          text: 'Com certeza! A Vocalis integra diretamente com sua agenda e CRM, respondendo em menos de 2 segundos. Deseja testar na sua empresa?' 
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
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-[#FAF4EC]/90 via-[#FAF9F5]/40 to-transparent pointer-events-none -z-10" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E7E4DC] text-[#1A1816] text-xs font-semibold uppercase tracking-wider mb-8 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#C84B1F] animate-pulse"></span>
            <span>NOVO: WIDGET DE CHAT PARA SEU SITE</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-normal tracking-tight text-[#1A1816] max-w-4xl mx-auto leading-[1.08] mb-6">
            Quem visita o seu<br />
            site <span className="font-serif-title italic font-normal text-[#1A1816]">encontra alguém.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-[#5C5955] max-w-2xl mx-auto font-normal leading-relaxed mb-8">
            Um chat que conhece o seu negócio, responde na hora e transforma dúvida em pedido.
          </p>

          {/* Large Chat Icon Illustration matching print */}
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-[#FF9E7D]/30 via-[#FFEFEA] to-[#FAF9F5] border border-[#FFD8CC] p-4 flex items-center justify-center shadow-lg relative">
              <div className="w-12 h-10 rounded-2xl bg-[#C84B1F] text-white flex items-center justify-center shadow-md">
                <MessageSquare className="w-6 h-6 fill-current" />
              </div>
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white"></span>
            </div>
          </div>

          {/* Site Input Form (Widget Generator) */}
          <form onSubmit={handleSiteSubmit} className="max-w-md mx-auto mb-3">
            <div className="flex items-center bg-white rounded-full p-1.5 pl-4 border border-[#DCD8D0] shadow-md focus-within:border-[#C84B1F] focus-within:ring-2 focus-within:ring-[#C84B1F]/15 transition-all">
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
                className="px-6 py-3 rounded-full bg-[#C84B1F] text-white text-xs sm:text-sm font-semibold hover:bg-[#B34018] transition-all whitespace-nowrap flex items-center gap-1.5 shadow-sm cursor-pointer shrink-0"
              >
                <span>Gerar widget</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>

          {/* Secondary reassurance */}
          <div className="flex items-center justify-center gap-4 text-xs text-[#736F69] font-medium mb-12">
            <span>✓ 1 linha de código JS</span>
            <span>•</span>
            <span>✓ Sem cadastro prévio</span>
          </div>

          {/* Social Proof Checklist */}
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 text-xs font-semibold text-[#5C5955]">
            <div className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-[#C84B1F]" strokeWidth={2.5} />
              <span>Garantia de 30 dias</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-[#C84B1F]" strokeWidth={2.5} />
              <span>Português do Brasil</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-[#C84B1F]" strokeWidth={2.5} />
              <span>No ar em 2 minutos</span>
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
                <span className="text-stone-400 text-xs cursor-pointer">✕</span>
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
                    <div className="p-3.5 rounded-xl border-2 border-[#C84B1F] bg-[#FAF5EE] relative shadow-sm">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <Bot className="w-4 h-4 text-[#C84B1F]" />
                          <span className="text-xs font-bold text-[#1A1816]">Assistente de chat</span>
                        </div>
                        <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-[#C84B1F] text-white font-bold">
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
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-sm focus:outline-none focus:border-[#C84B1F]"
                    placeholder="Ex: Luciana"
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
            className="px-8 py-3.5 rounded-full bg-[#11100F] text-white text-sm font-semibold hover:bg-black transition-all shadow-md hover:shadow-lg inline-flex items-center gap-2 cursor-pointer"
          >
            <span>Criar o seu em minutos</span>
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
            <h2 className="text-4xl sm:text-5xl font-normal text-[#1A1816] tracking-tight leading-[1.12]">
              Um chat que <span className="font-serif-title italic text-[#C84B1F]">resolve.</span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#5C5955]">
              O atendimento de uma pessoa com a máxima agilidade de IA:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card 1: Responde o que todo mundo pergunta */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E7E4DC] shadow-clean flex flex-col justify-between">
              <div>
                <div className="bg-[#FAF9F5] rounded-2xl p-4 border border-[#EBE8E2] mb-6 space-y-2 text-xs font-sans">
                  <div className="bg-white p-2.5 rounded-xl border border-stone-200 text-stone-800">
                    Qual o valor da consulta inicial com o dermatologista?
                  </div>
                  <div className="bg-[#FAF5EE] p-2.5 rounded-xl border border-[#EDE5D8] text-stone-900">
                    A consulta inicial é R$ 250 e já inclui o retorno dentro de 30 dias.
                    <button className="mt-2 w-full py-1.5 rounded-lg bg-[#C84B1F] text-white font-bold text-[11px] block">
                      Agendar consulta
                    </button>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-[#1A1816] mb-2">Responde o que todo mundo pergunta</h3>
                <p className="text-xs sm:text-sm text-[#5C5955] leading-relaxed">
                  Tira as dúvidas gerais e específicas sobre seu endereço, horário, preços e regras do seu negócio sem deixar ninguém esperando.
                </p>
              </div>
            </div>

            {/* Card 2: Recolhe pedidos */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E7E4DC] shadow-clean flex flex-col justify-between">
              <div>
                <div className="bg-[#FAF9F5] rounded-2xl p-4 border border-[#EBE8E2] mb-6 space-y-2 text-xs font-sans">
                  <div className="bg-white p-2.5 rounded-xl border border-stone-200 text-stone-800">
                    Gostaria de um orçamento para pintura do meu apartamento.
                  </div>
                  <div className="bg-[#FAF5EE] p-2.5 rounded-xl border border-[#EDE5D8] text-stone-900 space-y-1.5">
                    <span className="font-bold text-[11px] text-[#C84B1F]">📝 Formulário Rápido de Orçamento</span>
                    <div className="bg-white p-2 rounded border border-stone-200 text-[10px] space-y-1">
                      <p>• Metragem: 70m²</p>
                      <p>• Bairro: Vila Mariana</p>
                    </div>
                    <span className="text-[10px] text-emerald-600 font-bold block">✓ Enviado para o WhatsApp da equipe</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-[#1A1816] mb-2">Recolhe pedidos</h3>
                <p className="text-xs sm:text-sm text-[#5C5955] leading-relaxed">
                  Pega as informações certas e manda para o seu e-mail, WhatsApp ou CRM pronto para a equipe fechar negócio.
                </p>
              </div>
            </div>

            {/* Card 3: Apresenta seu portfólio */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E7E4DC] shadow-clean flex flex-col justify-between">
              <div>
                <div className="bg-[#FAF9F5] rounded-2xl p-4 border border-[#EBE8E2] mb-6 space-y-2 text-xs font-sans">
                  <div className="bg-white p-2.5 rounded-xl border border-stone-200 text-stone-800">
                    Vocês têm fotos dos vestidos de noiva da nova coleção?
                  </div>
                  <div className="bg-[#FAF5EE] p-2.5 rounded-xl border border-[#EDE5D8] text-stone-900 space-y-2">
                    <div className="flex items-center gap-2 bg-white p-2 rounded-xl border border-stone-200">
                      <div className="w-8 h-8 rounded-lg bg-stone-200 flex items-center justify-center text-stone-600 font-bold text-[10px]">
                        PDF
                      </div>
                      <div className="text-[10px]">
                        <p className="font-bold">Catalogo_Noivas_2026.pdf</p>
                        <p className="text-stone-400">4.2 MB · Baixar arquivo</p>
                      </div>
                    </div>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-[#1A1816] mb-2">Apresenta seu portfólio</h3>
                <p className="text-xs sm:text-sm text-[#5C5955] leading-relaxed">
                  Mostra fotos dos produtos, links do cardápio, links de agendamento e PDFs de serviços na hora exata em que o visitante pedir.
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
                Do site ao chat <span className="font-serif-title italic text-[#C84B1F]">em três passos.</span>
              </h2>

              <div className="space-y-4 pt-4">
                {steps.map((st, i) => (
                  <div 
                    key={i}
                    onClick={() => setActiveStep(i)}
                    className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                      activeStep === i 
                        ? 'bg-[#FAF5EE] border-[#C84B1F]/30 shadow-sm' 
                        : 'bg-white border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-xs font-bold text-[#C84B1F]">{st.number}</span>
                      <span className="text-xs font-semibold text-stone-400">Passo {i + 1} de 3</span>
                    </div>
                    <h4 className="text-base font-bold text-[#1A1816] mb-1">{st.title}</h4>
                    <p className="text-xs sm:text-sm text-[#5C5955] leading-relaxed">{st.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Embed Code Snippet Mockup */}
            <div className="lg:col-span-7">
              <div className="bg-[#141312] rounded-3xl p-6 sm:p-8 text-white border border-stone-800 shadow-2xl space-y-6">
                
                <div className="flex items-center justify-between pb-4 border-b border-stone-800 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#C84B1F]"></span>
                    <span className="font-semibold text-stone-200">Código de Instalação (1 Linha)</span>
                  </div>
                  <button 
                    onClick={handleCopyCode}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-[11px] font-semibold text-stone-300 transition-colors cursor-pointer"
                  >
                    {copiedCode ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedCode ? 'Copiado!' : 'Copiar'}</span>
                  </button>
                </div>

                <div className="bg-black/60 rounded-2xl p-4 font-mono text-xs text-stone-300 overflow-x-auto border border-stone-800 leading-relaxed">
                  <span className="text-stone-500">&lt;!-- Cole antes do fechamento de &lt;/body&gt; --&gt;</span>
                  <br />
                  <span className="text-purple-400">&lt;script</span>
                  <br />
                  &nbsp;&nbsp;<span className="text-amber-300">src</span>=<span className="text-emerald-400">"https://cdn.vocalis.ai/widget.js"</span>
                  <br />
                  &nbsp;&nbsp;<span className="text-amber-300">data-assistant-id</span>=<span className="text-emerald-400">"voc_89f42a"</span>
                  <br />
                  &nbsp;&nbsp;<span className="text-amber-300">defer</span>
                  <br />
                  <span className="text-purple-400">&gt;&lt;/script&gt;</span>
                </div>

                <div className="flex items-center gap-4 text-xs text-stone-400">
                  <div className="flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Compatível com WordPress</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Wix & Shopify</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>HTML puro</span>
                  </div>
                </div>

                <button
                  onClick={onOpenAuth}
                  className="w-full py-3.5 rounded-xl bg-[#11100F] border border-stone-700 hover:bg-stone-900 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Criar o seu em minutos</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================
          5. PLANOS DE WEBCHAT (Exact replica with correct pricing)
         ======================================================== */}
      <section className="py-24 bg-[#FAF9F5]" id="precos-webchat">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-4xl sm:text-5xl font-normal text-[#1A1816] tracking-tight leading-[1.12]">
              Planos para cada <span className="font-serif-title italic text-[#C84B1F]">ritmo de conversa.</span>
            </h2>
            <p className="mt-3 text-sm text-[#5C5955]">
              🔴 98% dos planos atendem com sobra seu tráfego mensal, sem surpresas no fim do mês.
            </p>

            {/* Monthly / Annual Toggle */}
            <div className="flex items-center justify-center gap-3 mt-6">
              <div className="inline-flex items-center bg-white border border-[#E7E4DC] p-1 rounded-full shadow-sm">
                <button
                  onClick={() => setBillingCycle('mensal')}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    billingCycle === 'mensal'
                      ? 'bg-[#1A1816] text-white shadow-sm'
                      : 'text-[#5C5955] hover:text-[#1A1816]'
                  }`}
                >
                  Mensal
                </button>
                <button
                  onClick={() => setBillingCycle('anual')}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
                    billingCycle === 'anual'
                      ? 'bg-[#1A1816] text-white shadow-sm'
                      : 'text-[#5C5955] hover:text-[#1A1816]'
                  }`}
                >
                  <span>Anual</span>
                  <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-[#C84B1F]/15 text-[#C84B1F]">
                    -20%
                  </span>
                </button>
              </div>
            </div>

            {/* Promo Banner Countdown */}
            <div className="mt-4 inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#1A1816] text-white text-[11px] font-bold tracking-wide">
              <span className="text-amber-400 uppercase">PROMOÇÃO DE LANÇAMENTO</span>
              <span>•</span>
              <span className="text-[#FF9E7D]">30% OFF NOS 3 PRIMEIROS MESES</span>
            </div>
          </div>

          {/* Webchat Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
            {webchatPlans.map((plan) => {
              const isFeatured = plan.id === 'team';
              const priceDisplay = billingCycle === 'anual' ? plan.pricePromoYearly : plan.pricePromoMonthly;
              const regularPrice = billingCycle === 'anual' ? plan.priceRegularYearly : plan.priceRegularMonthly;

              return (
                <div
                  key={plan.id}
                  className={`rounded-3xl p-7 flex flex-col justify-between transition-all relative ${
                    isFeatured
                      ? 'bg-white border-2 border-[#C84B1F] shadow-2xl scale-[1.02] z-10'
                      : 'bg-white border border-[#E7E4DC] shadow-clean hover:shadow-card-hover'
                  }`}
                >
                  {isFeatured && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#C84B1F] text-white text-[11px] font-bold uppercase tracking-wider shadow-md">
                      MAIS ESCOLHIDO
                    </div>
                  )}

                  <div>
                    <h3 className="text-xl font-bold text-[#1A1816]">{plan.name}</h3>
                    <p className="text-xs text-[#5C5955] mt-1">{plan.tagline}</p>

                    <div className="mt-5 mb-6">
                      <div className="flex items-baseline gap-1">
                        <span className="text-xs text-[#8C8881] font-mono">R$</span>
                        <span className="text-4xl font-extrabold text-[#1A1816] tracking-tight">
                          {priceDisplay}
                        </span>
                        <span className="text-xs text-[#8C8881]">/mês</span>
                      </div>
                      <p className="text-[11px] text-[#C84B1F] font-semibold mt-1">
                        {plan.afterPromoText || `depois R$ ${regularPrice}/mês`}
                      </p>
                    </div>

                    <button
                      onClick={onOpenAuth}
                      className={`w-full py-3 rounded-full text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer ${
                        isFeatured
                          ? 'bg-[#C84B1F] text-white hover:bg-[#B34018]'
                          : 'bg-[#1A1816] text-white hover:bg-black'
                      }`}
                    >
                      <span>{plan.cta || `Começar com ${plan.name}`}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <div className="mt-6 pt-6 border-t border-[#EBE8E2] space-y-2 text-xs">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C8881] block mb-2">
                        INCLUÍDO
                      </span>
                      {plan.included.map((feat, i) => (
                        <div key={i} className="flex items-center gap-2 text-[#5C5955]">
                          <Check className="w-4 h-4 text-[#C84B1F] shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                      {plan.features.map((feat, i) => (
                        <div key={`extra-${i}`} className="flex items-center gap-2 text-[#5C5955] font-medium">
                          <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
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
          6. CONECTADA AO QUE VOCÊ JÁ USA
         ======================================================== */}
      <section className="py-20 bg-white border-t border-[#EBE8E2]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <h2 className="text-3xl sm:text-4xl font-normal text-[#1A1816] tracking-tight leading-[1.12] mb-3">
            Conectada ao <span className="font-serif-title italic text-[#C84B1F]">que você já usa.</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#5C5955] max-w-xl mx-auto mb-10">
            Agenda, e-mail, loja de e-commerce e CRM sincronizados instantaneamente a cada conversa.
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
                Visita boa <span className="font-serif-title italic text-[#FF9E7D]">vira conversa.</span>
              </h2>

              <p className="text-sm text-stone-300 leading-relaxed max-w-xl mx-auto">
                Deixe a Vocalis responder dúvidas e fechar vendas no seu site, dia e noite — a qualquer hora.
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
