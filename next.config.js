/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    instrumentationHook: true,
  },
  // https://nextjs.org/docs/pages/building-your-application/routing/middleware
  skipTrailingSlashRedirect: true,
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/socket.io/',
          destination: 'http://localhost:3200/socket.io/',
        },
      ],
    };
  },
};

module.exports = nextConfig;
