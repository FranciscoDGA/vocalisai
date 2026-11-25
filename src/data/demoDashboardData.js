import { formatDuration } from '../utils/durationUtils';

export const DEMO_WORKSPACE_NOTICE =
  'Ambiente de demonstração — dados fictícios. Nenhuma alteração é salva em conta real, nem dispara chamadas, mensagens ou cobranças.';

export const DEMO_WORKSPACE = {
  id: 'demo-workspace-ilustrativo',
  name: 'Empresa Modelo (Demo)',
  initials: 'EM',
  userName: 'Visitante (Demo)',
  userEmail: 'demo@empresa-exemplo.invalid',
  roleLabel: 'Demonstração Ilustrativa',
  cnpj: '00.000.000/0001-00 (exemplo fictício)',
  supportPhoneLabel: '(00) 90000-0100 (Número fictício)',
};

export const DEMO_ASSISTANTS = [
  {
    id: 'demo-ast-voz-01',
    name: 'Clara (Voz — Demo)',
    role: 'Recepção Telefônica (Ilustrativo)',
    type: 'Atendimento por Voz',
    channel: 'voz',
    unitLabel: 'ligações',
    status: 'Simulação Ativa',
    calls: 4,
    accuracy: '97.4%',
    avgTime: '01:28',
    voice: 'Voz feminina sintética PT-BR (Exemplo)',
    voiceName: 'Voz feminina sintética PT-BR (Exemplo)',
    model: 'Simulação demonstrativa local',
    greeting:
      'Olá! Você está ouvindo uma simulação demonstrativa da Clara, recepcionista virtual da Empresa Modelo.',
    prompt:
      'Exemplo ilustrativo de recepção para triagem de agendamentos em clínica fictícia, sem acesso a sistemas reais.',
    tools: ['Simulação local'],
    isLocal: true,
    isDemo: true,
    vapi_id: null,
  },
  {
    id: 'demo-ast-wa-01',
    name: 'Sofia (WhatsApp — Demo)',
    role: 'Triagem WhatsApp (Ilustrativo)',
    type: 'WhatsApp',
    channel: 'whatsapp',
    unitLabel: 'conversas',
    status: 'Simulação Ativa',
    calls: 3,
    accuracy: '98.1%',
    avgTime: '01:05',
    voice: 'Chat Automático (Exemplo)',
    voiceName: 'Chat Automático (Exemplo)',
    model: 'Simulação demonstrativa local',
    greeting:
      'Olá! Aqui é a Sofia (ambiente demonstrativo — dados fictícios). Como posso simular um atendimento hoje?',
    prompt:
      'Exemplo ilustrativo de pré-qualificação no WhatsApp com transferência para atendimento humano.',
    tools: ['Simulação local'],
    isLocal: true,
    isDemo: true,
    vapi_id: null,
  },
  {
    id: 'demo-ast-web-01',
    name: 'Mateus (Webchat — Demo)',
    role: 'Atendimento no Site (Ilustrativo)',
    type: 'Webchat',
    channel: 'webchat',
    unitLabel: 'atendimentos',
    status: 'Simulação Ativa',
    calls: 2,
    accuracy: '96.5%',
    avgTime: '01:32',
    voice: 'Chat Web (Exemplo)',
    voiceName: 'Chat Web (Exemplo)',
    model: 'Simulação demonstrativa local',
    greeting:
      'Olá! Sou o Mateus, exemplo ilustrativo de webchat para qualificação de visitantes.',
    prompt:
      'Responde dúvidas simuladas sobre planos ilustrativos e coleta pedido de contato sem envio externo.',
    tools: ['Simulação local'],
    isLocal: true,
    isDemo: true,
    vapi_id: null,
  },
];

