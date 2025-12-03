import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'cdn.jsdelivr.net', 'your-strapi-host.com'],
  },
};



module.exports = nextConfig;
