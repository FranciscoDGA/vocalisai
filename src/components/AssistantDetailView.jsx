import React, { useState } from 'react';
import { 
  Bot, MessageSquare, Phone, Headphones, Sparkles, Plus, X, 
  ChevronRight, ChevronDown, ChevronUp, Globe, Upload, BookOpen, 
  Sliders, Settings, Mail, Calendar, Plug, Check, CheckCircle2, 
  Info, ExternalLink, Send, ArrowLeft, MessageCircle, MoreHorizontal,
  FileText, Shield, AlertCircle, ToggleLeft, ToggleRight, Radio, RefreshCw
} from 'lucide-react';

export default function AssistantDetailView({ 
  assistant, 
  allAssistants = [], 
  onBack, 
  onSelectAssistant, 
  onOpenCreateModal, 
  onOpenPricing 
}) {
  const [subTab, setSubTab] = useState('geral'); // 'geral' | 'regras' | 'conhecimento' | 'prompt'
  const [assistantDropdownOpen, setAssistantDropdownOpen] = useState(false);
  const [promoBannerVisible, setPromoBannerVisible] = useState(true);
  const [testChatOpen, setTestChatOpen] = useState(false);
  const [addSourceDropdownOpen, setAddSourceDropdownOpen] = useState(false);
  const [activeStatus, setActiveStatus] = useState(true);

  // Form State - Geral
  const [name, setName] = useState(assistant?.name || 'Francisco Gomes');
  const [type, setType] = useState(assistant?.type || 'chat');
  const [language, setLanguage] = useState('pt-BR');
  const [timeout, setTimeoutVal] = useState('1 hora');
  const [sellerProfile, setSellerProfile] = useState(false);

  // Form State - Regras (Sistema)
  const [shortAnswers, setShortAnswers] = useState(true);
  const [askWhenUnclear, setAskWhenUnclear] = useState(true);
  const [politeTone, setPoliteTone] = useState(true);
  const [objectiveQuestions, setObjectiveQuestions] = useState(true);

  // Form State - Regras (Suas regras)
  const [aiNotice, setAiNotice] = useState('Somente se perguntado');
  const [commStyle, setCommStyle] = useState('Padrão');

  // Form State - Conhecimento
  const [knowledgeActive, setKnowledgeActive] = useState(true);
  const [knowledgeTab, setKnowledgeTab] = useState('fontes');

  // Form State - Prompt
  const defaultPrompt = assistant?.prompt || `Você é a ${name} – uma assistente de chat que responde às perguntas de forma amigável, ágil e focada em converter visitantes em clientes.`;
  const [promptText, setPromptText] = useState(defaultPrompt);

  // Interactive Live Test Chat State
  const [chatMessages, setChatMessages] = useState([
    { sender: 'assistant', text: `Olá! Sou a ${name}, assistente virtual da empresa. Como posso te ajudar hoje?` }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [chatTyping, setChatTyping] = useState(false);

  const handleSendChatMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = chatInput.trim();
    setChatMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setChatInput('');
    setChatTyping(true);

    setTimeout(() => {
      let reply = `Com certeza! Entendi perfeitamente sua dúvida sobre "${userMsg}". Estou consultando a base de conhecimento para te passar a informação mais precisa agora mesmo.`;
      if (userMsg.toLowerCase().includes('preço') || userMsg.toLowerCase().includes('valor') || userMsg.toLowerCase().includes('plano')) {
        reply = `Temos planos a partir de R$ 209/mês para WhatsApp e Chatbot, e planos completos com ligações de voz a partir de R$ 503/mês. Gostaria que eu te envie o link direto no WhatsApp?`;
      } else if (userMsg.toLowerCase().includes('olá') || userMsg.toLowerCase().includes('oi')) {
        reply = `Olá! Que bom falar com você! Me conta: você procura atendimento automatizado para WhatsApp, telefone ou site?`;
      }
      setChatMessages(prev => [...prev, { sender: 'assistant', text: reply }]);
      setChatTyping(false);
    }, 900);
  };

  return (
    <div className="flex-1 flex flex-col md:flex-row min-h-screen bg-white relative">
      
      {/* ========================================================
          SUB-SIDEBAR (Sidebar 2 - Detalhes do Agente)
         ======================================================== */}
      <div className="w-full md:w-64 bg-[#FAF9F5] border-r border-[#EBE8E2] p-4 flex flex-col justify-between shrink-0">
        <div>
          {/* Header com Nome do Agente + Botão Voltar + Troca de Agente */}
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#EBE8E2]">
            <div className="flex items-center gap-2 overflow-hidden">
              <button 
                onClick={onBack}
                className="w-7 h-7 rounded-lg border border-[#E7E4DC] hover:border-[#D0CBC0] bg-white flex items-center justify-center text-[#736F69] hover:text-[#1A1816] transition-colors cursor-pointer shrink-0"
                title="Voltar para a lista de assistentes"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
              </button>
              <div className="text-left overflow-hidden">
                <div className="text-xs font-bold text-[#1A1816] truncate max-w-[120px]">{name}</div>
                <div className="text-[10px] text-[#736F69]">
                  {type === 'voz' ? 'Voice Agent' : type === 'chat' ? 'Chat Agent' : 'Hybrid Agent'}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <div className="relative">
                <button
                  onClick={() => setAssistantDropdownOpen(!assistantDropdownOpen)}
                  className="w-6 h-6 rounded-md hover:bg-[#EFECE6] flex items-center justify-center text-[#736F69] cursor-pointer"
                  title="Trocar assistente"
                >
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
                {assistantDropdownOpen && (
                  <div className="absolute top-8 left-0 w-48 bg-white rounded-xl border border-[#E7E4DC] shadow-xl p-1 z-50 text-xs">
                    <div className="px-2 py-1 text-[10px] font-bold text-[#8C8881] uppercase">Seus assistentes</div>
                    {allAssistants.map(a => (
                      <button
                        key={a.id}
                        onClick={() => {
                          if (onSelectAssistant) onSelectAssistant(a);
                          setAssistantDropdownOpen(false);
                        }}
                        className="w-full px-2 py-1.5 rounded-lg text-left hover:bg-[#FAF9F5] flex items-center justify-between font-medium"
                      >
                        <span className="truncate">{a.name}</span>
                        <span className="text-[10px] text-[#736F69]">{a.type}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <button
                onClick={onOpenCreateModal}
                className="w-6 h-6 rounded-md hover:bg-[#EFECE6] flex items-center justify-center text-[#1A1816] font-bold cursor-pointer"
                title="Novo assistente"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Sub-menu Tabs (Geral, Regras, Conhecimento, Prompt personalizado) */}
          <div className="space-y-1">
            <button
              onClick={() => setSubTab('geral')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                subTab === 'geral' ? 'bg-[#EFECE6] text-[#1A1816]' : 'text-[#5C5955] hover:text-[#1A1816] hover:bg-[#F3EFE8]'
              }`}
            >
              <span>Geral</span>
            </button>

            <button
              onClick={() => setSubTab('regras')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                subTab === 'regras' ? 'bg-[#EFECE6] text-[#1A1816]' : 'text-[#5C5955] hover:text-[#1A1816] hover:bg-[#F3EFE8]'
              }`}
            >
              <span>Regras</span>
            </button>

            <button
              onClick={() => setSubTab('conhecimento')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                subTab === 'conhecimento' ? 'bg-[#EFECE6] text-[#1A1816]' : 'text-[#5C5955] hover:text-[#1A1816] hover:bg-[#F3EFE8]'
              }`}
            >
              <span>Conhecimento</span>
            </button>

            <button
              onClick={() => setSubTab('prompt')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                subTab === 'prompt' ? 'bg-[#EFECE6] text-[#1A1816]' : 'text-[#5C5955] hover:text-[#1A1816] hover:bg-[#F3EFE8]'
              }`}
            >
              <span>Prompt personalizado</span>
            </button>
          </div>
        </div>

        {/* Promo Card: Conheça seu chatbot de IA (Réplica 1:1 Kloel) */}
        {promoBannerVisible && (
          <div className="mt-8 p-3.5 rounded-2xl bg-gradient-to-b from-[#FFF5F0] to-[#FAF5EE] border border-[#F3E2D5] relative animate-fadeIn">
            <button 
              onClick={() => setPromoBannerVisible(false)}
              className="absolute right-2.5 top-2.5 text-[#8C8881] hover:text-[#1A1816]"
            >
              <X className="w-3.5 h-3.5" />
            </button>
            <div className="flex items-center gap-1.5 mb-2">
              <span className="px-2 py-0.5 rounded-full bg-[#C84B1F] text-white text-[9px] font-bold uppercase">
                Novo
              </span>
            </div>
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-6 h-6 rounded-lg bg-[#FFE6D9] text-[#C84B1F] flex items-center justify-center">
                <MessageSquare className="w-3.5 h-3.5" />
              </div>
              <h5 className="text-xs font-bold text-[#1A1816]">Conheça seu chatbot de IA</h5>
            </div>
            <p className="text-[11px] text-[#5C5955] leading-relaxed mb-3">
              Seu chatbot de IA agora pode responder a perguntas no seu site como uma pessoa.
            </p>
            <button
              onClick={onOpenPricing}
              className="w-full py-1.5 rounded-xl bg-[#C84B1F] hover:bg-[#B34018] text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
            >
              Criar chatbot de IA
            </button>
          </div>
        )}
      </div>

      {/* ========================================================
          MAIN CONTENT AREA (Painel da Aba Selecionada)
         ======================================================== */}
      <div className="flex-1 p-6 sm:p-10 overflow-y-auto pb-28 bg-white min-h-screen">
        
        {/* ========================================================
            SUB-TAB 1: GERAL (Réplica Exata Print 1)
           ======================================================== */}
        {subTab === 'geral' && (
          <div className="max-w-3xl space-y-8 animate-fadeIn">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-[#1A1816]">Geral</h2>
              <button className="w-8 h-8 rounded-lg hover:bg-[#FAF9F5] flex items-center justify-center text-[#736F69]">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>

            {/* Seção: Básico */}
            <div className="space-y-3">
              <span className="text-[11px] font-bold text-[#8C8881] uppercase tracking-wider">Básico</span>
              <div className="rounded-2xl border border-[#E7E4DC] overflow-hidden divide-y divide-[#EBE8E2]">
                <div className="p-3.5 flex items-center justify-between">
                  <label className="text-xs font-semibold text-[#1A1816]">Nome</label>
                  <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                    className="w-64 px-3 py-1.5 rounded-xl border border-[#E7E4DC] text-xs text-[#1A1816] focus:outline-none focus:border-[#1A1816]"
                  />
                </div>

                <div className="p-3.5 flex items-center justify-between">
                  <label className="text-xs font-semibold text-[#1A1816]">Tipo</label>
                  <select 
                    value={type} 
                    onChange={(e) => setType(e.target.value)}
                    className="px-3 py-1.5 rounded-xl border border-[#E7E4DC] text-xs text-[#1A1816] bg-white focus:outline-none cursor-pointer"
                  >
                    <option value="chat">Assistente de chat</option>
                    <option value="voz">Assistente de voz</option>
                    <option value="hibrido">Chat + Ligação</option>
                  </select>
                </div>

                <div className="p-3.5 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <label className="text-xs font-semibold text-[#1A1816]">Idioma</label>
                    <Info className="w-3.5 h-3.5 text-[#8C8881]" />
                  </div>
                  <select 
                    value={language} 
                    onChange={(e) => setLanguage(e.target.value)}
                    className="px-3 py-1.5 rounded-xl border border-[#E7E4DC] text-xs text-[#1A1816] bg-white focus:outline-none cursor-pointer"
                  >
                    <option value="pt-BR">Português (Brasil)</option>
                    <option value="en-US">English (US)</option>
                    <option value="es-ES">Español</option>
                  </select>
                </div>

                <div className="p-3.5 flex items-center justify-between">
                  <label className="text-xs font-semibold text-[#1A1816]">Tempo limite da conversa</label>
                  <select 
                    value={timeout} 
                    onChange={(e) => setTimeoutVal(e.target.value)}
                    className="px-3 py-1.5 rounded-xl border border-[#E7E4DC] text-xs text-[#1A1816] bg-white focus:outline-none cursor-pointer"
                  >
                    <option value="30 minutos">30 minutos</option>
                    <option value="1 hora">1 hora</option>
                    <option value="2 horas">2 horas</option>
                    <option value="24 horas">24 horas</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Seção: Gestão de conversas */}
            <div className="space-y-3">
              <span className="text-[11px] font-bold text-[#8C8881] uppercase tracking-wider">Gestão de conversas</span>
              <div className="rounded-2xl border border-[#E7E4DC] overflow-hidden divide-y divide-[#EBE8E2]">
                {[
                  { label: 'Entrada da conversa', val: 'IA' },
                  { label: 'Agenda de resposta', val: 'Sempre' },
                  { label: 'Transferência de conversa ativa', val: 'Padrão' },
                  { label: 'Notificações da equipe', val: 'Desligado' }
                ].map((item, idx) => (
                  <div key={idx} className="p-3.5 flex items-center justify-between hover:bg-[#FAF9F5] cursor-pointer transition-colors">
                    <span className="text-xs font-semibold text-[#1A1816]">{item.label}</span>
                    <span className="text-xs text-[#736F69] flex items-center gap-1 font-medium">
                      {item.val} <ChevronRight className="w-3.5 h-3.5 text-[#8C8881]" />
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Seção: Perfil vendedora */}
            <div className="space-y-3">
              <span className="text-[11px] font-bold text-[#8C8881] uppercase tracking-wider">Perfil vendedora</span>
              <div className="p-4 rounded-2xl border border-[#E7E4DC] flex items-start justify-between gap-4">
                <div>
                  <h4 className="text-xs font-bold text-[#1A1816] mb-1">Atuar como vendedora</h4>
                  <p className="text-xs text-[#736F69] leading-relaxed max-w-lg">
                    Na ligação e no WhatsApp, o assistente apresenta a empresa, entende a necessidade e conduz para a compra ou agendamento, com abertura proativa e resumo depois do atendimento.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSellerProfile(!sellerProfile)}
                  className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer shrink-0 mt-1 ${
                    sellerProfile ? 'bg-[#C84B1F]' : 'bg-[#E7E4DC]'
                  }`}
                >
                  <span className={`w-5 h-5 rounded-full bg-white shadow-sm absolute top-0.5 transition-transform ${
                    sellerProfile ? 'left-5.5' : 'left-0.5'
                  }`} />
                </button>
              </div>
            </div>

            {/* Seção: Recursos (6 Cards) */}
            <div className="space-y-3">
              <span className="text-[11px] font-bold text-[#8C8881] uppercase tracking-wider">Recursos</span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                
                {/* 1. Conectar contatos (Ativo com Check) */}
                <div className="p-4 rounded-2xl border border-[#E7E4DC] bg-white flex flex-col justify-between min-h-[95px] hover:border-[#D0CBC0] transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="w-7 h-7 rounded-lg bg-[#FAF5EE] text-[#C84B1F] flex items-center justify-center">
                      <FileText className="w-4 h-4" />
                    </div>
                    <span className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center">
                      <Check className="w-3 h-3" />
                    </span>
                  </div>
                  <span className="text-xs font-bold text-[#1A1816] mt-3">Conectar contatos</span>
                </div>

                {/* 2. Enviar e-mail */}
                <div className="p-4 rounded-2xl border border-[#E7E4DC] border-dashed bg-white flex flex-col justify-between min-h-[95px] hover:border-[#D0CBC0] transition-colors cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div className="w-7 h-7 rounded-lg bg-gray-50 text-[#736F69] flex items-center justify-center">
                      <Mail className="w-4 h-4" />
                    </div>
                    <span className="w-5 h-5 rounded-full border border-[#D0CBC0] text-[#736F69] flex items-center justify-center text-xs">
                      +
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-[#5C5955] mt-3">Enviar e-mail</span>
                </div>

                {/* 3. Agendar compromissos */}
                <div className="p-4 rounded-2xl border border-[#E7E4DC] border-dashed bg-white flex flex-col justify-between min-h-[95px] hover:border-[#D0CBC0] transition-colors cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div className="w-7 h-7 rounded-lg bg-gray-50 text-[#736F69] flex items-center justify-center">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <span className="w-5 h-5 rounded-full border border-[#D0CBC0] text-[#736F69] flex items-center justify-center text-xs">
                      +
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-[#5C5955] mt-3">Agendar compromissos</span>
                </div>

                {/* 4. Pesquisa na web */}
                <div className="p-4 rounded-2xl border border-[#E7E4DC] border-dashed bg-white flex flex-col justify-between min-h-[95px] hover:border-[#D0CBC0] transition-colors cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div className="w-7 h-7 rounded-lg bg-gray-50 text-[#736F69] flex items-center justify-center">
                      <Globe className="w-4 h-4" />
                    </div>
                    <span className="w-5 h-5 rounded-full border border-[#D0CBC0] text-[#736F69] flex items-center justify-center text-xs">
                      +
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-[#5C5955] mt-3">Pesquisa na web</span>
                </div>

                {/* 5. Integrações */}
                <div className="p-4 rounded-2xl border border-[#E7E4DC] border-dashed bg-white flex flex-col justify-between min-h-[95px] hover:border-[#D0CBC0] transition-colors cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div className="w-7 h-7 rounded-lg bg-gray-50 text-[#736F69] flex items-center justify-center">
                      <Plug className="w-4 h-4" />
                    </div>
                    <span className="w-5 h-5 rounded-full border border-[#D0CBC0] text-[#736F69] flex items-center justify-center text-xs">
                      +
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-[#5C5955] mt-3">Integrações</span>
                </div>

                {/* 6. Webhooks */}
                <div className="p-4 rounded-2xl border border-[#E7E4DC] border-dashed bg-white flex flex-col justify-between min-h-[95px] hover:border-[#D0CBC0] transition-colors cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div className="w-7 h-7 rounded-lg bg-gray-50 text-[#736F69] flex items-center justify-center">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <span className="w-5 h-5 rounded-full border border-[#D0CBC0] text-[#736F69] flex items-center justify-center text-xs">
                      +
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-[#5C5955] mt-3">Webhooks</span>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            SUB-TAB 2: REGRAS (Réplica Exata Prints 2 e 3)
           ======================================================== */}
        {subTab === 'regras' && (
          <div className="max-w-3xl space-y-8 animate-fadeIn">
            <h2 className="text-2xl font-bold text-[#1A1816]">Regras</h2>

            {/* Seção: Sistema */}
            <div className="space-y-3">
              <span className="text-[11px] font-bold text-[#8C8881] uppercase tracking-wider">Sistema</span>
              <div className="rounded-2xl border border-[#E7E4DC] overflow-hidden divide-y divide-[#EBE8E2]">
                {[
                  {
                    title: 'Respostas curtas e claras',
                    desc: 'Respostas precisas, sem monólogos longos',
                    state: shortAnswers,
                    setter: setShortAnswers
                  },
                  {
                    title: 'Pergunta quando algo não está claro',
                    desc: 'Faz perguntas automaticamente quando algo não está claro',
                    state: askWhenUnclear,
                    setter: setAskWhenUnclear
                  },
                  {
                    title: 'Educado, calmo e profissional',
                    desc: 'Responde de forma breve, compreensível e amigável',
                    state: politeTone,
                    setter: setPoliteTone
                  },
                  {
                    title: 'Perguntas objetivas',
                    desc: 'Faz as perguntas uma após a outra e nunca pede a mesma informação duas vezes',
                    state: objectiveQuestions,
                    setter: setObjectiveQuestions
                  }
                ].map((rule, idx) => (
                  <div key={idx} className="p-4 flex items-center justify-between gap-4">
                    <div>
                      <h4 className="text-xs font-bold text-[#1A1816]">{rule.title}</h4>
                      <p className="text-xs text-[#736F69] mt-0.5">{rule.desc}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => rule.setter(!rule.state)}
                      className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer shrink-0 ${
                        rule.state ? 'bg-[#D97757]' : 'bg-[#E7E4DC]'
                      }`}
                    >
                      <span className={`w-5 h-5 rounded-full bg-white shadow-sm absolute top-0.5 transition-transform ${
                        rule.state ? 'left-5.5' : 'left-0.5'
                      }`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Seção: Suas regras */}
            <div className="space-y-3">
              <span className="text-[11px] font-bold text-[#8C8881] uppercase tracking-wider">Suas regras</span>
              <div className="rounded-2xl border border-[#E7E4DC] overflow-hidden divide-y divide-[#EBE8E2]">
                <div className="p-4 flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-[#1A1816]">Aviso de IA</h4>
                    <p className="text-xs text-[#736F69] mt-0.5">Se e quando o seu assistente menciona que é uma IA</p>
                  </div>
                  <select 
                    value={aiNotice} 
                    onChange={(e) => setAiNotice(e.target.value)}
                    className="px-3 py-1.5 rounded-xl border border-[#E7E4DC] text-xs text-[#1A1816] bg-white focus:outline-none cursor-pointer"
                  >
                    <option value="Somente se perguntado">Somente se perguntado</option>
                    <option value="Sempre no início">Sempre no início</option>
                    <option value="Nunca mencionar">Nunca mencionar</option>
                  </select>
                </div>

                <div className="p-4 flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-[#1A1816]">Estilo de comunicação</h4>
                    <p className="text-xs text-[#736F69] mt-0.5">Tom com que o seu assistente se comunica</p>
                  </div>
                  <select 
                    value={commStyle} 
                    onChange={(e) => setCommStyle(e.target.value)}
                    className="px-3 py-1.5 rounded-xl border border-[#E7E4DC] text-xs text-[#1A1816] bg-white focus:outline-none cursor-pointer"
                  >
                    <option value="Padrão">Padrão</option>
                    <option value="Formal">Formal</option>
                    <option value="Descontraído">Descontraído</option>
                    <option value="Empático e acolhedor">Empático e acolhedor</option>
                  </select>
                </div>

                {[
                  { title: 'Perguntas fora do tema e conversa informal', status: 'Desativado' },
                  { title: 'Pessoa irritada', status: 'Desativado' },
                  { title: 'Ligações de vendas e comparações com concorrentes', status: 'Desativado' },
                  { title: 'Pronúncia', desc: 'Como o seu assistente pronuncia nomes de empresas e termos técnicos', status: '' }
                ].map((item, idx) => (
                  <div key={idx} className="p-4 flex items-center justify-between hover:bg-[#FAF9F5] cursor-pointer transition-colors">
                    <div>
                      <h4 className="text-xs font-bold text-[#1A1816]">{item.title}</h4>
                      {item.desc && <p className="text-xs text-[#736F69] mt-0.5">{item.desc}</p>}
                      {item.status && <p className="text-xs text-[#8C8881] mt-0.5">{item.status}</p>}
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#8C8881]" />
                  </div>
                ))}

                <button 
                  type="button"
                  className="w-full p-4 text-center text-xs font-bold text-[#C84B1F] hover:bg-[#FFF5F0] transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>⊕ Adicionar regra própria</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            SUB-TAB 3: CONHECIMENTO (Réplica Exata Print 4)
           ======================================================== */}
        {subTab === 'conhecimento' && (
          <div className="max-w-3xl space-y-6 animate-fadeIn">
            <h2 className="text-2xl font-bold text-[#1A1816]">Conhecimento</h2>

            <div className="flex items-center justify-between border-b border-[#EBE8E2] pb-2">
              <div className="flex items-center gap-6 text-xs font-semibold">
                <button 
                  onClick={() => setKnowledgeTab('fontes')}
                  className={`pb-2 border-b-2 transition-colors cursor-pointer ${
                    knowledgeTab === 'fontes' ? 'border-[#1A1816] text-[#1A1816]' : 'border-transparent text-[#736F69]'
                  }`}
                >
                  Fontes <span className="text-[10px] bg-[#EFECE6] px-1.5 py-0.5 rounded-full ml-1">0</span>
                </button>
                <button 
                  onClick={() => setKnowledgeTab('informacoes')}
                  className={`pb-2 border-b-2 transition-colors cursor-pointer ${
                    knowledgeTab === 'informacoes' ? 'border-[#1A1816] text-[#1A1816]' : 'border-transparent text-[#736F69]'
                  }`}
                >
                  Informações <span className="text-[10px] bg-[#EFECE6] px-1.5 py-0.5 rounded-full ml-1">0</span>
                </button>
              </div>

              <button className="text-xs font-medium text-[#736F69] hover:text-[#1A1816] flex items-center gap-1">
                <span>Horário de funcionamento</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Base de conhecimento Card */}
            <div className="rounded-2xl border border-[#E7E4DC] overflow-hidden divide-y divide-[#EBE8E2]">
              <div className="p-4 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-[#1A1816]">Base de conhecimento</h4>
                  <span className="text-xs text-[#736F69]">0 entradas</span>
                </div>
                <button
                  type="button"
                  onClick={() => setKnowledgeActive(!knowledgeActive)}
                  className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                    knowledgeActive ? 'bg-[#D97757]' : 'bg-[#E7E4DC]'
                  }`}
                >
                  <span className={`w-5 h-5 rounded-full bg-white shadow-sm absolute top-0.5 transition-transform ${
                    knowledgeActive ? 'left-5.5' : 'left-0.5'
                  }`} />
                </button>
              </div>

              <div className="p-4 flex items-center justify-between hover:bg-[#FAF9F5] cursor-pointer transition-colors">
                <div>
                  <h4 className="text-xs font-bold text-[#1A1816]">Informações da empresa</h4>
                  <p className="text-xs text-[#736F69] mt-0.5">Informações básicas sobre sua empresa</p>
                </div>
                <ChevronRight className="w-4 h-4 text-[#8C8881]" />
              </div>

              <div className="p-4 relative">
                <button 
                  onClick={() => setAddSourceDropdownOpen(!addSourceDropdownOpen)}
                  className="w-full text-center text-xs font-bold text-[#C84B1F] flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>⊕ Adicionar fonte</span>
                </button>

                {addSourceDropdownOpen && (
                  <div className="absolute top-12 left-1/2 -translate-x-1/2 w-48 bg-white rounded-xl border border-[#E7E4DC] shadow-xl p-1.5 z-50 text-xs animate-fadeIn">
                    <button 
                      onClick={() => setAddSourceDropdownOpen(false)}
                      className="w-full px-3 py-2 rounded-lg text-left hover:bg-[#FAF9F5] flex items-center gap-2 font-medium"
                    >
                      <Globe className="w-4 h-4 text-[#0284C7]" />
                      <span>Site</span>
                    </button>
                    <button 
                      onClick={() => setAddSourceDropdownOpen(false)}
                      className="w-full px-3 py-2 rounded-lg text-left hover:bg-[#FAF9F5] flex items-center gap-2 font-medium"
                    >
                      <Upload className="w-4 h-4 text-[#16A34A]" />
                      <span>Mídias</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            SUB-TAB 4: PROMPT PERSONALIZADO (Réplica Exata Print 5)
           ======================================================== */}
        {subTab === 'prompt' && (
          <div className="max-w-3xl space-y-6 animate-fadeIn">
            <h2 className="text-2xl font-bold text-[#1A1816]">Prompt personalizado</h2>

            {/* Dica de Prompt */}
            <div className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#E7E4DC] flex items-start gap-3">
              <span className="text-amber-500 mt-0.5">💡</span>
              <div className="text-xs text-[#5C5955] leading-relaxed">
                Um papel claro, instruções concretas e exemplos deixam seu assistente muito mais confiável.{' '}
                <a href="#dicas-prompt" className="text-[#1A1816] font-semibold underline underline-offset-2">
                  Como escrever um bom prompt ↗
                </a>
              </div>
            </div>

            {/* Editor de Prompt Grande */}
            <div className="rounded-2xl border border-[#E7E4DC] p-4 bg-white focus-within:border-[#1A1816] transition-colors">
              <textarea 
                value={promptText}
                onChange={(e) => setPromptText(e.target.value)}
                rows={14}
                className="w-full text-sm text-[#1A1816] placeholder-[#8C8881] focus:outline-none resize-none leading-relaxed"
                placeholder="Ex: Você é a Maria – uma assistente de chat que responde às perguntas de forma amigável..."
              />
              <div className="pt-2 text-right border-t border-[#F0EDE8]">
                <span className="text-[11px] text-[#8C8881]">
                  {promptText.length} / 100.000 caracteres
                </span>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* ========================================================
          BOTTOM FLOATING BAR (Sticky Réplica Exata Prints 3, 4, 5)
         ======================================================== */}
      <div className="fixed bottom-6 right-6 z-40 animate-fadeIn">
        <div className="bg-[#1A1816] text-white rounded-2xl px-4 py-2.5 shadow-2xl flex items-center gap-3.5 border border-white/10">
          
          {/* Toggle: Ativar assistente */}
          <button 
            onClick={() => setActiveStatus(!activeStatus)}
            className="flex items-center gap-2 text-xs font-semibold hover:text-[#FAF9F5] cursor-pointer"
          >
            <span className={`w-2 h-2 rounded-full ${activeStatus ? 'bg-emerald-400 animate-pulse' : 'bg-gray-500'}`} />
            <span>Ativar assistente</span>
          </button>

          <div className="h-4 w-[1px] bg-white/20" />

          {/* WhatsApp Pill */}
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-emerald-400">💬</span>
            <span className="font-medium text-xs">WhatsApp</span>
            <button 
              onClick={onOpenPricing}
              className="px-2 py-0.5 rounded-md bg-white/10 hover:bg-white/20 text-[10px] font-semibold text-white transition-colors cursor-pointer"
            >
              Assinar plano
            </button>
          </div>

          <div className="h-4 w-[1px] bg-white/20" />

          {/* Chatbot de IA Pill */}
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-purple-400">🤖</span>
            <span className="font-medium text-xs">Chatbot de IA</span>
            <button 
              onClick={onOpenPricing}
              className="px-2 py-0.5 rounded-md bg-white/10 hover:bg-white/20 text-[10px] font-semibold text-white transition-colors cursor-pointer"
            >
              Assinar plano
            </button>
          </div>

          {/* Orange Test Chat Button */}
          <button
            onClick={() => setTestChatOpen(true)}
            className="ml-2 px-4 py-1.5 rounded-xl bg-[#C84B1F] hover:bg-[#B34018] text-white text-xs font-bold transition-all shadow flex items-center gap-1.5 cursor-pointer"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Testar chat</span>
          </button>
        </div>
      </div>

      {/* ========================================================
          SIMULADOR INTERATIVO: TESTAR CHAT (Modal / Drawer)
         ======================================================== */}
      {testChatOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div 
            className="bg-white rounded-3xl max-w-md w-full h-[600px] border border-[#E7E4DC] shadow-2xl flex flex-col overflow-hidden relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header do Chat */}
            <div className="p-4 border-b border-[#EBE8E2] bg-[#FAF9F5] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#1A1816] text-white flex items-center justify-center text-xs font-bold">
                  {name[0] || 'A'}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#1A1816]">{name}</h4>
                  <span className="text-[10px] text-emerald-600 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    Online • WhatsApp / Chatbot IA
                  </span>
                </div>
              </div>
              <button 
                onClick={() => setTestChatOpen(false)}
                className="w-8 h-8 rounded-full bg-white border border-[#E7E4DC] flex items-center justify-center text-[#736F69] hover:text-[#1A1816] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Mensagens */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#FAF8F5]">
              {chatMessages.map((msg, i) => (
                <div 
                  key={i} 
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] p-3 rounded-2xl text-xs leading-relaxed ${
                      msg.sender === 'user' 
                        ? 'bg-[#1A1816] text-white rounded-tr-none' 
                        : 'bg-white text-[#1A1816] border border-[#E7E4DC] shadow-sm rounded-tl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {chatTyping && (
                <div className="flex justify-start">
                  <div className="bg-white text-[#736F69] border border-[#E7E4DC] p-2.5 rounded-2xl text-xs flex items-center gap-1 shadow-sm">
                    <span className="w-1.5 h-1.5 bg-[#C84B1F] rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-[#C84B1F] rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-1.5 h-1.5 bg-[#C84B1F] rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                </div>
              )}
            </div>

            {/* Input de Mensagem */}
            <form onSubmit={handleSendChatMessage} className="p-3 bg-white border-t border-[#EBE8E2] flex items-center gap-2">
              <input 
                type="text" 
                value={chatInput} 
                onChange={(e) => setChatInput(e.target.value)}
                placeholder={`Mensagem para ${name}...`}
                className="flex-1 px-4 py-2.5 rounded-xl border border-[#D0CBC0] text-xs text-[#1A1816] focus:outline-none focus:border-[#1A1816]"
              />
              <button 
                type="submit"
                className="w-10 h-10 rounded-xl bg-[#C84B1F] hover:bg-[#B34018] text-white flex items-center justify-center cursor-pointer transition-colors shadow-sm"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
