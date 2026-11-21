import React, { useState } from 'react';
import { Play, Pause, Volume2, CheckCircle2, Sparkles, Building2, Stethoscope, Briefcase } from 'lucide-react';
import { speakFemalePt } from '../utils/voiceUtils';

const SCENARIOS = [
  {
    id: 'clinica',
    title: 'Clínica Médica / Odonto',
    niche: 'Agendamento de Rotina (Simulação Ilustrativa)',
    time: 'Exemplo fora do expediente',
    agent: 'Roberta (Voz Neural)',
    caller: 'Paciente fictício (limpeza e avaliação periódica)',
    icon: Stethoscope,
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    summary: 'Simulação ilustrativa com dados fictícios para agendamento de consulta de rotina e limpeza preventiva (sem sintomas urgentes). Horários, convênios e protocolos para casos de dor ou urgência dependem exclusivamente da base de conhecimento e das regras definidas e aprovadas pelo responsável técnico da clínica, com encaminhamento humano imediato e sem diagnóstico por IA.',
    dialogue: [
      { speaker: 'Paciente (fictício)', text: 'Boa noite! Gostaria de agendar uma avaliação periódica e limpeza odontológica de rotina para a próxima semana, sem urgência.' },
      { speaker: 'Roberta (IA)', text: 'Olá, boa noite! Aqui é a assistente virtual da clínica (simulação ilustrativa). Conforme os horários configurados pela clínica na nossa base de atendimento, temos disponibilidade na terça-feira às dez horas ou na quinta-feira às catorze e trinta. Qual opção você prefere?' },
      { speaker: 'Paciente (fictício)', text: 'Terça-feira às dez horas fica ótimo! E caso um paciente ligue com dor ou urgência, como funciona?' },
      { speaker: 'Roberta (IA)', text: 'Perfeito, pré-reserva ilustrativa registrada para terça às dez horas para confirmação pela recepção. Em casos de dor ou urgência, não fazemos diagnóstico nem recomendamos aguardar: aplicamos exclusivamente o protocolo aprovado pelo responsável técnico da clínica, direcionando imediatamente para a equipe humana ou pronto atendimento indicado.' }
    ]
  },
  {
    id: 'imobiliaria',
    title: 'Imobiliária & Corretores',
    niche: 'Qualificação Inicial (Simulação Ilustrativa)',
    time: 'Exemplo de fim de semana',
    agent: 'Camila (Voz Comercial)',
    caller: 'Interessado fictício em locação/compra',
    icon: Building2,
    badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    summary: 'Simulação ilustrativa com dados fictícios de qualificação inicial imobiliária. Valores, disponibilidade e agenda de visitas dependem da base de conhecimento e das regras definidas pela imobiliária cliente.',
    dialogue: [
      { speaker: 'Cliente (fictício)', text: 'Oi, gostaria de confirmar se o imóvel de demonstração na região central ainda está disponível para visita.' },
      { speaker: 'Camila (IA)', text: 'Olá! Aqui é a assistente virtual da imobiliária (simulação ilustrativa). Conforme as informações cadastradas na base da empresa, esse imóvel modelo consta como disponível. O corretor responsável possui janelas configuradas hoje às dezesseis horas ou na segunda-feira às dez. Qual horário prefere?' },
      { speaker: 'Cliente (fictício)', text: 'Hoje às dezesseis horas fica ótimo.' },
      { speaker: 'Camila (IA)', text: 'Combinado! Solicitação registrada para hoje às dezesseis horas conforme regras da imobiliária, aguardando confirmação do corretor responsável.' }
    ]
  },
  {
    id: 'advocacia',
    title: 'Escritório de Advocacia',
    niche: 'Recepção Administrativa (Simulação Ilustrativa)',
    time: 'Exemplo pós-expediente',
    agent: 'Roberto (Voz Corporativa)',
    caller: 'Contato fictício (agendamento administrativo)',
    icon: Briefcase,
    badgeColor: 'bg-violet-50 text-violet-700 border-violet-200',
    summary: 'Simulação ilustrativa com dados fictícios de recepção administrativa inicial. A assistente não emite parecer jurídico, conclusão sobre direitos, estimativa de valor de causa nem declaração de conformidade automática — toda análise cabe exclusivamente ao advogado habilitado.',
    dialogue: [
      { speaker: 'Cliente (fictício)', text: 'Boa noite, gostaria de saber se o escritório atende na área trabalhista e como faço para agendar uma conversa inicial.' },
      { speaker: 'Roberto (IA)', text: 'Olá, boa noite! Sou o assistente virtual do escritório (simulação ilustrativa). Posso realizar seu agendamento administrativo na área trabalhista conforme as regras do escritório. Esclareço que não realizo análise jurídica, não avalio mérito nem estimo valor de causa — toda orientação jurídica cabe exclusivamente ao advogado responsável.' },
      { speaker: 'Cliente (fictício)', text: 'Entendido, quero apenas marcar um horário inicial com a equipe.' },
      { speaker: 'Roberto (IA)', text: 'Perfeito. Registrei sua preferência de horário administrativo (dados fictícios de demonstração) para que a secretaria do escritório confirme o atendimento com o advogado habilitado.' }
    ]
  }
];

