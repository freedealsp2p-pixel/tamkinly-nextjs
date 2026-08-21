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
    user_id?: number;
    
    // Common
    cancel_reason?: string;
  };
}

// ============================================
// TIER CONFIGURATION
// ============================================

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
    };
  }
  
  let tier: TributeTier | null = null;
  
  // For subscription events — match by subscription_id
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
  if (!tier && data.amount) {
    const amount = data.amount;
    if (amount === 700) tier = 'basic';
    else if (amount === 1700) tier = 'premium';
    else if (amount === 2700) tier = 'mastery';
  }
  
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
 * Check if Tribute is configured at all
 */
export function isAnyConfigured(): boolean {
  return isConfigured('basic') || isConfigured('premium') || isConfigured('mastery');
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
