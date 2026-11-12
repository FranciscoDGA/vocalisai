import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  MessageSquare, 
  Mic, 
  MicOff, 
  PhoneOff, 
  Volume2, 
  CheckCheck, 
  Send, 
  Clock, 
  Calendar, 
  User, 
  Sparkles, 
  Database,
  ArrowRight
} from 'lucide-react';

export default function InteractiveSimulator({ onOpenDemo }) {
  const [activeTab, setActiveTab] = useState('phone'); // 'phone' | 'whatsapp'
  const [callStatus, setCallStatus] = useState('connected'); // 'calling', 'connected', 'ended'
  const [callTimer, setCallTimer] = useState(24);
  const [isMuted, setIsMuted] = useState(false);

  // WhatsApp simulation state
  const [messages, setMessages] = useState([
    { sender: 'user', text: 'Boa tarde! Vocês ainda têm vagas para a revisão veicular amanhã?', time: '14:32' },
    { sender: 'bot', text: 'Olá! Sim, temos dois horários disponíveis na nossa oficina amanhã: 09h00 ou 14h30. Qual fica mais cômodo para você?', time: '14:32' },
    { sender: 'user', text: 'Às 14h30 seria excelente!', time: '14:33' },
    { sender: 'bot', text: 'Perfeito! Agendamento pré-reservado para amanhã às 14h30. Por favor, me informe a placa do carro e o modelo.', time: '14:33' }
  ]);
  const [chatInput, setChatInput] = useState('');

  // Call timer simulation
  useEffect(() => {
    let interval;
    if (callStatus === 'connected') {
      interval = setInterval(() => {
        setCallTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [callStatus]);

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const newMsg = { sender: 'user', text: chatInput, time: '14:34' };
    setMessages(prev => [...prev, newMsg]);
    setChatInput('');

    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          sender: 'bot',
          text: 'Comprovante gerado com sucesso! Seus dados foram validados e nosso consultor técnico estará pronto te aguardando. Te mandei a localização pelo GPS!',
          time: '14:34'
        }
      ]);
    }, 1200);
  };

  return (
    <section id="simulador" className="py-24 relative bg-[#0b0c12]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-xs font-semibold text-orange-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Experiência ao Vivo</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Veja a Vocalis Operando na Prática
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Experimente a interface real de atendimento. Veja como a IA conversa pelo telefone e pelo WhatsApp, enquanto atualiza a base de dados em tempo real.
          </p>

          {/* Toggle buttons between Phone and WhatsApp */}
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-900 border border-white/10 mt-4">
            <button
              onClick={() => setActiveTab('phone')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                activeTab === 'phone'
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 shadow-lg'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Phone className="w-4 h-4" />
              <span>Simulador de Ligação (Voz)</span>
            </button>
            <button
              onClick={() => setActiveTab('whatsapp')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                activeTab === 'whatsapp'
                  ? 'bg-emerald-500 text-white shadow-lg'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Simulador de WhatsApp</span>
            </button>
          </div>
        </div>

        {/* SIMULATOR CONTAINER */}
        <div className="max-w-5xl mx-auto">
          {activeTab === 'phone' ? (
            /* PHONE VOICE SIMULATOR */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Smartphone Mockup (5 cols) */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="w-[320px] h-[610px] rounded-[44px] bg-[#000000] p-4 shadow-2xl border-4 border-slate-700/60 relative flex flex-col justify-between overflow-hidden shadow-orange-500/10">
                  {/* Dynamic Island / Notch */}
                  <div className="w-28 h-5 bg-black rounded-full mx-auto relative z-20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-slate-800"></div>
                  </div>

                  {/* Call Screen Contents */}
                  <div className="flex-1 flex flex-col items-center justify-center space-y-6 pt-4 text-center">
                    <div className="relative">
                      <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-orange-500 to-amber-400 flex items-center justify-center text-white shadow-xl shadow-orange-500/40">
                        <Sparkles className="w-12 h-12" />
                      </div>
                      <span className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-emerald-500 border-2 border-black flex items-center justify-center">
                        <Volume2 className="w-3 h-3 text-white" />
                      </span>
                    </div>

                    <div className="space-y-1">
                      <h4 className="text-xl font-bold text-white">Vocalis Voice AI</h4>
                      <p className="text-xs text-orange-400 font-medium">Assistente Inteligente (0800)</p>
                      <p className="text-sm font-mono text-slate-400 pt-1">
                        {callStatus === 'connected' ? formatTimer(callTimer) : 'Chamada Encerrada'}
                      </p>
                    </div>

                    {/* Sound waves animation */}
                    {callStatus === 'connected' && (
                      <div className="flex items-center justify-center gap-1.5 h-12">
                        <span className="w-1 bg-orange-400 rounded-full animate-wave-1"></span>
                        <span className="w-1 bg-orange-500 rounded-full animate-wave-2"></span>
                        <span className="w-1 bg-amber-400 rounded-full animate-wave-3"></span>
                        <span className="w-1 bg-yellow-400 rounded-full animate-wave-4"></span>
                        <span className="w-1 bg-orange-400 rounded-full animate-wave-5"></span>
                        <span className="w-1 bg-amber-500 rounded-full animate-wave-2"></span>
                        <span className="w-1 bg-yellow-500 rounded-full animate-wave-4"></span>
                      </div>
                    )}
                  </div>

                  {/* Call Action Controls */}
                  <div className="pb-6 px-4">
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <button 
                        onClick={() => setIsMuted(!isMuted)} 
                        className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center text-white ${isMuted ? 'bg-orange-500' : 'bg-slate-800'}`}
                      >
                        {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                      </button>
                      <div className="w-12 h-12 mx-auto rounded-full bg-slate-800 flex items-center justify-center text-white">
                        <Volume2 className="w-5 h-5" />
                      </div>
                      <div className="w-12 h-12 mx-auto rounded-full bg-slate-800 flex items-center justify-center text-white">
                        <Sparkles className="w-5 h-5" />
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        if (callStatus === 'connected') {
                          setCallStatus('ended');
                        } else {
                          setCallStatus('connected');
                          setCallTimer(0);
                        }
                      }}
                      className={`w-full py-3.5 rounded-full font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all ${
                        callStatus === 'connected'
                          ? 'bg-rose-600 hover:bg-rose-700 text-white'
                          : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                      }`}
                    >
                      {callStatus === 'connected' ? (
                        <>
                          <PhoneOff className="w-4 h-4" />
                          <span>Desligar Chamada</span>
                        </>
                      ) : (
                        <>
                          <Phone className="w-4 h-4" />
                          <span>Ligar Novamente</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Real-time CRM Sync & Analytics Side (7 cols) */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* Live Transcript Box */}
                <div className="rounded-2xl bg-[#131622] border border-white/10 p-6 space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                      <span className="text-xs font-bold text-white uppercase tracking-wider">Transcrição em Tempo Real</span>
                    </div>
                    <span className="text-xs text-slate-400">Latência: 380ms</span>
                  </div>

                  <div className="space-y-3 text-sm">
                    <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5">
                      <span className="text-xs text-slate-400 block mb-1">Cliente:</span>
                      <p className="text-slate-200">“Gostaria de saber se o Dr. Eduardo atende pela SulAmérica na unidade Jardins?”</p>
                    </div>

                    <div className="p-3 rounded-xl bg-orange-950/30 border border-orange-500/20">
                      <span className="text-xs text-orange-400 font-semibold block mb-1">Vocalis (Resposta Neural):</span>
                      <p className="text-white">“Sim! O Dr. Eduardo atende SulAmérica Especial e Executivo na unidade Jardins. Ele tem disponibilidade nesta quarta às 11h15 ou sexta às 16h00.”</p>
                    </div>
                  </div>
                </div>

                {/* Instant CRM Auto-Update Card */}
                <div className="rounded-2xl bg-[#131622] border border-white/10 p-6 space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <div className="flex items-center gap-2">
                      <Database className="w-4 h-4 text-orange-400" />
                      <span className="text-xs font-bold text-white uppercase tracking-wider">Automação de CRM & Agenda (HubSpot / RD / Google)</span>
                    </div>
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400">
                      Sincronizado
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-slate-900/80 border border-white/5 space-y-1">
                      <span className="text-slate-400">Lead / Paciente:</span>
                      <p className="font-semibold text-white">Mariana Silveira (11) 98765-4321</p>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900/80 border border-white/5 space-y-1">
                      <span className="text-slate-400">Intenção Detectada:</span>
                      <p className="font-semibold text-amber-400">Agendamento de Especialista</p>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900/80 border border-white/5 space-y-1">
                      <span className="text-slate-400">Status da Agenda:</span>
                      <p className="font-semibold text-emerald-400">Horário Bloqueado (Quarta 11h15)</p>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900/80 border border-white/5 space-y-1">
                      <span className="text-slate-400">Ação Disparada:</span>
                      <p className="font-semibold text-white">WhatsApp de confirmação enviado</p>
                    </div>
                  </div>
                </div>

                {/* CTA inside Phone view */}
                <button
                  onClick={onOpenDemo}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 font-bold text-sm shadow-xl shadow-orange-500/20 hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  <span>Quero Esse Sistema no Telefone da Minha Empresa</span>
                </button>

              </div>

            </div>
          ) : (
            /* WHATSAPP INTERACTIVE SIMULATOR */
            <div className="max-w-md mx-auto">
              <div className="rounded-[36px] bg-[#0c1317] border-4 border-slate-700/70 p-3 shadow-2xl overflow-hidden">
                
                {/* WhatsApp Header */}
                <div className="p-3 bg-[#1f2c34] rounded-t-2xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold">
                      V
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                        Vocalis Atendimento Oficial
                        <span className="text-[10px] text-emerald-400">✔</span>
                      </h4>
                      <p className="text-[11px] text-emerald-400">online agora · conta comercial</p>
                    </div>
                  </div>
                </div>

                {/* WhatsApp Chat Area */}
                <div className="h-[380px] overflow-y-auto p-4 space-y-3 bg-[#0b141a] text-xs">
                  {messages.map((m, idx) => (
                    <div
                      key={idx}
                      className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl px-3.5 py-2 leading-relaxed ${
                          m.sender === 'user'
                            ? 'bg-[#005c4b] text-white rounded-tr-none'
                            : 'bg-[#202c33] text-slate-100 rounded-tl-none'
                        }`}
                      >
                        <p>{m.text}</p>
                        <span className="text-[9px] text-slate-300 block text-right mt-1 flex items-center justify-end gap-1">
                          {m.time}
                          {m.sender === 'user' && <CheckCheck className="w-3 h-3 text-sky-400 inline" />}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* WhatsApp Input */}
                <form onSubmit={handleSendMessage} className="p-2 bg-[#1f2c34] rounded-b-2xl flex items-center gap-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Digite uma mensagem de teste..."
                    className="flex-1 bg-[#2a3942] text-xs text-white px-3 py-2.5 rounded-xl border-none focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                  <button
                    type="submit"
                    className="w-9 h-9 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center flex-shrink-0"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>

              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
