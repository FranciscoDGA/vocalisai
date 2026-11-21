import React, { useState } from 'react';
import { 
  Search, Sparkles, ShieldCheck, FileText, ChevronRight, Check, 
  ExternalLink, Copy, CheckCircle2, ArrowRight, ArrowLeft, X,
  Phone, Bot, Layers, BookOpen, Users, Sliders, AlertCircle, HelpCircle
} from 'lucide-react';
import { BRAND, PRIVACY_POLICY, TERMS_OF_SERVICE } from '../data/content';

export default function DocsPortal({ isOpen, initialDoc = 'privacidade', onClose, onOpenApp }) {
  const [activeDoc, setActiveDoc] = useState(initialDoc);
  const [searchQuery, setSearchQuery] = useState('');
  const [aiPromptOpen, setAiPromptOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [feedback, setFeedback] = useState(null); // 'yes' | 'no'

  if (!isOpen) return null;

  const handleCopyPage = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-white flex flex-col font-sans">
      
      {/* 1. TOP HEADER BAR (Exact replica of screenshot 1) */}
      <header className="sticky top-0 z-30 bg-white border-b border-[#EBE8E2] px-4 sm:px-8 py-3 flex items-center justify-between text-xs">
        
        {/* Left: Brand + Nav Links */}
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2 cursor-pointer" onClick={onClose}>
            <div className="w-7 h-7 rounded-lg bg-[#4F46E5]/10 flex items-center justify-center border border-[#4F46E5]/20">
              <div className="flex items-center gap-[2px] h-3">
                <span className="w-[2px] h-1.5 bg-[#4F46E5] rounded-full"></span>
                <span className="w-[2px] h-3 bg-[#4F46E5] rounded-full"></span>
                <span className="w-[2px] h-2 bg-[#4F46E5] rounded-full"></span>
              </div>
            </div>
            <span className="font-bold text-base text-[#1A1816] tracking-tight">{BRAND.name}</span>
          </div>

          <nav className="hidden lg:flex items-center gap-6 text-[#5C5955] font-medium">
            <button onClick={() => setActiveDoc('primeiros-passos')} className="hover:text-[#1A1816] transition-colors">Começar</button>
            <button onClick={() => setActiveDoc('comunicacao')} className="hover:text-[#1A1816] transition-colors">Recursos</button>
            <button onClick={() => setActiveDoc('tecnicas')} className="hover:text-[#1A1816] transition-colors">Integrações</button>
            <button onClick={() => setActiveDoc('dpa')} className="hover:text-[#1A1816] transition-colors">Parceiros</button>
          </nav>
        </div>

        {/* Center: Search & Ask AI */}
        <div className="hidden sm:flex items-center gap-2 max-w-md w-full mx-4">
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 text-[#8C8881] absolute left-3 top-2.5" />
            <input 
              type="text" 
              placeholder="Pesquisar..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-12 py-1.5 rounded-lg border border-[#E0DCD4] bg-[#FAF9F5] text-xs focus:outline-none focus:border-[#4F46E5] text-[#1A1816]"
            />
            <span className="absolute right-2.5 top-2 text-[10px] text-[#8C8881] border border-[#D5D0C6] rounded px-1 font-mono">
              Ctrl K
            </span>
          </div>

          <button 
            onClick={() => setAiPromptOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E0DCD4] bg-white text-[#5C5955] hover:text-[#1A1816] hover:border-[#4F46E5] transition-colors shrink-0"
          >
            <Sparkles className="w-3 h-3 text-[#4F46E5]" />
            <span>Perguntar à nossa IA...</span>
            <span className="text-[10px] text-[#8C8881] border border-[#D5D0C6] rounded px-1 font-mono ml-1">
              Ctrl I
            </span>
          </button>
        </div>

        {/* Right: Support, Flag & Back/Open App */}
        <div className="flex items-center gap-4 text-[#5C5955]">
          <a href="mailto:suporte@vocalis.ai" className="hidden md:inline hover:text-[#1A1816] transition-colors">Suporte</a>
          
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-[#1A1816]">
            <span>🇧🇷</span>
            <span>Ver a página (Brasil)</span>
          </div>

          <button 
            onClick={onClose}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#1A1816] text-white font-semibold hover:bg-black transition-colors"
          >
            <span>Abrir app</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* 2. BODY LAYOUT: 3 COLUMNS (Left Sidebar, Center Document, Right TOC) */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        
        {/* LEFT SIDEBAR NAVIGATION */}
        <aside className="w-64 border-r border-[#EBE8E2] p-6 shrink-0 hidden md:block overflow-y-auto">
          
          {/* Group 1: Começar */}
          <div className="mb-6">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#1A1816] mb-2.5">
              Começar
            </h4>
            <div className="space-y-1 text-xs">
              {[
                { id: 'primeiros-passos', label: 'Primeiros passos' },
                { id: 'numeros', label: 'Números de telefone' },
                { id: 'comunicacao', label: 'Comunicação: Unidades, prompt...' },
                { id: 'modelos', label: 'Modelos e multi-linguagem' },
                { id: 'tecnicas', label: 'Configurações técnicas' },
                { id: 'contatos', label: 'Contatos' },
                { id: 'analise', label: 'Análise' },
                { id: 'troubleshooting', label: 'Solução de problemas' },
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => setActiveDoc(item.id)}
                  className={`w-full text-left px-2.5 py-1.5 rounded-md transition-colors block truncate ${
                    activeDoc === item.id 
                      ? 'bg-[#EFECE6] text-[#1A1816] font-semibold' 
                      : 'text-[#5C5955] hover:text-[#1A1816] hover:bg-[#FAF9F5]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Group 2: Legal */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#1A1816] mb-2.5">
              Legal
            </h4>
            <div className="space-y-1 text-xs">
              <button
                onClick={() => setActiveDoc('privacidade')}
                className={`w-full text-left px-2.5 py-1.5 rounded-md transition-colors block truncate ${
                  activeDoc === 'privacidade' 
                    ? 'bg-[#EFECE6] text-[#1A1816] font-semibold' 
                    : 'text-[#5C5955] hover:text-[#1A1816] hover:bg-[#FAF9F5]'
                }`}
              >
                Política de privacidade
              </button>
              <button
                onClick={() => setActiveDoc('dpa')}
                className={`w-full text-left px-2.5 py-1.5 rounded-md transition-colors block truncate ${
                  activeDoc === 'dpa' 
                    ? 'bg-[#EFECE6] text-[#1A1816] font-semibold' 
                    : 'text-[#5C5955] hover:text-[#1A1816] hover:bg-[#FAF9F5]'
                }`}
              >
                Proteção de dados (DPA)
              </button>
              <button
                onClick={() => setActiveDoc('exclusao')}
                className={`w-full text-left px-2.5 py-1.5 rounded-md transition-colors block truncate ${
                  activeDoc === 'exclusao' 
                    ? 'bg-[#EFECE6] text-[#1A1816] font-semibold' 
                    : 'text-[#5C5955] hover:text-[#1A1816] hover:bg-[#FAF9F5]'
                }`}
              >
                Exclusão de dados
              </button>
              <button
                onClick={() => setActiveDoc('termos')}
                className={`w-full text-left px-2.5 py-1.5 rounded-md transition-colors block truncate ${
                  activeDoc === 'termos' 
                    ? 'bg-[#EFECE6] text-[#1A1816] font-semibold' 
                    : 'text-[#5C5955] hover:text-[#1A1816] hover:bg-[#FAF9F5]'
                }`}
              >
                Termos e condições
              </button>
            </div>
          </div>

        </aside>

        {/* CENTER READING PANE */}
        <main className="flex-1 p-6 sm:p-12 overflow-y-auto max-w-3xl">
          
          {/* Breadcrumb */}
          <div className="text-xs text-[#4F46E5] font-semibold mb-2">
            Legal
          </div>

          {/* Header Title with Copy Page */}
          <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#EBE8E2] mb-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-[#1A1816] tracking-tight">
                {activeDoc === 'privacidade' && 'Política de privacidade'}
                {activeDoc === 'termos' && 'Termos e Condições de Uso'}
                {activeDoc === 'dpa' && 'Acordo de Processamento de Dados (DPA)'}
                {activeDoc === 'exclusao' && 'Exclusão de Dados & Direitos do Titular'}
                {activeDoc === 'central' && 'Central de Documentação & Ajuda'}
                {!['privacidade', 'termos', 'dpa', 'exclusao', 'central'].includes(activeDoc) && 'Central de Documentação'}
              </h1>
              <p className="mt-2 text-sm text-[#5C5955]">
                {activeDoc === 'privacidade' && 'Diretrizes sobre coleta, uso, compartilhamento e proteção de dados pessoais (itens marcados como pendentes aguardam validação jurídica).'}
                {activeDoc === 'termos' && 'Condições gerais de uso da plataforma e limites de responsabilidade (condições comerciais, cobrança e SLA pendentes de confirmação).'}
                {activeDoc === 'dpa' && 'Diretrizes de tratamento de dados pessoais para clientes corporativos (termos do DPA pendentes de validação jurídica).'}
                {activeDoc === 'exclusao' && 'Canais e diretrizes gerais para solicitação de eliminação ou revisão de registros (pendente de confirmação operacional).'}
                {activeDoc === 'central' && 'Guias introdutórios e visão geral de configurações da plataforma Vocalis.'}
              </p>
            </div>

            <button 
              onClick={handleCopyPage}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E0DCD4] bg-white text-xs text-[#5C5955] hover:text-[#1A1816] hover:border-[#1A1816] transition-colors shrink-0"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copiado!' : 'Copiar página'}</span>
            </button>
          </div>

          {/* CONTENT: POLÍTICA DE PRIVACIDADE */}
          {activeDoc === 'privacidade' && (
            <div className="space-y-8 text-sm text-[#383531] leading-relaxed">
              
              <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-[#5C5955] leading-relaxed">
                <strong>Aviso de revisão técnica:</strong> os trechos marcados como <strong>PENDENTE DE CONFIRMAÇÃO</strong> dependem de validação pelo proprietário e por assessoria jurídica antes de publicação definitiva em produção.
              </div>

              <p>
                Esta minuta referencia <strong>VOCALIS TECNOLOGIA LTDA</strong> (CNPJ 27.824.190/0001-18, Rua Rio Grande do Sul, 24, Setor Maria Liane, Cumaru do Norte/PA, CEP 68398-000). A confirmação cadastral oficial, eventual endereço institucional alternativo e os documentos contratuais finais estão <strong>PENDENTES DE CONFIRMAÇÃO</strong> pelo proprietário e assessoria jurídica.
              </p>

              {/* 1. Quem é o controlador */}
              <section id="controlador" className="space-y-3">
                <h2 className="text-xl font-bold text-[#1A1816]">Quem é o controlador</h2>
                <ul className="list-disc pl-5 space-y-1.5">
                  <li>
                    <strong>Dados de visitantes, leads comerciais e usuários cadastrados:</strong> a Vocalis atua como controladora.
                  </li>
                  <li>
                    <strong>Conversas atendidas pelos assistentes configurados por clientes:</strong> o cliente contratante define finalidades e instruções e atua como controlador; a Vocalis atua como <strong>operadora</strong> (formalização contratual do DPA <strong>PENDENTE DE CONFIRMAÇÃO</strong>).
                  </li>
                </ul>
              </section>

              {/* 2. Dados que tratamos */}
              <section id="dados" className="space-y-3">
                <h2 className="text-xl font-bold text-[#1A1816]">Dados que tratamos</h2>
                
                <div className="overflow-x-auto rounded-xl border border-[#E7E4DC]">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-[#FAF9F5] border-b border-[#E7E4DC] text-[#1A1816] font-bold">
                        <th className="p-3">Categoria</th>
                        <th className="p-3">Exemplos</th>
                        <th className="p-3">Finalidade</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#EBE8E2]">
                      <tr>
                        <td className="p-3 font-semibold text-[#1A1816]">Cadastro e formulários</td>
                        <td className="p-3">Nome, e-mail, telefone/WhatsApp, empresa</td>
                        <td className="p-3">Criar conta e registrar pedidos de contato ou demonstração feitos pelo visitante</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-[#1A1816]">Simulação ilustrativa</td>
                        <td className="p-3">Número opcional digitado na prévia do navegador</td>
                        <td className="p-3">Demonstração visual na tela, sem armazenamento nem disparo de ligação/WhatsApp real</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-[#1A1816]">Faturamento</td>
                        <td className="p-3">CPF/CNPJ, endereço de cobrança (a confirmar fluxo ativo)</td>
                        <td className="p-3">Emitir notas fiscais e cobranças conforme o contrato confirmado</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-[#1A1816]">Uso da plataforma</td>
                        <td className="p-3">Registros de acesso e configurações</td>
                        <td className="p-3">Segurança, suporte e operação do serviço</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-[#1A1816]">Chamadas e mensagens em operação</td>
                        <td className="p-3">Número de telefone, transcrição, áudio (quando habilitado no provedor)</td>
                        <td className="p-3">Prestar o atendimento contratado pelo cliente (gravação/retenção PENDENTES DE CONFIRMAÇÃO)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* 3. Bases legais */}
              <section id="bases" className="space-y-2">
                <h2 className="text-xl font-bold text-[#1A1816]">Bases legais (sujeito a revisão jurídica)</h2>
                <p>
                  Execução de contrato ou de procedimentos preliminares a pedido do titular, cumprimento de obrigação legal, legítimo interesse e consentimento quando exigido — cuja matriz definitiva de enquadramento está <strong>PENDENTE DE CONFIRMAÇÃO</strong> jurídica.
                </p>
              </section>

              {/* 4. Compartilhamento */}
              <section id="compartilhamento" className="space-y-3">
                <h2 className="text-xl font-bold text-[#1A1816]">Compartilhamento e subprocessadores (PENDENTE DE CONFIRMAÇÃO)</h2>
                <p>
                  Compartilhamos dados apenas com fornecedores necessários à operação, mediante contratos aplicáveis. <strong>Não vendemos dados pessoais.</strong> A relação abaixo consta da minuta histórica e está <strong>PENDENTE DE CONFIRMAÇÃO</strong> porque também há referências técnicas no sistema a provedores como <strong>Supabase, Vercel, Google Gemini, Vapi, OpenAI, Deepgram e UazAPI</strong>:
                </p>

                <div className="overflow-x-auto rounded-xl border border-[#E7E4DC]">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-[#FAF9F5] border-b border-[#E7E4DC] text-[#1A1816] font-bold">
                        <th className="p-3">Fornecedor</th>
                        <th className="p-3">Finalidade</th>
                        <th className="p-3">Local (a confirmar)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#EBE8E2]">
                      <tr>
                        <td className="p-3 font-mono font-semibold text-[#1A1816]">Fly.io (a confirmar)</td>
                        <td className="p-3">Hospedagem citada na minuta anterior</td>
                        <td className="p-3">EUA (a confirmar)</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono font-semibold text-[#1A1816]">Twilio (a confirmar)</td>
                        <td className="p-3">Telefonia citada na minuta anterior</td>
                        <td className="p-3">EUA (a confirmar)</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono font-semibold text-[#1A1816]">LiveKit (a confirmar)</td>
                        <td className="p-3">Infraestrutura de áudio citada na minuta anterior</td>
                        <td className="p-3">EUA (a confirmar)</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono font-semibold text-[#1A1816]">Anthropic / ElevenLabs (a confirmar)</td>
                        <td className="p-3">Modelos de IA/voz citados na minuta anterior</td>
                        <td className="p-3">UE / EUA (a confirmar)</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono font-semibold text-[#1A1816]">Meta Platforms (a confirmar)</td>
                        <td className="p-3">Mensagens de WhatsApp Business conforme modalidade confirmada</td>
                        <td className="p-3">EUA (a confirmar)</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono font-semibold text-[#1A1816]">Stripe (a confirmar)</td>
                        <td className="p-3">Pagamentos citados na minuta anterior</td>
                        <td className="p-3">EUA (a confirmar)</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono font-semibold text-[#1A1816]">Resend (a confirmar)</td>
                        <td className="p-3">E-mails transacionais citados na minuta anterior</td>
                        <td className="p-3">EUA / Américas (a confirmar)</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono font-semibold text-[#1A1816]">Cloudflare / Microsoft (a confirmar)</td>
                        <td className="p-3">CDN e segurança citados na minuta anterior</td>
                        <td className="p-3">EUA / Global (a confirmar)</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono font-semibold text-[#1A1816]">Supabase / Vercel / Google Gemini / Vapi / OpenAI / Deepgram / UazAPI</td>
                        <td className="p-3">Provedores referenciados na base de código (sujeitos a consolidação contratual)</td>
                        <td className="p-3">Países a confirmar</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* 5. Transferência internacional */}
              <section id="transferencia" className="space-y-2">
                <h2 className="text-xl font-bold text-[#1A1816]">Transferência internacional (PENDENTE DE CONFIRMAÇÃO)</h2>
                <p>
                  Fornecedores de nuvem, telefonia e IA podem processar dados fora do Brasil. O uso de proteção de transporte via HTTPS/TLS não equivale a sigilo de extremo a extremo (E2EE); os mecanismos contratuais formais de transferência internacional (cláusulas-padrão ANPD) e a relação exata de países estão <strong>PENDENTES DE CONFIRMAÇÃO</strong> jurídica.
                </p>
              </section>

              {/* 6. Retenção */}
              <section id="retencao" className="space-y-2">
                <h2 className="text-xl font-bold text-[#1A1816]">Gravação, retenção e exclusão (PENDENTE DE CONFIRMAÇÃO)</h2>
                <p>
                  A política real de ativação de gravação de chamadas, guarda de transcrições, prazos específicos de retenção e eliminação ao término do contrato está <strong>PENDENTE DE CONFIRMAÇÃO</strong> técnica e jurídica, observadas as guardas legais obrigatórias quando aplicáveis (como documentos fiscais ou obrigações do Marco Civil da Internet).
                </p>
              </section>

              {/* 7. Seus direitos */}
              <section id="direitos" className="space-y-3">
                <h2 className="text-xl font-bold text-[#1A1816]">Seus direitos e procedimento (PENDENTE DE CONFIRMAÇÃO)</h2>
                <p>
                  Você pode solicitar informações sobre confirmação de tratamento, acesso, correção, anonimização, portabilidade, eliminação e revogação de consentimento (art. 18 da LGPD). Se a sua conversa foi atendida por um cliente empresarial da Vocalis, o atendimento ao pedido dependerá de encaminhamento ao respectivo cliente controlador. O fluxo de verificação de identidade e os prazos operacionais estão <strong>PENDENTES DE CONFIRMAÇÃO</strong>.
                </p>
                <p>
                  Canais atualmente exibidos (sujeitos a confirmação operacional): e-mail <strong>dpo@vocalis.ai</strong> / <strong>privacidade@vocalis.ai</strong> e guia de Exclusão de dados.
                </p>

                {/* Box Encarregado */}
                <div className="p-4 rounded-xl bg-[#FAF9F5] border border-[#E7E4DC] text-xs space-y-1">
                  <div className="font-bold text-[#1A1816] flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#4F46E5]" />
                    <span>Encarregado de dados (DPO) — PENDENTE DE CONFIRMAÇÃO</span>
                  </div>
                  <p className="text-[#5C5955]">
                    Indicação cadastrada na minuta: <strong>Sarah Freitas</strong> — <a href="mailto:privacidade@vocalis.ai" className="text-[#4F46E5] underline">privacidade@vocalis.ai</a> / <a href="mailto:dpo@vocalis.ai" className="text-[#4F46E5] underline">dpo@vocalis.ai</a>. Nome oficial do DPO e canal unificado estão <strong>PENDENTES DE CONFIRMAÇÃO</strong> pelo proprietário.
                  </p>
                </div>
              </section>

              {/* 8. Segurança */}
              <section id="seguranca" className="space-y-2">
                <h2 className="text-xl font-bold text-[#1A1816]">Segurança da informação (PENDENTE DE CONFIRMAÇÃO)</h2>
                <p>
                  O site e integrações web utilizam conexões protegidas via HTTPS/TLS em trânsito e controles providos pela infraestrutura utilizada, sem alegação de sigilo de extremo a extremo (E2EE) em chamadas ou canais terceiros. Especificações de versão de TLS/criptografia em repouso (como AES-256), retenção zero, trilhas de auditoria e cláusulas contratuais de não uso para treinamento de modelos por terceiros estão <strong>PENDENTES DE CONFIRMAÇÃO</strong> técnica e contratual junto a cada fornecedor.
                </p>
              </section>

              {/* 9. Alterações */}
              <section id="alteracoes" className="space-y-3">
                <h2 className="text-xl font-bold text-[#1A1816]">Alterações e versão</h2>
                <p>
                  Esta minuta passará a ter data de vigência formal somente após validação jurídica e do proprietário.
                </p>

                <div className="p-4 rounded-xl bg-[#FAF9F5] border border-[#E7E4DC] text-xs space-y-1">
                  <div className="font-bold text-[#1A1816]">Status da revisão</div>
                  <p className="text-[#5C5955]">
                    Minuta técnica em revisão — pendente de aprovação jurídica e confirmação do proprietário antes da publicação definitiva.
                  </p>
                </div>
              </section>

              {/* 10. Artigos relacionados (4 Cards) */}
              <section className="pt-6 border-t border-[#EBE8E2]">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#8C8881] mb-3">
                  Artigos relacionados
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button 
                    onClick={() => setActiveDoc('exclusao')}
                    className="p-3.5 rounded-xl border border-[#E7E4DC] bg-white text-left hover:border-[#4F46E5] transition-colors group"
                  >
                    <div className="text-xs font-bold text-[#1A1816] group-hover:text-[#4F46E5] flex items-center justify-between">
                      <span>Exclusão de dados</span>
                      <ChevronRight className="w-3.5 h-3.5 text-[#8C8881]" />
                    </div>
                    <p className="text-[11px] text-[#5C5955] mt-1 leading-snug">
                      Canais e diretrizes para solicitar revisão ou exclusão de dados pessoais.
                    </p>
                  </button>

                  <button 
                    onClick={() => setActiveDoc('dpa')}
                    className="p-3.5 rounded-xl border border-[#E7E4DC] bg-white text-left hover:border-[#4F46E5] transition-colors group"
                  >
                    <div className="text-xs font-bold text-[#1A1816] group-hover:text-[#4F46E5] flex items-center justify-between">
                      <span>Proteção de dados</span>
                      <ChevronRight className="w-3.5 h-3.5 text-[#8C8881]" />
                    </div>
                    <p className="text-[11px] text-[#5C5955] mt-1 leading-snug">
                      Diretrizes de Acordo de Processamento de Dados (DPA) pendentes de revisão jurídica.
                    </p>
                  </button>

                  <button 
                    onClick={() => setActiveDoc('termos')}
                    className="p-3.5 rounded-xl border border-[#E7E4DC] bg-white text-left hover:border-[#4F46E5] transition-colors group"
                  >
                    <div className="text-xs font-bold text-[#1A1816] group-hover:text-[#4F46E5] flex items-center justify-between">
                      <span>Termos e condições</span>
                      <ChevronRight className="w-3.5 h-3.5 text-[#8C8881]" />
                    </div>
                    <p className="text-[11px] text-[#5C5955] mt-1 leading-snug">
                      Regras de uso da plataforma Vocalis, cobrança e cancelamento.
                    </p>
                  </button>

                  <button 
                    onClick={() => setActiveDoc('privacidade')}
                    className="p-3.5 rounded-xl border border-[#E7E4DC] bg-white text-left hover:border-[#4F46E5] transition-colors group"
                  >
                    <div className="text-xs font-bold text-[#1A1816] group-hover:text-[#4F46E5] flex items-center justify-between">
                      <span>Retenção</span>
                      <ChevronRight className="w-3.5 h-3.5 text-[#8C8881]" />
                    </div>
                    <p className="text-[11px] text-[#5C5955] mt-1 leading-snug">
                      Diretrizes sobre gravações, transcrições e prazos em definição contratual.
                    </p>
                  </button>
                </div>
              </section>

              {/* 11. Feedback: Esta página foi útil? */}
              <div className="pt-6 border-t border-[#EBE8E2] flex items-center justify-between text-xs">
                <span className="text-[#5C5955]">Esta página foi útil?</span>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setFeedback('yes')}
                    className={`px-3 py-1 rounded-lg border transition-colors ${
                      feedback === 'yes' ? 'bg-[#1A1816] text-white border-[#1A1816]' : 'border-[#E0DCD4] hover:bg-[#FAF9F5]'
                    }`}
                  >
                    Sim
                  </button>
                  <button 
                    onClick={() => setFeedback('no')}
                    className={`px-3 py-1 rounded-lg border transition-colors ${
                      feedback === 'no' ? 'bg-[#1A1816] text-white border-[#1A1816]' : 'border-[#E0DCD4] hover:bg-[#FAF9F5]'
                    }`}
                  >
                    Não
                  </button>
                </div>
              </div>

              {/* Next page link */}
              <div className="pt-4 flex justify-end">
                <button 
                  onClick={() => setActiveDoc('dpa')}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1A1816] hover:text-[#4F46E5]"
                >
                  <span>Próximo: Proteção de dados (DPA)</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          )}

          {/* CONTENT: TERMOS E CONDIÇÕES */}
          {activeDoc === 'termos' && (
            <div className="space-y-6 text-sm text-[#383531] leading-relaxed">
              {TERMS_OF_SERVICE.sections.map((sec) => (
                <div key={sec.id} className="pt-4 border-t border-[#F0EDE8] space-y-2">
                  <h3 className="text-base font-bold text-[#1A1816]">{sec.title}</h3>
                  <p className="text-xs text-[#5C5955]">{sec.content}</p>
                </div>
              ))}
            </div>
          )}

          {/* CONTENT: DPA */}
          {activeDoc === 'dpa' && (
            <div className="space-y-6 text-sm text-[#383531] leading-relaxed">
              <h2 className="text-xl font-bold text-[#1A1816]">Acordo de Processamento de Dados (DPA) — PENDENTE DE CONFIRMAÇÃO</h2>
              <p>
                Em linha com os papéis previstos na LGPD (Lei 13.709/2018), quando o cliente contratante utiliza a plataforma com terceiros finais, o cliente atua como <strong>Controlador</strong> e a Vocalis atua como <strong>Operadora</strong>, sujeitando-se às condições formais do DPA aprovado entre as partes.
              </p>
              <div className="p-4 rounded-xl bg-[#FAF9F5] border border-[#E7E4DC] text-xs space-y-2">
                <h4 className="font-bold text-[#1A1816]">Diretrizes previstas nesta minuta (pendentes de validação jurídica e técnica):</h4>
                <ul className="list-disc pl-5 space-y-1 text-[#5C5955]">
                  <li>Tratar dados pessoais apenas conforme finalidades contratadas e instruções lícitas do Cliente Controlador.</li>
                  <li>Adotar controles de isolamento entre contas e restrição de acesso operacional (arquitetura multitenant e controles nos provedores sob confirmação).</li>
                  <li>Cláusulas de não treinamento de modelos de terceiros com dados do cliente: <strong>PENDENTE DE CONFIRMAÇÃO</strong> nos termos dos fornecedores de IA.</li>
                  <li>Comunicação de incidentes relevantes ao Controlador e à ANPD conforme prazos e obrigações legais (prazo contratual específico pendente de definição jurídica).</li>
                  <li>Atendimento a pedidos de eliminação ou revisão pelos canais oficiais confirmados (fluxo técnico e prazos <strong>PENDENTES DE CONFIRMAÇÃO</strong>).</li>
                </ul>
              </div>
            </div>
          )}

          {/* CONTENT: EXCLUSÃO DE DADOS */}
          {activeDoc === 'exclusao' && (
            <div className="space-y-6 text-sm text-[#383531] leading-relaxed">
              <h2 className="text-xl font-bold text-[#1A1816]">Como solicitar a exclusão ou revisão dos seus dados (PENDENTE DE CONFIRMAÇÃO)</h2>
              <p>
                Com base no art. 18 da Lei Geral de Proteção de Dados (Lei nº 13.709/2018), o titular pode requerer confirmação de tratamento, revisão ou eliminação de dados pessoais quando aplicável.
              </p>

              <div className="p-4 rounded-xl bg-[#FAF9F5] border border-[#E7E4DC] text-xs space-y-2">
                <h4 className="font-bold text-[#1A1816]">Canais atualmente indicados (sujeitos a confirmação do DPO e procedimento):</h4>
                <ul className="list-disc pl-5 space-y-1 text-[#5C5955]">
                  <li>E-mail informado para privacidade/DPO: <a href="mailto:dpo@vocalis.ai" className="text-[#4F46E5] underline">dpo@vocalis.ai</a> / <a href="mailto:privacidade@vocalis.ai" className="text-[#4F46E5] underline">privacidade@vocalis.ai</a> (pendente de confirmação do canal único oficial)</li>
                  <li>WhatsApp de atendimento: <strong>(94) 98442-3948</strong> (pendente de confirmação como canal oficial de privacidade)</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-[#1A1816]">Prazos, validação de identidade e tratamento</h3>
                <p className="text-xs text-[#5C5955]">
                  O fluxo formal de confirmação de identidade do titular, a coordenação com clientes controladores (quando o atendimento ocorreu com uma empresa usuária da plataforma) e o prazo operacional definitivo de resposta estão <strong>PENDENTES DE CONFIRMAÇÃO</strong>, ressalvadas as hipóteses legais de guarda obrigatória (como registros fiscais ou legais aplicáveis).
                </p>
              </div>
            </div>
          )}

          {/* CONTENT: CENTRAL DE AJUDA */}
          {activeDoc === 'central' && (
            <div className="space-y-6 text-sm text-[#383531] leading-relaxed">
              <h2 className="text-xl font-bold text-[#1A1816]">Central de Ajuda & Documentação</h2>
              <p className="text-[#5C5955]">
                Visão geral introdutória dos módulos e documentos da plataforma Vocalis. Recursos, prazos e integrações variam conforme o plano confirmado.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div 
                  onClick={() => setActiveDoc('primeiros-passos')}
                  className="p-4 rounded-xl border border-[#E7E4DC] hover:border-[#4F46E5] transition-colors cursor-pointer bg-white"
                >
                  <h4 className="font-bold text-xs text-[#1A1816]">Primeiros Passos</h4>
                  <p className="text-[11px] text-[#736F69] mt-1">Como configurar seu primeiro assistente conforme o plano escolhido.</p>
                </div>
                <div 
                  onClick={() => setActiveDoc('numeros')}
                  className="p-4 rounded-xl border border-[#E7E4DC] hover:border-[#4F46E5] transition-colors cursor-pointer bg-white"
                >
                  <h4 className="font-bold text-xs text-[#1A1816]">Telefonia & Tronco SIP</h4>
                  <p className="text-[11px] text-[#736F69] mt-1">Opções de números e conexão SIP/PABX sujeitas à disponibilidade do plano.</p>
                </div>
                <div 
                  onClick={() => setActiveDoc('tecnicas')}
                  className="p-4 rounded-xl border border-[#E7E4DC] hover:border-[#4F46E5] transition-colors cursor-pointer bg-white"
                >
                  <h4 className="font-bold text-xs text-[#1A1816]">Integrações & Webhooks</h4>
                  <p className="text-[11px] text-[#736F69] mt-1">Consulte opções de integração via webhooks e conectores disponíveis no plano.</p>
                </div>
                <div 
                  onClick={() => setActiveDoc('privacidade')}
                  className="p-4 rounded-xl border border-[#E7E4DC] hover:border-[#4F46E5] transition-colors cursor-pointer bg-white"
                >
                  <h4 className="font-bold text-xs text-[#1A1816]">Segurança & LGPD</h4>
                  <p className="text-[11px] text-[#736F69] mt-1">Diretrizes de privacidade, DPA e subprocessadores (com pontos pendentes de confirmação).</p>
                </div>
              </div>
            </div>
          )}

        </main>

        {/* RIGHT SIDEBAR: TABLE OF CONTENTS (NESTA PÁGINA) */}
        <aside className="w-56 p-6 shrink-0 hidden lg:block text-xs border-l border-[#EBE8E2]">
          <div className="sticky top-20 space-y-3">
            <h4 className="font-bold text-[#1A1816] flex items-center gap-1.5">
              <span>Nesta página</span>
            </h4>
            <div className="space-y-1.5 text-[#5C5955]">
              <a href="#controlador" className="block hover:text-[#4F46E5] transition-colors truncate">Quem é o controlador</a>
              <a href="#dados" className="block hover:text-[#4F46E5] transition-colors truncate">Dados que tratamos</a>
              <a href="#bases" className="block hover:text-[#4F46E5] transition-colors truncate">Bases legais</a>
              <a href="#compartilhamento" className="block hover:text-[#4F46E5] transition-colors truncate">Compartilhamento</a>
              <a href="#transferencia" className="block hover:text-[#4F46E5] transition-colors truncate">Transferência internacional</a>
              <a href="#retencao" className="block hover:text-[#4F46E5] transition-colors truncate">Retenção</a>
              <a href="#direitos" className="block hover:text-[#4F46E5] transition-colors truncate">Seus direitos</a>
              <a href="#seguranca" className="block hover:text-[#4F46E5] transition-colors truncate">Segurança</a>
              <a href="#alteracoes" className="block hover:text-[#4F46E5] transition-colors truncate">Alterações</a>
            </div>
          </div>
        </aside>

      </div>

    </div>
  );
}
