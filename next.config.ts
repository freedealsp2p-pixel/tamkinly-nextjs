import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Enable standalone for efficient deployment on memory-constrained server
  output: 'standalone',

  // TypeScript config
  typescript: {
    ignoreBuildErrors: true,
  },

  // Disable strict mode for better compatibility
  reactStrictMode: false,

  // Image optimization - disabled for memory savings
  images: {
    unoptimized: true,
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
    // Enable package import optimization
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },

  // Headers for caching
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
    ];
  },
};

export default nextConfig;
