/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com', // Kita izinkan ambil gambar dari sini
      },
    ],
  },
};

export default nextConfig;