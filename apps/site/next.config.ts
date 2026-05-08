import type { NextConfig } from "next";
import { resolve } from "node:path";

const repoRoot = resolve(__dirname, "../..");
const serverMediaToolTraceFiles = [
  "../../node_modules/.pnpm/ffmpeg-static@*/node_modules/ffmpeg-static/ffmpeg",
  "../../node_modules/.pnpm/ffprobe-static@*/node_modules/ffprobe-static/bin/linux/**/*",
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: repoRoot,
  outputFileTracingIncludes: {
    "/*": serverMediaToolTraceFiles,
  },
  turbopack: {
    root: repoRoot,
  },
};

export default nextConfig;
