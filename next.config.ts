import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "covers.openlibrary.org",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "1soagemizpecwbp2.private.blob.vercel-storage.com",
      },
    ],
  },
};

export default nextConfig;
