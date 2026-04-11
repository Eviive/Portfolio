import type { NextConfig } from "next";

const protocol = process.env.NEXT_PUBLIC_AZURE_ASSETS_PROTOCOL;
const hostname = process.env.NEXT_PUBLIC_AZURE_ASSETS_HOSTNAME;

if (protocol !== "http" && protocol !== "https") {
    throw new Error(`Invalid protocol: ${protocol ?? ""}. Must be "http" or "https".`);
}

if (hostname === undefined) {
    throw new Error("Hostname is not defined.");
}

const nextConfig: NextConfig = {
    reactCompiler: true,
    images: {
        remotePatterns: [
            {
                protocol,
                hostname
            }
        ],
        dangerouslyAllowSVG: true,
        contentDispositionType: "attachment",
        contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;"
    },
    productionBrowserSourceMaps: true
};

export default nextConfig;
