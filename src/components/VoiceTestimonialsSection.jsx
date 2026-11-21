import React, { useState } from 'react';
import { Play, Pause, Volume2 } from 'lucide-react';
import { speakFemalePt } from '../utils/voiceUtils';

const ILLUSTRATIVE_EXAMPLES = [
  {
    id: 'clinicas',
    sector: 'Clínicas e Consultórios',
    initials: 'CC',
    tag: 'Rotina · Ilustrativo',
    summary: 'Simulação ilustrativa de agendamento de rotina (sem sintomas urgentes), seguindo exclusivamente a base de conhecimento e regras aprovadas pelo responsável técnico da clínica. Não faz diagnóstico nem recomenda aguardar em urgências.',
    exampleNote: 'Simulação ilustrativa com dados fictícios — requer validação clínica do cliente.',
    audioScript: 'Simulação ilustrativa para clínica: Olá, sou a assistente virtual de agendamento administrativo. Para avaliação periódica de rotina, posso consultar as opções configuradas pela clínica na base de conhecimento e encaminhar sua solicitação à equipe.'
  },
  {
    id: 'imobiliarias',
    sector: 'Imobiliárias e Corretores',
    initials: 'IC',
    tag: 'Qualificação · Ilustrativo',
    summary: 'Simulação ilustrativa de coleta básica de região, finalidade e disponibilidade de horário segundo a base de conhecimento da imobiliária, encaminhando para o corretor.',
    exampleNote: 'Simulação ilustrativa com dados fictícios — não representa depoimento de cliente real.',
    audioScript: 'Simulação ilustrativa para imobiliária: Olá! Para direcionar seu atendimento ao corretor responsável conforme as regras da imobiliária, você busca imóvel para compra ou locação e qual região prefere?'
  },
  {
    id: 'servicos',
    sector: 'Advocacia, Finanças & Escritórios',
    initials: 'AF',
    tag: 'Administrativo · Ilustrativo',
    summary: 'Simulação ilustrativa de recepção administrativa inicial conforme regras aprovadas pelo escritório ou equipe financeira. Não emite parecer jurídico, valor de causa nem garante conformidade ética/legal automática.',
    exampleNote: 'Simulação ilustrativa com dados fictícios — sujeito à revisão pelo profissional habilitado.',
    audioScript: 'Simulação ilustrativa para escritório: Boa tarde! Sou o assistente virtual administrativo. Posso registrar seu contato e a área de interesse para que o advogado ou especialista responsável avalie e dê retorno.'
  }
];

export default function VoiceTestimonialsSection() {
  const [playingId, setPlayingId] = useState(null);

  const handlePlayVoice = (item) => {
    if (playingId === item.id) {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      setPlayingId(null);
      return;
    }

    setPlayingId(item.id);
    speakFemalePt(
      item.audioScript,
      () => setPlayingId(item.id),
      () => setPlayingId(null),
      () => setPlayingId(null)
    );
  };

  return (
    <section className="py-16 sm:py-24 bg-[#FAF9F5] border-t border-[#EBE8E2] font-sans overflow-hidden w-full max-w-full">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-full min-w-0">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-[#4F46E5] text-xs font-semibold uppercase tracking-wider mb-4">
            <Volume2 className="w-3.5 h-3.5 text-[#4F46E5]" />
            <span>SIMULAÇÃO ILUSTRATIVA POR SEGMENTO</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-normal text-[#1A1816] tracking-tight leading-tight">
            Veja exemplos ilustrativos de como a Vocalis{' '}
            <span className="font-serif-title italic text-[#4F46E5]">pode apoiar diferentes setores.</span>
          </h2>
          <p className="mt-4 text-base text-[#5C5955] max-w-2xl mx-auto">
            Os áudios abaixo são simulações ilustrativas com dados fictícios reproduzidas no navegador. Em operação real, todas as respostas dependem da base de conhecimento e das regras definidas pelo cliente, sem diagnóstico clínico, parecer jurídico ou conformidade automática.
          </p>
        </div>

        {/* Illustrative Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ILLUSTRATIVE_EXAMPLES.map((item) => {
            const isPlaying = playingId === item.id;
            return (
              <div
                key={item.id}
                className="bg-white rounded-3xl p-7 border border-[#E7E4DC] shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-stone-100 text-[#5C5955] border border-stone-200 uppercase tracking-wider">
                      Simulação ilustrativa
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-[#4F46E5] border border-indigo-200">
                      {item.tag}
                    </span>
                  </div>

                  {/* Audio Player Button */}
                  <button
                    onClick={() => handlePlayVoice(item)}
                    className={`w-full py-2.5 px-4 rounded-2xl flex items-center justify-center gap-2.5 text-xs font-bold transition-all mb-5 cursor-pointer ${
                      isPlaying
                        ? 'bg-[#141312] text-white shadow-md'
                        : 'bg-indigo-50 hover:bg-indigo-100 text-[#4F46E5] border border-indigo-200/80'
                    }`}
                  >
                    {isPlaying ? (
                      <>
                        <Pause className="w-4 h-4 text-rose-400" />
                        <span>Pausar simulação</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 fill-current text-[#4F46E5]" />
                        <span>Ouvir simulação ilustrativa</span>
                      </>
                    )}
                  </button>

                  <p className="text-xs sm:text-sm text-[#5C5955] leading-relaxed mb-6">
                    {item.summary}
                  </p>
                </div>

                {/* Sector Info */}
                <div className="pt-4 border-t border-[#EBE8E2] flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] text-white font-bold text-xs flex items-center justify-center shrink-0">
                    {item.initials}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#1A1816] leading-snug">
                      {item.sector}
                    </h4>
                    <span className="text-[11px] text-[#8C8881] block">
                      {item.exampleNote}
                    </span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
