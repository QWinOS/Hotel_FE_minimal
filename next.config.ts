import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // output: "export",
  crossOrigin: "anonymous",
  trailingSlash: false,
  images: {
    domains: [
      "127.0.0.1",
      "141.148.215.119",
      "155.248.254.64",
      "192.168.1.198",
    ],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "*",
        port: "",
        pathname: "/uploads/**",
        search: "",
      },
    ],
    // unoptimized: true,
  },
};

export default nextConfig;
