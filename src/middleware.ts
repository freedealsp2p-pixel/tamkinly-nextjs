import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/_next` or `_vercel` or contain a dot (files)
  // - … or if they are internal Next.js paths
  matcher: ['/', '/(ar|en)/:path*', '/((?!api|_next|_vercel|_static|[\\w-]+\\.\\w+).*)']
};
