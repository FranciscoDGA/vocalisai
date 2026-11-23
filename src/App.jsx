import React, { useState, useEffect, lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ChannelsSection from './components/ChannelsSection';
import CallTimelineSection from './components/CallTimelineSection';
import StepsSection from './components/StepsSection';
import UseCasesSection from './components/UseCasesSection';
import IntegrationsSection from './components/IntegrationsSection';
import PricingSection from './components/PricingSection';
import GuaranteesSection from './components/GuaranteesSection';
import FaqSection from './components/FaqSection';
import CtaSection from './components/CtaSection';
import Footer from './components/Footer';
import WebchatWidget from './components/WebchatWidget';
import AudioShowcaseSection from './components/AudioShowcaseSection';
import LostRevenueCalculator from './components/LostRevenueCalculator';
import ComparisonMatrixSection from './components/ComparisonMatrixSection';
import VoiceTestimonialsSection from './components/VoiceTestimonialsSection';
import GuaranteeBadgeSection from './components/GuaranteeBadgeSection';
import ExitIntentModal from './components/ExitIntentModal';
import DoneForYouSection from './components/DoneForYouSection';
import WhatsAppInstantAudioCard from './components/WhatsAppInstantAudioCard';
import VoiceStudioPlayground from './components/VoiceStudioPlayground';
import NicheScriptGenerator from './components/NicheScriptGenerator';
import { supabase, getCurrentUser, signOutUser } from './utils/supabaseClient';

// Lazy-loaded components for optimal bundle size and instant initial load
const InsideDashboardSection = lazy(() => import('./components/InsideDashboardSection'));
const ParceirosPage = lazy(() => import('./components/ParceirosPage'));
const WhatsAppPage = lazy(() => import('./components/WhatsAppPage'));
const WebchatPage = lazy(() => import('./components/WebchatPage'));
const AgenteSuportePage = lazy(() => import('./components/AgenteSuportePage'));
const AgendamentosPage = lazy(() => import('./components/AgendamentosPage'));
const RecepcionistaVirtualPage = lazy(() => import('./components/RecepcionistaVirtualPage'));
const AtendedorAutomaticoPage = lazy(() => import('./components/AtendedorAutomaticoPage'));
const EquipeExternaPage = lazy(() => import('./components/EquipeExternaPage'));
const WebinarsPage = lazy(() => import('./components/WebinarsPage'));
const IntegracoesPage = lazy(() => import('./components/IntegracoesPage'));
const CentralAjudaPage = lazy(() => import('./components/CentralAjudaPage'));
const CarreirasPage = lazy(() => import('./components/CarreirasPage'));
const ImprensaPage = lazy(() => import('./components/ImprensaPage'));
const ContatoPage = lazy(() => import('./components/ContatoPage'));
const SobrePage = lazy(() => import('./components/SobrePage'));
const MelhorIaWhatsAppArticlePage = lazy(() => import('./components/MelhorIaWhatsAppArticlePage'));
const AtendimentoWhatsAppArticlePage = lazy(() => import('./components/AtendimentoWhatsAppArticlePage'));

const PAGE_TO_PATH = {
  home: '/',
  'blog-melhor-ia-whatsapp': '/blog/melhor-ia-para-atendimento-whatsapp',
  'blog-atendimento-automatico-whatsapp': '/blog/atendimento-automatico-whatsapp-inteligencia-artificial',
};

function getPageFromPathname(pathname) {
  const normalized = (pathname || '/').replace(/\/+$/, '') || '/';
  if (normalized === '/blog/melhor-ia-para-atendimento-whatsapp') {
    return 'blog-melhor-ia-whatsapp';
  }
  if (normalized === '/blog/atendimento-automatico-whatsapp-inteligencia-artificial') {
    return 'blog-atendimento-automatico-whatsapp';
  }
  return 'home';
}

// Lazy-loaded modals
const DocsPortal = lazy(() => import('./components/DocsPortal'));
const LegalModal = lazy(() => import('./components/LegalModal'));
const AuthModal = lazy(() => import('./components/AuthModal'));
const DemoModal = lazy(() => import('./components/DemoModal'));
const PlatformPresentationSlider = lazy(() => import('./components/PlatformPresentationSlider'));
const ExecutiveDossierModal = lazy(() => import('./components/ExecutiveDossierModal'));

// Loading indicator component for route suspensions
function PageFallback() {
  return (
    <div className="flex items-center justify-center min-h-[50vh] p-8">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-[#4F46E5] border-t-transparent rounded-full animate-spin" />
        <span className="text-xs font-semibold text-[#736F69]">Carregando...</span>
      </div>
    </div>
  );
}

export default function App() {
  const [currentPage, setCurrentPage] = useState(() =>
    typeof window !== 'undefined' ? getPageFromPathname(window.location.pathname) : 'home'
  ); // 'home' | 'dashboard' | 'parceiros' | 'whatsapp' | 'blog-melhor-ia-whatsapp' | ...
  const [currentUser, setCurrentUser] = useState(null);
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [legalModalOpen, setLegalModalOpen] = useState(false);
  const [legalInitialTab, setLegalInitialTab] = useState('privacidade');
  const [docsPortalOpen, setDocsPortalOpen] = useState(false);
  const [docsInitialDoc, setDocsInitialDoc] = useState('privacidade');
  const [presentationOpen, setPresentationOpen] = useState(false);
  const [dossierModalOpen, setDossierModalOpen] = useState(false);

  useEffect(() => {
    // Carrega usuário da sessão atual ao iniciar
    getCurrentUser().then(user => {
      if (user) {
        setCurrentUser(user);
      }
    });

    // Escuta mudanças de autenticação (login, logout, refresh token)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setCurrentUser(session?.user || null);
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await signOutUser();
    setCurrentUser(null);
    setCurrentPage('home');
  };

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    setCurrentPage('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenLegal = (tab = 'privacidade') => {
    setDocsInitialDoc(tab);
    setDocsPortalOpen(true);
  };

  const handleOpenDocs = (doc = 'privacidade') => {
    setDocsInitialDoc(doc);
    setDocsPortalOpen(true);
  };

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPage(getPageFromPathname(window.location.pathname));
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = (page) => {
    setCurrentPage(page);
    if (typeof window !== 'undefined' && window.history?.pushState) {
      const targetPath = PAGE_TO_PATH[page] || '/';
      if (window.location.pathname !== targetPath) {
        window.history.pushState({}, '', targetPath);
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-[#1A1816] flex flex-col font-sans selection:bg-[#4F46E5] selection:text-white w-full max-w-full overflow-x-hidden">
      {/* Top Navbar (oculto no Dashboard e na Central de Ajuda para ser 1:1 com o Kloel) */}
      {currentPage !== 'central-ajuda' && currentPage !== 'dashboard' && (
        <Navbar 
          currentPage={currentPage}
          currentUser={currentUser}
          onLogout={handleLogout}
          onNavigate={handleNavigate}
          onOpenDemo={() => setDemoModalOpen(true)} 
          onOpenAuth={() => setAuthModalOpen(true)}
          onOpenLegal={handleOpenLegal}
          onOpenDocs={handleOpenDocs}
          onOpenPresentation={() => setPresentationOpen(true)}
          onOpenDossier={() => setDossierModalOpen(true)}
        />
      )}

      {/* Main Page Stream: Home is rendered directly (Zero latency, never blocked by lazy chunk suspense) */}
      {currentPage === 'home' ? (
        <main className="flex-1 w-full max-w-full overflow-x-hidden min-w-0">
          {/* 1. Hero with dark voice demo player & direct test */}
          <Hero 
            onOpenDemo={() => setDemoModalOpen(true)} 
            onOpenAuth={() => setAuthModalOpen(true)}
            onNavigate={handleNavigate}
          />

          {/* 2. Simulações ilustrativas auditivas por cenário */}
          <AudioShowcaseSection 
            onOpenDemo={() => setDemoModalOpen(true)}
          />

          {/* 3. Simulador ilustrativo de vozes no navegador */}
          <VoiceStudioPlayground 
            onOpenDemo={() => setDemoModalOpen(true)}
            onOpenAuth={() => setAuthModalOpen(true)}
          />

          {/* 4. Simulador ilustrativo de oportunidades */}
          <LostRevenueCalculator 
            onOpenDemo={() => setDemoModalOpen(true)}
            onOpenAuth={() => setAuthModalOpen(true)}
          />

          {/* 5. Exemplos ilustrativos de roteiro por nicho */}
          <NicheScriptGenerator 
            onOpenDemo={() => setDemoModalOpen(true)}
            onOpenAuth={() => setAuthModalOpen(true)}
          />

          {/* 6. Omnichannel delivery (Telefone, WhatsApp, Webchat, E-mail IA) */}
          <ChannelsSection 
            onOpenDemo={() => setDemoModalOpen(true)} 
          />

          {/* 7. Simulação ilustrativa de áudio no WhatsApp */}
          <WhatsAppInstantAudioCard />

          {/* 8. Fluxo ilustrativo de atendimento */}
          <CallTimelineSection />

          {/* 9. Inside the Platform (Dashboard preview) */}
          <Suspense fallback={
            <div className="py-24 bg-[#FAF9F5] border-t border-[#EBE8E2] text-center">
              <div className="inline-block w-8 h-8 border-2 border-[#4F46E5] border-t-transparent rounded-full animate-spin mb-3"></div>
              <p className="text-xs text-[#736F69]">Carregando prévia do painel...</p>
            </div>
          }>
            <InsideDashboardSection 
              onOpenDemo={() => setDemoModalOpen(true)}
              onOpenLegal={handleOpenLegal}
              onOpenAuth={() => setAuthModalOpen(true)}
              onOpenDocs={handleOpenDocs}
            />
          </Suspense>

          {/* 10. Tabela Comparativa ilustrativa */}
          <ComparisonMatrixSection 
            onOpenAuth={() => setAuthModalOpen(true)}
            onOpenDemo={() => setDemoModalOpen(true)}
          />

          {/* 11. 3 Steps Setup (No code needed) */}
          <StepsSection 
            onOpenDemo={() => setDemoModalOpen(true)}
          />

          {/* 12. Simulações ilustrativas por segmento */}
          <VoiceTestimonialsSection />

          {/* 13. Capabilities Use Cases Grid */}
          <UseCasesSection 
            onOpenDemo={() => setDemoModalOpen(true)}
            onOpenAuth={() => setAuthModalOpen(true)}
            onNavigate={handleNavigate}
          />

          {/* 14. Implantação assistida (escopo sob consulta) */}
          <DoneForYouSection 
            onOpenAuth={() => setAuthModalOpen(true)}
            onOpenDemo={() => setDemoModalOpen(true)}
          />

          {/* 15. Comprehensive Integrations Grid */}
          <IntegrationsSection 
            onOpenDemo={() => setDemoModalOpen(true)}
          />

          {/* 16. Condições comerciais transparentes */}
          <GuaranteeBadgeSection 
            onOpenAuth={() => setAuthModalOpen(true)}
            onOpenDemo={() => setDemoModalOpen(true)}
          />

          {/* 17. Condições operacionais e LGPD */}
          <GuaranteesSection />

          {/* 18. FAQ Accordions */}
          <FaqSection />

          {/* 19. Final Conversion CTA Card & Big Quote */}
          <CtaSection 
            onOpenDemo={() => setDemoModalOpen(true)}
            onOpenAuth={() => setAuthModalOpen(true)}
          />
        </main>
      ) : (
        /* Secondary lazy routes wrapped in Suspense */
        <Suspense fallback={<PageFallback />}>
          {currentPage === 'dashboard' ? (
            <main className="flex-1 w-full max-w-full overflow-x-hidden min-w-0 animate-fadeIn">
              <InsideDashboardSection 
                isStandalone={true}
                currentUser={currentUser}
                onLogout={handleLogout}
                onNavigateHome={() => handleNavigate('home')}
                onOpenDemo={() => setDemoModalOpen(true)}
                onOpenLegal={handleOpenLegal}
                onOpenAuth={() => setAuthModalOpen(true)}
                onOpenDocs={handleOpenDocs}
              />
            </main>
          ) : currentPage === 'parceiros' ? (
            <main className="flex-1 w-full max-w-full overflow-x-hidden min-w-0">
              <ParceirosPage 
                onOpenDemo={() => setDemoModalOpen(true)}
                onOpenAuth={() => setAuthModalOpen(true)}
                onNavigateHome={() => handleNavigate('home')}
              />
            </main>
          ) : currentPage === 'whatsapp' ? (
            <main className="flex-1 w-full max-w-full overflow-x-hidden min-w-0">
              <WhatsAppPage 
                onOpenDemo={() => setDemoModalOpen(true)}
                onOpenAuth={() => setAuthModalOpen(true)}
                onNavigateHome={() => handleNavigate('home')}
              />
            </main>
          ) : currentPage === 'webchat' ? (
            <main className="flex-1 w-full max-w-full overflow-x-hidden min-w-0">
              <WebchatPage 
                onOpenDemo={() => setDemoModalOpen(true)}
                onOpenAuth={() => setAuthModalOpen(true)}
                onNavigateHome={() => handleNavigate('home')}
              />
            </main>
          ) : currentPage === 'agente-suporte' ? (
            <main className="flex-1 w-full max-w-full overflow-x-hidden min-w-0">
              <AgenteSuportePage 
                onOpenDemo={() => setDemoModalOpen(true)}
                onOpenAuth={() => setAuthModalOpen(true)}
                onNavigateHome={() => handleNavigate('home')}
              />
            </main>
          ) : currentPage === 'agendamentos' ? (
            <main className="flex-1 w-full max-w-full overflow-x-hidden min-w-0">
              <AgendamentosPage 
                onOpenDemo={() => setDemoModalOpen(true)}
                onOpenAuth={() => setAuthModalOpen(true)}
                onNavigateHome={() => handleNavigate('home')}
              />
            </main>
          ) : currentPage === 'recepcionista-virtual' ? (
            <main className="flex-1 w-full max-w-full overflow-x-hidden min-w-0">
              <RecepcionistaVirtualPage 
                onOpenDemo={() => setDemoModalOpen(true)}
                onOpenAuth={() => setAuthModalOpen(true)}
                onNavigateHome={() => handleNavigate('home')}
              />
            </main>
          ) : currentPage === 'atendedor-automatico' ? (
            <main className="flex-1 w-full max-w-full overflow-x-hidden min-w-0">
              <AtendedorAutomaticoPage 
                onOpenDemo={() => setDemoModalOpen(true)}
                onOpenAuth={() => setAuthModalOpen(true)}
                onNavigateHome={() => handleNavigate('home')}
              />
            </main>
          ) : currentPage === 'equipe-externa' ? (
            <main className="flex-1 w-full max-w-full overflow-x-hidden min-w-0">
              <EquipeExternaPage 
                onOpenDemo={() => setDemoModalOpen(true)}
                onOpenAuth={() => setAuthModalOpen(true)}
                onNavigateHome={() => handleNavigate('home')}
              />
            </main>
          ) : currentPage === 'webinars' ? (
            <main className="flex-1 w-full max-w-full overflow-x-hidden min-w-0">
              <WebinarsPage 
                onOpenDemo={() => setDemoModalOpen(true)}
                onOpenAuth={() => setAuthModalOpen(true)}
                onNavigateHome={() => handleNavigate('home')}
              />
            </main>
          ) : currentPage === 'integracoes' ? (
            <main className="flex-1 w-full max-w-full overflow-x-hidden min-w-0">
              <IntegracoesPage 
                onOpenDemo={() => setDemoModalOpen(true)}
                onOpenAuth={() => setAuthModalOpen(true)}
                onNavigateHome={() => handleNavigate('home')}
              />
            </main>
          ) : currentPage === 'central-ajuda' ? (
            <main className="flex-1 w-full max-w-full overflow-x-hidden min-w-0">
              <CentralAjudaPage 
                onOpenDemo={() => setDemoModalOpen(true)}
                onOpenAuth={() => setAuthModalOpen(true)}
                onOpenLegal={handleOpenLegal}
                onOpenDocs={handleOpenDocs}
                onNavigateHome={() => handleNavigate('home')}
              />
            </main>
          ) : currentPage === 'carreiras' ? (
            <main className="flex-1 w-full max-w-full overflow-x-hidden min-w-0">
              <CarreirasPage 
                onOpenDemo={() => setDemoModalOpen(true)}
                onOpenAuth={() => setAuthModalOpen(true)}
                onNavigateHome={() => handleNavigate('home')}
              />
            </main>
          ) : currentPage === 'imprensa' ? (
            <main className="flex-1 w-full max-w-full overflow-x-hidden min-w-0">
              <ImprensaPage 
                onOpenDemo={() => setDemoModalOpen(true)}
                onOpenAuth={() => setAuthModalOpen(true)}
                onNavigateHome={() => handleNavigate('home')}
              />
            </main>
          ) : currentPage === 'contato' ? (
            <main className="flex-1 w-full max-w-full overflow-x-hidden min-w-0">
              <ContatoPage 
                onOpenDemo={() => setDemoModalOpen(true)}
                onOpenAuth={() => setAuthModalOpen(true)}
                onNavigate={handleNavigate}
              />
            </main>
          ) : currentPage === 'sobre' ? (
            <main className="flex-1 w-full max-w-full overflow-x-hidden min-w-0">
              <SobrePage 
                onOpenDemo={() => setDemoModalOpen(true)}
                onOpenAuth={() => setAuthModalOpen(true)}
                onNavigate={handleNavigate}
              />
            </main>
          ) : currentPage === 'blog-melhor-ia-whatsapp' ? (
            <main className="flex-1 w-full max-w-full overflow-x-hidden min-w-0 animate-fadeIn">
              <MelhorIaWhatsAppArticlePage
                onOpenDemo={() => setDemoModalOpen(true)}
                onOpenAuth={() => setAuthModalOpen(true)}
                onNavigate={handleNavigate}
                onNavigateHome={() => handleNavigate('home')}
              />
            </main>
          ) : currentPage === 'blog-atendimento-automatico-whatsapp' ? (
            <main className="flex-1 w-full max-w-full overflow-x-hidden min-w-0 animate-fadeIn">
              <AtendimentoWhatsAppArticlePage
                onOpenLeadModal={() => setDemoModalOpen(true)}
                onNavigateHome={() => handleNavigate('home')}
              />
            </main>
          ) : currentPage === 'precos' ? (
            <main className="flex-1 w-full max-w-full overflow-x-hidden min-w-0 animate-fadeIn">
              {/* Página Dedicada de Preços & Planos (Exclusiva) */}
              <PricingSection 
                onOpenAuth={() => setAuthModalOpen(true)}
                onOpenDemo={() => setDemoModalOpen(true)}
              />
              <GuaranteesSection />
              <FaqSection />
              <CtaSection 
                onOpenDemo={() => setDemoModalOpen(true)}
                onOpenAuth={() => setAuthModalOpen(true)}
              />
            </main>
          ) : null}
        </Suspense>
      )}

      {/* Footer (Oculto no Dashboard e na Central de Ajuda para ser 1:1 com o Kloel) */}
      {currentPage !== 'dashboard' && currentPage !== 'central-ajuda' && (
        <Footer 
          onOpenDocs={handleOpenDocs}
          onOpenDemo={() => setDemoModalOpen(true)}
          onNavigate={handleNavigate}
          onOpenDossier={() => setDossierModalOpen(true)}
        />
      )}

      {/* Notificações simuladas "ao vivo" foram desativadas até haver eventos reais verificáveis */}

      {/* Floating Webchat Widget com a Beatriz */}
      {currentPage !== 'dashboard' && (
        <WebchatWidget 
          onOpenDemo={() => setDemoModalOpen(true)}
          onOpenAuth={() => setAuthModalOpen(true)}
        />
      )}

      {/* Full Docs & Legal Portal */}
      {docsPortalOpen && (
        <Suspense fallback={null}>
          <DocsPortal 
            isOpen={docsPortalOpen}
            initialDoc={docsInitialDoc}
            onClose={() => setDocsPortalOpen(false)}
            onOpenApp={() => setDocsPortalOpen(false)}
          />
        </Suspense>
      )}

      {/* Quick Legal Modal */}
      {legalModalOpen && (
        <Suspense fallback={null}>
          <LegalModal 
            isOpen={legalModalOpen} 
            initialTab={legalInitialTab} 
            onClose={() => setLegalModalOpen(false)} 
          />
        </Suspense>
      )}

      {/* Auth Modal */}
      {authModalOpen && (
        <Suspense fallback={null}>
          <AuthModal 
            isOpen={authModalOpen} 
            onClose={() => setAuthModalOpen(false)} 
            onOpenLegal={handleOpenLegal}
            onSuccessLogin={handleLoginSuccess}
          />
        </Suspense>
      )}

      {/* Demo Modal */}
      {demoModalOpen && (
        <Suspense fallback={null}>
          <DemoModal 
            isOpen={demoModalOpen} 
            onClose={() => setDemoModalOpen(false)} 
          />
        </Suspense>
      )}

      {/* Presentation Pitch Deck Slider */}
      {presentationOpen && (
        <Suspense fallback={null}>
          <PlatformPresentationSlider 
            isOpen={presentationOpen}
            onClose={() => setPresentationOpen(false)}
          />
        </Suspense>
      )}

      {/* Exit Intent Recovery Modal */}
      <ExitIntentModal onTriggerCall={() => setDemoModalOpen(true)} />

      {/* Executive Dossier Printable PDF Modal */}
      {dossierModalOpen && (
        <Suspense fallback={null}>
          <ExecutiveDossierModal
            isOpen={dossierModalOpen}
            onClose={() => setDossierModalOpen(false)}
            onOpenDemo={() => setDemoModalOpen(true)}
          />
        </Suspense>
      )}
    </div>
  );
}