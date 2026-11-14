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

// Lazy-loaded modals
const DocsPortal = lazy(() => import('./components/DocsPortal'));
const LegalModal = lazy(() => import('./components/LegalModal'));
const AuthModal = lazy(() => import('./components/AuthModal'));
const DemoModal = lazy(() => import('./components/DemoModal'));
const PlatformPresentationSlider = lazy(() => import('./components/PlatformPresentationSlider'));

// Loading indicator component for route suspensions
function PageFallback() {
  return (
    <div className="flex items-center justify-center min-h-[50vh] p-8">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-[#C84B1F] border-t-transparent rounded-full animate-spin" />
        <span className="text-xs font-semibold text-[#736F69]">Carregando...</span>
      </div>
    </div>
  );
}

export default function App() {
  const [currentPage, setCurrentPage] = useState('home'); // 'home' | 'dashboard' | 'parceiros' | 'whatsapp' | ...
  const [currentUser, setCurrentUser] = useState(null);
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [legalModalOpen, setLegalModalOpen] = useState(false);
  const [legalInitialTab, setLegalInitialTab] = useState('privacidade');
  const [docsPortalOpen, setDocsPortalOpen] = useState(false);
  const [docsInitialDoc, setDocsInitialDoc] = useState('privacidade');
  const [presentationOpen, setPresentationOpen] = useState(false);

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

  const handleNavigate = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-[#1A1816] flex flex-col font-sans selection:bg-[#C84B1F] selection:text-white">
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
        />
      )}

      {/* Main Page Stream with Suspense for lazy routes */}
      <Suspense fallback={<PageFallback />}>
        {currentPage === 'dashboard' ? (
          <main className="flex-1 animate-fadeIn">
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
          <main className="flex-1">
            <ParceirosPage 
              onOpenDemo={() => setDemoModalOpen(true)}
              onOpenAuth={() => setAuthModalOpen(true)}
              onNavigateHome={() => handleNavigate('home')}
            />
          </main>
        ) : currentPage === 'whatsapp' ? (
          <main className="flex-1">
            <WhatsAppPage 
              onOpenDemo={() => setDemoModalOpen(true)}
              onOpenAuth={() => setAuthModalOpen(true)}
              onNavigateHome={() => handleNavigate('home')}
            />
          </main>
        ) : currentPage === 'webchat' ? (
          <main className="flex-1">
            <WebchatPage 
              onOpenDemo={() => setDemoModalOpen(true)}
              onOpenAuth={() => setAuthModalOpen(true)}
              onNavigateHome={() => handleNavigate('home')}
            />
          </main>
        ) : currentPage === 'agente-suporte' ? (
          <main className="flex-1">
            <AgenteSuportePage 
              onOpenDemo={() => setDemoModalOpen(true)}
              onOpenAuth={() => setAuthModalOpen(true)}
              onNavigateHome={() => handleNavigate('home')}
            />
          </main>
        ) : currentPage === 'agendamentos' ? (
          <main className="flex-1">
            <AgendamentosPage 
              onOpenDemo={() => setDemoModalOpen(true)}
              onOpenAuth={() => setAuthModalOpen(true)}
              onNavigateHome={() => handleNavigate('home')}
            />
          </main>
        ) : currentPage === 'recepcionista-virtual' ? (
          <main className="flex-1">
            <RecepcionistaVirtualPage 
              onOpenDemo={() => setDemoModalOpen(true)}
              onOpenAuth={() => setAuthModalOpen(true)}
              onNavigateHome={() => handleNavigate('home')}
            />
          </main>
        ) : currentPage === 'atendedor-automatico' ? (
          <main className="flex-1">
            <AtendedorAutomaticoPage 
              onOpenDemo={() => setDemoModalOpen(true)}
              onOpenAuth={() => setAuthModalOpen(true)}
              onNavigateHome={() => handleNavigate('home')}
            />
          </main>
        ) : currentPage === 'equipe-externa' ? (
          <main className="flex-1">
            <EquipeExternaPage 
              onOpenDemo={() => setDemoModalOpen(true)}
              onOpenAuth={() => setAuthModalOpen(true)}
              onNavigateHome={() => handleNavigate('home')}
            />
          </main>
        ) : currentPage === 'webinars' ? (
          <main className="flex-1">
            <WebinarsPage 
              onOpenDemo={() => setDemoModalOpen(true)}
              onOpenAuth={() => setAuthModalOpen(true)}
              onNavigateHome={() => handleNavigate('home')}
            />
          </main>
        ) : currentPage === 'integracoes' ? (
          <main className="flex-1">
            <IntegracoesPage 
              onOpenDemo={() => setDemoModalOpen(true)}
              onOpenAuth={() => setAuthModalOpen(true)}
              onNavigateHome={() => handleNavigate('home')}
            />
          </main>
        ) : currentPage === 'central-ajuda' ? (
          <main className="flex-1">
            <CentralAjudaPage 
              onOpenDemo={() => setDemoModalOpen(true)}
              onOpenAuth={() => setAuthModalOpen(true)}
              onOpenLegal={handleOpenLegal}
              onOpenDocs={handleOpenDocs}
              onNavigateHome={() => handleNavigate('home')}
            />
          </main>
        ) : currentPage === 'carreiras' ? (
          <main className="flex-1">
            <CarreirasPage 
              onOpenDemo={() => setDemoModalOpen(true)}
              onOpenAuth={() => setAuthModalOpen(true)}
              onNavigateHome={() => handleNavigate('home')}
            />
          </main>
        ) : currentPage === 'imprensa' ? (
          <main className="flex-1">
            <ImprensaPage 
              onOpenDemo={() => setDemoModalOpen(true)}
              onOpenAuth={() => setAuthModalOpen(true)}
              onNavigateHome={() => handleNavigate('home')}
            />
          </main>
        ) : currentPage === 'contato' ? (
          <main className="flex-1">
            <ContatoPage 
              onOpenDemo={() => setDemoModalOpen(true)}
              onOpenAuth={() => setAuthModalOpen(true)}
              onNavigate={handleNavigate}
            />
          </main>
        ) : currentPage === 'precos' ? (
          <main className="flex-1 animate-fadeIn">
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
        ) : (
          <main className="flex-1">
            {/* 1. Hero with dark voice demo player & direct test */}
            <Hero 
              onOpenDemo={() => setDemoModalOpen(true)} 
              onOpenAuth={() => setAuthModalOpen(true)}
            />

            {/* 2. Omnichannel delivery (Telefone, WhatsApp, Webchat, E-mail IA) */}
            <ChannelsSection 
              onOpenDemo={() => setDemoModalOpen(true)} 
            />

            {/* 3. Real Call Flow Timeline (00:03 to 01:00) */}
            <CallTimelineSection />

            {/* 4. Inside the Platform (Dashboard preview) */}
            <InsideDashboardSection 
              onOpenDemo={() => setDemoModalOpen(true)}
              onOpenLegal={handleOpenLegal}
              onOpenAuth={() => setAuthModalOpen(true)}
              onOpenDocs={handleOpenDocs}
            />

            {/* 5. 3 Steps Setup (No code needed) */}
            <StepsSection 
              onOpenDemo={() => setDemoModalOpen(true)}
            />

            {/* 6. Vertical Use Cases (Clínicas, Imobiliárias, Advocacia, etc.) */}
            <UseCasesSection 
              onOpenDemo={() => setDemoModalOpen(true)}
            />

            {/* 7. Comprehensive Integrations Grid */}
            <IntegrationsSection 
              onOpenDemo={() => setDemoModalOpen(true)}
            />

            {/* 8. Guarantees (30 Days, LGPD, You in control) */}
            <GuaranteesSection />

            {/* 9. FAQ Accordions */}
            <FaqSection />

            {/* 10. Final Conversion CTA Card & Big Quote */}
            <CtaSection 
              onOpenDemo={() => setDemoModalOpen(true)}
              onOpenAuth={() => setAuthModalOpen(true)}
            />
          </main>
        )}
      </Suspense>

      {/* Footer (Oculto no Dashboard e na Central de Ajuda para ser 1:1 com o Kloel) */}
      {currentPage !== 'dashboard' && currentPage !== 'central-ajuda' && (
        <Footer 
          onOpenDocs={handleOpenDocs}
          onOpenDemo={() => setDemoModalOpen(true)}
          onNavigate={handleNavigate}
        />
      )}

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
    </div>
  );
}