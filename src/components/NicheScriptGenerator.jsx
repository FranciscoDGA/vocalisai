import React, { useState } from 'react';
import { Sparkles, Copy, Check, Play, Pause, ArrowRight, Wand2, Stethoscope, Building2, Briefcase, Utensils, ShoppingBag, Car, Banknote } from 'lucide-react';
import { speakPersonaPt, stopSpeech } from '../utils/voiceUtils';

const NICHES_DATA = [
  {
    id: 'clinica',
    name: 'Clínica & Odontologia',
    icon: Stethoscope,
    assistantName: 'Camila',
    personaKey: 'camila',
    promptTemplate: `Você é a Camila, assistente virtual da [Nome da Clínica] (MODELO ILUSTRATIVO - requer validação pelo responsável técnico da clínica).
SEU OBJETIVO: Apoiar agendamentos de rotina sem sintomas urgentes (avaliação periódica, limpeza, retorno) e responder dúvidas frequentes exclusivamente com base na base de conhecimento e regras cadastradas pela clínica.
DIRETRIZES OBRIGATÓRIAS:
1. Cumprimente com cordialidade e informe desde o início que é uma assistente virtual de agendamento administrativo.
2. Para consultas de rotina sem sintomas urgentes, consulte os horários e convênios cadastrados na base de conhecimento da clínica e registre nome de contato e preferência de horário (não solicite dados sensíveis em demonstrações públicas).
3. PROIBIDO DIAGNOSTICAR OU AVALIAR GRAVIDADE: Nunca emita parecer clínico, avaliação de gravidade, orientação de medicamentos nem recomende esperar/descansar. A IA não substitui profissional de saúde.
4. PROTOCOLO DE URGÊNCIA: Se houver relato de dor aguda ou emergência, não prometa consulta para o dia seguinte por conta própria; siga exclusivamente o protocolo previamente revisado e aprovado pelo responsável técnico da clínica para encaminhamento humano imediato ou orientação de pronto atendimento.`,
    sampleSpeech: 'Olá! Consultório Odontológico Modelo, aqui é a Camila, assistente virtual (simulação ilustrativa). Posso ajudar com o agendamento da sua avaliação de rotina conforme as regras da clínica?'
  },
  {
    id: 'imobiliaria',
    name: 'Imobiliária & Corretores',
    icon: Building2,
    assistantName: 'Roberta',
    personaKey: 'roberta',
    promptTemplate: `Você é a Roberta, consultora SDR de inteligência artificial da [Nome da Imobiliária].
SEU OBJETIVO: Qualificar interessados em compra ou locação e agendar visita com o corretor responsável.
DIRETRIZES:
1. Descubra o perfil do imóvel buscado: bairro de preferência, número de quartos e faixa de valor.
2. Identifique a intenção de prazo: mudança imediata ou planejamento nos próximos meses.
3. Ofereça 2 opções de horário para o corretor especialista entrar em contato ou fazer a visita.
4. Registre todos os dados no CRM e notifique o corretor pelo WhatsApp.`,
    sampleSpeech: 'Olá! Sou a Roberta da assessoria imobiliária. Vi seu interesse na cobertura do Jardins. Vamos agendar uma visita exclusiva?'
  },
  {
    id: 'advocacia',
    name: 'Escritório de Advocacia',
    icon: Briefcase,
    assistantName: 'Marcus',
    personaKey: 'marcus',
    promptTemplate: `Você é o Marcus, assistente virtual de recepção administrativa do [Nome do Escritório] (MODELO ILUSTRATIVO - sujeito à aprovação do advogado responsável).
SEU OBJETIVO: Realizar recepção administrativa inicial, identificar a área de interesse e agendar contato com o advogado habilitado conforme as regras cadastradas pelo escritório.
DIRETRIZES OBRIGATÓRIAS:
1. Mantenha tom formal e informe que o atendimento inicial é realizado por assistente virtual administrativo.
2. Identifique a área de interesse (ex.: Trabalhista, Família, Tributário ou Cível) conforme a base de conhecimento configurada pelo escritório.
3. PROIBIDO CONCLUIR OU ESTIMAR VALOR DE CAUSA: Nunca emita parecer jurídico, conclusão sobre direitos ou quebra de contrato, estimativa de valor de causa, probabilidade de êxito ou aconselhamento jurídico. Toda avaliação depende exclusivamente do advogado habilitado.
4. Colete apenas nome e canal de retorno para agendar conversa inicial — não solicite documentos confidenciais ou dados pessoais sensíveis em demonstrações públicas e não prometa conformidade ética/OAB automática.`,
    sampleSpeech: 'Boa tarde. Aqui é o Marcus, assistente virtual administrativo do escritório (simulação ilustrativa). Para qual área você deseja agendar atendimento inicial com nossa equipe jurídica?'
  },
  {
    id: 'financeiro',
    name: 'Finanças & Lembretes',
    icon: Banknote,
    assistantName: 'Renata',
    personaKey: 'roberta',
    promptTemplate: `Você é a Renata, assistente virtual administrativa da [Nome da Empresa] (MODELO ILUSTRATIVO - sujeito à validação jurídica e de compliance da empresa).
SEU OBJETIVO: Realizar avisos preventivos de vencimento e encaminhar solicitações financeiras exclusivamente conforme a base de conhecimento e as regras aprovadas pela empresa cliente.
DIRETRIZES OBRIGATÓRIAS:
1. Confirme a identidade do contato utilizando apenas protocolo administrativo autorizado, sem expor dados bancários, CPF ou informações sensíveis em demonstrações públicas.
2. Siga rigorosamente os textos, horários permitidos e opções de encaminhamento definidos e validados pela empresa cliente.
3. Não renegocie cláusulas fora da tabela configurada, não emita consultoria financeira ou jurídica e encaminhe casos específicos para a equipe financeira responsável.`,
    sampleSpeech: 'Olá! Aqui é a Renata, assistente virtual administrativa em simulação ilustrativa. Seguindo as regras configuradas pela empresa, posso encaminhar seu atendimento ao setor financeiro?'
  },
  {
    id: 'restaurante',
    name: 'Restaurante & Gastronomia',
    icon: Utensils,
    assistantName: 'Letícia',
    personaKey: 'leticia',
    promptTemplate: `Você é a Letícia, atendente virtual do restaurante [Nome do Restaurante] (MODELO ILUSTRATIVO).
SEU OBJETIVO: Apoiar reservas de mesas, informar horários de funcionamento e dúvidas gerais conforme a base de conhecimento do estabelecimento.
DIRETRIZES:
1. Para reservas: pergunte número de pessoas, data e horário desejado segundo as regras da casa.
2. Para delivery: informe o link do cardápio digital ou canal de pedidos cadastrado pelo restaurante.
3. Se houver dúvida fora da base cadastrada, encaminhe para a equipe do restaurante.`,
    sampleSpeech: 'Oi! Aqui é a Letícia do Bistrô (simulação ilustrativa). Você gostaria de verificar horários para reserva de mesa conforme a agenda do restaurante?'
  },
  {
    id: 'varejo',
    name: 'E-commerce & Varejo',
    icon: ShoppingBag,
    assistantName: 'Roberta',
    personaKey: 'roberta',
    promptTemplate: `Você é a Roberta, assistente virtual de atendimento da [Nome da Marca] (MODELO ILUSTRATIVO).
SEU OBJETIVO: Apoiar dúvidas sobre pedidos, prazos e catálogo com base nas informações cadastradas pela loja.
DIRETRIZES:
1. Solicite apenas o código fictício do pedido de demonstração ou protocolo comercial configurado (nunca solicite CPF ou dados pessoais reais em demonstrações públicas).
2. Consulte e informe apenas dados disponibilizados pela integração habilitada na loja.
3. Para solicitações fora da base de conhecimento, registre o assunto e encaminhe ao suporte humano.`,
    sampleSpeech: 'Olá! Aqui é a Roberta em simulação ilustrativa de e-commerce. Posso verificar um código fictício de pedido na demonstração ou tirar dúvidas sobre o catálogo?'
  },
  {
    id: 'auto',
    name: 'Oficinas & Concessionárias',
    icon: Car,
    assistantName: 'Marcus',
    personaKey: 'marcus',
    promptTemplate: `Você é o Marcus, assistente virtual de agendamentos da [Nome da Concessionária] (MODELO ILUSTRATIVO).
SEU OBJETIVO: Apoiar o agendamento de revisões periódicas e avaliações técnicas presenciais na oficina conforme a agenda configurada pela empresa.
DIRETRIZES:
1. Pergunte o modelo do veículo, ano aproximado e serviço desejado (não solicite placa real ou dados pessoais em demonstrações públicas).
2. Verifique as janelas de atendimento cadastradas pela oficina para avaliação técnica presencial.
3. Ofereça opções de horário disponíveis para confirmação com a equipe da oficina.`,
    sampleSpeech: 'Bom dia! Aqui é o Marcus em simulação ilustrativa. Qual é o modelo fictício do veículo para demonstrarmos o agendamento de avaliação técnica presencial?'
  }
];

