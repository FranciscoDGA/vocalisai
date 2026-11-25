import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-anon-key',
  {
    auth: {
      persistSession: isSupabaseConfigured,
      autoRefreshToken: isSupabaseConfigured,
    },
  }
);

/* ========================================================
   AUTENTICAÇÃO (LOGIN & CADASTRO REAL)
   ======================================================== */

export async function signUpUser({ email, password, companyName = '', selectedPlan = null }) {
  if (!isSupabaseConfigured) {
    return {
      success: false,
      error: 'Cadastro indisponível no momento: serviço de autenticação não configurado.',
    };
  }
  try {
    const redirectUrl = typeof window !== 'undefined' ? window.location.origin : 'https://vocalisai-phi.vercel.app';
    const { data, error } = await supabase.auth.signUp({
      email: String(email || '').trim(),
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          company_name: String(companyName || '').trim(),
          platform: 'Vocalis AI',
          selected_plan: selectedPlan || null,
        }
      }
    });

    if (error) {
      const lowerMsg = String(error.message || '').toLowerCase();
      if (lowerMsg.includes('already registered') || lowerMsg.includes('user already registered')) {
        return {
          success: false,
          alreadyExists: true,
          error: 'Este e-mail já está cadastrado. Faça login ou recupere sua senha.',
        };
      }
      return { success: false, error: error.message };
    }

    // Supabase retorna identities vazio quando o e-mail já existe e a enumeração é ocultada
    if (data?.user && Array.isArray(data.user.identities) && data.user.identities.length === 0) {
      return {
        success: false,
        alreadyExists: true,
        error: 'Este e-mail já está cadastrado. Faça login ou recupere sua senha.',
      };
    }

    return { success: true, data };
  } catch (err) {
    return { success: false, error: err?.message || 'Erro ao realizar cadastro.' };
  }
}

export async function signInUser({ email, password }) {
  if (!isSupabaseConfigured) {
    return {
      success: false,
      error: 'Login indisponível no momento: serviço de autenticação não configurado.',
    };
  }
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: String(email || '').trim(),
      password
    });

    if (error) return { success: false, error: error.message };
    return { success: true, data };
  } catch (err) {
    return { success: false, error: err?.message || 'Erro ao autenticar.' };
  }
}

export async function resetPasswordForEmail(email) {
  if (!isSupabaseConfigured) {
    return {
      success: false,
      error: 'Recuperação de senha indisponível: serviço de autenticação não configurado.',
    };
  }
  const cleanEmail = String(email || '').trim();
  if (!cleanEmail) {
    return { success: false, error: 'Informe um e-mail válido para recuperar a senha.' };
  }
  try {
    const redirectUrl = typeof window !== 'undefined' ? window.location.origin : 'https://vocalisai-phi.vercel.app';
    const { error } = await supabase.auth.resetPasswordForEmail(cleanEmail, {
      redirectTo: redirectUrl,
    });
    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err) {
    return { success: false, error: err?.message || 'Erro ao enviar e-mail de recuperação.' };
  }
}

