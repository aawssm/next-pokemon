/** @type {import('next').NextConfig} */
const nextConfig = {
  // matcher: "/",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        port: "",
      },
    ],
  },
};

module.exports = nextConfig;
