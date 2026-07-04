import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The repository root contains another project's lockfile; pin the app root
  // so Turbopack doesn't infer the wrong workspace directory.
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
