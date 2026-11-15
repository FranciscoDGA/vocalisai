import React, { useState } from 'react';
import { Play, Pause, Sparkles, Volume2, ArrowRight, Check, Mic, Sliders, Globe } from 'lucide-react';
import { speakPersonaPt, stopSpeech } from '../utils/voiceUtils';

const VOICE_PERSONAS = [
  {
    id: 'roberta',
    name: 'Roberta',
    role: 'SDR & Vendas Consultivas',
    badge: 'Mais Escolhida',
    badgeColor: 'bg-indigo-50 text-[#4F46E5] border-indigo-200',
    tone: 'Vibrante, comercial e acolhedora',
    idealFor: 'Clínicas, Imobiliárias e Captação de Leads',
    gender: 'Feminina',
    sampleText: 'Olá! Sou a Roberta da Vocalis. Vi que você busca atendimento inteligente 24 horas para sua empresa. Como posso agilizar isso para você hoje?'
  },
  {
    id: 'camila',
    name: 'Camila',
    role: 'Saúde & Atendimento Humanizado',
    badge: 'Setor de Saúde',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    tone: 'Serena, paciente e empática',
    idealFor: 'Consultórios Médicos, Odontologia e Estética',
    gender: 'Feminina',
    sampleText: 'Olá, bom dia! Aqui é a Camila do consultório. Entendo a urgência do seu agendamento. Temos horário amanhã às nove e quinze ou quinta às catorze horas. Qual prefere?'
  },
  {
    id: 'marcus',
    name: 'Marcus',
    role: 'Executivo & Autoridade Institucional',
    badge: 'Corporativo & Jurídico',
    badgeColor: 'bg-stone-100 text-stone-800 border-stone-300',
    tone: 'Firme, institucional e seguro',
    idealFor: 'Advocacia, Finanças e Imóveis de Alto Padrão',
    gender: 'Masculino',
    sampleText: 'Boa tarde. Sou o Marcus da assessoria jurídica. Identifiquei o protocolo da sua solicitação e posso atualizar o andamento do seu caso imediatamente.'
  },
  {
    id: 'leticia',
    name: 'Letícia',
    role: 'Suporte Ágil & Resolução Imediata',
    badge: 'Alta Velocidade',
    badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
    tone: 'Ágil, comunicativa e prestativa',
    idealFor: 'E-commerce, Logística, Restaurantes e Delivery',
    gender: 'Feminina',
    sampleText: 'Oi! Aqui é a Letícia do suporte. Localizei seu pedido e a entrega está a caminho para hoje até às dezessete horas. Gostaria de receber o link de rastreio no WhatsApp?'
  }
];

const ACCENTS = [
  { id: 'neutro', name: 'Padrão Nacional (Neutro)', desc: 'Excelente para empresas com clientes em todo o Brasil' },
  { id: 'sp', name: 'Paulista (SP)', desc: 'Cadência dinâmica com entonação metropolitana de negócios' },
  { id: 'rj', name: 'Carioca (RJ)', desc: 'Comunicação empática, calorosa e relacional' },
  { id: 'mg', name: 'Mineiro (MG)', desc: 'Tom acolhedor, calmo e de extrema confiança' },
  { id: 'sul', name: 'Sulista (PR / SC / RS)', desc: 'Dicção clara, formal e de ritmo preciso' }
];

