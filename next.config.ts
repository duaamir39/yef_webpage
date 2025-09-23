import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizeCss: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  webpack: (config) => {
    config.externals.push({
      "@aws-sdk/credential-providers": "commonjs @aws-sdk/credential-providers",
      "gcp-metadata": "commonjs gcp-metadata",
      "snappy": "commonjs snappy",
      "socks": "commonjs socks",
      "mongodb-client-encryption": "commonjs mongodb-client-encryption",
      "kerberos": "commonjs kerberos",
      "@mongodb-js/zstd": "commonjs @mongodb-js/zstd",
    });
    return config;
  },
  
};

export default nextConfig;
