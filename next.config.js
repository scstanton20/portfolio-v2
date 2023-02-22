module.exports = {
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
          destination: 'https://status.scstanton.dev',
          permanent: true,
        },
        {
          source:'/logout',
          destination: 'https://auth.scstanton.dev/if/flow/default-invalidation-flow/?next=%2F',
          permanent: true
        }
      ]
    },
  }