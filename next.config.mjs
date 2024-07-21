/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: "/socket.io/:path*",
                destination: "/api/socket",
            },
        ];
    },
    images: {
        domains: ["i.ytimg.com"], // 외부 호스트 추가
    },
};

export default nextConfig;
