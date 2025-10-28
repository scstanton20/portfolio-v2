/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: '/images/zu8w3jsp/production/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  async redirects() {
    return [
      {
        source: '/linkedin',
        destination: 'https://linkedin.com/in/sc-stanton',
        permanent: true,
      },
      {
        source: '/studio',
        destination: 'https://scsportfolio.sanity.studio',
        permanent: true,
      },
      {
        source: '/status',
        destination: 'https://status.scstanton.net',
        permanent: true,
      },
      {
        source: '/logout',
        destination: 'https://auth.scstanton.net/if/flow/default-invalidation-flow/?next=%2F',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;