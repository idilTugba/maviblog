/** @type {import('next').NextConfig} */
import 'dotenv/config';
const nextConfig = {
  experimental: {
      esmExternals: "loose",
      serverComponentsExternalPackages: ["mongoose"],
      // instrumentationHook: true,
    },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
    ],
  },
  // Dev: disable webpack filesystem cache to avoid stale chunk refs (Cannot find module './948.js').
  // Polling helps EMFILE / flaky file watchers on macOS.
  webpack: (config, { dev }) => {
    if (dev) {
      config.cache = false;
      config.watchOptions = {
        ...config.watchOptions,
        poll: 1000,
        aggregateTimeout: 300,
      };
    }
    return config;
  },
  // output: 'export',
};

export default nextConfig;
