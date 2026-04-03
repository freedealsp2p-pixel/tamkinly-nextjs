import { NextResponse } from 'next/server';
import { WooCommerceProducts, PRODUCT_ID_MAP, type WooProduct } from '@/lib/woocommerce';

// Transform WooCommerce product to Tamkinly format
function transformProduct(wooProduct: WooProduct) {
  const internalId = PRODUCT_ID_MAP[wooProduct.id] || 'premium';
  
  return {
    id: internalId,
    wooId: wooProduct.id,
    name: wooProduct.name,
    slug: wooProduct.slug,
    price: parseFloat(wooProduct.price) || 0,
    regularPrice: parseFloat(wooProduct.regular_price) || 0,
    salePrice: parseFloat(wooProduct.sale_price) || 0,
    description: wooProduct.description.replace(/<[^>]*>/g, ''), // Strip HTML
    shortDescription: wooProduct.short_description.replace(/<[^>]*>/g, ''),
    image: wooProduct.images[0]?.src || null,
    inStock: wooProduct.stock_status === 'instock',
    featured: wooProduct.featured,
    downloads: wooProduct.downloads || [],
  };
}

export async function GET() {
  try {
    // Fetch products from WooCommerce
    const wooProducts = await WooCommerceProducts.list({
      status: 'publish',
      per_page: 20,
    });

    // Filter only our known products
    const knownProductIds = Object.keys(PRODUCT_ID_MAP).map(Number);
    const filteredProducts = wooProducts.filter(p => knownProductIds.includes(p.id));

    // Transform to internal format
    const products = filteredProducts.map(transformProduct);

    return NextResponse.json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    console.error('Error fetching WooCommerce products:', error);
    
    // Fallback to hardcoded products if WooCommerce is unavailable
    const fallbackProducts = [
      {
        id: 'trial',
        wooId: 263,
        name: '7 Days Identity System - Trial',
        slug: '7-days-identity-system-trial',
        price: 7,
        regularPrice: 15,
        salePrice: 7,
        description: 'A quick-start mini-guide to experience the Tamkinly methodology.',
        shortDescription: '7-Day Identity Reset Mini-Guide',
        image: null,
        inStock: true,
        featured: false,
        downloads: [],
      },
      {
        id: 'planner',
        wooId: 262,
        name: 'Identity Recode Planner - 30-Day',
        slug: 'identity-recode-planner-30-day',
        price: 17,
        regularPrice: 29,
        salePrice: 17,
        description: 'The complete 30-day journey. Digital planner plus print-ready version.',
        shortDescription: '30-Day Identity Recode Planner',
        image: null,
        inStock: true,
        featured: true,
        downloads: [],
      },
      {
        id: 'premium',
        wooId: 341,
        name: 'Identity Recode Planner - Premium Package',
        slug: 'identity-recode-planner-premium-package',
        price: 27,
        regularPrice: 44,
        salePrice: 27,
        description: 'Everything in the planner plus the Identity Reset Checklist.',
        shortDescription: 'Premium Transformation Package',
        image: null,
        inStock: true,
        featured: true,
        downloads: [],
      },
    ];

    return NextResponse.json({
      success: true,
      count: fallbackProducts.length,
      products: fallbackProducts,
      fallback: true,
      error: String(error),
    });
  }
}
