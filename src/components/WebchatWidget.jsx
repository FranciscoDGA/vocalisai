import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Bot, Phone, MessageCircle, Sparkles, CheckCheck } from 'lucide-react';
import { BRAND } from '../data/content';

export default function WebchatWidget({ onOpenDemo, onOpenAuth }) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'beatriz',
      text: 'Olá! 👋 Eu sou a Beatriz, assistente virtual da Vocalis AI. Como posso te ajudar hoje?',
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
      let reply = `Com certeza! A Vocalis foi feita para automatizar seu atendimento em múltiplos canais com 3 assistentes especializadas: a Débora (primeiros atendimentos no telefone), a Camila (atendimento e vendas no WhatsApp) e eu, Beatriz, no webchat do site!`;
      
      const lower = text.toLowerCase();
      if (lower.includes('débora') || lower.includes('debora') || lower.includes('telefone') || lower.includes('fone') || lower.includes('ligação')) {
        reply = `A Débora é nossa especialista em atendimento telefônico! Ela atende chamadas com voz neural em 450ms, faz triagem humanizada, agenda consultas e transfere para sua equipe quando necessário. Você pode testar uma ligação com ela no topo da página!`;
      } else if (lower.includes('camila') || lower.includes('whatsapp') || lower.includes('zap')) {
        reply = `A Camila é nossa especialista em WhatsApp Business! Ela atende seus clientes 24/7 no WhatsApp, envia propostas, tira dúvidas de catálogos e gera Pix copia-e-cola na hora para fechar vendas.`;
      } else if (lower.includes('preço') || lower.includes('plano') || lower.includes('valor') || lower.includes('quanto custa')) {
        reply = `Temos planos a partir de R$ 209/mês para WhatsApp e Webchat, e planos completos com voz neural telefônica a partir de R$ 503/mês. E você pode estender em dias de pico por R$ 70/h!`;
      } else if (lower.includes('olá') || lower.includes('oi') || lower.includes('bom dia') || lower.includes('boa tarde')) {
        reply = `Olá! Tudo bem? Estou pronta para te ajudar a entender como ter funcionários virtuais atendendo sua empresa 24 horas por dia!`;
      }

      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'beatriz',
          text: reply,
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
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#11100F] text-white hover:bg-black shadow-xl hover:shadow-2xl transition-all cursor-pointer border border-[#383531] group hover:scale-105"
        >
          <div className="relative">
            <div className="w-8 h-8 rounded-full bg-[#FAF5EE] text-[#C84B1F] flex items-center justify-center font-bold text-xs border border-[#F2E8DC]">
              👩🏼
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-[#11100F]"></span>
          </div>
          <div className="text-left pr-1">
            <div className="text-xs font-bold leading-none text-white">Beatriz</div>
            <div className="text-[10px] text-emerald-400 font-medium">Webchat Online</div>
          </div>
          <MessageSquare className="w-4 h-4 text-[#FF9E7D] ml-1 group-hover:rotate-12 transition-transform" />
        </button>
      )}

      {/* Open Webchat Window */}
      {isOpen && (
        <div className="w-[360px] max-w-[calc(100vw-2rem)] h-[520px] max-h-[calc(100vh-6rem)] bg-white rounded-3xl border border-[#E7E4DC] shadow-2xl flex flex-col overflow-hidden animate-fadeIn">
          
          {/* Header */}
          <div className="p-4 bg-[#11100F] text-white flex items-center justify-between border-b border-[#2D2A26]">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-[#FAF5EE] text-[#C84B1F] flex items-center justify-center text-lg border border-[#F2E8DC]">
                  👩🏼
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#11100F]"></span>
              </div>
              <div>
                <div className="text-sm font-bold flex items-center gap-1.5">
                  <span>Beatriz</span>
                  <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800">
                    Online
                  </span>
                </div>
                <div className="text-[11px] text-[#A6A29A]">Webchat Oficial · {BRAND.name}</div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="w-7 h-7 rounded-full bg-[#262422] hover:bg-[#383531] flex items-center justify-center text-[#B5B0A8] hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Info Ribbon */}
          <div className="bg-[#FAF9F5] px-3.5 py-2 border-b border-[#EBE8E2] text-[11px] text-[#5C5955] flex items-center justify-between">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#C84B1F]" />
              <span>Respondendo via IA e Base RAG</span>
            </span>
            <span className="text-[10px] text-[#8C8881]">Tempo médio: 1s</span>
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
                </div>
                <span className="text-[9px] text-[#A6A29A] mt-1 px-1">{msg.time}</span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1.5 p-2 bg-white rounded-2xl w-16 border border-[#E7E4DC]">
                <span className="w-1.5 h-1.5 bg-[#C84B1F] rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-[#C84B1F] rounded-full animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1.5 h-1.5 bg-[#C84B1F] rounded-full animate-bounce [animation-delay:0.4s]"></span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestion Chips */}
          <div className="p-2 bg-white border-t border-[#EBE8E2] flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            <button
              onClick={() => handleSendMessage('Como funciona a Débora no telefone?')}
              className="text-[10px] whitespace-nowrap px-2.5 py-1 rounded-full bg-[#FAF5EE] text-[#C84B1F] border border-[#F2E8DC] hover:bg-[#F5ECE0] font-medium transition-colors"
            >
              📞 Débora no Telefone
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
              className="flex-1 px-3 py-2 rounded-xl border border-[#D0CBC0] text-xs text-[#1A1816] focus:outline-none focus:border-[#C84B1F] bg-white placeholder-[#A6A29A]"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim()}
              className="w-8 h-8 rounded-xl bg-[#C84B1F] disabled:opacity-40 text-white flex items-center justify-center hover:bg-[#B34018] transition-colors cursor-pointer shrink-0"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

        </div>
      )}

    </div>
  );
}
