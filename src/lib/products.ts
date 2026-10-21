/**
 * Products Service - Local Next.js Implementation
 * PRICING MODEL V2 (2026-10-21): One-time payments — no subscriptions.
 * Founder-approved (5 decisions, 2026-10-21):
 *   1. Identity Recode Planner = $9.99 ONE-TIME (merges weekly 7-day + 30-day + ALL BASIC & PREMIUM apps)
 *      → grants PREMIUM tier (AccessTier enum unchanged — zero migration).
 *   2. Mastery = $27 ONE-TIME (was monthly) → grants MASTERY tier.
 *   3. Therapeutic Protocols = $99 one-time (UNCHANGED).
 *   4. Free tier stays free ($0 lead magnet).
 *   5. Rule of three: at most 3 products shown to the user (Planner / Mastery / Protocols).
 * Anchor pricing: $17 crossed out next to $9.99 (comparePrice).
 * Legacy monthly subscribers (Basic $7 / Premium $17 / Mastery $27) keep working
 * until they cancel themselves — legacy product IDs resolve via PRODUCT_ID_ALIASES.
 *
 * FREE     → $0        - Identity Quiz + free apps (lead magnet)
 * PREMIUM  → $9.99 once - Identity Recode Planner (includes everything BASIC had)
 * MASTERY  → $27 once   - AI Coach + Community + everything
 * PROTOCOL → $99 once   - therapeutic protocols (separate products)
 */

import { db } from './db';

// Types
export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  comparePrice: number | null;
  description: string;
  shortDesc: string;
  category: string;
  type: 'FREE' | 'SUBSCRIPTION_MONTHLY' | 'ONE_TIME' | 'DIGITAL_PDF' | 'INTERACTIVE_APP';
  accessTier: 'FREE' | 'BASIC' | 'PREMIUM' | 'MASTERY' | null;
  image: string | null;
  features: string[];
  isActive: boolean;
  isFeatured: boolean;
  billingPeriod: 'monthly' | 'one-time';
}

// Local Products Data (PRICING MODEL V2 — one-time payments, rule of three)
// FREE is shown separately as lead magnet; therapeutic protocols ($99) are separate products.
export const LOCAL_PRODUCTS: Product[] = [
  {
    id: 'premium',
    name: 'Identity Recode Planner',
    slug: 'premium',
    price: 9.99,
    comparePrice: 17, // anchor: old Premium $17/mo crossed out (founder decision #3)
    description: 'The complete Identity Recode Planner: the 7-day discipline reset PLUS the 30-day transformation system, all interactive apps of both former plans, and every PDF download — in one single payment. Based on evidence-based psychology and identity science.',
    shortDesc: '7-day reset + 30-day transformation + all apps — one payment',
    category: 'one-time',
    type: 'ONE_TIME',
    accessTier: 'PREMIUM',
    image: null,
    features: ['7-Day Guided Discipline Journey', '30-Day Identity Planner', 'Daily identity prompts', 'Executive Manual', 'Identity Baseline Worksheet', 'Identity Reset Checklist — weekly cycle tool with Failure Recovery Protocol (printable, reuse indefinitely)', 'All core interactive apps', 'Digital + Print PDFs', 'Decision Pattern Analysis', 'Evidence tracking', 'Progress dashboard', 'Lifetime access — pay once, keep it forever'],
    isActive: true,
    isFeatured: true,
    billingPeriod: 'one-time',
  },
  {
    id: 'mastery',
    name: 'Mastery',
    slug: 'mastery',
    price: 27,
    comparePrice: null,
    description: 'The ultimate one-time package: everything in the Identity Recode Planner plus ALL interactive apps, AI coaching, community access and priority support. Best value for committed individuals ready for total transformation.',
    shortDesc: 'Everything + AI Coach + Community — one payment',
    category: 'one-time',
    type: 'ONE_TIME',
    accessTier: 'MASTERY',
    image: null,
    features: ['Everything in the Identity Recode Planner', 'All Interactive Apps', 'AI Identity Coach', 'Transformation Community', 'Priority Support', 'Emotion Regulation Toolkit', 'Lifetime access — pay once, keep it forever'],
    isActive: true,
    isFeatured: true,
    billingPeriod: 'one-time',
  },
  // LEGACY (no longer sold): Basic $7/mo — kept resolvable for existing
  // subscribers/codes (founder decision #2: honor until self-cancel).
  {
    id: 'basic',
    name: 'Basic',
    slug: 'basic',
    price: 7,
    comparePrice: null,
    description: 'Legacy monthly plan — no longer available for new purchases. Existing Basic subscribers keep full access. New users: get the Identity Recode Planner ($9.99 one-time) which includes everything Basic had and much more.',
    shortDesc: 'Legacy plan — replaced by the Identity Recode Planner',
    category: 'legacy',
    type: 'ONE_TIME',
    accessTier: 'BASIC',
    image: null,
    features: ['Legacy monthly plan (no longer sold)', 'Existing subscribers keep access', 'Upgrade to the Identity Recode Planner for the full system'],
    isActive: false, // V2: hidden from sale; still resolvable via aliases
    isFeatured: false,
    billingPeriod: 'monthly',
  },
];

