export const BRAND = {
  name: 'Vocalis',
  tagline: 'A voz da sua empresa, a qualquer hora.',
  subtitle: 'IA que atende telefone e WhatsApp na voz e no tom da sua marca. Nunca mais perca um cliente que ligou fora de hora, demorou para ser atendido ou caiu numa fila.',
  ctaPrimary: 'Criar assistente',
  ctaSecondary: 'Falar com especialista',
  ctaCall: 'Receba uma ligação agora da nossa IA',
  phonePlaceholder: '(11) 98765-4321',
  emailPlaceholder: 'Seu melhor e-mail comercial',
};

export const CHANNELS = [
  {
    id: 'telefone',
    title: 'Telefone',
    badge: 'Voz Neural',
    description: 'Atenda no primeiro toque com ligação em tempo real, voz natural em português brasileiro, zero pausas e latência inferior a 450ms.',
    details: 'Integração com 0800, DDDs locais de todo o Brasil e PABX SIP existente.',
    icon: 'PhoneCall',
  },
  {
    id: 'whatsapp',
    title: 'WhatsApp',
    badge: 'API Oficial Meta',
    description: 'Responda na hora com áudio e texto, envie catálogos, botões interativos e links de agendamento ou Pix.',
    details: 'Sem risco de bloqueio de chip. Homologado na Meta Cloud API Oficial.',
    icon: 'MessageSquare',
  },
  {
    id: 'webchat',
    title: 'Webchat',
    badge: 'Widget Inteligente',
    description: 'Atenda no seu próprio site com a mesma inteligência, contexto unificado e transbordo humano instantâneo.',
    details: 'Instalação com 1 linha de código JavaScript ou plugin simples.',
    icon: 'Globe',
  },
  {
    id: 'email-crm',
    title: 'E-mail IA & CRM',
    badge: 'BETA',
    description: 'Triagem automática de mensagens recebidas por e-mail, criação de tickets e atualização de status no seu CRM.',
    details: 'Sincronização bidirecional com HubSpot, RD Station e Salesforce.',
    icon: 'Mail',
  },
];

export const TIMELINE_STEPS = [
  {
    time: '00:03',
    title: 'Atende no primeiro segundo',
    description: 'Sem musiquinha de espera ou menus infinitos. O cliente é acolhido com simpatia imediata.',
  },
  {
    time: '00:15',
    title: 'Entende o que a pessoa quer',
    description: 'Processamento de linguagem natural em português com sotaques regionais e capacidade de ouvir interrupções.',
  },
  {
    time: '00:30',
    title: 'Resolve ali mesmo',
    description: 'Consulta tabelas, tira dúvidas sobre serviços, verifica disponibilidade na agenda e passa valores.',
  },
  {
    time: '00:45',
    title: 'Se for urgente, avisa alguém',
    description: 'Identifica prioridade ou casos sensíveis e transfere para o atendente humano com resumo prévio.',
  },
  {
    time: '01:00',
    title: 'Tudo documentado',
    description: 'Gravação, transcrição completa, resumo dos pontos acordados e dados sincronizados no seu CRM.',
  },
];

export const THREE_STEPS = [
  {
    step: '01',
    title: 'Escolha o tom e a voz',
    description: 'Defina o sotaque, a personalidade e como sua assistente cumprimenta quem entra em contato com sua empresa.',
    tag: 'Personalização Instantânea',
  },
  {
    step: '02',
    title: 'Alimente com dados',
    description: 'Envie links do seu site, PDFs de catálogo, perguntas frequentes e conecte a agenda do Google ou CRM.',
    tag: 'Base de Conhecimento Segura',
  },
  {
    step: '03',
    title: 'Ative os números',
    description: 'Conecte seu WhatsApp oficial, porte seu número fixo, adquira um novo DDD ou ligue via ramal SIP.',
    tag: 'Pronto em 5 minutos',
  },
];

