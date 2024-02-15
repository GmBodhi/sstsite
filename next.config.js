/** @type {import('next').NextConfig} */
const path = require('path');
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['localhost', 'i.ibb.co', 'c.tenor.com'],
        formats: ['image/webp'],
    },
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
};

module.exports = nextConfig;