// Legacy product ID aliases for backward compatibility with existing orders/codes
// Maps old product IDs to new ones (for webhook, checkout, etc.)
// V2 (2026-10-21): 'planner'/'trial' now resolve to the $9.99 Identity Recode
// Planner (product id 'premium'); 'bundle' resolves to Mastery. Old orders and
// old links keep working without breaking the new one-time model.
export const PRODUCT_ID_ALIASES: Record<string, string> = {
  'trial': 'premium',     // legacy 7-day trial → Identity Recode Planner
  'planner': 'premium',   // legacy planner → Identity Recode Planner (same id now)
  'premium': 'premium',   // unchanged id — now the $9.99 one-time planner
  'bundle': 'mastery',    // old bundle → Mastery ($27 one-time)
  'basic': 'basic',       // legacy Basic (not sold anymore, still resolvable)
  'mastery': 'mastery',
};

// Product ID mapping for access tiers (NEW MODEL)
export const PRODUCT_TIER_MAP: Record<string, 'BASIC' | 'PREMIUM' | 'MASTERY'> = {
  'basic': 'BASIC',
  'premium': 'PREMIUM',
  'mastery': 'MASTERY',
  // Legacy aliases (for backward compatibility)
  'trial': 'BASIC',
  'planner': 'PREMIUM',
  'bundle': 'MASTERY',
};

// Get product price by ID (with legacy alias support)
export function getProductPrice(productId: string): number {
  const resolvedId = PRODUCT_ID_ALIASES[productId] || productId;
  const product = LOCAL_PRODUCTS.find(p => p.id === resolvedId);
  return product?.price || 0;
}

// Get product by ID (with legacy alias support)
export function getProductById(id: string): Product | undefined {
  const resolvedId = PRODUCT_ID_ALIASES[id] || id;
  return LOCAL_PRODUCTS.find(p => p.id === resolvedId);
}

// Get all active products
export function getActiveProducts(): Product[] {
  return LOCAL_PRODUCTS.filter(p => p.isActive);
}

// Get featured products
export function getFeaturedProducts(): Product[] {
  return LOCAL_PRODUCTS.filter(p => p.isFeatured && p.isActive);
}

// DB ProductType enum has no ONE_TIME — map for Prisma sync only
// (BUNDLE is the closest existing DB type; no migration needed for V2).
const DB_TYPE_MAP: Record<string, string> = {
  'ONE_TIME': 'BUNDLE',
  'SUBSCRIPTION_MONTHLY': 'BUNDLE', // legacy rows
};

// Products API
export const ProductsService = {
  // List all products
  async list(params: {
    category?: string;
    featured?: boolean;
    activeOnly?: boolean;
  } = {}): Promise<Product[]> {
    let products = [...LOCAL_PRODUCTS];
    
    if (params.activeOnly !== false) {
      products = products.filter(p => p.isActive);
    }
    
    if (params.category) {
      products = products.filter(p => p.category === params.category);
    }
    
    if (params.featured) {
      products = products.filter(p => p.isFeatured);
    }
    
    return products;
  },

  // Get single product by ID (with legacy alias support)
  async get(id: string): Promise<Product | null> {
    return getProductById(id) || null;
  },

  // Get product by slug (with legacy alias support)
  async getBySlug(slug: string): Promise<Product | null> {
    const resolvedSlug = PRODUCT_ID_ALIASES[slug] || slug;
    return LOCAL_PRODUCTS.find(p => p.slug === resolvedSlug) || null;
  },

  // Sync products to database (for local caching)
  async syncToDatabase(): Promise<{ synced: number; skipped: number }> {
    let synced = 0;
    let skipped = 0;

    for (const product of LOCAL_PRODUCTS) {
      try {
        await db.product.upsert({
          where: { id: product.id },
          create: {
            id: product.id,
            name: product.name,
            slug: product.slug,
            price: product.price,
            comparePrice: product.comparePrice,
            description: product.description,
            shortDesc: product.shortDesc,
            category: product.category,
            type: (DB_TYPE_MAP[product.type] || product.type) as any,
            accessTier: product.accessTier,
            image: product.image,
            features: JSON.stringify(product.features),
            isActive: product.isActive,
            isFeatured: product.isFeatured,
          },
          update: {
            name: product.name,
            slug: product.slug,
            price: product.price,
            comparePrice: product.comparePrice,
            description: product.description,
            shortDesc: product.shortDesc,
            accessTier: product.accessTier,
            features: JSON.stringify(product.features),
            isActive: product.isActive,
            isFeatured: product.isFeatured,
          },
        });
        synced++;
      } catch (err) {
        console.error(`Failed to sync product ${product.id}:`, err);
        skipped++;
      }
    }

    return { synced, skipped };
  },
};
