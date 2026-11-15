import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  // No ESLint config in this project; type-checking still runs during `next build`.
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
