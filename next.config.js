/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
    domains: [
      'images.unsplash.com',
      'xliweicrvrldeigdatup.supabase.co' // Add your Supabase storage domain
    ],
  },
};

module.exports = nextConfig;
