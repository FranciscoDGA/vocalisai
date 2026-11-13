import React, { useState } from 'react';
import { 
  BookOpen, Plus, FileText, Globe, HelpCircle, Search, Trash2, 
  ExternalLink, CheckCircle2, Sparkles, X, Loader2, ArrowRight, 
  Upload, Layers, ShieldCheck, RefreshCw, Eye, MessageSquare, AlertCircle
} from 'lucide-react';
import { BRAND } from '../data/content';

export default function KnowledgeBaseTab({ knowledgeList, setKnowledgeList, createdAssistants = [], onOpenDemo }) {
  const [filter, setFilter] = useState('todos'); // 'todos' | 'documento' | 'faq' | 'url' | 'texto'
  const [search, setSearch] = useState('');
  
  // Modals
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState('documento'); // 'documento' | 'url' | 'faq' | 'texto'
  
  // Form fields
  const [docName, setDocName] = useState('');
  const [docFile, setDocFile] = useState(null);
  const [docUrl, setDocUrl] = useState('');
  const [docQuestion, setDocQuestion] = useState('');
  const [docAnswer, setDocAnswer] = useState('');
  const [docText, setDocText] = useState('');
  const [targetAssistant, setTargetAssistant] = useState('Todas as assistentes');
  const [indexing, setIndexing] = useState(false);

  // Test Query Tester Modal
  const [testModalOpen, setTestModalOpen] = useState(false);
  const [testQuestion, setTestQuestion] = useState('');
  const [testAnswer, setTestAnswer] = useState('');
  const [testLoading, setTestLoading] = useState(false);

  // Filter list
  const filteredList = knowledgeList.filter(item => {
    const matchesFilter = filter === 'todos' || item.type === filter;
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) || 
                          (item.description && item.description.toLowerCase().includes(search.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const handleAddSubmit = (e) => {
    e.preventDefault();
    setIndexing(true);

    setTimeout(() => {
      const now = 'Hoje às ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      let newItem = null;

      if (modalTab === 'documento') {
        const fileName = docFile ? docFile.name : (docName || 'Documento_Empresarial.pdf');
        const ext = fileName.split('.').pop().toUpperCase();
        newItem = {
          id: Date.now(),
          name: fileName,
          type: 'documento',
          fileType: ext || 'PDF',
          size: docFile ? `${(docFile.size / (1024 * 1024)).toFixed(1)} MB` : '1.8 MB',
          updatedAt: now,
          status: 'Indexado',
          target: targetAssistant,
          tokens: 3200,
          description: docText || 'Tabela de preços, normas ou catálogo enviado para consulta direta das assistentes.'
        };
      } else if (modalTab === 'url') {
        newItem = {
          id: Date.now(),
          name: docUrl.startsWith('http') ? docUrl : `https://${docUrl || 'suaempresa.com.br'}`,
          type: 'url',
          fileType: 'URL',
          size: '8 páginas',
          updatedAt: now,
          status: 'Indexado',
          target: targetAssistant,
          tokens: 6100,
          description: 'Website oficial indexado. A IA lê e atualiza as informações de horários, serviços e localização.'
        };
      } else if (modalTab === 'faq') {
        newItem = {
          id: Date.now(),
          name: docQuestion || 'Pergunta Frequente',
          type: 'faq',
          fileType: 'FAQ',
          size: '14 KB',
          updatedAt: now,
          status: 'Indexado',
          target: targetAssistant,
          tokens: 450,
          description: docAnswer || 'Resposta padronizada direta fornecida pela IA sempre que esse tema for questionado.'
        };
      } else {
        newItem = {
          id: Date.now(),
          name: docName || 'Diretrizes e Regras Comerciais',
          type: 'texto',
          fileType: 'TXT',
          size: '22 KB',
          updatedAt: now,
          status: 'Indexado',
          target: targetAssistant,
          tokens: 1500,
          description: docText || 'Instruções personalizadas sobre descontos, formas de pagamento e conduta.'
        };
      }

      setKnowledgeList(prev => [newItem, ...prev]);
      setIndexing(false);
      setAddModalOpen(false);
      setDocName('');
      setDocFile(null);
      setDocUrl('');
      setDocQuestion('');
      setDocAnswer('');
      setDocText('');
    }, 1200);
  };

  const handleDelete = (id) => {
    setKnowledgeList(prev => prev.filter(k => k.id !== id));
  };

  const handleRunTestQuery = (e) => {
    e.preventDefault();
    if (!testQuestion) return;
    setTestLoading(true);
    setTestAnswer('');

    setTimeout(() => {
      setTestLoading(false);
      setTestAnswer(`Com base nos documentos indexados (Tabela de Preços e FAQ da empresa):

"Nosso valor de consulta/atendimento padrão é R$ 250,00. Aceitamos pagamentos à vista via Pix com 5% de desconto, ou cartão em até 3x sem juros. O agendamento é realizado de segunda a sexta, das 08h às 18h, e temos convênios com os principais planos de saúde."`);
    }, 1200);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#EBE8E2]">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-2xl font-bold text-[#1A1816]">Conhecimento</h3>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              IA Neural Sincronizada
            </span>
          </div>
          <p className="text-xs text-[#5C5955] mt-1">
            Alimente suas assistentes de voz e WhatsApp com documentos, tabelas, FAQs e sites para respostas com 100% de precisão.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setTestModalOpen(true)}
            className="px-3.5 py-2 rounded-xl border border-[#D0CBC0] hover:bg-[#FAF9F5] text-xs font-semibold text-[#1A1816] transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C84B1F]" />
            <span>Testar Pergunta</span>
          </button>

          <button 
            onClick={() => setAddModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-[#1A1816] hover:bg-black text-white text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm hover:shadow"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Adicionar conhecimento</span>
          </button>
        </div>
      </div>

      {/* Top 4 KPI Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 rounded-2xl bg-white border border-[#E7E4DC] shadow-sm">
          <div className="flex items-center justify-between text-xs text-[#736F69] mb-1 font-medium">
            <span>Fontes Ativas</span>
            <BookOpen className="w-4 h-4 text-[#C84B1F]" />
          </div>
          <div className="text-2xl font-extrabold text-[#1A1816]">{knowledgeList.length}</div>
          <div className="text-[11px] text-emerald-700 mt-1 flex items-center gap-1 font-medium">
            <CheckCircle2 className="w-3 h-3" />
            <span>Todas indexadas</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#E7E4DC] shadow-sm">
          <div className="flex items-center justify-between text-xs text-[#736F69] mb-1 font-medium">
            <span>Tokens / Palavras</span>
            <FileText className="w-4 h-4 text-[#5C5955]" />
          </div>
          <div className="text-2xl font-extrabold text-[#1A1816]">14.650</div>
          <div className="text-[11px] text-[#736F69] mt-1">
            Embeddings neurais prontos
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#E7E4DC] shadow-sm">
          <div className="flex items-center justify-between text-xs text-[#736F69] mb-1 font-medium">
            <span>Precisão Factual</span>
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-extrabold text-[#1A1816]">99.8%</div>
          <div className="text-[11px] text-emerald-700 mt-1 font-medium">
            Sem alucinações na fala
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#E7E4DC] shadow-sm">
          <div className="flex items-center justify-between text-xs text-[#736F69] mb-1 font-medium">
            <span>Assistentes Conectadas</span>
            <Sparkles className="w-4 h-4 text-[#C84B1F]" />
          </div>
          <div className="text-2xl font-extrabold text-[#1A1816]">
            {createdAssistants.length > 0 ? createdAssistants.length : 1}
          </div>
          <div className="text-[11px] text-[#736F69] mt-1">
            Roberta & Canais Ativos
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {[
            { id: 'todos', label: `Todos (${knowledgeList.length})` },
            { id: 'documento', label: 'Documentos & PDFs' },
            { id: 'faq', label: 'Perguntas (FAQ)' },
            { id: 'url', label: 'Sites & URLs' },
            { id: 'texto', label: 'Regras' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                filter === tab.id
                  ? 'bg-[#1A1816] text-white shadow-sm'
                  : 'bg-white border border-[#E7E4DC] text-[#5C5955] hover:text-[#1A1816] hover:bg-[#FAF9F5]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative sm:w-64">
          <Search className="w-3.5 h-3.5 text-[#8C8881] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar documento ou FAQ..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-[#D0CBC0] text-xs bg-white focus:outline-none focus:border-[#C84B1F]"
          />
        </div>
      </div>

      {/* Knowledge Items Grid */}
      {filteredList.length === 0 ? (
        <div className="py-16 flex flex-col items-center justify-center text-center max-w-md mx-auto bg-white rounded-3xl border border-[#E7E4DC] p-8">
          <div className="w-12 h-12 rounded-full bg-[#FAF5EE] border border-[#EDE5D8] flex items-center justify-center text-[#8C8881] mb-3">
            <BookOpen className="w-6 h-6 text-[#736F69]" />
          </div>
          <h4 className="font-bold text-[#1A1816] text-sm">Nenhum item encontrado</h4>
          <p className="text-xs text-[#736F69] mt-1 mb-4">
            Envie sua tabela de preços em PDF, FAQ de perguntas ou link do site para a IA aprender.
          </p>
          <button
            onClick={() => setAddModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-[#1A1816] text-white text-xs font-bold hover:bg-black transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Adicionar Conhecimento</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredList.map((item) => (
            <div 
              key={item.id}
              className="p-5 rounded-2xl bg-white border border-[#E7E4DC] hover:border-[#D0CBC0] transition-all flex flex-col justify-between space-y-4 shadow-sm hover:shadow"
            >
              <div>
                {/* Top Row: Icon + Name + Badge */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${
                      item.type === 'documento'
                        ? 'bg-red-50 text-red-600 border-red-200'
                        : item.type === 'url'
                          ? 'bg-blue-50 text-blue-600 border-blue-200'
                          : item.type === 'faq'
                            ? 'bg-purple-50 text-purple-600 border-purple-200'
                            : 'bg-emerald-50 text-emerald-600 border-emerald-200'
                    }`}>
                      {item.type === 'documento' && <FileText className="w-5 h-5" />}
                      {item.type === 'url' && <Globe className="w-5 h-5" />}
                      {item.type === 'faq' && <HelpCircle className="w-5 h-5" />}
                      {item.type === 'texto' && <BookOpen className="w-5 h-5" />}
                    </div>

                    <div className="overflow-hidden">
                      <h4 className="text-sm font-bold text-[#1A1816] truncate max-w-[240px] sm:max-w-[280px]">
                        {item.name}
                      </h4>
                      <div className="flex items-center gap-2 mt-1 text-[11px] text-[#8C8881]">
                        <span className="font-semibold uppercase tracking-wider">{item.fileType}</span>
                        <span>•</span>
                        <span>{item.size}</span>
                        <span>•</span>
                        <span>{item.updatedAt}</span>
                      </div>
                    </div>
                  </div>

                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>{item.status}</span>
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs text-[#5C5955] mt-3 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Bottom Row: Target assistant + actions */}
              <div className="pt-3 border-t border-[#F0EDE8] flex items-center justify-between text-xs">
                <span className="text-[11px] text-[#736F69]">
                  Vinculado a: <strong className="text-[#1A1816]">{item.target}</strong>
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => {
                      setTestQuestion(`O que está definido sobre ${item.name.replace(/_/g, ' ').replace('.pdf', '')}?`);
                      setTestModalOpen(true);
                    }}
                    className="px-2.5 py-1 rounded-lg border border-[#D0CBC0] hover:bg-[#FAF9F5] text-[11px] font-semibold text-[#1A1816] transition-colors cursor-pointer"
                  >
                    Testar
                  </button>

                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-1 rounded-lg text-[#8C8881] hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                    title="Excluir item de conhecimento"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* ========================================================
          MODAL 1: + ADICIONAR CONHECIMENTO (PDF / URL / FAQ)
         ======================================================== */}
      {addModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div 
            className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-[#E7E4DC] relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setAddModalOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white hover:bg-[#FAF9F5] border border-[#E7E4DC] flex items-center justify-center text-[#736F69] hover:text-[#1A1816] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-[#C84B1F]/10 flex items-center justify-center text-[#C84B1F] border border-[#C84B1F]/20">
                <BookOpen className="w-4 h-4" />
              </div>
              <h3 className="text-xl font-bold text-[#1A1816]">Adicionar à Base de Conhecimento</h3>
            </div>
            <p className="text-xs text-[#5C5955] mb-6">
              Envie arquivos, conecte o site ou cadastre perguntas frequentes para as assistentes aprenderem.
            </p>

            {/* Modal Tabs */}
            <div className="grid grid-cols-4 gap-1 p-1 rounded-2xl bg-[#FAF9F5] border border-[#E7E4DC] mb-5">
              {[
                { id: 'documento', label: 'Documento', icon: FileText },
                { id: 'url', label: 'Website / URL', icon: Globe },
                { id: 'faq', label: 'FAQ (P&R)', icon: HelpCircle },
                { id: 'texto', label: 'Regras', icon: BookOpen }
              ].map(t => {
                const Icon = t.icon;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setModalTab(t.id)}
                    className={`py-2 px-1 rounded-xl text-xs font-semibold flex flex-col items-center gap-1 transition-all cursor-pointer ${
                      modalTab === t.id
                        ? 'bg-white text-[#1A1816] shadow-sm font-bold border border-[#E7E4DC]'
                        : 'text-[#736F69] hover:text-[#1A1816]'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span className="text-[11px] truncate w-full text-center">{t.label}</span>
                  </button>
                );
              })}
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4">
              
              {/* TAB 1: DOCUMENTO */}
              {modalTab === 'documento' && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-[#1A1816] mb-1">
                      Upload de Arquivo (PDF, DOCX, TXT, CSV)
                    </label>
                    <label className="border-2 border-dashed border-[#D0CBC0] hover:border-[#C84B1F] rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-colors bg-[#FAF9F5] hover:bg-white group">
                      <Upload className="w-8 h-8 text-[#8C8881] group-hover:text-[#C84B1F] transition-colors mb-2" />
                      <span className="text-xs font-bold text-[#1A1816]">
                        {docFile ? docFile.name : 'Clique para selecionar ou arraste o arquivo aqui'}
                      </span>
                      <span className="text-[11px] text-[#8C8881] mt-0.5">
                        Tabelas de preços, manuais, catálogos (até 25 MB)
                      </span>
                      <input 
                        type="file" 
                        accept=".pdf,.docx,.doc,.txt,.csv,.xlsx" 
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            setDocFile(e.target.files[0]);
                            setDocName(e.target.files[0].name);
                          }
                        }}
                        className="hidden" 
                      />
                    </label>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1A1816] mb-1">
                      Nome de Referência
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: Tabela de Preços e Convênios 2026"
                      value={docName}
                      onChange={(e) => setDocName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#D0CBC0] text-xs focus:outline-none focus:border-[#C84B1F]"
                    />
                  </div>
                </div>
              )}

              {/* TAB 2: WEBSITE / URL */}
              {modalTab === 'url' && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-[#1A1816] mb-1">
                      Link / URL do Website
                    </label>
                    <input
                      type="text"
                      placeholder="https://suaclinica.com.br/sobre"
                      value={docUrl}
                      onChange={(e) => setDocUrl(e.target.value)}
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#D0CBC0] text-xs focus:outline-none focus:border-[#C84B1F]"
                    />
                    <span className="text-[11px] text-[#8C8881] mt-1 block">
                      A IA fará a leitura e indexação automática das informações públicas desse endereço.
                    </span>
                  </div>
                </div>
              )}

              {/* TAB 3: FAQ (PERGUNTA E RESPOSTA) */}
              {modalTab === 'faq' && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-[#1A1816] mb-1">
                      Pergunta do Cliente
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: Quais convênios médicos vocês atendem?"
                      value={docQuestion}
                      onChange={(e) => setDocQuestion(e.target.value)}
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#D0CBC0] text-xs focus:outline-none focus:border-[#C84B1F]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1A1816] mb-1">
                      Resposta Exata da IA
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Ex: Atendemos Unimed, Bradesco Saúde, Amil e SulAmérica para consultas e exames preventivos."
                      value={docAnswer}
                      onChange={(e) => setDocAnswer(e.target.value)}
                      required
                      className="w-full px-3.5 py-2 rounded-xl border border-[#D0CBC0] text-xs focus:outline-none focus:border-[#C84B1F]"
                    />
                  </div>
                </div>
              )}

              {/* TAB 4: TEXTO LIVRE */}
              {modalTab === 'texto' && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-[#1A1816] mb-1">
                      Título das Diretrizes
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: Política de Descontos e Agendamentos"
                      value={docName}
                      onChange={(e) => setDocName(e.target.value)}
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#D0CBC0] text-xs focus:outline-none focus:border-[#C84B1F]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1A1816] mb-1">
                      Conteúdo / Regras de Negócio
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Digite aqui as instruções detalhadas que a IA deve seguir ao conversar com clientes..."
                      value={docText}
                      onChange={(e) => setDocText(e.target.value)}
                      required
                      className="w-full px-3.5 py-2 rounded-xl border border-[#D0CBC0] text-xs focus:outline-none focus:border-[#C84B1F]"
                    />
                  </div>
                </div>
              )}

              {/* Target Assistant Dropdown */}
              <div>
                <label className="block text-xs font-bold text-[#1A1816] mb-1">
                  Vincular Conhecimento à Assistente
                </label>
                <select
                  value={targetAssistant}
                  onChange={(e) => setTargetAssistant(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#D0CBC0] text-xs bg-white focus:outline-none focus:border-[#C84B1F]"
                >
                  <option value="Todas as assistentes">Todas as assistentes (Recomendado)</option>
                  {createdAssistants.map(a => (
                    <option key={a.id} value={`${a.name} (${a.typeName})`}>
                      {a.name} ({a.typeName})
                    </option>
                  ))}
                </select>
              </div>

              {/* Submit Button with Indexing State */}
              <button
                type="submit"
                disabled={indexing}
                className="w-full mt-4 py-3 rounded-xl bg-[#C84B1F] hover:bg-[#B34018] text-white text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-70"
              >
                {indexing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Lendo e Gerando Embeddings Neurais...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Salvar e Indexar na IA</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL 2: TESTAR PERGUNTA NA BASE DE CONHECIMENTO
         ======================================================== */}
      {testModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div 
            className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#E7E4DC] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setTestModalOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white hover:bg-[#FAF9F5] border border-[#E7E4DC] flex items-center justify-center text-[#736F69] hover:text-[#1A1816] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-[#C84B1F]/10 flex items-center justify-center text-[#C84B1F]">
                <Sparkles className="w-4 h-4" />
              </div>
              <h3 className="text-xl font-bold text-[#1A1816]">Simulador de Consulta RAG</h3>
            </div>
            <p className="text-xs text-[#5C5955] mb-5">
              Faça uma pergunta qualquer como se fosse um cliente para testar se a IA encontra a resposta nos seus documentos.
            </p>

            <form onSubmit={handleRunTestQuery} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#1A1816] mb-1">
                  Pergunta do Cliente (Exemplo)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Ex: Qual o valor da consulta e aceita cartão?"
                    value={testQuestion}
                    onChange={(e) => setTestQuestion(e.target.value)}
                    required
                    className="flex-1 px-3.5 py-2.5 rounded-xl border border-[#D0CBC0] text-xs focus:outline-none focus:border-[#C84B1F]"
                  />
                  <button
                    type="submit"
                    disabled={testLoading}
                    className="px-4 py-2.5 rounded-xl bg-[#1A1816] text-white text-xs font-bold hover:bg-black transition-colors shrink-0 flex items-center gap-1.5 cursor-pointer disabled:opacity-60"
                  >
                    {testLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <span>Perguntar</span>}
                  </button>
                </div>
              </div>

              {/* Suggestions */}
              <div className="flex flex-wrap gap-1.5">
                {[
                  'Qual é o preço da consulta?',
                  'Quais convênios atendem?',
                  'Onde fica o consultório?'
                ].map((sug, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setTestQuestion(sug)}
                    className="px-2.5 py-1 rounded-lg bg-[#FAF5EE] border border-[#EDE5D8] text-[11px] font-medium text-[#736F69] hover:text-[#1A1816] transition-colors cursor-pointer"
                  >
                    {sug}
                  </button>
                ))}
              </div>

              {/* Response Box */}
              {testAnswer && (
                <div className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#E7E4DC] space-y-2 animate-fadeIn">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Resposta Encontrada na Base de Conhecimento</span>
                  </div>
                  <p className="text-xs text-[#1A1816] leading-relaxed whitespace-pre-line">
                    {testAnswer}
                  </p>
                </div>
              )}
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
