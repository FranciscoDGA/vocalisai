// Official Kloel / Vocalis Pricing Data matching user screenshots 1:1

export const PRICING_CHANNELS = {
  telefone: {
    id: 'telefone',
    name: 'Assistente telefônico IA',
    icon: 'Phone',
    plans: [
      {
        id: 'solo',
        name: 'Solo',
        tagline: 'Até 20 ligações ao dia',
        badge: null,
        priceRegularMonthly: 719,
        pricePromoMonthly: 503,
        priceRegularYearly: 575,
        pricePromoYearly: 402,
        afterPromoText: 'depois R$ 719/mês',
        cta: 'Começar com o Solo',
        ctaStyle: 'dark',
        included: [
          '1.500 minutos equivalem a ~500 ligações/mês',
          '1 chamada simultânea',
          '1 número de telefone incluso nacional',
          '4 Assistentes',
          '1 Usuário'
        ],
        features: [
          '120+ vozes',
          '60+ idiomas',
          'Agendador integrado'
        ]
      },
      {
        id: 'team',
        name: 'Team',
        tagline: 'De 20 a 100 ligações ao dia',
        badge: 'MAIS ESCOLHIDO',
        priceRegularMonthly: 2159,
        pricePromoMonthly: 1511,
        priceRegularYearly: 1727,
        pricePromoYearly: 1209,
        afterPromoText: 'depois R$ 2.159/mês',
        cta: 'Começar com o Team',
        ctaStyle: 'terracotta',
        highlight: true,
        included: [
          '3.600 minutos equivalem a ~1.200 ligações/mês',
          '3 chamadas simultâneas',
          '2 números de telefone incluso nacional',
          '∞ Assistentes',
          '∞ usuários'
        ],
        features: [
          'Tudo do plano Solo',
          'Tronco SIP dedicado',
          'Equipe de suporte'
        ]
      },
      {
        id: 'scale',
        name: 'Scale',
        tagline: 'Mais de 100 ligações por dia',
        badge: null,
        isCustom: true,
        prefixText: 'a partir de',
        priceRegularMonthly: 3599,
        pricePromoMonthly: 2519,
        priceRegularYearly: 2879,
        pricePromoYearly: 2015,
        afterPromoText: 'desconto aplicado na proposta',
        cta: 'Configurar plano',
        ctaStyle: 'dark',
        included: [
          'A partir de 6.000 minutos/mês',
          'Chamadas simultâneas ilimitadas',
          'Sem limite de uso por minuto',
          '∞ Assistentes',
          '∞ usuários'
        ],
        features: [
          'Tudo do plano Team',
          'Voz personalizada',
          'Zero retenção de dados',
          'E mais'
        ]
      }
    ]
  },

  whatsapp: {
    id: 'whatsapp',
    name: 'IA de WhatsApp',
    icon: 'MessageCircle',
    plans: [
      {
        id: 'solo',
        name: 'Solo',
        tagline: 'Até 450 conversas por mês',
        badge: null,
        priceRegularMonthly: 499,
        pricePromoMonthly: 349,
        priceRegularYearly: 399,
        pricePromoYearly: 279,
        afterPromoText: 'depois R$ 499/mês',
        cta: 'Começar com o Solo',
        ctaStyle: 'dark',
        included: [
          '450 conversas por mês',
          '1 número de WhatsApp (+R$ 119/mês por número extra)',
          'Assistentes ilimitados',
          '1 Usuário'
        ],
        features: [
          'Transferência para humano',
          'Agendamento automatizado'
        ]
      },
      {
        id: 'team',
        name: 'Team',
        tagline: 'Até 2.000 conversas por mês',
        badge: 'MAIS ESCOLHIDO',
        priceRegularMonthly: 1999,
        pricePromoMonthly: 1399,
        priceRegularYearly: 1599,
        pricePromoYearly: 1119,
        afterPromoText: 'depois R$ 1.999/mês',
        cta: 'Começar com o Team',
        ctaStyle: 'terracotta',
        highlight: true,
        included: [
          '2.000 conversas/mês',
          '3 números de WhatsApp (+R$ 119/mês por número extra)',
          'Assistentes ilimitados',
          '∞ usuários'
        ],
        features: [
          'Tudo do plano Solo',
          'Onboarding'
        ]
      },
      {
        id: 'scale',
        name: 'Scale',
        tagline: 'Ideal a partir de 5.000 conversas/mês',
        badge: null,
        isCustom: true,
        prefixText: 'a partir de',
        priceRegularMonthly: 4499,
        pricePromoMonthly: 3149,
        priceRegularYearly: 3599,
        pricePromoYearly: 2519,
        afterPromoText: 'desconto aplicado na proposta',
        cta: 'Configurar plano',
        ctaStyle: 'dark',
        included: [
          '5.000 conversas/mês',
          'Números de WhatsApp personalizados',
          'Assistentes ilimitados',
          '∞ usuários'
        ],
        features: [
          'Tudo do plano Team',
          'Retenção zero de dados',
          'SLA personalizado'
        ]
      }
    ]
  },

  webchat: {
    id: 'webchat',
    name: 'Webchat de IA',
    icon: 'MessageSquare',
    plans: [
      {
        id: 'solo',
        name: 'Solo',
        tagline: 'Até 100 conversas por mês',
        badge: null,
        priceRegularMonthly: 299,
        pricePromoMonthly: 209,
        priceRegularYearly: 239,
        pricePromoYearly: 167,
        afterPromoText: 'depois R$ 299/mês',
        cta: 'Começar com o Solo',
        ctaStyle: 'dark',
        included: [
          '100 conversas (Até 1.000 mensagens)',
          'Webchats de IA ilimitados',
          '1 Usuário',
          'Com tecnologia da vocalis.ai'
        ],
        features: [
          '60+ idiomas',
          'Personalização visual'
        ]
      },
      {
        id: 'team',
        name: 'Team',
        tagline: 'Até 400 conversas por mês',
        badge: 'MAIS ESCOLHIDO',
        priceRegularMonthly: 899,
        pricePromoMonthly: 629,
        priceRegularYearly: 719,
        pricePromoYearly: 503,
        afterPromoText: 'depois R$ 899/mês',
        cta: 'Começar com o Team',
        ctaStyle: 'terracotta',
        highlight: true,
        included: [
          '400 conversas (Até 4.000 mensagens)',
          'Webchats de IA ilimitados',
          '∞ usuários',
          'Sem marca da Vocalis'
        ],
        features: [
          'Tudo do plano Solo',
          'Envio de PDFs e imagens',
          'Agendamento de compromissos',
          'Transferência para um humano',
          'Exportação de conversas'
        ]
      },
      {
        id: 'scale',
        name: 'Scale',
        tagline: 'Ideal a partir de 3.000 conversas/mês',
        badge: null,
        isCustom: true,
        prefixText: 'a partir de',
        priceRegularMonthly: 2999,
        pricePromoMonthly: 2099,
        priceRegularYearly: 2399,
        pricePromoYearly: 1679,
        afterPromoText: 'desconto aplicado na proposta',
        cta: 'Configurar plano',
        ctaStyle: 'dark',
        included: [
          '2.000+ conversas (20.000+ mensagens)',
          'Webchats de IA ilimitados',
          '∞ usuários',
          'Sem marca da Vocalis'
        ],
        features: [
          'Tudo do plano Team',
          'Contexto da página',
          'Retenção zero de dados',
          'Rastreamento de UTM',
          'SLA individual'
        ]
      }
    ]
  }
};

