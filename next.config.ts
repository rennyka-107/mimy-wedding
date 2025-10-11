import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL('http://localhost:3000/**'), {
      protocol: 'https',
      hostname: 'qr.sepay.vn',
      pathname: '/**',
    }],
  },
};

export default nextConfig;
