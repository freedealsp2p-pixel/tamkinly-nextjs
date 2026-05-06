import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['en', 'ar'];
const defaultLocale = 'en';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip static files and API routes
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/images') ||
    pathname.startsWith('/favicon') ||
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
    // For exact /ar path (no trailing slash), redirect to /ar/ for consistency
    if (pathname === `/${localeMatch}`) {
      const url = request.nextUrl.clone();
      url.pathname = `/${localeMatch}/`;
      return NextResponse.redirect(url);
    }

    // For /ar/* paths, rewrite to the path without locale prefix
    const pathWithoutLocale = pathname.replace(new RegExp(`^/${localeMatch}`), '') || '/';
    const url = request.nextUrl.clone();
    url.pathname = pathWithoutLocale;

    const response = NextResponse.rewrite(url);
    response.cookies.set('NEXT_LOCALE', localeMatch, {
      maxAge: 365 * 24 * 60 * 60,
      path: '/',
      sameSite: 'lax',
    });
    return response;
  }

  // Handle /en/ prefix - redirect to bare path (English is default, no prefix needed)
  if (localeMatch === defaultLocale) {
    const pathWithoutLocale = pathname.replace(new RegExp(`^/${defaultLocale}`), '') || '/';
    const url = request.nextUrl.clone();
    url.pathname = pathWithoutLocale;
    return NextResponse.redirect(url);
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
  matcher: ['/((?!api|_next|images|favicon|robots|sitemap|manifest|sw|workbox|browserconfig).*)'],
};
