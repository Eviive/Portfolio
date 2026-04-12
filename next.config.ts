import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    reactCompiler: true,
    images: {
        remotePatterns: [
            {
                protocol: process.env.NEXT_PUBLIC_AZURE_ASSETS_PROTOCOL as "http" | "https",
                hostname: process.env.NEXT_PUBLIC_AZURE_ASSETS_HOSTNAME!
            }
        ],
        dangerouslyAllowSVG: true,
        contentDispositionType: "attachment",
        contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;"
    },
    productionBrowserSourceMaps: true
};

export default nextConfig;
