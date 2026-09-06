import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['en', 'ar'];
const defaultLocale = 'en';

const VALID_PRODUCT_SLUGS = new Set([
  'basic', 'premium', 'mastery', 'trial', 'planner',
]);

const VALID_APP_SLUGS = new Set([
  'ai-identity-coach', 'community-access', 'daily-planner', 'daily-reflection',
  'decision-analysis', 'emotion-regulation', 'environmental-audit', 'evidence-tracking',
  'executive-manual', 'goal-system', 'habit-tracker', 'identity-baseline',
  'identity-gap-quiz', 'identity-planner', 'identity-recode-system', 'journal-system',
  'priority-support', 'progress-dashboard', 'therapeutic-protocols', 'trial-planner',
  'values-clarification', 'worksheets',
]);

// Hard 404 for unknown dynamic slugs (Next 16 ignores dynamicParams on dynamic routes)
function unknownSlug404(pathname: string): NextResponse | null {
  const segments = pathname.split('/').filter(Boolean);
  if (segments[0] === 'ar' || segments[0] === 'en') segments.shift();
  if (segments[0] === 'products' && segments.length === 2 && !VALID_PRODUCT_SLUGS.has(segments[1])) {
    return new NextResponse('Not Found', { status: 404 });
  }
  if (segments[0] === 'apps' && segments.length === 2 && !VALID_APP_SLUGS.has(segments[1])) {
    return new NextResponse('Not Found', { status: 404 });
  }
  return null;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const slug404 = unknownSlug404(pathname);
  if (slug404) return slug404;

  // Skip static files and API routes
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/images') ||
    pathname.startsWith('/favicon') ||
    pathname.startsWith('/downloads') ||
    pathname === '/robots.txt' ||
    pathname === '/sitemap.xml' ||
    pathname === '/manifest.json' ||
    pathname === '/sw.js' ||
    pathname === '/browserconfig.xml' ||
    pathname.includes('/_error') ||
    pathname.includes('opengraph-image') ||
    /\.(svg|png|jpg|jpeg|gif|webp|ico|css|js|woff|woff2|ttf|eot)$/i.test(pathname)
  ) {
    return;
  }

  // Check if path starts with a known locale
  const localeMatch = locales.find(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

  if (localeMatch && localeMatch !== defaultLocale) {
    // For /ar paths, rewrite to the path without locale prefix
    const pathWithoutLocale = pathname.replace(new RegExp(`^/${localeMatch}`), '') || '/';
    const url = request.nextUrl.clone();
    url.pathname = pathWithoutLocale;

    // Set x-locale header so server components can read the locale from URL
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-locale', localeMatch);

    const response = NextResponse.rewrite(url, {
      request: {
        headers: requestHeaders,
      }
    });
    response.cookies.set('NEXT_LOCALE', localeMatch, {
      maxAge: 365 * 24 * 60 * 60,
      path: '/',
      sameSite: 'lax',
    });
    return response;
  }

  // Handle /en/ prefix - redirect to bare path (English is default, no prefix needed)
  // FIX: Set NEXT_LOCALE=en cookie on redirect so layout metadata reads correct locale
  if (localeMatch === defaultLocale) {
    const pathWithoutLocale = pathname.replace(new RegExp(`^/${defaultLocale}`), '') || '/';
    const url = request.nextUrl.clone();
    url.pathname = pathWithoutLocale;
    const response = NextResponse.redirect(url, 308);
    response.cookies.set('NEXT_LOCALE', defaultLocale, {
      maxAge: 365 * 24 * 60 * 60,
      path: '/',
      sameSite: 'lax',
    });
    return response;
  }

  // For default locale (en), no prefix needed
  const response = NextResponse.next();
  if (!request.cookies.has('NEXT_LOCALE')) {
    const acceptLanguage = request.headers.get('accept-language') || '';
    const prefersArabic = acceptLanguage.includes('ar');
    const detectedLocale = prefersArabic ? 'ar' : 'en';

    response.cookies.set('NEXT_LOCALE', detectedLocale, {
      maxAge: 365 * 24 * 60 * 60,
      path: '/',
      sameSite: 'lax',
    });
  }
  return response;
}

export const config = {
  matcher: ['/((?!api|_next|images|favicon|robots|sitemap|manifest|sw|workbox|browserconfig|downloads).*)'],
};

