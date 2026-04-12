import { locales } from "@/libs/i18n";
import type { MetadataRoute } from "next";

const sitemap = (): MetadataRoute.Sitemap => {
    const baseUrl = new URL(process.env.NEXT_PUBLIC_BASE_URL!);

    const availableLocales = ["", ...locales] as const;

    return availableLocales.map(locale => ({
        url: new URL(locale, baseUrl).toString(),
        lastModified: new Date().toISOString()
    }));
};

export default sitemap;
