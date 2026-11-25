import crypto from 'node:crypto';

const DEFAULT_ALLOWED_ORIGINS = [
  'https://vocalisai-phi.vercel.app',
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:4173',
];

const rateLimitStore = new Map();

export function getAllowedOrigins() {
  const extra = (process.env.ALLOWED_ORIGINS || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  return Array.from(new Set([...DEFAULT_ALLOWED_ORIGINS, ...extra]));
}

export function applyCorsHeaders(req, res, methods = 'POST,OPTIONS', extraHeaders = 'Content-Type, Authorization') {
  const origin = req.headers?.origin;
  const allowed = getAllowedOrigins();

  res.setHeader('Vary', 'Origin');
  res.setHeader('Access-Control-Allow-Methods', methods);
  res.setHeader('Access-Control-Allow-Headers', extraHeaders);

  if (origin && allowed.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    return true;
  }

  // Sem origem (chamada same-origin / server-to-server)
  if (!origin) {
    return true;
  }

  return false;
}

export function getClientIp(req) {
  const fwd = req.headers?.['x-forwarded-for'];
  if (typeof fwd === 'string' && fwd.trim()) {
    return fwd.split(',')[0].trim();
  }
  return req.socket?.remoteAddress || 'unknown';
}

/**
 * Rate limiter em memória por IP com janela deslizante.
 * Nota: em ambiente serverless multi-instância atua como proteção por instância (best-effort).
 */
export function checkRateLimit(req, bucketKey, maxRequests = 20, windowMs = 60_000) {
  const ip = getClientIp(req);
  const key = `${bucketKey}:${ip}`;
  const now = Date.now();
  const timestamps = (rateLimitStore.get(key) || []).filter((ts) => now - ts < windowMs);

  if (timestamps.length >= maxRequests) {
    rateLimitStore.set(key, timestamps);
    return { allowed: false, retryAfterSeconds: Math.ceil(windowMs / 1000) };
  }

  timestamps.push(now);
  rateLimitStore.set(key, timestamps);
  return { allowed: true };
}

export function safeCompareSecret(provided, expected) {
  if (typeof provided !== 'string' || typeof expected !== 'string' || !provided || !expected) {
    return false;
  }
  const bufA = Buffer.from(provided, 'utf8');
  const bufB = Buffer.from(expected, 'utf8');
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

export async function verifySupabaseBearerToken(req) {
  const authHeader = req.headers?.authorization || '';
  if (!authHeader.startsWith('Bearer ')) {
    return { authenticated: false, status: 401, error: 'Token Bearer ausente.' };
  }
  const token = authHeader.slice(7).trim();
  if (!token) {
    return { authenticated: false, status: 401, error: 'Token Bearer inválido.' };
  }

  const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return { authenticated: false, status: 503, error: 'Serviço de autenticação não configurado no servidor.' };
  }

  try {
    const response = await fetch(`${supabaseUrl.replace(/\/$/, '')}/auth/v1/user`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        apikey: supabaseAnonKey,
      },
    });

    if (!response.ok) {
      return { authenticated: false, status: 401, error: 'Sessão inválida ou expirada.' };
    }

    const user = await response.json();
    if (!user?.id) {
      return { authenticated: false, status: 401, error: 'Usuário não identificado.' };
    }

    return { authenticated: true, user };
  } catch {
    return { authenticated: false, status: 503, error: 'Falha ao validar sessão.' };
  }
}