export default function VoiceStudioPlayground({ onOpenDemo, onOpenAuth }) {
  const [selectedPersona, setSelectedPersona] = useState(VOICE_PERSONAS[0]);
  const [selectedAccent, setSelectedAccent] = useState(ACCENTS[0]);
  const [customText, setCustomText] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);

  const currentTextToPlay = customText.trim() || selectedPersona.sampleText;

  const handleTogglePlay = () => {
    if (isPlaying) {
      stopSpeech();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      speakPersonaPt(
        selectedPersona.id,
        currentTextToPlay,
        () => setIsPlaying(true),
        () => setIsPlaying(false),
        () => setIsPlaying(false)
      );
    }
  };

  const handleSelectPersona = (p) => {
    if (isPlaying) {
      stopSpeech();
      setIsPlaying(false);
    }
    setSelectedPersona(p);
  };

  return (
    <section id="estudio-de-vozes" className="py-20 sm:py-28 bg-white border-t border-[#EBE8E2] font-sans overflow-hidden w-full max-w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-full min-w-0">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-[#4F46E5] text-xs font-semibold uppercase tracking-wider mb-4">
            <Mic className="w-3.5 h-3.5" />
            <span>ESTÚDIO DE VOZES NEURAIS BRASILEIRAS</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-normal text-[#1A1816] tracking-tight leading-tight">
            Escolha a voz que vai{' '}
            <span className="font-serif-title italic text-[#4F46E5]">falar pela sua marca.</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#5C5955] max-w-2xl mx-auto leading-relaxed">
            Nada de vozes robotizadas ou traduzidas do inglês. Nossos modelos foram calibrados com sotaques, pontuação e respiração natural para o ouvido brasileiro.
          </p>
        </div>

        {/* 4 Persona Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10">
          {VOICE_PERSONAS.map((p) => {
            const isSelected = selectedPersona.id === p.id;
            return (
              <div
                key={p.id}
                onClick={() => handleSelectPersona(p)}
                className={`p-5 sm:p-6 rounded-3xl border transition-all cursor-pointer relative text-left flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#FAF9F5] border-[#4F46E5] ring-2 ring-[#4F46E5]/20 shadow-md scale-[1.01]'
                    : 'bg-white border-[#E7E4DC] hover:border-[#D0CBC0] hover:shadow-xs'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${p.badgeColor}`}>
                      {p.badge}
                    </span>
                    <span className="text-[11px] font-mono text-[#8C8881]">{p.gender}</span>
                  </div>

                  <h3 className="text-xl font-bold text-[#1A1816] flex items-center gap-2 mb-1">
                    <span>{p.name}</span>
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-[#4F46E5] animate-pulse" />
                    )}
                  </h3>

                  <div className="text-xs font-medium text-[#4F46E5] mb-3">
                    {p.role}
                  </div>

                  <p className="text-xs text-[#5C5955] mb-4 leading-relaxed">
                    {p.tone}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#EBE8E2] text-[11px] text-[#736F69]">
                  <strong className="text-[#1A1816] block mb-0.5">Ideal para:</strong>
                  <span>{p.idealFor}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Audio Player & Custom Prompt Tester */}
        <div className="bg-[#141312] text-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-[#2D2A26] max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-[#2D2A26]">
            
            {/* Persona Playing Details */}
            <div className="flex items-center gap-4 text-left w-full md:w-auto">
              <button
                onClick={handleTogglePlay}
                className="w-14 h-14 rounded-full bg-[#4F46E5] hover:bg-[#4338CA] text-white flex items-center justify-center shrink-0 shadow-lg shadow-indigo-600/30 transition-transform hover:scale-105 cursor-pointer"
                title={isPlaying ? 'Pausar áudio' : 'Ouvir demonstração'}
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6 fill-white" />
                ) : (
                  <Play className="w-6 h-6 fill-white ml-0.5" />
                )}
              </button>

              <div>
                <div className="flex items-center gap-2">
                  <span className="text-base font-bold text-white">Voz de {selectedPersona.name}</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-white/10 text-stone-300">
                    {selectedAccent.name.split(' ')[0]}
                  </span>
                </div>
                <p className="text-xs text-stone-400 mt-0.5">
                  {isPlaying ? '⚡ Falando ao vivo agora no seu navegador...' : 'Clique no play para ouvir a cadência humana real'}
                </p>
              </div>
            </div>

            {/* Soundwave Bars */}
            <div className="flex items-center gap-1 h-8 px-2 overflow-hidden">
              {[12, 22, 16, 28, 14, 26, 32, 18, 24, 30, 20, 28, 15, 22, 12].map((height, i) => (
                <span
                  key={i}
                  className={`w-1 rounded-full transition-all duration-200 ${
                    isPlaying 
                      ? 'bg-gradient-to-t from-[#4338CA] to-[#818CF8] animate-pulse' 
                      : 'bg-stone-700 h-2'
                  }`}
                  style={{
                    height: isPlaying ? `${height}px` : '4px',
                    animationDelay: `${(i % 5) * 0.12}s`
                  }}
                />
              ))}
            </div>
          </div>

          {/* Sotaques & Regionalidades */}
          <div className="pt-6 pb-4 text-left">
            <div className="flex items-center gap-2 text-xs font-bold text-stone-300 uppercase tracking-wider mb-3">
              <Globe className="w-3.5 h-3.5 text-[#A5B4FC]" />
              <span>Sotaque Regional Selecionado:</span>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {ACCENTS.map((acc) => {
                const isAcc = selectedAccent.id === acc.id;
                return (
                  <button
                    key={acc.id}
                    onClick={() => setSelectedAccent(acc)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                      isAcc
                        ? 'bg-white text-[#11100F] font-bold shadow-sm'
                        : 'bg-stone-900 text-stone-400 border border-stone-800 hover:text-white'
                    }`}
                  >
                    {acc.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interactive Custom Text Box */}
          <div className="mt-4 pt-4 border-t border-[#2D2A26] text-left">
            <label className="block text-xs text-stone-400 mb-2 font-medium">
              Texto que a IA vai falar (ou digite o que você quiser testar):
            </label>
            <div className="relative">
              <textarea
                rows={2}
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                placeholder={selectedPersona.sampleText}
                className="w-full bg-stone-900 border border-stone-800 rounded-2xl p-3.5 text-xs sm:text-sm text-stone-100 placeholder-stone-500 focus:outline-none focus:border-[#4F46E5] transition-all resize-none"
              />
              {customText && (
                <button
                  onClick={() => setCustomText('')}
                  className="absolute right-3 top-3 text-[10px] text-stone-400 hover:text-white underline cursor-pointer"
                >
                  Restaurar frase padrão
                </button>
              )}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#2D2A26]">
            <p className="text-xs text-stone-400 text-left">
              Quer uma voz personalizada clonada do dono da empresa? <strong>Temos clonagem em 30 segundos no plano Pro.</strong>
            </p>
            <button
              onClick={onOpenAuth || onOpenDemo}
              className="w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#4F46E5] hover:bg-[#4338CA] text-white text-xs sm:text-sm font-semibold shadow-md transition-all hover:scale-105 cursor-pointer"
            >
              <span>Ativar a {selectedPersona.name} na Minha Empresa</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
