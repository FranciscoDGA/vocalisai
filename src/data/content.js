import { COMMERCIAL_CATALOG } from './commercialCatalog';
import {
  getPlanCardViewModel,
  getCommercialEntryLabel,
  getSimultaneousCallsSummary,
} from '../utils/commercialCatalogUtils';

export const BRAND = {
  name: 'Vocalis AI',
  tagline: 'A voz da sua empresa, a qualquer hora.',
  subtitle: 'IA para apoiar o atendimento por telefone, WhatsApp e webchat no tom da sua marca, inclusive fora do horário comercial conforme o plano contratado.',
  ctaPrimary: 'Criar assistente',
  ctaSecondary: 'Falar com especialista',
  ctaCall: 'Abrir simulação ilustrativa da IA',
  phonePlaceholder: '(11) 98765-4321',
  emailPlaceholder: 'Seu melhor e-mail comercial',
};

export const SPECIALIST_CONTACT = {
  name: 'Francisco (AI Agency OS)',
  phoneDisplay: '(94) 98442-3948',
  phoneRaw: '5594984423948',
  email: 'contato@vocalis.ai',
  getWhatsAppUrl: (customMsg) => {
    const text = customMsg || 'Olá Francisco! Vim pelo site da Vocalis AI e gostaria de falar com um especialista sobre atendimento com inteligência artificial para minha empresa.';
    return `https://wa.me/5594984423948?text=${encodeURIComponent(text)}`;
  }
};

export const CHANNELS = [
  {
    id: 'telefone',
    title: 'Telefone',
    badge: 'Voz em PT-BR',
    description: 'Atendimento telefônico automatizado em português brasileiro, configurável para triagem, dúvidas e agendamentos.',
    details: 'Opções de telefonia e tipos de número sujeitos à disponibilidade e ao plano contratado.',
    icon: 'PhoneCall',
  },
  {
    id: 'whatsapp',
    title: 'WhatsApp',
    badge: 'Texto e Áudio',
    description: 'Atendimento automatizado no WhatsApp com texto e áudio configuráveis. Modalidade de conexão e eventuais custos de provedor ou da Meta dependem do plano confirmado.',
    details: 'Recursos e integração de WhatsApp sujeitos à configuração e às regras vigentes do provedor.',
    icon: 'MessageSquare',
  },
  {
    id: 'webchat',
    title: 'Webchat',
    badge: 'Assistente de IA no Site',
    description: 'Atenda visitantes no seu site com identificação clara de assistente de IA e opção de direcionamento para contato com a equipe humana, conforme configuração do plano.',
    details: 'Implantação via script e regras de encaminhamento sob consulta conforme o plano.',
    icon: 'Globe',
  },
  {
    id: 'email-crm',
    title: 'E-mail IA & CRM',
    badge: 'Sob consulta',
    description: 'Triagem configurável de mensagens e organização de registros conforme as integrações habilitadas.',
    details: 'Integração com ferramentas externas sob consulta e conforme o plano.',
    icon: 'Mail',
  },
];

export const TIMELINE_STEPS = [
  {
    time: 'Etapa 01',
    title: 'Atendimento inicial automatizado',
    description: 'Recepção configurável para acolher o contato sem depender apenas de menus numéricos rígidos.',
  },
  {
    time: 'Etapa 02',
    title: 'Compreensão da solicitação',
    description: 'Identificação do assunto e das informações iniciais em português brasileiro para direcionar a conversa.',
  },
  {
    time: 'Etapa 03',
    title: 'Consulta de informações configuradas',
    description: 'Acesso à base cadastrada sobre serviços, horários e regras de atendimento definidos pela empresa.',
  },
  {
    time: 'Etapa 04',
    title: 'Encaminhamento para equipe humana',
    description: 'Regras de transbordo configuráveis para direcionar casos prioritários ou solicitações fora do escopo.',
  },
  {
    time: 'Etapa 05',
    title: 'Registro do resumo do atendimento',
    description: 'Organização de transcrição e resumo no painel e em eventuais webhooks ou CRMs integrados conforme o plano.',
  },
];

export const THREE_STEPS = [
  {
    step: '01',
    title: 'Escolha o tom e a voz',
    description: 'Defina o estilo de comunicação e como sua assistente cumprimenta quem entra em contato com sua empresa.',
    tag: 'Personalização Guiada',
  },
  {
    step: '02',
    title: 'Alimente com dados',
    description: 'Inclua informações do seu site, catálogo, perguntas frequentes e regras de atendimento do negócio.',
    tag: 'Base de Conhecimento Configurável',
  },
  {
    step: '03',
    title: 'Ative os canais',
    description: 'Configure os canais disponíveis no seu plano e acompanhe os atendimentos conforme os limites contratados.',
    tag: 'Ativação Conforme Configuração',
  },
];

