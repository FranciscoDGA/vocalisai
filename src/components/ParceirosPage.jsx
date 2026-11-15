import React, { useState } from 'react';
import LiveSoundwaveBars from './LiveSoundwaveBars';
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
      q: 'Indicar e revender â€” qual Ã© a diferenÃ§a?',
      cat: 'indicar',
      a: 'No modelo Indicar, vocÃª apenas apresenta o cliente Ã  Vocalis atravÃ©s do seu link exclusivo ou cadastro direto. NÃ³s cuidamos de toda a demonstraÃ§Ã£o, cobranÃ§a, suporte tÃ©cnico e atendimento. VocÃª recebe de 15% a 35% de comissÃ£o recorrente todos os meses enquanto o cliente permanecer ativo. No modelo Revender, vocÃª mesmo comercializa o serviÃ§o, embute sua prÃ³pria margem de lucro e presta o primeiro nÃ­vel de atendimento.'
    },
    {
      q: 'E se minha indicaÃ§Ã£o cancelar?',
      cat: 'indicar',
      a: 'A comissÃ£o Ã© recorrente mensal sobre os valores efetivamente pagos pelo cliente. Caso ele encerre o contrato, os pagamentos referentes a essa conta sÃ£o cessados sem nenhuma penalidade ou estorno de comissÃµes passadas para vocÃª.'
    },
    {
      q: 'Quando e como recebo minhas comissÃµes?',
      cat: 'tudo',
      a: 'Os pagamentos sÃ£o apurados mensalmente e creditados atÃ© o dia 10 de cada mÃªs diretamente na sua conta corrente via PIX ou transferÃªncia bancÃ¡ria, com emissÃ£o de nota fiscal de prestaÃ§Ã£o de serviÃ§os ou RPA.'
    },
    {
      q: 'Posso vender meus prÃ³prios serviÃ§os em conjunto?',
      cat: 'revender',
      a: 'Com certeza! A maioria dos nossos parceiros revendedores agrega serviÃ§os de consultoria de processos, treinamento de equipes, configuraÃ§Ã£o de prompts neurais, integraÃ§Ã£o de CRMs e marketing, aumentando expressivamente o ticket mÃ©dio.'
    },
    {
      q: 'Como funciona o suporte para os clientes que indiquei?',
      cat: 'indicar',
      a: 'Clientes indicados contam com o suporte oficial da engenharia da Vocalis em horÃ¡rio comercial via WhatsApp, e-mail e central de ajuda, com SLA prioritÃ¡rio para planos corporativos.'
    },
    {
      q: 'A conta de parceiro Ã© gratuita ou hÃ¡ faturamento mÃ­nimo?',
      cat: 'tudo',
      a: 'Ã‰ 100% gratuita! NÃ£o cobramos mensalidade de adesÃ£o nem exigimos faturamento mÃ­nimo para vocÃª comeÃ§ar a faturar suas primeiras comissÃµes.'
    },
    {
      q: 'Existe treinamento ou materiais de venda?',
      cat: 'tudo',
      a: 'Sim! VocÃª terÃ¡ acesso imediato Ã  Central do Parceiro com apresentaÃ§Ãµes em PDF/PPT personalizÃ¡veis, roteiros de vendas, calculadoras de ROI para clientes e sessÃµes gravadas de demonstraÃ§Ã£o.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-[#1A1816] font-sans selection:bg-[#4F46E5] selection:text-white animate-fadeIn">
      
      {/* 1. HERO SECTION (Exact replica of screenshot) */}
      <section className="relative pt-16 pb-20 overflow-hidden text-center">
        {/* Subtle radial warmth background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-b from-[#EEF2FF] via-[#F6ECE0] to-transparent rounded-full blur-3xl opacity-70 -z-10 pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Badge pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E7E4DC] shadow-sm text-xs font-semibold text-[#1A1816] mb-6">
            <span className="w-2 h-2 rounded-full bg-[#4F46E5] animate-pulse"></span>
            <span>Programa de parceria Vocalis</span>
          </div>

          {/* Big Title */}
          <h1 className="text-4xl sm:text-6xl font-normal text-[#1A1816] tracking-tight leading-[1.1]">
            Receba atÃ© 35% de<br />
            <span className="font-serif-title italic text-[#4F46E5]">comissÃ£o sobre as vendas</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-5 text-base sm:text-lg text-[#5C5955] max-w-2xl mx-auto leading-relaxed">
            Torne-se parceiro da lÃ­der em atendimento por voz e conecte seus clientes com o futuro do atendimento. A melhor tecnologia, com 0 preocupaÃ§Ã£o tÃ©cnica.
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
              <div className="w-7 h-7 rounded-full bg-[#4F46E5] text-white flex items-center justify-center text-[10px] font-bold border-2 border-white">MR</div>
              <div className="w-7 h-7 rounded-full bg-[#4285F4] text-white flex items-center justify-center text-[10px] font-bold border-2 border-white">FL</div>
              <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold border-2 border-white">+</div>
            </div>
            <span>
              Mais de <strong className="text-[#1A1816]">120 parceiros</strong> jÃ¡ ganham conosco
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
              <span className="font-serif-title italic text-[#4F46E5]">um parceiro da Vocalis</span>
            </h2>
          </div>

          {/* 5 Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-10">
            {[
              'Receba atÃ© 35% de comissÃ£o sobre as vendas',
              'Renda recorrente previsÃ­vel todo mÃªs',
              'VocÃª indica, a Vocalis faz o resto',
              'Co-branding disponÃ­vel (powered by Vocalis)',
              'Minutos grÃ¡tis de demonstraÃ§Ã£o para seus clientes'
            ].map((text, i) => (
              <div key={i} className="p-4 rounded-2xl border border-[#E7E4DC] bg-[#FAF9F5] flex flex-col justify-between space-y-3">
                <div className="w-6 h-6 rounded-full bg-[#EEF2FF] border border-[#F2E8DC] text-[#4F46E5] flex items-center justify-center">
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
            <div className="absolute -left-20 -top-20 w-96 h-96 bg-[#4F46E5]/30 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative z-10">
              
              {/* Left: Video preview button */}
              <div className="space-y-4">
                <button 
                  onClick={onOpenDemo}
                  className="w-16 h-16 rounded-full bg-white text-[#1A1816] flex items-center justify-center hover:scale-105 transition-transform shadow-xl"
                >
                  <Play className="w-6 h-6 fill-current ml-1 text-[#4F46E5]" />
                </button>
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">
                  O programa de parceria Vocalis
                </h3>
                <p className="text-sm text-white/70 max-w-sm">
                  Descubra como agÃªncias, consultorias e integradores estÃ£o faturando alto adicionando inteligÃªncia de voz ao seu portfÃ³lio.
                </p>
              </div>

              {/* Right: Floating Partner Dashboard Preview */}
              <div className="bg-white rounded-2xl border border-[#E7E4DC] p-6 text-[#1A1816] shadow-2xl space-y-4">
                <div className="flex items-center justify-between border-b border-[#EBE8E2] pb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#8C8881]">
                    Painel do parceiro
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#EEF2FF] text-[#4F46E5] border border-[#F2E8DC]">
                    NÃ­vel Diamond
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 rounded-xl bg-[#FAF9F5] border border-[#EBE8E2]">
                    <div className="text-[11px] text-[#736F69]">ComissÃ£o este mÃªs</div>
                    <div className="text-xl sm:text-2xl font-bold text-[#1A1816] mt-0.5">R$ 21.450</div>
                    <div className="text-[10px] text-emerald-600 font-semibold mt-0.5">+18% vs mÃªs anterior</div>
                  </div>
                  <div className="p-3 rounded-xl bg-[#FAF9F5] border border-[#EBE8E2]">
                    <div className="text-[11px] text-[#736F69]">ParticipaÃ§Ã£o do faturamento</div>
                    <div className="text-xl sm:text-2xl font-bold text-[#4F46E5] mt-0.5">35%</div>
                    <div className="text-[10px] text-[#8C8881] mt-0.5">ComissÃ£o recorrente</div>
                  </div>
                </div>

                <div className="text-[11px] text-[#736F69] space-y-1 pt-1">
                  <div className="flex justify-between py-1 border-b border-[#F0EDE8]">
                    <span>Clientes ativos indicados</span>
                    <strong className="text-[#1A1816]">42 empresas</strong>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#F0EDE8]">
                    <span>PrÃ³ximo pagamento</span>
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
              Dois modelos para vocÃª lucrar. <strong className="text-[#1A1816]">Escolha o que melhor se adapta a seu negÃ³cio!</strong>
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
                  VocÃª escolhe entre indicar novos clientes diretamente ou integrar e revender sob a sua marca.
                </p>
              </div>

              {/* Minimal Diagram */}
              <div className="py-8 my-auto">
                <div className="flex flex-col items-center space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#1A1816] text-white flex items-center justify-center font-bold text-xs shadow-md">
                    VocÃª
                  </div>
                  <div className="w-[1.5px] h-6 bg-[#4F46E5]"></div>
                  <div className="grid grid-cols-2 gap-3 w-full">
                    <div className="p-2.5 rounded-xl bg-[#EEF2FF] border border-[#F2E8DC] text-center text-[11px] font-bold text-[#4F46E5]">
                      Indicar (Link)
                    </div>
                    <div className="p-2.5 rounded-xl bg-[#EEF2FF] border border-[#F2E8DC] text-center text-[11px] font-bold text-[#4F46E5]">
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
                  <span className="text-xs font-bold text-[#4F46E5]">15% a 35% comissÃ£o</span>
                </div>
                <h4 className="text-base font-bold text-[#1A1816]">Indicar</h4>
                <p className="text-xs text-[#5C5955] leading-relaxed">
                  <strong>Indique a Vocalis</strong> e nÃ³s cuidamos de todo o processo de venda, ativaÃ§Ã£o e suporte tÃ©cnico. VocÃª recebe comissÃµes mensais recorrentes enquanto o cliente pagar a mensalidade.
                </p>
              </div>

              {/* Revender */}
              <div className="p-6 rounded-3xl border border-[#E7E4DC] bg-white space-y-2 flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-[#8C8881] border border-[#E0DCD4] rounded-md px-1.5 py-0.5">
                    03
                  </span>
                  <span className="text-xs font-bold text-[#4F46E5]">Margem livre</span>
                </div>
                <h4 className="text-base font-bold text-[#1A1816]">Revender</h4>
                <p className="text-xs text-[#5C5955] leading-relaxed">
                  <strong>Revenda a Vocalis</strong> sob a sua prÃ³pria soluÃ§Ã£o. VocÃª define o preÃ§o cobrado do cliente final e adquire minutos e licenÃ§as a preÃ§o de atacado conosco.
                </p>
              </div>

            </div>

            {/* Card 3: Suporte e AtivaÃ§Ã£o */}
            <div className="p-6 rounded-3xl border border-[#E7E4DC] bg-white flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold text-[#8C8881] border border-[#E0DCD4] rounded-md px-1.5 py-0.5">
                  04
                </span>
                <h3 className="text-lg font-bold text-[#1A1816] mt-4 mb-2">Suporte & ativaÃ§Ã£o</h3>
                <p className="text-xs text-[#5C5955] leading-relaxed">
                  Plataforma pronta em que seu cliente tem acesso a nÃºmeros nacionais, gravaÃ§Ã£o em nuvem e painel de controle prÃ³prio.
                </p>
              </div>

              {/* Mockup cards */}
              <div className="space-y-2 py-4">
                {[
                  { name: 'ClÃ­nica OdontoMais', valor: 'R$ 690/mÃªs', status: 'Ativo' },
                  { name: 'ImobiliÃ¡ria Prime SP', valor: 'R$ 1.800/mÃªs', status: 'Ativo' },
                  { name: 'Advocacia Freitas', valor: 'R$ 690/mÃªs', status: 'Ativo' }
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
                MÃ©tricas atualizadas em tempo real
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

      {/* 4. SECTION: NÃVEL DA PARCERIA (Tiered Table) */}
      <section className="py-20 bg-white border-t border-[#EBE8E2]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-normal text-[#1A1816] tracking-tight">
              NÃ­vel da parceria
            </h2>
            <p className="mt-2 text-sm text-[#5C5955]">
              Identifique sua faixa de comissÃµes conforme seu faturamento gerado para a Vocalis.
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
                  <th className="p-4 sm:p-5">NÃ­vel</th>
                  <th className="p-4 sm:p-5 text-right">ComissÃ£o</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EBE8E2]">
                <tr className="hover:bg-[#FAF9F5]">
                  <td className="p-4 sm:p-5">
                    <div className="font-bold text-[#1A1816]">Bronze</div>
                    <div className="text-xs text-[#8C8881]">Faturamento mensal atÃ© R$ 5.000</div>
                  </td>
                  <td className="p-4 sm:p-5 text-right">
                    <span className="text-base sm:text-lg font-bold text-[#1A1816]">15%</span>
                    <span className="text-xs text-[#8C8881] block">~ R$ 750/mÃªs</span>
                  </td>
                </tr>

                <tr className="hover:bg-[#FAF9F5]">
                  <td className="p-4 sm:p-5">
                    <div className="font-bold text-[#1A1816]">Silver</div>
                    <div className="text-xs text-[#8C8881]">Faturamento mensal atÃ© R$ 20.000</div>
                  </td>
                  <td className="p-4 sm:p-5 text-right">
                    <span className="text-base sm:text-lg font-bold text-[#1A1816]">20%</span>
                    <span className="text-xs text-[#8C8881] block">~ R$ 4.000/mÃªs</span>
                  </td>
                </tr>

                <tr className="hover:bg-[#FAF9F5]">
                  <td className="p-4 sm:p-5">
                    <div className="font-bold text-[#1A1816]">Gold</div>
                    <div className="text-xs text-[#8C8881]">Faturamento mensal atÃ© R$ 50.000</div>
                  </td>
                  <td className="p-4 sm:p-5 text-right">
                    <span className="text-base sm:text-lg font-bold text-[#1A1816]">25%</span>
                    <span className="text-xs text-[#8C8881] block">~ R$ 12.500/mÃªs</span>
                  </td>
                </tr>

                <tr className="hover:bg-[#FAF9F5]">
                  <td className="p-4 sm:p-5">
                    <div className="font-bold text-[#1A1816]">Platinum</div>
                    <div className="text-xs text-[#8C8881]">Faturamento mensal atÃ© R$ 100.000</div>
                  </td>
                  <td className="p-4 sm:p-5 text-right">
                    <span className="text-base sm:text-lg font-bold text-[#1A1816]">30%</span>
                    <span className="text-xs text-[#8C8881] block">~ R$ 30.000/mÃªs</span>
                  </td>
                </tr>

                <tr className="bg-[#EEF2FF]/50 hover:bg-[#EEF2FF]">
                  <td className="p-4 sm:p-5">
                    <div className="font-bold text-[#4F46E5] flex items-center gap-1.5">
                      <span>Diamond</span>
                      <Award className="w-4 h-4" />
                    </div>
                    <div className="text-xs text-[#8C8881]">Faturamento mensal acima de R$ 100.000</div>
                  </td>
                  <td className="p-4 sm:p-5 text-right">
                    <span className="text-base sm:text-lg font-bold text-[#4F46E5]">35%</span>
                    <span className="text-xs text-[#8C8881] block">~ R$ 35.000+/mÃªs</span>
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

      {/* 5. SECTION: UMA BASE EM QUE VOCÃŠ PODE SE APOIAR */}
      <section className="py-16 bg-[#FAF9F5] border-t border-[#EBE8E2] text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-normal text-[#1A1816] tracking-tight">
            Uma base em que<br />
            <span className="font-serif-title italic text-[#4F46E5]">vocÃª pode se apoiar.</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#5C5955] max-w-2xl mx-auto leading-relaxed">
            A Vocalis integra-se com mais de 2.000+ ferramentas disponÃ­veis no mercado. Seus clientes vÃ£o poder usar a Vocalis com seus sistemas atuais.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm font-semibold text-[#1A1816]">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-[#E7E4DC] shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#4F46E5]"></span>
              <span>Mais de 100 conectores nativos de CRM</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-[#E7E4DC] shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#4F46E5]"></span>
              <span>Webhooks em tempo real</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-[#E7E4DC] shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#4F46E5]"></span>
              <span>DocumentaÃ§Ã£o com API pÃºblica</span>
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
                      className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-[#1A1816] hover:text-[#4F46E5] transition-colors"
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
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-[#4F46E5]/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-4 max-w-2xl mx-auto">
              <h3 className="text-2xl sm:text-4xl font-normal tracking-tight">
                VocÃª procura uma parceria personalizada?
              </h3>
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                Tem uma comunidade, co-branding ou algo que ainda nem imaginamos? Converse com nosso time de parcerias e definiremos um modelo personalizado.
              </p>

              <div className="pt-4">
                <button
                  onClick={onOpenDemo}
                  className="px-8 py-3 rounded-full bg-white text-[#1A1816] text-xs sm:text-sm font-bold hover:bg-[#FAF9F5] transition-colors shadow-lg"
                >
                  VocÃª procura uma parceria personalizada?
                </button>
              </div>
            </div>

            {/* Audio Waveform Graphic */}
            <LiveSoundwaveBars
              palette="indigo"
              className="mt-10"
              heights={[20, 30, 45, 25, 38, 55, 70, 50, 32, 65, 85, 60, 40, 75, 95, 65, 45, 30, 55, 80, 50, 26, 40, 22]}
              latencySuffix="Infraestrutura white-label para parceiros"
            />

          </div>
        </div>
      </section>

      {/* 8. SECTION: BOLD BRAND SLOGAN */}
      <section className="py-20 text-center bg-white border-t border-[#EBE8E2]">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl sm:text-6xl font-normal text-[#1A1816] tracking-tight leading-[1.12]">
            Toda empresa tem uma voz.<br />
            <span className="font-serif-title italic text-[#4F46E5]">A sua nunca mais fica em silÃªncio.</span>
          </h2>
        </div>
      </section>

    </div>
  );
}