export const NICHES = [
  {
    id: 'saude',
    name: 'Clínicas & Consultórios',
    tagline: 'Agendamentos 24h, confirmação de consultas e triagem humanizada',
    description: 'Atenda pacientes a qualquer hora do dia ou da noite. A Vocalis consulta sua agenda em tempo real, verifica convênios médicos, marca e remarca consultas e envia lembretes para zerar o no-show.',
    icon: 'Stethoscope',
    metrics: [
      { label: 'Redução de faltas (no-show)', value: '-78%' },
      { label: 'Consultas agendadas após as 18h', value: '41%' },
    ],
  },
  {
    id: 'imobiliario',
    name: 'Imobiliárias & Corretores',
    tagline: 'Qualificação imediata de leads e agendamento de visitas',
    description: 'Quem procura imóvel quer resposta rápida. A Vocalis qualifica perfil (compra ou locação, faixa de preço, bairro desejado), agenda visitas presenciais com o corretor responsável e salva o lead no CRM.',
    icon: 'Building2',
    metrics: [
      { label: 'Tempo de primeira resposta', value: '< 10s' },
      { label: 'Aumento na conversão de leads', value: '+3.2x' },
    ],
  },
  {
    id: 'juridico',
    name: 'Escritórios de Advocacia',
    tagline: 'Triagem jurídica sigilosa e agendamento de reuniões',
    description: 'Capte potenciais clientes sem interromper o trabalho dos advogados. A Vocalis faz a triagem inicial da área do direito (trabalhista, cível, tributário), coleta informações básicas e agenda consulta inicial.',
    icon: 'Scale',
    metrics: [
      { label: 'Leads qualificados retidos', value: '94%' },
      { label: 'Economia de horas de triagem/mês', value: '62h' },
    ],
  },
  {
    id: 'varejo',
    name: 'E-commerce & Varejo',
    tagline: 'Rastreio de pedidos, tira-dúvidas e recuperação de vendas',
    description: 'Integre com seu ERP para informar status de entrega, tirar dúvidas sobre tamanhos e prazos, além de contatar clientes que abandonaram o carrinho com condições especiais.',
    icon: 'ShoppingBag',
    metrics: [
      { label: 'Resoluções no primeiro contato', value: '88%' },
      { label: 'Recuperação de carrinho via WhatsApp', value: '23%' },
    ],
  },
  {
    id: 'servicos',
    name: 'Empresas de Serviços & Manutenção',
    tagline: 'Orçamentos rápidos, agendamento de visitas técnicas e plantão',
    description: 'Para assistência técnica, instaladores, oficinas e empresas de reformas. A IA coleta dados do serviço, solicita fotos ou localização e despacha ordens de serviço.',
    icon: 'Wrench',
    metrics: [
      { label: 'Chamados abertos sem espera', value: '100%' },
      { label: 'Tempo médio de despacho técnico', value: '-65%' },
    ],
  },
  {
    id: 'financeiro',
    name: 'Cobrança Amigável & Lembretes',
    tagline: 'Avisos preventivos de vencimento e envio de Pix na hora',
    description: 'Ligue de forma educada e empática lembrando do vencimento de faturas, negocie parcelamentos e envie a chave Pix ou linha digitável por WhatsApp durante a ligação.',
    icon: 'Banknote',
    metrics: [
      { label: 'Taxa de recuperação em D+3', value: '+47%' },
      { label: 'Custo por contato efetivo', value: '-82%' },
    ],
  },
];

export const INTEGRATIONS_LIST = [
  {
    id: 'google-cal',
    name: 'Google Calendar',
    category: 'Agendamentos',
    desc: 'Consulta horários livres, agenda reuniões e sincroniza calendários da equipe.',
    badge: 'Popular',
  },
  {
    id: 'whatsapp-meta',
    name: 'WhatsApp Cloud API',
    category: 'Mensageria',
    desc: 'Conexão oficial da Meta para envio de mensagens, áudios e catálogos.',
    badge: 'Oficial',
  },
  {
    id: 'hubspot',
    name: 'HubSpot',
    category: 'CRM & Vendas',
    desc: 'Criação automática de contatos, negócios e notas com transcrição das chamadas.',
    badge: 'Nativo',
  },
  {
    id: 'rdstation',
    name: 'RD Station',
    category: 'CRM & Vendas',
    desc: 'Envio de leads qualificados e atualização de etapas do funil de vendas.',
    badge: 'Brasil',
  },
  {
    id: 'pipedrive',
    name: 'Pipedrive',
    category: 'CRM & Vendas',
    desc: 'Alimentação do funil de vendas com status de qualificação e tarefas atribuídas.',
    badge: 'Nativo',
  },
  {
    id: 'stripe',
    name: 'Stripe',
    category: 'Financeiro',
    desc: 'Geração de links de pagamento e verificação de faturas em aberto durante o contato.',
    badge: 'Global',
  },
  {
    id: 'webhooks',
    name: 'Webhooks & API REST',
    category: 'Desenvolvedores',
    desc: 'Dispare ações em qualquer ERP, sistema próprio ou automação via n8n / Zapier.',
    badge: 'Flexível',
  },
  {
    id: 'sip-telecom',
    name: 'PABX SIP & 0800',
    category: 'Telefonia',
    desc: 'Conecte ramais Asterisk, FreePBX, Zadarma ou operadoras nacionais.',
    badge: 'Telecom',
  },
];

