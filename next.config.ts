import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

/* Absolute project root — prevents Turbopack from walking up to a parent lockfile. */
const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  transpilePackages: ["three"],
  turbopack: {
    root: projectRoot,
  },
};

export default nextConfig;
