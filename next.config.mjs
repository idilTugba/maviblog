/** @type {import('next').NextConfig} */
import 'dotenv/config';
const nextConfig = {
  experimental: {
      esmExternals: "loose",
      serverComponentsExternalPackages: ["mongoose"],
      // instrumentationHook: true,
    },
  images: {
    domains: ['placehold.co'],
  },
  // output: 'export',
  // enable top-level await support for Webpack
  // webpack: (config) => {
  //   config.experiments = {
  //     topLevelAwait: true
  //   };
  //   return config;
  // },
};

export default nextConfig;
