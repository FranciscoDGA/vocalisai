import React, { useState, useMemo } from 'react';
import { 
  Search, Calendar, MessageCircle, Database, ShoppingBag, Home, 
  Layers, Utensils, Stethoscope, DollarSign, ArrowRight, ExternalLink, 
  Sparkles, Check, CheckCircle2, X, AlertCircle
} from 'lucide-react';
import { BRAND } from '../data/content';
import { saveLead } from '../utils/supabaseClient';
import AudioFrequencyWave from './AudioFrequencyWave';

export default function IntegracoesPage({ onOpenDemo, onOpenAuth, onNavigateHome }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [requestModalOpen, setRequestModalOpen] = useState(false);
  const [requestedApp, setRequestedApp] = useState('');
  const [requestSubmitted, setRequestSubmitted] = useState(false);
  const [requestSubmitting, setRequestSubmitting] = useState(false);
  const [requestError, setRequestError] = useState('');

  const categories = [
    { id: 'all', name: 'Todas as categorias', icon: Layers },
    { id: 'agendas', name: 'Agendas e reservas', icon: Calendar },
    { id: 'comunicacao', name: 'Comunicação e mensagens', icon: MessageCircle },
    { id: 'crm', name: 'CRM e vendas', icon: Database },
    { id: 'ecommerce', name: 'E-commerce', icon: ShoppingBag },
    { id: 'imoveis', name: 'Imóveis', icon: Home },
    { id: 'produtividade', name: 'Produtividade e conhecimento', icon: Layers },
    { id: 'restaurantes', name: 'Restaurantes e hotelaria', icon: Utensils },
    { id: 'saude', name: 'Saúde e farmácia', icon: Stethoscope },
    { id: 'financas', name: 'Boletos e finanças', icon: DollarSign }
  ];

  const integrations = [
    // Agendas
    {
      id: 'google-calendar',
      category: 'agendas',
      name: 'Google Calendar',
      desc: 'Possibilidade de consulta de disponibilidade e registro de agendamentos conforme configuração do plano.',
      tag: 'Sob consulta',
      color: 'bg-blue-500'
    },
    {
      id: 'calendly',
      category: 'agendas',
      name: 'Calendly',
      desc: 'Possibilidade de integração para consulta e agendamento de horários avaliada conforme o plano.',
      tag: 'Sob consulta',
      color: 'bg-sky-500'
    },
    {
      id: 'calcom',
      category: 'agendas',
      name: 'Cal.com',
      desc: 'Possibilidade de conexão via webhook/API para consulta de disponibilidade conforme o plano.',
      tag: 'Sob consulta',
      color: 'bg-stone-800'
    },
    {
      id: 'simples-agenda',
      category: 'agendas',
      name: 'SimplesAgenda',
      desc: 'Possibilidade de integração de agenda para clínicas avaliada sob consulta via API ou webhook.',
      tag: 'Sob consulta',
      color: 'bg-emerald-600'
    },
    {
      id: 'atomia',
      category: 'agendas',
      name: 'Atomia',
      desc: 'Agendamento e gerenciamento baseado em regras de agendamento automático para salões e serviços.',
      tag: null,
      color: 'bg-purple-600'
    },

    // Comunicação
    {
      id: 'whatsapp-business',
      category: 'comunicacao',
      name: 'WhatsApp Business',
      desc: 'Fluxos configuráveis em texto e áudio no WhatsApp; modalidade técnica e eventuais custos da Meta dependem do plano confirmado.',
      tag: 'Sob consulta',
      color: 'bg-emerald-500'
    },
    {
      id: 'slack',
      category: 'comunicacao',
      name: 'Slack',
      desc: 'Envia resumos de ligações, alertas de leads quentes e notas de fechamento para os canais da sua equipe.',
      tag: null,
      color: 'bg-rose-500'
    },

    // CRM e Vendas
    {
      id: 'rd-station',
      category: 'crm',
      name: 'RD Station',
      desc: 'Possibilidade de envio de leads e registro de resumos via integração sob consulta conforme o plano.',
      tag: 'Sob consulta',
      color: 'bg-cyan-600'
    },
    {
      id: 'pipedrive',
      category: 'crm',
      name: 'Pipedrive',
      desc: 'Possibilidade de criação ou atualização de negócios via integração sob consulta conforme o plano.',
      tag: 'Sob consulta',
      color: 'bg-green-600'
    },
    {
      id: 'hubspot',
      category: 'crm',
      name: 'HubSpot',
      desc: 'Preenche contatos no HubSpot e envia o log de conversa, gravações e resumo executivo de reuniões.',
      tag: null,
      color: 'bg-orange-600'
    },
    {
      id: 'compufour',
      category: 'crm',
      name: 'Compufour',
      desc: 'Gera novos contatos no CRM e sincroniza informações coletadas durante o atendimento telefônico.',
      tag: null,
      color: 'bg-blue-600'
    },
    {
      id: 'omie',
      category: 'crm',
      name: 'Omie',
      desc: 'Cria e atualiza dados de clientes no seu ERP Omie durante a ligação e salva o histórico no sistema.',
      tag: null,
      color: 'bg-indigo-600'
    },
    {
      id: 'leadster',
      category: 'crm',
      name: 'Leadster',
      desc: 'Cria contatos e preenche informações qualificadas com a transcrição da ligação em tempo real.',
      tag: null,
      color: 'bg-amber-600'
    },

    // E-commerce
    {
      id: 'nuvemshop',
      category: 'ecommerce',
      name: 'Nuvemshop',
      desc: 'Possibilidade de consulta de pedidos e suporte no WhatsApp ou chat conforme integração contratada.',
      tag: 'Sob consulta',
      color: 'bg-blue-500'
    },
    {
      id: 'woocommerce',
      category: 'ecommerce',
      name: 'WooCommerce',
      desc: 'Consulta pedidos e dados de clientes da sua loja virtual no WordPress sem intervenção humana.',
      tag: null,
      color: 'bg-purple-600'
    },
    {
      id: 'vtex',
      category: 'ecommerce',
      name: 'VTEX',
      desc: 'Verifica status de pedidos e catálogo de produtos de seu e-commerce corporativo diretamente com a IA.',
      tag: 'Em breve',
      color: 'bg-rose-600'
    },
    {
      id: 'loja-integrada',
      category: 'ecommerce',
      name: 'Loja Integrada',
      desc: 'Informa status de pedidos e produtos disponíveis em sua loja virtual de forma totalmente autônoma.',
      tag: 'Em breve',
      color: 'bg-emerald-600'
    },

    // Imóveis
    {
      id: 'orulo',
      category: 'imoveis',
      name: 'Órulo',
      desc: 'Envia solicitações de imóveis e cadastra clientes no portal de busca de empreendimentos da imobiliária.',
      tag: null,
      color: 'bg-blue-700'
    },
    {
      id: 'leadview',
      category: 'imoveis',
      name: 'LeadView',
      desc: 'Consulta imóveis e agenda visitas diretamente no CRM imobiliário da sua equipe de corretores.',
      tag: null,
      color: 'bg-cyan-700'
    },
    {
      id: 'vista-crm',
      category: 'imoveis',
      name: 'Vista CRM',
      desc: 'Preenche dados de contatos e preferências na busca de locação e venda no sistema de CRM imobiliário.',
      tag: null,
      color: 'bg-orange-700'
    },
    {
      id: 'universal-software',
      category: 'imoveis',
      name: 'Universal Software',
      desc: 'Sincroniza chamadas e cria novos leads na base imobiliária da sua operação com resumo automático.',
      tag: null,
      color: 'bg-indigo-700'
    },

    // Produtividade e Conhecimento
    {
      id: 'notion',
      category: 'produtividade',
      name: 'Notion',
      desc: 'Consulta bases de conhecimento internas no Notion e salva resumos de reuniões em bancos de dados.',
      tag: null,
      color: 'bg-stone-900'
    },
    {
      id: 'google-sheets',
      category: 'produtividade',
      name: 'Google Sheets',
      desc: 'Possibilidade de envio de registros para planilhas via webhook/API conforme escopo contratado.',
      tag: 'Via Webhook/API',
      color: 'bg-emerald-600'
    },
    {
      id: 'airtable',
      category: 'produtividade',
      name: 'Airtable',
      desc: 'Insere registros de chamadas e sincroniza regras de negócios flexíveis no seu banco Airtable.',
      tag: null,
      color: 'bg-amber-500'
    },
    {
      id: 'webhooks',
      category: 'produtividade',
      name: 'Webhooks / API REST',
      desc: 'Conecte qualquer sistema próprio, Zapier, Make ou backend customizado através de requisições HTTP JSON.',
      tag: 'Universal',
      color: 'bg-[#4F46E5]'
    },

    // Restaurantes
    {
      id: 'thefork',
      category: 'restaurantes',
      name: 'TheFork',
      desc: 'Recebe reservas de mesas e sincroniza a disponibilidade de horários do restaurante automaticamente.',
      tag: null,
      color: 'bg-emerald-700'
    },
    {
      id: 'opentable',
      category: 'restaurantes',
      name: 'OpenTable',
      desc: 'Registra reservas telefônicas diretamente no painel do restaurante sem necessitar de intervenção da equipe.',
      tag: null,
      color: 'bg-rose-700'
    },

    // Saúde
    {
      id: 'feegow',
      category: 'saude',
      name: 'Feegow Clinic',
      desc: 'Possibilidade de integração de agendas clínicas avaliada sob consulta conforme o plano.',
      tag: 'Sob consulta',
      color: 'bg-teal-600'
    },
    {
      id: 'clinicorp',
      category: 'saude',
      name: 'Clinicorp',
      desc: 'Possibilidade de integração de agendas odontológicas e clínicas avaliada sob consulta.',
      tag: 'Sob consulta',
      color: 'bg-sky-600'
    },

    // Finanças
    {
      id: 'asaas',
      category: 'financas',
      name: 'Asaas',
      desc: 'Possibilidade de geração de cobranças e consulta de faturas via webhook/API sob consulta.',
      tag: 'Sob consulta',
      color: 'bg-blue-600'
    },
    {
      id: 'conta-azul',
      category: 'financas',
      name: 'Conta Azul',
      desc: 'Sincroniza receitas e cadastro de clientes no ERP financeiro da sua micro ou média empresa.',
      tag: null,
      color: 'bg-indigo-600'
    }
  ];

  const filteredIntegrations = useMemo(() => {
    return integrations.filter((item) => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            item.desc.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleRequestSubmit = async (e) => {
    e.preventDefault();
    if (!requestedApp.trim()) return;
    setRequestError('');
    setRequestSubmitting(true);
    try {
      const res = await saveLead({
        phone: 'Nao informado (Integracao)',
        niche: 'Solicitacao de Integracao',
        notes: `Integracao solicitada: ${requestedApp.trim()}`,
      });
      if (res?.success) {
        setRequestSubmitted(true);
      } else {
        setRequestError(
          'Não foi possível registrar o pedido no servidor neste momento. Envie diretamente para contato@vocalis.ai.'
        );
      }
    } catch {
      setRequestError('Erro ao enviar pedido. Utilize contato@vocalis.ai.');
    } finally {
      setRequestSubmitting(false);
    }
  };

  return (
    <div className="bg-[#FAF9F5] text-[#1A1816] font-sans min-h-screen">
      
      {/* ========================================================
          1. HERO SECTION (Exact replica of user's uploaded print)
         ======================================================== */}
      <section className="relative pt-16 pb-20 md:pt-20 md:pb-28 overflow-hidden">
        {/* Soft Warm Radial Gradient */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-[#FDE8DF]/70 via-[#FAF9F5]/40 to-transparent pointer-events-none -z-10" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#E7E4DC] text-[#1A1816] text-xs font-semibold uppercase tracking-wider mb-6 shadow-sm">
            <span>🔗 Integrações</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-[#1A1816] max-w-3xl mx-auto leading-[1.12] mb-5">
            Conecte a Vocalis aos<br />
            sistemas que você já usa
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-[#5C5955] max-w-2xl mx-auto font-normal leading-relaxed mb-10">
            A Vocalis conversa com seus clientes e registra tudo no seu sistema, agenda ou CRM nos caminhos que sua empresa já utiliza.
          </p>

          {/* Search Bar Input */}
          <div className="max-w-xl mx-auto relative">
            <div className="flex items-center bg-white rounded-full p-2 pl-5 border border-[#DCD8D0] shadow-md focus-within:border-[#4F46E5] focus-within:ring-2 focus-within:ring-[#4F46E5]/15 transition-all">
              <Search className="w-5 h-5 text-stone-400 mr-3 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Pesquise integrações e conectores sob consulta (ex: agenda, CRM, webhooks...)"
                className="w-full bg-transparent text-sm text-[#1A1816] placeholder-[#9E9B95] focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="p-1 rounded-full text-stone-400 hover:text-stone-600 mr-2"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================
          2. MAIN CONTENT (Sidebar Categories + Integrations Grid)
         ======================================================== */}
      <section className="py-12 bg-white border-y border-[#EBE8E2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Sidebar Categories */}
            <div className="lg:col-span-3 sticky top-24 bg-[#FAF9F5] p-4 rounded-3xl border border-[#E7E4DC] space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C8881] px-3 py-2 block">
                Filtrar por categoria
              </span>

              {categories.map((cat) => {
                const Icon = cat.icon;
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all text-left cursor-pointer ${
                      isSelected
                        ? 'bg-[#11100F] text-white shadow-sm'
                        : 'text-[#5C5955] hover:bg-white hover:text-[#1A1816]'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isSelected ? 'text-[#A5B4FC]' : 'text-stone-400'}`} />
                    <span>{cat.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Right Integrations Grid */}
            <div className="lg:col-span-9 space-y-6">
              
              <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                <span className="text-xs font-bold text-[#8C8881] uppercase tracking-wider">
                  {filteredIntegrations.length} {filteredIntegrations.length === 1 ? 'integração listada' : 'integrações listadas'}
                </span>
                {selectedCategory !== 'all' && (
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className="text-xs text-[#4F46E5] font-semibold hover:underline"
                  >
                    Ver todas
                  </button>
                )}
              </div>

              <p className="text-xs text-[#5C5955] bg-[#FAF9F5] border border-[#E7E4DC] rounded-2xl px-4 py-3">
                Os itens abaixo representam possibilidades de integração sob consulta ou via webhook/API, sujeitas à confirmação técnica e aos recursos do plano contratado.
              </p>

              {filteredIntegrations.length === 0 ? (
                <div className="bg-[#FAF9F5] rounded-3xl p-12 text-center border border-dashed border-stone-300 space-y-3">
                  <p className="text-sm font-semibold text-[#1A1816]">
                    Nenhuma integração encontrada para "{searchQuery}".
                  </p>
                  <p className="text-xs text-[#5C5955]">
                    Precisa conectar um sistema próprio ou específico? Nós desenvolvemos para você!
                  </p>
                  <button
                    onClick={() => setRequestModalOpen(true)}
                    className="px-6 py-2.5 rounded-full bg-[#4F46E5] text-white text-xs font-bold hover:bg-[#B34018] transition-colors"
                  >
                    Solicitar esta integração
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {filteredIntegrations.map((item) => (
                    <div
                      key={item.id}
                      className="bg-[#FAF9F5] rounded-3xl p-6 border border-[#E7E4DC] shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-2xl ${item.color} text-white flex items-center justify-center font-bold text-sm shadow-sm group-hover:scale-105 transition-transform`}>
                              {item.name.charAt(0)}
                            </div>
                            <div>
                              <h3 className="text-base font-bold text-[#1A1816] leading-tight">
                                {item.name}
                              </h3>
                              <span className="text-[10px] text-[#8C8881] uppercase font-mono">
                                Conexão em 1 clique
                              </span>
                            </div>
                          </div>

                          {item.tag && (
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              item.tag === 'Em breve' 
                                ? 'bg-stone-200 text-stone-600'
                                : 'bg-emerald-500/10 text-emerald-700 border border-emerald-200'
                            }`}>
                              {item.tag}
                            </span>
                          )}
                        </div>

                        <p className="text-xs text-[#5C5955] leading-relaxed mb-4">
                          {item.desc}
                        </p>
                      </div>

                      <button
                        onClick={onOpenAuth}
                        className="text-xs font-semibold text-[#4F46E5] group-hover:text-[#9E3612] transition-colors inline-flex items-center gap-1 cursor-pointer pt-2 border-t border-stone-200/60"
                      >
                        <span>Conectar assistente</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* 2 Bottom Callout Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-8">
                
                {/* Card 1: Falta alguma integração? */}
                <div className="bg-[#EEF2FF] rounded-3xl p-7 border border-[#E0E7FF] flex flex-col justify-between text-left">
                  <div>
                    <div className="w-8 h-8 rounded-full bg-white text-[#4F46E5] flex items-center justify-center mb-4 shadow-sm font-bold text-xs">
                      ✎
                    </div>
                    <h3 className="text-base font-bold text-[#1A1816] mb-1.5">
                      Falta alguma integração?
                    </h3>
                    <p className="text-xs text-[#5C5955] leading-relaxed mb-6">
                      Envie uma sugestão de ferramenta ou sistema que sua empresa gostaria de ver conectado à Vocalis com um clique.
                    </p>
                  </div>
                  <button
                    onClick={() => setRequestModalOpen(true)}
                    className="text-xs font-bold text-[#4F46E5] hover:underline inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>Solicitar integração</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Card 2: Precisa de uma conexão própria? */}
                <div className="bg-[#EEF2FF] rounded-3xl p-7 border border-[#E0E7FF] flex flex-col justify-between text-left">
                  <div>
                    <div className="w-8 h-8 rounded-full bg-white text-[#4F46E5] flex items-center justify-center mb-4 shadow-sm font-bold text-xs">
                      ⚡
                    </div>
                    <h3 className="text-base font-bold text-[#1A1816] mb-1.5">
                      Precisa de uma conexão própria?
                    </h3>
                    <p className="text-xs text-[#5C5955] leading-relaxed mb-6">
                      Nossas conexões via API REST e Webhooks sob medida se integram facilmente a qualquer sistema interno ou ERP proprietário.
                    </p>
                  </div>
                  <button
                    onClick={onOpenDemo}
                    className="text-xs font-bold text-[#4F46E5] hover:underline inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>Falar com um especialista</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ========================================================
          3. BANNER CTA FINAL ESCURO
         ======================================================== */}
      <section className="py-20 bg-[#FAF9F5]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#141312] text-white rounded-[32px] p-8 sm:p-14 relative overflow-hidden shadow-2xl border border-stone-800 text-center">
            
            <div className="relative z-10 max-w-2xl mx-auto space-y-5">
              <h2 className="text-4xl sm:text-5xl font-normal tracking-tight text-white leading-tight">
                Hoje alguém vai ligar.<br />
                <span className="font-serif-title italic text-[#A5B4FC]">Deixe a Vocalis atender.</span>
              </h2>

              <p className="text-sm text-stone-300 leading-relaxed max-w-xl mx-auto">
                Configure sua assistente conforme o plano escolhido e avalie as integrações necessárias para sua operação.
              </p>

              <div className="pt-3">
                <button
                  onClick={onOpenAuth}
                  className="px-8 py-3.5 rounded-full bg-white text-[#141312] text-sm font-bold hover:bg-stone-100 transition-all shadow-xl hover:scale-105 cursor-pointer"
                >
                  Criar minha Vocalis
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

      {/* Modal: Solicitar Integração */}
      {requestModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-stone-200 relative text-left">
            <button
              onClick={() => setRequestModalOpen(false)}
              className="absolute top-5 right-5 p-1 rounded-full text-stone-400 hover:text-stone-600"
            >
              <X className="w-5 h-5" />
            </button>

            {!requestSubmitted ? (
              <form onSubmit={handleRequestSubmit} className="space-y-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-[#4F46E5] uppercase tracking-wider">
                    Solicitação de Integração
                  </span>
                  <h3 className="text-xl font-bold text-[#1A1816]">
                    Qual software você utiliza?
                  </h3>
                  <p className="text-xs text-[#5C5955]">
                    Nossa equipe de engenharia analisa os pedidos com maior demanda semanalmente.
                  </p>
                </div>

                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">Nome do Sistema / ERP / CRM:</label>
                  <input
                    type="text"
                    required
                    value={requestedApp}
                    onChange={(e) => setRequestedApp(e.target.value)}
                    placeholder="Ex: Tiny ERP, Bling, Clinab, etc."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:border-[#4F46E5]"
                  />
                </div>

                {requestError && (
                  <div role="alert" className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <span>{requestError}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={requestSubmitting}
                  className="w-full py-3 rounded-full bg-[#11100F] text-white text-xs font-bold hover:bg-black transition-colors cursor-pointer disabled:opacity-60"
                >
                  {requestSubmitting ? 'Enviando solicitação...' : 'Enviar solicitação'}
                </button>
              </form>
            ) : (
              <div className="py-6 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                <h3 className="text-lg font-bold text-[#1A1816]">Solicitação Recebida!</h3>
                <p className="text-xs text-[#5C5955]">
                  Registramos seu pedido para o sistema <strong>{requestedApp}</strong>. Avisaremos você assim que a conexão for disponibilizada.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
