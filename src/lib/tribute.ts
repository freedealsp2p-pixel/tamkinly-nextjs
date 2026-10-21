// ============================================
// TRIBUTE API CLIENT (Updated)
// ============================================

// ============================================
// CONFIG
// ============================================

const TRIBUTE_API_KEY = process.env.TRIBUTE_API_KEY || '';
const TRIBUTE_API_BASE = 'https://tribute.tg/api/v1';

// ============================================
// TYPES
// ============================================

export type TributeTier = 'basic' | 'premium' | 'mastery';

export interface TributeWebhookPayload {
  name: string;
  created_at: string;
  sent_at: string;
  payload: {
    // Subscription fields
    subscription_id?: number;
    subscription_name?: string;
    period_id?: number;
    period?: string;
    type?: string;
    price?: number;
    amount?: number;
    currency?: string;
    trb_user_id?: string;
    telegram_user_id?: number;
    telegram_username?: string;
    email?: string;
    channel_id?: number;
    channel_name?: string;
    expires_at?: string;
    
    // Digital product fields
    product_id?: number;
    product_name?: string;
    purchase_id?: number;
    transaction_id?: number;
    user_id?: number;
    
    // Common
    cancel_reason?: string;
  };
}

// ============================================
// LIVE TRIBUTE LINKS (founder-provided 2026-10-22 — saved verbatim, AUD-1)
// ============================================
// Founder message 2026-10-22 (live URLs, copied as-is):
//   LinkHub:     https://web.tribute.tg/l/1NU
//   The Planner: https://web.tribute.tg/p/HO2
//   Mastery:     https://web.tribute.tg/p/HO9
// These are the canonical public purchase/hub URLs and are embedded as code
// defaults below. Server env overrides (TRIBUTE_LINK_*_WEB) still win when set.

export const TRIBUTE_LIVE_LINKS = {
  linkhub: 'https://web.tribute.tg/l/1NU',
  plannerWeb: 'https://web.tribute.tg/p/HO2',
  masteryWeb: 'https://web.tribute.tg/p/HO9',
} as const;

// ============================================
// ONE-TIME PRODUCTS (PRICING MODEL V2, 2026-10-21)
// ============================================
// Founder decision #4: the 3 legacy Tribute SUBSCRIPTIONS are stopped at V2
// publish; new sales go through two one-time Tribute digital products:
//   TRIBUTE_PRODUCT_PLANNER  → Identity Recode Planner $9.99 → PREMIUM tier
//   TRIBUTE_PRODUCT_MASTERY  → Mastery $27 one-time          → MASTERY tier
// The numeric product IDs (webhook matching) are configured via env vars on
// the server. Web payment links now DEFAULT to TRIBUTE_LIVE_LINKS (founder
// 2026-10-22); env (TRIBUTE_LINK_*_WEB) overrides when present.
// defaultTributeName = the approved product title used at creation (Task 34
// cards) — used by resolveOneTimeProduct() as the bootstrap name matcher until
// the numeric IDs land in env; override via TRIBUTE_PRODUCT_*_NAME.
// Access granted is PERMANENT (no expiresAt) — one payment, lifetime access.

export const ONE_TIME_PRODUCTS: Record<'planner' | 'mastery', {
  productIdEnv: string;
  nameEnv: string;
  linkEnv: string | null;
  webLinkEnv: string | null;
  priceCents: number;
  name: string;
  nameAr: string;
  tier: 'PREMIUM' | 'MASTERY';
  defaultWebLink: string;
  defaultTributeName: string;
}> = {
  planner: {
    productIdEnv: 'TRIBUTE_PRODUCT_PLANNER',
    nameEnv: 'TRIBUTE_PRODUCT_PLANNER_NAME',
    linkEnv: 'TRIBUTE_LINK_PLANNER',
    webLinkEnv: 'TRIBUTE_LINK_PLANNER_WEB',
    priceCents: 999,
    name: 'Identity Recode Planner (One-time)',
    nameAr: 'مخطط إعادة صياغة الهوية (دفعة واحدة)',
    tier: 'PREMIUM',
    defaultWebLink: TRIBUTE_LIVE_LINKS.plannerWeb,
    defaultTributeName: 'The Planner — Identity Recode · Tamkinly',
  },
  mastery: {
    productIdEnv: 'TRIBUTE_PRODUCT_MASTERY',
    nameEnv: 'TRIBUTE_PRODUCT_MASTERY_NAME',
    linkEnv: 'TRIBUTE_LINK_MASTERY',
    webLinkEnv: 'TRIBUTE_LINK_MASTERY_WEB',
    priceCents: 2700,
    name: 'Tamkinly Mastery (One-time)',
    nameAr: 'تمكنلي إتقان (دفعة واحدة)',
    tier: 'MASTERY',
    defaultWebLink: TRIBUTE_LIVE_LINKS.masteryWeb,
    defaultTributeName: 'Mastery — Complete Identity System · Tamkinly',
  },
};

