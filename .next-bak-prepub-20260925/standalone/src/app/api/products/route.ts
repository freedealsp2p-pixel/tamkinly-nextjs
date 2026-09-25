import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { LOCAL_PRODUCTS, PRODUCT_TIER_MAP } from '@/lib/products';

// GET - List all products
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');

    let products = [...LOCAL_PRODUCTS];

    // Filter by category
    if (category) {
      products = products.filter(p => p.category === category);
    }

    // Filter featured
    if (featured === 'true') {
      products = products.filter(p => p.isFeatured);
    }

    // Only active products
    products = products.filter(p => p.isActive);

    // Sort by price
    products.sort((a, b) => a.price - b.price);

    return NextResponse.json({
      success: true,
      source: 'local',
      count: products.length,
      products: products.map(p => ({
        id: p.id,
        name: p.name,
        slug: p.slug,
        price: p.price,
        comparePrice: p.comparePrice,
        description: p.description,
        shortDesc: p.shortDesc,
        category: p.category,
        type: p.type,
        accessTier: p.accessTier,
        image: p.image,
        features: p.features,
        isFeatured: p.isFeatured,
      })),
    });
  } catch (error) {
    console.error('Get products error:', error);
    
    // Return local products as fallback
    return NextResponse.json({
      success: true,
      source: 'fallback',
      count: LOCAL_PRODUCTS.length,
      products: LOCAL_PRODUCTS,
    });
  }
}