export const NICHES = [
  {
    id: 'saude',
    name: 'Clínicas & Consultórios',
    tagline: 'Agendamento de rotina e lembretes conforme regras aprovadas pela clínica',
    description: 'Apoie a recepção com agendamentos de rotina (sem sintomas urgentes) e lembretes baseados na base de conhecimento e regras definidas pela clínica. Não realiza diagnóstico, avaliação clínica ou substituição profissional; protocolos de urgência exigem aprovação do responsável técnico e encaminhamento humano imediato.',
    icon: 'Stethoscope',
    metrics: [
      { label: 'Foco principal', value: 'Rotina e lembretes' },
      { label: 'Limites', value: 'Sem diagnóstico por IA' },
    ],
  },
  {
    id: 'imobiliario',
    name: 'Imobiliárias & Corretores',
    tagline: 'Qualificação inicial de leads e encaminhamento de visitas',
    description: 'Registre se o interessado busca compra ou locação, faixa de valor e região de interesse para organizar o agendamento com o corretor responsável conforme a base cadastrada.',
    icon: 'Building2',
    metrics: [
      { label: 'Foco principal', value: 'Qualificação inicial' },
      { label: 'Encaminhamento', value: 'Para equipe comercial' },
    ],
  },
  {
    id: 'juridico',
    name: 'Escritórios de Advocacia',
    tagline: 'Recepção administrativa e encaminhamento para advogado habilitado',
    description: 'Realiza apenas recepção administrativa inicial e identificação da área de interesse conforme regras aprovadas pelo escritório. Não promete conclusão jurídica, valor de causa, aconselhamento ou conformidade jurídica automática.',
    icon: 'Scale',
    metrics: [
      { label: 'Foco principal', value: 'Recepção administrativa' },
      { label: 'Revisão', value: 'Pelo advogado responsável' },
    ],
  },
  {
    id: 'varejo',
    name: 'E-commerce & Varejo',
    tagline: 'Tira-dúvidas sobre produtos, prazos e orientações de pedido',
    description: 'Centralize perguntas frequentes de pré e pós-venda e encaminhe demandas mais complexas para o suporte humano com o contexto registrado.',
    icon: 'ShoppingBag',
    metrics: [
      { label: 'Foco principal', value: 'Dúvidas e triagem' },
      { label: 'Canais', value: 'WhatsApp e Webchat' },
    ],
  },
  {
    id: 'servicos',
    name: 'Empresas de Serviços & Manutenção',
    tagline: 'Coleta de informações de serviço e registro de solicitações',
    description: 'Para assistência técnica, oficinas e empresas de manutenção. O assistente coleta descrição do serviço e dados do cliente para organização da agenda.',
    icon: 'Wrench',
    metrics: [
      { label: 'Foco principal', value: 'Coleta de briefing' },
      { label: 'Cobertura', value: 'Configurável por turno' },
    ],
  },
  {
    id: 'financeiro',
    name: 'Cobrança Amigável & Lembretes',
    tagline: 'Avisos preventivos conforme base de conhecimento e regras aprovadas',
    description: 'Realize lembretes administrativos de vencimento seguindo exclusivamente a base de conhecimento, scripts e alçadas validados pela equipe financeira/jurídica do cliente, sem consultoria financeira ou conformidade regulatória automática.',
    icon: 'Banknote',
    metrics: [
      { label: 'Foco principal', value: 'Lembretes programados' },
      { label: 'Governança', value: 'Regras do cliente' },
    ],
  },
];

