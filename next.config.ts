import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // output: "export",
  crossOrigin: "anonymous",
  trailingSlash: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/dojit2sp3/**",
      },
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
