import React, { useState } from 'react';
import { X, ShieldCheck, FileText, ChevronRight, Check, Search, Lock } from 'lucide-react';
import { PRIVACY_POLICY, TERMS_OF_SERVICE } from '../data/content';

export default function LegalModal({ isOpen, initialTab = 'privacidade', onClose }) {
  const [activeTab, setActiveTab] = useState(initialTab);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-[#E7E4DC] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header Bar */}
        <div className="bg-[#FAF9F5] px-6 py-4 border-b border-[#EBE8E2] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#C84B1F]/10 flex items-center justify-center border border-[#C84B1F]/20">
              <ShieldCheck className="w-4 h-4 text-[#C84B1F]" />
            </div>
            <div>
              <span className="text-sm font-bold text-[#1A1816]">Central Jurídica & LGPD</span>
              <span className="text-xs text-[#736F69] block">Vocalis Tecnologia Ltda.</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Tab switch buttons */}
            <div className="inline-flex bg-[#EBE8E2] p-1 rounded-xl text-xs font-semibold">
              <button
                onClick={() => setActiveTab('privacidade')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeTab === 'privacidade' ? 'bg-white text-[#1A1816] shadow-sm' : 'text-[#5C5955] hover:text-[#1A1816]'
                }`}
              >
                Política de Privacidade
              </button>
              <button
                onClick={() => setActiveTab('termos')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeTab === 'termos' ? 'bg-white text-[#1A1816] shadow-sm' : 'text-[#5C5955] hover:text-[#1A1816]'
                }`}
              >
                Termos e Condições
              </button>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white border border-[#E7E4DC] flex items-center justify-center text-[#5C5955] hover:text-[#1A1816] hover:bg-[#FAF9F5] transition-colors ml-2"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 sm:p-10 overflow-y-auto space-y-8 text-[#1A1816] leading-relaxed text-sm sm:text-base">
          
          {/* PRIVACY POLICY VIEW */}
          {activeTab === 'privacidade' && (
            <div className="space-y-8">
              <div>
                <span className="text-xs font-bold text-[#C84B1F] uppercase tracking-wider">
                  LGPD & PROTEÇÃO DE DADOS
                </span>
                <h2 className="text-3xl font-normal text-[#1A1816] tracking-tight mt-1 mb-2">
                  {PRIVACY_POLICY.title}
                </h2>
                <p className="text-sm text-[#5C5955]">
                  {PRIVACY_POLICY.subtitle}
                </p>
                <div className="mt-4 p-4 rounded-xl bg-[#FAF9F5] border border-[#EBE8E2] text-xs text-[#736F69]">
                  Esta Política estabelece como a <strong>VOCALIS TECNOLOGIA LTDA</strong> trata dados pessoais na qualidade de operadora para seus clientes e controladora de seus próprios dados cadastrais, em estrita observância à Lei Geral de Proteção de Dados (Lei nº 13.709/2018 - LGPD).
                </div>
              </div>

              {/* Sections */}
              {PRIVACY_POLICY.sections.map((sec) => (
                <div key={sec.id} className="pt-4 border-t border-[#F0EDE8] space-y-3">
                  <h3 className="text-lg font-bold text-[#1A1816]">
                    {sec.title}
                  </h3>

                  {sec.items && (
                    <ul className="list-disc pl-5 space-y-2 text-sm text-[#4A4744]">
                      {sec.items.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  )}

                  {sec.content && (
                    <p className="text-sm text-[#4A4744] leading-relaxed">
                      {sec.content}
                    </p>
                  )}

                  {/* Table of collected data */}
                  {sec.table && (
                    <div className="overflow-x-auto rounded-xl border border-[#E7E4DC] mt-3">
                      <table className="w-full text-xs text-left">
                        <thead className="bg-[#FAF9F5] border-b border-[#E7E4DC] text-[#736F69] uppercase font-semibold">
                          <tr>
                            <th className="py-2.5 px-3">Categoria</th>
                            <th className="py-2.5 px-3">Exemplos</th>
                            <th className="py-2.5 px-3">Finalidade</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#EBE8E2]">
                          {sec.table.map((row, idx) => (
                            <tr key={idx} className="hover:bg-[#FAF9F5]/60">
                              <td className="py-2.5 px-3 font-semibold text-[#1A1816]">{row.categoria}</td>
                              <td className="py-2.5 px-3 text-[#5C5955]">{row.exemplos}</td>
                              <td className="py-2.5 px-3 text-[#5C5955]">{row.finalidade}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* Suppliers list */}
                  {sec.suppliers && (
                    <div className="overflow-x-auto rounded-xl border border-[#E7E4DC] mt-3">
                      <table className="w-full text-xs text-left">
                        <thead className="bg-[#FAF9F5] border-b border-[#E7E4DC] text-[#736F69] uppercase font-semibold">
                          <tr>
                            <th className="py-2.5 px-3">Fornecedor</th>
                            <th className="py-2.5 px-3">Finalidade</th>
                            <th className="py-2.5 px-3">Local dos Servidores</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#EBE8E2]">
                          {sec.suppliers.map((sup, idx) => (
                            <tr key={idx} className="hover:bg-[#FAF9F5]/60">
                              <td className="py-2.5 px-3 font-semibold text-[#1A1816]">{sup.fornecedor}</td>
                              <td className="py-2.5 px-3 text-[#5C5955]">{sup.finalidade}</td>
                              <td className="py-2.5 px-3 font-mono text-[#736F69]">{sup.local}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* DPO box */}
                  {sec.dpoEmail && (
                    <div className="p-4 rounded-xl bg-[#FAF5EE] border border-[#EDE5D8] flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold text-[#C84B1F]">Encarregado de Proteção de Dados (DPO)</div>
                        <div className="text-xs text-[#5C5955]">Canal oficial de atendimento aos titulares</div>
                      </div>
                      <a 
                        href={`mailto:${sec.dpoEmail}`}
                        className="px-3 py-1.5 rounded-lg bg-white border border-[#E7E4DC] font-mono text-xs font-bold text-[#C84B1F] hover:bg-[#FAF9F5]"
                      >
                        {sec.dpoEmail}
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* TERMS OF SERVICE VIEW */}
          {activeTab === 'termos' && (
            <div className="space-y-8">
              <div>
                <span className="text-xs font-bold text-[#C84B1F] uppercase tracking-wider">
                  TERMOS CONTRATUAIS
                </span>
                <h2 className="text-3xl font-normal text-[#1A1816] tracking-tight mt-1 mb-2">
                  {TERMS_OF_SERVICE.title}
                </h2>
                <p className="text-sm text-[#5C5955]">
                  {TERMS_OF_SERVICE.subtitle}
                </p>
                <div className="mt-2 text-xs font-mono text-[#8C8881]">
                  {TERMS_OF_SERVICE.version}
                </div>
              </div>

              {/* Numbered Sections */}
              <div className="space-y-6 pt-4 border-t border-[#F0EDE8]">
                {TERMS_OF_SERVICE.sections.map((sec) => (
                  <div key={sec.num} className="space-y-1.5">
                    <h3 className="text-base font-bold text-[#1A1816]">
                      {sec.num}. {sec.title}
                    </h3>
                    <p className="text-sm text-[#4A4744] leading-relaxed">
                      {sec.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer Bar */}
        <div className="bg-[#FAF9F5] px-6 py-4 border-t border-[#EBE8E2] flex items-center justify-between shrink-0">
          <span className="text-xs text-[#736F69]">
            Vocalis • Segurança e Privacidade Garantidas
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#1A1816] text-white text-xs font-semibold hover:bg-black transition-colors"
          >
            Entendido e Fechar
          </button>
        </div>

      </div>
    </div>
  );
}