/**
 * Resolve a Tribute digital product ID to a one-time tier product key.
 * Returns null when the product is not one of the configured one-time products.
 */
export function getOneTimeProductForProductId(productId?: number): 'planner' | 'mastery' | null {
  if (!productId) return null;
  for (const key of ['planner', 'mastery'] as const) {
    const cfg = ONE_TIME_PRODUCTS[key];
    const raw = process.env[cfg.productIdEnv];
    if (raw && parseInt(raw, 10) === productId) return key;
  }
  return null;
}

export interface OneTimeProductResolution {
  key: 'planner' | 'mastery' | null;
  matchedBy: 'product_id' | 'product_name' | null;
}

/**
 * Resolve an incoming Tribute digital-product webhook to a one-time tier product.
 * 1. PRIMARY: numeric product_id match against TRIBUTE_PRODUCT_PLANNER / _MASTERY env.
 * 2. BOOTSTRAP FALLBACK: exact product_name match against the approved Tribute
 *    titles (env-overridable via TRIBUTE_PRODUCT_*_NAME) — bridges the gap until
 *    the founder copies the numeric product IDs from the Tribute dashboard.
 * FAILS SAFE: null → the webhook records the order with full notes and NO access
 * code is issued; server logs expose the numeric product_id for env setup.
 */
export function resolveOneTimeProduct(productId?: number, productName?: string): OneTimeProductResolution {
  if (productId) {
    for (const key of ['planner', 'mastery'] as const) {
      const raw = process.env[ONE_TIME_PRODUCTS[key].productIdEnv];
      if (raw && parseInt(raw, 10) === productId) {
        return { key, matchedBy: 'product_id' };
      }
    }
  }
  const name = (productName || '').trim();
  if (name) {
    for (const key of ['planner', 'mastery'] as const) {
      const cfg = ONE_TIME_PRODUCTS[key];
      const expected = (process.env[cfg.nameEnv] || cfg.defaultTributeName).trim();
      if (name === expected) {
        console.warn(`Tribute product matched by NAME fallback — set ${cfg.productIdEnv} with the numeric product ID from the Tribute dashboard`, { key, productName: name });
        return { key, matchedBy: 'product_name' };
      }
    }
  }
  return { key: null, matchedBy: null };
}

// ============================================
// PROTOCOL DIGITAL PRODUCTS (one-time $99 purchases)
// ============================================
// Each therapeutic protocol is a separate Tribute digital product.
// The product IDs are configured via env vars (see .env).

export const PROTOCOL_PRODUCT_ENV: Record<string, string> = {
  'temporal-decoupling': 'TRIBUTE_PRODUCT_TEMPORAL_DECOUPLING',
  'white-mirror': 'TRIBUTE_PRODUCT_WHITE_MIRROR',
  'alternative-code': 'TRIBUTE_PRODUCT_ALTERNATIVE_CODE',
};

/**
 * Resolve a Tribute digital product ID to a protocol slug.
 * Returns null when the product is not one of the configured protocol products.
 */
export function getProtocolSlugForProductId(productId?: number): string | null {
  if (!productId) return null;
  for (const [slug, envName] of Object.entries(PROTOCOL_PRODUCT_ENV)) {
    const raw = process.env[envName];
    if (raw && parseInt(raw, 10) === productId) return slug;
  }
  return null;
}

// ============================================
// TIER CONFIGURATION (LEGACY subscriptions — honored until self-cancel)
// ============================================
// PRICING MODEL V2: these 3 Tribute subscriptions are NO LONGER SOLD (stopped
// at publish per founder decision #4). The config and webhook handling below
// stay intact so existing monthly subscribers (Basic $7 / Premium $17 /
// Mastery $27) keep their renewals and access until they cancel themselves.

