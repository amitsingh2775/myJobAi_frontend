import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 
  images: {
    domains: ['cdn.dummyjson.com'], 
  },
    env: {
    JWT_SECRET: process.env.JWT_SECRET,
    BACKEND_URI:process.env.BACKEND_URI
                  
  },
   eslint: {
    ignoreDuringBuilds: true,
  },

};

export default nextConfig;
