import React, { useState } from 'react';
import { MessageSquare, Play, Pause, Send, ArrowRight, CheckCheck, Mic } from 'lucide-react';
import { SPECIALIST_CONTACT } from '../data/content';
import { speakFemalePt } from '../utils/voiceUtils';

export default function WhatsAppInstantAudioCard() {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const audioMessageText = "Olá! Aqui é a assistente de inteligência artificial da Vocalis. Acabei de receber sua mensagem pelo site. Nosso sistema envia respostas em áudio natural como este aqui direto no seu WhatsApp em menos de três segundos. Como posso ajudar a sua empresa hoje?";

  const handlePlaySample = () => {
    if (isPlayingAudio) {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      setIsPlayingAudio(false);
    } else {
      setIsPlayingAudio(true);
      speakFemalePt(
        audioMessageText,
        () => setIsPlayingAudio(true),
        () => setIsPlayingAudio(false),
        () => setIsPlayingAudio(false)
      );
    }
  };

  const whatsappUrl = SPECIALIST_CONTACT.getWhatsAppUrl(
    'Olá! Estou no site da Vocalis AI e quero receber um áudio de demonstração no meu WhatsApp agora.'
  );

  return (
    <section className="py-20 bg-white border-b border-[#EBE8E2] font-sans">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* WhatsApp Card Box */}
        <div className="bg-[#FAF9F5] rounded-3xl p-6 sm:p-12 border-2 border-emerald-500/30 shadow-lg flex flex-col lg:flex-row items-center justify-between gap-10">
          
          {/* Left Info */}
          <div className="max-w-xl space-y-4 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>EXPERIÊNCIA AO VIVO NO SEU WHATSAPP</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-normal text-[#1A1816] tracking-tight leading-tight">
              Mande um "Oi" no WhatsApp e receba um{' '}
              <span className="font-serif-title italic text-emerald-700">áudio humano em 3 segundos.</span>
            </h2>

            <p className="text-sm text-[#5C5955] leading-relaxed">
              Veja a mágica acontecer no seu próprio aparelho. Ao clicar no botão abaixo, nosso bot inteligente no WhatsApp responderá com uma <strong>nota de voz personalizada</strong> com fala acolhedora, sem taxa por mensagem da Meta.
            </p>

            <div className="pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#16A34A] hover:bg-[#15803D] text-white font-bold text-sm shadow-lg shadow-emerald-600/25 transition-all hover:scale-105 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Testar Áudio no Meu WhatsApp Agora</span>
              </a>
              <span className="text-[11px] text-[#8C8881] block mt-2">
                Conexão direta com número real da nossa empresa.
              </span>
            </div>
          </div>

          {/* Right Simulated WhatsApp Audio Bubble */}
          <div className="w-full max-w-sm bg-white rounded-3xl p-5 border border-stone-200 shadow-md space-y-3">
            
            <div className="flex items-center justify-between pb-3 border-b border-stone-100 text-xs">
              <span className="font-bold text-[#1A1816] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Vocalis AI • WhatsApp</span>
              </span>
              <span className="text-[10px] text-stone-400">Agora mesmo</span>
            </div>

            {/* Audio Bubble Message */}
            <div className="bg-[#E7F8ED] border border-[#C5EED4] rounded-2xl p-3.5 flex items-center gap-3">
              <button
                onClick={handlePlaySample}
                className="w-10 h-10 rounded-full bg-[#16A34A] hover:bg-[#15803D] text-white flex items-center justify-center shrink-0 shadow-sm transition-transform hover:scale-105 cursor-pointer"
              >
                {isPlayingAudio ? (
                  <Pause className="w-4 h-4" />
                ) : (
                  <Play className="w-4 h-4 fill-white ml-0.5" />
                )}
              </button>

              <div className="flex-1 space-y-1">
                {/* Waveform Visualization */}
                <div className="flex items-center gap-0.5 h-6">
                  {[12, 18, 24, 14, 22, 28, 16, 20, 26, 18, 22, 14, 18, 26, 20, 15, 10].map((h, i) => (
                    <span
                      key={i}
                      style={{ height: `${isPlayingAudio ? h * 1.1 : h * 0.7}px` }}
                      className={`w-1 rounded-full transition-all ${
                        isPlayingAudio ? 'bg-[#16A34A] animate-pulse' : 'bg-stone-400'
                      }`}
                    />
                  ))}
                </div>
                <div className="flex items-center justify-between text-[10px] text-stone-500">
                  <span>0:18</span>
                  <span className="flex items-center text-emerald-600 font-bold">
                    <CheckCheck className="w-3.5 h-3.5 inline mr-0.5" />
                    Entregue
                  </span>
                </div>
              </div>

              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] text-white font-bold text-[10px] flex items-center justify-center shrink-0">
                AI
              </div>
            </div>

            <p className="text-[11px] text-stone-500 italic text-center">
              "Clique no play acima para pré-visualizar o áudio que o seu cliente receberá."
            </p>

          </div>

        </div>

      </div>
    </section>
  );
}