export const TIER_CONFIG: Record<TributeTier, {
  subscriptionIdEnv: string;
  price: number;
  name: string;
  nameAr: string;
  tier: string;
}> = {
  basic: {
    subscriptionIdEnv: 'TRIBUTE_SUBSCRIPTION_BASIC',
    price: 700,
    name: 'Tamkinly Basic (Monthly)',
    nameAr: 'تمكنلي أساسي (شهري)',
    tier: 'BASIC',
  },
  premium: {
    subscriptionIdEnv: 'TRIBUTE_SUBSCRIPTION_PREMIUM',
    price: 1700,
    name: 'Tamkinly Premium (Monthly)',
    nameAr: 'تمكنلي مميز (شهري)',
    tier: 'PREMIUM',
  },
  mastery: {
    subscriptionIdEnv: 'TRIBUTE_SUBSCRIPTION_MASTERY',
    price: 2700,
    name: 'Tamkinly Mastery (Monthly)',
    nameAr: 'تمكنلي إتقان (شهري)',
    tier: 'MASTERY',
  },
};

// ============================================
// WEBHOOK VERIFICATION (fixed for standalone build)
// ============================================

import crypto from 'crypto';

/**
 * Verify Tribute webhook signature using HMAC-SHA256.
 * The signature is in the `trbt-signature` header.
 * It's HMAC-SHA256 of the request body, signed with the API key.
 */
export function verifyTributeWebhookSignature(body: string, signature: string): boolean {
  if (!TRIBUTE_API_KEY) {
    console.error('TRIBUTE_API_KEY not configured — cannot verify webhook');
    return false;
  }

  if (!signature) {
    return false;
  }

  try {
    const computed = crypto
      .createHmac('sha256', TRIBUTE_API_KEY)
      .update(body, 'utf8')
      .digest('hex');
    
    // Use timing-safe comparison
    const a = Buffer.from(computed, 'hex');
    const b = Buffer.from(signature, 'hex');
    
    if (a.length !== b.length) {
      // Try string comparison as fallback (some signatures are hex strings)
      return computed === signature;
    }
    
    return crypto.timingSafeEqual(a, b);
  } catch (error) {
    console.error('Webhook signature verification error:', error);
    // Fallback: direct string comparison
    try {
      const computed = crypto
        .createHmac('sha256', TRIBUTE_API_KEY)
        .update(body, 'utf8')
        .digest('hex');
      return computed === signature;
    } catch {
      return false;
    }
  }
}

// ============================================
// WEBHOOK PROCESSING
// ============================================

export interface TributeWebhookResult {
  tier: TributeTier | null;
  telegramUserId: number;
  telegramUsername?: string;
  email?: string;
  amount: number;
  currency: string;
  eventType: string;
  subscriptionId?: number;
  expiresAt?: string;
  // Digital product fields
  productId?: number;
  productName?: string;
  purchaseId?: number;
  transactionId?: number;
  trbUserId?: string;
  protocolSlug?: string | null;
}

/**
 * Process a Tribute webhook payload.
 * Handles both subscription and digital product events.
 */
export function processTributeWebhook(payload: TributeWebhookPayload): TributeWebhookResult {
  const { name, payload: data } = payload;

  // FIX: Guard against missing payload data (e.g., Tribute test requests)
  if (!data || typeof data !== 'object') {
    return {
      tier: null,
      telegramUserId: 0,
      telegramUsername: undefined,
      email: undefined,
      amount: 0,
      currency: 'usd',
      eventType: name || 'unknown',
      subscriptionId: undefined,
      expiresAt: undefined,
      protocolSlug: null,
    };
  }
  
  let tier: TributeTier | null = null;
  
  // For subscription events — match by subscription_id (LEGACY subscribers)
  if (data.subscription_id) {
    for (const tierKey of ['basic', 'premium', 'mastery'] as TributeTier[]) {
      const config = TIER_CONFIG[tierKey];
      const subIdStr = process.env[config.subscriptionIdEnv];
      
      if (subIdStr && parseInt(subIdStr, 10) === data.subscription_id) {
        tier = tierKey;
        break;
      }
    }
  }
  
  // If we couldn't match by subscription_id, try matching by amount
  // (LEGACY monthly prices 700/1700/2700 cents only — one-time products are
  // matched by product_id in getOneTimeProductForProductId / getProtocolSlugForProductId)
  if (!tier && data.amount) {
    const amount = data.amount;
    if (amount === 700) tier = 'basic';
    else if (amount === 1700) tier = 'premium';
    else if (amount === 2700) tier = 'mastery';
  }
  
  const protocolSlug = getProtocolSlugForProductId(data.product_id);

  return {
    tier,
    telegramUserId: data.telegram_user_id || 0,
    telegramUsername: data.telegram_username,
    email: data.email,
    amount: data.amount || data.price || 0,
    currency: data.currency || 'usd',
    eventType: name,
    subscriptionId: data.subscription_id,
    expiresAt: data.expires_at,
    productId: data.product_id,
    productName: data.product_name,
    purchaseId: data.purchase_id,
    transactionId: data.transaction_id,
    trbUserId: data.trb_user_id,
    protocolSlug,
  };
}

