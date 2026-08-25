import type { NextConfig } from 'next';

// ============================================
// Content Security Policy
// Generated 2026-07-02 to mitigate XSS, data exfiltration, clickjacking
// ============================================
const CSP_DIRECTIVES = [
  "default-src 'self'",
  // Script: 'unsafe-inline' needed for Next.js + Analytics dangerouslySetInnerHTML
  // 'unsafe-eval' needed for some Next.js dev features (remove in pure prod if possible)
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://t.contentsquare.net https://static.hotjar.com https://challenges.cloudflare.com https://cloudflareinsights.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' data: https://fonts.gstatic.com",
  // Images: allow https (for og:image, user avatars, etc.) + data + blob
  "img-src 'self' data: blob: https:",
  // Connect: API endpoints + analytics beacons
  "connect-src 'self' https://api.brevo.com https://backend.tahweel.io https://www.google-analytics.com https://*.google-analytics.com https://*.contentsquare.net https://*.hotjar.com https://challenges.cloudflare.com https://cloudflareinsights.com",
  "frame-src 'self' https://challenges.cloudflare.com",
  "frame-ancestors 'none'", // equivalent to X-Frame-Options: DENY
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self' https://wise.com https://tamkinly.com",
  "manifest-src 'self'",
  "worker-src 'self' blob:",
  "upgrade-insecure-requests",
].join('; ');

const nextConfig: NextConfig = {
  // Standalone mode for efficient deployment
  output: 'standalone',

  poweredByHeader: false,
  
  
  // Enable strict mode for catching subtle bugs (was disabled)
  reactStrictMode: false, // keep false in production to avoid double-render overhead
  
  // Image optimization: was unoptimized=true (no benefit)
  // Now enabled — Cloudflare will cache optimized variants
  images: {
    unoptimized: false,
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      { protocol: 'https', hostname: 'tamkinly.com' },
      { protocol: 'https', hostname: '**.cloudflare.com' },
    ],
    // 2025: Cache optimized images for 60 days
    minimumCacheTTL: 5184000,
    dangerouslyAllowSVG: true,
    // contentDispositionType: 'attachment',  // REMOVED: broke OG image previews
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  allowedDevOrigins: [
    '.space.z.ai',
    'tamkinly.com',
    'www.tamkinly.com',
  ],

  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
    // 2025: Tree-shaking for better bundle sizes
    optimisticClientCache: true,
    // 2025: Faster builds with memory-efficient compiler
    memoryBasedWorkersCount: true,
  },
  
  // 2025: Compiler optimizations
  compiler: {
    // Remove console.log in production (keep console.error + console.warn)
    removeConsole: {
      exclude: ['error', 'warn'],
    },
  },

  async headers() {
    return [
      // ============================================
      // CSP + Security Headers (applied to ALL routes)
      // ============================================
      {
        source: '/:path*',
        headers: [
          { key: 'Content-Security-Policy', value: CSP_DIRECTIVES },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'geolocation=(), microphone=(), camera=(), payment=()' },
          // HSTS: 1 year + preload
          { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains; preload' },
        ],
      },
      // Static asset caching (existing)
      {
        source: '/:all*(svg|jpg|png|ico|webp|avif)',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        source: '/:all*(js|css)',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        source: '/:all*(woff|woff2|ttf|otf)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
        ],
      },
    ];
  },

  async redirects() {
    return [
      // Legacy/legal page redirects
      {
        source: '/privacy-policy',
        destination: '/privacy',
        permanent: true,
      },
      {
        source: '/terms-of-service',
        destination: '/terms',
        permanent: true,
      },
      {
        source: '/refund-policy',
        destination: '/refund',
        permanent: true,
      },
      // App slug redirects
      {
        source: '/apps/identity-quiz',
        destination: '/apps/identity-gap-quiz',
        permanent: true,
      },
      {
        source: '/apps/ai-coach',
        destination: '/apps/ai-identity-coach',
        permanent: true,
      },
      {
        source: '/apps/identity-planner',
        destination: '/apps/daily-planner',
        permanent: true,
      },
      {
        source: '/apps/community',
        destination: '/apps/community-access',
        permanent: true,
      },
      // Recovery path redirects
      // Legacy TRC redirects (locale-aware — config redirects run before middleware)
      // AR prefix must be preserved: /ar/trc -> /ar/recovery/trc, not /recovery/trc
      {
        source: '/ar/trc/:path*',
        destination: '/ar/recovery/trc/:path*',
        permanent: true,
      },
      {
        source: '/ar/trc',
        destination: '/ar/recovery/trc',
        permanent: true,
      },
      {
        source: '/trc/:path*',
        destination: '/recovery/trc/:path*',
        permanent: true,
      },
      {
        source: '/trc',
        destination: '/recovery/trc',
        permanent: true,
      },
      {
        source: '/recovery/hub',
        destination: '/recovery',
        permanent: true,
      },
      {
        source: '/recovery/trc/safety-plan',
        destination: '/recovery/trc/worksheets/safety-plan',
        permanent: true,
      },
      {
        source: '/recovery/trc/trigger-mapping',
        destination: '/recovery/trc/worksheets/trigger-mapping',
        permanent: true,
      },
      // Admin redirect
      {
        source: '/admin/dashboard',
        destination: '/admin',
        permanent: true,
      },
    ];
  },

  compress: true,
};

export default nextConfig;
