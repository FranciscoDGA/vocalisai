import React, { useState, useRef, useEffect } from 'react';
import { 
  Menu, X, ArrowRight, ChevronDown, ChevronUp, Phone, MessageCircle, 
  MessageSquare, Mail, Radio, ShieldCheck, Sparkles, Building2, 
  Stethoscope, Home, Briefcase, ShoppingBag, Car, BookOpen, Calculator,
  Activity, HelpCircle, Headphones, Calendar, ClipboardList, Voicemail, Truck, Users,
  Video, LayoutGrid, LifeBuoy, Megaphone, Check
} from 'lucide-react';
import { BRAND } from '../data/content';

export default function Navbar({ onOpenDemo, onOpenAuth, onOpenLegal, onOpenDocs, currentPage = 'home', onNavigate, currentUser, onLogout }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null); // 'produtos' | 'solucoes' | 'recursos' | null
  const navRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = (name) => {
    setActiveDropdown(prev => prev === name ? null : name);
  };

  const handleNavClick = (target) => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
    if (currentPage !== 'home' && onNavigate) {
      onNavigate('home');
      setTimeout(() => {
        const el = document.getElementById(target);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else {
      const el = document.getElementById(target);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#EBE8E2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16" ref={navRef}>
          
          {/* Left Group: Logo + Desktop Navigation */}
          <div className="flex items-center gap-8 lg:gap-10">
            
            {/* Clean Modern Logo (Matching user's print) */}
            <button 
              onClick={() => { if (onNavigate) onNavigate('home'); }} 
              className="flex items-center gap-2.5 group shrink-0 text-left"
            >
              <div className="flex items-center gap-[3px] h-5">
                <span className="w-[3px] h-3.5 bg-[#C84B1F] rounded-full"></span>
                <span className="w-[3px] h-5 bg-[#C84B1F] rounded-full"></span>
                <span className="w-[3px] h-3 bg-[#C84B1F] rounded-full"></span>
              </div>
              <span className="text-xl font-bold tracking-tight text-[#1A1816] font-sans">
                {BRAND.name.toLowerCase()}
              </span>
            </button>

            {/* Desktop Navigation Links (Exact replica of user's uploaded print) */}
            <nav className="hidden md:flex items-center gap-6 lg:gap-7">
              
              {/* 1. DROPDOWN: PRODUTOS */}
              <div className="relative">
                <button
                  onClick={() => toggleDropdown('produtos')}
                  className={`flex items-center gap-1 text-[13.5px] font-medium transition-colors ${
                    activeDropdown === 'produtos' 
                      ? 'text-[#1A1816]' 
                      : 'text-[#5C5955] hover:text-[#1A1816]'
                  }`}
                >
                  <span>Produtos</span>
                  {activeDropdown === 'produtos' ? (
                    <ChevronUp className="w-3.5 h-3.5 text-[#736F69]" />
                  ) : (
                    <ChevronDown className="w-3.5 h-3.5 text-[#736F69]" />
                  )}
                </button>

                {activeDropdown === 'produtos' && (
                  <div className="absolute top-10 left-0 w-72 bg-white rounded-2xl border border-[#E7E4DC] shadow-2xl p-3 z-50 animate-fadeIn">
                    <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#8C8881]">
                      PRODUTOS
                    </div>

                    <div className="space-y-1">
                      {/* Item 1: Assistente telefônico IA */}
                      <a
                        href="#canais"
                        onClick={() => handleNavClick('canais')}
                        className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-[#1A1816] hover:bg-[#FAF9F5] transition-colors"
                      >
                        <Phone className="w-4 h-4 text-[#5C5955]" />
                        <span>Assistente telefônico IA</span>
                      </a>

                      {/* Item 2: IA de WhatsApp */}
                      <button
                        onClick={() => {
                          setActiveDropdown(null);
                          if (onNavigate) onNavigate('whatsapp');
                        }}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-colors text-left cursor-pointer ${
                          currentPage === 'whatsapp' 
                            ? 'bg-[#FAF5EE] text-[#C84B1F] font-bold' 
                            : 'text-[#1A1816] hover:bg-[#FAF9F5]'
                        }`}
                      >
                        <MessageCircle className="w-4 h-4 text-[#25D366]" />
                        <span>IA de WhatsApp</span>
                      </button>

                      {/* Item 3: Webchat de IA [Novo] */}
                      <button
                        onClick={() => {
                          setActiveDropdown(null);
                          if (onNavigate) onNavigate('webchat');
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors text-left cursor-pointer ${
                          currentPage === 'webchat'
                            ? 'bg-[#FAF5EE] text-[#C84B1F] font-bold'
                            : 'text-[#1A1816] hover:bg-[#FAF9F5]'
                        }`}
                      >
                        <span className="flex items-center gap-3">
                          <MessageSquare className="w-4 h-4 text-[#C84B1F]" />
                          <span>Webchat de IA</span>
                        </span>
                        <span className="px-1.5 py-0.5 rounded-full text-[10px] font-medium border border-[#C84B1F]/30 bg-[#C84B1F]/10 text-[#C84B1F]">
                          Novo
                        </span>
                      </button>

                      {/* Item 4: Assistente de e-mail IA [Em breve] */}
                      <div className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-[#8C8881]">
                        <span className="flex items-center gap-3">
                          <Mail className="w-4 h-4 text-[#8C8881]" />
                          <span>Assistente de e-mail IA</span>
                        </span>
                        <span className="px-1.5 py-0.5 rounded-full text-[10px] font-medium border border-[#D0CBC0] bg-[#FAF9F5] text-[#8C8881]">
                          Em breve
                        </span>
                      </div>

                      {/* Item 5: Central telefônica IA (PABX) [Em breve] */}
                      <div className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-[#8C8881]">
                        <span className="flex items-center gap-3">
                          <Radio className="w-4 h-4 text-[#8C8881]" />
                          <span>Central telefônica IA (PABX)</span>
                        </span>
                        <span className="px-1.5 py-0.5 rounded-full text-[10px] font-medium border border-[#D0CBC0] bg-[#FAF9F5] text-[#8C8881]">
                          Em breve
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* 2. DROPDOWN: SOLUÇÕES */}
              <div className="relative">
                <button
                  onClick={() => toggleDropdown('solucoes')}
                  className={`flex items-center gap-1 text-[13.5px] font-medium transition-colors ${
                    activeDropdown === 'solucoes' 
                      ? 'text-[#1A1816]' 
                      : 'text-[#5C5955] hover:text-[#1A1816]'
                  }`}
                >
                  <span>Soluções</span>
                  {activeDropdown === 'solucoes' ? (
                    <ChevronUp className="w-3.5 h-3.5 text-[#736F69]" />
                  ) : (
                    <ChevronDown className="w-3.5 h-3.5 text-[#736F69]" />
                  )}
                </button>

                {activeDropdown === 'solucoes' && (
                  <div className="absolute top-10 left-0 w-80 bg-white rounded-2xl border border-[#E7E4DC] shadow-2xl p-3 z-50 animate-fadeIn">
                    <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#8C8881]">
                      CASOS DE USO
                    </div>
                    <div className="space-y-1">
                      <button 
                        onClick={() => {
                          setActiveDropdown(null);
                          if (onNavigate) onNavigate('agente-suporte');
                        }}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-colors text-left cursor-pointer ${
                          currentPage === 'agente-suporte'
                            ? 'bg-[#FAF5EE] text-[#C84B1F] font-bold'
                            : 'text-[#1A1816] hover:bg-[#FAF9F5]'
                        }`}
                      >
                        <Headphones className="w-4 h-4 text-[#C84B1F]" />
                        <span>Agente de suporte com IA</span>
                      </button>
                      <button 
                        onClick={() => {
                          setActiveDropdown(null);
                          if (onNavigate) onNavigate('agendamentos');
                        }}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-colors text-left cursor-pointer ${
                          currentPage === 'agendamentos'
                            ? 'bg-[#FAF5EE] text-[#C84B1F] font-bold'
                            : 'text-[#1A1816] hover:bg-[#FAF9F5]'
                        }`}
                      >
                        <Calendar className="w-4 h-4 text-[#C84B1F]" />
                        <span>Agendamentos e perguntas frequentes</span>
                      </button>
                      <button 
                        onClick={() => {
                          setActiveDropdown(null);
                          if (onNavigate) onNavigate('recepcionista-virtual');
                        }}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-colors text-left cursor-pointer ${
                          currentPage === 'recepcionista-virtual'
                            ? 'bg-[#FAF5EE] text-[#C84B1F] font-bold'
                            : 'text-[#1A1816] hover:bg-[#FAF9F5]'
                        }`}
                      >
                        <ClipboardList className="w-4 h-4 text-[#C84B1F]" />
                        <span>Recepcionista virtual com IA</span>
                      </button>
                      <button 
                        onClick={() => {
                          setActiveDropdown(null);
                          if (onNavigate) onNavigate('atendedor-automatico');
                        }}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-colors text-left cursor-pointer ${
                          currentPage === 'atendedor-automatico'
                            ? 'bg-[#FAF5EE] text-[#C84B1F] font-bold'
                            : 'text-[#1A1816] hover:bg-[#FAF9F5]'
                        }`}
                      >
                        <Voicemail className="w-4 h-4 text-[#C84B1F]" />
                        <span>Atendedor automático por IA</span>
                      </button>
                      <button 
                        onClick={() => {
                          setActiveDropdown(null);
                          if (onNavigate) onNavigate('equipe-externa');
                        }}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-colors text-left cursor-pointer ${
                          currentPage === 'equipe-externa'
                            ? 'bg-[#FAF5EE] text-[#C84B1F] font-bold'
                            : 'text-[#1A1816] hover:bg-[#FAF9F5]'
                        }`}
                      >
                        <Truck className="w-4 h-4 text-[#C84B1F]" />
                        <span>Assistente de IA para equipe externa</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* 3. DROPDOWN: RECURSOS */}
              <div className="relative">
                <button
                  onClick={() => toggleDropdown('recursos')}
                  className={`flex items-center gap-1 text-[13.5px] font-medium transition-colors ${
                    activeDropdown === 'recursos' 
                      ? 'text-[#1A1816]' 
                      : 'text-[#5C5955] hover:text-[#1A1816]'
                  }`}
                >
                  <span>Recursos</span>
                  {activeDropdown === 'recursos' ? (
                    <ChevronUp className="w-3.5 h-3.5 text-[#736F69]" />
                  ) : (
                    <ChevronDown className="w-3.5 h-3.5 text-[#736F69]" />
                  )}
                </button>

                {activeDropdown === 'recursos' && (
                  <div className="absolute top-10 left-0 w-[440px] bg-white rounded-2xl border border-[#E7E4DC] shadow-2xl p-4 z-50 animate-fadeIn grid grid-cols-2 divide-x divide-[#EBE8E2]">
                    <div className="pr-4 space-y-1">
                      <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#8C8881]">
                        CONHECIMENTO
                      </div>
                      <button 
                        onClick={() => { 
                          setActiveDropdown(null); 
                          if (onNavigate) onNavigate('webinars'); 
                        }}
                        className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-colors text-left cursor-pointer ${
                          currentPage === 'webinars'
                            ? 'bg-[#FAF5EE] text-[#C84B1F] font-bold'
                            : 'text-[#1A1816] hover:bg-[#FAF9F5]'
                        }`}
                      >
                        <Video className="w-4 h-4 text-[#C84B1F]" />
                        <span>Webinars</span>
                      </button>
                      <button
                        onClick={() => {
                          setActiveDropdown(null);
                          if (onNavigate) onNavigate('integracoes');
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                          currentPage === 'integracoes'
                            ? 'bg-[#FAF5EE] text-[#C84B1F] font-bold'
                            : 'text-[#1A1816] hover:bg-[#FAF9F5]'
                        }`}
                      >
                        <span className="flex items-center gap-2.5">
                          <LayoutGrid className="w-4 h-4 text-[#C84B1F]" />
                          <span>Integrações</span>
                        </span>
                        <span className="px-1.5 py-0.5 rounded-full text-[10px] font-medium border border-[#C84B1F]/30 bg-[#C84B1F]/10 text-[#C84B1F]">
                          Novo
                        </span>
                      </button>
                      <button 
                        onClick={() => { 
                          setActiveDropdown(null); 
                          if (onNavigate) onNavigate('central-ajuda');
                        }} 
                        className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-colors text-left cursor-pointer ${
                          currentPage === 'central-ajuda'
                            ? 'bg-[#FAF5EE] text-[#C84B1F] font-bold'
                            : 'text-[#1A1816] hover:bg-[#FAF9F5]'
                        }`}
                      >
                        <LifeBuoy className="w-4 h-4 text-[#5C5955]" />
                        <span>Central de ajuda</span>
                      </button>
                    </div>

                    <div className="pl-4 space-y-1">
                      <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#8C8881]">
                        EMPRESA
                      </div>
                      <button 
                        onClick={() => { 
                          setActiveDropdown(null); 
                          if (onNavigate) onNavigate('carreiras');
                        }} 
                        className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-colors text-left cursor-pointer ${
                          currentPage === 'carreiras'
                            ? 'bg-[#FAF5EE] text-[#C84B1F] font-bold'
                            : 'text-[#1A1816] hover:bg-[#FAF9F5]'
                        }`}
                      >
                        <Briefcase className="w-4 h-4 text-[#5C5955]" />
                        <span>Carreiras</span>
                      </button>
                      <button 
                        onClick={() => { 
                          setActiveDropdown(null); 
                          if (onNavigate) onNavigate('imprensa');
                        }} 
                        className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-colors text-left cursor-pointer ${
                          currentPage === 'imprensa'
                            ? 'bg-[#FAF5EE] text-[#C84B1F] font-bold'
                            : 'text-[#1A1816] hover:bg-[#FAF9F5]'
                        }`}
                      >
                        <Megaphone className="w-4 h-4 text-[#5C5955]" />
                        <span>Imprensa</span>
                      </button>
                      <button 
                        onClick={() => { 
                          setActiveDropdown(null); 
                          if (onNavigate) onNavigate('contato');
                        }} 
                        className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-colors text-left cursor-pointer ${
                          currentPage === 'contato'
                            ? 'bg-[#FAF5EE] text-[#C84B1F] font-bold'
                            : 'text-[#1A1816] hover:bg-[#FAF9F5]'
                        }`}
                      >
                        <MessageSquare className="w-4 h-4 text-[#5C5955]" />
                        <span>Contato</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* 4. Casos de uso */}
              <a 
                href="#casos-de-uso" 
                onClick={() => handleNavClick('casos-de-uso')} 
                className="text-[13.5px] font-medium text-[#5C5955] hover:text-[#1A1816] transition-colors"
              >
                Casos de uso
              </a>
              
              {/* 5. Parceiros */}
              <button
                onClick={() => {
                  setActiveDropdown(null);
                  if (onNavigate) onNavigate('parceiros');
                }}
                className={`text-[13.5px] font-medium transition-colors ${
                  currentPage === 'parceiros' 
                    ? 'text-[#1A1816] font-bold' 
                    : 'text-[#5C5955] hover:text-[#1A1816]'
                }`}
              >
                Parceiros
              </button>

              {/* 6. Preços / Planos */}
              <button 
                onClick={() => { if (onNavigate) { onNavigate('precos'); window.scrollTo({ top: 0, behavior: 'smooth' }); } }} 
                className="text-[13.5px] font-medium text-[#5C5955] hover:text-[#1A1816] transition-colors cursor-pointer"
              >
                Preços
              </button>
            </nav>

          </div>

          {/* Right Action Items (Exact match to print: 🇧🇷 ⌄ · Falar com a gente · Criar minha Vocalis ➔) */}
          <div className="hidden md:flex items-center gap-6">
            
            {/* Country / Lang selector (Exact replica of user's uploaded print) */}
            <div className="relative">
              <button 
                onClick={() => toggleDropdown('idioma')}
                className="flex items-center gap-1.5 cursor-pointer hover:opacity-80 transition-opacity"
              >
                <span className="text-base leading-none">🇧🇷</span>
                <ChevronDown className="w-3 h-3 text-[#736F69]" />
              </button>

              {activeDropdown === 'idioma' && (
                <div className="absolute top-10 right-0 w-60 bg-white rounded-2xl border border-[#E7E4DC] shadow-2xl p-2 z-50 animate-fadeIn space-y-0.5">
                  {/* Português (BR) - Active */}
                  <button 
                    onClick={() => setActiveDropdown(null)}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-[#1A1816] hover:bg-[#FAF9F5] transition-colors"
                  >
                    <span className="flex items-center gap-2.5">
                      <span className="text-base leading-none">🇧🇷</span>
                      <span>Português (BR)</span>
                    </span>
                    <Check className="w-4 h-4 text-[#C84B1F]" />
                  </button>

                  {/* Other Languages (Em breve) */}
                  {[
                    { flag: '🇬🇧', name: 'English' },
                    { flag: '🇫🇷', name: 'Français' },
                    { flag: '🇩🇪', name: 'Deutsch' },
                    { flag: '🇪🇸', name: 'Español' },
                    { flag: '🇳🇱', name: 'Nederlands' },
                    { flag: '🇵🇱', name: 'Polski' },
                    { flag: '🇮🇹', name: 'Italiano' }
                  ].map((lang) => (
                    <div 
                      key={lang.name}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-[#5C5955] hover:bg-[#FAF9F5] transition-colors cursor-default"
                    >
                      <span className="flex items-center gap-2.5">
                        <span className="text-base leading-none opacity-80">{lang.flag}</span>
                        <span>{lang.name}</span>
                      </span>
                      <span className="text-[11px] text-[#A6A29A]">Em breve</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Falar com a gente */}
            <button 
              onClick={onOpenDemo}
              className="text-[13.5px] font-medium text-[#1A1816] hover:text-[#C84B1F] transition-colors cursor-pointer"
            >
              Falar com a gente
            </button>

            {currentUser ? (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => { if (onNavigate) onNavigate('dashboard'); }}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[13.5px] font-semibold transition-all shadow-sm cursor-pointer ${
                    currentPage === 'dashboard'
                      ? 'bg-[#C84B1F] text-white shadow-md'
                      : 'bg-[#11100F] text-white hover:bg-[#C84B1F]'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Meu Painel</span>
                </button>
                <button
                  onClick={onLogout}
                  className="text-xs font-semibold text-[#8C8881] hover:text-red-600 transition-colors cursor-pointer px-2 py-1 rounded-lg hover:bg-red-50"
                  title="Sair da conta"
                >
                  Sair
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <button 
                  onClick={onOpenAuth}
                  className="text-[13.5px] font-medium text-[#5C5955] hover:text-[#1A1816] transition-colors cursor-pointer"
                >
                  Entrar
                </button>
                <button
                  onClick={onOpenAuth}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#11100F] text-white text-[13.5px] font-semibold hover:bg-black transition-all shadow-sm hover:shadow cursor-pointer"
                >
                  <span>Criar minha {BRAND.name.toLowerCase()}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-white/80" />
                </button>
              </div>
            )}

          </div>

          {/* Mobile menu trigger */}
          <div className="flex md:hidden items-center gap-2">
            {currentUser ? (
              <button
                onClick={() => { if (onNavigate) onNavigate('dashboard'); }}
                className="px-3.5 py-1.5 rounded-full bg-[#C84B1F] text-white text-xs font-semibold cursor-pointer"
              >
                Painel
              </button>
            ) : (
              <button
                onClick={onOpenAuth}
                className="px-3.5 py-1.5 rounded-full bg-[#11100F] text-white text-xs font-semibold cursor-pointer"
              >
                Entrar
              </button>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#1A1816] hover:bg-[#EBE8E2] cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-[#EBE8E2] px-6 py-6 space-y-4 shadow-xl text-sm">
          <div className="font-bold text-xs uppercase tracking-wider text-[#8C8881]">Produtos</div>
          <a href="#canais" onClick={() => handleNavClick('canais')} className="block py-1 text-[#1A1816]">Assistente telefônico IA</a>
          <button 
            onClick={() => { 
              setMobileMenuOpen(false); 
              if (onNavigate) onNavigate('whatsapp'); 
            }} 
            className="block w-full text-left py-1 text-[#1A1816] font-medium"
          >
            IA de WhatsApp
          </button>
          <button 
            onClick={() => { 
              setMobileMenuOpen(false); 
              if (onNavigate) onNavigate('webchat'); 
            }} 
            className="flex items-center justify-between w-full text-left py-1 text-[#1A1816] font-medium"
          >
            <span>Webchat de IA</span>
            <span className="text-[10px] text-[#C84B1F] font-bold">(Novo)</span>
          </button>

          <div className="font-bold text-xs uppercase tracking-wider text-[#8C8881]">Soluções</div>
          <button 
            onClick={() => { 
              setMobileMenuOpen(false); 
              if (onNavigate) onNavigate('agente-suporte'); 
            }} 
            className="block w-full text-left py-1 text-[#1A1816] font-medium"
          >
            Agente de suporte com IA
          </button>
          <button 
            onClick={() => { 
              setMobileMenuOpen(false); 
              if (onNavigate) onNavigate('agendamentos'); 
            }} 
            className="block w-full text-left py-1 text-[#1A1816] font-medium"
          >
            Agendamentos e perguntas frequentes
          </button>
          <button 
            onClick={() => { 
              setMobileMenuOpen(false); 
              if (onNavigate) onNavigate('recepcionista-virtual'); 
            }} 
            className="block w-full text-left py-1 text-[#1A1816] font-medium"
          >
            Recepcionista virtual com IA
          </button>
          <button 
            onClick={() => { 
              setMobileMenuOpen(false); 
              if (onNavigate) onNavigate('atendedor-automatico'); 
            }} 
            className="block w-full text-left py-1 text-[#1A1816] font-medium"
          >
            Atendedor automático por IA
          </button>
          <button 
            onClick={() => { 
              setMobileMenuOpen(false); 
              if (onNavigate) onNavigate('equipe-externa'); 
            }} 
            className="block w-full text-left py-1 text-[#1A1816] font-medium"
          >
            Assistente de IA para equipe externa
          </button>

          <div className="pt-2 font-bold text-xs uppercase tracking-wider text-[#8C8881]">Recursos</div>
          <button 
            onClick={() => { 
              setMobileMenuOpen(false); 
              if (onNavigate) onNavigate('webinars'); 
            }} 
            className="block w-full text-left py-1 text-[#1A1816] font-medium"
          >
            Webinars (Sessões ao vivo)
          </button>
          <button 
            onClick={() => { 
              setMobileMenuOpen(false); 
              if (onNavigate) onNavigate('integracoes'); 
            }} 
            className="flex items-center justify-between w-full text-left py-1 text-[#1A1816] font-medium"
          >
            <span>Integrações</span>
            <span className="text-[10px] text-[#C84B1F] font-bold">(Novo)</span>
          </button>
          <button 
            onClick={() => { 
              setMobileMenuOpen(false); 
              if (onNavigate) onNavigate('central-ajuda'); 
            }} 
            className="block w-full text-left py-1 text-[#1A1816] font-medium"
          >
            Central de ajuda
          </button>
          <button 
            onClick={() => { 
              setMobileMenuOpen(false); 
              if (onNavigate) onNavigate('carreiras'); 
            }} 
            className="block w-full text-left py-1 text-[#1A1816] font-medium"
          >
            Carreiras
          </button>
          <button 
            onClick={() => { 
              setMobileMenuOpen(false); 
              if (onNavigate) onNavigate('imprensa'); 
            }} 
            className="block w-full text-left py-1 text-[#1A1816] font-medium"
          >
            Imprensa
          </button>
          <button 
            onClick={() => { 
              setMobileMenuOpen(false); 
              if (onNavigate) onNavigate('contato'); 
            }} 
            className="block w-full text-left py-1 text-[#1A1816] font-medium"
          >
            Contato
          </button>

          <div className="pt-2 font-bold text-xs uppercase tracking-wider text-[#8C8881]">Navegação</div>
          <a href="#casos-de-uso" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-[#5C5955]">Casos de uso</a>
          <button onClick={() => { setMobileMenuOpen(false); if (onNavigate) onNavigate('parceiros'); }} className="block py-1 text-[#5C5955] text-left">Parceiros</button>
          <button onClick={() => { setMobileMenuOpen(false); if (onNavigate) { onNavigate('precos'); window.scrollTo({ top: 0, behavior: 'smooth' }); } }} className="block py-1 text-left text-[#5C5955] cursor-pointer">Preços & Planos</button>
          
          <div className="pt-4 border-t border-[#EBE8E2] flex flex-col gap-2">
            {currentUser ? (
              <>
                <button
                  onClick={() => { setMobileMenuOpen(false); if (onNavigate) onNavigate('dashboard'); }}
                  className="w-full py-2.5 rounded-xl bg-[#C84B1F] text-white text-center font-bold text-sm cursor-pointer"
                >
                  Acessar Meu Painel
                </button>
                <button
                  onClick={() => { setMobileMenuOpen(false); if (onLogout) onLogout(); }}
                  className="w-full py-2.5 rounded-xl border border-red-200 bg-red-50 text-red-700 text-center font-bold text-xs cursor-pointer"
                >
                  Sair da Conta ({currentUser.email})
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => { setMobileMenuOpen(false); onOpenDemo(); }}
                  className="w-full py-2.5 rounded-xl border border-[#D0CBC0] text-center font-bold text-[#1A1816]"
                >
                  Falar com a gente
                </button>
                <button
                  onClick={() => { setMobileMenuOpen(false); onOpenAuth(); }}
                  className="w-full py-2.5 rounded-xl bg-[#11100F] text-white text-center font-bold"
                >
                  Entrar ou Criar Conta
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
