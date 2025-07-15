import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 
  images: {
    domains: ['cdn.dummyjson.com'], 
  },
    env: {
    JWT_SECRET: process.env.JWT_SECRET,
  },
   eslint: {
    ignoreDuringBuilds: true,
  },

};

export default nextConfig;