export const DEMO_CONVERSATIONS = [
  {
    id: 'demo-conv-01',
    lead: 'Paciente Exemplo 01 (Fictício)',
    phone: '(00) 90000-0101',
    assistant: 'Clara (Voz — Demo)',
    channel: 'voz',
    type: 'Ligação (Demo)',
    durationSeconds: 63,
    duration: formatDuration(63),
    status: 'Simulado',
    statusColor: 'text-indigo-700 bg-indigo-50',
    time: 'Hoje, 10:15',
    cost: 'Simulado',
    sentiment: 'Neutro/Positivo',
    transcript:
      '[EXEMPLO FICTÍCIO]\nClara: Olá! Empresa Modelo, bom dia.\nVisitante: Gostaria de verificar horários ilustrativos de consulta.\nClara: Claro! No ambiente real este fluxo consulta a agenda configurada.',
  },
  {
    id: 'demo-conv-02',
    lead: 'Contato Exemplo 02 (Fictício)',
    phone: '(00) 90000-0102',
    assistant: 'Clara (Voz — Demo)',
    channel: 'voz',
    type: 'Ligação (Demo)',
    durationSeconds: 118,
    duration: formatDuration(118),
    status: 'Simulado',
    statusColor: 'text-indigo-700 bg-indigo-50',
    time: 'Hoje, 09:40',
    cost: 'Simulado',
    sentiment: 'Positivo',
    transcript:
      '[EXEMPLO FICTÍCIO]\nClara: Atendimento demonstrativo de voz. Dúvida encaminhada para equipe humana fictícia.',
  },
  {
    id: 'demo-conv-03',
    lead: 'Empresa Fictícia Alfa',
    phone: '(00) 90000-0103',
    assistant: 'Clara (Voz — Demo)',
    channel: 'voz',
    type: 'Ligação (Demo)',
    durationSeconds: 59,
    duration: formatDuration(59),
    status: 'Transferência (Demo)',
    statusColor: 'text-amber-700 bg-amber-50',
    time: 'Ontem, 17:20',
    cost: 'Simulado',
    sentiment: 'Neutro',
    transcript:
      '[EXEMPLO FICTÍCIO]\nClara: Como se trata de dúvida sensível, encaminhei para o atendente humano responsável.',
  },
  {
    id: 'demo-conv-04',
    lead: 'Cliente Exemplo 04 (Fictício)',
    phone: '(00) 90000-0104',
    assistant: 'Clara (Voz — Demo)',
    channel: 'voz',
    type: 'Ligação (Demo)',
    durationSeconds: 112,
    duration: formatDuration(112),
    status: 'Simulado',
    statusColor: 'text-indigo-700 bg-indigo-50',
    time: 'Ontem, 15:05',
    cost: 'Simulado',
    sentiment: 'Positivo',
    transcript:
      '[EXEMPLO FICTÍCIO]\nClara: Registro fictício de confirmação de endereço e horário de funcionamento.',
  },
  {
    id: 'demo-conv-05',
    lead: 'Contato WhatsApp Exemplo 01',
    phone: '(00) 90000-0105',
    assistant: 'Sofia (WhatsApp — Demo)',
    channel: 'whatsapp',
    type: 'WhatsApp (Demo)',
    durationSeconds: 75,
    duration: formatDuration(75),
    status: 'Simulado',
    statusColor: 'text-indigo-700 bg-indigo-50',
    time: 'Hoje, 11:02',
    cost: 'Simulado',
    sentiment: 'Positivo',
    transcript:
      '[EXEMPLO FICTÍCIO]\nSofia: Exemplo de mensagem de boas-vindas e triagem no WhatsApp.',
  },
  {
    id: 'demo-conv-06',
    lead: 'Contato WhatsApp Exemplo 02',
    phone: '(00) 90000-0106',
    assistant: 'Sofia (WhatsApp — Demo)',
    channel: 'whatsapp',
    type: 'WhatsApp (Demo)',
    durationSeconds: 60,
    duration: formatDuration(60),
    status: 'Simulado',
    statusColor: 'text-indigo-700 bg-indigo-50',
    time: 'Ontem, 18:10',
    cost: 'Simulado',
    sentiment: 'Positivo',
    transcript:
      '[EXEMPLO FICTÍCIO]\nSofia: Simulação de envio de link demonstrativo de orçamento.',
  },
  {
    id: 'demo-conv-07',
    lead: 'Contato WhatsApp Exemplo 03',
    phone: '(00) 90000-0107',
    assistant: 'Sofia (WhatsApp — Demo)',
    channel: 'whatsapp',
    type: 'WhatsApp (Demo)',
    durationSeconds: 60,
    duration: formatDuration(60),
    status: 'Simulado',
    statusColor: 'text-indigo-700 bg-indigo-50',
    time: 'Há 2 dias',
    cost: 'Simulado',
    sentiment: 'Neutro',
    transcript:
      '[EXEMPLO FICTÍCIO]\nSofia: Simulação de qualificação de lead encerrada.',
  },
  {
    id: 'demo-conv-08',
    lead: 'Visitante Site Exemplo 01',
    phone: '(00) 90000-0108',
    assistant: 'Mateus (Webchat — Demo)',
    channel: 'webchat',
    type: 'Webchat (Demo)',
    durationSeconds: 95,
    duration: formatDuration(95),
    status: 'Simulado',
    statusColor: 'text-indigo-700 bg-indigo-50',
    time: 'Hoje, 08:45',
    cost: 'Simulado',
    sentiment: 'Positivo',
    transcript:
      '[EXEMPLO FICTÍCIO]\nMateus: Exemplo de atendimento em widget no site para coleta de contato.',
  },
  {
    id: 'demo-conv-09',
    lead: 'Visitante Site Exemplo 02',
    phone: '(00) 90000-0109',
    assistant: 'Mateus (Webchat — Demo)',
    channel: 'webchat',
    type: 'Webchat (Demo)',
    durationSeconds: 89,
    duration: formatDuration(89),
    status: 'Simulado',
    statusColor: 'text-indigo-700 bg-indigo-50',
    time: 'Há 3 dias',
    cost: 'Simulado',
    sentiment: 'Positivo',
    transcript:
      '[EXEMPLO FICTÍCIO]\nMateus: Simulação de esclarecimento inicial de dúvidas no site.',
  },
];

