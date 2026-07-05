/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removed static export to support dynamic imports and SSR features
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
