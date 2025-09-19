// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;



/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/registration',
        permanent: true, // browser caching ke liye
      },
    ];
  },
};

export default nextConfig;
