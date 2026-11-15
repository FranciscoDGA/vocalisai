import React, { useState } from 'react';
import { Play, Pause, Volume2, Star, Quote } from 'lucide-react';
import { speakFemalePt } from '../utils/voiceUtils';

const VOICE_TESTIMONIALS = [
  {
    id: 'marcos',
    name: 'Dr. Marcos Silveira',
    role: 'Diretor Clínico',
    company: 'Clínica Sorriso & Saúde (SP)',
    rating: 5,
    metrics: '+42 consultas/mês recuperadas',
    quote: 'Ativamos a Vocalis na sexta-feira. No primeiro fim de semana ela agendou mais de 30 pacientes que estariam sem resposta e teriam ido para a clínica vizinha. O plano anual se pagou em 4 dias.',
    audioScript: 'Olá, sou o Doutor Marcos da Clínica Sorriso e Saúde. Nós ativamos a Vocalis numa sexta-feira e no primeiro fim de semana ela agendou trinta e dois pacientes que estariam sem resposta. O plano anual se pagou em menos de quatro dias de operação.'
  },
  {
    id: 'juliana',
    name: 'Juliana Vasconcelos',
    role: 'Sócia-Fundadora',
    company: 'Prime Imóveis Alto Padrão (RJ)',
    rating: 5,
    metrics: '3.4x mais visitas agendadas',
    quote: 'Nossos corretores pararam de perder plantão de domingo. A IA qualifica quem tem capacidade financeira real, tira dúvidas sobre condomínio e só transfere a visita pronta no calendário.',
    audioScript: 'Aqui é a Juliana da Prime Imóveis. Nossos corretores pararam de perder leads nos fins de semana. A Vocalis qualifica quem tem perfil de compra real e agenda a visita direto no calendário da equipe com localização.'
  },
  {
    id: 'eduardo',
    name: 'Dr. Eduardo Mendonça',
    role: 'Sócio Gestor',
    company: 'Mendonça & Associados Advocacia',
    rating: 5,
    metrics: 'Economia de 5 horas/dia da equipe',
    quote: 'O filtro de triagem jurídica tirou o peso de atender ligações irrelevantes da mesa dos meus sócios. Quando o cliente chega até mim, já sei exatamente o valor da causa e o histórico.',
    audioScript: 'Sou o Eduardo Mendonça, sócio da Mendonça e Associados. O filtro de triagem da Vocalis economizou cinco horas diárias dos nossos advogados. Quando o cliente chega na call, nós já temos o resumo completo no CRM.'
  }
];

export default function VoiceTestimonialsSection() {
  const [playingId, setPlayingId] = useState(null);

  const handlePlayVoice = (t) => {
    if (playingId === t.id) {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      setPlayingId(null);
      return;
    }

    setPlayingId(t.id);
    speakFemalePt(
      t.audioScript,
      () => setPlayingId(t.id),
      () => setPlayingId(null),
      () => setPlayingId(null)
    );
  };

  return (
    <section className="py-24 bg-[#FAF9F5] border-t border-[#EBE8E2] font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-4">
            <Volume2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>PROVA SOCIAL EM ÁUDIO REAL</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-normal text-[#1A1816] tracking-tight leading-tight">
            Não acredite apenas em palavras.{' '}
            <span className="font-serif-title italic text-[#4F46E5]">Ouça quem já usa</span> a Vocalis.
          </h2>
          <p className="mt-4 text-base text-[#5C5955] max-w-2xl mx-auto">
            Aperte o play nos depoimentos em áudio abaixo e veja como clínicas, imobiliárias e empresas de serviços estão recuperando dezenas de milhares de reais.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {VOICE_TESTIMONIALS.map((t) => {
            const isPlaying = playingId === t.id;
            return (
              <div
                key={t.id}
                className="bg-white rounded-3xl p-7 border border-[#E7E4DC] shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden"
              >
                <div>
                  {/* Stars + Metrics Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {t.metrics}
                    </span>
                  </div>

                  {/* Audio Player Button */}
                  <button
                    onClick={() => handlePlayVoice(t)}
                    className={`w-full py-2.5 px-4 rounded-2xl flex items-center justify-center gap-2.5 text-xs font-bold transition-all mb-5 cursor-pointer ${
                      isPlaying
                        ? 'bg-[#141312] text-white shadow-md'
                        : 'bg-indigo-50 hover:bg-indigo-100 text-[#4F46E5] border border-indigo-200/80'
                    }`}
                  >
                    {isPlaying ? (
                      <>
                        <Pause className="w-4 h-4 text-rose-400" />
                        <span>Pausar Depoimento</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 fill-current text-[#4F46E5]" />
                        <span>Ouvir Depoimento em Áudio (15s)</span>
                      </>
                    )}
                  </button>

                  {/* Quote */}
                  <p className="text-xs sm:text-sm text-[#5C5955] leading-relaxed italic mb-6">
                    "{t.quote}"
                  </p>
                </div>

                {/* Author Info */}
                <div className="pt-4 border-t border-[#EBE8E2] flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] text-white font-bold text-xs flex items-center justify-center shrink-0">
                    {t.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#1A1816] leading-snug">
                      {t.name}
                    </h4>
                    <span className="text-[11px] text-[#8C8881] block">
                      {t.role} • {t.company}
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
