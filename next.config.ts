import type { NextConfig } from "next";

const sandboxId = process.env.E2B_SANDBOX_ID;
const devPort = process.env.PORT ?? "3000";

const nextConfig: NextConfig = {
  // Allow dev assets and HMR on the local browser and this sandbox's preview.
  allowedDevOrigins: [
    "127.0.0.1",
    ...(sandboxId ? [`${devPort}-${sandboxId}.e2b.app`] : []),
  ],
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    qualities: [75, 95],
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
