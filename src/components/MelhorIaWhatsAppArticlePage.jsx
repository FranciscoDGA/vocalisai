import React, { useEffect, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Calendar,
  CheckCircle2,
  ChevronDown,
  Clock,
  MessageCircle,
  Mic,
  ShieldCheck,
  Sparkles,
  Users,
  Workflow,
  XCircle,
} from 'lucide-react';

const ARTICLE_META = {
  title: 'Melhor IA para Atendimento no WhatsApp (2026): Como Escolher, Recursos Essenciais e Comparativo | Vocalis AI',
  description:
    'Descubra qual é a melhor IA para atendimento no WhatsApp em 2026. Compare chatbots de fluxo fixo vs. agentes de IA conversacionais com áudio, API Oficial, CRM, transbordo humano e LGPD.',
  canonical: 'https://vocalisai-phi.vercel.app/blog/melhor-ia-para-atendimento-whatsapp',
  publishedAt: '2026-11-21',
  readingTime: '9 min de leitura',
};

const FAQ_ITEMS = [
  {
    q: 'Qual é a melhor IA para atendimento no WhatsApp em 2026?',
    a: 'A melhor IA para atendimento no WhatsApp em 2026 é aquela que combina linguagem natural em português brasileiro, entendimento e envio de áudios, integração com sua agenda ou CRM, transbordo humano com contexto e conformidade com a LGPD. Em vez de menus numéricos rígidos, agentes conversacionais como o Vocalis AI resolvem triagem, dúvidas frequentes e agendamentos 24/7.',
  },
  {
    q: 'Qual a diferença entre chatbot comum e agente de IA no WhatsApp?',
    a: 'O chatbot comum (fluxo fixo) depende de botões ou menus numéricos (“digite 1 para vendas”) e trava quando o cliente escreve fora do roteiro ou envia áudio. Já o agente de IA conversacional entende intenção, contexto, gírias e mensagens de voz, respondendo de forma natural e executando ações como agendar horários ou consultar pedidos.',
  },
  {
    q: 'A IA consegue ouvir e responder áudios no WhatsApp?',
    a: 'Sim. Plataformas modernas de atendimento com IA transcrevem automaticamente os áudios enviados pelos clientes em português brasileiro e podem responder tanto em texto quanto em áudio com voz natural, mantendo o ritmo real de conversa no WhatsApp.',
  },
  {
    q: 'Preciso usar a API Oficial do WhatsApp (Cloud API) para ter IA?',
    a: 'Para operações comerciais com alto volume, múltiplos atendentes e necessidade de estabilidade e conformidade com as políticas da Meta, a API Oficial (WhatsApp Business Platform) é a recomendação mais segura. Soluções não oficiais costumam ter maior risco de bloqueio de número e instabilidade.',
  },
  {
    q: 'O que acontece quando o cliente precisa falar com um humano?',
    a: 'Um bom agente de IA possui transbordo humano (handoff) configurado por regras: diante de temas sensíveis, negociações complexas ou solicitação direta do cliente, a conversa é encaminhada para a equipe humana junto com o resumo completo do que já foi coletado.',
  },
  {
    q: 'Usar IA no atendimento pelo WhatsApp está de acordo com a LGPD?',
    a: 'Sim, desde que a plataforma adote boas práticas de proteção de dados: transparência sobre o atendimento automatizado, coleta apenas dos dados necessários, controle de acesso, criptografia em trânsito e possibilidade de exclusão de dados quando solicitado pelo titular.',
  },
];

const PROFILE_COMPARISON = [
  {
    profile: 'Clínicas e Consultórios',
    priority: 'Triagem inicial, agendamento e confirmação de consultas sem fila',
    essential: 'Integração com agenda, entendimento de áudios, lembretes e transbordo para recepção',
    avoid: 'Menus rígidos que não entendem sintomas gerais ou remarcações rápidas',
    idealModel: 'Agente de IA conversacional (texto + áudio) com agenda integrada',
  },
  {
    profile: 'Escritórios de Advocacia',
    priority: 'Qualificação de demandas, coleta de documentos e agendamento de reunião',
    essential: 'Roteiro controlado, registro de histórico, privacidade (LGPD) e handoff para advogado',
    avoid: 'IAs sem controle de escopo que dão parecer jurídico sem revisão humana',
    idealModel: 'Agente de IA de triagem com regras estritas e encaminhamento qualificado',
  },
  {
    profile: 'E-commerce e Varejo',
    priority: 'Dúvidas sobre produtos, status de pedido, trocas e recuperação de carrinho',
    essential: 'API Oficial para alto volume, integração com ERP/loja e catálogo atualizado',
    avoid: 'Conexões não oficiais sujeitas a bloqueio em picos promocionais',
    idealModel: 'Agente de IA omnichannel integrado ao catálogo e sistema de pedidos',
  },
  {
    profile: 'Negócios Locais e Serviços',
    priority: 'Responder rápido fora do horário comercial e não perder orçamentos',
    essential: 'Implantação simples, resposta em áudio/texto e envio do lead pronto no WhatsApp',
    avoid: 'Plataformas complexas que exigem equipe técnica para manter fluxos',
    idealModel: 'Agente de IA pronto para operar 24/7 com foco em agilidade e orçamento',
  },
];