export const DEMO_NUMBERS = [
  {
    id: 'demo-num-01',
    number: '+55 (00) 90000-0101 (Fictício)',
    assistant: 'Clara (Voz — Demo)',
    type: 'Linha Simulada (Demo)',
    status: 'Demonstração',
    carrier: 'Número ilustrativo (sem DDD ativo)',
  },
];

export const DEMO_MEMBERS = [
  {
    id: 'demo-mem-01',
    name: 'Visitante (Demo)',
    email: 'demo@empresa-exemplo.invalid',
    role: 'Administrador (Demo)',
    status: 'Ilustrativo',
  },
  {
    id: 'demo-mem-02',
    name: 'Ana Paula (Exemplo)',
    email: 'equipe@empresa-exemplo.invalid',
    role: 'Operador (Demo)',
    status: 'Ilustrativo',
  },
];

export const DEMO_KNOWLEDGE_ITEMS = [
  {
    id: 'demo-kb-01',
    title: 'tabela-servicos-exemplo.pdf (Fictício)',
    type: 'PDF ilustrativo',
    chunks: 14,
    updatedAt: 'Exemplo local',
  },
  {
    id: 'demo-kb-02',
    title: 'horarios-atendimento-exemplo.txt (Fictício)',
    type: 'Texto ilustrativo',
    chunks: 4,
    updatedAt: 'Exemplo local',
  },
];

export const DEMO_API_KEYS = [
  {
    id: 'demo-key-01',
    name: 'Chave Ilustrativa (Somente leitura demo)',
    key: 'voc_demo_exemplo_nao_operacional_0001',
    created: 'Demonstração',
    lastUsed: 'Sem uso em produção',
  },
];

export function buildDemoMetricsSummary(conversations = DEMO_CONVERSATIONS, assistants = DEMO_ASSISTANTS, members = DEMO_MEMBERS, numbers = DEMO_NUMBERS) {
  const totalInteractions = conversations.length;
  const totalSeconds = conversations.reduce((acc, item) => acc + (Number(item.durationSeconds) || 0), 0);
  const avgDurationSeconds = totalInteractions > 0 ? Math.round(totalSeconds / totalInteractions) : 0;

  return {
    totalInteractions,
    totalSeconds,
    avgDurationFormatted: formatDuration(avgDurationSeconds),
    assistantsCount: assistants.length,
    membersCount: members.length,
    numbersCount: numbers.length,
    voiceCount: conversations.filter((c) => c.channel === 'voz').length,
    whatsappCount: conversations.filter((c) => c.channel === 'whatsapp').length,
    webchatCount: conversations.filter((c) => c.channel === 'webchat').length,
  };
}
