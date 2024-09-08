/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'stylus.ua',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'satelit.ua',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
