import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/* ========================================================
   AUTENTICAÇÃO (LOGIN & CADASTRO REAL)
   ======================================================== */

export async function signUpUser({ email, password, companyName = '' }) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          company_name: companyName,
          platform: 'Vocalis AI'
        }
      }
    });

    if (error) return { success: false, error: error.message };
    return { success: true, data };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

export async function signInUser({ email, password }) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) return { success: false, error: error.message };
    return { success: true, data };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

export async function signOutUser() {
  try {
    await supabase.auth.signOut();
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

export async function getCurrentUser() {
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
  try {
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
   ASSISTENTES (CRIAÇÃO & GESTÃO REAL)
   ======================================================== */

export async function saveAssistant({ name, type = 'voz', channel = 'Telefone (11) 4003-9821', prompt = '', voice = 'pt-BR-Neural2-A' }) {
  try {
    const user = await getCurrentUser();
    const { data, error } = await supabase
      .from('assistants')
      .insert([
        {
          name,
          type,
          channel,
          prompt,
          voice,
          status: 'Ativo',
          calls_count: 0,
          user_id: user?.id || null
        }
      ])
      .select()
      .single();

    if (error) {
      console.warn('Erro ao salvar assistente no Supabase:', error.message);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (err) {
    console.warn('Exceção ao salvar assistente:', err);
    return { success: false, error: err };
  }
}

export async function getAssistants() {
  try {
    const { data, error } = await supabase
      .from('assistants')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Erro ao carregar assistentes:', error.message);
      return [];
    }

    return data || [];
  } catch (err) {
    console.warn('Exceção ao carregar assistentes:', err);
    return [];
  }
}

/* ========================================================
   CHAMADAS & HISTÓRICO
   ======================================================== */

export async function saveCall({ assistant_id = null, caller_phone, duration_seconds = 0, status = 'Concluída', transcript = '', sentiment = 'Positivo', score_purchase = 9.5 }) {
  try {
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
          score_purchase
        }
      ])
      .select()
      .single();

    if (error) {
      console.warn('Erro ao salvar chamada no Supabase:', error.message);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (err) {
    console.warn('Exceção ao salvar chamada:', err);
    return { success: false, error: err };
  }
}

export async function getCalls(limit = 50) {
  try {
    const { data, error } = await supabase
      .from('calls')
      .select('*')
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
