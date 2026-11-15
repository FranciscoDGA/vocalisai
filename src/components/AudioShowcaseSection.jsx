import React, { useState } from 'react';
import { Play, Pause, Volume2, CheckCircle2, Sparkles, Building2, Stethoscope, Briefcase } from 'lucide-react';
import { speakFemalePt } from '../utils/voiceUtils';

const SCENARIOS = [
  {
    id: 'clinica',
    title: 'Clínica Médica / Odonto',
    niche: 'Agendamento de Emergência',
    time: 'Domingo às 21h40',
    agent: 'Débora (Voz Neural)',
    caller: 'Paciente com dor de dente',
    icon: Stethoscope,
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    summary: 'A paciente liga no domingo à noite com dor aguda. A Vocalis acolhe, consulta a agenda de urgência de segunda-feira e confirma o horário com localização.',
    dialogue: [
      { speaker: 'Paciente', text: 'Boa noite! Eu tô com uma dor insuportável no siso desde a tarde, vocês têm algum horário de emergência pra amanhã cedo?' },
      { speaker: 'Débora (IA)', text: 'Olá, boa noite! Sinto muito pela sua dor, mas fique tranquila que nós vamos cuidar disso. Consultei a agenda do Dr. Renato e temos um horário de urgência amanhã às oito e quinze da manhã. Posso reservar esse horário no seu nome?' },
      { speaker: 'Paciente', text: 'Pode sim, por favor! O que eu preciso levar?' },
      { speaker: 'Débora (IA)', text: 'Perfeito! Já confirmei seu agendamento para amanhã às oito e quinze. Traga apenas um documento com foto. Acabei de te enviar a localização e o lembrete no seu WhatsApp. Descanse esta noite e até amanhã!' }
    ]
  },
  {
    id: 'imobiliaria',
    title: 'Imobiliária & Corretores',
    niche: 'Qualificação de Lead de Alto Padrão',
    time: 'Sábado às 14h15',
    agent: 'Camila (Voz Comercial)',
    caller: 'Comprador de Cobertura',
    icon: Building2,
    badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    summary: 'Comprador interessado em cobertura de R$ 1,4 milhão liga para saber detalhes. A IA qualifica orçamento, bairro e agenda visita presencial com o corretor responsável.',
    dialogue: [
      { speaker: 'Cliente', text: 'Oi, vi a placa da cobertura duplex nos Jardins. Ela ainda está disponível para visitação?' },
      { speaker: 'Camila (IA)', text: 'Olá! Está disponível sim! É um imóvel maravilhoso com duzentos e quarenta metros quadrados e três suítes. O corretor Rodrigo é o especialista desse condomínio. Ele tem disponibilidade para te acompanhar hoje às quatro ou na segunda às dez. Qual horário você prefere?' },
      { speaker: 'Cliente', text: 'Hoje às quatro fica excelente pra mim e pra minha esposa.' },
      { speaker: 'Camila (IA)', text: 'Combinado! Visita agendada para hoje às dezesseis horas com o corretor Rodrigo. Ele já recebeu o seu contato e vai te esperar na portaria. Já enviei a confirmação no seu WhatsApp!' }
    ]
  },
  {
    id: 'advocacia',
    title: 'Escritório de Advocacia',
    niche: 'Triagem Jurídica Sigilosa',
    time: 'Quarta-feira às 19h10',
    agent: 'Roberto (Voz Corporativa)',
    caller: 'Executivo com dúvida trabalhista',
    icon: Briefcase,
    badgeColor: 'bg-violet-50 text-violet-700 border-violet-200',
    summary: 'Lead liga após o expediente sobre rescisão indireta. A IA colhe informações de forma acolhedora e sigilosa, registra no CRM e agenda call com o advogado sócio.',
    dialogue: [
      { speaker: 'Cliente', text: 'Boa noite, gostaria de saber se vocês atendem processos trabalhistas para cargos de diretoria.' },
      { speaker: 'Roberto (IA)', text: 'Olá, boa noite. Sim, nosso núcleo especializado atende demandas de liderança e contratos executivos com total sigilo. Para que o Dr. Marcos possa avaliar seu caso antes da consulta, você já foi desligado da empresa ou ainda está no cargo?' },
      { speaker: 'Cliente', text: 'Ainda estou no cargo, mas sob forte pressão e com quebra de contrato.' },
      { speaker: 'Roberto (IA)', text: 'Compreendido. Esses detalhes são cruciais. Reservei uma reunião confidencial online com o Dr. Marcos para amanhã às onze horas. Todos os dados já foram salvos com criptografia na nossa pasta jurídica.' }
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
    <section className="py-24 bg-white border-y border-[#EBE8E2] font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-[#4F46E5] text-xs font-semibold uppercase tracking-wider mb-4">
            <Volume2 className="w-3.5 h-3.5" />
            <span>TEST DRIVE AUDITIVO EM 1 CLIQUE</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-normal text-[#1A1816] tracking-tight leading-tight">
            Ouça a Vocalis em ação antes de contratar.{' '}
            <span className="font-serif-title italic text-[#4F46E5]">Parece uma pessoa real.</span>
          </h2>
          <p className="mt-4 text-base text-[#5C5955] max-w-2xl mx-auto">
            Sem cadastro e sem robô travado. Escolha um dos 3 cenários abaixo e aperte o play para ouvir a fluência humana brasileira em conversas reais.
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
                  <span>Ouvir Conversa Real</span>
                </>
              )}
            </button>
          </div>

          {/* Dialogue Transcript Stream */}
          <div className="pt-6 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8C8881] block">
              Transcrição ao vivo do atendimento:
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
                        <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                          Latência 380ms
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
            <div className="flex items-center gap-2 text-xs text-[#5C5955]">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Nenhum cliente perdido. Agenda atualizada e WhatsApp disparado automaticamente.</span>
            </div>

            <button
              onClick={onOpenDemo}
              className="text-xs font-bold text-[#4F46E5] hover:underline inline-flex items-center gap-1 cursor-pointer"
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
