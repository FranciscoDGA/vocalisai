import React, { useEffect } from 'react';
import { X, Printer, Download, ShieldCheck, CheckCircle2, TrendingUp, Building2, Phone, MessageSquare, Clock } from 'lucide-react';
import VocalisLogo from './VocalisLogo';
import { BRAND } from '../data/content';
import {
  getCommercialEntryLabel,
  getLowestConfirmedEntryDetails,
  getLowestConfirmedEntryPrice,
  getSimultaneousCallsSummary,
} from '../utils/commercialCatalogUtils';

export default function ExecutiveDossierModal({ isOpen, onClose, onOpenDemo }) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose?.();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const telefoneEntry = getLowestConfirmedEntryDetails('telefone');

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Dossiê Executivo Vocalis AI"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-xs animate-fadeIn overflow-y-auto"
    >
      <div className="bg-white rounded-3xl max-w-4xl w-full p-6 sm:p-12 border border-[#E7E4DC] shadow-2xl relative text-left my-8 max-h-[92vh] overflow-y-auto print:max-h-none print:overflow-visible print:border-none print:shadow-none print:p-0">
        
        {/* Print Styles */}
        <style>{`
          @media print {
            body * {
              visibility: hidden;
            }
            .print-dossier-area, .print-dossier-area * {
              visibility: visible;
            }
            .print-dossier-area {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
            }
            .no-print {
              display: none !important;
            }
          }
        `}</style>

        {/* Modal Controls (No Print) */}
        <div className="no-print flex items-center justify-between pb-6 mb-6 border-b border-[#EBE8E2]">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-indigo-50 text-[#4F46E5] text-xs font-bold uppercase tracking-wider">
              DOCUMENTO EXECUTIVO B2B
            </span>
            <span className="text-xs text-[#8C8881]">· Versão Oficial 2026</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#11100F] hover:bg-black text-white text-xs font-semibold shadow-sm transition-all cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimir / Salvar em PDF</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Fechar dossiê executivo"
              className="p-2 text-[#8C8881] hover:text-[#1A1816] rounded-xl hover:bg-[#FAF9F5] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Area */}
        <div className="print-dossier-area space-y-8 font-sans text-[#1A1816]">
          
          {/* Header of Dossier */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#EBE8E2]">
            <div>
              <VocalisLogo size="md" />
              <p className="text-xs text-[#736F69] mt-2 font-mono">
                Plataforma de Voz Neural & Automação Omnichannel Corporativa
              </p>
            </div>
            <div className="text-left sm:text-right text-xs text-[#8C8881]">
              <p>Apresentação Comercial · Vocalis AI</p>
              <p className="font-mono mt-0.5">Material ilustrativo · SLA e termos conforme contrato</p>
            </div>
          </div>

          {/* Title */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1A1816] tracking-tight leading-tight">
              Material Executivo Ilustrativo (Análise de Cenário)
            </h1>
            <p className="text-sm text-[#5C5955] mt-2 leading-relaxed">
              Visão geral ilustrativa para comparar custos referenciais de atendimento tradicional e automação com a Vocalis AI. Condições, integrações e níveis de serviço são confirmados formalmente na proposta comercial.
            </p>
          </div>

          {/* 1. Comparison ROI Table */}
          <div className="rounded-2xl border border-[#E7E4DC] overflow-hidden">
            <div className="p-4 bg-[#FAF9F5] border-b border-[#E7E4DC] font-bold text-xs uppercase tracking-wider text-[#1A1816]">
              1. Comparativo Ilustrativo: Atendimento Tradicional vs Vocalis AI
            </div>
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-[#E7E4DC] bg-white text-[#736F69]">
                  <th className="p-3.5 font-bold">Indicador de Custo</th>
                  <th className="p-3.5">Referência CLT (1 Posição)</th>
                  <th className="p-3.5 font-bold text-[#4F46E5] bg-indigo-50/50">Vocalis AI (Conforme Plano)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E7E4DC]">
                <tr>
                  <td className="p-3.5 font-semibold text-[#1A1816]">Custo Mensal Direto</td>
                  <td className="p-3.5 text-[#5C5955]">R$ 1.800 a R$ 2.400 (referência ilustrativa de salário base)</td>
                  <td className="p-3.5 font-bold text-emerald-700 bg-indigo-50/30">{getCommercialEntryLabel('telefone')}</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-[#1A1816]">Encargos e Benefícios Trabalhistas</td>
                  <td className="p-3.5 text-rose-600 font-medium">Encargos incidentes conforme legislação trabalhista</td>
                  <td className="p-3.5 font-bold text-emerald-700 bg-indigo-50/30">Assinatura de software e uso (sem vínculo empregatício)</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-[#1A1816]">Horário de Cobertura</td>
                  <td className="p-3.5 text-[#5C5955]">44h semanais (apenas horário comercial)</td>
                  <td className="p-3.5 font-bold text-emerald-700 bg-indigo-50/30">Horário configurável, inclusive fora do expediente</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-[#1A1816]">Capacidade Simultânea</td>
                  <td className="p-3.5 text-[#5C5955]">1 chamada por vez (demais dão ocupado)</td>
                  <td className="p-3.5 font-bold text-emerald-700 bg-indigo-50/30">{getSimultaneousCallsSummary('telefone')}</td>
                </tr>
                <tr className="bg-[#FAF9F5] font-bold">
                  <td className="p-3.5 text-[#1A1816]">Comparativo Ilustrativo de Entrada</td>
                  <td className="p-3.5 text-rose-600">Referência ilustrativa CLT: ~R$ 45.600/ano</td>
                  <td className="p-3.5 text-emerald-700 bg-indigo-50/50">
                    {telefoneEntry && typeof getLowestConfirmedEntryPrice('telefone') === 'number'
                      ? `${telefoneEntry.channelShortName} ${telefoneEntry.planName}: ${telefoneEntry.displayPrice}/mês nos 3 primeiros meses${telefoneEntry.regularPriceLabel ? ` (depois ${telefoneEntry.regularPriceLabel}/mês no plano mensal)` : ''} — valores CLT são meramente ilustrativos.`
                      : 'Calculada na proposta conforme plano confirmado (valores CLT são referências ilustrativas).'}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* 2. Key Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#E7E4DC]">
              <div className="w-8 h-8 rounded-xl bg-indigo-100 text-[#4F46E5] flex items-center justify-center mb-2">
                <Clock className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-xs text-[#1A1816]">Atendimento fora do expediente</h4>
              <p className="text-[11px] text-[#5C5955] mt-1 leading-relaxed">
                Permite configurar triagem e agendamentos também fora do horário comercial, conforme as regras do plano.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#E7E4DC]">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-2">
                <MessageSquare className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-xs text-[#1A1816]">Atendimento via WhatsApp</h4>
              <p className="text-[11px] text-[#5C5955] mt-1 leading-relaxed">
                Automação em texto e áudio. A modalidade de conexão e eventuais custos de provedor ou da Meta são confirmados na proposta.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#E7E4DC]">
              <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center mb-2">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-xs text-[#1A1816]">Privacidade e LGPD</h4>
              <p className="text-[11px] text-[#5C5955] mt-1 leading-relaxed">
                Diretrizes de proteção de dados descritas na Política de Privacidade e nos termos contratuais aplicáveis.
              </p>
            </div>
          </div>

          {/* 3. Implantação Assistida */}
          <div className="p-5 rounded-2xl border border-[#E7E4DC] bg-white text-xs space-y-2">
            <div className="font-bold text-sm text-[#1A1816] flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Implantação Assistida (Escopo e Prazo Sob Consulta)</span>
            </div>
            <p className="text-[#5C5955] leading-relaxed">
              A equipe da Vocalis AI alinha a configuração de roteiros, voz e possíveis integrações de acordo com a necessidade da empresa e os recursos do plano escolhido.
            </p>
            <div className="pt-2 text-[11px] text-[#8C8881] font-mono">
              O escopo de implantação, integrações, canais de suporte e condições de cancelamento ou reembolso são confirmados formalmente na proposta comercial.
            </div>
          </div>

          {/* Signoff block */}
          <div className="pt-6 border-t border-[#EBE8E2] flex items-center justify-between text-xs text-[#8C8881]">
            <div>
              <span>Emitido por: <strong>Vocalis AI Tecnologia Ltda</strong></span>
              <span className="block text-[11px]">contato@vocalis.ai · www.vocalis.ai</span>
            </div>
            <div className="text-right">
              <span>Validade da proposta: 30 dias</span>
            </div>
          </div>

        </div>

        {/* Modal Bottom Actions (No Print) */}
        <div className="no-print mt-8 pt-6 border-t border-[#EBE8E2] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#5C5955]">
            Quer uma versão personalizada com os dados e logo da sua empresa? <strong>Fale com um consultor corporativo.</strong>
          </p>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handlePrint}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border border-[#D0CBC0] hover:bg-[#FAF9F5] text-xs font-semibold text-[#1A1816] transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Salvar PDF</span>
            </button>
            <button
              onClick={() => {
                onClose();
                if (onOpenDemo) onOpenDemo();
              }}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[#4F46E5] hover:bg-[#4338CA] text-white text-xs font-semibold shadow-md transition-all cursor-pointer"
            >
              <span>Agendar Apresentação Guiada</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
