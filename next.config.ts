import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        pathname: '/photos/**',
      },
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        pathname: '/workspace-*/image/**',
      },
      { 
        protocol: 'https', 
        hostname: 'replicate.delivery', 
        pathname: '/**', 
      },
    ],
  },
   eslint: {
    // PERINGATAN: Ini akan mengabaikan error ESLint saat build
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Jika ada error type juga bisa diabaikan dengan ini
    ignoreBuildErrors: true,
  },
}

export default nextConfig
