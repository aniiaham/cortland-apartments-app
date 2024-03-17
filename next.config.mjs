/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cortland.com",
        port: "",
        pathname: "/assets/images/cache/**",
      },
    ],
  },
};

export default nextConfig;
