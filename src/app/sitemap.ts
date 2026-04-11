import { locales } from "@/libs/i18n";
import type { MetadataRoute } from "next";

const envBaseUrl = process.env.NEXT_PUBLIC_BASE_URL;

if (envBaseUrl === undefined) {
    throw new Error("NEXT_PUBLIC_BASE_URL environment variable is not defined");
}

const sitemap = (): MetadataRoute.Sitemap => {
    const baseUrl = new URL(envBaseUrl);

    const availableLocales = ["", ...locales] as const;

    return availableLocales.map(locale => ({
        url: new URL(locale, baseUrl).toString(),
        lastModified: new Date().toISOString()
    }));
};

export default sitemap;
