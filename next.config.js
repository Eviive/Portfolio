/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: process.env.NEXT_PUBLIC_AZURE_ASSETS_PROTOCOL,
                hostname: process.env.NEXT_PUBLIC_AZURE_ASSETS_HOSTNAME
            }
        ],
        dangerouslyAllowSVG: true,
        contentDispositionType: "attachment",
        contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;"
    },
    productionBrowserSourceMaps: true,
    output: "standalone"
};

module.exports = nextConfig;
