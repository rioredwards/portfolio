/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.alias['@'] = path.resolve(__dirname, 'path/to/ui/');
    }
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.ctfassets.net',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'img.shields.io',
        port: '',
        pathname: '/**',
      },
    ],
  },
  async redirects() {
    return [
      // Page redirect DELETE ME LATER
      {
        source: '/:slug',
        destination: 'https://bento.me/rio-edwards',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
