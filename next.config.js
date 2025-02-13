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
      {
        protocol: 'https',
        hostname: 'aufs6izrzg.ufs.sh',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'utfs.io',
        port: '',
        pathname: '/**',
      },
    ],
    domains: [
      'images.unsplash.com',
      'xliweicrvrldeigdatup.supabase.co', // Add your Supabase storage domain
      'aufs6izrzg.ufs.sh',
    ],
  },
};

module.exports = nextConfig;
