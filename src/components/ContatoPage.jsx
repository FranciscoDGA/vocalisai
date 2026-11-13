import React, { useState } from 'react';
import {
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  ChevronDown,
  ChevronUp,
  Laptop,
  HeartHandshake,
  Copy,
  Check,
  Send,
  CheckCircle2,
  X,
  Sparkles,
  Building2,
  ShieldCheck
} from 'lucide-react';
import { BRAND } from '../data/content';

export default function ContatoPage({ onOpenDemo, onOpenAuth, onNavigate }) {
  const [activeFaq, setActiveFaq] = useState(null);
  const [contactType, setContactType] = useState(null); // 'cliente' | 'parceiro'
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('contato@vocalis.ai');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText('1132303340');
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setSubmitted(true);
  };

  const handleResetForm = () => {
    setSubmitted(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      message: ''
    });
    setContactType(null);
  };

  const faqs = [
    {
      q: 'Por que escolher a Vocalis como assistente de voz com IA?',
      a: 'A Vocalis é pioneira no Brasil em modelos acústicos calibrados especificamente para a prosódia, cadência e sotaques regionais do português brasileiro. Nossa latência ponta a ponta é inferior a 500ms, proporcionando conversas ultra-realistas com compreensão de interrupções naturais, sem parecer robótica. Além disso, unificamos telefone, WhatsApp e Webchat em um único painel inteligente com suporte a agendamento automático e CRM.'
    },
    {
      q: 'Onde os dados são armazenados?',
      a: 'Todos os dados de chamadas, áudios e transcrições são armazenados em data centers de nível militar no Brasil (São Paulo - região South America East da AWS e GCP), em estrita conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei 13.709/2018). As gravações contam com criptografia AES-256 em repouso e TLS 1.3 em trânsito.'
    },
    {
      q: 'Onde e como a Vocalis é desenvolvida?',
      a: 'A Vocalis é 100% desenvolvida no Brasil por uma equipe sênior de engenheiros de inteligência artificial, especialistas em processamento de sinais de áudio (DSP), telecomunicações VoIP e segurança da informação, com sede em São Paulo (SP).'
    },
    {
      q: 'Em quanto tempo posso ter o assistente telefônico pronto para uso?',
      a: 'Em menos de 10 minutos! O painel da Vocalis é totalmente intuitivo e no-code: basta escolher a voz, definir as instruções do prompt ou subir os documentos da sua empresa em PDF. Você já pode testar ligando para o assistente imediatamente ou apontar seu número atual para a plataforma.'
    },
    {
      q: 'E se a IA cometer erros?',
      a: 'A Vocalis possui guardrails avançados para impedir alucinações. Você delimita exatamente o que o assistente pode ou não responder. Caso surja uma pergunta fora do escopo ou uma situação complexa imprevista, a IA oferece transferir a chamada em tempo real para um ramal humano ou registrar o recado estruturado para retorno imediato.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-[#1A1816] font-sans">
      {/* 1. HERO SECTION */}
      <section className="pt-16 pb-12 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto text-center">
        {/* Pill Badge */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white border border-[#E7E4DC] text-xs font-medium text-[#5C5955] mb-5 shadow-2xs">
          <span>Contato</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1A1816] tracking-tight leading-tight mb-2">
          Vamos conversar!
        </h1>

        {/* Subtitle */}
        <p className="text-xs sm:text-sm text-[#736F69] mb-5">
          Como podemos te ajudar?
        </p>

        {/* Avatar Circles (AA, GV, CP) */}
        <div className="flex items-center justify-center -space-x-1.5 mb-8">
          <div className="w-7 h-7 rounded-full bg-[#F5E6D3] text-[#8C5E2D] font-bold text-[10px] flex items-center justify-center border-2 border-white shadow-2xs">
            AA
          </div>
          <div className="w-7 h-7 rounded-full bg-[#E5EDDB] text-[#4F6838] font-bold text-[10px] flex items-center justify-center border-2 border-white shadow-2xs">
            GV
          </div>
          <div className="w-7 h-7 rounded-full bg-[#DCE7F2] text-[#345878] font-bold text-[10px] flex items-center justify-center border-2 border-white shadow-2xs">
            CP
          </div>
        </div>

        {/* Choice Buttons (Quero ser cliente / Quero ser parceiro) */}
        <div className="space-y-3 max-w-md mx-auto">
          {/* Option 1: Quero ser cliente */}
          <button
            onClick={() => setContactType('cliente')}
            className="w-full p-4 rounded-2xl bg-white border border-[#E7E4DC] hover:border-[#C84B1F] shadow-2xs hover:shadow-md transition-all flex items-center justify-center gap-3 text-xs sm:text-sm font-bold text-[#1A1816] cursor-pointer group"
          >
            <Laptop className="w-4 h-4 text-[#C84B1F] group-hover:scale-110 transition-transform" />
            <span>💻 Quero ser cliente</span>
          </button>

          {/* Option 2: Quero ser parceiro */}
          <button
            onClick={() => {
              if (onNavigate) {
                onNavigate('parceiros');
              } else {
                setContactType('parceiro');
              }
            }}
            className="w-full p-4 rounded-2xl bg-white border border-[#E7E4DC] hover:border-[#C84B1F] shadow-2xs hover:shadow-md transition-all flex items-center justify-center gap-3 text-xs sm:text-sm font-bold text-[#1A1816] cursor-pointer group"
          >
            <HeartHandshake className="w-4 h-4 text-[#D97706] group-hover:scale-110 transition-transform" />
            <span>🤝 Quero ser parceiro</span>
          </button>
        </div>
      </section>

      {/* 2. ATUAÇÃO NACIONAL, COM SEDE (2 Columns) */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <h2 className="text-xl sm:text-2xl font-bold text-[#1A1816] text-center mb-10">
          Atuação nacional, com sede em São Paulo (SP)
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Left Visual Copper/Terracotta Card */}
          <div className="md:col-span-7 rounded-3xl bg-gradient-to-tr from-[#9C3714] via-[#C84B1F] to-[#E2764D] p-6 sm:p-8 aspect-[16/10] relative overflow-hidden shadow-lg flex flex-col justify-between">
            {/* Ambient Diagonal Line Texture */}
            <div
              className="absolute inset-0 opacity-15 pointer-events-none"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(45deg, #FFF 0, #FFF 1px, transparent 0, transparent 16px)'
              }}
            />
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full blur-2xl pointer-events-none" />

            <div />

            {/* Bottom Glass Badge matching print */}
            <div className="relative z-10 self-start">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-semibold shadow-xs">
                <MapPin className="w-3.5 h-3.5 text-white" />
                <span>Sede Vocalis: São Paulo (SP)</span>
              </div>
            </div>
          </div>

          {/* Right Column: Company Data & Legal Notice */}
          <div className="md:col-span-5 space-y-4 text-xs sm:text-sm text-[#403E39] leading-relaxed">
            <div>
              <h3 className="font-extrabold text-[#1A1816] text-base mb-1">
                Vocalis Tecnologia Ltda.
              </h3>
              <p className="text-xs text-[#736F69]">
                Av. Paulista, 1374, 11º andar — Bela Vista<br />
                São Paulo - SP, CEP 01310-100
              </p>
            </div>

            <div className="space-y-1.5 pt-1 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-[#1A1816]">CNPJ:</span>
                <span className="font-mono text-[#5C5955]">48.808.897/0001-59</span>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#8C8881]" />
                <button
                  onClick={handleCopyEmail}
                  className="hover:text-[#C84B1F] transition-colors underline decoration-[#C84B1F]/30 cursor-pointer inline-flex items-center gap-1"
                >
                  <span>contato@vocalis.ai</span>
                  {copiedEmail ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3 text-[#8C8881]" />}
                </button>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#8C8881]" />
                <span className="text-[#5C5955]">Ligue para a Joana:</span>
                <button
                  onClick={handleCopyPhone}
                  className="font-bold text-[#1A1816] hover:text-[#C84B1F] transition-colors cursor-pointer inline-flex items-center gap-1"
                >
                  <span>(11) 3230-3340</span>
                  {copiedPhone ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3 text-[#8C8881]" />}
                </button>
              </div>

              <div className="flex items-center gap-2">
                <MessageCircle className="w-3.5 h-3.5 text-[#8C8881]" />
                <span className="text-[#5C5955]">WhatsApp Comercial:</span>
                <a
                  href="https://wa.me/5594984423948?text=Ol%C3%A1%20Francisco!%20Vim%20pelo%20site%20da%20Vocalis%20AI%20e%20gostaria%20de%20um%20or%C3%A7amento."
                  target="_blank"
                  rel="noreferrer"
                  className="font-bold text-[#1A1816] hover:text-[#C84B1F] transition-colors"
                >
                  (94) 98442-3948 (AI Agency OS)
                </a>
              </div>
            </div>

            {/* Note about in-person visits */}
            <div className="pt-3 border-t border-[#ECEAE4]">
              <p className="text-[11px] text-[#8C8881] leading-relaxed">
                Não prestamos atendimento presencial sem agendamento prévio. Utilize os canais digitais ou telefônicos para agendar uma reunião com nossa equipe.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PERGUNTAS FREQUENTES (FAQ Accordion) */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1A1816] tracking-tight text-center mb-8">
          Perguntas frequentes
        </h2>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = activeFaq === index;
            return (
              <div
                key={index}
                className="rounded-2xl border border-[#E7E4DC] bg-white overflow-hidden transition-all shadow-2xs hover:border-[#D5D2C9]"
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-4 sm:p-5 text-left text-xs sm:text-sm font-bold text-[#1A1816] hover:text-[#C84B1F] transition-colors cursor-pointer gap-4"
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-[#C84B1F] shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[#8C8881] shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-4 pb-5 sm:px-5 text-xs sm:text-sm text-[#5C5955] leading-relaxed border-t border-[#F2EFE9] pt-3 animate-fadeIn">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. DARK BANNER CTA */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto pb-16">
        <div className="relative rounded-3xl bg-[#11100F] text-white p-8 sm:p-12 text-center overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-40 bg-[#C84B1F]/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
              Hoje alguém vai ligar.{' '}
              <span className="font-serif italic font-normal text-[#E89574]">
                Deixe a Vocalis atender.
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-[#A8A49C] leading-relaxed mb-8">
              Crie a sua assistente em poucos minutos e ouça como ela atende os seus clientes: por telefone, no WhatsApp e no chat do site.
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

          {/* Soundwave audio graphic bars */}
          <div className="mt-12 flex items-end justify-center gap-1 sm:gap-1.5 h-14 opacity-75">
            {[
              12, 18, 26, 38, 22, 15, 30, 48, 55, 32, 20, 35, 50, 42, 28, 18, 24, 38,
              54, 30, 22, 40, 52, 45, 30, 16, 25, 36, 48, 32, 19, 28, 42, 24, 15, 10
            ].map((height, i) => (
              <span
                key={i}
                className="w-1 sm:w-1.5 rounded-full bg-gradient-to-t from-[#B04118] via-[#E25C2B] to-[#F39C6B]"
                style={{ height: `${height}%` }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 5. PRE-FOOTER SLOGAN */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-left border-t border-[#ECEAE4]">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1A1816] tracking-tight">
          Toda empresa tem uma voz.
        </h2>
        <p className="text-2xl sm:text-3xl md:text-4xl font-serif italic text-[#C84B1F] tracking-tight mt-1">
          A sua nunca mais fica em silêncio.
        </p>
      </section>

      {/* 6. MODAL: FORMULÁRIO DE CONTATO (Quero ser cliente) */}
      {contactType && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl border border-[#E7E4DC] shadow-2xl w-full max-w-md p-6 sm:p-8 relative animate-scaleUp">
            <button
              onClick={handleResetForm}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-[#FAF9F5] text-[#8C8881] hover:text-[#1A1816] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {!submitted ? (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-xl bg-[#FAF5EE] text-[#C84B1F] flex items-center justify-center">
                    {contactType === 'cliente' ? <Laptop className="w-4 h-4" /> : <HeartHandshake className="w-4 h-4" />}
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#C84B1F]">
                    {contactType === 'cliente' ? 'Falar com Consultor Vocalis' : 'Parceria Vocalis'}
                  </span>
                </div>

                <h3 className="text-xl font-extrabold text-[#1A1816] tracking-tight mb-2">
                  {contactType === 'cliente' ? 'Quero ser cliente' : 'Quero ser parceiro'}
                </h3>
                <p className="text-xs text-[#736F69] leading-relaxed mb-6">
                  Preencha seus dados para receber uma demonstração personalizada no seu próprio telefone em menos de 10 minutos.
                </p>

                <form onSubmit={handleSubmitForm} className="space-y-4 text-left">
                  <div>
                    <label className="block text-xs font-semibold text-[#1A1816] mb-1">
                      Seu nome *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Ex: Carlos Andrade"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5D2C9] bg-white text-xs text-[#1A1816] placeholder:text-[#9A968E] outline-none focus:border-[#C84B1F]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#1A1816] mb-1">
                        E-mail de trabalho *
                      </label>
                      <input
                        required
                        type="email"
                        placeholder="carlos@suaempresa.com.br"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5D2C9] bg-white text-xs text-[#1A1816] placeholder:text-[#9A968E] outline-none focus:border-[#C84B1F]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#1A1816] mb-1">
                        Telefone / WhatsApp *
                      </label>
                      <input
                        required
                        type="tel"
                        placeholder="(11) 99999-9999"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5D2C9] bg-white text-xs text-[#1A1816] placeholder:text-[#9A968E] outline-none focus:border-[#C84B1F]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1A1816] mb-1">
                      Nome da empresa ou clínica
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: Clínica Saúde Total"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5D2C9] bg-white text-xs text-[#1A1816] placeholder:text-[#9A968E] outline-none focus:border-[#C84B1F]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1A1816] mb-1">
                      Mensagem / Canal prioritário
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Gostaria de testar voz no telefone, no WhatsApp..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5D2C9] bg-white text-xs text-[#1A1816] placeholder:text-[#9A968E] outline-none focus:border-[#C84B1F] resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-full bg-[#1A1816] hover:bg-[#302D2A] text-white text-xs font-bold transition-all shadow-md cursor-pointer flex items-center justify-center gap-2 mt-4"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Solicitar contato agora</span>
                  </button>
                </form>
              </div>
            ) : (
              <div className="py-8 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#FAF5EE] text-[#C84B1F] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#1A1816]">
                  Mensagem recebida com sucesso!
                </h3>
                <p className="text-xs text-[#736F69] max-w-sm mx-auto leading-relaxed">
                  Obrigado, <strong className="text-[#1A1816]">{formData.name}</strong>. Nosso especialista entrará em contato pelo telefone <strong>{formData.phone}</strong> para demonstrar a IA da Vocalis ao vivo.
                </p>
                <button
                  onClick={handleResetForm}
                  className="px-6 py-2.5 rounded-full bg-[#1A1816] text-white text-xs font-bold hover:bg-[#302D2A] transition-all cursor-pointer"
                >
                  Concluir
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
