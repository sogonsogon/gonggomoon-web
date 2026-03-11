import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ssl.pstatic.net',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
