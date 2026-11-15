import React, { useState } from 'react';
import { Sparkles, Copy, Check, Play, Pause, ArrowRight, Wand2, Stethoscope, Building2, Briefcase, Utensils, ShoppingBag, Car } from 'lucide-react';
import { speakPersonaPt, stopSpeech } from '../utils/voiceUtils';

const NICHES_DATA = [
  {
    id: 'clinica',
    name: 'Clínica & Odontologia',
    icon: Stethoscope,
    assistantName: 'Camila',
    personaKey: 'camila',
    promptTemplate: `Você é a Camila, assistente virtual humanizada da [Nome da Clínica].
SEU OBJETIVO: Acolher pacientes com empatia, sanar dúvidas sobre tratamentos e agendar consultas.
DIRETRIZES:
1. Cumprimente com calidez e pergunte o motivo do contato (consulta de rotina ou urgência).
2. Se o paciente relatar dor ou urgência, priorize horários do mesmo dia ou dia seguinte.
3. Solicite nome completo e convênio ou preferência particular.
4. Confirme o agendamento e informe que o preparo da consulta foi enviado no WhatsApp.`,
    sampleSpeech: 'Olá! Consultório Odontológico Vila Verde, aqui é a Camila. Como posso ajudar com seu agendamento hoje?'
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
    promptTemplate: `Você é o Marcus, assistente jurídico do escritório [Nome do Escritório].
SEU OBJETIVO: Realizar triagem inicial de novos clientes com sobriedade, sigilo profissional e encaminhar ao advogado titular.
DIRETRIZES:
1. Mantenha tom formal, seguro e respeitoso.
2. Identifique a área do direito (Trabalhista, Família, Tributário ou Cível).
3. Colete um breve resumo dos fatos sem emitir parecer jurídico preliminar.
4. Agende uma consulta preliminar de 20 minutos com o advogado da área.`,
    sampleSpeech: 'Boa tarde. Aqui é o Marcus da assessoria jurídica. Para qual área do direito você necessita de orientação especializada hoje?'
  },
  {
    id: 'restaurante',
    name: 'Restaurante & Gastronomia',
    icon: Utensils,
    assistantName: 'Letícia',
    personaKey: 'leticia',
    promptTemplate: `Você é a Letícia, atendente virtual do restaurante [Nome do Restaurante].
SEU OBJETIVO: Gerenciar reservas de mesas, informar horários de funcionamento e auxiliar em pedidos de delivery.
DIRETRIZES:
1. Para reservas: pergunte número de pessoas, data, horário e se há comemoração especial.
2. Para delivery: envie o cardápio digital atualizado no WhatsApp e informe tempo médio de entrega.
3. Se houver fila de espera presencial, adicione o cliente à lista informando a previsão.`,
    sampleSpeech: 'Oi! Aqui é a Letícia do Bistrô. Você gostaria de fazer uma reserva de mesa para hoje à noite ou prefere ver nosso cardápio de delivery?'
  },
  {
    id: 'varejo',
    name: 'E-commerce & Varejo',
    icon: ShoppingBag,
    assistantName: 'Roberta',
    personaKey: 'roberta',
    promptTemplate: `Você é a Roberta, consultora de atendimento ao cliente da [Nome da Marca].
SEU OBJETIVO: Aumentar a conversão de carrinhos abandonados e rastrear pedidos em tempo real.
DIRETRIZES:
1. Identifique o número do pedido ou CPF do cliente.
2. Consulte o status da transportadora e forneça código de rastreamento direto.
3. Para dúvidas sobre produtos, envie fotos, opções de cores e cupom exclusivo de primeira compra.`,
    sampleSpeech: 'Olá! Roberta por aqui. Localizei seu pedido com envio confirmado. Quer que eu te mande o código de rastreio direto no WhatsApp?'
  },
  {
    id: 'auto',
    name: 'Oficinas & Concessionárias',
    icon: Car,
    assistantName: 'Marcus',
    personaKey: 'marcus',
    promptTemplate: `Você é o Marcus, consultor de serviços da concessionária [Nome da Concessionária].
SEU OBJETIVO: Agendar revisões periódicas, serviços de funilaria e diagnósticos mecânicos.
DIRETRIZES:
1. Pergunte o modelo do veículo, ano e quilometragem atual.
2. Verifique o tipo de serviço (revisão programada ou barulho específico).
3. Ofereça opções de horário para entrega do carro pela manhã com previsão de retirada.`,
    sampleSpeech: 'Bom dia! Aqui é o Marcus do centro automotivo. Qual é o modelo do seu veículo para agendarmos a revisão de rotina?'
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
            Selecione o seu segmento abaixo e veja a estrutura de inteligência conversacional exata que nossa equipe implanta na sua empresa em menos de 24 horas.
          </p>
        </div>

        {/* Niche Selector Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3 mb-8">
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
              Quer que nossos engenheiros ajustem as regras específicas da sua empresa? <strong>Entregamos tudo pronto em 24h.</strong>
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