export default function NicheScriptGenerator({ onOpenAuth, onOpenDemo }) {
  const [selectedNiche, setSelectedNiche] = useState(NICHES_DATA[0]);
  const [copied, setCopied] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedNiche.promptTemplate);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleToggleAudio = () => {
    if (isPlaying) {
      stopSpeech();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      speakPersonaPt(
        selectedNiche.personaKey,
        selectedNiche.sampleSpeech,
        () => setIsPlaying(true),
        () => setIsPlaying(false),
        () => setIsPlaying(false)
      );
    }
  };

  return (
    <section id="gerador-de-prompt" className="py-20 sm:py-28 bg-[#FAF9F5] border-t border-[#EBE8E2] font-sans overflow-hidden w-full max-w-full">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-full min-w-0">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-[#4F46E5] text-xs font-semibold uppercase tracking-wider mb-4">
            <Wand2 className="w-3.5 h-3.5" />
            <span>ENGENHARIA DE PROMPTS NEURAIS</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-normal text-[#1A1816] tracking-tight leading-tight">
            Descubra o script neural ideal{' '}
            <span className="font-serif-title italic text-[#4F46E5]">para o seu negócio.</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#5C5955] max-w-2xl mx-auto leading-relaxed">
            Selecione um segmento abaixo para ver uma simulação ilustrativa de estrutura de roteiro conversacional com dados fictícios. As respostas em produção dependem da base de conhecimento e das regras definidas pelo cliente e, em setores sensíveis, exigem aprovação do profissional responsável (sem conformidade clínica ou jurídica automática).
          </p>
        </div>

        {/* Niche Selector Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-2.5 sm:gap-3 mb-8">
          {NICHES_DATA.map((niche) => {
            const Icon = niche.icon;
            const isSelected = selectedNiche.id === niche.id;
            return (
              <button
                key={niche.id}
                onClick={() => {
                  if (isPlaying) {
                    stopSpeech();
                    setIsPlaying(false);
                  }
                  setSelectedNiche(niche);
                }}
                className={`p-3 sm:p-4 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-2 ${
                  isSelected
                    ? 'bg-white border-[#4F46E5] shadow-md ring-2 ring-[#4F46E5]/20 text-[#1A1816]'
                    : 'bg-white/60 border-[#E7E4DC] hover:bg-white text-[#5C5955] hover:text-[#1A1816]'
                }`}
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${isSelected ? 'bg-indigo-50 text-[#4F46E5]' : 'bg-[#FAF9F5] text-[#736F69]'}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold leading-tight line-clamp-2">
                  {niche.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Output Box */}
        <div className="bg-white rounded-3xl border border-[#E7E4DC] shadow-xl p-6 sm:p-10 text-left relative overflow-hidden">
          
          {/* Header of Box */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#EBE8E2]">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#4F46E5]">
                  SCRIPT CONFIGURADO
                </span>
                <span className="text-xs text-[#8C8881]">·</span>
                <span className="text-xs text-[#5C5955]">
                  Persona: <strong>{selectedNiche.assistantName}</strong>
                </span>
              </div>
              <h3 className="text-xl font-bold text-[#1A1816] mt-1">
                Prompt Operacional para {selectedNiche.name}
              </h3>
            </div>

            {/* Actions: Play and Copy */}
            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              <button
                onClick={handleToggleAudio}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full border border-[#D0CBC0] hover:bg-[#FAF9F5] text-xs font-semibold text-[#1A1816] transition-colors cursor-pointer"
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                <span>{isPlaying ? 'Pausar Áudio' : 'Ouvir Abertura'}</span>
              </button>

              <button
                onClick={handleCopy}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-[#11100F] hover:bg-black text-white text-xs font-semibold shadow-sm transition-all cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copiado!' : 'Copiar Prompt'}</span>
              </button>
            </div>
          </div>

          {/* Prompt Code Frame */}
          <div className="my-6">
            <pre className="p-4 sm:p-6 bg-[#11100F] text-stone-200 rounded-2xl text-xs sm:text-sm font-mono overflow-x-auto whitespace-pre-wrap leading-relaxed border border-stone-800">
              {selectedNiche.promptTemplate}
            </pre>
          </div>

          {/* Sample opening speech text preview */}
          <div className="p-4 rounded-2xl bg-[#EEF2FF] border border-[#E0E7FF] text-xs flex items-start gap-3">
            <Sparkles className="w-4 h-4 text-[#4F46E5] shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#4F46E5] block mb-0.5">Fala de abertura ao atender o cliente:</strong>
              <p className="text-[#3730A3] italic">"{selectedNiche.sampleSpeech}"</p>
            </div>
          </div>

          {/* Footer CTA */}
          <div className="mt-8 pt-6 border-t border-[#EBE8E2] flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-[#5C5955] text-center sm:text-left">
              Quer ajustar este roteiro ilustrativo para a realidade da sua empresa? <strong>Fale com nossa equipe para alinhar escopo e prazo de implantação.</strong>
            </p>
            <button
              onClick={onOpenAuth || onOpenDemo}
              className="w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#4F46E5] hover:bg-[#4338CA] text-white text-xs sm:text-sm font-semibold shadow-md transition-all hover:scale-105 cursor-pointer"
            >
              <span>Quero Implantar Este Script na Minha Empresa</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