export const INTEGRATIONS_LIST = [
  {
    id: 'google-cal',
    name: 'Google Calendar',
    category: 'Agendamentos',
    desc: 'Possibilidade de integração de agenda avaliada conforme o plano contratado.',
    badge: 'Sob consulta',
  },
  {
    id: 'whatsapp-meta',
    name: 'WhatsApp',
    category: 'Mensageria',
    desc: 'Modalidade de conexão e eventuais custos de provedor ou da Meta confirmados por plano.',
    badge: 'Sob consulta',
  },
  {
    id: 'hubspot',
    name: 'HubSpot',
    category: 'CRM & Vendas',
    desc: 'Envio de contatos e resumos via conectores ou webhook conforme escopo contratado.',
    badge: 'Sob consulta',
  },
  {
    id: 'rdstation',
    name: 'RD Station',
    category: 'CRM & Vendas',
    desc: 'Possibilidade de envio de leads avaliada conforme o plano e configuração técnica.',
    badge: 'Sob consulta',
  },
  {
    id: 'pipedrive',
    name: 'Pipedrive',
    category: 'CRM & Vendas',
    desc: 'Integração com etapas do funil avaliada sob consulta via API ou webhook.',
    badge: 'Sob consulta',
  },
  {
    id: 'stripe',
    name: 'Gateways de Pagamento',
    category: 'Financeiro',
    desc: 'Fluxos financeiros externos disponíveis apenas sob consulta e validação técnica.',
    badge: 'Sob consulta',
  },
  {
    id: 'webhooks',
    name: 'Webhooks & API REST',
    category: 'Desenvolvedores',
    desc: 'Integração flexível com sistemas próprios ou fluxos externos conforme o plano.',
    badge: 'Via Webhook/API',
  },
  {
    id: 'sip-telecom',
    name: 'PABX SIP & Telefonia',
    category: 'Telefonia',
    desc: 'Opções de conexão telefônica sujeitas à viabilidade técnica e ao plano contratado.',
    badge: 'Sob consulta',
  },
];

export const PRICING_PLANS = COMMERCIAL_CATALOG.channels.telefone.plans.map((plan) => {
  const card = getPlanCardViewModel('telefone', plan.id, 'monthly');
  const yearlyCard = getPlanCardViewModel('telefone', plan.id, 'yearly');
  return {
    id: card.id,
    name: card.name,
    badge: card.badge || card.statusLabel,
    status: card.status,
    priceMonthly: card.pricing.hasConfirmedPrice ? card.pricing.numericPrice : card.pricing.displayPrice,
    priceYearly: yearlyCard.pricing.hasConfirmedPrice ? yearlyCard.pricing.numericPrice : yearlyCard.pricing.displayPrice,
    description: card.tagline,
    features: [
      ...card.includedRows.filter((r) => !r.isUnavailable).map((r) => `${r.label}: ${r.text}`),
      ...card.limitRows.filter((r) => !r.isUnavailable).map((r) => `${r.label}: ${r.text}`),
    ],
    cta: card.cta.label,
    popular: Boolean(card.highlight),
  };
});

export const GUARANTEES = [
  {
    title: 'Condições de teste e cancelamento claras',
    description: 'As regras de avaliação, cancelamento e eventual reembolso são informadas antes da contratação, conforme os termos vigentes do plano e a legislação aplicável.',
    badge: 'Transparência',
  },
  {
    title: 'Privacidade e boas práticas LGPD',
    description: 'Práticas técnicas e contratuais orientadas à proteção de dados pessoais, conforme nossa Política de Privacidade e termos aplicáveis.',
    badge: 'LGPD',
  },
  {
    title: 'Controle operacional configurável',
    description: 'Defina regras de atendimento, limites operacionais e encaminhamento para a equipe humana conforme a necessidade do negócio.',
    badge: 'Controle',
  },
];

export const FAQS = [
  {
    q: 'Como funciona a voz da Vocalis? Parece um robô daqueles chatos?',
    a: 'A Vocalis utiliza síntese e reconhecimento de voz em português brasileiro configuráveis para oferecer um atendimento mais natural do que menus numéricos tradicionais. A experiência varia conforme o canal, a qualidade da linha e o fluxo configurado.'
  },
  {
    q: 'Posso usar meu número de telefone e WhatsApp atual?',
    a: 'As opções de uso de número atual, ramal SIP, novos números e conexão com WhatsApp dependem da disponibilidade técnica e do plano contratado, sendo confirmadas com nossa equipe antes da ativação.'
  },
  {
    q: 'E se o cliente fizer uma pergunta difícil ou quiser falar com um humano?',
    a: 'É possível configurar regras de encaminhamento para um atendente humano junto com o resumo do que foi conversado, conforme o fluxo implantado.'
  },
  {
    q: 'Como ela se conecta à agenda da minha empresa?',
    a: 'As integrações com agendas, CRMs e outros sistemas variam conforme o plano e a viabilidade técnica, podendo ser avaliadas via webhooks ou conectores disponíveis.'
  },
  {
    q: 'Quanto tempo leva para colocar no ar?',
    a: 'O prazo de configuração e entrada em operação varia conforme a complexidade do atendimento, os canais escolhidos e eventuais integrações. Alinhamos o cronograma antes da contratação.'
  }
];

