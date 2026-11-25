import React, { useState } from 'react';
import LiveSoundwaveBars from './LiveSoundwaveBars';
import {
  Megaphone,
  Mail,
  Download,
  ExternalLink,
  ChevronRight,
  X,
  Send,
  CheckCircle2,
  FileText,
  Copy,
  Check,
  Building,
  Image as ImageIcon,
  AlertCircle
} from 'lucide-react';
import { BRAND } from '../data/content';
import { saveLead } from '../utils/supabaseClient';

export default function ImprensaPage({ onOpenDemo, onOpenAuth, onNavigateHome }) {
  const [isPressModalOpen, setIsPressModalOpen] = useState(false);
  const [isMediaKitModalOpen, setIsMediaKitModalOpen] = useState(false);
  const [selectedRelease, setSelectedRelease] = useState(null);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [mediaKitNotice, setMediaKitNotice] = useState('');

  const [pressForm, setPressForm] = useState({
    name: '',
    outlet: '',
    email: '',
    phone: '',
    topic: '',
    deadline: ''
  });
  const [pressSubmitted, setPressSubmitted] = useState(false);
  const [pressSubmitting, setPressSubmitting] = useState(false);
  const [pressError, setPressError] = useState('');

  const pressReleases = [
    {
      id: 'release-1',
      date: '20.12.2025',
      title: 'Vocalis apresenta plataforma de assistentes de IA para telefone, WhatsApp e chat do site',
      summary: 'Plataforma reúne fluxos configuráveis de atendimento por voz em português brasileiro, WhatsApp e widget webchat no mesmo painel.',
      content: {
        location: 'COMUNICADO INSTITUCIONAL',
        paragraphs: [
          'A Vocalis Tecnologia desenvolveu uma plataforma de comunicação com inteligência artificial conversacional orientada a pequenas e médias empresas no Brasil.',
          'A solução reúne fluxos configuráveis para atendimento telefônico, WhatsApp e webchat, permitindo estruturar triagens iniciais, coleta de informações e encaminhamento para equipes humanas.',
          'Recursos específicos, integrações com sistemas externos, disponibilidade telefônica e condições comerciais variam conforme o plano contratado e são confirmados antes da implantação.'
        ],
        quote: '“Nosso objetivo é oferecer ferramentas práticas para que empresas organizem o atendimento ao cliente em múltiplos canais com clareza e transparência.”',
        author: 'Equipe Vocalis Tecnologia Ltda.'
      }
    }
  ];

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('imprensa@vocalis.ai');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmitPressForm = async (e) => {
    e.preventDefault();
    if (!pressForm.name || !pressForm.email || !pressForm.outlet) return;
    setPressError('');
    setPressSubmitting(true);
    try {
      const res = await saveLead({
        phone: pressForm.phone || 'Nao informado (Imprensa)',
        niche: `Imprensa · ${pressForm.outlet}`,
        notes: `Imprensa: ${pressForm.name} · Veículo: ${pressForm.outlet} · Email: ${pressForm.email} · Prazo: ${pressForm.deadline || 'N/A'} · Pauta: ${pressForm.topic || 'N/A'}`,
      });
      if (res?.success) {
        setPressSubmitted(true);
      } else {
        setPressError(
          'Não foi possível registrar seu pedido de imprensa no servidor neste momento. Envie diretamente para imprensa@vocalis.ai.'
        );
      }
    } catch {
      setPressError('Erro ao enviar pedido de imprensa. Escreva diretamente para imprensa@vocalis.ai.');
    } finally {
      setPressSubmitting(false);
    }
  };

  const handleResetPressForm = () => {
    setPressSubmitted(false);
    setPressSubmitting(false);
    setPressError('');
    setPressForm({
      name: '',
      outlet: '',
      email: '',
      phone: '',
      topic: '',
      deadline: ''
    });
    setIsPressModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-[#1A1816] font-sans">
      {/* 1. HERO SECTION */}
      <section className="pt-16 pb-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center">
        {/* Pill Badge */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white border border-[#E7E4DC] text-xs font-medium text-[#5C5955] mb-6 shadow-2xs">
          <span>Área de imprensa</span>
        </div>

        {/* Headline */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1A1816] tracking-tight leading-tight max-w-2xl mx-auto mb-4">
          Recursos para imprensa & mídia
        </h1>

        {/* Subtitle with email */}
        <p className="text-xs sm:text-sm text-[#736F69] max-w-xl mx-auto mb-8">
          Para solicitações de imprensa, entre em contato por e-mail em:{' '}
          <button
            onClick={handleCopyEmail}
            className="font-semibold text-[#1A1816] hover:text-[#4F46E5] underline decoration-[#4F46E5]/30 hover:decoration-[#4F46E5] transition-colors inline-flex items-center gap-1 cursor-pointer"
            title="Clique para copiar e-mail"
          >
            <span>imprensa@vocalis.ai</span>
            {copiedEmail ? (
              <Check className="w-3.5 h-3.5 text-emerald-600 inline" />
            ) : (
              <Copy className="w-3.5 h-3.5 text-[#8C8881] inline" />
            )}
          </button>
        </p>

        {/* Action Buttons: Solicitações de imprensa & Solicitações de clientes */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => setIsPressModalOpen(true)}
            className="px-6 py-2.5 rounded-full bg-[#1A1816] hover:bg-[#302D2A] text-white text-xs font-semibold transition-all shadow-sm cursor-pointer"
          >
            Solicitações de imprensa
          </button>
          <button
            onClick={() => {
              if (onOpenDemo) onOpenDemo();
            }}
            className="px-6 py-2.5 rounded-full bg-[#4F46E5] hover:bg-[#B04118] text-white text-xs font-semibold transition-all shadow-sm cursor-pointer"
          >
            Solicitações de clientes
          </button>
        </div>
      </section>

      {/* 2. STATS ROW (Canais de atendimento: 3 | Idioma principal: PT-BR) */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-xl mx-auto">
        <div className="grid grid-cols-2 gap-8 text-center border-y border-[#ECEAE4] py-8">
          <div>
            <div className="text-xs text-[#8C8881] font-medium mb-1">
              Canais de atendimento
            </div>
            <div className="text-4xl sm:text-5xl font-extrabold text-[#1A1816] tracking-tight">
              3
            </div>
          </div>
          <div>
            <div className="text-xs text-[#8C8881] font-medium mb-1">
              Idioma principal
            </div>
            <div className="text-4xl sm:text-5xl font-extrabold text-[#1A1816] tracking-tight">
              PT-BR
            </div>
          </div>
        </div>
      </section>

      {/* 3. SOBRE NÓS */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1A1816] tracking-tight mb-4">
          Sobre nós
        </h2>

        {/* Downloads Pill Links: Logos ↓ e Fotos para imprensa ↓ */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <button
            onClick={() => setIsMediaKitModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white border border-[#E7E4DC] text-xs font-medium text-[#403E39] hover:bg-[#FAF9F5] hover:border-[#4F46E5]/40 transition-colors shadow-2xs cursor-pointer"
          >
            <span>Logos</span>
            <span className="text-[#8C8881]">↓</span>
          </button>
          <button
            onClick={() => setIsMediaKitModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white border border-[#E7E4DC] text-xs font-medium text-[#403E39] hover:bg-[#FAF9F5] hover:border-[#4F46E5]/40 transition-colors shadow-2xs cursor-pointer"
          >
            <span>Fotos para imprensa</span>
            <span className="text-[#8C8881]">↓</span>
          </button>
        </div>

        {/* Descriptive Paragraphs (Adapted from print) */}
        <div className="space-y-6 text-xs sm:text-sm text-[#5C5955] leading-relaxed text-center sm:text-justify max-w-2xl mx-auto">
          <p>
            A Vocalis é uma plataforma de IA para comunicação com clientes, criada para pequenas e médias empresas. Seus assistentes atendem ligações, conversam pelo WhatsApp e pelo chat do site, agendam compromissos e registram cada atendimento.
          </p>
          <p>
            A plataforma combina assistentes para telefone, WhatsApp e webchat em uma central unificada, com escopo de integrações e condições definidas conforme o plano.
          </p>
          <p>
            A Vocalis é desenvolvida pela Vocalis Tecnologia Ltda. com foco em empresas no Brasil.
          </p>
        </div>
      </section>

      {/* 4. RELEASES DE IMPRENSA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1A1816] tracking-tight mb-8 text-center sm:text-left">
          Releases de imprensa
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pressReleases.map((rel) => (
            <div
              key={rel.id}
              className="p-6 rounded-2xl bg-white border border-[#E7E4DC] shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <span className="inline-block px-2.5 py-0.5 rounded-md bg-[#FAF9F6] border border-[#E7E4DC] text-[10px] font-mono text-[#8C8881] mb-3">
                  {rel.date}
                </span>
                <h3 className="text-sm sm:text-base font-bold text-[#1A1816] leading-snug mb-3">
                  {rel.title}
                </h3>
                <p className="text-xs text-[#736F69] leading-relaxed mb-6">
                  {rel.summary}
                </p>
              </div>

              <div>
                <button
                  onClick={() => setSelectedRelease(rel)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1A1816] hover:text-[#4F46E5] transition-colors cursor-pointer group"
                >
                  <span>Ler artigo</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. DARK BANNER CTA */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto pb-16">
        <div className="relative rounded-3xl bg-[#11100F] text-white p-8 sm:p-12 text-center overflow-hidden shadow-2xl">
          {/* Ambient Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-40 bg-[#4F46E5]/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
              Hoje alguém vai ligar.{' '}
              <span className="font-serif italic font-normal text-[#E89574]">
                Deixe a Vocalis atender.
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-[#A8A49C] leading-relaxed mb-8">
              Configure sua assistente conforme o plano escolhido e conheça os fluxos por telefone, WhatsApp e webchat.
            </p>
            <button
              onClick={() => {
                if (onOpenAuth) onOpenAuth();
              }}
              className="px-6 py-3 rounded-full bg-white hover:bg-[#F2EFE9] text-[#11100F] text-xs font-bold transition-all shadow-md cursor-pointer"
            >
              Criar minha Vocalis
            </button>
          </div>

          {/* Soundwave animada com frequência e legenda ilustrativa */}
          <LiveSoundwaveBars />
        </div>
      </section>

      {/* 6. PRE-FOOTER SLOGAN */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-left border-t border-[#ECEAE4]">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1A1816] tracking-tight">
          Toda empresa tem uma voz.
        </h2>
        <p className="text-2xl sm:text-3xl md:text-4xl font-serif italic text-[#4F46E5] tracking-tight mt-1">
          Mais agilidade para atender seus clientes.
        </p>
      </section>

      {/* 7. MODAL: SOLICITAÇÕES DE IMPRENSA */}
      {isPressModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl border border-[#E7E4DC] shadow-2xl w-full max-w-lg p-6 sm:p-8 relative animate-scaleUp">
            <button
              onClick={handleResetPressForm}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-[#FAF9F5] text-[#8C8881] hover:text-[#1A1816] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {!pressSubmitted ? (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-xl bg-[#EEF2FF] text-[#4F46E5] flex items-center justify-center">
                    <Megaphone className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#4F46E5]">
                    Assessoria de Imprensa
                  </span>
                </div>

                <h3 className="text-xl font-extrabold text-[#1A1816] tracking-tight mb-2">
                  Contato de Mídia & Pautas
                </h3>
                <p className="text-xs text-[#736F69] leading-relaxed mb-6">
                  Nossa assessoria atende jornalistas e veículos de imprensa com prioridade, fornecendo porta-vozes, dados de mercado e demonstrações.
                </p>

                <form onSubmit={handleSubmitPressForm} className="space-y-4 text-left">
                  <div>
                    <label className="block text-xs font-semibold text-[#1A1816] mb-1">
                      Nome do jornalista / repórter *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Ex: Mariana Castro"
                      value={pressForm.name}
                      onChange={(e) => setPressForm({ ...pressForm, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5D2C9] bg-white text-xs text-[#1A1816] placeholder:text-[#9A968E] outline-none focus:border-[#4F46E5]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#1A1816] mb-1">
                        Veículo de imprensa / Mídia *
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="Ex: Exame, Valor, CNN, Podcast..."
                        value={pressForm.outlet}
                        onChange={(e) => setPressForm({ ...pressForm, outlet: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5D2C9] bg-white text-xs text-[#1A1816] placeholder:text-[#9A968E] outline-none focus:border-[#4F46E5]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#1A1816] mb-1">
                        E-mail de contato *
                      </label>
                      <input
                        required
                        type="email"
                        placeholder="jornalista@veiculo.com.br"
                        value={pressForm.email}
                        onChange={(e) => setPressForm({ ...pressForm, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5D2C9] bg-white text-xs text-[#1A1816] placeholder:text-[#9A968E] outline-none focus:border-[#4F46E5]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#1A1816] mb-1">
                        Telefone / WhatsApp
                      </label>
                      <input
                        type="tel"
                        placeholder="(11) 98888-8888"
                        value={pressForm.phone}
                        onChange={(e) => setPressForm({ ...pressForm, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5D2C9] bg-white text-xs text-[#1A1816] placeholder:text-[#9A968E] outline-none focus:border-[#4F46E5]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#1A1816] mb-1">
                        Prazo de fechamento da matéria
                      </label>
                      <input
                        type="text"
                        placeholder="Ex: Hoje até 18h, ou 2 dias"
                        value={pressForm.deadline}
                        onChange={(e) => setPressForm({ ...pressForm, deadline: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5D2C9] bg-white text-xs text-[#1A1816] placeholder:text-[#9A968E] outline-none focus:border-[#4F46E5]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1A1816] mb-1">
                      Assunto / Descrição da pauta *
                    </label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Descreva o tema da reportagem, perguntas desejadas ou necessidade de entrevista..."
                      value={pressForm.topic}
                      onChange={(e) => setPressForm({ ...pressForm, topic: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5D2C9] bg-white text-xs text-[#1A1816] placeholder:text-[#9A968E] outline-none focus:border-[#4F46E5] resize-none"
                    />
                  </div>

                  {pressError && (
                    <div role="alert" className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                      <span>{pressError}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={pressSubmitting}
                    className="w-full py-3 rounded-full bg-[#1A1816] hover:bg-[#302D2A] text-white text-xs font-bold transition-all shadow-md cursor-pointer flex items-center justify-center gap-2 mt-4 disabled:opacity-60"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{pressSubmitting ? 'Enviando solicitação...' : 'Enviar solicitação de imprensa'}</span>
                  </button>
                </form>
              </div>
            ) : (
              <div className="py-8 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#EEF2FF] text-[#4F46E5] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#1A1816]">
                  Solicitação recebida com sucesso!
                </h3>
                <p className="text-xs text-[#736F69] max-w-sm mx-auto leading-relaxed">
                  Obrigado, <strong className="text-[#1A1816]">{pressForm.name}</strong> ({pressForm.outlet}). Nosso time de relações públicas entrará em contato pelo e-mail informado no prazo informado.
                </p>
                <button
                  onClick={handleResetPressForm}
                  className="px-6 py-2.5 rounded-full bg-[#1A1816] text-white text-xs font-bold hover:bg-[#302D2A] transition-all cursor-pointer"
                >
                  Fechar
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 8. MODAL: MEDIA KIT / LOGOS E FOTOS */}
      {isMediaKitModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl border border-[#E7E4DC] shadow-2xl w-full max-w-xl p-6 sm:p-8 relative animate-scaleUp">
            <button
              onClick={() => setIsMediaKitModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-[#FAF9F5] text-[#8C8881] hover:text-[#1A1816] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-xl bg-[#EEF2FF] text-[#4F46E5] flex items-center justify-center">
                <ImageIcon className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#4F46E5]">
                Kit de Marca & Mídia
              </span>
            </div>

            <h3 className="text-xl font-extrabold text-[#1A1816] tracking-tight mb-2">
              Ativos Oficiais da Vocalis
            </h3>
            <p className="text-xs text-[#736F69] leading-relaxed mb-6">
              Faça download de logos vetoriais, fotografias de divulgação e diretrizes de identidade visual para uso editorial.
            </p>

            <div className="space-y-3 mb-6">
              {/* Asset 1: Vector Logos */}
              <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#E7E4DC] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white border border-[#E7E4DC] flex items-center justify-center text-[#4F46E5] font-bold">
                    SVG
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#1A1816]">
                      Logotipos Vetoriais (SVG + PNG Alta Resolução)
                    </div>
                    <div className="text-[11px] text-[#736F69]">
                      Versões escura, clara, monocromática e ícone isolado
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setMediaKitNotice('Pacote de logotipos disponibilizado mediante solicitação para contato@vocalis.ai.')}
                  className="px-3 py-1.5 rounded-lg bg-white border border-[#D5D2C9] text-xs font-semibold text-[#1A1816] hover:bg-[#EEF2FF] transition-colors cursor-pointer shadow-2xs"
                >
                  Solicitar
                </button>
              </div>

              {/* Asset 2: High-res Screenshots */}
              <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#E7E4DC] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white border border-[#E7E4DC] flex items-center justify-center text-[#1A1816] font-bold">
                    HD
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#1A1816]">
                      Capturas de Tela do Produto & Fotos Institucionais
                    </div>
                    <div className="text-[11px] text-[#736F69]">
                      Painel de voz, interface de WhatsApp e materiais de divulgação
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setMediaKitNotice('Pacote de imagens disponibilizado mediante solicitação para contato@vocalis.ai.')}
                  className="px-3 py-1.5 rounded-lg bg-white border border-[#D5D2C9] text-xs font-semibold text-[#1A1816] hover:bg-[#EEF2FF] transition-colors cursor-pointer shadow-2xs"
                >
                  Solicitar
                </button>
              </div>
              {mediaKitNotice && (
                <div role="status" className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-950 text-xs">
                  {mediaKitNotice}
                </div>
              )}
            </div>

            {/* Colors Guidelines */}
            <div className="p-4 rounded-xl bg-[#EEF2FF] border border-[#E8D9C8]">
              <div className="text-xs font-bold text-[#1A1816] mb-2">
                Paleta de Cores Primária
              </div>
              <div className="flex items-center gap-4 text-xs font-mono">
                <div className="flex items-center gap-1.5">
                  <span className="w-3.5 h-3.5 rounded-full bg-[#4F46E5] border border-black/10 inline-block" />
                  <span>#4F46E5 (Terracota)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3.5 h-3.5 rounded-full bg-[#1A1816] border border-black/10 inline-block" />
                  <span>#1A1816 (Preto Onyx)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3.5 h-3.5 rounded-full bg-[#FAF9F5] border border-black/10 inline-block" />
                  <span>#FAF9F5 (Off-white)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 9. MODAL: DETALHES DO RELEASE DE IMPRENSA */}
      {selectedRelease && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl border border-[#E7E4DC] shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto p-6 sm:p-8 relative animate-scaleUp">
            <button
              onClick={() => setSelectedRelease(null)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-[#FAF9F5] text-[#8C8881] hover:text-[#1A1816] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <span className="inline-block px-2.5 py-0.5 rounded-md bg-[#FAF9F6] border border-[#E7E4DC] text-[10px] font-mono text-[#8C8881] mb-2">
                {selectedRelease.date} · Press Release Oficial
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#1A1816] tracking-tight leading-snug">
                {selectedRelease.title}
              </h2>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-[#403E39] leading-relaxed pb-6 border-b border-[#ECEAE4]">
              <p className="font-bold text-[#1A1816]">
                {selectedRelease.content.location} —
              </p>
              {selectedRelease.content.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}

              {selectedRelease.content.quote && (
                <blockquote className="p-4 rounded-xl bg-[#EEF2FF] border-l-4 border-[#4F46E5] text-xs sm:text-sm text-[#5C3A21] italic my-4">
                  {selectedRelease.content.quote}
                  <footer className="text-[11px] font-semibold text-[#8C8881] not-italic mt-2">
                    — {selectedRelease.content.author}
                  </footer>
                </blockquote>
              )}
            </div>

            <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-[#8C8881] gap-2">
              <span>Contato de imprensa: imprensa@vocalis.ai</span>
              <button
                onClick={() => {
                  setSelectedRelease(null);
                  setIsPressModalOpen(true);
                }}
                className="font-bold text-[#4F46E5] hover:underline cursor-pointer"
              >
                Solicitar entrevista com porta-voz &gt;
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