// Full Comparison Matrix matching Screenshot 1
export const COMPARISON_SECTIONS = [
  {
    category: 'Uso',
    items: [
      { name: 'Minutos inclusos', solo: '1.500', team: '3.600', scale: '6.000+' },
      { name: 'Estimativa de chamadas', solo: '~500', team: '~1.200', scale: 'Personalizado' },
      { name: 'Chamadas simultâneas', solo: '1', team: '3', scale: 'Ilimitadas' },
      { name: 'Ramal / Voz bidirecional', solo: '1', team: 'ilimitado', scale: 'ilimitado' },
      { name: 'Números de telefone inclusos', solo: '1', team: '2', scale: 'Personalizado' },
      { name: 'Integração de calendário', solo: '1', team: '3', scale: 'Personalizado' },
      { name: 'Ligações ativas com webhook', solo: false, team: 'R$ 0,08/min não inclusos', scale: 'R$ 0,08/min não inclusos' },
      { name: 'Integração SIP Trunk', solo: false, team: true, scale: true }
    ]
  },
  {
    category: 'Assistentes',
    items: [
      { name: 'Vozes', solo: '120+', team: '120+', scale: '120+' },
      { name: 'Idiomas', solo: '60+', team: '60+', scale: '60+' },
      { name: 'Voz personalizada', solo: false, team: false, scale: true },
      { name: 'Assistentes', solo: 'Ilimitados', team: 'Ilimitados', scale: 'Ilimitados' }
    ]
  },
  {
    category: 'Telefonia',
    items: [
      { name: 'Número de telefone grátis incluso', solo: true, team: true, scale: true },
      { name: 'Números adicionais sob demanda', solo: true, team: true, scale: true },
      { name: 'Transferência internacional de chamadas', solo: true, team: true, scale: true }
    ]
  },
  {
    category: 'Recursos e configurações',
    items: [
      { name: 'Dados da empresa e de teste na call', solo: true, team: true, scale: true },
      { name: 'Base de conhecimento com sincronização externa', solo: true, team: true, scale: true },
      { name: 'Transferência de chamadas', solo: true, team: true, scale: true },
      { name: 'Agendar chamadas', solo: true, team: true, scale: true },
      { name: 'Reconhecimento preciso de datas e horários', solo: true, team: true, scale: true },
      { name: 'Tons e sotaques', solo: true, team: true, scale: true },
      { name: 'Busca na internet', solo: true, team: true, scale: true },
      { name: 'Ajustar velocidade de fala', solo: true, team: true, scale: true },
      { name: 'Ajustar sensibilidade', solo: true, team: true, scale: true },
      { name: 'Ajustar estabilidade', solo: true, team: true, scale: true },
      { name: 'Ruído de fundo', solo: true, team: true, scale: true },
      { name: 'Reativação inteligente de mensagens curtas', solo: true, team: true, scale: true },
      { name: 'Enviar códigos DTMF', solo: true, team: true, scale: true }
    ]
  },
  {
    category: 'Controle de chamadas e API',
    items: [
      { name: 'Integrações nativas', solo: true, team: true, scale: true },
      { name: 'Webhooks de evento', solo: true, team: true, scale: true },
      { name: 'Repetição de falha numa ligação', solo: true, team: true, scale: true },
      { name: 'Resolução de chamadas rápida', solo: true, team: true, scale: true },
      { name: 'Gravação de variáveis', solo: true, team: true, scale: true }
    ]
  },
  {
    category: 'Operação e suporte',
    items: [
      { name: 'Login único (SSO)', solo: false, team: false, scale: true },
      { name: 'Acordos contratuais personalizados', solo: false, team: false, scale: true },
      { name: 'Academia de integração', solo: false, team: false, scale: true },
      { name: 'SLA individual', solo: false, team: false, scale: true },
      { name: 'Gerente de conta', solo: false, team: false, scale: true },
      { name: 'Acesso à comunidade', solo: true, team: true, scale: true },
      { name: 'Suporte', solo: 'E-mail', team: 'Prioritário', scale: 'Personalizado' }
    ]
  },
  {
    category: 'Plataforma / Outros',
    items: [
      { name: 'Painel principal e estatísticas de uso', solo: true, team: true, scale: true },
      { name: 'Teste de voz grátis', solo: true, team: true, scale: true },
      { name: 'Gravação de ligações', solo: true, team: true, scale: true },
      { name: 'Relatórios de chamadas', solo: true, team: true, scale: true },
      { name: 'IP whitelisting dedicado', solo: false, team: false, scale: true },
      { name: 'Nuvem de aplicação', solo: true, team: true, scale: true }
    ]
  },
  {
    category: 'Complementares',
    items: [
      { name: 'Minutos extras', solo: 'R$ 50 por 100 minutos', team: 'R$ 50 por 100 minutos', scale: 'Personalizado' },
      { name: 'Contatos adicionais', solo: '200 contatos por R$ 20/mês', team: '1.000 contatos por R$ 20/mês', scale: 'Personalizado' },
      { name: 'Preço por número adicional', solo: 'R$ 49/mês', team: 'R$ 49/mês', scale: 'Personalizado' },
      { name: 'Preço por conexão adicional', solo: false, team: 'R$ 49/mês', scale: 'Personalizado' }
    ]
  }
];
