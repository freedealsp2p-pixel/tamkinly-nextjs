import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Removed output: 'standalone' - incompatible with 'next start' command
  // Using standard mode for full compatibility with API routes and auth

  // Remove X-Powered-By header for security
  poweredByHeader: false,

  // TypeScript config
  typescript: {
    ignoreBuildErrors: true,
  },

  // Disable strict mode to prevent double rendering issues
  reactStrictMode: false,

  // Image optimization - lightweight for VPS
  images: {
    unoptimized: true,
    formats: ['image/webp'],
  },

  // Allowed dev origins for preview
  allowedDevOrigins: [
    'preview-chat-f27fc0d8-bdfb-441b-90c5-e050c2a87613.space.z.ai',
    '.space.z.ai',
    'tamkinly.com',
    'www.tamkinly.com',
  ],

  // Experimental features for memory optimization
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },

  // Security & caching headers
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|png|ico|webp)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:all*(js|css)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:all*(woff|woff2|ttf|otf)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
        ],
      },
    ];
  },

  // Compression
  compress: true,
};

export default nextConfig;

