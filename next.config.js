/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: process.env.AZURE_ASSETS_PROTOCOL,
                hostname: process.env.AZURE_ASSETS_HOSTNAME
            }
        ],
        dangerouslyAllowSVG: true,
        contentDispositionType: "attachment",
        contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;"
    },
    output: "standalone"
};

module.exports = nextConfig;