export const COMPARISONS = [
  {
    feature: 'Velocidade de atendimento',
    vocalis: 'Atendimento automatizado sem menu numérico tradicional',
    oldBot: 'Lento (menu de opções 1, 2, 3)',
    human: 'Depende de disponibilidade na fila',
  },
  {
    feature: 'Atendimento por voz no telefone',
    vocalis: 'Voz configurável em português brasileiro',
    oldBot: 'Voz robótica sintetizada ou inexistente',
    human: 'Sim, mas com alto custo de escala',
  },
  {
    feature: 'Disponibilidade horária',
    vocalis: 'Horário configurável, inclusive fora do expediente',
    oldBot: '24h (mas limitado a botões)',
    human: 'Geralmente 8h às 18h em dias úteis',
  },
  {
    feature: 'Capacidade de ligações simultâneas',
    vocalis: getSimultaneousCallsSummary('telefone'),
    oldBot: 'Inexistente para ligações de voz',
    human: '1 chamada por atendente',
  },
  {
    feature: 'Atualização do CRM & Agenda',
    vocalis: 'Registro estruturado conforme integrações habilitadas',
    oldBot: 'Apenas campos básicos de texto',
    human: 'Depende de preenchimento manual',
  },
  {
    feature: 'Referência de planos comerciais',
    vocalis: getCommercialEntryLabel(),
    oldBot: 'Baixo, porém com alta rejeição do cliente',
    human: 'Referência salarial e encargos trabalhistas da equipe',
  },
];

export const SOCIAL_LINKS = [];

