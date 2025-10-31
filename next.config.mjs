

// // next.config.js
// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'play-lh.googleusercontent.com',
//         pathname: '/**',
//       },
//       {
//         protocol: 'https',
//         hostname: 'play.googlelucky.com',
//         pathname: '/**',
//       },
//       {
//         protocol: 'https',
//         hostname: 'm.sfsfsat.vip',
//         pathname: '/**',  // allows any path
//       },
//     ],
//   },
// };

// export default nextConfig;



/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "play-lh.googleusercontent.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "play.googlelucky.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "m.sfsfsat.vip",
        pathname: "/**",
      },
      {
        // 👇 new domain jahan se image aa rahi hai
        protocol: "https",
        hostname: "example.cdn.com", // <-- apna domain daal
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
