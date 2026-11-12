import React, { useState } from 'react';
import { X, Sparkles, ArrowRight, ShieldCheck, AlertCircle, Loader2 } from 'lucide-react';
import { BRAND } from '../data/content';
import { signUpUser, signInUser, supabase } from '../utils/supabaseClient';

export default function AuthModal({ isOpen, onClose, onOpenLegal }) {
  const [isLogin, setIsLogin] = useState(false);
  const [empresa, setEmpresa] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    try {
      if (isLogin) {
        const res = await signInUser({ email, password: senha });
        if (!res.success) {
          setErrorMessage(res.error || 'Credenciais inválidas. Verifique seu e-mail e senha.');
          setLoading(false);
          return;
        }
        setSubmitted(true);
      } else {
        const res = await signUpUser({ email, password: senha, companyName: empresa });
        if (!res.success) {
          setErrorMessage(res.error || 'Não foi possível criar a conta. Tente novamente.');
          setLoading(false);
          return;
        }
        setSubmitted(true);
      }
    } catch (err) {
      setErrorMessage('Erro de conexão ao autenticar.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    try {
      await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin
        }
      });
    } catch (err) {
      setErrorMessage('Erro ao iniciar login com Google.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-white rounded-3xl max-w-4xl w-full flex flex-col md:flex-row shadow-2xl border border-[#E7E4DC] overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/80 hover:bg-white border border-[#E7E4DC] flex items-center justify-center text-[#5C5955] hover:text-[#1A1816] transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Left Form Area */}
        <div className="flex-1 p-8 sm:p-12 flex flex-col justify-between">
          <div>
            {/* Logo */}
            <div className="flex items-center gap-2 mb-8">
              <div className="w-8 h-8 rounded-lg bg-[#C84B1F]/10 flex items-center justify-center border border-[#C84B1F]/20">
                <div className="flex items-center gap-[2px] h-3.5">
                  <span className="w-[2.5px] h-2 bg-[#C84B1F] rounded-full"></span>
                  <span className="w-[2.5px] h-3.5 bg-[#C84B1F] rounded-full"></span>
                  <span className="w-[2.5px] h-2.5 bg-[#C84B1F] rounded-full"></span>
                </div>
              </div>
              <span className="font-bold text-lg text-[#1A1816]">{BRAND.name}</span>
            </div>

            <h3 className="text-2xl font-bold text-[#1A1816] mb-6">
              {isLogin ? 'Acessar sua conta' : 'Crie sua conta'}
            </h3>

            {submitted ? (
              <div className="p-6 rounded-2xl bg-[#FAF5EE] border border-[#EDE5D8] text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-[#1A1816]">Conta criada com sucesso!</h4>
                <p className="text-xs text-[#5C5955]">
                  Enviamos um link de confirmação para <strong>{email || 'seu e-mail'}</strong>. Acesse seu e-mail para começar a configurar sua primeira assistente.
                </p>
                <button
                  onClick={onClose}
                  className="mt-4 px-6 py-2 rounded-xl bg-[#C84B1F] text-white text-xs font-semibold hover:bg-[#B34018]"
                >
                  Entendido
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Google Sign In Button */}
                <button
                  type="button"
                  onClick={handleGoogleAuth}
                  className="w-full py-3 px-4 rounded-xl border border-[#D0CBC0] hover:bg-[#FAF9F5] text-sm font-medium text-[#1A1816] flex items-center justify-center gap-3 transition-colors shadow-sm cursor-pointer"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
                    <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"/>
                    <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.14-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
                    <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                  </svg>
                  <span>{isLogin ? 'Entrar com Google' : 'Criar conta com Google'}</span>
                </button>

                {errorMessage && (
                  <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="flex items-center my-4">
                  <div className="flex-1 border-t border-[#EBE8E2]"></div>
                  <span className="px-3 text-xs text-[#8C8881]">ou</span>
                  <div className="flex-1 border-t border-[#EBE8E2]"></div>
                </div>

                {!isLogin && (
                  <div>
                    <label className="block text-xs font-semibold text-[#1A1816] mb-1">
                      Nome da Empresa
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: Clínica Sorriso"
                      value={empresa}
                      onChange={(e) => setEmpresa(e.target.value)}
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#D0CBC0] text-sm focus:outline-none focus:border-[#C84B1F]"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-[#1A1816] mb-1">
                    E-mail Comercial
                  </label>
                  <input
                    type="email"
                    placeholder="voce@empresa.com.br"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D0CBC0] text-sm focus:outline-none focus:border-[#C84B1F]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1A1816] mb-1">
                    Senha
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D0CBC0] text-sm focus:outline-none focus:border-[#C84B1F]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl bg-[#C84B1F] text-white text-sm font-bold hover:bg-[#B34018] transition-colors mt-2 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>{isLogin ? 'Entrando...' : 'Criando conta...'}</span>
                    </>
                  ) : (
                    <span>{isLogin ? 'Entrar na Plataforma' : 'Criar Conta Grátis →'}</span>
                  )}
                </button>
              </form>
            )}
          </div>

          <div className="pt-6 border-t border-[#F0EDE8] text-center text-xs text-[#736F69] space-y-2">
            <div>
              {isLogin ? (
                <span>
                  Ainda não tem conta?{' '}
                  <button 
                    onClick={() => setIsLogin(false)} 
                    className="font-bold text-[#C84B1F] hover:underline"
                  >
                    Criar conta grátis
                  </button>
                </span>
              ) : (
                <span>
                  Já tem uma conta?{' '}
                  <button 
                    onClick={() => setIsLogin(true)} 
                    className="font-bold text-[#C84B1F] hover:underline"
                  >
                    Entrar
                  </button>
                </span>
              )}
            </div>

            <p className="text-[11px] text-[#A6A29A]">
              Ao continuar, você concorda com nossos{' '}
              <button 
                onClick={() => { onClose(); onOpenLegal('termos'); }}
                className="underline hover:text-[#1A1816]"
              >
                Termos
              </button>{' '}
              e{' '}
              <button 
                onClick={() => { onClose(); onOpenLegal('privacidade'); }}
                className="underline hover:text-[#1A1816]"
              >
                Política de Privacidade
              </button>.
            </p>
          </div>
        </div>

        {/* Right Dark Card Area (Matching uploaded print) */}
        <div className="hidden md:flex md:w-[45%] bg-[#121110] text-white p-10 flex-col justify-between relative overflow-hidden border-l border-[#2D2A26]">
          {/* Subtle warm glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#C84B1F]/20 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 space-y-4">
            <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-[#FF9E7D]">
              INTELIGÊNCIA DE VOZ NEURAL
            </span>
            <h4 className="text-3xl font-normal leading-snug font-serif-title text-[#F5EDE0]">
              Em poucos minutos, sua empresa <span className="italic text-[#FF9E7D]">ganha uma voz.</span>
            </h4>
            <p className="text-xs text-[#B5B0A8] leading-relaxed">
              Conte o que ela precisa saber, escolha como ela soa e ligue para ouvir a mágica acontecer.
            </p>
          </div>

          {/* Sound bars at bottom */}
          <div className="relative z-10 pt-10">
            <div className="flex items-end gap-1 h-12 opacity-70">
              <span className="w-1.5 h-3 bg-[#C84B1F] rounded-full"></span>
              <span className="w-1.5 h-6 bg-[#C84B1F] rounded-full"></span>
              <span className="w-1.5 h-10 bg-[#FF9E7D] rounded-full"></span>
              <span className="w-1.5 h-8 bg-[#C84B1F] rounded-full"></span>
              <span className="w-1.5 h-12 bg-[#FF9E7D] rounded-full"></span>
              <span className="w-1.5 h-5 bg-[#C84B1F] rounded-full"></span>
              <span className="w-1.5 h-9 bg-[#C84B1F] rounded-full"></span>
              <span className="w-1.5 h-4 bg-[#C84B1F] rounded-full"></span>
            </div>
            <div className="text-[11px] font-mono text-[#8C8881] mt-3">
              Latência 450ms • Voz neural brasileira
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
