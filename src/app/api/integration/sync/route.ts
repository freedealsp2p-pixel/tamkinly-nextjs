import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// WooCommerce API Configuration
const WC_URL = process.env.WOOCOMMERCE_URL || 'https://tamkinly.com';
const WC_CONSUMER_KEY = process.env.WOOCOMMERCE_CONSUMER_KEY || '';
const WC_CONSUMER_SECRET = process.env.WOOCOMMERCE_CONSUMER_SECRET || '';

// Product ID mapping
const PRODUCT_TIER_MAP: Record<number, string> = {
  215: 'trial',
  216: 'planner',
  217: 'premium',
  218: 'bundle',
};

const TIER_ACCESS_MAP: Record<string, string> = {
  'trial': 'TRIAL',
  'planner': 'BASIC',
  'premium': 'PREMIUM',
  'bundle': 'BUNDLE',
};

export async function POST(request: NextRequest) {
  try {
    if (!WC_CONSUMER_KEY || !WC_CONSUMER_SECRET) {
      return NextResponse.json(
        { error: 'WooCommerce API credentials not configured' },
        { status: 400 }
      );
    }

    const credentials = Buffer.from(`${WC_CONSUMER_KEY}:${WC_CONSUMER_SECRET}`).toString('base64');
    
    // Fetch all products from WooCommerce
    const response = await fetch(`${WC_URL}/wp-json/wc/v3/products?per_page=100&status=publish`, {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${credentials}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `WooCommerce API error: ${response.status}` },
        { status: response.status }
      );
    }

    const products = await response.json();
    
    const results = {
      synced: 0,
      skipped: 0,
      errors: [] as string[],
    };

    for (const wcProduct of products) {
      try {
        const tierKey = PRODUCT_TIER_MAP[wcProduct.id];
        
        // Determine product type
        const productType = wcProduct.virtual ? 'INTERACTIVE_APP' : 
                           wcProduct.downloadable ? 'DIGITAL_PDF' : 
                           wcProduct.categories?.some((c: { slug: string }) => c.slug === 'bundles') ? 'BUNDLE' : 'DIGITAL_PDF';

        // Upsert product
        await db.product.upsert({
          where: { id: String(wcProduct.id) },
          create: {
            id: String(wcProduct.id),
            name: wcProduct.name,
            slug: wcProduct.slug,
            description: wcProduct.description || wcProduct.short_description || '',
            shortDesc: wcProduct.short_description?.replace(/<[^>]*>/g, '').substring(0, 200) || '',
            price: parseFloat(wcProduct.price || wcProduct.regular_price || '0'),
            comparePrice: wcProduct.sale_price ? parseFloat(wcProduct.regular_price || '0') : null,
            type: productType,
            category: tierKey || 'general',
            accessTier: tierKey ? TIER_ACCESS_MAP[tierKey] : null,
            image: wcProduct.images?.[0]?.src || null,
            features: JSON.stringify(wcProduct.categories?.map((c: { name: string }) => c.name) || []),
            isActive: wcProduct.status === 'publish',
            isFeatured: wcProduct.featured || false,
          },
          update: {
            name: wcProduct.name,
            price: parseFloat(wcProduct.price || wcProduct.regular_price || '0'),
            comparePrice: wcProduct.sale_price ? parseFloat(wcProduct.regular_price || '0') : null,
            image: wcProduct.images?.[0]?.src || null,
            isActive: wcProduct.status === 'publish',
            isFeatured: wcProduct.featured || false,
          },
        });

        results.synced++;
      } catch (error) {
        results.errors.push(`Product ${wcProduct.id}: ${error instanceof Error ? error.message : 'Unknown error'}`);
        results.skipped++;
      }
    }

    return NextResponse.json({
      success: true,
      message: `Synced ${results.synced} products from WooCommerce`,
      results,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Sync error:', error);
    return NextResponse.json(
      { error: 'Failed to sync products', details: String(error) },
      { status: 500 }
    );
  }
}

// Get sync status
export async function GET() {
  try {
    const localProducts = await db.product.findMany({
      select: { id: true, name: true, price: true, updatedAt: true },
    });

    return NextResponse.json({
      success: true,
      localProducts: localProducts.length,
      products: localProducts,
      lastSync: localProducts.length > 0 
        ? localProducts.reduce((latest, p) => 
            p.updatedAt > latest ? p.updatedAt : latest, 
            localProducts[0].updatedAt
          )
        : null,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to get sync status' },
      { status: 500 }
    );
  }
}
