/** @type {import('next').NextConfig} */
import 'dotenv/config';
const nextConfig = {
    experimental: {
    instrumentationHook: true,
  },
};

export default nextConfig;
