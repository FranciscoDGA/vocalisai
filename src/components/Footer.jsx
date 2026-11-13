import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { BRAND } from '../data/content';

export default function Footer({ onOpenDocs, onOpenDemo, onNavigate }) {
  return (
    <footer className="bg-white border-t border-[#EBE8E2] pt-16 pb-12 text-[#5C5955] text-xs font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-[#EBE8E2]">
          
          {/* Col 1: Brand Info & Contacts (Spans 2 columns) */}
          <div className="md:col-span-2 space-y-4">
            
            {/* Logo clean soundwave bars */}
            <div className="flex items-center gap-2.5">
              <div className="flex items-center gap-[3px] h-5">
                <span className="w-[3px] h-3.5 bg-[#C84B1F] rounded-full"></span>
                <span className="w-[3px] h-5 bg-[#C84B1F] rounded-full"></span>
                <span className="w-[3px] h-3 bg-[#C84B1F] rounded-full"></span>
              </div>
              <span className="text-2xl font-bold tracking-tight text-[#1A1816] font-sans">
                {BRAND.name.toLowerCase()}
              </span>
            </div>

            <p className="text-xs text-[#736F69] max-w-xs leading-relaxed">
              A voz da sua empresa — no telefone, no WhatsApp e no seu site.
            </p>

            {/* Contacts */}
            <div className="space-y-2 text-xs text-[#1A1816] pt-1">
              <div>
                <a href="mailto:contato@vocalis.ai" className="text-[#1A1816] hover:text-[#C84B1F] transition-colors">
                  contato@vocalis.ai
                </a>
              </div>
              
              <div>
                <a 
                  href="tel:+5594984478168"
                  className="flex items-center gap-2 hover:text-[#C84B1F] transition-colors group cursor-pointer"
                  title="Falar ou receber ligação da Roberta"
                >
                  <Phone className="w-3.5 h-3.5 text-[#5C5955] group-hover:text-[#C84B1F] shrink-0" />
                  <span className="font-semibold text-[#1A1816] group-hover:text-[#C84B1F]">(94) 98447-8168</span>
                  <span className="text-[#8C8881]">· Falar ou receber ligação da Roberta</span>
                </a>
              </div>

              <div>
                <a 
                  href="https://wa.me/5594984423948?text=Ol%C3%A1!%20Vim%20pelo%20site%20da%20Vocalis%20AI%20e%20gostaria%20de%20falar%20com%20um%20especialista."
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 hover:text-[#16A34A] transition-colors group cursor-pointer"
                  title="Falar com Especialista WhatsApp"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-[#5C5955] group-hover:text-[#16A34A] shrink-0" />
                  <span className="font-semibold text-[#1A1816] group-hover:text-[#16A34A]">(94) 98442-3948</span>
                  <span className="text-[#8C8881]">· Falar com Especialista WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Social Icons (Instagram, Facebook) */}
            <div className="flex items-center gap-3 pt-2 text-[#5C5955]">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer" 
                className="hover:text-[#1A1816] transition-colors"
                title="Instagram"
              >
                <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer" 
                className="hover:text-[#1A1816] transition-colors"
                title="Facebook"
              >
                <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
            </div>

            {/* Badge: Feita no Brasil, em português */}
            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#E7E4DC] bg-[#FAF9F5] text-[11px] font-medium text-[#5C5955]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C84B1F]"></span>
                <span>Feita no Brasil, em português</span>
              </span>
            </div>

          </div>

          {/* Col 2: NAVEGAÇÃO */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-bold text-[#8C8881] uppercase tracking-wider">
              NAVEGAÇÃO
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a 
                  href="#casos-de-uso" 
                  onClick={() => { if (onNavigate) onNavigate('home'); }}
                  className="text-[#5C5955] hover:text-[#1A1816] transition-colors block"
                >
                  Casos de uso
                </a>
              </li>
              <li>
                <button 
                  onClick={() => { if (onNavigate) { onNavigate('precos'); window.scrollTo({ top: 0, behavior: 'smooth' }); } }}
                  className="text-[#5C5955] hover:text-[#1A1816] transition-colors block text-left cursor-pointer"
                >
                  Preços & Planos
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: SOBRE A VOCALIS */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-bold text-[#8C8881] uppercase tracking-wider">
              SOBRE A VOCALIS
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button 
                  onClick={() => {
                    if (onNavigate) onNavigate('contato');
                    else onOpenDemo();
                  }}
                  className="text-[#5C5955] hover:text-[#1A1816] transition-colors text-left"
                >
                  Contato
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: RECURSOS */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-bold text-[#8C8881] uppercase tracking-wider">
              RECURSOS
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button 
                  onClick={() => {
                    if (onNavigate) onNavigate('central-ajuda');
                    else onOpenDocs('central');
                  }}
                  className="text-[#5C5955] hover:text-[#1A1816] transition-colors text-left"
                >
                  Central de ajuda
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar (Exact replica of user's uploaded print) */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-[#8C8881] gap-4">
          
          {/* Left: Copyright + Legal Links */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[#8C8881]">
            <span>© 2026 {BRAND.name}. Todos os direitos reservados.</span>
            <button 
              onClick={() => onOpenDocs('termos')}
              className="hover:text-[#1A1816] transition-colors cursor-pointer"
            >
              Aviso legal
            </button>
            <button 
              onClick={() => onOpenDocs('privacidade')}
              className="hover:text-[#1A1816] transition-colors cursor-pointer"
            >
              Proteção de dados
            </button>
            <button 
              onClick={() => onOpenDocs('dpa')}
              className="hover:text-[#1A1816] transition-colors cursor-pointer"
            >
              Exclusão de dados
            </button>
          </div>

          {/* Right: dados tratados conforme a LGPD badge */}
          <div className="flex items-center gap-1.5 text-xs text-[#8C8881] pt-1 sm:pt-0">
            <span>dados tratados conforme a LGPD</span>
          </div>

        </div>

      </div>
    </footer>
  );
}
