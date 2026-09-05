/**
 * Security Utilities: Rate Limiting + CSRF Protection
 * Uses Redis (already running on the server) for distributed rate limiting.
 * Falls back to in-memory LRU cache if Redis is unavailable.
 */

import { NextRequest, NextResponse } from 'next/server';

// ============================================
// CONFIG
// ============================================

const SITE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://tamkinly.com';
const ALLOWED_ORIGINS = new Set([
  SITE_URL,
  'https://tamkinly.com',
  'https://www.tamkinly.com',
  'https://preview-tamkinly.space-z.ai', // dev preview
]);

// Routes that EXEMPT from CSRF (use external auth instead):
// - Webhooks: authenticated via HMAC signature
// - NextAuth callbacks: authenticated via NextAuth internals
const CSRF_EXEMPT_PATHS = new Set([
  '/api/auth/[...nextauth]', // NextAuth handles its own CSRF
]);

// ============================================
// REDIS CLIENT (lazy init)
// ============================================

let redisClient: any = null;
let redisInitFailed = false;

async function getRedis() {
  if (redisInitFailed) return null;
  if (redisClient) return redisClient;
  
  try {
    // Use ioredis if available, otherwise raw TCP
    // For simplicity, use a minimal Redis client via net module
    const net = await import('net');
    
    const client = new net.Socket();
    await new Promise<void>((resolve, reject) => {
      client.connect(6379, '127.0.0.1');
      client.once('connect', () => resolve());
      client.once('error', (err: Error) => reject(err));
      setTimeout(() => reject(new Error('timeout')), 1000);
    });
    
    redisClient = {
      async incr(key: string): Promise<number> {
        return new Promise((resolve) => {
          const cmd = `INCR ${key}\r\n`;
          client.write(cmd);
          let buf = '';
          const onData = (data: Buffer) => {
            buf += data.toString();
            if (buf.includes('\r\n')) {
              client.off('data', onData);
              const match = buf.match(/:(\d+)/);
              resolve(match ? parseInt(match[1], 10) : 0);
            }
          };
          client.on('data', onData);
          setTimeout(() => { client.off('data', onData); resolve(0); }, 500);
        });
      },
      async expire(key: string, seconds: number): Promise<void> {
        client.write(`EXPIRE ${key} ${seconds}\r\n`);
      },
      async del(key: string): Promise<void> {
        client.write(`DEL ${key}\r\n`);
      },
    };
    return redisClient;
  } catch (err) {
    console.warn('Redis unavailable, falling back to in-memory rate limit:', err);
    redisInitFailed = true;
    return null;
  }
}

// ============================================
// IN-MEMORY FALLBACK
// ============================================

const memoryBuckets = new Map<string, { count: number; resetAt: number }>();

function memoryIncr(key: string, windowMs: number): number {
  const now = Date.now();
  const bucket = memoryBuckets.get(key);
  if (!bucket || now > bucket.resetAt) {
    memoryBuckets.set(key, { count: 1, resetAt: now + windowMs });
    return 1;
  }
  bucket.count++;
  return bucket.count;
}

// Clean up expired buckets periodically
setInterval(() => {
  const now = Date.now();
  for (const [key, bucket] of memoryBuckets.entries()) {
    if (now > bucket.resetAt) memoryBuckets.delete(key);
  }
}, 60_000).unref?.();

// ============================================
// RATE LIMITING
// ============================================

export interface RateLimitOptions {
  /** Max requests allowed in the window */
  limit: number;
  /** Time window in milliseconds */
  windowMs: number;
  /** Optional identifier prefix (defaults to route path) */
  keyPrefix?: string;
  /** Skip rate limiting for whitelisted IPs (e.g., admin) */
  skipIf?: (req: NextRequest) => boolean;
}

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  resetAt: number;
}

/**
 * Apply rate limiting to a request.
 * Returns { success: false } if limit exceeded — caller should return 429.
 */
export async function rateLimit(
  req: NextRequest,
  opts: RateLimitOptions
): Promise<RateLimitResult> {
  // Get client IP (behind Cloudflare)
  const ip = req.headers.get('cf-connecting-ip') 
    || req.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    || req.headers.get('x-real-ip')
    || 'unknown';
  
  if (opts.skipIf?.(req)) {
    return { success: true, limit: opts.limit, remaining: opts.limit, resetAt: Date.now() + opts.windowMs };
  }
  
  const prefix = opts.keyPrefix || new URL(req.url).pathname;
  const key = `rl:${prefix}:${ip}`;
  
  let count: number;
  const redis = await getRedis();
  
  if (redis) {
    count = await redis.incr(key);
    if (count === 1) {
      await redis.expire(key, Math.ceil(opts.windowMs / 1000));
    }
  } else {
    count = memoryIncr(key, opts.windowMs);
  }
  
  const remaining = Math.max(0, opts.limit - count);
  const resetAt = Date.now() + opts.windowMs;
  
  return {
    success: count <= opts.limit,
    limit: opts.limit,
    remaining,
    resetAt,
  };
}

