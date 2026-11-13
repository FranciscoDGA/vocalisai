import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ChannelsSection from './components/ChannelsSection';
import CallTimelineSection from './components/CallTimelineSection';
import InsideDashboardSection from './components/InsideDashboardSection';
import StepsSection from './components/StepsSection';
import UseCasesSection from './components/UseCasesSection';
import IntegrationsSection from './components/IntegrationsSection';
import PricingSection from './components/PricingSection';
import GuaranteesSection from './components/GuaranteesSection';
import FaqSection from './components/FaqSection';
import CtaSection from './components/CtaSection';
import Footer from './components/Footer';
import LegalModal from './components/LegalModal';
import AuthModal from './components/AuthModal';
import DemoModal from './components/DemoModal';
import DocsPortal from './components/DocsPortal';
import ParceirosPage from './components/ParceirosPage';
import WhatsAppPage from './components/WhatsAppPage';
import WebchatPage from './components/WebchatPage';
import AgenteSuportePage from './components/AgenteSuportePage';
import AgendamentosPage from './components/AgendamentosPage';
import RecepcionistaVirtualPage from './components/RecepcionistaVirtualPage';
import AtendedorAutomaticoPage from './components/AtendedorAutomaticoPage';
import EquipeExternaPage from './components/EquipeExternaPage';
import WebinarsPage from './components/WebinarsPage';
import IntegracoesPage from './components/IntegracoesPage';
import CentralAjudaPage from './components/CentralAjudaPage';
import CarreirasPage from './components/CarreirasPage';
import ImprensaPage from './components/ImprensaPage';
import ContatoPage from './components/ContatoPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home'); // 'home' | 'parceiros' | 'whatsapp' | 'webchat' | 'agente-suporte' | 'agendamentos' | 'recepcionista-virtual' | 'atendedor-automatico' | 'equipe-externa' | 'webinars' | 'integracoes'
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [legalModalOpen, setLegalModalOpen] = useState(false);
  const [legalInitialTab, setLegalInitialTab] = useState('privacidade');
  const [docsPortalOpen, setDocsPortalOpen] = useState(false);
  const [docsInitialDoc, setDocsInitialDoc] = useState('privacidade');

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
      {/* Top Navbar (hidden on Central de Ajuda to match standalone portal screenshot) */}
      {currentPage !== 'central-ajuda' && (
        <Navbar 
          currentPage={currentPage}
          onNavigate={handleNavigate}
          onOpenDemo={() => setDemoModalOpen(true)} 
          onOpenAuth={() => setAuthModalOpen(true)}
          onOpenLegal={handleOpenLegal}
          onOpenDocs={handleOpenDocs}
        />
      )}

      {/* Main Page Stream */}
      {currentPage === 'parceiros' ? (
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

          {/* 4. Inside the Platform (Dashboard preview based on real prints) */}
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

      {/* Footer (Exact replica of user print) */}
      <Footer 
        onOpenDocs={handleOpenDocs}
        onOpenDemo={() => setDemoModalOpen(true)}
        onNavigate={handleNavigate}
      />

      {/* Full Docs & Legal Portal (Matching user's exact uploaded doc portal) */}
      <DocsPortal 
        isOpen={docsPortalOpen}
        initialDoc={docsInitialDoc}
        onClose={() => setDocsPortalOpen(false)}
        onOpenApp={() => setDocsPortalOpen(false)}
      />

      {/* Quick Legal Modal */}
      <LegalModal 
        isOpen={legalModalOpen} 
        initialTab={legalInitialTab} 
        onClose={() => setLegalModalOpen(false)} 
      />

      {/* Auth Modal */}
      <AuthModal 
        isOpen={authModalOpen} 
        onClose={() => setAuthModalOpen(false)} 
      />

      {/* Demo Modal */}
      <DemoModal 
        isOpen={demoModalOpen} 
        onClose={() => setDemoModalOpen(false)} 
      />
    </div>
  );
}
