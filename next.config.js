/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
            },
        ],
    },
    env: {
        BACKEND_URL: process.env.BACKEND_URL,
    }
}

module.exports = nextConfig
