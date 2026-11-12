import React, { useState } from 'react';
import { 
  Check, ArrowRight, Play, Gift, Sparkles, ShieldCheck, ChevronDown, 
  ChevronUp, Users, DollarSign, Award, Layers, HelpCircle, ExternalLink,
  MessageSquare, Phone, Building, CheckCircle2, Copy
} from 'lucide-react';
import { BRAND } from '../data/content';

export default function ParceirosPage({ onOpenDemo, onOpenAuth, onNavigateHome }) {
  const [partnerType, setPartnerType] = useState('indicar'); // 'indicar' | 'revender'
  const [faqCategory, setFaqCategory] = useState('tudo');
  const [openFaq, setOpenFaq] = useState(0); // first faq open by default

  const faqList = [
    {
      q: 'Indicar e revender — qual é a diferença?',
      cat: 'indicar',
      a: 'No modelo Indicar, você apenas apresenta o cliente à Vocalis através do seu link exclusivo ou cadastro direto. Nós cuidamos de toda a demonstração, cobrança, suporte técnico e atendimento. Você recebe de 15% a 35% de comissão recorrente todos os meses enquanto o cliente permanecer ativo. No modelo Revender, você mesmo comercializa o serviço, embute sua própria margem de lucro e presta o primeiro nível de atendimento.'
    },
    {
      q: 'E se minha indicação cancelar?',
      cat: 'indicar',
      a: 'A comissão é recorrente mensal sobre os valores efetivamente pagos pelo cliente. Caso ele encerre o contrato, os pagamentos referentes a essa conta são cessados sem nenhuma penalidade ou estorno de comissões passadas para você.'
    },
    {
      q: 'Quando e como recebo minhas comissões?',
      cat: 'tudo',
      a: 'Os pagamentos são apurados mensalmente e creditados até o dia 10 de cada mês diretamente na sua conta corrente via PIX ou transferência bancária, com emissão de nota fiscal de prestação de serviços ou RPA.'
    },
    {
      q: 'Posso vender meus próprios serviços em conjunto?',
      cat: 'revender',
      a: 'Com certeza! A maioria dos nossos parceiros revendedores agrega serviços de consultoria de processos, treinamento de equipes, configuração de prompts neurais, integração de CRMs e marketing, aumentando expressivamente o ticket médio.'
    },
    {
      q: 'Como funciona o suporte para os clientes que indiquei?',
      cat: 'indicar',
      a: 'Clientes indicados contam com o suporte oficial da engenharia da Vocalis em horário comercial via WhatsApp, e-mail e central de ajuda, com SLA prioritário para planos corporativos.'
    },
    {
      q: 'A conta de parceiro é gratuita ou há faturamento mínimo?',
      cat: 'tudo',
      a: 'É 100% gratuita! Não cobramos mensalidade de adesão nem exigimos faturamento mínimo para você começar a faturar suas primeiras comissões.'
    },
    {
      q: 'Existe treinamento ou materiais de venda?',
      cat: 'tudo',
      a: 'Sim! Você terá acesso imediato à Central do Parceiro com apresentações em PDF/PPT personalizáveis, roteiros de vendas, calculadoras de ROI para clientes e sessões gravadas de demonstração.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-[#1A1816] font-sans selection:bg-[#C84B1F] selection:text-white animate-fadeIn">
      
      {/* 1. HERO SECTION (Exact replica of screenshot) */}
      <section className="relative pt-16 pb-20 overflow-hidden text-center">
        {/* Subtle radial warmth background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-b from-[#FAF5EE] via-[#F6ECE0] to-transparent rounded-full blur-3xl opacity-70 -z-10 pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Badge pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E7E4DC] shadow-sm text-xs font-semibold text-[#1A1816] mb-6">
            <span className="w-2 h-2 rounded-full bg-[#C84B1F] animate-pulse"></span>
            <span>Programa de parceria Vocalis</span>
          </div>

          {/* Big Title */}
          <h1 className="text-4xl sm:text-6xl font-normal text-[#1A1816] tracking-tight leading-[1.1]">
            Receba até 35% de<br />
            <span className="font-serif-title italic text-[#C84B1F]">comissão sobre as vendas</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-5 text-base sm:text-lg text-[#5C5955] max-w-2xl mx-auto leading-relaxed">
            Torne-se parceiro da líder em atendimento por voz e conecte seus clientes com o futuro do atendimento. A melhor tecnologia, com 0 preocupação técnica.
          </p>

          {/* CTA Button */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onOpenDemo}
              className="px-8 py-3.5 rounded-full bg-[#1A1816] text-white text-sm font-semibold hover:bg-black transition-all shadow-md hover:shadow-lg flex items-center gap-2"
            >
              <span>Quero ser um parceiro agora</span>
              <ArrowRight className="w-4 h-4 text-[#A6A29A]" />
            </button>
          </div>

          {/* Social Proof Badges */}
          <div className="mt-8 flex items-center justify-center gap-3 text-xs text-[#5C5955]">
            <div className="flex -space-x-2">
              <div className="w-7 h-7 rounded-full bg-[#1A1816] text-white flex items-center justify-center text-[10px] font-bold border-2 border-white">JS</div>
              <div className="w-7 h-7 rounded-full bg-[#C84B1F] text-white flex items-center justify-center text-[10px] font-bold border-2 border-white">MR</div>
              <div className="w-7 h-7 rounded-full bg-[#4285F4] text-white flex items-center justify-center text-[10px] font-bold border-2 border-white">FL</div>
              <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold border-2 border-white">+</div>
            </div>
            <span>
              Mais de <strong className="text-[#1A1816]">120 parceiros</strong> já ganham conosco
            </span>
          </div>
        </div>
      </section>

      {/* 2. SECTION: VANTAGENS DE SER UM PARCEIRO */}
      <section className="py-16 bg-white border-t border-[#EBE8E2]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-normal text-[#1A1816] tracking-tight">
              Vantagens de ser<br />
              <span className="font-serif-title italic text-[#C84B1F]">um parceiro da Vocalis</span>
            </h2>
          </div>

          {/* 5 Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-10">
            {[
              'Receba até 35% de comissão sobre as vendas',
              'Renda recorrente previsível todo mês',
              'Você indica, a Vocalis faz o resto',
              'Co-branding disponível (powered by Vocalis)',
              'Minutos grátis de demonstração para seus clientes'
            ].map((text, i) => (
              <div key={i} className="p-4 rounded-2xl border border-[#E7E4DC] bg-[#FAF9F5] flex flex-col justify-between space-y-3">
                <div className="w-6 h-6 rounded-full bg-[#FAF5EE] border border-[#F2E8DC] text-[#C84B1F] flex items-center justify-center">
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
                <p className="text-xs font-semibold text-[#1A1816] leading-snug">
                  {text}
                </p>
              </div>
            ))}
          </div>

          {/* Big Visual Video / Dashboard Card */}
          <div className="rounded-3xl border border-[#E7E4DC] bg-gradient-to-br from-[#1A1816] via-[#2A1E18] to-[#1A1816] p-6 sm:p-12 text-white overflow-hidden relative shadow-2xl">
            {/* Glowing circle background */}
            <div className="absolute -left-20 -top-20 w-96 h-96 bg-[#C84B1F]/30 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative z-10">
              
              {/* Left: Video preview button */}
              <div className="space-y-4">
                <button 
                  onClick={onOpenDemo}
                  className="w-16 h-16 rounded-full bg-white text-[#1A1816] flex items-center justify-center hover:scale-105 transition-transform shadow-xl"
                >
                  <Play className="w-6 h-6 fill-current ml-1 text-[#C84B1F]" />
                </button>
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">
                  O programa de parceria Vocalis
                </h3>
                <p className="text-sm text-white/70 max-w-sm">
                  Descubra como agências, consultorias e integradores estão faturando alto adicionando inteligência de voz ao seu portfólio.
                </p>
              </div>

              {/* Right: Floating Partner Dashboard Preview */}
              <div className="bg-white rounded-2xl border border-[#E7E4DC] p-6 text-[#1A1816] shadow-2xl space-y-4">
                <div className="flex items-center justify-between border-b border-[#EBE8E2] pb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#8C8881]">
                    Painel do parceiro
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FAF5EE] text-[#C84B1F] border border-[#F2E8DC]">
                    Nível Diamond
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 rounded-xl bg-[#FAF9F5] border border-[#EBE8E2]">
                    <div className="text-[11px] text-[#736F69]">Comissão este mês</div>
                    <div className="text-xl sm:text-2xl font-bold text-[#1A1816] mt-0.5">R$ 21.450</div>
                    <div className="text-[10px] text-emerald-600 font-semibold mt-0.5">+18% vs mês anterior</div>
                  </div>
                  <div className="p-3 rounded-xl bg-[#FAF9F5] border border-[#EBE8E2]">
                    <div className="text-[11px] text-[#736F69]">Participação do faturamento</div>
                    <div className="text-xl sm:text-2xl font-bold text-[#C84B1F] mt-0.5">35%</div>
                    <div className="text-[10px] text-[#8C8881] mt-0.5">Comissão recorrente</div>
                  </div>
                </div>

                <div className="text-[11px] text-[#736F69] space-y-1 pt-1">
                  <div className="flex justify-between py-1 border-b border-[#F0EDE8]">
                    <span>Clientes ativos indicados</span>
                    <strong className="text-[#1A1816]">42 empresas</strong>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#F0EDE8]">
                    <span>Próximo pagamento</span>
                    <strong className="text-[#1A1816]">10 de Dezembro via PIX</strong>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 3. SECTION: INDICAR OU REVENDER */}
      <section className="py-20 bg-[#FAF9F5] border-t border-[#EBE8E2]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl font-normal text-[#1A1816] tracking-tight">
              Indicar ou revender
            </h2>
            <p className="mt-3 text-base text-[#5C5955]">
              Dois modelos para você lucrar. <strong className="text-[#1A1816]">Escolha o que melhor se adapta a seu negócio!</strong>
            </p>
          </div>

          {/* 3-Column Flow Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch mb-10">
            
            {/* Card 1: Fluxo Ilustrado */}
            <div className="p-6 rounded-3xl border border-[#E7E4DC] bg-white flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold text-[#8C8881] border border-[#E0DCD4] rounded-md px-1.5 py-0.5">
                  01
                </span>
                <h3 className="text-lg font-bold text-[#1A1816] mt-4 mb-2">Como funciona</h3>
                <p className="text-xs text-[#5C5955] leading-relaxed">
                  Você escolhe entre indicar novos clientes diretamente ou integrar e revender sob a sua marca.
                </p>
              </div>

              {/* Minimal Diagram */}
              <div className="py-8 my-auto">
                <div className="flex flex-col items-center space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#1A1816] text-white flex items-center justify-center font-bold text-xs shadow-md">
                    Você
                  </div>
                  <div className="w-[1.5px] h-6 bg-[#C84B1F]"></div>
                  <div className="grid grid-cols-2 gap-3 w-full">
                    <div className="p-2.5 rounded-xl bg-[#FAF5EE] border border-[#F2E8DC] text-center text-[11px] font-bold text-[#C84B1F]">
                      Indicar (Link)
                    </div>
                    <div className="p-2.5 rounded-xl bg-[#FAF5EE] border border-[#F2E8DC] text-center text-[11px] font-bold text-[#C84B1F]">
                      Revender (API)
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-[11px] text-[#8C8881] text-center pt-2 border-t border-[#F0EDE8]">
                Sem burocracia ou contrato de exclusividade
              </div>
            </div>

            {/* Card 2: Indicar & Revender Desdobrados */}
            <div className="space-y-4 flex flex-col justify-between">
              
              {/* Indicar */}
              <div className="p-6 rounded-3xl border border-[#E7E4DC] bg-white space-y-2 flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-[#8C8881] border border-[#E0DCD4] rounded-md px-1.5 py-0.5">
                    02
                  </span>
                  <span className="text-xs font-bold text-[#C84B1F]">15% a 35% comissão</span>
                </div>
                <h4 className="text-base font-bold text-[#1A1816]">Indicar</h4>
                <p className="text-xs text-[#5C5955] leading-relaxed">
                  <strong>Indique a Vocalis</strong> e nós cuidamos de todo o processo de venda, ativação e suporte técnico. Você recebe comissões mensais recorrentes enquanto o cliente pagar a mensalidade.
                </p>
              </div>

              {/* Revender */}
              <div className="p-6 rounded-3xl border border-[#E7E4DC] bg-white space-y-2 flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-[#8C8881] border border-[#E0DCD4] rounded-md px-1.5 py-0.5">
                    03
                  </span>
                  <span className="text-xs font-bold text-[#C84B1F]">Margem livre</span>
                </div>
                <h4 className="text-base font-bold text-[#1A1816]">Revender</h4>
                <p className="text-xs text-[#5C5955] leading-relaxed">
                  <strong>Revenda a Vocalis</strong> sob a sua própria solução. Você define o preço cobrado do cliente final e adquire minutos e licenças a preço de atacado conosco.
                </p>
              </div>

            </div>

            {/* Card 3: Suporte e Ativação */}
            <div className="p-6 rounded-3xl border border-[#E7E4DC] bg-white flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold text-[#8C8881] border border-[#E0DCD4] rounded-md px-1.5 py-0.5">
                  04
                </span>
                <h3 className="text-lg font-bold text-[#1A1816] mt-4 mb-2">Suporte & ativação</h3>
                <p className="text-xs text-[#5C5955] leading-relaxed">
                  Plataforma pronta em que seu cliente tem acesso a números nacionais, gravação em nuvem e painel de controle próprio.
                </p>
              </div>

              {/* Mockup cards */}
              <div className="space-y-2 py-4">
                {[
                  { name: 'Clínica OdontoMais', valor: 'R$ 690/mês', status: 'Ativo' },
                  { name: 'Imobiliária Prime SP', valor: 'R$ 1.800/mês', status: 'Ativo' },
                  { name: 'Advocacia Freitas', valor: 'R$ 690/mês', status: 'Ativo' }
                ].map((c, i) => (
                  <div key={i} className="p-3 rounded-xl border border-[#E7E4DC] bg-[#FAF9F5] flex items-center justify-between text-xs">
                    <div>
                      <div className="font-bold text-[#1A1816]">{c.name}</div>
                      <div className="text-[10px] text-[#8C8881]">{c.valor}</div>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {c.status}
                    </span>
                  </div>
                ))}
              </div>

              <div className="text-[11px] text-[#8C8881] text-center pt-2 border-t border-[#F0EDE8]">
                Métricas atualizadas em tempo real
              </div>
            </div>

          </div>

          <div className="text-center">
            <button
              onClick={onOpenDemo}
              className="px-8 py-3.5 rounded-full bg-[#1A1816] text-white text-sm font-semibold hover:bg-black transition-all shadow-md inline-flex items-center gap-2"
            >
              <span>Quero ser um parceiro agora</span>
              <ArrowRight className="w-4 h-4 text-[#A6A29A]" />
            </button>
          </div>

        </div>
      </section>

      {/* 4. SECTION: NÍVEL DA PARCERIA (Tiered Table) */}
      <section className="py-20 bg-white border-t border-[#EBE8E2]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-normal text-[#1A1816] tracking-tight">
              Nível da parceria
            </h2>
            <p className="mt-2 text-sm text-[#5C5955]">
              Identifique sua faixa de comissões conforme seu faturamento gerado para a Vocalis.
            </p>

            {/* Toggle Indicar / Revender */}
            <div className="inline-flex bg-[#FAF9F5] p-1 rounded-xl border border-[#E7E4DC] text-xs font-bold mt-6">
              <button
                onClick={() => setPartnerType('indicar')}
                className={`px-5 py-2 rounded-lg transition-all ${
                  partnerType === 'indicar' ? 'bg-white text-[#1A1816] shadow-sm' : 'text-[#736F69] hover:text-[#1A1816]'
                }`}
              >
                Indicar
              </button>
              <button
                onClick={() => setPartnerType('revender')}
                className={`px-5 py-2 rounded-lg transition-all ${
                  partnerType === 'revender' ? 'bg-white text-[#1A1816] shadow-sm' : 'text-[#736F69] hover:text-[#1A1816]'
                }`}
              >
                Revender
              </button>
            </div>
          </div>

          {/* Tier Table */}
          <div className="rounded-3xl border border-[#E7E4DC] overflow-hidden shadow-lg mb-8">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="bg-[#FAF9F5] border-b border-[#E7E4DC] text-[#736F69] font-semibold">
                  <th className="p-4 sm:p-5">Nível</th>
                  <th className="p-4 sm:p-5 text-right">Comissão</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EBE8E2]">
                <tr className="hover:bg-[#FAF9F5]">
                  <td className="p-4 sm:p-5">
                    <div className="font-bold text-[#1A1816]">Bronze</div>
                    <div className="text-xs text-[#8C8881]">Faturamento mensal até R$ 5.000</div>
                  </td>
                  <td className="p-4 sm:p-5 text-right">
                    <span className="text-base sm:text-lg font-bold text-[#1A1816]">15%</span>
                    <span className="text-xs text-[#8C8881] block">~ R$ 750/mês</span>
                  </td>
                </tr>

                <tr className="hover:bg-[#FAF9F5]">
                  <td className="p-4 sm:p-5">
                    <div className="font-bold text-[#1A1816]">Silver</div>
                    <div className="text-xs text-[#8C8881]">Faturamento mensal até R$ 20.000</div>
                  </td>
                  <td className="p-4 sm:p-5 text-right">
                    <span className="text-base sm:text-lg font-bold text-[#1A1816]">20%</span>
                    <span className="text-xs text-[#8C8881] block">~ R$ 4.000/mês</span>
                  </td>
                </tr>

                <tr className="hover:bg-[#FAF9F5]">
                  <td className="p-4 sm:p-5">
                    <div className="font-bold text-[#1A1816]">Gold</div>
                    <div className="text-xs text-[#8C8881]">Faturamento mensal até R$ 50.000</div>
                  </td>
                  <td className="p-4 sm:p-5 text-right">
                    <span className="text-base sm:text-lg font-bold text-[#1A1816]">25%</span>
                    <span className="text-xs text-[#8C8881] block">~ R$ 12.500/mês</span>
                  </td>
                </tr>

                <tr className="hover:bg-[#FAF9F5]">
                  <td className="p-4 sm:p-5">
                    <div className="font-bold text-[#1A1816]">Platinum</div>
                    <div className="text-xs text-[#8C8881]">Faturamento mensal até R$ 100.000</div>
                  </td>
                  <td className="p-4 sm:p-5 text-right">
                    <span className="text-base sm:text-lg font-bold text-[#1A1816]">30%</span>
                    <span className="text-xs text-[#8C8881] block">~ R$ 30.000/mês</span>
                  </td>
                </tr>

                <tr className="bg-[#FAF5EE]/50 hover:bg-[#FAF5EE]">
                  <td className="p-4 sm:p-5">
                    <div className="font-bold text-[#C84B1F] flex items-center gap-1.5">
                      <span>Diamond</span>
                      <Award className="w-4 h-4" />
                    </div>
                    <div className="text-xs text-[#8C8881]">Faturamento mensal acima de R$ 100.000</div>
                  </td>
                  <td className="p-4 sm:p-5 text-right">
                    <span className="text-base sm:text-lg font-bold text-[#C84B1F]">35%</span>
                    <span className="text-xs text-[#8C8881] block">~ R$ 35.000+/mês</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="text-center">
            <button
              onClick={onOpenDemo}
              className="px-8 py-3.5 rounded-full bg-[#1A1816] text-white text-sm font-semibold hover:bg-black transition-all shadow-md inline-flex items-center gap-2"
            >
              <span>Quero ser um parceiro agora</span>
              <ArrowRight className="w-4 h-4 text-[#A6A29A]" />
            </button>
          </div>

        </div>
      </section>

      {/* 5. SECTION: UMA BASE EM QUE VOCÊ PODE SE APOIAR */}
      <section className="py-16 bg-[#FAF9F5] border-t border-[#EBE8E2] text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-normal text-[#1A1816] tracking-tight">
            Uma base em que<br />
            <span className="font-serif-title italic text-[#C84B1F]">você pode se apoiar.</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#5C5955] max-w-2xl mx-auto leading-relaxed">
            A Vocalis integra-se com mais de 2.000+ ferramentas disponíveis no mercado. Seus clientes vão poder usar a Vocalis com seus sistemas atuais.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm font-semibold text-[#1A1816]">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-[#E7E4DC] shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#C84B1F]"></span>
              <span>Mais de 100 conectores nativos de CRM</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-[#E7E4DC] shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#C84B1F]"></span>
              <span>Webhooks em tempo real</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-[#E7E4DC] shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#C84B1F]"></span>
              <span>Documentação com API pública</span>
            </div>
          </div>
        </div>
      </section>

      {/* 6. SECTION: FAQ PARCEIROS */}
      <section className="py-20 bg-white border-t border-[#EBE8E2]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-normal text-[#1A1816] tracking-tight">
              Perguntas frequentes
            </h2>

            {/* Filter buttons */}
            <div className="inline-flex bg-[#FAF9F5] p-1 rounded-xl border border-[#E7E4DC] text-xs font-bold mt-6">
              {[
                { id: 'tudo', label: 'Tudo' },
                { id: 'indicar', label: 'Indicar' },
                { id: 'revender', label: 'Revender' }
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setFaqCategory(cat.id)}
                  className={`px-4 py-1.5 rounded-lg transition-all ${
                    faqCategory === cat.id ? 'bg-white text-[#1A1816] shadow-sm' : 'text-[#736F69] hover:text-[#1A1816]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Accordion List */}
          <div className="space-y-3">
            {faqList
              .filter(item => faqCategory === 'tudo' || item.cat === faqCategory || item.cat === 'tudo')
              .map((item, index) => {
                const isOpen = openFaq === index;
                return (
                  <div 
                    key={index} 
                    className="rounded-2xl border border-[#E7E4DC] bg-[#FAF9F5] overflow-hidden transition-colors"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-[#1A1816] hover:text-[#C84B1F] transition-colors"
                    >
                      <span>{item.q}</span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-[#8C8881] shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-[#8C8881] shrink-0" />
                      )}
                    </button>
                    {isOpen && (
                      <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-[#5C5955] leading-relaxed border-t border-[#EBE8E2] pt-3 animate-fadeIn">
                        {item.a}
                      </div>
                    )}
                  </div>
                );
              })}
          </div>

        </div>
      </section>

      {/* 7. SECTION: BOTTOM DARK HERO CARD */}
      <section className="py-16 bg-[#FAF9F5]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="rounded-3xl bg-[#1A1816] p-8 sm:p-14 text-white text-center relative overflow-hidden shadow-2xl">
            
            {/* Radial warmth glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-[#C84B1F]/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-4 max-w-2xl mx-auto">
              <h3 className="text-2xl sm:text-4xl font-normal tracking-tight">
                Você procura uma parceria personalizada?
              </h3>
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                Tem uma comunidade, co-branding ou algo que ainda nem imaginamos? Converse com nosso time de parcerias e definiremos um modelo personalizado.
              </p>

              <div className="pt-4">
                <button
                  onClick={onOpenDemo}
                  className="px-8 py-3 rounded-full bg-white text-[#1A1816] text-xs sm:text-sm font-bold hover:bg-[#FAF9F5] transition-colors shadow-lg"
                >
                  Você procura uma parceria personalizada?
                </button>
              </div>
            </div>

            {/* Audio Waveform Graphic */}
            <div className="mt-8 pt-4 flex items-center justify-center gap-1 opacity-25">
              {[12, 24, 40, 18, 30, 50, 65, 45, 25, 60, 80, 55, 35, 70, 90, 60, 40, 25, 50, 75, 45, 20, 35, 15].map((h, i) => (
                <span 
                  key={i} 
                  style={{ height: `${h * 0.4}px` }} 
                  className="w-1 bg-[#C84B1F] rounded-full"
                />
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* 8. SECTION: BOLD BRAND SLOGAN */}
      <section className="py-20 text-center bg-white border-t border-[#EBE8E2]">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl sm:text-6xl font-normal text-[#1A1816] tracking-tight leading-[1.12]">
            Toda empresa tem uma voz.<br />
            <span className="font-serif-title italic text-[#C84B1F]">A sua nunca mais fica em silêncio.</span>
          </h2>
        </div>
      </section>

    </div>
  );
}
