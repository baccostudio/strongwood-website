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
        formats: ["image/avif", "image/webp"],
    },
};

export default nextConfig;
