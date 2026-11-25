import React, { useState } from 'react';
import { 
  Building2, Users, Plus, Search, ExternalLink, MoreVertical, CreditCard, 
  ArrowUpRight, Phone, ShieldCheck, CheckCircle2, DollarSign, Clock, Layers,
  ChevronRight, X, Sparkles, Filter, AlertCircle
} from 'lucide-react';
import { getAgencyPlanOptions } from '../utils/commercialCatalogUtils';

export default function AgencySubaccountsSection({ isDemoMode = true, onSwitchWorkspace }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // all | active | onboarding | paused
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [selectedSubaccount, setSelectedSubaccount] = useState(null);
  const [agencyNotice, setAgencyNotice] = useState('');
  const agencyPlanOptions = getAgencyPlanOptions();
  const findAgencyOption = (planId) =>
    agencyPlanOptions.find((opt) => opt.id === planId) || agencyPlanOptions[0];

  // Subcontas fictícias ilustrativas conectadas à fonte única (isoladas de contas autenticadas)
  const [subaccounts, setSubaccounts] = useState(() =>
    isDemoMode
      ? [
    {
      id: 'sub_01',
      name: 'Clínica Modelo Odonto (Exemplo Fictício)',
      responsible: 'Responsável Técnico (Exemplo)',
      segment: 'Saúde & Odontologia',
      subdomain: 'odonto-demo.suaagencia.com.br',
      phone: '+55 (00) 0000-0001',
      assistantsCount: 2,
      minutesUsed: 460,
      minutesLimit: 600,
      monthlyPlan: findAgencyOption('pro')?.optionLabel || 'Condições em confirmação',
      profitMargin: findAgencyOption('pro')?.suggestedMarginText || 'Pendente de confirmação',
      status: 'active',
      createdAt: '10/10/2026'
    },
    {
      id: 'sub_02',
      name: 'Imobiliária Modelo (Exemplo Fictício)',
      responsible: 'Responsável Comercial (Exemplo)',
      segment: 'Imóveis & Locação',
      subdomain: 'imoveis-demo.suaagencia.com.br',
      phone: '+55 (00) 0000-0002',
      assistantsCount: 3,
      minutesUsed: 780,
      minutesLimit: 1000,
      monthlyPlan: findAgencyOption('scale')?.optionLabel || 'Condições em confirmação',
      profitMargin: findAgencyOption('scale')?.suggestedMarginText || 'Pendente de confirmação',
      status: 'active',
      createdAt: '01/11/2026'
    },
    {
      id: 'sub_03',
      name: 'Escritório Jurídico Modelo (Exemplo Fictício)',
      responsible: 'Advogado Responsável (Exemplo)',
      segment: 'Jurídico (Recepção Administrativa)',
      subdomain: 'juridico-demo.suaagencia.com.br',
      phone: '+55 (00) 0000-0003',
      assistantsCount: 1,
      minutesUsed: 195,
      minutesLimit: 400,
      monthlyPlan: findAgencyOption('starter')?.optionLabel || 'Condições em confirmação',
      profitMargin: findAgencyOption('starter')?.suggestedMarginText || 'Pendente de confirmação',
      status: 'active',
      createdAt: '05/11/2026'
    },
    {
      id: 'sub_04',
      name: 'Studio Modelo Serviços (Exemplo Fictício)',
      responsible: 'Coordenação (Exemplo)',
      segment: 'Beleza & Estética',
      subdomain: 'servicos-demo.suaagencia.com.br',
      phone: '+55 (00) 0000-0004',
      assistantsCount: 1,
      minutesUsed: 52,
      minutesLimit: 400,
      monthlyPlan: findAgencyOption('starter')?.optionLabel || 'Condições em confirmação',
      profitMargin: findAgencyOption('starter')?.suggestedMarginText || 'Pendente de confirmação',
      status: 'onboarding',
      createdAt: '12/11/2026'
    }
  ]
      : []
  );

  // Form states for new subaccount
  const [newClientName, setNewClientName] = useState('');
  const [newResponsible, setNewResponsible] = useState('');
  const [newSegment, setNewSegment] = useState('Saúde & Odontologia');
  const [newSubdomain, setNewSubdomain] = useState('');
  const [newPlan, setNewPlan] = useState('pro');

  const filteredSubaccounts = subaccounts.filter((sub) => {
    const matchesSearch = sub.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          sub.responsible.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          sub.segment.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || sub.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalMinutes = subaccounts.reduce((acc, curr) => acc + curr.minutesUsed, 0);
  const totalAssistants = subaccounts.reduce((acc, curr) => acc + (curr.assistantsCount || 0), 0);
  const totalProfit = 'Sob consulta (em confirmação)';

  const handleCreateSubaccount = (e) => {
    e.preventDefault();
    if (!newClientName) return;

    const selectedOpt = findAgencyOption(newPlan);
    const newSub = {
      id: `sub_${Date.now()}`,
      name: `${newClientName} (Prévia)`,
      responsible: newResponsible || 'Responsável',
      segment: newSegment,
      subdomain: newSubdomain ? `${newSubdomain}.suaagencia.com.br` : `${newClientName.toLowerCase().replace(/\s+/g, '')}.suaagencia.com.br`,
      phone: '+55 (DDD) Pendente',
      assistantsCount: 1,
      minutesUsed: 0,
      minutesLimit: 100,
      monthlyPlan: selectedOpt?.optionLabel || 'Plano em confirmação',
      profitMargin: selectedOpt?.suggestedMarginText || 'Pendente de confirmação',
      status: 'onboarding',
      createdAt: 'Prévia local'
    };

    setSubaccounts([newSub, ...subaccounts]);
    setCreateModalOpen(false);
    setNewClientName('');
    setNewResponsible('');
    setNewSubdomain('');
    setAgencyNotice('Subconta adicionada apenas como prévia local na interface. O provisionamento multi-tenant real requer contratação.');
  };

  return (
    <div className="space-y-6 max-w-6xl animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#1A1816] text-white uppercase tracking-wider">
              AI Agency OS Master
            </span>
            <span className="text-[10px] text-[#4F46E5] bg-[#EEF2FF] px-2 py-0.5 rounded-full font-bold border border-[#F2E8DC]">
              Multi-Tenant Subcontas
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1816] tracking-tight">
            Gestão de Empresas & Clientes
          </h2>
          <p className="text-xs text-[#5C5955] mt-1 max-w-2xl">
            Gerencie todas as clínicas, imobiliárias e empresas clientes da sua agência em um único painel. Monitore minutos consumidos e lucros por subconta.
          </p>
        </div>

        <button 
          onClick={() => setCreateModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1A1816] text-white text-xs font-bold hover:bg-black transition-colors shadow-sm self-start cursor-pointer"
        >
          <Plus className="w-4 h-4 text-[#4F46E5]" />
          <span>Cadastrar Nova Empresa</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-[#E7E4DC] shadow-xs">
          <div className="flex items-center justify-between text-[#736F69] mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">Empresas Ativas</span>
            <Building2 className="w-4 h-4 text-[#4F46E5]" />
          </div>
          <div className="text-2xl font-bold text-[#1A1816]">{subaccounts.length}</div>
          <div className="text-[11px] text-[#5C5955] font-medium mt-1">Exemplo ilustrativo de painel</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E7E4DC] shadow-xs">
          <div className="flex items-center justify-between text-[#736F69] mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">Minutos Totais do Mês</span>
            <Clock className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-2xl font-bold text-[#1A1816]">{totalMinutes} <span className="text-xs font-normal text-[#736F69]">min</span></div>
          <div className="text-[11px] text-[#736F69] mt-1">Consumo agregado de voz</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E7E4DC] shadow-xs">
          <div className="flex items-center justify-between text-[#736F69] mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">Lucro Líquido da Agência</span>
            <DollarSign className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold text-emerald-600">{totalProfit}</div>
          <div className="text-[11px] text-[#736F69] mt-1">Mensalidades + Margem de minutos</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E7E4DC] shadow-xs">
          <div className="flex items-center justify-between text-[#736F69] mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">Assistentes no Exemplo</span>
            <Layers className="w-4 h-4 text-[#4F46E5]" />
          </div>
          <div className="text-2xl font-bold text-[#1A1816]">{totalAssistants}</div>
          <div className="text-[11px] text-[#736F69] mt-1">{isDemoMode ? 'Dados fictícios (simulação)' : 'Subcontas da conta'}</div>
        </div>
      </div>

      {agencyNotice && (
        <div role="status" className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 text-xs flex items-center justify-between gap-3">
          <span>{agencyNotice}</span>
          <button type="button" onClick={() => setAgencyNotice('')} className="font-bold cursor-pointer" aria-label="Fechar aviso">✕</button>
        </div>
      )}

      {/* Tabela de Subcontas */}
      <div className="bg-white rounded-2xl border border-[#E7E4DC] shadow-xs overflow-hidden">
        {/* Barra de Filtros */}
        <div className="p-4 border-b border-[#E7E4DC] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-[#736F69] absolute left-3 top-2.5" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por clínica, responsável ou nicho..."
              className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-[#D0CBC0] text-xs focus:outline-none focus:border-[#4F46E5]"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
            <button 
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer ${
                statusFilter === 'all' ? 'bg-[#1A1816] text-white' : 'bg-[#FAF9F5] text-[#736F69] hover:bg-stone-100'
              }`}
            >
              Todos ({subaccounts.length})
            </button>
            <button 
              onClick={() => setStatusFilter('active')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer ${
                statusFilter === 'active' ? 'bg-emerald-600 text-white' : 'bg-[#FAF9F5] text-[#736F69] hover:bg-stone-100'
              }`}
            >
              Ativos
            </button>
            <button 
              onClick={() => setStatusFilter('onboarding')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer ${
                statusFilter === 'onboarding' ? 'bg-amber-600 text-white' : 'bg-[#FAF9F5] text-[#736F69] hover:bg-stone-100'
              }`}
            >
              Implantação
            </button>
          </div>
        </div>

        {/* Lista */}
        <div className="divide-y divide-[#E7E4DC]">
          {filteredSubaccounts.map((sub) => {
            const usagePercent = Math.min(100, Math.round((sub.minutesUsed / sub.minutesLimit) * 100));

            return (
              <div key={sub.id} className="p-4 sm:p-5 hover:bg-[#FAF9F5] transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#EEF2FF] border border-[#F2E8DC] text-[#4F46E5] flex items-center justify-center font-bold text-sm shrink-0">
                    {sub.name.charAt(0)}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-sm text-[#1A1816]">{sub.name}</h4>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        sub.status === 'active' 
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}>
                        {sub.status === 'active' ? '● Em Operação' : 'Implantação'}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-[#736F69] mt-1">
                      <span>{sub.responsible}</span>
                      <span>•</span>
                      <span className="text-[#4F46E5] font-medium">{sub.segment}</span>
                      <span>•</span>
                      <span className="font-mono text-[11px]">{sub.subdomain}</span>
                    </div>
                  </div>
                </div>

                {/* Métricas da subconta */}
                <div className="flex flex-wrap items-center gap-6 justify-between md:justify-end">
                  {/* Barra de Minutos */}
                  <div className="w-36">
                    <div className="flex justify-between text-[10px] text-[#736F69] mb-1 font-semibold">
                      <span>Consumo</span>
                      <span>{sub.minutesUsed}/{sub.minutesLimit} min</span>
                    </div>
                    <div className="w-full bg-[#E7E4DC] h-1.5 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${
                          usagePercent > 80 ? 'bg-amber-500' : 'bg-emerald-500'
                        }`}
                        style={{ width: `${usagePercent}%` }}
                      />
                    </div>
                  </div>

                  {/* Lucro da Agência */}
                  <div className="text-right">
                    <div className="text-[10px] uppercase font-bold text-[#736F69]">Lucro Agência</div>
                    <div className="text-xs font-bold text-emerald-600">{sub.profitMargin}</div>
                  </div>

                  {/* Ações */}
                  <div className="flex items-center gap-2">
                    <button 
                      type="button"
                      onClick={() => {
                        setAgencyNotice(
                          isDemoMode
                            ? `Prévia demonstrativa: troca de subconta (${sub.name}) disponível apenas no painel multi-tenant contratado.`
                            : `Provisionamento multi-tenant para ${sub.name} em desenvolvimento.`
                        );
                      }}
                      className="px-3 py-1.5 rounded-lg bg-[#FAF9F5] hover:bg-[#EFECE6] border border-[#D0CBC0] text-xs font-semibold text-[#1A1816] flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <span>Ver prévia</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#736F69]" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal: Cadastrar Nova Empresa */}
      {createModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div 
            className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-[#E7E4DC] shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setCreateModalOpen(false)}
              className="absolute right-5 top-5 w-8 h-8 rounded-full bg-[#FAF9F5] hover:bg-[#EFECE6] border border-[#E7E4DC] flex items-center justify-center text-[#736F69] hover:text-[#1A1816] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="mb-5">
              <span className="text-[10px] font-bold text-[#4F46E5] uppercase tracking-wider bg-[#EEF2FF] px-2 py-0.5 rounded border border-[#F2E8DC]">
                Onboarding de Cliente
              </span>
              <h3 className="text-xl font-bold text-[#1A1816] mt-1">Nova Subconta para sua Agência</h3>
              <p className="text-xs text-[#736F69]">Cria um workspace isolado e exclusivo para a empresa atendida.</p>
            </div>

            <form onSubmit={handleCreateSubaccount} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-[#1A1816] mb-1">Nome da Empresa / Clínica</label>
                <input 
                  type="text" 
                  value={newClientName}
                  onChange={(e) => setNewClientName(e.target.value)}
                  placeholder="Ex: Clínica San Pietro"
                  className="w-full px-3 py-2 rounded-xl border border-[#D0CBC0] text-xs focus:outline-none focus:border-[#4F46E5]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-[#1A1816] mb-1">Responsável / Contato</label>
                  <input 
                    type="text" 
                    value={newResponsible}
                    onChange={(e) => setNewResponsible(e.target.value)}
                    placeholder="Ex: Dr. Roberto"
                    className="w-full px-3 py-2 rounded-xl border border-[#D0CBC0] text-xs focus:outline-none focus:border-[#4F46E5]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-[#1A1816] mb-1">Segmento</label>
                  <select 
                    value={newSegment}
                    onChange={(e) => setNewSegment(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#D0CBC0] text-xs bg-white focus:outline-none focus:border-[#4F46E5]"
                  >
                    <option value="Saúde & Odontologia">Saúde & Odontologia</option>
                    <option value="Imóveis & Locação">Imóveis & Locação</option>
                    <option value="Jurídico & Compliance">Jurídico & Advocacia</option>
                    <option value="Varejo & Serviços">Varejo & Serviços</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#1A1816] mb-1">Subdomínio Próprio White-Label</label>
                <div className="flex items-center">
                  <input 
                    type="text" 
                    value={newSubdomain}
                    onChange={(e) => setNewSubdomain(e.target.value)}
                    placeholder="clinica"
                    className="w-full px-3 py-2 rounded-l-xl border border-[#D0CBC0] text-xs focus:outline-none focus:border-[#4F46E5]"
                  />
                  <span className="px-3 py-2 bg-[#FAF9F5] border border-l-0 border-[#D0CBC0] rounded-r-xl text-xs text-[#736F69] font-mono">
                    .suaagencia.com.br
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#1A1816] mb-1">Plano & Franquia</label>
                <select 
                  value={newPlan}
                  onChange={(e) => setNewPlan(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#D0CBC0] text-xs bg-white focus:outline-none focus:border-[#4F46E5]"
                >
                  {agencyPlanOptions.map((opt) => (
                    <option key={opt.id} value={opt.id}>
                      {opt.optionLabel}
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-2">
                <button 
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#1A1816] hover:bg-black text-white text-xs font-bold transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-[#4F46E5]" />
                  <span>Ativar Subconta Imediatamente</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}