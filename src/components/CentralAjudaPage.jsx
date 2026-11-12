import React, { useState, useEffect, useRef } from 'react';
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
        summary: 'Crie seu primeiro agente de voz funcional em menos de 5 minutos.',
        content: {
          badge: 'Guia Rápido',
          lastUpdated: 'Atualizado em Novembro de 2026',
          intro: 'Bem-vindo à Vocalis. Este guia conduz você passo a passo na criação e configuração do seu primeiro assistente telefônico inteligente com voz humana em português do Brasil.',
          steps: [
            {
              step: '1. Crie seu assistente no painel',
              desc: 'Acesse o painel Vocalis e clique em "Criar assistente". Escolha o objetivo principal: Recepção, Agendamentos, Vendas ou Suporte N1.'
            },
            {
              step: '2. Escolha a voz e a personalidade',
              desc: 'Selecione a voz de alta fidelidade (como Francisca ou Maria para tom calmo e natural). Defina o tom de fala: caloroso, executivo ou descontraído.'
            },
            {
              step: '3. Redija o prompt inicial e FAQs',
              desc: 'Explique qual é a empresa, o que o agente deve responder e quais são as restrições (ex.: "Nunca prometa prazos sem antes consultar o sistema").'
            },
            {
              step: '4. Faça uma chamada de teste imediata',
              desc: 'Digite seu próprio número de celular no simulador de testes. O telefone tocará em menos de 10 segundos para você conversar com a IA.'
            }
          ],
          tip: 'Dica de ouro: Inicie com um prompt simples e teste chamadas simuladas antes de adicionar integrações complexas.'
        }
      },
      {
        id: 'numeros-de-telefone',
        title: 'Números de telefone',
        icon: Phone,
        summary: 'Como adquirir novos números nacionais (0800, 4003, DDD local) ou fazer portabilidade.',
        content: {
          badge: 'Telefonia & SIP',
          lastUpdated: 'Atualizado em Novembro de 2026',
          intro: 'A Vocalis fornece conectividade com todas as operadoras brasileiras homologadas pela Anatel (Claro, Vivo, TIM, Embratel), garantindo entrega de áudio HD sem ruído.',
          steps: [
            {
              step: 'Números locais com DDD',
              desc: 'Disponibilizamos números de fixo virtual em todos os DDDs do Brasil (11, 21, 31, 41, 47, 51, 61, 71, 81, 94, etc.). A ativação é instantânea após validação cadastral.'
            },
            {
              step: 'Números 0800 e 4003/4004',
              desc: 'Perfeito para empresas com atuação nacional que buscam passar máxima credibilidade e ligação gratuita para o cliente.'
            },
            {
              step: 'Portabilidade e Tronco SIP próprio',
              desc: 'Se sua empresa já possui números em outra operadora ou PABX na nuvem (Asterisk, FreePBX, Twilio, Zenvia), conecte via SIP Trunking com autenticação IP segura.'
            }
          ],
          tip: 'Você também pode configurar transbordo: se o cliente pedir falar com um atendente humano, a chamada é transferida em tempo real via SIP.'
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
              step: 'Regra 2: Instruções de pausas e números',
              desc: 'Para números de telefone ou CPF, oriente a IA a falar pausadamente dígito a dígito (ex.: "DDD 11, 9, 8 4 4 2, 3 9 4 8") evitando ler números de bilhões.'
            },
            {
              step: 'Regra 3: Delimite o que NÃO fazer',
              desc: 'Defina explicitamente: "Se o cliente perguntar algo fora do escopo, peça desculpas gentilmente e ofereça transferir para o time de suporte".'
            }
          ],
          examplePrompt: `Você é a Clara, recepcionista virtual inteligente da Clínica Alvorada.
Seu objetivo é acolher os pacientes, tirar dúvidas sobre convênios e agendar consultas.
Fale com tom caloroso, empático e calmo.
Nunca dê diagnósticos médicos. Se o paciente relatar emergência grave, oriente-o imediatamente a procurar o pronto-socorro mais próximo.`,
          tip: 'Use a aba de Simulação no painel para ouvir como a entonação da voz soa com o seu prompt em tempo real.'
        }
      },
      {
        id: 'base-de-conhecimento',
        title: 'Base de conhecimento',
        icon: BookOpen,
        summary: 'Alimente o agente com documentos, manuais, tabelas de preços e FAQs em PDF.',
        content: {
          badge: 'RAG & Documentos',
          lastUpdated: 'Atualizado em Novembro de 2026',
          intro: 'Você não precisa reescrever todo o manual da sua empresa no prompt. Faça upload dos seus arquivos e a Vocalis busca a informação exata em milissegundos enquanto o cliente fala.',
          steps: [
            {
              step: 'Formatos suportados',
              desc: 'PDF, DOCX, planilhas CSV, tabelas Excel e páginas públicas do seu site via URL crawler.'
            },
            {
              step: 'Indexação semântica inteligente',
              desc: 'A Vocalis segmenta seu conteúdo em blocos semânticos de alta precisão, permitindo que a IA cite dados exatos de garantias, preços e regras de devolução.'
            },
            {
              step: 'Atualização em tempo real',
              desc: 'Alterou o preço ou adicionou um novo produto? Basta subir a nova versão do arquivo e todos os seus agentes passam a usar a versão atualizada imediatamente.'
            }
          ],
          tip: 'Para melhores resultados, utilize documentos bem formatados com títulos claros e perguntas frequentes organizadas.'
        }
      },
      {
        id: 'idiomas-e-multilinguismo',
        title: 'Idiomas e multilinguismo',
        icon: Globe,
        summary: 'Configurações de sotaque em português do Brasil e atendimento multilíngue instantâneo.',
        content: {
          badge: 'Voz & Idiomas',
          lastUpdated: 'Atualizado em Novembro de 2026',
          intro: 'A Vocalis é nativamente treinada no português do Brasil, compreendendo regionalismos, gírias comuns e pronúncias de nomes próprios brasileiros.',
          steps: [
            {
              step: 'Português do Brasil Natural',
              desc: 'Modelos acústicos calibrados para cadência brasileira, pausas naturais de respiração e inflexões de pergunta.'
            },
            {
              step: 'Detecção automática de idioma',
              desc: 'Se um turista ou cliente estrangeiro iniciar a conversa em inglês ou espanhol, o agente detecta e responde no mesmo idioma sem quebrar a linha.'
            },
            {
              step: 'Mais de 30 idiomas suportados',
              desc: 'Inglês (US, UK), Espanhol (América Latina e Espanha), Francês, Alemão, Italiano, Japonês e Mandarim.'
            }
          ],
          tip: 'Se sua empresa atende apenas no Brasil, você pode travar o idioma exclusivamente em Português-BR para evitar trocas acidentais.'
        }
      },
      {
        id: 'configuracoes-tecnicas',
        title: 'Configurações técnicas',
        icon: Sliders,
        summary: 'Latência ultrabaixa, codecs de áudio (Opus/PCMU), Webhooks e fallbacks.',
        content: {
          badge: 'Desenvolvedores & DevOps',
          lastUpdated: 'Atualizado em Novembro de 2026',
          intro: 'Arquitetura técnica projetada para latência ponta a ponta inferior a 500ms, proporcionando a sensação exata de uma conversa humana sem atrasos incômodos.',
          steps: [
            {
              step: 'Codecs de áudio de alta fidelidade',
              desc: 'Suporte a Opus (48kHz fullband) para WebRTC e Webchat, e G.711 PCMU/PCMA (8kHz) para troncos telefônicos tradicionais.'
            },
            {
              step: 'Webhooks de evento de chamada',
              desc: 'Receba notificações HTTP POST no seu servidor para: call.started, call.ended, call.transcribed, call.qualification, call.appointment_booked.'
            },
            {
              step: 'Mecanismo de Fallback e Resiliência',
              desc: 'Se o LLM principal tiver latência anormal, o sistema comuta em milissegundos para nós redundantes sem interromper a chamada.'
            }
          ],
          codeSnippet: `{
  "event": "call.completed",
  "call_id": "voc_984423948_br",
  "direction": "inbound",
  "caller": "+5511984423948",
  "duration_seconds": 142,
  "sentiment": "positive",
  "appointment": {
    "date": "2026-11-15T14:30:00-03:00",
    "doctor": "Dra. Camila Rocha"
  }
}`,
          tip: 'Você pode testar seus Webhooks diretamente pelo painel usando nossa ferramenta de simulação de payloads com assinatura HMAC.'
        }
      },
      {
        id: 'contatos',
        title: 'Contatos',
        icon: MessageSquare,
        summary: 'Gerencie listas de clientes, histórico de conversas, tags e dados enriquecidos.',
        content: {
          badge: 'Gestão de Leads',
          lastUpdated: 'Atualizado em Novembro de 2026',
          intro: 'Centralize todos os contatos que já interagiram com seus agentes de voz, WhatsApp ou Webchat.',
          steps: [
            {
              step: 'Histórico unificado de conversas',
              desc: 'Veja cada transcrição completa, áudio gravado e resumo das chamadas associadas ao número de telefone do cliente.'
            },
            {
              step: 'Tags e segmentação automática',
              desc: 'A IA classifica o lead automaticamente: "Cliente Vip", "Reclamação", "Agendamento Confirmado", "Follow-up necessário".'
            },
            {
              step: 'Exportação e Sincronização',
              desc: 'Exporte listas em CSV ou sincronize automaticamente com seu CRM favorito via integração nativa.'
            }
          ],
          tip: 'Quando um cliente recorrente liga, o agente reconhece pelo número e pode cumprimentá-lo pelo nome!'
        }
      },
      {
        id: 'analises',
        title: 'Análises',
        icon: BarChart3,
        summary: 'Painéis com TMA, taxa de conversão, custos e sentimento dos clientes.',
        content: {
          badge: 'Métricas & ROI',
          lastUpdated: 'Atualizado em Novembro de 2026',
          intro: 'Visualize gráficos em tempo real sobre o desempenho da sua central de voz e o nível de satisfação dos usuários.',
          steps: [
            {
              step: 'FCR (First Call Resolution)',
              desc: 'Acompanhe a porcentagem de chamadas que foram completamente resolvidas pela IA sem precisar de intervenção humana.'
            },
            {
              step: 'Análise de Sentimento com IA',
              desc: 'Cada ligação recebe uma nota de sentimento (Positivo, Neutro ou Frustrado) com destaques dos momentos mais críticos.'
            },
            {
              step: 'Custo por minuto e economia',
              desc: 'Compare o custo operacional da Vocalis (a partir de R$ 0,25/min) contra o custo médio de um atendente humano tradicional.'
            }
          ],
          tip: 'Filtre relatórios por atendente virtual, canal de entrada ou intervalo de datas.'
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
          tip: 'Nosso time de suporte está disponível 24 horas por dia através do botão "Mandar e-mail ao time" ou pelo WhatsApp de suporte.'
        }
      }
    ],
    produto: [
      {
        id: 'agente-voz',
        title: 'Agente de Voz Telefônico',
        icon: Phone,
        summary: 'Atendimento telefônico inteligente com números nacionais e voz ultra-realista.',
        content: {
          badge: 'Módulo Principal',
          lastUpdated: 'Atualizado em Novembro de 2026',
          intro: 'O Agente de Voz Vocalis atende e realiza chamadas telefônicas de forma 100% autônoma, compreendendo interrupções e negociando horários com fala natural.',
          steps: [
            {
              step: 'Atendimento Receptivo',
              desc: 'Substitui URAs confusas ("disque 1 para vendas, disque 2..."). O cliente simplesmente fala o que precisa e a IA resolve.'
            },
            {
              step: 'Chamadas Ativas',
              desc: 'Confirmação de consultas, cobrança amigável, pesquisa de NPS e qualificação de leads frios.'
            }
          ],
          tip: 'Experimente nosso teste de chamada gratuito no topo da página para ver em ação no seu celular!'
        }
      },
      {
        id: 'whatsapp-ia',
        title: 'IA de WhatsApp',
        icon: MessageSquare,
        summary: 'Atendimento com áudios humanos e textos simultâneos no canal favorito dos brasileiros.',
        content: {
          badge: 'WhatsApp Business API',
          lastUpdated: 'Atualizado em Novembro de 2026',
          intro: 'Conecte seu número de WhatsApp oficial e permita que sua empresa envie e escute áudios com a mesma voz do telefone.',
          steps: [
            {
              step: 'Áudios falados gerados na hora',
              desc: 'A IA responde mensagens de voz do cliente com outro áudio natural, criando altíssima proximidade e taxa de conversão.'
            },
            {
              step: 'Transcrições e Resumos',
              desc: 'Todo áudio recebido é transcrito para texto para facilitar o monitoramento da sua equipe.'
            }
          ],
          tip: 'Totalmente homologado na Cloud API oficial da Meta, sem risco de banimento de número.'
        }
      },
      {
        id: 'webchat-ia',
        title: 'Webchat de IA',
        icon: Zap,
        summary: 'Widget interativo para seu site com voz e texto em 1 linha de código.',
        content: {
          badge: 'Conversão no Site',
          lastUpdated: 'Atualizado em Novembro de 2026',
          intro: 'Transforme visitantes anônimos em reuniões agendadas com um assistente flutuante de voz direto no navegador.',
          steps: [
            {
              step: 'Instalação simples',
              desc: 'Basta colar uma tag <script> antes de fechar o </body> da sua landing page ou loja virtual.'
            },
            {
              step: 'Chamada de voz direto pelo navegador',
              desc: 'O visitante pode clicar no microfone e conversar por voz sem precisar discar nenhum número.'
            }
          ],
          tip: 'Disponível com tema escuro e claro que se adapta às cores da sua marca.'
        }
      }
    ],
    integracoes: [
      {
        id: 'integracao-calendarios',
        title: 'Google Agenda & Calendly',
        icon: Calendar,
        summary: 'Agendamentos automáticos respeitando fusos horários e disponibilidade real.',
        content: {
          badge: 'Sincronização de Agenda',
          lastUpdated: 'Atualizado em Novembro de 2026',
          intro: 'Permita que o agente de voz consulte sua disponibilidade e marque reuniões ou consultas na hora da conversa.',
          steps: [
            {
              step: 'Conexão em 1 clique',
              desc: 'Autorize sua conta Google Workspace ou Outlook 365 com protocolo OAuth2 seguro.'
            },
            {
              step: 'Regras de intervalo e antecedência',
              desc: 'Defina tempo de respiro entre atendimentos (ex.: 15 minutos) e limites de dias no futuro.'
            }
          ],
          tip: 'O cliente recebe convite no Google Meet ou WhatsApp de confirmação automaticamente.'
        }
      },
      {
        id: 'integracao-crms',
        title: 'CRMs (HubSpot, RD Station, Pipedrive)',
        icon: Layers,
        summary: 'Atualização de negócios e notas de chamadas sem trabalho manual.',
        content: {
          badge: 'Automação Comercial',
          lastUpdated: 'Atualizado em Novembro de 2026',
          intro: 'Acabe com o tempo gasto pelos vendedores preenchendo relatórios após reuniões e chamadas.',
          steps: [
            {
              step: 'Criação automática de Leads e Negócios',
              desc: 'Quando a IA qualifica um prospecto, ela cria o lead e move para a etapa correta do funil.'
            },
            {
              step: 'Gravação e transcrição anexadas',
              desc: 'O link do áudio e o resumo dos pontos acordados são inseridos diretamente na linha do tempo do CRM.'
            }
          ],
          tip: 'Suportamos também Webhooks genéricos para integrar com qualquer CRM proprietário.'
        }
      }
    ],
    parceiros: [
      {
        id: 'programa-white-label',
        title: 'Programa White-label',
        icon: Sparkles,
        summary: 'Revenda agentes de voz com a sua marca, seu domínio e margem de até 50%.',
        content: {
          badge: 'Parcerias & Agências',
          lastUpdated: 'Atualizado em Novembro de 2026',
          intro: 'Ideal para agências de marketing, integradores de telecom e consultorias que querem oferecer IA de voz aos seus clientes.',
          steps: [
            {
              step: 'Painel com sua identidade visual',
              desc: 'Seu logotipo, suas cores e seu domínio personalizado (ex.: app.suaagencia.com.br).'
            },
            {
              step: 'Gestão multi-tenant de clientes',
              desc: 'Crie subcontas para cada cliente da sua carteira e defina limites de uso e preços personalizados.'
            }
          ],
          tip: 'Converse com nosso time comercial no menu "Parceiros" para conhecer os planos para agências.'
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
        matchedText = `Na Vocalis você pode ativar números locais com DDD de qualquer estado do Brasil, linhas 0800 nacionais ou 4003. Também é possível conectar seu próprio tronco SIP/PABX existente sem precisar mudar de operadora. A ativação no painel leva menos de 2 minutos.`;
      } else if (qLower.includes('prompt') || qLower.includes('natural') || qLower.includes('escrever') || qLower.includes('falar')) {
        matchedText = `Para que a IA soe como uma pessoa real no telefone, recomendamos: 1) Usar frases curtas de até 2 sentenças; 2) Fazer uma pergunta no final para guiar o diálogo; 3) Escrever instruções de pausas para números (ex: "DDD 11, 9..."). Você pode testar e afinar o tom na aba de Simulação em tempo real.`;
      } else if (qLower.includes('agenda') || qLower.includes('google') || qLower.includes('calendly') || qLower.includes('marcar')) {
        matchedText = `A sincronização com o Google Agenda e Calendly é nativa! Conecte sua conta em 'Integrações', selecione o calendário desejado e o agente irá verificar horários livres em tempo real e criar o evento durante a própria chamada com o cliente.`;
      } else if (qLower.includes('whatsapp') || qLower.includes('zap') || qLower.includes('áudio')) {
        matchedText = `Sim! A Vocalis integra com a Cloud API oficial da Meta. O agente pode ouvir os áudios que seus clientes mandam no WhatsApp e responder com áudio falado natural na mesma voz humanizada, além de texto.`;
      } else if (qLower.includes('latência') || qLower.includes('tempo') || qLower.includes('atraso') || qLower.includes('rapidez')) {
        matchedText = `A latência ponta a ponta da Vocalis é inferior a 500 milissegundos. Isso elimina aquele silêncio constrangedor típico de robôs antigos e garante uma conversa fluida com interrupções naturais.`;
      } else {
        matchedText = `Com a Vocalis você cria agentes de voz com inteligência artificial para atender e fazer ligações telefônicas, WhatsApp e Webchat. Nossa central de ajuda possui guias detalhados sobre números de telefone, engenharia de prompt, bases de conhecimento em PDF e integrações via Webhook e CRM.`;
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
              <div className="w-8 h-8 rounded-lg bg-[#C84B1F] flex items-center justify-center text-white font-bold shadow-sm group-hover:scale-105 transition-transform">
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
              className="flex-1 flex items-center justify-between px-3.5 py-2 rounded-xl border border-[#E4E1D8] bg-[#FAF9F6] text-[#736F69] text-xs hover:border-[#C84B1F]/40 cursor-pointer transition-colors shadow-2xs"
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
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-[#E4E1D8] bg-white text-xs font-medium text-[#403E39] hover:bg-[#FAF9F5] hover:border-[#C84B1F]/40 transition-colors shadow-2xs cursor-pointer whitespace-nowrap"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C84B1F]" />
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
                            ? 'bg-[#FAF5EE] text-[#C84B1F] font-bold'
                            : 'text-[#5C5955] hover:text-[#1A1816] hover:bg-[#FAF9F5]'
                        }`}
                      >
                        <span className="truncate">{art.title}</span>
                        {isSelected && <ChevronRight className="w-3.5 h-3.5 text-[#C84B1F] shrink-0" />}
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
                <HelpCircle className="w-4 h-4 text-[#C84B1F]" />
                <span>Precisa de ajuda humana?</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                Nossos especialistas em IA de voz respondem em menos de 15 minutos em dias úteis.
              </p>
              <button
                onClick={() => onOpenDemo && onOpenDemo()}
                className="w-full py-1.5 px-3 rounded-lg bg-white border border-[#D5D2C9] text-[11px] font-semibold text-[#1A1816] hover:bg-[#FAF5EE] transition-colors text-center cursor-pointer shadow-2xs"
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
                  <div className="flex items-center gap-1 text-[#C84B1F]">
                    <span className="inline-block w-1 h-5 bg-[#C84B1F] rounded-full animate-pulse" />
                    <span className="inline-block w-1.5 h-8 bg-[#C84B1F] rounded-full" />
                    <span className="inline-block w-1 h-4 bg-[#C84B1F] rounded-full" />
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
                      className="w-10 h-10 rounded-full bg-[#E08A68] hover:bg-[#C84B1F] text-white flex items-center justify-center shrink-0 transition-colors shadow-sm cursor-pointer disabled:opacity-50"
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
                  <div className="w-full max-w-2xl mt-6 p-6 rounded-2xl bg-[#FAF5EE] border border-[#E8D9C8] text-left shadow-sm animate-fadeIn relative z-10">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-[#C84B1F] text-white flex items-center justify-center">
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
                      <span>Essa resposta ajudou você?</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => alert('Obrigado pelo feedback!')}
                          className="px-2.5 py-1 rounded-md bg-white border border-[#D5D2C9] text-[11px] font-medium hover:bg-[#FAF9F6] cursor-pointer"
                        >
                          👍 Sim
                        </button>
                        <button
                          onClick={() => alert('Registramos sua sugestão para aprimorar os artigos!')}
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
                        className="px-3 py-1.5 rounded-full border border-[#E7E4DC] bg-white text-xs text-[#5C5955] hover:border-[#C84B1F] hover:text-[#C84B1F] hover:bg-[#FAF5EE] transition-all cursor-pointer shadow-2xs"
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
                    className="p-4 rounded-xl bg-white border border-[#E7E4DC] hover:border-[#C84B1F]/60 transition-all cursor-pointer group shadow-2xs"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#FAF5EE] text-[#C84B1F] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <Zap className="w-4 h-4" />
                    </div>
                    <h4 className="text-sm font-bold text-[#1A1816] mb-1 group-hover:text-[#C84B1F] transition-colors">
                      Primeiros passos
                    </h4>
                    <p className="text-xs text-[#736F69] line-clamp-2">
                      Aprenda a criar seu primeiro assistente e testar no seu próprio telefone.
                    </p>
                  </div>

                  <div
                    onClick={() => setSelectedArticleId('numeros-de-telefone')}
                    className="p-4 rounded-xl bg-white border border-[#E7E4DC] hover:border-[#C84B1F]/60 transition-all cursor-pointer group shadow-2xs"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#FAF5EE] text-[#C84B1F] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <Phone className="w-4 h-4" />
                    </div>
                    <h4 className="text-sm font-bold text-[#1A1816] mb-1 group-hover:text-[#C84B1F] transition-colors">
                      Números e Tronco SIP
                    </h4>
                    <p className="text-xs text-[#736F69] line-clamp-2">
                      Portabilidade de operadora, aquisição de novos DDDs e linhas 0800.
                    </p>
                  </div>

                  <div
                    onClick={() => setSelectedArticleId('como-escrever-um-otimo-prompt')}
                    className="p-4 rounded-xl bg-white border border-[#E7E4DC] hover:border-[#C84B1F]/60 transition-all cursor-pointer group shadow-2xs"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#FAF5EE] text-[#C84B1F] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <FileText className="w-4 h-4" />
                    </div>
                    <h4 className="text-sm font-bold text-[#1A1816] mb-1 group-hover:text-[#C84B1F] transition-colors">
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
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FAF5EE] text-[#C84B1F] text-[11px] font-bold border border-[#E8D9C8] mb-3">
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
                <p className="text-base text-[#403E39] leading-relaxed border-l-4 border-[#C84B1F] pl-4 py-1 bg-[#FAF9F6]">
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
                        className="flex items-center gap-1 text-[11px] font-medium text-[#C84B1F] hover:underline cursor-pointer"
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
                        className="flex items-center gap-1 text-[11px] font-medium text-[#C84B1F] hover:underline cursor-pointer"
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
                  <div className="p-4 rounded-xl bg-[#FAF5EE] border border-[#E8D9C8] flex items-start gap-3">
                    <Sparkles className="w-4 h-4 text-[#C84B1F] shrink-0 mt-0.5" />
                    <p className="text-xs text-[#5C3A21] leading-relaxed font-medium">
                      {currentSelectedArticle.content.tip}
                    </p>
                  </div>
                )}

                {/* Article Footer & Helpful feedback */}
                <div className="pt-6 border-t border-[#ECEAE4] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-semibold text-[#1A1816]">
                      Este guia foi útil?
                    </span>
                    <button
                      onClick={() => alert('Obrigado pelo seu voto!')}
                      className="px-3 py-1.5 rounded-lg border border-[#E7E4DC] bg-white hover:bg-[#FAF9F5] text-xs font-medium text-[#1A1816] cursor-pointer"
                    >
                      👍 Sim
                    </button>
                    <button
                      onClick={() => alert('Feedback anotado!')}
                      className="px-3 py-1.5 rounded-lg border border-[#E7E4DC] bg-white hover:bg-[#FAF9F5] text-xs font-medium text-[#1A1816] cursor-pointer"
                    >
                      👎 Não
                    </button>
                  </div>

                  <button
                    onClick={() => onOpenDemo && onOpenDemo()}
                    className="inline-flex items-center gap-2 text-xs font-semibold text-[#C84B1F] hover:underline cursor-pointer"
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
                    className="w-full text-left p-2.5 rounded-xl hover:bg-[#FAF5EE] transition-colors cursor-pointer group flex items-start gap-3"
                  >
                    <div className="w-6 h-6 rounded-md bg-[#FAF9F5] text-[#736F69] group-hover:bg-[#C84B1F] group-hover:text-white flex items-center justify-center shrink-0 transition-colors mt-0.5">
                      <FileText className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#1A1816] group-hover:text-[#C84B1F]">
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
