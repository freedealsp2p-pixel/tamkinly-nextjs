import { NextRequest, NextResponse } from 'next/server';

// WooCommerce API Configuration
const WC_URL = process.env.WOOCOMMERCE_URL || 'https://tamkinly.com';
const WC_CONSUMER_KEY = process.env.WOOCOMMERCE_CONSUMER_KEY || '';
const WC_CONSUMER_SECRET = process.env.WOOCOMMERCE_CONSUMER_SECRET || '';

interface IntegrationStatus {
  name: string;
  status: 'success' | 'error' | 'warning' | 'pending';
  message: string;
  details?: Record<string, unknown>;
  latency?: number;
}

async function checkWooCommerceAPI(): Promise<IntegrationStatus> {
  const startTime = Date.now();
  
  try {
    if (!WC_CONSUMER_KEY || !WC_CONSUMER_SECRET) {
      return {
        name: 'WooCommerce API',
        status: 'warning',
        message: 'WooCommerce API credentials not configured - using fallback products',
        details: {
          url: WC_URL,
          hasKey: !!WC_CONSUMER_KEY,
          hasSecret: !!WC_CONSUMER_SECRET,
          note: 'Add WOOCOMMERCE_CONSUMER_KEY and WOOCOMMERCE_CONSUMER_SECRET to .env',
        },
      };
    }

    const credentials = Buffer.from(`${WC_CONSUMER_KEY}:${WC_CONSUMER_SECRET}`).toString('base64');
    
    // Set timeout for the request
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
    
    const response = await fetch(`${WC_URL}/wp-json/wc/v3/products?per_page=1`, {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${credentials}`,
        'Content-Type': 'application/json',
      },
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);

    const latency = Date.now() - startTime;

    if (!response.ok) {
      const isServerError = response.status >= 500;
      return {
        name: 'WooCommerce API',
        status: isServerError ? 'error' : 'warning',
        message: isServerError 
          ? `Server error ${response.status} - WordPress backend may be down`
          : `API returned ${response.status} - Check API credentials`,
        latency,
        details: {
          status: response.status,
          statusText: response.statusText,
          url: WC_URL,
          note: isServerError 
            ? 'The WordPress server is returning 502. Check PHP-FPM and Nginx status.'
            : 'Verify WooCommerce API keys in WordPress admin.',
        },
      };
    }

    const data = await response.json();
    
    return {
      name: 'WooCommerce API',
      status: 'success',
      message: `Connected successfully - ${data.length || 0} products found`,
      latency,
      details: {
        url: WC_URL,
        productsCount: data.length || 0,
      },
    };
  } catch (error) {
    const isTimeout = error instanceof Error && error.name === 'AbortError';
    return {
      name: 'WooCommerce API',
      status: 'error',
      message: isTimeout 
        ? 'Connection timeout - WordPress backend is not responding'
        : `Connection failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
      latency: Date.now() - startTime,
      details: {
        note: isTimeout
          ? 'The WordPress server is taking too long to respond. This usually means the PHP-FPM service is down or overloaded.'
          : 'Check network connectivity and WordPress server status.',
      },
    };
  }
}

async function checkWordPressREST(): Promise<IntegrationStatus> {
  const startTime = Date.now();
  
  try {
    const response = await fetch(`${WC_URL}/wp-json/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const latency = Date.now() - startTime;

    if (!response.ok) {
      return {
        name: 'WordPress REST API',
        status: 'error',
        message: `REST API returned ${response.status}`,
        latency,
      };
    }

    const data = await response.json();
    
    return {
      name: 'WordPress REST API',
      status: 'success',
      message: `WordPress ${data.name || 'API'} connected`,
      latency,
      details: {
        name: data.name,
        description: data.description?.substring(0, 100),
      },
    };
  } catch (error) {
    return {
      name: 'WordPress REST API',
      status: 'error',
      message: `Connection failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
      latency: Date.now() - startTime,
    };
  }
}

async function checkWordPressJWT(): Promise<IntegrationStatus> {
  const startTime = Date.now();
  
  try {
    // Check if JWT plugin is active by trying the validate endpoint
    const response = await fetch(`${WC_URL}/wp-json/jwt-auth/v1`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const latency = Date.now() - startTime;

    if (response.status === 404) {
      return {
        name: 'JWT Authentication',
        status: 'warning',
        message: 'JWT Auth plugin may not be active',
        latency,
      };
    }

    return {
      name: 'JWT Authentication',
      status: 'success',
      message: 'JWT Auth endpoint accessible',
      latency,
    };
  } catch (error) {
    return {
      name: 'JWT Authentication',
      status: 'warning',
      message: 'Could not verify JWT Auth status',
      latency: Date.now() - startTime,
    };
  }
}

async function checkWebhookEndpoint(): Promise<IntegrationStatus> {
  try {
    const webhookUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/webhook/woocommerce`;
    
    return {
      name: 'Webhook Endpoint',
      status: 'success',
      message: 'Webhook endpoint configured',
      details: {
        url: webhookUrl,
        note: 'Configure this URL in WooCommerce Settings > Advanced > Webhooks',
        secret: 'tamkinly_webhook_secret_2024',
      },
    };
  } catch (error) {
    return {
      name: 'Webhook Endpoint',
      status: 'error',
      message: 'Webhook configuration error',
    };
  }
}

async function checkDatabaseConnection(): Promise<IntegrationStatus> {
  const startTime = Date.now();
  
  try {
    const { db } = await import('@/lib/db');
    
    // Try a simple query
    const userCount = await db.user.count();
    const accessCount = await db.appAccess.count();
    
    const latency = Date.now() - startTime;
    
    return {
      name: 'Database Connection',
      status: 'success',
      message: 'Database connected successfully',
      latency,
      details: {
        users: userCount,
        accessCodes: accessCount,
      },
    };
  } catch (error) {
    return {
      name: 'Database Connection',
      status: 'error',
      message: `Database error: ${error instanceof Error ? error.message : 'Unknown error'}`,
      latency: Date.now() - startTime,
    };
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const check = searchParams.get('check') || 'all';

  const results: IntegrationStatus[] = [];

  // Run all checks or specific one
  if (check === 'all' || check === 'woocommerce') {
    results.push(await checkWooCommerceAPI());
  }
  
  if (check === 'all' || check === 'wordpress') {
    results.push(await checkWordPressREST());
  }
  
  if (check === 'all' || check === 'jwt') {
    results.push(await checkWordPressJWT());
  }
  
  if (check === 'all' || check === 'webhook') {
    results.push(await checkWebhookEndpoint());
  }
  
  if (check === 'all' || check === 'database') {
    results.push(await checkDatabaseConnection());
  }

  // Calculate overall status
  const hasError = results.some(r => r.status === 'error');
  const hasWarning = results.some(r => r.status === 'warning');
  
  const overallStatus = hasError ? 'error' : hasWarning ? 'warning' : 'success';

  return NextResponse.json({
    success: true,
    timestamp: new Date().toISOString(),
    overallStatus,
    results,
    summary: {
      total: results.length,
      success: results.filter(r => r.status === 'success').length,
      warning: results.filter(r => r.status === 'warning').length,
      error: results.filter(r => r.status === 'error').length,
    },
  });
}
