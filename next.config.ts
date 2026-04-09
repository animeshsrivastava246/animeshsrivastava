import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.hashnode.com",
      },
      {
        protocol: "https",
        hostname: "hashnode.com",
      },
      {
        protocol: "https",
        hostname: "*.hashnode.com",
      },
    ],
  },
  allowedDevOrigins: ["192.168.29.199", "localhost"],
};

export default nextConfig;
