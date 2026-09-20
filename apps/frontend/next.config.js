const path = require('path');
const configuration = process.env.NX_TASK_TARGET_CONFIGURATION || 'default';
const isProduction =
  configuration === 'production' || process.env.NODE_ENV === 'production';

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  distDir: isProduction ? 'dist/production' : 'dist/development',
  env: {
    NEXT_PUBLIC_API_BASE_URL: process.env.API_MAIN_URL,
  },
  reactStrictMode: true,
  cleanDistDir: true,
  pageExtensions: ['page.tsx', 'page.ts', 'api.ts'],
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/users',
        permanent: true,
      },
    ];
  },
};

if (isProduction) {
  nextConfig.outputFileTracingRoot = path.join(__dirname, '../../');

  // Next's pnpm standalone output requires symlink privileges unavailable on standard Windows shells.
  if (process.platform !== 'win32') {
    nextConfig.output = 'standalone';
  }
}

module.exports = nextConfig;
