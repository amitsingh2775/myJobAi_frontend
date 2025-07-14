import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['cdn.dummyjson.com'], // ✅ allow this domain
  },
    env: {
    JWT_SECRET: process.env.JWT_SECRET,
  },

};

export default nextConfig;