export const PRIVACY_POLICY = {
  title: 'Política de privacidade',
  subtitle: 'Informações sobre coleta, uso, compartilhamento e proteção de dados pessoais (itens operacionais e jurídicos em validação).',
  company: 'VOCALIS TECNOLOGIA LTDA (PENDENTE DE CONFIRMAÇÃO)',
  updatedAt: 'Revisão técnica em andamento — pendente de validação jurídica',
  sections: [
    {
      id: 'identificacao',
      title: 'Identificação da empresa e atendimento (PENDENTE DE CONFIRMAÇÃO)',
      content: 'Esta minuta referencia VOCALIS TECNOLOGIA LTDA (CNPJ 27.824.190/0001-18, Rua Rio Grande do Sul, 24, Setor Maria Liane, Cumaru do Norte/PA, CEP 68398-000). A confirmação cadastral oficial, endereço institucional vigente e canais formais de atendimento ao titular estão PENDENTES DE CONFIRMAÇÃO pelo proprietário e assessoria jurídica.'
    },
    {
      id: 'controlador',
      title: 'Quem é o controlador e quem é o operador',
      items: [
        'Dados de visitantes do site, leads comerciais e usuários cadastrados na plataforma: a Vocalis atua como controladora, definindo as finalidades de contato, cadastro e faturamento.',
        'Dados tratados nas conversas atendidas pelos assistentes configurados por clientes (telefone, WhatsApp e webchat): o cliente contratante define finalidades e instruções e atua como controlador; a Vocalis atua como operadora (sujeita à formalização de DPA aplicável — PENDENTE DE CONFIRMAÇÃO).'
      ]
    },
    {
      id: 'dados-tratados',
      title: 'Dados que tratamos e fluxos de coleta',
      table: [
        { categoria: 'Cadastro', exemplos: 'Nome, e-mail comercial, senha e nome da empresa', finalidade: 'Criar conta e gerenciar acesso à plataforma' },
        { categoria: 'Formulários de contato e demonstração', exemplos: 'Nome, telefone/WhatsApp, e-mail, empresa e segmento informados nos formulários de contato/demonstração', finalidade: 'Registrar solicitação e permitir retorno pela equipe comercial ou agendamento de demonstração' },
        { categoria: 'Simulações ilustrativas no navegador', exemplos: 'Telefones digitados no simulador interativo de tela', finalidade: 'Uso ilustrativo na tela do navegador, sem armazenamento oculto nem disparo real de ligação ou WhatsApp' },
        { categoria: 'Faturamento', exemplos: 'CPF/CNPJ e endereço de cobrança (quando aplicável)', finalidade: 'Emitir notas fiscais e processar cobranças conforme o contrato confirmado' },
        { categoria: 'Chamadas e mensagens em operação', exemplos: 'Número de telefone, transcrição, áudio (se ativado) e mensagens em canais conectados', finalidade: 'Executar o atendimento configurado pelo cliente controlador (regras de gravação e retenção PENDENTES DE CONFIRMAÇÃO)' }
      ]
    },
    {
      id: 'bases-legais',
      title: 'Bases legais (sujeito a revisão jurídica)',
      content: 'O tratamento busca amparo nas hipóteses previstas na Lei nº 13.709/2018 (LGPD), como execução de contrato ou procedimentos preliminares solicitados pelo titular, cumprimento de obrigação legal ou regulatória, legítimo interesse e consentimento quando exigido. A definição final do enquadramento jurídico e política de cookies está PENDENTE DE CONFIRMAÇÃO jurídica.'
    },
    {
      id: 'compartilhamento',
      title: 'Compartilhamento com fornecedores e subprocessadores (PENDENTE DE CONFIRMAÇÃO)',
      content: 'Lista preliminar em consolidação (PENDENTE DE CONFIRMAÇÃO pelo proprietário e jurídico): esta relação histórica menciona provedores abaixo, enquanto o código da aplicação também referencia integrações com Supabase (banco/autenticação), Vercel (hospedagem/funções), Google Gemini (IA/áudio), Vapi (telefonia), OpenAI/Deepgram (via Vapi) e UazAPI/WhatsApp. A lista oficial única de subprocessadores ativos, países de processamento e salvaguardas internacionais (cláusulas-padrão contratuais ANPD) depende de validação do proprietário e advogado.',
      suppliers: [
        { fornecedor: 'Retell (a confirmar na lista unificada)', finalidade: 'Orquestração de voz citada na minuta anterior', local: 'EUA (a confirmar)' },
        { fornecedor: 'ElevenLabs (a confirmar na lista unificada)', finalidade: 'Modelos de voz citados na minuta anterior', local: 'EUA (a confirmar)' },
        { fornecedor: 'Twilio / Infobip (a confirmar na lista unificada)', finalidade: 'Telefonia citada na minuta anterior', local: 'EUA / Brasil (a confirmar)' },
        { fornecedor: 'Meta Platforms (a confirmar conforme modalidade WhatsApp)', finalidade: 'WhatsApp Cloud API (ou outro provedor confirmado)', local: 'EUA (a confirmar)' },
        { fornecedor: 'Stripe / Asaas (a confirmar meio de cobrança ativo)', finalidade: 'Pagamentos e faturamento', local: 'EUA / Brasil (a confirmar)' },
        { fornecedor: 'Supabase / AWS / Vercel (identificados no código + minuta)', finalidade: 'Banco de dados, autenticação e hospedagem web', local: 'Região a confirmar' }
      ]
    },
    {
      id: 'retencao-exclusao',
      title: 'Gravação, transcrição, retenção e exclusão (PENDENTE DE CONFIRMAÇÃO)',
      content: 'As configurações reais de gravação de chamadas, armazenamento de áudios/transcrições, prazos exatos de retenção e política de eliminação após o encerramento do contrato estão PENDENTES DE CONFIRMAÇÃO técnica e jurídica. Caso a retenção zero ou exclusão automática seja oferecida em algum plano, os limites e prazos exatos dependerão de confirmação nos provedores e no contrato.'
    },
    {
      id: 'direitos-dpo',
      title: 'Seus direitos, procedimento e Encarregado de Dados (DPO) (PENDENTE DE CONFIRMAÇÃO)',
      content: 'Os titulares podem solicitar informações sobre seus direitos previstos no art. 18 da LGPD (confirmação de tratamento, acesso, correção, anonimização, portabilidade, eliminação e revogação de consentimento). Caso a conversa tenha ocorrido com um cliente empresarial da Vocalis, o atendimento ao pedido poderá depender do encaminhamento ao respectivo cliente controlador. O nome do Encarregado (DPO), o e-mail/canal oficial definitivo, o fluxo operacional de autenticação de identidade e o prazo formal de resposta estão PENDENTES DE CONFIRMAÇÃO.',
      dpoEmail: 'dpo@vocalis.ai',
      dpoStatus: 'PENDENTE DE CONFIRMAÇÃO (canal sujeito a validação oficial)'
    },
    {
      id: 'seguranca',
      title: 'Segurança, criptografia e não uso para treinamento (PENDENTE DE CONFIRMAÇÃO)',
      content: 'A aplicação web utiliza conexão segura HTTPS/TLS em trânsito e controles de acesso vinculados à infraestrutura contratada, sem alegação de sigilo de extremo a extremo (E2EE) nas chamadas, WhatsApp ou processamento por IA. Especificações sobre versões específicas de TLS/criptografia em repouso (como AES-256), retenção zero, trilhas de auditoria e compromissos contratuais de não uso de dados para treinamento de modelos por terceiros estão PENDENTES DE CONFIRMAÇÃO nos contratos vigentes com os provedores.'
    }
  ]
};

