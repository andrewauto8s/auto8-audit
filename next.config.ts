import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        // The .vercel.app host serves the same page as the custom domain.
        // Send it to the canonical one so ad clicks, analytics and search
        // all land on a single hostname instead of splitting between two.
        source: "/:path*",
        has: [{ type: "host", value: "auto8-audit.vercel.app" }],
        destination: "https://audit.auto8.ai/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
