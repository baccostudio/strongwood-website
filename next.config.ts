import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    async headers() {
        return [
            {
                source: "/fonts/:path*",
                headers: [
                    {
                        key: "Cache-Control",
                        value: "public, max-age=31536000, immutable",
                    },
                ],
            },
        ];
    },
    images: {
        minimumCacheTTL: 2678400,
        deviceSizes: [320, 384, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        formats: ["image/avif", "image/webp"],
    },
};

export default nextConfig;
