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
  Image as ImageIcon
} from 'lucide-react';
import { BRAND } from '../data/content';

export default function ImprensaPage({ onOpenDemo, onOpenAuth, onNavigateHome }) {
  const [isPressModalOpen, setIsPressModalOpen] = useState(false);
  const [isMediaKitModalOpen, setIsMediaKitModalOpen] = useState(false);
  const [selectedRelease, setSelectedRelease] = useState(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const [pressForm, setPressForm] = useState({
    name: '',
    outlet: '',
    email: '',
    phone: '',
    topic: '',
    deadline: ''
  });
  const [pressSubmitted, setPressSubmitted] = useState(false);

  const pressReleases = [
    {
      id: 'release-1',
      date: '20.12.2025',
      title: 'Vocalis lanÃ§a assistentes de IA para telefone, WhatsApp e chat do site para pequenas e mÃ©dias empresas',
      summary: 'Nova suÃ­te unificada combina reconhecimento de voz de ultrabaixa latÃªncia em portuguÃªs do Brasil com automaÃ§Ã£o em mÃºltiplos canais sem necessidade de cÃ³digo.',
      content: {
        location: 'SÃƒO PAULO (SP)',
        paragraphs: [
          'A Vocalis Tecnologia anunciou hoje o lanÃ§amento oficial de sua plataforma de comunicaÃ§Ã£o com inteligÃªncia artificial conversacional desenhada sob medida para o mercado brasileiro de pequenas e mÃ©dias empresas.',
          'Diferente das URAs convencionais ou robÃ´s de texto estÃ¡ticos, a Vocalis emprega modelos acÃºsticos prÃ³prios treinados na fonÃ©tica e nos sotaques regionais do Brasil. O assistente telefÃ´nico atende ligaÃ§Ãµes em menos de 1 segundo, compreende interrupÃ§Ãµes e responde dÃºvidas complexas em linguagem natural com latÃªncia ponta a ponta inferior a 500 milissegundos.',
          'AlÃ©m do atendimento telefÃ´nico receptivo e ativo com nÃºmeros homologados pela Anatel, a plataforma integra de forma nativa com a API oficial do WhatsApp (enviando e recebendo Ã¡udios humanizados) e disponibiliza um widget de Webchat instalÃ¡vel em apenas uma linha de cÃ³digo.',
          'Com mais de 100 integraÃ§Ãµes com sistemas como Google Agenda, HubSpot, RD Station e ERPs nacionais, a Vocalis jÃ¡ atende clÃ­nicas mÃ©dicas, escritÃ³rios jurÃ­dicos, imobiliÃ¡rias e empresas de serviÃ§os que antes perdiam chamadas por falta de equipe dedicada 24 horas.'
        ],
        quote: 'â€œNosso objetivo Ã© garantir que nenhuma empresa brasileira fique em silÃªncio. Um cliente que liga para agendar uma consulta ou tirar uma dÃºvida precisa ser acolhido com calor humano e eficiÃªncia imediata, seja Ã s 14h de uma terÃ§a ou Ã s 23h de um domingo.â€',
        author: 'Equipe de LideranÃ§a Vocalis'
      }
    },
    {
      id: 'release-2',
      date: '15.01.2026',
      title: 'Vocalis ultrapassa 1 milhÃ£o de minutos de voz processados e anuncia expansÃ£o de rede de parceiros white-label',
      summary: 'Empresa acelera adoÃ§Ã£o entre agÃªncias e integradores de telecomunicaÃ§Ãµes que jÃ¡ oferecem agentes de voz com marca prÃ³pria.',
      content: {
        location: 'SÃƒO PAULO (SP)',
        paragraphs: [
          'Apenas semanas apÃ³s o lanÃ§amento de sua versÃ£o 2.0, a Vocalis atingiu o marco de 1 milhÃ£o de minutos de conversaÃ§Ã£o por voz operados por inteligÃªncia artificial em territÃ³rio nacional.',
          'O crescimento expressivo reflete a alta demanda de PMEs por atendimento automatizado que nÃ£o pareÃ§a robÃ³tico. Segundo mÃ©tricas da prÃ³pria plataforma, a taxa de resoluÃ§Ã£o na primeira chamada (FCR) superou 82% no Ãºltimo trimestre.',
          'Para impulsionar a distribuiÃ§Ã£o, a Vocalis ampliou seu programa de parceiros certificados, permitindo que consultorias de TI e agÃªncias de marketing revendam a tecnologia em modelo white-label com margens de receita recorrente de atÃ© 50%.'
        ],
        quote: 'â€œA voz humana continua sendo o canal de maior confianÃ§a para decisÃµes de compra e agendamentos importantes no Brasil. Democratizar agentes de voz de padrÃ£o internacional para qualquer PME Ã© a nossa missÃ£o.â€',
        author: 'Diretoria de InovaÃ§Ã£o Vocalis'
      }
    }
  ];

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('imprensa@vocalis.ai');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmitPressForm = (e) => {
    e.preventDefault();
    if (!pressForm.name || !pressForm.email || !pressForm.outlet) return;
    setPressSubmitted(true);
  };

  const handleResetPressForm = () => {
    setPressSubmitted(false);
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
          <span>Ãrea de imprensa</span>
        </div>

        {/* Headline */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1A1816] tracking-tight leading-tight max-w-2xl mx-auto mb-4">
          Recursos para imprensa & mÃ­dia
        </h1>

        {/* Subtitle with email */}
        <p className="text-xs sm:text-sm text-[#736F69] max-w-xl mx-auto mb-8">
          Para solicitaÃ§Ãµes de imprensa, entre em contato por e-mail em:{' '}
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

        {/* Action Buttons: SolicitaÃ§Ãµes de imprensa & SolicitaÃ§Ãµes de clientes */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => setIsPressModalOpen(true)}
            className="px-6 py-2.5 rounded-full bg-[#1A1816] hover:bg-[#302D2A] text-white text-xs font-semibold transition-all shadow-sm cursor-pointer"
          >
            SolicitaÃ§Ãµes de imprensa
          </button>
          <button
            onClick={() => {
              if (onOpenDemo) onOpenDemo();
            }}
            className="px-6 py-2.5 rounded-full bg-[#4F46E5] hover:bg-[#B04118] text-white text-xs font-semibold transition-all shadow-sm cursor-pointer"
          >
            SolicitaÃ§Ãµes de clientes
          </button>
        </div>
      </section>

      {/* 2. STATS ROW (Canais de atendimento: 3 | IntegraÃ§Ãµes: 100+) */}
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
              IntegraÃ§Ãµes
            </div>
            <div className="text-4xl sm:text-5xl font-extrabold text-[#1A1816] tracking-tight">
              100+
            </div>
          </div>
        </div>
      </section>

      {/* 3. SOBRE NÃ“S */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1A1816] tracking-tight mb-4">
          Sobre nÃ³s
        </h2>

        {/* Downloads Pill Links: Logos â†“ e Fotos para imprensa â†“ */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <button
            onClick={() => setIsMediaKitModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white border border-[#E7E4DC] text-xs font-medium text-[#403E39] hover:bg-[#FAF9F5] hover:border-[#4F46E5]/40 transition-colors shadow-2xs cursor-pointer"
          >
            <span>Logos</span>
            <span className="text-[#8C8881]">â†“</span>
          </button>
          <button
            onClick={() => setIsMediaKitModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white border border-[#E7E4DC] text-xs font-medium text-[#403E39] hover:bg-[#FAF9F5] hover:border-[#4F46E5]/40 transition-colors shadow-2xs cursor-pointer"
          >
            <span>Fotos para imprensa</span>
            <span className="text-[#8C8881]">â†“</span>
          </button>
        </div>

        {/* Descriptive Paragraphs (Adapted from print) */}
        <div className="space-y-6 text-xs sm:text-sm text-[#5C5955] leading-relaxed text-center sm:text-justify max-w-2xl mx-auto">
          <p>
            A Vocalis Ã© uma plataforma de IA para comunicaÃ§Ã£o com clientes, criada para pequenas e mÃ©dias empresas. Seus assistentes atendem ligaÃ§Ãµes, conversam pelo WhatsApp e pelo chat do site, agendam compromissos e registram cada atendimento.
          </p>
          <p>
            A plataforma comeÃ§ou com o assistente telefÃ´nico e evoluiu para um atendimento omnicanal, com agenda prÃ³pria, integraÃ§Ãµes com CRMs e ferramentas de automaÃ§Ã£o e uma central de conversas unificada.
          </p>
          <p>
            A Vocalis Ã© desenvolvida pela Vocalis Tecnologia Ltda., com sede em SÃ£o Paulo (SP), e atende empresas de todo o Brasil, de clÃ­nicas e escritÃ³rios a oficinas e restaurantes.
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
              Hoje alguÃ©m vai ligar.{' '}
              <span className="font-serif italic font-normal text-[#E89574]">
                Deixe a Vocalis atender.
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-[#A8A49C] leading-relaxed mb-8">
              Crie a sua assistente em poucos minutos e ouÃ§a como ela atende os seus clientes: por telefone, no WhatsApp e no chat do site.
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

          {/* Soundwave animada + latÃªncia ao vivo */}
          <LiveSoundwaveBars />

        </div>
      </section>

      {/* 6. PRE-FOOTER SLOGAN */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-left border-t border-[#ECEAE4]">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1A1816] tracking-tight">
          Toda empresa tem uma voz.
        </h2>
        <p className="text-2xl sm:text-3xl md:text-4xl font-serif italic text-[#4F46E5] tracking-tight mt-1">
          A sua nunca mais fica em silÃªncio.
        </p>
      </section>

      {/* 7. MODAL: SOLICITAÃ‡Ã•ES DE IMPRENSA */}
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
                  Contato de MÃ­dia & Pautas
                </h3>
                <p className="text-xs text-[#736F69] leading-relaxed mb-6">
                  Nossa assessoria atende jornalistas e veÃ­culos de imprensa com prioridade, fornecendo porta-vozes, dados de mercado e demonstraÃ§Ãµes.
                </p>

                <form onSubmit={handleSubmitPressForm} className="space-y-4 text-left">
                  <div>
                    <label className="block text-xs font-semibold text-[#1A1816] mb-1">
                      Nome do jornalista / repÃ³rter *
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
                        VeÃ­culo de imprensa / MÃ­dia *
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
                        Prazo de fechamento da matÃ©ria
                      </label>
                      <input
                        type="text"
                        placeholder="Ex: Hoje atÃ© 18h, ou 2 dias"
                        value={pressForm.deadline}
                        onChange={(e) => setPressForm({ ...pressForm, deadline: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5D2C9] bg-white text-xs text-[#1A1816] placeholder:text-[#9A968E] outline-none focus:border-[#4F46E5]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1A1816] mb-1">
                      Assunto / DescriÃ§Ã£o da pauta *
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

                  <button
                    type="submit"
                    className="w-full py-3 rounded-full bg-[#1A1816] hover:bg-[#302D2A] text-white text-xs font-bold transition-all shadow-md cursor-pointer flex items-center justify-center gap-2 mt-4"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Enviar solicitaÃ§Ã£o de imprensa</span>
                  </button>
                </form>
              </div>
            ) : (
              <div className="py-8 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#EEF2FF] text-[#4F46E5] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#1A1816]">
                  SolicitaÃ§Ã£o recebida com sucesso!
                </h3>
                <p className="text-xs text-[#736F69] max-w-sm mx-auto leading-relaxed">
                  Obrigado, <strong className="text-[#1A1816]">{pressForm.name}</strong> ({pressForm.outlet}). Nosso time de relaÃ§Ãµes pÃºblicas entrarÃ¡ em contato pelo e-mail informado no prazo informado.
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
                Kit de Marca & MÃ­dia
              </span>
            </div>

            <h3 className="text-xl font-extrabold text-[#1A1816] tracking-tight mb-2">
              Ativos Oficiais da Vocalis
            </h3>
            <p className="text-xs text-[#736F69] leading-relaxed mb-6">
              FaÃ§a download de logos vetoriais, fotografias de divulgaÃ§Ã£o e diretrizes de identidade visual para uso editorial.
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
                      Logotipos Vetoriais (SVG + PNG Alta ResoluÃ§Ã£o)
                    </div>
                    <div className="text-[11px] text-[#736F69]">
                      VersÃµes escura, clara, monocromÃ¡tica e Ã­cone isolado
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => alert('Download do pacote de logos iniciado!')}
                  className="px-3 py-1.5 rounded-lg bg-white border border-[#D5D2C9] text-xs font-semibold text-[#1A1816] hover:bg-[#EEF2FF] transition-colors cursor-pointer shadow-2xs"
                >
                  Baixar .ZIP
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
                      Painel de voz, interface de WhatsApp e fotos dos fundadores
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => alert('Download do pacote de imagens iniciado!')}
                  className="px-3 py-1.5 rounded-lg bg-white border border-[#D5D2C9] text-xs font-semibold text-[#1A1816] hover:bg-[#EEF2FF] transition-colors cursor-pointer shadow-2xs"
                >
                  Baixar .ZIP
                </button>
              </div>
            </div>

            {/* Colors Guidelines */}
            <div className="p-4 rounded-xl bg-[#EEF2FF] border border-[#E8D9C8]">
              <div className="text-xs font-bold text-[#1A1816] mb-2">
                Paleta de Cores PrimÃ¡ria
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
                {selectedRelease.date} Â· Press Release Oficial
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#1A1816] tracking-tight leading-snug">
                {selectedRelease.title}
              </h2>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-[#403E39] leading-relaxed pb-6 border-b border-[#ECEAE4]">
              <p className="font-bold text-[#1A1816]">
                {selectedRelease.content.location} â€”
              </p>
              {selectedRelease.content.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}

              {selectedRelease.content.quote && (
                <blockquote className="p-4 rounded-xl bg-[#EEF2FF] border-l-4 border-[#4F46E5] text-xs sm:text-sm text-[#5C3A21] italic my-4">
                  {selectedRelease.content.quote}
                  <footer className="text-[11px] font-semibold text-[#8C8881] not-italic mt-2">
                    â€” {selectedRelease.content.author}
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