export const TERMS_OF_SERVICE = {
  title: 'Termos e condições',
  subtitle: 'Regras gerais de uso da plataforma Vocalis — cláusulas comerciais e operacionais sujeitas a confirmação contratual e revisão jurídica.',
  company: 'VOCALIS TECNOLOGIA LTDA (PENDENTE DE CONFIRMAÇÃO)',
  version: 'Minuta revisada tecnicamente — pendente de validação jurídica e comercial',
  sections: [
    {
      num: '1',
      title: 'Aceite e escopo contratual',
      content: 'O uso da plataforma e a eventual contratação de planos sujeitam-se aos Termos aplicáveis e à proposta comercial confirmada entre as partes. Se você atua em nome de uma empresa, declara possuir poderes para representá-la.'
    },
    {
      num: '2',
      title: 'Conta e acesso',
      content: 'Cada organização é responsável pela guarda de suas credenciais e pelas atividades realizadas em sua conta, devendo manter os dados cadastrais verdadeiros e atualizados.'
    },
    {
      num: '3',
      title: 'Planos, cobrança, promoções, excedentes e renovação (PENDENTE DE CONFIRMAÇÃO)',
      content: 'Valores vigentes, duração e data de validade de promoções temporárias, definição das unidades de uso (minutos, ligações, conversas ou mensagens), regras de excedentes, custos adicionais de provedores/operadoras, meios de pagamento aceitos e condições de renovação mensal ou anual estão PENDENTES DE CONFIRMAÇÃO no catálogo oficial e na proposta comercial, devendo ser informados expressamente antes de qualquer pagamento.'
    },
    {
      num: '4',
      title: 'Uso aceitável',
      content: 'É vedado utilizar a plataforma em desacordo com a legislação brasileira, regras de telecomunicações/telemarketing aplicáveis, normas da LGPD ou políticas dos provedores de mensageria, bem como tentar burlar limites técnicos.'
    },
    {
      num: '5',
      title: 'Conteúdo do cliente, gravações e respostas da IA',
      content: 'Prompts, bases de conhecimento, transcrições e eventuais gravações pertencem ao cliente ou a seus respectivos titulares. Respostas geradas por IA podem conter imprecisões, cabendo ao cliente revisar roteiros, permissões de gravação, avisos ao usuário final e fluxos configurados.'
    },
    {
      num: '6',
      title: 'Disponibilidade e suporte (PENDENTE DE CONFIRMAÇÃO)',
      content: 'Eventual meta de disponibilidade (SLA), janelas de manutenção, histórico de operação, canais oficiais e horários/SLAs de atendimento do suporte humano estão PENDENTES DE CONFIRMAÇÃO contratual e não constituem garantia irrestrita contra falhas de operadoras, internet ou serviços terceirizados.'
    },
    {
      num: '7',
      title: 'Limitação de responsabilidade e direitos do consumidor',
      content: 'As responsabilidades contratuais e eventuais limites de indenização dependem de revisão jurídica específica na contratação. Nada nestes Termos afasta direitos assegurados pelo Código de Defesa do Consumidor (Lei nº 8.078/1990) quando aplicável.'
    },
    {
      num: '8',
      title: 'Teste, cancelamento, devolução e reembolso (PENDENTE DE CONFIRMAÇÃO)',
      content: 'As regras comerciais de período de teste/avaliação, procedimento de cancelamento, retenção ou devolução de valores pagos antecipadamente e prazo para reembolso estão PENDENTES DE CONFIRMAÇÃO pelo proprietário e assessoria jurídica, observando-se, quando aplicável, o direito legal de arrependimento de 7 dias previsto no art. 49 do Código de Defesa do Consumidor.'
    },
    {
      num: '9',
      title: 'Lei aplicável e foro',
      content: 'Aplica-se a legislação brasileira, sujeita à definição jurídica do foro contratual e respeitado o foro legal do domicílio do consumidor quando aplicável.'
    }
  ]
};
