import type { NextConfig } from "next";

const isGithubActions = process.env.GITHUB_ACTIONS || false;
const basePath = isGithubActions ? '/maison-aurelia' : (process.env.NEXT_PUBLIC_BASE_PATH || '');

const nextConfig: NextConfig = {
  output: 'export',
  basePath: basePath,
  assetPrefix: basePath,
  images: {
    unoptimized: true,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
