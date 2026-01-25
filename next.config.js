/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static export for shared hosting
  output: 'export',
  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },
  // Skip dynamic routes at build time - they will render client-side
  trailingSlash: true,
  eslint: {
    // Ignoră erorile ESLint la build pentru Render
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Ignoră erorile TypeScript la build (doar pentru Render)
    ignoreBuildErrors: false,
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
