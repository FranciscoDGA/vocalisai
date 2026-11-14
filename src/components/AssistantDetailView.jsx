import React, { useState, useEffect } from 'react';
import { 
  Bot, MessageSquare, Phone, Headphones, Sparkles, Plus, X, 
  ChevronRight, ChevronDown, ChevronUp, Globe, Upload, BookOpen, 
  Sliders, Settings, Mail, Calendar, Plug, Check, CheckCircle2, 
  Info, ExternalLink, Send, ArrowLeft, MessageCircle, MoreHorizontal,
  FileText, Shield, AlertCircle, ToggleLeft, ToggleRight, Radio, RefreshCw,
  Clock, Trash2, UserCheck, Bell, PhoneForwarded, Users,
  ChevronsLeft, ChevronsUpDown, Copy
} from 'lucide-react';
import { createVapiAssistant, updateVapiAssistant, triggerOutboundCall } from '../utils/vapiService';

export default function AssistantDetailView({ 
  assistant, 
  allAssistants = [], 
  onBack, 
  onSelectAssistant, 
  onOpenCreateModal, 
  onOpenPricing,
  onUpdateAssistant,
  onDeleteAssistant
}) {
  const [subTab, setSubTab] = useState('geral'); // 'geral' | 'regras' | 'conhecimento' | 'prompt' | 'tecnico'
  const [assistantDropdownOpen, setAssistantDropdownOpen] = useState(false);
  const [typeDropdownOpen, setTypeDropdownOpen] = useState(false);
  const [promoBannerVisible, setPromoBannerVisible] = useState(true);
  const [testChatOpen, setTestChatOpen] = useState(false);
  const [addSourceDropdownOpen, setAddSourceDropdownOpen] = useState(false);
  const [activeStatus, setActiveStatus] = useState(true);

  // Vapi Real-Time Sync State
  const [vapiId, setVapiId] = useState(assistant?.vapi_assistant_id || null);
  const [syncStatus, setSyncStatus] = useState(assistant?.vapi_assistant_id ? 'synced' : 'idle');
  const [syncFeedback, setSyncFeedback] = useState('');
  const [copiedVapiId, setCopiedVapiId] = useState(false);
  const [testPhone, setTestPhone] = useState('');
  const [callingState, setCallingState] = useState(false);
  const [callFeedback, setCallFeedback] = useState('');

  // Modais Interativos das Imagens 4 a 9
  const [voiceModalOpen, setVoiceModalOpen] = useState(false);
  const [agendaModalOpen, setAgendaModalOpen] = useState(false);
  const [horarioModalOpen, setHorarioModalOpen] = useState(false);
  const [entradaModalOpen, setEntradaModalOpen] = useState(false);
  const [transferenciaModalOpen, setTransferenciaModalOpen] = useState(false);
  const [notificacoesModalOpen, setNotificacoesModalOpen] = useState(false);

  // Form State - Geral (Básico)
  const [name, setName] = useState(assistant?.name || 'Francisco Gomes');
  const [type, setType] = useState(assistant?.type || 'hibrido'); // 'chat' | 'voz' | 'hibrido'
  const [selectedVoice, setSelectedVoice] = useState({ name: 'Camila', gender: 'Feminino', accent: 'Português', avatar: 'C' });
  const [language, setLanguage] = useState('Português (Brasil)');
  const [timeout, setTimeoutVal] = useState('1 hora');
  const [sellerProfile, setSellerProfile] = useState(false);

  // Mensagens iniciais (Novo card do Chat + Ligação)
  const [welcomeMessageActive, setWelcomeMessageActive] = useState(true);
  const [welcomeMessage, setWelcomeMessage] = useState(`Olá, aqui é a ${name} da Q&C STORES. Como posso te ajudar?`);

  // Gestão de conversas
  const [entradaConversa, setEntradaConversa] = useState('A IA atende todas as conversas'); // 'ia' | 'equipe' | 'condicao'
  const [agendaResposta, setAgendaResposta] = useState('Sempre'); // 'sempre' | 'horario' | 'fora'
  const [transferenciaHabilitada, setTransferenciaHabilitada] = useState(true);
  const [transferenciaModo, setTransferenciaModo] = useState('Condições padrão'); // 'padrao' | 'personalizado' | 'apenas_personalizado'
  const [notificarEquipe, setNotificarEquipe] = useState(false);
  const [notificarEmail, setNotificarEmail] = useState(true);

  // Horário de funcionamento
  const [diasSemana, setDiasSemana] = useState(['Seg', 'Ter', 'Qua', 'Qui', 'Sex']);
  const [horarioInicio, setHorarioInicio] = useState('08:00');
  const [horarioFim, setHorarioFim] = useState('18:00');

  // Form State - Regras (Sistema)
  const [shortAnswers, setShortAnswers] = useState(true);
  const [askWhenUnclear, setAskWhenUnclear] = useState(true);
  const [politeTone, setPoliteTone] = useState(true);
  const [objectiveQuestions, setObjectiveQuestions] = useState(true);

  // Form State - Regras (Suas regras - Dropdowns das Imagens 12 e 13)
  const [aiNotice, setAiNotice] = useState('Somente se perguntado');
  const [aiNoticeDropdownOpen, setAiNoticeDropdownOpen] = useState(false);
  const [commStyle, setCommStyle] = useState('Padrão');
  const [commStyleDropdownOpen, setCommStyleDropdownOpen] = useState(false);

  // Form State - Conhecimento
  const [knowledgeActive, setKnowledgeActive] = useState(true);
  const [knowledgeTab, setKnowledgeTab] = useState('fontes');

  // Form State - Prompt (Frase exata 1:1 do Kloel para Chat + Ligação, Chat e Voz)
  const getPromptForType = (t, n) => {
    if (t === 'hibrido') {
      return `Você é a ${n} – a mesma assistente no chat e na ligação, com a mesma memória e o mesmo tom.`;
    }
    if (t === 'chat') {
      return `Você é a ${n} – uma assistente de chat que responde às perguntas de forma amigável.`;
    }
    return `Você é a ${n} – uma assistente de voz baseada em telefone que atende chamadas com naturalidade.`;
  };

  const [promptText, setPromptText] = useState(
    assistant?.prompt || getPromptForType(assistant?.type || 'hibrido', assistant?.name || 'Francisco Gomes')
  );

  // Form State - Técnico (12 cards exatos do Print 2 de Técnico)
  const [maxDuration, setMaxDuration] = useState('20');
  const [maxWait, setMaxWait] = useState('10');
  const [recordAudio, setRecordAudio] = useState(false);
  const [autoDelete, setAutoDelete] = useState(false);
  const [ambientSound, setAmbientSound] = useState('Sem sons ambiente');
  const [ambientVolume, setAmbientVolume] = useState(25);
  const [technicalTerms, setTechnicalTerms] = useState('');
  const [speechSpeed, setSpeechSpeed] = useState(50);
  const [sensitivity, setSensitivity] = useState(45);
  const [temperature, setTemperature] = useState(15);
  const [freeTransfer, setFreeTransfer] = useState(false);
  const [dtmfEnabled, setDtmfEnabled] = useState(false);
  const [blockInitialInterrupt, setBlockInitialInterrupt] = useState(true);
  const [blockAllInterrupts, setBlockAllInterrupts] = useState(false);
  const [responsePace, setResponsePace] = useState('Normal');
  const [infoExtractionList, setInfoExtractionList] = useState([]);

  // Interactive Live Test Chat State
  const [chatMessages, setChatMessages] = useState([
    { sender: 'assistant', text: `Olá! Sou a ${name}, assistente virtual da empresa. Como posso te ajudar hoje?` }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [chatTyping, setChatTyping] = useState(false);

  // Lista de Vozes 1:1 do Kloel (Imagem 4)
  const brazilianVoices = [
    { name: 'Joana', gender: 'Feminino', accent: 'Português', avatar: '👩🏾' },
    { name: 'Joana (Mineiro)', gender: 'Feminino', accent: 'Português (Mineiro)', avatar: '👩🏾' },
    { name: 'Marcelo', gender: 'Masculino', accent: 'Português', avatar: '👨🏻' },
    { name: 'Marcelo (Carioca)', gender: 'Masculino', accent: 'Português (Carioca)', avatar: '👨🏻' },
    { name: 'Eduardo', gender: 'Masculino', accent: 'Português', avatar: '👨🏾' },
    { name: 'Eduardo (Gaúcho)', gender: 'Masculino', accent: 'Português (Gaúcho)', avatar: '👨🏾' },
    { name: 'Gabriela', gender: 'Feminino', accent: 'Português', avatar: '👩🏼' },
    { name: 'Bruna', gender: 'Feminino', accent: 'Português', avatar: '👩🏻' },
    { name: 'Carla', gender: 'Feminino', accent: 'Português', avatar: '👩🏽' },
    { name: 'Camila', gender: 'Feminino', accent: 'Português', avatar: '👩🏻' }
  ];

  const handleSendChatMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = chatInput.trim();
    setChatMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setChatInput('');
    setChatTyping(true);

    setTimeout(() => {
      let reply = `Com certeza! Entendi perfeitamente sua dúvida sobre "${userMsg}". Como sou uma assistente completa de Chat + Ligação, posso tanto te responder por aqui no WhatsApp quanto te ligar agora mesmo se preferir!`;
      if (userMsg.toLowerCase().includes('preço') || userMsg.toLowerCase().includes('valor') || userMsg.toLowerCase().includes('plano')) {
        reply = `Temos planos a partir de R$ 209/mês para WhatsApp e Chatbot, e planos completos com ligações de voz a partir de R$ 503/mês. Gostaria que eu reserve uma demonstração gratuita ou prefere receber o resumo?`;
      } else if (userMsg.toLowerCase().includes('olá') || userMsg.toLowerCase().includes('oi')) {
        reply = welcomeMessage;
      }
      setChatMessages(prev => [...prev, { sender: 'assistant', text: reply }]);
      setChatTyping(false);
    }, 800);
  };

  const toggleDiaSemana = (dia) => {
    if (diasSemana.includes(dia)) {
      setDiasSemana(diasSemana.filter(d => d !== dia));
    } else {
      setDiasSemana([...diasSemana, dia]);
    }
  };

  // Sincroniza estado quando o assistente prop mudar
  useEffect(() => {
    if (assistant) {
      setName(assistant.name || 'Assistente');
      setType(assistant.type || 'hibrido');
      setVapiId(assistant.vapi_assistant_id || null);
      setSyncStatus(assistant.vapi_assistant_id ? 'synced' : 'idle');
      if (assistant.prompt) setPromptText(assistant.prompt);
    }
  }, [assistant]);

  // Handler para Salvar Alterações e Sincronizar com a Vapi & Supabase
  const handleSaveAndSync = async () => {
    setSyncStatus('syncing');
    setSyncFeedback('Sincronizando com a Vapi...');

    try {
      let currentVapiId = vapiId;

      if (currentVapiId) {
        // Atualiza na Vapi
        const updateRes = await updateVapiAssistant(currentVapiId, {
          name,
          systemPrompt: promptText,
          firstMessage: welcomeMessageActive ? welcomeMessage : undefined,
          voiceId: 'Clara'
        });

        if (!updateRes.success) {
          console.warn('Falha no update da Vapi, tentando criar assistente:', updateRes.error);
          const createRes = await createVapiAssistant({
            name,
            systemPrompt: promptText,
            firstMessage: welcomeMessage,
            voiceId: 'Clara'
          });
          if (createRes.success && createRes.assistantId) {
            currentVapiId = createRes.assistantId;
            setVapiId(currentVapiId);
          }
        }
      } else {
        // Cria na Vapi
        const createRes = await createVapiAssistant({
          name,
          systemPrompt: promptText,
          firstMessage: welcomeMessage,
          voiceId: 'Clara'
        });

        if (createRes.success && createRes.assistantId) {
          currentVapiId = createRes.assistantId;
          setVapiId(currentVapiId);
        }
      }

      if (onUpdateAssistant) {
        await onUpdateAssistant({
          id: assistant.id,
          name,
          type,
          prompt: promptText,
          voice: selectedVoice.name,
          channel: type === 'voz' ? 'Telefone (11) 4003-9821' : type === 'chat' ? 'WhatsApp Oficial' : 'Telefone + WhatsApp',
          vapi_assistant_id: currentVapiId
        });
      }

      setSyncStatus('synced');
      setSyncFeedback('Assistente salvo e sincronizado com a telefonia Vapi!');
      setTimeout(() => setSyncFeedback(''), 4000);
    } catch (err) {
      console.error('Erro ao sincronizar:', err);
      setSyncStatus('error');
      setSyncFeedback('Erro ao sincronizar: ' + err.message);
    }
  };

  const handleCopyVapiId = () => {
    if (vapiId) {
      navigator.clipboard.writeText(vapiId);
      setCopiedVapiId(true);
      setTimeout(() => setCopiedVapiId(false), 2000);
    }
  };

  const handleDirectTestCall = async (e) => {
    e.preventDefault();
    const cleanNumber = testPhone.replace(/\D/g, '');
    if (cleanNumber.length < 10) {
      setCallFeedback('Digite um número de celular válido com DDD.');
      return;
    }

    setCallingState(true);
    setCallFeedback('Discando através da Vapi com este assistente...');

    try {
      const res = await triggerOutboundCall(testPhone, '+55', vapiId);
      setCallingState(false);
      if (res.success) {
        setCallFeedback('✅ Ligação disparada com sucesso! Seu telefone vai tocar em instantes.');
      } else {
        setCallFeedback(`Aviso Vapi: ${res.error || 'Verifique seus créditos na conta Vapi.'}`);
      }
    } catch (err) {
      setCallingState(false);
      setCallFeedback('Erro ao disparar chamada: ' + err.message);
    }

    setTimeout(() => setCallFeedback(''), 8000);
  };

  return (
    <div className="flex-1 flex flex-col md:flex-row min-h-screen bg-white relative">
      
      {/* ========================================================
          SUB-SIDEBAR (Sidebar 2 - Detalhes do Agente - Réplica Exata 1:1 Kloel)
         ======================================================== */}
      <div className="w-full md:w-64 bg-[#FAF9F5] border-r border-[#EBE8E2] p-4 flex flex-col justify-between shrink-0">
        <div>
          {/* Header com Nome do Agente + Botão « + Seletor ChevronsUpDown + Botão + (Réplica Exata Print Zoom) */}
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#EBE8E2]">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <button 
                onClick={onBack}
                className="w-7 h-7 rounded-lg border border-[#E7E4DC] hover:border-[#D0CBC0] bg-white flex items-center justify-center text-[#736F69] hover:text-[#1A1816] transition-colors cursor-pointer shrink-0 shadow-xs"
                title="Voltar para a lista de assistentes"
              >
                <ChevronsLeft className="w-3.5 h-3.5" />
              </button>

              <div className="relative">
                <button
                  type="button"
                  onClick={() => setAssistantDropdownOpen(!assistantDropdownOpen)}
                  className="flex items-center gap-2 text-left group cursor-pointer"
                >
                  <div className="overflow-hidden">
                    <h3 className="text-sm font-bold text-[#1A1816] truncate max-w-[110px] leading-tight">
                      {name}
                    </h3>
                    <span className="text-[11px] text-[#736F69] block leading-tight">
                      {type === 'hibrido' ? 'Chat + Ligação' : type === 'chat' ? 'Assistente de chat' : 'Assistente de voz'}
                    </span>
                  </div>
                  <ChevronsUpDown className="w-3.5 h-3.5 text-[#8C8881] group-hover:text-[#1A1816] shrink-0" />
                </button>

                {assistantDropdownOpen && (
                  <div className="absolute top-10 left-0 w-52 bg-white rounded-xl border border-[#E7E4DC] shadow-xl p-1 z-50 text-xs animate-fadeIn">
                    <div className="px-2.5 py-1 text-[10px] font-bold text-[#8C8881] uppercase tracking-wider">
                      Seus assistentes
                    </div>
                    {allAssistants.map(a => (
                      <button
                        key={a.id}
                        onClick={() => {
                          if (onSelectAssistant) onSelectAssistant(a);
                          setAssistantDropdownOpen(false);
                        }}
                        className={`w-full px-2.5 py-2 rounded-lg text-left flex items-center justify-between font-medium cursor-pointer transition-colors ${
                          assistant?.id === a.id ? 'bg-[#FAF5EE] text-[#C84B1F] font-bold' : 'hover:bg-[#FAF9F5] text-[#1A1816]'
                        }`}
                      >
                        <span className="truncate">{a.name}</span>
                        <span className="text-[10px] text-[#736F69]">{a.type}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Botão + no canto superior direito do sub-sidebar */}
            <button
              onClick={onOpenCreateModal}
              className="w-8 h-8 rounded-xl border border-[#E7E4DC] hover:border-[#D0CBC0] bg-white flex items-center justify-center text-[#1A1816] font-bold cursor-pointer transition-colors shadow-xs"
              title="Novo assistente"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Sub-menu Tabs (Geral, Regras, Conhecimento, Prompt personalizado, Técnico) */}
          <div className="space-y-1">
            {[
              { id: 'geral', label: 'Geral' },
              { id: 'regras', label: 'Regras' },
              { id: 'conhecimento', label: 'Conhecimento' },
              { id: 'prompt', label: 'Prompt personalizado' },
              ...((type === 'hibrido' || type === 'voz') ? [{ id: 'tecnico', label: 'Técnico' }] : [])
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSubTab(tab.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer text-left ${
                  subTab === tab.id 
                    ? 'bg-[#EFECE6] text-[#1A1816]' 
                    : 'text-[#5C5955] hover:text-[#1A1816] hover:bg-[#F3EFE8]'
                }`}
              >
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Promo Card: Conheça seu chatbot de IA (Réplica 1:1 Kloel) */}
        {promoBannerVisible && (
          <div className="mt-8 p-3.5 rounded-2xl bg-gradient-to-b from-[#FFF5F0] to-[#FAF5EE] border border-[#F3E2D5] relative animate-fadeIn">
            <button 
              onClick={() => setPromoBannerVisible(false)}
              className="absolute right-2.5 top-2.5 text-[#8C8881] hover:text-[#1A1816] cursor-pointer"
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
            BARRA FIXA DE SINCRONIZAÇÃO EM TEMPO REAL COM A VAPI
           ======================================================== */}
        <div className="mb-6 p-4 rounded-2xl bg-[#FAF9F5] border border-[#E7E4DC] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full shrink-0 ${
              vapiId ? 'bg-emerald-500 animate-pulse' : 'bg-amber-400'
            }`} />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#1A1816]">{name}</span>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                  vapiId ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
                }`}>
                  {vapiId ? 'Sincronizado na Telefonia Vapi' : 'Pendente de sincronização'}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                {vapiId ? (
                  <button 
                    type="button"
                    onClick={handleCopyVapiId}
                    className="text-[11px] font-mono text-[#736F69] hover:text-[#1A1816] flex items-center gap-1 cursor-pointer"
                    title="Clique para copiar o ID Vapi"
                  >
                    <span>ID: {vapiId}</span>
                    <Copy className="w-3 h-3" />
                    {copiedVapiId && <span className="text-emerald-600 font-sans font-bold">Copiado!</span>}
                  </button>
                ) : (
                  <span className="text-[11px] text-[#736F69]">Clique em salvar para sincronizar com a Vapi</span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleSaveAndSync}
              disabled={syncStatus === 'syncing'}
              className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-[#1A1816] hover:bg-black text-white text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              {syncStatus === 'syncing' ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Sincronizando...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-[#FF9E7D]" />
                  <span>Salvar & Sincronizar na Vapi</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Feedback Alert Toast */}
        {syncFeedback && (
          <div className={`mb-6 p-3.5 rounded-xl border text-xs font-semibold flex items-center gap-2 animate-fadeIn ${
            syncStatus === 'error' 
              ? 'bg-rose-50 border-rose-200 text-rose-800' 
              : 'bg-emerald-50 border-emerald-200 text-emerald-800'
          }`}>
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
            <span>{syncFeedback}</span>
          </div>
        )}
        
        {/* ========================================================
            SUB-TAB 1: GERAL (Réplica Exata Prints 1 e 2)
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
                
                {/* 1. Nome */}
                <div className="p-3.5 flex items-center justify-between">
                  <label className="text-xs font-semibold text-[#1A1816]">Nome</label>
                  <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                    className="w-64 px-3 py-1.5 rounded-xl border border-[#E7E4DC] text-xs text-[#1A1816] focus:outline-none focus:border-[#1A1816]"
                  />
                </div>

                {/* 2. Tipo (com dropdown customizado 1:1 Print 3) */}
                <div className="p-3.5 flex items-center justify-between relative">
                  <label className="text-xs font-semibold text-[#1A1816]">Tipo</label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setTypeDropdownOpen(!typeDropdownOpen)}
                      className="px-3 py-1.5 rounded-xl border border-[#E7E4DC] text-xs text-[#1A1816] bg-white flex items-center gap-1.5 hover:border-[#D0CBC0] cursor-pointer"
                    >
                      <span>{type === 'voz' ? 'Assistente de voz' : type === 'chat' ? 'Assistente de chat' : 'Chat + Ligação'}</span>
                      <ChevronDown className="w-3.5 h-3.5 text-[#8C8881]" />
                    </button>

                    {typeDropdownOpen && (
                      <div className="absolute right-0 top-10 w-52 bg-white rounded-xl border border-[#E7E4DC] shadow-xl p-1 z-50 text-xs animate-fadeIn">
                        {[
                          { id: 'voz', label: 'Assistente de voz' },
                          { id: 'chat', label: 'Assistente de chat' },
                          { id: 'hibrido', label: 'Chat + Ligação' }
                        ].map((opt) => (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => {
                              setType(opt.id);
                              setTypeDropdownOpen(false);
                            }}
                            className="w-full px-3 py-2 rounded-lg text-left hover:bg-[#FAF9F5] flex items-center justify-between font-medium cursor-pointer"
                          >
                            <span>{opt.label}</span>
                            {type === opt.id && <Check className="w-3.5 h-3.5 text-[#1A1816]" />}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* 3. Voz (Apenas quando Chat + Ligação ou Assistente de voz - Print 1 & 4) */}
                {(type === 'hibrido' || type === 'voz') && (
                  <div className="p-3.5 flex items-center justify-between">
                    <label className="text-xs font-semibold text-[#1A1816]">Voz</label>
                    <button
                      type="button"
                      onClick={() => setVoiceModalOpen(true)}
                      className="px-3 py-1.5 rounded-xl border border-[#E7E4DC] text-xs text-[#1A1816] bg-white flex items-center gap-2 hover:border-[#D0CBC0] cursor-pointer"
                    >
                      <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold">
                        {selectedVoice.name[0]}
                      </span>
                      <span className="font-medium">{selectedVoice.name}</span>
                      <ChevronDown className="w-3.5 h-3.5 text-[#8C8881]" />
                    </button>
                  </div>
                )}

                {/* 4. Idioma */}
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
                    <option value="Português (Brasil)">Português (Brasil)</option>
                    <option value="English (US)">English (US)</option>
                    <option value="Español">Español</option>
                  </select>
                </div>

                {/* 5. Tempo limite da conversa */}
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

            {/* Seção: Gestão de conversas (Com modais interativos 1:1 Prints 5 a 9) */}
            <div className="space-y-3">
              <span className="text-[11px] font-bold text-[#8C8881] uppercase tracking-wider">Gestão de conversas</span>
              <div className="rounded-2xl border border-[#E7E4DC] overflow-hidden divide-y divide-[#EBE8E2]">
                
                {/* Entrada da conversa */}
                <div 
                  onClick={() => setEntradaModalOpen(true)}
                  className="p-3.5 flex items-center justify-between hover:bg-[#FAF9F5] cursor-pointer transition-colors"
                >
                  <span className="text-xs font-semibold text-[#1A1816]">Entrada da conversa</span>
                  <span className="text-xs text-[#736F69] flex items-center gap-1 font-medium">
                    {entradaConversa.includes('IA') ? 'IA' : 'Equipe'} <ChevronRight className="w-3.5 h-3.5 text-[#8C8881]" />
                  </span>
                </div>

                {/* Agenda de resposta */}
                <div 
                  onClick={() => setAgendaModalOpen(true)}
                  className="p-3.5 flex items-center justify-between hover:bg-[#FAF9F5] cursor-pointer transition-colors"
                >
                  <span className="text-xs font-semibold text-[#1A1816]">Agenda de resposta</span>
                  <span className="text-xs text-[#736F69] flex items-center gap-1 font-medium">
                    {agendaResposta} <ChevronRight className="w-3.5 h-3.5 text-[#8C8881]" />
                  </span>
                </div>

                {/* Transferência de conversa ativa */}
                <div 
                  onClick={() => setTransferenciaModalOpen(true)}
                  className="p-3.5 flex items-center justify-between hover:bg-[#FAF9F5] cursor-pointer transition-colors"
                >
                  <span className="text-xs font-semibold text-[#1A1816]">Transferência de conversa ativa</span>
                  <span className="text-xs text-[#736F69] flex items-center gap-1 font-medium">
                    Padrão <ChevronRight className="w-3.5 h-3.5 text-[#8C8881]" />
                  </span>
                </div>

                {/* Notificações da equipe */}
                <div 
                  onClick={() => setNotificacoesModalOpen(true)}
                  className="p-3.5 flex items-center justify-between hover:bg-[#FAF9F5] cursor-pointer transition-colors"
                >
                  <span className="text-xs font-semibold text-[#1A1816]">Notificações da equipe</span>
                  <span className="text-xs text-[#736F69] flex items-center gap-1 font-medium">
                    {notificarEquipe ? 'Ligado' : 'Desligado'} <ChevronRight className="w-3.5 h-3.5 text-[#8C8881]" />
                  </span>
                </div>
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

            {/* Seção: Mensagens iniciais (Exclusivo do Chat + Ligação - Print 2) */}
            <div className="space-y-3">
              <div className="p-4 rounded-2xl border border-[#E7E4DC] bg-white space-y-3">
                <span className="text-[11px] font-bold text-[#8C8881] uppercase tracking-wider block">Mensagens iniciais</span>
                <p className="text-xs text-[#1A1816] leading-relaxed">
                  {welcomeMessage}
                </p>
                <div className="pt-2 border-t border-[#F0EDE8] flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#1A1816]">Personalizar</span>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => {
                        const newMsg = prompt("Digite a nova mensagem inicial:", welcomeMessage);
                        if (newMsg) setWelcomeMessage(newMsg);
                      }}
                      className="p-1.5 rounded-lg hover:bg-[#FAF9F5] text-[#736F69] cursor-pointer"
                      title="Editar mensagem inicial"
                    >
                      <Settings className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setWelcomeMessageActive(!welcomeMessageActive)}
                      className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                        welcomeMessageActive ? 'bg-[#C84B1F]' : 'bg-[#E7E4DC]'
                      }`}
                    >
                      <span className={`w-5 h-5 rounded-full bg-white shadow-sm absolute top-0.5 transition-transform ${
                        welcomeMessageActive ? 'left-5.5' : 'left-0.5'
                      }`} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Seção: Recursos (8 Cards no Chat + Ligação - Print 2) */}
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

                {/* 2. Transferir ligações (Novo do Chat + Ligação) */}
                <div className="p-4 rounded-2xl border border-[#E7E4DC] border-dashed bg-white flex flex-col justify-between min-h-[95px] hover:border-[#D0CBC0] transition-colors cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div className="w-7 h-7 rounded-lg bg-gray-50 text-[#736F69] flex items-center justify-center">
                      <PhoneForwarded className="w-4 h-4" />
                    </div>
                    <span className="w-5 h-5 rounded-full border border-[#D0CBC0] text-[#736F69] flex items-center justify-center text-xs">
                      +
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-[#5C5955] mt-3">Transferir ligações</span>
                </div>

                {/* 3. Enviar e-mail */}
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

                {/* 4. Enviar WhatsApp (Novo do Chat + Ligação) */}
                <div className="p-4 rounded-2xl border border-[#E7E4DC] border-dashed bg-white flex flex-col justify-between min-h-[95px] hover:border-[#D0CBC0] transition-colors cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div className="w-7 h-7 rounded-lg bg-gray-50 text-[#736F69] flex items-center justify-center">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <span className="w-5 h-5 rounded-full border border-[#D0CBC0] text-[#736F69] flex items-center justify-center text-xs">
                      +
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-[#5C5955] mt-3">Enviar WhatsApp</span>
                </div>

                {/* 5. Agendar compromissos */}
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

                {/* 6. Pesquisa na web */}
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

                {/* 7. Integrações */}
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

                {/* 8. Webhooks */}
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
            SUB-TAB 2: REGRAS (Réplica Exata Prints 10 a 13)
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

            {/* Seção: Suas regras (Com dropdowns 1:1 Prints 12 e 13) */}
            <div className="space-y-3">
              <span className="text-[11px] font-bold text-[#8C8881] uppercase tracking-wider">Suas regras</span>
              <div className="rounded-2xl border border-[#E7E4DC] overflow-hidden divide-y divide-[#EBE8E2]">
                
                {/* Aviso de IA (Dropdown 1:1 Print 12) */}
                <div className="p-4 flex items-center justify-between relative">
                  <div>
                    <h4 className="text-xs font-bold text-[#1A1816]">Aviso de IA</h4>
                    <p className="text-xs text-[#736F69] mt-0.5">Se e quando o seu assistente menciona que é uma IA</p>
                  </div>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setAiNoticeDropdownOpen(!aiNoticeDropdownOpen)}
                      className="px-3 py-1.5 rounded-xl border border-[#E7E4DC] text-xs text-[#1A1816] bg-white flex items-center gap-1.5 hover:border-[#D0CBC0] cursor-pointer"
                    >
                      <span>{aiNotice}</span>
                      <ChevronDown className="w-3.5 h-3.5 text-[#8C8881]" />
                    </button>

                    {aiNoticeDropdownOpen && (
                      <div className="absolute right-0 top-10 w-64 bg-white rounded-xl border border-[#E7E4DC] shadow-xl p-1 z-50 text-xs animate-fadeIn">
                        {[
                          'Não mencionar',
                          'Somente se perguntado',
                          'No início da conversa',
                          'No início, consentimento obrigatório'
                        ].map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => {
                              setAiNotice(opt);
                              setAiNoticeDropdownOpen(false);
                            }}
                            className="w-full px-3 py-2 rounded-lg text-left hover:bg-[#FAF9F5] flex items-center justify-between font-medium cursor-pointer"
                          >
                            <span>{opt}</span>
                            {aiNotice === opt && <Check className="w-3.5 h-3.5 text-[#1A1816]" />}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Estilo de comunicação (Dropdown 1:1 Print 13) */}
                <div className="p-4 flex items-center justify-between relative">
                  <div>
                    <h4 className="text-xs font-bold text-[#1A1816]">Estilo de comunicação</h4>
                    <p className="text-xs text-[#736F69] mt-0.5">Tom com que o seu assistente se comunica</p>
                  </div>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setCommStyleDropdownOpen(!commStyleDropdownOpen)}
                      className="px-3 py-1.5 rounded-xl border border-[#E7E4DC] text-xs text-[#1A1816] bg-white flex items-center gap-1.5 hover:border-[#D0CBC0] cursor-pointer"
                    >
                      <span>{commStyle}</span>
                      <ChevronDown className="w-3.5 h-3.5 text-[#8C8881]" />
                    </button>

                    {commStyleDropdownOpen && (
                      <div className="absolute right-0 top-10 w-56 bg-white rounded-xl border border-[#E7E4DC] shadow-xl p-1 z-50 text-xs animate-fadeIn">
                        {[
                          'Padrão',
                          'Profissional e amigável',
                          'Casual e descontraído',
                          'Formal e objetivo',
                          'Empático e acolhedor'
                        ].map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => {
                              setCommStyle(opt);
                              setCommStyleDropdownOpen(false);
                            }}
                            className="w-full px-3 py-2 rounded-lg text-left hover:bg-[#FAF9F5] flex items-center justify-between font-medium cursor-pointer"
                          >
                            <span>{opt}</span>
                            {commStyle === opt && <Check className="w-3.5 h-3.5 text-[#1A1816]" />}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
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
            SUB-TAB 3: CONHECIMENTO
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

              <button 
                onClick={() => setHorarioModalOpen(true)}
                className="text-xs font-medium text-[#736F69] hover:text-[#1A1816] flex items-center gap-1 cursor-pointer"
              >
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
                      className="w-full px-3 py-2 rounded-lg text-left hover:bg-[#FAF9F5] flex items-center gap-2 font-medium cursor-pointer"
                    >
                      <Globe className="w-4 h-4 text-[#0284C7]" />
                      <span>Site</span>
                    </button>
                    <button 
                      onClick={() => setAddSourceDropdownOpen(false)}
                      className="w-full px-3 py-2 rounded-lg text-left hover:bg-[#FAF9F5] flex items-center gap-2 font-medium cursor-pointer"
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
            SUB-TAB 4: PROMPT PERSONALIZADO
           ======================================================== */}
        {subTab === 'prompt' && (
          <div className="max-w-3xl space-y-6 animate-fadeIn">
            <h2 className="text-2xl font-bold text-[#1A1816]">Prompt personalizado</h2>

            <div className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#E7E4DC] flex items-start gap-3">
              <span className="text-amber-500 mt-0.5">💡</span>
              <div className="text-xs text-[#5C5955] leading-relaxed">
                Um papel claro, instruções concretas e exemplos deixam seu assistente muito mais confiável.{' '}
                <a href="#dicas-prompt" className="text-[#1A1816] font-semibold underline underline-offset-2">
                  Como escrever um bom prompt ↗
                </a>
              </div>
            </div>

            <div className="rounded-2xl border border-[#E7E4DC] p-4 bg-white focus-within:border-[#1A1816] transition-colors">
              <textarea 
                value={promptText}
                onChange={(e) => setPromptText(e.target.value)}
                rows={14}
                className="w-full text-sm text-[#1A1816] placeholder-[#8C8881] focus:outline-none resize-none leading-relaxed"
                placeholder="Ex: Você é a Francisco Gomes – uma assistente de chat e telefone..."
              />
              <div className="pt-2 text-right border-t border-[#F0EDE8]">
                <span className="text-[11px] text-[#8C8881]">
                  {promptText.length} / 100.000 caracteres
                </span>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            SUB-TAB 5: TÉCNICO (Réplica 1:1 Completa Prints 1 e 2 de Técnico)
           ======================================================== */}
        {subTab === 'tecnico' && (
          <div className="max-w-3xl space-y-4 animate-fadeIn pb-12">
            <h2 className="text-2xl font-bold text-[#1A1816]">Técnico</h2>

            {/* CARD ESPECIAL: Conexão Direta com Telefonia Vapi AI */}
            <div className="p-5 rounded-2xl border-2 border-[#C84B1F]/20 bg-gradient-to-br from-[#FFFBF8] to-[#FAF5EE] space-y-4 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#F0E6DC]">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#C84B1F] text-white flex items-center justify-center font-bold shadow-xs">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-[#1A1816]">Motor de Voz & Telefonia Neural (Vapi AI)</h3>
                    <p className="text-[11px] text-[#736F69]">Sincronização em tempo real de latência ultra-baixa (&lt;450ms)</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1.5 ${
                    vapiId ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${vapiId ? 'bg-emerald-600 animate-pulse' : 'bg-amber-600'}`} />
                    {vapiId ? 'Conectado à Vapi' : 'Pendente de sincronização'}
                  </span>
                </div>
              </div>

              {/* Grid de Parâmetros Técnicos Vapi */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-white border border-[#E7E4DC]">
                  <span className="text-[10px] font-bold text-[#8C8881] block uppercase">Transcritor (STT)</span>
                  <span className="font-semibold text-[#1A1816] mt-0.5 block">Deepgram Nova-2</span>
                  <span className="text-[10px] text-[#736F69]">Português Brasileiro (pt-BR)</span>
                </div>

                <div className="p-3 rounded-xl bg-white border border-[#E7E4DC]">
                  <span className="text-[10px] font-bold text-[#8C8881] block uppercase">Modelo Cognitivo (LLM)</span>
                  <span className="font-semibold text-[#1A1816] mt-0.5 block">OpenAI GPT-4o Mini</span>
                  <span className="text-[10px] text-[#736F69]">Modo Stream Ativo</span>
                </div>

                <div className="p-3 rounded-xl bg-white border border-[#E7E4DC]">
                  <span className="text-[10px] font-bold text-[#8C8881] block uppercase">Voz Neural (TTS)</span>
                  <span className="font-semibold text-[#1A1816] mt-0.5 block">Vapi Neural (Clara)</span>
                  <span className="text-[10px] text-[#736F69]">Entonação Humanizada</span>
                </div>
              </div>

              {/* Teste de Chamada Outbound Real com este Assistente */}
              <form onSubmit={handleDirectTestCall} className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                <div className="flex-1 relative">
                  <input
                    type="tel"
                    value={testPhone}
                    onChange={(e) => setTestPhone(e.target.value)}
                    placeholder="Seu celular: (11) 98765-4321"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D0CBC0] bg-white text-xs font-medium text-[#1A1816] focus:outline-none focus:border-[#C84B1F]"
                  />
                </div>
                <button
                  type="submit"
                  disabled={callingState}
                  className="px-4 py-2.5 rounded-xl bg-[#C84B1F] hover:bg-[#B34018] text-white text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm disabled:opacity-60"
                >
                  {callingState ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Discando...</span>
                    </>
                  ) : (
                    <>
                      <Phone className="w-3.5 h-3.5" />
                      <span>Testar Ligação Agora</span>
                    </>
                  )}
                </button>
              </form>

              {callFeedback && (
                <div className="text-xs font-medium text-[#1A1816] bg-white/80 p-2.5 rounded-lg border border-[#E7E4DC] animate-fadeIn">
                  {callFeedback}
                </div>
              )}
            </div>

            {/* 1. Guardrails e moderação de conteúdo */}
            <div className="p-4 rounded-2xl border border-[#E7E4DC] bg-white flex items-start gap-3">
              <input 
                type="checkbox" 
                checked={true} 
                readOnly 
                className="w-4 h-4 rounded text-[#1A1816] mt-0.5 accent-[#1A1816]"
              />
              <div>
                <h4 className="text-xs font-bold text-[#1A1816]">Guardrails e moderação de conteúdo</h4>
                <p className="text-xs text-[#736F69] mt-1 leading-relaxed">
                  Monitora automaticamente as conversas em busca de violência, conteúdo sexual, assédio, discurso de ódio e outros conteúdos prejudiciais. Sempre ativado para garantir que cada conversa permaneça segura e profissional.
                </p>
              </div>
            </div>

            {/* 2. Duração máxima da ligação & Tempo máximo de espera */}
            <div className="p-4 rounded-2xl border border-[#E7E4DC] bg-white grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <h4 className="text-xs font-bold text-[#1A1816]">Duração máxima da ligação</h4>
                <p className="text-xs text-[#736F69] mt-0.5 mb-2 leading-relaxed">
                  Depois desse tempo (em minutos), a ligação é encerrada automaticamente
                </p>
                <input 
                  type="text" 
                  value={maxDuration} 
                  onChange={(e) => setMaxDuration(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#D0CBC0] text-xs font-bold text-[#1A1816] focus:outline-none focus:border-[#1A1816]"
                />
              </div>

              <div>
                <h4 className="text-xs font-bold text-[#1A1816]">Tempo máximo de espera</h4>
                <p className="text-xs text-[#736F69] mt-0.5 mb-2 leading-relaxed">
                  Depois desse tempo (em segundos) sem resposta, a ligação é encerrada
                </p>
                <input 
                  type="text" 
                  value={maxWait} 
                  onChange={(e) => setMaxWait(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#D0CBC0] text-xs font-bold text-[#1A1816] focus:outline-none focus:border-[#1A1816]"
                />
              </div>
            </div>

            {/* 3. Gravar áudio */}
            <div className="p-4 rounded-2xl border border-[#E7E4DC] bg-white flex items-start gap-3">
              <input 
                type="checkbox" 
                checked={recordAudio} 
                onChange={(e) => setRecordAudio(e.target.checked)}
                className="w-4 h-4 rounded text-[#1A1816] mt-0.5 accent-[#1A1816] cursor-pointer"
              />
              <div>
                <h4 className="text-xs font-bold text-[#1A1816]">Gravar áudio</h4>
                <p className="text-xs text-[#736F69] mt-1 leading-relaxed">
                  Um arquivo de áudio será gravado e ficará disponível por 30 dias. O assistente deve informar no começo da conversa que a ligação está sendo gravada!
                </p>
              </div>
            </div>

            {/* 4. Exclusão automática (recomendado) */}
            <div className="p-4 rounded-2xl border border-[#E7E4DC] bg-white flex items-start gap-3">
              <input 
                type="checkbox" 
                checked={autoDelete} 
                onChange={(e) => setAutoDelete(e.target.checked)}
                className="w-4 h-4 rounded text-[#1A1816] mt-0.5 accent-[#1A1816] cursor-pointer"
              />
              <div>
                <h4 className="text-xs font-bold text-[#1A1816]">Exclusão automática (recomendado)</h4>
                <p className="text-xs text-[#736F69] mt-1 leading-relaxed">
                  Se a pessoa recusar a gravação, a gravação e a transcrição serão excluídas automaticamente, e nenhuma ação pós-ligação ou extração será executada. Recomendamos escrever no prompt que, em caso de recusa, a ligação deve ser encerrada ou transferida!
                </p>
              </div>
            </div>

            {/* 5. Sons ambiente & Volume do som ambiente */}
            <div className="p-4 rounded-2xl border border-[#E7E4DC] bg-white grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <h4 className="text-xs font-bold text-[#1A1816]">Sons ambiente</h4>
                <select 
                  value={ambientSound}
                  onChange={(e) => setAmbientSound(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#D0CBC0] text-xs text-[#1A1816] mt-2 bg-white focus:outline-none cursor-pointer"
                >
                  <option value="Sem sons ambiente">Sem sons ambiente</option>
                  <option value="Escritório suave">Escritório suave</option>
                  <option value="Central de atendimento / Call center">Central de atendimento / Call center</option>
                  <option value="Cafeteria">Cafeteria</option>
                </select>
                <button 
                  onClick={() => setAmbientSound('Sem sons ambiente')}
                  className="text-[11px] text-[#8C8881] hover:text-[#1A1816] mt-1.5 inline-block cursor-pointer"
                >
                  Limpar seleção
                </button>
              </div>

              <div>
                <h4 className="text-xs font-bold text-[#1A1816]">Volume do som ambiente</h4>
                <div className="mt-3">
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={ambientVolume} 
                    onChange={(e) => setAmbientVolume(e.target.value)}
                    className="w-full accent-[#1A1816] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-[#8C8881] mt-1">
                    <span>Baixo</span>
                    <span>Alto</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 6. Termos técnicos, Velocidade da fala & Sensibilidade */}
            <div className="p-4 rounded-2xl border border-[#E7E4DC] bg-white space-y-4">
              <div>
                <h4 className="text-xs font-bold text-[#1A1816]">Termos técnicos</h4>
                <p className="text-xs text-[#736F69] mt-0.5 mb-2 leading-relaxed">
                  Armazene palavras raras e termos técnicos (por exemplo: nomes de produtos, ruas ou colaboradores) para que a IA os reconheça corretamente. Confirme com Enter.
                </p>
                <input 
                  type="text" 
                  value={technicalTerms}
                  onChange={(e) => setTechnicalTerms(e.target.value)}
                  placeholder="Ex: Omnichannel, Francisco, Vocalis..."
                  className="w-full px-3 py-2 rounded-xl border border-[#D0CBC0] text-xs text-[#1A1816] focus:outline-none focus:border-[#1A1816]"
                />
              </div>

              <div>
                <h4 className="text-xs font-bold text-[#1A1816]">Velocidade da fala</h4>
                <div className="mt-2">
                  <input 
                    type="range" 
                    min="20" 
                    max="80" 
                    value={speechSpeed} 
                    onChange={(e) => setSpeechSpeed(e.target.value)}
                    className="w-full accent-[#1A1816] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-[#8C8881] mt-1">
                    <span>Lento</span>
                    <span>Rápido</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-[#1A1816]">Sensibilidade</h4>
                <p className="text-xs text-[#736F69] mt-0.5 mb-2 leading-relaxed">
                  Com maior sensibilidade, o assistente reage mais facilmente a interrupções, mas também a ruídos.
                </p>
                <input 
                  type="range" 
                  min="10" 
                  max="90" 
                  value={sensitivity} 
                  onChange={(e) => setSensitivity(e.target.value)}
                  className="w-full accent-[#1A1816] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-[#8C8881] mt-1">
                  <span>Baixa</span>
                  <span>Alta</span>
                </div>
              </div>
            </div>

            {/* 7. Criatividade & Processamento preciso de informações */}
            <div className="p-4 rounded-2xl border border-[#E7E4DC] bg-white space-y-4">
              <div>
                <h4 className="text-xs font-bold text-[#1A1816]">Criatividade (temperatura)</h4>
                <div className="mt-2">
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={temperature} 
                    onChange={(e) => setTemperature(e.target.value)}
                    className="w-full accent-[#1A1816] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-[#8C8881] mt-1">
                    <span>Segue o prompt à risca</span>
                    <span>Muito criativo</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-[#F0EDE8]">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-[#1A1816]">Processamento preciso de informações</h4>
                  <a href="#tutorial" className="text-xs text-[#C84B1F] hover:underline">— Vídeo tutorial</a>
                </div>
                <p className="text-xs text-[#736F69] mt-1 leading-relaxed">
                  Defina quais informações o assistente deve coletar com precisão na ligação. Ele pede cada uma e confirma o valor com a pessoa (soletrando e-mails e números, por exemplo).
                </p>
                <div className="mt-3">
                  <button 
                    onClick={() => {
                      const info = prompt("Digite o nome da informação a coletar (ex: CPF, E-mail, CEP):");
                      if (info) setInfoExtractionList(prev => [...prev, info]);
                    }}
                    className="px-4 py-1.5 rounded-xl border border-[#D0CBC0] hover:bg-[#FAF9F5] text-xs font-semibold text-[#1A1816] cursor-pointer"
                  >
                    Adicionar informação
                  </button>
                  {infoExtractionList.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {infoExtractionList.map((item, idx) => (
                        <span key={idx} className="px-2.5 py-1 rounded-lg bg-[#FAF5EE] text-[#C84B1F] text-xs font-semibold border border-[#EDE5D8]">
                          {item}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* 8. Transferência livre de ligações */}
            <div className="p-4 rounded-2xl border border-[#E7E4DC] bg-white flex items-start gap-3">
              <input 
                type="checkbox" 
                checked={freeTransfer} 
                onChange={(e) => setFreeTransfer(e.target.checked)}
                className="w-4 h-4 rounded text-[#1A1816] mt-0.5 accent-[#1A1816] cursor-pointer"
              />
              <div>
                <h4 className="text-xs font-bold text-[#1A1816]">Transferência livre de ligações</h4>
                <p className="text-xs text-[#736F69] mt-1 leading-relaxed">
                  O assistente pode transferir ligações livremente para outros números conforme definido no prompt. Atenção: isso deve ser bem restrito para que quem liga não consiga determinar esse comportamento.
                </p>
              </div>
            </div>

            {/* 9. Envio de tons DTMF / discagem por tom */}
            <div className="p-4 rounded-2xl border border-[#E7E4DC] bg-white flex items-start gap-3">
              <input 
                type="checkbox" 
                checked={dtmfEnabled} 
                onChange={(e) => setDtmfEnabled(e.target.checked)}
                className="w-4 h-4 rounded text-[#1A1816] mt-0.5 accent-[#1A1816] cursor-pointer"
              />
              <div>
                <h4 className="text-xs font-bold text-[#1A1816]">Envio de tons DTMF / discagem por tom</h4>
                <p className="text-xs text-[#736F69] mt-1 leading-relaxed">
                  Permite que o assistente envie códigos de discagem por tom (por exemplo, dígitos) durante a ligação.
                </p>
              </div>
            </div>

            {/* 10. Impedir interrupção da mensagem inicial */}
            <div className="p-4 rounded-2xl border border-[#E7E4DC] bg-white flex items-start gap-3">
              <input 
                type="checkbox" 
                checked={blockInitialInterrupt} 
                onChange={(e) => setBlockInitialInterrupt(e.target.checked)}
                className="w-4 h-4 rounded text-[#1A1816] mt-0.5 accent-[#1A1816] cursor-pointer"
              />
              <div>
                <h4 className="text-xs font-bold text-[#1A1816]">Impedir interrupção da mensagem inicial</h4>
                <p className="text-xs text-[#736F69] mt-1 leading-relaxed">
                  Quem liga não pode interromper a mensagem inicial. Isso pode garantir, por exemplo, que informações legais sejam transmitidas.
                </p>
              </div>
            </div>

            {/* 11. Impedir interrupções */}
            <div className="p-4 rounded-2xl border border-[#E7E4DC] bg-white flex items-start gap-3">
              <input 
                type="checkbox" 
                checked={blockAllInterrupts} 
                onChange={(e) => setBlockAllInterrupts(e.target.checked)}
                className="w-4 h-4 rounded text-[#1A1816] mt-0.5 accent-[#1A1816] cursor-pointer"
              />
              <div>
                <h4 className="text-xs font-bold text-[#1A1816]">Impedir interrupções</h4>
                <p className="text-xs text-[#736F69] mt-1 leading-relaxed">
                  Quem liga não pode interromper o agente em nenhum momento da chamada — ele sempre termina de falar. Útil quando quem liga precisa ser totalmente instruído, por exemplo, para orientações de serviço ou informações legais.
                </p>
              </div>
            </div>

            {/* 12. Rapidez de resposta */}
            <div className="p-4 rounded-2xl border border-[#E7E4DC] bg-white space-y-2">
              <h4 className="text-xs font-bold text-[#1A1816]">Rapidez de resposta</h4>
              <p className="text-xs text-[#736F69] leading-relaxed">
                Com que rapidez o assistente toma a palavra quando quem liga faz uma pausa. "Paciente" espera mais antes de responder, o que ajuda com pessoas que pausam no meio da frase, ao custo de respostas um pouco mais lentas.
              </p>
              <select 
                value={responsePace}
                onChange={(e) => setResponsePace(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#D0CBC0] text-xs text-[#1A1816] bg-white focus:outline-none cursor-pointer mt-1"
              >
                <option value="Rápido">Rápido (0.2s)</option>
                <option value="Normal">Normal</option>
                <option value="Paciente">Paciente (0.7s)</option>
              </select>
            </div>

          </div>
        )}

      </div>

      {/* ========================================================
          BOTTOM FLOATING BAR (Sticky Réplica 1:1 Chat + Ligação - Prints 1 e 10)
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

          {/* Atribuir número Pill (Exclusivo do Chat + Ligação e Voz - Prints 1 e 10) */}
          {(type === 'hibrido' || type === 'voz') && (
            <>
              <div className="h-4 w-[1px] bg-white/20" />
              <button 
                onClick={onOpenPricing}
                className="flex items-center gap-1 text-xs text-white hover:text-white/80 cursor-pointer font-medium"
              >
                <Phone className="w-3.5 h-3.5 text-[#C84B1F]" />
                <span>Atribuir número</span>
              </button>
            </>
          )}

          {/* Orange Test Button */}
          <button
            onClick={() => setTestChatOpen(true)}
            className="ml-2 px-4 py-1.5 rounded-xl bg-[#C84B1F] hover:bg-[#B34018] text-white text-xs font-bold transition-all shadow flex items-center gap-1.5 cursor-pointer"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Testar</span>
          </button>
        </div>
      </div>

      {/* ========================================================
          MODAL 1: SELECIONAR VOZ (Réplica 1:1 Imagem 4)
         ======================================================== */}
      {voiceModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div 
            className="bg-white rounded-3xl max-w-sm w-full p-6 border border-[#E7E4DC] shadow-2xl relative flex flex-col max-h-[85vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-[#EBE8E2]">
              <h3 className="text-lg font-bold text-[#1A1816]">Selecionar voz</h3>
              <button 
                onClick={() => setVoiceModalOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-[#FAF9F5] flex items-center justify-center text-[#736F69] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="py-3 flex items-center justify-between border-b border-[#EBE8E2]">
              <div className="flex items-center gap-4 text-xs font-semibold">
                <span className="text-[#1A1816] border-b-2 border-[#1A1816] pb-1">Todas</span>
                <span className="text-[#736F69] pb-1">Voz personalizada</span>
              </div>
              <span className="px-2.5 py-1 rounded-lg bg-[#FAF9F5] border border-[#E7E4DC] text-xs font-medium text-[#1A1816]">
                Português (Brasil) ▾
              </span>
            </div>

            <div className="flex-1 overflow-y-auto divide-y divide-[#F0EDE8] my-2 pr-1">
              {brazilianVoices.map((v, i) => (
                <div 
                  key={i}
                  onClick={() => {
                    setSelectedVoice(v);
                    setVoiceModalOpen(false);
                  }}
                  className="py-3 flex items-center justify-between hover:bg-[#FAF9F5] px-2 rounded-xl cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{v.avatar}</span>
                    <div>
                      <h4 className="text-xs font-bold text-[#1A1816]">{v.name}</h4>
                      <span className="text-[10px] text-[#736F69] flex items-center gap-1">
                        🇧🇷 {v.accent} • {v.gender}
                      </span>
                    </div>
                  </div>
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                    selectedVoice.name === v.name ? 'border-[#C84B1F] bg-[#C84B1F]' : 'border-[#D0CBC0]'
                  }`}>
                    {selectedVoice.name === v.name && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL 2: AGENDA DE RESPOSTA (Réplica 1:1 Imagem 5)
         ======================================================== */}
      {agendaModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div 
            className="bg-white rounded-3xl max-w-md w-full p-6 border border-[#E7E4DC] shadow-2xl relative space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-bold text-[#1A1816]">Agenda de resposta</h3>
                <p className="text-xs text-[#736F69] mt-1">Escolha quando a IA deve responder usando o horário de funcionamento da sua empresa.</p>
              </div>
              <button onClick={() => setAgendaModalOpen(false)} className="text-[#736F69] hover:text-[#1A1816] cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 pt-2">
              {[
                { id: 'Sempre', title: 'Sempre', desc: 'A IA responde a toda nova mensagem.' },
                { id: 'Durante o horário de funcionamento', title: 'Durante o horário de funcionamento', desc: 'A IA responde somente enquanto a sua empresa está aberta. As outras mensagens ficam não lidas para a sua equipe.' },
                { id: 'Fora do horário de funcionamento', title: 'Fora do horário de funcionamento', desc: 'A IA responde somente enquanto a sua empresa está fechada. As outras mensagens ficam não lidas para a sua equipe.' }
              ].map((opt) => (
                <div 
                  key={opt.id}
                  onClick={() => setAgendaResposta(opt.id)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    agendaResposta === opt.id 
                      ? 'border-[#C84B1F] bg-[#FAF5EE]' 
                      : 'border-[#E7E4DC] hover:border-[#D0CBC0]'
                  }`}
                >
                  <div className="flex items-center gap-2.5 mb-1">
                    <span className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                      agendaResposta === opt.id ? 'border-[#C84B1F] bg-[#C84B1F]' : 'border-[#D0CBC0]'
                    }`}>
                      {agendaResposta === opt.id && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </span>
                    <h4 className="text-xs font-bold text-[#1A1816]">{opt.title}</h4>
                  </div>
                  <p className="text-xs text-[#736F69] pl-6.5 leading-relaxed">{opt.desc}</p>
                </div>
              ))}
            </div>

            {/* Box: Horário de funcionamento da empresa */}
            <div className="p-4 rounded-2xl border border-[#E7E4DC] bg-[#FAF9F5] space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="text-xs font-bold text-[#1A1816]">Horário de funcionamento da empresa</h5>
                  <span className="text-[10px] text-[#736F69]">Fuso horário: America/Sao_Paulo</span>
                </div>
                <button 
                  onClick={() => {
                    setAgendaModalOpen(false);
                    setHorarioModalOpen(true);
                  }}
                  className="px-3 py-1 rounded-xl bg-white border border-[#D0CBC0] text-xs font-semibold text-[#1A1816] flex items-center gap-1 hover:bg-[#FAF9F5] cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Editar horário</span>
                </button>
              </div>
              <p className="text-[11px] text-[#8C8881] leading-relaxed">
                Nenhum horário configurado: "Durante o horário" nunca responde e "Fora do horário" responde sempre.
              </p>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button 
                onClick={() => setAgendaModalOpen(false)}
                className="px-5 py-2 rounded-xl bg-[#F5F4F0] text-xs font-semibold text-[#1A1816] cursor-pointer"
              >
                Cancelar
              </button>
              <button 
                onClick={() => setAgendaModalOpen(false)}
                className="px-6 py-2 rounded-xl bg-[#1A1816] text-xs font-bold text-white hover:bg-black cursor-pointer shadow-sm"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL 3: HORÁRIO DE FUNCIONAMENTO (Réplica 1:1 Imagem 6)
         ======================================================== */}
      {horarioModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div 
            className="bg-white rounded-3xl max-w-sm w-full p-6 border border-[#E7E4DC] shadow-2xl relative space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-[#1A1816]">Horário de funcionamento</h3>
              <button onClick={() => setHorarioModalOpen(false)} className="text-[#736F69] hover:text-[#1A1816] cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Pílulas dos Dias da Semana */}
            <div className="flex items-center justify-between gap-1">
              {['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'].map(dia => (
                <button
                  key={dia}
                  onClick={() => toggleDiaSemana(dia)}
                  className={`w-9 h-9 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    diasSemana.includes(dia)
                      ? 'bg-[#1A1816] text-white'
                      : 'border border-[#E7E4DC] text-[#736F69] hover:border-[#D0CBC0]'
                  }`}
                >
                  {dia}
                </button>
              ))}
            </div>

            {/* Inputs de Horário */}
            <div className="flex items-center justify-center gap-3 py-2">
              <input 
                type="text" 
                value={horarioInicio} 
                onChange={(e) => setHorarioInicio(e.target.value)}
                className="w-20 px-3 py-2 rounded-xl border border-[#D0CBC0] text-center text-xs font-bold text-[#1A1816] focus:outline-none"
              />
              <span className="text-[#736F69]">—</span>
              <input 
                type="text" 
                value={horarioFim} 
                onChange={(e) => setHorarioFim(e.target.value)}
                className="w-20 px-3 py-2 rounded-xl border border-[#D0CBC0] text-center text-xs font-bold text-[#1A1816] focus:outline-none"
              />
              <button className="text-[#8C8881] hover:text-red-500 cursor-pointer">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="text-center">
              <button className="text-xs font-bold text-[#1A1816] hover:underline cursor-pointer">
                Adicionar intervalo de horário +
              </button>
            </div>

            <div className="border-t border-[#F0EDE8] pt-4 flex items-center justify-between">
              <button 
                onClick={() => setHorarioModalOpen(false)}
                className="px-5 py-2 rounded-xl bg-[#F5F4F0] text-xs font-semibold text-[#1A1816] cursor-pointer"
              >
                Cancelar
              </button>
              <button 
                onClick={() => setHorarioModalOpen(false)}
                className="w-10 h-10 rounded-xl bg-[#1A1816] text-white flex items-center justify-center hover:bg-black cursor-pointer shadow-sm"
              >
                <Check className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL 4: ENTRADA DA CONVERSA (Réplica 1:1 Imagem 7)
         ======================================================== */}
      {entradaModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div 
            className="bg-white rounded-3xl max-w-md w-full p-6 border border-[#E7E4DC] shadow-2xl relative space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-bold text-[#1A1816]">Entrada da conversa</h3>
                <p className="text-xs text-[#736F69] mt-1">Decida se uma nova conversa começa com a IA ou com a sua equipe.</p>
              </div>
              <button onClick={() => setEntradaModalOpen(false)} className="text-[#736F69] hover:text-[#1A1816] cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 pt-2">
              {[
                { id: 'A IA atende todas as conversas', title: 'A IA atende todas as conversas', desc: 'Toda nova conversa começa com a IA.' },
                { id: 'A equipe atende todas as conversas', title: 'A equipe atende todas as conversas', desc: 'Toda nova conversa começa sem atribuição para a sua equipe. A IA fica em silêncio.' },
                { id: 'Decidir usando uma condição', title: 'Decidir usando uma condição', desc: 'A IA começa, a menos que a sua condição corresponda. Conversas que correspondem vão para a equipe.' }
              ].map((opt) => (
                <div 
                  key={opt.id}
                  onClick={() => setEntradaConversa(opt.id)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    entradaConversa === opt.id 
                      ? 'border-[#C84B1F] bg-[#FAF5EE]' 
                      : 'border-[#E7E4DC] hover:border-[#D0CBC0]'
                  }`}
                >
                  <div className="flex items-center gap-2.5 mb-1">
                    <span className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                      entradaConversa === opt.id ? 'border-[#C84B1F] bg-[#C84B1F]' : 'border-[#D0CBC0]'
                    }`}>
                      {entradaConversa === opt.id && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </span>
                    <h4 className="text-xs font-bold text-[#1A1816]">{opt.title}</h4>
                  </div>
                  <p className="text-xs text-[#736F69] pl-6.5 leading-relaxed">{opt.desc}</p>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button 
                onClick={() => setEntradaModalOpen(false)}
                className="px-5 py-2 rounded-xl bg-[#F5F4F0] text-xs font-semibold text-[#1A1816] cursor-pointer"
              >
                Cancelar
              </button>
              <button 
                onClick={() => setEntradaModalOpen(false)}
                className="px-6 py-2 rounded-xl bg-[#1A1816] text-xs font-bold text-white hover:bg-black cursor-pointer shadow-sm"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL 5: TRANSFERÊNCIA DE CONVERSA ATIVA (Réplica 1:1 Imagem 8)
         ======================================================== */}
      {transferenciaModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div 
            className="bg-white rounded-3xl max-w-md w-full p-6 border border-[#E7E4DC] shadow-2xl relative space-y-4 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-bold text-[#1A1816]">Transferência de conversa ativa</h3>
                <p className="text-xs text-[#736F69] mt-1">Estas configurações valem depois que a IA começou a atender uma conversa.</p>
              </div>
              <button onClick={() => setTransferenciaModalOpen(false)} className="text-[#736F69] hover:text-[#1A1816] cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 rounded-2xl border border-[#E7E4DC] flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-[#1A1816]">Habilitar transferência para a equipe</h4>
                <p className="text-xs text-[#736F69] mt-0.5">A IA pode passar uma conversa ativa para uma pessoa quando uma condição é atendida.</p>
              </div>
              <button
                type="button"
                onClick={() => setTransferenciaHabilitada(!transferenciaHabilitada)}
                className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer shrink-0 ml-3 ${
                  transferenciaHabilitada ? 'bg-[#D97757]' : 'bg-[#E7E4DC]'
                }`}
              >
                <span className={`w-5 h-5 rounded-full bg-white shadow-sm absolute top-0.5 transition-transform ${
                  transferenciaHabilitada ? 'left-5.5' : 'left-0.5'
                }`} />
              </button>
            </div>

            <div className="space-y-3">
              {[
                { id: 'Condições padrão', title: 'Condições padrão', desc: 'Use as condições integradas para situações comuns de transferência.' },
                { id: 'Condições padrão e personalizadas', title: 'Condições padrão e personalizadas', desc: 'Mantenha as condições padrão e adicione as suas próprias regras.' },
                { id: 'Apenas condições personalizadas', title: 'Apenas condições personalizadas', desc: 'Ignore as condições padrão e use somente as suas próprias regras.' }
              ].map((opt) => (
                <div 
                  key={opt.id}
                  onClick={() => setTransferenciaModo(opt.id)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    transferenciaModo === opt.id 
                      ? 'border-[#C84B1F] bg-[#FAF5EE]' 
                      : 'border-[#E7E4DC] hover:border-[#D0CBC0]'
                  }`}
                >
                  <div className="flex items-center gap-2.5 mb-1">
                    <span className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                      transferenciaModo === opt.id ? 'border-[#C84B1F] bg-[#C84B1F]' : 'border-[#D0CBC0]'
                    }`}>
                      {transferenciaModo === opt.id && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </span>
                    <h4 className="text-xs font-bold text-[#1A1816]">{opt.title}</h4>
                  </div>
                  <p className="text-xs text-[#736F69] pl-6.5 leading-relaxed">{opt.desc}</p>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-2xl border border-[#E7E4DC] bg-[#FAF9F5] space-y-1">
              <h5 className="text-xs font-bold text-[#1A1816]">Condições padrão</h5>
              <p className="text-[11px] text-[#736F69] leading-relaxed">
                O assistente transfere quando o cliente pede uma pessoa ou o suporte da equipe, fica irritado ou escala o problema, tem uma solicitação urgente ou sensível, ou quando o assistente não consegue resolver a solicitação.
              </p>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button 
                onClick={() => setTransferenciaModalOpen(false)}
                className="px-5 py-2 rounded-xl bg-[#F5F4F0] text-xs font-semibold text-[#1A1816] cursor-pointer"
              >
                Cancelar
              </button>
              <button 
                onClick={() => setTransferenciaModalOpen(false)}
                className="px-6 py-2 rounded-xl bg-[#1A1816] text-xs font-bold text-white hover:bg-black cursor-pointer shadow-sm"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL 6: NOTIFICAÇÕES DA EQUIPE (Réplica 1:1 Imagem 9)
         ======================================================== */}
      {notificacoesModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div 
            className="bg-white rounded-3xl max-w-md w-full p-6 border border-[#E7E4DC] shadow-2xl relative space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-bold text-[#1A1816]">Notificações da equipe</h3>
                <p className="text-xs text-[#736F69] mt-1">Avise a sua equipe quando uma conversa precisar de uma pessoa.</p>
              </div>
              <button onClick={() => setNotificacoesModalOpen(false)} className="text-[#736F69] hover:text-[#1A1816] cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 rounded-2xl border border-[#E7E4DC] flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-[#1A1816]">Notificar a equipe</h4>
                <p className="text-xs text-[#736F69] mt-0.5">Envia um e-mail às pessoas escolhidas.</p>
              </div>
              <button
                type="button"
                onClick={() => setNotificarEquipe(!notificarEquipe)}
                className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer shrink-0 ml-3 ${
                  notificarEquipe ? 'bg-[#D97757]' : 'bg-[#E7E4DC]'
                }`}
              >
                <span className={`w-5 h-5 rounded-full bg-white shadow-sm absolute top-0.5 transition-transform ${
                  notificarEquipe ? 'left-5.5' : 'left-0.5'
                }`} />
              </button>
            </div>

            <div className="space-y-3">
              <span className="text-[11px] font-bold text-[#8C8881] uppercase tracking-wider block">Avisar quando</span>
              <div className="space-y-2">
                <label className="flex items-center gap-2.5 text-xs text-[#1A1816] font-medium cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-[#C84B1F]" />
                  <span>Uma nova conversa começar com a equipe</span>
                </label>
                <label className="flex items-center gap-2.5 text-xs text-[#1A1816] font-medium cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-[#C84B1F]" />
                  <span>A IA transferir uma conversa ativa</span>
                </label>
              </div>
            </div>

            <div className="space-y-3">
              <span className="text-[11px] font-bold text-[#8C8881] uppercase tracking-wider block">Quem recebe</span>
              <label className="flex items-center gap-2.5 text-xs text-[#1A1816] font-medium cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={notificarEmail} 
                  onChange={(e) => setNotificarEmail(e.target.checked)} 
                  className="w-4 h-4 rounded text-[#C84B1F]" 
                />
                <span>fc_go@hotmail.com</span>
              </label>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button 
                onClick={() => setNotificacoesModalOpen(false)}
                className="px-5 py-2 rounded-xl bg-[#F5F4F0] text-xs font-semibold text-[#1A1816] cursor-pointer"
              >
                Cancelar
              </button>
              <button 
                onClick={() => setNotificacoesModalOpen(false)}
                className="px-6 py-2 rounded-xl bg-[#1A1816] text-xs font-bold text-white hover:bg-black cursor-pointer shadow-sm"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          SIMULADOR INTERATIVO: TESTAR CHAT / LIGAÇÃO
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
                    Online • Chat + Ligação ({selectedVoice.name})
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
