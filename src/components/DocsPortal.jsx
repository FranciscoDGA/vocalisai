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
            <div className="w-7 h-7 rounded-lg bg-[#C84B1F]/10 flex items-center justify-center border border-[#C84B1F]/20">
              <div className="flex items-center gap-[2px] h-3">
                <span className="w-[2px] h-1.5 bg-[#C84B1F] rounded-full"></span>
                <span className="w-[2px] h-3 bg-[#C84B1F] rounded-full"></span>
                <span className="w-[2px] h-2 bg-[#C84B1F] rounded-full"></span>
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
              className="w-full pl-9 pr-12 py-1.5 rounded-lg border border-[#E0DCD4] bg-[#FAF9F5] text-xs focus:outline-none focus:border-[#C84B1F] text-[#1A1816]"
            />
            <span className="absolute right-2.5 top-2 text-[10px] text-[#8C8881] border border-[#D5D0C6] rounded px-1 font-mono">
              Ctrl K
            </span>
          </div>

          <button 
            onClick={() => setAiPromptOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E0DCD4] bg-white text-[#5C5955] hover:text-[#1A1816] hover:border-[#C84B1F] transition-colors shrink-0"
          >
            <Sparkles className="w-3 h-3 text-[#C84B1F]" />
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
          <div className="text-xs text-[#C84B1F] font-semibold mb-2">
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
                {activeDoc === 'privacidade' && 'Como a Vocalis coleta, usa, compartilha e protege dados pessoais, conforme a LGPD.'}
                {activeDoc === 'termos' && 'Condições gerais de contratação, SLA, uso aceitável e limites de responsabilidade.'}
                {activeDoc === 'dpa' && 'Garantias contratuais de conformidade com a LGPD para controladores corporativos.'}
                {activeDoc === 'exclusao' && 'Procedimentos e formulário para solicitar revogação de consentimento e eliminação de registros.'}
                {activeDoc === 'central' && 'Guias práticos, tutoriais passo a passo e configurações da plataforma Vocalis.'}
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

          {/* CONTENT: POLÍTICA DE PRIVACIDADE (Replica 1:1 of screenshot 1) */}
          {activeDoc === 'privacidade' && (
            <div className="space-y-8 text-sm text-[#383531] leading-relaxed">
              
              <p>
                Esta Política se aplica à <strong>VOCALIS TECNOLOGIA LTDA</strong> (CNPJ 00.000.000/0001-00, Alameda Campinas, s/n, Cerqueira César, São Paulo/SP, CEP 01404-900) e aos dados pessoais de usuários de nosso site, de usuários da plataforma e de pessoas que conversam com assistentes configurados por nossos clientes, nos termos da Lei nº 13.709/2018 (LGPD).
              </p>

              {/* 1. Quem é o controlador */}
              <section id="controlador" className="space-y-3">
                <h2 className="text-xl font-bold text-[#1A1816]">Quem é o controlador</h2>
                <ul className="list-disc pl-5 space-y-1.5">
                  <li>
                    <strong>Dados de visitantes e usuários da conta:</strong> a Vocalis é a controladora.
                  </li>
                  <li>
                    <strong>Conversas que sua empresa faz com um número da Vocalis:</strong> sua empresa é a controladora e a Vocalis atua como <strong>operadora</strong>, seguindo as instruções do acordo de proteção de dados.
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
                        <td className="p-3 font-semibold text-[#1A1816]">Cadastro</td>
                        <td className="p-3">Nome, e-mail, telefone, empresa</td>
                        <td className="p-3">Criar conta e gerenciar o acesso à plataforma</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-[#1A1816]">Faturamento</td>
                        <td className="p-3">CPF/CNPJ, endereço de cobrança</td>
                        <td className="p-3">Emitir notas fiscais e cobranças</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-[#1A1816]">Uso da plataforma</td>
                        <td className="p-3">Registros de acesso, configurações</td>
                        <td className="p-3">Segurança, suporte e melhoria contínua do serviço</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-[#1A1816]">Chamadas atendidas</td>
                        <td className="p-3">Número de telefone, transcrição, áudio (se ativado)</td>
                        <td className="p-3">Prestar o atendimento contratado pelo cliente</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-[#1A1816]">Voz</td>
                        <td className="p-3">Amostras de fala na gravação</td>
                        <td className="p-3">Reconhecimento de fala, com consentimento explícito</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* 3. Bases legais */}
              <section id="bases" className="space-y-2">
                <h2 className="text-xl font-bold text-[#1A1816]">Bases legais</h2>
                <p>
                  Execução de contrato, cumprimento de obrigação legal, legítimo interesse (por exemplo, prevenção a fraudes) e consentimento, quando exigido — como para comunicações não essenciais.
                </p>
              </section>

              {/* 4. Compartilhamento */}
              <section id="compartilhamento" className="space-y-3">
                <h2 className="text-xl font-bold text-[#1A1816]">Compartilhamento</h2>
                <p>
                  Compartilhamos dados apenas com fornecedores necessários à operação, sob contrato e com medidas de segurança. <strong>Não vendemos dados pessoais.</strong> Subprocessadores atuais:
                </p>

                <div className="overflow-x-auto rounded-xl border border-[#E7E4DC]">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-[#FAF9F5] border-b border-[#E7E4DC] text-[#1A1816] font-bold">
                        <th className="p-3">Fornecedor</th>
                        <th className="p-3">Finalidade</th>
                        <th className="p-3">Local</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#EBE8E2]">
                      <tr>
                        <td className="p-3 font-mono font-semibold text-[#1A1816]">Fly.io</td>
                        <td className="p-3">Hospedagem de servidores e de bancos de dados</td>
                        <td className="p-3">EUA</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono font-semibold text-[#1A1816]">Twilio</td>
                        <td className="p-3">Telefonia (ligações normais)</td>
                        <td className="p-3">EUA</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono font-semibold text-[#1A1816]">LiveKit</td>
                        <td className="p-3">Infraestrutura de áudio em tempo real</td>
                        <td className="p-3">EUA</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono font-semibold text-[#1A1816]">Anthropic / ElevenLabs</td>
                        <td className="p-3">Inteligência artificial / Modelos neurais de fala</td>
                        <td className="p-3">UE / EUA</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono font-semibold text-[#1A1816]">Meta Platforms</td>
                        <td className="p-3">Envio e recebimento de mensagens de WhatsApp Business</td>
                        <td className="p-3">EUA</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono font-semibold text-[#1A1816]">Stripe</td>
                        <td className="p-3">Pagamentos e verificação de identidade corporativa</td>
                        <td className="p-3">EUA</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono font-semibold text-[#1A1816]">Resend</td>
                        <td className="p-3">Disparo transacional de e-mails</td>
                        <td className="p-3">EUA / Américas</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono font-semibold text-[#1A1816]">Cloudflare / Microsoft</td>
                        <td className="p-3">Distribuição CDN de páginas e certificados de segurança</td>
                        <td className="p-3">EUA / Global</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* 5. Transferência internacional */}
              <section id="transferencia" className="space-y-2">
                <h2 className="text-xl font-bold text-[#1A1816]">Transferência internacional</h2>
                <p>
                  Alguns fornecedores podem processar dados fora do Brasil. Nesses casos, adotamos salvaguardas previstas na LGPD e nas normas da ANPD (cláusulas-padrão contratuais e criptografia ponta a ponta).
                </p>
              </section>

              {/* 6. Retenção */}
              <section id="retencao" className="space-y-2">
                <h2 className="text-xl font-bold text-[#1A1816]">Retenção</h2>
                <p>
                  Mantemos os dados pelo tempo necessário: dados de cadastro enquanto durar a conta; registros de conexões pelo prazo legal (Marco Civil da Internet, 6 meses); áudios e transcrições pelo prazo configurado pelo cliente em Técnico no assistente. Dados de conversas mantidos enquanto o cliente tiver contrato ativo. Em caso de rescisão, eliminamos os dados mantidos, ressalvadas as obrigações legais de guarda (como documentos fiscais).
                </p>
              </section>

              {/* 7. Seus direitos */}
              <section id="direitos" className="space-y-3">
                <h2 className="text-xl font-bold text-[#1A1816]">Seus direitos</h2>
                <p>
                  Você pode solicitar confirmação de tratamento, acesso, correção, anonimização, portabilidade, eliminação, informação sobre compartilhamento e revogação de consentimento. Se a sua conversa foi com um cliente da Vocalis, encaminharemos a dúvida a ele.
                </p>
                <p>
                  Para exercer esses direitos: entre em contato pelo e-mail <strong>dpo@vocalis.ai</strong> (ou pelo WhatsApp), veja Exclusão de dados.
                </p>

                {/* Box Encarregado */}
                <div className="p-4 rounded-xl bg-[#FAF9F5] border border-[#E7E4DC] text-xs space-y-1">
                  <div className="font-bold text-[#1A1816] flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#C84B1F]" />
                    <span>Encarregado de dados</span>
                  </div>
                  <p className="text-[#5C5955]">
                    Encarregado (DPO): <strong>Sarah Freitas</strong> — <a href="mailto:privacidade@vocalis.ai" className="text-[#C84B1F] underline">privacidade@vocalis.ai</a>. Você também pode acionar a autoridade nacional de proteção de dados (ANPD).
                  </p>
                </div>
              </section>

              {/* 8. Segurança */}
              <section id="seguranca" className="space-y-2">
                <h2 className="text-xl font-bold text-[#1A1816]">Segurança</h2>
                <p>
                  Usamos criptografia em trânsito (TLS 1.3) e em repouso (AES-256), controle de acesso para usuários e registros de auditoria. <strong>Suas conversas e dados de clientes nunca são utilizados para treinar modelos de inteligência artificial de terceiros sem autorização expressa.</strong> Caso ocorra um incidente relevante, comunicaremos os afetados e a ANPD conforme a lei.
                </p>
              </section>

              {/* 9. Alterações */}
              <section id="alteracoes" className="space-y-3">
                <h2 className="text-xl font-bold text-[#1A1816]">Alterações</h2>
                <p>
                  Podemos atualizar esta Política. A versão vigente fica sempre nesta página.
                </p>

                <div className="p-4 rounded-xl bg-[#FAF9F5] border border-[#E7E4DC] text-xs space-y-1">
                  <div className="font-bold text-[#1A1816]">Versão</div>
                  <p className="text-[#5C5955]">
                    Versão 1.0, vigente desde 20 de novembro de 2026. Alterações relevantes são avisadas com antecedência na plataforma ou por e-mail.
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
                    onClick={() => setActiveDoc('dpa')}
                    className="p-3.5 rounded-xl border border-[#E7E4DC] bg-white text-left hover:border-[#C84B1F] transition-colors group"
                  >
                    <div className="text-xs font-bold text-[#1A1816] group-hover:text-[#C84B1F] flex items-center justify-between">
                      <span>Exclusão de dados</span>
                      <ChevronRight className="w-3.5 h-3.5 text-[#8C8881]" />
                    </div>
                    <p className="text-[11px] text-[#5C5955] mt-1 leading-snug">
                      Como pedir a exclusão dos seus dados da plataforma de voz e telefonia da Vocalis.
                    </p>
                  </button>

                  <button 
                    onClick={() => setActiveDoc('dpa')}
                    className="p-3.5 rounded-xl border border-[#E7E4DC] bg-white text-left hover:border-[#C84B1F] transition-colors group"
                  >
                    <div className="text-xs font-bold text-[#1A1816] group-hover:text-[#C84B1F] flex items-center justify-between">
                      <span>Proteção de dados</span>
                      <ChevronRight className="w-3.5 h-3.5 text-[#8C8881]" />
                    </div>
                    <p className="text-[11px] text-[#5C5955] mt-1 leading-snug">
                      Acordo de Processamento de Dados (DPA) para clientes corporativos sob instruções.
                    </p>
                  </button>

                  <button 
                    onClick={() => setActiveDoc('termos')}
                    className="p-3.5 rounded-xl border border-[#E7E4DC] bg-white text-left hover:border-[#C84B1F] transition-colors group"
                  >
                    <div className="text-xs font-bold text-[#1A1816] group-hover:text-[#C84B1F] flex items-center justify-between">
                      <span>Termos de condições</span>
                      <ChevronRight className="w-3.5 h-3.5 text-[#8C8881]" />
                    </div>
                    <p className="text-[11px] text-[#5C5955] mt-1 leading-snug">
                      Regras de uso da plataforma Vocalis, contratação, planos e responsabilidades.
                    </p>
                  </button>

                  <button 
                    onClick={() => setActiveDoc('dpa')}
                    className="p-3.5 rounded-xl border border-[#E7E4DC] bg-white text-left hover:border-[#C84B1F] transition-colors group"
                  >
                    <div className="text-xs font-bold text-[#1A1816] group-hover:text-[#C84B1F] flex items-center justify-between">
                      <span>Retenção</span>
                      <ChevronRight className="w-3.5 h-3.5 text-[#8C8881]" />
                    </div>
                    <p className="text-[11px] text-[#5C5955] mt-1 leading-snug">
                      Quanto tempo mantemos conversas, gravações de áudio e logs de auditoria no sistema.
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
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1A1816] hover:text-[#C84B1F]"
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
              <h2 className="text-xl font-bold text-[#1A1816]">Acordo de Processamento de Dados (DPA)</h2>
              <p>
                Em conformidade com a LGPD (Lei 13.709/2018), a Vocalis atua como <strong>Operadora</strong> de dados pessoais inseridos por seus clientes (<strong>Controladores</strong>).
              </p>
              <div className="p-4 rounded-xl bg-[#FAF9F5] border border-[#E7E4DC] text-xs space-y-2">
                <h4 className="font-bold text-[#1A1816]">Principais compromissos assumidos pela Vocalis:</h4>
                <ul className="list-disc pl-5 space-y-1 text-[#5C5955]">
                  <li>Tratar dados pessoais exclusivamente segundo instruções lícitas do Cliente.</li>
                  <li>Manter isolamento lógico multitenant entre contas de clientes.</li>
                  <li>Não treinar nem permitir o treinamento de LLMs públicos com dados de voz ou áudio dos seus clientes.</li>
                  <li>Notificar o controlador em até 48 horas em caso de qualquer incidente de segurança relevante.</li>
                  <li>Facilitar a eliminação ou anonimização imediata mediante requisição via painel ou API.</li>
                </ul>
              </div>
            </div>
          )}

          {/* CONTENT: EXCLUSÃO DE DADOS */}
          {activeDoc === 'exclusao' && (
            <div className="space-y-6 text-sm text-[#383531] leading-relaxed">
              <h2 className="text-xl font-bold text-[#1A1816]">Como solicitar a exclusão dos seus dados pessoais</h2>
              <p>
                Em observância ao art. 18 da Lei Geral de Proteção de Dados (Lei nº 13.709/2018), você possui o direito de solicitar a anonimização, bloqueio ou eliminação dos dados pessoais desnecessários, excessivos ou tratados em desconformidade.
              </p>

              <div className="p-4 rounded-xl bg-[#FAF9F5] border border-[#E7E4DC] text-xs space-y-2">
                <h4 className="font-bold text-[#1A1816]">Canais para solicitação imediata:</h4>
                <ul className="list-disc pl-5 space-y-1 text-[#5C5955]">
                  <li>E-mail direto ao Encarregado (DPO): <a href="mailto:dpo@vocalis.ai" className="text-[#C84B1F] underline">dpo@vocalis.ai</a></li>
                  <li>WhatsApp de Privacidade: <strong>(94) 98442-3948</strong></li>
                  <li>Painel do Usuário: aba <em>Configurações da Conta &gt; Privacidade &gt; Solicitar Exclusão</em></li>
                </ul>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-[#1A1816]">Prazos e Tratamento</h3>
                <p className="text-xs text-[#5C5955]">
                  Requisições de exclusão são processadas e concluídas em até <strong>15 dias corridos</strong>, ressalvadas as hipóteses legais de retenção obrigatória previstas no Marco Civil da Internet (registros de conexão por 6 meses) e no Código Tributário Nacional (notas fiscais).
                </p>
              </div>
            </div>
          )}

          {/* CONTENT: CENTRAL DE AJUDA */}
          {activeDoc === 'central' && (
            <div className="space-y-6 text-sm text-[#383531] leading-relaxed">
              <h2 className="text-xl font-bold text-[#1A1816]">Central de Ajuda & Conhecimento</h2>
              <p className="text-[#5C5955]">
                Bem-vindo à base oficial de conhecimento da Vocalis. Aqui você encontra tudo sobre configuração de números, treinamento de IA e integrações.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div 
                  onClick={() => setActiveDoc('primeiros-passos')}
                  className="p-4 rounded-xl border border-[#E7E4DC] hover:border-[#C84B1F] transition-colors cursor-pointer bg-white"
                >
                  <h4 className="font-bold text-xs text-[#1A1816]">Primeiros Passos</h4>
                  <p className="text-[11px] text-[#736F69] mt-1">Como criar seu primeiro assistente e ativar seu número em 3 minutos.</p>
                </div>
                <div 
                  onClick={() => setActiveDoc('numeros')}
                  className="p-4 rounded-xl border border-[#E7E4DC] hover:border-[#C84B1F] transition-colors cursor-pointer bg-white"
                >
                  <h4 className="font-bold text-xs text-[#1A1816]">Telefonia & Tronco SIP</h4>
                  <p className="text-[11px] text-[#736F69] mt-1">Conecte números nacionais (DDDs 11..91) ou seu PABX existente.</p>
                </div>
                <div 
                  onClick={() => setActiveDoc('tecnicas')}
                  className="p-4 rounded-xl border border-[#E7E4DC] hover:border-[#C84B1F] transition-colors cursor-pointer bg-white"
                >
                  <h4 className="font-bold text-xs text-[#1A1816]">Integrações & Webhooks</h4>
                  <p className="text-[11px] text-[#736F69] mt-1">Sincronize com Google Calendar, RD Station, HubSpot e CRM próprio.</p>
                </div>
                <div 
                  onClick={() => setActiveDoc('privacidade')}
                  className="p-4 rounded-xl border border-[#E7E4DC] hover:border-[#C84B1F] transition-colors cursor-pointer bg-white"
                >
                  <h4 className="font-bold text-xs text-[#1A1816]">Segurança & LGPD</h4>
                  <p className="text-[11px] text-[#736F69] mt-1">Acordo de proteção de dados (DPA) e subprocessadores homologados.</p>
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
              <a href="#controlador" className="block hover:text-[#C84B1F] transition-colors truncate">Quem é o controlador</a>
              <a href="#dados" className="block hover:text-[#C84B1F] transition-colors truncate">Dados que tratamos</a>
              <a href="#bases" className="block hover:text-[#C84B1F] transition-colors truncate">Bases legais</a>
              <a href="#compartilhamento" className="block hover:text-[#C84B1F] transition-colors truncate">Compartilhamento</a>
              <a href="#transferencia" className="block hover:text-[#C84B1F] transition-colors truncate">Transferência internacional</a>
              <a href="#retencao" className="block hover:text-[#C84B1F] transition-colors truncate">Retenção</a>
              <a href="#direitos" className="block hover:text-[#C84B1F] transition-colors truncate">Seus direitos</a>
              <a href="#seguranca" className="block hover:text-[#C84B1F] transition-colors truncate">Segurança</a>
              <a href="#alteracoes" className="block hover:text-[#C84B1F] transition-colors truncate">Alterações</a>
            </div>
          </div>
        </aside>

      </div>

    </div>
  );
}
