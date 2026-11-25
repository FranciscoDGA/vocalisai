import React, { useState, useEffect } from 'react';
import { X, ArrowRight, AlertCircle, Loader2, Mail, CheckCircle2, RefreshCw } from 'lucide-react';
import { BRAND } from '../data/content';
import {
  isSupabaseConfigured,
  resetPasswordForEmail,
  signUpUser,
  signInUser,
  supabase,
} from '../utils/supabaseClient';
import AudioFrequencyWave from './AudioFrequencyWave';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function AuthModal({
  isOpen,
  onClose,
  onOpenLegal,
  onSuccessLogin,
  selectedPlan = null,
  onClearSelectedPlan,
  initialMode = 'signup',
}) {
  const [mode, setMode] = useState(initialMode); // 'signup' | 'login' | 'reset'
  const [empresa, setEmpresa] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isEmailNotConfirmed, setIsEmailNotConfirmed] = useState(false);
  const [resending, setResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const [cooldownUntil, setCooldownUntil] = useState(0);
  const [failedAttempts, setFailedAttempts] = useState(0);

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

  useEffect(() => {
    if (isOpen) {
      setMode(initialMode || 'signup');
      setErrorMessage('');
      setSubmitted(false);
      setResetSent(false);
      setLoginSuccess(false);
      setIsEmailNotConfirmed(false);
    }
  }, [isOpen, initialMode]);

  if (!isOpen) return null;

  const isLogin = mode === 'login';
  const isReset = mode === 'reset';

  const recordFailedAttempt = () => {
    const next = failedAttempts + 1;
    setFailedAttempts(next);
    if (next >= 3) {
      setCooldownUntil(Date.now() + 10_000);
    }
  };

  const handleResendConfirmation = async () => {
    const trimmedEmail = email.trim();
    if (!EMAIL_REGEX.test(trimmedEmail)) {
      setErrorMessage('Digite um e-mail válido acima para reenviar a confirmação.');
      return;
    }
    if (!isSupabaseConfigured) {
      setErrorMessage('Reenvio indisponível: serviço de autenticação não configurado.');
      return;
    }
    setResending(true);
    setErrorMessage('');
    try {
      const redirectUrl = typeof window !== 'undefined' ? window.location.origin : 'https://vocalisai-phi.vercel.app';
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: trimmedEmail,
        options: {
          emailRedirectTo: redirectUrl
        }
      });
      if (error) {
        setErrorMessage('Não foi possível reenviar: ' + error.message);
      } else {
        setResendSuccess(true);
        setTimeout(() => setResendSuccess(false), 6000);
      }
    } catch {
      setErrorMessage('Erro ao tentar reenviar e-mail.');
    } finally {
      setResending(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsEmailNotConfirmed(false);

    if (Date.now() < cooldownUntil) {
      const waitSeconds = Math.ceil((cooldownUntil - Date.now()) / 1000);
      setErrorMessage(`Muitas tentativas seguidas. Aguarde ${waitSeconds}s antes de tentar novamente.`);
      return;
    }

    const trimmedEmail = email.trim();
    if (!EMAIL_REGEX.test(trimmedEmail)) {
      setErrorMessage('Informe um endereço de e-mail válido.');
      return;
    }

    if (!isSupabaseConfigured) {
      setErrorMessage(
        'Serviço de autenticação indisponível no momento. Para solicitar atendimento, utilize o formulário comercial.'
      );
      return;
    }

    if (isReset) {
      setLoading(true);
      try {
        const res = await resetPasswordForEmail(trimmedEmail);
        if (!res.success) {
          recordFailedAttempt();
          setErrorMessage(res.error || 'Não foi possível enviar o link de recuperação.');
        } else {
          setResetSent(true);
          setFailedAttempts(0);
        }
      } finally {
        setLoading(false);
      }
      return;
    }

    if (mode === 'signup') {
      if (empresa.trim().length < 2) {
        setErrorMessage('Informe o nome da empresa para concluir o cadastro.');
        return;
      }
      if (senha.length < 8) {
        setErrorMessage('A senha deve ter pelo menos 8 caracteres.');
        return;
      }
    } else if (!senha) {
      setErrorMessage('Informe sua senha.');
      return;
    }

    setLoading(true);

    try {
      if (isLogin) {
        const res = await signInUser({ email: trimmedEmail, password: senha });
        if (!res.success) {
          recordFailedAttempt();
          const errStr = String(res.error || '');
          if (errStr.toLowerCase().includes('email not confirmed') || errStr.toLowerCase().includes('not confirmed')) {
            setIsEmailNotConfirmed(true);
            setErrorMessage('Seu e-mail ainda não foi confirmado. Verifique sua caixa de entrada ou reenvie o link de ativação.');
          } else if (errStr.toLowerCase().includes('invalid login credentials')) {
            setErrorMessage('E-mail ou senha incorretos. Se acabou de criar a conta, confirme o link enviado para o seu e-mail.');
          } else {
            setErrorMessage(res.error || 'Credenciais inválidas. Verifique seu e-mail e senha.');
          }
          setLoading(false);
          return;
        }

        setFailedAttempts(0);
        setLoginSuccess(true);
        setTimeout(() => {
          if (onSuccessLogin) onSuccessLogin(res.data.user);
          onClose();
        }, 700);
      } else {
        const res = await signUpUser({
          email: trimmedEmail,
          password: senha,
          companyName: empresa.trim(),
          selectedPlan,
        });
        if (!res.success) {
          recordFailedAttempt();
          setErrorMessage(res.error || 'Não foi possível criar a conta. Tente novamente.');
          setLoading(false);
          return;
        }

        setFailedAttempts(0);
        if (res.data?.session?.user) {
          setLoginSuccess(true);
          setTimeout(() => {
            if (onSuccessLogin) onSuccessLogin(res.data.session.user);
            onClose();
          }, 700);
          return;
        }

        setSubmitted(true);
      }
    } catch {
      setErrorMessage('Erro de conexão ao autenticar.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Autenticação Vocalis AI"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-3xl max-w-4xl w-full flex flex-col md:flex-row shadow-2xl border border-[#E7E4DC] overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar janela de acesso"
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/80 hover:bg-white border border-[#E7E4DC] flex items-center justify-center text-[#5C5955] hover:text-[#1A1816] transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Left Form Area */}
        <div className="flex-1 p-8 sm:p-10 flex flex-col justify-between">
          <div>
            {/* Logo */}
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-[#4F46E5]/10 flex items-center justify-center border border-[#4F46E5]/20">
                <div className="flex items-center gap-[2px] h-3.5">
                  <span className="w-[2.5px] h-2 bg-[#4F46E5] rounded-full"></span>
                  <span className="w-[2.5px] h-3.5 bg-[#4F46E5] rounded-full"></span>
                  <span className="w-[2.5px] h-2.5 bg-[#4F46E5] rounded-full"></span>
                </div>
              </div>
              <span className="font-bold text-lg text-[#1A1816]">{BRAND.name}</span>
            </div>

            <h3 className="text-2xl font-bold text-[#1A1816] mb-4">
              {loginSuccess 
                ? 'Acesso Autorizado!' 
                : isReset
                  ? 'Recuperar senha'
                  : isLogin 
                    ? 'Acessar sua conta' 
                    : 'Crie sua conta'}
            </h3>

            {selectedPlan && !loginSuccess && (
              <div
                data-testid="auth-selected-plan"
                className="mb-5 p-3.5 rounded-2xl bg-[#EEF2FF] border border-[#E0E7FF] text-xs space-y-1"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-bold text-[#4F46E5]">
                    Plano selecionado: {selectedPlan.channelName || selectedPlan.channelId} — {selectedPlan.planName}
                  </span>
                  {onClearSelectedPlan && (
                    <button
                      type="button"
                      onClick={onClearSelectedPlan}
                      className="text-[11px] font-semibold text-[#5C5955] hover:text-[#1A1816] underline cursor-pointer"
                    >
                      Remover
                    </button>
                  )}
                </div>
                <div className="text-[#1A1816] font-medium">
                  Modalidade:{' '}
                  {selectedPlan.billingCycle === 'yearly' || selectedPlan.billingCycle === 'anual'
                    ? 'Anual'
                    : 'Mensal'}{' '}
                  · {selectedPlan.displayPrice || 'Sob consulta'}
                  {selectedPlan.totalAnnualLabel ? ` (Total anual: ${selectedPlan.totalAnnualLabel})` : ''}
                </div>
                {selectedPlan.afterPromoLabel && (
                  <div className="text-[11px] text-[#5C5955]">{selectedPlan.afterPromoLabel}</div>
                )}
                <div className="text-[10px] text-[#5C5955]">
                  Nenhuma cobrança é realizada nesta etapa; condições finais e limites pendentes são confirmados antes da contratação.
                </div>
              </div>
            )}

            {loginSuccess ? (
              <div className="p-8 rounded-2xl bg-[#EEF2FF] border border-[#E0E7FF] text-center space-y-3 animate-fadeIn">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="font-bold text-[#1A1816] text-lg">Login efetuado com sucesso!</h4>
                <p className="text-xs text-[#5C5955]">
                  Carregando o painel de controle da <strong>Vocalis AI</strong>...
                </p>
                <div className="pt-2 flex justify-center">
                  <Loader2 className="w-5 h-5 text-[#4F46E5] animate-spin" />
                </div>
              </div>
            ) : resetSent ? (
              <div className="p-6 rounded-2xl bg-[#EEF2FF] border border-[#E0E7FF] text-center space-y-3 animate-fadeIn">
                <div className="w-12 h-12 rounded-full bg-indigo-100 text-[#4F46E5] flex items-center justify-center mx-auto">
                  <Mail className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-[#1A1816]">Instruções enviadas</h4>
                <p className="text-xs text-[#5C5955] leading-relaxed">
                  Se existir uma conta cadastrada para <strong>{email}</strong>, enviaremos um link para redefinir sua senha.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setResetSent(false);
                    setMode('login');
                    setErrorMessage('');
                  }}
                  className="px-5 py-2.5 rounded-xl bg-[#4F46E5] text-white text-xs font-semibold hover:bg-[#4338CA] transition-colors cursor-pointer"
                >
                  Voltar ao Login
                </button>
              </div>
            ) : submitted ? (
              <div className="p-6 rounded-2xl bg-[#EEF2FF] border border-[#E0E7FF] text-center space-y-3 animate-fadeIn">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <Mail className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-[#1A1816]">Confirme seu e-mail</h4>
                <p className="text-xs text-[#5C5955] leading-relaxed">
                  Enviamos um link de confirmação para <strong>{email || 'seu e-mail'}</strong>. 
                  Acesse sua caixa de entrada e clique no link para ativar sua conta.
                </p>

                {resendSuccess && (
                  <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs">
                    Link de confirmação reenviado com sucesso! Confira sua caixa postal.
                  </div>
                )}

                <div className="pt-3 flex flex-col sm:flex-row gap-2 justify-center">
                  <button
                    type="button"
                    onClick={handleResendConfirmation}
                    disabled={resending}
                    className="px-4 py-2.5 rounded-xl border border-[#D0CBC0] bg-white text-xs font-semibold text-[#1A1816] hover:bg-[#FAF9F5] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${resending ? 'animate-spin' : ''}`} />
                    <span>{resending ? 'Reenviando...' : 'Reenviar e-mail'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setMode('login');
                      setErrorMessage('');
                    }}
                    className="px-5 py-2.5 rounded-xl bg-[#4F46E5] text-white text-xs font-semibold hover:bg-[#4338CA] transition-colors cursor-pointer"
                  >
                    Já confirmei, Fazer Login
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMessage && (
                  <div role="alert" className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex flex-col gap-2">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0 text-red-600 mt-0.5" />
                      <span className="leading-relaxed">{errorMessage}</span>
                    </div>

                    {isEmailNotConfirmed && (
                      <div className="mt-1 pt-2 border-t border-red-200/60 flex items-center justify-between gap-2">
                        <span className="text-[11px] text-red-700">Não recebeu o link?</span>
                        <button
                          type="button"
                          onClick={handleResendConfirmation}
                          disabled={resending}
                          className="px-2.5 py-1 rounded-md bg-white border border-red-300 text-[11px] font-semibold text-red-700 hover:bg-red-100/50 flex items-center gap-1 cursor-pointer"
                        >
                          <RefreshCw className={`w-3 h-3 ${resending ? 'animate-spin' : ''}`} />
                          <span>{resending ? 'Reenviando...' : 'Reenviar confirmação'}</span>
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {resendSuccess && !errorMessage && (
                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs">
                    Link de confirmação reenviado para {email}!
                  </div>
                )}

                {mode === 'signup' && (
                  <div>
                    <label htmlFor="auth-company-input" className="block text-xs font-semibold text-[#1A1816] mb-1">
                      Nome da Empresa
                    </label>
                    <input
                      id="auth-company-input"
                      type="text"
                      placeholder="Ex: Clínica Exemplo"
                      value={empresa}
                      onChange={(e) => setEmpresa(e.target.value)}
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#D0CBC0] text-sm focus:outline-none focus:border-[#4F46E5]"
                    />
                  </div>
                )}

                <div>
                  <label htmlFor="auth-email-input" className="block text-xs font-semibold text-[#1A1816] mb-1">
                    E-mail Comercial
                  </label>
                  <input
                    id="auth-email-input"
                    type="email"
                    placeholder="voce@empresa.com.br"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D0CBC0] text-sm focus:outline-none focus:border-[#4F46E5]"
                  />
                </div>

                {!isReset && (
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label htmlFor="auth-password-input" className="block text-xs font-semibold text-[#1A1816]">
                        Senha {mode === 'signup' ? '(mínimo 8 caracteres)' : ''}
                      </label>
                      {isLogin && (
                        <button
                          type="button"
                          onClick={() => {
                            setMode('reset');
                            setErrorMessage('');
                            setIsEmailNotConfirmed(false);
                          }}
                          className="text-[11px] font-semibold text-[#4F46E5] hover:underline cursor-pointer"
                        >
                          Esqueci minha senha
                        </button>
                      )}
                    </div>
                    <input
                      id="auth-password-input"
                      type="password"
                      placeholder="••••••••"
                      value={senha}
                      onChange={(e) => setSenha(e.target.value)}
                      required
                      minLength={mode === 'signup' ? 8 : undefined}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#D0CBC0] text-sm focus:outline-none focus:border-[#4F46E5]"
                    />
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl bg-[#4F46E5] text-white text-sm font-bold hover:bg-[#4338CA] transition-colors mt-2 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>
                        {isReset ? 'Enviando...' : isLogin ? 'Entrando...' : 'Criando conta...'}
                      </span>
                    </>
                  ) : (
                    <span>
                      {isReset
                        ? 'Enviar link de recuperação'
                        : isLogin
                        ? 'Entrar na Plataforma'
                        : 'Criar Conta'}
                    </span>
                  )}
                  {!loading && <ArrowRight className="w-4 h-4" />}
                </button>
              </form>
            )}
          </div>

          <div className="pt-6 border-t border-[#F0EDE8] text-center text-xs text-[#736F69] space-y-2 mt-4">
            <div className="flex items-center justify-center gap-3 flex-wrap">
              {isReset ? (
                <button
                  type="button"
                  onClick={() => {
                    setMode('login');
                    setErrorMessage('');
                    setResetSent(false);
                  }}
                  className="font-bold text-[#4F46E5] hover:underline cursor-pointer"
                >
                  Voltar para Login
                </button>
              ) : isLogin ? (
                <span>
                  Ainda não tem conta?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setMode('signup');
                      setErrorMessage('');
                      setIsEmailNotConfirmed(false);
                    }}
                    className="font-bold text-[#4F46E5] hover:underline cursor-pointer"
                  >
                    Criar conta
                  </button>
                </span>
              ) : (
                <span>
                  Já tem uma conta?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setMode('login');
                      setErrorMessage('');
                      setIsEmailNotConfirmed(false);
                    }}
                    className="font-bold text-[#4F46E5] hover:underline cursor-pointer"
                  >
                    Entrar
                  </button>
                </span>
              )}
            </div>

            <p className="text-[11px] text-[#A6A29A]">
              Ao continuar, você concorda com nossos{' '}
              <button
                type="button"
                onClick={() => { onClose(); onOpenLegal?.('termos'); }}
                className="underline hover:text-[#1A1816] cursor-pointer"
              >
                Termos
              </button>{' '}
              e{' '}
              <button
                type="button"
                onClick={() => { onClose(); onOpenLegal?.('privacidade'); }}
                className="underline hover:text-[#1A1816] cursor-pointer"
              >
                Política de Privacidade
              </button>.
            </p>
          </div>
        </div>

        {/* Right Dark Card Area (Matching uploaded print) */}
        <div className="hidden md:flex md:w-[45%] bg-[#121110] text-white p-10 flex-col justify-between relative overflow-hidden border-l border-[#2D2A26]">
          {/* Subtle warm glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#4F46E5]/20 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 space-y-4">
            <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-[#A5B4FC]">
              INTELIGÊNCIA DE VOZ NEURAL
            </span>
            <h4 className="text-3xl font-normal leading-snug font-serif-title text-[#F5EDE0]">
              Configure o atendimento automatizado <span className="italic text-[#A5B4FC]">da sua empresa.</span>
            </h4>
            <p className="text-xs text-[#B5B0A8] leading-relaxed">
              Defina o roteiro, escolha a voz em português e teste o fluxo na simulação do painel.
            </p>
          </div>

          {/* Sound frequency in active motion at bottom */}
          <div className="relative z-10 pt-8">
            <div className="flex flex-col items-start">
              <AudioFrequencyWave 
                variant="compact" 
                showLatencyBadge={true} 
                latencyText="Visualização ilustrativa • Voz em português brasileiro"
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
