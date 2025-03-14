import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "covers.openlibrary.org",
      },
    ],
  },
};

export default nextConfig;
