// ============================================
// INDEXNOW API ROUTE
// ============================================
// Notifies Bing, Yandex, and other IndexNow-compatible search engines
// when content is created or updated.
//
// Usage:
//   POST /api/indexnow
//   Body: { urls: ["https://tamkinly.com/blog/new-article", ...] }
//   Or single URL: POST /api/indexnow?url=https://...
//
// The IndexNow key is stored in .env as INDEXNOW_KEY
// A matching key file is served at /{key}.txt (created by /api/indexnow/key route)
//
// Supported engines:
//   - Bing (api.indexnow.org)
//   - Yandex (yandex.com/indexnow)
//   - Seznam (search.seznam.cz/indexnow)
//   - Naver (searchadvisor.naver.com/indexnow)
// ============================================

import { NextRequest, NextResponse } from 'next/server';
import { applySecurity, API_RATE_LIMIT } from '@/lib/security';

const INDEXNOW_KEY = process.env.INDEXNOW_KEY || '';
const SITE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://tamkinly.com';

// IndexNow API endpoints (any one will propagate to all)
const INDEXNOW_ENDPOINTS = [
  'https://api.indexnow.org/IndexNow',
  'https://www.bing.com/indexnow',
  'https://yandex.com/indexnow',
];

/**
 * POST handler - submit URLs to IndexNow
 * Body: { urls: string[] } or { url: string }
 */
export async function POST(request: NextRequest) {
  // Apply rate limiting (60 req/min per IP)
  const securityBlocked = await applySecurity(request, API_RATE_LIMIT);
  if (securityBlocked) return securityBlocked;

  if (!INDEXNOW_KEY) {
    console.error('⚠️  INDEXNOW_KEY not configured in .env');
    return NextResponse.json(
      { error: 'IndexNow not configured', message: 'INDEXNOW_KEY environment variable is not set' },
      { status: 503 }
    );
  }

  try {
    const body = await request.json();
    const urls: string[] = Array.isArray(body?.urls) ? body.urls : (body?.url ? [body.url] : []);

    if (urls.length === 0) {
      return NextResponse.json(
        { error: 'No URLs provided', message: 'Body must contain "url" or "urls" array' },
        { status: 400 }
      );
    }

    // Validate URLs belong to our domain (prevent abuse)
    const validUrls = urls.filter((u: string) => {
      try {
        const url = new URL(u);
        return url.hostname === 'tamkinly.com' || url.hostname === 'www.tamkinly.com';
      } catch {
        return false;
      }
    });

    if (validUrls.length === 0) {
      return NextResponse.json(
        { error: 'Invalid URLs', message: 'All URLs must be on tamkinly.com domain' },
        { status: 400 }
      );
    }

    // Build IndexNow payload
    const payload = {
      host: 'tamkinly.com',
      key: INDEXNOW_KEY,
      keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
      urlList: validUrls,
    };

    // Submit to all IndexNow endpoints in parallel
    const results = await Promise.allSettled(
      INDEXNOW_ENDPOINTS.map(async (endpoint) => {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json; charset=utf-8' },
          body: JSON.stringify(payload),
          signal: AbortSignal.timeout(10000),
        });
        return { endpoint, status: response.status, ok: response.ok };
      })
    );

    const successful = results.filter((r) => r.status === 'fulfilled' && r.value.ok).length;
    const failed = results.length - successful;

    console.log(`📡 IndexNow submission: ${successful}/${results.length} endpoints OK, ${validUrls.length} URLs submitted`);

    return NextResponse.json({
      success: successful > 0,
      submitted: validUrls.length,
      endpoints: results.map((r) => ({
        endpoint: r.status === 'fulfilled' ? r.value.endpoint : 'unknown',
        status: r.status === 'fulfilled' ? r.value.status : 0,
        ok: r.status === 'fulfilled' && r.value.ok,
      })),
      successful,
      failed,
    });

  } catch (error) {
    console.error('IndexNow submission error:', error);
    return NextResponse.json(
      { error: 'Submission failed', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

/**
 * GET handler - returns IndexNow key file content
 * Served at /api/indexnow?key={INDEXNOW_KEY} for verification
 */
export async function GET(request: NextRequest) {
  if (!INDEXNOW_KEY) {
    return NextResponse.json({ error: 'Not configured' }, { status: 503 });
  }

  // If query param matches our key, return the key as plain text
  // (this is how IndexNow verification works)
  const url = new URL(request.url);
  const queryKey = url.searchParams.get('key');

  if (queryKey === INDEXNOW_KEY) {
    return new NextResponse(INDEXNOW_KEY, {
      status: 200,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
  }

  // Otherwise return status info
  return NextResponse.json({
    service: 'IndexNow',
    configured: !!INDEXNOW_KEY,
    keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
    endpoints: INDEXNOW_ENDPOINTS,
  });
}
