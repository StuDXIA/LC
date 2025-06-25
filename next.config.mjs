/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['images.unsplash.com', 'cdn.jsdelivr.net'],
  },
  experimental: {
    optimizeCss: true,
  },
}

export default nextConfig