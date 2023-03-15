/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      'storage.webforest.eco',
      'storage.dev.webforest.eco',
      'webforeststoragedev.blob.core.windows.net',
      'lh3.googleusercontent.com',
    ],
  },
};

module.exports = nextConfig;