export const PRICING_PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    badge: 'Para Iniciar',
    priceMonthly: 290,
    priceYearly: 232,
    description: 'Ideal para profissionais autônomos, consultórios individuais e pequenos comércios.',
    features: [
      '1 Assistente de Voz Neural dedicado',
      '300 minutos de chamadas incluídos/mês',
      'Atendimento WhatsApp Oficial (Meta Cloud)',
      'Integração com Google Calendar',
      'Transcrição e resumos em tempo real',
      'Suporte padrão por WhatsApp',
    ],
    cta: 'Começar Agora',
    popular: false,
  },
  {
    id: 'pro',
    name: 'Profissional',
    badge: 'Mais Escolhido',
    priceMonthly: 690,
    priceYearly: 552,
    description: 'Para empresas com fluxo ativo de clientes buscando escala e produtividade máxima.',
    features: [
      '3 Assistentes de Voz Neural configuráveis',
      '1.000 minutos de chamadas incluídos/mês',
      'WhatsApp + Webchat com contexto unificado',
      'Integração com CRM (HubSpot, RD Station, Pipedrive)',
      'Transferência e transbordo humanizado ao vivo',
      'Clonagem da voz da sua marca',
      'Suporte prioritário com gerente de conta',
    ],
    cta: 'Criar Assistente Pro',
    popular: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    badge: 'Grandes Operações',
    priceMonthly: 'Sob Consulta',
    priceYearly: 'Sob Consulta',
    description: 'Para clínicas com múltiplos especialistas, redes imobiliárias e centrais de atendimento.',
    features: [
      'Assistentes ilimitados por departamento',
      'Minutos sob demanda com tarifas reduzidas',
      'Conexão com PABX SIP corporativo e números 0800',
      'Base de conhecimento RAG dedicada e isolada',
      'SLA de 99,9% garantido em contrato',
      'Treinamento e onboarding presencial/remoto da equipe',
    ],
    cta: 'Falar com Especialista',
    popular: false,
  },
];

export const GUARANTEES = [
  {
    title: '30 dias de teste sem risco',
    description: 'Você testa a Vocalis em operação real. Se não economizar tempo ou não aprovar a voz e os agendamentos, o cancelamento é livre e sem burocracia.',
    badge: '30 Dias',
  },
  {
    title: 'LGPD & Segurança Corporativa',
    description: 'Transmissão criptografada ponta a ponta (TLS 1.3), servidores protegidos e total conformidade com a Lei Geral de Proteção de Dados.',
    badge: 'LGPD',
  },
  {
    title: 'Você no controle absoluto',
    description: 'Defina limites de orçamento, regras de transbordo e pause o assistente com 1 clique a qualquer momento.',
    badge: 'Total Controle',
  },
];

export const FAQS = [
  {
    q: 'Como funciona a voz da Vocalis? Parece um robô daqueles chatos?',
    a: 'Não! A Vocalis utiliza redes neurais generativas treinadas no sotaque brasileiro. Ela respira, usa entonação adequada, entende interrupções e responde em menos de 450 milissegundos. Mais de 90% das pessoas não percebem que estão conversando com uma IA.'
  },
  {
    q: 'Posso usar meu número de telefone e WhatsApp atual?',
    a: 'Sim! Você pode conectar seu número fixo existente, configurar um ramal no seu PABX virtual (SIP) ou conectar sua linha de WhatsApp oficial (Meta Cloud API). Também oferecemos números novos com DDD de qualquer estado do Brasil e números 0800.'
  },
  {
    q: 'E se o cliente fizer uma pergunta difícil ou quiser falar com um humano?',
    a: 'A Vocalis faz o transbordo imediato. Ela pode transferir a ligação para o telefone de um atendente ou transferir o chamado no WhatsApp, repassando o resumo de tudo o que foi falado para o atendente não precisar fazer as mesmas perguntas.'
  },
  {
    q: 'Como ela se conecta à agenda da minha empresa?',
    a: 'A Vocalis possui integração nativa com Google Calendar, Outlook, Doctoralia, Feegow, Hotmart, HubSpot, Pipedrive e RD Station, além de Webhooks para sistemas próprios.'
  },
  {
    q: 'Quanto tempo leva para colocar no ar?',
    a: 'Você consegue criar e testar seu primeiro assistente em menos de 5 minutos. Basta dar um nome, definir a voz, colar as informações da sua empresa e fazer uma chamada de teste gratuita.'
  }
];

