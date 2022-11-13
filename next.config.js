const nextConfig = {
  reactStrictMode: true,
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false };

    return config;
  },
  images: {
    domains: ['flipster.infura-ipfs.io'],
  },
};

module.exports = nextConfig;