export default function AudioShowcaseSection({ onOpenDemo }) {
  const [activeTab, setActiveTab] = useState('clinica');
  const [playingId, setPlayingId] = useState(null);

  const currentScenario = SCENARIOS.find(s => s.id === activeTab) || SCENARIOS[0];

  const handlePlayVoice = (scenario) => {
    if (playingId === scenario.id) {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      setPlayingId(null);
      return;
    }

    setPlayingId(scenario.id);
    const scriptText = scenario.dialogue.map(d => `${d.speaker}: ${d.text}`).join(' ... ');
    
    speakFemalePt(
      scriptText,
      () => setPlayingId(scenario.id),
      () => setPlayingId(null),
      () => setPlayingId(null)
    );
  };

  return (
    <section className="py-16 sm:py-24 bg-white border-y border-[#EBE8E2] font-sans overflow-hidden w-full max-w-full">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-full min-w-0">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-[#4F46E5] text-xs font-semibold uppercase tracking-wider mb-4">
            <Volume2 className="w-3.5 h-3.5" />
            <span>SIMULAÇÃO ILUSTRATIVA DE ÁUDIO</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-normal text-[#1A1816] tracking-tight leading-tight">
            Ouça a Vocalis em ação{' '}
            <span className="font-serif-title italic text-[#4F46E5]">em simulações ilustrativas.</span>
          </h2>
          <p className="mt-4 text-base text-[#5C5955] max-w-2xl mx-auto">
            Escolha um dos 3 cenários abaixo e aperte o play para ouvir uma simulação ilustrativa reproduzida no navegador. Todas as falas usam dados fictícios de demonstração; na prática, as respostas dependem exclusivamente da base de conhecimento e das regras definidas e aprovadas por cada cliente.
          </p>
        </div>

        {/* Scenario Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
          {SCENARIOS.map((s) => {
            const Icon = s.icon;
            const isActive = activeTab === s.id;
            return (
              <button
                key={s.id}
                onClick={() => {
                  if (playingId) {
                    window.speechSynthesis?.cancel();
                    setPlayingId(null);
                  }
                  setActiveTab(s.id);
                }}
                className={`flex items-center gap-2.5 px-5 py-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#1A1816] text-white shadow-lg shadow-black/10 scale-102'
                    : 'bg-[#FAF9F5] text-[#5C5955] border border-[#E7E4DC] hover:text-[#1A1816] hover:bg-white'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#818CF8]' : 'text-stone-400'}`} />
                <span>{s.title}</span>
              </button>
            );
          })}
        </div>

        {/* Audio Player Showcase Card */}
        <div className="bg-[#FAF9F5] rounded-3xl p-6 sm:p-10 border border-[#E7E4DC] shadow-sm max-w-4xl mx-auto">
          
          {/* Top Meta Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#E7E4DC] gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${currentScenario.badgeColor}`}>
                  {currentScenario.niche}
                </span>
                <span className="text-xs text-[#8C8881]">
                  • Ligação às {currentScenario.time}
                </span>
              </div>
              <h3 className="text-xl font-bold text-[#1A1816]">
                {currentScenario.title}
              </h3>
            </div>

            {/* Play Button */}
            <button
              onClick={() => handlePlayVoice(currentScenario)}
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#4F46E5] hover:bg-[#4338CA] text-white text-xs sm:text-sm font-bold shadow-md shadow-indigo-500/25 transition-all hover:scale-105 active:scale-95 cursor-pointer self-start sm:self-auto"
            >
              {playingId === currentScenario.id ? (
                <>
                  <Pause className="w-4 h-4" />
                  <span>Pausar Áudio</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-white" />
                  <span>Ouvir Simulação Ilustrativa</span>
                </>
              )}
            </button>
          </div>

          {/* Scenario Context & Governance Note */}
          <div className="mt-5 p-4 rounded-2xl bg-white border border-[#E7E4DC] text-xs text-[#5C5955] space-y-1.5">
            <div className="flex flex-wrap items-center gap-2 text-[#1A1816] font-semibold">
              <span>Contato na simulação: {currentScenario.caller}</span>
              <span className="text-[#A6A29A]">·</span>
              <span>Agente ilustrativo: {currentScenario.agent}</span>
            </div>
            <p className="leading-relaxed">{currentScenario.summary}</p>
          </div>

          {/* Dialogue Transcript Stream */}
          <div className="pt-6 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8C8881] block">
              Transcrição da simulação ilustrativa:
            </span>

            <div className="space-y-3">
              {currentScenario.dialogue.map((item, idx) => {
                const isAgent = item.speaker.includes('IA');
                return (
                  <div
                    key={idx}
                    className={`p-4 rounded-2xl border text-xs sm:text-sm leading-relaxed transition-all ${
                      isAgent
                        ? 'bg-white border-indigo-100 shadow-xs ml-4 sm:ml-8 border-l-4 border-l-[#4F46E5]'
                        : 'bg-[#F4F1EA] border-stone-200/80 mr-4 sm:mr-8 text-[#1A1816]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className={`font-bold text-xs ${isAgent ? 'text-[#4F46E5]' : 'text-stone-600'}`}>
                        {item.speaker}
                      </span>
                      {isAgent && (
                        <span className="text-[10px] text-[#4F46E5] font-bold bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-200">
                          Simulação ilustrativa
                        </span>
                      )}
                    </div>
                    <p className="text-[#3A3835]">
                      {item.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Conversion Bar */}
          <div className="mt-8 pt-6 border-t border-[#E7E4DC] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-start gap-2 text-xs text-[#5C5955] max-w-2xl">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Simulação ilustrativa com dados fictícios. As respostas em produção dependem da base de conhecimento e das regras definidas pelo cliente. Fluxos em saúde, odontologia, advocacia e finanças exigem validação pelo profissional responsável e não oferecem conformidade clínica ou jurídica automática.</span>
            </div>

            <button
              onClick={onOpenDemo}
              className="text-xs font-bold text-[#4F46E5] hover:underline inline-flex items-center gap-1 cursor-pointer shrink-0"
            >
              <span>Testar com o número da sua empresa</span>
              <span>→</span>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
