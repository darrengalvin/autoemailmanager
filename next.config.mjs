/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3001', 'autoemailmanager.netlify.app']
    }
  }
};

export default nextConfig;