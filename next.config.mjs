/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "uysatyjrbmttzkzisucw.supabase.co",
      },
    ],
  },
};

// Exporting using ES module syntax
export default nextConfig;
