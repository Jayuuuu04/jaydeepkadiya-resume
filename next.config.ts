import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    turbo: {
      enabled: false,
    },
  },
};

export default nextConfig;