export default function MelhorIaWhatsAppArticlePage({
  onOpenDemo,
  onOpenAuth,
  onNavigate,
  onNavigateHome,
}) {
  const [openFaq, setOpenFaq] = useState(0);

  useEffect(() => {
    const prevTitle = document.title;
    document.title = ARTICLE_META.title;

    let metaDesc = document.querySelector('meta[name="description"]');
    const prevDesc = metaDesc?.getAttribute('content') || '';
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', ARTICLE_META.description);

    let canonicalLink = document.querySelector('link[rel="canonical"]');
    const prevCanonical = canonicalLink?.getAttribute('href') || '';
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', ARTICLE_META.canonical);

    const jsonLd = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          headline:
            'Melhor IA para Atendimento no WhatsApp (2026): Como Escolher, Recursos Essenciais e Comparativo',
          description: ARTICLE_META.description,
          inLanguage: 'pt-BR',
          datePublished: ARTICLE_META.publishedAt,
          dateModified: ARTICLE_META.publishedAt,
          author: {
            '@type': 'Organization',
            name: 'Vocalis AI',
            url: 'https://vocalisai-phi.vercel.app/',
          },
          publisher: {
            '@type': 'Organization',
            name: 'Vocalis AI',
            url: 'https://vocalisai-phi.vercel.app/',
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': ARTICLE_META.canonical,
          },
        },
        {
          '@type': 'FAQPage',
          mainEntity: FAQ_ITEMS.map((item) => ({
            '@type': 'Question',
            name: item.q,
            acceptedAnswer: {
              '@type': 'Answer',
              text: item.a,
            },
          })),
        },
      ],
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'article-melhor-ia-whatsapp-jsonld';
    script.text = JSON.stringify(jsonLd);
    document.head.appendChild(script);

    return () => {
      document.title = prevTitle;
      if (metaDesc && prevDesc) metaDesc.setAttribute('content', prevDesc);
      if (canonicalLink && prevCanonical) canonicalLink.setAttribute('href', prevCanonical);
      const existingScript = document.getElementById('article-melhor-ia-whatsapp-jsonld');
      if (existingScript) existingScript.remove();
    };
  }, []);

  return (
    <article className="bg-[#FAF9F5] text-[#1A1816] min-h-screen pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb & Back */}
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center justify-between gap-3 mb-8 text-xs text-[#736F69]">
          <div className="flex items-center gap-2">
            <button
              onClick={() => (onNavigateHome ? onNavigateHome() : onNavigate?.('home'))}
              className="inline-flex items-center gap-1.5 text-[#5C5955] hover:text-[#4F46E5] transition-colors cursor-pointer font-medium"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Voltar para a página inicial</span>
            </button>
            <span>/</span>
            <span>Guias & Blog</span>
            <span>/</span>
            <span className="text-[#1A1816] font-medium">IA para WhatsApp</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#4F46E5]" />
              Atualizado em Novembro de 2026
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#4F46E5]" />
              {ARTICLE_META.readingTime}
            </span>
          </div>
        </nav>

        {/* Header */}
        <header className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4F46E5]/10 text-[#4F46E5] text-xs font-semibold mb-4">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Guia Completo 2026 · Atendimento com IA</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-[#1A1816] leading-[1.15] mb-5">
            Melhor IA para Atendimento no WhatsApp (2026): Como Escolher, Recursos Essenciais e Comparativo
          </h1>
          <p className="text-base sm:text-lg text-[#5C5955] leading-relaxed">
            Se a sua empresa perde leads por demora no WhatsApp ou sofre com menus numéricos que irritam o cliente,
            entender como escolher a <strong>melhor IA para atendimento no WhatsApp</strong> em 2026 é o passo mais
            importante para escalar vendas e suporte com qualidade.
          </p>
        </header>

        {/* GEO / Featured Snippet Direct Answer Box */}
        <section
          aria-label="Resposta direta"
          className="bg-white border-2 border-[#4F46E5]/25 rounded-2xl p-6 sm:p-8 mb-12 shadow-sm"
        >
          <div className="flex items-center gap-2 text-[#4F46E5] text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-4 h-4" />
            <span>Resposta Direta · O que define a melhor IA em 2026</span>
          </div>
          <p className="text-sm sm:text-base text-[#1A1816] leading-relaxed mb-4">
            A <strong>melhor IA para atendimento no WhatsApp em 2026</strong> não é um chatbot de botões, mas um{' '}
            <strong>agente de IA conversacional</strong> capaz de: (1) entender e responder em português brasileiro
            natural, (2) transcrever e enviar <strong>mensagens de áudio</strong>, (3) conectar-se à sua{' '}
            <strong>agenda ou CRM</strong>, (4) fazer <strong>transbordo humano com resumo do contexto</strong> e (5)
            operar com segurança sob a <strong>LGPD</strong>.
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs sm:text-sm text-[#5C5955]">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
              <span>Atendimento imediato 24/7 sem fila de espera</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
              <span>Compreensão real de áudios longos e texto informal</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
              <span>Triagem, qualificação e agendamento automático</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
              <span>Passagem suave para atendente humano quando necessário</span>
            </li>
          </ul>
        </section>

        {/* Table of Contents */}
        <div className="bg-white border border-[#EBE8E2] rounded-2xl p-5 mb-12">
          <h2 className="text-xs font-bold uppercase tracking-wider text-[#8C8881] mb-3">
            Neste guia você vai ver
          </h2>
          <ol className="space-y-2 text-sm text-[#5C5955] list-decimal list-inside">
            <li>
              <a href="#chatbot-vs-agente" className="hover:text-[#4F46E5] transition-colors">
                Chatbot de fluxo fixo (URA/botões) vs. Agente de IA conversacional
              </a>
            </li>
            <li>
              <a href="#criterios-2026" className="hover:text-[#4F46E5] transition-colors">
                5 critérios essenciais para escolher a melhor IA no WhatsApp em 2026
              </a>
            </li>
            <li>
              <a href="#comparativo-perfis" className="hover:text-[#4F46E5] transition-colors">
                Tabela comparativa: qual solução funciona melhor por perfil de empresa
              </a>
            </li>
            <li>
              <a href="#faq" className="hover:text-[#4F46E5] transition-colors">
                Perguntas frequentes sobre IA no WhatsApp
              </a>
            </li>
          </ol>
        </div>

        {/* Section 1: Chatbot vs Conversational AI Agent */}
        <section id="chatbot-vs-agente" className="mb-14 scroll-mt-24">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1816] mb-4">
            1. Chatbot de fluxo fixo (URAs/botões) vs. Agente de IA conversacional
          </h2>
          <p className="text-base text-[#5C5955] leading-relaxed mb-6">
            Muitas empresas ainda confundem automação tradicional com inteligência artificial. No WhatsApp brasileiro,
            onde o cliente costuma mandar um áudio de 40 segundos explicando tudo de uma vez, essa diferença determina
            se a conversa vira venda ou abandono.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Fixed Flow */}
            <div className="bg-white border border-[#EBE8E2] rounded-2xl p-6">
              <div className="flex items-center gap-2 text-[#DC2626] text-xs font-bold uppercase tracking-wider mb-3">
                <XCircle className="w-4 h-4" />
                <span>Chatbot de Fluxo Fixo (URA / Botões)</span>
              </div>
              <ul className="space-y-3 text-sm text-[#5C5955]">
                <li className="flex items-start gap-2.5">
                  <span className="text-[#DC2626] font-bold">•</span>
                  <span>Obriga o cliente a navegar por menus rígidos (“Digite 1 para vendas, 2 para suporte”).</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#DC2626] font-bold">•</span>
                  <span>Não entende áudios nem perguntas fora do roteiro exato, respondendo “Desculpe, não entendi”.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#DC2626] font-bold">•</span>
                  <span>Exige manutenção manual constante de árvores de decisão complexas.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#DC2626] font-bold">•</span>
                  <span>Gera sensação robótica e aumenta a taxa de desistência em leads quentes.</span>
                </li>
              </ul>
            </div>

            {/* Conversational AI Agent */}
            <div className="bg-white border-2 border-[#4F46E5]/30 rounded-2xl p-6">
              <div className="flex items-center gap-2 text-[#4F46E5] text-xs font-bold uppercase tracking-wider mb-3">
                <CheckCircle2 className="w-4 h-4" />
                <span>Agente de IA Conversacional (Texto + Áudio)</span>
              </div>
              <ul className="space-y-3 text-sm text-[#1A1816]">
                <li className="flex items-start gap-2.5">
                  <span className="text-[#4F46E5] font-bold">•</span>
                  <span>Interpreta a intenção real do cliente mesmo com mensagens fragmentadas, gírias ou erros de digitação.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#4F46E5] font-bold">•</span>
                  <span>Ouve áudios no WhatsApp e pode responder em texto ou voz natural em português do Brasil.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#4F46E5] font-bold">•</span>
                  <span>Consulta regras do negócio, qualifica o lead e realiza agendamentos automaticamente.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#4F46E5] font-bold">•</span>
                  <span>Encaminha para o atendente humano certo com um resumo objetivo do atendimento.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 2: 5 Essential Criteria in 2026 */}
        <section id="criterios-2026" className="mb-14 scroll-mt-24">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1816] mb-4">
            2. Critérios essenciais para escolher a melhor IA para WhatsApp em 2026
          </h2>
          <p className="text-base text-[#5C5955] leading-relaxed mb-8">
            Antes de contratar qualquer ferramenta, avalie cinco pilares técnicos e operacionais que separam soluções
            experimentais de plataformas prontas para atendimento empresarial.
          </p>

          <div className="space-y-5">
            <div className="bg-white border border-[#EBE8E2] rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-xl bg-[#4F46E5]/10 text-[#4F46E5] flex items-center justify-center shrink-0">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-[#1A1816]">
                  1. API Oficial do WhatsApp vs. conexões não oficiais
                </h3>
              </div>
              <p className="text-sm sm:text-base text-[#5C5955] leading-relaxed">
                Conexões não oficiais (via leitura de QR Code em bibliotecas de terceiros) podem parecer mais baratas no
                início, mas carregam risco de desconexão repentina e bloqueio do número pela Meta. Para empresas que
                dependem do WhatsApp como canal principal de receita, avalie o suporte à{' '}
                <strong>API Oficial do WhatsApp Business (Cloud API)</strong> e verifique claramente na proposta como
                funcionam os custos de provedor e de conversas da Meta.
              </p>
            </div>

            <div className="bg-white border border-[#EBE8E2] rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-xl bg-[#4F46E5]/10 text-[#4F46E5] flex items-center justify-center shrink-0">
                  <Mic className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-[#1A1816]">
                  2. Transcrição e resposta por áudio em português natural
                </h3>
              </div>
              <p className="text-sm sm:text-base text-[#5C5955] leading-relaxed">
                No Brasil, grande parte dos clientes prefere mandar áudio. Uma IA que ignora mensagens de voz ou pede
                para o cliente “escrever em texto” quebra a experiência. Priorize plataformas que transcrevem áudios com
                alta precisão em PT-BR e, quando fizer sentido para o seu público, também respondem com voz natural.
              </p>
            </div>

            <div className="bg-white border border-[#EBE8E2] rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-xl bg-[#4F46E5]/10 text-[#4F46E5] flex items-center justify-center shrink-0">
                  <Workflow className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-[#1A1816]">
                  3. Integração real com CRM, agenda e sistemas internos
                </h3>
              </div>
              <p className="text-sm sm:text-base text-[#5C5955] leading-relaxed">
                Responder perguntas é apenas metade do trabalho. O ganho real de produtividade acontece quando a IA
                consulta disponibilidade na agenda, registra o lead no CRM, atualiza etapas do funil ou dispara webhooks
                para o seu sistema interno sem retrabalho manual da equipe.
              </p>
            </div>

            <div className="bg-white border border-[#EBE8E2] rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-xl bg-[#4F46E5]/10 text-[#4F46E5] flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-[#1A1816]">
                  4. Transbordo humano inteligente (Handoff com contexto)
                </h3>
              </div>
              <p className="text-sm sm:text-base text-[#5C5955] leading-relaxed">
                Nenhuma empresa deve “prender” o cliente no robô. A melhor IA reconhece quando o caso exige empatia,
                negociação personalizada ou análise técnica, pausa a automação naquela conversa e transfere para o
                especialista humano junto com um resumo estruturado dos dados já coletados.
              </p>
            </div>

            <div className="bg-white border border-[#EBE8E2] rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-xl bg-[#4F46E5]/10 text-[#4F46E5] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-[#1A1816]">
                  5. Conformidade com a LGPD e governança de respostas
                </h3>
              </div>
              <p className="text-sm sm:text-base text-[#5C5955] leading-relaxed">
                Verifique se o fornecedor trata dados em conformidade com a <strong>LGPD</strong>, oferece políticas
                claras de privacidade e exclusão de dados, e permite restringir o conhecimento da IA à base oficial da
                sua empresa — evitando promessas indevidas, descontos não autorizados ou respostas fora de escopo.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Comparison Table by Company Profile */}
        <section id="comparativo-perfis" className="mb-14 scroll-mt-24">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1816] mb-4">
            3. Comparativo: qual IA escolher por perfil de empresa
          </h2>
          <p className="text-base text-[#5C5955] leading-relaxed mb-6">
            A escolha ideal muda conforme o tipo de operação, volume de mensagens e sensibilidade dos dados tratados.
            Use a tabela abaixo como guia prático:
          </p>

          <div className="overflow-x-auto bg-white border border-[#EBE8E2] rounded-2xl shadow-sm">
            <table className="w-full text-left border-collapse min-w-[680px]">
              <thead>
                <tr className="border-b border-[#EBE8E2] bg-[#FAF9F5] text-xs uppercase tracking-wider text-[#736F69]">
                  <th className="py-4 px-5 font-bold">Perfil de Empresa</th>
                  <th className="py-4 px-5 font-bold">Prioridade no WhatsApp</th>
                  <th className="py-4 px-5 font-bold">Recursos Essenciais</th>
                  <th className="py-4 px-5 font-bold">Modelo Recomendado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EBE8E2] text-sm">
                {PROFILE_COMPARISON.map((row) => (
                  <tr key={row.profile} className="hover:bg-[#FAF9F5]/60 transition-colors">
                    <td className="py-4 px-5 font-semibold text-[#1A1816] align-top">{row.profile}</td>
                    <td className="py-4 px-5 text-[#5C5955] align-top">{row.priority}</td>
                    <td className="py-4 px-5 text-[#5C5955] align-top">{row.essential}</td>
                    <td className="py-4 px-5 text-[#4F46E5] font-medium align-top">{row.idealModel}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 4: FAQ */}
        <section id="faq" className="mb-14 scroll-mt-24">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1816] mb-6">
            4. Perguntas Frequentes (FAQ)
          </h2>
          <div className="space-y-3">
            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={item.q}
                  className="bg-white border border-[#EBE8E2] rounded-2xl overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                    className="w-full flex items-center justify-between gap-4 p-5 text-left cursor-pointer hover:bg-[#FAF9F5]/60 transition-colors"
                    aria-expanded={isOpen}
                  >
                    <span className="font-semibold text-sm sm:text-base text-[#1A1816]">
                      {item.q}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#736F69] shrink-0 transition-transform ${
                        isOpen ? 'rotate-180 text-[#4F46E5]' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-sm sm:text-base text-[#5C5955] leading-relaxed border-t border-[#EBE8E2]/60 pt-4">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Natural CTA for Vocalis AI */}
        <section className="bg-[#1A1816] text-white rounded-3xl p-8 sm:p-10 relative overflow-hidden">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-indigo-300 text-xs font-semibold mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Vocalis AI · Feita no Brasil, em português</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 leading-tight">
              Quer testar um agente de IA no WhatsApp com texto, áudio e transbordo humano?
            </h2>
            <p className="text-sm sm:text-base text-stone-300 leading-relaxed mb-6">
              A <strong>Vocalis AI</strong> une atendimento por WhatsApp, telefone e webchat em português brasileiro,
              com triagem configurável, agendamentos e encaminhamento para sua equipe humana conforme o plano contratado.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => onOpenDemo?.()}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] text-white text-sm font-semibold transition-colors cursor-pointer"
              >
                <span>Ver demonstração ao vivo</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => onNavigate?.('whatsapp')}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white text-sm font-semibold transition-colors cursor-pointer"
              >
                <span>Conhecer o WhatsApp com IA</span>
              </button>
              <button
                type="button"
                onClick={() => (onOpenAuth ? onOpenAuth() : onNavigate?.('precos'))}
                className="inline-flex items-center gap-2 px-4 py-3 text-stone-300 hover:text-white text-sm font-medium transition-colors cursor-pointer"
              >
                <span>Ver planos</span>
              </button>
            </div>
          </div>
        </section>
      </div>
    </article>
  );
}
