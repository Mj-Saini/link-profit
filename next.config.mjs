

// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'play-lh.googleusercontent.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'play.googlelucky.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'm.sfsfsat.vip',
        pathname: '/**',  // allows any path
      },
    ],
  },
};

export default nextConfig;


