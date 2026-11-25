import React, { useState, useEffect, useRef } from 'react';
import { getOverageOrUnitCostHint } from '../utils/commercialCatalogUtils';
import {
  Search,
  Sparkles,
  ArrowUp,
  ExternalLink,
  Mail,
  BookOpen,
  Phone,
  Globe,
  Sliders,
  BarChart3,
  AlertCircle,
  ChevronRight,
  Check,
  Copy,
  X,
  Radio,
  FileText,
  HelpCircle,
  MessageSquare,
  Shield,
  Zap,
  ArrowLeft,
  Calendar,
  Lock,
  Layers,
  Sparkle
} from 'lucide-react';

export default function CentralAjudaPage({
  onOpenDemo,
  onOpenAuth,
  onOpenLegal,
  onOpenDocs,
  onNavigateHome
}) {
  const [activeCategory, setActiveCategory] = useState('comecar'); // 'comecar' | 'produto' | 'integracoes' | 'parceiros'
  const [selectedArticleId, setSelectedArticleId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [aiQuestion, setAiQuestion] = useState('');
  const [aiResponse, setAiResponse] = useState(null);
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [aiFeedbackMsg, setAiFeedbackMsg] = useState('');
  const [articleFeedbackMsg, setArticleFeedbackMsg] = useState('');
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  const searchInputRef = useRef(null);
  const aiInputRef = useRef(null);

  // Keyboard shortcuts Ctrl+K (search) and Ctrl+I (AI Assistant)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchModalOpen(true);
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'i') {
        e.preventDefault();
        if (aiInputRef.current) {
          aiInputRef.current.focus();
          aiInputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      } else if (e.key === 'Escape') {
        setIsSearchModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Category navigation tabs
  const categories = [
    { id: 'comecar', label: 'Começar', icon: '🚀' },
    { id: 'produto', label: 'Produto', icon: '📦' },
    { id: 'integracoes', label: 'Integrações', icon: '🔌' },
    { id: 'parceiros', label: 'Parceiros', icon: '🤝' },
  ];

  // Articles Database
  const articlesDatabase = {
    comecar: [
      {
        id: 'primeiros-passos',
        title: 'Primeiros passos',
        icon: Zap,
        summary: 'Guia introdutório para configurar seu primeiro assistente de voz.',
        content: {
          badge: 'Guia Rápido',
          lastUpdated: 'Atualizado em Novembro de 2026',
          intro: 'Bem-vindo à Vocalis. Este guia apresenta as etapas gerais para configurar um assistente de voz em português do Brasil conforme os recursos do seu plano.',
          steps: [
            {
              step: '1. Crie seu assistente no painel',
              desc: 'Acesse o painel Vocalis e clique em "Criar assistente". Escolha o objetivo principal: Recepção, Agendamentos, Vendas ou Suporte N1.'
            },
            {
              step: '2. Escolha a voz e a personalidade',
              desc: 'Selecione o estilo de fala disponível no seu plano e defina o tom desejado para o atendimento.'
            },
            {
              step: '3. Redija o prompt inicial e FAQs',
              desc: 'Explique qual é a empresa, o que o agente deve responder e quais são as restrições (ex.: "Nunca prometa prazos sem antes consultar o sistema").'
            },
            {
              step: '4. Valide o fluxo nos recursos de teste',
              desc: 'Utilize os recursos de simulação e teste disponíveis para validar o roteiro antes de publicar o atendimento.'
            }
          ],
          tip: 'Dica: Inicie com um prompt simples e teste os fluxos antes de adicionar integrações avançadas.'
        }
      },
      {
        id: 'numeros-de-telefone',
        title: 'Números de telefone',
        icon: Phone,
        summary: 'Como funcionam novos números nacionais (0800, 4003, DDD local) ou portabilidade.',
        content: {
          badge: 'Telefonia & SIP',
          lastUpdated: 'Atualizado em Novembro de 2026',
          intro: 'As opções de telefonia, portabilidade e tronco SIP dependem de viabilidade técnica e do plano contratado.',
          steps: [
            {
              step: 'Números locais com DDD',
              desc: 'A disponibilidade de DDDs e os prazos de ativação dependem de validação cadastral e da operadora parceira.'
            },
            {
              step: 'Números 0800 e 4003/4004',
              desc: 'Modalidades especiais avaliadas sob consulta conforme o plano contratado e regras da operadora.'
            },
            {
              step: 'Portabilidade e Tronco SIP próprio',
              desc: 'Possibilidades de integração via SIP Trunking são analisadas tecnicamente com nossa equipe conforme o ambiente do cliente.'
            }
          ],
          tip: 'Também é possível configurar encaminhamento para atendimento humano conforme a estrutura telefônica contratada.'
        }
      },
      {
        id: 'como-escrever-um-otimo-prompt',
        title: 'Como escrever um ótimo prompt',
        icon: FileText,
        summary: 'Boas práticas para guiar a IA a falar como uma pessoa real e fechar negócios.',
        content: {
          badge: 'Engenharia de Prompt',
          lastUpdated: 'Atualizado em Novembro de 2026',
          intro: 'Escrever prompts para voz falada é diferente de escrever para chatbots de texto. No telefone, frases curtas, objetivas e com ritmo humano soam muito mais profissionais.',
          steps: [
            {
              step: 'Regra 1: Frases curtas e diretas',
              desc: 'Evite monólogos longos. Peça para a IA falar no máximo 2 frases por turno e devolver uma pergunta para manter o diálogo vivo.'
            },
            {
              step: 'Regra 2: Instruções de pausas e números fictícios em testes',
              desc: 'Para números de protocolo ou telefone fictício (ex.: "código 1 2 3 4"), oriente a IA a ler pausadamente dígito a dígito. Evite coletar CPF ou dados pessoais sensíveis em demonstrações públicas.'
            },
            {
              step: 'Regra 3: Delimite o que NÃO fazer',
              desc: 'Defina explicitamente: "Se o cliente perguntar algo fora da base de conhecimento ou relatar situação sensível, não improvise e encaminhe conforme o protocolo aprovado para atendimento humano".'
            }
          ],
          examplePrompt: `Você é a Clara, assistente virtual administrativa da Clínica Modelo (exemplo ilustrativo dependente da base de conhecimento e regras aprovadas pelo responsável técnico).
Seu objetivo é apoiar agendamentos de rotina (sem sintomas urgentes) e tirar dúvidas apenas com base nas informações cadastradas pela clínica.
Nunca dê diagnósticos médicos, não avalie gravidade clínica nem recomende aguardar. Em caso de dor ou emergência, aplique exclusivamente o protocolo aprovado pelo responsável técnico para encaminhamento humano ou orientação ao pronto-socorro indicado.`,
          tip: 'Use a aba de Simulação no painel para ouvir como a entonação da voz soa com o seu prompt em tempo real.'
        }
      },
      {
        id: 'base-de-conhecimento',
        title: 'Base de conhecimento',
        icon: BookOpen,
        summary: 'Organize textos, perguntas frequentes e instruções de referência para o assistente.',
        content: {
          badge: 'Base de Referência',
          lastUpdated: 'Atualizado em Novembro de 2026',
          intro: 'Você pode cadastrar textos, perguntas frequentes e instruções de atendimento no painel. Recursos avançados de ingestão automática de documentos ou URLs dependem do escopo implantado.',
          steps: [
            {
              step: 'Conteúdo e instruções cadastráveis',
              desc: 'Cadastre textos de produtos, políticas e dúvidas frequentes no painel do assistente (ingestão externa de PDFs/URLs sob consulta).'
            },
            {
              step: 'Organização de conteúdo',
              desc: 'A Vocalis permite organizar referências de atendimento para orientar as respostas do assistente conforme as regras cadastradas pela empresa.'
            },
            {
              step: 'Atualização de materiais',
              desc: 'Quando houver mudança de regras ou valores, atualize as instruções na aba de conhecimento do painel.'
            }
          ],
          tip: 'Para melhores resultados, organize perguntas frequentes de forma clara e objetiva.'
        }
      },
      {
        id: 'idiomas-e-multilinguismo',
        title: 'Idiomas e multilinguismo',
        icon: Globe,
        summary: 'Configurações de idioma e ajustes para português do Brasil.',
        content: {
          badge: 'Voz & Idiomas',
          lastUpdated: 'Atualizado em Novembro de 2026',
          intro: 'Configurações orientadas ao português do Brasil, além de opções adicionais de idioma quando habilitadas no plano.',
          steps: [
            {
              step: 'Português do Brasil',
              desc: 'Configuração de voz e vocabulário voltada para atendimento em português brasileiro.'
            },
            {
              step: 'Atendimento em outros idiomas',
              desc: 'Suporte a idiomas adicionais varia conforme o modelo e as regras configuradas para o assistente.'
            },
            {
              step: 'Idiomas sob consulta',
              desc: 'Idiomas além do português do Brasil podem ser avaliados conforme o plano e a configuração do agente.'
            }
          ],
          tip: 'Se sua empresa atende apenas no Brasil, você pode manter o idioma fixado em Português-BR.'
        }
      },
      {
        id: 'configuracoes-tecnicas',
        title: 'Configurações técnicas',
        icon: Sliders,
        summary: 'Orientações sobre webhooks, provedores terceiros e parametrização de chamadas.',
        content: {
          badge: 'Integrações & Parâmetros',
          lastUpdated: 'Atualizado em Novembro de 2026',
          intro: 'Orientações técnicas gerais sobre webhooks, provedores de telefonia/voz terceiros (como Vapi) e estabilidade operacional, sujeitas à configuração do plano contratado.',
          steps: [
            {
              step: 'Transporte de áudio por provedores',
              desc: 'A qualidade e os codecs utilizados na telefonia e no áudio dependem do provedor de voz/SIP e da qualidade da rede de cada chamada.'
            },
            {
              step: 'Webhooks sob configuração',
              desc: 'Eventos HTTP POST para notificar sistemas externos podem ser configurados conforme o escopo técnico e plano contratado.'
            },
            {
              step: 'Contingência e limites técnicos',
              desc: 'Disponibilidade, redundância de provedores de IA/voz e rotas de fallback dependem da arquitetura contratada — sem garantia de comutação instantânea.'
            }
          ],
          codeSnippet: `{
  "event": "call.completed",
  "call_id": "exemplo_ilustrativo_01",
  "direction": "inbound",
  "caller": "+5511999999999",
  "duration_seconds": 142
}`,
          tip: 'Alinhe com nossa equipe técnica os requisitos de webhook e segurança antes da implantação.'
        }
      },
      {
        id: 'contatos',
        title: 'Contatos e registros',
        icon: MessageSquare,
        summary: 'Organização de registros de leads capturados em formulários e fluxos habilitados.',
        content: {
          badge: 'Registros por Canal',
          lastUpdated: 'Atualizado em Novembro de 2026',
          intro: 'Veja como os contatos de formulários e solicitações podem ser acompanhados no painel. Não há unificação automática de histórico entre telefone, WhatsApp e webchat sem integração específica por projeto.',
          steps: [
            {
              step: 'Registros conforme o canal habilitado',
              desc: 'Cada canal (telefone, WhatsApp ou webchat) possui escopo e provedores distintos; o histórico consolidado entre canais depende de integração adicional via webhook ou CRM.'
            },
            {
              step: 'Classificação e campos',
              desc: 'Resumos, tags e etapas de qualificação variam conforme as integrações habilitadas no plano (exemplos do painel de prévia são ilustrativos).'
            },
            {
              step: 'Exportação e integrações externas',
              desc: 'Avalie com a equipe comercial as opções de envio para planilhas ou CRM via webhook ou conectores previstos no plano.'
            }
          ],
          tip: 'Confirme no momento da contratação quais canais e relatórios fazem parte do escopo do seu plano.'
        }
      },
      {
        id: 'analises',
        title: 'Análises e indicadores',
        icon: BarChart3,
        summary: 'Visão geral de métricas operacionais disponíveis conforme o escopo contratado.',
        content: {
          badge: 'Métricas Operacionais',
          lastUpdated: 'Atualizado em Novembro de 2026',
          intro: 'Os painéis exibidos na página inicial trazem simulações ilustrativas de relatórios. Os indicadores disponíveis em produção dependem dos provedores e do plano contratado.',
          steps: [
            {
              step: 'Volume de atendimentos e duração',
              desc: 'Acompanhamento de minutos falados, conversas ou mensagens conforme as regras medidas no seu canal.'
            },
            {
              step: 'Indicadores avançados sob consulta',
              desc: 'Análise de sentimento, classificação automática e painéis personalizados dependem da configuração contratada.'
            },
            {
              step: 'Custos e excedentes',
              desc: getOverageOrUnitCostHint('telefone')
            }
          ],
          tip: 'Solicite uma demonstração guiada para conhecer quais relatórios estarão ativos para a sua operação.'
        }
      },
      {
        id: 'solucao-de-problemas',
        title: 'Solução de problemas',
        icon: AlertCircle,
        summary: 'Resoluções rápidas para ruídos, quedas de linha e dúvidas frequentes.',
        content: {
          badge: 'Suporte Técnico',
          lastUpdated: 'Atualizado em Novembro de 2026',
          intro: 'Guia de diagnóstico rápido para os cenários técnicos mais comuns.',
          steps: [
            {
              step: 'O cliente não ouve a voz da IA',
              desc: 'Verifique se o tronco SIP ou a rota telefônica suporta o codec PCMU/G.711. Em ligações de celular com sinal fraco, o cancelamento de ruído pode atenuar a voz.'
            },
            {
              step: 'A IA interrompe o cliente antes dele terminar',
              desc: 'Ajuste a sensibilidade do VAD (Voice Activity Detection) e aumente o tempo de silêncio de 400ms para 700ms no menu "Configurações de Fala".'
            },
            {
              step: 'Falha na transferência de chamada',
              desc: 'Certifique-se de que o número de destino está no formato E.164 (+55 DDD NÚMERO) e que a linha de destino não está ocupada.'
            }
          ],
          tip: 'Entre em contato pelos canais oficiais de suporte informados no painel.'
        }
      }
    ],
    produto: [
      {
        id: 'agente-voz',
        title: 'Agente de Voz Telefônico',
        icon: Phone,
        summary: 'Atendimento telefônico configurável em português brasileiro.',
        content: {
          badge: 'Módulo Principal',
          lastUpdated: 'Atualizado em Novembro de 2026',
          intro: 'O Agente de Voz Vocalis apoia o atendimento de chamadas telefônicas conforme as regras configuradas pela empresa e dentro dos limites do plano.',
          steps: [
            {
              step: 'Atendimento Receptivo',
              desc: 'Substitui menus numéricos rígidos por roteiros conversacionais configuráveis para triagem e dúvidas.'
            },
            {
              step: 'Chamadas Ativas',
              desc: 'Fluxos configuráveis para confirmação de horários, lembretes e acompanhamento conforme o plano contratado.'
            }
          ],
          tip: 'Use os simuladores ilustrativos do site para visualizar um exemplo de atendimento no navegador.'
        }
      },
      {
        id: 'whatsapp-ia',
        title: 'IA de WhatsApp',
        icon: MessageSquare,
        summary: 'Atendimento com áudio e texto no WhatsApp conforme configuração do plano.',
        content: {
          badge: 'Canal WhatsApp',
          lastUpdated: 'Atualizado em Novembro de 2026',
          intro: 'Conecte o canal WhatsApp de acordo com a modalidade disponível no seu plano para responder clientes em texto ou áudio.',
          steps: [
            {
              step: 'Respostas em texto e áudio',
              desc: 'A IA responde mensagens recebidas em texto ou áudio natural, permitindo interações em áudio e texto conforme configurado.'
            },
            {
              step: 'Transcrições e Resumos',
              desc: 'Os registros de conversa auxiliam o acompanhamento pela sua equipe.'
            }
          ],
          tip: 'A conexão com o WhatsApp deve observar as políticas aplicáveis da Meta; não há garantia de risco zero contra restrições de terceiros.'
        }
      },
      {
        id: 'webchat-ia',
        title: 'Webchat de IA',
        icon: Zap,
        summary: 'Widget de atendimento por IA configurável para sites (implantação sob consulta).',
        content: {
          badge: 'Canal Webchat',
          lastUpdated: 'Atualizado em Novembro de 2026',
          intro: 'O widget exibido neste site (Beatriz) funciona como atendimento automatizado por IA para dúvidas e informações comerciais do catálogo. A instalação em sites externos de clientes depende de provisionamento técnico.',
          steps: [
            {
              step: 'Identificação clara como IA',
              desc: 'O visitante é informado de que conversa com uma assistente automatizada de IA, com opção de encaminhar solicitação para a equipe humana via formulário.'
            },
            {
              step: 'Implantação em site externo',
              desc: 'O script incorporável ilustrado na página de Webchat representa o formato previsto do widget; a ativação em domínios próprios é avaliada sob consulta.'
            }
          ],
          tip: 'Verifique com nossa equipe comercial o escopo e os limites aplicáveis ao canal Webchat.'
        }
      }
    ],
    integracoes: [
      {
        id: 'integracao-calendarios',
        title: 'Agendas (Google Agenda & Calendly — Sob Consulta)',
        icon: Calendar,
        summary: 'Possibilidades de integração de agenda avaliadas conforme o plano e escopo.',
        content: {
          badge: 'Integrações Sob Consulta',
          lastUpdated: 'Atualizado em Novembro de 2026',
          intro: 'A conexão automatizada com Google Agenda, Calendly ou agendas clínicas não está habilitada em modo self-service neste site e é avaliada por projeto via webhook ou API.',
          steps: [
            {
              step: 'Viabilidade por plano',
              desc: 'Antes da contratação, validamos quais agendas e fluxos de confirmação fazem parte do escopo selecionado.'
            },
            {
              step: 'Regras operacionais',
              desc: 'Horários de atendimento, janelas e antecedência mínima são parametrizados durante a implantação assistida.'
            }
          ],
          tip: 'Consulte a equipe comercial para confirmar se a integração desejada está disponível no seu plano.'
        }
      },
      {
        id: 'integracao-crms',
        title: 'CRMs e Webhooks (Sob Consulta)',
        icon: Layers,
        summary: 'Envio estruturado de informações avaliado conforme viabilidade técnica do plano.',
        content: {
          badge: 'Integrações Sob Consulta',
          lastUpdated: 'Atualizado em Novembro de 2026',
          intro: 'Integrações com CRMs de mercado (como HubSpot, RD Station e Pipedrive) não possuem conectores plug-and-play ativos no front-end atual; podem ser avaliadas via webhooks ou projeto conforme o plano.',
          steps: [
            {
              step: 'Envio de registros e resumos',
              desc: 'Quando contratado e configurado em projeto, dados coletados podem ser encaminhados ao sistema do cliente.'
            },
            {
              step: 'Alinhamento técnico prévio',
              desc: 'Campos, credenciais e formato do payload são definidos com a sua equipe durante a implantação.'
            }
          ],
          tip: 'Não prometemos sincronização universal entre todos os canais sem projeto de integração confirmado.'
        }
      }
    ],
    parceiros: [
      {
        id: 'programa-white-label',
        title: 'Programa para Parceiros e Agências',
        icon: Sparkles,
        summary: 'Condições comerciais e modelos de parceria sob consulta.',
        content: {
          badge: 'Parcerias & Agências',
          lastUpdated: 'Atualizado em Novembro de 2026',
          intro: 'As regras comerciais, eventuais percentuais de repasse e recursos multi-conta do programa de parceiros estão pendentes de confirmação e são apresentados diretamente em proposta comercial.',
          steps: [
            {
              step: 'Avaliação comercial dedicada',
              desc: 'Alinhe com nossa equipe os requisitos técnicos e modelo de atuação (indicação ou revenda).'
            },
            {
              step: 'Escopo e implantação',
              desc: 'Funcionalidades de marca própria, subcontas e limites são confirmados em contrato.'
            }
          ],
          tip: 'Acesse a página Parceiros ou agende uma conversa para receber as condições vigentes.'
        }
      }
    ]
  };

  // Quick questions for AI Assistant suggestions
  const suggestedQuestions = [
    'Como configurar meu número de telefone?',
    'Como escrever o prompt para soar natural?',
    'Como integrar com o Google Agenda?',
    'Posso fazer chamadas ativas pelo WhatsApp?',
    'Qual a latência da voz da Vocalis?'
  ];

  // Handler for AI Assistant query
  const handleAskAi = (questionText) => {
    const query = questionText || aiQuestion;
    if (!query.trim()) return;

    setIsAiThinking(true);
    setAiResponse(null);

    // Simulate instant intelligent response from knowledge base
    setTimeout(() => {
      let matchedText = '';
      const qLower = query.toLowerCase();

      if (qLower.includes('número') || qLower.includes('telefone') || qLower.includes('ddd') || qLower.includes('0800')) {
        matchedText = `As opções de números locais com DDD, 0800 ou conexão via tronco SIP/PABX variam conforme a viabilidade técnica e o plano contratado. Os prazos de ativação são alinhados após validação cadastral.`;
      } else if (qLower.includes('prompt') || qLower.includes('natural') || qLower.includes('escrever') || qLower.includes('falar')) {
        matchedText = `Para que o roteiro soe natural no telefone, recomendamos: 1) Usar frases curtas; 2) Finalizar com uma pergunta objetiva; 3) Orientar pausas ao ler números. Você pode validar o roteiro nas ferramentas de simulação do painel.`;
      } else if (qLower.includes('agenda') || qLower.includes('google') || qLower.includes('calendly') || qLower.includes('marcar')) {
        matchedText = `As integrações com ferramentas de agenda e calendários são avaliadas conforme o plano contratado e a viabilidade técnica da operação.`;
      } else if (qLower.includes('whatsapp') || qLower.includes('zap') || qLower.includes('áudio')) {
        matchedText = `O canal WhatsApp suporta fluxos configuráveis em texto e áudio conforme os recursos do plano contratado. A modalidade de conexão e eventuais custos de provedor ou da Meta são informados antes da contratação.`;
      } else if (qLower.includes('latência') || qLower.includes('tempo') || qLower.includes('atraso') || qLower.includes('rapidez')) {
        matchedText = `A fluidez das respostas varia conforme o canal, a qualidade da conexão telefônica ou de dados e o fluxo configurado no plano.`;
      } else {
        matchedText = `Com a Vocalis você configura assistentes de IA para Telefone, WhatsApp e Webchat. Consulte nossa equipe para validar escopo, integrações e condições comerciais vigentes.`;
      }

      setAiResponse({
        query,
        answer: matchedText,
        source: 'Central de Ajuda Vocalis (Base Oficial v2.4)'
      });
      setIsAiThinking(false);
    }, 450);
  };

  // Get current list of articles based on active category
  const currentArticles = articlesDatabase[activeCategory] || articlesDatabase.comecar;
  const currentSelectedArticle = selectedArticleId
    ? Object.values(articlesDatabase)
        .flat()
        .find((a) => a.id === selectedArticleId)
    : null;

  // Search filter across all articles
  const filteredArticles = Object.values(articlesDatabase)
    .flat()
    .filter(
      (a) =>
        a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.summary.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="min-h-screen bg-white text-[#1A1816] flex flex-col font-sans">
      {/* 1. TOP HEADER (Matching print exactly) */}
      <header className="border-b border-[#ECEAE4] bg-white sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Left: Brand Logo */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => {
                setSelectedArticleId(null);
                setAiResponse(null);
                if (onNavigateHome) onNavigateHome();
              }}
              className="flex items-center gap-2 group cursor-pointer text-left"
            >
              <div className="w-8 h-8 rounded-lg bg-[#4F46E5] flex items-center justify-center text-white font-bold shadow-sm group-hover:scale-105 transition-transform">
                <span className="text-base tracking-tighter">|||</span>
              </div>
              <span className="text-xl font-bold tracking-tight text-[#1A1816]">
                vocalis
              </span>
            </button>
          </div>

          {/* Center/Left-Center: Search Box + Sparkle Button */}
          <div className="flex-1 max-w-xl hidden md:flex items-center gap-3">
            {/* Search Input Box with Ctrl K */}
            <div
              onClick={() => setIsSearchModalOpen(true)}
              className="flex-1 flex items-center justify-between px-3.5 py-2 rounded-xl border border-[#E4E1D8] bg-[#FAF9F6] text-[#736F69] text-xs hover:border-[#4F46E5]/40 cursor-pointer transition-colors shadow-2xs"
            >
              <div className="flex items-center gap-2">
                <Search className="w-3.5 h-3.5 text-[#8C8881]" />
                <span className="font-normal text-[#8C8881]">Buscar...</span>
              </div>
              <kbd className="px-1.5 py-0.5 text-[10px] font-medium bg-white border border-[#D5D2C9] rounded text-[#8C8881] shadow-2xs">
                Ctrl K
              </kbd>
            </div>

            {/* Sparkle Assistant Button with Ctrl I */}
            <button
              onClick={() => {
                if (aiInputRef.current) {
                  aiInputRef.current.focus();
                  aiInputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
              }}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-[#E4E1D8] bg-white text-xs font-medium text-[#403E39] hover:bg-[#FAF9F5] hover:border-[#4F46E5]/40 transition-colors shadow-2xs cursor-pointer whitespace-nowrap"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#4F46E5]" />
              <span>Perguntar ao assistente</span>
              <kbd className="px-1.5 py-0.5 text-[10px] font-medium bg-[#FAF9F6] border border-[#D5D2C9] rounded text-[#8C8881]">
                Ctrl I
              </kbd>
            </button>
          </div>

          {/* Right: Support, Lang, Open App */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                if (onOpenDemo) onOpenDemo();
              }}
              className="text-xs font-medium text-[#5C5955] hover:text-[#1A1816] transition-colors hidden sm:block cursor-pointer"
            >
              Suporte
            </button>

            <div className="text-xs font-medium text-[#5C5955] hidden sm:flex items-center gap-1.5">
              <span>🇧🇷</span>
              <span>Português (Brasil)</span>
            </div>

            <button
              onClick={() => {
                if (onOpenAuth) onOpenAuth();
              }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#1A1816] hover:bg-[#302D2A] text-white text-xs font-semibold transition-all shadow-sm cursor-pointer"
            >
              <span>Abrir app</span>
              <ChevronRight className="w-3.5 h-3.5 text-white/70" />
            </button>
          </div>
        </div>

        {/* 2. SUB-NAVBAR TABS (Começar, Produto, Integrações, Parceiros) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-[#ECEAE4]/60">
          <div className="flex items-center gap-8 py-2.5 overflow-x-auto no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setSelectedArticleId(null);
                }}
                className={`flex items-center gap-2 text-xs font-medium transition-colors whitespace-nowrap cursor-pointer pb-1 pt-1 ${
                  activeCategory === cat.id
                    ? 'text-[#1A1816] font-bold border-b-2 border-[#1A1816]'
                    : 'text-[#736F69] hover:text-[#1A1816]'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* 3. MAIN WORKSPACE: SIDEBAR + CONTENT */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT SIDEBAR (Matching print) */}
          <aside className="lg:col-span-3 space-y-6 lg:border-r lg:border-[#ECEAE4] lg:pr-6">
            {/* Category section items */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#1A1816] mb-3">
                {categories.find((c) => c.id === activeCategory)?.label || 'Começar'}
              </h3>
              <ul className="space-y-1">
                {currentArticles.map((art) => {
                  const isSelected = selectedArticleId === art.id;
                  return (
                    <li key={art.id}>
                      <button
                        onClick={() => {
                          setSelectedArticleId(art.id);
                          setAiResponse(null);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? 'bg-[#EEF2FF] text-[#4F46E5] font-bold'
                            : 'text-[#5C5955] hover:text-[#1A1816] hover:bg-[#FAF9F5]'
                        }`}
                      >
                        <span className="truncate">{art.title}</span>
                        {isSelected && <ChevronRight className="w-3.5 h-3.5 text-[#4F46E5] shrink-0" />}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Legal section */}
            <div className="pt-4 border-t border-[#ECEAE4]">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#1A1816] mb-3">
                Legal
              </h3>
              <ul className="space-y-1">
                <li>
                  <button
                    onClick={() => onOpenLegal && onOpenLegal('privacidade')}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium text-[#5C5955] hover:text-[#1A1816] hover:bg-[#FAF9F5] transition-colors flex items-center justify-between cursor-pointer"
                  >
                    <span>Política de privacidade</span>
                    <ExternalLink className="w-3 h-3 text-[#8C8881]" />
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onOpenLegal && onOpenLegal('protecao-dados')}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium text-[#5C5955] hover:text-[#1A1816] hover:bg-[#FAF9F5] transition-colors flex items-center justify-between cursor-pointer"
                  >
                    <span>Proteção de dados</span>
                    <ExternalLink className="w-3 h-3 text-[#8C8881]" />
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onOpenLegal && onOpenLegal('termos')}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium text-[#5C5955] hover:text-[#1A1816] hover:bg-[#FAF9F5] transition-colors flex items-center justify-between cursor-pointer"
                  >
                    <span>Termos e condições</span>
                    <ExternalLink className="w-3 h-3 text-[#8C8881]" />
                  </button>
                </li>
              </ul>
            </div>

            {/* Quick Contact Box in Sidebar */}
            <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#E7E4DC] text-xs text-[#736F69] space-y-2">
              <div className="font-semibold text-[#1A1816] flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-[#4F46E5]" />
                <span>Precisa de ajuda humana?</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                Nossa equipe atende solicitações de suporte pelos canais informados no painel.
              </p>
              <button
                onClick={() => onOpenDemo && onOpenDemo()}
                className="w-full py-1.5 px-3 rounded-lg bg-white border border-[#D5D2C9] text-[11px] font-semibold text-[#1A1816] hover:bg-[#EEF2FF] transition-colors text-center cursor-pointer shadow-2xs"
              >
                Falar com consultor
              </button>
            </div>
          </aside>

          {/* MAIN CENTER STAGE */}
          <main className="lg:col-span-9 min-h-[550px] flex flex-col justify-start">
            {/* SCENARIO A: NO ARTICLE SELECTED -> DISPLAY HERO EXACTLY LIKE PRINT */}
            {!currentSelectedArticle ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center py-10 px-4 relative">
                {/* Subtle Grid background pattern */}
                <div
                  className="absolute inset-0 opacity-[0.03] pointer-events-none"
                  style={{
                    backgroundImage:
                      'radial-gradient(#1A1816 1px, transparent 1px), radial-gradient(#1A1816 1px, #FAF9F5 1px)',
                    backgroundSize: '24px 24px',
                    backgroundPosition: '0 0, 12px 12px'
                  }}
                />

                {/* Center Brand Waveform Logo */}
                <div className="flex items-center gap-3 mb-6 relative">
                  <div className="flex items-center gap-1 text-[#4F46E5]">
                    <span className="inline-block w-1 h-5 bg-[#4F46E5] rounded-full animate-pulse" />
                    <span className="inline-block w-1.5 h-8 bg-[#4F46E5] rounded-full" />
                    <span className="inline-block w-1 h-4 bg-[#4F46E5] rounded-full" />
                  </div>
                  <span className="text-3xl font-extrabold tracking-tight text-[#1A1816]">
                    vocalis
                  </span>
                </div>

                {/* Big Headline */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1A1816] tracking-tight max-w-2xl leading-tight mb-8">
                  Tudo o que você precisa para o seu agente de voz
                </h1>

                {/* Center Search / AI Query Box (Matching print) */}
                <div className="w-full max-w-2xl bg-white rounded-2xl border border-[#E7E4DC] shadow-lg hover:shadow-xl transition-shadow p-2 text-left relative z-10">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleAskAi();
                    }}
                    className="flex items-center gap-3 px-3 py-2"
                  >
                    <input
                      ref={aiInputRef}
                      type="text"
                      value={aiQuestion}
                      onChange={(e) => setAiQuestion(e.target.value)}
                      placeholder="Pergunte qualquer coisa sobre a Vocalis..."
                      className="flex-1 bg-transparent text-[#1A1816] text-sm sm:text-base placeholder:text-[#9A968E] outline-none font-normal"
                    />
                    <button
                      type="submit"
                      disabled={isAiThinking}
                      className="w-10 h-10 rounded-full bg-[#E08A68] hover:bg-[#4F46E5] text-white flex items-center justify-center shrink-0 transition-colors shadow-sm cursor-pointer disabled:opacity-50"
                      title="Enviar pergunta ao assistente"
                    >
                      {isAiThinking ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <ArrowUp className="w-5 h-5 stroke-[2.5]" />
                      )}
                    </button>
                  </form>

                  {/* Footer inside the search box */}
                  <div className="pt-2 pb-1 px-3 border-t border-[#F2EFE9] flex flex-col sm:flex-row sm:items-center justify-between text-[11px] text-[#8C8881] gap-2">
                    <span className="flex items-center gap-1.5">
                      <span>As respostas vêm da central de ajuda da Vocalis.</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => onOpenDemo && onOpenDemo()}
                      className="flex items-center gap-1 hover:text-[#1A1816] transition-colors cursor-pointer font-medium"
                    >
                      <Mail className="w-3.5 h-3.5 text-[#8C8881]" />
                      <span>Mandar e-mail ao time</span>
                    </button>
                  </div>
                </div>

                {/* AI Response Card (If generated) */}
                {aiResponse && (
                  <div className="w-full max-w-2xl mt-6 p-6 rounded-2xl bg-[#EEF2FF] border border-[#E8D9C8] text-left shadow-sm animate-fadeIn relative z-10">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-[#4F46E5] text-white flex items-center justify-center">
                          <Sparkles className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-xs font-bold text-[#1A1816]">
                          Resposta do Assistente Vocalis
                        </span>
                      </div>
                      <span className="text-[10px] text-[#8C8881] font-mono">
                        {aiResponse.source}
                      </span>
                    </div>

                    <p className="text-sm text-[#403E39] leading-relaxed mb-4">
                      {aiResponse.answer}
                    </p>

                    <div className="flex items-center justify-between pt-3 border-t border-[#E8D9C8]/80 text-xs text-[#736F69]">
                      <span>{aiFeedbackMsg || 'Essa resposta ajudou você?'}</span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setAiFeedbackMsg('Obrigado pelo feedback!')}
                          className="px-2.5 py-1 rounded-md bg-white border border-[#D5D2C9] text-[11px] font-medium hover:bg-[#FAF9F6] cursor-pointer"
                        >
                          👍 Sim
                        </button>
                        <button
                          type="button"
                          onClick={() => setAiFeedbackMsg('Registramos sua sugestão nesta sessão.')}
                          className="px-2.5 py-1 rounded-md bg-white border border-[#D5D2C9] text-[11px] font-medium hover:bg-[#FAF9F6] cursor-pointer"
                        >
                          👎 Não muito
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Popular Questions Chips */}
                <div className="w-full max-w-2xl mt-8 text-left relative z-10">
                  <span className="text-xs font-semibold text-[#736F69] block mb-3">
                    Perguntas frequentes rápidas:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {suggestedQuestions.map((q, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setAiQuestion(q);
                          handleAskAi(q);
                        }}
                        className="px-3 py-1.5 rounded-full border border-[#E7E4DC] bg-white text-xs text-[#5C5955] hover:border-[#4F46E5] hover:text-[#4F46E5] hover:bg-[#EEF2FF] transition-all cursor-pointer shadow-2xs"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quick Topic Cards below hero */}
                <div className="w-full max-w-3xl grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12 text-left relative z-10">
                  <div
                    onClick={() => setSelectedArticleId('primeiros-passos')}
                    className="p-4 rounded-xl bg-white border border-[#E7E4DC] hover:border-[#4F46E5]/60 transition-all cursor-pointer group shadow-2xs"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#EEF2FF] text-[#4F46E5] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <Zap className="w-4 h-4" />
                    </div>
                    <h4 className="text-sm font-bold text-[#1A1816] mb-1 group-hover:text-[#4F46E5] transition-colors">
                      Primeiros passos
                    </h4>
                    <p className="text-xs text-[#736F69] line-clamp-2">
                      Aprenda a criar seu primeiro assistente e testar no seu próprio telefone.
                    </p>
                  </div>

                  <div
                    onClick={() => setSelectedArticleId('numeros-de-telefone')}
                    className="p-4 rounded-xl bg-white border border-[#E7E4DC] hover:border-[#4F46E5]/60 transition-all cursor-pointer group shadow-2xs"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#EEF2FF] text-[#4F46E5] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <Phone className="w-4 h-4" />
                    </div>
                    <h4 className="text-sm font-bold text-[#1A1816] mb-1 group-hover:text-[#4F46E5] transition-colors">
                      Números e Tronco SIP
                    </h4>
                    <p className="text-xs text-[#736F69] line-clamp-2">
                      Portabilidade de operadora, aquisição de novos DDDs e linhas 0800.
                    </p>
                  </div>

                  <div
                    onClick={() => setSelectedArticleId('como-escrever-um-otimo-prompt')}
                    className="p-4 rounded-xl bg-white border border-[#E7E4DC] hover:border-[#4F46E5]/60 transition-all cursor-pointer group shadow-2xs"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#EEF2FF] text-[#4F46E5] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <FileText className="w-4 h-4" />
                    </div>
                    <h4 className="text-sm font-bold text-[#1A1816] mb-1 group-hover:text-[#4F46E5] transition-colors">
                      Engenharia de Prompt
                    </h4>
                    <p className="text-xs text-[#736F69] line-clamp-2">
                      Como orientar a IA para falar com ritmo e empatia sem parecer robótica.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              /* SCENARIO B: ARTICLE SELECTED -> FULL INTERACTIVE ARTICLE VIEWER */
              <article className="animate-fadeIn space-y-6">
                {/* Back button & Breadcrumb */}
                <div className="flex items-center justify-between pb-4 border-b border-[#ECEAE4]">
                  <button
                    onClick={() => setSelectedArticleId(null)}
                    className="inline-flex items-center gap-2 text-xs font-semibold text-[#736F69] hover:text-[#1A1816] transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Voltar à busca</span>
                  </button>

                  <div className="text-[11px] text-[#8C8881]">
                    <span>Central de ajuda</span> &gt;{' '}
                    <span className="capitalize">{activeCategory}</span> &gt;{' '}
                    <span className="font-semibold text-[#1A1816]">
                      {currentSelectedArticle.title}
                    </span>
                  </div>
                </div>

                {/* Article Header */}
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#EEF2FF] text-[#4F46E5] text-[11px] font-bold border border-[#E8D9C8] mb-3">
                    <Sparkles className="w-3 h-3" />
                    <span>{currentSelectedArticle.content.badge}</span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1A1816] tracking-tight">
                    {currentSelectedArticle.title}
                  </h1>
                  <p className="text-xs text-[#8C8881] mt-1">
                    {currentSelectedArticle.content.lastUpdated}
                  </p>
                </div>

                {/* Intro paragraph */}
                <p className="text-base text-[#403E39] leading-relaxed border-l-4 border-[#4F46E5] pl-4 py-1 bg-[#FAF9F6]">
                  {currentSelectedArticle.content.intro}
                </p>

                {/* Steps / Bullet sections */}
                <div className="space-y-4 pt-2">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#1A1816]">
                    Passo a passo detalhado
                  </h3>
                  <div className="space-y-3">
                    {currentSelectedArticle.content.steps.map((st, i) => (
                      <div
                        key={i}
                        className="p-4 rounded-xl bg-white border border-[#E7E4DC] shadow-2xs hover:border-[#D5D2C9] transition-all"
                      >
                        <h4 className="text-sm font-bold text-[#1A1816] mb-1">
                          {st.step}
                        </h4>
                        <p className="text-xs text-[#5C5955] leading-relaxed">
                          {st.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Code or Prompt snippet if present */}
                {currentSelectedArticle.content.examplePrompt && (
                  <div className="space-y-2 pt-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#1A1816]">
                        Exemplo de Prompt Recomendado
                      </span>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(
                            currentSelectedArticle.content.examplePrompt
                          );
                          setCopiedCode(true);
                          setTimeout(() => setCopiedCode(false), 2000);
                        }}
                        className="flex items-center gap-1 text-[11px] font-medium text-[#4F46E5] hover:underline cursor-pointer"
                      >
                        {copiedCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedCode ? 'Copiado!' : 'Copiar prompt'}</span>
                      </button>
                    </div>
                    <pre className="p-4 rounded-xl bg-[#1A1816] text-[#FAF9F5] text-xs font-mono whitespace-pre-wrap leading-relaxed overflow-x-auto shadow-inner">
                      {currentSelectedArticle.content.examplePrompt}
                    </pre>
                  </div>
                )}

                {currentSelectedArticle.content.codeSnippet && (
                  <div className="space-y-2 pt-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#1A1816]">
                        Payload JSON de Exemplo
                      </span>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(
                            currentSelectedArticle.content.codeSnippet
                          );
                          setCopiedCode(true);
                          setTimeout(() => setCopiedCode(false), 2000);
                        }}
                        className="flex items-center gap-1 text-[11px] font-medium text-[#4F46E5] hover:underline cursor-pointer"
                      >
                        {copiedCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedCode ? 'Copiado!' : 'Copiar JSON'}</span>
                      </button>
                    </div>
                    <pre className="p-4 rounded-xl bg-[#1A1816] text-[#68D391] text-xs font-mono whitespace-pre-wrap leading-relaxed overflow-x-auto shadow-inner">
                      {currentSelectedArticle.content.codeSnippet}
                    </pre>
                  </div>
                )}

                {/* Golden Tip box */}
                {currentSelectedArticle.content.tip && (
                  <div className="p-4 rounded-xl bg-[#EEF2FF] border border-[#E8D9C8] flex items-start gap-3">
                    <Sparkles className="w-4 h-4 text-[#4F46E5] shrink-0 mt-0.5" />
                    <p className="text-xs text-[#5C3A21] leading-relaxed font-medium">
                      {currentSelectedArticle.content.tip}
                    </p>
                  </div>
                )}

                {/* Article Footer & Helpful feedback */}
                <div className="pt-6 border-t border-[#ECEAE4] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-semibold text-[#1A1816]">
                      {articleFeedbackMsg || 'Este guia foi útil?'}
                    </span>
                    <button
                      type="button"
                      onClick={() => setArticleFeedbackMsg('Obrigado pelo seu feedback!')}
                      className="px-3 py-1.5 rounded-lg border border-[#E7E4DC] bg-white hover:bg-[#FAF9F5] text-xs font-medium text-[#1A1816] cursor-pointer"
                    >
                      👍 Sim
                    </button>
                    <button
                      type="button"
                      onClick={() => setArticleFeedbackMsg('Feedback registrado nesta sessão.')}
                      className="px-3 py-1.5 rounded-lg border border-[#E7E4DC] bg-white hover:bg-[#FAF9F5] text-xs font-medium text-[#1A1816] cursor-pointer"
                    >
                      👎 Não
                    </button>
                  </div>

                  <button
                    onClick={() => onOpenDemo && onOpenDemo()}
                    className="inline-flex items-center gap-2 text-xs font-semibold text-[#4F46E5] hover:underline cursor-pointer"
                  >
                    <span>Falar com especialista em suporte</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </article>
            )}
          </main>
        </div>
      </div>

      {/* 4. MODAL: SEARCH (Ctrl + K) */}
      {isSearchModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-start justify-center pt-20 px-4 animate-fadeIn">
          <div className="bg-white rounded-2xl border border-[#E7E4DC] shadow-2xl w-full max-w-xl overflow-hidden animate-scaleUp">
            <div className="p-4 border-b border-[#ECEAE4] flex items-center gap-3">
              <Search className="w-5 h-5 text-[#8C8881]" />
              <input
                ref={searchInputRef}
                autoFocus
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar em toda a documentação da Vocalis..."
                className="flex-1 bg-transparent text-sm text-[#1A1816] placeholder:text-[#9A968E] outline-none"
              />
              <button
                onClick={() => setIsSearchModalOpen(false)}
                className="p-1 rounded-lg hover:bg-[#FAF9F5] text-[#8C8881] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="max-h-80 overflow-y-auto p-3 space-y-1">
              {filteredArticles.length > 0 ? (
                filteredArticles.map((art) => (
                  <button
                    key={art.id}
                    onClick={() => {
                      setSelectedArticleId(art.id);
                      setIsSearchModalOpen(false);
                      setSearchQuery('');
                    }}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-[#EEF2FF] transition-colors cursor-pointer group flex items-start gap-3"
                  >
                    <div className="w-6 h-6 rounded-md bg-[#FAF9F5] text-[#736F69] group-hover:bg-[#4F46E5] group-hover:text-white flex items-center justify-center shrink-0 transition-colors mt-0.5">
                      <FileText className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#1A1816] group-hover:text-[#4F46E5]">
                        {art.title}
                      </div>
                      <div className="text-[11px] text-[#736F69] line-clamp-1">
                        {art.summary}
                      </div>
                    </div>
                  </button>
                ))
              ) : (
                <div className="py-8 text-center text-xs text-[#8C8881]">
                  Nenhum resultado encontrado para "{searchQuery}".
                </div>
              )}
            </div>

            <div className="p-3 bg-[#FAF9F6] border-t border-[#ECEAE4] text-[10px] text-[#8C8881] flex items-center justify-between">
              <span>Navegue usando os cliques ou pressione Esc para fechar</span>
              <span className="font-mono">Vocalis Knowledge Base</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
