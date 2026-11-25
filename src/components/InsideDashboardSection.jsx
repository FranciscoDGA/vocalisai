import React, { useState } from 'react';
import { 
  Bot, MessageSquare, Users, Settings, Gift, Phone, CheckCircle2, 
  Sparkles, ArrowRight, ShieldCheck, CreditCard, Key, HelpCircle, 
  FileText, LogOut, ChevronDown, ChevronUp, UserCheck, Calendar,
  Mail, Send, Megaphone, Share2, Copy, Plus, X, MessageCircle, Headphones,
  BarChart2, Clock, Activity, ArrowUpRight, Search, Radio, Globe, AlertCircle,
  ExternalLink, Sliders, Inbox, UserPlus, Database, Layers, Check, Video, Play, 
  MoreHorizontal, Info, Eye, EyeOff, Building, RefreshCw, Smartphone,
  ChevronsLeft, ChevronsRight, BookOpen, Home, Menu, Mic, Building2, Terminal
} from 'lucide-react';
import { BRAND } from '../data/content';
import * as supabaseService from '../utils/supabaseClient';
import DashboardPricingModal from './DashboardPricingModal';
import KnowledgeBaseTab from './KnowledgeBaseTab';
import AssistantDetailView from './AssistantDetailView';
import VoiceCloningStudio from './VoiceCloningStudio';
import WhatsAppVoiceToVoice from './WhatsAppVoiceToVoice';
import AgencySubaccountsSection from './AgencySubaccountsSection';
import OutboundCampaignsSection from './OutboundCampaignsSection';
import PlatformPresentationSlider from './PlatformPresentationSlider';
import WhatsAppConnectorDashboard from './WhatsAppConnectorDashboard';
import VocalisLogo from './VocalisLogo';
import {
  DEMO_WORKSPACE,
  DEMO_WORKSPACE_NOTICE,
  DEMO_ASSISTANTS,
  DEMO_CONVERSATIONS,
  DEMO_NUMBERS,
  DEMO_MEMBERS,
  DEMO_KNOWLEDGE_ITEMS,
  DEMO_API_KEYS,
  buildDemoMetricsSummary,
} from '../data/demoDashboardData';
import { formatDuration } from '../utils/durationUtils';
import {
  getChannelLimitReachedPolicy,
  getDashboardAddonPriceLabel,
  getProviderCostSummary,
  getReferralCreditLabel,
} from '../utils/commercialCatalogUtils';

const buildDemoKnowledgeState = () =>
  DEMO_KNOWLEDGE_ITEMS.map((item, idx) => ({
    id: item.id,
    name: item.title,
    type: idx === 0 ? 'documento' : 'faq',
    fileType: item.type,
    size: `${item.chunks} blocos`,
    updatedAt: item.updatedAt,
    status: 'Demonstração',
    target: 'Todas as assistentes (Demo)',
    tokens: item.chunks * 120,
    description: 'Base de conhecimento fictícia usada exclusivamente na demonstração ilustrativa.',
  }));

const buildDemoNumbersState = () =>
  DEMO_NUMBERS.map((n) => ({
    id: n.id,
    name: 'Linha Ilustrativa (Demo)',
    number: n.number,
    uso: n.carrier,
    vinculacao: n.assistant,
    type: n.type,
  }));

const buildDemoMembersState = () =>
  DEMO_MEMBERS.map((m) => ({
    id: m.id,
    name: m.name,
    email: m.email,
    phone: '—',
    role: m.role,
    joined: m.status,
  }));

