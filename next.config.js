/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['storage.dev.webforest.eco', 'webforeststoragedev.blob.core.windows.net']
  }
}

module.exports = nextConfig