export const COMPARISONS = [
  {
    feature: 'Velocidade de atendimento',
    vocalis: 'Imediato (< 450ms) sem filas',
    oldBot: 'Lento (menu de opções 1, 2, 3)',
    human: 'Depende de disponibilidade na fila',
  },
  {
    feature: 'Atendimento por voz no telefone',
    vocalis: 'Sim, voz humana e sotaque natural',
    oldBot: 'Voz robótica sintetizada ou inexistente',
    human: 'Sim, mas com alto custo de escala',
  },
  {
    feature: 'Disponibilidade horária',
    vocalis: '24 horas por dia, 7 dias por semana',
    oldBot: '24h (mas limitado a botões)',
    human: 'Geralmente 8h às 18h em dias úteis',
  },
  {
    feature: 'Capacidade de ligações simultâneas',
    vocalis: 'Ilimitada (atende 100 ao mesmo tempo)',
    oldBot: 'Inexistente para ligações de voz',
    human: '1 chamada por atendente',
  },
  {
    feature: 'Atualização do CRM & Agenda',
    vocalis: 'Instantânea e 100% preenchida',
    oldBot: 'Apenas campos básicos de texto',
    human: 'Depende de preenchimento manual',
  },
  {
    feature: 'Custo médio por atendimento',
    vocalis: '~ R$ 0,80 por conversa completa',
    oldBot: 'Baixo, porém com alta rejeição do cliente',
    human: 'R$ 15,00 a R$ 28,00 por atendimento CLT',
  },
];

export const PRIVACY_POLICY = {
  title: 'Política de privacidade',
  subtitle: 'Como a Vocalis coleta, usa, compartilha e protege dados pessoais, conforme a LGPD.',
  company: 'VOCALIS TECNOLOGIA LTDA',
  updatedAt: '23 de outubro de 2026',
  sections: [
    {
      id: 'controlador',
      title: 'Quem é o controlador',
      items: [
        'Dados de visitantes e novos clientes: a Vocalis é a controladora.',
        'Dados de quem liga ou escreve para um cliente da Vocalis: o cliente é o controlador e a Vocalis atua como operadora, seguindo as instruções do acordo de proteção de dados.'
      ]
    },
    {
      id: 'dados-tratados',
      title: 'Dados que tratamos',
      table: [
        { categoria: 'Cadastro', exemplos: 'Nome, e-mail, telefone, empresa', finalidade: 'Criar conta e faturar a conta' },
        { categoria: 'Faturamento', exemplos: 'CPF/CNPJ e endereço de cobrança', finalidade: 'Emitir notas fiscais e cobrar faturas' },
        { categoria: 'Uso da plataforma', exemplos: 'Registros de acesso, configurações', finalidade: 'Segurança, suporte técnico e melhoria do serviço' },
        { categoria: 'Chamadas atendidas', exemplos: 'Número de telefone, transcrição, gravação de áudio e resumo', finalidade: 'Prestar o atendimento contratado pelo cliente' },
        { categoria: 'Chat', exemplos: 'Conversas de WhatsApp e Webchat', finalidade: 'Funcionamento do assistente e repasse ao cliente' },
      ]
    },
    {
      id: 'bases-legais',
      title: 'Bases legais',
      content: 'Execução de contrato, cumprimento de obrigações legais, legítimo interesse (por exemplo, prevenção a fraudes) e consentimento quando exigido - como para cookies não essenciais.'
    },
    {
      id: 'compartilhamento',
      title: 'Compartilhamento de fornecedores',
      content: 'Compartilhamos dados apenas com fornecedores necessários à operação, sob contrato e com medidas de segurança. Não vendemos dados pessoais. Subprocessadores atuais:',
      suppliers: [
        { fornecedor: 'Retell', finalidade: 'Orquestragem de plataforma e voz neural', local: 'EUA' },
        { fornecedor: 'ElevenLabs', finalidade: 'Modelos de IA generativa de voz', local: 'EUA' },
        { fornecedor: 'Twilio / Infobip', finalidade: 'Infraestrutura de telecomunicações e números', local: 'EUA / Brasil' },
        { fornecedor: 'Meta Platforms', finalidade: 'Envio e recebimento de mensagens no WhatsApp Cloud API', local: 'EUA' },
        { fornecedor: 'Stripe / Asaas', finalidade: 'Pagamentos e verificação de faturamento', local: 'EUA / Brasil' },
        { fornecedor: 'Supabase / AWS', finalidade: 'Banco de dados, autenticação e armazenamento seguro', local: 'EUA / Brasil' },
      ]
    },
    {
      id: 'direitos-dpo',
      title: 'Seus direitos e Encarregado de Dados (DPO)',
      content: 'Você pode solicitar confirmação de tratamento, acesso, correção, anonimização, portabilidade, eliminação e revogação de consentimento. Para exercer seus direitos, entre em contato com nosso DPO:',
      dpoEmail: 'dpo@vocalis.ai'
    },
    {
      id: 'seguranca',
      title: 'Segurança e criptografia',
      content: 'Usamos criptografia em trânsito (TLS 1.3), criptografia em repouso (AES-256), controles de acesso restrito e registros de auditoria.'
    }
  ]
};

