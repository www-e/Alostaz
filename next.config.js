/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost'],
    // Add any other domains you'll be loading images from
    // For example, if you're using Supabase storage:
    // domains: ['localhost', 'your-supabase-project.supabase.co'],
    unoptimized: true,
  },
  i18n: {
    locales: ['ar'],
    defaultLocale: 'ar',
    localeDetection: false,
  },
  // Optimize build for production
  swcMinify: true,
  // Enable experimental features if needed
  experimental: {
    // appDir: true, // Already enabled by default in Next.js 14
    serverComponentsExternalPackages: [],
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, 'src'),
    };
    return config;
  },
};

module.exports = nextConfig;
