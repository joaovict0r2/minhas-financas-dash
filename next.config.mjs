/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/signin',
        permanent: true,
      },
    ];
  },
  env: {
    API_URL: process.env.API_URL,
    SECRET:  process.env.SECRET
  }
};

export default nextConfig;
