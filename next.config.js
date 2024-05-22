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
        source:'/logout',
        destination: 'https://auth.scstanton.net/if/flow/default-invalidation-flow/?next=%2F',
        permanent: true
      },
      ]
    },
  }

  module.exports = nextConfig;