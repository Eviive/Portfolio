import type { MetadataRoute } from "next";

const robots = (): MetadataRoute.Robots => ({
    rules: {
        userAgent: "*",
        allow: [ "/", "/api/og/*" ]
    },
    host: process.env.BASE_URL
});

export default robots;
