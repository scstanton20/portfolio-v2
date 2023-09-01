/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
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