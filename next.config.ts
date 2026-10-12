import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Pin Turbopack to this project so a lockfile higher up is ignored.
  turbopack: { root: process.cwd() },
};

export default nextConfig;
