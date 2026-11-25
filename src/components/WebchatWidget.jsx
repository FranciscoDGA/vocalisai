import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Bot, Phone, MessageCircle, Sparkles, CheckCheck } from 'lucide-react';
import { BRAND } from '../data/content';
import { buildBeatrizCommercialReply } from '../utils/commercialCatalogUtils';

export default function WebchatWidget({ onOpenDemo, onOpenAuth }) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'beatriz',
      text: 'Olá! 👋 Eu sou a Beatriz, assistente virtual de Inteligência Artificial (IA) da Vocalis AI. Esta conversa é automatizada e ilustrativa; se preferir atendimento humano, clique abaixo para falar com nossa equipe.',
      showDemoCta: true,
      time: 'Agora'
    }
  ]);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleSendMessage = (textToSend) => {
    const text = textToSend || inputMessage;
    if (!text.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');
    setIsTyping(true);

    setTimeout(() => {
      let reply = `Sou uma assistente de IA (simulação interativa). Entendi sua dúvida sobre "${text}". Posso responder informações comerciais do catálogo oficial ou abrir o formulário de solicitação para você conversar com nossa equipe humana.`;
      let isCommercial = false;
      let showDemoCta = false;

      const lower = text.toLowerCase();
      const hasSensitiveKeyword =
        /(diagn[óo]st|prescri|receita m[ée]dica|prontu[áa]rio|jur[íi]dic|processo judicial|senten[çc]a|cart[ãa]o|senha banc[áa]ria|pix|cpf|biometr)/i.test(
          lower
        );
      const hasCommercialKeyword =
        /(pre[çc]o|preco|plano|valor|quanto custa|promoc|promo[çc]|anual|mensal|excedent|limite|minuto|conversa|solo|team|scale|taxa|impost|meta|renov|cancel|reembols|descont|209|279|299|399|499|599)/i.test(
          lower
        );

      if (hasSensitiveKeyword) {
        reply =
          'A Vocalis AI não realiza diagnósticos médicos, pareceres jurídicos nem coleta senhas, cartão ou dados sensíveis no atendimento automatizado. Triagens sensíveis exigem supervisão humana da empresa responsável.';
        showDemoCta = true;
        if (hasCommercialKeyword) {
          reply = `${reply}\n\n${buildBeatrizCommercialReply(text)}`;
          isCommercial = true;
        }
      } else if (hasCommercialKeyword) {
        reply = buildBeatrizCommercialReply(text);
        isCommercial = true;
        showDemoCta = true;
      } else if (
        lower.includes('humano') ||
        lower.includes('atendente') ||
        lower.includes('pessoa') ||
        lower.includes('suporte') ||
        lower.includes('especialista')
      ) {
        reply = `Este widget executa apenas um atendimento automatizado por IA no navegador e não transfere automaticamente para atendente humano ao vivo dentro desta janela. Use o botão abaixo para enviar sua solicitação à nossa equipe humana.`;
        showDemoCta = true;
      } else if (lower.includes('roberta') || lower.includes('telefone') || lower.includes('fone') || lower.includes('ligação') || lower.includes('ligacao') || lower.includes('sdr')) {
        reply = `A Roberta ilustra o atendimento telefônico por IA. O simulador no topo da página roda no navegador de forma demonstrativa; a operação telefônica real depende de provedores terceiros e condições do plano contratado.`;
        showDemoCta = true;
      } else if (lower.includes('camila') || lower.includes('whatsapp') || lower.includes('zap')) {
        reply = `A Camila ilustra o atendimento automatizado de IA no WhatsApp. ${buildBeatrizCommercialReply('whatsapp')} A integração oficial (Meta Cloud API) pode envolver custos diretos da Meta e configuração comercial dedicada.`;
        isCommercial = true;
        showDemoCta = true;
      } else if (lower.includes('olá') || lower.includes('ola') || lower.includes('oi') || lower.includes('bom dia') || lower.includes('boa tarde')) {
        reply = `Olá! Sou uma assistente automatizada de Inteligência Artificial (IA). Posso consultar o catálogo comercial oficial ou encaminhar você para o formulário da nossa equipe humana.`;
        showDemoCta = true;
      }

      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'beatriz',
          text: reply,
          isCommercial,
          showDemoCta,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <div className="fixed bottom-4 right-4 z-40 font-sans">
      
      {/* Floating Closed Pill / Button */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="Abrir chat com Beatriz, assistente virtual de IA"
          className="flex items-center justify-center sm:justify-start gap-2.5 w-12 h-12 sm:w-auto sm:h-auto p-0 sm:px-4 sm:py-2.5 rounded-full bg-[#11100F] text-white hover:bg-black shadow-xl hover:shadow-2xl transition-all cursor-pointer border border-[#383531] group hover:scale-105"
        >
          <div className="relative">
            <div className="w-8 h-8 rounded-full bg-[#EEF2FF] text-[#4F46E5] flex items-center justify-center font-bold text-xs border border-[#F2E8DC]">
              <Bot className="w-4 h-4" />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-indigo-400 rounded-full border-2 border-[#11100F]"></span>
          </div>
          <div className="hidden sm:block text-left pr-1">
            <div className="text-xs font-bold leading-none text-white">Beatriz · Assistente de IA</div>
            <div className="text-[10px] text-[#A5B4FC] font-medium">Chat Automatizado por IA</div>
          </div>
          <MessageSquare className="hidden sm:block w-4 h-4 text-[#A5B4FC] ml-1 group-hover:rotate-12 transition-transform" />
        </button>
      )}

      {/* Open Webchat Window */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="false"
          aria-label="Atendimento virtual automatizado com Beatriz"
          className="w-[360px] max-w-[calc(100vw-2rem)] h-[520px] max-h-[calc(100vh-6rem)] bg-white rounded-3xl border border-[#E7E4DC] shadow-2xl flex flex-col overflow-hidden animate-fadeIn"
        >
          
          {/* Header */}
          <div className="p-4 bg-[#11100F] text-white flex items-center justify-between border-b border-[#2D2A26]">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-[#EEF2FF] text-[#4F46E5] flex items-center justify-center text-lg border border-[#F2E8DC]">
                  <Bot className="w-5 h-5" />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-indigo-400 rounded-full border-2 border-[#11100F]"></span>
              </div>
              <div>
                <div className="text-sm font-bold flex items-center gap-1.5">
                  <span>Beatriz · Assistente de IA</span>
                  <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-indigo-950 text-[#A5B4FC] border border-indigo-700">
                    IA Automatizada
                  </span>
                </div>
                <div className="text-[11px] text-[#A6A29A]">Atendimento Automatizado por IA · {BRAND.name}</div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Fechar chat da Beatriz"
              className="w-7 h-7 rounded-full bg-[#262422] hover:bg-[#383531] flex items-center justify-center text-[#B5B0A8] hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Info Ribbon */}
          <div className="bg-[#FAF9F5] px-3.5 py-2 border-b border-[#EBE8E2] text-[11px] text-[#5C5955] flex items-center justify-between gap-2">
            <span className="flex items-center gap-1 font-medium text-[#1A1816]">
              <Bot className="w-3.5 h-3.5 text-[#4F46E5] shrink-0" />
              <span>Você está falando com uma IA</span>
            </span>
            <span className="text-[10px] text-[#736F69] shrink-0">Catálogo oficial · Simulação</span>
          </div>

          {/* Message List */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#FAF9F5]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#11100F] text-white rounded-br-none shadow-sm'
                      : 'bg-white text-[#1A1816] rounded-bl-none border border-[#E7E4DC] shadow-xs'
                  }`}
                >
                  {msg.text}
                  {(msg.showDemoCta || msg.isCommercial) && onOpenDemo && (
                    <button
                      type="button"
                      onClick={onOpenDemo}
                      className="mt-2 block text-[11px] font-bold text-[#4F46E5] hover:underline cursor-pointer"
                    >
                      Falar com a equipe humana / Solicitar contato ➔
                    </button>
                  )}
                </div>
                <span className="text-[9px] text-[#A6A29A] mt-1 px-1">{msg.time}</span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1.5 p-2 bg-white rounded-2xl w-16 border border-[#E7E4DC]">
                <span className="w-1.5 h-1.5 bg-[#4F46E5] rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-[#4F46E5] rounded-full animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1.5 h-1.5 bg-[#4F46E5] rounded-full animate-bounce [animation-delay:0.4s]"></span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestion Chips */}
          <div className="p-2 bg-white border-t border-[#EBE8E2] flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            <button
              onClick={() => handleSendMessage('Como funciona a Roberta no telefone?')}
              className="text-[10px] whitespace-nowrap px-2.5 py-1 rounded-full bg-[#EEF2FF] text-[#4F46E5] border border-[#F2E8DC] hover:bg-[#F5ECE0] font-medium transition-colors"
            >
              📞 Roberta no Telefone
            </button>
            <button
              onClick={() => handleSendMessage('Como funciona a Camila no WhatsApp?')}
              className="text-[10px] whitespace-nowrap px-2.5 py-1 rounded-full bg-[#DCFCE7] text-[#16A34A] border border-[#BBF7D0] hover:bg-[#BBF7D0] font-medium transition-colors"
            >
              💬 Camila no WhatsApp
            </button>
            <button
              onClick={() => handleSendMessage('Quais são os planos e preços?')}
              className="text-[10px] whitespace-nowrap px-2.5 py-1 rounded-full bg-[#F3E8FF] text-[#9333EA] border border-[#E9D5FF] hover:bg-[#E9D5FF] font-medium transition-colors"
            >
              🏷️ Planos & Preços
            </button>
          </div>

          {/* Input Footer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-white border-t border-[#EBE8E2] flex items-center gap-2"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Pergunte à Beatriz..."
              aria-label="Mensagem para Beatriz"
              className="flex-1 px-3 py-2 rounded-xl border border-[#D0CBC0] text-xs text-[#1A1816] focus:outline-none focus:border-[#4F46E5] bg-white placeholder-[#A6A29A]"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim()}
              aria-label="Enviar mensagem"
              className="w-8 h-8 rounded-xl bg-[#4F46E5] disabled:opacity-40 text-white flex items-center justify-center hover:bg-[#4338CA] transition-colors cursor-pointer shrink-0"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

        </div>
      )}

    </div>
  );
}
