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

const VALID_AUTHOR_SLUGS = new Set([
  'tamkinly-team',
]);

const VALID_BLOG_SLUGS = new Set([
  'identity-gap-assessment', 'values-clarification-tool', 'daily-reflection-practice',
  'identity-recode-system-guide', 'ai-identity-coach-guide', 'who-am-i-worksheet',
  'identity-based-habits-worksheet', 'self-authorship-worksheet',
  'identity-baseline-8d-worksheet', 'environmental-audit-worksheet',
  'erq-emotional-regulation-worksheet', 'physics-of-momentum', 'magic-in-work-you-avoid',
  'identity-millionaire', 'all-in-or-nothing', 'five-steps-to-miracles',
  'inversion-thinking', 'speed-as-strategy', 'ten-minute-block-system',
  'work-on-yourself', 'becoming-exceptional', 'dopamine-reset',
  'and-the-bamboo-kept-growing', 'automatic-change', 'physics-of-consciousness',
  'redefining-discipline', 'vagus-nerve-breathing', 'how-to-build-habits-that-stick',
  'morning-routine-identity', 'stop-procrastinating-identity-shift',
  'self-discipline-science', 'goal-setting-framework', 'ar-tatweer-althat',
  'ar-binaa-al3aadat', 'ar-tahqeeq-alahdaf', 'ar-aldhibat-althati', 'ar-idarat-alwaqt',
  'ar-hindasat-al-dimag', 'ar-karizma-al-tatheer', 'ar-khulasat-al-arbaeen',
  'app-guides', 'worksheets', 'identity-transformation', 'mindset-strategy',
  'productivity-growth',
]);

const VALID_BLOG_CATEGORY_SLUGS = new Set([
  'app-guides', 'worksheets', 'identity-transformation', 'mindset-strategy',
  'productivity-growth', 'apps', 'basic-app', 'brain-science', 'commitment',
  'daily-practice', 'excellence', 'execution', 'free-app', 'growth', 'habit-formation',
  'identity', 'identity-shift', 'life-wisdom', 'mastery-app', 'mental-clarity',
  'mindset', 'productivity', 'relationships-and-influence', 'self-image',
  'self-liberation', 'strategy', 'tools', 'transformation', 'wealth-and-identity',
  'worksheet',
]);

const VALID_GUIDE_SLUGS = new Set([
  'identity-vs-behavior-change', 'recode-identity-30-days',
  'behavior-trap-why-habits-fail', 'environment-shapes-you',
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
  if (segments[0] === 'blog' && segments[1] === 'author' && segments.length === 3 && !VALID_AUTHOR_SLUGS.has(segments[2])) {
    return new NextResponse('Not Found', { status: 404 });
  }
  if (segments[0] === 'blog' && segments.length === 2) {
    if (segments[1] === 'author' || segments[1] === 'category') {
      return new NextResponse('Not Found', { status: 404 });
    }
    if (!VALID_BLOG_SLUGS.has(segments[1])) {
      return new NextResponse('Not Found', { status: 404 });
    }
  }
  if (segments[0] === 'blog' && segments.length > 3) {
    return new NextResponse('Not Found', { status: 404 });
  }
  if (segments[0] === 'blog' && segments.length === 3 && segments[1] === 'category' && !VALID_BLOG_CATEGORY_SLUGS.has(segments[2])) {
    return new NextResponse('Not Found', { status: 404 });
  }
  if (segments[0] === 'guides' && segments.length === 2 && !VALID_GUIDE_SLUGS.has(segments[1])) {
    return new NextResponse('Not Found', { status: 404 });
  }
  if (segments[0] === 'guides' && segments.length > 2) {
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