export const TERMS_OF_SERVICE = {
  title: 'Termos e condições',
  subtitle: 'Regras de uso da plataforma Vocalis: contratação, créditos, responsabilidades e encerramento.',
  company: 'VOCALIS TECNOLOGIA LTDA',
  version: 'Versão 1.0, vigente desde 23 de outubro de 2026',
  sections: [
    {
      num: '1',
      title: 'Aceite',
      content: 'Ao criar uma conta em Criar conta ou usar qualquer recurso da plataforma, você declara ter lido e aceitado estes Termos, a Política de privacidade e o Acordo de proteção de dados. Se você contrata em nome de uma empresa, declara ter poderes para representá-la.'
    },
    {
      num: '2',
      title: 'Conta e acesso',
      content: 'Cada organização tem um ou mais usuários com papéis definidos em Usuários. Você é responsável por manter as credenciais em sigilo e por toda atividade realizada na sua conta. Informações cadastrais e de faturamento devem ser verdadeiras e mantidas atualizadas.'
    },
    {
      num: '3',
      title: 'Planos, créditos e pagamento',
      content: 'Os planos e os valores vigentes estão em Planos. Consumo de minutos, mensagens e números é registrado no painel. As assinaturas renovam automaticamente no fim de cada ciclo, salvo cancelamento antes da renovação. O pagamento é feito por cartão de crédito ou Pix.'
    },
    {
      num: '4',
      title: 'Uso aceitável',
      content: 'Você concorda em não usar a Vocalis para: realizar ligações ou enviar mensagens sem base legal ou em desacordo com regras de telemarketing; se passar por ou ocultar que o atendimento é feito por um assistente de IA quando a lei exigir; tratar dados sensíveis sem base legal; ou burlar limites técnicos.'
    },
    {
      num: '5',
      title: 'Conteúdo do cliente e respostas da IA',
      content: 'Prompts, bases de conhecimento, gravações e transcrições pertencem ao cliente. A Vocalis trata esse conteúdo apenas para prestar o serviço, conforme o Acordo de proteção de dados. Respostas geradas por IA podem conter imprecisões; o cliente deve revisar regras e prompts.'
    },
    {
      num: '6',
      title: 'Disponibilidade e suporte',
      content: 'A Vocalis empenha todos os esforços para manter a plataforma disponível 99,9% do tempo, exceto em manutenções programadas ou falhas fora do seu controle (por exemplo, falhas de operadoras de telefonia). O suporte é prestado pelos canais indicados na Central de ajuda.'
    },
    {
      num: '7',
      title: 'Responsabilidade',
      content: 'Na extensão permitida pela lei, a responsabilidade total da Vocalis fica limitada aos valores pagos pelo cliente nos 12 meses anteriores ao evento. Nada nestes Termos limita direitos garantidos pelo Código de Defesa do Consumidor quando aplicável.'
    },
    {
      num: '8',
      title: 'Encerramento',
      content: 'Você pode cancelar a qualquer momento em Faturamento. A Vocalis pode suspender contas que violem estes Termos, mediante aviso quando possível.'
    },
    {
      num: '9',
      title: 'Lei aplicável e foro',
      content: 'Aplica-se a legislação brasileira. Para dirimir quaisquer litígios, fica eleito o foro da comarca da sede da Vocalis ou o foro do domicílio do consumidor.'
    }
  ]
};
