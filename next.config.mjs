/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        FRONTEND_SECRET: process.env.FRONTEND_SECRET,
        NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
        CLIENT_IP_HEADER_NAME: process.env.CLIENT_IP_HEADER_NAME
    }
};

export default nextConfig;
