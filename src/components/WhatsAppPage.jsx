import React, { useState } from 'react';
import { 
  MessageSquare, MessageCircle, Check, ArrowRight, Play, Pause, 
  Smartphone, ShieldCheck, Zap, Sparkles, ChevronDown, ChevronUp,
  Clock, Database, Users, HelpCircle, Bot, Send, CheckCheck, Phone
} from 'lucide-react';
import { BRAND } from '../data/content';
import { PRICING_CHANNELS } from '../data/pricingData';
import { speakFemalePt } from '../utils/voiceUtils';

export default function WhatsAppPage({ onOpenDemo, onOpenAuth, onNavigateHome }) {
  const [billingCycle, setBillingCycle] = useState('mensal'); // 'mensal' | 'anual'
  const [faqOpenIndex, setFaqOpenIndex] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [customAssistantName, setCustomAssistantName] = useState('Sara');

  const waPlans = PRICING_CHANNELS.whatsapp.plans;

  const faqs = [
    {
      q: 'Preciso de WhatsApp Business, API antiga ou Cloud?',
      a: 'A Vocalis conecta diretamente na API Oficial da Meta (Cloud API) ou via QR Code do WhatsApp Business em menos de 3 minutos. Não é necessário nenhum servidor complexo ou contratações adicionais de intermediários.'
    },
    {
      q: 'Posso usar meu número atual?',
      a: 'Sim! Você pode utilizar o número de telefone que sua empresa já divulga para os clientes, ou se preferir, pode cadastrar um número virtual novo exclusivo para atendimento inteligente.'
    },
    {
      q: 'Como funciona o envio e recebimento de áudios no WhatsApp?',
      a: 'Se o cliente mandar um áudio de 2 minutos pelo WhatsApp, a Vocalis transcreve instantaneamente, compreende o pedido e responde por texto ou por áudio de voz humana com entonação brasileira natural.'
    },
    {
      q: 'Existe risco de o número ser banido?',
      a: 'Zero risco. Operamos em estrita conformidade com as diretrizes da Meta e como parceiros oficiais. Não fazemos disparos em massa de spam não solicitado — a IA atende ativamente quando o cliente entra em contato.'
    },
    {
      q: 'E quando o cliente pede para falar com um humano?',
      a: 'A Vocalis identifica a intenção de transbordo e transfere a conversa imediatamente para a caixa de entrada da sua equipe humana no mesmo número, com o resumo completo de tudo que já foi conversado.'
    },
    {
      q: 'Vocalis conversa em grupos de WhatsApp?',
      a: 'A Vocalis foi desenhada prioritariamente para conversas privadas 1-a-1 de vendas, agendamentos e suporte. Ela pode ser adicionada a grupos internos para alertas e resumos de fechamentos.'
    },
    {
      q: 'Em quanto tempo meu assistente fica pronto?',
      a: 'Em cerca de 5 a 10 minutos. Basta escanear o QR Code ou vincular sua conta da Meta, subir o link do seu site ou arquivo de perguntas frequentes e ativar o atendimento.'
    }
  ];

  const steps = [
    {
      number: '01',
      title: 'Conecte o WhatsApp Business',
      desc: 'Basta escanear um QR Code ou autorizar com um clique na Meta Cloud API. Em 3 minutos seu número já está conectado aos servidores da Vocalis.'
    },
    {
      number: '02',
      title: 'Ensine o seu negócio',
      desc: 'Envie o link do seu site, PDFs de produtos, regras de agendamento ou conecte o Google Agenda. A IA absorve as instruções sem alucinar.'
    },
    {
      number: '03',
      title: 'Divulgue o número',
      desc: 'Seus clientes mandam mensagens a qualquer hora da noite ou fim de semana e recebem atendimento humanizado imediato em menos de 3 segundos.'
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
          
          {/* Badge Oficial */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E7E4DC] text-[#1A1816] text-xs font-semibold uppercase tracking-wider mb-8 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-[#075E54] font-bold">OFICIAL · META BUSINESS PARTNER (CLOUD API)</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-normal tracking-tight text-[#1A1816] max-w-4xl mx-auto leading-[1.08] mb-6">
            Toda mensagem<br />
            respondida, <span className="font-serif-title italic font-normal text-[#1A1816]">mesmo no dia mais corrido.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-[#5C5955] max-w-2xl mx-auto font-normal leading-relaxed mb-8">
            A Vocalis atende seus clientes no WhatsApp com rapidez e a calma de quem conhece o seu negócio. Agenda, tira dúvidas, envia orçamentos e transfere para a sua equipe quando necessário.
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
              SMARTPHONE WHATSAPP LIVE DEMO MOCKUP
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
                      <span className="font-semibold text-xs text-white">Vocalis Atendimento</span>
                      <span className="text-[10px] text-[#00a884]">✔</span>
                    </div>
                    <p className="text-[10px] text-emerald-400">online agora · conta comercial</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-medium">
                    24/7 Ativo
                  </span>
                </div>
              </div>

              {/* Chat Conversation Area */}
              <div className="p-3 space-y-3 text-xs bg-[#0b141a]">
                
                {/* User Message 1 */}
                <div className="bg-[#005c4b] text-white p-3 rounded-2xl rounded-tr-none ml-auto max-w-[85%] shadow-sm">
                  <p>Boa tarde! Gostaria de saber os horários para limpeza de pele essa semana.</p>
                  <span className="text-[9px] text-emerald-200 block text-right mt-1 flex items-center justify-end gap-1">
                    14:22 <CheckCheck className="w-3 h-3 text-blue-300" />
                  </span>
                </div>

                {/* AI Response 1 */}
                <div className="bg-[#202c33] text-stone-100 p-3 rounded-2xl rounded-tl-none max-w-[88%] shadow-sm space-y-1">
                  <span className="text-[10px] font-bold text-[#FF9E7D]">SARA · VOCALIS IA</span>
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
                  <span className="text-[10px] font-bold text-[#FF9E7D]">MENSAGEM DE ÁUDIO · SARA</span>
                  
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

          {/* Social Proof Checklist */}
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 text-xs font-semibold text-[#5C5955]">
            <div className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-[#C84B1F]" strokeWidth={2.5} />
              <span>Conexão em 3 minutos</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-[#C84B1F]" strokeWidth={2.5} />
              <span>Número próprio ou novo</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-[#C84B1F]" strokeWidth={2.5} />
              <span>Zero risco de banimento</span>
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
                    <div className="p-3.5 rounded-xl border-2 border-[#C84B1F] bg-[#FAF5EE] relative shadow-sm">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <MessageCircle className="w-4 h-4 text-[#C84B1F]" />
                          <span className="text-xs font-bold text-[#1A1816]">Assistente de WhatsApp</span>
                        </div>
                        <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-[#C84B1F] text-white font-bold">
                          Ativo
                        </span>
                      </div>
                      <p className="text-[11px] text-stone-600 leading-tight">
                        Conversa no WhatsApp em texto e áudio.
                      </p>
                    </div>

                    {/* Floating Callout Badge matching print */}
                    <div className="absolute -top-3 right-4 bg-[#C84B1F] text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-md flex items-center gap-1.5 animate-bounce">
                      <span>No plano você tem 1 assistente de WhatsApp</span>
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
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-sm focus:outline-none focus:border-[#C84B1F]"
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
              O que ela faz <span className="font-serif-title italic text-[#C84B1F]">na conversa.</span>
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

                <h3 className="text-xl font-bold text-[#1A1816] mb-2">Responde na hora</h3>
                <p className="text-xs sm:text-sm text-[#5C5955] leading-relaxed">
                  24 horas por dia, fins de semana e feriados. Seu cliente nunca mais espera meia hora para saber o preço ou confirmar um agendamento.
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
                  Treinada com as regras, tabelas de preços e catálogo da sua empresa. Não inventa respostas e respeita rigidamente as suas instruções.
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
                No ar em <span className="font-serif-title italic text-[#C84B1F]">três passos.</span>
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

            {/* Right Platform Mockup View */}
            <div className="lg:col-span-7">
              <div className="bg-[#141312] rounded-3xl p-6 sm:p-8 text-white border border-stone-800 shadow-2xl">
                
                <div className="flex items-center justify-between pb-4 border-b border-stone-800 text-xs text-stone-400">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                    <span className="font-semibold text-stone-200">Painel Vocalis · WhatsApp</span>
                  </div>
                  <span className="font-mono text-[11px] text-stone-400">Meta Cloud API · v20.0</span>
                </div>

                <div className="py-6 space-y-4 text-xs">
                  <div className="p-4 rounded-xl bg-stone-900 border border-stone-800 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-white text-sm">Assistente: Sara (WhatsApp)</p>
                      <p className="text-stone-400 text-xs">Conectado ao número +55 11 9••••-4821</p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-[11px]">
                      Ativo · 0 fila
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="p-3 rounded-xl bg-stone-900 border border-stone-800">
                      <span className="text-stone-400 block text-[10px] uppercase">Conversas Hoje</span>
                      <span className="text-xl font-bold text-white">142</span>
                    </div>
                    <div className="p-3 rounded-xl bg-stone-900 border border-stone-800">
                      <span className="text-stone-400 block text-[10px] uppercase">Tempo Médio</span>
                      <span className="text-xl font-bold text-emerald-400">2.8s</span>
                    </div>
                    <div className="p-3 rounded-xl bg-stone-900 border border-stone-800">
                      <span className="text-stone-400 block text-[10px] uppercase">Agendamentos</span>
                      <span className="text-xl font-bold text-[#FF9E7D]">38</span>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={onOpenAuth}
                  className="w-full py-3 rounded-xl bg-[#C84B1F] hover:bg-[#B34018] text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
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
          5. PLANOS DE WHATSAPP (Exact replica with correct pricing)
         ======================================================== */}
      <section className="py-24 bg-[#FAF9F5]" id="precos-whatsapp">
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

          {/* WhatsApp Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
            {waPlans.map((plan) => {
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
          6. CONECTADA AO QUE VOCÊ JÁ USA (Logos de Integração)
         ======================================================== */}
      <section className="py-20 bg-white border-t border-[#EBE8E2]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <h2 className="text-3xl sm:text-4xl font-normal text-[#1A1816] tracking-tight leading-[1.12] mb-3">
            Conectada ao <span className="font-serif-title italic text-[#C84B1F]">que você já usa.</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#5C5955] max-w-xl mx-auto mb-10">
            A agenda, planilha, CRM ou sistema de gestão que você já confia se conecta à Vocalis em segundos.
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
                Seu cliente mandou mensagem,<br />
                <span className="font-serif-title italic text-[#FF9E7D]">já foi respondido.</span>
              </h2>

              <p className="text-sm text-stone-300 leading-relaxed">
                Mude para o WhatsApp inteligente da Vocalis hoje mesmo. Ative em 3 minutos sem fidelidade e com 30 dias de garantia incondicional.
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
