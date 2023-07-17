/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: process.env.NEXT_PUBLIC_API_PROTOCOL,
                hostname: process.env.NEXT_PUBLIC_API_HOSTNAME,
                port: process.env.NEXT_PUBLIC_API_PORT,
                pathname: process.env.NEXT_PUBLIC_API_PATHNAME
            }
        ],
        dangerouslyAllowSVG: true,
        contentDispositionType: "attachment",
        contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;"
    },
    output: "standalone"
};

module.exports = nextConfig;
