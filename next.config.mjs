/** @type {import('next').NextConfig} */
const nextConfig = {
  // Prevent Next from blocking compile/build on remote font stylesheet fetches
  optimizeFonts: false,
  async redirects() {
    return [
      { source: '/websites', destination: '/', permanent: true },
      { source: '/websites/pricing', destination: '/pricing', permanent: true },
      { source: '/websites/inquire', destination: '/inquire', permanent: true },
      { source: '/websites/welcome', destination: '/welcome', permanent: true },
    ];
  },
};

export default nextConfig;
