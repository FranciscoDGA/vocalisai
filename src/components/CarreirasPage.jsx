import React, { useState } from 'react';
import {
  Briefcase,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Users,
  Send,
  X,
  FileText,
  MapPin,
  Laptop,
  HeartHandshake
} from 'lucide-react';
import { BRAND } from '../data/content';

export default function CarreirasPage({ onOpenDemo, onOpenAuth, onNavigateHome }) {
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    roleArea: 'Engenharia de Software & IA',
    linkedin: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitApplication = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setSubmitted(true);
    setTimeout(() => {
      // Keep feedback visible for a moment
    }, 500);
  };

  const handleResetForm = () => {
    setSubmitted(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      roleArea: 'Engenharia de Software & IA',
      linkedin: '',
      message: ''
    });
    setIsApplyModalOpen(false);
  };

  const scrollToOpportunities = () => {
    const el = document.getElementById('oportunidades');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-[#1A1816] font-sans">
      {/* 1. HERO SECTION */}
      <section className="pt-16 pb-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
        {/* Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E7E4DC] text-xs font-medium text-[#5C5955] mb-6 shadow-2xs">
          <span className="w-2 h-2 rounded-full bg-[#C84B1F] animate-pulse"></span>
          <span>Carreiras na {BRAND.name}</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1A1816] tracking-tight leading-tight max-w-3xl mx-auto mb-6">
          Junte-se a nós para construir a suíte de comunicação com IA para PMEs.
        </h1>

        {/* CTA Button */}
        <div className="flex justify-center mb-12">
          <button
            onClick={scrollToOpportunities}
            className="px-6 py-3 rounded-full bg-[#1A1816] hover:bg-[#302D2A] text-white text-sm font-semibold transition-all shadow-sm cursor-pointer"
          >
            Trabalhe com a gente
          </button>
        </div>

        {/* Hero Visual Card: Warm gradient grid with team avatars */}
        <div className="w-full rounded-3xl bg-gradient-to-br from-[#E25C2B] via-[#D35222] to-[#B83E15] p-8 sm:p-12 shadow-lg relative overflow-hidden">
          {/* Subtle lighting glow on top-left */}
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-white/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-black/20 rounded-full blur-3xl pointer-events-none" />

          {/* Grid of Team Circles (Matching exact visual pattern in print) */}
          <div className="relative z-10 grid grid-cols-6 sm:grid-cols-10 md:grid-cols-12 gap-3 sm:gap-4 justify-items-center opacity-90">
            {Array.from({ length: 36 }).map((_, idx) => (
              <div
                key={idx}
                className="w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-white/25 hover:bg-white/40 transition-all flex items-center justify-center border border-white/20 backdrop-blur-xs cursor-default shadow-xs"
                title="Vocalis Team Member"
              >
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-white/50" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. COMO TRABALHAMOS (4 Cards) */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-[#1A1816] mb-8">
          Como trabalhamos
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1 */}
          <div className="p-6 rounded-2xl bg-white border border-[#E7E4DC] shadow-2xs hover:shadow-md transition-shadow">
            <h3 className="text-sm font-bold text-[#1A1816] mb-3">
              Dono do resultado
            </h3>
            <p className="text-xs text-[#736F69] leading-relaxed">
              Você cuida da sua área como se fosse a sua empresa.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-6 rounded-2xl bg-white border border-[#E7E4DC] shadow-2xs hover:shadow-md transition-shadow">
            <h3 className="text-sm font-bold text-[#1A1816] mb-3">
              Feedback direto
            </h3>
            <p className="text-xs text-[#736F69] leading-relaxed">
              Ser direto aumenta a velocidade.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-6 rounded-2xl bg-white border border-[#E7E4DC] shadow-2xs hover:shadow-md transition-shadow">
            <h3 className="text-sm font-bold text-[#1A1816] mb-3">
              Simplicidade
            </h3>
            <p className="text-xs text-[#736F69] leading-relaxed">
              Menos estrutura, mais entregas.
            </p>
          </div>

          {/* Card 4 */}
          <div className="p-6 rounded-2xl bg-white border border-[#E7E4DC] shadow-2xs hover:shadow-md transition-shadow">
            <h3 className="text-sm font-bold text-[#1A1816] mb-3">
              Sem reuniões recorrentes
            </h3>
            <p className="text-xs text-[#736F69] leading-relaxed">
              Assíncrono é frequência padrão. Síncrono só quando realmente faz sentido.
            </p>
          </div>
        </div>
      </section>

      {/* 3. VAGAS E OPORTUNIDADES (Status Card) */}
      <section id="oportunidades" className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1A1816] tracking-tight mb-3">
          Junte-se ao time para avançar rápido e se divertir no caminho.
        </h2>
        <p className="text-xs sm:text-sm text-[#736F69] max-w-xl mx-auto mb-10">
          Não mora na cidade da vaga? Sem problema: temos vagas remotas e ajudamos na mudança.
        </p>

        {/* Status Box matching print */}
        <div className="p-8 sm:p-12 rounded-2xl bg-white border border-[#E7E4DC] shadow-sm max-w-2xl mx-auto">
          <h3 className="text-base font-bold text-[#1A1816] mb-3">
            No momento não há vagas abertas.
          </h3>
          <p className="text-xs sm:text-sm text-[#736F69] leading-relaxed mb-6 max-w-lg mx-auto">
            Envie sua candidatura espontânea: o time da Vocalis recebe o seu contato e responde pelo e-mail informado quando surgir uma oportunidade com o seu perfil.
          </p>
          <button
            onClick={() => setIsApplyModalOpen(true)}
            className="px-6 py-2.5 rounded-full bg-[#1A1816] hover:bg-[#302D2A] text-white text-xs font-semibold transition-all shadow-sm cursor-pointer"
          >
            Enviar candidatura
          </button>
        </div>
      </section>

      {/* 4. DARK BANNER CTA (Não encontrou a vaga ideal?) */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto pb-16">
        <div className="relative rounded-3xl bg-[#11100F] text-white p-8 sm:p-12 text-center overflow-hidden shadow-2xl">
          {/* Subtle golden ambient glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-40 bg-[#C84B1F]/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
              Não encontrou a vaga ideal?
            </h2>
            <p className="text-xs sm:text-sm text-[#A8A49C] leading-relaxed mb-8">
              Envie uma candidatura espontânea. Guardamos o seu contato e avisamos quando surgir uma oportunidade com o seu perfil.
            </p>
            <button
              onClick={() => setIsApplyModalOpen(true)}
              className="px-6 py-3 rounded-full bg-white hover:bg-[#F2EFE9] text-[#11100F] text-xs font-bold transition-all shadow-md cursor-pointer"
            >
              Enviar candidatura espontânea
            </button>
          </div>

          {/* Soundwave audio graphic bars (exact match) */}
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

      {/* 6. MODAL: CANDIDATURA ESPONTÂNEA */}
      {isApplyModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl border border-[#E7E4DC] shadow-2xl w-full max-w-lg p-6 sm:p-8 relative animate-scaleUp">
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
                    <Briefcase className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#C84B1F]">
                    Banco de Talentos Vocalis
                  </span>
                </div>

                <h3 className="text-xl font-extrabold text-[#1A1816] tracking-tight mb-2">
                  Candidatura Espontânea
                </h3>
                <p className="text-xs text-[#736F69] leading-relaxed mb-6">
                  Preencha seus dados abaixo. Quando abrirmos vagas que combinem com suas habilidades, entraremos em contato diretamente.
                </p>

                <form onSubmit={handleSubmitApplication} className="space-y-4 text-left">
                  <div>
                    <label className="block text-xs font-semibold text-[#1A1816] mb-1">
                      Nome completo *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Ex: Gabriel Souza"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5D2C9] bg-white text-xs text-[#1A1816] placeholder:text-[#9A968E] outline-none focus:border-[#C84B1F]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#1A1816] mb-1">
                        E-mail *
                      </label>
                      <input
                        required
                        type="email"
                        placeholder="seu@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5D2C9] bg-white text-xs text-[#1A1816] placeholder:text-[#9A968E] outline-none focus:border-[#C84B1F]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#1A1816] mb-1">
                        WhatsApp / Celular
                      </label>
                      <input
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
                      Área de interesse
                    </label>
                    <select
                      value={formData.roleArea}
                      onChange={(e) => setFormData({ ...formData, roleArea: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5D2C9] bg-white text-xs text-[#1A1816] outline-none focus:border-[#C84B1F]"
                    >
                      <option value="Engenharia de Software & IA">Engenharia de Software & IA (Backend, LLMs, Áudio)</option>
                      <option value="Frontend & Design">Frontend (React, WebRTC, UX/UI)</option>
                      <option value="Vendas B2B & Parcerias">Vendas B2B & Parcerias</option>
                      <option value="Suporte Técnico & Customer Success">Suporte Técnico & Customer Success</option>
                      <option value="Marketing & Conteúdo">Marketing & Conteúdo</option>
                      <option value="Operações & Jurídico">Operações & Jurídico</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1A1816] mb-1">
                      Link do LinkedIn ou Portfólio / GitHub
                    </label>
                    <input
                      type="url"
                      placeholder="https://linkedin.com/in/seuperfil"
                      value={formData.linkedin}
                      onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5D2C9] bg-white text-xs text-[#1A1816] placeholder:text-[#9A968E] outline-none focus:border-[#C84B1F]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1A1816] mb-1">
                      Mensagem ou breve resumo profissional
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Conte um pouco sobre suas experiências recentes..."
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
                    <span>Enviar minha candidatura</span>
                  </button>
                </form>
              </div>
            ) : (
              <div className="py-8 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#FAF5EE] text-[#C84B1F] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#1A1816]">
                  Candidatura enviada com sucesso!
                </h3>
                <p className="text-xs text-[#736F69] max-w-sm mx-auto leading-relaxed">
                  Obrigado, <strong className="text-[#1A1816]">{formData.name}</strong>. Seus dados foram cadastrados em nosso banco de talentos. Avisaremos por e-mail assim que abrirmos oportunidades na área de <strong>{formData.roleArea}</strong>.
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
