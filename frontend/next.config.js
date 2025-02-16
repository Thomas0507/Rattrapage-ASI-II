/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  /* config options here */
  webpack: (config) => {
    // Solve compiling problem via vagrant
    config.watchOptions = {
      poll: 1000,   // Check for changes every second
      aggregateTimeout: 300,   // delay before rebuilding
    };
    return config;
  },
  experimental: {
    turbo:
    this.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300
    },
  }
}
 
module.exports = nextConfig