import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // output: "export",
  // crossOrigin: "anonymous",
  trailingSlash: false,
  // headers: async () => [
  //   {
  //     source: "/_next/:path*",
  //     headers: [
  //       { key: "Access-Control-Allow-Origin", value: "*" },
  //       { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS" },
  //       { key: "Access-Control-Allow-Headers", value: "Content-Type" },
  //     ],
  //   },
  // ],
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
