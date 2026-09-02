/**
 * Protocol Access Control
 * 
 * Server-side only. Verifies protocol-specific entitlement for premium
 * therapeutic experiences. Each protocol is independently purchasable.
 * 
 * Entitlement model:
 *   - AppAccess record with tier=PROTOCOL and protocolSlug='temporal-decoupling'
 *   - Grants access to that specific protocol ONLY
 *   - No tier hierarchy — protocol A does NOT unlock protocol B
 */

import { db } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth-helpers';

export interface ProtocolAccessResult {
  hasAccess: boolean;
  protocolSlug: string;
  reason?: string;
  entitlementSource?: 'session' | 'access_code' | 'user_record';
}

/** Valid protocol slugs */
export const VALID_PROTOCOL_SLUGS = [
  'temporal-decoupling',
  'alternative-code',
  'white-mirror',
] as const;

export type ProtocolSlug = (typeof VALID_PROTOCOL_SLUGS)[number];

/** Protocol product configuration */
export interface ProtocolProductConfig {
  slug: ProtocolSlug;
  productSlug: string;
  price: number;
  currency: string;
  title: { ar: string; en: string };
  subtitle: { ar: string; en: string };
  accentColor: string;
  stepCount: number;
  durationLabel: { ar: string; en: string };
  requiresSafety: boolean;
}

export const PROTOCOL_PRODUCTS: Record<ProtocolSlug, ProtocolProductConfig> = {
  'temporal-decoupling': {
    slug: 'temporal-decoupling',
    productSlug: 'temporal-decoupling-protocol',
    price: 99,
    currency: 'USD',
    title: { ar: 'بروتوكول التفكيك الزمني', en: 'The Temporal Decoupling Protocol' },
    subtitle: {
      ar: 'الاستيقاظ من وهم الذاكرة',
      en: 'Awakening from the Illusion of Memory',
    },
    accentColor: '#1F6F78',
    stepCount: 7,
    durationLabel: { ar: '١٢ دقيقة', en: '12 minutes' },
    requiresSafety: false,
  },
  'alternative-code': {
    slug: 'alternative-code',
    productSlug: 'alternative-code-protocol',
    price: 99,
    currency: 'USD',
    title: { ar: 'بروتوكول الشفرة البديلة', en: 'The Alternative Code Protocol' },
    subtitle: {
      ar: 'تحييد الذاكرة وإعادة توجيهها',
      en: 'Neutralizing the Memory and Redirecting It',
    },
    accentColor: '#2A8A94',
    stepCount: 5,
    durationLabel: { ar: '١٥ دقيقة', en: '15 minutes' },
    requiresSafety: false,
  },
  'white-mirror': {
    slug: 'white-mirror',
    productSlug: 'white-mirror-protocol',
    price: 99,
    currency: 'USD',
    title: { ar: 'بروتوكول المرآة البيضاء', en: 'The White Mirror Protocol' },
    subtitle: {
      ar: 'كسر النمط وإعادة التشفير',
      en: 'Pattern Interrupt and Recoding',
    },
    accentColor: '#0F1C2E',
    stepCount: 4,
    durationLabel: { ar: '٩ دقائق', en: '9 minutes' },
    requiresSafety: true,
  },
};

/**
 * Check if a user has access to a specific therapeutic protocol.
 * SERVER-SIDE ONLY.
 * 
 * Checks in order:
 * 1. User session + active AppAccess with matching protocolSlug
 * 2. Access code with matching protocolSlug
 * 3. No access → returns hasAccess: false
 */
export async function checkProtocolAccess(
  protocolSlug: string,
  options?: {
    email?: string;
    accessCode?: string;
  }
): Promise<ProtocolAccessResult> {
  // Validate slug
  if (!VALID_PROTOCOL_SLUGS.includes(protocolSlug as ProtocolSlug)) {
    return { hasAccess: false, protocolSlug, reason: 'Invalid protocol' };
  }

  // 1. Check access code first (if provided)
  if (options?.accessCode) {
    try {
      const access = await db.appAccess.findUnique({
        where: { code: options.accessCode.toUpperCase() },
      });
      if (
        access &&
        access.isActive &&
        access.protocolSlug === protocolSlug &&
        (!access.expiresAt || new Date() < access.expiresAt)
      ) {
        return {
          hasAccess: true,
          protocolSlug,
          entitlementSource: 'access_code',
        };
      }
    } catch (error) {
      console.error('Protocol access code check error:', error);
    }
  }

  // 2. Try authenticated user
  let user: any = null;
  try {
    user = await getCurrentUser();
  } catch {
    // Not authenticated
  }

  // 3. Check user's protocol-specific access records
  if (user?.email) {
    const emailToCheck = options?.email || user.email;
    try {
      const access = await db.appAccess.findFirst({
        where: {
          email: emailToCheck,
          protocolSlug: protocolSlug,
          isActive: true,
        },
        orderBy: { createdAt: 'desc' },
      });
      if (access && (!access.expiresAt || new Date() < access.expiresAt)) {
        return {
          hasAccess: true,
          protocolSlug,
          entitlementSource: 'user_record',
        };
      }
    } catch (error) {
      console.error('Protocol user access check error:', error);
    }
  }

  // 4. Check by userId directly
  if (user?.id) {
    try {
      const access = await db.appAccess.findFirst({
        where: {
          userId: user.id,
          protocolSlug: protocolSlug,
          isActive: true,
        },
        orderBy: { createdAt: 'desc' },
      });
      if (access && (!access.expiresAt || new Date() < access.expiresAt)) {
        return {
          hasAccess: true,
          protocolSlug,
          entitlementSource: 'session',
        };
      }
    } catch (error) {
      console.error('Protocol userId access check error:', error);
    }
  }

  return {
    hasAccess: false,
    protocolSlug,
    reason: 'No active entitlement found for this protocol',
  };
}

/**
 * Grant protocol access (admin use).
 * Creates an AppAccess record with tier=PROTOCOL and the specific protocolSlug.
 */
export async function grantProtocolAccess(params: {
  email: string;
  protocolSlug: ProtocolSlug;
  customerName?: string;
  adminNote?: string;
}): Promise<{ success: boolean; code?: string; error?: string }> {
  const { email, protocolSlug, customerName } = params;

  if (!VALID_PROTOCOL_SLUGS.includes(protocolSlug)) {
    return { success: false, error: `Invalid protocol slug: ${protocolSlug}` };
  }

  // Check if already has active access
  const existing = await db.appAccess.findFirst({
    where: { email, protocolSlug, isActive: true },
  });
  if (existing) {
    return { success: false, error: 'User already has active access to this protocol' };
  }

  // Generate access code
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const seg = () =>
    Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  const code = `TMLY-${seg()}-${seg()}`;

  const product = PROTOCOL_PRODUCTS[protocolSlug];

  const record = await db.appAccess.create({
    data: {
      code,
      email,
      customerName,
      tier: 'PROTOCOL',
      protocolSlug,
      productName: product.productSlug,
      isActive: true,
      isUsed: false,
    },
  });

  return { success: true, code: record.code };
}

/**
 * List all protocol access records (admin use).
 */
export async function listProtocolAccess(options?: {
  protocolSlug?: string;
  email?: string;
}) {
  const where: any = { tier: 'PROTOCOL' };
  if (options?.protocolSlug) where.protocolSlug = options.protocolSlug;
  if (options?.email) where.email = options.email;

  return db.appAccess.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    take: 100,
  });
}

/**
 * Revoke protocol access (admin use).
 */
export async function revokeProtocolAccess(id: string) {
  return db.appAccess.update({
    where: { id },
    data: { isActive: false },
  });
}
