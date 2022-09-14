/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images:{
    domains:['localhost','sreed.me','sreedbackend.pythonanywhere.com'],
    formats:['image/webp']
  }
}

module.exports = nextConfig