export async function signOutUser() {
  if (!isSupabaseConfigured) return { success: true };
  try {
    await supabase.auth.signOut();
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

export async function getCurrentUser() {
  if (!isSupabaseConfigured) return null;
  try {
    const { data: { user } } = await supabase.auth.getUser();
    return user || null;
  } catch (err) {
    return null;
  }
}

/* ========================================================
   LEADS & DIAGNÓSTICOS AO VIVO
   ======================================================== */

export async function saveLead({ phone, niche = '', pain = '', notes = '' }) {
  if (!isSupabaseConfigured) {
    return {
      success: false,
      error: { message: 'Armazenamento de solicitações indisponível no momento.' },
    };
  }
  try {
    const { data, error } = await supabase
      .from('leads')
      .insert([
        {
          phone,
          niche,
          pain,
          status: 'diagnostico_iniciado',
          whatsapp_sent: false,
          notes
        }
      ])
      .select()
      .single();

    if (error) {
      console.warn('Erro ao salvar lead no Supabase:', error.message);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (err) {
    console.warn('Exceção ao conectar no Supabase:', err);
    return { success: false, error: err };
  }
}

export async function updateLead(leadId, updates) {
  if (!isSupabaseConfigured) return { success: false, error: 'Serviço indisponível' };
  if (!leadId) return { success: false, error: 'ID do lead ausente' };
  try {
    const { data, error } = await supabase
      .from('leads')
      .update(updates)
      .eq('id', leadId)
      .select()
      .single();

    if (error) {
      console.warn('Erro ao atualizar lead:', error.message);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (err) {
    console.warn('Exceção ao atualizar lead:', err);
    return { success: false, error: err };
  }
}

export async function getLeads(limit = 50) {
  if (!isSupabaseConfigured) return [];
  try {
    const user = await getCurrentUser();
    if (!user?.id) return [];

    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.warn('Erro ao carregar leads:', error.message);
      return [];
    }

    return data || [];
  } catch (err) {
    console.warn('Exceção ao carregar leads:', err);
    return [];
  }
}

/* ========================================================
   ASSISTENTES (ISOLADOS POR USER_ID DO USUÁRIO AUTENTICADO)
   ======================================================== */

export async function saveAssistant({
  name,
  type = 'voz',
  channel = 'Telefonia (sob configuração)',
  prompt = '',
  voice = 'pt-BR-Neural2-A',
  vapi_assistant_id = null
}) {
  if (!isSupabaseConfigured) return { success: false, error: 'Serviço indisponível' };
  try {
    const user = await getCurrentUser();
    if (!user?.id) {
      return { success: false, error: 'Sessão não autenticada.' };
    }

    const voicePayload = JSON.stringify({
      voice: typeof voice === 'object' ? voice.name : voice,
      vapi_assistant_id: vapi_assistant_id || null
    });

    const { data, error } = await supabase
      .from('assistants')
      .insert([
        {
          name,
          type,
          channel,
          prompt,
          voice: voicePayload,
          status: 'Configurado (sem ativação)',
          calls_count: 0,
          user_id: user.id
        }
      ])
      .select()
      .single();

    if (error) {
      console.warn('Erro ao salvar assistente no Supabase:', error.message);
      return { success: false, error: error.message };
    }

    return { 
      success: true, 
      data: {
        ...data,
        vapi_assistant_id
      }
    };
  } catch (err) {
    console.warn('Exceção ao salvar assistente:', err);
    return { success: false, error: err?.message || err };
  }
}

export async function updateAssistant(id, {
  name,
  type,
  channel,
  prompt,
  voice,
  vapi_assistant_id
}) {
  if (!isSupabaseConfigured) return { success: false, error: 'Serviço indisponível' };
  try {
    const user = await getCurrentUser();
    if (!user?.id) return { success: false, error: 'Sessão não autenticada.' };

    const updates = {};
    if (name !== undefined) updates.name = name;
    if (type !== undefined) updates.type = type;
    if (channel !== undefined) updates.channel = channel;
    if (prompt !== undefined) updates.prompt = prompt;

    if (voice !== undefined || vapi_assistant_id !== undefined) {
      updates.voice = JSON.stringify({
        voice: typeof voice === 'object' ? voice.name : (voice || 'Camila'),
        vapi_assistant_id: vapi_assistant_id || null
      });
    }

    const { data, error } = await supabase
      .from('assistants')
      .update(updates)
      .eq('id', id)
      .eq('user_id', user.id)
      .select()
      .single();

    if (error) {
      console.warn('Erro ao atualizar assistente no Supabase:', error.message);
      return { success: false, error: error.message };
    }

    return { 
      success: true, 
      data: {
        ...data,
        vapi_assistant_id
      }
    };
  } catch (err) {
    console.warn('Exceção ao atualizar assistente no Supabase:', err);
    return { success: false, error: err?.message || err };
  }
}

export async function deleteAssistant(id) {
  if (!isSupabaseConfigured) return { success: false, error: 'Serviço indisponível' };
  try {
    const user = await getCurrentUser();
    if (!user?.id) return { success: false, error: 'Sessão não autenticada.' };

    const { error } = await supabase
      .from('assistants')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id);

    if (error) {
      console.warn('Erro ao deletar assistente no Supabase:', error.message);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err) {
    console.warn('Exceção ao deletar assistente:', err);
    return { success: false, error: err?.message || err };
  }
}

export async function getAssistants() {
  if (!isSupabaseConfigured) return [];
  try {
    const user = await getCurrentUser();
    if (!user?.id) return [];

    const { data, error } = await supabase
      .from('assistants')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Erro ao carregar assistentes:', error.message);
      return [];
    }

    // Normaliza os dados desempacotando o vapi_assistant_id se presente
    const parsedData = (data || []).map(item => {
      let vapiId = null;
      let voiceName = item.voice;

      try {
        if (item.voice && item.voice.startsWith('{')) {
          const parsed = JSON.parse(item.voice);
          vapiId = parsed.vapi_assistant_id || null;
          voiceName = parsed.voice || 'Camila';
        }
      } catch (e) {
        // Formato legado em string simples
      }

      return {
        ...item,
        voice: voiceName,
        vapi_assistant_id: vapiId
      };
    });

    return parsedData;
  } catch (err) {
    console.warn('Exceção ao carregar assistentes:', err);
    return [];
  }
}

/* ========================================================
   CHAMADAS & HISTÓRICO
   ======================================================== */

export async function saveCall({ assistant_id = null, caller_phone, duration_seconds = 0, status = 'Concluída', transcript = '', sentiment = 'Positivo', score_purchase = 9.5 }) {
  if (!isSupabaseConfigured) return { success: false, error: 'Serviço indisponível' };
  try {
    const user = await getCurrentUser();
    if (!user?.id) return { success: false, error: 'Sessão não autenticada.' };

    const { data, error } = await supabase
      .from('calls')
      .insert([
        {
          assistant_id,
          caller_phone,
          duration_seconds,
          status,
          transcript,
          sentiment,
          score_purchase,
          user_id: user.id
        }
      ])
      .select()
      .single();

    if (error) {
      console.warn('Erro ao salvar chamada no Supabase:', error.message);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (err) {
    console.warn('Exceção ao salvar chamada:', err);
    return { success: false, error: err?.message || err };
  }
}

export async function getCalls(limit = 50) {
  if (!isSupabaseConfigured) return [];
  try {
    const user = await getCurrentUser();
    if (!user?.id) return [];

    const { data, error } = await supabase
      .from('calls')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.warn('Erro ao carregar chamadas:', error.message);
      return [];
    }

    return data || [];
  } catch (err) {
    console.warn('Exceção ao carregar chamadas:', err);
    return [];
  }
}
