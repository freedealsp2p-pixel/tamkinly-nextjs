/**
 * Products Service - Local Next.js Implementation
 * NEW MODEL (2026-07-02): Monthly Subscription with 3 paid tiers + 1 free lead magnet
 *
 * FREE     → $0  - Identity Quiz + free apps (lead magnet)
 * BASIC    → $7/month  - 7-day discipline journey (was BASIC)
 * PREMIUM  → $17/month - 30-day journey + core apps (was BASIC)
 * MASTERY  → $27/month - AI Coach + Community + everything (was MASTERY)
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
  type: 'FREE' | 'SUBSCRIPTION_MONTHLY' | 'DIGITAL_PDF' | 'INTERACTIVE_APP';
  accessTier: 'FREE' | 'BASIC' | 'PREMIUM' | 'MASTERY' | null;
  image: string | null;
  features: string[];
  isActive: boolean;
  isFeatured: boolean;
  billingPeriod: 'monthly' | 'one-time';
}

// Local Products Data (3 paid tiers — FREE is shown separately as lead magnet)
export const LOCAL_PRODUCTS: Product[] = [
  {
    id: 'basic',
    name: 'Basic',
    slug: 'basic',
    price: 7,
    comparePrice: 15,
    description: 'Start with a focused 7-day discipline journey into identity transformation. The perfect entry point to test the methodology before committing deeper.',
    shortDesc: '7-day guided discipline journey',
    category: 'subscription',
    type: 'SUBSCRIPTION_MONTHLY',
    accessTier: 'BASIC',
    image: null,
    features: ['7-Day Guided Discipline Journey', 'Daily identity prompts', 'Evidence tracking basics', 'Progress dashboard', '7 Days System PDF (downloadable)', 'Cancel anytime'],
    isActive: true,
    isFeatured: false,
    billingPeriod: 'monthly',
  },
  {
    id: 'premium',
    name: 'Premium',
    slug: 'premium',
    price: 17,
    comparePrice: 29,
    description: 'The complete 30-day transformation system with interactive apps and PDF downloads. Based on evidence-based psychology and identity science.',
    shortDesc: '30-day transformation + interactive apps',
    category: 'subscription',
    type: 'SUBSCRIPTION_MONTHLY',
    accessTier: 'PREMIUM',
    image: null,
    features: ['Everything in Basic', '30-Day Identity Planner', 'Executive Manual', 'Identity Baseline Worksheet', 'Digital + Print PDFs', 'Decision Pattern Analysis', 'Cancel anytime'],
    isActive: true,
    isFeatured: true,
    billingPeriod: 'monthly',
  },
  {
    id: 'mastery',
    name: 'Mastery',
    slug: 'mastery',
    price: 27,
    comparePrice: 91,
    description: 'The ultimate package: All apps + AI coaching + community access + priority support. Best value for committed individuals ready for total transformation.',
    shortDesc: 'Everything + AI Coach + Community',
    category: 'subscription',
    type: 'SUBSCRIPTION_MONTHLY',
    accessTier: 'MASTERY',
    image: null,
    features: ['Everything in Premium', 'All Interactive Apps', 'AI Identity Coach', 'Transformation Community', 'Priority Support', 'Emotion Regulation Toolkit', 'Cancel anytime'],
    isActive: true,
    isFeatured: true,
    billingPeriod: 'monthly',
  },
];

// Legacy product ID aliases for backward compatibility with existing orders/codes
// Maps old product IDs to new ones (for webhook, checkout, etc.)
export const PRODUCT_ID_ALIASES: Record<string, string> = {
  'trial': 'basic',       // old BASIC → new BASIC
  'planner': 'premium',   // old BASIC → new PREMIUM
  'premium': 'mastery',   // old PREMIUM → new MASTERY (merged)
  'bundle': 'mastery',    // old MASTERY → new MASTERY
  'basic': 'basic',
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
            type: product.type as any,
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
