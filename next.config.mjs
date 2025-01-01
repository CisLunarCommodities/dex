/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@project/anchor': './anchor/src',
    }
    return config
  }
};

export default nextConfig;