/**
 * Standard rate limit for auth endpoints (login, register, reset-password)
 * 10 attempts per 15 minutes per IP
 */
export const AUTH_RATE_LIMIT: RateLimitOptions = {
  limit: 10,
  windowMs: 15 * 60 * 1000, // 15 min
  keyPrefix: 'auth',
};

/**
 * Stricter rate limit for password reset requests (prevent email bombing)
 * 5 per hour per IP
 */
export const PASSWORD_RESET_RATE_LIMIT: RateLimitOptions = {
  limit: 5,
  windowMs: 60 * 60 * 1000, // 1 hour
  keyPrefix: 'pwreset',
};

/**
 * Standard rate limit for general API endpoints
 * 60 requests per minute per IP
 */
export const API_RATE_LIMIT: RateLimitOptions = {
  limit: 60,
  windowMs: 60 * 1000, // 1 min
  keyPrefix: 'api',
};

/**
 * Rate limit for checkout/payment creation
 * 10 per minute per IP
 */
export const CHECKOUT_RATE_LIMIT: RateLimitOptions = {
  limit: 10,
  windowMs: 60 * 1000,
  keyPrefix: 'checkout',
};

/**
 * Helper: apply rate limit and return 429 response if exceeded.
 * Usage:
 *   const limited = await applyRateLimit(req, AUTH_RATE_LIMIT);
 *   if (limited) return limited;
 */
export async function applyRateLimit(
  req: NextRequest,
  opts: RateLimitOptions
): Promise<NextResponse | null> {
  const result = await rateLimit(req, opts);
  
  if (!result.success) {
    const retryAfterSec = Math.ceil((result.resetAt - Date.now()) / 1000);
    return NextResponse.json(
      {
        error: 'Too many requests',
        message: `Rate limit exceeded. Try again in ${retryAfterSec} seconds.`,
        retryAfter: retryAfterSec,
      },
      {
        status: 429,
        headers: {
          'Retry-After': String(retryAfterSec),
          'X-RateLimit-Limit': String(result.limit),
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': String(Math.ceil(result.resetAt / 1000)),
        },
      }
    );
  }
  
  return null;
}

// ============================================
// CSRF PROTECTION (Same-Origin Policy)
// ============================================

/**
 * Verify that a POST/PUT/DELETE request originates from our own site.
 * Uses Origin header (preferred) or Referer as fallback.
 * 
 * Webhooks are exempt (they use HMAC auth instead).
 */
export function verifyCsrf(req: NextRequest): { ok: boolean; reason?: string } {
  const path = new URL(req.url).pathname;
  
  // Exempt paths
  if (CSRF_EXEMPT_PATHS.has(path)) {
    return { ok: true };
  }
  
  // GET/HEAD/OPTIONS don't need CSRF
  const method = req.method.toUpperCase();
  if (method === 'GET' || method === 'HEAD' || method === 'OPTIONS') {
    return { ok: true };
  }
  
  // Check Origin header first
  const origin = req.headers.get('origin');
  if (origin) {
    if (ALLOWED_ORIGINS.has(origin)) {
      return { ok: true };
    }
    return { ok: false, reason: `Origin not allowed: ${origin}` };
  }
  
  // Fall back to Referer
  const referer = req.headers.get('referer');
  if (referer) {
    try {
      const refererUrl = new URL(referer);
      const refererOrigin = `${refererUrl.protocol}//${refererUrl.host}`;
      if (ALLOWED_ORIGINS.has(refererOrigin)) {
        return { ok: true };
      }
      return { ok: false, reason: `Referer origin not allowed: ${refererOrigin}` };
    } catch {
      return { ok: false, reason: 'Invalid Referer header' };
    }
  }
  
  // No Origin or Referer — reject (browsers always send these on cross-origin POSTs)
  return { ok: false, reason: 'Missing Origin and Referer headers' };
}

/**
 * Helper: apply CSRF check and return 403 response if failed.
 * Usage:
 *   const forbidden = await applyCsrf(req);
 *   if (forbidden) return forbidden;
 */
export function applyCsrf(req: NextRequest): NextResponse | null {
  const check = verifyCsrf(req);
  if (!check.ok) {
    return NextResponse.json(
      {
        error: 'Forbidden',
        message: `CSRF check failed: ${check.reason}`,
      },
      { status: 403 }
    );
  }
  return null;
}

/**
 * Combined security check: CSRF + rate limit.
 * Apply to all sensitive POST routes.
 */
export async function applySecurity(
  req: NextRequest,
  rateLimitOpts: RateLimitOptions = API_RATE_LIMIT
): Promise<NextResponse | null> {
  // CSRF first (cheap)
  const csrf = applyCsrf(req);
  if (csrf) return csrf;
  
  // Then rate limit
  return applyRateLimit(req, rateLimitOpts);
}
