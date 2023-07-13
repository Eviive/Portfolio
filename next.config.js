/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: process.env.API_PROTOCOL,
                hostname: process.env.API_HOSTNAME,
                port: process.env.API_PORT,
                pathname: process.env.API_PATHNAME
            }
        ],
        dangerouslyAllowSVG: true,
        contentDispositionType: "attachment",
        contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;"
    }
};

module.exports = nextConfig;
