/**
 * Products Service - Local Next.js Implementation
 * Handles all product operations locally with Prisma
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
  type: 'TRIAL' | 'DIGITAL_PDF' | 'INTERACTIVE_APP' | 'BUNDLE';
  accessTier: 'FREE' | 'TRIAL' | 'BASIC' | 'PREMIUM' | 'BUNDLE' | null;
  image: string | null;
  features: string[];
  isActive: boolean;
  isFeatured: boolean;
}

// Local Products Data
export const LOCAL_PRODUCTS: Product[] = [
  {
    id: 'trial',
    name: '7-Day Trial',
    slug: 'trial',
    price: 7,
    comparePrice: 15,
    description: 'Experience the full Identity Recode system for 7 days. Perfect for testing the methodology before committing to the full program.',
    shortDesc: '7-Day guided transformation journey',
    category: 'trial',
    type: 'TRIAL',
    accessTier: 'TRIAL',
    image: null,
    features: ['7-Day Guided Journey', 'Daily identity prompts', 'Evidence tracking', 'Progress dashboard'],
    isActive: true,
    isFeatured: false,
  },
  {
    id: 'planner',
    name: 'Identity Recode Planner',
    slug: 'planner',
    price: 17,
    comparePrice: 29,
    description: 'The complete 30-day transformation system with interactive apps and PDF downloads. Based on evidence-based psychology and identity science.',
    shortDesc: '30-day digital planner with print version',
    category: 'planner',
    type: 'DIGITAL_PDF',
    accessTier: 'BASIC',
    image: null,
    features: ['30-Day Identity Planner', 'Executive Manual', 'Identity Baseline Worksheet', 'Digital + Print PDFs', 'Lifetime access'],
    isActive: true,
    isFeatured: true,
  },
  {
    id: 'premium',
    name: 'Premium Transformation',
    slug: 'premium',
    price: 27,
    comparePrice: 44,
    description: 'Everything in Planner plus advanced analytics and decision tracking tools. Perfect for data-driven transformation.',
    shortDesc: 'Complete package with analytics',
    category: 'premium',
    type: 'BUNDLE',
    accessTier: 'PREMIUM',
    image: null,
    features: ['Everything in Planner', 'Decision Pattern Analysis', 'Evidence Tracking System', 'Progress Dashboard', 'Priority support'],
    isActive: true,
    isFeatured: true,
  },
  {
    id: 'bundle',
    name: 'Complete Bundle',
    slug: 'bundle',
    price: 47,
    comparePrice: 91,
    description: 'The ultimate package: All apps + AI coaching + community access + priority support. Best value for committed individuals.',
    shortDesc: 'All products + AI Coach + Community',
    category: 'bundle',
    type: 'BUNDLE',
    accessTier: 'BUNDLE',
    image: null,
    features: ['All PDF products', 'All Interactive Apps', 'AI Identity Coach', 'Transformation Community', 'Priority Support', 'Lifetime updates'],
    isActive: true,
    isFeatured: true,
  },
];

// Product ID mapping for access tiers
export const PRODUCT_TIER_MAP: Record<string, 'TRIAL' | 'BASIC' | 'PREMIUM' | 'BUNDLE'> = {
  'trial': 'TRIAL',
  'planner': 'BASIC',
  'premium': 'PREMIUM',
  'bundle': 'BUNDLE',
};

// Get product price by ID
export function getProductPrice(productId: string): number {
  const product = LOCAL_PRODUCTS.find(p => p.id === productId);
  return product?.price || 0;
}

// Get product by ID
export function getProductById(id: string): Product | undefined {
  return LOCAL_PRODUCTS.find(p => p.id === id);
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

  // Get single product by ID
  async get(id: string): Promise<Product | null> {
    return LOCAL_PRODUCTS.find(p => p.id === id) || null;
  },

  // Get product by slug
  async getBySlug(slug: string): Promise<Product | null> {
    return LOCAL_PRODUCTS.find(p => p.slug === slug) || null;
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
            description: product.description,
            shortDesc: product.shortDesc,
            price: product.price,
            comparePrice: product.comparePrice,
            category: product.category,
            type: product.type,
            accessTier: product.accessTier,
            image: product.image,
            features: JSON.stringify(product.features),
            isActive: product.isActive,
            isFeatured: product.isFeatured,
          },
          update: {
            name: product.name,
            price: product.price,
            comparePrice: product.comparePrice,
            description: product.description,
            features: JSON.stringify(product.features),
            isActive: product.isActive,
            isFeatured: product.isFeatured,
          },
        });
        synced++;
      } catch {
        skipped++;
      }
    }

    return { synced, skipped };
  },
};

export default ProductsService;
