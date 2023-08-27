import type { MetadataRoute } from "next";

const robots = (): MetadataRoute.Robots => ({
    rules: {
        userAgent: "*",
        allow: [ "/", "/api/og/*" ]
    },
    host: process.env.NEXT_PUBLIC_BASE_URL,
    sitemap: `${process.env.NEXT_PUBLIC_BASE_URL}/sitemap.xml`
});

export default robots;
