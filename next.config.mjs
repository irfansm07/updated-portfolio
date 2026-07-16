/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  webpack(config) {
    // Allow Next.js to import .glb binary assets as URLs
    config.module.rules.push({
      test: /\.glb$/,
      type: 'asset/resource',
    });
    return config;
  },
};

export default nextConfig;