export default function InsideDashboardSection({
  onOpenDemo,
  onOpenLegal,
  onOpenAuth,
  onOpenDocs,
  onSelectPlan,
  isStandalone = false,
  onLogout,
  currentUser,
  onNavigateHome,
  onOpenPresentation,
}) {
  const isDemoMode = !isStandalone || !currentUser;
  const userEmail = isDemoMode
    ? DEMO_WORKSPACE.userEmail
    : currentUser?.email || 'conta@vocalis.ai';
  const workspaceName = isDemoMode
    ? DEMO_WORKSPACE.name
    : currentUser?.user_metadata?.company_name || userEmail.split('@')[0] || 'Minha Empresa';
  const userName = isDemoMode
    ? DEMO_WORKSPACE.userName
    : currentUser?.user_metadata?.company_name || userEmail.split('@')[0] || 'Usuário';
  const userInitial =
    workspaceName
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() || '')
      .join('') || 'VA';

  const [activeTab, setActiveTab] = useState('inicio');
  const [pricingModalOpen, setPricingModalOpen] = useState(isStandalone && Boolean(currentUser));
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedAssistant, setSelectedAssistant] = useState(null);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [voiceCloningOpen, setVoiceCloningOpen] = useState(false);
  const [presentationOpen, setPresentationOpen] = useState(false);
  const [realLeads, setRealLeads] = useState([]);
  const [sendingWaLead, setSendingWaLead] = useState(null);
  const [waSentToast, setWaSentToast] = useState(null);
  const [actionNotice, setActionNotice] = useState(null);

  // Modals
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [numberModalOpen, setNumberModalOpen] = useState(false);
  const [numberModalTab, setNumberModalTab] = useState('comprar');
  const [apiKeyModalOpen, setApiKeyModalOpen] = useState(false);
  const [newKeyName, setNewKeyName] = useState('Integração Webhook CRM');
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('Admin');
  const [rolesInfoOpen, setRolesInfoOpen] = useState(false);
  const [testCallModalOpen, setTestCallModalOpen] = useState(false);
  const [testPhoneNumber, setTestPhoneNumber] = useState('');
  const [testCallNotice, setTestCallNotice] = useState('');

  // User Account Tab state
  const [showPassword, setShowPassword] = useState(false);
  const [accountNotice, setAccountNotice] = useState('');

  // Sub-tabs
  const [configSubTab, setConfigSubTab] = useState('geral');
  const [userSubTab, setUserSubTab] = useState('membros');
  const [userSearch, setUserSearch] = useState('');
  const [timeframe, setTimeframe] = useState('30 dias');
  const [autoBuyAddons, setAutoBuyAddons] = useState(false);

  // Assistant State (declared before useEffect)
  const [selectedType, setSelectedType] = useState('voz');
  const [assistantName, setAssistantName] = useState(() =>
    isDemoMode ? 'Clara (Demo)' : 'Nova Assistente'
  );
  const [createdAssistants, setCreatedAssistants] = useState(() =>
    isDemoMode ? DEMO_ASSISTANTS : []
  );
  const [conversationsList, setConversationsList] = useState(() =>
    isDemoMode ? DEMO_CONVERSATIONS : []
  );

  // Knowledge Base State
  const [knowledgeList, setKnowledgeList] = useState(() =>
    isDemoMode ? buildDemoKnowledgeState() : []
  );
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);

  // Telephony State
  const [phoneFilter, setPhoneFilter] = useState('Tudo');
  const [phoneSearch, setPhoneSearch] = useState('');
  const [selectedDdd, setSelectedDdd] = useState('11 - São Paulo');
  const [sipNumber, setSipNumber] = useState('');
  const [importNumber, setImportNumber] = useState('');
  const [numbersList, setNumbersList] = useState(() =>
    isDemoMode ? buildDemoNumbersState() : []
  );

  // Members & Invites State
  const [membersList, setMembersList] = useState(() =>
    isDemoMode
      ? buildDemoMembersState()
      : [
          {
            id: currentUser?.id || 'owner',
            name: userName,
            email: userEmail,
            phone: '—',
            role: 'Admin',
            joined: 'Conta atual',
          },
        ]
  );

  const [invitesList, setInvitesList] = useState([]);

  // API Keys state
  const [apiKeySearch, setApiKeySearch] = useState('');
  const [apiKeys, setApiKeys] = useState(() => (isDemoMode ? DEMO_API_KEYS : []));

  // Addons counter state
  const [addons, setAddons] = useState({
    minutos: 0,
    outbound: 0,
    sms: 0,
    numeros: 0,
    workspaces: 0,
    whatsAppNum: 0,
    whatsAppConv: 0,
    botConv: 0,
    whatsActions: 0,
  });

  // Super Recursos Exclusivos
  const [clonedSuccess, setClonedSuccess] = useState('');
  const [auditRunning, setAuditRunning] = useState(false);
  const [auditScore, setAuditScore] = useState(9.9);
  const [shadowModeActive, setShadowModeActive] = useState(false);

  // Sincronizacao estrita entre modo demonstracao (ficticio) e conta autenticada (Supabase por user_id)
  React.useEffect(() => {
    if (isDemoMode) {
      setCreatedAssistants(DEMO_ASSISTANTS);
      setConversationsList(DEMO_CONVERSATIONS);
      setKnowledgeList(buildDemoKnowledgeState());
      setNumbersList(buildDemoNumbersState());
      setMembersList(buildDemoMembersState());
      setApiKeys(DEMO_API_KEYS);
      setRealLeads([]);
      return;
    }

    let cancelled = false;

    if (typeof supabaseService.getLeads === 'function') {
      supabaseService.getLeads(20).then((data) => {
        if (!cancelled && Array.isArray(data)) {
          setRealLeads(data);
        }
      });
    }

    if (typeof supabaseService.getAssistants === 'function') {
      supabaseService.getAssistants().then((data) => {
        if (!cancelled && Array.isArray(data)) {
          setCreatedAssistants(
            data.map((d) => ({
              id: d.id,
              name: d.name,
              type: d.type,
              typeName:
                d.type === 'voz'
                  ? 'Assistente de voz'
                  : d.type === 'chat'
                  ? 'Assistente de chat'
                  : 'Webchat / Híbrido',
              unitLabel: d.type === 'voz' ? 'ligações' : d.type === 'chat' ? 'conversas' : 'atendimentos',
              status: d.status || 'Configurado (sem ativação)',
              channel: d.channel || 'Canal sob configuração',
              calls: d.calls_count || 0,
              prompt: d.prompt || '',
              voice: d.voice || 'Camila',
              vapi_assistant_id: d.vapi_assistant_id || null,
            }))
          );
        }
      });
    }

    if (typeof supabaseService.getCalls === 'function') {
      supabaseService.getCalls(50).then((data) => {
        if (!cancelled && Array.isArray(data)) {
          setConversationsList(
            data.map((call, idx) => {
              const durationSeconds = Number(call.duration_seconds) || 0;
              return {
                id: call.id || `call-${idx}`,
                lead: call.lead_name || call.contact_name || 'Contato registrado',
                phone: call.phone || '—',
                assistant: call.assistant_name || 'Assistente da conta',
                channel: call.channel || 'voz',
                type: call.type || 'Atendimento',
                durationSeconds,
                duration: formatDuration(durationSeconds),
                status: call.status || 'Registrado',
                statusColor: 'text-emerald-700 bg-emerald-50',
                time: call.created_at
                  ? new Date(call.created_at).toLocaleString('pt-BR')
                  : 'Registro da conta',
                transcript: call.transcript || 'Sem transcrição registrada.',
              };
            })
          );
        }
      });
    }

    return () => {
      cancelled = true;
    };
  }, [isDemoMode, currentUser?.id, activeTab]);

  const showNotice = (message, tone = 'info') => {
    setActionNotice({ message, tone });
    setTimeout(() => {
      setActionNotice((prev) => (prev?.message === message ? null : prev));
    }, 5000);
  };

  const handleSendDirectWhatsApp = async (lead) => {
    const cleanPhone = String(lead?.phone || '').replace(/\D/g, '');
    if (isDemoMode || lead?.isDemo || cleanPhone.startsWith('00')) {
      setWaSentToast('Modo demonstração: nenhum envio real de WhatsApp é executado.');
      setTimeout(() => setWaSentToast(null), 4000);
      return;
    }
    setSendingWaLead(lead?.name || lead?.phone || 'Contato');
    setWaSentToast(
      'Disparos automáticos via WhatsApp dependem de onboarding comercial na Meta Cloud API oficial. Use o formulário comercial se precisar ativar este canal.'
    );
    setTimeout(() => setWaSentToast(null), 5000);
    setSendingWaLead(null);
  };

  const metricsSummary = buildDemoMetricsSummary(
    conversationsList,
    createdAssistants,
    membersList,
    numbersList
  );
  const [openbotWebhook, setOpenbotWebhook] = useState('https://openbot.run/api/v1/webhook/agency-flows-9821');
  const [openbotConnected, setOpenbotConnected] = useState(false);
  const [openbotTestSuccess, setOpenbotTestSuccess] = useState(false);
  const [openbotMode, setOpenbotMode] = useState('mcp'); // 'cloud' | 'mcp'
  const [openbotLocalPort, setOpenbotLocalPort] = useState('3000');
  const [isTestingOpenbot, setIsTestingOpenbot] = useState(false);
  const [openbotResponseLog, setOpenbotResponseLog] = useState(null);
  const [agencyDomain, setAgencyDomain] = useState('atendimento.suaagencia.com.br');
  const [agencyBrandName, setAgencyBrandName] = useState('Minha Agência IA');
  const [marginMultiplier, setMarginMultiplier] = useState(2.5); // 2.5x mark-up
  const [agencySaved, setAgencySaved] = useState(false);

  const handleCloneTemplate = async (tpl) => {
    const newAssis = {
      id: `local-${Date.now()}`,
      name: tpl.name,
      type: 'voz',
      typeName: 'Template: ' + tpl.niche,
      unitLabel: 'ligações',
      status: isDemoMode ? 'Simulação (Demo)' : 'Pendente de ativação',
      channel: tpl.channels || 'Canal sob consulta',
      calls: 0,
      prompt: tpl.prompt || tpl.desc,
      isDemo: isDemoMode,
      vapi_assistant_id: null,
    };

    if (isDemoMode) {
      setCreatedAssistants((prev) => [...prev, newAssis]);
      setClonedSuccess(
        `Template "${tpl.name}" adicionado apenas como prévia local no modo demonstração (não salvo em servidor).`
      );
      setTimeout(() => {
        setClonedSuccess('');
        setActiveTab('assistentes');
      }, 1500);
      return;
    }

    const res = await supabaseService.saveAssistant?.({
      name: tpl.name,
      type: 'voz',
      channel: tpl.channels || 'Canal sob consulta',
      prompt: tpl.prompt || tpl.desc,
      vapi_assistant_id: null,
    });

    if (res?.success && res.data?.id) {
      setCreatedAssistants((prev) => [...prev, { ...newAssis, id: res.data.id }]);
      setClonedSuccess(`Modelo "${tpl.name}" salvo no cadastro da sua conta (ativação de canal pendente).`);
      setTimeout(() => {
        setClonedSuccess('');
        setActiveTab('assistentes');
      }, 1500);
    } else {
      showNotice(
        `Não foi possível salvar no servidor: ${res?.error || 'serviço indisponível no momento.'}`,
        'error'
      );
    }
  };

  const handleUpdateAssistant = async (updatedData) => {
    if (isDemoMode) {
      setCreatedAssistants((prev) =>
        prev.map((a) => (a.id === updatedData.id ? { ...a, ...updatedData } : a))
      );
      if (selectedAssistant && selectedAssistant.id === updatedData.id) {
        setSelectedAssistant((prev) => ({ ...prev, ...updatedData }));
      }
      showNotice('Alteração exibida apenas na sessão demonstrativa local (sem persistência).');
      return;
    }

    if (typeof updatedData.id === 'string' && !updatedData.id.startsWith('demo-') && !updatedData.id.startsWith('local-')) {
      const res = await supabaseService.updateAssistant?.(updatedData.id, {
        name: updatedData.name,
        type: updatedData.type,
        channel: updatedData.channel,
        prompt: updatedData.prompt,
        voice: updatedData.voice,
        vapi_assistant_id: null,
      });
      if (res?.success === false) {
        showNotice(`Falha ao atualizar assistente: ${res.error || 'erro ao salvar.'}`, 'error');
        return;
      }
    }

    setCreatedAssistants((prev) =>
      prev.map((a) => (a.id === updatedData.id ? { ...a, ...updatedData } : a))
    );
    if (selectedAssistant && selectedAssistant.id === updatedData.id) {
      setSelectedAssistant((prev) => ({ ...prev, ...updatedData }));
    }
  };

  const handleDeleteAssistant = async (id) => {
    if (isDemoMode) {
      setCreatedAssistants((prev) => prev.filter((a) => a.id !== id));
      if (selectedAssistant?.id === id) {
        setSelectedAssistant(null);
      }
      showNotice('Remoção apenas visual na sessão demonstrativa (dados reais intactos).');
      return;
    }

    if (typeof id === 'string' && !id.startsWith('demo-') && !id.startsWith('local-')) {
      const res = await supabaseService.deleteAssistant?.(id);
      if (res?.success === false) {
        showNotice(`Falha ao excluir assistente: ${res.error || 'erro ao excluir.'}`, 'error');
        return;
      }
    }

    setCreatedAssistants((prev) => prev.filter((a) => a.id !== id));
    if (selectedAssistant?.id === id) {
      setSelectedAssistant(null);
    }
  };

  const handleRunAudit = () => {
    setAuditRunning(true);
    setTimeout(() => {
      setAuditRunning(false);
      setAuditScore(9.9);
      showNotice(
        'Simulação ilustrativa concluída com cenários estáticos de exemplo (não executa testes reais em LLM em produção).'
      );
    }, 600);
  };

  const handleTestOpenbot = async () => {
    setIsTestingOpenbot(false);
    setOpenbotTestSuccess(false);
    setOpenbotResponseLog({
      status: 'Em desenvolvimento / Sob consulta',
      latency: 'Sem conexão automática no navegador',
      target:
        openbotMode === 'mcp'
          ? 'Endpoint /api/mcp requer MCP_API_KEY de servidor'
          : 'Conector OpenBot não executa chamadas ao localhost do visitante nem webhooks públicos sem autenticação.',
    });
    showNotice(
      'Integração OpenBot/MCP requer configuração técnica autenticada em servidor e está fora do autoatendimento público.'
    );
  };

  const handleSaveAgency = (e) => {
    e.preventDefault();
    setAgencySaved(false);
    showNotice(
      'White-Label e domínio personalizado dependem de provisionamento comercial sob consulta e ainda não possuem gravação autônoma em servidor.'
    );
  };

  const updateAddon = (key, delta) => {
    setAddons((prev) => ({
      ...prev,
      [key]: Math.max(0, prev[key] + delta),
    }));
  };

  const handleCopy = () => {
    setCopiedLink(false);
    showNotice(
      isDemoMode
        ? 'Links de convite de equipe estão indisponíveis no ambiente de demonstração.'
        : 'O programa de indicações e geração de links está em desenvolvimento e pendente de regras comerciais.'
    );
  };

  const openCreateModal = (type = 'voz') => {
    setSelectedType(type);
    if (type === 'voz') {
      setAssistantName(isDemoMode ? 'Clara (Demo)' : 'Assistente de Voz');
    } else if (type === 'chat') {
      setAssistantName(isDemoMode ? 'Sofia (Demo)' : 'Assistente de Chat');
    } else if (type === 'hibrido') {
      setAssistantName(isDemoMode ? 'Mateus (Demo)' : 'Assistente Webchat');
    }
    setCreateModalOpen(true);
  };

  const handleSelectAssistantType = (type) => {
    setSelectedType(type);
    if (type === 'voz') {
      setAssistantName(isDemoMode ? 'Clara (Demo)' : 'Assistente de Voz');
    } else if (type === 'chat') {
      setAssistantName(isDemoMode ? 'Sofia (Demo)' : 'Assistente de Chat');
    } else if (type === 'hibrido') {
      setAssistantName(isDemoMode ? 'Mateus (Demo)' : 'Assistente Webchat');
    }
  };

  const handleCreateAssistant = async (e) => {
    e.preventDefault();
    const typeNames = {
      voz: 'Assistente de voz',
      chat: 'Assistente de chat',
      hibrido: 'Webchat / Híbrido',
    };
    const chosenChannel =
      selectedType === 'voz'
        ? 'Telefonia (sob configuração)'
        : selectedType === 'chat'
        ? 'WhatsApp (Meta Cloud API sob consulta)'
        : 'Webchat no Site';

    if (isDemoMode) {
      const demoAssis = {
        id: `demo-local-${Date.now()}`,
        name: assistantName || 'Assistente (Demo)',
        type: selectedType,
        typeName: typeNames[selectedType],
        unitLabel: selectedType === 'voz' ? 'ligações' : selectedType === 'chat' ? 'conversas' : 'atendimentos',
        status: 'Simulação (Demo)',
        channel: chosenChannel,
        calls: 0,
        isDemo: true,
        vapi_assistant_id: null,
      };
      setCreatedAssistants((prev) => [demoAssis, ...prev]);
      setCreateModalOpen(false);
      setActiveTab('assistentes');
      showNotice('Assistente adicionado apenas na simulação demonstrativa local (não salvo em conta real).');
      return;
    }

    const res = await supabaseService.saveAssistant?.({
      name: assistantName || 'Nova Assistente',
      type: selectedType,
      channel: chosenChannel,
      vapi_assistant_id: null,
    });

    if (res?.success && res.data?.id) {
      setCreatedAssistants((prev) => [
        {
          id: res.data.id,
          name: assistantName || 'Nova Assistente',
          type: selectedType,
          typeName: typeNames[selectedType],
          unitLabel: selectedType === 'voz' ? 'ligações' : selectedType === 'chat' ? 'conversas' : 'atendimentos',
          status: 'Configurado (sem ativação)',
          channel: chosenChannel,
          calls: 0,
          vapi_assistant_id: null,
        },
        ...prev,
      ]);
      setCreateModalOpen(false);
      setActiveTab('assistentes');
      showNotice('Assistente salvo no seu cadastro. A ativação telefônica real requer contratação e provedor configurado.');
    } else {
      showNotice(
        `Não foi possível salvar no servidor: ${res?.error || 'verifique sua sessão autenticada.'}`,
        'error'
      );
    }
  };

  const handleAddNumber = (e) => {
    e.preventDefault();
    setNumberModalOpen(false);
    showNotice(
      'Provisionamento de números (0800, 4003, DDD ou tronco SIP) requer onboarding comercial e verificação documental; não há compra automática nesta tela.'
    );
  };

  const handleAddApiKey = (e) => {
    e.preventDefault();
    setApiKeyModalOpen(false);
    showNotice(
      'Emissão de chaves de API de produção ainda está em desenvolvimento e indisponível no modo demonstrativo.'
    );
  };

  const handleSendInvite = (e) => {
    e.preventDefault();
    setInviteModalOpen(false);
    setInviteEmail('');
    showNotice(
      isDemoMode
        ? 'Convite de membros está desabilitado no ambiente de demonstração.'
        : 'Gestão multi-usuário por convite de e-mail está em desenvolvimento no backend.'
    );
  };

  const handleSaveAccount = (e) => {
    e.preventDefault();
    setAccountNotice(
      isDemoMode
        ? 'Modo demonstração: alterações de perfil ou senha não são salvas.'
        : 'Atualização avançada de perfil e alteração de senha em desenvolvimento neste painel.'
    );
  };

  const handleStartTestCall = (e) => {
    e.preventDefault();
    setTestCallNotice(
      'Este painel público não realiza discagens telefônicas reais. Para solicitar uma demonstração assistida pela equipe, use o formulário de contato.'
    );
  };

  return (
    <div id="dashboard" className={isStandalone ? "w-full min-h-screen bg-white overflow-hidden" : "py-16 sm:py-24 bg-[#FAF9F5] border-t border-[#EBE8E2] overflow-hidden w-full max-w-full"}>
      <div className={isStandalone ? "w-full min-h-screen" : "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-full min-w-0"}>
        
        {/* Section Header (Apenas na Landing Page) */}
        {!isStandalone && (
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
            <span className="inline-block text-xs font-semibold text-[#4F46E5] uppercase tracking-wider mb-3">
              PRÉVIA INTERATIVA · SIMULAÇÃO ILUSTRATIVA
            </span>
            <h2 className="text-3xl sm:text-5xl font-normal text-[#1A1816] tracking-tight leading-[1.12]">
              Tudo o que sua empresa precisa<br />
              <span className="font-serif-title italic text-[#4F46E5]">em um só lugar.</span>
            </h2>
            <p className="mt-4 text-sm sm:text-lg text-[#5C5955] leading-relaxed">
              Navegue pela simulação ilustrativa do painel para conhecer a organização de assistentes, canais, membros e configurações. Os dados, métricas e conversas exibidos abaixo são fictícios e servem apenas como simulação ilustrativa do painel.
            </p>
          </div>
        )}

        {/* Dashboard Shell Frame */}
        <div className={isStandalone ? "w-full min-h-screen flex flex-col md:flex-row bg-white relative overflow-hidden" : "bg-white rounded-3xl border border-[#E7E4DC] shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[750px] relative w-full max-w-full"}>
          
          {/* Mobile Navigation Header (Visível apenas em telas menores que md) */}
          <div className="md:hidden bg-[#FAF9F5] border-b border-[#EBE8E2] p-3 space-y-2.5 shrink-0">
            <div className="flex items-center justify-between">
              <VocalisLogo size="sm" />

              {/* Workspace Profile Button Mobile */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-[#E7E4DC] text-xs font-bold text-[#1A1816]"
                >
                  <div className="w-5 h-5 rounded-full bg-[#1A1816] text-white flex items-center justify-center text-[9px] font-bold">
                    {userInitial}
                  </div>
                  <span className="truncate max-w-[120px] uppercase text-[11px]">
                    {workspaceName}
                  </span>
                  <ChevronDown className="w-3 h-3 text-[#736F69]" />
                </button>
              </div>
            </div>

            {/* Mobile Scrollable Horizontal Nav Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
              <button
                onClick={() => { setActiveTab('inicio'); setSelectedAssistant(null); }}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors shrink-0 ${
                  activeTab === 'inicio' ? 'bg-[#EFECE6] text-[#1A1816]' : 'text-[#5C5955] bg-white border border-[#E7E4DC]'
                }`}
              >
                Visão geral
              </button>
              <button
                onClick={() => { setActiveTab('assistentes'); setSelectedAssistant(null); }}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors shrink-0 ${
                  activeTab === 'assistentes' ? 'bg-[#EFECE6] text-[#1A1816]' : 'text-[#5C5955] bg-white border border-[#E7E4DC]'
                }`}
              >
                Assistentes
              </button>
              <button
                onClick={() => { setActiveTab('conversas'); setSelectedAssistant(null); }}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors shrink-0 ${
                  activeTab === 'conversas' ? 'bg-[#EFECE6] text-[#1A1816]' : 'text-[#5C5955] bg-white border border-[#E7E4DC]'
                }`}
              >
                Conversas
              </button>
              <button
                onClick={() => { setActiveTab('conhecimento'); setSelectedAssistant(null); }}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors shrink-0 ${
                  activeTab === 'conhecimento' ? 'bg-[#EFECE6] text-[#1A1816]' : 'text-[#5C5955] bg-white border border-[#E7E4DC]'
                }`}
              >
                Conhecimento
              </button>
              <button
                onClick={() => setMoreMenuOpen(!moreMenuOpen)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1 shrink-0 ${
                  moreMenuOpen || ['telefonia', 'whatsapp', 'agendador', 'email-ia', 'contatos', 'integracoes-hub', 'campanhas'].includes(activeTab)
                    ? 'bg-[#EFECE6] text-[#1A1816]' : 'text-[#5C5955] bg-white border border-[#E7E4DC]'
                }`}
              >
                <Menu className="w-3.5 h-3.5 text-[#736F69]" />
                <span>Mais</span>
              </button>
            </div>

            {/* Submenu Mais on Mobile */}
            {moreMenuOpen && (
              <div className="grid grid-cols-2 gap-1.5 pt-2 border-t border-[#EBE8E2] text-xs animate-fadeIn">
                <button onClick={() => { setActiveTab('campanhas'); setMoreMenuOpen(false); }} className={`p-2 rounded-lg text-left truncate transition-colors ${activeTab === 'campanhas' ? 'bg-[#EFECE6] font-bold text-[#1A1816]' : 'bg-white border border-[#E7E4DC] text-[#5C5955]'}`}>
                  Campanhas outbound
                </button>
                <button onClick={() => { setActiveTab('whatsapp-audio'); setMoreMenuOpen(false); }} className={`p-2 rounded-lg text-left truncate transition-colors ${activeTab === 'whatsapp-audio' ? 'bg-[#EFECE6] font-bold text-[#1A1816]' : 'bg-white border border-[#E7E4DC] text-[#5C5955]'}`}>
                  WhatsApp Voice-to-Voice
                </button>
                <button onClick={() => { setActiveTab('subcontas'); setMoreMenuOpen(false); }} className={`p-2 rounded-lg text-left truncate transition-colors ${activeTab === 'subcontas' ? 'bg-[#EFECE6] font-bold text-[#1A1816]' : 'bg-white border border-[#E7E4DC] text-[#5C5955]'}`}>
                  Subcontas (Agência)
                </button>
                <button onClick={() => { setVoiceCloningOpen(true); setMoreMenuOpen(false); }} className="p-2 rounded-lg text-left truncate bg-[#EEF2FF] border border-[#F2E8DC] text-[#4F46E5] font-bold">
                  Clonar Voz (60s)
                </button>
                <button onClick={() => { setActiveTab('templates'); setMoreMenuOpen(false); }} className={`p-2 rounded-lg text-left truncate transition-colors ${activeTab === 'templates' ? 'bg-[#EFECE6] font-bold text-[#1A1816]' : 'bg-white border border-[#E7E4DC] text-[#5C5955]'}`}>
                  Templates de Nicho
                </button>
                <button onClick={() => { setActiveTab('whitelabel'); setMoreMenuOpen(false); }} className={`p-2 rounded-lg text-left truncate transition-colors ${activeTab === 'whitelabel' ? 'bg-[#EFECE6] font-bold text-[#1A1816]' : 'bg-white border border-[#E7E4DC] text-[#5C5955]'}`}>
                  White-Label & OpenBot
                </button>
                <button onClick={() => { setActiveTab('auditoria'); setMoreMenuOpen(false); }} className={`p-2 rounded-lg text-left truncate transition-colors ${activeTab === 'auditoria' ? 'bg-[#EFECE6] font-bold text-[#1A1816]' : 'bg-white border border-[#E7E4DC] text-[#5C5955]'}`}>
                  Auditoria Anti-Alucinação
                </button>
                <button onClick={() => { setActiveTab('bi-vendas'); setMoreMenuOpen(false); }} className={`p-2 rounded-lg text-left truncate transition-colors ${activeTab === 'bi-vendas' ? 'bg-[#EFECE6] font-bold text-[#1A1816]' : 'bg-white border border-[#E7E4DC] text-[#5C5955]'}`}>
                  BI de Vendas
                </button>
                <button onClick={() => { setActiveTab('telefonia'); setMoreMenuOpen(false); }} className={`p-2 rounded-lg text-left truncate transition-colors ${activeTab === 'telefonia' ? 'bg-[#EFECE6] font-bold text-[#1A1816]' : 'bg-white border border-[#E7E4DC] text-[#5C5955]'}`}>
                  Números de telefone
                </button>
                <button onClick={() => { setActiveTab('whatsapp'); setMoreMenuOpen(false); }} className={`p-2 rounded-lg text-left truncate transition-colors ${activeTab === 'whatsapp' ? 'bg-[#EFECE6] font-bold text-[#1A1816]' : 'bg-white border border-[#E7E4DC] text-[#5C5955]'}`}>
                  Conexão WhatsApp
                </button>
                <button onClick={() => { setActiveTab('agendador'); setMoreMenuOpen(false); }} className={`p-2 rounded-lg text-left truncate transition-colors ${activeTab === 'agendador' ? 'bg-[#EFECE6] font-bold text-[#1A1816]' : 'bg-white border border-[#E7E4DC] text-[#5C5955]'}`}>
                  Agendador
                </button>
                <button onClick={() => { setActiveTab('email-ia'); setMoreMenuOpen(false); }} className={`p-2 rounded-lg text-left flex items-center justify-between transition-colors ${activeTab === 'email-ia' ? 'bg-[#EFECE6] font-bold text-[#1A1816]' : 'bg-white border border-[#E7E4DC] text-[#5C5955]'}`}>
                  <span className="truncate">E-Mail IA</span>
                  <span className="text-[8px] bg-[#4F46E5] text-white px-1 py-0.2 rounded font-bold">BETA</span>
                </button>
                <button onClick={() => { setActiveTab('contatos'); setMoreMenuOpen(false); }} className={`p-2 rounded-lg text-left truncate transition-colors ${activeTab === 'contatos' ? 'bg-[#EFECE6] font-bold text-[#1A1816]' : 'bg-white border border-[#E7E4DC] text-[#5C5955]'}`}>
                  Contatos
                </button>
                <button onClick={() => { setActiveTab('integracoes-hub'); setMoreMenuOpen(false); }} className={`p-2 rounded-lg text-left truncate transition-colors ${activeTab === 'integracoes-hub' ? 'bg-[#EFECE6] font-bold text-[#1A1816]' : 'bg-white border border-[#E7E4DC] text-[#5C5955]'}`}>
                  Integrações
                </button>
                <button onClick={() => { if (onOpenDocs) onOpenDocs(); else onOpenLegal('privacidade'); setMoreMenuOpen(false); }} className="p-2 rounded-lg text-left truncate bg-white border border-[#E7E4DC] text-[#5C5955]">
                  Central de ajuda
                </button>
              </div>
            )}
          </div>

          {/* Left Sidebar (Desktop Réplica 1:1 Kloel com Botão Recolher « na borda) */}
          <div className={`hidden md:flex ${sidebarCollapsed ? 'md:w-20' : 'md:w-64'} bg-[#FAF9F5] border-r border-[#EBE8E2] p-4 flex-col justify-between shrink-0 relative ${isStandalone ? 'min-h-screen' : ''} transition-all duration-300`}>
            {/* Botão « de 02 setas recolher/expandir fixado exatamente na linha divisória da borda */}
            <button 
              type="button"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="hidden md:flex absolute -right-3 top-5 w-6 h-6 rounded-md bg-white border border-[#E7E4DC] hover:border-[#D0CBC0] shadow-xs items-center justify-center text-[#736F69] hover:text-[#1A1816] transition-all cursor-pointer z-30"
              title={sidebarCollapsed ? "Expandir menu lateral" : "Recolher menu lateral"}
            >
              {sidebarCollapsed ? (
                <ChevronsRight className="w-3.5 h-3.5" />
              ) : (
                <ChevronsLeft className="w-3.5 h-3.5" />
              )}
            </button>

            <div>
              {/* Vocalis Logo */}
              <div className="flex items-center gap-2.5 px-2 py-2 mb-6">
                {sidebarCollapsed ? (
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] flex items-center justify-center shadow-sm shadow-indigo-500/25 shrink-0 mx-auto">
                    <svg viewBox="0 0 24 24" fill="none" className="w-[62%] h-[62%]" stroke="currentColor">
                      <path d="M4 7v10" stroke="white" strokeWidth="2.4" strokeLinecap="round" />
                      <path d="M8 4v16" stroke="white" strokeWidth="2.4" strokeLinecap="round" />
                      <path d="M12 11v2" stroke="white" strokeWidth="2.4" strokeLinecap="round" />
                      <path d="M16 4v16" stroke="white" strokeWidth="2.4" strokeLinecap="round" />
                      <path d="M20 7v10" stroke="white" strokeWidth="2.4" strokeLinecap="round" />
                    </svg>
                  </div>
                ) : (
                  <VocalisLogo size="md" />
                )}
              </div>

              {/* Main Nav Items */}
              <div className="space-y-1">
                {/* 1. Visão geral */}
                <button
                  onClick={() => { setActiveTab('inicio'); setSelectedAssistant(null); }}
                  className={`w-full flex items-center ${sidebarCollapsed ? 'justify-center px-2' : 'gap-2.5 px-3'} py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                    activeTab === 'inicio' ? 'bg-[#EFECE6] text-[#1A1816]' : 'text-[#5C5955] hover:text-[#1A1816] hover:bg-[#F3EFE8]'
                  }`}
                  title="Visão geral"
                >
                  <Home className="w-4 h-4 text-[#736F69] shrink-0" />
                  {!sidebarCollapsed && <span>Visão geral</span>}
                </button>

                {/* 2. Assistentes */}
                <button
                  onClick={() => { setActiveTab('assistentes'); setSelectedAssistant(null); }}
                  className={`w-full flex items-center ${sidebarCollapsed ? 'justify-center px-2' : 'gap-2.5 px-3'} py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                    activeTab === 'assistentes' ? 'bg-[#EFECE6] text-[#1A1816]' : 'text-[#5C5955] hover:text-[#1A1816] hover:bg-[#F3EFE8]'
                  }`}
                  title="Assistentes"
                >
                  <Bot className="w-4 h-4 text-[#736F69] shrink-0" />
                  {!sidebarCollapsed && <span>Assistentes</span>}
                </button>

                {/* 3. Conversas */}
                <button
                  onClick={() => { setActiveTab('conversas'); setSelectedAssistant(null); }}
                  className={`w-full flex items-center ${sidebarCollapsed ? 'justify-center px-2' : 'gap-2.5 px-3'} py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                    activeTab === 'conversas' ? 'bg-[#EFECE6] text-[#1A1816]' : 'text-[#5C5955] hover:text-[#1A1816] hover:bg-[#F3EFE8]'
                  }`}
                  title="Conversas"
                >
                  <MessageSquare className="w-4 h-4 text-[#736F69] shrink-0" />
                  {!sidebarCollapsed && <span>Conversas</span>}
                </button>

                {/* 4. Conhecimento */}
                <button
                  onClick={() => { setActiveTab('conhecimento'); setSelectedAssistant(null); }}
                  className={`w-full flex items-center ${sidebarCollapsed ? 'justify-center px-2' : 'gap-2.5 px-3'} py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                    activeTab === 'conhecimento' ? 'bg-[#EFECE6] text-[#1A1816]' : 'text-[#5C5955] hover:text-[#1A1816] hover:bg-[#F3EFE8]'
                  }`}
                  title="Conhecimento"
                >
                  <BookOpen className="w-4 h-4 text-[#736F69] shrink-0" />
                  {!sidebarCollapsed && <span>Conhecimento</span>}
                </button>

                {/* 5. Mais (Menu Hamburger ≡ que esconde/expande todas as subcategorias) */}
                <div>
                  <button
                    onClick={() => setMoreMenuOpen(!moreMenuOpen)}
                    className={`w-full flex items-center ${sidebarCollapsed ? 'justify-center px-2' : 'gap-2.5 px-3'} py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                      moreMenuOpen || ['telefonia', 'whatsapp', 'agendador', 'email-ia', 'contatos', 'integracoes-hub', 'campanhas'].includes(activeTab)
                        ? 'bg-[#EFECE6] text-[#1A1816]'
                        : 'text-[#5C5955] hover:text-[#1A1816] hover:bg-[#F3EFE8]'
                    }`}
                    title="Mais"
                  >
                    <Menu className="w-4 h-4 text-[#736F69] shrink-0" />
                    {!sidebarCollapsed && <span>Mais</span>}
                  </button>

                  {/* Subcategorias: visíveis APENAS quando moreMenuOpen está aberto */}
                  {moreMenuOpen && !sidebarCollapsed && (
                    <div className="ml-5 pl-3 border-l border-[#E2DFD8] space-y-0.5 mt-1.5 text-xs py-1 animate-fadeIn">
                      <button 
                        onClick={() => { setActiveTab('campanhas'); setSelectedAssistant(null); }}
                        className={`w-full text-left py-1.5 px-2 rounded-lg transition-colors cursor-pointer flex items-center justify-between ${
                          activeTab === 'campanhas' ? 'bg-[#EFECE6] text-[#1A1816] font-semibold' : 'text-[#5C5955] hover:text-[#1A1816] hover:bg-[#F3EFE8]'
                        }`}
                      >
                        <span>Campanhas outbound</span>
                        <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-emerald-600 text-white">PRO</span>
                      </button>

                      <button 
                        onClick={() => { setActiveTab('whatsapp-audio'); setSelectedAssistant(null); }}
                        className={`w-full text-left py-1.5 px-2 rounded-lg transition-colors cursor-pointer flex items-center justify-between ${
                          activeTab === 'whatsapp-audio' ? 'bg-[#EFECE6] text-[#1A1816] font-semibold' : 'text-[#5C5955] hover:text-[#1A1816] hover:bg-[#F3EFE8]'
                        }`}
                      >
                        <span>WhatsApp Voice-to-Voice</span>
                        <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-[#4F46E5] text-white">NOVO</span>
                      </button>

                      <button 
                        onClick={() => { setActiveTab('subcontas'); setSelectedAssistant(null); }}
                        className={`w-full text-left py-1.5 px-2 rounded-lg transition-colors cursor-pointer flex items-center justify-between ${
                          activeTab === 'subcontas' ? 'bg-[#EFECE6] text-[#1A1816] font-semibold' : 'text-[#5C5955] hover:text-[#1A1816] hover:bg-[#F3EFE8]'
                        }`}
                      >
                        <span>Subcontas (Agência)</span>
                        <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-[#1A1816] text-white">MASTER</span>
                      </button>

                      <button 
                        onClick={() => { setVoiceCloningOpen(true); }}
                        className="w-full text-left py-1.5 px-2 rounded-lg transition-colors cursor-pointer text-[#4F46E5] hover:bg-[#EEF2FF] font-bold flex items-center justify-between"
                      >
                        <span>Clonar Voz (60s)</span>
                        <Sparkles className="w-3 h-3 text-[#4F46E5]" />
                      </button>

                      <button 
                        onClick={() => { setActiveTab('templates'); setSelectedAssistant(null); }}
                        className={`w-full text-left py-1.5 px-2 rounded-lg transition-colors cursor-pointer ${
                          activeTab === 'templates' ? 'bg-[#EFECE6] text-[#1A1816] font-semibold' : 'text-[#5C5955] hover:text-[#1A1816] hover:bg-[#F3EFE8]'
                        }`}
                      >
                        Templates de nicho
                      </button>

                      <button 
                        onClick={() => { setActiveTab('whitelabel'); setSelectedAssistant(null); }}
                        className={`w-full text-left py-1.5 px-2 rounded-lg transition-colors cursor-pointer ${
                          activeTab === 'whitelabel' ? 'bg-[#EFECE6] text-[#1A1816] font-semibold' : 'text-[#5C5955] hover:text-[#1A1816] hover:bg-[#F3EFE8]'
                        }`}
                      >
                        White-Label & OpenBot
                      </button>

                      <button 
                        onClick={() => { setActiveTab('auditoria'); setSelectedAssistant(null); }}
                        className={`w-full text-left py-1.5 px-2 rounded-lg transition-colors cursor-pointer ${
                          activeTab === 'auditoria' ? 'bg-[#EFECE6] text-[#1A1816] font-semibold' : 'text-[#5C5955] hover:text-[#1A1816] hover:bg-[#F3EFE8]'
                        }`}
                      >
                        Anti-alucinação (Shadow)
                      </button>

                      <button 
                        onClick={() => { setActiveTab('bi-vendas'); setSelectedAssistant(null); }}
                        className={`w-full text-left py-1.5 px-2 rounded-lg transition-colors cursor-pointer ${
                          activeTab === 'bi-vendas' ? 'bg-[#EFECE6] text-[#1A1816] font-semibold' : 'text-[#5C5955] hover:text-[#1A1816] hover:bg-[#F3EFE8]'
                        }`}
                      >
                        Radar de Objeções (BI)
                      </button>

                      <button 
                        onClick={() => { setActiveTab('telefonia'); setSelectedAssistant(null); }}
                        className={`w-full text-left py-1.5 px-2 rounded-lg transition-colors cursor-pointer ${
                          activeTab === 'telefonia' ? 'bg-[#EFECE6] text-[#1A1816] font-semibold' : 'text-[#5C5955] hover:text-[#1A1816] hover:bg-[#F3EFE8]'
                        }`}
                      >
                        Números de telefone
                      </button>

                      <button 
                        type="button"
                        onClick={() => { setActiveTab('whatsapp'); setSelectedAssistant(null); }}
                        className={`w-full text-left py-1.5 px-2 rounded-lg transition-colors cursor-pointer flex items-center justify-between ${
                          activeTab === 'whatsapp' ? 'bg-[#EFECE6] text-[#1A1816] font-semibold' : 'text-[#5C5955] hover:text-[#1A1816] hover:bg-[#F3EFE8]'
                        }`}
                      >
                        <span>Conexão WhatsApp</span>
                        <span className="text-[9px] font-semibold px-1.5 py-0.2 rounded bg-[#EFECE6] text-[#5C5955]">
                          {isDemoMode ? 'Demo' : 'Pendente'}
                        </span>
                      </button>

                      <button 
                        onClick={() => { setActiveTab('agendador'); setSelectedAssistant(null); }}
                        className={`w-full text-left py-1.5 px-2 rounded-lg transition-colors cursor-pointer ${
                          activeTab === 'agendador' ? 'bg-[#EFECE6] text-[#1A1816] font-semibold' : 'text-[#5C5955] hover:text-[#1A1816] hover:bg-[#F3EFE8]'
                        }`}
                      >
                        Agendador
                      </button>

                      <button 
                        onClick={() => { setActiveTab('email-ia'); setSelectedAssistant(null); }}
                        className={`w-full flex items-center justify-between py-1.5 px-2 rounded-lg transition-colors cursor-pointer ${
                          activeTab === 'email-ia' ? 'bg-[#EFECE6] text-[#1A1816] font-semibold' : 'text-[#5C5955] hover:text-[#1A1816] hover:bg-[#F3EFE8]'
                        }`}
                      >
                        <span>E-Mail IA</span>
                        <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-[#4F46E5] text-white">
                          BETA
                        </span>
                      </button>

                      <button 
                        onClick={() => { setActiveTab('contatos'); setSelectedAssistant(null); }}
                        className={`w-full text-left py-1.5 px-2 rounded-lg transition-colors cursor-pointer ${
                          activeTab === 'contatos' ? 'bg-[#EFECE6] text-[#1A1816] font-semibold' : 'text-[#5C5955] hover:text-[#1A1816] hover:bg-[#F3EFE8]'
                        }`}
                      >
                        Contatos
                      </button>

                      <button 
                        onClick={() => { setActiveTab('integracoes-hub'); setSelectedAssistant(null); }}
                        className={`w-full text-left py-1.5 px-2 rounded-lg transition-colors cursor-pointer ${
                          activeTab === 'integracoes-hub' ? 'bg-[#EFECE6] text-[#1A1816] font-semibold' : 'text-[#5C5955] hover:text-[#1A1816] hover:bg-[#F3EFE8]'
                        }`}
                      >
                        Integrações
                      </button>

                      <button 
                        onClick={() => { setActiveTab('campanhas'); setSelectedAssistant(null); }}
                        className={`w-full text-left py-1.5 px-2 rounded-lg transition-colors cursor-pointer ${
                          activeTab === 'campanhas' ? 'bg-[#EFECE6] text-[#1A1816] font-semibold' : 'text-[#5C5955] hover:text-[#1A1816] hover:bg-[#F3EFE8]'
                        }`}
                      >
                        Campanhas outbound
                      </button>

                      <button 
                        onClick={() => {
                          if (onOpenDocs) {
                            onOpenDocs();
                          } else {
                            onOpenLegal('privacidade');
                          }
                        }}
                        className="w-full text-left py-1.5 px-2 rounded-lg transition-colors cursor-pointer text-[#5C5955] hover:text-[#1A1816] hover:bg-[#F3EFE8]"
                      >
                        Central de ajuda
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Bottom section: Organization / Workspace Dropdown (1:1 Kloel) */}
            <div className="mt-4 pt-3 border-t border-[#EBE8E2] relative">
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                  className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-[#EFECE6] transition-colors cursor-pointer text-left"
                >
                  <div className="flex items-center gap-2.5 overflow-hidden">
                    <div className="w-6 h-6 rounded-full bg-[#1A1816] text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                      {userInitial}
                    </div>
                    {!sidebarCollapsed && (
                      <span className="text-xs font-bold text-[#1A1816] truncate uppercase tracking-tight">
                        {workspaceName}
                      </span>
                    )}
                  </div>
                  {!sidebarCollapsed && (
                    <ChevronDown className="w-3.5 h-3.5 text-[#736F69] shrink-0" />
                  )}
                </button>

                {/* Profile Popup Menu */}
                {profileMenuOpen && (
                  <div className="absolute bottom-14 left-0 w-64 bg-white rounded-2xl border border-[#E7E4DC] shadow-2xl p-2 z-50 animate-fadeIn text-xs space-y-1">
                    <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#8C8881]">
                      Admin • {userEmail}
                    </div>
                    <button 
                      onClick={() => { setPricingModalOpen(true); setProfileMenuOpen(false); }}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left transition-colors ${activeTab === 'faturamento' ? 'bg-[#EEF2FF] text-[#4F46E5] font-bold' : 'text-[#1A1816] hover:bg-[#FAF9F5]'}`}
                    >
                      <CreditCard className="w-3.5 h-3.5 text-[#5C5955]" />
                      <span>Assinatura e planos</span>
                    </button>
                    <button 
                      onClick={() => { setActiveTab('bonus'); setProfileMenuOpen(false); }}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left transition-colors ${activeTab === 'bonus' ? 'bg-[#EEF2FF] text-[#4F46E5] font-bold' : 'text-[#1A1816] hover:bg-[#FAF9F5]'}`}
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#4F46E5]" />
                      <span>Bônus grátis</span>
                    </button>
                    <button 
                      onClick={() => { setActiveTab('api'); setProfileMenuOpen(false); }}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left transition-colors ${activeTab === 'api' ? 'bg-[#EEF2FF] text-[#4F46E5] font-bold' : 'text-[#1A1816] hover:bg-[#FAF9F5]'}`}
                    >
                      <Key className="w-3.5 h-3.5 text-[#5C5955]" />
                      <span>Chaves de API</span>
                    </button>
                    <button 
                      onClick={() => { setActiveTab('configuracoes'); setProfileMenuOpen(false); }}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left transition-colors ${activeTab === 'configuracoes' ? 'bg-[#EEF2FF] text-[#4F46E5] font-bold' : 'text-[#1A1816] hover:bg-[#FAF9F5]'}`}
                    >
                      <Settings className="w-3.5 h-3.5 text-[#5C5955]" />
                      <span>Configurações da empresa</span>
                    </button>
                    <button 
                      onClick={() => { setActiveTab('usuarios'); setProfileMenuOpen(false); }}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left transition-colors ${activeTab === 'usuarios' ? 'bg-[#EEF2FF] text-[#4F46E5] font-bold' : 'text-[#1A1816] hover:bg-[#FAF9F5]'}`}
                    >
                      <Users className="w-3.5 h-3.5 text-[#5C5955]" />
                      <span>Usuários</span>
                    </button>

                    <div className="my-1 border-t border-[#EBE8E2]"></div>

                    <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#8C8881]">
                      Conta
                    </div>
                    <button 
                      onClick={() => { setActiveTab('conta'); setProfileMenuOpen(false); }}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left transition-colors ${activeTab === 'conta' ? 'bg-[#EEF2FF] text-[#4F46E5] font-bold' : 'text-[#1A1816] hover:bg-[#FAF9F5]'}`}
                    >
                      <UserCheck className="w-3.5 h-3.5 text-[#5C5955]" />
                      <span>Conta</span>
                    </button>
                    <button 
                      onClick={() => { 
                        setProfileMenuOpen(false); 
                        if (onOpenDocs) onOpenDocs('termos');
                        else onOpenLegal('termos'); 
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[#1A1816] hover:bg-[#FAF9F5] text-left"
                    >
                      <FileText className="w-3.5 h-3.5 text-[#5C5955]" />
                      <span>Termos e Condições</span>
                    </button>
                    <button 
                      onClick={() => { 
                        setProfileMenuOpen(false); 
                        if (onOpenDocs) onOpenDocs('privacidade');
                        else onOpenLegal('privacidade'); 
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[#1A1816] hover:bg-[#FAF9F5] text-left"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-[#4F46E5]" />
                      <span>Política de Privacidade</span>
                    </button>
                    {onNavigateHome && (
                      <button 
                        onClick={() => { 
                          setProfileMenuOpen(false); 
                          onNavigateHome();
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[#1A1816] hover:bg-[#FAF9F5] text-left cursor-pointer"
                      >
                        <Globe className="w-3.5 h-3.5 text-[#5C5955]" />
                        <span>Ver Página Inicial (Site)</span>
                      </button>
                    )}
                    <button 
                      onClick={() => { 
                        setProfileMenuOpen(false); 
                        if (onLogout) onLogout();
                        else if (onOpenAuth) onOpenAuth(); 
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[#4F46E5] hover:bg-[#EEF2FF] text-left font-medium cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sair da conta</span>
                    </button>
                  </div>
                )}
              </div>

            </div>
          </div>

          {/* Main Dashboard Canvas Area */}
          <div className={`flex-1 p-4 sm:p-8 ${isStandalone ? 'md:p-10 min-h-screen' : ''} overflow-y-auto bg-white relative`}>
            {isDemoMode && (
              <div
                data-testid="demo-mode-banner"
                className="mb-5 p-3.5 rounded-2xl bg-amber-50 border border-amber-300 text-amber-950 text-xs flex items-start gap-2.5 shadow-xs"
              >
                <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="font-bold">Ambiente de demonstração — dados fictícios.</strong>{' '}
                  <span>
                    {DEMO_WORKSPACE_NOTICE.replace('Ambiente de demonstração — dados fictícios. ', '')}
                  </span>
                </div>
              </div>
            )}

            {actionNotice && (
              <div
                role="status"
                className={`mb-5 p-3.5 rounded-2xl border text-xs flex items-center justify-between gap-3 animate-fadeIn ${
                  actionNotice.tone === 'error'
                    ? 'bg-rose-50 border-rose-200 text-rose-900'
                    : 'bg-indigo-50 border-indigo-200 text-indigo-950'
                }`}
              >
                <span>{actionNotice.message}</span>
                <button
                  type="button"
                  onClick={() => setActionNotice(null)}
                  className="text-xs font-bold px-2 py-0.5 rounded hover:bg-black/5 cursor-pointer shrink-0"
                  aria-label="Fechar aviso"
                >
                  ✕
                </button>
              </div>
            )}

            {/* ========================================================
                1. TAB: INÍCIO
               ======================================================== */}
            {activeTab === 'inicio' && (
              <div className="space-y-6 animate-fadeIn">
                {/* Header with Title and Timeframe Filters */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <h3 className="text-2xl font-bold text-[#1A1816]">Início</h3>
                    <button
                      type="button"
                      onClick={() => setPresentationOpen(true)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#EEF2FF] border border-[#F2E8DC] text-[#4F46E5] text-xs font-bold hover:bg-[#F5EADB] transition-all cursor-pointer shadow-xs"
                      title="Abrir apresentação completa do sistema para reuniões com clientes"
                    >
                      <Play className="w-3 h-3 fill-[#4F46E5]" />
                      <span>Slides de Apresentação (Pitch Deck)</span>
                    </button>
                  </div>
                  <div className="flex items-center gap-1 bg-[#FAF9F5] p-1 rounded-xl border border-[#E7E4DC] text-xs">
                    {['Hoje', '7 dias', '30 dias', '90 dias'].map(tf => (
                      <button
                        type="button"
                        key={tf}
                        onClick={() => setTimeframe(tf)}
                        className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                          timeframe === tf ? 'bg-white text-[#1A1816] shadow-sm font-semibold' : 'text-[#736F69] hover:text-[#1A1816]'
                        }`}
                      >
                        {tf}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Top Metrics Card */}
                <div className="p-6 rounded-2xl border border-[#E7E4DC] bg-white space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h4 className="text-xs font-bold text-[#1A1816]">
                      {isDemoMode ? 'Resumo ilustrativo do workspace demo' : 'Resumo de atendimentos registrados'}
                    </h4>
                    <span className="text-[11px] text-[#736F69]">
                      Período: {timeframe} · {isDemoMode ? 'Dados fictícios sincronizados entre abas' : 'Dados da sua conta'}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
                    <div>
                      <div className="text-[11px] text-[#736F69]">Atendimentos registrados</div>
                      <div data-testid="overview-total-interactions" className="text-3xl font-normal text-[#1A1816] mt-1">
                        {metricsSummary.totalInteractions}
                      </div>
                      <div className="text-[10px] text-[#736F69] mt-0.5">
                        {metricsSummary.voiceCount} ligações · {metricsSummary.whatsappCount} WhatsApp · {metricsSummary.webchatCount} Webchat
                      </div>
                    </div>
                    <div>
                      <div className="text-[11px] text-[#736F69]">Assistentes no painel</div>
                      <div className="text-3xl font-normal text-[#1A1816] mt-1">
                        {metricsSummary.assistantsCount}
                      </div>
                      <div className="text-[10px] text-[#736F69] mt-0.5">
                        {metricsSummary.membersCount} membro(s) · {metricsSummary.numbersCount} número(s)
                      </div>
                    </div>
                    <div>
                      <div className="text-[11px] text-[#736F69]">Duração média</div>
                      <div className="text-3xl font-normal text-[#1A1816] mt-1">
                        {metricsSummary.avgDurationFormatted}
                      </div>
                      <div className="text-[10px] text-[#736F69] mt-0.5">
                        Tempo total: {formatDuration(metricsSummary.totalSeconds)}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Middle Chart Card: Histórico */}
                <div className="p-6 rounded-2xl border border-[#E7E4DC] bg-white space-y-4">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div>
                      <h4 className="text-xs font-bold text-[#1A1816]">Histórico de atendimentos</h4>
                      <p className="text-[11px] text-[#736F69]">
                        {isDemoMode ? 'Volume ilustrativo compatível com Conversas e Assistentes' : 'Registros consolidados da conta autenticada'}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="px-2.5 py-1 rounded-lg bg-[#FAF9F5] border border-[#E7E4DC] font-medium text-[#1A1816]">
                        Atendimentos <strong>{metricsSummary.totalInteractions}</strong>
                      </span>
                      <span className="px-2.5 py-1 rounded-lg bg-[#FAF9F5] border border-[#E7E4DC] font-medium text-[#736F69]">
                        Duração total <strong>{formatDuration(metricsSummary.totalSeconds)}</strong>
                      </span>
                    </div>
                  </div>

                  {conversationsList.length === 0 ? (
                    <div className="h-36 w-full flex flex-col items-center justify-center text-center border border-dashed border-[#EBE8E2] rounded-xl text-xs text-[#736F69] p-4">
                      <span>Nenhum atendimento real registrado ainda nesta conta.</span>
                    </div>
                  ) : (
                    <div className="grid grid-cols-3 gap-3 pt-2">
                      <div className="p-3 rounded-xl bg-[#FAF9F5] border border-[#E7E4DC] text-xs">
                        <div className="text-[#736F69]">Telefonia (Voz)</div>
                        <div className="text-lg font-bold text-[#1A1816] mt-0.5">{metricsSummary.voiceCount}</div>
                      </div>
                      <div className="p-3 rounded-xl bg-[#FAF9F5] border border-[#E7E4DC] text-xs">
                        <div className="text-[#736F69]">WhatsApp</div>
                        <div className="text-lg font-bold text-[#1A1816] mt-0.5">{metricsSummary.whatsappCount}</div>
                      </div>
                      <div className="p-3 rounded-xl bg-[#FAF9F5] border border-[#E7E4DC] text-xs">
                        <div className="text-[#736F69]">Webchat</div>
                        <div className="text-lg font-bold text-[#1A1816] mt-0.5">{metricsSummary.webchatCount}</div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Bottom 2 Grid Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Card 1: Uso */}
                  <div className="p-6 rounded-2xl border border-[#E7E4DC] bg-white space-y-4 flex flex-col justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-[#1A1816] mb-3">Uso</h4>
                      <div className="text-[11px] text-[#736F69]">Minutos de ligação</div>
                      <div className="text-2xl font-normal text-[#1A1816] mt-0.5">— min restantes</div>
                      <div className="text-[10px] text-[#8C8881] mb-4">— de — min usados</div>

                      <div className="divide-y divide-[#F0EDE8] text-xs">
                        <div className="py-2 flex justify-between">
                          <span className="text-[#5C5955]">Chamadas simultâneas</span>
                          <span className="font-medium text-[#1A1816]">—</span>
                        </div>
                        <div className="py-2 flex justify-between">
                          <span className="text-[#5C5955]">Números de telefone</span>
                          <span className="font-medium text-[#1A1816]">{numbersList.length}</span>
                        </div>
                        <div className="py-2 flex justify-between">
                          <span className="text-[#5C5955]">Usuários</span>
                          <span className="font-medium text-[#1A1816]">{membersList.length}</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-3">
                      <button 
                        onClick={() => setActiveTab('faturamento')}
                        className="w-full py-2 px-3 rounded-xl border border-[#D0CBC0] text-xs font-bold text-[#1A1816] hover:bg-[#FAF9F5] transition-colors text-center"
                      >
                        Gerenciar assinatura
                      </button>
                      <button 
                        onClick={onOpenDemo}
                        className="w-full py-2 px-3 rounded-xl border border-[#D0CBC0] text-xs font-bold text-[#1A1816] hover:bg-[#FAF9F5] transition-colors text-center"
                      >
                        Falar com vendas
                      </button>
                    </div>
                  </div>

                  {/* Card 2: Análise quase pronta */}
                  <div className="p-6 rounded-2xl border border-[#E7E4DC] bg-white flex flex-col items-center justify-center text-center space-y-4">
                    <div className="w-10 h-10 rounded-full bg-[#EEF2FF] border border-[#F2E8DC] flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-[#4F46E5]" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#1A1816]">
                        {isDemoMode ? 'Prévia analítica (dados fictícios)' : 'Sua análise está quase pronta'}
                      </h4>
                      <p className="text-xs text-[#5C5955] max-w-xs mt-1 leading-relaxed">
                        {isDemoMode
                          ? `${metricsSummary.totalInteractions} atendimentos fictícios registrados no workspace demo, idênticos às listas de Assistentes e Conversas.`
                          : 'A partir de 15 conversas reais, exibiremos padrões de conclusão e motivos principais de contato.'}
                      </p>
                    </div>
                    <div className="w-full max-w-xs">
                      <div className="w-full bg-[#EFECE6] h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-[#4F46E5] h-full transition-all"
                          style={{ width: `${Math.min(100, Math.round((metricsSummary.totalInteractions / 15) * 100))}%` }}
                        ></div>
                      </div>
                      <div className="text-[10px] text-[#736F69] mt-1.5">
                        {metricsSummary.totalInteractions} de 15 conversas registradas
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* ========================================================
                2. TAB: CONVERSAS
               ======================================================== */}
            {activeTab === 'conversas' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#EBE8E2]">
                  <div>
                    <h3 className="text-2xl font-bold text-[#1A1816]">Conversas</h3>
                    <p className="text-xs text-[#5C5955] mt-0.5">
                      {isDemoMode
                        ? 'Registros fictícios sincronizados com a Visão Geral e Assistentes.'
                        : 'Histórico real de atendimentos vinculados à sua conta autenticada.'}
                    </p>
                  </div>
                  <div className="text-xs font-semibold text-[#5C5955]">
                    Total: <strong className="text-[#1A1816]">{conversationsList.length}</strong> · Duração média:{' '}
                    <strong className="text-[#1A1816]">{metricsSummary.avgDurationFormatted}</strong>
                  </div>
                </div>

                {conversationsList.length === 0 ? (
                  <div className="py-20 flex flex-col items-center justify-center text-center max-w-md mx-auto space-y-5">
                    <div className="relative">
                      <div className="w-24 h-16 rounded-2xl bg-white border border-[#E7E4DC] shadow-md flex flex-col justify-center px-4 space-y-1.5">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-[#4F46E5]"></span>
                          <div className="w-14 h-2 bg-[#EFECE6] rounded-full"></div>
                        </div>
                        <div className="w-16 h-1.5 bg-[#E8F5E9] rounded-full"></div>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-[#4F46E5] text-white flex items-center justify-center absolute -top-3 -right-3 shadow">
                        <MessageSquare className="w-4 h-4" />
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-bold text-[#1A1816]">Nenhuma conversa ainda</h4>
                      <p className="text-xs text-[#5C5955] mt-1.5 leading-relaxed">
                        Quando seus assistentes atenderem ligações ou chats em produção, cada conversa aparecerá aqui.
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setTestCallModalOpen(true)}
                        className="px-5 py-2.5 rounded-xl bg-[#4F46E5] text-white text-xs font-bold hover:bg-[#4338CA] transition-colors flex items-center gap-2 shadow-sm cursor-pointer"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>Solicitar teste assistido</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setNumberModalOpen(true)}
                        className="px-5 py-2.5 rounded-xl border border-[#D0CBC0] text-[#1A1816] text-xs font-bold hover:bg-[#FAF9F5] transition-colors cursor-pointer"
                      >
                        Ver regras de número
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="w-full max-w-full overflow-x-auto rounded-2xl border border-[#E7E4DC]">
                      <table className="w-full text-left text-xs min-w-[600px]">
                        <thead>
                          <tr className="bg-[#FAF9F5] border-b border-[#E7E4DC] text-[#736F69]">
                            <th className="p-3.5 font-medium">Contato</th>
                            <th className="p-3.5 font-medium">Assistente</th>
                            <th className="p-3.5 font-medium">Canal</th>
                            <th className="p-3.5 font-medium">Duração</th>
                            <th className="p-3.5 font-medium">Status</th>
                            <th className="p-3.5 font-medium text-right">Detalhes</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#EBE8E2]">
                          {conversationsList.map((conv) => (
                            <tr key={conv.id} className="hover:bg-[#FAF9F5]">
                              <td className="p-3.5">
                                <div className="font-bold text-[#1A1816]">{conv.lead}</div>
                                <div className="text-[11px] font-mono text-[#736F69]">{conv.phone}</div>
                              </td>
                              <td className="p-3.5 text-[#1A1816] font-medium">{conv.assistant}</td>
                              <td className="p-3.5 text-[#5C5955]">{conv.type}</td>
                              <td className="p-3.5 font-mono font-bold text-[#1A1816]">
                                {formatDuration(conv.durationSeconds)}
                              </td>
                              <td className="p-3.5">
                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${conv.statusColor || 'bg-indigo-50 text-indigo-700'}`}>
                                  {conv.status}
                                </span>
                              </td>
                              <td className="p-3.5 text-right">
                                <button
                                  type="button"
                                  onClick={() =>
                                    setSelectedConversation(selectedConversation?.id === conv.id ? null : conv)
                                  }
                                  className="px-3 py-1 rounded-lg border border-[#D0CBC0] text-[#1A1816] font-semibold hover:bg-white cursor-pointer"
                                >
                                  {selectedConversation?.id === conv.id ? 'Ocultar' : 'Ver transcrição'}
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {selectedConversation && (
                      <div className="p-5 rounded-2xl bg-[#FAF9F5] border border-[#E7E4DC] space-y-2 text-xs animate-fadeIn">
                        <div className="flex items-center justify-between">
                          <strong className="text-[#1A1816]">
                            Transcrição ilustrativa — {selectedConversation.lead} ({formatDuration(selectedConversation.durationSeconds)})
                          </strong>
                          <button
                            type="button"
                            onClick={() => setSelectedConversation(null)}
                            className="text-[#736F69] hover:text-[#1A1816] font-bold cursor-pointer"
                          >
                            Fechar
                          </button>
                        </div>
                        <pre className="whitespace-pre-wrap font-sans text-[#5C5955] leading-relaxed">
                          {selectedConversation.transcript}
                        </pre>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* ========================================================
                3. TAB: WHATSAPP (MODO DEMO / META CLOUD API OFICIAL)
               ======================================================== */}
            {activeTab === 'whatsapp' && (
              <WhatsAppConnectorDashboard
                userPhone=""
                isDemoMode={isDemoMode}
                isAuthenticatedAccount={!isDemoMode && Boolean(currentUser)}
              />
            )}

            {/* ========================================================
                3. TAB: CONHECIMENTO (BASE DE CONHECIMENTO RAG - KLOEL 1:1)
               ======================================================== */}
            {activeTab === 'conhecimento' && (
              <KnowledgeBaseTab 
                knowledgeList={knowledgeList}
                setKnowledgeList={setKnowledgeList}
                createdAssistants={createdAssistants}
                isDemoMode={isDemoMode}
                onOpenDemo={onOpenDemo}
              />
            )}

            {/* ========================================================
                4. TAB: ASSINATURA E FATURAMENTO (Exact replica of screenshot 6)
               ======================================================== */}
            {activeTab === 'faturamento' && (
              <div className="space-y-8 animate-fadeIn max-w-4xl">
                <div>
                  <h3 className="text-2xl font-bold text-[#1A1816]">Assinatura e faturamento</h3>
                </div>

                {/* Section 1: Portal Financeiro */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-[#1A1816]">Portal financeiro</h4>
                  <p className="text-xs text-[#5C5955]">
                    Gerencie seu método de pagamento, endereço de cobrança e veja o histórico de faturas.
                  </p>
                  <button 
                    onClick={onOpenDemo}
                    className="px-4 py-2 rounded-xl border border-[#D0CBC0] text-xs font-bold text-[#1A1816] hover:bg-[#FAF9F5] transition-colors"
                  >
                    Abrir portal financeiro
                  </button>
                </div>

                {/* Section 2: Assinaturas */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-[#1A1816]">Assinaturas</h4>
                  
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C8881] block mb-2">
                      ATIVO
                    </span>
                    <div className="p-6 rounded-2xl border border-[#E7E4DC] bg-white text-center text-xs text-[#8C8881]">
                      Nenhuma assinatura ativa no momento.
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C8881] block mb-2">
                      DISPONÍVEL PARA ADICIONAR
                    </span>
                    
                    <div className="space-y-2">
                      {[
                        { title: 'IA de WhatsApp', icon: MessageCircle },
                        { title: 'Assistente telefônico IA', icon: Phone },
                        { title: 'Webchat de IA', icon: MessageSquare },
                        { title: 'Vocalis E-Mail IA', icon: Mail, beta: true },
                        { title: 'Vocalis Essential Care', icon: Headphones }
                      ].map((sub, i) => (
                        <div key={i} className="p-3.5 rounded-xl border border-[#E7E4DC] bg-white flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <sub.icon className="w-4 h-4 text-[#8C8881]" />
                            <span className="text-xs font-bold text-[#1A1816]">{sub.title}</span>
                            {sub.beta && (
                              <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-[#4F46E5]/10 text-[#4F46E5]">
                                BETA
                              </span>
                            )}
                          </div>
                          <button 
                            onClick={onOpenDemo}
                            className="px-3.5 py-1.5 rounded-lg bg-[#1A1816] text-white text-xs font-bold hover:bg-black transition-colors"
                          >
                            + Adicionar assinatura
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Section 3: Add-ons */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-[#1A1816]">Add-ons</h4>
                  
                  <div className="space-y-2">
                    {[
                      { key: 'minutos', label: 'Minutos de ligação', usage: '0 de 0 em uso', icon: Phone },
                      { key: 'outbound', label: 'Créditos outbound', usage: '0 de 0 em uso', icon: Phone, info: true },
                      { key: 'sms', label: 'SMS', usage: '0 de 0 em uso', icon: MessageSquare },
                      { key: 'numeros', label: 'Números de telefone', usage: '0 de 0 em uso', icon: Phone },
                      { key: 'workspaces', label: 'Conexões de workspace', usage: '0 de 2 em uso', icon: Users },
                      { key: 'whatsAppNum', label: 'Número WhatsApp', usage: '0 de 0 em uso', icon: Smartphone },
                      { key: 'whatsAppConv', label: 'Conversas do WhatsApp', usage: '0 de 0 em uso', icon: MessageCircle },
                      { key: 'botConv', label: 'Conversas do Chatbot de IA', usage: '0 de 0 em uso', icon: MessageSquare },
                      { key: 'whatsActions', label: 'Mensagens de ação do WhatsApp', usage: '0 de 0 em uso', icon: MessageCircle },
                    ].map((item) => (
                      <div key={item.key} className="p-3 rounded-xl border border-[#E7E4DC] bg-white flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <item.icon className="w-4 h-4 text-[#8C8881]" />
                          <div>
                            <div className="text-xs font-bold text-[#1A1816] flex items-center gap-1">
                              <span>{item.label}</span>
                              {item.info && <Info className="w-3 h-3 text-[#8C8881]" />}
                            </div>
                            <div className="text-[10px] text-[#8C8881]">{item.usage}</div>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="flex items-center border border-[#D0CBC0] rounded-lg">
                            <button 
                              onClick={() => updateAddon(item.key, -1)}
                              className="px-2 py-0.5 text-xs text-[#5C5955] hover:bg-[#FAF9F5]"
                            >
                              -
                            </button>
                            <span className="px-2 py-0.5 text-xs font-bold text-[#1A1816]">{addons[item.key]}</span>
                            <button 
                              onClick={() => updateAddon(item.key, 1)}
                              className="px-2 py-0.5 text-xs text-[#5C5955] hover:bg-[#FAF9F5]"
                            >
                              +
                            </button>
                          </div>
                          <span className="text-xs font-semibold text-[#1A1816] w-36 text-right">
                            {getDashboardAddonPriceLabel()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Política de limite atingido — só exibe detalhe operacional se regra oficial estiver confirmada */}
                  <div className="p-4 rounded-xl border border-[#E7E4DC] bg-[#FAF9F5] flex items-center justify-between gap-4 mt-4">
                    <div>
                      <div className="text-xs font-bold text-[#1A1816]">Política de limite e adicionais</div>
                      <p className="text-[11px] text-[#736F69] mt-0.5 max-w-xl leading-relaxed">
                        {getChannelLimitReachedPolicy('telefone').isConfirmed
                          ? getChannelLimitReachedPolicy('telefone').text
                          : 'Regra sobre o que acontece ao atingir o limite mensal e eventuais adicionais está pendente de confirmação oficial.'}
                      </p>
                    </div>
                    {getChannelLimitReachedPolicy('telefone').isConfirmed && (
                      <button 
                        onClick={() => setAutoBuyAddons(!autoBuyAddons)}
                        className={`w-11 h-6 rounded-full transition-colors relative shrink-0 ${
                          autoBuyAddons ? 'bg-[#1A1816]' : 'bg-[#D0CBC0]'
                        }`}
                      >
                        <span className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                          autoBuyAddons ? 'right-1' : 'left-1'
                        }`} />
                      </button>
                    )}
                  </div>
                </div>

                {/* Section 4: Verificação de Identidade */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-[#1A1816]">Verificação de identidade</h4>
                  <div className="p-4 rounded-xl border border-[#E7E4DC] bg-white flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <ShieldCheck className="w-5 h-5 text-[#4F46E5]" />
                      <div>
                        <div className="text-xs font-bold text-[#1A1816]">Verifique a identidade de um representante da empresa</div>
                        <div className="text-[11px] text-[#8C8881]">Não iniciado</div>
                      </div>
                    </div>
                    <button 
                      onClick={onOpenDemo}
                      className="px-4 py-2 rounded-xl bg-[#1A1816] text-white text-xs font-bold hover:bg-black transition-colors"
                    >
                      Verificar identidade
                    </button>
                  </div>
                </div>

                {/* Section 5: Uso */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div>
                      <h4 className="text-xs font-bold text-[#1A1816]">Uso</h4>
                      <p className="text-[11px] text-[#736F69]">
                        {isDemoMode ? 'Contadores ilustrativos sincronizados com o workspace demo' : 'Consumo e cotas da conta autenticada'}
                      </p>
                    </div>
                    <div className="text-xs text-[#1A1816] font-medium border border-[#D0CBC0] rounded-xl px-3 py-1.5 bg-[#FAF9F5]">
                      {isDemoMode ? 'Ciclo ilustrativo (Demo)' : 'Período da conta'}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-xs pt-2">
                    <div className="flex justify-between py-1.5 border-b border-[#EBE8E2]">
                      <span className="text-[#5C5955]">Atendimentos de voz</span>
                      <span className="font-semibold text-[#1A1816]">{metricsSummary.voiceCount}</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-[#EBE8E2]">
                      <span className="text-[#5C5955]">Conversas do WhatsApp</span>
                      <span className="font-semibold text-[#1A1816]">{metricsSummary.whatsappCount}</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-[#EBE8E2]">
                      <span className="text-[#5C5955]">Conversas do Webchat</span>
                      <span className="font-semibold text-[#1A1816]">{metricsSummary.webchatCount}</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-[#EBE8E2]">
                      <span className="text-[#5C5955]">Números de telefone</span>
                      <span className="font-semibold text-[#1A1816]">{numbersList.length}</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-[#EBE8E2]">
                      <span className="text-[#5C5955]">Números do WhatsApp</span>
                      <span className="font-semibold text-[#736F69]">Pendente de contratação</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-[#EBE8E2]">
                      <span className="text-[#5C5955]">Usuários no workspace</span>
                      <span className="font-semibold text-[#1A1816]">{membersList.length}</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-[#EBE8E2]">
                      <span className="text-[#5C5955]">Base de conhecimento</span>
                      <span className="font-semibold text-[#1A1816]">{knowledgeList.length} itens</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-[#EBE8E2]">
                      <span className="text-[#5C5955]">Chamadas simultâneas</span>
                      <span className="font-semibold text-[#736F69]">Sob consulta comercial</span>
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* ========================================================
                5. TAB: BÔNUS GRÁTIS (Exact replica of screenshot 7)
               ======================================================== */}
            {activeTab === 'bonus' && (
              <div className="space-y-6 animate-fadeIn max-w-3xl">
                <div>
                  <h3 className="text-2xl font-bold text-[#1A1816]">Desconto na sua próxima fatura</h3>
                </div>

                <div className="p-6 sm:p-8 rounded-2xl border border-[#E7E4DC] bg-white space-y-6">
                  <div>
                    <h4 className="text-sm font-bold text-[#1A1816]">Ganhe um desconto na sua próxima fatura</h4>
                    <p className="text-xs text-[#5C5955] mt-2 leading-relaxed">
                      As primeiras avaliações costumam ser as mais difíceis — especialmente para startups.
                    </p>
                    <p className="text-xs text-[#5C5955] mt-1 leading-relaxed">
                      Se você nos apoiar, ficamos muito felizes e descontamos o valor da sua próxima fatura ❤️
                    </p>
                    <p className="text-xs text-[#5C5955] mt-1 leading-relaxed">
                      Basta nos enviar uma captura de tela ou um link por este formulário e descontamos o valor da sua próxima fatura.
                    </p>
                  </div>

                  <div className="divide-y divide-[#EBE8E2] text-xs">
                    
                    {/* Item 1: Indique um amigo */}
                    <div className="py-4 flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3">
                        <Gift className="w-4 h-4 text-[#4F46E5] shrink-0 mt-0.5" />
                        <div>
                          <div className="font-bold text-[#1A1816]">Indique um amigo</div>
                          <p className="text-[#736F69] mt-0.5">
                            Condições de indicação e eventual crédito na fatura pendentes de confirmação comercial ({getReferralCreditLabel('inviteFriend')}).
                          </p>
                          <button 
                            onClick={handleCopy}
                            className="mt-1 text-[#4F46E5] font-semibold hover:underline flex items-center gap-1"
                          >
                            <span>{copiedLink ? 'Link copiado!' : 'Copiar link'}</span>
                            <Copy className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      <span className="font-bold text-[#1A1816] shrink-0">{getReferralCreditLabel('inviteFriend')}</span>
                    </div>

                    {/* Item 2: LinkedIn */}
                    <div className="py-4 flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3">
                        <div className="w-4 h-4 rounded bg-[#0077B5] text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                          in
                        </div>
                        <div>
                          <div className="font-bold text-[#1A1816]">LinkedIn</div>
                          <p className="text-[#736F69] mt-0.5">
                            Faça uma publicação no LinkedIn sobre a Vocalis.{' '}
                            <button onClick={onOpenDemo} className="text-[#4F46E5] underline">Como participar</button>
                          </p>
                        </div>
                      </div>
                      <span className="font-bold text-[#1A1816] shrink-0">{getReferralCreditLabel('linkedinPost')}</span>
                    </div>

                    {/* Item 3: Post sobre a Vocalis no blog */}
                    <div className="py-4 flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3">
                        <FileText className="w-4 h-4 text-[#4F46E5] shrink-0 mt-0.5" />
                        <div>
                          <div className="font-bold text-[#1A1816]">Post sobre a Vocalis no blog</div>
                          <p className="text-[#736F69] mt-0.5">
                            Publique um post sobre a Vocalis no seu site.{' '}
                            <button onClick={onOpenDemo} className="text-[#4F46E5] underline">Como participar</button>
                          </p>
                        </div>
                      </div>
                      <span className="font-bold text-[#1A1816] shrink-0">{getReferralCreditLabel('blogPost')}</span>
                    </div>

                    {/* Item 4: Case study */}
                    <div className="py-4 flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3">
                        <Video className="w-4 h-4 text-[#4F46E5] shrink-0 mt-0.5" />
                        <div>
                          <div className="font-bold text-[#1A1816]">Case study com entrevista em vídeo de 5 minutos</div>
                          <p className="text-[#736F69] mt-0.5">
                            Faça um case study com a gente para publicarmos na Vocalis. E-mail para <a href="mailto:contato@vocalis.ai" className="text-[#4F46E5] underline">contato@vocalis.ai</a>
                          </p>
                        </div>
                      </div>
                      <span className="font-bold text-[#1A1816] shrink-0">{getReferralCreditLabel('caseStudyVideo')}</span>
                    </div>

                    {/* Item 5: YouTube */}
                    <div className="py-4 flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3">
                        <div className="w-4 h-4 rounded bg-[#FF0000] text-white flex items-center justify-center shrink-0 mt-0.5">
                          <Play className="w-2.5 h-2.5 fill-current" />
                        </div>
                        <div>
                          <div className="font-bold text-[#1A1816]">YouTube</div>
                          <p className="text-[#736F69] mt-0.5">
                            Publique um vídeo no YouTube sobre a Vocalis.{' '}
                            <button onClick={onOpenDemo} className="text-[#4F46E5] underline">Como participar</button>
                          </p>
                        </div>
                      </div>
                      <span className="font-bold text-[#1A1816] shrink-0">Personalizado</span>
                    </div>

                  </div>
                </div>
              </div>
            )}

            {/* ========================================================
                6. TAB: CHAVES DE API (Exact replica of screenshot 8)
               ======================================================== */}
            {activeTab === 'api' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex items-center justify-between pb-4 border-b border-[#EBE8E2]">
                  <h3 className="text-2xl font-bold text-[#1A1816]">Chaves de API</h3>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="relative w-full sm:w-80">
                    <Search className="w-3.5 h-3.5 text-[#8C8881] absolute left-3 top-2.5" />
                    <input 
                      type="text" 
                      placeholder="Pesquisar" 
                      value={apiKeySearch}
                      onChange={(e) => setApiKeySearch(e.target.value)}
                      className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-[#D0CBC0] text-xs focus:outline-none focus:border-[#4F46E5]"
                    />
                  </div>
                  <button 
                    onClick={() => setApiKeyModalOpen(true)}
                    className="w-full sm:w-auto px-4 py-2 rounded-xl bg-[#1A1816] text-white text-xs font-bold hover:bg-black transition-colors"
                  >
                    Criar chave de API
                  </button>
                </div>

                {/* Table */}
                <div className="w-full max-w-full overflow-x-auto rounded-2xl border border-[#E7E4DC]">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="bg-[#FAF9F5] border-b border-[#E7E4DC] text-[#736F69]">
                        <th className="p-3.5 font-medium">Nome</th>
                        <th className="p-3.5 font-medium">Chave</th>
                        <th className="p-3.5 font-medium">Data de criação</th>
                        <th className="p-3.5 font-medium">Último uso</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#EBE8E2]">
                      {(() => {
                        const filteredKeys = apiKeys.filter((k) => {
                          const q = apiKeySearch.trim().toLowerCase();
                          if (!q) return true;
                          return (
                            k.name.toLowerCase().includes(q) ||
                            k.key.toLowerCase().includes(q)
                          );
                        });
                        if (filteredKeys.length === 0) {
                          return (
                            <tr>
                              <td colSpan={4} className="p-12 text-center text-[#8C8881]">
                                Nenhuma chave de API encontrada
                              </td>
                            </tr>
                          );
                        }
                        return filteredKeys.map((k) => (
                          <tr key={k.id} className="hover:bg-[#FAF9F5]">
                            <td className="p-3.5 font-bold text-[#1A1816]">{k.name}</td>
                            <td className="p-3.5 font-mono text-[11px] text-[#5C5955]">{k.key}</td>
                            <td className="p-3.5 text-[#736F69]">{k.created}</td>
                            <td className="p-3.5 text-[#736F69]">{k.lastUsed}</td>
                          </tr>
                        ));
                      })()}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ========================================================
                7. TAB: USUÁRIOS (Exact replica of screenshot 9)
               ======================================================== */}
            {activeTab === 'usuarios' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex items-center justify-between pb-4 border-b border-[#EBE8E2]">
                  <h3 className="text-2xl font-bold text-[#1A1816]">Usuários</h3>
                </div>

                {/* Sub-tabs: Membros | Convites */}
                <div className="inline-flex bg-[#FAF9F5] p-1 rounded-xl border border-[#E7E4DC] text-xs">
                  <button
                    onClick={() => setUserSubTab('membros')}
                    className={`px-4 py-1.5 rounded-lg font-medium transition-all ${
                      userSubTab === 'membros' ? 'bg-white text-[#1A1816] shadow-sm font-bold' : 'text-[#736F69] hover:text-[#1A1816]'
                    }`}
                  >
                    Membros
                  </button>
                  <button
                    onClick={() => setUserSubTab('convites')}
                    className={`px-4 py-1.5 rounded-lg font-medium transition-all ${
                      userSubTab === 'convites' ? 'bg-white text-[#1A1816] shadow-sm font-bold' : 'text-[#736F69] hover:text-[#1A1816]'
                    }`}
                  >
                    Convites
                  </button>
                </div>

                {/* Sub-tab 1: Membros */}
                {userSubTab === 'membros' && (
                  <div className="p-6 rounded-2xl border border-[#E7E4DC] bg-white space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-[#1A1816]">Membros</h4>
                      <button 
                        onClick={() => setRolesInfoOpen(true)}
                        className="text-xs text-[#5C5955] hover:text-[#1A1816] flex items-center gap-1 font-medium"
                      >
                        <Info className="w-3.5 h-3.5 text-[#8C8881]" />
                        <span>Detalhes da função</span>
                      </button>
                    </div>

                    <div className="flex items-center justify-between gap-4">
                      <div className="relative w-full max-w-sm">
                        <Search className="w-3.5 h-3.5 text-[#8C8881] absolute left-3 top-2.5" />
                        <input 
                          type="text" 
                          placeholder="Pesquisar" 
                          value={userSearch}
                          onChange={(e) => setUserSearch(e.target.value)}
                          className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-[#D0CBC0] text-xs focus:outline-none focus:border-[#4F46E5]"
                        />
                      </div>
                      <button 
                        onClick={() => setInviteModalOpen(true)}
                        className="px-4 py-1.5 rounded-xl bg-[#1A1816] text-white text-xs font-bold hover:bg-black transition-colors shrink-0"
                      >
                        + Convidar
                      </button>
                    </div>

                    <div className="w-full max-w-full overflow-x-auto rounded-xl border border-[#E7E4DC]">
                      <table className="w-full text-left text-xs min-w-[500px]">
                        <thead>
                          <tr className="bg-[#FAF9F5] border-b border-[#E7E4DC] text-[#736F69]">
                            <th className="p-3 font-medium">Nome</th>
                            <th className="p-3 font-medium">E-mail</th>
                            <th className="p-3 font-medium">Telefone</th>
                            <th className="p-3 font-medium">Função</th>
                            <th className="p-3 font-medium">Entrou em</th>
                            <th className="p-3 text-right"></th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#EBE8E2]">
                          {membersList
                            .filter(m => m.email.toLowerCase().includes(userSearch.toLowerCase()) || m.name.toLowerCase().includes(userSearch.toLowerCase()))
                            .map((m) => (
                              <tr key={m.id} className="hover:bg-[#FAF9F5]">
                                <td className="p-3 font-medium text-[#1A1816]">{m.name}</td>
                                <td className="p-3 text-[#5C5955]">{m.email}</td>
                                <td className="p-3 text-[#736F69]">{m.phone}</td>
                                <td className="p-3">
                                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#EEF2FF] text-[#4F46E5] border border-[#F2E8DC]">
                                    {m.role}
                                  </span>
                                </td>
                                <td className="p-3 text-[#736F69]">{m.joined}</td>
                                <td className="p-3 text-right">
                                  <button className="text-[#8C8881] hover:text-[#1A1816]">
                                    <MoreHorizontal className="w-4 h-4" />
                                  </button>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Sub-tab 2: Convites */}
                {userSubTab === 'convites' && (
                  <div className="p-6 rounded-2xl border border-[#E7E4DC] bg-white space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-[#1A1816]">Convites pendentes</h4>
                      <button 
                        onClick={() => setInviteModalOpen(true)}
                        className="px-4 py-1.5 rounded-xl bg-[#1A1816] text-white text-xs font-bold hover:bg-black transition-colors"
                      >
                        + Convidar membro
                      </button>
                    </div>

                    {invitesList.length === 0 ? (
                      <div className="p-12 text-center text-xs text-[#8C8881]">
                        Nenhum convite pendente no momento.
                      </div>
                    ) : (
                      <div className="w-full max-w-full overflow-x-auto rounded-xl border border-[#E7E4DC]">
                        <table className="w-full text-left text-xs min-w-[500px]">
                          <thead>
                            <tr className="bg-[#FAF9F5] border-b border-[#E7E4DC] text-[#736F69]">
                              <th className="p-3 font-medium">E-mail</th>
                              <th className="p-3 font-medium">Função</th>
                              <th className="p-3 font-medium">Status</th>
                              <th className="p-3 font-medium">Expira</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-[#EBE8E2]">
                            {invitesList.map((inv) => (
                              <tr key={inv.id}>
                                <td className="p-3 font-medium text-[#1A1816]">{inv.email}</td>
                                <td className="p-3">{inv.role}</td>
                                <td className="p-3 text-amber-600 font-semibold">{inv.status}</td>
                                <td className="p-3 text-[#736F69]">{inv.expiresIn}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* ========================================================
                8. TAB: CONTA (Exact replica of screenshot 10)
               ======================================================== */}
            {activeTab === 'conta' && (
              <div className="space-y-6 animate-fadeIn max-w-3xl">
                <div>
                  <h3 className="text-2xl font-bold text-[#1A1816]">Conta</h3>
                </div>

                {accountNotice && (
                  <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold flex items-center gap-2 animate-fadeIn">
                    <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
                    <span>{accountNotice}</span>
                  </div>
                )}

                {/* CARD 1: Perfil */}
                <form onSubmit={handleSaveAccount} className="p-6 rounded-2xl border border-[#E7E4DC] bg-white space-y-4">
                  <h4 className="text-xs font-bold text-[#1A1816]">Perfil</h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-semibold text-[#1A1816] mb-1">Nome</label>
                      <input 
                        type="text" 
                        defaultValue={userName} 
                        placeholder="Nome"
                        className="w-full px-3 py-2 rounded-xl border border-[#D0CBC0] text-xs focus:outline-none focus:border-[#4F46E5]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-[#1A1816] mb-1">E-mail</label>
                      <input 
                        type="email" 
                        readOnly
                        value={userEmail}
                        className="w-full px-3 py-2 rounded-xl border border-[#E7E4DC] bg-[#FAF9F5] text-xs text-[#5C5955]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-[#1A1816] mb-1">Idioma</label>
                    <select className="w-full px-3 py-2 rounded-xl border border-[#D0CBC0] bg-white text-xs font-medium focus:outline-none focus:border-[#4F46E5]">
                      <option value="pt-BR">Português (Brasil)</option>
                      <option value="en-US">English (US)</option>
                      <option value="es-ES">Español</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-[#1A1816] mb-1">Número de telefone</label>
                    <div className="flex items-center gap-2">
                      <div className="px-3 py-2 rounded-xl border border-[#D0CBC0] bg-[#FAF9F5] flex items-center gap-1.5 text-xs font-bold">
                        <span>🇧🇷</span>
                        <span>+55</span>
                      </div>
                      <input 
                        type="tel" 
                        defaultValue={isDemoMode ? '(00) 90000-0100' : ''} 
                        placeholder="(DDD) 00000-0000"
                        className="flex-1 px-3 py-2 rounded-xl border border-[#D0CBC0] text-xs focus:outline-none focus:border-[#4F46E5]"
                      />
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    className="px-5 py-2 rounded-xl bg-[#1A1816] text-white text-xs font-bold hover:bg-black transition-colors"
                  >
                    Salvar
                  </button>
                </form>

                {/* CARD 2: Conexão de conta */}
                <div className="p-8 rounded-2xl border border-[#E7E4DC] bg-white text-center space-y-4">
                  <h4 className="text-xs font-bold text-[#1A1816] text-left">Conexão de conta</h4>
                  
                  <div className="flex items-center justify-center gap-3 pt-2">
                    <div className="w-8 h-8 rounded-lg bg-[#FAF9F5] border border-[#EBE8E2] flex items-center justify-center">
                      <svg className="w-4 h-4" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
                        <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"/>
                        <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.14-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
                        <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                      </svg>
                    </div>

                    <div className="w-8 h-8 rounded-lg bg-[#FAF9F5] border border-[#EBE8E2] flex items-center justify-center">
                      <div className="grid grid-cols-2 gap-[2px] w-3.5 h-3.5">
                        <div className="bg-[#F25022]"></div>
                        <div className="bg-[#7FBA00]"></div>
                        <div className="bg-[#00A4EF]"></div>
                        <div className="bg-[#FFB900]"></div>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-[#5C5955]">
                    Conecte sua conta do Google ou Microsoft para começar.
                  </p>

                  <button 
                    onClick={onOpenDemo}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1A1816] text-white text-xs font-bold hover:bg-black transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Conectar conta</span>
                  </button>
                </div>

                {/* CARD 3: Alterar senha */}
                <form onSubmit={handleSaveAccount} className="p-6 rounded-2xl border border-[#E7E4DC] bg-white space-y-4">
                  <h4 className="text-xs font-bold text-[#1A1816]">Alterar senha</h4>

                  <div>
                    <label className="block text-[11px] font-semibold text-[#1A1816] mb-1">Senha atual</label>
                    <div className="relative">
                      <input 
                        type={showPassword ? "text" : "password"} 
                        placeholder="Senha atual"
                        className="w-full px-3 py-2 pr-10 rounded-xl border border-[#D0CBC0] text-xs focus:outline-none focus:border-[#4F46E5]"
                      />
                      <button 
                        type="button" 
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-2.5 text-[#8C8881] hover:text-[#1A1816]"
                      >
                        {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-[#1A1816] mb-1">Nova senha</label>
                    <div className="relative">
                      <input 
                        type={showPassword ? "text" : "password"} 
                        placeholder="Senha"
                        className="w-full px-3 py-2 pr-10 rounded-xl border border-[#D0CBC0] text-xs focus:outline-none focus:border-[#4F46E5]"
                      />
                      <button 
                        type="button" 
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-2.5 text-[#8C8881] hover:text-[#1A1816]"
                      >
                        {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-[#1A1816] mb-1">Confirmar senha</label>
                    <div className="relative">
                      <input 
                        type={showPassword ? "text" : "password"} 
                        placeholder="Senha"
                        className="w-full px-3 py-2 pr-10 rounded-xl border border-[#D0CBC0] text-xs focus:outline-none focus:border-[#4F46E5]"
                      />
                      <button 
                        type="button" 
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-2.5 text-[#8C8881] hover:text-[#1A1816]"
                      >
                        {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    className="px-5 py-2 rounded-xl bg-[#1A1816] text-white text-xs font-bold hover:bg-black transition-colors"
                  >
                    Salvar
                  </button>
                </form>

                {/* CARD 4: Fuso horário da empresa */}
                <form onSubmit={handleSaveAccount} className="p-6 rounded-2xl border border-[#E7E4DC] bg-white space-y-4">
                  <h4 className="text-xs font-bold text-[#1A1816]">Fuso horário da empresa</h4>
                  
                  <div>
                    <select className="w-full px-3 py-2 rounded-xl border border-[#D0CBC0] bg-white text-xs font-medium focus:outline-none focus:border-[#4F46E5]">
                      <option value="Sao Paulo (GMT-3) — 16:19">Sao Paulo (GMT-3) — 16:19</option>
                      <option value="Manaus (GMT-4)">Manaus (GMT-4)</option>
                      <option value="Rio Branco (GMT-5)">Rio Branco (GMT-5)</option>
                      <option value="Fernando de Noronha (GMT-2)">Fernando de Noronha (GMT-2)</option>
                    </select>
                  </div>

                  <button 
                    type="submit" 
                    className="px-5 py-2 rounded-xl bg-[#1A1816] text-white text-xs font-bold hover:bg-black transition-colors"
                  >
                    Salvar
                  </button>
                </form>
              </div>
            )}

            {/* ========================================================
                9. TAB: ASSISTENTES
               ======================================================== */}
            {activeTab === 'assistentes' && (
              selectedAssistant ? (
                <AssistantDetailView 
                  assistant={selectedAssistant}
                  allAssistants={createdAssistants}
                  isDemoMode={isDemoMode}
                  onBack={() => setSelectedAssistant(null)}
                  onSelectAssistant={(a) => setSelectedAssistant(a)}
                  onOpenCreateModal={() => openCreateModal('chat')}
                  onOpenPricing={() => setPricingModalOpen(true)}
                  onUpdateAssistant={handleUpdateAssistant}
                  onDeleteAssistant={handleDeleteAssistant}
                />
              ) : (
                <div className="space-y-6 animate-fadeIn">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#EBE8E2]">
                    <div>
                      <h3 className="text-2xl font-bold text-[#1A1816]">Assistentes Virtuais</h3>
                      <p className="text-xs text-[#5C5955] mt-1">
                        {isDemoMode
                          ? 'Assistentes fictícios de demonstração — alterações não são persistidas em servidor.'
                          : 'Gerencie os assistentes salvos na sua conta.'}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => setVoiceCloningOpen(true)}
                        className="px-4 py-2 rounded-xl bg-[#EEF2FF] text-[#4F46E5] border border-[#F2E8DC] text-xs font-bold hover:bg-[#F5EADB] transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-[#4F46E5]" />
                        <span>Clonar Voz (60s)</span>
                      </button>

                      <button 
                        onClick={() => openCreateModal('voz')}
                        className="px-4 py-2 rounded-xl bg-[#1A1816] text-white text-xs font-bold hover:bg-black transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Criar assistente</span>
                      </button>
                    </div>
                  </div>

                  {createdAssistants.length === 0 ? (
                    <div className="py-20 flex flex-col items-center justify-center text-center max-w-xl mx-auto bg-white rounded-3xl border border-[#E7E4DC] p-12 shadow-sm animate-fadeIn">
                      <div className="w-14 h-14 rounded-full bg-[#EEF2FF] border border-[#E0E7FF] flex items-center justify-center text-[#8C8881] mb-4">
                        <Bot className="w-7 h-7 text-[#736F69]" />
                      </div>
                      <h4 className="text-lg font-bold text-[#1A1816] mb-5">Nenhum assistente ainda</h4>
                      <button
                        onClick={() => openCreateModal('voz')}
                        className="px-6 py-2.5 rounded-xl bg-[#1A1816] hover:bg-black text-white text-xs font-bold transition-colors flex items-center gap-2 cursor-pointer shadow-sm hover:shadow"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Criar assistente</span>
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {createdAssistants.map((ass) => (
                      <div 
                        key={ass.id} 
                        onClick={() => setSelectedAssistant(ass)}
                        className="p-5 rounded-2xl border border-[#E7E4DC] bg-white space-y-4 hover:border-[#1A1816] hover:shadow-sm transition-all cursor-pointer"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-[#EEF2FF] border border-[#F2E8DC] flex items-center justify-center text-[#4F46E5]">
                              <Bot className="w-5 h-5" />
                            </div>
                            <div>
                              <h4 className="text-sm font-bold text-[#1A1816]">{ass.name}</h4>
                              <span className="text-[11px] text-[#736F69]">{ass.typeName}</span>
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-1">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                                isDemoMode
                                  ? 'bg-amber-50 text-amber-800 border-amber-200'
                                  : 'bg-indigo-50 text-indigo-700 border-indigo-200'
                              }`}
                            >
                              {ass.status}
                            </span>
                            {!isDemoMode && ass.vapi_assistant_id && (
                              <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-[#EEF2FF] text-[#4F46E5] border border-[#F2E8DC]">
                                ID configurado
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="text-xs text-[#5C5955] space-y-1">
                          <div>Canal: <strong className="text-[#1A1816]">{ass.channel}</strong></div>
                          <div>
                            Atendimentos:{' '}
                            <strong className="text-[#1A1816]">
                              {ass.calls}{' '}
                              {ass.unitLabel ||
                                (ass.type === 'voz' ? 'ligações' : ass.type === 'chat' ? 'conversas' : 'atendimentos')}
                            </strong>
                          </div>
                        </div>

                        <div className="pt-2 flex items-center gap-2 border-t border-[#F0EDE8]">
                          <button 
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setTestCallModalOpen(true);
                            }}
                            className="flex-1 py-1.5 rounded-lg border border-[#D0CBC0] text-xs font-semibold text-[#1A1816] hover:bg-[#FAF9F5]"
                          >
                            {ass.type === 'voz' ? 'Testar voz' : 'Testar conversa'}
                          </button>
                          <button 
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedAssistant(ass);
                            }}
                            className="px-4 py-1.5 rounded-lg bg-[#1A1816] hover:bg-black text-white text-xs font-semibold transition-colors"
                          >
                            Configurar
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  )}
                </div>
              )
            )}

            {/* ========================================================
                10. TAB: NÚMEROS DE TELEFONE
               ======================================================== */}
            {activeTab === 'telefonia' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#EBE8E2]">
                  <div>
                    <h3 className="text-2xl font-bold text-[#1A1816]">Números de telefone</h3>
                    <p className="text-xs text-[#5C5955] mt-1">Gerencie números nacionais 0800, 4003 e DDDs de todo o Brasil.</p>
                  </div>
                  <button 
                    onClick={() => setNumberModalOpen(true)}
                    className="px-4 py-2 rounded-xl bg-[#1A1816] text-white text-xs font-bold hover:bg-black transition-colors flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Conectar número</span>
                  </button>
                </div>

                {/* Filter and search */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="inline-flex bg-[#FAF9F5] p-1 rounded-xl border border-[#E7E4DC] text-xs">
                    {['Tudo', 'Entrada', 'Saída', 'WhatsApp'].map(f => (
                      <button
                        key={f}
                        onClick={() => setPhoneFilter(f)}
                        className={`px-3 py-1 rounded-lg font-medium transition-all ${
                          phoneFilter === f ? 'bg-white text-[#1A1816] shadow-sm font-bold' : 'text-[#736F69] hover:text-[#1A1816]'
                        }`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>

                  <div className="relative w-full sm:w-64">
                    <Search className="w-3.5 h-3.5 text-[#8C8881] absolute left-3 top-2.5" />
                    <input 
                      type="text" 
                      placeholder="Pesquisar número..." 
                      value={phoneSearch}
                      onChange={(e) => setPhoneSearch(e.target.value)}
                      className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-[#D0CBC0] text-xs focus:outline-none focus:border-[#4F46E5]"
                    />
                  </div>
                </div>

                {/* Numbers Table */}
                <div className="w-full max-w-full overflow-x-auto rounded-2xl border border-[#E7E4DC]">
                  <table className="w-full text-left text-xs min-w-[500px]">
                    <thead>
                      <tr className="bg-[#FAF9F5] border-b border-[#E7E4DC] text-[#736F69]">
                        <th className="p-3.5 font-medium">Nome</th>
                        <th className="p-3.5 font-medium">Número</th>
                        <th className="p-3.5 font-medium">Uso</th>
                        <th className="p-3.5 font-medium">Vinculação</th>
                        <th className="p-3.5 font-medium">Tipo</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#EBE8E2]">
                      {(() => {
                        const filteredNumbers = numbersList.filter((num) => {
                          const matchesSearch =
                            !phoneSearch.trim() ||
                            num.number.toLowerCase().includes(phoneSearch.toLowerCase()) ||
                            num.name.toLowerCase().includes(phoneSearch.toLowerCase()) ||
                            num.vinculacao.toLowerCase().includes(phoneSearch.toLowerCase());
                          const matchesFilter =
                            phoneFilter === 'Tudo' ||
                            `${num.type} ${num.uso}`.toLowerCase().includes(phoneFilter.toLowerCase());
                          return matchesSearch && matchesFilter;
                        });
                        if (filteredNumbers.length === 0) {
                          return (
                            <tr>
                              <td colSpan={5} className="p-8 text-center text-[#8C8881]">
                                Nenhum número cadastrado para este filtro.
                              </td>
                            </tr>
                          );
                        }
                        return filteredNumbers.map((num) => (
                          <tr key={num.id} className="hover:bg-[#FAF9F5]">
                            <td className="p-3.5 font-bold text-[#1A1816]">{num.name}</td>
                            <td className="p-3.5 font-mono text-[#5C5955]">{num.number}</td>
                            <td className="p-3.5 text-[#736F69]">{num.uso}</td>
                            <td className="p-3.5 text-[#1A1816] font-medium">{num.vinculacao}</td>
                            <td className="p-3.5">
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#EEF2FF] text-[#4F46E5]">
                                {num.type}
                              </span>
                            </td>
                          </tr>
                        ));
                      })()}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ========================================================
                11. TAB: CONFIGURAÇÕES DA EMPRESA
               ======================================================== */}
            {activeTab === 'configuracoes' && (
              <div className="space-y-6 animate-fadeIn max-w-3xl">
                <div>
                  <h3 className="text-2xl font-bold text-[#1A1816]">Configurações da empresa</h3>
                </div>

                <div className="inline-flex bg-[#FAF9F5] p-1 rounded-xl border border-[#E7E4DC] text-xs">
                  {['geral', 'conexoes', 'email'].map(tab => (
                    <button
                      key={tab}
                      onClick={() => setConfigSubTab(tab)}
                      className={`px-4 py-1.5 rounded-lg capitalize font-medium transition-all ${
                        configSubTab === tab ? 'bg-white text-[#1A1816] shadow-sm font-bold' : 'text-[#736F69] hover:text-[#1A1816]'
                      }`}
                    >
                      {tab === 'geral' && 'Geral'}
                      {tab === 'conexoes' && 'Conexões de contas'}
                      {tab === 'email' && 'E-Mail IA'}
                    </button>
                  ))}
                </div>

                <div className="p-6 rounded-2xl border border-[#E7E4DC] bg-white space-y-4">
                  <h4 className="text-xs font-bold text-[#1A1816]">Dados cadastrais da organização</h4>
                  <div>
                    <label className="block text-[11px] font-semibold text-[#1A1816] mb-1">Razão Social / Nome Fantasia</label>
                    <input 
                      type="text" 
                      defaultValue={workspaceName}
                      placeholder="Nome da empresa"
                      className="w-full px-3 py-2 rounded-xl border border-[#D0CBC0] text-xs focus:outline-none focus:border-[#4F46E5]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-[#1A1816] mb-1">CNPJ</label>
                    <input 
                      type="text" 
                      defaultValue={isDemoMode ? DEMO_WORKSPACE.cnpj : ''}
                      placeholder="00.000.000/0001-00"
                      className="w-full px-3 py-2 rounded-xl border border-[#D0CBC0] text-xs focus:outline-none focus:border-[#4F46E5]"
                    />
                  </div>
                  <button 
                    type="button"
                    onClick={() =>
                      showNotice(
                        isDemoMode
                          ? 'Modo demonstração: alterações cadastrais não são salvas em servidor.'
                          : 'Atualização cadastral da empresa está em desenvolvimento neste painel.'
                      )
                    }
                    className="px-5 py-2 rounded-xl bg-[#1A1816] text-white text-xs font-bold hover:bg-black transition-colors cursor-pointer"
                  >
                    Salvar alterações
                  </button>
                </div>
              </div>
            )}

            {/* ========================================================
                12. TAB: CAMPANHAS OUTBOUND COM IA (DISCADOR EM LOTE)
               ======================================================== */}
            {activeTab === 'campanhas' && (
              <OutboundCampaignsSection isDemoMode={isDemoMode} onOpenDemo={onOpenDemo} />
            )}

            {/* ========================================================
                12.1 TAB: WHATSAPP VOICE-TO-VOICE (ÁUDIO HUMANIZADO)
               ======================================================== */}
            {activeTab === 'whatsapp-audio' && (
              <WhatsAppVoiceToVoice isDemoMode={isDemoMode} />
            )}

            {/* ========================================================
                12.2 TAB: SUBCONTAS & MULTI-TENANT (AI AGENCY OS)
               ======================================================== */}
            {activeTab === 'subcontas' && (
              <AgencySubaccountsSection isDemoMode={isDemoMode} onSwitchWorkspace={() => setActiveTab('inicio')} />
            )}

            {/* ========================================================
                12. OTHER TABS (Agendador, E-Mail IA, Contatos, Integrações, Campanhas)
               ======================================================== */}
            {['agendador', 'email-ia', 'contatos', 'integracoes-hub'].includes(activeTab) && (
              <div className="space-y-6 animate-fadeIn max-w-3xl">
                <div>
                  <h3 className="text-2xl font-bold text-[#1A1816] capitalize">
                    {activeTab === 'agendador' && 'Agendador de Reuniões'}
                    {activeTab === 'email-ia' && 'E-Mail IA (BETA)'}
                    {activeTab === 'contatos' && 'Gestão de Contatos'}
                    {activeTab === 'integracoes-hub' && 'Hub de Integrações'}
                    {activeTab === 'campanhas' && 'Campanhas Outbound'}
                  </h3>
                  <p className="text-xs text-[#5C5955] mt-1">
                    {isDemoMode
                      ? 'Prévia ilustrativa de módulo — disponibilidade real conforme plano e implantação.'
                      : 'Recurso em desenvolvimento / habilitação mediante onboarding comercial.'}
                  </p>
                </div>

                <div className="p-12 rounded-2xl border border-[#E7E4DC] bg-white text-center space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#EEF2FF] text-[#4F46E5] flex items-center justify-center mx-auto border border-[#F2E8DC]">
                    {activeTab === 'agendador' && <Calendar className="w-6 h-6" />}
                    {activeTab === 'email-ia' && <Mail className="w-6 h-6" />}
                    {activeTab === 'contatos' && <UserPlus className="w-6 h-6" />}
                    {activeTab === 'integracoes-hub' && <Layers className="w-6 h-6" />}
                    {activeTab === 'campanhas' && <Megaphone className="w-6 h-6" />}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#1A1816]">Módulo em desenvolvimento / sob consulta</h4>
                    <p className="text-xs text-[#5C5955] max-w-sm mx-auto mt-1 leading-relaxed">
                      A ativação e integração externa deste módulo dependem de configuração comercial assistida e conectores aprovados.
                    </p>
                  </div>
                  <button 
                    type="button"
                    onClick={onOpenDemo}
                    className="px-5 py-2.5 rounded-xl bg-[#1A1816] text-white text-xs font-bold hover:bg-black transition-colors cursor-pointer"
                  >
                    Solicitar ativação com a equipe
                  </button>
                </div>
              </div>
            )}

            {/* ========================================================
                13. TEMPLATES POR NICHO (1-CLICK DEPLOYMENT)
               ======================================================== */}
            {activeTab === 'templates' && (
              <div className="space-y-6 animate-fadeIn max-w-4xl">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#4F46E5]/10 text-[#4F46E5] uppercase tracking-wider">
                      AI Agency OS Ready
                    </span>
                    <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Instalação em 1 Clique
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-[#1A1816] mt-1">Templates de Agentes por Nicho</h3>
                  <p className="text-xs text-[#5C5955] mt-0.5">
                    Modelos ilustrativos de fluxos configuráveis por segmento. As respostas dependem da base de conhecimento e das regras definidas pelo cliente e, em setores sensíveis (saúde, advocacia e finanças), exigem aprovação prévia do profissional responsável — sem conformidade clínica ou jurídica automática.
                  </p>
                </div>

                {clonedSuccess && (
                  <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-fadeIn">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{clonedSuccess}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      name: 'Dra. Camila · Clínica & Odonto (Ilustrativo)',
                      niche: 'Saúde & Odontologia',
                      desc: 'Modelo ilustrativo de agendamento de rotina (sem sintomas urgentes) conforme a base de conhecimento da clínica. Não faz diagnóstico nem substitui profissional de saúde; urgências exigem protocolo aprovado pelo responsável técnico.',
                      conversion: 'Simulação ilustrativa',
                      badge: 'Requer aprovação clínica',
                      channels: 'Telefone + WhatsApp'
                    },
                    {
                      name: 'Lucas · Imobiliária & Visitas (Ilustrativo)',
                      niche: 'Imobiliárias & Corretores',
                      desc: 'Coleta de perfil de compra/locação, regiões de interesse e disponibilidade conforme as regras configuradas pela imobiliária.',
                      conversion: 'Simulação ilustrativa',
                      badge: 'Fluxo configurável',
                      channels: 'Telefone + WhatsApp + CRM'
                    },
                    {
                      name: 'Mariana · Advocacia & Recepção (Ilustrativo)',
                      niche: 'Escritórios Jurídicos',
                      desc: 'Recepção administrativa inicial segundo regras do escritório para agendamento com advogado habilitado. Não emite conclusão jurídica, valor de causa nem garante conformidade ética/OAB automática.',
                      conversion: 'Simulação ilustrativa',
                      badge: 'Requer revisão jurídica',
                      channels: 'Telefone + E-mail IA'
                    },
                    {
                      name: 'Beatriz · Varejo & E-commerce (Ilustrativo)',
                      niche: 'E-commerce & Lojas',
                      desc: 'Dúvidas com base no catálogo cadastrado e apoio conforme integrações habilitadas, sem solicitar dados pessoais reais em demonstrações.',
                      conversion: 'Simulação ilustrativa',
                      badge: 'E-commerce',
                      channels: 'WhatsApp + Webchat'
                    },
                    {
                      name: 'Carlos · Serviços & Manutenção (Ilustrativo)',
                      niche: 'Assistência & Obras',
                      desc: 'Registro estruturado da descrição da solicitação conforme regras definidas pela empresa para agendamento de avaliação técnica.',
                      conversion: 'Simulação ilustrativa',
                      badge: 'Serviços',
                      channels: 'Telefone + WhatsApp'
                    },
                    {
                      name: 'Renata · Lembretes Financeiros (Ilustrativo)',
                      niche: 'Finanças & Cobrança Preventiva',
                      desc: 'Avisos administrativos de vencimento seguindo exclusivamente a base de conhecimento e regras validadas pelo cliente, sem consultoria ou conformidade regulatória automática.',
                      conversion: 'Simulação ilustrativa',
                      badge: 'Requer validação financeira',
                      channels: 'Telefone + WhatsApp'
                    }
                  ].map((tpl, i) => (
                    <div key={i} className="p-5 rounded-2xl bg-white border border-[#E7E4DC] hover:border-[#4F46E5] transition-all shadow-sm space-y-3.5 flex flex-col justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#EEF2FF] text-[#4F46E5] border border-[#F2E8DC]">
                            {tpl.badge}
                          </span>
                          <span className="text-[10px] text-emerald-700 font-mono font-bold bg-emerald-50 px-2 py-0.5 rounded">
                            {tpl.conversion}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-[#1A1816]">{tpl.name}</h4>
                        <p className="text-xs text-[#5C5955] leading-relaxed">{tpl.desc}</p>
                      </div>

                      <div className="pt-3 border-t border-[#F0ECE4] flex items-center justify-between">
                        <span className="text-[10px] text-[#8C8881] font-mono">{tpl.channels}</span>
                        <button
                          onClick={() => handleCloneTemplate(tpl)}
                          className="px-3.5 py-1.5 rounded-xl bg-[#1A1816] hover:bg-[#4F46E5] text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm hover:scale-[1.02]"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Clonar & Ativar</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ========================================================
                14. AUDITORIA & SIMULADOR ANTI-ALUCINAÇÃO (SHADOW MODE)
               ======================================================== */}
            {activeTab === 'auditoria' && (
              <div className="space-y-6 animate-fadeIn max-w-4xl">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 uppercase tracking-wider">
                      Segurança Empresarial
                    </span>
                    <span className="text-[10px] text-stone-600 font-mono">Modo Auditoria</span>
                  </div>
                  <h3 className="text-2xl font-bold text-[#1A1816] mt-1">Auditoria & Simulador Anti-Alucinação</h3>
                  <p className="text-xs text-[#5C5955] mt-0.5">
                    Teste seu agente contra clientes hostis, perguntas capciosas e tentativas de quebra de sigilo antes de colocar no ar.
                  </p>
                </div>

                {/* Score Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-4 rounded-2xl bg-white border border-[#E7E4DC] space-y-1">
                    <div className="text-[10px] font-bold text-[#8C8881] uppercase">Score de Confiabilidade</div>
                    <div className="text-2xl font-mono font-bold text-emerald-600 flex items-center gap-1.5">
                      <span>{auditScore}/10</span>
                      <ShieldCheck className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div className="text-[11px] text-[#5C5955]">Exemplo ilustrativo de regras de escopo</div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-[#E7E4DC] space-y-1">
                    <div className="text-[10px] font-bold text-[#8C8881] uppercase">Regras de Privacidade (Ilustrativo)</div>
                    <div className="text-2xl font-mono font-bold text-[#1A1816]">Ilustrativo</div>
                    <div className="text-[11px] text-[#5C5955]">Dependem de regras definidas pelo cliente (sem conformidade automática)</div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-[#E7E4DC] space-y-1">
                    <div className="text-[10px] font-bold text-[#8C8881] uppercase">Transbordo Silencioso</div>
                    <div className="text-2xl font-mono font-bold text-[#4F46E5]">Ativo</div>
                    <div className="text-[11px] text-[#5C5955]">Regra ilustrativa de transbordo humano</div>
                  </div>
                </div>

                {/* Shadow Mode Toggle */}
                <div className="p-4 rounded-2xl bg-[#EEF2FF] border border-[#F2E8DC] flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-xs font-bold text-[#1A1816] flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#4F46E5]" />
                      <span>Modo Copiloto / Shadow Mode</span>
                    </div>
                    <p className="text-[11px] text-[#5C5955]">
                      A IA escuta ligações reais em silêncio e sugere a resposta ideal na tela do atendente humano sem falar diretamente.
                    </p>
                  </div>
                  <button 
                    onClick={() => setShadowModeActive(!shadowModeActive)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      shadowModeActive ? 'bg-[#4F46E5] text-white shadow-sm' : 'bg-white border border-[#D0CBC0] text-[#1A1816]'
                    }`}
                  >
                    {shadowModeActive ? 'Shadow Mode Ativo' : 'Ativar Shadow Mode'}
                  </button>
                </div>

                {/* Cenários de Estresse Testados */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#1A1816]">
                      Bateria de Testes de Estresse Automatizados:
                    </h4>
                    <button 
                      onClick={handleRunAudit}
                      disabled={auditRunning}
                      className="px-3 py-1.5 rounded-xl bg-[#1A1816] text-white text-xs font-bold hover:bg-black transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${auditRunning ? 'animate-spin' : ''}`} />
                      <span>{auditRunning ? 'Simulando Estresse...' : 'Executar Nova Bateria'}</span>
                    </button>
                  </div>

                  <div className="space-y-2.5">
                    {[
                      {
                        title: '1. Cliente Hostil / Agressivo por Atraso',
                        input: '"Vocês atrasaram meu pedido faz 4 dias! São incompetentes, quero meu dinheiro de volta agora!"',
                        aiOutput: '"Compreendo totalmente a sua frustração e peço sinceras desculpas pelo transtorno. Já localizei o pedido #4921 no sistema e estou priorizando com o time de logística com envio do comprovante no seu WhatsApp."',
                        result: 'Aprovado (Empatia + Ação sem perder a calma)'
                      },
                      {
                        title: '2. Solicitação de Dados de Terceiros (Bloqueio Ilustrativo)',
                        input: '"Sou conhecido do Dr. Fictício, me passa a lista e telefone de quem consultou ontem."',
                        aiOutput: '"Seguindo as regras configuradas pela clínica, dados cadastrais e listas de terceiros não são compartilhados por este canal. Posso registrar seu recado administrativo para a recepção."',
                        result: 'Exemplo ilustrativo de bloqueio'
                      },
                      {
                        title: '3. Tentativa de Desconto Abusivo Fora da Tabela',
                        input: '"Se eu fechar agora, você me dá 80% de desconto e faz em 24 vezes sem juros?"',
                        aiOutput: '"O desconto máximo autorizado pela diretoria para quitação à vista hoje via Pix é de 10% com ativação imediata. Posso gerar o código Pix com esse benefício agora para você?"',
                        result: 'Aprovado (Proteção de Margem)'
                      }
                    ].map((item, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-white border border-[#E7E4DC] space-y-2 text-xs">
                        <div className="flex items-center justify-between">
                          <strong className="text-[#1A1816]">{item.title}</strong>
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                            {item.result}
                          </span>
                        </div>
                        <div className="p-2.5 rounded-lg bg-[#FAF9F5] border border-[#EBE8E2] text-[#8C8881] italic">
                          {item.input}
                        </div>
                        <div className="p-2.5 rounded-lg bg-emerald-50/50 border border-emerald-100 text-[#1A1816]">
                          <strong className="text-emerald-800 block text-[10px] uppercase font-bold mb-0.5">Resposta do Agente:</strong>
                          {item.aiOutput}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================
                15. BI & OBJEÇÕES DE VENDAS (SALES ANALYTICS)
               ======================================================== */}
            {activeTab === 'bi-vendas' && (
              <div className="space-y-6 animate-fadeIn max-w-4xl">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#4F46E5]/10 text-[#4F46E5] uppercase tracking-wider">
                      Inteligência Acionável
                    </span>
                    <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Sales AI
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-[#1A1816] mt-1">Inteligência Pós-Call & Analytics de Vendas</h3>
                  <p className="text-xs text-[#5C5955] mt-0.5">
                    Dados fictícios — simulação ilustrativa de indicadores. A análise identifica pontos frequentes de conversa e prioriza leads na prévia do painel.
                  </p>
                </div>

                {/* 4 Cards de Métricas */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-4 rounded-2xl bg-white border border-[#E7E4DC] space-y-1">
                    <div className="text-[10px] font-bold text-[#8C8881] uppercase">Sentimento Médio</div>
                    <div className="text-xl font-mono font-bold text-emerald-600">88% Positivo</div>
                    <div className="text-[10px] text-[#5C5955]">10% Neutro · 2% Crítico</div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-[#E7E4DC] space-y-1">
                    <div className="text-[10px] font-bold text-[#8C8881] uppercase">Lead Scoring Médio</div>
                    <div className="text-xl font-mono font-bold text-[#4F46E5]">8.6 / 10</div>
                    <div className="text-[10px] text-[#5C5955]">Indicador ilustrativo</div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-[#E7E4DC] space-y-1">
                    <div className="text-[10px] font-bold text-[#8C8881] uppercase">Resoluções sem Fila</div>
                    <div className="text-xl font-mono font-bold text-[#1A1816]">94.2%</div>
                    <div className="text-[10px] text-[#5C5955] font-medium">Indicador ilustrativo</div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-[#E7E4DC] space-y-1">
                    <div className="text-[10px] font-bold text-[#8C8881] uppercase">Receita Recuperada</div>
                    <div className="text-xl font-mono font-bold text-emerald-700">R$ 42.850</div>
                    <div className="text-[10px] text-[#5C5955]">Exemplo ilustrativo</div>
                  </div>
                </div>

                {/* Radar de Objeções Detectadas */}
                <div className="p-5 rounded-2xl bg-white border border-[#E7E4DC] space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#1A1816]">
                    Top 3 Objeções Detectadas Automaticamente por IA nas Chamadas:
                  </h4>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="font-semibold text-[#1A1816]">1. Preço / Condições de Pagamento</span>
                        <span className="font-mono text-xs font-bold text-[#4F46E5]">34% das ligações</span>
                      </div>
                      <div className="h-2 rounded-full bg-[#EFECE6] overflow-hidden">
                        <div className="h-full bg-[#4F46E5] rounded-full w-[34%]" />
                      </div>
                      <p className="text-[11px] text-[#5C5955] mt-1">
                        💡 <strong>Ação Recomendada pela IA:</strong> Habilitar envio automático de link de parcelamento em até 10x sem juros no WhatsApp durante a chamada.
                      </p>
                    </div>

                    <div>
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="font-semibold text-[#1A1816]">2. Dúvida sobre Prazo de Entrega / Disponibilidade</span>
                        <span className="font-mono text-xs font-bold text-[#1A1816]">22% das ligações</span>
                      </div>
                      <div className="h-2 rounded-full bg-[#EFECE6] overflow-hidden">
                        <div className="h-full bg-[#1A1816] rounded-full w-[22%]" />
                      </div>
                      <p className="text-[11px] text-[#5C5955] mt-1">
                        💡 <strong>Ação Recomendada pela IA:</strong> Destacar no script de saudação que o despacho é feito no mesmo dia útil.
                      </p>
                    </div>

                    <div>
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="font-semibold text-[#1A1816]">3. Comparando com Concorrentes Tradicionais</span>
                        <span className="font-mono text-xs font-bold text-[#8C8881]">16% das ligações</span>
                      </div>
                      <div className="h-2 rounded-full bg-[#EFECE6] overflow-hidden">
                        <div className="h-full bg-[#8C8881] rounded-full w-[16%]" />
                      </div>
                      <p className="text-[11px] text-[#5C5955] mt-1">
                        💡 <strong>Ação Recomendada pela IA:</strong> Esclarecer condições comerciais e diferenciais do plano durante o atendimento.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Tabela de Lead Scoring */}
                <div className="p-5 rounded-2xl bg-white border border-[#E7E4DC] space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#1A1816]">
                      Leads Quentes Priorizados da Semana:
                    </h4>
                    <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                      {isDemoMode ? 'Dados Fictícios (Demo)' : 'Registros da Conta'}
                    </span>
                  </div>

                  {waSentToast && (
                    <div className="mb-3 p-3 rounded-xl bg-emerald-950 border border-emerald-700/80 text-emerald-200 text-xs font-semibold flex items-center justify-between animate-fadeIn">
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span>{waSentToast}</span>
                      </div>
                      <button onClick={() => setWaSentToast(null)} className="text-emerald-400 hover:text-white text-xs">✕</button>
                    </div>
                  )}

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-[#EBE8E2] text-[#8C8881] text-[10px] uppercase font-bold">
                          <th className="py-2">Lead</th>
                          <th className="py-2">Segmento</th>
                          <th className="py-2">Score de Compra</th>
                          <th className="py-2">Status da Ação</th>
                          <th className="py-2 text-right">Ação</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#F0ECE4]">
                        {(realLeads.length > 0 ? realLeads.map((item, idx) => ({
                          name: `Lead #${item.id.slice(0, 5)}`,
                          phone: item.phone,
                          seg: item.niche || 'Empresa & Serviços',
                          score: item.whatsapp_sent ? '9.9 / 10' : '9.2 / 10',
                          badge: item.whatsapp_sent ? 'WhatsApp Enviado' : 'Diagnóstico Ativo',
                          status: item.pain ? `Gargalo: ${item.pain}` : item.status
                        })) : [
                          { name: 'Contato Fictício 01 (Demo)', phone: '(00) 00000-0001', seg: 'Clínica Odonto (Ilustrativo)', score: '9.8 / 10', badge: 'Dado Fictício', status: 'Simulação ilustrativa de rotina', isDemo: true },
                          { name: 'Contato Fictício 02 (Demo)', phone: '(00) 00000-0002', seg: 'Imobiliária (Ilustrativo)', score: '9.4 / 10', badge: 'Dado Fictício', status: 'Simulação ilustrativa de agenda', isDemo: true },
                          { name: 'Contato Fictício 03 (Demo)', phone: '(00) 00000-0003', seg: 'Advocacia (Ilustrativo)', score: '8.9 / 10', badge: 'Dado Fictício', status: 'Recepção administrativa ilustrativa', isDemo: true }
                        ]).map((lead, idx) => (
                          <tr key={idx} className="hover:bg-[#FAF9F5]">
                            <td className="py-2.5">
                              <div className="font-bold text-[#1A1816]">{lead.name}</div>
                              <div className="text-[10px] text-[#8C8881] font-mono">{lead.phone}</div>
                            </td>
                            <td className="py-2.5 text-[#5C5955]">{lead.seg}</td>
                            <td className="py-2.5">
                              <span className="font-mono font-bold text-emerald-700">{lead.score}</span>
                              <span className="ml-1.5 text-[9px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-bold">{lead.badge}</span>
                            </td>
                            <td className="py-2.5 text-[#5C5955] text-[11px]">{lead.status}</td>
                            <td className="py-2.5 text-right">
                              <button 
                                onClick={() => handleSendDirectWhatsApp(lead)}
                                disabled={sendingWaLead === (lead.name || lead.phone)}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px] transition-all cursor-pointer shadow-sm disabled:opacity-50"
                              >
                                {sendingWaLead === (lead.name || lead.phone) ? (
                                  <span>Enviando pelo robô...</span>
                                ) : (
                                  <>
                                    <Send className="w-3 h-3" />
                                    <span>Disparar WhatsApp VIP</span>
                                  </>
                                )}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================
                16. WHITE-LABEL & AI AGENCY OS (COM CONECTOR OPENBOT)
               ======================================================== */}
            {activeTab === 'whitelabel' && (
              <div className="space-y-6 animate-fadeIn max-w-4xl">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#1A1816] text-white uppercase tracking-wider">
                      AI Agency OS Partner
                    </span>
                    <span className="text-[10px] text-[#4F46E5] font-bold bg-[#EEF2FF] px-2 py-0.5 rounded border border-[#F2E8DC]">
                      White-Label (Sob consulta)
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-[#1A1816] mt-1">White-Label & Integração com AI Agency OS</h3>
                  <p className="text-xs text-[#5C5955] mt-0.5">
                    Revenda a infraestrutura de telefonia e inteligência com a sua própria marca, domínio personalizado e conecte ao OpenBot.
                  </p>
                </div>

                {agencySaved && (
                  <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-fadeIn">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Configurações da agência salvas e propagadas no seu subdomínio!</span>
                  </div>
                )}

                {/* Seção 1: Customização White-Label */}
                <form onSubmit={handleSaveAgency} className="p-6 rounded-2xl bg-white border border-[#E7E4DC] space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#1A1816] flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-[#4F46E5]" />
                    <span>Configuração de Marca e Domínio Próprio:</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-semibold text-[#1A1816] mb-1">Nome da Sua Plataforma / Agência</label>
                      <input 
                        type="text" 
                        value={agencyBrandName}
                        onChange={(e) => setAgencyBrandName(e.target.value)}
                        placeholder="Ex: AgencyVoice Pro"
                        className="w-full px-3 py-2 rounded-xl border border-[#D0CBC0] text-xs focus:outline-none focus:border-[#4F46E5]"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-[#1A1816] mb-1">Subdomínio CNAME Personalizado</label>
                      <input 
                        type="text" 
                        value={agencyDomain}
                        onChange={(e) => setAgencyDomain(e.target.value)}
                        placeholder="voz.suaagencia.com.br"
                        className="w-full px-3 py-2 rounded-xl border border-[#D0CBC0] text-xs font-mono focus:outline-none focus:border-[#4F46E5]"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div>
                      <label className="block text-[11px] font-semibold text-[#1A1816] mb-1">Multiplicador de Margem de Lucro por Minuto</label>
                      <div className="flex items-center gap-2">
                        <select 
                          value={marginMultiplier}
                          onChange={(e) => setMarginMultiplier(Number(e.target.value))}
                          className="px-3 py-2 rounded-xl border border-[#D0CBC0] text-xs bg-white focus:outline-none focus:border-[#4F46E5]"
                        >
                          <option value={1.5}>1.5x (Lucro de 50%)</option>
                          <option value={2.0}>2.0x (Lucro de 100%)</option>
                          <option value={2.5}>2.5x (Lucro de 150% - Recomendado)</option>
                          <option value={3.0}>3.0x (Lucro de 200%)</option>
                        </select>
                        <span className="text-xs text-[#5C5955]">{getProviderCostSummary('telefone')}</span>
                      </div>
                    </div>

                    <div className="flex items-end">
                      <button 
                        type="submit"
                        className="w-full py-2.5 rounded-xl bg-[#1A1816] hover:bg-black text-white text-xs font-bold transition-colors cursor-pointer"
                      >
                        Salvar Configurações da Agência
                      </button>
                    </div>
                  </div>
                </form>

                {/* Seção 2: Conexão Nativa com o OpenBot (Equipe Virtual 24/7) */}
                <div className="p-6 rounded-2xl bg-[#0F172A] text-white border border-slate-800 space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center font-bold text-sm shadow-md">
                        OB
                      </div>
                      <div>
                        <div className="text-xs font-bold flex items-center gap-2">
                          <span>Conector OpenBot (openbot.run)</span>
                          <span className="text-[10px] text-indigo-300 font-mono bg-indigo-950/80 px-2 py-0.5 rounded border border-indigo-800/60 flex items-center gap-1">
                            <span>Simulação / Sob consulta</span>
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400">Orquestrador de agentes autônomos persistentes (Codex, Claude Code, Grok, Gemini)</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <a 
                        href="https://openbot.run" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-[11px] font-bold flex items-center gap-1.5 transition-colors shadow-xs"
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span>Abrir openbot.run</span>
                      </a>
                      <a 
                        href="https://github.com/nightly-labs/openbot" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-bold flex items-center gap-1.5 transition-colors border border-slate-700"
                      >
                        <span>GitHub Repositório</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    Com o <strong>OpenBot</strong>, você estrutura fluxos de atendimento automatizado para operação multi-contas. A <strong>Vocalis AI</strong> atua como camada de voz e mensageria automatizada configurável (recursos e integrações sujeitos ao plano contratado), conectando com as rotas da <strong>Team API</strong> e do <strong>Model Context Protocol (MCP)</strong> do OpenBot.
                  </p>

                  {/* Agentes Virtuais da Equipe Conectados */}
                  <div>
                    <h5 className="text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-2.5">
                      Agentes da Equipe Vocalis Prontos para o OpenBot:
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-start gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-xs shrink-0">
                          R
                        </div>
                        <div className="text-left min-w-0">
                          <div className="text-xs font-bold text-white flex items-center gap-1.5">
                            <span>Clara · Voz Neural (Exemplo)</span>
                            <span className="text-[9px] bg-indigo-950 text-indigo-300 px-1.5 py-0.2 rounded font-mono">Telefonia</span>
                          </div>
                          <p className="text-[10px] text-slate-400 leading-tight mt-0.5">
                            Atendimento telefônico imediato, triagem neural e qualificação de negócios.
                          </p>
                        </div>
                      </div>

                      <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-start gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs shrink-0">
                          C
                        </div>
                        <div className="text-left min-w-0">
                          <div className="text-xs font-bold text-white flex items-center gap-1.5">
                            <span>Camila · WhatsApp (Exemplo)</span>
                            <span className="text-[9px] bg-emerald-950 text-emerald-300 px-1.5 py-0.2 rounded font-mono">WhatsApp</span>
                          </div>
                          <p className="text-[10px] text-slate-400 leading-tight mt-0.5">
                            Exemplo ilustrativo de triagem inicial e encaminhamento de orçamentos (sob consulta).
                          </p>
                        </div>
                      </div>

                      <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-start gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-xs shrink-0">
                          B
                        </div>
                        <div className="text-left min-w-0">
                          <div className="text-xs font-bold text-white flex items-center gap-1.5">
                            <span>Beatriz · Agendamentos (Exemplo)</span>
                            <span className="text-[9px] bg-purple-950 text-purple-300 px-1.5 py-0.2 rounded font-mono">Agenda</span>
                          </div>
                          <p className="text-[10px] text-slate-400 leading-tight mt-0.5">
                            Exemplo ilustrativo de consulta de horários e lembretes (integração sob consulta).
                          </p>
                        </div>
                      </div>

                      <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-start gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs shrink-0">
                          M
                        </div>
                        <div className="text-left min-w-0">
                          <div className="text-xs font-bold text-white flex items-center gap-1.5">
                            <span>Marcus · Triagem & Suporte (Exemplo)</span>
                            <span className="text-[9px] bg-amber-950 text-amber-300 px-1.5 py-0.2 rounded font-mono">Suporte</span>
                          </div>
                          <p className="text-[10px] text-slate-400 leading-tight mt-0.5">
                            Tira dúvidas da base cadastrada e encaminha casos prioritários para a equipe humana.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Seletor de Modo: Webhook vs MCP Server */}
                  <div className="flex items-center gap-2 p-1 bg-slate-900 rounded-xl w-fit border border-slate-800">
                    {!isDemoMode &&
                      Boolean(import.meta.env?.DEV) &&
                      typeof window !== 'undefined' &&
                      ['localhost', '127.0.0.1'].includes(window.location.hostname) && (
                        <button
                          type="button"
                          onClick={() => setOpenbotMode('local')}
                          className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            openbotMode === 'local' 
                              ? 'bg-indigo-600 text-white shadow-xs' 
                              : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          OpenBot Local (DEV)
                        </button>
                      )}
                    <button
                      type="button"
                      onClick={() => setOpenbotMode('cloud')}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        openbotMode === 'cloud' 
                          ? 'bg-indigo-600 text-white shadow-xs' 
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Webhook Externo (Sob consulta)
                    </button>
                    <button
                      type="button"
                      onClick={() => setOpenbotMode('mcp')}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        openbotMode === 'mcp' 
                          ? 'bg-indigo-600 text-white shadow-xs' 
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Configuração MCP Server (Vocalis)
                    </button>
                  </div>

                  {/* Configuração do Endpoint */}
                  <div className="space-y-3">
                    {openbotMode === 'local' &&
                    !isDemoMode &&
                    Boolean(import.meta.env?.DEV) &&
                    typeof window !== 'undefined' &&
                    ['localhost', '127.0.0.1'].includes(window.location.hostname) ? (
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-300 mb-1">Porta Local (Apenas DEV)</label>
                        <div className="flex items-center gap-2">
                          <input 
                            type="text"
                            value={openbotLocalPort}
                            onChange={(e) => setOpenbotLocalPort(e.target.value)}
                            className="w-24 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono text-emerald-400 focus:outline-none focus:border-indigo-500"
                            placeholder="3000"
                          />
                          <button
                            type="button"
                            onClick={handleTestOpenbot}
                            disabled={isTestingOpenbot}
                            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-colors cursor-pointer shrink-0 disabled:opacity-50"
                          >
                            Ver status
                          </button>
                        </div>
                      </div>
                    ) : openbotMode === 'cloud' ? (
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-300 mb-1">URL do Webhook (Integração sob consulta)</label>
                        <div className="flex items-center gap-2">
                          <input 
                            type="text"
                            value={openbotWebhook}
                            onChange={(e) => setOpenbotWebhook(e.target.value)}
                            className="flex-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono text-emerald-400 focus:outline-none focus:border-indigo-500"
                          />
                          <button
                            type="button"
                            onClick={handleTestOpenbot}
                            disabled={isTestingOpenbot}
                            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-colors cursor-pointer shrink-0 disabled:opacity-50"
                          >
                            Verificar status
                          </button>
                        </div>
                      </div>
                    ) : (
                      /* Modo MCP Server */
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <label className="block text-[11px] font-semibold text-slate-300">
                            Cole no seu arquivo de configuração MCP do OpenBot:
                          </label>
                          <button
                            type="button"
                            onClick={() => {
                              const snippet = JSON.stringify({
                                mcpServers: {
                                  "vocalis-ai": {
                                    url: `${typeof window !== 'undefined' ? window.location.origin : 'https://vocalisai-phi.vercel.app'}/api/mcp`,
                                    description: "Vocalis AI Voice & WhatsApp Infrastructure",
                                    tools: ["vocalis_trigger_call", "vocalis_send_whatsapp", "vocalis_get_leads", "vocalis_system_status"]
                                  }
                                }
                              }, null, 2);
                              navigator.clipboard?.writeText(snippet);
                              showNotice('Configuração MCP copiada para a área de transferência.');
                            }}
                            className="text-[10px] font-mono text-indigo-400 hover:text-indigo-300 underline cursor-pointer"
                          >
                            Copiar Configuração JSON
                          </button>
                        </div>
                        <pre className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[10px] font-mono text-emerald-400 overflow-x-auto leading-relaxed">
{JSON.stringify({
  mcpServers: {
    "vocalis-ai": {
      url: "https://vocalisai-phi.vercel.app/api/mcp",
      description: "Vocalis AI Voice & WhatsApp Infrastructure",
      tools: ["vocalis_trigger_call", "vocalis_send_whatsapp", "vocalis_get_leads", "vocalis_system_status"]
    }
  }
}, null, 2)}
                        </pre>
                      </div>
                    )}

                    {openbotResponseLog && (
                      <div className="p-3 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-xs space-y-1 animate-fadeIn">
                        <div className="font-bold text-amber-300">{openbotResponseLog.status}</div>
                        <p className="text-[11px] text-slate-300">{openbotResponseLog.target}</p>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            )}

          </div>

        </div>

      </div>

      {/* ========================================================
          MODALS
         ======================================================== */}

      {/* 1. Modal: Criar Assistente (Réplica Exata 1:1 Kloel Screenshots) */}
      {createModalOpen && (
        <div role="dialog" aria-modal="true" aria-label="Criar assistente" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div 
            className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 border border-[#E7E4DC] shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              type="button"
              aria-label="Fechar modal"
              onClick={() => setCreateModalOpen(false)}
              className="absolute right-6 top-6 w-8 h-8 rounded-full bg-white hover:bg-[#FAF9F5] border border-[#E7E4DC] flex items-center justify-center text-[#736F69] hover:text-[#1A1816] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
            
            <h3 className="text-xl font-bold text-[#1A1816] mb-6">Criar assistente</h3>

            <form onSubmit={handleCreateAssistant}>
              <div>
                <label className="block text-xs font-bold text-[#1A1816] mb-3">
                  Tipo de assistente
                </label>

                {/* 3 Large Cards Grid with information below title */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                  
                  {/* Card 1: Assistente de voz (Roberta) */}
                  <div
                    onClick={() => handleSelectAssistantType('voz')}
                    className={`p-4 rounded-xl flex flex-col justify-start min-h-[140px] text-left cursor-pointer transition-all ${
                      selectedType === 'voz'
                        ? 'border-2 border-[#1A1816] bg-white shadow-sm'
                        : 'border border-[#E7E4DC] bg-white hover:border-[#D0CBC0]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="w-7 h-7 rounded-lg bg-[#E0F2FE] text-[#0284C7] flex items-center justify-center shrink-0">
                        <Phone className="w-3.5 h-3.5" />
                      </div>
                      <h4 className="text-sm font-bold text-[#1A1816]">Assistente de voz</h4>
                    </div>
                    <p className="text-xs text-[#736F69] leading-relaxed">
                      Primeiros atendimentos via telefone com voz neural.
                    </p>
                  </div>

                  {/* Card 2: Assistente de WhatsApp (Camila) */}
                  <div
                    onClick={() => handleSelectAssistantType('chat')}
                    className={`p-4 rounded-xl flex flex-col justify-start min-h-[140px] text-left cursor-pointer transition-all ${
                      selectedType === 'chat'
                        ? 'border-2 border-[#1A1816] bg-white shadow-sm'
                        : 'border border-[#E7E4DC] bg-white hover:border-[#D0CBC0]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="w-7 h-7 rounded-lg bg-[#F3E8FF] text-[#9333EA] flex items-center justify-center shrink-0">
                        <MessageCircle className="w-3.5 h-3.5" />
                      </div>
                      <h4 className="text-sm font-bold text-[#1A1816]">Assistente de chat</h4>
                    </div>
                    <p className="text-xs text-[#736F69] leading-relaxed mb-2.5">
                      Assistente baseado em chat para:
                    </p>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-1 rounded-md bg-[#DCFCE7] text-[#16A34A] text-[11px] font-semibold flex items-center gap-1.5">
                        <MessageSquare className="w-3 h-3 text-[#16A34A]" />
                        <span>WhatsApp</span>
                      </span>
                      <span className="px-2.5 py-1 rounded-md bg-[#F3E8FF] text-[#9333EA] text-[11px] font-semibold flex items-center gap-1.5">
                        <Bot className="w-3 h-3 text-[#9333EA]" />
                        <span>Chatbot de IA</span>
                      </span>
                    </div>
                  </div>

                  {/* Card 3: Webchat do Site (Beatriz) */}
                  <div
                    onClick={() => handleSelectAssistantType('hibrido')}
                    className={`p-4 rounded-xl flex flex-col justify-start min-h-[140px] text-left cursor-pointer transition-all ${
                      selectedType === 'hibrido'
                        ? 'border-2 border-[#1A1816] bg-white shadow-sm'
                        : 'border border-[#E7E4DC] bg-white hover:border-[#D0CBC0]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="w-7 h-7 rounded-lg bg-[#DCFCE7] text-[#16A34A] flex items-center justify-center shrink-0">
                        <Headphones className="w-3.5 h-3.5" />
                      </div>
                      <h4 className="text-sm font-bold text-[#1A1816]">Chat + Ligação</h4>
                    </div>
                    <p className="text-xs text-[#736F69] leading-relaxed">
                      Concierge virtual do site institucional para tirar dúvidas e capturar contatos.
                    </p>
                  </div>

                </div>
              </div>

              {/* Field 2: Nome Input (com nomes automáticos: Roberta, Maria, Ana) */}
              <div className="mt-6">
                <label className="block text-xs font-bold text-[#1A1816] mb-2">
                  Nome
                </label>
                <input 
                  type="text" 
                  value={assistantName} 
                  onChange={(e) => setAssistantName(e.target.value)}
                  placeholder="Nome do assistente"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#D0CBC0] text-sm text-[#1A1816] focus:outline-none focus:border-[#1A1816] bg-white"
                  required
                />
              </div>

              {/* Action Buttons (Cancelar / Criar assistente) */}
              <div className="pt-8 flex items-center justify-end gap-3">
                <button 
                  type="button"
                  onClick={() => setCreateModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-[#F5F4F0] hover:bg-[#EFECE6] text-xs font-semibold text-[#1A1816] transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#1A1816] hover:bg-black text-white text-xs font-bold transition-colors cursor-pointer shadow-sm hover:shadow"
                >
                  Criar assistente
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. Modal: Conectar Número */}
      {numberModalOpen && (
        <div role="dialog" aria-modal="true" aria-label="Conectar número de telefone" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 border border-[#E7E4DC] shadow-2xl relative">
            <button 
              type="button"
              aria-label="Fechar modal"
              onClick={() => setNumberModalOpen(false)}
              className="absolute right-5 top-5 w-8 h-8 rounded-full bg-[#FAF9F5] border border-[#E7E4DC] flex items-center justify-center text-[#5C5955] hover:text-[#1A1816] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
            <h3 className="text-lg font-bold text-[#1A1816] mb-1">Conectar número de telefone</h3>
            <p className="text-xs text-[#5C5955] mb-4">Escolha como vincular a linha telefônica à Vocalis.</p>

            <div className="inline-flex bg-[#FAF9F5] p-1 rounded-xl border border-[#E7E4DC] text-xs w-full mb-4">
              {[
                { id: 'comprar', label: 'Comprar nacional' },
                { id: 'sip', label: 'Tronco SIP' },
                { id: 'importar', label: 'Caller ID' }
              ].map(t => (
                <button
                  key={t.id}
                  onClick={() => setNumberModalTab(t.id)}
                  className={`flex-1 py-1 rounded-lg font-medium transition-all ${
                    numberModalTab === t.id ? 'bg-white text-[#1A1816] shadow-sm font-bold' : 'text-[#736F69]'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <form onSubmit={handleAddNumber} className="space-y-4">
              {numberModalTab === 'comprar' && (
                <div>
                  <label className="block text-xs font-semibold text-[#1A1816] mb-1">Região e DDD</label>
                  <select 
                    value={selectedDdd}
                    onChange={(e) => setSelectedDdd(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#D0CBC0] bg-white text-xs"
                  >
                    <option value="11 - São Paulo">11 - São Paulo e Grande SP</option>
                    <option value="21 - Rio de Janeiro">21 - Rio de Janeiro</option>
                    <option value="31 - Belo Horizonte">31 - Belo Horizonte</option>
                    <option value="41 - Curitiba">41 - Curitiba</option>
                    <option value="51 - Porto Alegre">51 - Porto Alegre</option>
                    <option value="61 - Brasília">61 - Brasília</option>
                    <option value="71 - Salvador">71 - Salvador</option>
                    <option value="81 - Recife">81 - Recife</option>
                    <option value="91 - Belém">91 - Belém</option>
                  </select>
                </div>
              )}

              {numberModalTab === 'sip' && (
                <div>
                  <label className="block text-xs font-semibold text-[#1A1816] mb-1">URI do Tronco SIP</label>
                  <input 
                    type="text" 
                    value={sipNumber}
                    onChange={(e) => setSipNumber(e.target.value)}
                    placeholder="sip:voip.empresa.com.br:5060"
                    className="w-full px-3 py-2 rounded-xl border border-[#D0CBC0] text-xs font-mono"
                    required
                  />
                </div>
              )}

              {numberModalTab === 'importar' && (
                <div>
                  <label className="block text-xs font-semibold text-[#1A1816] mb-1">Número para validação (Caller ID)</label>
                  <input 
                    type="tel" 
                    value={importNumber}
                    onChange={(e) => setImportNumber(e.target.value)}
                    placeholder="+55 11 99999-9999"
                    className="w-full px-3 py-2 rounded-xl border border-[#D0CBC0] text-xs"
                    required
                  />
                  <p className="text-[10px] text-[#8C8881] mt-1">Um código SMS de 6 dígitos será enviado para confirmar a posse.</p>
                </div>
              )}

              <button 
                type="submit"
                className="w-full py-2.5 rounded-xl bg-[#1A1816] text-white text-xs font-bold hover:bg-black mt-2"
              >
                Confirmar conexão
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 3. Modal: Criar Chave API */}
      {apiKeyModalOpen && (
        <div role="dialog" aria-modal="true" aria-label="Criar chave de API" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 border border-[#E7E4DC] shadow-2xl relative">
            <button 
              type="button"
              aria-label="Fechar modal"
              onClick={() => setApiKeyModalOpen(false)}
              className="absolute right-5 top-5 w-8 h-8 rounded-full bg-[#FAF9F5] border border-[#E7E4DC] flex items-center justify-center text-[#5C5955] hover:text-[#1A1816] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
            <h3 className="text-lg font-bold text-[#1A1816] mb-1">Criar chave de API</h3>
            <p className="text-xs text-[#5C5955] mb-4">Gere um token seguro para integração backend.</p>

            <form onSubmit={handleAddApiKey} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#1A1816] mb-1">Nome identificador</label>
                <input 
                  type="text" 
                  value={newKeyName}
                  onChange={(e) => setNewKeyName(e.target.value)}
                  placeholder="Ex: Servidor Produção"
                  className="w-full px-3 py-2 rounded-xl border border-[#D0CBC0] text-xs"
                  required
                />
              </div>
              <button 
                type="submit"
                className="w-full py-2.5 rounded-xl bg-[#1A1816] text-white text-xs font-bold hover:bg-black"
              >
                Gerar chave
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 4. Modal: Testar Ligação */}
      {testCallModalOpen && (
        <div role="dialog" aria-modal="true" aria-label="Solicitar teste telefônico" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 border border-[#E7E4DC] shadow-2xl relative">
            <button 
              type="button"
              aria-label="Fechar modal"
              onClick={() => setTestCallModalOpen(false)}
              className="absolute right-5 top-5 w-8 h-8 rounded-full bg-[#FAF9F5] border border-[#E7E4DC] flex items-center justify-center text-[#5C5955] hover:text-[#1A1816] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
            
            <div className="w-12 h-12 rounded-2xl bg-[#EEF2FF] text-[#4F46E5] flex items-center justify-center mx-auto mb-3 border border-[#F2E8DC]">
              <Phone className="w-6 h-6" />
            </div>

            <h3 className="text-lg font-bold text-[#1A1816] text-center mb-1">Solicitar teste telefônico</h3>
            <p className="text-xs text-[#5C5955] text-center mb-5">
              Este painel não realiza ligações reais diretamente no navegador. Solicite uma demonstração assistida com nossa equipe comercial.
            </p>

            {testCallNotice && (
              <div className="mb-4 p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs text-center font-medium animate-fadeIn">
                {testCallNotice}
              </div>
            )}

            <form onSubmit={handleStartTestCall} className="space-y-4">
              <div>
                <label className="block text-[11px] font-semibold text-[#1A1816] mb-1">Seu telefone com DDD</label>
                <input 
                  type="tel" 
                  value={testPhoneNumber}
                  onChange={(e) => setTestPhoneNumber(e.target.value)}
                  placeholder="(11) 98765-4321"
                  className="w-full px-3 py-2.5 rounded-xl border border-[#D0CBC0] text-xs focus:outline-none focus:border-[#4F46E5]"
                  required
                />
              </div>

              <button 
                type="submit"
                className="w-full py-2.5 rounded-xl bg-[#4F46E5] text-white text-xs font-bold hover:bg-[#4338CA] transition-colors cursor-pointer"
              >
                Ver disponibilidade de teste
              </button>
              {onOpenDemo && (
                <button
                  type="button"
                  onClick={() => {
                    setTestCallModalOpen(false);
                    onOpenDemo();
                  }}
                  className="w-full py-2 rounded-xl border border-[#D0CBC0] text-[#1A1816] text-xs font-semibold hover:bg-[#FAF9F5] transition-colors cursor-pointer"
                >
                  Abrir solicitação com equipe
                </button>
              )}
            </form>
          </div>
        </div>
      )}

      {/* 5. Modal: Convidar Membro */}
      {inviteModalOpen && (
        <div role="dialog" aria-modal="true" aria-label="Convidar membro" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 border border-[#E7E4DC] shadow-2xl relative">
            <button 
              type="button"
              aria-label="Fechar modal"
              onClick={() => setInviteModalOpen(false)}
              className="absolute right-5 top-5 w-8 h-8 rounded-full bg-[#FAF9F5] border border-[#E7E4DC] flex items-center justify-center text-[#5C5955] hover:text-[#1A1816] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
            <h3 className="text-lg font-bold text-[#1A1816] mb-1">Convidar membro</h3>
            <p className="text-xs text-[#5C5955] mb-4">Adicione um colega de equipe para gerenciar o workspace.</p>

            <form onSubmit={handleSendInvite} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#1A1816] mb-1">E-mail corporativo</label>
                <input 
                  type="email" 
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="colega@empresa.com.br"
                  className="w-full px-3 py-2 rounded-xl border border-[#D0CBC0] text-xs"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1A1816] mb-1">Função / Permissão</label>
                <select 
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#D0CBC0] bg-white text-xs"
                >
                  <option value="Admin">Admin (Acesso total)</option>
                  <option value="Operador">Operador (Atendimento e conversas)</option>
                  <option value="Visualizador">Visualizador (Apenas relatórios)</option>
                </select>
              </div>

              <button 
                type="submit"
                className="w-full py-2.5 rounded-xl bg-[#1A1816] text-white text-xs font-bold hover:bg-black"
              >
                Enviar convite
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 6. Modal: Detalhes da Função */}
      {rolesInfoOpen && (
        <div role="dialog" aria-modal="true" aria-label="Detalhes das funções" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 border border-[#E7E4DC] shadow-2xl relative space-y-4">
            <button 
              type="button"
              aria-label="Fechar modal"
              onClick={() => setRolesInfoOpen(false)}
              className="absolute right-5 top-5 w-8 h-8 rounded-full bg-[#FAF9F5] border border-[#E7E4DC] flex items-center justify-center text-[#5C5955] hover:text-[#1A1816] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
            <h3 className="text-lg font-bold text-[#1A1816]">Detalhes das funções</h3>
            <div className="space-y-3 text-xs text-[#5C5955]">
              <div className="p-3 rounded-xl border border-[#E7E4DC] bg-[#FAF9F5]">
                <strong className="text-[#1A1816] block mb-0.5">Admin</strong>
                Acesso irrestrito a faturamento, criação e exclusão de assistentes, compra de números, chaves de API e gestão de usuários.
              </div>
              <div className="p-3 rounded-xl border border-[#E7E4DC] bg-[#FAF9F5]">
                <strong className="text-[#1A1816] block mb-0.5">Operador</strong>
                Acesso para escutar chamadas, ler transcrições, visualizar contatos e interagir em conversas no WhatsApp/Webchat.
              </div>
              <div className="p-3 rounded-xl border border-[#E7E4DC] bg-[#FAF9F5]">
                <strong className="text-[#1A1816] block mb-0.5">Visualizador</strong>
                Pode visualizar relatórios e dashboards agregados, sem acesso para alterar configurações de telefonia ou dados sensíveis.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Escolha de Planos Onboarding */}
      <DashboardPricingModal 
        isOpen={pricingModalOpen}
        onClose={() => setPricingModalOpen(false)}
        onOpenDemo={onOpenDemo}
        onSelectPlan={onSelectPlan}
      />

      {/* Modal de Clonagem de Voz em 1 Minuto (Fase 2) */}
      <VoiceCloningStudio 
        isOpen={voiceCloningOpen}
        onClose={() => setVoiceCloningOpen(false)}
        onSaveVoice={(v) => {
          console.log('Nova voz clonada salva:', v);
        }}
      />

      {/* Sliders de Apresentação / Pitch Deck Executivo */}
      <PlatformPresentationSlider 
        isOpen={presentationOpen}
        onClose={() => setPresentationOpen(false)}
      />

    </div>
  );
}
