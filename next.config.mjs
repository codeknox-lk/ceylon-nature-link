/** @type {import('next').Config} */
const nextConfig = {
  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://api.stripe.com; frame-src 'self' https://js.stripe.com https://www.google.com;",
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), payment=()',
          },
        ],
      },
    ];
  },

  // Environment variables
  env: {
    STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  },

  // Image optimization
  images: {
    domains: ['localhost', 'ceylonnaturelink.com'],
    formats: ['image/webp', 'image/avif'],
  },

  // Compression
  compress: true,

  // Experimental features for security
  experimental: {
    serverComponentsExternalPackages: ['@stripe/stripe-js'],
  },

  // Webpack configuration for security
  webpack: (config, { isServer }) => {
    // Add source map support for production debugging
    if (!isServer) {
      config.devtool = 'source-map';
    }

    return config;
  },

  // Redirects for security
  async redirects() {
    return [
      {
        source: '/admin',
        destination: '/admin/dashboard',
        permanent: false,
      },
    ];
  },

  // Rewrites for API security
  async rewrites() {
    return [
      {
        source: '/api/payment/webhook',
        destination: '/api/payment/webhook',
      },
    ];
  },
};

export default nextConfig;