// ============================================
// PAYMENT LINKS
// ============================================

export interface TributePaymentLink {
  configured: boolean;
  telegramLink: string | null;
  webLink: string | null;
  subscriptionId: number | null;
  price: number;
  name: string;
}

/**
 * Get payment link for a tier.
 * Uses subscription links (not product links) since we created subscriptions.
 */
export function getPaymentLink(tier: TributeTier): TributePaymentLink {
  const config = TIER_CONFIG[tier];
  const subIdStr = process.env[config.subscriptionIdEnv];
  
  if (!subIdStr) {
    return {
      configured: false,
      telegramLink: null,
      webLink: null,
      subscriptionId: null,
      price: config.price,
      name: config.name,
    };
  }
  
  const subscriptionId = parseInt(subIdStr, 10);
  if (isNaN(subscriptionId)) {
    return {
      configured: false,
      telegramLink: null,
      webLink: null,
      subscriptionId: null,
      price: config.price,
      name: config.name,
    };
  }
  
  return {
    configured: true,
    telegramLink: `https://t.me/tribute/app?startapp=s${subscriptionId}`,
    webLink: `https://web.tribute.tg/s/${subscriptionId}`,
    subscriptionId,
    price: config.price,
    name: config.name,
  };
}

/**
 * Check if Tribute is configured for a tier
 */
export function isConfigured(tier: TributeTier): boolean {
  return getPaymentLink(tier).configured;
}

/**
 * Check if Tribute is configured at all (legacy subscriptions or one-time products)
 */
export function isAnyConfigured(): boolean {
  return isConfigured('basic') || isConfigured('premium') || isConfigured('mastery')
    || isOneTimeConfigured('planner') || isOneTimeConfigured('mastery');
}

// ============================================
// ONE-TIME PRODUCT PAYMENT LINKS (PRICING MODEL V2)
// ============================================

export interface TributeOneTimeLink {
  configured: boolean;
  telegramLink: string | null;
  webLink: string | null;
  productId: number | null;
  priceCents: number;
  name: string;
  nameAr: string;
  tier: 'PREMIUM' | 'MASTERY';
}

/**
 * Get the payment link for a one-time product (planner / mastery).
 * Web link: env (TRIBUTE_LINK_*_WEB) wins, otherwise the live founder-provided
 * default from TRIBUTE_LIVE_LINKS (2026-10-22) — so /api/tribute/redirect works
 * out of the box now that the two products exist.
 */
export function getOneTimePaymentLink(key: 'planner' | 'mastery'): TributeOneTimeLink {
  const cfg = ONE_TIME_PRODUCTS[key];
  const idRaw = process.env[cfg.productIdEnv];
  const telegramLink = cfg.linkEnv ? (process.env[cfg.linkEnv] || null) : null;
  const webLink = cfg.webLinkEnv ? (process.env[cfg.webLinkEnv] || null) : cfg.defaultWebLink;
  const productId = idRaw && !isNaN(parseInt(idRaw, 10)) ? parseInt(idRaw, 10) : null;
  return {
    configured: !!(telegramLink || webLink),
    telegramLink,
    webLink,
    productId,
    priceCents: cfg.priceCents,
    name: cfg.name,
    nameAr: cfg.nameAr,
    tier: cfg.tier,
  };
}

export function isOneTimeConfigured(key: 'planner' | 'mastery'): boolean {
  return getOneTimePaymentLink(key).configured;
}

/**
 * Get all configured payment links
 */
export function getAllPaymentLinks(): Record<TributeTier, TributePaymentLink> {
  const result = {} as Record<TributeTier, TributePaymentLink>;
  
  for (const tier of ['basic', 'premium', 'mastery'] as TributeTier[]) {
    result[tier] = getPaymentLink(tier);
  }
  
  return result;
}
