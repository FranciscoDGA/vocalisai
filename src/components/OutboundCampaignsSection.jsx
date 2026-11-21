import React, { useState } from 'react';
import { 
  Megaphone, Plus, Upload, Play, Pause, CheckCircle2, AlertCircle, Phone, 
  Clock, Users, FileText, ChevronRight, X, Sparkles, RefreshCw, BarChart2,
  PhoneCall, PhoneForwarded, PhoneMissed, ArrowRight
} from 'lucide-react';

export default function OutboundCampaignsSection() {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [campaignStatus, setCampaignStatus] = useState('running'); // idle | running | paused
  
  // Lista de Campanhas
  const [campaigns, setCampaigns] = useState([
    {
      id: 'camp_01',
      name: 'Confirmação de Consultas D-1',
      assistant: 'Roberta (Voz Clara Neural)',
      channel: 'Telefonia + WhatsApp Confirmação',
      totalContacts: 120,
      dialed: 114,
      answered: 104,
      confirmed: 92,
      rescheduled: 8,
      status: 'completed',
      date: 'Hoje, 09:30'
    },
    {
      id: 'camp_02',
      name: 'Reativação de Leads Imobiliários (Residencial Jardins)',
      assistant: 'Lucas (Voz Masculina Comercial)',
      channel: 'Telefonia Ativa',
      totalContacts: 280,
      dialed: 184,
      answered: 142,
      confirmed: 38,
      rescheduled: 14,
      status: 'running',
      date: 'Em andamento'
    },
    {
      id: 'camp_03',
      name: 'Cobrança Preventiva Pix (Vencimento Hoje)',
      assistant: 'Roberta (Closer Pix)',
      channel: 'Telefone + Envio de Pix no WhatsApp',
      totalContacts: 85,
      dialed: 0,
      answered: 0,
      confirmed: 0,
      rescheduled: 0,
      status: 'scheduled',
      date: 'Agendada para 16:00'
    }
  ]);

  // Form states for new campaign
  const [newCampaignName, setNewCampaignName] = useState('');
  const [selectedAssistant, setSelectedAssistant] = useState('Roberta');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [parsedContacts, setParsedContacts] = useState([]);
  const [concurrentCalls, setConcurrentCalls] = useState(3);
  const [sendWhatsAppPix, setSendWhatsAppPix] = useState(true);

  // Mock template upload
  const handleLoadSampleCSV = () => {
    const sample = [
      { nome: 'Contato Fictício 01 (Demo)', telefone: '(00) 00000-0001', horario: '14:30', status: 'Simulação' },
      { nome: 'Contato Fictício 02 (Demo)', telefone: '(00) 00000-0002', horario: '15:00', status: 'Simulação' },
      { nome: 'Contato Fictício 03 (Demo)', telefone: '(00) 00000-0003', horario: '15:30', status: 'Simulação' },
      { nome: 'Contato Fictício 04 (Demo)', telefone: '(00) 00000-0004', horario: '16:00', status: 'Simulação' },
      { nome: 'Contato Fictício 05 (Demo)', telefone: '(00) 00000-0005', horario: '16:30', status: 'Simulação' }
    ];
    setUploadedFile({ name: 'exemplo_ficticio_confirmacao_rotina.csv', size: '14.2 KB' });
    setParsedContacts(sample);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile({ name: file.name, size: `${(file.size / 1024).toFixed(1)} KB` });
      // Injeta contatos simulados com base no arquivo
      handleLoadSampleCSV();
    }
  };

  const handleCreateCampaign = (e) => {
    e.preventDefault();
    if (!newCampaignName) return;

    const newCamp = {
      id: `camp_${Date.now()}`,
      name: newCampaignName,
      assistant: `${selectedAssistant} (Neural)`,
      channel: sendWhatsAppPix ? 'Telefonia + WhatsApp' : 'Telefonia Ativa',
      totalContacts: parsedContacts.length || 50,
      dialed: 0,
      answered: 0,
      confirmed: 0,
      rescheduled: 0,
      status: 'running',
      date: 'Agora'
    };

    setCampaigns([newCamp, ...campaigns]);
    setCreateModalOpen(false);
    setNewCampaignName('');
    setUploadedFile(null);
    setParsedContacts([]);
  };

  return (
    <div className="space-y-6 max-w-6xl animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#EEF2FF] text-[#4F46E5] border border-[#F2E8DC] uppercase tracking-wider flex items-center gap-1">
              <Megaphone className="w-3 h-3 text-[#4F46E5]" />
              Campanhas Outbound com IA
            </span>
            <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-bold">
              Disparo em Lote • Vapi & WhatsApp
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1816] tracking-tight">
            Campanhas Ativas & Discador em Lote
          </h2>
          <p className="text-xs text-[#5C5955] mt-1 max-w-2xl">
            Importe planilhas de contatos (CSV/Excel) e coloque a IA para discar automaticamente. Confirme consultas, reative clientes inativos e envie ofertas personalizadas.
          </p>
        </div>

        <button 
          onClick={() => setCreateModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1A1816] text-white text-xs font-bold hover:bg-black transition-colors shadow-sm self-start cursor-pointer"
        >
          <Plus className="w-4 h-4 text-[#4F46E5]" />
          <span>Criar Nova Campanha</span>
        </button>
      </div>

      {/* KPI Cards de Performance Outbound */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-[#E7E4DC] shadow-xs">
          <div className="flex items-center justify-between text-[#736F69] mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">Total Discadas</span>
            <PhoneCall className="w-4 h-4 text-[#4F46E5]" />
          </div>
          <div className="text-2xl font-bold text-[#1A1816]">298</div>
          <div className="text-[11px] text-[#736F69] mt-1">Ligações efetuadas pela IA</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E7E4DC] shadow-xs">
          <div className="flex items-center justify-between text-[#736F69] mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">Taxa de Atendimento (Exemplo)</span>
            <PhoneForwarded className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold text-emerald-600">82.5%</div>
          <div className="text-[11px] text-[#736F69] mt-1">Dados fictícios (simulação ilustrativa)</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E7E4DC] shadow-xs">
          <div className="flex items-center justify-between text-[#736F69] mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">Confirmações (Exemplo)</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold text-[#1A1816]">130</div>
          <div className="text-[11px] text-[#5C5955] font-medium mt-1">Dados fictícios (simulação ilustrativa)</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E7E4DC] shadow-xs">
          <div className="flex items-center justify-between text-[#736F69] mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">Referência Ilustrativa</span>
            <Sparkles className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-2xl font-bold text-[#1A1816]">Exemplo</div>
          <div className="text-[11px] text-[#736F69] mt-1">Dados fictícios (simulação ilustrativa)</div>
        </div>
      </div>

      {/* Lista de Campanhas */}
      <div className="bg-white rounded-2xl border border-[#E7E4DC] shadow-xs overflow-hidden">
        <div className="p-4 border-b border-[#E7E4DC] flex items-center justify-between">
          <h3 className="font-bold text-sm text-[#1A1816]">Histórico de Campanhas</h3>
          <span className="text-xs text-[#736F69]">{campaigns.length} campanhas configuradas</span>
        </div>

        <div className="divide-y divide-[#E7E4DC]">
          {campaigns.map((camp) => {
            const answeredPercent = camp.dialed > 0 ? Math.round((camp.answered / camp.dialed) * 100) : 0;
            const confirmPercent = camp.answered > 0 ? Math.round((camp.confirmed / camp.answered) * 100) : 0;

            return (
              <div key={camp.id} className="p-4 sm:p-5 hover:bg-[#FAF9F5] transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 ${
                    camp.status === 'running' 
                      ? 'bg-amber-100 text-amber-800 animate-pulse' 
                      : camp.status === 'completed'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-stone-100 text-stone-600'
                  }`}>
                    <Megaphone className="w-5 h-5" />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-sm text-[#1A1816]">{camp.name}</h4>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        camp.status === 'running'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : camp.status === 'completed'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-stone-50 text-stone-700 border border-stone-200'
                      }`}>
                        {camp.status === 'running' ? '● Disparando' : camp.status === 'completed' ? 'Concluída' : 'Agendada'}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-[#736F69] mt-1">
                      <span>Assistente: <strong>{camp.assistant}</strong></span>
                      <span>•</span>
                      <span>{camp.channel}</span>
                      <span>•</span>
                      <span>{camp.date}</span>
                    </div>
                  </div>
                </div>

                {/* Métricas da campanha */}
                <div className="flex flex-wrap items-center gap-6 justify-between md:justify-end">
                  <div className="text-left md:text-right">
                    <div className="text-[10px] uppercase font-bold text-[#736F69]">Progresso</div>
                    <div className="text-xs font-bold text-[#1A1816]">
                      {camp.dialed} / {camp.totalContacts} ({Math.round((camp.dialed / camp.totalContacts) * 100)}%)
                    </div>
                  </div>

                  <div className="text-left md:text-right">
                    <div className="text-[10px] uppercase font-bold text-[#736F69]">Atendimento</div>
                    <div className="text-xs font-bold text-emerald-600">{answeredPercent}%</div>
                  </div>

                  <div className="text-left md:text-right">
                    <div className="text-[10px] uppercase font-bold text-[#736F69]">Confirmados</div>
                    <div className="text-xs font-bold text-[#4F46E5]">{camp.confirmed} leads</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal: Criar Nova Campanha Outbound */}
      {createModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div 
            className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 border border-[#E7E4DC] shadow-2xl relative max-h-[92vh] overflow-y-auto"
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
                Assistente de Saída
              </span>
              <h3 className="text-xl font-bold text-[#1A1816] mt-1">Configurar Campanha Outbound</h3>
              <p className="text-xs text-[#736F69]">Suba a lista de contatos para a IA ligar em sequência com voz neural.</p>
            </div>

            <form onSubmit={handleCreateCampaign} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-[#1A1816] mb-1">Nome da Campanha</label>
                <input 
                  type="text" 
                  value={newCampaignName}
                  onChange={(e) => setNewCampaignName(e.target.value)}
                  placeholder="Ex: Confirmação de Consultas D-1 ou Reativação WhatsApp"
                  className="w-full px-3 py-2 rounded-xl border border-[#D0CBC0] text-xs focus:outline-none focus:border-[#4F46E5]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-[#1A1816] mb-1">Assistente de Voz</label>
                  <select 
                    value={selectedAssistant}
                    onChange={(e) => setSelectedAssistant(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#D0CBC0] text-xs bg-white focus:outline-none focus:border-[#4F46E5]"
                  >
                    <option value="Roberta">Roberta (Clara Neural - Padrão)</option>
                    <option value="Lucas">Lucas (Comercial)</option>
                    <option value="Helena">Dra. Helena (Voz Clonada)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#1A1816] mb-1">Linhas Simultâneas</label>
                  <select 
                    value={concurrentCalls}
                    onChange={(e) => setConcurrentCalls(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-[#D0CBC0] text-xs bg-white focus:outline-none focus:border-[#4F46E5]"
                  >
                    <option value={1}>1 chamada por vez</option>
                    <option value={3}>3 chamadas simultâneas (Recomendado)</option>
                    <option value={5}>5 chamadas simultâneas</option>
                    <option value={10}>10 chamadas simultâneas (Alta escala)</option>
                  </select>
                </div>
              </div>

              {/* Upload de Planilha */}
              <div className="p-4 rounded-2xl bg-[#FAF9F5] border border-dashed border-[#4F46E5]/40 text-center space-y-2">
                <Upload className="w-6 h-6 text-[#4F46E5] mx-auto" />
                <div>
                  <div className="text-xs font-bold text-[#1A1816]">Subir Planilha de Contatos (.csv ou .xlsx)</div>
                  <div className="text-[10px] text-[#736F69]">Colunas aceitas: Nome, Telefone, Horário, Parâmetro</div>
                </div>

                <div className="flex items-center justify-center gap-2 pt-1">
                  <label className="px-3 py-1.5 rounded-lg bg-white border border-[#D0CBC0] text-xs font-bold text-[#1A1816] hover:bg-stone-100 transition-colors cursor-pointer">
                    Selecionar Arquivo
                    <input type="file" accept=".csv, .xlsx, .xls" onChange={handleFileUpload} className="hidden" />
                  </label>

                  <button 
                    type="button" 
                    onClick={handleLoadSampleCSV}
                    className="px-3 py-1.5 rounded-lg bg-[#EEF2FF] border border-[#F2E8DC] text-xs font-bold text-[#4F46E5] hover:bg-[#F5EADB] transition-colors cursor-pointer"
                  >
                    Carregar Planilha Modelo
                  </button>
                </div>

                {uploadedFile && (
                  <div className="p-2 rounded-xl bg-white border border-emerald-200 text-emerald-800 text-xs font-medium flex items-center justify-between mt-2">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      {uploadedFile.name} ({parsedContacts.length} contatos)
                    </span>
                    <span className="text-[10px] text-emerald-600 font-mono">Pronto para discar</span>
                  </div>
                )}
              </div>

              {/* Disparo Simultâneo WhatsApp */}
              <label className="flex items-center justify-between p-3 rounded-xl bg-white border border-[#E7E4DC] text-xs cursor-pointer">
                <div>
                  <div className="font-semibold text-[#1A1816]">Disparar mensagem no WhatsApp ao atender</div>
                  <div className="text-[10px] text-[#736F69]">Envia confirmação por texto e chave Pix caso solicitado</div>
                </div>
                <input 
                  type="checkbox" 
                  checked={sendWhatsAppPix}
                  onChange={(e) => setSendWhatsAppPix(e.target.checked)}
                  className="rounded text-[#4F46E5] focus:ring-[#4F46E5] w-4 h-4 cursor-pointer"
                />
              </label>

              <div className="pt-2">
                <button 
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#1A1816] hover:bg-black text-white text-xs font-bold transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
                >
                  <Play className="w-4 h-4 text-[#4F46E5]" />
                  <span>Iniciar Campanha Outbound</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}