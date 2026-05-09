import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Standalone mode for efficient deployment
  output: 'standalone',

  poweredByHeader: false,
  typescript: { ignoreBuildErrors: true },
  reactStrictMode: false,

  images: {
    unoptimized: true,
    formats: ['image/webp'],
  },

  allowedDevOrigins: [
    '.space.z.ai',
    'tamkinly.com',
    'www.tamkinly.com',
  ],

  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },

  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|png|ico|webp)',
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

  compress: true,
};

export default nextConfig;

