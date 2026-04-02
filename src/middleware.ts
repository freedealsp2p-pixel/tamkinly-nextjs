import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  
  // Allow all static files and public assets
  if (
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/favicon') ||
    pathname.startsWith('/images/') ||
    pathname.startsWith('/fonts/') ||
    pathname.includes('.') // files with extensions
  ) {
    return NextResponse.next();
  }
  
  // Allow API routes to pass through
  if (pathname.startsWith('/api/')) {
    return NextResponse.next();
  }
  
  // Handle Arabic locale routing
  // For Arabic pages (/ar/*), we'll handle it in the layout
  // Just continue with the request
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
