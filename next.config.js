/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Ignoră erorile ESLint la build pentru Render
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Ignoră erorile TypeScript la build (doar pentru Render)
    ignoreBuildErrors: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'qxcjfwqgtdfamsxsspod.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // Enable SWC minification for faster builds
  swcMinify: true,
  // Compress output for faster loading
  compress: true,
  // Enable React strict mode for better performance
  reactStrictMode: true,
  // Optimize production builds
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Enable experimental features for better performance
  experimental: {
    optimizeCss: false,
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },
  // Webpack configuration for path aliases (fix for Render)
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': require('path').resolve(__dirname),
    };
    return config;
  },
}

module.exports = nextConfig
