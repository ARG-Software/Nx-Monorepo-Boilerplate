// @ts-nocheck

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { composePlugins, withNx } = require('@nx/next');
const path = require('path');

const env = process.env.ENV == undefined ? 'production' : 'development';
const API_MAIN_URL = process.env.API_MAIN_URL;
const API_JWT_SECRET = process.env.JWT_SECRET;

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // Set this to true if you would like to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  env: {
    NEXT_PUBLIC_API_BASE_URL: API_MAIN_URL,
    API_JWT_SECRET: API_JWT_SECRET,
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

console.log(env);
if (env === 'production') {
  nextConfig.output = 'standalone';
  // nextConfig.compiler = {
  //   removeConsole: true,
  // },
  nextConfig.experimental = {
    outputFileTracingRoot: path.join(__dirname, '../../'),
  };
}

const plugins = [
  // Add more Next.js plugins to this list if needed.
  withNx,
];

module.exports = composePlugins(...plugins)(nextConfig);
